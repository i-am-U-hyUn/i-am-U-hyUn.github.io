---
title: "WSL에서 GCP로 배포하기 — Makefile 구조와 배포 성공 여부 확인하는 법"
date: 2026-09-16 18:00:00 +0900
categories: [프로젝트, 인프라]
tags: [WSL, GCP, "Cloud Run", "Cloud Build", Makefile, 배포, 포트폴리오]
toc: true
---

[4편](/posts/cloud-run-firestore-iam-permission-data-loss/)에서 Firestore IAM 권한 문제를 다뤘는데, 그 사고를 조사하고 재배포하는 과정에서 배포 환경 자체(WSL, Makefile 구조, 배포 성공 여부를 확인하는 법)도 따로 정리해둘 필요를 느꼈다. 이 글은 코드 로직보다는 "실제로 배포할 때 뭘 어떻게 하고, 뭘 확인해야 안심할 수 있는가"에 가깝다.

> 이 글에는 실제 GCP 프로젝트 ID, 서버 계정 사용자명 등 사내·개인 식별자를 담지 않았다. 전부 예시 값(`my-gcp-project`, `myuser` 등)으로 대체했다.
{: .prompt-warning }

---

## 1. 왜 WSL인가

WSL(Windows Subsystem for Linux)은 가상머신이나 듀얼 부팅 없이 Windows 안에서 진짜 리눅스 커널을 돌릴 수 있게 해주는 Windows 자체 기능이다. `apt install make`로 진짜 GNU Make를 설치할 수 있어서, 이 프로젝트의 배포 자동화(Makefile 기반)를 원본 그대로 쓰기 위해 도입했다.

- **WSL1**: 리눅스 시스템 호출을 Windows 시스템 호출로 번역하는 방식
- **WSL2**: 리눅스 커널을 가벼운 전용 VM 안에서 실제로 돌리는 방식

헷갈리기 쉬운 부분이 파일시스템 관계다. WSL은 자기만의 리눅스 파일시스템(`/home/myuser/...`)을 따로 갖고, Windows 드라이브는 `/mnt/c/...` 경로로 마운트돼서 접근할 수 있다. 배포 작업 경로(`/home/myuser/architect_draw_ai`)는 WSL 자체 파일시스템에 있는 것이지, Windows 쪽 프로젝트 폴더와는 **물리적으로 별개의 복사본**이다. 그래서 두 경로에 각각 독립적으로 git clone/pull이 필요하고, 한쪽만 고쳐서는 다른 쪽에 반영되지 않는다. `/mnt/c/...`를 거쳐 Windows 폴더를 그대로 쓰는 것도 가능은 하지만, 파일 권한·성능 문제가 생길 수 있어 배포 작업은 WSL 자체 파일시스템 경로에서 하는 걸 원칙으로 삼았다.

---

## 2. Makefile 구조 요약

타깃이 많아 보이지만 역할별로 나누면 구조가 단순하다.

```text
변수 정의 (ENGINE, REGION, AR_REPO, BACKEND_SVC, ADC_FILE ...)
├─ 로컬 개발용:      install / env / dev / build
├─ Firestore 로컬용: gcp-auth / gcp-check / dev-firestore / seed-firestore
├─ 에뮬레이터용:      emulator-up/down / dev-emulator / seed-emulator
├─ 컨테이너 개발용:    up / down / logs / ps / up-firestore
├─ GCP 배포용:  ⭐
│   deploy-check → gcp-bootstrap → ensure-repo
│   build-backend-image / build-frontend-image  (Cloud Build)
│   deploy-backend / deploy-frontend            (gcloud run deploy)
│   deploy  (backend→frontend 순서로 위 둘을 이어서 실행)
│   deploy-urls / deploy-env  (배포 상태 조회)
├─ 삭제용:  destroy-backend / destroy-frontend / destroy
└─ 정리용:  stop / clean
```

- **변수**: `ENGINE`(docker/podman), `REGION`/`AR_REPO`/`BACKEND_SVC`/`FRONTEND_SVC`(GCP 리전·서비스 이름), `ADC_FILE`(로컬 인증 파일 위치). 전부 `make deploy GCP_PROJECT=xxx`처럼 커맨드라인에서 덮어쓸 수 있다.
- **로컬 개발용**: `install`로 의존성 설치, `dev`로 프론트/백엔드 동시 로컬 실행, `build`로 프로덕션 빌드 — GCP와 무관하다.
- **Firestore 로컬용**: `gcp-auth`로 내 컴퓨터에 GCP 인증을 걸고, `dev-firestore`로 로컬에서 돌리면서도 진짜 Firestore에 접속해본다. `emulator-up` 계열은 진짜 GCP 없이 가짜 Firestore를 컨테이너로 띄워 테스트한다.
- **컨테이너 개발용**(`up`/`down`/`logs`/`ps`): `docker-compose`를 대신 실행해주는 래퍼다.
- **GCP 배포용**(핵심): `deploy-check`가 사전 조건(gcloud 존재 여부, 프로젝트 지정 여부)을 확인하고, `ensure-repo`가 Artifact Registry 저장소를 준비하고, `build-*-image`가 Cloud Build로 이미지를 빌드·push하고, `deploy-backend`/`deploy-frontend`가 그 이미지로 실제 Cloud Run 배포를 실행한다. `deploy` 하나만 실행하면 backend→frontend 순서로 전체가 이어서 돌아간다. `deploy-urls`/`deploy-env`는 배포 후 상태 확인용이다.
- **삭제/정리**: `destroy` 계열(확인 프롬프트 있음)과 `stop`/`clean`(로컬 프로세스 정리).

---

## 3. 실전 배포 순서 (WSL 셸)

```bash
cd ~/architect_draw_ai
git pull                          # 최신 코드 받기
gcloud auth list                  # 로그인 계정이 맞는지 확인
make deploy GCP_PROJECT=my-gcp-project REGION=my-region
```

Cloud Build 사용 권한이 프로젝트 정책으로 막혀 있는 경우가 있는데, 그럴 땐 이미지 빌드 단계에서 에러가 난다. 이때는 Podman으로 로컬에서 이미지를 빌드해 직접 push하고, `make deploy-backend`/`make deploy-frontend` 대신 `gcloud run deploy` 명령만 따로 실행하는 우회 경로를 쓴다.

---

## 4. "배포 완료"라는 문구를 곧이곧대로 믿으면 안 되는 이유

배포 명령을 실행한 뒤 터미널 로그를 끝까지 봐야 한다는 걸 이번에 다시 확인했다. `Deployment failed`라는 문구가 있는지, 그리고 마지막에 `has been deployed and is serving 100 percent of traffic`이라는 문장이 실제로 있는지를 확인해야 한다 — 실패했는데도 그 위나 아래에 얼핏 "배포됐다"는 인상을 주는 메시지가 섞여 있을 수 있어서, 로그 전체를 봐야 진짜 성공인지 알 수 있다. 실제로 한 번은 파일 개행 문자(CRLF/LF) 문제로 컨테이너가 부팅 직후 죽었는데, 이것도 터미널 로그만으로는 바로 안 잡히고 Cloud Run 콘솔의 리비전 로그를 열어보고서야 원인을 특정했다.

그래서 터미널 로그만으로 불안하면 GCP 콘솔에서 직접 눈으로 확인하는 게 가장 확실하다.

| 확인 대상 | 콘솔 |
|---|---|
| 배포된 서비스 목록/URL/트래픽 | `console.cloud.google.com/run?project=<PROJECT_ID>` |
| 이미지 빌드 이력(성공/실패) | `console.cloud.google.com/cloud-build/builds?project=<PROJECT_ID>` |
| Artifact Registry에 올라간 이미지 | `console.cloud.google.com/artifacts?project=<PROJECT_ID>` |
| 컨테이너 실행 로그(에러 원인) | `console.cloud.google.com/logs/query?project=<PROJECT_ID>` |
| IAM 권한(누가 무슨 role을 가졌는지) | `console.cloud.google.com/iam-admin/iam?project=<PROJECT_ID>` |

Cloud Run 콘솔에서 서비스 이름을 클릭하면 리비전들이 시간순으로 나온다. 방금 배포한 리비전 옆에 초록색 체크가 있으면 정상, 빨간 느낌표가 있으면 실패다. 실패한 리비전을 클릭하면 에러 메시지가 뜨고, "로그" 탭에서 컨테이너가 왜 죽었는지 구체적인 원인을 볼 수 있다 — 위에서 언급한 CRLF 문제도 이 방식으로 찾아냈다.

**추천 확인 순서**: Cloud Run 콘솔에서 리비전 상태(초록불/빨간불) 확인 → 빨간불이면 그 리비전 클릭 → "로그" 탭에서 원인 확인.

---

## 마치며

배포 자동화(`make deploy` 한 줄)가 잘 갖춰져 있어도, "명령이 에러 없이 끝났다"와 "의도한 상태로 정상 배포됐다"는 다른 이야기라는 걸 이번에 반복해서 확인했다([4편](/posts/cloud-run-firestore-iam-permission-data-loss/)의 IAM 사고도, 이번 CRLF 문제도 같은 패턴이다). 터미널 로그의 마지막 줄만 보지 않고, 의심스러우면 GCP 콘솔에서 리비전 상태를 직접 확인하는 습관을 들이기로 했다.

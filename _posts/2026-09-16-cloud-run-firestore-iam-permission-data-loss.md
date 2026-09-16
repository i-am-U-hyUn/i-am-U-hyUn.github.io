---
title: "Cloud Run + Firestore 서버가 조용히 로컬 저장소로 폴백되며 데이터가 사라진 사건"
date: 2026-09-16 00:00:00 +0900
categories: [프로젝트, 인프라]
tags: [GCP, CloudRun, Firestore, IAM, 트러블슈팅, 포트폴리오]
toc: true
---

## 들어가며

[1편](/posts/docx-process-flowchart-elt/)에서는 Word 정의서를 업로드하면 사람이 다시 그리지 않아도 표준 플로우차트로 자동 렌더링되는 프로세스 시각화 도구를 어떻게 설계했는지, [2편](/posts/flowchart-swimlane-edge-routing/)에서는 그 그래프를 스윔레인 화면에 실제로 그리면서 부딪힌 문제를 다뤘다. 이번 글은 그 도구를 실제로 접근 가능한 형태로 GCP에 배포하는 과정에서 겪은 사고 기록이다.

이 도구를 만들게 된 이유는 1편에서 썼듯, 프로세스 정의서가 바뀔 때마다 사람이 드로잉 툴을 열어 그림을 처음부터 다시 그려야 했고, 그 사이 원본 문서와 그림 버전이 어긋나는 문제가 반복됐기 때문이다. 로컬 데모(lowdb)만으로도 이 문제는 보여줄 수 있었지만, 팀원들이 각자 접속해서 실시간으로 최신 상태를 볼 수 있게 하려면 실제 배포가 필요했다. 그래서 저장 계층에 GCP Firestore 구현체(`store.firestore.ts`)를 추가하고 Cloud Run 배포 자동화(`make deploy`)를 맞춰뒀는데, 그렇게 배포한 서비스에서 발생한 사고가 이번 글의 주제다.

전날 배포된 서비스에 신규 문서를 업로드했는데, 다음 날 다시 들어가보니 업로드했던 문서도, 변경 이력(history)도 전부 사라져 있었다. 서버 로그도, 배포 스크립트도 특별히 에러를 내지 않은 채 "정상적으로" 동작하고 있었기 때문에 처음엔 원인을 짐작하기 어려웠다.

> 이 글도 1편·2편과 동일한 마스킹 기준을 따른다 — 실제 GCP 프로젝트 ID, 서비스 계정 식별자 등 사내 정보는 담지 않았고 모두 예시 값으로 대체했다.
{: .prompt-warning }

---

## 1. 증상

- 전날 `.docx` 문서를 업로드해서 정상적으로 처리 완료 메시지까지 받았다.
- 다음 날 같은 배포 URL로 들어가보니 업로드했던 신규 문서, 그리고 업로드/삭제 이력(dashboard history)이 전부 비어 있었다.
- 배포는 Cloud Run(백엔드) + Cloud Run(프론트엔드) + Firestore 조합이고, 배포 파이프라인은 `make deploy`로 자동화되어 있어 배포 자체에는 별다른 실패 로그가 없었다.

---

## 2. 원인 분석

### 2-1. 저장소 추상화 구조

이 프로젝트는 저장 계층이 `Store`라는 인터페이스로 추상화되어 있고, 환경변수 `STORE_DRIVER`로 실제 구현체(Firestore / MongoDB / lowdb)를 선택하도록 설계되어 있었다.

```ts
// db.ts
function resolveDriver(): Driver {
  const explicit = process.env.STORE_DRIVER?.trim().toLowerCase();
  if (explicit === "firestore" || explicit === "mongo" || explicit === "lowdb") {
    return explicit;
  }
  if (process.env.MONGODB_URI?.trim()) return "mongo";
  return "lowdb";
}
```

핵심은 `initStore()`의 폴백 로직이었다.

```ts
export async function initStore(): Promise<Store> {
  let store = getStore();
  try {
    await store.connect();
  } catch (err) {
    if (store.kind === "mongo" || store.kind === "firestore") {
      console.warn(`[store] ⚠ ${store.kind} 연결 실패 → lowdb 로 폴백합니다.`);
      _store = new LowdbStore();
      store = _store;
      await store.connect();
    } else {
      throw err;
    }
  }
  return store;
}
```

Firestore/Mongo 연결에 실패하면 "데모가 죽지 않도록" 자동으로 `lowdb`(컨테이너 로컬 JSON 파일)로 조용히 폴백하는 안전장치였다. 문제는 이 폴백이 **에러를 서버 콘솔 로그에만 남기고, API 응답이나 화면상으로는 전혀 티가 나지 않는다**는 점이었다. 업로드는 매번 200 OK로 정상 응답했고, 화면에도 업로드된 문서가 바로 보였다 — 다만 그 저장소가 Firestore가 아니라 컨테이너 로컬 파일이었을 뿐이다.

### 2-2. 헬스체크로 확인

```
curl https://<backend-url>/api/health
```

```json
{"status":"ok","storage":"lowdb","counts":{"processes":20, ...}}
```

`storage` 필드가 `firestore`가 아니라 `lowdb`로 나왔다. 원래 이 서비스는 Firestore를 쓰도록 배포되어 있었으므로, 이 시점에 이미 "뭔가 연결에 실패해서 폴백된 상태"라는 게 확인됐다.

### 2-3. 로그로 근본 원인 확인

Cloud Logging에서 해당 리비전의 부팅 로그를 확인했다.

```
[store] ⚠ firestore 연결 실패 → lowdb 로 폴백합니다.
        원인: 7 PERMISSION_DENIED: Missing or insufficient permissions.
        확인: FIRESTORE_PROJECT_ID=my-gcp-project, FIRESTORE_DATABASE_ID=my-firestore-db
[store] 저장소 준비 완료 (kind=lowdb)
```

`PERMISSION_DENIED`였다. Cloud Run 서비스는 기본 Compute Engine 서비스 계정(`<PROJECT_NUMBER>-compute@developer.gserviceaccount.com`)으로 실행되고 있었는데, 이 계정의 IAM 역할을 확인해보니 `roles/datastore.user`(Firestore 접근 권한)가 없었다.

```
$ gcloud projects get-iam-policy my-gcp-project \
    --flatten="bindings[].members" \
    --filter="bindings.members:<PROJECT_NUMBER>-compute@developer.gserviceaccount.com" \
    --format="table(bindings.role)"

ROLE
roles/bigquery.admin
roles/storage.objectUser
...
(datastore.user 없음)
```

### 2-4. 왜 배포를 여러 번 했는데도 안 걸렸나

배포는 Makefile로 자동화되어 있었다.

```
make deploy-backend GCP_PROJECT=my-gcp-project
```

이 타깃은 `STORE_DRIVER=firestore`, `FIRESTORE_PROJECT_ID`, `FIRESTORE_DATABASE_ID` 같은 **환경변수 주입까지만** 자동화되어 있었고, **서비스 계정에 IAM 권한을 부여하는 단계는 의도적으로 자동화 대상에서 빠져 있었다.** 배포 문서에도 이렇게 명시되어 있었다.

> Firestore 데이터베이스 생성과 서비스 계정 IAM 권한 부여는 프로젝트 정책과 관련되어 Makefile 에 자동화하지 않았습니다. 아래 수동 절차를 따르세요.

즉 최초 배포 시점에 이 수동 단계(IAM 권한 부여)가 누락된 채로, 이후로는 `make deploy`만 반복 실행해왔던 것이었다. 그래서 몇 번을 다시 배포해도 같은 문제가 반복됐다.

### 2-5. 컨테이너 로컬 저장소가 비영속인 이유

lowdb는 컨테이너 파일시스템의 JSON 파일에 쓴다.

```ts
// store.lowdb.ts
const DB_FILE = path.join(DATA_DIR, "db.json");
```

Cloud Run 컨테이너는 스케일-투-제로, 새 리비전 배포, 인스턴스 교체 등으로 언제든 새 컨테이너가 뜰 수 있는 **비영속(ephemeral) 파일시스템**이다. 전날 업로드 당시엔 화면상 정상 동작했지만, 실제로는 그 컨테이너 로컬 파일에만 저장돼 있었고, 밤사이 인스턴스가 재시작되며 그 파일과 함께 데이터가 통째로 사라진 것이었다.

---

## 3. 조치

- IAM 권한(`roles/datastore.user`) 부여는 프로젝트 공유 인프라에 대한 변경이라 임의로 실행하지 않고, 팀 내 승인을 받는 절차를 진행 중이다.
- 권한이 부여되면 별도 재배포 없이도(기존 리비전이 재시작되는 시점부터) 정상적으로 Firestore에 연결될 것으로 예상된다.
- 유실된 업로드 데이터는 Firestore가 아닌 컨테이너 로컬 파일에만 있었기 때문에 복구 대상이 없다 — 재업로드가 필요하다.

---

## 4. 앞으로의 원칙

- **"조용한 폴백"은 장애를 감춘다.** 연결 실패 시 자동으로 다른 저장소로 넘어가는 안전장치 자체는 나쁘지 않지만, 그 사실이 API 응답이나 화면 어디에도 드러나지 않으면 "정상 동작처럼 보이는 장애"가 된다. 최소한 폴백이 발생하면 헬스체크나 관리자 화면에 경고 배지 정도는 노출하는 게 맞다고 본다.
- **배포 자동화와 권한 설정은 분리되기 쉽다.** 배포 스크립트가 매번 성공(exit 0)한다고 해서 그 배포가 "의도한 상태"라는 보장은 없다. 환경변수 주입까지는 자동화됐지만 그 환경변수가 실제로 동작하기 위한 전제 조건(IAM 권한)은 사람이 한 번은 수동으로 챙겨야 하는 단계였고, 그 단계가 빠진 채로 반복 배포되고 있었다.
- 배포 후에는 `/api/health` 같은 엔드포인트로 "설정한 대로 실제로 붙었는지"를 확인하는 습관을 들이기로 했다.

---

## 마치며

배포 스크립트가 에러 없이 끝났다고 해서 "의도한 저장소에 잘 붙었다"는 뜻은 아니었다. 이번 일로, 인프라를 추상화해서 장애에 자동으로 대응하게 만드는 설계와, 그 자동 대응이 발생했다는 사실 자체를 눈에 띄게 만드는 설계는 별개의 문제라는 걸 배웠다.

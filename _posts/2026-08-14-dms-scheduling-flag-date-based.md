---
title: "DMS 반려사유 분류 스케줄링, SEQ 플래그를 날짜 기반으로 바꾼 이유"
date: 2026-08-14 00:00:00 +0900
categories: [프로젝트, 데이터]
tags: [DMS, Databricks, JobsAPI, SecretScope, 스케줄링, 증분처리, 멱등성, 포트폴리오]
toc: true
---

## 들어가며

[지난 글](/posts/dms-rejection-classification-llm/)에서 DMS 반려 사유를 Gemini로 분류하는 파이프라인을 만들고, 매일 신규 건만 처리하도록 `rejection_flag` 테이블에 마지막 처리 `SEQ`를 저장하는 방식으로 스케줄링을 붙였다. 실제로 며칠 돌려보니 이 SEQ 기반 flag가 발목을 잡는 상황이 생겨서, 오늘 스케줄링 기준을 날짜 기반으로 다시 짰다. 그 과정에서 Databricks Jobs API를 새로 붙이게 됐고, 여기서 인증 관련 문제를 두 개 더 만났다.

> 이 글에도 실제 계약 내용, 회사명, 워크스페이스 호스트 주소 등 사내 정보는 담지 않았다. 테이블명은 구조 설명을 위해 남겼고, 카탈로그·프로젝트 식별자는 제외했다.
{: .prompt-warning }

---

## 1. SEQ 기반 flag의 한계

지난 파이프라인은 `cnt_chat_message.SEQ`를 기준으로 "여기까지 처리했다"는 flag를 관리했다. 그런데 `SEQ`는 메시지 단위 PK이지, 계약 단위가 아니다. 반려 후 재상신되는 흐름에서 같은 계약(`CNTRCT_SEQ`)에 메시지가 계속 추가될 수 있는데, 이걸 SEQ 하나로 "처리 완료 지점"을 나누다 보니 판단이 복잡해졌다.

- 이미 처리한 SEQ 이후에 같은 계약에 새 메시지가 붙으면, 그 계약을 다시 분류해야 하는지를 SEQ 값만 보고 판단하기 어려움
- 결국 "이 계약의 최신 메시지가 flag SEQ보다 큰가"를 매번 따로 확인해야 해서 로직이 SEQ 위주로 계속 꼬임

그래서 기준을 계약 묶음이 아니라 **날짜**로 바꿨다. Databricks Jobs API로 "이 Job이 마지막으로 SUCCESS한 날짜"를 조회하고, `cnt_chat_message.REG_DTTM >= 마지막 성공일` 조건으로 신규 대상을 추출하는 방식이다.

```python
import requests

def get_last_success_date(job_id, token):
    host = f"https://{spark.conf.get('spark.databricks.workspaceUrl')}"
    url = f"{host}/api/2.1/jobs/runs/list"
    headers = {"Authorization": f"Bearer {token}"}
    params = {"job_id": job_id, "completed_only": True, "limit": 1}

    resp = requests.get(url, headers=headers, params=params).json()
    for run in resp.get("runs", []):
        if run["state"]["result_state"] == "SUCCESS":
            return run["start_time"]  # epoch millis
    return None
```

호스트 주소도 하드코딩하지 않고 `spark.conf.get("spark.databricks.workspaceUrl")`로 노트북이 실행 중인 워크스페이스 URL을 그때그때 받아오게 했다.

이렇게 얻은 날짜를 기준으로 신규 메시지를 추출하고, 재처리 대상 구간을 지운 뒤 다시 적재하는 흐름은 지난 글에서 다룬 멱등성 설계와 동일하게 유지했다.

```python
before = spark.table(TABLE_CLASSIFIED).count()

spark.sql(f"""
DELETE FROM {TABLE_CLASSIFIED}
WHERE created_at >= DATE('{last_success_date}')
""")

after = spark.table(TABLE_CLASSIFIED).count()
print(f"created_at >= {last_success_date} 삭제: {before - after}건 (남은 {after}건)")
```

지운 뒤에는 `REG_DTTM >= last_success_date`인 신규 `CNTRCT_SEQ`만 다시 조인해서 클렌징·분류를 태운다.

날짜 관리는 두 컬럼으로 나눴다.

| 컬럼 | 의미 |
|---|---|
| `created_at` | 해당 행이 최초로 적재된 날짜, 이후 변경 안 함 |
| `updated_at` | 가장 최근에 갱신된 날짜, 같은 계약에 메시지가 추가돼 재분류될 때마다 갱신 |

신규 SEQ는 `created_at`, `updated_at`을 둘 다 오늘 날짜로 INSERT하고, 기존 SEQ는 `updated_at`만 갱신하는 MERGE로 처리해서, 계약 단위로 메시지가 계속 쌓이는 상황도 날짜 기준 하나로 자연스럽게 흡수됐다.

---

## 2. Jobs API를 쓰려니 토큰을 어디에 둘 것인가

Jobs API를 호출하려면 PAT(Personal Access Token)가 필요한데, 이걸 노트북 코드에 그대로 박아두면 팀이 공유하는 노트북에 토큰이 그대로 노출된다.

- **시도 1 — 코드에 직접 입력**: 동작은 하지만 보안상 바로 탈락.
- **시도 2 — 로컬에 Databricks CLI 설치해서 Secret Scope 생성**: CLI로 PAT 인증 후 Secret Scope를 만들고 토큰을 등록하는 방향으로 진행했다.

```bash
databricks configure --token
# Host: <워크스페이스 호스트>
# Token: dapi...

databricks secrets create-scope --scope <scope명> --initial-manage-principal users
databricks secrets put --scope <scope명> --key <secret-key명> --string-value "dapi..."

databricks secrets list-scopes
databricks secrets list --scope <scope명>
```

처음 시도했을 때 401이 떴는데, 원인은 워크스페이스 정책이나 권한 문제가 아니라 호스트 주소·토큰 값을 입력하는 과정에서 내가 잘못 친 단순 타이핑 실수였다. 값을 다시 확인하고 재시도하니 Secret Scope 생성과 PAT 등록이 정상적으로 끝났다.

이후 노트북에서는 토큰을 코드에 노출하지 않고 아래 한 줄로 조회한다.

```python
api_token = dbutils.secrets.get(scope="<scope명>", key="<secret-key명>")
```

---

## 3. PAT의 API scope 부족

Secret Scope 생성은 됐는데, 이번엔 PAT를 처음 발급할 때 scope를 `jobs`로만 설정해서 Secrets API 호출이 401로 막혔다. Databricks PAT은 scope별로 호출 가능한 API가 분리되기 때문에, `jobs` scope만으로는 Secrets API를 쓸 수 없었다. PAT를 재발급하면서 `secrets`와 `jobs` scope를 함께 지정하니 두 API 모두 정상적으로 호출됐다.

---

## 정리

| 문제 | 원인 | 해결 |
|---|---|---|
| SEQ flag로는 재상신 케이스 처리가 복잡함 | SEQ가 메시지 단위 PK라 계약 단위 증분과 맞지 않음 | Jobs API의 마지막 성공 실행일 기준으로 전환 |
| CLI로 Secret Scope 생성 시 401 | 호스트/토큰 입력 실수 | 값 재확인 후 재시도로 해결 |
| PAT scope 부족으로 Secrets API 401 | 최초 발급 시 `jobs` scope만 지정 | `jobs` + `secrets` scope로 재발급 |

SEQ든 날짜든 "어디까지 처리했는지"를 기록하는 flag 자체는 필요했지만, 그 flag가 데이터의 어떤 단위(메시지 vs 계약)를 기준으로 삼는지에 따라 이후 로직의 복잡도가 크게 달라진다는 걸 이번에 체감했다. 401 에러를 두 번 만났는데, 둘 다 원인은 워크스페이스 설정이 아니라 입력 실수·권한(scope) 설정 누락처럼 내가 직접 고칠 수 있는 부분이었다.

---
title: "DMS 반려사유 분류 스케줄링, SEQ 플래그를 날짜 기반으로 바꾼 이유"
date: 2026-08-14 00:00:00 +0900
categories: [프로젝트, 데이터]
tags: [DMS, Databricks, JobsAPI, SecretScope, 스케줄링, 증분처리, 멱등성, 포트폴리오]
toc: true
---

## 들어가며

[지난 글](/posts/dms-rejection-classification-llm/)에서 DMS 반려 사유를 Gemini로 분류하는 파이프라인을 만들고, 매일 신규 건만 처리하도록 `rejection_flag` 테이블에 마지막 처리 `SEQ`를 저장하는 방식으로 스케줄링을 붙였다. (사실 이 테이블을 만들기 전에는 마지막 처리 지점을 노트북의 Python 변수로만 들고 있었는데, 노트북 실행이 끝나면 변수도 같이 사라져서 매번 전체 데이터를 재처리하는 문제가 있었다. 그걸 테이블로 영속화하면서 한 번 해결했던 것.) 실제로 며칠 돌려보니 이번엔 이 SEQ 기반 flag가 다른 지점에서 발목을 잡는 상황이 생겨서, 오늘 스케줄링 기준을 날짜 기반으로 다시 짰다. 그 과정에서 Databricks Jobs API를 새로 붙이게 됐고, CLI 설치부터 PAT 발급까지 진행하면서 크고 작은 문제를 네 개 더 만났다.

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

### 신규 대상 추출부터 재적재까지

**1) 신규 활동이 있는 계약 후보 추출**

```python
df_new_messages = spark.sql(f"""
    SELECT DISTINCT CNTRCT_SEQ
    FROM cnt_chat_message
    WHERE REG_DTTM >= DATE('{last_success_date}')
""")
df_new_messages.createOrReplaceTempView("new_cntrct_seqs")
```

`last_success_date` 이후에 채팅 메시지가 하나라도 새로 달린 `CNTRCT_SEQ`를 뽑아 "활동이 있었던 계약" 후보 목록을 만든다. 이 결과는 파이썬 변수(`df_new_messages`)가 아니라 `createOrReplaceTempView`로 임시 뷰(`new_cntrct_seqs`)로 등록해두는데, 바로 다음 셀에서 순수 SQL 문자열(`spark.sql("""...""")`) 안에서 이 결과를 참조해야 하기 때문이다. SQL 문자열 안에서는 파이썬 변수를 직접 쓸 수 없어서, 뷰로 등록해 테이블처럼 참조하는 방식을 썼다.

**2) 반려 이력 확인 + 코멘트 수집**

```python
df_raw = spark.sql("""
WITH rejected_history AS (
    SELECT main.SEQ, history.state, main.PRGRS_STATE, main.REG_DTTM
    FROM deal_history AS history
    INNER JOIN cnt_main_cntrct AS main
        ON history.DEAL_SEQ = main.DEAL_SEQ
        AND history.TARGET_SEQ = main.SEQ
    WHERE history.state IN ('CONTRACT_REJECTED', 'CONTRACT_QA_REJECTED')
    AND main.SEQ IN (SELECT CNTRCT_SEQ FROM new_cntrct_seqs)
),
deal_comments AS(
    SELECT main.SEQ, message.CHAT_TYPE, main.reg_dttm, main.prgrs_state,
        COLLECT_LIST(message.CONTENT) AS comments
    FROM rejected_history AS main
    INNER JOIN cnt_chat_message AS message
        ON main.SEQ = message.CNTRCT_SEQ
    GROUP BY 1, 2, 3, 4
)
SELECT * FROM deal_comments""")

raw_count = df_raw.count()
print(f"신규/변경 반려 건: {raw_count}")

if raw_count == 0:
    print("반려 건 없음. 종료.")
    dbutils.notebook.exit("NO_NEW_DATA")
```

1편에서 다룬 조인 구조(`deal_history` → `cnt_main_cntrct` → `cnt_chat_message`)를 그대로 쓰되, `rejected_history`를 뽑는 단계에서 `new_cntrct_seqs` 뷰로 대상을 오늘 활동이 있었던 계약으로만 좁힌다. 그렇게 걸러진 반려 계약에 대해 `cnt_chat_message`와 다시 조인해 코멘트 전체를 `COLLECT_LIST`로 모으면, `df_raw`에는 "이번에 새로 반려됐거나 코멘트가 추가된 계약의 전체 대화 내용"이 담긴다. 신규 건이 하나도 없으면 `dbutils.notebook.exit("NO_NEW_DATA")`로 바로 종료해 뒤의 클렌징·Gemini 호출·MERGE 단계를 아예 타지 않게 했다.

**3) 클렌징 → Gemini 분류 → Spark DataFrame 변환**

클렌징과 `classify_single`(1편의 `classify_single_rejection`과 동일한 로직)로 분류를 마친 뒤에는, 결과를 pandas DataFrame(`df_pd`)에 담는다. pandas는 파이썬 메모리 안에서만 도는 표라 Spark SQL에서 바로 쓸 수 없어서, 다시 한번 Spark DataFrame으로 변환하고 임시 뷰로 등록한다.

```python
df_new = spark.createDataFrame(df_pd)
df_new.createOrReplaceTempView("new_classified")
```

이 변환·등록 없이는 뒤이어 나오는 `MERGE INTO ... USING new_classified`에서 분류 결과를 참조할 방법이 없다. `createOrReplaceTempView`는 `pyspark.sql.DataFrame`에만 정의된 메서드라 `df_pd`(pandas) 상태에서는 호출할 수 없고, 반드시 `spark.createDataFrame()`으로 감싼 뒤에만 쓸 수 있다.

**4) MERGE(UPSERT)로 적재**

```sql
MERGE INTO {TABLE_CLASSIFIED} AS target
USING new_classified AS source
ON target.SEQ = source.SEQ AND target.CHAT_TYPE = source.CHAT_TYPE
WHEN MATCHED THEN UPDATE SET
    target.reg_dttm = source.reg_dttm,
    target.prgrs_state = source.prgrs_state,
    target.comments = source.comments,
    target.`1차_대분류` = source.`1차_대분류`,
    target.`2차_소분류` = source.`2차_소분류`,
    target.updated_at = source.updated_at
WHEN NOT MATCHED THEN INSERT *
```

`MERGE INTO`는 "있으면 업데이트, 없으면 새로 넣어라"를 한 번에 처리하는 UPSERT 문이다. `target`은 실제 테이블(`rejection_classified_live`), `source`는 방금 등록한 `new_classified` 뷰(이번에 새로 분류한 결과)다. `SEQ` + `CHAT_TYPE`이 같은 행을 매칭 기준으로 삼아, 매칭되는 행(기존에 있던 행)이면 나열된 컬럼만 덮어쓰고, 매칭 안 되는 행(새 `SEQ` + `CHAT_TYPE` 조합)이면 `source`의 모든 컬럼을 그대로 새 행으로 추가한다. `UPDATE SET` 목록에 `created_at`을 넣지 않은 것이 포인트인데, 기존 행의 최초 적재일을 그대로 보존하기 위해서다.

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

PAT는 아래 설정으로 발급했다.

| 항목 | 설정 |
|---|---|
| Name | `rejection-scheduler` (임의) |
| Lifetime | 365일 |
| Scope | `secrets` + `jobs` (Secret Scope 관리와 Jobs API 조회 둘 다 필요) |

시도 2를 실제로 진행하면서 문제를 두 개 만났다.

### 2-1. `databricks` 명령어를 찾을 수 없음

```
pip install databricks-cli
...
databricks configure --token
databricks : 'databricks' 용어가 cmdlet, 함수, 스크립트 파일 또는
실행할 수 있는 프로그램 이름으로 인식되지 않습니다.
```

`pip install` 로그 하단에 원인이 경고로 이미 찍혀 있었다.

```
WARNING: The scripts databricks.exe and dbfs.exe are installed in
'...\Scripts' which is not on PATH.
```

패키지 자체는 정상 설치됐고, 실행 파일이 설치된 `Scripts` 폴더가 PowerShell의 `PATH`에 등록되어 있지 않아 명령어를 못 찾은 것뿐이었다. `PATH`에 해당 폴더를 추가하니 해결됐다.

### 2-2. `secrets create-scope` 실행 시 `Error: b'Bad Request'`

```
databricks secrets create-scope --scope <scope명> --initial-manage-principal users
...FutureWarning: 'ssl_version' option is deprecated...
Error: b'Bad Request'
```

가장 단순한 `databricks workspace ls /`도 똑같이 실패해서, secrets 로직 자체의 문제가 아니라 연결·인증 단계의 공통 오류라는 것부터 확인했다. `Bad Request`가 Databricks REST API가 정상 응답할 때 나오는 JSON(`{"error_code": ..., "message": ...}`) 형식이 아니라 순수 텍스트였다는 점에서, 요청이 API 핸들러까지 도달하지 못했을 가능성에 무게를 두고 원인을 좁혀갔다.

1. `.databrickscfg`의 host 값에 오타(`https://` 누락, 트레일링 슬래시 등)가 있는지 확인 → 이상 없음
2. `databricks workspace ls /`로 재현해서 secrets 전용 문제가 아님을 확인
3. 설치 로그에 같이 찍힌 `FutureWarning: 'ssl_version' option is deprecated`에 주목 — legacy `databricks-cli`(pip, 2019년대 패키지)가 오래된 방식으로 SSL 컨텍스트를 만드는데, 최신 `urllib3 2.7`과 조합되면서 TLS 핸드셰이크 단계에서 문제가 생기고, CLI가 원인을 제대로 파싱하지 못한 채 뭉뚱그려 `Bad Request`로 출력하는 것으로 추정
4. `urllib3<2`로 다운그레이드하니 경고는 사라졌지만 일부 상황에서는 여전히 재현돼서, 단일 원인이 아니라 legacy CLI(0.18.0)와 최신 Python(3.14) 조합 자체의 근본적인 비호환 가능성도 함께 의심
5. CLI가 실제 에러 메시지를 숨기고 있었으므로, CLI를 거치지 않고 `Invoke-RestMethod`로 REST API를 직접 호출해 진짜 응답을 확인

> 이 이슈는 여러 원인 후보를 순차적으로 점검하며 해결됐고, 정확히 어느 조치가 결정적이었는지는 특정하지 못했다. 동일 증상이 재발하면 위 순서대로 다시 점검하기로 했다.
{: .prompt-info }

`urllib3` 다운그레이드와 host/token 설정값 재확인을 같이 적용한 뒤로는 CLI로 Secret Scope 생성이 정상 동작했다.

```bash
databricks secrets create-scope --scope <scope명> --initial-manage-principal users
databricks secrets put --scope <scope명> --key <secret-key명> --string-value "dapi..."

databricks secrets list-scopes
databricks secrets list --scope <scope명>
```

**재발 방지 체크리스트**

- CLI 에러가 `Bad Request`처럼 정보가 부족하게 나오면, CLI를 믿지 말고 `Invoke-RestMethod` 등으로 REST API를 직접 호출해 실제 JSON 에러(`error_code`, `message`)를 확인한다.
- legacy `databricks-cli`(pip 버전)는 Databricks 공식 지원이 종료된 패키지이므로, 신규 환경에서는 처음부터 Go 기반 신규 Databricks CLI 사용을 권장한다.

```powershell
winget install Databricks.DatabricksCLI
databricks auth login --host https://<workspace-url>
```

- PowerShell에 명령어를 붙여넣을 때는 이전 출력(프롬프트 문구, 이전 결과)까지 함께 복사하지 않도록 주의한다. 여러 줄이 섞여 붙여넣어지면 파싱 에러가 발생해 진단이 꼬인다.

이후 노트북에서는 토큰을 코드에 노출하지 않고 아래 한 줄로 조회한다.

```python
api_token = dbutils.secrets.get(scope="<scope명>", key="<secret-key명>")
```

---

## 3. PAT의 API scope 부족

Secret Scope 생성은 됐는데, 이번엔 PAT를 처음 발급할 때 scope를 `jobs`로만 설정해서 Secrets API 호출이 401로 막혔다. Databricks PAT은 scope별로 호출 가능한 API가 분리되기 때문에, `jobs` scope만으로는 Secrets API를 쓸 수 없었다. PAT를 재발급하면서 `secrets`와 `jobs` scope를 함께 지정하니 두 API 모두 정상적으로 호출됐다.

---

## 4. Jobs API 호출 시 진짜 401 — 헤더 키 오타

Secret Scope와 PAT 문제를 다 해결한 뒤에도, 정작 Jobs API를 호출하니 401이 났다.

```
Jobs API 조회 실패(401): {"error_code":401,"message":"Credential was not sent or was
of an unsupported type for this API. ..."}
```

원인은 요청 헤더 딕셔너리의 키 이름 오타였다.

```python
headers={"Authroizations": f"Bearer{api_token}"},   # 오타: Authorization이 아님
```

`Authorization`이 아니라 `Authroizations`로 오타가 나 있어서 서버가 인증 정보를 아예 받지 못한 것으로 처리하고 401을 반환한 것이었다. 키 이름을 고치니 바로 해결됐다.

```python
headers={"Authorization": f"Bearer {api_token}"},
```

**재발 방지 체크리스트**

- API 호출에서 401/403이 나면 토큰 유효성 문제로 단정하기 전에 헤더 키 이름 오타부터 확인한다.
- 지금 코드는 `if resp.status_code == 200 ... else: ...` 구조라 인증 실패 시에도 예외 없이 `FALLBACK_DATE`로 조용히 넘어간다. "성공 이력 없음"과 "인증 실패"를 구분 못 하는 리스크가 있어서, 인증/권한 오류는 별도로 감지해 명시적으로 알리거나 예외를 발생시키는 방식으로 개선할 필요가 있다.

---

## 정리

| 문제 | 원인 | 해결 |
|---|---|---|
| SEQ flag로는 재상신 케이스 처리가 복잡함 | SEQ가 메시지 단위 PK라 계약 단위 증분과 맞지 않음 | Jobs API의 마지막 성공 실행일 기준으로 전환 |
| `databricks` 명령어 인식 안 됨 | pip 설치 경로가 PATH에 없음 | PATH에 Scripts 폴더 추가 |
| CLI로 Secret Scope 생성 시 `Bad Request` | legacy CLI와 최신 urllib3의 SSL 비호환 추정 | urllib3 다운그레이드 + 설정값 재확인, 신규 Go CLI 전환 권장 |
| PAT scope 부족으로 Secrets API 401 | 최초 발급 시 `jobs` scope만 지정 | `jobs` + `secrets` scope로 재발급 |
| Jobs API 호출 시 401 | 요청 헤더 키 오타(`Authroizations`) | 헤더 키 이름 수정 |

SEQ든 날짜든 "어디까지 처리했는지"를 기록하는 flag 자체는 필요했지만, 그 flag가 데이터의 어떤 단위(메시지 vs 계약)를 기준으로 삼는지에 따라 이후 로직의 복잡도가 크게 달라진다는 걸 이번에 체감했다. 이번에 만난 문제 중 라이브러리 궁합 문제였던 건 하나뿐이었고, 나머지는 PATH 미등록·헤더 오타·scope 설정 누락처럼 전부 내가 직접 고칠 수 있는 부분이었다.

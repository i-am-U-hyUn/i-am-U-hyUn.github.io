---
title: "DMS 계약 반려 사유, LLM으로 자동 분류하는 파이프라인 제작"
date: 2026-08-12 00:00:00 +0900
categories: [프로젝트, 데이터]
tags: [DMS, Databricks, VertexAI, Gemini, LLM분류, 데이터파이프라인, 스케줄링, 멱등성, 포트폴리오]
toc: true
---

## 들어가며

Sales가 계약을 등록하면 검토 후 승인되거나, 문제가 있으면 반려된다. DMS(Deal Management System)에는 이 반려 사유가 채팅 형태의 코멘트로 남는데, Sales들의 계약 검토 반려 사유를 분류하고 주요 반려 사유를 파악하기 위해 반려 코멘트를 모아 유형별로 분류하는 작업을 맡아 진행했다.

> 이 글에는 실제 계약 내용, 회사명, 금액 등 사내 정보는 담지 않았다. 카탈로그·프로젝트 식별자 등 인프라 정보도 제외했고, 아래 테이블명·코드는 구조를 설명하기 위한 것이다.
{: .prompt-warning }

작업은 두 단계로 나눠 진행했다.

1. **1차: 과거 반려 데이터 일괄 분류** — 쌓여 있던 반려 건을 조인·정제해서 LLM으로 분류
2. **2차: 매일 자동으로 신규 반려 건을 분류하는 스케줄링 파이프라인 구축**

---

## 1. 데이터 소스와 조인 설계

### 사용한 테이블과 역할

반려 사유를 얻으려면 세 테이블이 필요했는데, 각 테이블이 가진 키가 서로 달라서 바로 연결되지 않았다.

| 테이블 | 역할 | 키 |
|---|---|---|
| `deal_history` | 계약 상태 변화 **이력** 로그. "언제 반려됐는지"는 여기에만 있음 | `DEAL_SEQ` + `TARGET_SEQ` |
| `cnt_main_cntrct` | 계약 **마스터** 테이블. `PRGRS_STATE`, `REG_DTTM` 같은 계약 속성도 여기에만 있음 | `SEQ` (계약 고유번호), `DEAL_SEQ` |
| `cnt_chat_message` | 반려 사유가 담긴 코멘트/채팅 **상세** 테이블 | `CNTRCT_SEQ` (= `cnt_main_cntrct.SEQ`) |

`cnt_chat_message`는 그대로 쓰기 어려운 테이블이었다. 반려 사유만 깔끔하게 정리된 게 아니라, `CONTENT` 필드 안에 그 계약을 검토하며 나눈 대화가 전부 들어있어서 content를 정제하고 그중 핵심 반려 사유만 골라내는 과정이 별도로 필요했다. 또 `CHAT_TYPE`은 `QA`, `REVIEW` 두 값뿐이라 이것만으로는 반려 상태인지 알 수 없었고, `deal_history.state`가 `CONTRACT_REJECTED` / `CONTRACT_QA_REJECTED`인지를 확인해야 진짜 반려 건인지 걸러낼 수 있었다.

여기다 `deal_history`는 `DEAL_SEQ` + `TARGET_SEQ`로 계약을 식별하고, `cnt_chat_message`는 `CNTRCT_SEQ`로 식별해서 이 둘을 직접 연결할 공통 키도 없었다. 그래서 `cnt_main_cntrct`가 다리 역할을 한다.

1. `deal_history`에서 반려 이력(`CONTRACT_REJECTED`, `CONTRACT_QA_REJECTED`)이 있는 (`DEAL_SEQ`, `TARGET_SEQ`)를 찾고
2. `cnt_main_cntrct`로 이걸 계약 `SEQ`로 변환하면서 `PRGRS_STATE`, `REG_DTTM`도 같이 확보한 뒤
3. 그 `SEQ`로 `cnt_chat_message`에서 실제 코멘트를 가져온다.

```sql
WITH rejected_history AS (
    SELECT main.SEQ, history.state, main.PRGRS_STATE, main.REG_DTTM
    FROM deal_history AS history
    INNER JOIN cnt_main_cntrct AS main
        ON history.DEAL_SEQ = main.DEAL_SEQ
        AND history.TARGET_SEQ = main.SEQ
    WHERE history.state IN ('CONTRACT_REJECTED', 'CONTRACT_QA_REJECTED')
),
deal_comments AS (
    SELECT main.SEQ, message.CHAT_TYPE, main.reg_dttm, main.prgrs_state,
           COLLECT_LIST(message.CONTENT) AS comments
    FROM rejected_history AS main
    INNER JOIN cnt_chat_message AS message
        ON main.SEQ = message.CNTRCT_SEQ
    GROUP BY 1, 2, 3, 4
)
SELECT * FROM deal_comments;
```

### 어려웠던 점: 첫 번째 시도에서 데이터가 줄어든 이유

처음에는 아래처럼 짰다.

```sql
WITH rejected_history AS (
    SELECT main.SEQ, history.state
    FROM deal_history AS history
    INNER JOIN cnt_main_cntrct AS main
        ON history.DEAL_SEQ = main.DEAL_SEQ
        AND history.TARGET_SEQ = main.SEQ
    WHERE history.state = 'CONTRACT_REJECTED'
),
qa_comments AS (
    SELECT main.SEQ, COLLECT_LIST(message.CONTENT) AS comments
    FROM cnt_main_cntrct AS main
    INNER JOIN cnt_chat_message AS message
        ON main.SEQ = message.CNTRCT_SEQ
    GROUP BY main.SEQ
)
SELECT DISTINCT rejected_history.SEQ, rejected_history.state, qa_comments.comments
FROM rejected_history
INNER JOIN qa_comments
    ON rejected_history.SEQ = qa_comments.SEQ
ORDER BY rejected_history.SEQ ASC;
```

이 버전은 두 가지 문제가 있었다.

- **코멘트 없는 반려 건이 통째로 빠짐**: `qa_comments`가 `cnt_chat_message`와의 `INNER JOIN` + `GROUP BY`로 만들어지기 때문에, 메시지가 하나도 없는 계약은 애초에 `qa_comments`에 등장하지 않는다. 여기에 `rejected_history`와 다시 `INNER JOIN`하니, 코멘트가 없는 반려 건은 결과에서 완전히 사라졌다.
- **`DISTINCT`가 시점·상태 정보를 뭉갬**: `rejected_history`가 `SEQ`, `state`만 뽑고 `PRGRS_STATE`, `REG_DTTM`, `CHAT_TYPE`을 select 하지 않다 보니, 반려가 여러 번 있었거나 메시지 유형이 여러 개인 계약도 결과에서는 다 같은 한 줄로 보였다. 그래서 중복 행을 지우려고 넣은 `DISTINCT`가 실제로는 구분돼야 할 이력·시점 데이터까지 뭉개버렸다.

`CHAT_TYPE`, `reg_dttm`, `prgrs_state`를 처음부터 select해서 `GROUP BY` 키에 포함시키는 쪽으로 바꾸니 `DISTINCT` 없이도 필요한 구분이 유지됐고, 반려 상태도 `CONTRACT_QA_REJECTED`까지 같이 봐야 한다는 걸 이 과정에서 알게 됐다.

---

## 2. 클렌징: 반려 사유만 남기기

`cnt_chat_message.CONTENT`에는 계약을 검토하며 나눈 대화가 전부 들어있어서, 반려 사유와 무관한 메시지를 걸러내야 분류 품질이 올라간다.

- **규칙 기반**: 인사말("안녕하세요", "감사합니다"), 단순 요청/확인("QA요청 부탁드립니다", "확인 부탁드립니다") 같은 정형화된 패턴을 정규식으로 제거
- **길이 기반**: 5단어 이하이면서 날짜·금액 같은 정보가 없는 짧은 문장 제거
- **의미 기반 보완**: 날짜, 금액, 계약기간, 오퍼링, 조건 등 핵심 키워드가 포함된 메시지만 남기는 방식을 규칙 기반과 혼합

규칙만으로 커버 안 되는 케이스(시스템 문의, 단순 동의 등)는 스케줄링 단계로 넘어가면서 노이즈 패턴 목록에 계속 추가하는 식으로 다듬었다.

---

## 3. LLM(Gemini)으로 반려 사유 분류

### 카테고리 체계

Vertex AI의 `gemini-3.5-flash-lite`를 호출해서 1차 대분류(7개 중 강제 선택) + 2차 소분류(자유 생성) 구조로 분류했다.

| 1차 대분류 | 설명 |
|---|---|
| 자료 누락 | 필수 서류/증빙 미첨부 |
| DMS 정보 미기재(공란) | DMS 필수 입력값이 비어있음 |
| DMS 정보 오기재 | 금액, 기간, 수량 등 잘못 입력 |
| 계약서/견적서와 DMS 정보 불일치 | 계약서/견적서/인보이스 상 정보와 DMS 입력값이 다름 |
| 프로세스 미준수 | 절차 미이행, 단계 오류, 승인 누락 |
| 계약 조건 협의 | 계약서 조항 수정/검토/협의 필요 |
| 기타 | 위 6개에 해당하지 않는 경우 |

Gemini에게는 표현이 흔들리지 않도록 짧은 내부 레이블(자료 누락/정보 미기재/정보 오기재/정보 불일치/프로세스 미준수/계약 조건 협의/기타)로 분류하게 하고, 분류 결과를 테이블에 적재하기 전에 위 표의 대표 카테고리명(긴 이름)으로 매핑하는 정규화 단계를 하나 더 거친다. 모델에게 주는 레이블과 대시보드에 보여줄 레이블의 목적이 다르다고 판단해서 분리했다.

2차 소분류는 고정 목록이 아니라 프롬프트에 예시만 주고 Gemini가 메시지 내용에 맞게 자유 생성하도록 했다. 예를 들면:

- 자료 누락 → 견적서 누락, 계약서 누락(Lv1/Lv2, 양사날인본 등), 인감증명서/사용인감계 누락
- 정보 오기재 → 과금제 유형 오류(종량→정액), 환율/통화 오기재
- 계약 조건 협의 → 계약서 조항 수정 협의, 위약금/손해배상 조건 검토

### 프롬프트와 분류 로직

```python
def build_rejection_prompt(comments):
    return """당신은 DMS(Deal Management System) 계약 반려 사유를 분류하는 전문가입니다.
아래 반려 메시지를 읽고, 가장 핵심적인 반려 사유 1개만 분류하세요.

## 1차 대분류 (반드시 아래 7개 중 하나):
1. 자료 누락 — 필수 서류/증빙 미첨부
2. 정보 미기재 — DMS 필수 입력값 공란
3. 정보 오기재 — 금액, 기간, 수량 등 잘못 입력
4. 정보 불일치 — DMS ↔ 계약서/견적서 간 정보 상이
5. 프로세스 미준수 — 절차 미이행, 단계 오류, 승인 누락
6. 계약 조건 협의 — 계약서 조항 수정/검토/협의 필요
7. 기타 — 위 6개 카테고리에 명확히 해당하지 않는 경우

## 분류 규칙:
- 메시지에 여러 사유가 섞여 있더라도, 반려의 가장 핵심적인 원인 1개만 선택
- 반려를 촉발한 근본 원인에 집중 (부수적 요청은 무시)

## 반려 메시지:
""" + comments + """

## 응답 형식 (반드시 이 형식으로만 출력):
1차: [대분류명]
2차: [소분류명]"""


VALID_PRIMARY = [
    "자료 누락", "정보 미기재", "정보 오기재",
    "정보 불일치", "프로세스 미준수", "계약 조건 협의", "기타"
]

def classify_single_rejection(comments):
    prompt = build_rejection_prompt(comments)
    result = call_gemini(prompt)

    primary, secondary = "", ""
    for line in result.split("\n"):
        line = line.strip()
        if "1차" in line and ":" in line:
            primary = line.split(":", 1)[1].strip()
        if "2차" in line and ":" in line:
            secondary = line.split(":", 1)[1].strip()

    matched = False
    for valid in VALID_PRIMARY:
        if valid in primary:
            primary = valid
            matched = True
            break
    if not matched:
        primary = f"분류 불가: {primary}"

    return primary, secondary or "(미분류)"
```

1차 대분류는 정해진 7개 목록과 문자열 매칭으로 유효성을 검증해서, 모델이 목록에 없는 값을 뱉으면 "분류 불가"로 표시해 사람이 확인할 수 있게 했다.

### 겪었던 문제들

- **SA 키 노출 위험**: 처음엔 서비스 계정 키(JSON)를 코드에 dict로 직접 박아 넣었는데, 이 상태로 GitHub에 올리면 키가 그대로 노출된다. Unity Catalog Volume에 저장한 JSON 파일을 읽어오는 방식으로 바꿨다.
- **같은 의미, 다른 표현의 카테고리 중복**: Gemini가 1차 카테고리를 자유롭게 생성하게 뒀더니 같은 의미인데 표현이 미묘하게 다른 카테고리명이 생겼다(예: "정보 미기재" vs "정보 오기재"처럼 유사하지만 다른 코드로 갈리는 경우). 사전에 정의한 7개 대표 카테고리명으로 강제 매칭·정규화하는 로직을 추가해서 해결했다.
- **공유의 어려움**: 처음엔 Databricks에서 원천 쿼리로 CSV를 뽑아 로컬 VSCode에서 Python 스크립트로 분류했는데, 결과를 공유하기가 번거로웠다. Databricks 노트북 안에서 클렌징과 분류를 한 번에 처리하도록 옮겨서 해결했다.

과거 데이터 일괄 분류 결과는 대시보드로도 만들었다. 결과 테이블에 필터를 붙이고, 전체 건수를 보여주는 Counter 위젯과 1차 카테고리별 분포를 보여주는 막대그래프를 추가했다.

---

## 4. 매일 자동 분류하는 스케줄링 파이프라인

과거 데이터 분류가 끝난 뒤에는, 매일 새로 들어오는 반려 건을 자동으로 분류하는 파이프라인을 붙였다.

```text
[DMS 소스 테이블]
  cnt_chat_message (반려 메시지) · deal_history (반려 이력) · cnt_main_cntrct (계약 정보)
        │
        ▼
[Databricks 노트북 · 매일 스케줄링]
  1. 신규 메시지 감지 (flag 기반)
  2. 반려 건 JOIN + 메시지 수집
  3. 메시지 클렌징 (노이즈 제거)
  4. Vertex AI Gemini 분류 (1차/2차)
  5. MERGE (live 테이블에 INSERT/UPDATE)
  6. flag 업데이트
        │
        ▼
[결과 테이블]
  rejection_classified_live (매일 갱신) · rejection_classified (원본 스냅샷, 변경 안 함)
```

### 왜 flag + MERGE 구조로 짰나

매일 전체 데이터를 다시 분류하면 LLM 호출 비용도 늘고, 이미 분류된 건도 다시 건드리게 된다. 그래서 **증분 처리 + 안전한 재실행**을 목표로 두 가지를 넣었다.

처음에는 마지막으로 처리한 SEQ를 노트북 안의 Python 변수로만 들고 있었다. 그런데 노트북 실행이 끝나 커널이 종료되면 그 변수도 같이 사라져서, 다음 스케줄링 실행 때 flag가 다시 0으로 초기화되고 매번 전체 데이터를 재처리하는 문제가 있었다. 그래서 이 값을 `rejection_flag` 테이블에 영속화하는 방식으로 바꿨다.

**flag 기반 증분 처리** — `rejection_flag` 테이블에 마지막으로 처리한 `cnt_chat_message.SEQ`를 저장해두고, 다음 실행 때는 그 이후에 들어온 메시지만 본다.

1. `rejection_flag`에서 `last_message_seq`를 읽어 그 이후의 신규 `CNTRCT_SEQ`를 추출
2. 신규 건이 실제 반려 이력(`CONTRACT_REJECTED`, `CONTRACT_QA_REJECTED`)인지 확인하고 전체 메시지를 `COLLECT_LIST`로 수집
3. 클렌징 → Gemini 분류 (건당 API 레이트리밋 방지를 위해 1.5초 대기)
4. `rejection_classified_live`에 MERGE — 기존 SEQ면 UPDATE(메시지가 추가됐을 수 있으므로), 신규 SEQ면 INSERT
5. 처리 완료 후 `cnt_chat_message`의 `MAX(SEQ)`로 flag 갱신
6. 신규 건이 없으면 "NO_NEW_DATA"를 출력하고 바로 종료해 리소스를 쓰지 않음

**멱등성 고려** — 배치성 파이프라인이라 API 요청 단위의 멱등키(Idempotency-Key)까지는 필요 없었지만, "같은 작업을 여러 번 실행해도 결과가 달라지지 않아야 한다"는 멱등성의 핵심 아이디어는 설계 단계에서부터 신경 썼다. 이 파이프라인은 재실행될 가능성이 실제로 여러 군데 있었기 때문이다.

- **중간 실패 후 재실행**: Vertex AI 호출 중 타임아웃이나 레이트리밋으로 노트북이 중간에 죽으면, 다음 날 스케줄이 돌 때 flag가 갱신 안 된 그 구간을 다시 처리하게 된다. 이때 이미 분류가 끝난 SEQ까지 다시 INSERT되면 `rejection_classified_live`에 같은 계약이 중복 행으로 쌓인다.
- **디버깅을 위한 수동 재실행**: 프롬프트나 노이즈 패턴을 수정한 뒤 특정 구간을 다시 돌려 결과를 확인하고 싶을 때가 있는데, 이때도 매번 새 행이 추가되면 테이블이 지저분해지고 어떤 게 최신 분류인지 알 수 없게 된다.
- **진행 중인 계약의 코멘트 추가**: 반려 후 재상신되는 과정에서 같은 계약(SEQ)에 코멘트가 계속 쌓일 수 있다. 즉 같은 SEQ라도 "새 정보"가 반영된 재분류가 정상적인 케이스라, 단순히 "이미 있으면 스킵"하는 것도 답이 아니었다.

세 경우 모두 "같은 SEQ로 몇 번을 다시 돌려도 테이블에는 그 SEQ의 최신 상태 한 줄만 남아야 한다"는 요구로 귀결됐고, 그래서 INSERT 대신 `SEQ`를 키로 한 MERGE(UPSERT)를 택했다. flag 갱신을 맨 마지막 단계에 둔 것도 같은 맥락이다 — 중간에 실패해서 flag가 갱신되지 않은 채 다시 돌아도, MERGE가 중복 행을 만들지 않으니 그 구간만 다시 분류되고 끝난다.

여기에 더해 flag로 처리 범위를 좁혀두면, 이미 분류가 끝난 SEQ를 재실행 때마다 다시 Gemini에 태우는 일도 자연히 없어진다. 건당 1.5초씩 대기하며 API를 호출하는 구조라 이미 끝난 분류를 반복하는 건 시간과 호출 횟수를 그대로 두 번 쓰는 셈이라, flag와 MERGE를 같이 두는 쪽이 결과의 일관성과 불필요한 재호출 방지를 동시에 잡는 방법이었다.

> 멱등성 개념을 정리하면서 [토스페이먼츠 개발 블로그의 멱등성 글](https://www.tosspayments.com/blog/articles/dev-1)을 참고했다. API 레벨의 멱등키 패턴과는 결이 다르지만, "재시도해도 안전한 상태"를 설계한다는 목표는 같았다.
{: .prompt-info }

### 테이블 구조

| 테이블 | 역할 |
|---|---|
| `rejection_classified` | 1차 일괄 분류 결과의 원본 스냅샷 (변경 안 함) |
| `rejection_classified_live` | 매일 갱신되는 스케줄링 대상 테이블 |
| `rejection_flag` | 마지막 처리 지점(`last_message_seq`)을 저장하는 제어용 테이블 |

### 비용/시간

- 건당 약 1.5초 (API 대기 포함)
- 신규 100건 = 약 2.5분, 신규 1000건 = 약 25분
- 초기 전체 분류(약 4,000건) = 약 1시간 45분

### 유지보수 포인트

- 분류가 이상하면 프롬프트의 카테고리 설명부터 수정
- 새로운 노이즈 패턴이 보이면 `NOISE_PATTERNS` 리스트에 정규식 추가
- 신규 건이 없는 날은 자동 종료되므로 별도 조치 불필요

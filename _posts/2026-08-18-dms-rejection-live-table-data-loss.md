---
title: "DMS 반려사유 분류 파이프라인 데이터 유실 원인과 복구 과정"
date: 2026-08-18 00:00:00 +0900
categories: [프로젝트, 데이터]
tags: [DMS, Databricks, 데이터유실, MERGE, 멱등성, 트러블슈팅, 포트폴리오]
toc: true
---

## 들어가며

[지난 글](/posts/dms-scheduling-flag-date-based/)에서 스케줄링 기준을 SEQ에서 날짜 기반으로 바꾸고, "재실행해도 안전한" 멱등성 설계까지 마무리했다고 생각했다. 그런데 오늘(2026-08-18) 테이블을 열어보니, 매일 정상적으로 돌아가던 스케줄링 Job인데도 결과 테이블에 행이 딱 2개만 남아 있었다. 알고 보니 "멱등성을 보장하려고" 넣어둔 코드 한 줄이 오히려 매일 데이터를 지워온 것이었다.

> 이 글에도 실제 계약 내용, 회사명 등 사내 정보는 담지 않았다. 테이블명은 구조 설명을 위해 남겼고, 카탈로그·프로젝트 식별자는 제외했다.
{: .prompt-warning }

---

## 1. 증상

- `rejection_classified_live` 테이블을 조회하니 행이 2개뿐이었고, 두 행 모두 `created_at`, `updated_at`이 오늘 날짜(2026-08-18)였다.
- Databricks Jobs & Pipelines 화면에서 확인해보니 8/13~8/18 실행이 전부 `Succeeded` 상태였다. Job이 실패해서 데이터가 안 쌓인 게 아니라, **정상적으로 실행되면서 데이터를 지우고 있었다**는 뜻이었다.

---

## 2. 원인 분석

### 2-1. 문제가 된 코드 구조

노트북은 매일 다음 순서로 동작했다.

1. (cell 3) Jobs API로 마지막 성공 실행일(`last_success_date`) 조회
2. **(cell 4) `DELETE FROM rejection_classified_live WHERE created_at >= last_success_date`**
3. (cell 5~9) `last_success_date` 이후 새 메시지가 달린 계약을 조회해 반려 사유 재분류
4. (cell 9) 처리된 모든 행에 `created_at`/`updated_at`을 오늘 날짜로 부여
5. (cell 10) `MERGE INTO ... ON SEQ = SEQ AND CHAT_TYPE = CHAT_TYPE`로 upsert

### 2-2. 실제로 벌어진 일

cell 4의 `DELETE`가 `MERGE`보다 먼저 실행되기 때문에, 오늘 재처리 대상이 되는 기존 행들은 `MERGE` 시점에 이미 테이블에서 삭제된 상태였다. 그 결과 `MERGE`의 `WHEN MATCHED`(UPDATE)는 사실상 발생하지 않고, 모든 처리 행이 `WHEN NOT MATCHED`(INSERT)로 들어가면서 원래 생성일이 아니라 오늘 날짜가 `created_at`으로 매번 새로 찍혔다.

이게 반복되면서:

- 다음 날에는 `last_success_date`가 전날 날짜로 갱신되고
- `DELETE ... WHERE created_at >= last_success_date`가 전날 처리된 모든 행(사실상 테이블 전체)을 지우고
- 그런데 다시 채워지는 행은 "그날 새 메시지가 있던 계약"뿐이라, 별다른 후속 메시지가 없는 과거 반려 건은 재입력 대상에서 빠지고 영구적으로 사라졌다.

즉 `DELETE`는 "테이블 전체를 날짜 기준으로" 지우는데, 재입력은 "그날 활동이 있던 일부 계약만" 채우다 보니, 매일 지우는 양이 채우는 양보다 항상 많아서 테이블이 점점 줄어드는 구조였다. 실제로 로그를 보니 8/14~8/15 실행에서 `created_at >= 2026-08-14 삭제: 4250건(남은 0건)`이 찍혀 있었다 — 이 시점에 이미 테이블 전체가 지워진 것이었다.

### 2-3. 애초에 이 DELETE가 왜 불필요했나

DELETE 옆 주석에는 "재실행 대비 멱등성 보장"이라는 의도가 적혀 있었다. 하지만 이 요구사항(재실행해도, 늦게 들어온 메시지가 있어도 정확한 최신 상태가 반영돼야 한다는 것)은 이미 다른 두 요소로 충분히 보장되고 있었다.

- cell 5의 `WHERE REG_DTTM >= last_success_date` 조회가 날짜 단위로 매번 재스캔하기 때문에, 직전 실행 이후 늦게 들어온 메시지도 다시 잡아낸다.
- cell 10의 `MERGE`가 `SEQ` + `CHAT_TYPE` 기준으로 기존 행은 UPDATE(이때 `created_at`은 갱신 대상에서 제외해 원래 값을 유지), 신규 행은 INSERT를 정확히 처리한다.

즉 `DELETE` 없이 `MERGE`만으로도 멱등성은 이미 보장되고 있었고, `DELETE`는 그 위에 얹혀서 오히려 부작용만 만드는 코드였다.

---

## 3. 조치

### 3-1. 재발 방지

- 노트북에서 cell 4(`DELETE`)를 완전히 제거했다.
- 이후 로직은 cell 5(신규 감지) + cell 10(`MERGE`)만으로 upsert를 수행한다 — 기존 행의 `created_at`은 보존되고, `updated_at`만 갱신된다.

### 3-2. 과거 데이터 복구

**① 스냅샷 기반 복구** — `rejection_classified`(원본 스냅샷, 변경 안 함) 테이블이 `DESCRIBE HISTORY` 확인 결과 2026-08-12에 마지막으로 생성된 걸 확인하고, `rejection_classified_live`에 없는 `SEQ`+`CHAT_TYPE`만 1회성으로 채워 넣었다.

```sql
INSERT INTO rejection_classified_live
SELECT r.SEQ, r.CHAT_TYPE, r.reg_dttm, r.prgrs_state, r.comments,
       r.`1차_대분류`, r.`2차_소분류`,
       DATE('2026-08-13') AS created_at, DATE('2026-08-13') AS updated_at
FROM rejection_classified r
WHERE NOT EXISTS (
    SELECT 1 FROM rejection_classified_live l
    WHERE l.SEQ = r.SEQ AND l.CHAT_TYPE = r.CHAT_TYPE
);
```

4,240건이 복구됐다.

**② 스냅샷 이후 공백 구간 백필** — 스냅샷 생성일(8/12)부터 장애 발견 시점(8/18) 사이는 스냅샷에도 없는 구간이라, 원본 소스 테이블에서 다시 분류해야 했다. `DELETE`가 제거된 노트북에서 `last_success_date`를 8/10로 임시로 강제 지정하고 전체 셀을 한 번 수동 실행했다.

```python
last_success_date = date(2026, 8, 10)
```

신규 메시지가 있는 계약 390건 → 반려 확인 318건 → 분류/MERGE 318건(신규 258건 + 기존 행 업데이트 60건)이 처리됐다. 실행이 끝난 뒤 임시로 넣었던 날짜 오버라이드는 제거하고 원래 Jobs API 기반 로직으로 되돌렸다.

### 3-3. 검증

```sql
SELECT created_at, updated_at, COUNT(*) AS cnt
FROM rejection_classified_live
GROUP BY created_at, updated_at ORDER BY 1, 2;

SELECT SEQ, CHAT_TYPE, COUNT(*)
FROM rejection_classified_live
GROUP BY SEQ, CHAT_TYPE HAVING COUNT(*) > 1;
```

총 4,498건이 복구됐고, `SEQ`+`CHAT_TYPE` 기준 중복은 0건이었다.

| created_at | updated_at | 건수 | 설명 |
|---|---|---|---|
| 2026-08-18 | 2026-08-18 | 258 | 백필 과정에서 새로 발견/삽입된 건 |
| 2026-08-13 | 2026-08-18 | 60 | 복구된 기존 건 중 이번에 재활동으로 갱신된 건 |
| 2026-08-13 | 2026-08-13 | 4,180 | 스냅샷에서 복구된 건(별도 변경 없음) |

---

## 4. 앞으로의 유지보수 원칙

- `rejection_classified_live`에 날짜 조건으로 걸리는 테이블 전체 대상 `DELETE`는 다시 추가하지 않는다. upsert가 필요하면 반드시 `MERGE ... ON SEQ AND CHAT_TYPE`만으로 처리한다.
- 재실행·멱등성이 걱정되는 상황이 생기면 "지우고 다시 채우기"가 아니라 "`MERGE`의 매칭 키가 정확한지"부터 확인한다.
- 아래 쿼리로 테이블 건수가 줄어들고 있지 않은지(이런 유형의 버그가 재발하지 않는지) 정기적으로 모니터링하기로 했다.

```sql
SELECT COUNT(*) FROM rejection_classified_live;
```

- 이번 복구는 `rejection_classified`(원본 스냅샷)가 있었기에 가능했다. 유사 이슈에 대비해 주기적인 스냅샷/백업 정책을 유지하기로 했다.

---

## 마치며

"멱등성을 보장하겠다"는 의도로 넣은 `DELETE`가 오히려 멱등성을 깨는 코드였다는 게 이번 사건의 핵심이다. [지난 글](/posts/dms-scheduling-flag-date-based/)에서 정리했던 것처럼, `MERGE`가 키 기준으로 UPDATE/INSERT를 정확히 나눠준다면 그 자체로 이미 "여러 번 실행해도 결과가 같은" 멱등한 구조다. 여기에 "혹시 몰라서" 지우고 다시 채우는 코드를 얹으면, 그 코드가 지우는 범위와 다시 채우는 범위가 정확히 일치하지 않는 순간 데이터가 샌다는 걸 이번에 체감했다.

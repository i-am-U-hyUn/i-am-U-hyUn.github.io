---
title: "DMS 사업성검토 승인율, 쿼리로 뜯어보기"
date: 2026-08-21 00:00:00 +0900
categories: [프로젝트, 데이터]
tags: [DMS, Databricks, SQL, 데이터분석, 사업성검토, 포트폴리오]
toc: true
---

## 들어가며

Sales Cycle Lead Time을 주제로 한 미팅에서, DMS 사업성검토 프로세스가 실제로 어떻게 돌아가고 있는지 데이터로 뜯어봐 달라는 요청을 받았다. 승인율 / 소요시간 / 마진율 세 가지 축으로 나눠서 분석했고, 분량이 많아 3편으로 나눠 정리한다. 이번 글은 그중 첫 번째, 승인율이다.

> 이 글에는 실제 계약 내용, 회사명, 금액 등 사내 정보는 담지 않았다. 테이블명은 구조 설명을 위해 남겼고, 카탈로그·스키마 식별자는 제외했다.
{: .prompt-warning }

---

## 1. 전체 사업성검토 승인 비율

견적(`qut_estimate`)과 검토 이력(`qut_chk_main`)을 조인해서, 전체 사업성검토 요청 중 승인/반려/진행 중 비율이 각각 얼마나 되는지부터 봤다.

```sql
SELECT
    est.REG_DTTM,
    COUNT(*) AS total_requested_count,
    COUNT_IF(est.PROGRESS_STATE = 'APPROVED') AS approved_count,
    COUNT_IF(est.PROGRESS_STATE = 'REJECTED') AS rejected_count,
    COUNT_IF(est.PROGRESS_STATE NOT IN ('APPROVED', 'REJECTED')) AS ongoing_count,

    ROUND(COUNT_IF(est.PROGRESS_STATE = 'APPROVED') / COUNT(*) * 100.0, 2) AS approved_rate_percent,
    ROUND(COUNT_IF(est.PROGRESS_STATE = 'REJECTED') / COUNT(*) * 100.0, 2) AS rejected_rate_percent,
    ROUND(COUNT_IF(est.PROGRESS_STATE NOT IN ('APPROVED', 'REJECTED')) / COUNT(*) * 100.0, 2) AS ongoing_rate_percent

FROM qut_estimate est
JOIN qut_chk_main main
    ON est.SEQ = main.ESTIMATE_ID
GROUP BY 1
```

### 컬럼별 역할

| 컬럼 | 의미 |
|---|---|
| `est.REG_DTTM` | 집계 기준이 되는 견적 등록 일시. `GROUP BY 1`이 이 컬럼 기준으로 데이터를 묶는다 |
| `total_requested_count` | 전체 요청 건수 (`COUNT(*)`) |
| `approved_count` / `rejected_count` | 상태(`PROGRESS_STATE`)가 각각 `APPROVED` / `REJECTED`인 건수 |
| `ongoing_count` | 승인도 반려도 아닌 나머지(대기, 검토 중 등) 건수 |
| `*_rate_percent` | 각 건수를 전체 건수로 나누고 100을 곱해 소수 둘째 자리까지 반올림한 비율 |

`qut_estimate`(견적)와 `qut_chk_main`(검토 이력)을 `est.SEQ = main.ESTIMATE_ID`로 조인해 견적별 검토 상태를 가져오고, `COUNT_IF`로 상태별 건수를 한 번에 뽑아냈다.

### 결과

| 전체 요청 건수 | 승인 건수 | 승인 비율 |
|---|---|---|
| 4.16천 건 | 3.5천 건 | 84% |

---

## 2. 유형(DEAL_GRADE) 별 승인 건수

DMS는 딜을 `FAST_TRACK` / `STANDARD` / `COMPLEX` 세 등급으로 나눠서 검토한다. 등급마다 승인율이 다르게 나오는지 확인했다.

```sql
SELECT
    main.DEAL_GRADE,
    SUM(CASE WHEN est.PROGRESS_STATE = 'APPROVED' THEN 1 ELSE 0 END) AS approval_count,
    COUNT(*) AS request_count,

    ROUND(
        100.0 * SUM(CASE WHEN est.PROGRESS_STATE = 'APPROVED' THEN 1 ELSE 0 END)
        / NULLIF(COUNT(*), 0),
        1
    ) AS approval_rate_pct
FROM qut_estimate AS est
INNER JOIN qut_chk_main AS main
    ON est.SEQ = main.ESTIMATE_ID
WHERE est.REG_DTTM >= '2026-01-01 00:00:00'
GROUP BY main.DEAL_GRADE
ORDER BY
    CASE main.DEAL_GRADE
        WHEN 'FAST_TRACK' THEN 1
        WHEN 'STANDARD' THEN 2
        WHEN 'COMPLEX' THEN 3
        ELSE 4
    END;
```

### 설계 포인트

- **`SUM(CASE WHEN ... THEN 1 ELSE 0 END)` 방식**: 승인 건은 1, 나머지는 0으로 만들어 더하는 구조로, `COUNT(CASE WHEN ... THEN 1 END)`과 결과는 같다.
- **`100.0` 곱셈**: 정수 나눗셈으로 소수점이 버려지는 걸 막기 위해 분자에 실수(`100.0`)를 먼저 곱해, 별도 `CAST` 없이도 자동으로 실수 연산이 되게 했다.
- **`NULLIF(COUNT(*), 0)`**: 전체 건수가 0일 때 발생할 수 있는 0으로 나누기 에러를 방지한다.
- **`ORDER BY CASE`**: `DEAL_GRADE`를 알파벳 순이 아니라 업무적으로 의미 있는 순서(FAST_TRACK → STANDARD → COMPLEX)로 보여주기 위한 장치다.

### 결과

| DEAL_GRADE | 승인율 |
|---|---|
| FAST_TRACK | 88.70% |
| STANDARD | 82.50% |
| COMPLEX | 83.80% |

---

다음 편에서는 사업성검토가 제출부터 완료까지 실제로 며칠이나 걸리는지, 소요시간 쿼리를 다룬다.

---
title: "DMS 사업성검토 마진율, 쿼리로 뜯어보기"
date: 2026-08-23 00:00:00 +0900
categories: [프로젝트, 데이터]
tags: [DMS, Databricks, SQL, 데이터분석, 사업성검토, 포트폴리오]
toc: true
---

## 들어가며

[승인율](/posts/dms-review-approval-rate/), [소요시간](/posts/dms-review-turnaround-time/)에 이어 Sales Cycle Lead Time 분석의 마지막 축인 마진율이다. 마진율은 회사 수익 구조와 직결되는 정보라 다른 두 편과는 마스킹 기준을 다르게 뒀다.

> 이 글에는 실제 계약 내용, 회사명, 금액 등 사내 정보는 담지 않았다. 특히 마진율은 실제 수치를 전혀 신지 않았고, 마진율 계산에 쓰이는 사업모델별 하위 테이블명·컬럼명도 실제 이름 대신 `infra_estimate_type_a`처럼 역할을 알 수 있는 이름으로 바꿔 표기했다. 여기 나오는 로직/구조는 실제와 같지만, 이름은 전부 대체값이다.
{: .prompt-warning }

---

## 1. BM별 마진율 산출 로직

사업성검토 대상 딜은 `BM`(Business Model)에 따라 INFRA / MS / PS / DS 네 가지로 나뉘는데, 마진율이 저장된 테이블이 이 BM마다 전부 다르다. INFRA는 상품 유형이 4가지라 그 안에서도 또 나뉜다.

```sql
SELECT
    base.MAIN_ESTIMATE_SEQ,
    base.DEAL_GRADE,
    base.BM,
    base.MARGIN_FIELD * 100 AS margin_rate
FROM (
    SELECT
        m.ESTIMATE_ID AS MAIN_ESTIMATE_SEQ,
        m.DEAL_GRADE,
        se.BM,
        CASE
            WHEN se.BM = 'INFRA' THEN
                COALESCE(
                    infra_a.MARGIN_FIELD,
                    infra_b.MARGIN_FIELD,
                    infra_c.MARGIN_FIELD,
                    infra_d.MARGIN_FIELD
                )
            WHEN se.BM = 'MS' THEN ms.MARGIN_FIELD
            WHEN se.BM = 'PS' THEN ps.MARGIN_FIELD
            WHEN se.BM = 'DS' THEN ds.MARGIN_FIELD
        END AS MARGIN_FIELD
    FROM qut_chk_main m
    LEFT JOIN qut_estimate e ON m.ESTIMATE_ID = e.SEQ
    LEFT JOIN qut_sub_estimate se ON e.SEQ = se.ESTIMATE_SEQ
    LEFT JOIN infra_estimate_type_a infra_a ON se.SEQ = infra_a.SUB_ESTIMATE_SEQ AND se.BM = 'INFRA'
    LEFT JOIN infra_estimate_type_b infra_b ON se.SEQ = infra_b.SUB_ESTIMATE_ID  AND se.BM = 'INFRA'
    LEFT JOIN infra_estimate_type_c infra_c ON se.SEQ = infra_c.SUB_ESTIMATE_SEQ AND se.BM = 'INFRA'
    LEFT JOIN infra_estimate_type_d infra_d ON se.SEQ = infra_d.INFRA_ESTIMATE_SEQ AND se.BM = 'INFRA'
    LEFT JOIN ms_estimate_detail ms ON se.SEQ = ms.SUB_ESTIMATE_SEQ AND se.BM = 'MS'
    LEFT JOIN ps_estimate_detail ps ON se.SEQ = ps.SUB_ESTIMATE_ID AND se.BM = 'PS'
    LEFT JOIN ds_estimate_detail ds ON se.SEQ = ds.SUB_ESTIMATE_ID AND se.BM = 'DS'
    WHERE m.DEAL_GRADE IN ('FAST_TRACK', 'STANDARD', 'COMPLEX')
      AND e.STATE = 'ACTIVE'
      AND e.PROGRESS_STATE = 'APPROVED'
) base
WHERE base.BM IS NOT NULL
  AND base.MARGIN_FIELD IS NOT NULL
```

### 조인 구조

`qut_chk_main` → `qut_estimate` → `qut_sub_estimate` 순으로 조인해서 `se.BM` 값(사업모델)을 먼저 확보한 뒤, BM별 마진율 상세 테이블 7개(INFRA 4개 + MS/PS/DS 각 1개)를 전부 `LEFT JOIN` 걸어둔다. 각 조인 조건에 `AND se.BM = 'XXX'`가 붙어 있어서, 예를 들어 BM이 `MS`인 행에는 INFRA 관련 테이블들이 아예 매칭되지 않는다. 즉 한 행당 자기 BM에 해당하는 테이블 하나만 값이 채워지고 나머지는 전부 NULL이다.

하나 성가셨던 부분은 조인 키 컬럼명이 테이블마다 제각각이라는 점이었다. 어떤 테이블은 `SUB_ESTIMATE_SEQ`, 어떤 테이블은 `SUB_ESTIMATE_ID`로 이름이 다르고, INFRA 상품 유형 D는 아예 `INFRA_ESTIMATE_SEQ`라는 별개의 이름을 썼다. 값은 전부 같은 하위 견적 SEQ를 가리키는데 이름 규칙이 통일돼 있지 않았다.

### CASE문 — BM에 맞는 마진율 하나 골라내기

```sql
CASE
    WHEN BM = 'INFRA' THEN COALESCE(A값, B값, C값, D값)  -- 4개 중 먼저 값 있는 것
    WHEN BM = 'MS' THEN MS값
    WHEN BM = 'PS' THEN PS값
    WHEN BM = 'DS' THEN DS값
END AS margin_rate
```

INFRA는 하위 상품 유형이 4가지라서 `COALESCE`로 "이 중 값이 있는 걸 우선순위대로 사용"하는 방식이고, MS/PS/DS는 각각 대응하는 견적 상세 테이블 하나에서 바로 가져온다. 마진율 필드의 실제 컬럼명과 정의(월 단위 비율인지, 누적 총액 기준 비율인지 등)도 테이블마다 조금씩 달라서, 최종적으로는 이 값들을 전부 같은 의미(비율)로 맞춰 하나의 컬럼으로 통일해 가져와야 했다.

바깥쪽 쿼리에서 `* 100`을 곱해 소수(비율)를 퍼센트로 바꾸고, BM이나 마진율이 매칭 안 된(NULL) 행은 제외한다.

---

## 2. 이상치 정의: 마진율 -100% 이하

```sql
SELECT ...
FROM (...) base
WHERE base.BM IS NOT NULL
  AND base.margin_rate <= -100
ORDER BY base.margin_rate ASC;
```

마진율이 -100%라는 건 원가가 매출의 두 배를 넘는 손실 수준이라는 뜻이다. 이런 극단치를 평균 계산에 그대로 넣으면 전체 평균이 크게 왜곡되기 때문에, 별도로 걸러서 확인하는 쿼리를 하나 두고, 평균을 낼 때는 이 이상치를 제외하는 조건(`margin_rate > -100`, 소수 기준으로는 `margin_rate > -1`)을 공통으로 사용한다.

---

## 3. 등급별 / 월별 / BM별 집계

기본 골격은 같고, `GROUP BY` 기준만 바뀐다.

- **등급별 평균**: `GROUP BY DEAL_GRADE`, 이상치(`margin_rate > -1`) 제외 후 평균과 건수
- **월별 × 등급별 평균**: `deal_history`에서 `ESTIMATE_COMPLETED` 이력의 월을 뽑아 `INNER JOIN`으로 붙이고, `GROUP BY approved_month, DEAL_GRADE`
- **월별 × BM별 평균**: 위와 같은 구조에서 그룹 기준만 `BM`으로 교체

이 중 눈에 띄는 부분은 건수 집계다.

```sql
COUNT(DISTINCT MAIN_ESTIMATE_SEQ) AS 건수
```

하나의 메인 견적(`MAIN_ESTIMATE_SEQ`)에 하위 견적(`qut_sub_estimate`)이 여러 개 붙어 있을 수 있어서, 단순 `COUNT(*)`로 세면 하위 견적 수만큼 중복 집계된다. 실제 "견적 건수"를 정확히 세려면 `DISTINCT`가 필요했다.

또, 월별 집계 쿼리들은 `qut_estimate`와 승인 완료 이력(`deal_history`)을 `INNER JOIN`으로 묶어서 "해당 연도에 승인 완료 기록이 있는 견적"만 남게 강제한다. `LEFT JOIN`이 아니라 `INNER JOIN`이라, 매칭 안 되는 견적은 통째로 결과에서 빠지는 구조다.

---

## 4. BM별 마진율 상/하위 N건 랭킹

이 쿼리가 이번 모음집에서 가장 트릭이 재밌었다. BM별로 마진율이 가장 높은 건과 가장 낮은 건을 동시에 뽑아서 하나의 결과셋으로 합치는 구조다.

```sql
WITH filtered_data AS (
    SELECT * FROM base_data
    WHERE BM IS NOT NULL AND margin_rate IS NOT NULL AND margin_rate > -100
),
ranked_data AS (
    SELECT
        MAIN_ESTIMATE_SEQ, BM, margin_rate,
        ROW_NUMBER() OVER (PARTITION BY BM ORDER BY margin_rate DESC) AS rank_desc,
        ROW_NUMBER() OVER (PARTITION BY BM ORDER BY margin_rate ASC)  AS rank_asc
    FROM filtered_data
),
expanded_data AS (
    SELECT MAIN_ESTIMATE_SEQ, BM, margin_rate,
           '내림차순' AS 정렬_방향, rank_desc AS 순위,
           margin_rate AS 최종_정렬_순서
    FROM ranked_data

    UNION ALL

    SELECT MAIN_ESTIMATE_SEQ, BM, margin_rate,
           '오름차순' AS 정렬_방향, rank_asc AS 순위,
           (margin_rate * -1) AS 최종_정렬_순서
    FROM ranked_data
)
SELECT * FROM expanded_data;
```

같은 `BM` 안에서 `rank_desc`(마진율 높은 순)와 `rank_asc`(마진율 낮은 순)를 동시에 매긴 뒤, 같은 데이터를 두 번 사용해서(`UNION ALL`) 상위 세트와 하위 세트를 만든다.

핵심은 하위(오름차순) 세트에서 `margin_rate * -1`을 한 것이다. 마진율이 낮을수록(예: -50%) 원래 값은 작은데, `-1`을 곱하면 값이 커진다(50). 그러면 이후 이 데이터를 `최종_정렬_순서` 기준으로 **내림차순 정렬 하나만** 적용해도, "내림차순" 세트는 마진율 높은 건이 위로, "오름차순" 세트는 마진율 낮은(가장 나쁜) 건이 위로 온다. 정렬 방향이 반대인 두 데이터셋을 하나의 정렬 규칙으로 처리할 수 있게 만든 것이다. 대시보드에서는 `정렬_방향` 값으로 상위/하위를 구분해 필터링하고, `순위 <= N` 조건으로 상위 N건/하위 N건을 뽑는다.

---

## 5. 남은 과제

- 마진 관련 필드(월 단위 비율, 누적 총액 기준 비율 등)가 테이블마다 산출 기준과 이름이 달라서, 정확한 "마진율" 정의와 데이터 정합성에 대한 추가 검토가 필요하다는 게 이번에 정리하며 확인된 부분이다. 당장은 값이 존재하는 필드를 우선순위대로 가져오는 `COALESCE` 방식으로 처리했지만, 근본적으로는 마진 관련 필드를 하나의 기준으로 통일하는 작업이 별도로 필요하다.
- 이 글에서 다룬 실제 마진율 수치와 등급별/사업모델별 추이는 사내 대시보드에만 반영했다.

---

Sales Cycle Lead Time 분석은 승인율 → 소요시간 → 마진율 세 편으로 마무리한다. 세 지표를 한 번에 조인해서 보는 통합 쿼리는 아직 만들지 않았는데, 필요해지면 후속 글로 정리할 계획이다.

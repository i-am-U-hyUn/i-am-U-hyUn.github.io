---
title: "DMS 사업성검토 소요시간, 쿼리로 뜯어보기"
date: 2026-08-22 00:00:00 +0900
categories: [프로젝트, 데이터]
tags: [DMS, Databricks, SQL, 데이터분석, 사업성검토, 포트폴리오]
toc: true
---

## 들어가며

[지난 글](/posts/dms-review-approval-rate/)에서는 사업성검토 승인율을 봤다. 이번엔 같은 요청(Sales Cycle Lead Time 분석)의 두 번째 축, "제출부터 완료까지 실제로 며칠 걸리는가"다. 이 글은 실제 결과 수치 대신 쿼리를 어떻게 설계했는지에 집중해서 정리한다.

> 이 글에는 실제 계약 내용, 회사명, 금액 등 사내 정보는 담지 않았다. 테이블명은 구조 설명을 위해 남겼고, 카탈로그·스키마 식별자는 제외했다.
{: .prompt-warning }

---

## 1. 전체 평균 검토 소요일

```sql
SELECT
    ROUND(
        AVG(TIMESTAMPDIFF(SECOND, CAST(s.SUBMITTED_DTTM AS TIMESTAMP), CAST(c.COMPLETED_DTTM AS TIMESTAMP))) / 86400.0, 2
    ) AS OVERALL_DAY_AVG
FROM qut_estimate AS est

-- 제출(Submitted) 일시
INNER JOIN (
    SELECT TARGET_SEQ, MAX(REG_DTTM) AS SUBMITTED_DTTM
    FROM deal_history
    WHERE STATE = 'ESTIMATE_SUBMITTED' AND REG_DTTM >= '2026-01-01'
    GROUP BY TARGET_SEQ
) s ON s.TARGET_SEQ = est.SEQ

-- 완료(Completed) 일시
INNER JOIN (
    SELECT TARGET_SEQ, MAX(REG_DTTM) AS COMPLETED_DTTM
    FROM deal_history
    WHERE STATE = 'ESTIMATE_COMPLETED'
    GROUP BY TARGET_SEQ
) c ON c.TARGET_SEQ = est.SEQ

-- 유효 견적 조건 및 완료 시점 검증
WHERE est.STATE != 'INVALID'
    AND est.PROGRESS_STATE = 'APPROVED'
    AND c.COMPLETED_DTTM > s.SUBMITTED_DTTM
    AND NOT EXISTS (
        SELECT 1
        FROM qut_estimate AS sub
        WHERE sub.PRE_SEQ = est.SEQ
    );
```

`deal_history`(견적 상태 변화 이력)에서 견적별 가장 최근 제출 시점과 완료 시점을 각각 서브쿼리로 뽑아 `qut_estimate`에 조인했다. `MAX(REG_DTTM)`을 쓴 건 같은 상태가 여러 번 기록될 가능성에 대비한 것이다.

`WHERE` 절은 분석 대상에 진짜 유효한 견적만 남기는 조건이다.

| 조건 | 의미 |
|---|---|
| `est.STATE != 'INVALID'` | 무효 처리된 견적 제외 |
| `est.PROGRESS_STATE = 'APPROVED'` | 승인 완료된 견적만 |
| `c.COMPLETED_DTTM > s.SUBMITTED_DTTM` | 완료가 제출보다 이후인 데이터만 |
| `NOT EXISTS (... sub.PRE_SEQ = est.SEQ)` | 이 견적을 대체하는 더 새 버전이 없을 것(최종 버전만) |

견적은 수정될 때마다 새 버전(SEQ)이 생기고, 새 버전이 `PRE_SEQ`에 직전 버전의 SEQ를 저장하는 구조다. `NOT EXISTS`로 "나를 이전 버전으로 지목하는 더 새 견적이 있는가"를 확인해, 버전 체인의 맨 끝(최종 버전)만 남긴다.

---

## 2. 월별 평균 검토 소요일

```sql
WITH valid_estimates AS (
    SELECT est.SEQ AS EST_SEQ
    FROM qut_estimate AS est
    WHERE est.STATE != 'INVALID'
        AND est.PROGRESS_STATE = 'APPROVED'
        AND EXISTS (
            SELECT 1 FROM qut_chk_main AS chk
            WHERE chk.ESTIMATE_ID = est.SEQ
        )
        AND NOT EXISTS (
            SELECT 1 FROM qut_estimate AS sub
            WHERE sub.PRE_SEQ = est.SEQ
        )
),
deal_timestamps AS (
    SELECT
        TARGET_SEQ,
        MAX(CASE WHEN STATE = 'ESTIMATE_SUBMITTED' THEN CAST(REG_DTTM AS TIMESTAMP) END) AS SUBMITTED_DTTM,
        MAX(CASE WHEN STATE = 'ESTIMATE_COMPLETED' THEN CAST(REG_DTTM AS TIMESTAMP) END) AS COMPLETED_DTTM
    FROM deal_history
    WHERE STATE IN ('ESTIMATE_SUBMITTED', 'ESTIMATE_COMPLETED')
    GROUP BY TARGET_SEQ
)
SELECT
    DATE_FORMAT(d.SUBMITTED_DTTM, 'yyyy-MM') AS REG_MONTH,
    ROUND(
        AVG(TIMESTAMPDIFF(SECOND, d.SUBMITTED_DTTM, d.COMPLETED_DTTM)) / 86400.0,
        2
    ) AS MONTH_DAY_AVG
FROM valid_estimates e
INNER JOIN deal_timestamps d
    ON d.TARGET_SEQ = e.EST_SEQ
WHERE CAST(d.SUBMITTED_DTTM AS DATE) BETWEEN :date_range.min AND :date_range.max
    AND d.COMPLETED_DTTM > d.SUBMITTED_DTTM
GROUP BY 1
ORDER BY REG_MONTH ASC;
```

`:date_range.min` / `:date_range.max`는 바인드 변수로, SQL 뼈대와 실제 조회 기간 값을 분리해서 실행 시점에 값을 채워 넣는 방식이다.

### `valid_estimates`에서 `EXISTS`를 쓴 이유

`qut_chk_main`은 견적 1건당 체크(검토) 이력이 여러 건일 수 있는 1:N 테이블이다. 이걸 `JOIN`으로 붙이면 체크 이력 건수만큼 견적이 중복 카운트돼 평균이 왜곡된다. `EXISTS`는 존재 여부만 boolean으로 판단하므로 "견적 1건 = 결과 1행"이 보장된다.

### `deal_timestamps`에서 조건부 집계(pivot)를 쓴 이유

`deal_history`는 딜의 상태 변화 이력이 계속 쌓이는 테이블이라, 제출/완료 시각이 서로 다른 행에 들어 있다. 이걸 상태별로 서브쿼리를 나눠 조인하면 같은 테이블을 두 번 스캔하게 된다. `MAX(CASE WHEN STATE = 'X' THEN REG_DTTM END)`으로 감싸는 조건부 집계 패턴을 쓰면 `GROUP BY TARGET_SEQ` 한 번으로 제출/완료 시각을 한 행에 나란히 뽑아, 대용량 이력 테이블 스캔 비용을 절반으로 줄일 수 있다.

### 날짜 필터를 완료일이 아닌 제출일 기준으로 건 이유

완료일 기준으로 필터링하면 그 기간에 접수됐지만 아직 완료되지 않은 건들이 통째로 누락돼 "평균 소요일이 실제보다 짧게" 나오는 착시가 생길 수 있다. 제출일 기준이 그 기간에 들어온 견적들의 실제 처리 소요 분포를 더 정확히 반영한다.

### 전제 조건 및 데이터 가정 (인수인계 시 주의)

- `qut_estimate.PRE_SEQ`가 "이전 버전 견적의 SEQ"를 의미한다는 가정 하에 최신 버전 필터링 로직이 짜여 있다. 데이터 모델이 바뀌면 재검토가 필요하다.
- `deal_history.TARGET_SEQ`가 `qut_estimate.SEQ`와 1:1 매핑된다는 전제로 조인돼 있다.
- 완료되지 않은(진행 중인) 견적은 평균 계산에서 자동 제외되고, 별도의 '미완료 건수' 집계는 이 쿼리에 없다.

---

## 3. 월별 × 유형별 평균 검토 소요일

```sql
WITH final_approved_estimates AS (
    SELECT
        e.SEQ AS ESTIMATE_SEQ,
        c.DEAL_GRADE AS DEAL_GRADE
    FROM qut_estimate AS e
    JOIN qut_chk_main AS c
        ON c.ESTIMATE_ID = e.SEQ
    WHERE e.STATE != 'INVALID'
        AND e.PROGRESS_STATE = 'APPROVED'
        AND NOT EXISTS (
            SELECT 1 FROM qut_estimate AS newer
            WHERE newer.PRE_SEQ = e.SEQ
        )
),
deal_milestones AS (
    SELECT
        TARGET_SEQ,
        MAX(CASE WHEN STATE = 'ESTIMATE_SUBMITTED' THEN REG_DTTM END) AS SUBMITTED_DTTM,
        MAX(CASE WHEN STATE = 'ESTIMATE_COMPLETED' THEN REG_DTTM END) AS COMPLETED_DTTM
    FROM deal_history
    WHERE STATE IN ('ESTIMATE_SUBMITTED', 'ESTIMATE_COMPLETED')
    GROUP BY TARGET_SEQ
)
SELECT
    fae.DEAL_GRADE,
    DATE_FORMAT(CAST(dm.SUBMITTED_DTTM AS TIMESTAMP), 'yyyy-MM') AS REG_MONTH,
    ROUND(
        AVG(TIMESTAMPDIFF(SECOND, dm.SUBMITTED_DTTM, dm.COMPLETED_DTTM)) / 86400.0,
        2
    ) AS MONTH_DAY_AVG
FROM final_approved_estimates AS fae
JOIN deal_milestones AS dm ON dm.TARGET_SEQ = fae.ESTIMATE_SEQ
WHERE CAST(dm.SUBMITTED_DTTM AS DATE) BETWEEN :date_range.min AND :date_range.max
    AND dm.COMPLETED_DTTM > dm.SUBMITTED_DTTM
GROUP BY fae.DEAL_GRADE, REG_MONTH
ORDER BY
    CASE fae.DEAL_GRADE
        WHEN 'FAST_TRACK' THEN 1
        WHEN 'STANDARD' THEN 2
        WHEN 'COMPLEX' THEN 3
        ELSE 4
    END,
    REG_MONTH;
```

앞의 두 쿼리를 합친 구조다. `final_approved_estimates`(대상 견적 + 등급)와 `deal_milestones`(제출/완료 시각)를 각각 만든 뒤 조인해서 등급 × 월 조합별로 집계한다.

```text
final_approved_estimates  ─┐
                            ├─▶  메인 SELECT (조인 → 집계 → 정렬)
deal_milestones           ─┘
```

`newer`는 `qut_estimate`를 두 번째로 참조하기 위한 별칭일 뿐 서브쿼리 밖에서는 쓰이지 않는다. `qut_chk_main`과의 조인은 이 견적이 속한 `DEAL_GRADE`를 가져오기 위한 것이다.

---

## 4. 유형별 검토 소요 시간 상세 (평균/최대/최소/중앙값)

```sql
WITH final_approved_estimates AS (
    SELECT
        e.SEQ AS ESTIMATE_SEQ,
        c.DEAL_GRADE AS DEAL_GRADE
    FROM qut_estimate AS e
    JOIN qut_chk_main AS c
        ON c.ESTIMATE_ID = e.SEQ
    WHERE e.STATE != 'INVALID'
        AND e.PROGRESS_STATE = 'APPROVED'
        AND NOT EXISTS (
            SELECT 1 FROM qut_estimate AS newer
            WHERE newer.PRE_SEQ = e.SEQ
        )
),
deal_milestones AS (
    SELECT
        TARGET_SEQ,
        MAX(CASE WHEN STATE = 'ESTIMATE_SUBMITTED' THEN REG_DTTM END) AS SUBMITTED_DTTM,
        MAX(CASE WHEN STATE = 'ESTIMATE_COMPLETED' THEN REG_DTTM END) AS COMPLETED_DTTM
    FROM deal_history
    WHERE STATE IN ('ESTIMATE_SUBMITTED', 'ESTIMATE_COMPLETED')
    GROUP BY TARGET_SEQ
),
deal_durations AS (
    SELECT
        fae.DEAL_GRADE,
        TIMESTAMPDIFF(SECOND, dm.SUBMITTED_DTTM, dm.COMPLETED_DTTM) AS DURATION_SEC
    FROM final_approved_estimates AS fae
    JOIN deal_milestones AS dm ON dm.TARGET_SEQ = fae.ESTIMATE_SEQ
    WHERE dm.SUBMITTED_DTTM >= DATE '2026-01-01'
        AND dm.COMPLETED_DTTM >= dm.SUBMITTED_DTTM
)
SELECT
    DEAL_GRADE,
    ROUND(AVG(DURATION_SEC) / 86400.0, 2) AS DAY_AVG,
    ROUND(MAX(DURATION_SEC) / 86400.0, 2) AS DAY_MAX,
    ROUND(MIN(DURATION_SEC) / 86400.0, 2) AS DAY_MIN,
    ROUND(MEDIAN(DURATION_SEC) / 86400.0, 2) AS DAY_MEDIAN
FROM deal_durations
GROUP BY DEAL_GRADE
ORDER BY
    CASE DEAL_GRADE
        WHEN 'FAST_TRACK' THEN 1
        WHEN 'STANDARD' THEN 2
        WHEN 'COMPLEX' THEN 3
        ELSE 4
    END;
```

앞의 CTE 두 개(`final_approved_estimates`, `deal_milestones`)로 준비 작업을 끝내고, `deal_durations`에서 견적 하나당 소요 시간을 초 단위 숫자(`DURATION_SEC`) 하나로 정리해둔다. 이렇게 숫자 하나로 정리해두면, 이후 단계에서는 이 숫자를 평균/최대/최소/중앙값 네 가지 방식으로 집계만 하면 된다 — 네 컬럼 모두 `/86400.0` 변환과 `ROUND(..., 2)`는 동일하고 집계 함수만 다르다. `MEDIAN`을 따로 뽑은 건 평균이 극단값(아주 오래 걸린 몇 건)에 끌려가는 걸 보완하기 위해서다.

---

## 5. 유형별 최대 소요 시간 건 상세

```sql
WITH final_approved_estimates AS (
    SELECT
        e.SEQ AS ESTIMATE_SEQ,
        e.DEAL_SEQ AS DEAL_SEQ,
        c.DEAL_GRADE AS DEAL_GRADE
    FROM qut_estimate AS e
    JOIN qut_chk_main AS c
        ON c.ESTIMATE_ID = e.SEQ
    WHERE e.STATE != 'INVALID'
        AND e.PROGRESS_STATE = 'APPROVED'
        AND NOT EXISTS (
            SELECT 1 FROM qut_estimate AS newer
            WHERE newer.PRE_SEQ = e.SEQ
        )
),
deal_milestones AS (
    SELECT
        TARGET_SEQ,
        MAX(CASE WHEN STATE = 'ESTIMATE_SUBMITTED' THEN REG_DTTM END) AS SUBMITTED_DTTM,
        MAX(CASE WHEN STATE = 'ESTIMATE_COMPLETED' THEN REG_DTTM END) AS COMPLETED_DTTM
    FROM deal_history
    WHERE STATE IN ('ESTIMATE_SUBMITTED', 'ESTIMATE_COMPLETED')
    GROUP BY TARGET_SEQ
),
deal_durations AS (
    SELECT
        fae.DEAL_GRADE, fae.ESTIMATE_SEQ, fae.DEAL_SEQ,
        dm.SUBMITTED_DTTM, dm.COMPLETED_DTTM,
        TIMESTAMPDIFF(SECOND, dm.SUBMITTED_DTTM, dm.COMPLETED_DTTM) AS DURATION_SEC
    FROM final_approved_estimates AS fae
    JOIN deal_milestones AS dm ON dm.TARGET_SEQ = fae.ESTIMATE_SEQ
    WHERE dm.SUBMITTED_DTTM >= DATE '2026-01-01'
        AND dm.COMPLETED_DTTM > dm.SUBMITTED_DTTM
),
ranked_durations AS (
    SELECT
        DEAL_GRADE, ESTIMATE_SEQ, DEAL_SEQ, SUBMITTED_DTTM, COMPLETED_DTTM, DURATION_SEC,
        ROW_NUMBER() OVER (PARTITION BY DEAL_GRADE ORDER BY DURATION_SEC DESC, ESTIMATE_SEQ DESC) AS RN
    FROM deal_durations
)
SELECT
    r.DEAL_GRADE,
    '최대' AS RECORD_TYPE,
    r.ESTIMATE_SEQ AS EST_SEQ,
    r.DEAL_SEQ,
    (
        SELECT ARRAY_JOIN(COLLECT_LIST(DISTINCT c.CNTRCT_NO), ', ')
        FROM cnt_main_cntrct AS c
        WHERE c.ESTIMATE_SEQ = r.ESTIMATE_SEQ
    ) AS CNTRCT_NO,
    CAST(r.SUBMITTED_DTTM - INTERVAL 9 HOURS AS DATE) AS REG_DTTM,
    CAST(r.COMPLETED_DTTM - INTERVAL 9 HOURS AS DATE) AS MOD_DTTM,
    ROUND(r.DURATION_SEC / 86400.0, 2) AS DURATION_DAYS,
    ROUND(r.DURATION_SEC / 3600.0, 1) AS DURATION_HOURS,
    ROUND(r.DURATION_SEC / 60.0, 0) AS DURATION_MINUTES
FROM ranked_durations AS r
WHERE r.RN = 1
ORDER BY
    CASE r.DEAL_GRADE
        WHEN 'FAST_TRACK' THEN 1
        WHEN 'STANDARD' THEN 2
        WHEN 'COMPLEX' THEN 3
        ELSE 4
    END;
```

등급별로 소요 시간이 가장 긴 건 하나씩(`ROW_NUMBER() OVER (PARTITION BY DEAL_GRADE ORDER BY DURATION_SEC DESC) = 1`)을 뽑아, 상관 서브쿼리로 계약번호(`CNTRCT_NO`)까지 붙이고 일/시간/분 단위로 변환해서 보여주는 쿼리다.

- **`CNTRCT_NO` 상관 서브쿼리**: `JOIN` + `GROUP BY` 없이, 각 행마다 해당 견적에 연결된 계약번호를 `COLLECT_LIST(DISTINCT ...)`로 모아 문자열 하나로 합친다.
- **`- INTERVAL 9 HOURS`**: 저장된 시각이 UTC라서, 날짜만 추출하기 전에 KST로 보정한 것이다.
- **`RECORD_TYPE`, `EST_SEQ` 별칭**: 이 쿼리 로직상 필요한 값은 아니지만, 이 결과를 가져다 쓰는 다운스트림(대시보드)과의 호환을 위해 남겨둔 것이다.

결과 형태는 대략 이런 모양이 된다 (아래는 형태를 보여주기 위한 예시이며 실제 값이 아니다):

| DEAL_GRADE | CNTRCT_NO | DURATION_DAYS |
|---|---|---|
| FAST_TRACK | CNTR-2026-XXXX | (예시) |
| STANDARD | CNTR-2026-XXXX, CNTR-2026-YYYY | (예시) |
| COMPLEX | CNTR-2026-XXXX | (예시) |

---

다음 편에서는 사업모델(BM)별 마진율을 다룬다. 실제 마진율 수치는 회사 수익 구조와 직결되는 정보라 공개하지 않고, 테이블/컬럼명도 추가로 추상화해서 "어떻게 계산했는지"만 정리한다.

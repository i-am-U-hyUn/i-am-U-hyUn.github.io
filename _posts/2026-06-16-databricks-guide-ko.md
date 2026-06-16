---
title: "Databricks 실전 가이드 — 처음 시작하는 사람을 위한 핵심 정리"
date: 2026-06-16 01:00:00 +0900
categories: [공부, 데이터]
tags: [Databricks, Lakehouse, Delta Lake, Spark, MLflow, SQL, 데이터엔지니어링]
toc: true
---

> 이 포스트는 Databricks를 처음 접하는 사람이 빠르게 전체 그림을 잡고, 실제로 써먹을 수 있도록 정리한 실전 가이드다.
> Medallion Architecture 개념은 [이전 포스트](/posts/databricks-medallion-architecture-ko/)를 참고하자.

---

## Databricks란?

**Databricks**는 Apache Spark 기반의 통합 데이터 + AI 플랫폼이다. 데이터 엔지니어링, 데이터 분석, 머신러닝을 하나의 플랫폼에서 처리할 수 있다.

핵심 개념은 **Lakehouse**: 데이터 레이크(저렴한 저장)와 데이터 웨어하우스(신뢰할 수 있는 분석)의 장점을 합친 아키텍처다.

| 전통 아키텍처 | Lakehouse (Databricks) |
|---|---|
| Data Lake + Data Warehouse 분리 | 하나의 플랫폼에서 통합 |
| 데이터 이중 저장, 동기화 비용 | 단일 저장소, 비용 절감 |
| 배치 중심 | 배치 + 스트리밍 동시 지원 |
| SQL or Python | SQL + Python + Scala + R |

---

## 1. 클러스터 (Compute)

Databricks에서 모든 작업은 **클러스터** 위에서 실행된다. 어떤 클러스터를 선택하느냐에 따라 비용과 성능이 달라진다.

### 클러스터 종류

| 종류 | 용도 | 특징 |
|---|---|---|
| **Serverless** | 노트북, 워크플로우 | 자동 스케일링, 인프라 관리 불필요 |
| **All-Purpose Cluster** | 대화형 개발/탐색 | 여러 사용자 공유 가능, 비용 높음 |
| **Job Cluster** | 자동화된 파이프라인 실행 | 작업 시작/종료 시 자동 생성/삭제 |
| **SQL Warehouse** | SQL 쿼리, BI 대시보드 | SQL 최적화, Photon 엔진 사용 |

### 비용 절감 팁

> 클러스터는 사용하지 않을 때 반드시 종료하자. **Auto Termination** 설정을 꼭 활성화해야 한다.

- Job Cluster는 실행 후 자동 삭제되므로 가장 경제적
- Serverless는 초 단위 과금이라 짧은 작업에 유리
- All-Purpose는 개발 중에만 켜두고, 완료 후 종료

---

## 2. 노트북 (Notebooks)

Databricks 노트북은 **Python, SQL, Scala, R**을 한 파일에서 혼용할 수 있다. 협업, 버전 관리, 시각화가 내장되어 있다.

### 언어 전환 — Magic Commands

셀 맨 첫 줄에 `%언어명`을 쓰면 해당 셀의 언어를 바꿀 수 있다.

```python
# 기본 언어가 Python인 노트북에서 SQL 실행
%sql
SELECT * FROM my_table LIMIT 10
```

```python
# 마크다운으로 문서 작성
%md
## 이 섹션은 데이터 탐색 단계입니다.
```

```python
# 셸 명령어 실행
%sh
pip list | grep pandas
```

### 유용한 단축키

| 단축키 | 동작 |
|---|---|
| `Shift + Enter` | 셀 실행 후 다음 셀로 이동 |
| `Ctrl + Enter` | 셀 실행 (현재 셀 유지) |
| `Esc → B` | 아래에 새 셀 추가 |
| `Esc → D, D` | 셀 삭제 |
| `Ctrl + Z` | 실행 취소 |

### dbutils — 파일/시크릿 관리

```python
# DBFS 파일 목록 확인
dbutils.fs.ls("/databricks-datasets/")

# 위젯으로 파라미터 받기
dbutils.widgets.text("table_name", "default_table", "테이블 이름")
table = dbutils.widgets.get("table_name")

# Secrets (API 키, 비밀번호 등)
token = dbutils.secrets.get(scope="my-scope", key="api-token")
```

---

## 3. Delta Lake — 데이터의 신뢰성

Delta Lake는 Databricks의 **기본 저장 포맷**이다. 일반 Parquet에 트랜잭션 로그를 더해 ACID 보장, Time Travel, 스키마 강제 등을 제공한다.

### 테이블 생성

```sql
-- SQL로 Delta 테이블 생성
CREATE TABLE IF NOT EXISTS sales (
  order_id    BIGINT,
  customer_id BIGINT,
  amount      DOUBLE,
  order_date  DATE
)
USING DELTA
LOCATION '/mnt/datalake/gold/sales';
```

```python
# PySpark로 Delta 테이블 쓰기
df.write \
  .format("delta") \
  .mode("overwrite") \
  .saveAsTable("my_catalog.my_schema.sales")
```

### MERGE INTO — Upsert 핵심 명령어

```sql
-- 소스 데이터를 기존 테이블에 Upsert
MERGE INTO target_table AS t
USING source_table AS s
ON t.order_id = s.order_id
WHEN MATCHED THEN
  UPDATE SET t.amount = s.amount, t.order_date = s.order_date
WHEN NOT MATCHED THEN
  INSERT (order_id, customer_id, amount, order_date)
  VALUES (s.order_id, s.customer_id, s.amount, s.order_date);
```

> Medallion Architecture에서 Bronze → Silver 정제 시 `MERGE INTO`를 자주 쓴다. 중복 없이 최신 상태를 유지할 수 있다.

### Time Travel — 과거 데이터 조회

```sql
-- 버전으로 조회
SELECT * FROM sales VERSION AS OF 3;

-- 시간으로 조회
SELECT * FROM sales TIMESTAMP AS OF '2026-06-01 00:00:00';

-- 테이블 변경 이력 확인
DESCRIBE HISTORY sales;
```

```python
# PySpark로 Time Travel
df_old = spark.read \
  .format("delta") \
  .option("versionAsOf", 2) \
  .load("/mnt/datalake/gold/sales")
```

### 유용한 Delta 명령어 모음

```sql
-- 테이블 최적화 (작은 파일 병합)
OPTIMIZE sales ZORDER BY (customer_id);

-- 오래된 버전 파일 삭제 (기본 7일 이전)
VACUUM sales;

-- 스키마 정보 확인
DESCRIBE DETAIL sales;

-- 테이블 통계
ANALYZE TABLE sales COMPUTE STATISTICS;
```

---

## 4. Databricks SQL

SQL Warehouse를 통해 BI 도구처럼 SQL만으로 데이터를 탐색하고 대시보드를 만들 수 있다.

### SQL Editor 활용

```sql
-- Unity Catalog 3-Level Namespace
SELECT *
FROM my_catalog.my_schema.my_table
LIMIT 100;

-- 카탈로그/스키마 목록 확인
SHOW CATALOGS;
SHOW SCHEMAS IN my_catalog;
SHOW TABLES IN my_catalog.my_schema;
```

### 자주 쓰는 SQL 패턴

```sql
-- 날짜별 집계
SELECT
  DATE_TRUNC('month', order_date) AS month,
  SUM(amount)                     AS total_sales,
  COUNT(DISTINCT customer_id)     AS unique_customers
FROM sales
WHERE order_date >= '2026-01-01'
GROUP BY 1
ORDER BY 1;

-- 윈도우 함수로 순위
SELECT
  customer_id,
  amount,
  RANK() OVER (PARTITION BY DATE_TRUNC('month', order_date)
               ORDER BY amount DESC) AS monthly_rank
FROM sales;

-- CTE로 가독성 높이기
WITH monthly_sales AS (
  SELECT DATE_TRUNC('month', order_date) AS month, SUM(amount) AS total
  FROM sales
  GROUP BY 1
),
ranked AS (
  SELECT *, LAG(total) OVER (ORDER BY month) AS prev_total
  FROM monthly_sales
)
SELECT month, total, ROUND((total - prev_total) / prev_total * 100, 2) AS growth_rate
FROM ranked;
```

---

## 5. Workflows — 파이프라인 자동화

Databricks Workflows(Jobs)는 노트북, Python 스크립트, SQL, 파이프라인 등을 **스케줄링하고 오케스트레이션**하는 도구다.

### Job 구성 요소

```
Job
├── Task 1: Bronze 적재 (Notebook)
│       ↓
├── Task 2: Silver 정제 (Notebook)  
│       ↓
└── Task 3: Gold 집계 (SQL)
```

### 스케줄 설정 예시

| 유형 | 예시 |
|---|---|
| 매일 오전 2시 | `0 2 * * *` |
| 매주 월요일 | `0 9 * * 1` |
| 매시간 | `0 * * * *` |
| 새 파일 도착 시 | File Arrival Trigger |

### 태스크 간 파라미터 전달

```python
# Task 1에서 값 저장
dbutils.jobs.taskValues.set(key="processed_count", value=1234)

# Task 2에서 값 읽기
count = dbutils.jobs.taskValues.get(
    taskKey="task_1_key",
    key="processed_count"
)
```

---

## 6. MLflow — 모델 실험 관리

Databricks에는 MLflow가 기본 내장되어 있다. 실험 파라미터, 메트릭, 모델을 자동으로 추적한다.

### 실험 추적 기본 패턴

```python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

mlflow.set_experiment("/Users/me/my-experiment")

with mlflow.start_run(run_name="rf_baseline"):
    # 파라미터 로깅
    mlflow.log_param("n_estimators", 100)
    mlflow.log_param("max_depth", 5)

    # 모델 학습
    model = RandomForestClassifier(n_estimators=100, max_depth=5)
    model.fit(X_train, y_train)

    # 메트릭 로깅
    acc = accuracy_score(y_test, model.predict(X_test))
    mlflow.log_metric("accuracy", acc)

    # 모델 저장
    mlflow.sklearn.log_model(model, "random_forest_model")

print(f"Accuracy: {acc:.4f}")
```

### 모델 레지스트리 등록

```python
# 실험에서 좋은 모델을 레지스트리에 등록
model_uri = f"runs:/{run_id}/random_forest_model"
mlflow.register_model(model_uri, "MyProductionModel")
```

---

## 7. 전체 플로우 요약

실제 데이터 프로젝트에서 Databricks를 어떻게 쓰는지 전체 흐름을 정리하면:

```
1. 데이터 수집
   외부 소스 → DBFS / Cloud Storage (S3, ADLS 등)

2. Bronze 적재 (Notebook or Auto Loader)
   raw 파일 → Delta Table (Bronze)

3. Silver 정제 (Notebook + MERGE INTO)
   Bronze → 중복제거 + 표준화 → Delta Table (Silver)

4. Gold 집계 (SQL or Notebook)
   Silver → 비즈니스 로직 → Delta Table (Gold)

5. 분석 / 시각화
   Gold → SQL Warehouse → Dashboard / BI Tool

6. ML (선택)
   Gold → Feature Engineering → MLflow → Model Serving
```

---

## 자주 쓰는 명령어 치트시트

```python
# ─── DataFrame 기본 ───────────────────────────────
df = spark.read.format("delta").load("/path/to/table")
df = spark.table("catalog.schema.table")
df.show(10)
df.printSchema()
df.count()

# ─── 변환 ─────────────────────────────────────────
from pyspark.sql import functions as F

df2 = df.select("col1", "col2") \
        .filter(F.col("amount") > 0) \
        .withColumn("year", F.year("order_date")) \
        .groupBy("year") \
        .agg(F.sum("amount").alias("total"))

# ─── 저장 ─────────────────────────────────────────
df2.write.format("delta").mode("overwrite").saveAsTable("gold.summary")
df2.write.format("delta").mode("append").save("/mnt/lake/gold/summary")
```

```sql
-- ─── SQL 치트시트 ────────────────────────────────
SHOW TABLES IN catalog.schema;
DESCRIBE TABLE catalog.schema.my_table;
DESCRIBE HISTORY catalog.schema.my_table;

OPTIMIZE catalog.schema.my_table ZORDER BY (id);
VACUUM catalog.schema.my_table RETAIN 168 HOURS;

-- 파티션 확인
SHOW PARTITIONS catalog.schema.my_table;
```

---

## 마치며

Databricks는 처음엔 기능이 너무 많아 어디서 시작해야 할지 막막하다. 하지만 핵심은 단순하다.

1. **클러스터** 켜고
2. **노트북**에서 데이터 탐색하고
3. **Delta Lake**에 저장하고
4. **Workflow**로 자동화하고
5. **SQL**로 분석하는 것

그 위에 MLflow, Unity Catalog 등이 얹히는 구조다. 하나씩 써보면서 감을 잡는 게 가장 빠른 길이다.

> "AI가 자동화해줘도, 데이터를 직접 보고 SQL로 쿼리해보는 감각은 스스로 길러야 한다."

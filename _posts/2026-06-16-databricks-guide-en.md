---
title: "Databricks Practical Guide — Everything You Need to Get Started"
date: 2026-06-16 01:01:00 +0900
categories: [Study, Data]
tags: [Databricks, Lakehouse, Delta Lake, Spark, MLflow, SQL, Data Engineering]
toc: true
---

> This post is a practical guide for anyone new to Databricks — covering the full picture so you can get things done quickly.
> For the Medallion Architecture concept, see [this post](/posts/databricks-medallion-architecture-en/).

---

## What is Databricks?

**Databricks** is a unified data and AI platform built on Apache Spark. It brings data engineering, data analytics, and machine learning together under one roof.

The core concept is the **Lakehouse**: an architecture that combines the affordability of a data lake with the reliability and performance of a data warehouse.

| Traditional Architecture | Lakehouse (Databricks) |
|---|---|
| Data Lake + Warehouse separated | Unified platform |
| Duplicate storage, sync overhead | Single store, lower cost |
| Batch-centric | Batch + streaming simultaneously |
| SQL or Python | SQL + Python + Scala + R |

---

## 1. Compute (Clusters)

Every workload in Databricks runs on a **cluster**. Picking the right type matters for both performance and cost.

### Cluster Types

| Type | Use Case | Key Trait |
|---|---|---|
| **Serverless** | Notebooks, workflows | Auto-scales, no infra management |
| **All-Purpose Cluster** | Interactive dev / exploration | Shareable, but higher cost |
| **Job Cluster** | Automated pipelines | Created on start, deleted on finish |
| **SQL Warehouse** | SQL queries, BI dashboards | SQL-optimized, powered by Photon |

### Cost-Saving Tips

> Always terminate clusters when not in use. Enable **Auto Termination** on every All-Purpose cluster.

- Job clusters auto-delete after the run — most cost-efficient for pipelines
- Serverless bills per second, great for short burst workloads
- Keep All-Purpose clusters on only while actively developing

---

## 2. Notebooks

Databricks notebooks let you mix **Python, SQL, Scala, and R** in a single file. Collaboration, version control, and visualization are all built in.

### Language Switching — Magic Commands

Add `%language` as the first line of any cell to override the notebook's default language.

```python
# Switch to SQL in a Python notebook
%sql
SELECT * FROM my_table LIMIT 10
```

```python
# Write markdown documentation inline
%md
## This section covers data exploration.
```

```python
# Run shell commands
%sh
pip list | grep pandas
```

### Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Shift + Enter` | Run cell and move to next |
| `Ctrl + Enter` | Run cell (stay in place) |
| `Esc → B` | Insert cell below |
| `Esc → D, D` | Delete cell |
| `Ctrl + Z` | Undo |

### dbutils — Files, Widgets, and Secrets

```python
# Browse DBFS
dbutils.fs.ls("/databricks-datasets/")

# Create an input widget for parameterized notebooks
dbutils.widgets.text("table_name", "default_table", "Table Name")
table = dbutils.widgets.get("table_name")

# Retrieve secrets (API keys, passwords, etc.)
token = dbutils.secrets.get(scope="my-scope", key="api-token")
```

---

## 3. Delta Lake — Reliable Data Storage

Delta Lake is the **default storage format** in Databricks. It adds a transaction log on top of Parquet, giving you ACID guarantees, Time Travel, and schema enforcement out of the box.

### Creating Tables

```sql
-- Create a Delta table with SQL
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
# Write a Delta table with PySpark
df.write \
  .format("delta") \
  .mode("overwrite") \
  .saveAsTable("my_catalog.my_schema.sales")
```

### MERGE INTO — The Upsert Workhorse

```sql
-- Upsert source data into an existing table
MERGE INTO target_table AS t
USING source_table AS s
ON t.order_id = s.order_id
WHEN MATCHED THEN
  UPDATE SET t.amount = s.amount, t.order_date = s.order_date
WHEN NOT MATCHED THEN
  INSERT (order_id, customer_id, amount, order_date)
  VALUES (s.order_id, s.customer_id, s.amount, s.order_date);
```

> `MERGE INTO` is essential in Medallion Architecture when promoting data from Bronze to Silver — it keeps records current without duplicates.

### Time Travel — Query Historical Snapshots

```sql
-- Query by version number
SELECT * FROM sales VERSION AS OF 3;

-- Query by timestamp
SELECT * FROM sales TIMESTAMP AS OF '2026-06-01 00:00:00';

-- View full change history
DESCRIBE HISTORY sales;
```

```python
# Time Travel with PySpark
df_old = spark.read \
  .format("delta") \
  .option("versionAsOf", 2) \
  .load("/mnt/datalake/gold/sales")
```

### Essential Delta Commands

```sql
-- Compact small files and sort data for faster queries
OPTIMIZE sales ZORDER BY (customer_id);

-- Remove old snapshot files (default: older than 7 days)
VACUUM sales;

-- Table metadata
DESCRIBE DETAIL sales;

-- Compute column statistics for the query optimizer
ANALYZE TABLE sales COMPUTE STATISTICS;
```

---

## 4. Databricks SQL

With a SQL Warehouse, you can explore data and build dashboards using SQL alone — no Spark or Python required.

### SQL Editor Basics

```sql
-- Unity Catalog uses 3-level namespace: catalog.schema.table
SELECT *
FROM my_catalog.my_schema.my_table
LIMIT 100;

-- Browse available objects
SHOW CATALOGS;
SHOW SCHEMAS IN my_catalog;
SHOW TABLES IN my_catalog.my_schema;
```

### Common SQL Patterns

```sql
-- Monthly aggregation
SELECT
  DATE_TRUNC('month', order_date) AS month,
  SUM(amount)                     AS total_sales,
  COUNT(DISTINCT customer_id)     AS unique_customers
FROM sales
WHERE order_date >= '2026-01-01'
GROUP BY 1
ORDER BY 1;

-- Window function: rank within partition
SELECT
  customer_id,
  amount,
  RANK() OVER (PARTITION BY DATE_TRUNC('month', order_date)
               ORDER BY amount DESC) AS monthly_rank
FROM sales;

-- CTE for readability
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

## 5. Workflows — Pipeline Automation

Databricks Workflows (Jobs) lets you **schedule and orchestrate** notebooks, Python scripts, SQL queries, and pipelines.

### Job Structure

```
Job
├── Task 1: Bronze ingestion (Notebook)
│       ↓
├── Task 2: Silver cleansing (Notebook)
│       ↓
└── Task 3: Gold aggregation (SQL)
```

### Schedule Examples

| Pattern | Cron Expression |
|---|---|
| Daily at 2 AM | `0 2 * * *` |
| Every Monday at 9 AM | `0 9 * * 1` |
| Every hour | `0 * * * *` |
| On new file arrival | File Arrival Trigger |

### Passing Values Between Tasks

```python
# Task 1: set a value
dbutils.jobs.taskValues.set(key="processed_count", value=1234)

# Task 2: read the value from Task 1
count = dbutils.jobs.taskValues.get(
    taskKey="task_1_key",
    key="processed_count"
)
```

---

## 6. MLflow — Experiment Tracking

MLflow comes fully integrated in Databricks. It tracks experiments, logs parameters and metrics, and manages the full model lifecycle.

### Basic Experiment Tracking

```python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

mlflow.set_experiment("/Users/me/my-experiment")

with mlflow.start_run(run_name="rf_baseline"):
    # Log parameters
    mlflow.log_param("n_estimators", 100)
    mlflow.log_param("max_depth", 5)

    # Train model
    model = RandomForestClassifier(n_estimators=100, max_depth=5)
    model.fit(X_train, y_train)

    # Log metric
    acc = accuracy_score(y_test, model.predict(X_test))
    mlflow.log_metric("accuracy", acc)

    # Save model
    mlflow.sklearn.log_model(model, "random_forest_model")

print(f"Accuracy: {acc:.4f}")
```

### Registering a Model

```python
# Promote a good run to the model registry
model_uri = f"runs:/{run_id}/random_forest_model"
mlflow.register_model(model_uri, "MyProductionModel")
```

---

## 7. Full Workflow Summary

Here's how a real data project typically flows through Databricks:

```
1. Ingest
   External source → DBFS / Cloud Storage (S3, ADLS, GCS)

2. Bronze (Notebook or Auto Loader)
   Raw files → Delta Table (Bronze)

3. Silver (Notebook + MERGE INTO)
   Bronze → Deduplicate + Standardize → Delta Table (Silver)

4. Gold (SQL or Notebook)
   Silver → Business logic → Delta Table (Gold)

5. Analyze / Visualize
   Gold → SQL Warehouse → Dashboard / BI Tool

6. ML (optional)
   Gold → Feature Engineering → MLflow → Model Serving
```

---

## Quick Reference Cheat Sheet

```python
# ─── DataFrame basics ─────────────────────────────
df = spark.read.format("delta").load("/path/to/table")
df = spark.table("catalog.schema.table")
df.show(10)
df.printSchema()
df.count()

# ─── Transformations ──────────────────────────────
from pyspark.sql import functions as F

df2 = df.select("col1", "col2") \
        .filter(F.col("amount") > 0) \
        .withColumn("year", F.year("order_date")) \
        .groupBy("year") \
        .agg(F.sum("amount").alias("total"))

# ─── Write ────────────────────────────────────────
df2.write.format("delta").mode("overwrite").saveAsTable("gold.summary")
df2.write.format("delta").mode("append").save("/mnt/lake/gold/summary")
```

```sql
-- ─── SQL Cheat Sheet ─────────────────────────────
SHOW TABLES IN catalog.schema;
DESCRIBE TABLE catalog.schema.my_table;
DESCRIBE HISTORY catalog.schema.my_table;

OPTIMIZE catalog.schema.my_table ZORDER BY (id);
VACUUM catalog.schema.my_table RETAIN 168 HOURS;

-- Check partitions
SHOW PARTITIONS catalog.schema.my_table;
```

---

## Closing Thoughts

Databricks can feel overwhelming at first — there's a lot of surface area. But the core loop is simple:

1. **Start a cluster**
2. **Explore data in a notebook**
3. **Store it in Delta Lake**
4. **Automate with Workflows**
5. **Analyze with SQL**

MLflow, Unity Catalog, and Model Serving layer on top of that foundation. The fastest way to learn is to use each piece on a real dataset and let the intuition build naturally.

> "Even when AI automates the analysis, the instinct for reading data and writing queries is something you have to develop yourself."

---
title: "My First Day with Databricks — Medallion Architecture and Why You Still Need to Feel the Data"
date: 2026-06-16 00:01:00 +0900
categories: [Study, Data]
tags: [Databricks, Medallion Architecture, Data Engineering, Lakehouse, SQL]
toc: true
---

Today I used **Databricks** for the first time. Touching something hands-on always feels different from just reading about it. The concept that stood out most was **Medallion Architecture** — though what'll stick with me longer was something a senior colleague said.

---

## What is Medallion Architecture?

Medallion Architecture is a data design pattern used in the **Databricks Lakehouse** environment to logically organize data into layers, progressively improving data quality as it flows through each stage. It's sometimes called a **"multi-hop architecture."**

It consists of three layers: **Bronze → Silver → Gold**

---

## Bronze Layer — Raw Data

> The landing zone for data from external source systems, preserved exactly as-is

- Table structures mirror the source system
- Metadata columns added: load timestamp, process ID, etc.
- **Purpose**: fast Change Data Capture, historical archiving, auditability, reprocessing without re-reading source

Because the raw data is preserved untouched, you can always trace back to the origin if something goes wrong downstream.

---

## Silver Layer — Cleansed & Conformed Data

> Data from Bronze is refined "just enough" to form an Enterprise View

- Deduplication, standardization, cross-source mapping
- Master customers, transactions, cross-reference tables
- **ELT over ETL**: speed of ingestion is the priority; complex transformations happen in Gold

| Attribute | Detail |
|-----------|--------|
| Data model | 3rd Normal Form style |
| Consumers | Departmental analysts, data engineers, data scientists |
| Purpose | Self-service analytics, advanced analytics, ML source |

---

## Gold Layer — Curated Business-Level Tables

> The final, consumption-ready layer built for analytics and decision-making

- Project-specific databases, optimized for reading
- **De-normalized models** with fewer joins
- Kimball star schemas and Inmon-style data marts fit here

Customer analytics, inventory analysis, product recommendations, marketing dashboards — they all live in Gold.

---

## Layer Summary

```
External Data Sources
        ↓
  🟫 Bronze (Raw) — preserve as-is, fast ingestion
        ↓
  🥈 Silver (Cleansed) — standardize, integrate, enterprise view
        ↓
  🥇 Gold (Curated) — ready for analytics and ML
```

---

## What Impressed Me Most — "You Have to Feel the Data"

Using Databricks was great, but what I'll remember longer is something my senior said today.

> "AI has automated a lot of data analysis, but that doesn't mean we no longer need to look at the data ourselves. You still have to write SQL queries by hand."

Especially as someone new to data work, this matters.

- During the design process, communicating with the team and **"feeling the data"** builds intuition
- Looking at column names and abbreviations and **knowing what the data contains** without explanation
- Tracing table structures directly to **understand how data flows**

None of that comes from delegating to AI. It builds up through looking at data yourself, making mistakes, and thinking through problems.

And one more thing:

> "AI is a great tool. But it's a tool — it shouldn't become everything."

The more automation improves, the more valuable a person who can actually verify those automated results becomes. You need to be able to write a query yourself to judge whether what the AI produced is right or wrong.

---

## Closing Thoughts

Today, through Databricks, I got a clearer picture of data design via Medallion Architecture. The journey from Bronze to Gold — maybe the way I approach data should follow the same path.

Start by taking in what's raw. Build understanding layer by layer. Arrive at something genuinely valuable.

It starts with seeing it yourself, using it yourself, and feeling it yourself.

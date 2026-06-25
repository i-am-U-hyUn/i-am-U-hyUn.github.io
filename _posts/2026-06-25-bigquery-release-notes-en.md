---
title: "BigQuery Release Notes Summary (June 2026)"
date: 2026-06-25 09:00:00 +0900
categories: [Study, Data]
tags: [BigQuery, GCP, GoogleCloud, ReleaseNotes, DataEngineering, Gemini]
toc: true
---

> This post summarizes the key BigQuery updates for June 2026, based on the [official Google BigQuery Release Notes](https://docs.cloud.google.com/bigquery/docs/release-notes).  
> Contact: iloveit8110@naver.com

---

## June 23, 2026

### Trigger-Based Pipeline Scheduling (Preview)

**Trigger-based pipeline scheduling** is now available in Preview, allowing BigQuery pipelines to automatically execute when specific BigQuery tables are updated.

- Pipelines are auto-triggered when a target table is updated
- Enables automation of batch processing and more efficient data pipeline operations

### Conversational Analytics — Generally Available (GA)

**Conversational Analytics** in BigQuery is now Generally Available, with a range of enhanced capabilities:

| Feature | Description |
|---------|-------------|
| Model selection | Switch between Preview and GA models |
| Adjustable thinking modes | Control AI reasoning depth |
| Clarifying questions | AI can request additional context |
| Context citations | Answers include citations to source data |
| Parameter support in verified queries | Apply parameters to validated queries |
| AI functions | `KEY_DRIVERS`, `IF`, `SCORE`, `CLASSIFY`, `SIMILARITY`, `SEARCH` |

- Supported regions: US and EU MREP

### Dataset Conversations (Preview)

A new **Dataset Conversations** feature is available in Preview, allowing users to create AI-powered conversations scoped to specific datasets.

---

## June 22, 2026

### BigQuery Data Transfer Service — Oracle & MySQL Metadata Transfer (Preview)

BigQuery Data Transfer Service now supports **metadata transfer from Oracle and MySQL** sources into Knowledge Catalog (Preview).

- Integrate existing Oracle/MySQL schema information into Google Cloud's Knowledge Catalog
- Strengthens data governance and metadata management capabilities

---

## June 17, 2026

### Autonomous Embedding Generation — Generally Available (GA)

**Autonomous embedding generation** is now Generally Available.

- Enable automatic embedding column maintenance on new or existing tables using `CREATE TABLE` or `ALTER TABLE` statements
- Simplifies AI-powered workflows such as vector search and semantic similarity analysis

---

## June 16, 2026

### Table Explorer Transitioning to Reference Panel

The **Table Explorer** functionality will transition to the **Reference panel** in July 2026 or later.

- Users currently relying on Table Explorer should prepare for the upcoming UI change

---

## June 15, 2026

### Gemini Cloud Assist — SQL Query Optimization Analysis (Preview)

**Gemini Cloud Assist** now supports SQL query optimization analysis for **BigQuery Editions** customers (Preview).

- AI analyzes query performance bottlenecks and suggests improvements

### Daily Token Quota for Generative AI Functions Temporarily Disabled (Issue)

The **daily token quota configuration** for BigQuery generative AI functions has been temporarily disabled.

- Restoration is in progress; timeline will be announced when available

### Column Width Resizing in BigQuery Studio Table Listings

A **column width resizing** capability has been added to BigQuery Studio's table listing view.

- Users can now manually adjust column widths for a better browsing experience

### Gemini Code Assist in Jobs-Related Pages (Preview)

**Gemini Code Assist** is now available in Jobs Explorer, Job details, Job history, and Capacity management pages for performance troubleshooting (Preview).

---

## June 12, 2026

### BigQuery AI Functions — Direct ObjectRef Support (GA)

BigQuery AI functions now **accept ObjectRef values directly** without requiring `OBJ.GET_ACCESS_URL()` function calls (Generally Available).

- Pass unstructured data (images, audio, documents, etc.) directly to AI functions
- Simplifies pipelines and reduces boilerplate code

---

## June 11, 2026

### Gemini Cloud Assist — Performance Monitoring & Cost Optimization (Preview)

**Gemini Cloud Assist** now supports BigQuery **performance monitoring and cost optimization** (Preview).

- AI analyzes slot utilization, query efficiency, and cost trends, then suggests optimization strategies

### AI.KEY_DRIVERS Function Support Restored (Preview)

Support for the **`AI.KEY_DRIVERS`** function has been restored, enabling identification of data segments causing statistically significant metric changes (Preview).

- Useful for root-cause analysis of metric fluctuations in your data

---

## June 10, 2026

### BigQuery Continuous Queries — ARRAY_AGG & STRING_AGG Support (Preview)

BigQuery **continuous queries** now support `ARRAY_AGG` and `STRING_AGG` aggregation functions (Preview).

- Expands the scope of real-time aggregation over streaming data

---

## Summary

The highlight of June 2026 updates is the **GA launch of AI/Gemini-powered features** and enhanced **real-time pipeline automation**. In particular, the GA release of Conversational Analytics and the introduction of trigger-based pipeline scheduling are expected to significantly boost data team productivity.

For the full release notes, visit the [official documentation](https://docs.cloud.google.com/bigquery/docs/release-notes).

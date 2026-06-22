---
title: "Advanced Principles for Professional BI Dashboards (Databricks AI/BI)"
date: 2026-06-22 10:00:00 +0900
categories: [Study, Data]
tags: [Databricks, AIBI, Dashboard, DataVisualization, BI, Design, PowerBI, UX]
toc: true
---

> The previous post ([How to Design Beautiful Dashboards in Databricks AI/BI](/posts/databricks-aibi-dashboard-design-en/)) covered layout grids, fonts, colors, and workspace themes.  
> This post draws on the **Microsoft Power BI official guide** and **data visualization expert principles** to push your dashboards to the level where they can be used directly in executive reporting.

---

## 0. Questions to Answer Before You Start Designing

Before any layout or color decision, answer these questions. Without them, even the most beautiful dashboard gets the response: "So... what am I supposed to look at?"

| Question | Why It Matters |
|---|---|
| **Who is the audience?** | Information density differs between executives, analysts, and frontline staff |
| **What decision must they make?** | Keep only the metrics that support that decision |
| **Where will they view it?** | A large monitor allows more content; tablet/mobile demands fewer tiles |
| **Does everything fit in one screen?** | Core information must be visible without scrolling |

> "A dashboard is not a report. It is an at-a-glance overview of the current state of data. Detailed information belongs in drill-through reports, not on the dashboard itself." — Microsoft Power BI Official Guide

---

## 1. Three Layout Patterns — Choose by Purpose

The previous post introduced Z-shape and F-shape eye movement. Here we go deeper: **which structural pattern fits which purpose**.

### ① Inverted Pyramid — Best for Executive Reporting

The most important summary information sits at the top; detail increases as you scroll down. C-level audiences prefer this format.

```
┌──────────────────────────────────────┐
│  [Filter] Period ▼  Region ▼  ...    │  ← Global filters (top, horizontal)
├──────────┬──────────┬────────────────┤
│  Revenue │  Users   │  Goal Rate     │  ← 3–5 KPI cards
├──────────┴──────────┴────────────────┤
│         Monthly Revenue Trend        │  ← Trend / comparison charts
├─────────────────┬────────────────────┤
│  Revenue by     │  Product Mix       │
│  Region         │  Pie Chart         │
├─────────────────┴────────────────────┤
│         Detailed Transaction Table   │  ← Scroll only when needed
└──────────────────────────────────────┘
```

### ② Hub and Spoke — Best for Root Cause Analysis

One central chart (the Hub) is surrounded by supporting sub-charts (Spokes) that explain it from multiple angles. Effective when you need to answer "why did this number happen?"

```
┌──────────────────────┬───────────────┐
│                      │ Revenue Share │
│  Monthly Revenue     │  by Region    │
│  Trend               ├───────────────┤
│  (Main Line Chart)   │ Revenue by    │
│                      │ Product       │
│       [Hub]          ├───────────────┤
│                      │ Conversion    │
│                      │ by Channel    │
└──────────────────────┴───────────────┘
           [Spokes explain the Hub]
```

### ③ F-Pattern — Best When Filters and Text Are Heavy

Leverages the eye movement pattern where users scan horizontally across the top, then move down the left side.

```
┌─────────────────────────────────────┐
│ Title | Last Updated | Filters...   │  ← F top bar
├────────────────────────────────────┤
│ [KPI] [KPI] [Summary Chart]         │  ← F middle bar
├──┬─────────────────────────────────┤
│C │  Chart A         Chart B        │
│h │                                 │  ← F left rail
│a │  Chart C         Chart D        │
│r │                                 │
└──┴─────────────────────────────────┘
```

---

## 2. Chart Type Selection Principles

"Avoid variety for variety's sake." — Microsoft Power BI Official Guide

Choose your chart based on **the nature of the data**, not visual preference. The wrong chart type can cause the audience to misinterpret the data.

### Chart Selection by Purpose

| Purpose | Recommended | Avoid |
|---|---|---|
| Trends over time | Line chart | Bar chart (discontinuous feel) |
| Comparing items | Horizontal / vertical bar chart | 3D charts (distort values) |
| Part-to-whole | Pie chart (**8 categories max**) | 3D pie, overused donuts |
| Current vs. goal | Gauge chart | Line chart |
| Distribution | Histogram, box plot | Pie chart |
| Correlation | Scatter plot | Bar chart |
| Single key metric | Number card + sparkline | Oversized pie or bar chart |

### Number Formatting Principles

Humans cannot process long numbers at a glance. Abbreviate.

| Before | After |
|---|---|
| `3,400,000` | `3.4M` |
| `1,234,567,890` | `1.23B` |
| `0.123456` | `12.3%` |

- Limit decimal places to **1–2 digits**
- Never mix millions-scale and thousands-scale data on the same axis — use a secondary axis
- Keep axis scales and dimension ordering **consistent across charts**
- Never place charts with different time ranges side by side (monthly next to annual)

---

## 3. Data-Ink Ratio — Edward Tufte's Core Principle

The most common reason a dashboard looks cluttered is that it contains **too many visual elements that convey no data**.

> "Most ink on a chart should be used to represent data." — Edward Tufte

### Elements to Remove

| Element | Problem |
|---|---|
| Dense grid lines | The grid catches the eye before the data does |
| 3D effects | Perspective distorts actual values |
| Chart border boxes | Decorative — contribute nothing to communication |
| Unnecessary data labels | Bar charts are readable without explicit numbers |
| Overloaded legends | Direct labeling inside the chart is more intuitive |
| Background gradients / patterns | Reduce data readability |

### Intentional Sort Order

Sorting is a design decision, not a default.

- **Sort by value**: Emphasize "which item is highest or lowest"
- **Sort by category (axis)**: Help users quickly find a specific item (e.g., alphabetically)

---

## 4. KPI Card Design — Going Deeper

The previous post covered where to place KPI cards. This section covers **how to design what's inside them**.

### Anatomy of a Well-Designed KPI Card

```
┌─────────────────────────────┐
│  Total Revenue               │  ← Metric name (small text)
│  $ 1.24B                    │  ← Key number (large, bold)
│  ▲ 12.3%  vs Last Month     │  ← Delta + comparison period
│  ━━━━━━━━━━━━━━━━━━━━━━━━  │  ← Sparkline (mini trend)
│  Goal Attainment  87%        │  ← vs target
└─────────────────────────────┘
```

### Design Principles

- **Color encoding for delta**: ▲ green / ▼ red  
  Exception: **cost, error rate, churn** metrics — here ▼ means improvement, so flip the colors
- **Always specify the comparison period**: "vs Last Month" vs "vs Same Period Last Year" — without this, the delta is meaningless
- **Sparklines**: A single number gives a snapshot; a sparkline adds trend context that makes the number interpretable
- **Reference lines**: Add a dotted target line to every chart that tracks against a goal

---

## 5. Adding Narrative — Using Text Boxes

A dashboard that only shows charts is a "number dump." It needs **a story** to be professional.

### How to Use Text Boxes in Databricks AI/BI

**Section headers to structure flow:**
```markdown
## 1. User Acquisition Overview
## 2. Purchase Conversion Analysis
## 3. Churn Root Cause Analysis
```

**Annotations for anomalies:**
```markdown
(Note: March data is partially missing due to scheduled maintenance)
(Note: April spike is attributable to the spring promotion campaign)
```

These annotations dramatically increase the **perceived credibility** of the dashboard. They pre-empt the questions the audience would otherwise have to ask.

---

## 6. Conditional Formatting

Rule-based color encoding lets the dashboard tell the audience **where to pay attention** without any explanation.

### Table Conditional Formatting

| Condition | Visual Treatment |
|---|---|
| Above target | Green text or green background |
| Below threshold | Red background or bold text |
| Declined vs prior period | Red arrow ▼ |
| Improved vs prior period | Green arrow ▲ |

### Reference Lines on Charts

Add a **dotted target line** to every chart that measures performance against a goal. The viewer instantly sees whether actuals are above or below target.

In Databricks Lakeview, use the `Conditional formatting` option in the table widget settings.

---

## 7. Data Freshness and Trust Indicators

No matter how well-designed a dashboard is, someone will ask: "When is this data from?" Add the answer proactively.

### Always Display in the Top Right

```
Last Updated: 2026-06-22 08:00 KST
Data Source: sales_db.transactions (Delta Lake)
Owner: Data Team — Jane Smith
```

These three lines guarantee:
- **Freshness**: How current the data is
- **Traceability**: Where the data comes from
- **Accountability**: Who to contact when something looks wrong

---

## 8. Accessibility — WCAG Standards

Validating your palette with a colorblind simulator (covered in Part 1) is the starting point, not the finish line. Accessibility has concrete, measurable standards.

### WCAG AA Compliance

| Item | Standard |
|---|---|
| Normal text contrast ratio | **4.5:1 or higher** |
| Large text (18pt+) contrast ratio | **3:1 or higher** |
| UI component contrast ratio | **3:1 or higher** |

Validation tool: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Use Redundant Encoding

Never rely on color alone to convey information — colorblind users cannot read it.

- Line charts: color + **line style** (solid, dashed, dotted)
- Bar charts: color + **fill pattern** (hatching, cross-hatching)
- Status indicators: color + **icon** (✅ ⚠️ ❌)

---

## 9. Gestalt Principles of Visual Perception

The human brain unconsciously groups visual information in predictable ways. Applying Gestalt principles creates dashboards that are **intuitively readable without explanation**.

| Principle | Description | Dashboard Application |
|---|---|---|
| **Proximity** | Elements close together are perceived as a group | Group related charts together; use whitespace to separate topics |
| **Similarity** | Elements sharing color, size, or shape are perceived as the same type | Apply the same color consistently to the same category |
| **Continuity** | The eye prefers smooth, continuous paths | Design line charts so trends flow naturally |
| **Simplicity** | The brain prefers simple forms over complex ones | Remove decorative elements; maintain high Data-Ink Ratio |

---

## Summary — Advanced Checklist

| Item | Check |
|---|---|
| Audience, device, and decision purpose defined | ✅ |
| Layout pattern selected for purpose (Inverted Pyramid / Hub & Spoke / F-Pattern) | ✅ |
| Chart type matched to data characteristics | ✅ |
| Numbers abbreviated appropriately (3.4M, 1.23B, etc.) | ✅ |
| Data-Ink Ratio verified (unnecessary elements removed) | ✅ |
| KPI cards include sparklines, delta, and goal attainment | ✅ |
| Text boxes used for section headers and anomaly annotations | ✅ |
| Conditional formatting and reference lines configured | ✅ |
| Data freshness, source, and owner displayed | ✅ |
| WCAG AA contrast ratio 4.5:1 verified | ✅ |
| Redundant encoding used alongside color | ✅ |

---

## References

| Resource | Key Content |
|---|---|
| [Microsoft Power BI Dashboard Design Tips](https://learn.microsoft.com/ko-kr/power-bi/create-reports/service-dashboards-design-tips) | Chart selection, number formatting, audience design |
| [Databricks AI/BI Official Blog](https://www.databricks.com/kr/blog/design-beautiful-dashboards-aibi) | 60-30-10, palette, workspace themes |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | WCAG color contrast validation tool |
| [Nightingale — Data Visualization Society](https://nightingaledvs.com/) | Real-world visualization case studies |
| [Nielsen Norman Group — Data Visualization](https://www.nngroup.com/topic/data-visualization/) | UX-focused dashboard design |
| *Storytelling with Data* — Cole Nussbaumer Knaflic | Chart selection and narrative — the definitive guide |
| *Information Dashboard Design* — Stephen Few | KPI card and dashboard structure design |
| *The Visual Display of Quantitative Information* — Edward Tufte | Data-Ink Ratio and chart simplification principles |

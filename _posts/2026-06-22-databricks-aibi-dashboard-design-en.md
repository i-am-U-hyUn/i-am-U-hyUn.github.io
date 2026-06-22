---
title: "How to Design Beautiful Dashboards in Databricks AI/BI"
date: 2026-06-22 09:00:00 +0900
categories: [Study, Data]
tags: [Databricks, AIBI, Dashboard, DataVisualization, BI, Design]
toc: true
---

> This post is based on the [Databricks official blog](https://www.databricks.com/kr/blog/design-beautiful-dashboards-aibi) and summarizes practical tips for building professional and visually compelling AI/BI dashboards.

---

## Why Dashboard Design Matters

No matter how accurate your data is, it won't make an impact if it isn't communicated effectively. A dashboard is not just a tool for displaying numbers — it is a communication medium that reflects your organization's **brand identity** and **trustworthiness**.

Databricks AI/BI dashboards offer fine-grained customization of fonts, colors, and layouts, enabling a consistent visual experience across your entire organization.

---

## 1. Design Your Layout Around the End User

A great dashboard starts with the question: **who is the audience?**

### Choosing the Number of Grid Columns

| Columns | Best For | Characteristics |
|---|---|---|
| **3 columns** | Executives, leadership | KPI-focused, clean and simple |
| **4 columns** | General business users | Balanced information density |
| **6 columns** | Data analysts, technical users | Detailed info, complex visualizations |

### Designing for Eye Movement

Human eyes naturally follow **Z-shaped** or **F-shaped** patterns when scanning a screen.

- Place the most important KPIs in the **top-left**
- Move detailed charts and secondary info **toward the bottom**
- Use **larger sizes** for critical elements and **smaller sizes** for supporting elements to establish visual hierarchy

---

## 2. Choosing the Right Font

Readability is the top priority when selecting dashboard fonts.

### Recommended Font Types

Use **sans-serif fonts** for dashboards:

- Arial
- Tahoma
- Verdana

These fonts remain legible at small sizes on screen and convey a clean, professional look.

### Local Fonts for Brand Consistency

Databricks AI/BI supports **adding local fonts**. This means you can apply your company's brand typeface directly, ensuring internal dashboards fully comply with brand guidelines.

### Setting Up Contrast

Ensure sufficient contrast between background and text colors for readability.

| Background | Recommended Text Color |
|---|---|
| Light `#EBEBEB` | Dark text `#08141A` |
| Dark `#08141A` | Light text `#FCFCFD` |

---

## 3. Defining UI Colors — The 60-30-10 Rule

Using colors without a system leads to cluttered dashboards. Applying the **60-30-10 rule** creates a visually balanced composition.

| Ratio | Role | Where to Apply |
|---|---|---|
| **60% Primary** | Background | Canvas and widget backgrounds |
| **30% Secondary** | Content | Fonts and visualization palette |
| **10% Accent** | Interaction | Buttons, filters, interactive elements |

### Neutral Palette Examples

**Light mode:**

```
Canvas background: #EBEBEB
Widget background: #FCFCFD
```

**Dark mode:**

```
Canvas background: #1E343F
Widget background: #08141A
```

---

## 4. Designing a Visualization Palette

The color palette used for charts and graphs must be **colorblind-friendly**.

### Palette Design Principles

- Use 5–9 colors (too many causes confusion, too few prevents distinction)
- Always validate with a colorblind simulator such as **Adobe Color**
- Don't rely on color alone — combine shapes, patterns, and labels to convey information

### Example Palette

Here is an example of a colorblind-friendly palette:

| Color Code | Purpose |
|---|---|
| `#15AFDD` | Primary data series 1 |
| `#2375A8` | Primary data series 2 |
| `#52A870` | Positive / increase indicators |
| `#C85070` | Negative / decrease indicators |
| `#C89930` | Warning / neutral indicators |

---

## 5. Workspace Themes for Organization-Wide Consistency

Configuring each dashboard individually is inefficient. Databricks offers **workspace themes** to solve this.

> **Set a workspace theme once and it automatically applies to every dashboard in that workspace.**

Benefits include:

- Automatic brand consistency across the entire organization
- No need to reconfigure styles for every new dashboard
- One administrator can control the design standards for the whole company

---

## Real-World Example — Wanderbricks Brand Dashboard

The original blog post presents a case study of designing a dashboard for a fictional company called **Wanderbricks**.

The process goes: define brand colors → apply the 60-30-10 rule → validate with a colorblind simulator → register as a workspace theme. It also shows how to use **Genie Code prompts** to auto-generate theme configuration code.

---

## Summary — Checklist for a Beautiful Dashboard

| Item | Check |
|---|---|
| Choose the right grid column count for the audience | ✅ |
| Arrange KPIs following the Z/F-pattern eye flow | ✅ |
| Use sans-serif fonts with sufficient contrast | ✅ |
| Apply the 60-30-10 color rule | ✅ |
| Validate the visualization palette for colorblind accessibility | ✅ |
| Register a workspace theme for organization-wide consistency | ✅ |

Data credibility comes from analytical quality — **data persuasiveness comes from design**. Apply the principles introduced here and you can build report-quality dashboards directly within Databricks.

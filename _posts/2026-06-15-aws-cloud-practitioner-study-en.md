---
title: "AWS Cloud Practitioner (CLF-C02) Key Concepts"
date: 2026-06-15 00:13:00 +0900
categories: [Certification, AWS]
tags: [AWS, Cloud, CLF-C02, certification, IAM, EC2, S3]
toc: true
---

## Overview

Study notes for the AWS Certified Cloud Practitioner (CLF-C02) exam, organized by domain.
**Score 700 or above to pass.** Covers 4 domains.

---

## Domain 1: Cloud Concepts

### 6 Key Benefits of AWS Cloud

A frequently tested topic. Understand what situation each benefit applies to.

| Benefit | Description |
|---|---|
| **Security** | AWS physical security + separation of customer responsibility |
| **Reliability** | Automatic failure recovery, multi-AZ design |
| **High Availability** | Minimize service downtime |
| **Elasticity** | Automatically scale resources up/down based on demand |
| **Agility** | Rapid experimentation and deployment |
| **Pay-as-you-go** | Pay only for what you use |

### TCO (Total Cost of Ownership)

Understanding **CapEx vs. OpEx** is essential for grasping the economic benefits of cloud adoption.

| Type | Description |
|---|---|
| **CapEx** (Capital Expenditure) | Upfront investment in servers, data centers, etc. |
| **OpEx** (Operational Expenditure) | Ongoing costs like cloud usage fees |

> Moving to the cloud means shifting from **CapEx to OpEx**. This is the core principle behind TCO reduction.
{: .prompt-tip }

### Cloud Architecture Design Principles

- **Design for Failure** — Assume failures will happen
- **Decouple Components** — Avoid monolithic architecture
- **Implement Elasticity** — Build for scale
- **Think Parallel** — Leverage parallel processing

---

## Domain 2: Security & Compliance

### Shared Responsibility Model

One of the **most important concepts** on the CLF-C02 exam. You must clearly distinguish what AWS and the customer are each responsible for.

```
AWS:      Security OF the Cloud  →  Physical infrastructure, hardware, global network
Customer: Security IN the Cloud  →  Data, OS patches, applications, IAM configuration
```

Responsibility shifts depending on the service type:

| Service | Customer Responsibility |
|---|---|
| **EC2** | Manage OS and applications directly |
| **RDS** | Data only (AWS manages OS and DB engine) |
| **Lambda** | Code only (AWS manages all other infrastructure) |

### AWS IAM Key Concepts

IAM is the service that **controls access** to AWS resources.

| Concept | Description |
|---|---|
| **User** | Individual account, authenticated via access key/password |
| **Group** | Apply policies to multiple users at once |
| **Role** | Grant temporary permissions to services/users |
| **Policy** | JSON document that defines permissions |
| **MFA** | Must be enabled on the root account |

> **Principle of Least Privilege** — Grant only the minimum permissions necessary to perform a task.
{: .prompt-warning }

### Key Security & Auditing Services

| Service | Role |
|---|---|
| **CloudWatch** | Monitoring and alarms |
| **CloudTrail** | API call logs (who, when, what) |
| **AWS Config** | Track resource configuration changes |

---

## Domain 3: Technology

### AWS Global Infrastructure

```
Region
 └── Availability Zone (AZ) × 2–6
      └── Data Centers

Edge Location — Operated separately
```

| Component | Purpose |
|---|---|
| **Multi-AZ** | High Availability (HA) |
| **Multi-Region** | Disaster Recovery (DR), data sovereignty, low latency |
| **Edge Location** | Content caching, latency minimization |

### Core Compute Services

| Service | Description |
|---|---|
| **EC2** | Virtual server, manage OS directly |
| **Lambda** | Serverless, runs code only (event-driven) |
| **ECS / EKS** | Container management services |
| **Auto Scaling** | Automatic scaling based on demand |
| **ELB** | Traffic load balancing |

### Core Storage Services

| Service | Description |
|---|---|
| **S3** | Object storage, unlimited capacity |
| **EBS** | Block storage dedicated to EC2 (like a hard drive) |
| **EFS** | File storage shared across multiple EC2 instances |
| **S3 Glacier** | Low-cost long-term archive storage |
| **Snowball** | Physical device for large-scale data transfer |

### Core Database Services

| Service | Description |
|---|---|
| **RDS** | Managed relational DB (MySQL, PostgreSQL, etc.) |
| **DynamoDB** | Serverless NoSQL DB |
| **Redshift** | Data warehouse (for analytics) |

### Ways to Manage AWS Resources

| Method | Description |
|---|---|
| **Management Console** | Web-based GUI |
| **AWS CLI** | Command-line interface |
| **SDK** | Language-specific libraries |
| **CloudFormation** | Infrastructure as Code (IaC) |

---

## Domain 4: Billing & Pricing

### EC2 Pricing Models

Choose the right pricing model based on your workload characteristics.

| Type | Best For | Discount |
|---|---|---|
| **On-Demand** | Unpredictable, short-term workloads | Baseline |
| **Reserved** | 1–3 year commitment, stable workloads | Up to 72% |
| **Spot** | Interruption-tolerant batch jobs | Up to 90% |

> **Spot Instances** — AWS can reclaim them with a **2-minute warning**. Best for async batch jobs that can tolerate interruption.
{: .prompt-warning }

### AWS Organizations & Consolidated Billing

- **Consolidated Billing** — Combine costs across multiple accounts
- Share volume discount benefits
- Allocate costs by department

### Cost Management Tools

| Tool | Function |
|---|---|
| **Cost Explorer** | Visualize and forecast costs |
| **AWS Budgets** | Set alerts for budget overruns |
| **Cost & Usage Report** | Detailed usage reports |
| **Tags** | Track costs by resource |

### AWS Trusted Advisor

Provides optimization recommendations across 5 areas:

> **Cost Optimization / Performance / Security / Fault Tolerance / Service Limits**
{: .prompt-info }

---

## Pre-Exam Checklist

Review these items before your exam:

- [ ] Understand the Shared Responsibility Model thoroughly
- [ ] Distinguish IAM User / Group / Role / Policy
- [ ] Know the difference: Region vs. AZ vs. Edge Location
- [ ] Know the 3 EC2 pricing models (On-Demand / Reserved / Spot)
- [ ] Distinguish S3, EBS, EFS, and Glacier storage types
- [ ] Know the difference between RDS and DynamoDB
- [ ] Distinguish CloudWatch / CloudTrail / Config roles

> **Score 700+ to pass!** 🎯
{: .prompt-tip }

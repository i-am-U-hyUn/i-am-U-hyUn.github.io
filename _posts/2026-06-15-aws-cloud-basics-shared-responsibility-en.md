---
title: "Cloud Computing Basics to the Shared Responsibility Model"
date: 2026-06-15 00:14:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, CloudComputing, IaaS, PaaS, SaaS, SharedResponsibility, GlobalInfrastructure]
toc: true
---

## What This Post Covers

Key content from CLF-C02 **Domain 1 (Cloud Concepts)** and **Domain 2 (Security)**.
Cloud deployment models, IaaS/PaaS/SaaS differences, AWS Global Infrastructure, and the Shared Responsibility Model — all in one place.

---

## What is Cloud Computing?

A service that lets you borrow computing resources over the internet, as much as you need, whenever you need them. AWS owns and manages physical infrastructure (servers, storage, DB, networking), and users access it via the web console or API and **pay only for what they use**.

---

## 3 Cloud Deployment Models

Selected based on security requirements, cost structure, and operational flexibility.

| Type | Description | Characteristics |
|---|---|---|
| **Private Cloud** | Cloud dedicated to a single organization | Full control, suited for security-sensitive workloads |
| **Public Cloud** | Cloud provided by a third party like AWS | Cost-efficient, highly scalable |
| **Hybrid Cloud** | Mix of on-premises + public cloud | Flexibility, disaster recovery, data backup |

> Hybrid Cloud is commonly adopted by organizations where **Data Sovereignty** is critical.
{: .prompt-tip }

---

## 5 Characteristics of Cloud Computing (NIST Definition)

Essential knowledge for the exam.

1. **On-demand Self-service** — Automatic resource provisioning without human involvement
2. **Broad Network Access** — Accessible from anywhere via standard networks
3. **Resource Pooling** — Multi-tenant model where multiple customers share resources
4. **Rapid Elasticity** — Quickly scale up or down
5. **Measured Service** — Usage is monitored and billed accordingly

---

## 6 Benefits of the Cloud

| Benefit | Description |
|---|---|
| **Cost Reduction** | Pay only for what you use, no upfront investment |
| **Speed & Agility** | Deploy services within minutes |
| **Scalability** | Adjust resources to match demand |
| **High Availability** | Ensures business continuity |
| **Global Reach** | Serve users anywhere in the world |
| **Security** | Leverage AWS's robust security infrastructure |

---

## Cloud Service Types: IaaS / PaaS / SaaS

Differentiated by the scope of management responsibility.

| Type | Description | AWS Example | Non-AWS Example |
|---|---|---|---|
| **IaaS** | Provides virtualized infrastructure | EC2 | GCP, Azure, Linode |
| **PaaS** | Provides platform for app development/deployment | Elastic Beanstalk | Heroku, Google App Engine |
| **SaaS** | Provides a fully built software product | AWS Chime | Gmail, Zoom, Dropbox |

```
IaaS → Rent infrastructure only  (you manage OS and apps)
PaaS → Rent the platform          (focus only on app development)
SaaS → Use a finished product     (no management needed)
```

---

## AWS Pricing: 3 Core Principles

| Basis | What's Billed | Examples |
|---|---|---|
| **Compute** | Time used for computing | EC2 runtime, Lambda invocations |
| **Storage** | Amount of data stored | S3 capacity, EBS volumes |
| **Data Transfer OUT** | Data leaving the cloud | Data Transfer IN is free |

> **Inbound data (IN) is free; only outbound data (OUT) is charged** — a frequently tested exam point!
{: .prompt-warning }

---

## AWS Global Infrastructure

### Hierarchy

```
Region
 └── Availability Zone × 2–6
      └── Data Centers

Edge Location — Operated separately
```

### Region

A geographically isolated cluster of AWS data centers. Currently **30+ regions** operate worldwide.

Criteria for selecting a region:

| Criteria | Description |
|---|---|
| **Latency** | Choose the region closest to your users |
| **Compliance** | Meet data sovereignty regulations (e.g., GDPR) |
| **Service Availability** | Verify the AWS services you need exist in that region |
| **Pricing** | Prices vary by region |

### Availability Zone (AZ)

A group of physically separate data centers within a region.

- Each AZ has independent **power, cooling, and networking**
- AZs are connected via **high-speed, ultra-low latency networks**
- **No single point of failure**

> To achieve High Availability (HA), deploy across **at least 2 AZs**.
{: .prompt-tip }

### Edge Location (Points of Presence)

- Distributed across **400+ locations** worldwide
- Used by **CloudFront (CDN)** and **AWS Global Accelerator**
- Delivers content to end users with minimal latency

---

## AWS Shared Responsibility Model

The **most important concept** in CLF-C02.

```
AWS      → Security OF the Cloud  (security of the cloud itself)
Customer → Security IN the Cloud  (security within the cloud)
```

### AWS Responsibility (Security OF the Cloud)

- Physical data center security (access control, environmental management)
- Hypervisor, host OS, network infrastructure
- Global network operations (DDoS protection, etc.)

### Customer Responsibility (Security IN the Cloud)

- Data encryption (in transit / at rest)
- IAM management (users, roles, policy configuration)
- OS and application patch management
- Security group and NACL configuration
- Compliance assurance

### Responsibility by Service Type

| Service Type | AWS Responsibility | Customer Responsibility |
|---|---|---|
| **IaaS (EC2)** | Physical infrastructure, hypervisor | OS security, patches, data, network config |
| **PaaS (RDS)** | DB engine, backups, patches | Data encryption, DB access management, IAM |
| **SaaS (S3)** | Underlying service infrastructure | Bucket policies, permissions, data lifecycle |

> The more managed the service (RDS, Lambda), the **more AWS is responsible**. The more control you have (EC2), the **more you are responsible**.
{: .prompt-info }

---

## Final Summary

| Concept | Key Keywords |
|---|---|
| Cloud Deployment Models | Private / Public / Hybrid |
| Cloud Service Types | IaaS (EC2) / PaaS (Beanstalk) / SaaS (Chime) |
| AWS Pricing | Compute / Storage / Data Transfer OUT |
| Global Infrastructure | Region > AZ > Edge Location |
| AZ Characteristics | Independent power/cooling/network, no single point of failure |
| Shared Responsibility | AWS = OF the Cloud / Customer = IN the Cloud |

A solid understanding of the basics makes the remaining domains much easier. 💪

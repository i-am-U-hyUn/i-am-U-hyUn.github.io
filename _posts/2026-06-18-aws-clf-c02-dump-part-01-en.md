---
title: "AWS CLF-C02 Dump Explained Part 1"
date: 2026-06-18 01:01:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

This post covers 20 AWS CLF-C02 practice exam questions with full English translations, detailed answer explanations, and exam tips to help you pass the AWS Certified Cloud Practitioner exam.

---

## Q1. Shared Responsibility Model — Customer Responsibility

In the Shared Responsibility Model, which of the following is the customer's responsibility?

- A. Ensuring disk drives are wiped after use
- B. Updating firmware on hardware devices
- C. Ensuring encryption of data at rest
- D. Ensuring network cables are Category 6 or higher

**Answer: C**

✅ **C. Ensuring encryption of data at rest**: Under the AWS Shared Responsibility Model, customers are responsible for security "in" the cloud, which includes protecting their own data. Encrypting data at rest is a customer-side responsibility that AWS does not do automatically on the customer's behalf.

❌ **A. Ensuring disk drives are wiped after use**: Physical disk disposal and sanitization is AWS's responsibility as part of managing the underlying infrastructure.

❌ **B. Updating firmware on hardware devices**: Firmware updates on physical hardware are managed entirely by AWS, not the customer.

❌ **D. Ensuring network cables are Category 6 or higher**: Physical network infrastructure, including cabling, is AWS's responsibility as part of the data center management.

💡 **Exam Tip**: AWS = responsible for "security OF the cloud" (hardware, network, physical facilities). Customer = responsible for "security IN the cloud" (data encryption, IAM, OS patching on EC2, application-level security).

---

## Q2. Tracking and Categorizing Spending in Detail

What allows a company to track and categorize spending in granular detail?

- A. Cost Allocation Tags
- B. Consolidated Billing
- C. AWS Budgets
- D. AWS Marketplace

**Answer: A**

✅ **A. Cost Allocation Tags**: Cost Allocation Tags let you label AWS resources with key-value pairs (e.g., Department=Finance, Project=Alpha), enabling granular cost tracking and categorization per team, project, or environment in your AWS Cost Explorer reports.

❌ **B. Consolidated Billing**: Consolidated Billing combines invoices from multiple AWS accounts into one but does not provide per-resource categorization on its own.

❌ **C. AWS Budgets**: AWS Budgets lets you set spending thresholds and receive alerts, but it is not the primary tool for granular cost categorization.

❌ **D. AWS Marketplace**: AWS Marketplace is a catalog for purchasing third-party software; it has no role in cost categorization.

💡 **Exam Tip**: Cost Allocation Tags = label resources for granular cost tracking. You must activate tags in the Billing console before they appear in reports. Two types: AWS-generated tags and user-defined tags.

---

## Q3. Object Storage with Versioning and Lifecycle Features

Which service stores objects, provides real-time access to those objects, and offers versioning and lifecycle features?

- A. Amazon Glacier
- B. AWS Storage Gateway
- C. Amazon S3
- D. Amazon EBS

**Answer: C**

✅ **C. Amazon S3**: Amazon S3 (Simple Storage Service) is an object store that provides immediate (real-time) access to stored objects, supports versioning to keep multiple variants of an object, and offers lifecycle policies to automatically transition or expire objects.

❌ **A. Amazon Glacier**: Amazon S3 Glacier is designed for long-term archival with retrieval times of minutes to hours, not real-time access.

❌ **B. AWS Storage Gateway**: Storage Gateway is a hybrid storage service that connects on-premises environments to AWS cloud storage; it is not a standalone object store with versioning.

❌ **D. Amazon EBS**: Amazon Elastic Block Store provides block-level storage volumes attached to EC2 instances; it does not store objects or natively offer versioning and lifecycle policies.

💡 **Exam Tip**: Amazon S3 = Object Storage + 99.999999999% (11 nines) durability + Versioning + Lifecycle policies + Global access via URL. EBS = Block storage attached to a single EC2 instance.

---

## Q4. AWS Team That Helps Accelerate Cloud Adoption Through Paid Engagements

Which AWS team helps customers accelerate cloud adoption through paid engagements across multiple specialized practice areas?

- A. AWS Enterprise Support
- B. AWS Solutions Architects
- C. AWS Professional Services
- D. AWS Account Managers

**Answer: C**

✅ **C. AWS Professional Services**: AWS Professional Services is a global team of experts that partners with customers on paid consulting engagements to help design, build, and migrate workloads to AWS. They operate across specialized practice areas such as security, data analytics, and DevOps.

❌ **A. AWS Enterprise Support**: Enterprise Support is a support plan tier that provides a Technical Account Manager (TAM) and 24/7 access to senior engineers; it is not a professional consulting engagement team.

❌ **B. AWS Solutions Architects**: Solutions Architects are pre-sales technical advisors who help customers design architectures, typically for free during the sales process, not through paid engagements.

❌ **D. AWS Account Managers**: Account Managers handle the business/sales relationship; they do not deliver technical cloud adoption projects.

💡 **Exam Tip**: AWS Professional Services = paid consulting team for cloud adoption projects. AWS Partner Network (APN) Consulting Partners = third-party SI/consulting firms. Do not confuse the two.

---

## Q5. No In-House AWS Expertise — Which Program to Use?

A customer wants to design and build new workloads on AWS Cloud but lacks in-house AWS software technical expertise. Which AWS program can the customer leverage to achieve this outcome?

- A. AWS Partner Network Technology Partners
- B. AWS Marketplace
- C. AWS Partner Network Consulting Partners
- D. AWS Service Catalog

**Answer: C**

✅ **C. AWS Partner Network Consulting Partners**: APN Consulting Partners are professional services firms (system integrators, agencies, consultancies) that have been vetted by AWS to help customers design, architect, build, migrate, and manage workloads on AWS. They fill the gap when a customer lacks internal AWS expertise.

❌ **A. AWS Partner Network Technology Partners**: Technology Partners are ISVs and tool vendors that provide software products built on or integrated with AWS; they do not supply hands-on consulting or professional services.

❌ **B. AWS Marketplace**: AWS Marketplace is an online store to find, buy, and deploy software; it does not provide human consulting expertise.

❌ **D. AWS Service Catalog**: AWS Service Catalog allows organizations to manage and distribute approved IT products internally; it does not provide external technical expertise.

💡 **Exam Tip**: APN Consulting Partners = human expertise (consulting/SI firms) to help build on AWS. APN Technology Partners = software/tools that run on or integrate with AWS. Remember: "Consulting" = people; "Technology" = products.

---

## Q6. Distributing Workloads Across Multiple Availability Zones

Distributing workloads across multiple Availability Zones supports which cloud architecture design principle?

- A. Implement automation
- B. Design for agility
- C. Design for failure
- D. Implement elasticity

**Answer: C**

✅ **C. Design for failure**: Spreading workloads across multiple Availability Zones is the classic implementation of "design for failure" (also called fault tolerance). If one AZ experiences an outage, the workload continues running in the remaining AZs, preventing a single point of failure.

❌ **A. Implement automation**: Automation refers to using scripts, CloudFormation, or other tools to provision and manage resources without manual steps; it is not specifically about multi-AZ distribution.

❌ **B. Design for agility**: Agility refers to the speed of innovation and the ability to quickly experiment and deploy; multi-AZ placement is about resilience, not speed of delivery.

❌ **D. Implement elasticity**: Elasticity is the ability to scale resources up or down based on demand; it is related to capacity, not fault tolerance across zones.

💡 **Exam Tip**: Multi-AZ = "Design for failure" / Fault tolerance / High Availability. Key AWS services that support Multi-AZ by default: RDS Multi-AZ, ELB, S3. AZs within the same Region are connected by low-latency links.

---

## Q7. AWS Services That Can Host Microsoft SQL Server (Choose TWO)

Which AWS services can host a Microsoft SQL Server database? (Choose TWO)

- A. Amazon EC2
- B. Amazon RDS (Amazon Relational Database Service)
- C. Amazon Aurora
- D. Amazon Redshift
- E. Amazon S3

**Answer: A, B**

✅ **A. Amazon EC2**: You can install and run any version of Microsoft SQL Server on an Amazon EC2 instance, giving you full control over the OS and database configuration (lift-and-shift approach).

✅ **B. Amazon RDS**: Amazon RDS supports Microsoft SQL Server as a managed database engine, handling backups, patching, and Multi-AZ failover automatically.

❌ **C. Amazon Aurora**: Aurora is a MySQL- and PostgreSQL-compatible database engine built by AWS; it does not support Microsoft SQL Server.

❌ **D. Amazon Redshift**: Redshift is a data warehousing service optimized for analytical queries (OLAP); it is not a general-purpose relational database and does not run SQL Server.

❌ **E. Amazon S3**: S3 is an object storage service; it cannot host or run a database engine.

💡 **Exam Tip**: RDS supported engines: MySQL, PostgreSQL, MariaDB, Oracle, Microsoft SQL Server, and Amazon Aurora. Aurora supports MySQL and PostgreSQL only. Redshift = data warehouse (OLAP), not OLTP.

---

## Q8. Inspecting AWS Environment for Cost Savings and Performance Improvements

Which of the following inspects your AWS environment to identify opportunities to reduce costs and improve system performance?

- A. AWS Cost Explorer
- B. AWS Trusted Advisor
- C. Consolidated Billing
- D. Detailed Billing

**Answer: B**

✅ **B. AWS Trusted Advisor**: Trusted Advisor automatically inspects your AWS environment across five categories — Cost Optimization, Performance, Security, Fault Tolerance, and Service Limits — and provides actionable recommendations to save money and improve performance.

❌ **A. AWS Cost Explorer**: Cost Explorer is a visualization tool for analyzing historical and forecasted spending patterns; it does not actively inspect resources for optimization opportunities.

❌ **C. Consolidated Billing**: Consolidated Billing merges invoices from multiple accounts into one; it has no inspection or recommendation capability.

❌ **D. Detailed Billing**: Detailed Billing Reports provide itemized usage data for cost analysis; they do not inspect or recommend optimizations.

💡 **Exam Tip**: Trusted Advisor = 5 pillars: Cost Optimization, Performance, Security, Fault Tolerance, Service Limits. Basic/Developer support = access to core security checks only. Business/Enterprise support = full Trusted Advisor checks.

---

## Q9. EC2 Pricing Model That Allows Use of Existing Server-Bound Software Licenses

Which Amazon EC2 pricing model allows customers to use their existing server-bound software licenses?

- A. Spot Instances
- B. Reserved Instances
- C. Dedicated Hosts
- D. On-Demand Instances

**Answer: C**

✅ **C. Dedicated Hosts**: A Dedicated Host is a physical EC2 server fully dedicated to a single customer. Because you have visibility into the physical host's socket and core counts, you can use your existing per-socket, per-core, or per-VM software licenses (e.g., Windows Server, SQL Server, Oracle) through Bring Your Own License (BYOL).

❌ **A. Spot Instances**: Spot Instances use spare EC2 capacity at a discount and can be interrupted; they run on shared hardware and do not provide the license compliance visibility needed for BYOL.

❌ **B. Reserved Instances**: Reserved Instances provide a billing discount for committed usage but still run on shared (multi-tenant) hardware, which does not satisfy per-socket/per-core license requirements.

❌ **D. On-Demand Instances**: On-Demand Instances run on shared infrastructure and offer no mechanism for binding existing software licenses to a specific physical host.

💡 **Exam Tip**: Dedicated Host = physical server dedicated to you = BYOL support. Dedicated Instance = your instance runs on hardware not shared with other customers, but you don't control physical host placement. BYOL requires Dedicated Host, not just Dedicated Instance.

---

## Q10. AWS Characteristics That Make It Cost-Effective for Dynamic Workloads (Choose TWO)

Which AWS characteristics make AWS cost-effective for workloads with dynamic user demand? (Choose TWO)

- A. High availability
- B. Shared security model
- C. Elasticity
- D. Pay-as-you-go pricing
- E. Reliability

**Answer: C, D**

✅ **C. Elasticity**: Elasticity allows AWS resources to automatically scale up when demand increases and scale down when demand decreases, so you only pay for what you actually use rather than over-provisioning for peak load.

✅ **D. Pay-as-you-go pricing**: Pay-as-you-go means you are charged only for the resources you consume, with no upfront commitments. This directly reduces costs for dynamic workloads where usage fluctuates.

❌ **A. High availability**: High availability is about uptime and redundancy, not about cost efficiency for dynamic demand.

❌ **B. Shared security model**: The Shared Responsibility Model defines who manages security; it is not a cost-efficiency mechanism.

❌ **E. Reliability**: Reliability ensures a system performs its intended function correctly and consistently; it is a dependability characteristic, not a cost-optimization driver.

💡 **Exam Tip**: Elasticity + Pay-as-you-go = the two core cost benefits for variable/dynamic workloads. Elasticity eliminates over-provisioning; pay-as-you-go eliminates upfront capital expense (CapEx).

---

## Q11. Continuously Monitoring Account Activity Including API Calls for Risk Auditing

Which service continuously monitors and logs account activity — including AWS Management Console actions and AWS SDK calls — to enable risk auditing?

- A. Amazon CloudWatch
- B. AWS CloudTrail
- C. AWS Config
- D. AWS Health

**Answer: B**

✅ **B. AWS CloudTrail**: CloudTrail records all API calls and user actions across your AWS account, including who made the call, from where, and when. This creates a complete audit trail for governance, compliance, and risk auditing.

❌ **A. Amazon CloudWatch**: CloudWatch monitors resource performance metrics (CPU, memory, network) and logs application data; it does not record API-level account activity.

❌ **C. AWS Config**: AWS Config tracks the configuration state of AWS resources and evaluates them against compliance rules, but it is not focused on logging individual API calls and user actions.

❌ **D. AWS Health**: AWS Health provides alerts about events that may affect your AWS services and resources (e.g., scheduled maintenance, service disruptions); it does not log account activity.

💡 **Exam Tip**: CloudTrail = WHO did WHAT, WHEN, and FROM WHERE (API audit log). CloudWatch = resource metrics and alarms (performance monitoring). Config = resource configuration history and compliance. Health = AWS service event notifications.

---

## Q12. Characteristics of Amazon S3 (Choose TWO)

Which of the following are characteristics of Amazon S3? (Choose TWO)

- A. Global file system
- B. Object store
- C. Local file storage
- D. Network file system
- E. Highly durable storage system

**Answer: B, E**

✅ **B. Object store**: Amazon S3 stores data as objects (files + metadata) in buckets. Each object is accessed via a unique URL/key rather than a file path hierarchy, making it an object storage service.

✅ **E. Highly durable storage system**: Amazon S3 is designed for 99.999999999% (11 nines) durability by automatically storing copies of every object across multiple devices and facilities within an AWS Region.

❌ **A. Global file system**: S3 is not a traditional file system; it is accessed via HTTP/S APIs (REST), not mounted as a filesystem. Amazon EFS is a managed network file system.

❌ **C. Local file storage**: S3 is a cloud-based, remote storage service; it is not local file storage. Instance Store provides temporary local storage on EC2.

❌ **D. Network file system**: A Network File System (NFS) is a protocol for shared file access; S3 uses REST APIs. Amazon EFS provides NFS-compatible shared file storage.

💡 **Exam Tip**: S3 = Object Storage + 11 nines durability + accessed via REST API/URL + globally unique bucket names. EFS = NFS (mountable, shared file system for Linux). EBS = Block storage (attached to one EC2 instance).

---

## Q13. Services Used in a Hybrid AWS Cloud Architecture (Choose TWO)

Which services can be used in a hybrid AWS cloud architecture? (Choose TWO)

- A. Amazon Route 53
- B. Virtual Private Gateway
- C. Classic Load Balancer
- D. Auto Scaling
- E. Amazon CloudWatch basic metrics

**Answer: A, B**

✅ **A. Amazon Route 53**: Route 53 is AWS's DNS service that can route traffic between on-premises data centers and AWS resources, making it a key component in hybrid architectures for traffic management and DNS failover.

✅ **B. Virtual Private Gateway**: A Virtual Private Gateway (VGW) is the VPN concentrator on the AWS side of a Site-to-Site VPN connection or AWS Direct Connect, enabling secure, private connectivity between on-premises networks and AWS — the fundamental building block of hybrid networking.

❌ **C. Classic Load Balancer**: The Classic Load Balancer distributes traffic among EC2 instances within AWS; it does not facilitate connectivity between on-premises and cloud environments.

❌ **D. Auto Scaling**: Auto Scaling automatically adjusts the number of EC2 instances based on demand; it is a cloud-side scaling feature and is not specific to hybrid connectivity.

❌ **E. Amazon CloudWatch basic metrics**: CloudWatch basic metrics provide monitoring for AWS resources; while it can monitor some on-premises resources with agents, it is not a hybrid connectivity service.

💡 **Exam Tip**: Hybrid connectivity options: Virtual Private Gateway + Customer Gateway = Site-to-Site VPN. AWS Direct Connect = dedicated private connection. Transit Gateway = hub connecting multiple VPCs and on-premises networks.

---

## Q14. Costs Included When Comparing AWS TCO to On-Premises TCO

When comparing AWS Total Cost of Ownership (TCO) to on-premises TCO, which cost is included in the comparison?

- A. Project management
- B. Antivirus software licenses
- C. Data center security
- D. Software development

**Answer: C**

✅ **C. Data center security**: On-premises data center costs include physical security (guards, cameras, access controls, fencing), which are eliminated when migrating to AWS since AWS manages physical security of its facilities. This is a direct infrastructure cost that disappears in the AWS model, making it central to a TCO comparison.

❌ **A. Project management**: Project management costs exist in both on-premises and cloud environments and are typically excluded from infrastructure TCO comparisons.

❌ **B. Antivirus software licenses**: Antivirus and endpoint security costs are application-level expenses that exist in both environments; they are not an infrastructure TCO differentiator.

❌ **D. Software development**: Software development costs are the same regardless of the underlying infrastructure model and are not part of an infrastructure TCO comparison.

💡 **Exam Tip**: AWS TCO Calculator helps compare on-premises costs vs. AWS. On-premises costs that disappear with AWS: physical servers, data center space, power/cooling, physical network hardware, and physical security. Use the AWS Pricing Calculator for AWS cost estimates and AWS TCO Calculator for migration business cases.

---

## Q15. Self-Hosted Database Requiring Nightly Shutdown on AWS

A company is considering AWS for a self-hosted database that requires nightly shutdowns to reduce maintenance and costs. Which service should the company use?

- A. Amazon Redshift
- B. Amazon DynamoDB
- C. Amazon EC2 with Instance Store
- D. Amazon EC2 with Amazon EBS

**Answer: D**

✅ **D. Amazon EC2 with Amazon EBS**: Running a self-managed database on an EC2 instance with EBS volumes allows the company to stop the instance at night (stopping billing for compute) while the EBS volume persists the data. When the instance restarts the next day, all data remains intact on the EBS volume.

❌ **A. Amazon Redshift**: Redshift is a fully managed data warehouse service; you cannot shut it down nightly to reduce costs in the same way. It is not designed for self-hosted database management.

❌ **B. Amazon DynamoDB**: DynamoDB is a fully managed NoSQL service; you do not control its uptime. There is no "shut it down at night" option because AWS manages the infrastructure.

❌ **C. Amazon EC2 with Instance Store**: Instance Store provides temporary block storage that is ephemeral — data is lost when the instance stops or terminates. Nightly shutdown would destroy all database data on Instance Store volumes.

💡 **Exam Tip**: EBS = persistent block storage that survives instance stop/start. Instance Store = ephemeral, lost when instance stops. Key rule: if data must survive a stop, use EBS, not Instance Store.

---

## Q16. Correct Relationship Between Regions, Availability Zones, and Edge Locations

Which of the following correctly describes the relationship between Regions, Availability Zones, and Edge Locations?

- A. Data centers contain Regions.
- B. Regions contain Availability Zones.
- C. Availability Zones contain Edge Locations.
- D. Edge Locations contain Regions.

**Answer: B**

✅ **B. Regions contain Availability Zones**: An AWS Region is a geographic area (e.g., us-east-1) that consists of two or more Availability Zones. Each AZ is one or more discrete data centers with redundant power, networking, and connectivity within that Region.

❌ **A. Data centers contain Regions**: This is inverted. A Region contains one or more data centers grouped into AZs; Regions are not inside individual data centers.

❌ **C. Availability Zones contain Edge Locations**: Edge Locations are part of the AWS CloudFront CDN network and are separate from AZs. They are located in major cities worldwide, not inside AZs.

❌ **D. Edge Locations contain Regions**: This is completely inverted. Edge Locations are small caching/CDN points of presence and do not contain Regions.

💡 **Exam Tip**: Hierarchy = Region > Availability Zone (AZ) > Data Center. Edge Locations are separate — they are CloudFront CDN nodes for low-latency content delivery and are NOT part of the Region/AZ structure. AWS has more Edge Locations than Regions.

---

## Q17. AWS Tools That Support Cost Estimation (Choose THREE)

Which AWS tools support cost estimation? (Choose THREE)

- A. Detailed Billing Reports
- B. Cost Allocation Tags
- C. AWS Pricing Calculator
- D. AWS TCO Calculator
- E. Cost Estimator

**Answer: B, C, D**

✅ **B. Cost Allocation Tags**: Cost Allocation Tags let you categorize and track costs by project, department, or team, which helps estimate and understand spending patterns across your resources.

✅ **C. AWS Pricing Calculator**: The AWS Pricing Calculator (formerly Simple Monthly Calculator) lets you model your AWS architecture and estimate the monthly cost before you deploy, making it a primary cost estimation tool.

✅ **D. AWS TCO Calculator**: The AWS TCO Calculator helps you estimate the total cost of ownership when migrating from on-premises to AWS, comparing infrastructure costs across both environments.

❌ **A. Detailed Billing Reports**: Detailed Billing Reports show historical usage and cost data; they are reporting tools for past spending, not forward-looking estimation tools.

❌ **E. Cost Estimator**: "Cost Estimator" is not a specific named AWS service or tool. This is a distractor option.

💡 **Exam Tip**: AWS Pricing Calculator = estimate future AWS costs (what-if modeling). AWS TCO Calculator = on-premises vs. AWS migration business case. Cost Explorer = analyze and visualize PAST spending. These three serve different purposes — know which to use when.

---

## Q18. Benefits of AWS Consolidated Billing (Choose TWO)

Which of the following are benefits of AWS Consolidated Billing? (Choose TWO)

- A. Ability to receive a single invoice for multiple accounts
- B. Increased service limits by default for all accounts
- C. A fixed discount on the monthly bill
- D. Potential volume discounts from combined usage across all accounts
- E. Automatic extension of the master account's AWS Support plan to all accounts

**Answer: A, D**

✅ **A. Ability to receive a single invoice for multiple accounts**: Consolidated Billing under AWS Organizations combines all member account charges into a single monthly invoice sent to the management (master) account, simplifying financial management.

✅ **D. Potential volume discounts from combined usage across all accounts**: AWS aggregates usage from all linked accounts for services like S3 and EC2 Reserved Instances. Higher combined usage can qualify the entire organization for lower per-unit pricing tiers.

❌ **B. Increased service limits by default for all accounts**: Consolidated Billing does not automatically raise service limits. Service limit increases must be requested individually per service via AWS Service Quotas.

❌ **C. A fixed discount on the monthly bill**: There is no automatic fixed percentage discount for using Consolidated Billing. Volume discounts are usage-tier based, not a fixed discount.

❌ **E. Automatic extension of the master account's AWS Support plan to all accounts**: Support plans are per-account. The management account's Support plan does not automatically extend to member accounts; each account needs its own Support plan.

💡 **Exam Tip**: Consolidated Billing = 1 invoice + potential volume discounts (tiered pricing for S3, data transfer, etc.). AWS Organizations also enables Service Control Policies (SCPs) for governance. Volume discounts are automatic based on combined usage, not guaranteed fixed discounts.

---

## Q19. Reserved Instance Pricing Model with Highest Average Savings

Which Reserved Instance (RI) pricing model offers the highest average savings compared to On-Demand pricing?

- A. 1-year term, No Upfront, Standard RI
- B. 1-year term, All Upfront, Convertible RI
- C. 3-year term, All Upfront, Standard RI
- D. 3-year term, No Upfront, Convertible RI

**Answer: C**

✅ **C. 3-year term, All Upfront, Standard RI**: The maximum savings on Reserved Instances come from combining the longest commitment (3 years), the maximum upfront payment (All Upfront), and the Standard RI type (which offers deeper discounts than Convertible). This combination can save up to 72% compared to On-Demand pricing.

❌ **A. 1-year term, No Upfront, Standard RI**: Shorter term (1 year) and no upfront payment provide less discount compared to longer commitments with upfront payments.

❌ **B. 1-year term, All Upfront, Convertible RI**: While All Upfront increases savings, the 1-year term limits the discount depth. Convertible RIs also offer less discount than Standard RIs in exchange for flexibility.

❌ **D. 3-year term, No Upfront, Convertible RI**: The 3-year term helps, but No Upfront payment and Convertible type both reduce the discount compared to All Upfront Standard RIs.

💡 **Exam Tip**: RI savings factors — more savings from: Longer term (3yr > 1yr) + More upfront (All > Partial > No) + Standard (over Convertible). Standard RI = cannot change instance family. Convertible RI = can exchange for different instance family/size but lower discount (~45-54% vs ~72% for Standard 3yr All Upfront).

---

## Q20. AWS Advantages Compared to On-Premises and Virtualized Data Centers

Compared to the costs of traditional and virtualized on-premises data centers, AWS provides which of the following advantages?

- A. Increased variable costs and increased upfront costs
- B. Fixed usage costs and reduced upfront costs
- C. Lower variable costs and higher upfront costs
- D. Reduced variable costs and reduced upfront costs

**Answer: D**

✅ **D. Reduced variable costs and reduced upfront costs**: AWS eliminates the need to purchase hardware upfront (no CapEx), replacing it with a pay-as-you-go model. Because AWS aggregates usage from hundreds of thousands of customers, it achieves massive economies of scale that result in lower per-unit variable costs than a single company could achieve on its own.

❌ **A. Increased variable costs and increased upfront costs**: AWS is specifically designed to reduce both variable and upfront costs; this option is the opposite of the AWS value proposition.

❌ **B. Fixed usage costs and reduced upfront costs**: AWS pricing is variable (pay-as-you-go), not fixed. Fixed costs are characteristic of on-premises infrastructure.

❌ **C. Lower variable costs and higher upfront costs**: AWS requires no upfront infrastructure investment; there are no increased upfront costs with AWS compared to on-premises.

💡 **Exam Tip**: AWS's 6 advantages of cloud computing include: (1) Trade CapEx for variable expense, (2) Benefit from massive economies of scale, (3) Stop guessing capacity, (4) Increase speed and agility, (5) Stop spending money on data center operations, (6) Go global in minutes. Questions about AWS cost advantages almost always point to "no upfront cost + lower variable cost."

---

---
title: "AWS CLF-C02 Dump Explained Part 4"
date: 2026-06-18 01:04:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

This post covers 20 AWS CLF-C02 practice exam questions with detailed explanations in English. Each question includes the correct answer with reasoning, wrong answer explanations, and an exam tip to help you remember key concepts.

---

## Q1. Benefits of AWS Managed Services

What is the benefit of using AWS managed services such as Amazon ElastiCache and Amazon RDS (Amazon Relational Database Service)?

- A. You must monitor and replace failed instances yourself.
- B. They perform better than customer-managed services.
- C. They simplify patching and updates of the underlying OS.
- D. Customers do not need to optimize instance types or sizes.

**Answer: C**

✅ **C. They simplify patching and updates of the underlying OS**: AWS managed services handle routine maintenance tasks such as OS patching, software updates, and backups on behalf of the customer. This is one of the primary value propositions — offloading undifferentiated heavy lifting so teams can focus on their applications.

❌ **A. You must monitor and replace failed instances yourself**: This is incorrect. With managed services, AWS handles infrastructure-level failure detection and replacement automatically, reducing operational overhead.

❌ **B. They perform better than customer-managed services**: Performance depends on workload design and configuration, not simply on whether a service is managed. Managed does not automatically mean superior performance.

❌ **D. Customers do not need to optimize instance types or sizes**: Customers still need to select appropriate instance types and sizes. Right-sizing is still a customer responsibility even with managed services.

💡 **Exam Tip**: Managed services (RDS, ElastiCache, etc.) = AWS handles OS patching, hardware maintenance, and failure recovery. Customer responsibility = data, access control, and application-level configuration.

---

## Q2. Virtually Unlimited Durable Object Storage

Which service provides virtually unlimited, highly durable online object storage?

- A. Amazon Redshift
- B. Amazon Elastic File System (Amazon EFS)
- C. Amazon Elastic Container Service (Amazon ECS)
- D. Amazon S3

**Answer: D**

✅ **D. Amazon S3**: Amazon S3 (Simple Storage Service) is an object storage service that offers virtually unlimited storage capacity with 99.999999999% (11 nines) durability. It is designed for internet-scale storage of objects such as files, images, videos, and backups.

❌ **A. Amazon Redshift**: Redshift is a cloud data warehouse service used for analytical queries on structured data — not general-purpose object storage.

❌ **B. Amazon EFS**: Amazon EFS is a managed file system (NFS-based) for Linux workloads. It provides shared file storage, not object storage, and is not designed for unlimited internet-scale use.

❌ **C. Amazon ECS**: ECS is a container orchestration service for running Docker containers. It has nothing to do with object storage.

💡 **Exam Tip**: S3 = Object Storage + Unlimited scale + 99.999999999% durability (11 nines). If you see "object storage" in a question, think S3.

---

## Q3. IAM Entity Associated with Access Keys

When using the AWS CLI, which IAM (Identity and Access Management) entity is associated with an access key ID and secret access key?

- A. IAM Group
- B. IAM User
- C. IAM Role
- D. IAM Policy

**Answer: B**

✅ **B. IAM User**: Access key IDs and secret access keys are credentials that belong to IAM Users (or the AWS account root user). These long-term credentials are used for programmatic access to AWS via the CLI or SDK.

❌ **A. IAM Group**: An IAM Group is a collection of IAM users used to manage permissions collectively. Groups themselves do not have credentials or access keys.

❌ **C. IAM Role**: IAM Roles use temporary security credentials (STS tokens), not long-term access keys. Roles are assumed by services, EC2 instances, or federated users.

❌ **D. IAM Policy**: IAM Policies are JSON documents that define permissions. They are attached to users, groups, or roles, but they are not an identity and do not have credentials.

💡 **Exam Tip**: Access Key ID + Secret Access Key = IAM User (long-term credentials for programmatic access). IAM Role = temporary credentials via STS. Never share or hardcode access keys.

---

## Q4. AWS Security-Related Services (Choose 2)

Which of the following are security-related services provided by AWS? (Select TWO)

- A. Multi-factor authentication physical token
- B. AWS Trusted Advisor security checks
- C. Data encryption
- D. Automated penetration testing
- E. Amazon S3 copyrighted content detection

**Answer: A, B**

✅ **A. Multi-factor authentication physical token**: AWS supports hardware MFA tokens (physical devices) for adding an extra layer of authentication security to IAM users and the root account. This is a concrete security service offered by AWS.

✅ **B. AWS Trusted Advisor security checks**: Trusted Advisor includes a Security category that checks for things like open security groups, S3 bucket permissions, and MFA on root accounts — directly helping customers improve their security posture.

❌ **C. Data encryption**: While AWS provides tools to help with encryption (KMS, SSE, etc.), "data encryption" itself is a shared responsibility. Encryption of customer data is largely the customer's responsibility, not a single AWS-provided service.

❌ **D. Automated penetration testing**: AWS does not provide automated penetration testing as a service. Customers may conduct pen testing on their own resources but must follow AWS's penetration testing policy and do not use an AWS-provided tool for this.

❌ **E. Amazon S3 copyrighted content detection**: AWS does not offer a service for detecting copyrighted content in S3 buckets. This is not an AWS security service.

💡 **Exam Tip**: AWS Trusted Advisor has 5 pillars: Cost Optimization, Performance, Security, Fault Tolerance, and Service Limits. MFA tokens (hardware or virtual) are a real AWS security offering.

---

## Q5. AWS Managed Service for Hosting Databases

Which AWS managed service is used to host databases?

- A. AWS Batch
- B. AWS Artifact
- C. AWS Data Pipeline
- D. Amazon RDS

**Answer: D**

✅ **D. Amazon RDS**: Amazon RDS (Relational Database Service) is a fully managed database service that supports engines such as MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server. AWS handles provisioning, patching, backups, and failover.

❌ **A. AWS Batch**: AWS Batch is used to run large-scale batch computing workloads. It is not a database hosting service.

❌ **B. AWS Artifact**: AWS Artifact is a compliance documentation portal where customers can access AWS audit reports and compliance certifications. It has nothing to do with databases.

❌ **C. AWS Data Pipeline**: AWS Data Pipeline is a web service for orchestrating and automating the movement and transformation of data between different AWS services. It is not a database hosting platform.

💡 **Exam Tip**: RDS = Managed Relational Database (MySQL, PostgreSQL, Oracle, SQL Server, MariaDB, Aurora). Remember: RDS manages the DB engine; you still manage data and schema.

---

## Q6. Shared File Storage for Linux-Based Servers

Which AWS service provides a simple, scalable shared file storage solution compatible with Linux-based AWS and on-premises servers?

- A. Amazon S3
- B. Amazon Glacier
- C. Amazon EBS
- D. Amazon EFS

**Answer: D**

✅ **D. Amazon EFS**: Amazon EFS (Elastic File System) provides a fully managed NFS file system that can be mounted concurrently by multiple EC2 instances and on-premises servers via AWS Direct Connect or VPN. It scales automatically and is designed for Linux workloads.

❌ **A. Amazon S3**: S3 is object storage accessed via HTTP/HTTPS API, not a mountable file system. It cannot be mounted as a shared drive in the traditional sense.

❌ **B. Amazon Glacier**: Amazon Glacier (now S3 Glacier) is archival cold storage for infrequently accessed data. It is not a shared file system and has retrieval delays.

❌ **C. Amazon EBS**: EBS (Elastic Block Store) provides block-level storage volumes that attach to a single EC2 instance at a time (in standard configurations). It is not designed for shared multi-instance access.

💡 **Exam Tip**: EFS = Shared File System + NFS + Linux + Auto-scaling storage. EBS = Block storage for a single EC2 instance. S3 = Object storage via API. Glacier = Long-term archival.

---

## Q7. Core Design Principles for Cloud Applications

Which of the following is a core design principle when designing cloud applications?

- A. Use the largest instances possible
- B. Provision capacity for peak load
- C. Use the Scrum development process
- D. Implement elasticity

**Answer: D**

✅ **D. Implement elasticity**: Elasticity is a fundamental cloud design principle — the ability to automatically scale resources up or down based on actual demand. This prevents over-provisioning and ensures cost efficiency while maintaining performance.

❌ **A. Use the largest instances possible**: This violates the principle of right-sizing. Over-provisioned instances waste money. You should match instance size to actual workload requirements.

❌ **B. Provision capacity for peak load**: On-premises thinking involves provisioning for peak, but cloud best practice is to use elasticity to scale dynamically. Provisioning for peak in the cloud leads to unnecessary costs during off-peak periods.

❌ **C. Use the Scrum development process**: Scrum is a software development methodology, not a cloud architecture design principle. It is unrelated to how you architect AWS infrastructure.

💡 **Exam Tip**: AWS Well-Architected Framework core concepts include Elasticity, Scalability, High Availability, Loose Coupling, and Design for Failure. Elasticity = scale in/out automatically based on demand.

---

## Q8. Cost-Effective Long-Term Data Backup Storage

Which AWS service should be used for long-term, economical storage of data backups?

- A. Amazon RDS
- B. Amazon Glacier
- C. AWS Snowball
- D. AWS EBS

**Answer: B**

✅ **B. Amazon Glacier**: Amazon S3 Glacier (formerly Amazon Glacier) is purpose-built for long-term archival storage at very low cost. It is ideal for data that is infrequently accessed and where retrieval times of minutes to hours are acceptable, making it the most economical option for backup archives.

❌ **A. Amazon RDS**: RDS is a managed relational database service for active workloads. It is not designed or cost-optimized for long-term archival backup storage.

❌ **C. AWS Snowball**: AWS Snowball is a physical data transfer device used to migrate large amounts of data into or out of AWS. It is a migration tool, not a long-term storage service.

❌ **D. AWS EBS**: EBS is block storage attached to EC2 instances for active use. It is significantly more expensive than Glacier and not suited for long-term archival purposes.

💡 **Exam Tip**: For long-term archival at lowest cost = S3 Glacier or S3 Glacier Deep Archive. Glacier = retrieval in minutes to hours. Glacier Deep Archive = cheapest, retrieval up to 12 hours.

---

## Q9. Shared Controls in the Shared Responsibility Model

In the shared responsibility model for security and compliance, which of the following is a shared control between the customer and AWS?

- A. Physical controls
- B. Patch management
- C. Zone security
- D. Data center auditing

**Answer: B**

✅ **B. Patch management**: Patch management is a shared control. AWS is responsible for patching the underlying infrastructure (hypervisors, managed service OS), while customers are responsible for patching their own EC2 operating systems, applications, and software they deploy.

❌ **A. Physical controls**: Physical security of data centers — including perimeter security, guards, and access controls — is entirely AWS's responsibility. Customers have no role in physical controls.

❌ **C. Zone security**: Securing physical zones and facilities (network zones within data centers) is AWS's responsibility as part of infrastructure security, not shared with customers.

❌ **D. Data center auditing**: AWS conducts and publishes third-party audits (SOC, ISO, etc.) of its data centers. Customers do not participate in or share responsibility for auditing AWS physical facilities.

💡 **Exam Tip**: Shared Responsibility Model: AWS = "Security OF the cloud" (hardware, global infrastructure). Customer = "Security IN the cloud" (data, OS, applications, IAM). Shared controls = patch management, configuration management, awareness & training.

---

## Q10. Connecting On-Premises Data Centers to Amazon VPC

Which AWS service allows a company to connect its on-premises data center to an Amazon VPC?

- A. AWS VPN
- B. Amazon Redshift
- C. API Gateway
- D. Amazon Connect

**Answer: A**

✅ **A. AWS VPN**: AWS Site-to-Site VPN creates an encrypted tunnel over the public internet between your on-premises network and an Amazon VPC. It allows secure connectivity between on-premises data centers and AWS resources inside a VPC.

❌ **B. Amazon Redshift**: Amazon Redshift is a managed cloud data warehouse service for analytics. It has nothing to do with network connectivity between on-premises environments and VPCs.

❌ **C. API Gateway**: Amazon API Gateway is a service for creating, publishing, and managing APIs. It is not a network connectivity service for linking data centers to VPCs.

❌ **D. Amazon Connect**: Amazon Connect is a cloud-based contact center service. It is unrelated to network connectivity between on-premises infrastructure and AWS VPCs.

💡 **Exam Tip**: On-premises to VPC connectivity: AWS VPN = encrypted over internet (cost-effective). AWS Direct Connect = dedicated private connection (lower latency, higher bandwidth, no internet). Both connect to a Virtual Private Gateway.

---

## Q11. Serverless Architecture to Reduce Physical Compute Space

A company wants to reduce the physical computing space used by developers to run code. Which service supports serverless architecture to meet this need?

- A. Amazon Elastic Compute Cloud (Amazon EC2)
- B. AWS Lambda
- C. Amazon DynamoDB
- D. AWS CodeCommit

**Answer: B**

✅ **B. AWS Lambda**: AWS Lambda is a serverless compute service that runs code in response to events without requiring the provisioning or management of servers. Developers simply upload their code, and Lambda handles all infrastructure — eliminating any physical (or virtual) compute space concerns.

❌ **A. Amazon EC2**: EC2 provides virtual servers (instances) that customers must provision, configure, and manage. While cloud-based, it still involves managing virtual compute resources and does not represent a serverless model.

❌ **C. Amazon DynamoDB**: DynamoDB is a fully managed NoSQL database service. While it is serverless in that you don't manage servers, it is a database — not a compute/code execution service.

❌ **D. AWS CodeCommit**: AWS CodeCommit is a managed source control (Git) repository service. It is for storing and versioning code, not for executing it.

💡 **Exam Tip**: Serverless compute = AWS Lambda. Key features: no server management, pay only for execution time (per millisecond), scales automatically, triggered by events (S3, API Gateway, DynamoDB Streams, etc.).

---

## Q12. AWS Service That Alerts When Events Affect Your Resources

Which AWS service provides alerts when AWS events may affect a company's AWS resources?

- A. AWS Personal Health Dashboard
- B. AWS Service Health Dashboard
- C. AWS Trusted Advisor
- D. AWS Infrastructure Event Management

**Answer: A**

✅ **A. AWS Personal Health Dashboard**: The AWS Personal Health Dashboard (now called AWS Health) provides personalized notifications and alerts about AWS events that specifically affect your resources and account. It shows relevant and timely information about service issues, maintenance events, and changes impacting your workloads.

❌ **B. AWS Service Health Dashboard**: The Service Health Dashboard shows the general health of all AWS services across all regions — it is public and not personalized. It does not specifically target your account's resources.

❌ **C. AWS Trusted Advisor**: Trusted Advisor provides recommendations across five categories (cost, performance, security, fault tolerance, service limits). It does not send real-time alerts about AWS infrastructure events affecting your resources.

❌ **D. AWS Infrastructure Event Management**: This is a paid support program (available with Enterprise Support) that helps plan for large-scale events. It is not a self-service alerting dashboard.

💡 **Exam Tip**: Personal Health Dashboard = YOUR account's resource alerts (personalized). Service Health Dashboard = global AWS service status (public, not personalized). Remember: "Personal" = specific to your account.

---

## Q13. AWS Trusted Advisor Categories (Choose 2)

Which of the following are categories of AWS Trusted Advisor? (Select TWO)

- A. Fault Tolerance
- B. Instance Usage
- C. Infrastructure
- D. Performance
- E. Storage Capacity

**Answer: A, D**

✅ **A. Fault Tolerance**: Fault Tolerance is one of the five official Trusted Advisor check categories. It includes checks for things like EC2 availability zone balance, RDS Multi-AZ, and Auto Scaling groups.

✅ **D. Performance**: Performance is one of the five official Trusted Advisor check categories. It reviews your service usage and configuration to recommend improvements in speed and responsiveness.

❌ **B. Instance Usage**: "Instance Usage" is not an official Trusted Advisor category. Usage analysis may appear within Cost Optimization checks, but it is not a standalone category name.

❌ **C. Infrastructure**: "Infrastructure" is not one of the five Trusted Advisor categories. It may sound plausible, but it does not exist as an official pillar.

❌ **E. Storage Capacity**: "Storage Capacity" is not an official Trusted Advisor category. Storage-related recommendations appear within Cost Optimization or Fault Tolerance checks.

💡 **Exam Tip**: The 5 Trusted Advisor categories are: **Cost Optimization, Performance, Security, Fault Tolerance, Service Limits**. Memorize these five — exam questions often test whether you can identify valid vs. fake category names.

---

## Q14. AWS Responsibilities in the Shared Responsibility Model

In the shared responsibility model for security and compliance, which task is AWS responsible for?

- A. Granting access permissions to individuals and services
- B. Encrypting data in transit
- C. Updating Amazon EC2 host firmware
- D. Updating the operating system

**Answer: C**

✅ **C. Updating Amazon EC2 host firmware**: AWS is fully responsible for the physical and virtualization infrastructure, including updating firmware on the underlying EC2 host hardware. This is "security of the cloud" — customers have no access to or responsibility for host-level firmware.

❌ **A. Granting access permissions to individuals and services**: Managing IAM permissions, users, roles, and policies is the customer's responsibility. AWS provides the IAM tooling, but customers control who gets access to what.

❌ **B. Encrypting data in transit**: While AWS offers tools to help (TLS certificates, ACM, etc.), the decision to encrypt data in transit and properly configure it is the customer's responsibility for their applications.

❌ **D. Updating the operating system**: For EC2 instances, OS patching is the customer's responsibility. AWS handles the underlying hypervisor, but the guest OS on EC2 belongs to the customer. (Exception: managed services like RDS handle OS patching.)

💡 **Exam Tip**: AWS responsibility = physical hardware, hypervisors, global network infrastructure, host firmware, and managed service OS/software. Customer responsibility = guest OS on EC2, applications, data, IAM, and network configuration inside VPC.

---

## Q15. Finding and Deploying Third-Party Software on AWS

Where should you go to search listings from independent software vendors to find, test, purchase, and deploy software running on AWS?

- A. AWS Marketplace
- B. Amazon Lumberyard
- C. AWS Artifact
- D. Amazon CloudSearch

**Answer: A**

✅ **A. AWS Marketplace**: AWS Marketplace is a digital catalog with thousands of software listings from independent software vendors (ISVs). You can find, subscribe to, and deploy commercial software, SaaS solutions, and open-source tools directly into your AWS environment.

❌ **B. Amazon Lumberyard**: Amazon Lumberyard was a free, cross-platform 3D game engine (now deprecated/evolved into Open 3D Engine). It is not a software marketplace.

❌ **C. AWS Artifact**: AWS Artifact is a portal for accessing AWS compliance reports and certifications (SOC, ISO, PCI DSS, etc.). It is for audit documentation, not for purchasing or deploying software.

❌ **D. Amazon CloudSearch**: Amazon CloudSearch is a managed search service for adding search functionality to your application. It is not a marketplace for third-party software.

💡 **Exam Tip**: AWS Marketplace = "App Store" for AWS. Find, buy, and deploy third-party software (AMIs, SaaS, containers, data products) directly integrated with AWS billing and deployment.

---

## Q16. Benefits of Using the AWS Cloud

Which of the following is a benefit of using the AWS Cloud?

- A. Permissive security reduces management burden.
- B. The ability to focus on revenue-generating activities.
- C. Control over cloud network hardware.
- D. Choosing a specific cloud hardware vendor.

**Answer: B**

✅ **B. The ability to focus on revenue-generating activities**: By offloading undifferentiated heavy lifting (managing servers, data centers, networking hardware) to AWS, businesses can redirect their time, talent, and resources toward building products and services that generate revenue and competitive differentiation.

❌ **A. Permissive security reduces management burden**: AWS does not promote permissive (weak) security. The cloud is designed to enable strong security, and reducing security controls is never presented as a benefit.

❌ **C. Control over cloud network hardware**: Customers do not control the underlying cloud network hardware — that is entirely AWS's domain. This is a benefit of on-premises, not cloud.

❌ **D. Choosing a specific cloud hardware vendor**: Customers do not select which hardware vendors AWS uses. Hardware procurement and management is AWS's responsibility, abstracted away from customers.

💡 **Exam Tip**: Key AWS Cloud benefits include: trade capital expense for variable expense, stop guessing capacity, increase speed and agility, go global in minutes, stop spending money on running data centers, and focus on business differentiators.

---

## Q17. Compute Hosting Model for Physical Workload Isolation in TCO

When performing a TCO (Total Cost of Ownership) analysis that supports physical isolation of customer workloads, which compute hosting model should be considered?

- A. Dedicated Hosts
- B. Reserved Instances
- C. On-Demand Instances
- D. No upfront Reserved Instances

**Answer: A**

✅ **A. Dedicated Hosts**: A Dedicated Host is a physical EC2 server fully dedicated to a single customer's use. It provides physical isolation at the host hardware level, which is required for compliance requirements (licensing, regulatory) that mandate physical separation of workloads. In a TCO analysis, this model must be considered when physical isolation is a requirement.

❌ **B. Reserved Instances**: Reserved Instances are a billing/pricing model that offers discounts in exchange for a 1- or 3-year commitment. They do not guarantee physical isolation of the underlying hardware.

❌ **C. On-Demand Instances**: On-Demand Instances are shared (multi-tenant) by default and do not provide physical workload isolation. They are the standard pay-as-you-go model.

❌ **D. No upfront Reserved Instances**: This is a payment option for Reserved Instances (no upfront cost), not a compute model that addresses physical isolation.

💡 **Exam Tip**: Physical isolation = Dedicated Hosts (entire physical server for you) or Dedicated Instances (hardware not shared with other accounts). Dedicated Hosts also help with bring-your-own-license (BYOL) scenarios for per-socket or per-core licensing.

---

## Q18. Managing Infrastructure as Code on AWS

Which AWS service provides the ability to manage infrastructure as code?

- A. AWS CodePipeline
- B. AWS CodeDeploy
- C. AWS Direct Connect
- D. AWS CloudFormation

**Answer: D**

✅ **D. AWS CloudFormation**: AWS CloudFormation is AWS's native Infrastructure as Code (IaC) service. It allows you to define AWS resources in JSON or YAML templates and provision entire infrastructure stacks in a repeatable, version-controlled manner.

❌ **A. AWS CodePipeline**: CodePipeline is a continuous delivery service that automates the build, test, and deploy phases of your software release process. It is a CI/CD tool, not an IaC service.

❌ **B. AWS CodeDeploy**: CodeDeploy automates application deployments to EC2, Lambda, and on-premises servers. It deploys application code, not infrastructure definitions.

❌ **C. AWS Direct Connect**: Direct Connect is a dedicated private network connection between on-premises environments and AWS. It is a networking service, completely unrelated to infrastructure as code.

💡 **Exam Tip**: Infrastructure as Code on AWS = CloudFormation (native AWS) or AWS CDK (Cloud Development Kit, uses programming languages). CloudFormation templates = JSON or YAML. Think "template = blueprint for your infrastructure."

---

## Q19. Auditing Change Management for AWS Resources

When a customer needs to audit change management for AWS resources, which AWS service should be used?

- A. AWS Config
- B. AWS Trusted Advisor
- C. Amazon CloudWatch
- D. Amazon Inspector

**Answer: A**

✅ **A. AWS Config**: AWS Config is a service that continuously monitors and records your AWS resource configurations and evaluates them against desired configurations. It maintains a history of configuration changes, enabling you to audit who changed what resource, when, and what it was changed to — making it the ideal tool for change management auditing.

❌ **B. AWS Trusted Advisor**: Trusted Advisor provides best practice recommendations across cost, performance, security, fault tolerance, and service limits. It does not track or record configuration change history for audit purposes.

❌ **C. Amazon CloudWatch**: CloudWatch monitors performance metrics and logs for AWS services and applications. While it can capture some operational events, it is not designed for tracking configuration changes and compliance auditing of resources.

❌ **D. Amazon Inspector**: Amazon Inspector is an automated security vulnerability assessment service that checks EC2 instances and container images for software vulnerabilities and unintended network exposure. It does not track resource configuration changes.

💡 **Exam Tip**: AWS Config = configuration history + compliance auditing + "what changed and when." CloudWatch = performance monitoring + metrics + alarms. CloudTrail = API call history + who did what. Config is your tool for "drift detection" and change auditing.

---

## Q20. What is Amazon CloudWatch?

What is Amazon CloudWatch?

- A. A code repository with custom build and team commit capabilities.
- B. A metrics repository with customizable alert thresholds and channels.
- C. A security configuration repository with threat analysis capabilities.
- D. A rules repository for a web application firewall with automated vulnerability blocking.

**Answer: B**

✅ **B. A metrics repository with customizable alert thresholds and channels**: Amazon CloudWatch is fundamentally a monitoring and observability service that collects metrics from AWS services and custom sources, stores them, and allows you to set alarms (alert thresholds) that notify you through various channels (SNS, email, Lambda, etc.) when thresholds are breached.

❌ **A. A code repository with custom build and team commit capabilities**: This describes AWS CodeCommit (code repository) and AWS CodeBuild (build service). CloudWatch has no code repository functionality.

❌ **C. A security configuration repository with threat analysis capabilities**: This sounds like AWS Security Hub or AWS Config combined with threat detection. CloudWatch focuses on metrics and logs monitoring, not security configuration management or threat analysis.

❌ **D. A rules repository for a web application firewall with automated vulnerability blocking**: This describes AWS WAF (Web Application Firewall), which uses rules to inspect and block malicious web traffic. CloudWatch does not perform WAF functions.

💡 **Exam Tip**: Amazon CloudWatch = Metrics + Logs + Alarms + Dashboards. Key use cases: monitor EC2 CPU/memory, set billing alarms, create dashboards, trigger Auto Scaling actions. Default metric retention: 15 months.

---

*These questions are based on the AWS Certified Cloud Practitioner (CLF-C02) exam format. Study the AWS Well-Architected Framework, Shared Responsibility Model, and core AWS service use cases for best results.*

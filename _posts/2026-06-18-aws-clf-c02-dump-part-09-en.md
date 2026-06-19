---
title: "AWS CLF-C02 Dump Explained Part 9"
date: 2026-06-18 01:09:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

This post covers 20 AWS CLF-C02 practice questions from Batch 9, each translated into English with detailed answer explanations and exam tips to help you pass the AWS Certified Cloud Practitioner exam.

---

## Q1. Principle of Least Privilege for IAM Users

What does it mean to grant the minimum required permissions to an AWS IAM user?

- A. Grant permissions to only a single user.
- B. Grant permissions using only AWS IAM policies.
- C. Grant administrator access policy permissions to trusted users.
- D. Grant only the permissions necessary to perform a given task.

**Answer: D**

✅ **D. Grant only the permissions necessary to perform a given task**: The Principle of Least Privilege means users should be given only the exact permissions they need to do their job — nothing more. This limits the blast radius if credentials are compromised and reduces the risk of accidental or malicious misuse.

❌ **A. Grant permissions to only a single user**: Least privilege is about the scope of permissions, not the number of users who receive them. A single user can still have excessive privileges.

❌ **B. Grant permissions using only AWS IAM policies**: While IAM policies are the mechanism for granting permissions, using only policies does not itself enforce least privilege.

❌ **C. Grant administrator access to trusted users**: Giving administrator access goes against the principle of least privilege, as it grants far more permissions than most tasks require.

💡 **Exam Tip**: Least Privilege = give ONLY what is needed, WHEN it is needed. On the exam, any answer that limits scope of access to the minimum required is the correct approach for IAM security.

---

## Q2. Private Hybrid Cloud Connectivity to AWS

A manager is tasked with evaluating hybrid cloud architecture. The company currently accesses AWS via the public internet. Which service facilitates a private hybrid connection?

- A. Amazon VPC NAT Gateway
- B. AWS Direct Connect
- C. Amazon S3 Transfer Acceleration
- D. AWS Web Application Firewall (AWS WAF)

**Answer: B**

✅ **B. AWS Direct Connect**: AWS Direct Connect establishes a dedicated, private network connection from on-premises to AWS, bypassing the public internet entirely. It provides more consistent network performance and is the standard solution for private hybrid connectivity.

❌ **A. Amazon VPC NAT Gateway**: A NAT Gateway allows private subnet resources to access the internet outbound — it does not create a private link between on-premises infrastructure and AWS.

❌ **C. Amazon S3 Transfer Acceleration**: This service speeds up uploads to S3 by routing traffic through AWS edge locations, but it still uses the public internet and is not a hybrid connectivity solution.

❌ **D. AWS WAF**: AWS WAF is a web application firewall that protects against common web exploits. It has nothing to do with private network connectivity.

💡 **Exam Tip**: Private hybrid connection = **AWS Direct Connect**. If the question mentions "dedicated line," "private connection," or "bypass public internet," the answer is almost always Direct Connect.

---

## Q3. Reducing Tight Component Dependencies in Web Applications

A company's web application has heavy dependencies on core components, so if one component fails, the entire application fails. Which AWS Cloud design principle addresses this problem?

- A. Implement elasticity to scale the application up or down based on demand changes.
- B. Run multiple EC2 instances in parallel to improve performance.
- C. Focus on decoupling components so that individual components can function even when another component fails.
- D. Double the EC2 compute resources to increase system fault tolerance.

**Answer: C**

✅ **C. Decouple components so individual components can function independently**: Decoupling is the AWS Well-Architected principle that directly addresses tight dependencies. By separating components (e.g., using SQS queues, SNS topics, or microservices), the failure of one component does not cascade and bring down the entire system.

❌ **A. Implement elasticity**: Elasticity addresses capacity scaling to match demand, not the cascading failure problem caused by tight coupling.

❌ **B. Run multiple EC2 instances in parallel**: Running more instances improves performance and redundancy but does not fix the fundamental design problem of tightly coupled components.

❌ **D. Double EC2 compute resources**: Adding more compute power does not resolve the architectural issue of one failing component bringing down the whole application.

💡 **Exam Tip**: Tight coupling problem = **Decoupling** is the solution. AWS services that enable decoupling include Amazon SQS (queues), Amazon SNS (notifications), and microservices architectures.

---

## Q4. Strengthening AWS Account Login Security (Choose TWO)

What should a customer do to strengthen security for AWS account logins? (Choose two.)

- A. Configure AWS Certificate Manager
- B. Use Multi-Factor Authentication (MFA)
- C. Use Amazon Cognito for access management
- D. Configure a strong password policy
- E. Enable AWS Organizations support

**Answer: B, D**

✅ **B. Use Multi-Factor Authentication (MFA)**: MFA requires a second form of verification beyond just a password, dramatically reducing the risk of unauthorized access even if credentials are stolen.

✅ **D. Configure a strong password policy**: Enforcing password complexity, length, and rotation requirements reduces the risk of brute-force attacks and weak password exploitation.

❌ **A. Configure AWS Certificate Manager**: ACM manages SSL/TLS certificates for encrypting data in transit — it is not used to secure account logins.

❌ **C. Use Amazon Cognito**: Cognito is used for managing authentication for application users (customer identity), not for securing the AWS management console login itself.

❌ **E. Enable AWS Organizations support**: AWS Organizations is for managing multiple accounts and applying service control policies. It is not directly a login security measure.

💡 **Exam Tip**: AWS account login security = **MFA + Strong Password Policy**. These two always appear together on the exam as the correct pair for account-level security hardening.

---

## Q5. Centralized AWS Access Management Across Multiple Accounts

Which AWS service is used to centrally manage AWS access across multiple accounts?

- A. AWS Service Catalog
- B. AWS Config
- C. AWS Trusted Advisor
- D. AWS Organizations

**Answer: D**

✅ **D. AWS Organizations**: AWS Organizations allows you to centrally manage and govern multiple AWS accounts from a single management account. You can apply Service Control Policies (SCPs) to restrict what actions accounts can perform, consolidate billing, and organize accounts into Organizational Units (OUs).

❌ **A. AWS Service Catalog**: Service Catalog allows organizations to create and manage approved product catalogs, but it does not centrally manage access across multiple accounts.

❌ **B. AWS Config**: AWS Config tracks resource configuration changes and compliance within an account. While it can be aggregated across accounts, its purpose is configuration compliance, not access management.

❌ **C. AWS Trusted Advisor**: Trusted Advisor provides recommendations for cost, performance, security, and fault tolerance. It is an advisory tool, not an access management service.

💡 **Exam Tip**: Multi-account governance = **AWS Organizations**. Key features: consolidated billing, Service Control Policies (SCPs), and Organizational Units (OUs).

---

## Q6. Setting Cost Alert Notifications When Approaching a Spending Threshold

Which AWS service can a customer use to set up alert notifications when their account approaches a specific spending amount?

- A. AWS Cost and Usage Report
- B. AWS Budgets
- C. AWS Cost Explorer
- D. AWS Trusted Advisor

**Answer: B**

✅ **B. AWS Budgets**: AWS Budgets allows you to set custom cost and usage thresholds and configure automatic alerts (via email or SNS) when actual or forecasted spending approaches or exceeds those thresholds. It is purpose-built for proactive cost alerting.

❌ **A. AWS Cost and Usage Report**: The Cost and Usage Report provides detailed raw data about your AWS usage and costs, but it does not proactively send alerts when you approach a spending limit.

❌ **C. AWS Cost Explorer**: Cost Explorer is a visualization tool for analyzing historical and forecasted spending. It provides insights but does not trigger threshold-based alerts.

❌ **D. AWS Trusted Advisor**: Trusted Advisor provides best-practice recommendations across five categories, including cost optimization. However, it does not allow custom spend threshold alerts.

💡 **Exam Tip**: Cost alert / spending threshold notification = **AWS Budgets**. Remember: Budgets = proactive alerts; Cost Explorer = historical analysis; Cost and Usage Report = raw detailed data.

---

## Q7. What Can Users Access in AWS Artifact?

What can users access in AWS Artifact?

- A. AWS security and compliance documents
- B. Download configuration management details for all AWS resources
- C. Training materials for AWS services
- D. Security assessments for applications built on AWS Cloud

**Answer: A**

✅ **A. AWS security and compliance documents**: AWS Artifact is a self-service portal that provides on-demand access to AWS compliance reports (such as SOC reports, PCI DSS, ISO certifications) and security agreements. It is the go-to place for compliance documentation needed for audits.

❌ **B. Download configuration management details for all AWS resources**: Configuration management details are provided by AWS Config, not AWS Artifact.

❌ **C. Training materials for AWS services**: AWS training materials are available through AWS Training and Certification or AWS Skill Builder, not AWS Artifact.

❌ **D. Security assessments for applications built on AWS**: Application-level security assessments would be performed using services like Amazon Inspector or AWS Security Hub, not AWS Artifact.

💡 **Exam Tip**: AWS Artifact = **Compliance reports and agreements** (SOC 1/2/3, PCI DSS, ISO). When the question mentions audits, compliance documentation, or security certifications, think AWS Artifact.

---

## Q8. AWS Well-Architected Framework Design Principle Related to Reliability

Which of the following is an AWS Well-Architected Framework design principle related to reliability?

- A. Build in a single Availability Zone
- B. The ability to recover from failures
- C. Design for cost optimization
- D. Perform operations as code

**Answer: B**

✅ **B. The ability to recover from failures**: The Reliability pillar of the AWS Well-Architected Framework specifically focuses on a system's ability to recover from infrastructure or service disruptions, dynamically acquire computing resources to meet demand, and mitigate disruptions such as misconfigurations or transient network issues.

❌ **A. Build in a single Availability Zone**: This is the opposite of a reliability best practice. The Well-Architected Framework recommends distributing across multiple Availability Zones for high availability.

❌ **C. Design for cost optimization**: Cost optimization is its own separate pillar of the Well-Architected Framework, not a reliability principle.

❌ **D. Perform operations as code**: This principle belongs to the Operational Excellence pillar, not the Reliability pillar.

💡 **Exam Tip**: The 6 Well-Architected pillars: **CROPSS** — Cost Optimization, Reliability, Operational Excellence, Performance Efficiency, Security, Sustainability. Reliability = recover from failures, scale dynamically, test recovery procedures.

---

## Q9. AWS Storage Type That Is Deleted When an Instance Is Stopped or Terminated

Which type of AWS storage is deleted after use and is removed when an instance is stopped or terminated?

- A. Amazon EBS
- B. Amazon EC2 Instance Store
- C. Amazon EFS
- D. Amazon S3

**Answer: B**

✅ **B. Amazon EC2 Instance Store**: Instance Store provides temporary block-level storage physically attached to the host computer. The data is ephemeral — it is lost when the instance is stopped, hibernated, or terminated. It is ideal for temporary data like buffers, caches, or scratch data.

❌ **A. Amazon EBS**: Amazon Elastic Block Store persists independently of the instance lifecycle. EBS volumes can be detached and reattached, and data survives instance stops and restarts (unless explicitly deleted).

❌ **C. Amazon EFS**: Amazon Elastic File System is a fully managed, scalable file storage service that persists data independently of any EC2 instance lifecycle.

❌ **D. Amazon S3**: Amazon S3 is object storage that is completely independent of EC2 instances and persists indefinitely until objects are explicitly deleted.

💡 **Exam Tip**: EC2 Instance Store = **Ephemeral (temporary) storage**. Key rule: if instance stops or terminates, Instance Store data is GONE. For persistence, always use EBS, EFS, or S3.

---

## Q10. Benefits of AWS Cloud Over Traditional On-Premises Solutions

Which of the following is a benefit of using AWS Cloud compared to traditional on-premises solutions?

- A. Users do not need to guess about future capacity requirements.
- B. Users can leverage existing hardware contracts for purchases.
- C. Users can manage costs regardless of traffic levels.
- D. Users can use AWS reports to avoid audits.

**Answer: A**

✅ **A. Users do not need to guess about future capacity requirements**: AWS Cloud allows you to provision resources on demand and scale up or down as needed, eliminating the need to overprovision hardware based on peak demand forecasts. This is one of the core advantages of cloud computing — "stop guessing on your infrastructure capacity needs."

❌ **B. Users can leverage existing hardware contracts for purchases**: On-premises hardware contracts are not relevant to AWS Cloud. AWS operates on a pay-as-you-go model without hardware procurement.

❌ **C. Users can manage costs regardless of traffic levels**: AWS billing is usage-based, so costs do fluctuate with traffic. You can optimize costs, but they are not fixed regardless of traffic.

❌ **D. Users can use AWS reports to avoid audits**: AWS reporting tools support audit processes but cannot be used to avoid audits. Compliance requirements still apply to AWS workloads.

💡 **Exam Tip**: Key cloud benefits: **No capacity guessing, pay-as-you-go, elasticity, agility, economies of scale, global reach, no upfront hardware costs**. These are the "6 advantages of cloud computing" on the exam.

---

## Q11. AWS Managed Compute Service

Which of the following is an AWS managed compute service?

- A. Amazon SWF
- B. Amazon EC2
- C. AWS Lambda
- D. Amazon Aurora

**Answer: C**

✅ **C. AWS Lambda**: AWS Lambda is a fully managed, serverless compute service where AWS handles all the underlying infrastructure — servers, patching, scaling, and availability. You only provide the code and AWS manages everything else. This is the definition of a "managed compute service."

❌ **A. Amazon SWF**: Amazon Simple Workflow Service is a workflow orchestration service for coordinating tasks, not a compute service itself.

❌ **B. Amazon EC2**: While EC2 is a compute service, it is not fully managed in the same sense as Lambda. With EC2, you are responsible for the operating system, patching, and instance management.

❌ **D. Amazon Aurora**: Amazon Aurora is a managed relational database service (not a compute service). It handles database management, but it is in the database category.

💡 **Exam Tip**: **AWS Lambda = serverless + fully managed compute**. You upload code, set a trigger, and AWS handles everything else. No servers to provision or manage. Billing is per invocation and duration.

---

## Q12. Important Architectural Principle When Designing Cloud Applications

Which of the following is an important architectural principle when designing cloud applications?

- A. Store data and backups in the same region.
- B. Design tightly coupled system components.
- C. Avoid multi-threading.
- D. Design for failure.

**Answer: D**

✅ **D. Design for failure**: AWS best practices emphasize designing systems with the assumption that components WILL fail. By building in redundancy, health checks, auto-recovery, and failover mechanisms, you create resilient systems that can withstand individual component failures without impacting the overall application.

❌ **A. Store data and backups in the same region**: Storing backups in the same region as the primary data violates disaster recovery best practices. Best practice is to replicate backups to a different region or Availability Zone.

❌ **B. Design tightly coupled system components**: Tight coupling is an anti-pattern in cloud architecture. Tightly coupled systems fail together. The recommended practice is loose coupling (decoupled components).

❌ **C. Avoid multi-threading**: Multi-threading is a valid technique for improving application performance. Avoiding it would be a performance anti-pattern with no architectural justification.

💡 **Exam Tip**: Core AWS design principle = **Design for failure, nothing is 100% reliable**. Use Multi-AZ, Auto Scaling, health checks, and decoupled architectures to build fault-tolerant systems.

---

## Q13. Mechanism for Developers to Access AWS Services from Application Code

What mechanism allows developers to access AWS services from their application code?

- A. AWS Software Development Kit (SDK)
- B. AWS Management Console
- C. AWS CodePipeline
- D. AWS Config

**Answer: A**

✅ **A. AWS Software Development Kit (SDK)**: AWS SDKs provide libraries and APIs for popular programming languages (Python, Java, Node.js, .NET, Go, etc.) that allow developers to programmatically interact with AWS services directly from their application code. SDKs handle authentication, request signing, and API calls.

❌ **B. AWS Management Console**: The Management Console is a web-based graphical interface designed for human administrators, not for programmatic access from application code.

❌ **C. AWS CodePipeline**: CodePipeline is a CI/CD orchestration service for automating build, test, and deploy stages. It is not a mechanism for application code to access AWS services.

❌ **D. AWS Config**: AWS Config is a service that tracks resource configuration changes and evaluates compliance. It does not provide application-level access to AWS services.

💡 **Exam Tip**: **AWS SDK** = programmatic access from application code. **AWS CLI** = command-line access by administrators/developers. **AWS Console** = web browser GUI. Know which tool is right for each scenario.

---

## Q14. Most Cost-Effective EC2 Pricing Model for a Non-Continuous Workload Running Once a Year for 24 Hours

What is the most cost-effective Amazon EC2 pricing model for a non-continuous workload that runs once a year for 24 hours?

- A. On-Demand Instances
- B. Reserved Instances
- C. Spot Instances
- D. Dedicated Instances

**Answer: A**

✅ **A. On-Demand Instances**: For a workload that runs only once a year for 24 hours (very short, unpredictable usage), On-Demand is the most cost-effective choice. You pay only for the 24 hours of actual use with no upfront commitment. Reserved Instances require 1 or 3-year commitments, making them wasteful for such infrequent usage.

❌ **B. Reserved Instances**: Reserved Instances require a 1-year or 3-year commitment and are designed for steady-state, continuous workloads. For a workload running only 24 hours per year, you would pay for a year of reservation while using only a tiny fraction of it.

❌ **C. Spot Instances**: While Spot Instances offer the deepest discounts, they can be interrupted by AWS with 2-minute notice. For a mission-critical workload that needs to complete its 24-hour run reliably, the interruption risk makes Spot unsuitable.

❌ **D. Dedicated Instances**: Dedicated Instances run on hardware dedicated to a single customer (for compliance/licensing needs) and cost more than On-Demand. They are not cost-effective for infrequent short workloads.

💡 **Exam Tip**: EC2 pricing match: **On-Demand** = short/unpredictable; **Reserved** = steady-state 1-3 years (up to 72% savings); **Spot** = flexible/interruptible (up to 90% savings); **Savings Plans** = flexible commitment.

---

## Q15. Services That Can Run a MySQL-Compatible Database With Automatic Storage Scaling (Choose TWO)

Which of the following services can run a MySQL-compatible database that automatically scales storage as needed? (Choose two.)

- A. Amazon Elastic Compute Cloud (Amazon EC2)
- B. Amazon RDS for MySQL
- C. Amazon Lightsail
- D. Amazon Aurora

**Answer: B, D**

✅ **B. Amazon RDS for MySQL**: Amazon RDS for MySQL is a fully managed relational database service that supports MySQL and provides automated storage scaling with Amazon RDS Storage Autoscaling, which automatically increases storage capacity when your database is running low.

✅ **D. Amazon Aurora**: Amazon Aurora is MySQL-compatible (and PostgreSQL-compatible) and is designed to automatically scale storage from 10 GB up to 128 TB as needed, without any manual intervention.

❌ **A. Amazon EC2**: You can install MySQL on EC2, but storage scaling is not automatic — you would need to manually resize EBS volumes or implement a custom solution. EC2 is not a managed database service.

❌ **C. Amazon Lightsail**: While Lightsail offers simplified database instances, it does not provide the automatic storage scaling capabilities described and is not typically referenced for this use case in CLF-C02 exam content.

💡 **Exam Tip**: **Amazon Aurora** = MySQL & PostgreSQL compatible, auto-scales storage to 128 TB, up to 5x faster than standard MySQL. Both Aurora and RDS are managed services that handle patching, backups, and failover.

---

## Q16. Amazon VPC Feature That Connects Two VPCs Together

Which Amazon VPC feature allows users to connect two VPCs together?

- A. Amazon VPC Endpoints
- B. Amazon EC2 ClassicLink
- C. Amazon VPC Peering
- D. AWS Direct Connect

**Answer: C**

✅ **C. Amazon VPC Peering**: VPC Peering is a networking connection between two VPCs that enables routing traffic between them using private IP addresses. Instances in either VPC can communicate with each other as if they are within the same network. Peering works within a region, across regions, and even across AWS accounts.

❌ **A. Amazon VPC Endpoints**: VPC Endpoints allow private connectivity between a VPC and AWS services (like S3 or DynamoDB) without requiring an internet gateway. They connect a VPC to AWS services, not to another VPC.

❌ **B. Amazon EC2 ClassicLink**: ClassicLink was a feature that allowed EC2-Classic instances to communicate with VPC instances. It has been deprecated and was not used for connecting two VPCs together.

❌ **D. AWS Direct Connect**: Direct Connect connects an on-premises data center to AWS over a dedicated private line. It is not used to connect two VPCs together.

💡 **Exam Tip**: VPC-to-VPC connectivity = **VPC Peering** (direct 1:1 connection) or **AWS Transit Gateway** (hub-and-spoke for many VPCs). VPC Peering is non-transitive — peered VPCs cannot route through each other to reach a third VPC.

---

## Q17. Primary Purpose of Software Version Control

What is the primary purpose of software version control?

- A. Amazon CodeStar
- B. AWS Command Line Interface (AWS CLI)
- C. Amazon Cognito
- D. AWS CodeCommit

**Answer: D**

✅ **D. AWS CodeCommit**: AWS CodeCommit is a fully managed source control service that hosts secure Git-based repositories. It is AWS's version control service, allowing teams to store, manage, and track changes to application code over time — which is the definition of software version control.

❌ **A. Amazon CodeStar**: CodeStar is a project management service that provides a unified interface for developing, building, and deploying applications. It integrates with CodeCommit but is not itself a version control system.

❌ **B. AWS CLI**: The AWS CLI is a command-line tool for interacting with AWS services. It is not a version control or code repository service.

❌ **C. Amazon Cognito**: Amazon Cognito provides user authentication and identity management for web and mobile applications. It has no relation to version control.

💡 **Exam Tip**: **AWS CodeCommit** = Git-based source control (like GitHub/GitLab but managed by AWS). The AWS developer toolchain: CodeCommit (source) → CodeBuild (build) → CodeDeploy (deploy) → CodePipeline (orchestrate all).

---

## Q18. Tool for Comparing On-Premises Workload Costs to AWS Costs

A company is considering migrating its applications to AWS. They want to compare the cost of running on-premises workloads with the cost of running the same workloads on AWS. Which tool can be used to perform this comparison?

- A. AWS Pricing Calculator
- B. AWS Total Cost of Ownership (TCO) Calculator
- C. AWS Billing and Cost Management Console
- D. Cost Explorer

**Answer: B**

✅ **B. AWS Total Cost of Ownership (TCO) Calculator**: The AWS TCO Calculator is specifically designed to help customers compare the cost of running their existing on-premises infrastructure against the equivalent AWS Cloud deployment. It factors in hardware, software, facilities, IT labor, and other costs to produce a comprehensive comparison report.

❌ **A. AWS Pricing Calculator**: The AWS Pricing Calculator estimates the cost of AWS services for a proposed architecture. It is useful for planning AWS costs but does not compare against on-premises costs.

❌ **C. AWS Billing and Cost Management Console**: This console shows actual charges for existing AWS usage. It cannot be used to estimate or compare costs for workloads not yet on AWS.

❌ **D. Cost Explorer**: AWS Cost Explorer visualizes and analyzes historical and forecasted AWS spending. It requires actual AWS usage data and cannot compare against on-premises costs.

💡 **Exam Tip**: On-premises vs. AWS cost comparison = **AWS TCO Calculator**. New AWS architecture cost estimation = **AWS Pricing Calculator**. These two are commonly confused on the exam — know which is which.

---

## Q19. AWS Service for Migrating Exabyte-Scale Datasets to AWS

Which AWS service provides a secure, fast, and economical way to migrate or transfer exabyte-scale datasets to AWS?

- A. AWS Batch
- B. AWS Snowball
- C. AWS Migration Hub
- D. AWS Snowmobile

**Answer: D**

✅ **D. AWS Snowmobile**: AWS Snowmobile is an exabyte-scale data transfer service using a 45-foot long ruggedized shipping container (a literal truck). It can transfer up to 100 PB per Snowmobile, making it the right solution for moving exabyte-scale (1 EB = 1,000 PB) datasets when network transfer would take decades.

❌ **A. AWS Batch**: AWS Batch is a managed service for running batch computing jobs at scale. It has nothing to do with physical data migration or transfer to AWS.

❌ **B. AWS Snowball**: AWS Snowball is a petabyte-scale data transfer device (80 TB per device). While very useful for large migrations, it operates at the petabyte scale — not exabyte scale. Multiple Snowballs would be needed for exabytes, making Snowmobile the purpose-built solution.

❌ **C. AWS Migration Hub**: AWS Migration Hub provides a central dashboard to track the progress of application migrations to AWS. It is an orchestration/tracking tool, not a physical data transfer service.

💡 **Exam Tip**: Scale of AWS Snow family: **Snowcone** (8 TB, smallest) → **Snowball Edge** (80 TB, petabyte-scale) → **Snowmobile** (100 PB per truck, **exabyte-scale**). Exabyte = Snowmobile, always.

---

## Q20. Best Description of the AWS Pricing Model (Choose TWO)

Which of the following best describes the AWS pricing model? (Choose two.)

- A. Fixed term
- B. Pay-as-you-go
- C. Colocation
- D. Planned
- E. Variable cost

**Answer: B, E**

✅ **B. Pay-as-you-go**: AWS follows a pay-as-you-go model, meaning you only pay for the resources and services you actually use, with no upfront costs required (for most services). This eliminates the need to invest in infrastructure before knowing your actual demand.

✅ **E. Variable cost**: AWS costs are variable — they scale up or down based on actual consumption. This converts fixed capital expenditure (CapEx) into variable operational expenditure (OpEx), which is a fundamental benefit of cloud computing.

❌ **A. Fixed term**: AWS pricing is not fixed-term (except optionally with Reserved Instances or Savings Plans, which provide discounts in exchange for a commitment). The default AWS model is flexible and usage-based.

❌ **C. Colocation**: Colocation (colo) is a data center service where a customer rents physical space and power for their own hardware. This is an on-premises model, not an AWS Cloud pricing model.

❌ **D. Planned**: AWS does not require pre-planned capacity purchases. You provision what you need, when you need it, and pay only for what you use.

💡 **Exam Tip**: AWS pricing principles: **Pay-as-you-go** (no upfront required), **Pay less when you reserve** (Reserved Instances/Savings Plans), **Pay less with volume** (tiered pricing for S3, data transfer, etc.). CapEx → OpEx is a key cloud financial benefit.

---

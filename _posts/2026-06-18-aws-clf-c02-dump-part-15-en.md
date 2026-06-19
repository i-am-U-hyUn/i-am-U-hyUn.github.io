---
title: "AWS CLF-C02 Dump Explained Part 15"
date: 2026-06-18 01:15:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

This post covers 20 AWS CLF-C02 practice questions from batch 15, translated into English with detailed explanations for each correct and incorrect answer choice. Use these to reinforce your understanding of core AWS concepts before exam day.

---

## Q1. Cost Savings When Moving Workloads to AWS Cloud

A company wants to build a new application workload on AWS Cloud instead of using on-premises resources. Which cost can be reduced by using AWS Cloud?

- A. Cost of writing custom Java or Node.js code
- B. Security penetration testing
- C. Hardware needed to support the new application
- D. Writing specific test cases for third-party applications

**Answer: C**

✅ **C. Hardware needed to support the new application**: AWS operates and maintains the physical infrastructure, so customers no longer need to purchase, install, or maintain physical servers and hardware. This eliminates large upfront capital expenditures for hardware.

❌ **A. Cost of writing custom Java or Node.js code**: AWS does not write application code for you. Development costs remain the customer's responsibility regardless of whether you use cloud or on-premises.

❌ **B. Security penetration testing**: Penetration testing is still the customer's responsibility and can even require coordination with AWS. Moving to the cloud does not eliminate this cost.

❌ **D. Writing specific test cases for third-party applications**: Application testing is a customer responsibility. AWS does not cover the cost of writing or running test cases for your applications.

💡 **Exam Tip**: AWS Cloud = No CapEx for hardware. You trade capital expenditure (buying servers) for operational expenditure (pay-as-you-go). Key phrase: "eliminate hardware costs."

---

## Q2. What AWS Marketplace Allows Users to Do (Choose 2)

What actions does AWS Marketplace allow users to perform? (Choose 2)

- A. Sell unused Amazon EC2 Spot Instances
- B. Sell solutions to other AWS users
- C. Purchase third-party software that runs on AWS
- D. Purchase AWS security and compliance documentation
- E. Order AWS Snowball

**Answer: B, C**

✅ **B. Sell solutions to other AWS users**: AWS Marketplace allows independent software vendors and individuals to list and sell their software solutions, SaaS products, and AMIs to other AWS customers.

✅ **C. Purchase third-party software that runs on AWS**: AWS Marketplace is a digital catalog where customers can find, buy, and deploy software from third-party providers that is pre-configured to run on AWS.

❌ **A. Sell unused Amazon EC2 Spot Instances**: Spot Instance capacity is managed entirely by AWS based on available capacity. Individual customers cannot list or sell unused Spot Instances on the Marketplace.

❌ **D. Purchase AWS security and compliance documentation**: AWS compliance documents (like SOC reports, PCI DSS attestations) are available through AWS Artifact, not AWS Marketplace.

❌ **E. Order AWS Snowball**: AWS Snowball is ordered through the AWS Management Console or AWS Snow Family console, not through AWS Marketplace.

💡 **Exam Tip**: AWS Marketplace = Buy/Sell software (AMIs, SaaS, data) that runs ON AWS. AWS Artifact = Compliance documents. AWS Snow Family console = Order Snowball devices.

---

## Q3. Meaning of Hybrid Cloud Architecture on AWS

What does it mean when a user builds a hybrid cloud architecture on AWS?

- A. All resources run using on-premises infrastructure
- B. Some resources run on-premises and some run in a colocation center
- C. All resources run in the AWS Cloud
- D. Some resources run on-premises and some run in the AWS Cloud

**Answer: D**

✅ **D. Some resources run on-premises and some run in the AWS Cloud**: A hybrid cloud architecture combines on-premises (or private cloud) infrastructure with public cloud services (AWS). This allows companies to keep sensitive workloads on-premises while leveraging AWS for scalability and other services.

❌ **A. All resources run using on-premises infrastructure**: This describes a fully on-premises (private) architecture, not a hybrid cloud.

❌ **B. Some resources run on-premises and some run in a colocation center**: This describes a traditional distributed data center model but does not involve any cloud provider, so it is not a hybrid cloud.

❌ **C. All resources run in the AWS Cloud**: This describes a fully cloud-native or "all-in" cloud architecture, not a hybrid model.

💡 **Exam Tip**: Hybrid Cloud = On-premises + AWS Cloud together. Services that support hybrid: AWS Direct Connect, AWS VPN, AWS Outposts, AWS Storage Gateway.

---

## Q4. AWS Service to Identify Resource Changes Over Time

Which AWS service allows users to identify changes to resources over time?

- A. Amazon Detective
- B. AWS Config
- C. AWS Service Catalog
- D. AWS IAM

**Answer: B**

✅ **B. AWS Config**: AWS Config continuously records and tracks configuration changes to AWS resources over time. It provides a history of resource configurations, allowing you to see what changed, when it changed, and who changed it.

❌ **A. Amazon Detective**: Amazon Detective is a security service that analyzes log data to help investigate and identify the root cause of security findings. It focuses on security investigations, not general resource configuration tracking.

❌ **C. AWS Service Catalog**: AWS Service Catalog allows organizations to create and manage catalogs of approved IT services. It is used for governance and standardization of deployments, not for tracking resource changes over time.

❌ **D. AWS IAM**: AWS IAM (Identity and Access Management) manages user permissions and access control. While it controls who can make changes, it does not track resource configuration changes over time.

💡 **Exam Tip**: AWS Config = Configuration history + compliance auditing + "what changed and when." CloudTrail = WHO made the API call. Config = WHAT the resource looks like and how it changed.

---

## Q5. How to Reduce Total Cost of Ownership (TCO) Using AWS

How can you reduce Total Cost of Ownership (TCO) using AWS?

- A. By minimizing large capital expenditures
- B. Not being responsible for third-party licensing costs
- C. Not spending on operational expenses
- D. Having AWS manage your applications

**Answer: A**

✅ **A. By minimizing large capital expenditures**: AWS uses a pay-as-you-go model, eliminating the need to purchase physical hardware upfront. This converts large capital expenditures (CapEx) into smaller, predictable operational expenditures (OpEx), which is a primary driver of TCO reduction.

❌ **B. Not being responsible for third-party licensing costs**: Third-party software license costs (e.g., Oracle, Windows) are still the customer's responsibility unless using License Included options. AWS does not eliminate third-party licensing fees.

❌ **C. Not spending on operational expenses**: Moving to AWS does not eliminate operational expenses — you still pay for compute, storage, and data transfer. The model shifts from CapEx to OpEx, not to zero cost.

❌ **D. Having AWS manage your applications**: AWS manages the underlying infrastructure under the shared responsibility model, but application management, deployment, and operations remain the customer's responsibility.

💡 **Exam Tip**: TCO reduction with AWS = CapEx to OpEx conversion. Key terms: no upfront hardware costs, no data center maintenance, economies of scale, pay only for what you use.

---

## Q6. Customer Responsibility Under the AWS Shared Responsibility Model

According to the AWS Shared Responsibility Model, what is the customer's responsibility in the AWS Cloud?

- A. Ensuring network connectivity from AWS to the internet
- B. Patching and fixing defects within the AWS Cloud infrastructure
- C. Ensuring physical security of cloud data centers
- D. Ensuring Amazon EBS volume backups

**Answer: D**

✅ **D. Ensuring Amazon EBS volume backups**: Customers are responsible for their data, including backing up Amazon EBS volumes. AWS provides the tools (snapshots, AWS Backup), but the responsibility for creating and managing backups lies with the customer.

❌ **A. Ensuring network connectivity from AWS to the internet**: AWS is responsible for maintaining the global network infrastructure, including internet connectivity from its data centers.

❌ **B. Patching and fixing defects within the AWS Cloud infrastructure**: AWS is responsible for patching and maintaining the underlying infrastructure (hardware, hypervisor, networking). Customers patch their own OS and applications.

❌ **C. Ensuring physical security of cloud data centers**: Physical security of AWS facilities is entirely AWS's responsibility ("security OF the cloud"). Customers have no access to or responsibility for data center physical security.

💡 **Exam Tip**: Shared Responsibility = AWS secures "OF the cloud" (hardware, facilities, network), Customer secures "IN the cloud" (data, OS patches, IAM, backups, encryption). EBS backups = Customer's job.

---

## Q7. Advantages of AWS Cloud (Choose 2)

What are the advantages of the AWS Cloud? (Choose 2)

- A. Fixed monthly cost rate
- B. No need to guess capacity requirements
- C. Faster time to market
- D. Increased initial capital expenditure
- E. Physical access to cloud data centers

**Answer: B, C**

✅ **B. No need to guess capacity requirements**: AWS allows you to scale resources up or down on demand. You no longer need to over-provision or under-provision infrastructure — you simply adjust capacity as needed, paying only for what you use.

✅ **C. Faster time to market**: AWS provides ready-to-use services (databases, AI/ML, networking) that dramatically reduce development and deployment time, enabling organizations to launch products and features faster.

❌ **A. Fixed monthly cost rate**: AWS pricing is dynamic and usage-based (pay-as-you-go), not a fixed monthly rate. Your bill varies based on actual resource consumption.

❌ **D. Increased initial capital expenditure**: One of the primary benefits of AWS is the elimination of large upfront capital expenditures. AWS reduces, not increases, initial CapEx.

❌ **E. Physical access to cloud data centers**: AWS data centers are not accessible to customers. Physical security is managed entirely by AWS as part of their responsibility.

💡 **Exam Tip**: The 6 advantages of cloud computing include: trade CapEx for OpEx, massive economies of scale, stop guessing capacity, increase speed and agility, stop spending on data centers, go global in minutes.

---

## Q8. Costs to Consider When Comparing On-Premises TCO vs. Cloud (Choose 2)

When comparing the Total Cost of Ownership (TCO) of on-premises infrastructure to a cloud architecture, which costs should be considered? (Choose 2)

- A. Credit card processing fees for application transactions in the cloud
- B. Costs of purchasing and installing server hardware in an on-premises data center
- C. Infrastructure management costs including OS installation, patching, backup, and disaster recovery
- D. Costs of third-party penetration testing
- E. Advertising costs related to ongoing company-wide campaigns

**Answer: B, C**

✅ **B. Costs of purchasing and installing server hardware in an on-premises data center**: Hardware procurement, installation, and eventual replacement are significant on-premises costs that disappear when migrating to AWS. These are core CapEx items in any TCO comparison.

✅ **C. Infrastructure management costs including OS installation, patching, backup, and disaster recovery**: Managing on-premises infrastructure requires dedicated IT staff and tooling for routine tasks. AWS significantly reduces these operational burdens through managed services.

❌ **A. Credit card processing fees for application transactions in the cloud**: Payment processing fees are business operating costs unrelated to the infrastructure comparison between on-premises and cloud.

❌ **D. Costs of third-party penetration testing**: Penetration testing is a security practice that applies regardless of whether you use on-premises or cloud infrastructure and is not a differentiating cost factor in TCO comparisons.

❌ **E. Advertising costs related to ongoing company-wide campaigns**: Advertising costs are a business expense completely unrelated to infrastructure TCO.

💡 **Exam Tip**: TCO comparison = Look for hardware costs, staffing/operational costs, facilities costs (power, cooling, space), and software licensing. Ignore unrelated business costs (marketing, payment processing).

---

## Q9. AWS Feature to Leverage Service Usage Tiers Across Multiple Member Accounts

Which AWS feature allows a company to leverage service usage tiers across multiple member accounts?

- A. Service Control Policies (SCP)
- B. Consolidated Billing
- C. All Reserved Instances
- D. AWS Cost Explorer

**Answer: B**

✅ **B. Consolidated Billing**: AWS Organizations Consolidated Billing aggregates usage across all member accounts. This allows the organization to reach higher usage tiers faster (e.g., S3 tiered pricing, data transfer discounts) and share Reserved Instance and Savings Plans benefits across accounts.

❌ **A. Service Control Policies (SCP)**: SCPs are governance tools in AWS Organizations that restrict what actions member accounts can perform. They manage permissions, not billing or cost optimization.

❌ **C. All Reserved Instances**: While Reserved Instances can be shared across accounts in an AWS Organization, this option as stated is not the AWS feature name that describes leveraging service usage tiers.

❌ **D. AWS Cost Explorer**: AWS Cost Explorer is a tool for visualizing and analyzing your AWS costs and usage. It provides insights but does not itself enable cross-account usage tier aggregation.

💡 **Exam Tip**: Consolidated Billing = Combine usage from all accounts in AWS Organizations to reach volume pricing tiers + share RI/Savings Plans discounts. One bill, aggregated usage, potential savings.

---

## Q10. Customer Responsibilities Under the Shared Responsibility Model

What is the customer's responsibility under the AWS Shared Responsibility Model?

- A. Virtualization infrastructure
- B. Network infrastructure
- C. Application security
- D. Physical security of hardware

**Answer: C**

✅ **C. Application security**: Customers are responsible for securing their applications, including authentication, authorization, input validation, encryption in transit and at rest, and application-level vulnerabilities.

❌ **A. Virtualization infrastructure**: AWS manages the hypervisor and virtualization layer as part of "security of the cloud." Customers do not have access to or responsibility for the virtualization infrastructure.

❌ **B. Network infrastructure**: The global AWS network infrastructure (routers, switches, physical cables) is managed and secured by AWS. Customers manage their own VPC configurations and security groups, but not the underlying physical network.

❌ **D. Physical security of hardware**: Physical security of AWS data centers and hardware is entirely AWS's responsibility. Customers cannot enter AWS facilities.

💡 **Exam Tip**: Customer = "IN the cloud" — data classification, IAM/user management, OS patching (on EC2), application security, encryption, network traffic (security groups/NACLs). AWS = "OF the cloud" — physical, network infrastructure, hypervisor.

---

## Q11. Reducing Latency for Global Users

What helps a company reduce latency for users around the world?

- A. Using an AWS Region that is central to all users
- B. Using a second Availability Zone in the AWS Region being used
- C. Enabling caching in the AWS Region being used
- D. Using edge locations to bring content closer to all users

**Answer: D**

✅ **D. Using edge locations to bring content closer to all users**: Amazon CloudFront uses a global network of edge locations (400+ worldwide) to cache and serve content from locations geographically close to end users. This dramatically reduces latency by minimizing the physical distance data must travel.

❌ **A. Using an AWS Region that is central to all users**: A single central AWS Region still results in high latency for users far from that region. There is no single region that is equally close to all global users.

❌ **B. Using a second Availability Zone in the AWS Region being used**: Additional Availability Zones improve availability and fault tolerance within a region but do not reduce latency for geographically distributed global users.

❌ **C. Enabling caching in the AWS Region being used**: Regional caching can improve performance for users near that region, but users far away will still experience high latency. CloudFront edge locations are specifically designed to solve global latency.

💡 **Exam Tip**: Global latency reduction = CloudFront + Edge Locations. Edge locations are separate from Regions/AZs and exist to cache content close to end users. CloudFront = CDN (Content Delivery Network).

---

## Q12. How AWS Cloud Improves Employee Productivity After Migration

After migrating from an on-premises data center, how can AWS Cloud increase employee productivity?

- A. Users do not need to wait for infrastructure provisioning
- B. AWS Cloud infrastructure is much faster than on-premises data center infrastructure
- C. AWS takes over application configuration management on behalf of the user
- D. Users do not need to deal with security and compliance issues

**Answer: A**

✅ **A. Users do not need to wait for infrastructure provisioning**: On-premises infrastructure provisioning can take weeks or months (ordering hardware, delivery, installation). With AWS, resources can be provisioned in minutes through the console or API, allowing developers and teams to work faster and more efficiently.

❌ **B. AWS Cloud infrastructure is much faster than on-premises data center infrastructure**: While AWS infrastructure is highly optimized, the primary productivity gain is not raw speed but agility — the ability to provision and scale resources quickly.

❌ **C. AWS takes over application configuration management on behalf of the user**: AWS does not manage application configuration. Application configuration, deployment, and management remain the customer's responsibility.

❌ **D. Users do not need to deal with security and compliance issues**: Security and compliance remain a shared responsibility. Customers must still manage their own security configurations, IAM policies, and compliance requirements.

💡 **Exam Tip**: AWS productivity benefit = Agility (provision in minutes, not months). No more waiting for hardware. Self-service provisioning through Console/CLI/API = faster time to value.

---

## Q13. AWS Service to Quickly and Automatically Create and Manage AWS Accounts

Which AWS service allows you to quickly and automatically create and manage AWS accounts?

- A. AWS QuickSight
- B. Amazon Lightsail
- C. AWS Organizations
- D. Amazon Connect

**Answer: C**

✅ **C. AWS Organizations**: AWS Organizations allows you to programmatically create and manage multiple AWS accounts centrally. You can automate account creation, apply governance policies (SCPs), enable consolidated billing, and organize accounts into Organizational Units (OUs).

❌ **A. AWS QuickSight**: AWS QuickSight is a business intelligence (BI) and data visualization service. It is used for creating dashboards and reports, not for managing AWS accounts.

❌ **B. Amazon Lightsail**: Amazon Lightsail is a simplified cloud platform for deploying small-scale applications and websites with predictable pricing. It is not used for account management.

❌ **D. Amazon Connect**: Amazon Connect is a cloud-based contact center service for handling customer calls and interactions. It has no role in AWS account management.

💡 **Exam Tip**: AWS Organizations = Multi-account management, consolidated billing, SCPs (Service Control Policies), and automated account vending. It is the foundation of AWS Landing Zone and Control Tower.

---

## Q14. Amazon RDS Feature to Achieve High Availability

Which Amazon RDS feature can be used to achieve high availability?

- A. Multiple Availability Zones
- B. Amazon Reserved Instances
- C. Provisioned IOPS storage
- D. Enhanced Monitoring

**Answer: A**

✅ **A. Multiple Availability Zones**: Amazon RDS Multi-AZ automatically creates a synchronous standby replica in a different Availability Zone. In the event of a primary instance failure, RDS automatically fails over to the standby, providing high availability and data durability.

❌ **B. Amazon Reserved Instances**: Reserved Instances are a pricing model that offers significant discounts in exchange for a commitment to use specific instance types. They do not affect availability or redundancy.

❌ **C. Provisioned IOPS storage**: Provisioned IOPS (io1/io2) provides consistent, high-performance storage for I/O-intensive workloads. This improves performance but does not directly provide high availability or automatic failover.

❌ **D. Enhanced Monitoring**: Enhanced Monitoring provides real-time OS-level metrics for RDS instances. It helps with operational visibility but does not contribute to high availability.

💡 **Exam Tip**: RDS High Availability = Multi-AZ deployment (synchronous replication, automatic failover). RDS Read Replicas = performance/read scaling (asynchronous, NOT high availability failover). These are different features.

---

## Q15. Where to Report AWS Resources Used for Malicious Purposes

Where should users report that AWS resources are being used for malicious purposes?

- A. AWS Trust & Safety team
- B. AWS Shield
- C. AWS Support
- D. AWS Developer Forums

**Answer: A**

✅ **A. AWS Trust & Safety team**: The AWS Trust & Safety team is the designated contact for reporting abuse of AWS resources, including spam, malware hosting, DDoS attacks originating from AWS, phishing, and other malicious activities. Reports can be submitted at reportphishing@amazon.com or through the AWS abuse report form.

❌ **B. AWS Shield**: AWS Shield is a managed DDoS protection service that protects your own resources. It is not a reporting channel for abuse by third parties.

❌ **C. AWS Support**: AWS Support handles technical issues, billing questions, and service-related problems. Reporting malicious use of AWS resources should go to the Trust & Safety team, not general support.

❌ **D. AWS Developer Forums**: AWS Developer Forums are community discussion boards for technical questions and knowledge sharing. They are not an appropriate channel for reporting abuse or malicious activity.

💡 **Exam Tip**: AWS abuse reporting = AWS Trust & Safety team (abuse@amazonaws.com). This covers spam, malware, phishing, port scanning, and DDoS originating from AWS IPs. Not AWS Support, not AWS Shield.

---

## Q16. AWS Service to Track All User Account Changes in the Management Console

Which AWS service must be enabled to track all user account changes in the AWS Management Console?

- A. AWS CloudTrail
- B. Amazon Simple Notification Service (Amazon SNS)
- C. VPC Flow Logs
- D. AWS CloudHSM

**Answer: A**

✅ **A. AWS CloudTrail**: AWS CloudTrail records all API calls and user activity across your AWS account, including actions taken through the Management Console, CLI, and SDKs. It provides a complete audit trail of who did what, when, and from where.

❌ **B. Amazon Simple Notification Service (Amazon SNS)**: Amazon SNS is a messaging and notification service used to send alerts and messages to subscribers. It does not record or track account changes on its own.

❌ **C. VPC Flow Logs**: VPC Flow Logs capture information about IP traffic flowing to and from network interfaces in your VPC. They track network traffic, not user account actions or API calls.

❌ **D. AWS CloudHSM**: AWS CloudHSM is a hardware security module service used for cryptographic key management and encryption. It is a security hardware service, not an auditing or logging service.

💡 **Exam Tip**: CloudTrail = API audit log (who called what API, when, from where). It is the #1 tool for governance, compliance, and security auditing. Enabled by default for 90 days; create a Trail for long-term retention in S3.

---

## Q17. AWS Cloud Design Best Practice

What is an AWS Cloud design best practice?

- A. Tight coupling between components
- B. Single point of failure
- C. High availability
- D. Over-provisioning of resources

**Answer: C**

✅ **C. High availability**: High availability is a core AWS Well-Architected Framework principle. Designing systems to remain operational despite component failures — using multiple AZs, load balancers, auto scaling, and redundancy — is a fundamental AWS best practice.

❌ **A. Tight coupling between components**: Tight coupling means components are highly dependent on each other, which reduces resilience. AWS best practices advocate for loosely coupled architectures (using SQS, SNS, API Gateway) so failures in one component don't cascade.

❌ **B. Single point of failure**: Having a single point of failure means one component failure can bring down the entire system. AWS best practices explicitly recommend eliminating single points of failure through redundancy and multi-AZ deployments.

❌ **D. Over-provisioning of resources**: Over-provisioning wastes money and is contrary to the cloud's value proposition. AWS promotes right-sizing and using Auto Scaling to match capacity to actual demand.

💡 **Exam Tip**: AWS Well-Architected Framework pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability. High Availability falls under Reliability. Avoid: tight coupling, SPOFs, over-provisioning.

---

## Q18. Example of Reducing Upfront Costs by Moving to AWS Cloud

Which is an example of reducing upfront costs by transitioning to the AWS Cloud?

- A. By replacing large variable costs with low capital investment
- B. By replacing large capital investments with low variable costs
- C. By provisioning compute and storage at a fixed level to meet peak demand
- D. By replacing iterative scaling of virtual servers with a simpler fixed scaling model

**Answer: B**

✅ **B. By replacing large capital investments with low variable costs**: This is one of the fundamental financial benefits of cloud computing. Instead of large upfront purchases of hardware (capital expenditure/CapEx), AWS allows you to pay only for what you use (variable/operational expenditure/OpEx), dramatically reducing initial investment.

❌ **A. By replacing large variable costs with low capital investment**: This is backwards. AWS reduces capital investment (CapEx), not variable costs. On-premises tends to have high CapEx, while AWS introduces variable (usage-based) costs.

❌ **C. By provisioning compute and storage at a fixed level to meet peak demand**: Fixed provisioning for peak demand is an on-premises approach that leads to waste. AWS encourages dynamic scaling to match actual demand, not fixed over-provisioning.

❌ **D. By replacing iterative scaling of virtual servers with a simpler fixed scaling model**: AWS promotes dynamic/elastic scaling, not fixed scaling. Auto Scaling automatically adjusts capacity based on demand, which is the opposite of a fixed scaling model.

💡 **Exam Tip**: Key cloud economics phrase: "Trade capital expense (CapEx) for operational expense (OpEx)." CapEx = buy servers upfront. OpEx = pay-as-you-go monthly. This is always the correct answer for "reducing upfront/initial costs."

---

## Q19. AWS Services to Increase Availability in a 3-Tier Web Application (Choose 2)

When designing a typical 3-tier web application, which AWS services and/or features increase availability and reduce impact? (Choose 2)

- A. AWS Auto Scaling for Amazon EC2 instances
- B. Amazon VPC subnet ACLs to check service health
- C. Resources distributed across multiple Availability Zones
- D. Moving Amazon EC2 instances to another region using AWS Server Migration Service (SMS)
- E. Resources distributed across multiple AWS Points of Presence

**Answer: A, C**

✅ **A. AWS Auto Scaling for Amazon EC2 instances**: Auto Scaling automatically adjusts the number of EC2 instances based on demand. If an instance fails, Auto Scaling replaces it automatically, maintaining availability and reducing the impact of individual instance failures.

✅ **C. Resources distributed across multiple Availability Zones**: Spreading resources (EC2, RDS, load balancers) across multiple AZs within a region ensures that a failure in one AZ does not take down the entire application, significantly improving availability.

❌ **B. Amazon VPC subnet ACLs to check service health**: Network ACLs (NACLs) control inbound and outbound traffic at the subnet level for security filtering. They are not used to check service health or improve application availability.

❌ **D. Moving Amazon EC2 instances to another region using AWS SMS**: AWS Server Migration Service is used to migrate on-premises servers to AWS, not to move running EC2 instances between regions for availability purposes.

❌ **E. Resources distributed across multiple AWS Points of Presence**: AWS Points of Presence (edge locations) are used by CloudFront for content delivery, not for distributing compute resources like EC2. Spreading application tiers across PoPs is not a standard high-availability pattern.

💡 **Exam Tip**: High availability for web apps = Multi-AZ deployment + Auto Scaling + Elastic Load Balancer (ELB). This combination is the classic "highly available and scalable" architecture pattern tested on CLF-C02.

---

## Q20. Cloud Design Principle Aligned with AWS Cloud Best Practices

Which cloud design principle aligns with AWS Cloud best practices?

- A. Creating fixed dependencies between application components
- B. Aggregating services on a single instance
- C. Building applications in a single Availability Zone
- D. Distributing compute load across multiple resources

**Answer: D**

✅ **D. Distributing compute load across multiple resources**: This is a core AWS design principle — horizontal scaling and load distribution. By spreading workloads across multiple instances, services, and Availability Zones, you eliminate bottlenecks, improve performance, and increase fault tolerance.

❌ **A. Creating fixed dependencies between application components**: Fixed/tight dependencies reduce resilience and scalability. AWS best practices advocate for loose coupling using services like SQS, SNS, and API Gateway to decouple components.

❌ **B. Aggregating services on a single instance**: Consolidating everything onto one instance creates a single point of failure and limits scalability. AWS promotes microservices and distributed architectures.

❌ **C. Building applications in a single Availability Zone**: Using a single AZ creates a potential failure point. AWS best practices recommend multi-AZ deployments to ensure availability even if one AZ experiences an outage.

💡 **Exam Tip**: AWS design principles: loose coupling, horizontal scaling (add more instances), multi-AZ for HA, design for failure (assume things will break), use managed services. Avoid: monoliths, single AZ, tight coupling, single points of failure.

---

*These 20 questions cover core AWS CLF-C02 domains including cloud economics, shared responsibility, well-architected principles, and key AWS services. Review the Exam Tips for each question to reinforce the most testable concepts.*

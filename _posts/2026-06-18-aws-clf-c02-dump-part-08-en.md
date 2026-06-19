---
title: "AWS CLF-C02 Dump Explained Part 8"
date: 2026-06-18 01:08:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

This post covers 20 AWS CLF-C02 practice questions from batch 8, each translated into English with detailed explanations for every answer choice and key exam tips to help you study smarter.

---

## Q1. When to Use Spot Instances

When is it advantageous for a company to use Spot Instances?

- A. When there is flexibility in when the application needs to run
- B. When there are mission-critical workloads
- C. When dedicated capacity is required
- D. When instances must not be interrupted

**Answer: A**

✅ **A. When there is flexibility in when the application needs to run**: Spot Instances are spare EC2 capacity offered at up to 90% discount compared to On-Demand prices. Because AWS can reclaim them with a 2-minute warning, they are best suited for fault-tolerant, flexible workloads such as batch jobs, data analysis, or rendering.

❌ **B. When there are mission-critical workloads**: Mission-critical workloads require guaranteed availability, which Spot Instances cannot provide since they can be interrupted at any time.

❌ **C. When dedicated capacity is required**: Dedicated capacity needs call for Dedicated Hosts or Dedicated Instances, not Spot Instances.

❌ **D. When instances must not be interrupted**: Spot Instances can be reclaimed by AWS, making them unsuitable for workloads that require uninterrupted operation.

💡 **Exam Tip**: Spot Instances = Lowest cost + Can be interrupted + Best for flexible/fault-tolerant workloads (batch, CI/CD, big data). On-Demand = no interruption guarantee at normal price.

---

## Q2. TCO Analysis for Data Center Migration (Select TWO)

A company is considering migrating its on-premises data center to AWS. Which factors should be included in a Total Cost of Ownership (TCO) analysis? (Select TWO.)

- A. Amazon EC2 instance availability
- B. Power consumption in the data center
- C. Labor costs for replacing aging servers
- D. Application development time
- E. Database engine capacity

**Answer: B, C**

✅ **B. Power consumption in the data center**: On-premises data centers incur significant electricity costs for servers, cooling, and lighting. These operational expenses are eliminated when migrating to AWS, making them a key factor in TCO comparisons.

✅ **C. Labor costs for replacing aging servers**: On-premises environments require IT staff to physically maintain, repair, and replace hardware. This labor cost is a direct expense that AWS eliminates through managed infrastructure.

❌ **A. Amazon EC2 instance availability**: EC2 availability is an AWS service characteristic, not a TCO input factor for comparing on-premises vs. cloud costs.

❌ **D. Application development time**: Application development costs are generally the same whether you run on-premises or in the cloud and are not a differentiating TCO factor.

❌ **E. Database engine capacity**: Database engine licensing and capacity are more relevant to service selection decisions, not the core infrastructure TCO comparison.

💡 **Exam Tip**: TCO = on-premises hidden costs (power, cooling, hardware refresh, real estate, IT staff labor) vs. AWS pay-as-you-go. Use the AWS TCO Calculator for these comparisons.

---

## Q3. AWS Lambda Pricing Model

How does AWS charge for AWS Lambda?

- A. Users bid on the maximum price they are willing to pay per hour
- B. Users choose a prepayment period of 1, 3, or 5 years
- C. Users pay for the persistent storage required in a file system or database
- D. Users pay based on the number of requests and the compute resources used

**Answer: D**

✅ **D. Users pay based on the number of requests and the compute resources used**: AWS Lambda uses a pay-per-use model. You are charged for the number of function invocations (requests) and the duration of execution measured in GB-seconds of memory consumed. There is no charge when your code is not running.

❌ **A. Users bid on the maximum price they are willing to pay per hour**: Bidding on prices is the Spot Instance model for EC2, not applicable to Lambda.

❌ **B. Users choose a prepayment period of 1, 3, or 5 years**: Prepayment commitment periods describe Reserved Instances for EC2, not Lambda.

❌ **C. Users pay for the persistent storage required in a file system or database**: Lambda pricing is based on invocations and compute duration, not storage. Persistent storage would be billed separately through services like S3 or EFS.

💡 **Exam Tip**: Lambda pricing = Number of requests + Duration (GB-seconds). First 1 million requests and 400,000 GB-seconds per month are FREE. Lambda = serverless = no server management.

---

## Q4. Security Groups and EC2 Instance Security

What feature of Security Groups supports Amazon EC2 instance security?

- A. Acts as a virtual firewall for Amazon EC2 instances
- B. Secures AWS user accounts using AWS Identity and Access Management (IAM) policies
- C. Provides DDoS protection with AWS Shield
- D. Protects Amazon EC2 instances using Amazon CloudFront

**Answer: A**

✅ **A. Acts as a virtual firewall for Amazon EC2 instances**: A Security Group functions as a stateful virtual firewall that controls inbound and outbound traffic at the instance level. You define rules specifying allowed protocols, ports, and IP ranges, and the security group enforces these rules for all associated EC2 instances.

❌ **B. Secures AWS user accounts using AWS Identity and Access Management (IAM) policies**: IAM policies control who can access AWS services and resources, which is a separate concern from network-level traffic filtering done by Security Groups.

❌ **C. Provides DDoS protection with AWS Shield**: AWS Shield is a managed DDoS protection service, distinct from Security Groups which control traffic rules at the instance level.

❌ **D. Protects Amazon EC2 instances using Amazon CloudFront**: CloudFront is a content delivery network (CDN) used for caching and distributing content globally, not a security group function.

💡 **Exam Tip**: Security Group = stateful virtual firewall at the instance level (allow rules only). Network ACL (NACL) = stateless firewall at the subnet level (allow and deny rules).

---

## Q5. Disaster Recovery with Lowest Possible Downtime

Which disaster recovery scenario has the lowest potential downtime?

- A. Backup and Restore
- B. Pilot Light
- C. Warm Standby
- D. Multi-Site Active-Active

**Answer: D**

✅ **D. Multi-Site Active-Active**: In a multi-site active-active configuration, multiple fully operational environments run simultaneously and handle live traffic. If one site fails, the others continue serving users without any interruption, resulting in near-zero downtime (RTO near zero).

❌ **A. Backup and Restore**: This is the simplest and cheapest DR strategy but has the highest RTO (recovery time objective) since it requires restoring from backups before coming back online, often taking hours.

❌ **B. Pilot Light**: Pilot Light keeps only the core components (like a database) running in a minimal state. Recovery requires scaling up additional resources when a disaster occurs, resulting in moderate downtime.

❌ **C. Warm Standby**: Warm Standby runs a scaled-down but fully functional version of the environment. Recovery is faster than Pilot Light but still requires scaling up, so some downtime exists.

💡 **Exam Tip**: DR strategies by RTO (best to worst): Multi-Site Active-Active > Warm Standby > Pilot Light > Backup & Restore. Cost is inversely proportional — lower downtime = higher cost.

---

## Q6. Cost-Benefit Analysis for AWS Migration

What helps a company perform a cost-benefit analysis required to migrate to the AWS Cloud?

- A. Cost Explorer
- B. AWS Total Cost of Ownership (TCO) Calculator
- C. AWS Pricing Calculator
- D. AWS Trusted Advisor

**Answer: B**

✅ **B. AWS Total Cost of Ownership (TCO) Calculator**: The AWS TCO Calculator is specifically designed to compare the cost of running workloads on-premises versus in the AWS Cloud. It helps organizations quantify the full cost savings and business value of migrating to AWS, making it the ideal tool for a migration cost-benefit analysis.

❌ **A. Cost Explorer**: AWS Cost Explorer is used to visualize and analyze your existing AWS spending and usage patterns — it does not compare on-premises costs to AWS costs.

❌ **C. AWS Pricing Calculator**: The AWS Pricing Calculator estimates the cost of specific AWS services and architectures. It helps plan AWS spending but does not perform a migration cost-benefit comparison against on-premises costs.

❌ **D. AWS Trusted Advisor**: Trusted Advisor provides best practice recommendations across cost optimization, security, performance, and fault tolerance for existing AWS resources, not migration cost-benefit analysis.

💡 **Exam Tip**: TCO Calculator = compare on-premises vs. AWS costs (pre-migration analysis). AWS Pricing Calculator = estimate costs for AWS services. Cost Explorer = analyze existing AWS bills.

---

## Q7. Sharing Reserved Instance Benefits Across AWS Accounts

Which feature allows the cost benefits of Reserved Instances to be shared across AWS accounts?

- A. AWS Cost Explorer across AWS accounts
- B. Linked accounts and consolidated billing
- C. Amazon EC2 Reserved Instance Utilization Report
- D. Amazon EC2 instance usage report across AWS accounts

**Answer: B**

✅ **B. Linked accounts and consolidated billing**: AWS Organizations enables consolidated billing, which groups multiple AWS accounts under a management account. Reserved Instance discounts and Savings Plans benefits are automatically shared across all linked accounts within the organization, maximizing utilization and savings.

❌ **A. AWS Cost Explorer across AWS accounts**: Cost Explorer is a cost visualization and analysis tool. While it can show spending across accounts, it does not itself enable the sharing of Reserved Instance benefits.

❌ **C. Amazon EC2 Reserved Instance Utilization Report**: This report shows how Reserved Instances are being utilized, but it does not enable the sharing of RI benefits across accounts.

❌ **D. Amazon EC2 instance usage report across AWS accounts**: This is a reporting feature, not a mechanism that enables benefit sharing across accounts.

💡 **Exam Tip**: AWS Organizations + Consolidated Billing = share RI discounts and Savings Plans across all member accounts. This is one of the primary financial benefits of using AWS Organizations.

---

## Q8. Simplifying and Consolidating Billing Across Multiple AWS Accounts

A company has multiple AWS accounts and wants to simplify and consolidate its billing process. Which AWS service achieves this?

- A. AWS Cost and Usage Report
- B. AWS Organizations
- C. AWS Cost Explorer
- D. AWS Budgets

**Answer: B**

✅ **B. AWS Organizations**: AWS Organizations lets you centrally manage and consolidate multiple AWS accounts. Its consolidated billing feature combines all member account charges into a single monthly invoice paid by the management account, simplifying billing management significantly.

❌ **A. AWS Cost and Usage Report**: The Cost and Usage Report provides detailed billing data for analysis and auditing. It reports on costs but does not consolidate billing across accounts into a single invoice.

❌ **C. AWS Cost Explorer**: Cost Explorer provides cost visualization and trend analysis. It can display costs across accounts but does not consolidate billing into a unified invoice.

❌ **D. AWS Budgets**: AWS Budgets allows you to set spending thresholds and receive alerts when costs exceed them. It is a budget management tool, not a billing consolidation service.

💡 **Exam Tip**: AWS Organizations = manage multiple accounts + consolidated billing (one invoice). Think of it as the "umbrella" that groups all accounts for governance and billing purposes.

---

## Q9. Low-Latency Access for Global End Users

A company is designing an application hosted in a single AWS Region for end users distributed worldwide. The company wants to provide end users with low-latency access to application data. Which service helps meet this requirement?

- A. Amazon CloudFront
- B. AWS Direct Connect
- C. Amazon Route 53 Global DNS
- D. Amazon S3 Transfer Acceleration

**Answer: A**

✅ **A. Amazon CloudFront**: CloudFront is AWS's global Content Delivery Network (CDN) with over 400 edge locations worldwide. It caches copies of application content at edge locations geographically close to end users, dramatically reducing latency for users no matter where they are located.

❌ **B. AWS Direct Connect**: Direct Connect provides a dedicated private network connection between an on-premises data center and AWS. It reduces latency for the corporate network connection but does not help global end users access your application with lower latency.

❌ **C. Amazon Route 53 Global DNS**: Route 53 is a highly available DNS service that can route users to healthy endpoints and supports geographic routing policies. While it can reduce DNS resolution time, it does not cache or deliver application content like CloudFront does.

❌ **D. Amazon S3 Transfer Acceleration**: S3 Transfer Acceleration speeds up uploads to S3 by routing data through CloudFront edge locations. It improves upload performance to S3, not general application content delivery to end users.

💡 **Exam Tip**: CloudFront = CDN + global edge locations + low latency for end users + caching. Whenever you see "global users" + "low latency" + "content delivery," think CloudFront.

---

## Q10. Converting Capital IT Expense to Operational Expense

Which implementation model allows a company to fully trade capital IT expenses for operational expenses?

- A. On-premises
- B. Hybrid
- C. Cloud
- D. Platform as a Service

**Answer: C**

✅ **C. Cloud**: The cloud computing model eliminates the need for upfront capital expenditures (CapEx) on hardware, data centers, and infrastructure. Instead, you pay only for what you use as an ongoing operational expense (OpEx), fully converting CapEx to OpEx. This is one of the six key advantages of cloud computing according to AWS.

❌ **A. On-premises**: On-premises requires significant upfront capital investment in servers, networking equipment, data center facilities, and maintenance staff — this is the traditional CapEx model, not an OpEx model.

❌ **B. Hybrid**: A hybrid model combines on-premises and cloud resources. While some expenses shift to OpEx, on-premises components still require CapEx, so it is not a full conversion.

❌ **D. Platform as a Service**: PaaS is a cloud service model (like AWS Elastic Beanstalk), which is a subset of cloud computing. While technically OpEx-based, "Cloud" is the broader and more accurate answer describing the overall model.

💡 **Exam Tip**: One of AWS's 6 cloud advantages: "Trade capital expense (CapEx) for variable expense (OpEx)." CapEx = buy servers upfront. OpEx = pay as you go. Cloud = fully OpEx.

---

## Q11. Asset Management in AWS vs. Physical Data Centers

How is asset management in AWS easier than in a physical data center?

- A. AWS provides a Configuration Management Database that users can maintain
- B. AWS performs infrastructure discovery scans on behalf of customers
- C. Amazon EC2 automatically generates asset reports and stores them in a customer-specified S3 bucket
- D. Users can reliably collect asset metadata with a few API calls

**Answer: D**

✅ **D. Users can reliably collect asset metadata with a few API calls**: AWS provides programmatic access to all infrastructure metadata via APIs. Services like AWS Config, AWS Systems Manager Inventory, and the EC2 DescribeInstances API allow you to instantly retrieve comprehensive, accurate asset information without any physical inspection — something that would take significant manual effort in a physical data center.

❌ **A. AWS provides a Configuration Management Database that users can maintain**: AWS does not provide a native CMDB for customers to maintain. While AWS Config can track resource configurations, it is not positioned as a customer-maintained CMDB.

❌ **B. AWS performs infrastructure discovery scans on behalf of customers**: AWS does not automatically perform discovery scans for customer resources. Customers use tools like AWS Config or Systems Manager to perform their own discovery.

❌ **C. Amazon EC2 automatically generates asset reports and stores them in a customer-specified S3 bucket**: EC2 does not automatically generate and deliver asset reports to S3. This functionality requires customer-configured services like Systems Manager Inventory or AWS Config.

💡 **Exam Tip**: AWS asset management advantage = programmatic API access to all resource metadata in real time. AWS Config tracks configuration history and compliance. Systems Manager Inventory collects software and hardware inventory.

---

## Q12. Amazon RDS Feature for Globally Redundant Databases

Which Amazon RDS feature helps create globally redundant databases?

- A. Snapshots
- B. Automatic patching and updates
- C. Cross-region read replicas
- D. Provisioned IOPS

**Answer: C**

✅ **C. Cross-region read replicas**: Amazon RDS cross-region read replicas asynchronously replicate your database to a different AWS Region. This provides a geographically redundant copy of the database that can be promoted to a standalone primary database in the event of a regional disaster, enabling global redundancy.

❌ **A. Snapshots**: RDS snapshots are point-in-time backups stored in S3. While they can be copied to other regions, they represent a backup at a specific moment rather than a continuously synchronized, live redundant copy of the database.

❌ **B. Automatic patching and updates**: This feature keeps the database engine up-to-date with security patches and updates. It is a maintenance feature, not a data redundancy or geographic distribution feature.

❌ **D. Provisioned IOPS**: Provisioned IOPS is a storage performance feature that provides consistent, high-speed I/O for databases. It improves performance within a single database instance but does not create geographic redundancy.

💡 **Exam Tip**: RDS Read Replicas = improve read performance + can be cross-region for DR. RDS Multi-AZ = high availability within one region (synchronous replication). Cross-region replica = global redundancy.

---

## Q13. Identifying AWS Costs by Department (Select TWO)

Which methods can be used to identify AWS costs by department? (Select TWO.)

- A. Enable multi-factor authentication for the AWS account root user
- B. Create separate accounts for each department
- C. Use Reserved Instances whenever possible
- D. Use tags to associate each instance with a specific department
- E. Use purchase orders to pay invoices

**Answer: B, D**

✅ **B. Create separate accounts for each department**: Having a dedicated AWS account per department provides complete cost isolation. With AWS Organizations and consolidated billing, you can see each department's charges separately while still receiving a combined invoice, enabling clear cost attribution.

✅ **D. Use tags to associate each instance with a specific department**: AWS resource tags are key-value pairs (e.g., Department: Finance) you can apply to resources. By enabling cost allocation tags, AWS Cost Explorer and billing reports can group and filter costs by department tag, providing detailed cost visibility without needing separate accounts.

❌ **A. Enable multi-factor authentication for the AWS account root user**: MFA for the root user is a security best practice, not a cost tracking or allocation mechanism.

❌ **C. Use Reserved Instances whenever possible**: Reserved Instances reduce costs but do not help identify or attribute costs to specific departments.

❌ **E. Use purchase orders to pay invoices**: Purchase orders are a payment method preference and do not provide cost visibility or allocation by department.

💡 **Exam Tip**: Cost allocation by department: Use Tags (for fine-grained tracking within one account) OR Separate Accounts (for full isolation). Both approaches work with AWS Cost Explorer and billing reports.

---

## Q14. Customer Responsibility in the AWS Shared Responsibility Model

In the AWS Shared Responsibility Model, which of the following is a customer responsibility?

- A. Security of the hardware, software, facilities, and networks that run all products and services
- B. Providing certifications, reports, and other documents directly to AWS customers under NDA
- C. Operating system, network, and firewall configuration
- D. Obtaining industry certifications and independent third-party attestations

**Answer: C**

✅ **C. Operating system, network, and firewall configuration**: Customers are responsible for security "in" the cloud. This includes patching the guest operating system, configuring security groups and network ACLs (firewalls), managing user access, and encrypting data. These are all customer-managed configurations on top of AWS infrastructure.

❌ **A. Security of the hardware, software, facilities, and networks that run all products and services**: This describes AWS's responsibility — securing the underlying physical infrastructure (data centers, hardware, networking) that makes up the cloud.

❌ **B. Providing certifications, reports, and other documents directly to AWS customers under NDA**: This is an AWS responsibility, where AWS provides compliance documentation (SOC reports, ISO certifications) to customers who sign NDAs.

❌ **D. Obtaining industry certifications and independent third-party attestations**: AWS is responsible for obtaining and maintaining its own compliance certifications (SOC 2, ISO 27001, PCI DSS, etc.) for the underlying infrastructure.

💡 **Exam Tip**: Shared Responsibility Model: AWS = security OF the cloud (hardware, facilities, global infrastructure). Customer = security IN the cloud (OS, data, IAM, network config, encryption, applications).

---

## Q15. Managed AWS Service for Real-Time Security Best Practice Guidance

Which managed AWS service provides real-time guidance on AWS security best practices?

- A. AWS X-Ray
- B. AWS Trusted Advisor
- C. Amazon CloudWatch
- D. AWS Systems Manager

**Answer: B**

✅ **B. AWS Trusted Advisor**: AWS Trusted Advisor is an online tool that inspects your AWS environment and provides real-time recommendations across five categories: cost optimization, performance, security, fault tolerance, and service limits. Its security checks identify issues like open S3 buckets, overly permissive security groups, and missing MFA, helping you align with AWS security best practices instantly.

❌ **A. AWS X-Ray**: X-Ray is a distributed tracing and application debugging service that helps developers analyze and debug microservices applications. It is not a security best practice guidance tool.

❌ **C. Amazon CloudWatch**: CloudWatch is a monitoring and observability service for AWS resources and applications. It collects metrics, logs, and events but does not provide security best practice guidance or recommendations.

❌ **D. AWS Systems Manager**: Systems Manager provides operational management capabilities for AWS resources (patching, run commands, parameter store, etc.). While it helps with operations, it does not provide real-time security best practice guidance like Trusted Advisor.

💡 **Exam Tip**: Trusted Advisor = 5 pillars: Cost Optimization, Performance, Security, Fault Tolerance, Service Limits. Business/Enterprise support plans unlock all checks. Basic/Developer plans have limited checks.

---

## Q16. Adding Elasticity to EC2 for Changing Workload Demands

Which feature adds elasticity to Amazon EC2 instances to handle changing workload demands?

- A. Resource Groups
- B. Lifecycle Policies
- C. Application Load Balancer
- D. Amazon EC2 Auto Scaling

**Answer: D**

✅ **D. Amazon EC2 Auto Scaling**: EC2 Auto Scaling automatically adjusts the number of EC2 instances in response to real-time demand. It scales out (adds instances) during traffic spikes and scales in (removes instances) during low-demand periods, maintaining performance while optimizing costs — this is the definition of elasticity.

❌ **A. Resource Groups**: Resource Groups allow you to organize and manage AWS resources by grouping them based on tags or CloudFormation stacks. They are an organizational tool, not an elasticity or scaling mechanism.

❌ **B. Lifecycle Policies**: Lifecycle policies in the context of EC2 Auto Scaling manage instance state transitions, but "lifecycle policies" more commonly refers to S3 policies that transition objects between storage classes. Neither directly provides elasticity.

❌ **C. Application Load Balancer**: An ALB distributes incoming traffic across multiple EC2 instances to improve availability and performance. While it works alongside Auto Scaling, the ALB itself does not add or remove instances — that is the role of Auto Scaling.

💡 **Exam Tip**: Elasticity = Auto Scaling (scale in/out automatically). Load Balancer = distribute traffic across instances (works WITH Auto Scaling). Together they form a highly available, elastic architecture.

---

## Q17. Customer Responsibilities for Security in the Cloud (Select TWO)

In the AWS Shared Responsibility Model, which aspects of cloud security is the customer responsible for? (Select TWO.)

- A. Virtualization management
- B. Hardware management
- C. Encryption management
- D. Facilities management
- E. Firewall management

**Answer: C, E**

✅ **C. Encryption management**: Customers are responsible for deciding whether and how to encrypt their data, managing encryption keys (using services like AWS KMS), and enabling encryption for data in transit and at rest. AWS provides the tools, but customers make and implement encryption decisions.

✅ **E. Firewall management**: Customers are responsible for configuring security groups (instance-level virtual firewalls) and network ACLs (subnet-level firewalls) to control traffic to and from their resources. These network security configurations are entirely within the customer's scope.

❌ **A. Virtualization management**: The hypervisor and virtualization layer are managed by AWS, not the customer. Customers interact with virtualized resources but do not manage the underlying virtualization infrastructure.

❌ **B. Hardware management**: Physical hardware (servers, networking equipment, storage) is entirely AWS's responsibility. Customers never touch or manage physical hardware in the cloud.

❌ **D. Facilities management**: Data center facilities (physical security, power, cooling, location) are AWS's responsibility. Customers benefit from AWS's facility security certifications but do not manage any physical facilities.

💡 **Exam Tip**: Customer-managed security = IAM + Encryption + OS patching + Security Groups + NACLs + Application security + Data classification. AWS-managed = hardware, virtualization, physical facilities, global network infrastructure.

---

## Q18. AWS Hybrid Storage Service for On-Premises Applications

Which AWS hybrid storage service enables on-premises applications to seamlessly use AWS Cloud storage through standard file storage protocols?

- A. AWS Direct Connect
- B. AWS Snowball
- C. AWS Storage Gateway
- D. AWS Snowball Edge

**Answer: C**

✅ **C. AWS Storage Gateway**: AWS Storage Gateway is a hybrid cloud storage service that connects on-premises environments to AWS cloud storage using standard storage protocols (NFS, SMB, iSCSI). It provides on-premises applications seamless access to virtually unlimited cloud storage, supporting use cases like backup, archiving, and cloud-tiered storage — all without changing existing applications.

❌ **A. AWS Direct Connect**: Direct Connect is a dedicated network connection service between on-premises infrastructure and AWS. It provides private, high-bandwidth connectivity but is a networking service, not a hybrid storage service that presents cloud storage via file protocols.

❌ **B. AWS Snowball**: Snowball is a physical data transfer device used to move large amounts of data to and from AWS when network transfer is impractical. It is a one-time data migration tool, not an ongoing hybrid storage integration service.

❌ **D. AWS Snowball Edge**: Snowball Edge is an enhanced Snowball device with local compute and storage capabilities for edge locations with limited or no internet connectivity. Like Snowball, it is used for data transfer and edge computing, not ongoing hybrid storage integration.

💡 **Exam Tip**: Storage Gateway = on-premises to AWS hybrid storage bridge. Three types: File Gateway (NFS/SMB to S3), Volume Gateway (iSCSI block storage), Tape Gateway (virtual tape library). Key phrase: "on-premises + cloud storage + standard protocols."

---

## Q19. AWS Responsibility in the Shared Responsibility Model

In the Shared Responsibility Model, what is AWS responsible for?

- A. Updating network ACLs to block traffic on vulnerable ports
- B. Patching the operating system running on Amazon EC2 instances
- C. Performing firmware updates on underlying EC2 hosts
- D. Updating Security Group rules to block traffic on vulnerable ports

**Answer: C**

✅ **C. Performing firmware updates on underlying EC2 hosts**: AWS is responsible for managing and maintaining the underlying physical infrastructure, which includes applying firmware updates to the host servers that run EC2 instances. Customers never have access to the physical host hardware, so this responsibility belongs entirely to AWS.

❌ **A. Updating network ACLs to block traffic on vulnerable ports**: Network ACLs are customer-managed resources. Configuring and updating NACL rules to control traffic is the customer's responsibility under the shared responsibility model.

❌ **B. Patching the operating system running on Amazon EC2 instances**: For EC2 instances (IaaS), customers are responsible for patching the guest operating system. AWS only manages the underlying hypervisor and host infrastructure.

❌ **D. Updating Security Group rules to block traffic on vulnerable ports**: Security Groups are customer-managed virtual firewalls. Creating, updating, and managing security group rules is entirely the customer's responsibility.

💡 **Exam Tip**: AWS manages "of the cloud": physical hosts, networking hardware, data centers, hypervisor, firmware. Customer manages "in the cloud": guest OS, applications, security group rules, NACLs, data, IAM.

---

## Q20. Architectural Principle for Multi-AZ RDS Deployment

Which architectural principle is used when deploying an Amazon RDS instance in Multi-AZ mode?

- A. Implement loose coupling
- B. Design for failure
- C. Automate everything that can be automated
- D. Use services, not servers

**Answer: B**

✅ **B. Design for failure**: Multi-AZ RDS deployment automatically provisions and maintains a synchronous standby replica in a different Availability Zone. If the primary database fails due to hardware failure, network outage, or AZ disruption, RDS automatically fails over to the standby with minimal downtime. This is the essence of "design for failure" — assuming failures will happen and architecting systems to withstand them automatically.

❌ **A. Implement loose coupling**: Loose coupling refers to designing system components to be independent of each other so that a failure in one component does not cascade to others (e.g., using SQS between services). Multi-AZ is about high availability and redundancy, not about decoupling components.

❌ **C. Automate everything that can be automated**: While Multi-AZ does automate the failover process, the primary architectural principle it demonstrates is designing for failure and high availability, not general automation.

❌ **D. Use services, not servers**: This principle encourages using managed AWS services instead of managing EC2 servers yourself. While RDS is a managed service, the specific reason for choosing Multi-AZ is to design for failure and ensure high availability.

💡 **Exam Tip**: Multi-AZ RDS = "Design for Failure" principle + High Availability + Automatic failover within one region. Multi-AZ is for HA (failover), Read Replicas are for performance (read scaling). RTO for Multi-AZ failover is typically 1-2 minutes.

---

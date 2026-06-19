---
title: "AWS CLF-C02 Dump Explained Part 11"
date: 2026-06-18 01:11:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

Practice makes perfect! Here are 20 AWS CLF-C02 exam questions translated from Korean with full English explanations, correct answer analysis, and exam tips to help you pass on your first attempt.

---

## Q1. Reducing Latency for Static Websites

Which AWS service do customers use on static websites to reduce latency and increase transfer speeds?

- A. AWS Lambda
- B. Amazon DynamoDB Accelerator
- C. Amazon Route 53
- D. Amazon CloudFront

**Answer: D**

✅ **D. Amazon CloudFront**: CloudFront is AWS's Content Delivery Network (CDN) service that caches static content at edge locations around the world, placing content physically closer to end users to reduce latency and increase transfer speeds.

❌ **A. AWS Lambda**: Lambda is a serverless compute service used for running code, not for caching or distributing static content closer to users.

❌ **B. Amazon DynamoDB Accelerator**: DAX is an in-memory cache specifically for DynamoDB database queries, not for delivering static website content.

❌ **C. Amazon Route 53**: Route 53 is a DNS service used for domain name resolution and traffic routing, not for caching or speeding up content delivery.

💡 **Exam Tip**: CloudFront = CDN + Edge Locations + Static Content Caching + Reduced Latency. Whenever a question mentions "static website," "latency reduction," or "faster delivery to global users," think CloudFront.

---

## Q2. Managing and Automating Application Deployments (Choose 2)

Which services manage and automate application deployments on AWS? (Choose 2)

- A. AWS Elastic Beanstalk
- B. AWS CodeCommit
- C. AWS Data Pipeline
- D. AWS CloudFormation
- E. AWS Config

**Answer: A, D**

✅ **A. AWS Elastic Beanstalk**: Elastic Beanstalk is a Platform-as-a-Service (PaaS) that automatically handles deployment, capacity provisioning, load balancing, and scaling for applications uploaded by users.

✅ **D. AWS CloudFormation**: CloudFormation is an Infrastructure-as-Code (IaC) service that lets you define and automate provisioning of AWS resources using templates, enabling repeatable and automated deployments.

❌ **B. AWS CodeCommit**: CodeCommit is a managed source control (Git repository) service used for storing code, not for deploying applications.

❌ **C. AWS Data Pipeline**: Data Pipeline is used for automating the movement and transformation of data between AWS services, not application deployments.

❌ **E. AWS Config**: Config is a service that tracks resource configurations and evaluates compliance; it does not manage application deployments.

💡 **Exam Tip**: Elastic Beanstalk = PaaS (upload code, AWS handles the rest). CloudFormation = IaC (define infrastructure as templates). Both automate deployment in different ways.

---

## Q3. Principles for Designing Reliable Applications in AWS Cloud (Choose 3)

Which principles are used when designing applications for reliability in the AWS Cloud? (Choose 3)

- A. Design for automatic failure recovery
- B. Use multiple Availability Zones
- C. Manage changes through documented processes
- D. Test reliability with medium-demand testing
- E. Backup and recovery to an on-premises environment

**Answer: A, B, C**

✅ **A. Design for automatic failure recovery**: The AWS Well-Architected Reliability Pillar specifically recommends designing systems that can automatically recover from failures without manual intervention.

✅ **B. Use multiple Availability Zones**: Distributing resources across multiple AZs eliminates single points of failure, ensuring the application remains available even if one AZ experiences an outage.

✅ **C. Manage changes through documented processes**: Controlled change management with proper documentation prevents unplanned disruptions and is a core reliability best practice.

❌ **D. Test reliability with medium-demand testing**: AWS recommends testing at peak demand and using chaos engineering/game days — "medium demand" testing is not a recognized best practice and may miss real-world failure scenarios.

❌ **E. Backup and recovery to an on-premises environment**: AWS best practices recommend keeping backups within AWS (e.g., multi-region S3), not reverting to on-premises infrastructure.

💡 **Exam Tip**: AWS Reliability Pillar key principles: auto-recovery, multi-AZ redundancy, change management, and testing at scale. Avoid answers that reference on-premises as a backup strategy.

---

## Q4. Responding to a Suspected Compromised AWS Account (Choose 2)

If a customer suspects their AWS account has been compromised, which actions should they take? (Choose 2)

- A. Rotate passwords and access keys
- B. Remove MFA tokens
- C. Move resources to a different AWS Region
- D. Delete AWS CloudTrail resources
- E. Contact AWS Support

**Answer: A, E**

✅ **A. Rotate passwords and access keys**: Immediately rotating credentials (root password, IAM user passwords, and all access keys) is the first line of defense when an account compromise is suspected, as it revokes attacker access.

✅ **E. Contact AWS Support**: AWS Support can assist with investigating the compromise, placing account holds if needed, and guiding remediation steps — this is always a recommended action for security incidents.

❌ **B. Remove MFA tokens**: MFA adds an extra layer of security. Removing MFA tokens would make the account less secure, not more. You should ensure MFA is enabled, not disabled.

❌ **C. Move resources to a different AWS Region**: Moving resources does not address the compromise and does not revoke attacker access. The attacker would still have access regardless of Region.

❌ **D. Delete AWS CloudTrail resources**: CloudTrail logs are critical forensic evidence for investigating a compromise. Deleting them would destroy the audit trail needed to understand what happened.

💡 **Exam Tip**: Compromised account response = Rotate credentials immediately + Contact AWS Support + Preserve CloudTrail logs (never delete them). MFA should be strengthened, not removed.

---

## Q5. Example of High Availability in AWS Cloud

Which of the following is an example of high availability in the AWS Cloud?

- A. Access to AWS technical support consulting at any time, day or night
- B. Ensuring that applications remain accessible even when a resource fails
- C. Using AWS services available through on-demand payment
- D. Deploying anywhere in the world using AWS Regions

**Answer: B**

✅ **B. Ensuring that applications remain accessible even when a resource fails**: High availability means a system continues to operate and remain accessible despite component failures, which is achieved through redundancy, multi-AZ deployments, and automatic failover.

❌ **A. Access to AWS technical support consulting at any time**: 24/7 support availability describes AWS Support plans, not the concept of high availability for application infrastructure.

❌ **C. Using AWS services available through on-demand payment**: On-demand pricing is a cost model, not related to availability or uptime of applications.

❌ **D. Deploying anywhere in the world using AWS Regions**: Global reach via Regions is about geographic distribution and low latency, not specifically high availability (which focuses on continued operation during failures).

💡 **Exam Tip**: High Availability = System stays UP even when individual components FAIL. Key mechanisms: Multi-AZ, Auto Scaling, ELB, Route 53 health checks, read replicas.

---

## Q6. Protecting Against DDoS Attacks with Always-On Detection

Which AWS security service protects applications from Distributed Denial of Service (DDoS) attacks with always-on detection and automatic inline mitigation?

- A. Amazon Detective
- B. AWS Web Application Firewall (AWS WAF)
- C. Elastic Load Balancing (ELB)
- D. AWS Shield

**Answer: D**

✅ **D. AWS Shield**: AWS Shield is a managed DDoS protection service that provides always-on detection and automatic inline mitigation. Shield Standard is free for all AWS customers; Shield Advanced offers enhanced protection with 24/7 DDoS response team access.

❌ **A. Amazon Detective**: Detective is a security investigation service that helps analyze and visualize security findings — it is not designed for DDoS mitigation.

❌ **B. AWS Web Application Firewall (AWS WAF)**: WAF protects against common web exploits (SQL injection, XSS) at the application layer, but it is not primarily a DDoS protection service. It is often used alongside Shield for layered security.

❌ **C. Elastic Load Balancing (ELB)**: ELB distributes incoming traffic across multiple targets to improve availability, but it is a load balancing service, not a DDoS protection service.

💡 **Exam Tip**: DDoS protection = AWS Shield. Shield Standard = free, automatic. Shield Advanced = paid, with DDoS Response Team (DRT). "Always-on" and "automatic inline mitigation" are key phrases pointing to Shield.

---

## Q7. Monitoring CPU Usage of Amazon EC2 Resources

A company wants to monitor the CPU utilization of Amazon EC2 resources. Which AWS service should the company use?

- A. AWS CloudTrail
- B. Amazon CloudWatch
- C. AWS Cost and Usage Report
- D. Amazon Simple Notification Service (Amazon SNS)

**Answer: B**

✅ **B. Amazon CloudWatch**: CloudWatch is AWS's monitoring and observability service that collects and tracks metrics including EC2 CPU utilization, memory, disk I/O, and network activity. It also supports alarms, dashboards, and automated actions based on metric thresholds.

❌ **A. AWS CloudTrail**: CloudTrail records API calls and user activity for auditing and compliance — it tracks who did what, not resource performance metrics like CPU usage.

❌ **C. AWS Cost and Usage Report**: This report provides billing and usage data for cost analysis, not infrastructure performance monitoring.

❌ **D. Amazon Simple Notification Service (Amazon SNS)**: SNS is a messaging and notification service used to send alerts or messages, not to collect or monitor EC2 metrics.

💡 **Exam Tip**: CloudWatch = Metrics + Monitoring + Alarms + Dashboards. CloudTrail = API Call Logs + Audit Trail. Never confuse these two — CloudWatch watches performance, CloudTrail tracks API actions.

---

## Q8. What Is an AWS IAM Role?

What is an AWS IAM (Identity and Access Management) role?

- A. A user associated with AWS resources
- B. A group associated with AWS resources
- C. An entity that defines a set of permissions to use for AWS resources
- D. Authentication credentials associated with an MFA (Multi-Factor Authentication) token

**Answer: C**

✅ **C. An entity that defines a set of permissions to use for AWS resources**: An IAM role is an AWS identity with specific permission policies attached. Unlike IAM users, roles are not associated with a specific person — they can be assumed by AWS services, applications, or users from other accounts to gain temporary, scoped access.

❌ **A. A user associated with AWS resources**: An IAM user represents a person or application with long-term credentials. A role is different — it is assumed temporarily and has no permanent credentials.

❌ **B. A group associated with AWS resources**: An IAM group is a collection of IAM users sharing the same permissions. A role is a separate identity concept that entities can assume.

❌ **D. Authentication credentials associated with an MFA token**: MFA is an authentication mechanism added to IAM users or the root account — it is not the definition of a role.

💡 **Exam Tip**: IAM Role = Temporary permissions assumed by services, users, or applications (no username/password). Common use cases: EC2 accessing S3, Lambda execution, cross-account access.

---

## Q9. Advantages of Reserved Instances (Choose 2)

What are the advantages of Reserved Instances? (Choose 2)

- A. They provide a discount compared to On-Demand pricing
- B. They provide access to additional instance types
- C. They provide additional networking capabilities
- D. Customers can upgrade instances when new types become available
- E. Customers can reserve capacity in an Availability Zone

**Answer: A, E**

✅ **A. They provide a discount compared to On-Demand pricing**: Reserved Instances offer significant savings (up to 72%) compared to On-Demand pricing in exchange for a 1-year or 3-year commitment, making them ideal for steady, predictable workloads.

✅ **E. Customers can reserve capacity in an Availability Zone**: When purchasing Zonal Reserved Instances (as opposed to Regional), AWS guarantees that the specified capacity will be available in the chosen AZ, which is critical for capacity planning.

❌ **B. They provide access to additional instance types**: Reserved Instances do not unlock new or exclusive instance types — the same instance types are available On-Demand.

❌ **C. They provide additional networking capabilities**: Reserved Instances do not add networking features. Networking capabilities are determined by instance type and VPC configuration, not pricing model.

❌ **D. Customers can upgrade instances when new types become available**: Standard Reserved Instances have limited flexibility for changes. Convertible Reserved Instances allow instance family changes, but "upgrading when new types become available" is not an automatic benefit.

💡 **Exam Tip**: Reserved Instances = Commitment (1 or 3 years) + Up to 72% discount + Optional capacity reservation in AZ. Best for predictable, steady-state workloads.

---

## Q10. How EC2 Auto Scaling Groups Help Achieve High Availability

How does an Amazon EC2 Auto Scaling group help achieve high availability for a web application?

- A. It automatically adds instances across multiple AWS Regions based on global demand
- B. It automatically adds or replaces instances across multiple Availability Zones when needed
- C. It helps static application content reside closer to end users
- D. It distributes incoming requests across an entire tier of web server instances

**Answer: B**

✅ **B. It automatically adds or replaces instances across multiple Availability Zones when needed**: Auto Scaling Groups monitor the health of instances and automatically launch new instances or replace failed ones across multiple AZs, ensuring the application remains available even if an entire AZ fails.

❌ **A. It automatically adds instances across multiple AWS Regions**: Auto Scaling Groups operate within a single Region. Cross-Region scaling requires additional architecture (e.g., separate ASGs per Region with Route 53 routing).

❌ **C. It helps static application content reside closer to end users**: This is the function of Amazon CloudFront (CDN), not Auto Scaling Groups.

❌ **D. It distributes incoming requests across an entire tier of web server instances**: Request distribution is the role of Elastic Load Balancing (ELB). Auto Scaling Groups manage the number of instances, while ELB distributes traffic among them — they work together but serve different purposes.

💡 **Exam Tip**: Auto Scaling = Automatically adjust the NUMBER of instances (scale out/in). ELB = Distribute TRAFFIC across instances. CloudFront = Deliver content from EDGE LOCATIONS. These three often work together but are distinct services.

---

## Q11. Using Reserved Instances Across AWS Accounts

How can one AWS account use Reserved Instances from another AWS account?

- A. Use Amazon EC2 Dedicated Instances
- B. Use AWS Organizations Consolidated Billing
- C. Use the AWS Cost Explorer tool
- D. Use AWS Budgets

**Answer: B**

✅ **B. Use AWS Organizations Consolidated Billing**: With AWS Organizations Consolidated Billing, Reserved Instance discounts are automatically shared across all member accounts in the organization. If one account has unused Reserved Instances, other accounts benefit from the discounted rate.

❌ **A. Use Amazon EC2 Dedicated Instances**: Dedicated Instances run on hardware dedicated to a single customer for compliance and isolation purposes — this has nothing to do with sharing Reserved Instance pricing across accounts.

❌ **C. Use the AWS Cost Explorer tool**: Cost Explorer is a visualization tool for analyzing AWS spending and usage patterns — it does not enable sharing of Reserved Instance discounts.

❌ **D. Use AWS Budgets**: AWS Budgets lets you set spending thresholds and receive alerts — it is a cost management tool, not a mechanism for sharing Reserved Instance benefits.

💡 **Exam Tip**: AWS Organizations + Consolidated Billing = Share Reserved Instance discounts AND Savings Plans across all member accounts automatically. This is a key cost optimization strategy for multi-account setups.

---

## Q12. Billing Duration for EC2 On-Demand Linux Instances

A customer runs an On-Demand Amazon Linux EC2 instance for 3 hours, 5 minutes, and 6 seconds. How long will the customer be billed for?

- A. 3 hours 5 minutes
- B. 3 hours 5 minutes 6 seconds
- C. 3 hours 6 minutes
- D. 4 hours

**Answer: B**

✅ **B. 3 hours 5 minutes 6 seconds**: Amazon Linux EC2 instances are billed per second with a minimum charge of 60 seconds. After the first 60 seconds, billing is calculated to the exact second, so the customer pays for precisely 3 hours, 5 minutes, and 6 seconds.

❌ **A. 3 hours 5 minutes**: This ignores the 6 seconds of usage. Per-second billing means every second of usage after the minimum 60-second threshold is counted.

❌ **C. 3 hours 6 minutes**: Rounding up to the next full minute would overcharge the customer. AWS uses per-second billing (not per-minute) for Amazon Linux instances.

❌ **D. 4 hours**: Rounding up to the next hour applied to Windows instances (per-hour billing) in the past, but modern Amazon Linux instances use per-second billing, making this incorrect.

💡 **Exam Tip**: Amazon Linux & Ubuntu EC2 = Per-second billing (minimum 60 seconds). Windows EC2 = Per-hour billing. Per-second billing makes short-running jobs more cost-effective.

---

## Q13. AWS Services That Provide Compute Resources (Choose 2)

Which of the following AWS services provide compute resources? (Choose 2)

- A. AWS Lambda
- B. Amazon Elastic Container Service (Amazon ECS)
- C. AWS CodeDeploy
- D. Amazon Glacier
- E. AWS Organizations

**Answer: A, B**

✅ **A. AWS Lambda**: Lambda is a serverless compute service that runs code in response to events without requiring server management — it is a core compute offering from AWS.

✅ **B. Amazon Elastic Container Service (Amazon ECS)**: ECS is a fully managed container orchestration service that runs Docker containers on EC2 instances or AWS Fargate, providing compute resources for containerized applications.

❌ **C. AWS CodeDeploy**: CodeDeploy automates application deployments to EC2, Lambda, or on-premises servers — it is a deployment tool, not a compute service itself.

❌ **D. Amazon Glacier (Amazon S3 Glacier)**: Glacier is a low-cost archival storage service, not a compute service.

❌ **E. AWS Organizations**: Organizations is an account management service for governing multiple AWS accounts — it has no compute capabilities.

💡 **Exam Tip**: AWS Compute services include EC2, Lambda, ECS, EKS, Fargate, Lightsail, Batch, and Elastic Beanstalk. Storage (S3, Glacier), management (Organizations), and deployment (CodeDeploy) tools are NOT compute services.

---

## Q14. Automating Resource Provisioning as Infrastructure as Code

Which AWS service supports automating the resource provisioning process to implement infrastructure as code?

- A. Amazon GameLift
- B. AWS CloudFormation
- C. AWS Data Pipeline
- D. AWS Glue

**Answer: B**

✅ **B. AWS CloudFormation**: CloudFormation is AWS's native Infrastructure-as-Code (IaC) service that lets you define your entire AWS infrastructure in JSON or YAML templates, enabling automated, repeatable, and version-controlled provisioning of resources.

❌ **A. Amazon GameLift**: GameLift is a managed service for deploying, operating, and scaling dedicated game servers — it is industry-specific and not an IaC tool.

❌ **C. AWS Data Pipeline**: Data Pipeline is used for orchestrating data movement and transformation between AWS services — it is a data workflow tool, not an infrastructure provisioning tool.

❌ **D. AWS Glue**: Glue is a serverless ETL (Extract, Transform, Load) service for data integration and analytics — it does not automate infrastructure provisioning.

💡 **Exam Tip**: Infrastructure as Code (IaC) on AWS = AWS CloudFormation (native) or AWS CDK. CloudFormation templates = JSON/YAML files that define AWS resources. Also remember: Terraform is a popular third-party IaC tool that works with AWS.

---

## Q15. AWS Services That Extend On-Premises Architecture to the AWS Cloud (Choose 2)

Which AWS services provide a way to extend on-premises architecture to the AWS Cloud? (Choose 2)

- A. Amazon EBS
- B. AWS Direct Connect
- C. Amazon CloudFront
- D. AWS Storage Gateway
- E. Amazon Connect
- F. AWS VPN
- G. CloudHSM

**Answer: B, D**

✅ **B. AWS Direct Connect**: Direct Connect provides a dedicated private network connection between an on-premises data center and AWS, enabling secure, high-bandwidth, low-latency hybrid connectivity that extends the on-premises network directly into the AWS cloud.

✅ **D. AWS Storage Gateway**: Storage Gateway is a hybrid cloud storage service that connects on-premises environments to AWS cloud storage (S3, EBS, Glacier), allowing on-premises applications to seamlessly use AWS storage — effectively extending on-premises storage infrastructure to the cloud.

❌ **A. Amazon EBS**: EBS is a block storage service for EC2 instances running in AWS — it has no on-premises connectivity component.

❌ **C. Amazon CloudFront**: CloudFront is a CDN for delivering content to users at low latency — it does not extend on-premises architecture to AWS.

❌ **E. Amazon Connect**: Amazon Connect is a cloud-based contact center service, not a hybrid networking or storage solution.

❌ **F. AWS VPN**: While AWS VPN does create an encrypted connection between on-premises and AWS, the question specifically asks about extending architecture — Direct Connect and Storage Gateway are more architecturally significant for hybrid integration. Note: AWS VPN (Site-to-Site VPN) is also a valid answer in many exam scenarios for hybrid connectivity.

❌ **G. CloudHSM**: CloudHSM provides hardware security modules for cryptographic key management in AWS — it is a security service, not a hybrid connectivity or storage extension service.

💡 **Exam Tip**: Hybrid connectivity to AWS = AWS Direct Connect (dedicated private line) or AWS Site-to-Site VPN (encrypted internet tunnel). Storage Gateway bridges on-premises storage with AWS cloud storage for hybrid architectures.

---

## Q16. Services That Use AWS Edge Locations (Choose 2)

Which services use AWS edge locations? (Choose 2)

- A. Amazon CloudFront
- B. AWS Shield
- C. Amazon EC2
- D. Amazon RDS
- E. Amazon ElastiCache

**Answer: A, B**

✅ **A. Amazon CloudFront**: CloudFront is AWS's CDN that operates entirely through edge locations, caching content at hundreds of Points of Presence (PoPs) around the world to deliver low-latency content to users.

✅ **B. AWS Shield**: AWS Shield Advanced uses the AWS global edge network (CloudFront and Route 53 edge locations) to detect and absorb DDoS attacks at the edge before they reach your origin infrastructure.

❌ **C. Amazon EC2**: EC2 instances run in AWS Regions and Availability Zones, not at edge locations. (AWS Outposts and Local Zones are exceptions, but standard EC2 does not use edge locations.)

❌ **D. Amazon RDS**: RDS is a managed relational database service that runs within AWS Regions/AZs — it has no edge location component.

❌ **E. Amazon ElastiCache**: ElastiCache provides in-memory caching (Redis/Memcached) within a VPC in a specific Region — it does not use edge locations.

💡 **Exam Tip**: AWS Edge Locations are used by: CloudFront (CDN caching), AWS Shield (DDoS protection), AWS WAF (web filtering), Route 53 (DNS), and Lambda@Edge (edge compute). Regional services like EC2, RDS, and ElastiCache do NOT use edge locations.

---

## Q17. Providing Network Connectivity in a Hybrid Architecture

Which service provides network connectivity in a hybrid architecture that includes the AWS Cloud?

- A. Amazon VPC
- B. AWS Direct Connect
- C. AWS Directory Service
- D. Amazon API Gateway

**Answer: B**

✅ **B. AWS Direct Connect**: Direct Connect establishes a dedicated, private network connection between an on-premises data center and AWS, making it the primary service for providing reliable and consistent network connectivity in a hybrid cloud architecture.

❌ **A. Amazon VPC**: VPC (Virtual Private Cloud) creates an isolated network environment within AWS, but by itself does not provide connectivity between on-premises networks and AWS — you need Direct Connect or VPN for that.

❌ **C. AWS Directory Service**: Directory Service integrates Microsoft Active Directory with AWS for identity management — it is not a network connectivity solution.

❌ **D. Amazon API Gateway**: API Gateway is used to create, publish, and manage APIs for application backends — it is an application-layer service, not a network connectivity service.

💡 **Exam Tip**: Hybrid network connectivity options: AWS Direct Connect = Dedicated private fiber line (consistent, low latency, higher cost). AWS Site-to-Site VPN = Encrypted tunnel over public internet (quick setup, variable performance). Direct Connect is preferred for production hybrid workloads.

---

## Q18. Reasons to Use Third-Party Software from AWS Marketplace (Choose 2)

Why would a customer use third-party software from AWS Marketplace instead of installing it directly on Amazon EC2? (Choose 2)

- A. Users pay for software costs hourly or monthly depending on the license
- B. AWS Marketplace allows users to launch applications with one click
- C. AWS Marketplace data encryption is managed by third-party vendors
- D. AWS Marketplace eliminates the need to upgrade to new software versions
- E. Users can deploy third-party software without testing

**Answer: A, B**

✅ **A. Users pay for software costs hourly or monthly depending on the license**: AWS Marketplace offers flexible pricing models (hourly, monthly, annual, BYOL) that integrate directly with AWS billing, making it easy to pay only for what you use without upfront software licensing fees.

✅ **B. AWS Marketplace allows users to launch applications with one click**: Marketplace provides pre-configured AMIs and SaaS offerings that can be deployed with a single click, significantly reducing setup time compared to manually installing and configuring software on EC2.

❌ **C. AWS Marketplace data encryption is managed by third-party vendors**: Data encryption responsibility follows the AWS Shared Responsibility Model — customers are still responsible for data encryption regardless of whether software came from Marketplace.

❌ **D. AWS Marketplace eliminates the need to upgrade to new software versions**: Marketplace does not automatically keep software updated. Version management and patching remain the customer's responsibility.

❌ **E. Users can deploy third-party software without testing**: AWS always recommends testing software before production deployment. Marketplace does not bypass the need for testing.

💡 **Exam Tip**: AWS Marketplace benefits = Flexible licensing (pay-as-you-go) + One-click deployment + Pre-configured, validated software + Integrated AWS billing. Think of it as an "app store" for enterprise software on AWS.

---

## Q19. Cloud Architecture Design Principles

Which of the following is a cloud architecture design principle?

- A. Scale up, not scale out
- B. Loosely coupled components
- C. Build a monolithic system
- D. Use commercial database software

**Answer: B**

✅ **B. Loosely coupled components**: Loose coupling is a fundamental AWS Well-Architected design principle. By designing systems where components interact through well-defined interfaces (e.g., SQS queues, APIs), failures in one component do not cascade to others, improving resilience and scalability.

❌ **A. Scale up, not scale out**: This is the opposite of AWS best practices. AWS recommends scaling OUT (horizontal scaling — adding more instances) rather than scaling UP (vertical scaling — making one instance bigger), as horizontal scaling enables higher availability and flexibility.

❌ **C. Build a monolithic system**: AWS promotes microservices architecture over monolithic design. Monoliths are harder to scale, update, and recover from failures — the opposite of cloud-native design principles.

❌ **D. Use commercial database software**: AWS encourages evaluating managed database services (RDS, DynamoDB, Aurora) and open-source alternatives over expensive commercial database licenses, following the principle of "breaking free from traditional constraints."

💡 **Exam Tip**: AWS Well-Architected design principles: Think loose coupling, horizontal scaling (scale out), automation, elasticity, microservices, and managed services. "Scale out, not up" and "decouple components" are classic exam answer choices.

---

## Q20. Customer Responsibilities in the Shared Responsibility Model (Choose 2)

In the Shared Responsibility Model, which of the following are customer responsibilities? (Choose 2)

- A. Firmware upgrades for network infrastructure
- B. Applying operating system patches
- C. Applying patches to the underlying hypervisor
- D. Physical security of data centers
- E. Security Group configuration

**Answer: B, E**

✅ **B. Applying operating system patches**: Customers are responsible for patching and maintaining the guest operating system on EC2 instances. AWS manages the underlying physical infrastructure, but everything above the hypervisor (OS, applications, data) is the customer's responsibility.

✅ **E. Security Group configuration**: Security Groups are virtual firewalls that control inbound and outbound traffic for EC2 instances. Configuring Security Groups correctly is entirely the customer's responsibility — AWS provides the tool but the customer decides the rules.

❌ **A. Firmware upgrades for network infrastructure**: AWS is responsible for the physical network infrastructure, including firmware updates for routers, switches, and other hardware. This falls under "Security OF the Cloud."

❌ **C. Applying patches to the underlying hypervisor**: The hypervisor (and everything below it) is managed by AWS. Customers never have direct access to or responsibility for the hypervisor layer.

❌ **D. Physical security of data centers**: AWS is fully responsible for the physical security of its data centers — including guards, cameras, access controls, and environmental safeguards. Customers have no physical access.

💡 **Exam Tip**: Shared Responsibility Model: AWS = Security OF the Cloud (hardware, networking, physical facilities, hypervisor). Customer = Security IN the Cloud (OS patches, app config, data encryption, IAM, Security Groups, firewall rules). When in doubt: if it's "physical" or "below the OS," it's AWS's job.

---

*These 20 questions cover core AWS CLF-C02 topics including compute, storage, networking, security, pricing models, and the Shared Responsibility Model. Review the Exam Tips for each question to build strong keyword associations for exam day. Good luck!*

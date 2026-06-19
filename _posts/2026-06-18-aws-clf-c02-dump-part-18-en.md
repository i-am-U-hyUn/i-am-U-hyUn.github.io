---
title: "AWS CLF-C02 Dump Explained Part 18"
date: 2026-06-18 01:18:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

Practice makes perfect! This post covers 20 AWS CLF-C02 exam questions translated into English with detailed answer explanations and exam tips to help you pass on your first try.

---

## Q1. Managed NoSQL Database Service

Which AWS service is a managed NoSQL database?

- A. Amazon Redshift
- B. Amazon DynamoDB
- C. Amazon Aurora
- D. Amazon RDS for MariaDB

**Answer: B**

✅ **B. Amazon DynamoDB**: DynamoDB is AWS's fully managed, serverless NoSQL key-value and document database. It is designed for high-performance, low-latency applications at any scale, and AWS handles all infrastructure management including hardware provisioning, setup, and configuration.

❌ **A. Amazon Redshift**: Redshift is a managed data warehouse (SQL/relational), not a NoSQL database. It is optimized for analytical workloads (OLAP).

❌ **C. Amazon Aurora**: Aurora is a fully managed relational (SQL) database engine compatible with MySQL and PostgreSQL, not a NoSQL database.

❌ **D. Amazon RDS for MariaDB**: Amazon RDS for MariaDB is a managed relational SQL database, not a NoSQL service.

💡 **Exam Tip**: NoSQL on AWS = DynamoDB. Key-value/document, serverless, single-digit millisecond latency, fully managed. Redshift = data warehouse (SQL/OLAP). Aurora = relational (MySQL/PostgreSQL compatible).

---

## Q2. Service for Creating Billing Alarms

Which AWS service should be used to create billing alarms?

- A. AWS Trusted Advisor
- B. AWS CloudTrail
- C. Amazon CloudWatch
- D. Amazon QuickSight

**Answer: C**

✅ **C. Amazon CloudWatch**: CloudWatch allows you to create billing alarms by monitoring your estimated AWS charges. When charges exceed your defined threshold, CloudWatch triggers an alert via Amazon SNS, helping you avoid unexpected costs.

❌ **A. AWS Trusted Advisor**: Trusted Advisor provides best-practice recommendations across cost, security, fault tolerance, performance, and service limits, but it does not create billing alarms.

❌ **B. AWS CloudTrail**: CloudTrail records API calls and account activity for auditing purposes. It does not provide billing alarm functionality.

❌ **D. Amazon QuickSight**: QuickSight is a business intelligence (BI) and data visualization service. It is not used for creating billing alarms.

💡 **Exam Tip**: Billing Alarm = CloudWatch + SNS. You must enable "Receive Billing Alerts" in your account's Billing Preferences before creating the CloudWatch billing alarm. Budget alerts can also be set via AWS Budgets.

---

## Q3. AWS Responsibility for Docker Containers on EC2

A company is hosting a web application in Docker containers on Amazon EC2. Which of the following is AWS's responsibility?

- A. Scaling web applications and services developed using Docker
- B. Provisioning or scheduling containers running in the cluster to maintain availability
- C. Performing hardware maintenance at AWS facilities that run the AWS Cloud
- D. Managing the guest operating system including updates and security patches

**Answer: C**

✅ **C. Performing hardware maintenance at AWS facilities that run the AWS Cloud**: Under the AWS Shared Responsibility Model, AWS is responsible for the security and maintenance of the physical infrastructure — including servers, networking, and facilities (data centers). This hardware-level responsibility always belongs to AWS.

❌ **A. Scaling web applications and services developed using Docker**: Application scaling logic is the customer's responsibility. Customers configure Auto Scaling policies and manage how their containerized apps scale.

❌ **B. Provisioning or scheduling containers running in the cluster to maintain availability**: Container orchestration and scheduling (e.g., managing ECS tasks or Kubernetes pods) is the customer's responsibility when running containers on EC2 instances.

❌ **D. Managing the guest operating system including updates and security patches**: When using EC2, the customer is responsible for managing the guest OS, including applying security patches and updates.

💡 **Exam Tip**: Shared Responsibility Model — AWS manages "security OF the cloud" (hardware, physical facilities, global infrastructure). Customers manage "security IN the cloud" (OS, apps, data, network config). EC2 = customer manages the OS.

---

## Q4. Reducing Latency for a Global Website

A website with a global customer base is experiencing reported latency when connecting. Which AWS service improves customer experience by reducing latency?

- A. Amazon CloudFront
- B. AWS Direct Connect
- C. Amazon EC2 Auto Scaling
- D. AWS Transit Gateway

**Answer: A**

✅ **A. Amazon CloudFront**: CloudFront is AWS's Content Delivery Network (CDN) that caches content at edge locations around the world, closer to end users. By serving content from the nearest edge location, CloudFront significantly reduces latency for global users.

❌ **B. AWS Direct Connect**: Direct Connect provides a dedicated private network connection from on-premises to AWS. While it can reduce latency for on-premises-to-AWS traffic, it does not help deliver website content to global end users.

❌ **C. Amazon EC2 Auto Scaling**: Auto Scaling adds or removes EC2 instances based on demand. It addresses capacity and availability, not geographic latency.

❌ **D. AWS Transit Gateway**: Transit Gateway connects multiple VPCs and on-premises networks. It is a network hub for routing traffic between internal networks, not a solution for reducing latency for global users accessing public content.

💡 **Exam Tip**: Global Latency Reduction = CloudFront (CDN) + Edge Locations. CloudFront caches static/dynamic content worldwide. For routing to healthy regional endpoints, think AWS Global Accelerator (uses Anycast IPs + AWS backbone).

---

## Q5. IAM Best Practices (Choose TWO)

Which actions represent best practices for using AWS IAM? (Choose TWO)

- A. Configure a strong password policy
- B. Share security credentials between AWS account users in the same region
- C. Use access keys to log in to the AWS Management Console
- D. Rotate access keys regularly
- E. Avoid using IAM roles to delegate permissions

**Answer: A, D**

✅ **A. Configure a strong password policy**: Enforcing strong passwords (minimum length, complexity, expiration) is a fundamental IAM best practice that protects accounts from unauthorized access through brute-force or guessing attacks.

✅ **D. Rotate access keys regularly**: Regularly rotating access keys reduces the risk of a compromised key being used for unauthorized access. AWS recommends rotating keys on a schedule and removing unused keys.

❌ **B. Share security credentials between AWS account users in the same region**: Sharing credentials is a serious security violation. Each user should have unique credentials. Sharing makes auditing impossible and increases exposure risk.

❌ **C. Use access keys to log in to the AWS Management Console**: Access keys (Access Key ID + Secret Access Key) are used for programmatic access (CLI, SDK), not for the AWS Management Console login. Console login uses a username and password.

❌ **E. Avoid using IAM roles to delegate permissions**: This is the opposite of best practice. IAM roles are the recommended way to delegate permissions to services, applications, and cross-account access securely without sharing long-term credentials.

💡 **Exam Tip**: IAM Best Practices — Enable MFA on root & IAM users, use roles instead of sharing credentials, rotate access keys regularly, enforce strong password policy, apply least privilege, never use root for daily tasks.

---

## Q6. Capturing VPC Traffic Information

Which AWS feature or service can be used to capture information about incoming and outgoing traffic in an AWS VPC infrastructure?

- A. AWS Config
- B. VPC Flow Logs
- C. AWS Trusted Advisor
- D. AWS CloudTrail

**Answer: B**

✅ **B. VPC Flow Logs**: VPC Flow Logs capture information about the IP traffic going to and from network interfaces in your VPC. The logs record source/destination IP, ports, protocol, and whether traffic was accepted or rejected — useful for network monitoring, security analysis, and troubleshooting.

❌ **A. AWS Config**: AWS Config records and evaluates the configurations of your AWS resources over time. It does not capture network packet/flow data.

❌ **C. AWS Trusted Advisor**: Trusted Advisor checks for best practices in cost, security, fault tolerance, performance, and service limits. It does not capture network traffic.

❌ **D. AWS CloudTrail**: CloudTrail logs AWS API calls and management events. It records "who did what" in your AWS account, not network-level IP traffic flows.

💡 **Exam Tip**: Network Traffic Capture = VPC Flow Logs. Stored in CloudWatch Logs or S3. Captures IP-level metadata (not packet contents). CloudTrail = API call logs. Config = resource configuration history.

---

## Q7. Health Monitoring and Traffic Routing to Healthy Endpoints

A company wants to use an AWS service to monitor the health of application endpoints and improve application availability by routing traffic to healthy regional endpoints. Which service supports these requirements?

- A. Amazon Inspector
- B. Amazon CloudWatch
- C. AWS Global Accelerator
- D. Amazon CloudFront

**Answer: C**

✅ **C. AWS Global Accelerator**: Global Accelerator continuously monitors the health of application endpoints and automatically routes user traffic to the nearest healthy endpoint using the AWS global network backbone. This reduces latency and improves availability by failing over to healthy regions instantly when an endpoint becomes unhealthy.

❌ **A. Amazon Inspector**: Inspector is a security vulnerability assessment service for EC2 instances and container images. It does not route traffic or monitor endpoint health for availability.

❌ **B. Amazon CloudWatch**: CloudWatch monitors metrics, logs, and sets alarms. While it can detect unhealthy conditions, it does not automatically route traffic to healthy regional endpoints.

❌ **D. Amazon CloudFront**: CloudFront is a CDN that caches content at edge locations to reduce latency. It does not provide active health-based routing across multiple regional endpoints in the same way Global Accelerator does.

💡 **Exam Tip**: AWS Global Accelerator = health-based routing + Anycast static IPs + AWS backbone network. Improves availability by rerouting to healthy endpoints. CloudFront = content caching/CDN. Both reduce latency but for different use cases.

---

## Q8. Change Management for Reliability in AWS Well-Architected Framework (Choose TWO)

According to the AWS Well-Architected Framework, which change management steps should be performed to achieve reliability in the AWS Cloud? (Choose TWO)

- A. Use AWS Config to create an inventory of AWS resources
- B. Use service limits to prevent users from creating or changing AWS resources
- C. Use AWS CloudTrail to record AWS API calls in auditable log files
- D. Use AWS Certificate Manager to whitelist approved AWS resources and services
- E. Use Amazon GuardDuty to confirm configuration changes to AWS resources

**Answer: A, C**

✅ **A. Use AWS Config to create an inventory of AWS resources**: AWS Config continuously monitors and records resource configurations, enabling you to track changes, evaluate compliance, and maintain an accurate inventory. This is essential for change management under the Reliability pillar.

✅ **C. Use AWS CloudTrail to record AWS API calls in auditable log files**: CloudTrail provides a complete audit trail of API calls, recording who made changes, when, and from where. This is critical for change management as it enables you to detect unauthorized or unintended changes.

❌ **B. Use service limits to prevent users from creating or changing AWS resources**: Service quotas (limits) are not a change management tool. They limit resource counts but are not designed to enforce change governance.

❌ **D. Use AWS Certificate Manager to whitelist approved AWS resources and services**: AWS Certificate Manager (ACM) manages SSL/TLS certificates. It is not used for resource whitelisting or change management.

❌ **E. Use Amazon GuardDuty to confirm configuration changes to AWS resources**: GuardDuty is a threat detection service that uses ML to identify suspicious activity. It does not track configuration changes — that is Config's role.

💡 **Exam Tip**: Well-Architected Reliability Pillar change management = AWS Config (resource inventory + compliance) + AWS CloudTrail (API audit logs). Config tracks "what changed," CloudTrail tracks "who changed it."

---

## Q9. Monitoring Root User Login Events

Which service can be used to monitor AWS account root user AWS Management Console login events and receive notifications?

- A. Amazon CloudWatch
- B. AWS Config
- C. AWS Trusted Advisor
- D. AWS IAM

**Answer: A**

✅ **A. Amazon CloudWatch**: You can create a CloudWatch Events (EventBridge) rule to detect root user login events from CloudTrail and trigger an SNS notification. This is the recommended AWS approach for monitoring root account console logins and alerting the security team.

❌ **B. AWS Config**: Config tracks configuration changes to AWS resources. It does not directly monitor or alert on console login events.

❌ **C. AWS Trusted Advisor**: Trusted Advisor provides recommendations on best practices but does not monitor login events or send real-time notifications for root user logins.

❌ **D. AWS IAM**: IAM manages users, roles, and permissions. It does not have built-in event monitoring or alerting capabilities for login events.

💡 **Exam Tip**: Root user login monitoring = CloudTrail (records the event) + CloudWatch Events/EventBridge (detects it) + SNS (sends alert). AWS Security Hub and GuardDuty can also detect anomalous root usage.

---

## Q10. Cloud Design Principles

Which design principles should be considered when designing in the AWS Cloud?

- A. Treat servers as disposable resources
- B. Use synchronous integration of services
- C. Design loosely coupled components
- D. Implement minimal allow rules for security groups

**Answer: A, C** *(Note: If single answer required, both A and C are correct AWS design principles. A is a classic single-answer choice in many versions.)*

**Answer: A** *(Primary answer for single-select format)*

✅ **A. Treat servers as disposable resources**: This is a core AWS cloud design principle. Instead of configuring long-lived servers, you should design systems where servers can be terminated and replaced automatically. This enables automation, faster recovery, and aligns with immutable infrastructure patterns.

❌ **B. Use synchronous integration of services**: AWS best practices favor asynchronous, loosely coupled integrations (e.g., using SQS, SNS, EventBridge). Synchronous calls create tight dependencies and reduce fault tolerance.

❌ **C. Design loosely coupled components**: While this IS a valid AWS design principle, in single-answer versions of this question, "treat servers as disposable" is the most distinctly cloud-native answer. Loose coupling is also correct but may not be the expected single answer depending on the exam version.

❌ **D. Implement minimal allow rules for security groups**: This describes a security best practice (least privilege), but it is not one of the primary cloud design principles discussed in the AWS Well-Architected Framework's operational design principles.

💡 **Exam Tip**: AWS Cloud Design Principles — Disposable resources (cattle, not pets), loose coupling, design for failure, elasticity, automation, data-driven architecture. "Treat servers as cattle, not pets" = treat them as disposable/replaceable.

---

## Q11. Moving Data from On-Premises to AWS (Choose TWO)

Which AWS services can be used to move data from an on-premises data center to AWS? (Choose TWO)

- A. AWS Snowball
- B. AWS Lambda
- C. AWS ElastiCache
- D. AWS Database Migration Service (AWS DMS)
- E. Amazon API Gateway

**Answer: A, D**

✅ **A. AWS Snowball**: Snowball is a physical data transfer device that allows you to move large amounts of data (petabyte-scale) to AWS by shipping the device. It is ideal when internet bandwidth is insufficient or too slow for data migration.

✅ **D. AWS Database Migration Service (AWS DMS)**: AWS DMS migrates databases from on-premises (or other cloud environments) to AWS. It supports homogeneous and heterogeneous migrations and can handle continuous replication to minimize downtime.

❌ **B. AWS Lambda**: Lambda is a serverless compute service for running code without provisioning servers. It does not transfer data from on-premises to AWS.

❌ **C. AWS ElastiCache**: ElastiCache is an in-memory caching service (Redis/Memcached). It is not a data migration or transfer service.

❌ **E. Amazon API Gateway**: API Gateway creates, publishes, and manages APIs. It does not transfer data from on-premises environments to AWS.

💡 **Exam Tip**: Data migration tools — AWS Snowball/Snowmobile (physical, large-scale), AWS DMS (database migration), AWS DataSync (online file transfer), Storage Gateway (hybrid storage). Lambda/ElastiCache/API Gateway are compute/cache/API tools, not migration tools.

---

## Q12. Optimal Architecture for Growing Batch Workloads

A batch workload on Amazon EC2 takes 5 hours to complete. The amount of data to process doubles every month and processing time increases proportionally. What is the optimal cloud architecture to address this continuously increasing demand?

- A. Run the application on a larger EC2 instance size
- B. Switch to an EC2 instance family better suited for batch requirements
- C. Distribute the application across multiple EC2 instances and run in parallel
- D. Run the application on a bare-metal EC2 instance

**Answer: C**

✅ **C. Distribute the application across multiple EC2 instances and run in parallel**: Horizontal scaling (running workloads in parallel across multiple instances) is the optimal cloud-native approach. As data doubles each month, adding more instances keeps processing time constant rather than proportionally increasing. This is cost-effective and follows cloud elasticity principles.

❌ **A. Run the application on a larger EC2 instance size**: Vertical scaling (scaling up) has limits and becomes increasingly expensive. As data keeps doubling, you will eventually reach the largest available instance size, making this unsustainable long-term.

❌ **B. Switch to an EC2 instance family better suited for batch requirements**: Choosing a more appropriate instance family (e.g., compute-optimized) is a valid optimization but does not solve the fundamental problem of continuously doubling data — processing time will still grow proportionally.

❌ **D. Run the application on a bare-metal EC2 instance**: Bare-metal instances offer direct hardware access for specialized needs but do not inherently solve the scaling problem. Processing time would still grow as data volume doubles.

💡 **Exam Tip**: Horizontal scaling (scale out) = distribute across multiple instances + run in parallel. This is preferred over vertical scaling (scale up) for batch workloads because it is elastic, cost-effective, and has no practical upper limit. Think AWS Batch or EC2 + parallelism.

---

## Q13. Centralizing Governance and Consolidating Payments Across Departments

Each department has its own independent AWS account and billing method. New corporate leadership wants to centralize departmental governance and consolidate payments. How can this be achieved using AWS services and features?

- A. Forward monthly invoices for each account, then create IAM roles to allow cross-account access
- B. Create a new AWS account, then configure AWS Organizations and invite all existing accounts to join
- C. Configure AWS Organizations in each existing account, then link all accounts together
- D. Use Cost Explorer to combine costs from all accounts, then replicate IAM policies across accounts

**Answer: B**

✅ **B. Create a new AWS account, then configure AWS Organizations and invite all existing accounts to join**: AWS Organizations is the correct service for centralizing governance and consolidating billing. You create a management (master) account, set up AWS Organizations, and invite existing member accounts. Consolidated Billing under Organizations combines all accounts into a single payment, and Service Control Policies (SCPs) enable centralized governance.

❌ **A. Forward monthly invoices for each account, then create IAM roles to allow cross-account access**: Forwarding invoices manually is not consolidated billing, and IAM roles for cross-account access do not address centralized governance or payment consolidation at an organizational level.

❌ **C. Configure AWS Organizations in each existing account, then link all accounts together**: AWS Organizations is managed from a single management account — you cannot configure it in each account and then link them. There is one management account that manages all member accounts.

❌ **D. Use Cost Explorer to combine costs from all accounts, then replicate IAM policies across accounts**: Cost Explorer provides cost visibility but does not consolidate actual billing. Replicating IAM policies manually is error-prone and does not provide central governance.

💡 **Exam Tip**: Multi-account governance = AWS Organizations. Key features: Consolidated Billing (single payment), Service Control Policies (SCPs) for governance, Organizational Units (OUs) for grouping. Management account invites member accounts — not the other way around.

---

## Q14. Horizontal Scaling as an Example of AWS Cloud Value

The ability to horizontally scale Amazon EC2 instances based on demand is an example of which concept in the AWS Cloud value proposition?

- A. Economies of scale
- B. Elasticity
- C. High availability
- D. Agility

**Answer: B**

✅ **B. Elasticity**: Elasticity is the ability to automatically scale resources up or down to match demand. Horizontal scaling of EC2 instances — adding instances when demand increases and removing them when demand decreases — is the textbook definition of cloud elasticity.

❌ **A. Economies of scale**: Economies of scale refers to AWS's ability to offer lower prices by spreading infrastructure costs across millions of customers. It is about cost reduction, not the ability to scale resources.

❌ **C. High availability**: High availability means designing systems to remain operational despite failures, typically using redundancy across multiple AZs. While scaling can contribute to availability, the act of scaling itself is elasticity.

❌ **D. Agility**: Agility refers to the speed at which organizations can innovate — provisioning resources in minutes, experimenting quickly, and going to market faster. Horizontal scaling is specifically elasticity, not agility.

💡 **Exam Tip**: Elasticity = scale in/out automatically based on demand. Agility = speed of innovation/deployment. Economies of scale = lower cost due to AWS's massive purchasing power. High Availability = multi-AZ, fault tolerance, redundancy.

---

## Q15. Dynamically Adjusting Resources for Traffic Spikes

An e-commerce company expects a large increase in web traffic during two upcoming popular shopping holidays. Which AWS service or feature can be configured to dynamically adjust resources to match this change in demand?

- A. AWS CloudTrail
- B. Amazon EC2 Auto Scaling
- C. Amazon Forecast
- D. AWS Config

**Answer: B**

✅ **B. Amazon EC2 Auto Scaling**: EC2 Auto Scaling automatically adds or removes EC2 instances based on defined scaling policies (e.g., target tracking, scheduled scaling, or step scaling). For predictable spikes like shopping holidays, you can set scheduled scaling actions to proactively add capacity before the traffic surge.

❌ **A. AWS CloudTrail**: CloudTrail records API calls for auditing. It does not adjust infrastructure resources based on demand.

❌ **C. Amazon Forecast**: Amazon Forecast is a machine learning service for time-series demand forecasting. It can predict demand but does not directly scale resources — it provides predictions, not automated scaling.

❌ **D. AWS Config**: AWS Config records and evaluates resource configurations for compliance. It does not scale resources dynamically based on traffic.

💡 **Exam Tip**: Dynamic scaling = EC2 Auto Scaling. Types: Scheduled (predictable load), Target Tracking (maintain metric like CPU 50%), Step Scaling (add X instances when metric breaches). Works with Elastic Load Balancing for distributing traffic to scaled instances.

---

## Q16. Securely Connecting to AWS Resources Over the Public Internet

Which AWS service allows you to securely connect to AWS resources over the public internet?

- A. Amazon VPC Peering
- B. AWS Direct Connect
- C. AWS VPN
- D. Amazon Pinpoint

**Answer: C**

✅ **C. AWS VPN**: AWS Virtual Private Network (VPN) creates an encrypted, secure tunnel over the public internet between your on-premises network (or client device) and your AWS VPC. It provides secure connectivity without requiring a dedicated physical connection.

❌ **A. Amazon VPC Peering**: VPC Peering connects two VPCs privately within the AWS network. It does not provide connectivity from outside AWS over the public internet — both VPCs must be within AWS.

❌ **B. AWS Direct Connect**: Direct Connect establishes a dedicated private network connection between your on-premises data center and AWS, bypassing the public internet entirely. It is not an "over the public internet" solution.

❌ **D. Amazon Pinpoint**: Pinpoint is a customer engagement and marketing communication service (email, SMS, push notifications). It is not a network connectivity service.

💡 **Exam Tip**: Secure internet connection to AWS = AWS VPN (encrypted tunnel over public internet). Private dedicated connection = AWS Direct Connect (bypass internet entirely). VPC Peering = VPC-to-VPC within AWS. Site-to-Site VPN vs. Client VPN: Site-to-Site connects on-prem networks; Client VPN connects individual users.

---

## Q17. Tool for Forecasting AWS Spending

Which tool is used to forecast AWS spending?

- A. AWS Trusted Advisor
- B. AWS Organizations
- C. Cost Explorer
- D. Amazon Inspector

**Answer: C**

✅ **C. Cost Explorer**: AWS Cost Explorer provides detailed visualizations of your historical AWS spending and usage, and it includes forecasting capabilities that predict your future costs based on past trends. It helps you understand spending patterns and plan budgets.

❌ **A. AWS Trusted Advisor**: Trusted Advisor checks your AWS environment against best practices and provides recommendations, including some cost optimization suggestions. However, it does not forecast future AWS spending.

❌ **B. AWS Organizations**: AWS Organizations manages multiple AWS accounts centrally with consolidated billing. It does not provide spending forecasts.

❌ **D. Amazon Inspector**: Inspector is an automated security vulnerability assessment service for EC2 and containers. It has no cost forecasting functionality.

💡 **Exam Tip**: Cost Forecasting = Cost Explorer (historical analysis + forecast). Cost Budgeting = AWS Budgets (set thresholds + alerts). Cost Optimization Recommendations = Trusted Advisor + Cost Explorer Rightsizing. Cost Breakdown = Cost and Usage Report (CUR) for detailed analysis.

---

## Q18. Caching Static Content Closer to Global Users

A company runs an e-commerce application hosted in Europe. To reduce latency for users accessing the website from other parts of the world, they want to cache frequently accessed static content closer to users. Which AWS service supports this requirement?

- A. Amazon ElastiCache
- B. Amazon CloudFront
- C. Amazon Elastic File System (Amazon EFS)
- D. Amazon Elastic Block Store (Amazon EBS)

**Answer: B**

✅ **B. Amazon CloudFront**: CloudFront is AWS's global Content Delivery Network (CDN) with 400+ edge locations worldwide. It caches static content (images, CSS, JavaScript, videos) at edge locations closest to end users, dramatically reducing latency for global visitors regardless of where the origin server is hosted.

❌ **A. Amazon ElastiCache**: ElastiCache is an in-memory caching service (Redis or Memcached) deployed within a VPC for caching database query results or session data. It does not distribute content globally to end users at edge locations.

❌ **C. Amazon Elastic File System (Amazon EFS)**: EFS is a managed network file system for EC2 instances within AWS. It is a shared storage solution, not a CDN or content delivery mechanism for global users.

❌ **D. Amazon Elastic Block Store (Amazon EBS)**: EBS provides block storage volumes attached to individual EC2 instances. It is local persistent storage and cannot cache or deliver content to global users.

💡 **Exam Tip**: Global static content caching = CloudFront (CDN + Edge Locations). ElastiCache = in-VPC database/session caching. EFS = shared file storage within AWS. EBS = block storage attached to a single EC2 instance. If the question mentions "global users" + "cache" + "latency," the answer is almost always CloudFront.

---

## Q19. Components of AWS Global Infrastructure

Which of the following is a component of AWS Global Infrastructure?

- A. Amazon Alexa
- B. AWS Regions
- C. Amazon Ray
- D. AWS Organizations

**Answer: B**

✅ **B. AWS Regions**: AWS Regions are geographically distinct locations around the world where AWS clusters its data centers. Each Region consists of multiple Availability Zones (AZs) and is a fundamental component of the AWS Global Infrastructure, which also includes Edge Locations and Local Zones.

❌ **A. Amazon Alexa**: Amazon Alexa is a voice assistant service/platform. It is an AWS product/service, not a component of the global infrastructure itself.

❌ **C. Amazon Ray**: "Amazon Ray" is not a real AWS service (this appears to be a mistranslation artifact). It is not a component of AWS Global Infrastructure.

❌ **D. AWS Organizations**: AWS Organizations is an account management service that helps consolidate multiple AWS accounts. It is an AWS service, not a physical infrastructure component.

💡 **Exam Tip**: AWS Global Infrastructure components = Regions + Availability Zones (AZs) + Edge Locations (CloudFront PoPs) + Local Zones + Wavelength Zones. Regions contain 2+ AZs. AZs are separate data centers within a Region. Edge Locations serve CloudFront CDN traffic.

---

## Q20. Verifying CPU Capacity for EC2 Applications

Which AWS service helps users verify whether the CPU capacity of an Amazon EC2 instance running an application is sufficient?

- A. Amazon CloudWatch
- B. AWS Config
- C. AWS CloudTrail
- D. Amazon Inspector

**Answer: A**

✅ **A. Amazon CloudWatch**: CloudWatch collects and monitors metrics for AWS resources, including EC2 CPU utilization (CPUUtilization metric). You can view CPU usage graphs, set alarms when CPU exceeds thresholds, and use this data to determine whether your instance is under-provisioned or over-provisioned.

❌ **B. AWS Config**: AWS Config records configuration changes to AWS resources and evaluates compliance against rules. It does not monitor real-time performance metrics like CPU utilization.

❌ **C. AWS CloudTrail**: CloudTrail records API calls and account activity for auditing purposes. It tracks management-level events (who did what), not application or infrastructure performance metrics.

❌ **D. Amazon Inspector**: Inspector is a security assessment service that checks for vulnerabilities and unintended network exposure in EC2 instances and container images. It does not monitor CPU capacity or performance metrics.

💡 **Exam Tip**: EC2 Performance Monitoring = Amazon CloudWatch. Key EC2 metrics: CPUUtilization, NetworkIn/Out, DiskReadOps/WriteOps, StatusCheckFailed. For memory and disk metrics (not available by default), install the CloudWatch Agent on the EC2 instance. CloudWatch Alarms can trigger Auto Scaling or SNS notifications.

---

*Good luck on your AWS CLF-C02 exam! Review these concepts regularly and practice with as many questions as possible. The key is understanding the "why" behind each answer, not just memorizing the correct choice.*

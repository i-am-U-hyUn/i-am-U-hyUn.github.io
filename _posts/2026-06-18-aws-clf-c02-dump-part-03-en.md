---
title: "AWS CLF-C02 Dump Explained Part 3"
date: 2026-06-18 01:03:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

Practice makes perfect — here are 20 AWS CLF-C02 exam questions from Batch 3, fully translated into English with detailed answer explanations and exam tips to help you pass with confidence.

---

## Q1. Fast and Reliable NoSQL Database

Which of the following is a fast and reliable NoSQL database service?

- A. Amazon Redshift
- B. Amazon RDS
- C. Amazon DynamoDB
- D. Amazon S3

**Answer: C**

✅ **C. Amazon DynamoDB**: DynamoDB is AWS's fully managed NoSQL key-value and document database service known for single-digit millisecond latency at any scale. It is purpose-built for applications that need fast, consistent performance regardless of data volume.

❌ **A. Amazon Redshift**: Redshift is a fully managed data warehouse service designed for OLAP (Online Analytical Processing) — it uses SQL and is relational, not NoSQL.

❌ **B. Amazon RDS**: RDS (Relational Database Service) supports relational SQL engines such as MySQL, PostgreSQL, and Oracle. It is not a NoSQL service.

❌ **D. Amazon S3**: S3 is an object storage service, not a database. It stores and retrieves files/objects but does not support database queries.

💡 **Exam Tip**: NoSQL on AWS = DynamoDB. Key traits: key-value + document store, serverless, millisecond latency, scales to any size.

---

## Q2. AWS Cloud Agility Example

Which of the following is an example of agility in the AWS Cloud?

- A. Access to multiple instance types
- B. Access to managed services
- C. Creating a single bill using consolidated billing
- D. Reduced time to purchase new computing resources

**Answer: D**

✅ **D. Reduced time to purchase new computing resources**: Agility in the AWS Cloud refers to the ability to rapidly provision resources when needed. On-premises procurement can take weeks or months; AWS allows you to spin up resources in minutes, dramatically accelerating innovation speed.

❌ **A. Access to multiple instance types**: Having variety in instance types is a flexibility benefit, not specifically an agility benefit. Agility is about speed of deployment, not selection breadth.

❌ **B. Access to managed services**: Managed services reduce operational burden (an elasticity/efficiency benefit), but this is not the primary definition of cloud agility.

❌ **C. Creating a single bill using consolidated billing**: Consolidated billing is a cost management feature of AWS Organizations, not an example of agility.

💡 **Exam Tip**: Agility = speed of provisioning. On-premises takes weeks; AWS takes minutes. Agility enables faster experimentation and innovation.

---

## Q3. Consolidating and Centrally Managing Multiple AWS Accounts

Which service should a customer use to consolidate multiple AWS accounts and manage them centrally?

- A. AWS IAM
- B. AWS Organizations
- C. AWS Schema Conversion Tool
- D. AWS Config

**Answer: B**

✅ **B. AWS Organizations**: AWS Organizations allows you to consolidate multiple AWS accounts into an organization, apply centralized policies (Service Control Policies / SCPs), and use consolidated billing across all member accounts.

❌ **A. AWS IAM**: IAM (Identity and Access Management) manages users, roles, and permissions within a single AWS account. It does not manage multiple accounts.

❌ **C. AWS Schema Conversion Tool**: This is a database migration tool used to convert database schemas from one engine to another (e.g., Oracle to Aurora). It has nothing to do with account management.

❌ **D. AWS Config**: AWS Config records and evaluates the configuration of AWS resources for compliance purposes. It is not used to consolidate or manage multiple accounts.

💡 **Exam Tip**: Multiple AWS accounts + centralized management + consolidated billing = AWS Organizations. SCPs (Service Control Policies) are applied at the organization level.

---

## Q4. Converting Multiple Individual Video Files per AWS Architecture Principles

Which approach follows AWS architecture principles when converting a large number of individual video files?

- A. Use many instances in parallel
- B. Use one large instance during off-peak hours
- C. Use dedicated hardware
- D. Use a large GPU instance type

**Answer: A**

✅ **A. Use many instances in parallel**: AWS architecture principles promote horizontal scaling — distributing work across many smaller instances running in parallel. This approach is more resilient, cost-effective, and aligns with the Well-Architected Framework's performance efficiency pillar.

❌ **B. Use one large instance during off-peak hours**: Using a single large instance is vertical scaling and does not follow AWS best practices for fault tolerance or efficiency. Scheduling during off-peak hours also does not optimize throughput.

❌ **C. Use dedicated hardware**: Dedicated hardware is reserved for compliance or licensing needs, not a recommended pattern for general parallel processing workloads.

❌ **D. Use a large GPU instance type**: GPU instances are designed for graphics rendering and ML training. General video format conversion does not require GPU hardware and this approach ignores the parallelism principle.

💡 **Exam Tip**: AWS Well-Architected = horizontal scaling (many small instances in parallel) over vertical scaling (one big instance). Think "scale out, not up."

---

## Q5. Audit Process for Which AWS Is Fully Responsible

Which audit process is AWS solely responsible for?

- A. AWS IAM policies
- B. Physical security
- C. Amazon S3 bucket policies
- D. AWS CloudTrail logs

**Answer: B**

✅ **B. Physical security**: Under the AWS Shared Responsibility Model, AWS is fully responsible for the security OF the cloud — this includes physical security of data centers, hardware, networking, and facilities. Customers have zero access or control over physical infrastructure.

❌ **A. AWS IAM policies**: IAM policies are created and managed by the customer. AWS provides the IAM service, but configuring permissions is the customer's responsibility.

❌ **C. Amazon S3 bucket policies**: Bucket policies define access controls to S3 resources and are written and managed entirely by the customer.

❌ **D. AWS CloudTrail logs**: CloudTrail captures API activity in the customer's account. Enabling, configuring, and reviewing CloudTrail logs is the customer's responsibility.

💡 **Exam Tip**: Shared Responsibility Model — AWS owns: physical security, hardware, hypervisor, global network. Customer owns: OS, apps, data, IAM policies, encryption.

---

## Q6. AWS Feature Supporting International Business with Low Latency

Which AWS Cloud feature supports the requirement of an international company that needs low latency for all customers?

- A. Fault tolerance
- B. Global reach
- C. Pay-as-you-go pricing
- D. High availability

**Answer: B**

✅ **B. Global reach**: AWS has Regions and Availability Zones across the globe, plus hundreds of CloudFront edge locations. Global reach enables companies to deploy their applications closer to end users worldwide, minimizing network latency for international customers.

❌ **A. Fault tolerance**: Fault tolerance refers to a system's ability to continue operating even when components fail. It addresses reliability, not geographic latency.

❌ **C. Pay-as-you-go pricing**: This is a cost model feature, not a performance or latency feature.

❌ **D. High availability**: High availability ensures a system remains operational with minimal downtime. While related to reliability, it does not directly address reducing latency for geographically distributed users.

💡 **Exam Tip**: Low latency for global users = Global Reach (AWS Regions + CloudFront Edge Locations). Remember: AWS operates in 30+ geographic Regions worldwide.

---

## Q7. Customer Responsibility in the AWS Shared Responsibility Model

Which of the following is the customer's responsibility under the AWS Shared Responsibility Model?

- A. Patching the underlying infrastructure
- B. Physical security
- C. Patching Amazon EC2 instances
- D. Patching network infrastructure

**Answer: C**

✅ **C. Patching Amazon EC2 instances**: When a customer launches an EC2 instance, the guest operating system and any software installed on it is the customer's responsibility. This includes applying OS-level security patches and updates.

❌ **A. Patching the underlying infrastructure**: The underlying hypervisor, physical servers, and infrastructure software are managed and patched by AWS, not the customer.

❌ **B. Physical security**: AWS is solely responsible for physical security of all data centers and hardware. Customers have no access to these facilities.

❌ **D. Patching network infrastructure**: The core AWS network infrastructure (routers, switches, physical cables) is maintained and patched by AWS, not the customer.

💡 **Exam Tip**: Customer = responsible for what runs ON the cloud (OS, apps, data, security groups, IAM). AWS = responsible for the cloud infrastructure itself (hardware, hypervisor, facilities).

---

## Q8. Volume Discounts Across Multiple AWS Accounts

A customer uses multiple AWS accounts with separate billing. How can the customer take advantage of volume discounts while minimizing impact on AWS resources?

- A. Create one global AWS account and move all AWS resources to that account.
- B. Sign up for 3-year Reserved Instance pricing in advance.
- C. Use the consolidated billing feature of AWS Organizations.
- D. Sign up for the AWS Enterprise Support plan to receive volume discounts.

**Answer: C**

✅ **C. Use the consolidated billing feature of AWS Organizations**: Consolidated billing combines usage from all member accounts in an organization. Because AWS pricing tiers are based on aggregate usage volume, pooling usage across accounts allows the entire organization to reach higher usage tiers and receive volume discounts — without merging the actual accounts.

❌ **A. Create one global AWS account and move all resources**: Merging everything into a single account is disruptive, risks security isolation, and is not a recommended practice. It also loses the governance benefits of account separation.

❌ **B. Sign up for 3-year Reserved Instances**: Reserved Instances provide discounts for committing to specific instance types, but they do not inherently provide volume discounts across multiple accounts.

❌ **D. AWS Enterprise Support plan**: Enterprise Support provides technical support benefits (TAM, faster response times), not volume pricing discounts on AWS services.

💡 **Exam Tip**: Volume discounts across accounts = AWS Organizations Consolidated Billing. Usage is aggregated from all member accounts for tier-based pricing — accounts stay separate, billing is combined.

---

## Q9. AWS Managed DNS Web Service

Which of the following is an AWS managed DNS (Domain Name System) web service?

- A. Amazon Route 53
- B. Amazon Neptune
- C. Amazon SageMaker
- D. Amazon Macie

**Answer: A**

✅ **A. Amazon Route 53**: Route 53 is AWS's highly available and scalable cloud Domain Name System (DNS) web service. It translates human-friendly domain names (e.g., www.example.com) into IP addresses and also provides domain registration and health checking.

❌ **B. Amazon Neptune**: Neptune is a fully managed graph database service — it stores and queries highly connected data (e.g., social networks, fraud detection). It has nothing to do with DNS.

❌ **C. Amazon SageMaker**: SageMaker is a fully managed machine learning platform for building, training, and deploying ML models. It is not a DNS service.

❌ **D. Amazon Macie**: Macie is a security service that uses machine learning to automatically discover, classify, and protect sensitive data in S3. It is not related to DNS.

💡 **Exam Tip**: Route 53 = AWS DNS service. Named after port 53 (the standard DNS port). Also handles domain registration, routing policies (latency, geolocation, failover), and health checks.

---

## Q10. Factors Influencing AWS Region Selection (Choose TWO)

A customer is deploying a new application and must choose an AWS Region. Which of the following factors may influence the customer's decision? (Choose TWO.)

- A. Reduced user latency
- B. Local language presentation of the application
- C. Compliance with data sovereignty requirements
- D. Cooling costs in warmer climates
- E. Proximity to customer offices for on-site visits

**Answer: A, C**

✅ **A. Reduced user latency**: Choosing a Region geographically close to your end users reduces network round-trip time, resulting in faster response times and better user experience.

✅ **C. Compliance with data sovereignty requirements**: Many countries have laws requiring that certain data remain within national borders. Selecting the appropriate AWS Region ensures compliance with these data residency regulations.

❌ **B. Local language presentation of the application**: Application language/localization is handled at the application layer by the developer — it has no bearing on which AWS Region to select.

❌ **D. Cooling costs in warmer climates**: AWS manages all physical infrastructure costs including cooling. Customers are not billed separately for cooling and do not factor this into Region selection.

❌ **E. Proximity to customer offices for on-site visits**: AWS data centers are not open to customer visits. Physical proximity to a customer office is irrelevant to AWS Region selection.

💡 **Exam Tip**: AWS Region selection factors = Latency (proximity to users), Compliance/Data Sovereignty, Service availability in region, and Cost. Remember: "LCSC" — Latency, Compliance, Services, Cost.

---

## Q11. Cost-Effective Storage Service for Hosting a Static Website

Which storage service can be used as a cost-effective option for hosting a static website?

- A. Amazon Glacier
- B. Amazon DynamoDB
- C. Amazon Elastic File System (Amazon EFS)
- D. Amazon Simple Storage Service (Amazon S3)

**Answer: D**

✅ **D. Amazon Simple Storage Service (Amazon S3)**: S3 supports static website hosting natively. You can enable it with a bucket, upload HTML/CSS/JS files, and serve them directly over HTTP/HTTPS — at very low cost with high durability (11 nines).

❌ **A. Amazon Glacier**: Amazon Glacier (now S3 Glacier) is designed for long-term archival storage with retrieval times ranging from minutes to hours. It is not suitable for serving a live website.

❌ **B. Amazon DynamoDB**: DynamoDB is a NoSQL database, not a file or object storage service. It cannot host or serve website content directly.

❌ **C. Amazon Elastic File System (Amazon EFS)**: EFS is a managed NFS file system for use with EC2 instances. It is more expensive than S3 and is not designed for static website hosting.

💡 **Exam Tip**: Static website hosting on AWS = Amazon S3. Enable "Static website hosting" in the bucket properties, set index.html, and optionally add CloudFront for HTTPS + CDN.

---

## Q12. EC2 Pricing Model Offering Up to 90% Discount

Which Amazon EC2 pricing model offers up to 90% discount?

- A. Reserved Instances
- B. On-Demand
- C. Dedicated Hosts
- D. Spot Instances

**Answer: D**

✅ **D. Spot Instances**: Spot Instances let you bid on unused EC2 capacity at discounts of up to 90% compared to On-Demand prices. They are ideal for fault-tolerant, flexible workloads such as batch processing, data analysis, and CI/CD pipelines — but can be interrupted by AWS with a 2-minute warning.

❌ **A. Reserved Instances**: Reserved Instances offer up to ~72% discount compared to On-Demand in exchange for a 1- or 3-year commitment. Not up to 90%.

❌ **B. On-Demand**: On-Demand is the standard pricing model with no commitment. It is the most expensive option and offers no discount.

❌ **C. Dedicated Hosts**: Dedicated Hosts provide physical servers dedicated to a single customer, typically used for licensing compliance. They are more expensive than standard instances, not cheaper.

💡 **Exam Tip**: Discount tiers — On-Demand (0%) < Reserved Instances (~72%) < Spot Instances (up to 90%). Spot = cheapest but can be interrupted. Use Spot for stateless, interruptible workloads.

---

## Q13. Customer Responsibility Under AWS Shared Responsibility Model

Under the AWS Shared Responsibility Model, what is the AWS customer responsible for?

- A. Physical access controls
- B. Data encryption
- C. Secure disposal of storage devices
- D. Environmental risk management

**Answer: B**

✅ **B. Data encryption**: Customers are responsible for encrypting their data both at rest and in transit. AWS provides tools (KMS, SSL/TLS) to enable encryption, but the decision to enable and configure encryption is the customer's responsibility.

❌ **A. Physical access controls**: Physical access to AWS facilities (data centers, server rooms) is fully managed by AWS. Customers have no involvement in or responsibility for physical access controls.

❌ **C. Secure disposal of storage devices**: Decommissioning and securely disposing of physical storage media is AWS's responsibility. AWS follows industry standards (DoD 5220.22-M, NIST 800-88) for media sanitization.

❌ **D. Environmental risk management**: Managing environmental risks to the physical infrastructure (fire suppression, flood protection, temperature control) is AWS's responsibility as part of securing the cloud.

💡 **Exam Tip**: Customer "security IN the cloud" = data, encryption, IAM, OS/app configs. AWS "security OF the cloud" = hardware, facilities, physical controls, network infrastructure.

---

## Q14. AWS Service for Running a Customer-Managed Relational Database

Which AWS Cloud service can be used to run a customer-managed relational database?

- A. Amazon EC2
- B. Amazon Route 53
- C. Amazon ElastiCache
- D. Amazon DynamoDB

**Answer: A**

✅ **A. Amazon EC2**: You can install and run any relational database engine (MySQL, PostgreSQL, Oracle, SQL Server, etc.) on an EC2 instance, giving the customer full control over the database configuration, backups, patching, and tuning — a fully customer-managed approach.

❌ **B. Amazon Route 53**: Route 53 is a DNS and domain routing service. It is completely unrelated to database hosting.

❌ **C. Amazon ElastiCache**: ElastiCache is a fully managed in-memory caching service (Redis or Memcached). It is not a relational database and is managed by AWS, not the customer.

❌ **D. Amazon DynamoDB**: DynamoDB is a fully managed NoSQL database service managed by AWS. It is not relational and does not give customers control over the underlying database engine.

💡 **Exam Tip**: Customer-managed DB = EC2 (install your own DB engine). AWS-managed relational DB = Amazon RDS. The key distinction is who manages patching, backups, and configuration.

---

## Q15. Scalable Data Warehouse Solution

A company is looking for a scalable data warehouse solution. Which AWS solution meets the company's needs?

- A. Amazon Simple Storage Service (Amazon S3)
- B. Amazon DynamoDB
- C. Amazon Kinesis
- D. Amazon Redshift

**Answer: D**

✅ **D. Amazon Redshift**: Amazon Redshift is a fully managed, petabyte-scale cloud data warehouse service. It uses columnar storage and massively parallel processing (MPP) to handle complex SQL queries across large datasets, making it ideal for business intelligence and analytics workloads.

❌ **A. Amazon S3**: S3 is an object storage service. While it can store large data sets (data lakes), it is not a data warehouse with SQL query capabilities on its own.

❌ **B. Amazon DynamoDB**: DynamoDB is a NoSQL key-value database optimized for high-speed transactional workloads. It is not designed for complex analytical queries or data warehousing.

❌ **C. Amazon Kinesis**: Kinesis is a real-time data streaming service for ingesting and processing continuous data streams. It is not a data warehouse.

💡 **Exam Tip**: Data Warehouse on AWS = Amazon Redshift. Key traits: petabyte-scale, columnar storage, MPP (massively parallel processing), BI tool integration, SQL-based analytics.

---

## Q16. Best Description of Elastic Load Balancing

Which of the following best describes Elastic Load Balancing?

- A. Translates domain names to IP addresses using DNS.
- B. Distributes incoming application traffic across one or more Amazon EC2 instances.
- C. Collects metrics from attached Amazon EC2 instances.
- D. Automatically adjusts the number of Amazon EC2 instances to support incoming traffic.

**Answer: B**

✅ **B. Distributes incoming application traffic across one or more Amazon EC2 instances**: Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets (EC2 instances, containers, Lambda functions, IP addresses) to improve availability and fault tolerance.

❌ **A. Translates domain names to IP addresses using DNS**: This describes Amazon Route 53 (DNS service), not Elastic Load Balancing.

❌ **C. Collects metrics from attached Amazon EC2 instances**: Collecting metrics and monitoring is the function of Amazon CloudWatch, not ELB. (ELB does send metrics TO CloudWatch, but that is not ELB's primary function.)

❌ **D. Automatically adjusts the number of Amazon EC2 instances to support incoming traffic**: This describes Auto Scaling, not ELB. ELB distributes traffic to existing instances; Auto Scaling adds or removes instances based on demand.

💡 **Exam Tip**: ELB = traffic distribution across existing instances. Auto Scaling = automatic instance count adjustment. They are commonly used together but serve different functions.

---

## Q17. Valid Ways to Interact with AWS Services (Choose TWO)

Which of the following are valid ways for customers to interact with AWS services? (Choose TWO.)

- A. Command Line Interface (CLI)
- B. On-premises
- C. Software Development Kit (SDK)
- D. Software-as-a-Service (SaaS)
- E. Hybrid

**Answer: A, C**

✅ **A. Command Line Interface (CLI)**: The AWS CLI is an open-source tool that allows users to interact with AWS services through terminal commands. It supports automation via scripts and is available on Windows, macOS, and Linux.

✅ **C. Software Development Kit (SDK)**: AWS SDKs provide language-specific APIs (Python/Boto3, Java, Node.js, .NET, Go, etc.) that allow developers to integrate AWS services directly into application code.

❌ **B. On-premises**: On-premises refers to a deployment model (running infrastructure locally), not a method of interacting with AWS services. AWS is accessed over the internet, not from on-prem infrastructure itself.

❌ **D. Software-as-a-Service (SaaS)**: SaaS is a cloud delivery model (like Salesforce or Gmail) — it is not a method for interacting with AWS services.

❌ **E. Hybrid**: Hybrid is a deployment architecture combining cloud and on-premises environments, not a method of interacting with AWS services.

💡 **Exam Tip**: Three main ways to interact with AWS = AWS Management Console (web browser), AWS CLI (command line), AWS SDKs (code/API). Remember all three for the exam.

---

## Q18. AWS Multiple Availability Zones as an Example Of

Multiple Availability Zones in the AWS Cloud are an example of:

- A. Agility.
- B. Global infrastructure.
- C. Elasticity.
- D. Pay-as-you-go pricing.

**Answer: B**

✅ **B. Global infrastructure**: AWS's global infrastructure includes Regions (geographic areas), Availability Zones (isolated data centers within a Region), and Edge Locations. Multiple Availability Zones within a Region are a core component of this global infrastructure design, enabling fault isolation and high availability.

❌ **A. Agility**: Agility refers to the speed at which you can provision and deploy resources. Multiple AZs are about physical infrastructure distribution, not deployment speed.

❌ **C. Elasticity**: Elasticity is the ability to automatically scale resources up or down based on demand. It is about dynamic capacity management, not physical infrastructure layout.

❌ **D. Pay-as-you-go pricing**: This is a billing model where you pay only for what you use. Multiple AZs are an infrastructure concept, not a pricing concept.

💡 **Exam Tip**: AWS Global Infrastructure = Regions + Availability Zones + Edge Locations. An AZ is one or more discrete data centers with redundant power, networking, and connectivity within a Region.

---

## Q19. AWS Services for Serving Large Video Content with Lowest Latency (Choose TWO)

Which of the following AWS services can be used to serve large volumes of online video content with the lowest latency? (Choose TWO.)

- A. AWS Storage Gateway
- B. Amazon S3
- C. Amazon Elastic File System (Amazon EFS)
- D. Amazon Glacier
- E. Amazon CloudFront

**Answer: B, E**

✅ **B. Amazon S3**: S3 is a highly durable, scalable object storage service ideal for storing video files. It can serve video content directly and integrates seamlessly with CloudFront for accelerated delivery.

✅ **E. Amazon CloudFront**: CloudFront is AWS's Content Delivery Network (CDN) with hundreds of edge locations globally. It caches video content at edge locations closest to viewers, dramatically reducing latency for large-scale video delivery.

❌ **A. AWS Storage Gateway**: Storage Gateway is a hybrid storage service connecting on-premises environments to AWS cloud storage. It is not designed for serving content to end users over the internet.

❌ **C. Amazon EFS**: EFS is a managed network file system for Linux-based EC2 workloads. It is not optimized for global content delivery or video streaming to end users.

❌ **D. Amazon Glacier**: Amazon Glacier (S3 Glacier) is long-term archival storage with retrieval delays of minutes to hours. It is completely unsuitable for serving video content with low latency.

💡 **Exam Tip**: Low-latency global video delivery = S3 (storage) + CloudFront (CDN). CloudFront caches content at 400+ edge locations worldwide. This combo is the standard architecture for media streaming on AWS.

---

## Q20. Term Describing EC2 Web Server Accessing On-Premises Legacy Application

A web server running on Amazon EC2 accesses a legacy application running in a company data center. What term describes this model?

- A. Cloud-native
- B. Partner network
- C. Hybrid architecture
- D. Infrastructure as a Service (IaaS)

**Answer: C**

✅ **C. Hybrid architecture**: A hybrid architecture combines cloud resources (AWS) with on-premises infrastructure. In this scenario, one component (web server) runs in the AWS Cloud while another (legacy application) runs in the company's own data center — a classic hybrid deployment pattern.

❌ **A. Cloud-native**: Cloud-native means an application is fully designed and deployed in the cloud, taking advantage of cloud services such as microservices, containers, and serverless. Using on-premises legacy systems is the opposite of cloud-native.

❌ **B. Partner network**: The AWS Partner Network (APN) refers to AWS's ecosystem of consulting and technology partners who build solutions on AWS. It is not a deployment architecture term.

❌ **D. Infrastructure as a Service (IaaS)**: IaaS is a cloud service model where AWS provides virtualized computing infrastructure (EC2, EBS, VPC). It describes the type of service offered, not the deployment pattern mixing cloud and on-premises systems.

💡 **Exam Tip**: Hybrid = Cloud + On-Premises working together. AWS services supporting hybrid: AWS Direct Connect, AWS VPN, AWS Outposts, AWS Storage Gateway. Pure cloud = cloud-native.

---

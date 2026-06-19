---
title: "AWS CLF-C02 Dump Explained Part 2"
date: 2026-06-18 01:02:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

Welcome to Part 2 of the AWS CLF-C02 exam dump series. Each question below is fully translated into English with detailed explanations for correct and incorrect answers, plus targeted exam tips to help you retain key concepts.

---

## Q1. Edge Location Characteristics

Which of the following is a characteristic of an Edge Location?

- A. Hosts Amazon EC2 instances closer to users
- B. Reduces latency and improves performance for users
- C. Caches frequently changing data without reaching the origin server
- D. Refreshes data every day

**Answer: B**

✅ **B. Reduces latency and improves performance for users**: Edge Locations are part of the AWS CloudFront CDN network and are strategically placed around the world to serve cached content to users from the nearest geographic point, thereby reducing latency and improving performance.

❌ **A. Hosts Amazon EC2 instances closer to users**: Edge Locations do not host EC2 instances. EC2 instances run in AWS Regions and Availability Zones, not at Edge Locations.

❌ **C. Caches frequently changing data without reaching the origin server**: Edge Locations are designed to cache relatively static or infrequently changing content, not frequently changing data. Caching frequently changing data would result in serving stale content.

❌ **D. Refreshes data every day**: CloudFront edge caches content based on TTL (Time to Live) settings defined in cache policies, not on a fixed daily schedule.

💡 **Exam Tip**: Edge Location = CloudFront CDN + Low Latency + Content Caching. Edge Locations are NOT the same as Availability Zones or Regions — they are purely for content delivery.

---

## Q2. Restricting S3 Bucket Access for a Specific User

Which of the following can be used to restrict access to an Amazon S3 bucket for a specific user?

- A. Public and private key pairs
- B. Amazon Inspector
- C. AWS IAM (Identity and Access Management) policies
- D. Security Groups

**Answer: C**

✅ **C. AWS IAM (Identity and Access Management) policies**: IAM policies allow you to define fine-grained permissions specifying exactly which users or roles can access a particular S3 bucket and what actions they can perform (e.g., s3:GetObject, s3:PutObject). This is the standard method for controlling per-user S3 access.

❌ **A. Public and private key pairs**: Key pairs are used for SSH access to EC2 instances, not for controlling S3 bucket access permissions.

❌ **B. Amazon Inspector**: Amazon Inspector is a vulnerability assessment service that analyzes EC2 instances and container images for security vulnerabilities — it does not control S3 access.

❌ **D. Security Groups**: Security Groups are virtual firewalls that control inbound and outbound traffic to EC2 instances and other network resources. They do not apply to S3 bucket access control.

💡 **Exam Tip**: To restrict S3 access = IAM Policies (user-level) or S3 Bucket Policies (resource-level). Security Groups apply to EC2/VPC, NOT to S3.

---

## Q3. Free Security-Related Resources from AWS

Which of the following security-related resources is available for free?

- A. AWS Support requests
- B. Contacting AWS Professional Services to request a workshop
- C. Access to forums, blogs, and whitepapers
- D. Attending an AWS course at a local university

**Answer: C**

✅ **C. Access to forums, blogs, and whitepapers**: AWS provides free access to its documentation, whitepapers, security best practice guides, re:Post forums, and official blogs. These are publicly available at no cost and are excellent resources for learning about AWS security.

❌ **A. AWS Support requests**: Basic AWS Support is free, but filing technical support cases beyond basic plan requires a paid support plan (Developer, Business, or Enterprise).

❌ **B. Contacting AWS Professional Services to request a workshop**: AWS Professional Services is a paid consulting service. Requesting workshops through this team incurs costs.

❌ **D. Attending an AWS course at a local university**: University courses are independent of AWS and typically charge tuition fees — they are not free AWS-provided resources.

💡 **Exam Tip**: Free AWS resources include: Documentation, Whitepapers, re:Post Forums, AWS Blogs, Free Tier, and AWS Trusted Advisor (limited). Paid services include AWS Professional Services and premium support plans.

---

## Q4. Reserved Instance Type That Allows Attribute Changes

Which Reserved Instance (RI) pricing model allows you to change RI attributes as long as the exchange results in an RI of equal or greater value?

- A. Dedicated RIs
- B. Scheduled RIs
- C. Convertible RIs
- D. Standard RIs

**Answer: C**

✅ **C. Convertible RIs**: Convertible Reserved Instances allow you to exchange them for other Convertible RIs with different attributes (instance family, OS, tenancy, payment option) as long as the new RI is of equal or greater value. This provides flexibility when your workload needs change over time.

❌ **A. Dedicated RIs**: Dedicated RIs refer to instances running on hardware dedicated to a single customer (single-tenant), not a pricing flexibility model that allows attribute changes.

❌ **B. Scheduled RIs**: Scheduled Reserved Instances allowed reservations for specific recurring time windows, but this offering has been discontinued by AWS and never offered the attribute-change flexibility of Convertible RIs.

❌ **D. Standard RIs**: Standard RIs offer the largest discount (up to 72% off On-Demand) but do not allow changes to the instance family or other core attributes — they are inflexible compared to Convertible RIs.

💡 **Exam Tip**: Convertible RI = Flexibility to exchange attributes. Standard RI = Maximum discount but no exchange. Remember: "Convertible" = you can convert/exchange it.

---

## Q5. AWS Feature That Reduces Total Cost of Ownership (TCO)

Which AWS feature helps reduce a customer's Total Cost of Ownership (TCO)?

- A. Shared responsibility security model
- B. Single tenancy
- C. Elastic computing
- D. Encryption

**Answer: C**

✅ **C. Elastic computing**: Elastic computing allows you to scale resources up or down based on actual demand. This means you only pay for what you use, eliminating the need to over-provision hardware for peak loads — a key factor in reducing TCO compared to on-premises infrastructure.

❌ **A. Shared responsibility security model**: The shared responsibility model defines who is responsible for security (AWS vs. customer), but it is a security governance framework, not directly a cost-reduction mechanism.

❌ **B. Single tenancy**: Single tenancy (Dedicated Hosts/Instances) is actually more expensive than shared multi-tenant infrastructure. It increases cost, not reduces TCO.

❌ **D. Encryption**: Encryption is a security feature that protects data at rest and in transit. While important for compliance, encryption itself does not directly reduce infrastructure costs or TCO.

💡 **Exam Tip**: TCO reduction in AWS comes from: Elasticity (pay for what you use), No upfront hardware costs, Economies of scale, and Managed services (reducing operational overhead). Elastic = pay-as-you-go = lower TCO.

---

## Q6. Service That Automatically Scales Based on Expected Web Traffic Increases

Which of the following services automatically scales based on anticipated increases in web traffic?

- A. AWS CodePipeline
- B. Elastic Load Balancing
- C. Amazon EBS
- D. AWS Direct Connect

**Answer: B**

✅ **B. Elastic Load Balancing**: Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets and scales its capacity in response to changes in incoming traffic. It works seamlessly with Auto Scaling to handle traffic spikes.

❌ **A. AWS CodePipeline**: AWS CodePipeline is a continuous integration and continuous delivery (CI/CD) service for automating release pipelines — it has nothing to do with scaling web traffic.

❌ **C. Amazon EBS**: Amazon Elastic Block Store (EBS) provides persistent block storage volumes for EC2 instances. It does not automatically scale to handle web traffic.

❌ **D. AWS Direct Connect**: AWS Direct Connect is a dedicated network connection from your on-premises environment to AWS. It is a networking service, not a traffic-scaling solution.

💡 **Exam Tip**: ELB (Elastic Load Balancing) + Auto Scaling = the classic AWS combination for handling variable web traffic. ELB distributes traffic; Auto Scaling adjusts the number of EC2 instances.

---

## Q7. Where to Find AWS Compliance Documents Such as SOC 1 Reports

Where can AWS compliance documents such as SOC 1 reports be found?

- A. Amazon Inspector
- B. AWS CloudTrail
- C. AWS Artifact
- D. AWS Certificate Manager

**Answer: C**

✅ **C. AWS Artifact**: AWS Artifact is a self-service portal that provides on-demand access to AWS compliance reports and select online agreements. It includes SOC 1, SOC 2, SOC 3, PCI DSS, ISO certifications, and other compliance documents.

❌ **A. Amazon Inspector**: Amazon Inspector is an automated vulnerability management service — it scans workloads for software vulnerabilities, not a repository for compliance certifications.

❌ **B. AWS CloudTrail**: AWS CloudTrail records API calls and user activity within your AWS account for auditing and governance purposes. It does not store official AWS compliance reports.

❌ **D. AWS Certificate Manager**: AWS Certificate Manager (ACM) is used to provision, manage, and deploy SSL/TLS certificates for use with AWS services. It is unrelated to compliance documentation.

💡 **Exam Tip**: AWS Artifact = Compliance Reports Hub (SOC 1/2/3, PCI DSS, ISO). Think "Artifact" as in "official documented artifact/evidence" of AWS compliance.

---

## Q8. Customer Responsibilities in the AWS Shared Responsibility Model (Select TWO)

In the AWS shared responsibility model, which of the following are the customer's responsibility? (Choose TWO.)

- A. Patching operating system components for Amazon RDS (Amazon Relational Database Service)
- B. Client-side data encryption
- C. Training data center staff
- D. Configuring network Access Control Lists (ACLs)
- E. Maintaining environmental controls within data centers

**Answer: B, D**

✅ **B. Client-side data encryption**: Customers are fully responsible for encrypting data on the client side before it is sent to AWS. AWS provides tools and services to help, but the decision and implementation of client-side encryption is the customer's responsibility.

✅ **D. Configuring network Access Control Lists (ACLs)**: Network ACLs control inbound and outbound traffic at the subnet level within a VPC. Configuring these security rules is the customer's responsibility as part of securing their own network environment.

❌ **A. Patching operating system components for Amazon RDS**: RDS is a managed database service — AWS handles OS-level patching and database engine maintenance. Customers are responsible for patching their application-level configurations, not the underlying OS.

❌ **C. Training data center staff**: AWS is responsible for training its own data center personnel. Customers never have physical access to AWS data centers and therefore bear no responsibility for staff training there.

❌ **E. Maintaining environmental controls within data centers**: Physical and environmental controls (power, cooling, physical security) within AWS data centers are entirely AWS's responsibility.

💡 **Exam Tip**: Shared Responsibility Model — AWS handles "Security OF the Cloud" (hardware, facilities, managed services). Customers handle "Security IN the Cloud" (data, IAM, network config, encryption, OS on EC2). For managed services like RDS, AWS takes more responsibility.

---

## Q9. Recommended Pattern for Designing High-Availability Architecture on AWS

What is the recommended pattern when designing a high-availability architecture on AWS?

- A. Ensure components have low network connection latency
- B. Run enough Amazon EC2 instances to operate at maximum load
- C. Ensure the application is designed to tolerate the failure of a single component
- D. Use a single application that handles all operations

**Answer: C**

✅ **C. Ensure the application is designed to tolerate the failure of a single component**: High availability in AWS is achieved by designing systems that can withstand the failure of individual components without causing a complete outage. This is done through redundancy, multi-AZ deployments, and fault-tolerant architectures.

❌ **A. Ensure components have low network connection latency**: While low latency improves performance, it does not by itself ensure high availability. A low-latency single component can still be a single point of failure.

❌ **B. Run enough Amazon EC2 instances to operate at maximum load**: Running instances sized for maximum load at all times is inefficient and costly. Auto Scaling dynamically adjusts capacity — the goal of HA is resilience, not always running at maximum capacity.

❌ **D. Use a single application that handles all operations**: A single monolithic application is a single point of failure. High availability requires distributing workloads across multiple components and availability zones.

💡 **Exam Tip**: High Availability = Fault Tolerance + Multi-AZ + Redundancy. Design for failure — assume any component CAN fail and architect so the system continues to function despite that failure.

---

## Q10. How Applications Should Be Designed to Run on AWS Cloud

According to best practices, how should applications be designed to run on the AWS Cloud?

- A. Use tightly coupled components
- B. Use loosely coupled components
- C. Use intermittently coupled components
- D. Use frequently coupled components

**Answer: B**

✅ **B. Use loosely coupled components**: Loosely coupled architecture means each component interacts with others through well-defined interfaces (often via APIs, queues, or events) and is not directly dependent on other components' internal workings. This improves resilience — if one component fails, it doesn't cascade and bring down others.

❌ **A. Use tightly coupled components**: Tightly coupled systems have strong dependencies between components. If one fails or changes, it directly impacts others, making the system fragile and harder to scale independently.

❌ **C. Use intermittently coupled components**: "Intermittently coupled" is not a recognized AWS architectural concept or best practice pattern.

❌ **D. Use frequently coupled components**: "Frequently coupled" is not a standard architectural term, and frequent tight coupling increases failure risk and reduces system resilience.

💡 **Exam Tip**: AWS Well-Architected Framework promotes Loose Coupling. Use SQS (queues), SNS (notifications), and API Gateway to decouple components. Loose coupling = independent scaling + fault isolation.

---

## Q11. AWS IAM Methods for Adding Security to IAM Users (Select TWO)

Which of the following methods does AWS support for adding security to IAM (Identity and Access Management) users? (Choose TWO.)

- A. Implement Amazon Rekognition
- B. Use AWS Shield-protected resources
- C. Block access through Security Groups
- D. Use MFA (Multi-Factor Authentication)
- E. Enforce password strength and expiration policies

**Answer: D, E**

✅ **D. Use MFA (Multi-Factor Authentication)**: MFA adds an extra layer of security by requiring users to provide a second form of verification (e.g., a code from an authenticator app) in addition to their password. This significantly reduces the risk of unauthorized access even if a password is compromised.

✅ **E. Enforce password strength and expiration policies**: AWS IAM allows administrators to set account password policies that require minimum length, complexity, and periodic rotation. This reduces the risk of weak or reused passwords being exploited.

❌ **A. Implement Amazon Rekognition**: Amazon Rekognition is an AI image and video analysis service. It is not used to add security to IAM users.

❌ **B. Use AWS Shield-protected resources**: AWS Shield protects against DDoS attacks at the network level. It does not add security to individual IAM user accounts or authentication.

❌ **C. Block access through Security Groups**: Security Groups control network traffic to EC2 instances and other resources. They do not directly protect IAM user accounts or add authentication security.

💡 **Exam Tip**: IAM Security best practices: Enable MFA for all users (especially root), set strong password policies, use least privilege, and rotate access keys regularly. MFA = #1 way to secure IAM users.

---

## Q12. AWS Services for Read/Write of Continuously Changing Data (Select TWO)

Which AWS services should be used for reading and writing continuously changing data? (Choose TWO.)

- A. Amazon Glacier
- B. Amazon RDS
- C. AWS Snowball
- D. Amazon Redshift
- E. Amazon EFS

**Answer: B, E**

✅ **B. Amazon RDS**: Amazon Relational Database Service (RDS) is a managed relational database designed for transactional read/write operations on continuously changing data. It supports MySQL, PostgreSQL, Oracle, SQL Server, and MariaDB.

✅ **E. Amazon EFS**: Amazon Elastic File System (EFS) is a scalable, shared file storage service that supports concurrent read/write access from multiple EC2 instances, making it suitable for workloads with continuously changing data.

❌ **A. Amazon Glacier (S3 Glacier)**: S3 Glacier is designed for long-term archival storage of data that is rarely accessed. It is not suitable for frequent read/write operations.

❌ **C. AWS Snowball**: AWS Snowball is a physical data transfer device used to move large amounts of data into or out of AWS. It is not a database or file system for ongoing data reads and writes.

❌ **D. Amazon Redshift**: Amazon Redshift is a data warehouse service optimized for analytical queries (OLAP) on large datasets. It is not designed for high-frequency transactional read/write workloads (OLTP).

💡 **Exam Tip**: Continuously changing data = RDS (relational/OLTP) or DynamoDB (NoSQL/OLTP) or EFS (shared file storage). Glacier = Archive. Redshift = Analytics/OLAP. Match the data pattern to the right service.

---

## Q13. Advantages of Amazon RDS (Select THREE)

Which of the following are advantages of Amazon RDS (Amazon Relational Database Service)? (Choose THREE.)

- A. Simplifies relational database management tasks
- B. Provides 99.999999999% reliability and durability
- C. Automatically scales the size of the database based on load
- D. Allows users to dynamically adjust CPU and RAM resources

**Answer: A, C, D**

✅ **A. Simplifies relational database management tasks**: RDS automates time-consuming administrative tasks such as hardware provisioning, database setup, patching, and backups, freeing up teams to focus on application development.

✅ **C. Automatically scales the size of the database based on load**: RDS supports Storage Auto Scaling, which automatically increases storage capacity when the database is running low on free space, with no downtime.

✅ **D. Allows users to dynamically adjust CPU and RAM resources**: RDS allows you to scale compute (CPU and RAM) by changing the instance class, providing flexibility to match database resources to workload demands.

❌ **B. Provides 99.999999999% reliability and durability**: The "11 nines" (99.999999999%) durability figure is specific to Amazon S3 object storage, not Amazon RDS. RDS provides high availability through Multi-AZ deployments but is not characterized by this specific durability metric.

💡 **Exam Tip**: 11 nines (99.999999999%) durability = Amazon S3, NOT RDS. RDS strengths = automated backups, Multi-AZ failover, read replicas, and managed patching. Don't confuse S3 durability with RDS availability.

---

## Q14. AWS Service for a Scalable MySQL Database

A customer needs to run a MySQL database that can scale easily. Which AWS service should be used?

- A. Amazon Aurora
- B. Amazon Redshift
- C. Amazon DynamoDB
- D. Amazon ElastiCache

**Answer: A**

✅ **A. Amazon Aurora**: Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud. It is designed to scale automatically and delivers up to 5x the performance of standard MySQL. Aurora supports up to 15 low-latency read replicas and auto-scales storage from 10GB up to 128TB.

❌ **B. Amazon Redshift**: Amazon Redshift is a data warehouse (OLAP) service optimized for analytical queries on large datasets — it is not a replacement for a transactional MySQL database.

❌ **C. Amazon DynamoDB**: Amazon DynamoDB is a NoSQL (key-value and document) database service. It does not support MySQL or SQL-based relational data models.

❌ **D. Amazon ElastiCache**: Amazon ElastiCache is an in-memory caching service (supporting Redis and Memcached). It is used to speed up data retrieval, not to serve as a primary relational database.

💡 **Exam Tip**: Need MySQL or PostgreSQL with cloud-native scaling? = Amazon Aurora. Aurora = MySQL/PostgreSQL compatible + auto-scaling storage + up to 15 read replicas. It's the managed, high-performance RDS alternative.

---

## Q15. AWS Global Infrastructure Component Made Up of Discrete Data Centers Connected by Low-Latency Links

Which AWS Global Infrastructure component consists of one or more discrete data centers interconnected through low-latency links?

- A. Availability Zone
- B. Edge Location
- C. Region
- D. Private Networking

**Answer: A**

✅ **A. Availability Zone**: An Availability Zone (AZ) is one or more discrete data centers within a Region, each with redundant power, networking, and connectivity. AZs within the same Region are interconnected through low-latency, high-bandwidth, and highly redundant networking.

❌ **B. Edge Location**: Edge Locations are endpoints for CloudFront CDN — they are smaller caching nodes distributed globally for content delivery, not full data centers connected via low-latency links forming a core infrastructure cluster.

❌ **C. Region**: A Region is a geographically separate area that contains multiple Availability Zones. The Region itself is the broader grouping; individual AZs are the discrete data centers within it.

❌ **D. Private Networking**: Private Networking (such as VPC) is a logical network construct within AWS, not a physical infrastructure component of the AWS Global Infrastructure.

💡 **Exam Tip**: AWS Global Infrastructure hierarchy: Region > Availability Zone (AZ) > Data Center. AZ = 1 or more data centers with low-latency links. Multiple AZs = one Region. Always deploy across multiple AZs for high availability.

---

## Q16. Shared Control Between AWS and the Customer

Which of the following is a shared control between the customer and AWS?

- A. Providing keys for Amazon S3 client-side encryption
- B. Amazon EC2 instance configuration
- C. Environmental controls within physical AWS data centers
- D. Awareness and training

**Answer: D**

✅ **D. Awareness and training**: Training is a shared control — AWS trains its own employees on AWS policies and security, while customers are responsible for training their own staff on how to properly use AWS services, security best practices, and compliance requirements. Both parties must maintain training programs relevant to their respective responsibilities.

❌ **A. Providing keys for Amazon S3 client-side encryption**: Managing encryption keys for client-side encryption is solely the customer's responsibility. AWS has no access to or control over customer-managed encryption keys used client-side.

❌ **B. Amazon EC2 instance configuration**: Configuring EC2 instances (OS, applications, security settings) is entirely the customer's responsibility. AWS provides the infrastructure but does not manage the instances customers launch.

❌ **C. Environmental controls within physical AWS data centers**: Physical and environmental controls (temperature, humidity, physical security, power) at AWS data centers are entirely AWS's responsibility. Customers have no role in managing physical facilities.

💡 **Exam Tip**: Shared Controls in AWS Shared Responsibility Model include: Patch Management, Configuration Management, and Awareness & Training. Both AWS and customers train their own people. "Shared" does NOT mean joint decision-making — each party handles their own side.

---

## Q17. Minimum Number of Availability Zones for High Availability

Across how many Availability Zones should computing resources be provisioned to achieve high availability?

- A. At least 1
- B. At least 2
- C. At least 3
- D. At least 4 or more

**Answer: B**

✅ **B. At least 2**: To achieve high availability, resources should be deployed across a minimum of 2 Availability Zones. This ensures that if one AZ experiences an outage, the other AZ can continue serving requests without interruption, providing redundancy and fault tolerance.

❌ **A. At least 1**: Deploying to a single AZ means there is no redundancy. If that one AZ goes down, the application becomes unavailable — this does not constitute high availability.

❌ **C. At least 3**: While deploying to 3 AZs provides additional resilience, it is not the minimum requirement for high availability. 2 AZs is the recommended minimum baseline.

❌ **D. At least 4 or more**: Deploying across 4+ AZs provides excellent fault tolerance but far exceeds the minimum requirement. Not all AWS Regions even have 4 AZs.

💡 **Exam Tip**: High Availability minimum = 2 AZs. AWS recommends Multi-AZ deployments for production workloads. Services like RDS Multi-AZ, ELB, and Aurora automatically span multiple AZs for built-in high availability.

---

## Q18. Benefits of Moving from On-Premises Data Center to AWS Cloud

Which of the following is a benefit of transitioning infrastructure from an on-premises data center to the AWS Cloud?

- A. IT costs can be completely eliminated
- B. Businesses can place servers at each customer's data center
- C. Allows businesses to focus on their core business activities
- D. Servers can be left unpatched

**Answer: C**

✅ **C. Allows businesses to focus on their core business activities**: By migrating to AWS, businesses offload the undifferentiated heavy lifting of managing physical infrastructure (hardware procurement, data center operations, capacity planning) to AWS. This frees up time, budget, and staff to focus on innovation and core business objectives.

❌ **A. IT costs can be completely eliminated**: Moving to AWS does not eliminate IT costs — it transforms capital expenditure (CapEx) into operational expenditure (OpEx). You still pay for the services you use, but you avoid large upfront hardware investments.

❌ **B. Businesses can place servers at each customer's data center**: AWS operates its own global data centers — customers do not place servers at customer sites using AWS cloud. This describes edge computing or on-premises solutions, not standard AWS cloud services.

❌ **D. Servers can be left unpatched**: Security responsibility does not disappear in the cloud. Customers remain responsible for patching their own EC2 instances, operating systems, and applications. Leaving servers unpatched is a security risk regardless of deployment model.

💡 **Exam Tip**: Key AWS Cloud benefit = "Focus on business, not infrastructure." AWS handles the undifferentiated heavy lifting (hardware, data center ops). Customers shift from CapEx (buying servers) to OpEx (pay-as-you-go). IT costs shift, not disappear.

---

## Q19. Most Cost-Effective and Durable Storage for Database Backups Requiring Immediate Retrieval

What is the most cost-effective and durable storage option for preserving database backups that require immediate retrieval?

- A. Amazon S3
- B. Amazon Glacier
- C. Amazon EBS
- D. Amazon EC2 Instance Store

**Answer: A**

✅ **A. Amazon S3**: Amazon S3 provides 99.999999999% (11 nines) durability and immediate data retrieval with low latency. S3 Standard is highly durable and cost-effective for backup storage that needs to be accessible immediately, making it the best choice for database backups requiring instant access.

❌ **B. Amazon Glacier (S3 Glacier)**: S3 Glacier is designed for archival storage where data is rarely accessed. Retrieval from Glacier can take minutes to hours (Expedited: 1-5 min, Standard: 3-5 hours, Bulk: 5-12 hours) and is NOT suitable for "immediate" retrieval requirements.

❌ **C. Amazon EBS**: Amazon EBS provides persistent block storage for EC2 instances. While EBS can store backups, it is more expensive than S3 and is not designed as a standalone backup storage solution — it must be attached to an EC2 instance.

❌ **D. Amazon EC2 Instance Store**: Instance Store is ephemeral (temporary) storage that is lost when the EC2 instance is stopped or terminated. It is the worst option for durable backup storage.

💡 **Exam Tip**: S3 = Best for durable backups with immediate access (11 nines durability). S3 Glacier = Cheapest for archives but NOT immediate. Instance Store = Ephemeral (lost on stop/terminate). EBS = Block storage, not standalone backup storage. Match retrieval speed to storage class.

---

## Q20. AWS IAM Feature That Allows CLI Access to AWS Services

Which AWS IAM feature allows developers to access AWS services through the AWS CLI?

- A. API keys
- B. Access keys
- C. Username/Password
- D. SSH keys

**Answer: B**

✅ **B. Access keys**: AWS IAM Access Keys consist of an Access Key ID and a Secret Access Key. They are used to authenticate programmatic requests to AWS services via the AWS CLI, AWS SDKs, and direct API calls. Developers configure the AWS CLI with these credentials using `aws configure`.

❌ **A. API keys**: "API keys" is not the correct AWS IAM terminology. AWS uses "Access Keys" for programmatic access. While the concept is similar, the specific answer for IAM programmatic access is Access Keys (not a generic "API key").

❌ **C. Username/Password**: Username and password credentials are used to log in to the AWS Management Console (web interface). They cannot be used directly with the AWS CLI for programmatic access.

❌ **D. SSH keys**: SSH key pairs are used to establish secure shell (SSH) connections to EC2 instances (Linux). They are not used for AWS CLI authentication or IAM-based programmatic access to AWS services.

💡 **Exam Tip**: AWS CLI / SDK authentication = IAM Access Keys (Access Key ID + Secret Access Key). Console login = Username + Password (+ MFA). EC2 Linux login = SSH Key Pair. Know which credential type matches which access method.

---

*This post is part of the AWS CLF-C02 exam prep series. Practice consistently and focus on understanding the "why" behind each answer, not just memorizing choices.*

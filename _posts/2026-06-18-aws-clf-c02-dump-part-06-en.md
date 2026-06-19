---
title: "AWS CLF-C02 Dump Explained Part 6"
date: 2026-06-18 01:06:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

Practice makes perfect! Below are 20 AWS CLF-C02 exam questions translated from Korean with full answer explanations and exam tips to help you pass on your first try.

---

## Q1. Securing AWS Account Access (Choose 2)

Which of the following are security measures that protect access to an AWS account? (Choose TWO.)

- A. Use AWS CloudTrail.
- B. Grant IAM users the least privilege access.
- C. Create one IAM user and share it among many developers and users.
- D. Use Amazon CloudFront.
- E. Enable MFA (Multi-Factor Authentication) for privileged users.

**Answer: B, E**

✅ **B. Grant IAM users the least privilege access**: The principle of least privilege ensures each user has only the permissions they need, reducing the attack surface if credentials are compromised.

✅ **E. Enable MFA for privileged users**: MFA adds a second layer of verification beyond passwords, making it significantly harder for unauthorized users to gain access even if a password is stolen.

❌ **A. AWS CloudTrail**: CloudTrail is an auditing and logging service — it records API calls but does not itself prevent unauthorized access. It is a detective control, not a preventive one.

❌ **C. Create one IAM user and share it among many users**: Sharing IAM credentials is a major security anti-pattern. It prevents accountability and makes it impossible to track who performed which action.

❌ **D. Amazon CloudFront**: CloudFront is a Content Delivery Network (CDN) for distributing content globally. It is not an account access security measure.

💡 **Exam Tip**: Security = Least Privilege + MFA. These two together are the foundational best practices for IAM security in AWS.

---

## Q2. Hybrid Storage Service for On-Premises Applications

Which hybrid storage service enables on-premises applications to seamlessly use cloud storage?

- A. Amazon Glacier
- B. AWS Snowball
- C. AWS Storage Gateway
- D. Amazon Elastic Block Store (Amazon EBS)

**Answer: C**

✅ **C. AWS Storage Gateway**: Storage Gateway is a hybrid cloud storage service that connects on-premises environments to AWS cloud storage. It provides a seamless bridge so that existing on-premises applications can read and write data to AWS without modification.

❌ **A. Amazon Glacier (now Amazon S3 Glacier)**: S3 Glacier is an archival storage service for long-term data retention. It is not designed to act as a bridge for on-premises applications.

❌ **B. AWS Snowball**: Snowball is a physical data transport device used to migrate large amounts of data to AWS. It is not a continuous hybrid connectivity solution.

❌ **D. Amazon EBS**: EBS is a block storage service for use with EC2 instances in the cloud. It cannot be directly mounted or accessed by on-premises servers.

💡 **Exam Tip**: "Hybrid storage" + "on-premises to cloud" = AWS Storage Gateway. Remember: Gateway bridges your datacenter to AWS.

---

## Q3. Customer Responsibility — OS, Security Patches, and Networking

Which of the following makes the customer responsible for maintaining the operating system configuration, security patches, and networking?

- A. Amazon RDS
- B. Amazon EC2
- C. Amazon ElastiCache
- D. AWS Fargate

**Answer: B**

✅ **B. Amazon EC2**: EC2 provides virtual machines where the customer has full control over the operating system. This means the customer is responsible for OS updates, security patches, and network configuration on those instances.

❌ **A. Amazon RDS**: RDS is a fully managed relational database service. AWS handles OS patching, database engine updates, and hardware maintenance on behalf of the customer.

❌ **C. Amazon ElastiCache**: ElastiCache is a fully managed in-memory caching service. AWS manages the underlying infrastructure, OS, and software patches.

❌ **D. AWS Fargate**: Fargate is a serverless compute engine for containers. AWS manages the underlying servers and OS; customers only manage their container definitions and application code.

💡 **Exam Tip**: Shared Responsibility — EC2 = customer manages OS and above. RDS, ElastiCache, Fargate = AWS manages the OS layer.

---

## Q4. Key Architectural Design Principle for Cloud Applications

Which of the following is an important architectural design principle when designing cloud applications?

- A. Use multiple Availability Zones.
- B. Use tightly coupled components.
- C. Use open-source software.
- D. Provision additional capacity.

**Answer: A**

✅ **A. Use multiple Availability Zones**: Distributing workloads across multiple AZs is a core AWS Well-Architected principle for high availability and fault tolerance. If one AZ fails, traffic can automatically fail over to another.

❌ **B. Use tightly coupled components**: Tight coupling is an anti-pattern in cloud architecture. Loosely coupled components (e.g., using SQS queues between services) allow independent scaling and failure isolation.

❌ **C. Use open-source software**: While open-source software is common on AWS, it is not itself a cloud architecture design principle. The exam focuses on AWS architectural best practices.

❌ **D. Provision additional capacity**: Over-provisioning wastes resources and costs money. Cloud architecture favors elasticity — scale out on demand rather than pre-provisioning excess capacity.

💡 **Exam Tip**: AWS Well-Architected pillars favor high availability (multi-AZ), loose coupling, elasticity, and pay-as-you-go — not over-provisioning or tight coupling.

---

## Q5. Amazon RDS Benefits Over Traditional Database Management

What advantage does Amazon RDS provide compared to traditional database management?

- A. AWS manages the data stored in Amazon RDS tables.
- B. AWS manages the maintenance of the operating system.
- C. AWS automatically scales the instance type on demand.
- D. AWS manages the database type.

**Answer: B**

✅ **B. AWS manages the maintenance of the operating system**: One of the primary benefits of Amazon RDS is that AWS handles the undifferentiated heavy lifting — including OS patching, database software updates, and hardware maintenance — freeing customers to focus on their application and data.

❌ **A. AWS manages the data stored in RDS tables**: The customer owns and manages their data. AWS does not access, manage, or control the content of your database tables; that remains the customer's responsibility.

❌ **C. AWS automatically scales the instance type on demand**: RDS does not auto-scale the instance type automatically. Customers must manually change instance sizes or use Aurora Serverless for auto-scaling database capacity.

❌ **D. AWS manages the database type**: The customer selects and is responsible for choosing the database engine (MySQL, PostgreSQL, Oracle, etc.). AWS does not decide or change the database type.

💡 **Exam Tip**: RDS key benefit = AWS manages OS patching, backups, hardware. Customer still manages schema, data, and query optimization.

---

## Q6. Caching Common Database Query Results

Which service is best suited for storing common database query results to help reduce database access load?

- A. Amazon Machine Learning
- B. Amazon SQS
- C. Amazon ElastiCache
- D. Amazon EC2 Instance Store

**Answer: C**

✅ **C. Amazon ElastiCache**: ElastiCache is a fully managed, in-memory caching service that supports Redis and Memcached. It is specifically designed to cache frequently accessed data (like database query results) in memory for millisecond-latency retrieval, dramatically reducing load on backend databases.

❌ **A. Amazon Machine Learning**: Amazon ML (and now Amazon SageMaker) is for building and deploying machine learning models — not for caching database query results.

❌ **B. Amazon SQS**: SQS is a message queuing service for decoupling application components. It is not used for caching data or query results.

❌ **D. Amazon EC2 Instance Store**: Instance Store provides temporary block storage directly attached to an EC2 instance. It is not a managed caching layer and data is lost when the instance stops.

💡 **Exam Tip**: Database caching = ElastiCache (Redis / Memcached). Reduces DB load, speeds up reads, stores frequently queried results in memory.

---

## Q7. AWS-Managed Component in the Shared Responsibility Model

Which component of the shared responsibility model is managed entirely by AWS?

- A. Applying operating system software patches
- B. Data encryption
- C. Enforcing Multi-Factor Authentication
- D. Auditing physical data center assets

**Answer: D**

✅ **D. Auditing physical data center assets**: AWS is fully responsible for the physical security, maintenance, and auditing of its global data centers. Customers have no access to AWS facilities and rely on AWS compliance certifications (SOC, ISO, etc.) as evidence of physical security.

❌ **A. Applying operating system software patches**: For services like EC2, the customer is responsible for patching the OS. Only for managed services (RDS, ElastiCache, etc.) does AWS handle OS patching.

❌ **B. Data encryption**: Encryption is a shared responsibility. AWS provides the tools and services (KMS, SSE), but customers must decide what to encrypt and configure it appropriately.

❌ **C. Enforcing Multi-Factor Authentication**: MFA enforcement is the customer's responsibility. AWS provides MFA capability, but it is up to the customer to enable and require it for their IAM users.

💡 **Exam Tip**: Physical security of AWS data centers (hardware, buildings, power, networking) = 100% AWS responsibility. Customers never touch the physical layer.

---

## Q8. AWS Options for Learning Cloud Security in an Instructor-Led Setting (Choose 2)

What options does AWS provide for customers who want to learn about cloud security in an instructor-led setting? (Choose TWO.)

- A. AWS Trusted Advisor
- B. AWS Online Tech Talks
- C. AWS Blog
- D. AWS Forums
- E. AWS Classroom Training

**Answer: B, E**

✅ **B. AWS Online Tech Talks**: AWS Online Tech Talks are live, instructor-led webinars covering a wide range of AWS services and topics including security. They provide structured, guided learning in a real-time format.

✅ **E. AWS Classroom Training**: AWS Classroom Training (offered through AWS Training and Certification) provides formal instructor-led courses on cloud topics including security, in both virtual and in-person formats.

❌ **A. AWS Trusted Advisor**: Trusted Advisor is an automated tool that provides best practice recommendations across security, cost, and performance. It is not a training or learning platform.

❌ **C. AWS Blog**: The AWS Blog is a self-paced reading resource. It provides articles and announcements but is not an instructor-led learning environment.

❌ **D. AWS Forums**: AWS Forums (now AWS re:Post) is a community Q&A platform. It is user-driven and not instructor-led.

💡 **Exam Tip**: For formal, instructor-led AWS training = AWS Classroom Training and AWS Online Tech Talks. Self-paced options include AWS Skill Builder and documentation.

---

## Q9. Features Configurable Through Amazon VPC Dashboard (Choose 2)

Which of the following can be configured through the Amazon Virtual Private Cloud (Amazon VPC) dashboard? (Choose TWO.)

- A. Amazon CloudFront distributions
- B. Amazon Route 53
- C. Security Groups
- D. Subnets
- E. Elastic Load Balancing

**Answer: C, D**

✅ **C. Security Groups**: Security Groups are virtual firewalls that control inbound and outbound traffic at the instance level. They are a core VPC networking feature configured directly in the VPC console.

✅ **D. Subnets**: Subnets divide your VPC's IP address range into segments, enabling you to isolate resources across Availability Zones. Creating and managing subnets is a fundamental VPC dashboard function.

❌ **A. Amazon CloudFront distributions**: CloudFront is a global CDN service managed through its own console (or CloudFront section), not through the VPC dashboard.

❌ **B. Amazon Route 53**: Route 53 is a DNS and domain registration service with its own separate console. It operates globally and is not part of the VPC configuration.

❌ **E. Elastic Load Balancing**: ELB is configured through the EC2 console under "Load Balancers," not the VPC dashboard directly (though ELBs reside within VPCs).

💡 **Exam Tip**: VPC core components = Subnets, Route Tables, Internet Gateways, NAT Gateways, Security Groups, and Network ACLs. CloudFront and Route 53 are separate global services.

---

## Q10. Enabling Consolidated Billing Across Departments

If each department in a company has its own AWS account, what is one way to enable consolidated billing?

- A. Use AWS Budgets in each account for budget purposes only.
- B. Contact the AWS Support team for monthly bills.
- C. Create an AWS Organization with a payer account and invite other accounts to join.
- D. Put all invoices in one Amazon S3 bucket, load the data into Amazon Redshift, and run billing reports.

**Answer: C**

✅ **C. Create an AWS Organization with a payer account and invite other accounts to join**: AWS Organizations is the native service for managing multiple AWS accounts centrally. A master (payer) account can consolidate billing for all linked member accounts, providing a single monthly invoice and enabling volume discounts.

❌ **A. Use AWS Budgets in each account**: AWS Budgets sets cost thresholds and alerts per account, but it does not consolidate billing. Each account would still receive separate invoices.

❌ **B. Contact the AWS Support team for monthly bills**: AWS Support does not manually consolidate billing on request. Consolidated billing is achieved through AWS Organizations, not by contacting support.

❌ **D. Put invoices in S3, load into Redshift, and run reports**: While this could provide analytical visibility into billing, it does not actually consolidate billing. It is a complex workaround, not an official AWS billing consolidation method.

💡 **Exam Tip**: Multiple accounts + single bill = AWS Organizations with Consolidated Billing. Bonus: you also get volume pricing discounts across all member accounts.

---

## Q11. Benefits from Amazon's Economies of Scale

Because of Amazon's massive economies of scale, what benefit do customers receive?

- A. Periodic price reductions due to Amazon's operational efficiencies.
- B. New Amazon EC2 instance types with the latest hardware.
- C. The ability to scale up and scale down when needed.
- D. Improved reliability of the underlying hardware of Amazon EC2 instances.

**Answer: A**

✅ **A. Periodic price reductions due to Amazon's operational efficiencies**: AWS's economies of scale allow it to achieve lower costs as it grows, and these savings are passed on to customers through regular price reductions. AWS has lowered prices over 100 times since launching.

❌ **B. New Amazon EC2 instance types with the latest hardware**: While AWS does release new instance types, this is a product innovation benefit, not the direct result of economies of scale. New instance types come with new pricing.

❌ **C. The ability to scale up and scale down when needed**: Elasticity is a cloud computing benefit (agility/flexibility), not specifically a result of economies of scale.

❌ **D. Improved reliability of the underlying hardware**: Hardware reliability improvements are part of AWS's ongoing infrastructure investment, not the primary outcome of economies of scale.

💡 **Exam Tip**: Economies of Scale = lower costs for AWS = lower prices for customers. One of the 6 advantages of cloud computing per the AWS Cloud Practitioner framework.

---

## Q12. AWS Services for Collecting Information About Account Activity (Choose 2)

Which AWS services can be used to collect information about AWS account activity? (Choose TWO.)

- A. Amazon CloudFront
- B. AWS Cloud9
- C. AWS CloudTrail
- D. AWS CloudHSM
- E. Amazon CloudWatch

**Answer: C, E**

✅ **C. AWS CloudTrail**: CloudTrail records all API calls and management events across your AWS account, providing a full audit history of who did what, when, and from where. It is the primary service for account activity logging.

✅ **E. Amazon CloudWatch**: CloudWatch collects metrics, logs, and events from AWS resources and applications. It enables monitoring of resource utilization, application performance, and operational health in real time.

❌ **A. Amazon CloudFront**: CloudFront is a CDN service for distributing content to end users with low latency. It does not collect general account activity information.

❌ **B. AWS Cloud9**: Cloud9 is a cloud-based integrated development environment (IDE) for writing and debugging code. It is not an account monitoring or activity collection service.

❌ **D. AWS CloudHSM**: CloudHSM is a hardware security module service for managing cryptographic keys. It is a security service, not an account activity monitoring tool.

💡 **Exam Tip**: CloudTrail = WHO did WHAT (API audit log). CloudWatch = resource metrics and performance logs. Both = account activity visibility.

---

## Q13. Common IT Tasks AWS Can Handle When Securing Company IT Resources (Choose 2)

Which common IT tasks can AWS handle when securing company IT resources on AWS? (Choose TWO.)

- A. Patching database software
- B. Testing application releases
- C. Database backups
- D. Writing database schemas
- E. Running penetration tests

**Answer: A, C**

✅ **A. Patching database software**: For managed database services like Amazon RDS, AWS handles all database engine and OS patching automatically. This frees the customer from manual patch management.

✅ **C. Database backups**: Amazon RDS automatically performs daily backups and enables point-in-time recovery. AWS manages the backup process, storage, and retention for managed database services.

❌ **B. Testing application releases**: Application testing is the customer's responsibility. AWS provides tools (like CodePipeline and CodeBuild) to assist, but the customer owns the testing process.

❌ **D. Writing database schemas**: Database schema design is entirely the customer's responsibility. AWS provides the database infrastructure but has no involvement in schema creation.

❌ **E. Running penetration tests**: Customers can run penetration tests against their own AWS resources, but this is a customer-initiated activity. AWS does not perform penetration testing on behalf of customers (though it requires notification/approval for certain test types).

💡 **Exam Tip**: Managed services (RDS, ElastiCache) = AWS handles patching, backups, HA. Customer still owns schema, queries, data content, and application logic.

---

## Q14. When to Use Amazon EC2 Spot Instances

In which scenario should Amazon EC2 Spot Instances be used?

- A. A company wants to move its main website from an on-premises web server to AWS.
- B. A company has numerous application services requiring 99.999% uptime per the SLA.
- C. A company has a heavily used legacy database currently running on-premises.
- D. A company has multiple intermittent, interruptible workloads currently using On-Demand Instances.

**Answer: D**

✅ **D. Multiple intermittent, interruptible workloads currently using On-Demand Instances**: Spot Instances are spare EC2 capacity offered at up to 90% discount compared to On-Demand pricing. They are ideal for fault-tolerant, flexible workloads that can be interrupted — such as batch processing, data analysis, or background jobs.

❌ **A. Moving a main website to AWS**: A production web server requires consistent, predictable availability. Spot Instances can be interrupted with a 2-minute warning, making them unsuitable for continuously available websites.

❌ **B. Applications requiring 99.999% uptime per SLA**: Spot Instances offer no availability guarantees and can be reclaimed by AWS at any time. High-SLA applications need Reserved or On-Demand Instances for reliability.

❌ **C. A heavily used legacy database on-premises**: Legacy databases typically need stable, persistent compute. Spot interruptions could cause data loss or corruption, making them entirely inappropriate for database workloads.

💡 **Exam Tip**: Spot Instances = cheapest option, but interruptible. Best for: batch jobs, big data processing, CI/CD pipelines, rendering — anything that can restart from where it left off.

---

## Q15. AWS Feature for Achieving Application High Availability

Which AWS feature should customers leverage to achieve high availability for their applications?

- A. AWS Direct Connect
- B. Availability Zones
- C. Data Centers
- D. Amazon Virtual Private Cloud (Amazon VPC)

**Answer: B**

✅ **B. Availability Zones**: AWS Availability Zones (AZs) are physically separate, isolated data center clusters within a region. Deploying applications across multiple AZs ensures that if one AZ experiences an outage, the application remains available through the others — the cornerstone of high availability on AWS.

❌ **A. AWS Direct Connect**: Direct Connect provides a dedicated private network connection from on-premises to AWS. It improves network performance and reliability but is not a high-availability feature for applications hosted on AWS.

❌ **C. Data Centers**: AWS data centers are the physical buildings that make up AZs. Customers do not directly configure or interact with individual data centers; they work with AZs as the abstraction layer.

❌ **D. Amazon VPC**: A VPC is a logically isolated network within AWS. While VPCs are essential for networking, they alone do not provide high availability. You still need to deploy resources across multiple AZs within the VPC.

💡 **Exam Tip**: High Availability = deploy across multiple Availability Zones (AZs). AZs are physically separate within a Region, connected by low-latency links.

---

## Q16. Minimum AWS Support Plan That Includes Infrastructure Event Management

What is the minimum AWS Support plan that includes Infrastructure Event Management at no additional cost?

- A. Enterprise
- B. Business
- C. Developer
- D. Basic

**Answer: A**

✅ **A. Enterprise**: Infrastructure Event Management (IEM) is included at no extra charge only with the Enterprise Support plan. It provides hands-on guidance from AWS Solutions Architects and Technical Account Managers for critical launches and events.

❌ **B. Business**: The Business support plan does provide access to Infrastructure Event Management, but it is available as a paid add-on — not included in the base Business plan price.

❌ **C. Developer**: The Developer support plan is the entry-level paid plan. It includes email support during business hours but does not offer Infrastructure Event Management.

❌ **D. Basic**: The Basic support plan is free and includes access to documentation, whitepapers, and AWS Trusted Advisor (limited checks). It does not include any human-led support or IEM.

💡 **Exam Tip**: Enterprise Support = TAM (Technical Account Manager) + IEM included + 15-min response for critical issues. Business = IEM as paid add-on.

---

## Q17. AWS Service That Can Serve a Static Website

Which AWS service can serve a static website?

- A. Amazon S3
- B. Amazon Route 53
- C. Amazon QuickSight
- D. AWS X-Ray

**Answer: A**

✅ **A. Amazon S3**: Amazon S3 supports static website hosting natively. You can upload HTML, CSS, JavaScript, and media files to an S3 bucket and configure it to serve as a public website — with no web server required.

❌ **B. Amazon Route 53**: Route 53 is a DNS and domain registration service. While it can route traffic to an S3-hosted static website, it cannot host the website content itself.

❌ **C. Amazon QuickSight**: QuickSight is a business intelligence and data visualization service for creating dashboards and reports. It is not used for hosting websites.

❌ **D. AWS X-Ray**: X-Ray is an application performance monitoring and distributed tracing service. It helps debug microservices and is not involved in serving web content.

💡 **Exam Tip**: S3 static website hosting = enable static website hosting on bucket + make objects public. No EC2 or web server needed. Great for HTML/CSS/JS sites.

---

## Q18. How AWS Reduces IT Resource Provisioning Time

How does AWS reduce IT resource provisioning time?

- A. Provides an online IT ticketing platform for resource requests.
- B. Supports automatic code validation services.
- C. Provides the ability to programmatically provision existing resources.
- D. Automates the resource request process from the company's list of IT vendors.

**Answer: C**

✅ **C. Provides the ability to programmatically provision existing resources**: AWS enables infrastructure-as-code through services like AWS CloudFormation, AWS CLI, and SDKs. This means resources that once took weeks to procure and provision can be launched in minutes through APIs or automation scripts.

❌ **A. Provides an online IT ticketing platform**: AWS does not provide a general-purpose IT ticketing system. The ability to provision resources via API is what eliminates the need for ticket-based procurement processes.

❌ **B. Supports automatic code validation services**: While AWS does offer code quality tools (like CodeGuru), automatic code validation is not the mechanism by which AWS reduces infrastructure provisioning time.

❌ **D. Automates the resource request process from the company's IT vendor list**: AWS replaces the vendor procurement model entirely. You no longer order hardware from vendors; you provision cloud resources directly through AWS APIs.

💡 **Exam Tip**: Cloud agility = provision resources in minutes via API/CLI/CloudFormation. No hardware purchase orders, no lead time, no physical installation.

---

## Q19. Uses for AWS Edge Locations (Choose 2)

Where can AWS edge locations be used? (Choose TWO.)

- A. Application hosting
- B. Delivering content closer to users
- C. Running NoSQL database caching services
- D. Reducing server traffic by caching responses
- E. Sending notification messages to end users

**Answer: B, D**

✅ **B. Delivering content closer to users**: AWS edge locations are the global network of nodes used by Amazon CloudFront (CDN). By caching content at edge locations near end users, CloudFront delivers data with lower latency and faster load times.

✅ **D. Reducing server traffic by caching responses**: CloudFront caches content at edge locations so that repeat requests are served from the cache rather than hitting the origin server. This significantly reduces load on backend servers.

❌ **A. Application hosting**: EC2 instances and applications are hosted in AWS Regions and Availability Zones, not at edge locations. Edge locations are for content delivery caching, not compute hosting.

❌ **C. Running NoSQL database caching services**: DynamoDB Accelerator (DAX) and ElastiCache are in-memory database caching services that run in Regions, not at edge locations.

❌ **E. Sending notification messages to end users**: Push notifications are handled by Amazon SNS (Simple Notification Service), which operates from AWS Regions — not from edge locations.

💡 **Exam Tip**: Edge Locations = CloudFront CDN + AWS Global Accelerator + Route 53 latency routing. Purpose: cache content close to users for low latency. Not for compute or databases.

---

## Q20. Restricting Amazon S3 Bucket Access for Specific Users

Which of the following can restrict Amazon S3 bucket access for specific users?

- A. Public and private key pairs
- B. Amazon Inspector
- C. AWS IAM (Identity and Access Management) policies
- D. Security Groups

**Answer: C**

✅ **C. AWS IAM policies**: IAM policies define what actions are allowed or denied on which AWS resources. By attaching policies to IAM users, groups, or roles, you can precisely control who can access specific S3 buckets and what operations they can perform (read, write, delete, etc.).

❌ **A. Public and private key pairs**: Key pairs (such as EC2 SSH keys) are used for authentication to EC2 instances, not for controlling access to S3 buckets. S3 access is controlled through IAM policies and bucket policies.

❌ **B. Amazon Inspector**: Amazon Inspector is an automated vulnerability assessment service that scans EC2 instances and container images for security vulnerabilities. It does not control S3 bucket access permissions.

❌ **D. Security Groups**: Security Groups are virtual firewalls for EC2 instances operating at the network level. They control inbound and outbound traffic to instances — they cannot be applied to S3 buckets to restrict user access.

💡 **Exam Tip**: S3 access control = IAM policies (user-level) + S3 Bucket Policies (resource-level) + S3 ACLs (legacy). Security Groups only apply to EC2, not S3.

---

*Good luck on your AWS CLF-C02 exam! Review these questions regularly and focus on understanding the "why" behind each answer, not just memorizing the correct choice.*

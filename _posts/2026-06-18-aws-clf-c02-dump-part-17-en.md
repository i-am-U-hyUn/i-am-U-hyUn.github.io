---
title: "AWS CLF-C02 Dump Explained Part 17"
date: 2026-06-18 01:17:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

Practice makes perfect! Here are 20 AWS CLF-C02 exam questions from Batch 17, fully translated into English with detailed explanations and exam tips to help you pass the Cloud Practitioner exam.

---

## Q1. VPC Feature for Capturing IP Traffic to EC2

Which Amazon VPC feature supports capturing information about the IP traffic reaching Amazon EC2 instances?

- A. Security Groups
- B. Elastic Network Interface
- C. Network ACL
- D. VPC Flow Logs

**Answer: D**

✅ **D. VPC Flow Logs**: VPC Flow Logs is a feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC. The logs can be published to Amazon CloudWatch Logs or Amazon S3 for analysis and troubleshooting.

❌ **A. Security Groups**: Security Groups act as a virtual firewall that controls inbound and outbound traffic at the instance level, but they do not capture or log traffic information.

❌ **B. Elastic Network Interface**: An ENI is a logical networking component in a VPC that represents a virtual network card. It does not have logging or traffic capture capabilities by itself.

❌ **C. Network ACL**: Network ACLs provide stateless traffic filtering at the subnet level, but they do not log or capture traffic data.

💡 **Exam Tip**: VPC Flow Logs = traffic monitoring/logging for EC2 instances. Security Groups and NACLs = traffic filtering/blocking. Remember: Flow Logs capture, Security Groups control.

---

## Q2. AWS Service for Auto Scaling Without Capacity Planning

Which AWS service can be used to automatically scale an application up or down without deciding on capacity planning?

- A. Amazon Auto Scaling
- B. Amazon Redshift
- C. AWS CloudTrail
- D. AWS Lambda

**Answer: A**

✅ **A. Amazon Auto Scaling**: Amazon Auto Scaling automatically adjusts the number of EC2 instances or other resources based on demand, eliminating the need to manually plan or provision capacity in advance. It scales out when demand increases and scales in when demand decreases.

❌ **B. Amazon Redshift**: Redshift is a fully managed data warehouse service optimized for analytics and querying large datasets. It is not designed for general auto-scaling of applications.

❌ **C. AWS CloudTrail**: CloudTrail is an auditing and governance service that records API calls and account activity. It has nothing to do with scaling resources.

❌ **D. AWS Lambda**: While Lambda automatically scales the number of function executions in response to events (serverless), it is an event-driven compute service, not a general-purpose auto-scaling service for existing application infrastructure. Note: Lambda itself has built-in automatic scaling, but Amazon Auto Scaling is the dedicated service for scaling EC2 and other resources.

💡 **Exam Tip**: Amazon Auto Scaling = automatically add/remove EC2 instances based on demand. Lambda = serverless, scales automatically too, but is event-driven compute, not a scaling management service.

---

## Q3. Service Exclusive to AWS Enterprise Support

Which service or feature can AWS Enterprise Support users access that is not available to users on other AWS support plans?

- A. AWS Trusted Advisor
- B. AWS Support Cases
- C. Concierge Team
- D. Amazon Connect

**Answer: C**

✅ **C. Concierge Team**: The AWS Concierge Team is exclusively available to Enterprise Support customers. The Concierge team assists with billing and account-related inquiries and provides personalized guidance to help customers manage their AWS accounts efficiently.

❌ **A. AWS Trusted Advisor**: Trusted Advisor is available to Business, Enterprise On-Ramp, and Enterprise Support customers. Some checks are also available to Developer and Basic plan users, so it is not exclusive to Enterprise Support.

❌ **B. AWS Support Cases**: The ability to open support cases is available to all paid support plans (Developer, Business, and Enterprise), not exclusive to Enterprise.

❌ **D. Amazon Connect**: Amazon Connect is an AWS cloud-based contact center service and is a separately purchasable product, not an exclusive benefit of the Enterprise Support plan.

💡 **Exam Tip**: Enterprise Support exclusives = Concierge Team + Technical Account Manager (TAM) + access to Well-Architected reviews. Remember: Concierge = billing/account help, TAM = technical guidance.

---

## Q4. AWS Service for Managed MySQL Database Migration

A company wants to migrate a MySQL database to AWS, but the database administrator does not have the budget to handle routine tasks such as provisioning, patching, and performing backups. Which AWS service supports this use case?

- A. Amazon RDS
- B. Amazon DynamoDB
- C. Amazon DocumentDB
- D. Amazon ElastiCache

**Answer: A**

✅ **A. Amazon RDS**: Amazon Relational Database Service (RDS) is a fully managed relational database service that supports MySQL (and other engines). AWS handles routine administrative tasks such as hardware provisioning, database setup, patching, and automated backups, freeing the DBA from these responsibilities.

❌ **B. Amazon DynamoDB**: DynamoDB is a fully managed NoSQL database service. It does not support MySQL or relational database schemas, so it cannot be used to migrate a MySQL database as-is.

❌ **C. Amazon DocumentDB**: DocumentDB is a fully managed document database service compatible with MongoDB. It is not compatible with MySQL and is designed for JSON-like document workloads.

❌ **D. Amazon ElastiCache**: ElastiCache is an in-memory caching service supporting Redis and Memcached. It is not a relational database and cannot replace or host a MySQL database.

💡 **Exam Tip**: Amazon RDS = managed relational DB (MySQL, PostgreSQL, Oracle, SQL Server, MariaDB). AWS manages patching, backups, replication. You manage data, queries, and application-level config.

---

## Q5. Expanding to a Second AWS Region

A company wants to expand from one AWS Region to a second AWS Region. What does the company need to do to start supporting the new region?

- A. Contact the AWS Account Manager to sign a new contract
- B. Move an Availability Zone to the new region
- C. Start deploying resources in the second region
- D. Download the AWS Management Console for the new region

**Answer: C**

✅ **C. Start deploying resources in the second region**: AWS Regions are globally available and do not require any additional contracts or agreements to use. A company can simply begin launching resources (EC2, S3, RDS, etc.) in the desired region through the AWS Management Console, CLI, or API. There is no onboarding process required to activate a region (though some newer opt-in regions may require enabling).

❌ **A. Contact the AWS Account Manager to sign a new contract**: AWS operates on a pay-as-you-go model. No new contract is required to use additional regions — you simply start using them and pay for what you consume.

❌ **B. Move an Availability Zone to the new region**: Availability Zones are fixed physical locations within a region and cannot be moved. Each region already has its own set of AZs.

❌ **D. Download the AWS Management Console for the new region**: The AWS Management Console is a web-based interface that is the same for all regions. There is no separate download required per region.

💡 **Exam Tip**: AWS global infrastructure = Regions > Availability Zones > Data Centers. You can deploy to any region immediately — no new contract, no separate console. Some opt-in regions (e.g., ap-east-1 Hong Kong) require enabling via account settings.

---

## Q6. EC2 Pricing Option for Physical Server Compliance Requirements

A user must meet compliance and software licensing requirements that the workload must be hosted on physical servers. Which Amazon EC2 instance pricing option meets these requirements?

- A. Dedicated Hosts
- B. Dedicated Instances
- C. Spot Instances
- D. Reserved Instances

**Answer: A**

✅ **A. Dedicated Hosts**: A Dedicated Host is a physical EC2 server fully dedicated to your use. It gives you visibility and control over how instances are placed on the server, which is required for per-socket, per-core, or per-VM software licenses (e.g., Windows Server, SQL Server). It satisfies both compliance requirements (physical isolation) and software licensing requirements.

❌ **B. Dedicated Instances**: Dedicated Instances run on hardware dedicated to a single customer account, but they do not provide visibility into the underlying physical host. This means you cannot use them for per-host software licensing compliance.

❌ **C. Spot Instances**: Spot Instances use spare EC2 capacity at a reduced cost but can be interrupted at any time. They provide no guarantees about physical host placement and are not suitable for compliance-driven workloads.

❌ **D. Reserved Instances**: Reserved Instances are a billing discount applied to On-Demand instances in exchange for a commitment (1 or 3 years). They do not guarantee physical host isolation or provide any physical server visibility for licensing purposes.

💡 **Exam Tip**: Dedicated Host = physical server visibility + per-host licensing (BYOL). Dedicated Instance = hardware isolation but NO host visibility. Key exam differentiator: if the question mentions "software licensing" or "per-socket/per-core", choose Dedicated Host.

---

## Q7. AWS Services for Generating Encryption Keys (Choose TWO)

Which AWS services provide a way to generate encryption keys that can be used for data encryption? (Choose TWO.)

- A. Amazon Macie
- B. AWS Certificate Manager
- C. AWS Key Management Service (AWS KMS)
- D. AWS Secrets Manager
- E. AWS CloudHSM

**Answer: C, E**

✅ **C. AWS Key Management Service (AWS KMS)**: AWS KMS is a managed service that makes it easy to create and control encryption keys used to encrypt your data. It integrates with many AWS services and supports symmetric and asymmetric key generation.

✅ **E. AWS CloudHSM**: AWS CloudHSM provides dedicated Hardware Security Module (HSM) appliances within the AWS Cloud. It allows you to generate and manage your own cryptographic keys using FIPS 140-2 Level 3 validated hardware, meeting strict compliance requirements.

❌ **A. Amazon Macie**: Macie is a data security service that uses machine learning to discover and protect sensitive data stored in Amazon S3. It does not generate encryption keys.

❌ **B. AWS Certificate Manager**: ACM provisions, manages, and deploys SSL/TLS certificates for use with AWS services. It handles certificates (public key infrastructure), not general-purpose encryption key generation for data encryption.

❌ **D. AWS Secrets Manager**: Secrets Manager helps you store, retrieve, rotate, and manage secrets (such as database passwords and API keys). While it stores sensitive data securely, it does not generate cryptographic encryption keys.

💡 **Exam Tip**: KMS = managed encryption keys, integrated with AWS services, easy to use. CloudHSM = dedicated hardware HSM, you control the keys, FIPS 140-2 Level 3 compliance. Both generate keys; KMS is software-managed, CloudHSM is hardware-managed.

---

## Q8. AWS Tool for Detailed Cost Savings Report Before Migration

A company wants to migrate from on-premises to the AWS Cloud. Which AWS tool or service provides a detailed report on expected cost savings after the migration?

- A. AWS Total Cost of Ownership (TCO) Calculator
- B. Cost Explorer
- C. AWS Budgets
- D. AWS Migration Hub

**Answer: A**

✅ **A. AWS Total Cost of Ownership (TCO) Calculator**: The AWS TCO Calculator is specifically designed to help organizations estimate the cost savings they can realize by migrating from on-premises infrastructure to AWS. It generates a detailed report comparing current on-premises costs (hardware, facilities, staffing, etc.) against projected AWS costs.

❌ **B. Cost Explorer**: AWS Cost Explorer is used to visualize and analyze actual AWS spending and usage over time. It analyzes existing AWS costs, not pre-migration cost comparisons with on-premises environments.

❌ **C. AWS Budgets**: AWS Budgets allows you to set custom cost and usage budgets and receive alerts when thresholds are exceeded. It is a cost management and alerting tool for existing AWS usage, not a migration planning calculator.

❌ **D. AWS Migration Hub**: AWS Migration Hub provides a central location to track the progress of application migrations across multiple AWS and partner migration tools. It is a migration tracking tool, not a cost estimation tool.

💡 **Exam Tip**: TCO Calculator = "before migration" cost comparison (on-premises vs. AWS). Cost Explorer = "after migration" cost analysis of actual AWS spend. Remember: TCO = Total Cost of Ownership = pre-migration planning tool.

---

## Q9. Tools to Help Evaluate Applications for Cloud Migration (Choose TWO)

What helps evaluate applications for migration to the cloud? (Choose TWO.)

- A. AWS Trusted Advisor
- B. AWS Professional Services
- C. AWS Systems Manager
- D. AWS Partner Network (APN)
- E. AWS Secrets Manager

**Answer: B, D**

✅ **B. AWS Professional Services**: AWS Professional Services is a global team of AWS experts that helps organizations design, plan, and execute cloud migrations. They provide assessments and guidance specifically for evaluating and migrating applications to AWS.

✅ **D. AWS Partner Network (APN)**: The AWS Partner Network consists of thousands of AWS-certified consulting and technology partners who specialize in helping businesses evaluate, plan, and execute cloud migrations. APN partners offer migration assessments and advisory services.

❌ **A. AWS Trusted Advisor**: Trusted Advisor provides best practice recommendations across cost optimization, security, fault tolerance, performance, and service limits for existing AWS environments. It does not specifically evaluate on-premises applications for migration suitability.

❌ **C. AWS Systems Manager**: Systems Manager provides operational insights and management capabilities for AWS and hybrid infrastructure. It is an operations management tool, not a migration evaluation service.

❌ **E. AWS Secrets Manager**: Secrets Manager is a service for securely storing and managing application secrets (passwords, API keys, etc.). It has no role in evaluating applications for migration.

💡 **Exam Tip**: For migration planning and evaluation, think human expertise: AWS Professional Services (AWS's own experts) and APN Partners (certified third-party consultants). These are the "people and organizations" answers, not technical services.

---

## Q10. AWS Service for Dedicated Hardware Appliances for Data Security Compliance

Which AWS service helps users meet contractual and regulatory compliance requirements for data security using dedicated hardware appliances within the AWS Cloud?

- A. AWS Secrets Manager
- B. AWS CloudHSM
- C. AWS Key Management Service (AWS KMS)
- D. AWS Directory Service

**Answer: B**

✅ **B. AWS CloudHSM**: AWS CloudHSM provides dedicated, single-tenant Hardware Security Module (HSM) appliances within the AWS Cloud. These are physical hardware devices that generate and store cryptographic keys, meeting strict regulatory and compliance requirements such as FIPS 140-2 Level 3. The dedicated hardware aspect is key — you are not sharing the device with other customers.

❌ **A. AWS Secrets Manager**: Secrets Manager securely stores and manages secrets like database credentials and API keys. It does not use dedicated hardware appliances and is not designed to meet hardware-based compliance standards.

❌ **C. AWS Key Management Service (AWS KMS)**: KMS is a managed key management service, but it uses shared (multi-tenant) infrastructure managed by AWS. It does not provide dedicated physical hardware appliances to the customer, so it may not meet certain strict hardware isolation compliance requirements.

❌ **D. AWS Directory Service**: AWS Directory Service provides managed Microsoft Active Directory in the AWS Cloud. It is an identity and access management service, not a cryptographic or data security hardware service.

💡 **Exam Tip**: CloudHSM = dedicated hardware + single-tenant + customer controls keys + FIPS 140-2 Level 3. KMS = shared/managed by AWS + easier integration + FIPS 140-2 Level 2. Key exam word: "dedicated hardware appliance" always points to CloudHSM.

---

## Q11. Customer Responsibilities in AWS Shared Responsibility Model (Choose TWO)

In the AWS Shared Responsibility Model, which of the following does the customer manage? (Choose TWO.)

- A. Decommissioning of physical storage devices
- B. Configuration of Security Groups and ACLs
- C. Patch management of the operating system on Amazon RDS instances
- D. Physical access controls to data centers
- E. Patch management of the operating system on Amazon EC2 instances

**Answer: B, E**

✅ **B. Configuration of Security Groups and ACLs**: Security Groups and Network ACLs are customer-managed controls that define what traffic is allowed to and from AWS resources. Configuring these is entirely the customer's responsibility under the shared responsibility model.

✅ **E. Patch management of the operating system on Amazon EC2 instances**: With EC2, the customer is responsible for the guest operating system, including installing patches, updates, and security fixes. AWS manages the underlying hypervisor and physical infrastructure.

❌ **A. Decommissioning of physical storage devices**: AWS is responsible for the physical security and proper decommissioning of hardware including storage devices. Customers never have direct access to physical hardware.

❌ **C. Patch management of the operating system on Amazon RDS instances**: RDS is a managed service. AWS handles OS patching and database engine patching for RDS. The customer is responsible for the data and database-level configuration, not OS patches.

❌ **D. Physical access controls to data centers**: AWS is solely responsible for physical security of its data centers. Customers have no physical access to AWS facilities.

💡 **Exam Tip**: Shared Responsibility = "Security OF the cloud" (AWS) vs. "Security IN the cloud" (Customer). Managed services (RDS, Lambda, S3) shift more responsibility to AWS. EC2 = customer owns OS and above. Remember: the more "managed" the service, the less OS responsibility for the customer.

---

## Q12. AWS Service Suited for Event-Driven Workloads

Which AWS service is suitable for event-driven workloads?

- A. Amazon EC2
- B. AWS Elastic Beanstalk
- C. AWS Lambda
- D. Amazon Lumberyard

**Answer: C**

✅ **C. AWS Lambda**: AWS Lambda is a serverless compute service that runs code in response to events (such as HTTP requests via API Gateway, file uploads to S3, messages from SQS, etc.). It automatically scales based on the number of events and you pay only for the compute time consumed. This makes it ideal for event-driven architectures.

❌ **A. Amazon EC2**: EC2 provides virtual servers that run continuously (unless stopped). While you can use EC2 for event-driven patterns, it requires always-on infrastructure and is not inherently event-driven.

❌ **B. AWS Elastic Beanstalk**: Elastic Beanstalk is a PaaS service for deploying and managing web applications and services. It is designed for running web applications, not for event-driven processing.

❌ **D. Amazon Lumberyard**: Amazon Lumberyard is a free, cross-platform 3D game engine (now known as Open 3D Engine). It is not related to cloud compute or event-driven workloads.

💡 **Exam Tip**: Lambda = serverless + event-driven + pay per invocation + auto-scales to zero. Trigger sources: S3 events, API Gateway, DynamoDB Streams, SQS, SNS, EventBridge, Kinesis, and more. Lambda is the #1 answer for "event-driven" questions on the exam.

---

## Q13. Value Proposition of AWS Cloud

What is the value proposition of the AWS Cloud?

- A. AWS is responsible for security in the AWS Cloud.
- B. No long-term contracts are required.
- C. New servers can be provisioned in just a few days.
- D. AWS manages user applications in the AWS Cloud.

**Answer: B**

✅ **B. No long-term contracts are required**: One of AWS's core value propositions is the pay-as-you-go pricing model with no upfront commitments or long-term contracts required for most services. This reduces financial risk, lowers the barrier to entry, and gives customers flexibility to scale or stop at any time.

❌ **A. AWS is responsible for security in the AWS Cloud**: Under the Shared Responsibility Model, AWS is responsible for security "of" the cloud (physical infrastructure), but customers are responsible for security "in" the cloud (data, access, configuration). AWS is not solely responsible for all security.

❌ **C. New servers can be provisioned in just a few days**: This actually understates the benefit of AWS — cloud resources can be provisioned in minutes, not days. Days is closer to the traditional on-premises provisioning timeline, not the cloud value proposition.

❌ **D. AWS manages user applications in the AWS Cloud**: AWS does not manage customer applications. Customers are responsible for deploying, configuring, and managing their own applications (though managed services reduce operational overhead).

💡 **Exam Tip**: AWS value propositions = No long-term contracts + Pay-as-you-go + Trade CapEx for OpEx + Scale in minutes + Go global in minutes + No hardware to manage. The "no long-term commitment" and "agility" themes appear frequently on CLF-C02.

---

## Q14. Characteristics of Amazon S3 Cross-Region Replication

What is a characteristic of Amazon S3 Cross-Region Replication?

- A. Both source and destination S3 buckets must have versioning disabled.
- B. Source and destination S3 buckets cannot be in different AWS Regions.
- C. S3 buckets configured for cross-region replication can be owned by a single AWS account or different accounts.
- D. The source and destination AWS Regions must be disabled for the source S3 bucket owner's account.

**Answer: C**

✅ **C. S3 buckets configured for cross-region replication can be owned by a single AWS account or different accounts**: Amazon S3 Cross-Region Replication (CRR) supports replication both within the same AWS account and across different AWS accounts. This is a key feature that enables cross-account data sharing and backup scenarios.

❌ **A. Both source and destination S3 buckets must have versioning disabled**: This is the opposite of the requirement. Cross-Region Replication requires versioning to be ENABLED on both the source and destination buckets. Replication relies on versioning to track and replicate object versions.

❌ **B. Source and destination S3 buckets cannot be in different AWS Regions**: This is also the opposite. The entire purpose of Cross-Region Replication is to replicate objects to a bucket in a DIFFERENT AWS Region. The source and destination must be in different regions.

❌ **D. The source and destination AWS Regions must be disabled for the source S3 bucket owner's account**: Both the source and destination regions must be active (enabled), not disabled. Disabled regions cannot host active S3 bucket operations.

💡 **Exam Tip**: S3 Cross-Region Replication (CRR) requirements: 1) Versioning must be ENABLED on both buckets, 2) Buckets must be in DIFFERENT regions, 3) Can be same or different AWS accounts, 4) IAM role with replication permissions required.

---

## Q15. Customer Responsibility When Running Applications in AWS Cloud

When running an application in the AWS Cloud, what is the user responsible for?

- A. Managing physical hardware
- B. Updating the underlying hypervisor
- C. Providing a list of users approved for data center access
- D. Managing application software updates

**Answer: D**

✅ **D. Managing application software updates**: Under the AWS Shared Responsibility Model, customers are responsible for their own applications, including managing application-layer software updates, patches, and configurations. AWS handles the infrastructure underneath.

❌ **A. Managing physical hardware**: AWS is responsible for the physical infrastructure — servers, networking equipment, and data center facilities. Customers never interact with or manage physical hardware.

❌ **B. Updating the underlying hypervisor**: AWS manages and patches the hypervisor layer that runs EC2 instances. This is part of AWS's "security of the cloud" responsibility. Customers only manage the guest OS and above.

❌ **C. Providing a list of users approved for data center access**: AWS manages physical access controls to its data centers. Customers have no role in approving or managing physical access to AWS facilities.

💡 **Exam Tip**: Simple rule for Shared Responsibility — AWS owns everything physical and virtual infrastructure below the OS. Customers own: OS (for EC2), application code, data, identity/access management (IAM), encryption settings, and network configuration (Security Groups, NACLs).

---

## Q16. AWS Cloud Feature for Minimizing Time to Market

A business conducting business online needs to rapidly and iteratively deliver new features to minimize time to market. Which AWS Cloud feature can deliver this?

- A. Elasticity
- B. High Availability
- C. Agility
- D. Reliability

**Answer: C**

✅ **C. Agility**: Agility in the AWS Cloud refers to the ability to rapidly develop, test, and deploy new features and applications. AWS reduces the time required to provision resources from weeks to minutes, enabling teams to iterate quickly, experiment often, and deliver new features faster. This directly addresses "minimizing time to market."

❌ **A. Elasticity**: Elasticity refers to the ability to automatically scale resources up or down based on demand. While useful, it addresses capacity management, not speed of feature delivery or development cycles.

❌ **B. High Availability**: High Availability refers to designing systems to minimize downtime and ensure continuous operation. It is about reliability and uptime, not about how quickly new features can be delivered.

❌ **D. Reliability**: Reliability refers to the ability of a system to recover from failures and dynamically acquire resources to meet demand. It is about system resilience and uptime, not development speed or time to market.

💡 **Exam Tip**: AWS Cloud benefits to memorize: Agility = faster innovation/deployment. Elasticity = scale up/down with demand. High Availability = minimize downtime. Reliability = recover from failures. Scalability = handle growth. "Time to market" and "faster iteration" = Agility.

---

## Q17. Features for Monitoring AWS Account Costs (Choose TWO)

Which features or services can be used to monitor costs and charges in an AWS account? (Choose TWO.)

- A. AWS Cost and Usage Report
- B. AWS Product Pages
- C. AWS Pricing Calculator
- D. Billing Alarms and Amazon CloudWatch Alarms
- E. AWS Price List

**Answer: A, D**

✅ **A. AWS Cost and Usage Report**: The AWS Cost and Usage Report (CUR) provides the most comprehensive set of cost and usage data available, including additional metadata about AWS services, pricing, and reservations. It can be delivered to S3 and used for detailed cost monitoring and analysis.

✅ **D. Billing Alarms and Amazon CloudWatch Alarms**: You can create billing alarms in CloudWatch to monitor your estimated AWS charges. When the estimated charges exceed a defined threshold, CloudWatch sends a notification via Amazon SNS, enabling proactive cost monitoring.

❌ **B. AWS Product Pages**: AWS Product Pages provide information about AWS services, features, and use cases. They are informational/marketing pages and not monitoring tools for actual account costs.

❌ **C. AWS Pricing Calculator**: The AWS Pricing Calculator (formerly Simple Monthly Calculator) is used to estimate future costs for AWS services before you deploy them. It is a planning tool, not a monitoring tool for current or historical costs.

❌ **E. AWS Price List**: The AWS Price List is a reference for AWS service pricing (available via API or downloadable JSON/CSV). It lists prices for services but does not monitor actual account usage or costs.

💡 **Exam Tip**: Cost monitoring tools = AWS Cost and Usage Report + CloudWatch Billing Alarms + Cost Explorer (for visualization) + AWS Budgets (for alerts). Cost estimation tools = AWS Pricing Calculator + TCO Calculator. Know the difference: monitoring (actual) vs. estimating (future).

---

## Q18. What Amazon Route 53 Allows Users to Do

Amazon Route 53 allows users to:

- A. Encrypt data in transit
- B. Register DNS domain names
- C. Create and manage SSL certificates
- D. Establish a dedicated network connection to AWS

**Answer: B**

✅ **B. Register DNS domain names**: Amazon Route 53 is AWS's scalable and highly available Domain Name System (DNS) web service. It allows users to register domain names, route internet traffic to AWS resources, and check the health of resources. Domain name registration is a core function of Route 53.

❌ **A. Encrypt data in transit**: Encrypting data in transit is handled by protocols like TLS/SSL and services like AWS Certificate Manager (ACM) or AWS PrivateLink. Route 53 is a DNS service and does not provide encryption capabilities.

❌ **C. Create and manage SSL certificates**: SSL/TLS certificate creation and management is the function of AWS Certificate Manager (ACM). While Route 53 can validate domain ownership for ACM certificates, it does not itself create or manage SSL certificates.

❌ **D. Establish a dedicated network connection to AWS**: Dedicated private network connections to AWS are established using AWS Direct Connect. Route 53 operates at the DNS/application layer and has nothing to do with network circuit provisioning.

💡 **Exam Tip**: Route 53 = DNS + Domain Registration + Health Checks + Routing Policies (Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, Multi-value). The "53" refers to TCP/UDP port 53, the standard DNS port. ACM = SSL certificates, Direct Connect = private network.

---

## Q19. AWS Service for Identifying Malicious Activity in AWS Accounts

Which AWS service helps identify malicious or unauthorized activity in AWS accounts and workloads?

- A. Amazon Rekognition
- B. AWS Trusted Advisor
- C. Amazon GuardDuty
- D. Amazon CloudWatch

**Answer: C**

✅ **C. Amazon GuardDuty**: Amazon GuardDuty is a threat detection service that continuously monitors your AWS accounts and workloads for malicious activity and unauthorized behavior. It analyzes data from AWS CloudTrail, VPC Flow Logs, and DNS logs using machine learning, anomaly detection, and integrated threat intelligence to identify threats such as compromised instances and account takeovers.

❌ **A. Amazon Rekognition**: Amazon Rekognition is a machine learning service for image and video analysis (facial recognition, object detection, content moderation). It is not a security threat detection service for AWS accounts.

❌ **B. AWS Trusted Advisor**: Trusted Advisor provides best practice recommendations across cost, performance, security, fault tolerance, and service limits. While it has security checks, it does not actively monitor for or detect malicious activity or threats.

❌ **D. Amazon CloudWatch**: CloudWatch is a monitoring and observability service for AWS resources and applications. It collects metrics and logs, and can trigger alarms, but it does not analyze for malicious behavior or threat patterns — that is GuardDuty's role.

💡 **Exam Tip**: GuardDuty = intelligent threat detection (malicious activity, unauthorized access). Macie = sensitive data discovery in S3. Inspector = vulnerability scanning for EC2/containers. Security Hub = centralized security findings. "Malicious activity" or "threat detection" = GuardDuty.

---

## Q20. AWS Service for Trying Third-Party Solutions Before Long-Term Commitment

A company wants to use a third-party e-commerce solution before committing to long-term use. Which AWS service or tool supports this?

- A. AWS Marketplace
- B. AWS Partner Network (APN)
- C. AWS Managed Services
- D. AWS Service Catalog

**Answer: A**

✅ **A. AWS Marketplace**: AWS Marketplace is a digital catalog with thousands of software listings from independent software vendors (ISVs). It allows companies to find, test, and deploy third-party software solutions (including e-commerce platforms) with flexible pricing options including free trials, hourly, monthly, and annual billing — making it easy to try solutions before committing long-term.

❌ **B. AWS Partner Network (APN)**: The AWS Partner Network is a global partner program for companies that build solutions and services on AWS. It is a network of consulting and technology partners, not a marketplace for trying or purchasing third-party software directly.

❌ **C. AWS Managed Services**: AWS Managed Services provides ongoing management of AWS infrastructure and operations on behalf of customers. It is an operational management service, not a platform for discovering or trying third-party software solutions.

❌ **D. AWS Service Catalog**: AWS Service Catalog allows organizations to create and manage catalogs of approved IT services (internally). It is used for governance and standardization of internal product portfolios, not for discovering and trying third-party commercial software.

💡 **Exam Tip**: AWS Marketplace = third-party software catalog + free trials + flexible billing + one-click deployment. Think of it like an "app store" for AWS. Key use cases: try before you buy, software licensing (BYOL), pre-configured AMIs, SaaS subscriptions.

---

*Good luck on your AWS CLF-C02 exam! Review these concepts regularly and practice with as many questions as possible. The key to passing is understanding the "why" behind each answer, not just memorizing choices.*

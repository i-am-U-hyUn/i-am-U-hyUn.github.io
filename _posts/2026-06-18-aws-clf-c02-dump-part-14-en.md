---
title: "AWS CLF-C02 Dump Explained Part 14"
date: 2026-06-18 01:14:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

Practice your AWS Cloud Practitioner (CLF-C02) exam readiness with these 20 fully explained questions covering core AWS services, security concepts, and cloud fundamentals.

---

## Q1. Querying S3 Data with Standard SQL

Which AWS service can be used to query datasets stored directly in Amazon S3 using standard SQL?

- A. AWS Glue
- B. AWS Data Pipeline
- C. Amazon CloudSearch
- D. Amazon Athena

**Answer: D**

✅ **D. Amazon Athena**: Amazon Athena is a serverless, interactive query service that allows you to analyze data directly in Amazon S3 using standard SQL. There is no infrastructure to manage — you simply point Athena at your data in S3, define the schema, and start querying.

❌ **A. AWS Glue**: AWS Glue is an ETL (Extract, Transform, Load) service used to prepare and transform data, not to run ad-hoc SQL queries directly on S3.

❌ **B. AWS Data Pipeline**: AWS Data Pipeline is a workflow orchestration service for moving and transforming data between AWS services; it does not provide SQL query capability against S3.

❌ **C. Amazon CloudSearch**: Amazon CloudSearch is a managed search service for building search functionality into applications; it does not support SQL queries on S3 data.

💡 **Exam Tip**: Amazon Athena = Serverless SQL queries directly on S3. No servers to manage. Pay per query (per TB scanned). Often paired with AWS Glue Data Catalog.

---

## Q2. AWS CloudFormation Purpose

AWS CloudFormation is designed to support which of the following?

- A. Resource modeling and provisioning
- B. Updating application code
- C. Setting up a data lake
- D. Creating billing reports

**Answer: A**

✅ **A. Resource modeling and provisioning**: AWS CloudFormation is an Infrastructure as Code (IaC) service that allows you to model your entire AWS infrastructure in a template file and then provision those resources in an automated, repeatable way.

❌ **B. Updating application code**: CloudFormation manages infrastructure resources, not application-level code deployments. Services like AWS CodeDeploy handle application code updates.

❌ **C. Setting up a data lake**: Setting up a data lake is typically done using services like AWS Lake Formation or Amazon S3 combined with Glue — not CloudFormation directly (though CloudFormation can provision those services).

❌ **D. Creating billing reports**: Billing reports are generated through AWS Cost Explorer or AWS Budgets, not CloudFormation.

💡 **Exam Tip**: CloudFormation = Infrastructure as Code (IaC). Templates (JSON/YAML) define AWS resources. Enables repeatable, automated provisioning. Think "blueprint for your AWS environment."

---

## Q3. Identifying Unrestricted Security Group Access

A Cloud Practitioner needs to check whether any Security Groups in an AWS account allow unrestricted access to specific ports. What is the easiest way to do this?

- A. Review the inbound rules for each Security Group in the Amazon EC2 management console and check for port 0.0.0.0/0.
- B. Run AWS Trusted Advisor and review the findings.
- C. Open the AWS IAM console and check whether the inbound rule filter is set to open.
- D. Create a custom rule in AWS Config that invokes an AWS Lambda function to review rules for inbound access.

**Answer: B**

✅ **B. Run AWS Trusted Advisor and review the findings**: AWS Trusted Advisor automatically checks your AWS environment against best practices, including a specific security check that flags Security Groups with unrestricted access (0.0.0.0/0) to sensitive ports. This is the simplest and most automated method.

❌ **A. Review inbound rules in the EC2 console**: While technically possible, manually reviewing every Security Group in the console is time-consuming and error-prone, especially in large accounts — it is not the "simplest" approach.

❌ **C. Open the AWS IAM console**: IAM manages identity and access policies for users and roles, not network-level Security Group rules. This is the wrong console for this task.

❌ **D. Create a custom AWS Config rule with Lambda**: This approach would work but requires significant setup effort. It is not the simplest solution when Trusted Advisor already provides this check out of the box.

💡 **Exam Tip**: AWS Trusted Advisor = Automated best-practice checks across 5 categories: Cost Optimization, Performance, Security, Fault Tolerance, and Service Limits. For security group checks, Trusted Advisor is the easiest automated approach.

---

## Q4. Benefits of Developing on AWS vs. On-Premises (Choose TWO)

What are the benefits of developing and running a new application on AWS Cloud compared to on-premises? (Choose TWO.)

- A. AWS automatically distributes data globally for higher durability.
- B. AWS is responsible for the operation of the application.
- C. AWS makes it easy to design for high availability.
- D. AWS makes it easy to accommodate changes in application demand.
- E. AWS manages application security patches.

**Answer: C, D**

✅ **C. AWS makes it easy to design for high availability**: AWS provides multi-AZ deployments, load balancers, Auto Scaling, and global infrastructure that make it straightforward to architect highly available applications — capabilities that would be extremely costly to replicate on-premises.

✅ **D. AWS makes it easy to accommodate changes in application demand**: AWS's elastic scaling capabilities (Auto Scaling, on-demand resources) allow applications to scale up or down based on actual demand, which is difficult and expensive to achieve with fixed on-premises hardware.

❌ **A. AWS automatically distributes data globally for higher durability**: AWS does not automatically distribute all data globally — you must explicitly configure replication across regions or use services like S3 with cross-region replication.

❌ **B. AWS is responsible for the operation of the application**: Under the shared responsibility model, AWS manages the underlying infrastructure, but the customer remains responsible for the operation and management of their applications.

❌ **E. AWS manages application security patches**: AWS patches the underlying infrastructure and managed service platforms, but customers are responsible for patching their own application code and operating systems on EC2 instances.

💡 **Exam Tip**: Key cloud benefits = Elasticity (scale up/down on demand), High Availability (multi-AZ), Agility (fast provisioning). Remember the Shared Responsibility Model — AWS manages infrastructure, YOU manage your application.

---

## Q5. Automated Security Assessment for EC2

A user needs an automated security assessment report that identifies unintended network access to Amazon EC2 instances and vulnerabilities in those instances. Which AWS service provides this assessment report?

- A. EC2 Security Groups
- B. AWS Config
- C. Amazon Macie
- D. Amazon Inspector

**Answer: D**

✅ **D. Amazon Inspector**: Amazon Inspector is an automated security assessment service that scans EC2 instances for software vulnerabilities and unintended network exposure. It produces detailed findings reports with severity ratings and remediation guidance.

❌ **A. EC2 Security Groups**: Security Groups are firewall rules that control network traffic — they do not perform security assessments or generate vulnerability reports.

❌ **B. AWS Config**: AWS Config tracks configuration changes and evaluates resources against compliance rules, but it does not perform vulnerability scanning or network exposure assessments on EC2 instances.

❌ **C. Amazon Macie**: Amazon Macie uses machine learning to discover and protect sensitive data (like PII) in Amazon S3. It is not designed for EC2 vulnerability assessment or network access analysis.

💡 **Exam Tip**: Amazon Inspector = Automated vulnerability scanning for EC2 and container images. Checks for CVEs (Common Vulnerabilities and Exposures) and network reachability. Do not confuse with Macie (S3 sensitive data) or GuardDuty (threat detection).

---

## Q6. Isolating Production and Non-Production Costs

How can you isolate costs for production and non-production workloads in AWS?

- A. Create IAM (Identity and Access Management) roles for operational and non-operational workloads.
- B. Use different accounts for production and non-production costs.
- C. Use Amazon EC2 for non-production workloads and other services for production workloads.
- D. Use Amazon CloudWatch to monitor service usage.

**Answer: B**

✅ **B. Use different accounts for production and non-production costs**: Separating workloads into distinct AWS accounts is the AWS recommended best practice for cost isolation. Each account has its own billing, making it straightforward to track, allocate, and report costs separately for production versus non-production environments.

❌ **A. Create IAM roles for operational and non-operational workloads**: IAM roles control access permissions — they do not separate billing or isolate costs between workloads.

❌ **C. Use Amazon EC2 for non-production and other services for production**: Choosing different services based on environment does not isolate costs and introduces unnecessary architectural complexity.

❌ **D. Use Amazon CloudWatch to monitor service usage**: CloudWatch monitors performance metrics and logs; while it can provide visibility into usage, it does not isolate or separate costs between workloads.

💡 **Exam Tip**: Cost isolation best practice = Separate AWS Accounts per environment (prod/non-prod). Use AWS Organizations to manage multiple accounts centrally with consolidated billing and Service Control Policies (SCPs).

---

## Q7. Finding AWS-Recognized Third-Party Security Solutions

Where can users find a catalog of AWS-recognized third-party security solution vendors?

- A. AWS Service Catalog
- B. AWS Marketplace
- C. AWS Quick Start
- D. AWS CodeDeploy

**Answer: B**

✅ **B. AWS Marketplace**: AWS Marketplace is a digital catalog with thousands of software listings from independent software vendors (ISVs), including security solutions that are vetted and recognized by AWS. Customers can find, buy, and deploy third-party software directly from the Marketplace.

❌ **A. AWS Service Catalog**: AWS Service Catalog allows organizations to manage and deploy their own approved IT service portfolios — it is not a public catalog of third-party vendor solutions.

❌ **C. AWS Quick Start**: AWS Quick Starts are automated reference deployments for popular workloads on AWS, primarily built by AWS and partners. They are deployment guides, not a vendor catalog.

❌ **D. AWS CodeDeploy**: AWS CodeDeploy is a deployment service that automates application deployments to EC2, Lambda, or on-premises servers. It has nothing to do with vendor catalogs.

💡 **Exam Tip**: AWS Marketplace = Third-party software catalog. You can find AMIs, SaaS subscriptions, security tools, and more. Charges appear on your AWS bill. Contrast with AWS Service Catalog (internal, curated IT portfolios).

---

## Q8. Long-Term Low-Cost Data Storage for 7 Years

A Cloud Practitioner must store data for 7 years to meet regulatory requirements at the lowest possible cost. Which AWS service best meets this requirement?

- A. Amazon S3
- B. AWS Snowball
- C. Amazon Redshift
- D. Amazon S3 Glacier

**Answer: D**

✅ **D. Amazon S3 Glacier**: Amazon S3 Glacier (specifically S3 Glacier Deep Archive) is designed for long-term archival storage with the lowest storage cost in the AWS portfolio. It is ideal for compliance and regulatory data retention scenarios where data is rarely accessed.

❌ **A. Amazon S3**: While Amazon S3 provides durable object storage, standard S3 storage tiers are significantly more expensive than S3 Glacier for long-term archival use cases.

❌ **B. AWS Snowball**: AWS Snowball is a physical data transfer device used to move large amounts of data into or out of AWS. It is not a storage service for long-term retention.

❌ **C. Amazon Redshift**: Amazon Redshift is a fully managed data warehouse service optimized for analytical queries on large datasets — it is not designed for low-cost long-term archival storage.

💡 **Exam Tip**: S3 Glacier Deep Archive = Lowest cost AWS storage. Retrieval time: 12–48 hours. Perfect for 7-year regulatory retention. S3 storage class tiers from most to least expensive: S3 Standard > S3-IA > S3 One Zone-IA > S3 Glacier Instant > S3 Glacier Flexible > S3 Glacier Deep Archive.

---

## Q9. Immediate Benefits of Using AWS Cloud (Choose TWO)

What are the immediate benefits of using AWS Cloud? (Choose TWO.)

- A. Increased IT staff
- B. Capital expenses are replaced by variable expenses
- C. User control over infrastructure
- D. Increased agility
- E. AWS takes responsibility for cloud security

**Answer: B, D**

✅ **B. Capital expenses are replaced by variable expenses**: AWS eliminates the need for large upfront capital expenditures (CapEx) on hardware. Instead, you pay only for what you use (OpEx — operational expenditure), which improves cash flow and reduces financial risk.

✅ **D. Increased agility**: AWS allows businesses to rapidly experiment, deploy, and iterate on new ideas. Resources can be provisioned in minutes rather than weeks, dramatically accelerating innovation cycles.

❌ **A. Increased IT staff**: Migrating to AWS typically reduces the need for infrastructure management staff (fewer servers to rack and maintain), not increases it.

❌ **C. User control over infrastructure**: In AWS, you give up direct physical control of the underlying infrastructure — this is managed by AWS. The tradeoff is reduced operational burden, not increased control.

❌ **E. AWS takes responsibility for cloud security**: Under the AWS Shared Responsibility Model, AWS secures the infrastructure (security OF the cloud), but customers are responsible for securing their data and configurations (security IN the cloud).

💡 **Exam Tip**: Six advantages of cloud computing include: Trade CapEx for OpEx, Benefit from massive economies of scale, Stop guessing capacity, Increase speed and agility, Stop spending money running data centers, Go global in minutes. CapEx → OpEx and Agility are the most frequently tested.

---

## Q10. Automatically Recognizing and Classifying Sensitive Data

Which AWS security service automatically recognizes and classifies critical data or intellectual property in AWS?

- A. Amazon GuardDuty
- B. Amazon Macie
- C. Amazon Inspector
- D. AWS Shield

**Answer: B**

✅ **B. Amazon Macie**: Amazon Macie is a fully managed data security and privacy service that uses machine learning to automatically discover, classify, and protect sensitive data (such as PII, financial data, and intellectual property) stored in Amazon S3.

❌ **A. Amazon GuardDuty**: Amazon GuardDuty is a threat detection service that monitors for malicious activity and unauthorized behavior across your AWS accounts. It does not classify data.

❌ **C. Amazon Inspector**: Amazon Inspector performs automated vulnerability assessments on EC2 instances and container images. It does not discover or classify sensitive data.

❌ **D. AWS Shield**: AWS Shield is a DDoS protection service. It has no capability to recognize or classify data content.

💡 **Exam Tip**: Amazon Macie = Machine learning-based sensitive data discovery in S3. Detects PII (Personally Identifiable Information) like credit card numbers, SSNs, and passports. Remember: Macie = S3 data classification; GuardDuty = threat detection; Inspector = vulnerability scanning.

---

## Q11. Purpose of AWS Storage Gateway

What is the purpose of AWS Storage Gateway?

- A. To guarantee 99.9999999% durability for on-premises data storage.
- B. To transfer petabytes of data to or from AWS.
- C. To connect to multiple Amazon EC2 instances.
- D. To connect on-premises data storage to the AWS Cloud.

**Answer: D**

✅ **D. To connect on-premises data storage to the AWS Cloud**: AWS Storage Gateway is a hybrid cloud storage service that provides seamless integration between on-premises environments and AWS cloud storage. It enables on-premises applications to use AWS storage services (S3, Glacier, EBS) through standard storage protocols.

❌ **A. To guarantee 99.9999999% durability for on-premises data storage**: AWS Storage Gateway does not guarantee durability for data stored on-premises; durability applies to data stored in the underlying AWS services (like S3) that the gateway connects to.

❌ **B. To transfer petabytes of data to or from AWS**: Petabyte-scale data transfer is the use case for AWS Snowball or AWS DataSync, not Storage Gateway. Storage Gateway is designed for ongoing hybrid connectivity, not bulk data migration.

❌ **C. To connect to multiple Amazon EC2 instances**: AWS Storage Gateway is not an EC2 connectivity solution. Elastic Block Store (EBS) or Elastic File System (EFS) are used for connecting storage to EC2 instances.

💡 **Exam Tip**: AWS Storage Gateway = Hybrid storage bridge between on-premises and AWS. Three main types: File Gateway (S3 via NFS/SMB), Volume Gateway (iSCSI block storage), and Tape Gateway (virtual tape library). Key use case: extend on-premises storage to the cloud.

---

## Q12. Deploying Applications in Geographically Separate Locations

How should you deploy an application in geographically separate locations?

- A. Use multiple Internet Gateways to install the application.
- B. Deploy the application in Amazon VPC.
- C. Deploy the application across multiple AWS Regions.
- D. Configure the application using multiple NAT Gateways.

**Answer: C**

✅ **C. Deploy the application across multiple AWS Regions**: AWS Regions are geographically separate locations around the world. Deploying applications across multiple Regions ensures geographic separation, reduces latency for global users, and provides disaster recovery capabilities.

❌ **A. Use multiple Internet Gateways**: Internet Gateways provide internet access to resources within a single VPC — they do not provide geographic separation. You can only attach one Internet Gateway per VPC.

❌ **B. Deploy the application in Amazon VPC**: An Amazon VPC exists within a single Region. While VPCs provide network isolation, they do not achieve geographic separation across the globe.

❌ **D. Configure the application using multiple NAT Gateways**: NAT Gateways allow resources in private subnets to access the internet within a single VPC/Region. They provide no geographic distribution.

💡 **Exam Tip**: AWS global infrastructure hierarchy: Regions (geographic areas) > Availability Zones (isolated data centers within a region) > Edge Locations (CloudFront CDN endpoints). For geographic separation = multiple Regions. For fault tolerance within a region = multiple AZs.

---

## Q13. System Designed to Withstand Component Failures

A system in AWS Cloud is designed to withstand failures of one or more components. What design principle does this represent?

- A. Elasticity
- B. High Availability
- C. Scalability
- D. Agility

**Answer: B**

✅ **B. High Availability**: High Availability (HA) refers to designing systems that continue to operate even when individual components fail. AWS achieves this through redundancy across multiple Availability Zones, automatic failover, and load balancing — ensuring minimal or no downtime.

❌ **A. Elasticity**: Elasticity refers to the ability to automatically scale resources up or down based on demand. It addresses capacity management, not fault tolerance.

❌ **C. Scalability**: Scalability refers to the system's ability to handle increasing workload by adding resources. It focuses on growth capacity, not resilience to failure.

❌ **D. Agility**: Agility refers to the speed at which new resources can be deployed and changes can be made. It is about development velocity, not fault tolerance.

💡 **Exam Tip**: High Availability (HA) = Design to survive component failures with minimal downtime. Key AWS HA tools: Multi-AZ deployments, Elastic Load Balancing, Auto Scaling, Route 53 health checks. Fault Tolerance is a stricter form — zero downtime even during failures.

---

## Q14. Consistent and Dedicated Connection to AWS

A Cloud Practitioner needs a consistent, dedicated connection between AWS resources and an on-premises system. Which AWS service meets this requirement?

- A. AWS Direct Connect
- B. AWS VPN
- C. Amazon Connect
- D. AWS Data Pipeline

**Answer: A**

✅ **A. AWS Direct Connect**: AWS Direct Connect establishes a dedicated, private network connection between your on-premises data center and AWS. Unlike internet-based connections, Direct Connect provides consistent network performance, reduced latency, and higher bandwidth — ideal for applications requiring reliable, predictable connectivity.

❌ **B. AWS VPN**: AWS VPN establishes encrypted connections over the public internet. While it provides secure connectivity, it does not offer the consistency and dedicated bandwidth of Direct Connect, as internet performance can vary.

❌ **C. Amazon Connect**: Amazon Connect is a cloud-based contact center service for customer service operations. It has nothing to do with network connectivity between on-premises and AWS.

❌ **D. AWS Data Pipeline**: AWS Data Pipeline is a workflow service for automating data movement and transformation between AWS services. It is not a network connectivity solution.

💡 **Exam Tip**: AWS Direct Connect = Dedicated, private, consistent network link (physical fiber connection). VPN = Encrypted but over public internet (variable performance). Remember: Direct Connect = dedicated line; VPN = encrypted tunnel over internet. Direct Connect is more expensive but more reliable.

---

## Q15. Shared Responsibility for Security and Compliance

Under the AWS Shared Responsibility Model, who is responsible for security and compliance?

- A. The customer is responsible.
- B. AWS is responsible.
- C. AWS and the customer share responsibility.
- D. AWS shares responsibility with relevant regulatory authorities.

**Answer: C**

✅ **C. AWS and the customer share responsibility**: The AWS Shared Responsibility Model divides security responsibilities between AWS and the customer. AWS is responsible for "Security OF the Cloud" (physical infrastructure, hardware, software, networking), while customers are responsible for "Security IN the Cloud" (data, identity management, application configuration, network traffic protection within their environment).

❌ **A. The customer is responsible**: The customer is only partially responsible. AWS takes on significant security responsibilities for the underlying infrastructure.

❌ **B. AWS is responsible**: AWS is only partially responsible. Customers must manage the security of their own data, access controls, and application-layer configurations.

❌ **D. AWS shares responsibility with regulatory authorities**: AWS does not share security responsibilities with government or regulatory bodies. AWS obtains compliance certifications (PCI DSS, HIPAA, SOC), but responsibility is shared with customers, not regulators.

💡 **Exam Tip**: Shared Responsibility Model — AWS = Security OF the cloud (hardware, facilities, global infrastructure, managed services). Customer = Security IN the cloud (data encryption, IAM, OS patches on EC2, firewall config). Managed services (RDS, Lambda) shift more responsibility to AWS.

---

## Q16. What Users Must Create to Use AWS CLI

To use the AWS CLI, a user must create which of the following?

- A. A password policy
- B. Access keys / Secret keys
- C. A managed policy
- D. An API key

**Answer: B**

✅ **B. Access keys / Secret keys**: AWS CLI authentication requires an Access Key ID and a Secret Access Key. These are generated in AWS IAM and configured using the `aws configure` command. The CLI uses these credentials to authenticate API requests programmatically.

❌ **A. A password policy**: Password policies apply to IAM user console login (username + password for the AWS Management Console). They are not used by the AWS CLI.

❌ **C. A managed policy**: Managed policies define permissions (what actions are allowed), but they alone do not authenticate a user to the CLI. You still need access keys to authenticate.

❌ **D. An API key**: "API key" is not a specific AWS IAM object type. AWS uses Access Key IDs and Secret Access Keys for programmatic access. The combination is sometimes loosely called API credentials, but the correct AWS terminology is access keys.

💡 **Exam Tip**: AWS CLI authentication = Access Key ID + Secret Access Key (configured with `aws configure`). Never share or embed access keys in code. Best practice: Use IAM roles for EC2 instances and other AWS services instead of long-term access keys.

---

## Q17. AWS Service That Provides Encryption for Amazon EBS

Which AWS service is used to provide encryption for Amazon EBS?

- A. AWS Certificate Manager
- B. AWS Systems Manager
- C. AWS KMS
- D. AWS Config

**Answer: C**

✅ **C. AWS KMS**: AWS Key Management Service (KMS) manages the cryptographic keys used to encrypt Amazon EBS volumes. When you enable EBS encryption, AWS KMS generates and manages the data encryption keys (DEKs) using your Customer Master Keys (CMKs), ensuring data at rest is protected.

❌ **A. AWS Certificate Manager**: AWS Certificate Manager (ACM) provisions and manages SSL/TLS certificates for HTTPS communication. It is used for data in transit encryption, not data at rest encryption for EBS.

❌ **B. AWS Systems Manager**: AWS Systems Manager helps you manage and automate operational tasks on EC2 instances (patching, configuration, parameter store). It does not provide encryption for EBS volumes.

❌ **D. AWS Config**: AWS Config records and evaluates AWS resource configurations for compliance. While it can check whether EBS volumes are encrypted, it does not perform the encryption itself.

💡 **Exam Tip**: AWS KMS = Centralized key management for encryption across AWS services. Used with EBS, S3, RDS, Lambda, and more. CMK (Customer Master Key) = the key that encrypts your data keys. KMS is the answer for "encryption at rest" questions involving EBS, S3, or RDS.

---

## Q18. How AWS Lambda Charges Beyond the Free Tier (Choose TWO)

Beyond the free tier, how does AWS charge for AWS Lambda usage? (Choose TWO.)

- A. Based on the time it takes for a Lambda function to execute
- B. Based on the number of versions of a specific Lambda function
- C. Based on the number of requests for a given Lambda function
- D. Based on the programming language used by the Lambda function
- E. Based on the total number of Lambda functions in an AWS account

**Answer: A, C**

✅ **A. Based on the time it takes for a Lambda function to execute**: AWS Lambda charges based on compute duration — the time your function runs, measured in milliseconds. You are billed for the time from when your code begins execution until it finishes, rounded to the nearest 1 ms.

✅ **C. Based on the number of requests for a given Lambda function**: AWS Lambda charges per number of invocations (requests). Each time your function is triggered, it counts as one request. The free tier includes 1 million requests and 400,000 GB-seconds per month.

❌ **B. Based on the number of versions of a specific Lambda function**: Lambda does not charge based on how many versions of a function you create. Versioning and aliases are free features.

❌ **D. Based on the programming language used**: Lambda supports multiple runtimes (Python, Node.js, Java, etc.) and charges are identical regardless of which language your function uses.

❌ **E. Based on the total number of Lambda functions in your account**: There is no charge for the number of Lambda functions you create or store in your account. You only pay for actual invocations and compute duration.

💡 **Exam Tip**: AWS Lambda pricing = Number of Requests + Duration (GB-seconds). Formula: Duration = (execution time in ms) x (memory allocated in GB). Free tier: 1M requests and 400,000 GB-seconds/month. Lambda is event-driven and serverless — no idle charges.

---

## Q19. Relationship Between AWS Regions, Availability Zones, and Edge Locations (Choose TWO)

Which of the following statements describe the relationship between AWS Regions, Availability Zones, and Edge Locations? (Choose TWO.)

- A. There are more AWS Regions than Availability Zones.
- B. There are more Edge Locations than AWS Regions.
- C. Edge Locations are Availability Zones.
- D. There are more AWS Regions than Edge Locations.
- E. There are more Availability Zones than AWS Regions.

**Answer: B, E**

✅ **B. There are more Edge Locations than AWS Regions**: AWS has hundreds of Edge Locations (CloudFront CDN points of presence) spread across the globe — far more than the number of Regions (around 30+). Edge Locations exist in many more cities and countries than full Regions.

✅ **E. There are more Availability Zones than AWS Regions**: Each AWS Region contains a minimum of 2 (typically 3 or more) Availability Zones. Therefore, there are more total Availability Zones than Regions globally.

❌ **A. There are more AWS Regions than Availability Zones**: This is false. Each Region has multiple AZs, so the total number of AZs exceeds the number of Regions.

❌ **C. Edge Locations are Availability Zones**: Edge Locations and Availability Zones are completely different infrastructure components. Edge Locations are CloudFront CDN endpoints; AZs are isolated data centers within a Region.

❌ **D. There are more AWS Regions than Edge Locations**: This is false. There are hundreds of Edge Locations worldwide, which far exceeds the number of Regions.

💡 **Exam Tip**: AWS infrastructure count order (smallest to largest): Regions < Availability Zones < Edge Locations. Remember: Edge Locations (400+) > AZs (100+) > Regions (30+). Edge Locations power CloudFront (CDN) and Route 53. AZs are for high availability within a region.

---

## Q20. What Does AWS Shield Standard Provide?

What does AWS Shield Standard provide?

- A. WAF rules
- B. DDoS protection
- C. Identity and Access Management (IAM) permissions and resource access
- D. Data encryption

**Answer: B**

✅ **B. DDoS protection**: AWS Shield Standard provides automatic, always-on DDoS (Distributed Denial of Service) protection for all AWS customers at no additional cost. It defends against common network and transport layer (Layer 3 and Layer 4) DDoS attacks that target your AWS resources.

❌ **A. WAF rules**: WAF (Web Application Firewall) rules are managed by AWS WAF, a separate service that filters malicious web traffic at the application layer (Layer 7). AWS Shield Standard does not include WAF rules (Shield Advanced integrates with WAF).

❌ **C. IAM permissions and resource access**: Identity and Access Management is handled by AWS IAM, a completely separate service. Shield is focused on network-level threat protection, not identity management.

❌ **D. Data encryption**: Data encryption is provided by AWS KMS, ACM, and encryption features built into individual services (S3, EBS, RDS). AWS Shield does not handle encryption.

💡 **Exam Tip**: AWS Shield = DDoS protection. Two tiers: Shield Standard (free, automatic, protects all AWS customers, covers L3/L4 attacks) vs. Shield Advanced (paid, includes L7 protection, cost protection, 24/7 DDoS response team). Do not confuse Shield with WAF (application-layer filtering) or GuardDuty (threat intelligence).

---

---
title: "AWS CLF-C02 Dump Explained Part 7"
date: 2026-06-18 01:07:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

Practice makes perfect! Here are 20 AWS CLF-C02 exam questions (Part 7) fully translated into English with detailed answer explanations to help you ace your certification exam.

---

## Q1. Scalability Without Performance Degradation

Which cloud architecture principle supports the ability to handle increases in users, traffic, or data size without performance degradation?

- A. Think parallel
- B. Implement elasticity
- C. Decouple components
- D. Design for failure

**Answer: B**

✅ **B. Implement elasticity**: Elasticity is the ability of a system to automatically scale resources up or down to accommodate changes in demand — such as increases in users, traffic, or data — without experiencing performance degradation. This is one of the core cloud computing principles.

❌ **A. Think parallel**: Thinking in parallel refers to breaking tasks into smaller concurrent workloads to improve processing speed, not specifically handling growth in scale.

❌ **C. Decouple components**: Decoupling reduces dependencies between components to improve fault tolerance and maintainability, but it doesn't directly address scalability under growing demand.

❌ **D. Design for failure**: This principle focuses on building resilient systems that continue operating when components fail, not on scaling to accommodate growth.

💡 **Exam Tip**: Elasticity = Auto Scaling + handling demand spikes without degradation. Think of it as "rubber band" scalability — stretch when needed, contract when not.

---

## Q2. Financial Difference When Moving to AWS

A company moves from an on-premises data center to the AWS Cloud. What is one financial difference after the move?

- A. Shift from variable operating expenses (OpEx) to upfront capital expenses (CapEx)
- B. Shift from upfront capital expenses (CapEx) to variable capital expenses (CapEx)
- C. Shift from upfront capital expenses (CapEx) to variable operating expenses (OpEx)
- D. Elimination of upfront capital expenses (CapEx) and elimination of variable operating expenses (OpEx)

**Answer: C**

✅ **C. Shift from upfront capital expenses (CapEx) to variable operating expenses (OpEx)**: On-premises infrastructure requires large upfront CapEx investments (buying servers, data center equipment, etc.). With AWS, you pay only for what you use on a variable, consumption-based model — this is OpEx. This trade-off is one of the core financial benefits of cloud adoption.

❌ **A. Shift from variable OpEx to upfront CapEx**: This is the reverse of what happens. AWS moves you away from CapEx, not toward it.

❌ **B. Shift from upfront CapEx to variable CapEx**: AWS charges are classified as operating expenses, not capital expenses, because you own no physical assets.

❌ **D. Elimination of both CapEx and OpEx**: While CapEx is eliminated, OpEx (pay-as-you-go costs for AWS services) still exists. You don't eliminate all expenses.

💡 **Exam Tip**: On-premises = CapEx (buy hardware upfront). AWS Cloud = OpEx (pay-as-you-go). This is a fundamental cloud economics concept that appears frequently on the CLF-C02 exam.

---

## Q3. Predicting Future Costs for a New Web Application

How should a customer estimate future costs when running a new web application on AWS?

- A. Amazon Aurora Backtrack
- B. Amazon CloudWatch Billing Alarms
- C. AWS Pricing Calculator
- D. AWS Cost and Usage Report

**Answer: C**

✅ **C. AWS Pricing Calculator**: The AWS Pricing Calculator allows customers to model their architecture and estimate costs before deploying. It is specifically designed for forecasting and planning future AWS expenses for new workloads.

❌ **A. Amazon Aurora Backtrack**: Backtrack is an Aurora database feature that lets you rewind a database to a previous point in time. It has nothing to do with cost estimation.

❌ **B. Amazon CloudWatch Billing Alarms**: CloudWatch billing alarms notify you when existing costs exceed a threshold — they monitor current spending, not predict future costs for new applications.

❌ **D. AWS Cost and Usage Report**: This report provides detailed historical data on actual past usage and costs. It is useful for analysis, not for predicting future costs of a new application.

💡 **Exam Tip**: AWS Pricing Calculator = Pre-deployment cost estimation tool. Use it BEFORE you launch to plan your budget. CloudWatch Billing Alarms = Monitor EXISTING costs.

---

## Q4. Minimum AWS Support Plan with Phone Support

What is the MINIMUM AWS Support plan that provides technical support via phone?

- A. Enterprise
- B. Business
- C. Developer
- D. Basic

**Answer: B**

✅ **B. Business**: The AWS Business Support plan is the minimum tier that includes 24/7 phone, chat, and email access to Cloud Support Engineers. It also provides a response time of less than 1 hour for production system down cases.

❌ **A. Enterprise**: Enterprise Support also includes phone support, but it is not the minimum plan — it is higher than Business and includes a Technical Account Manager (TAM).

❌ **C. Developer**: The Developer Support plan only provides email support during business hours. It does not include phone access to AWS support engineers.

❌ **D. Basic**: The Basic Support plan is free but only provides access to documentation, whitepapers, and AWS forums. No direct technical support channels are included.

💡 **Exam Tip**: Support plan hierarchy — Basic (free) → Developer (email only) → Business (phone/chat, 24/7) → Enterprise On-Ramp → Enterprise. Phone support starts at Business tier.

---

## Q5. AWS Responsibility Under the Shared Responsibility Model

Which of the following is AWS's responsibility?

- A. Client-side data encryption
- B. Configuring AWS IAM roles
- C. Amazon EC2 hypervisor security
- D. Setting user password policies

**Answer: C**

✅ **C. Amazon EC2 hypervisor security**: AWS is responsible for securing the underlying infrastructure, which includes the physical servers, networking, and the hypervisor layer that runs EC2 instances. This falls under "security OF the cloud" — AWS's domain.

❌ **A. Client-side data encryption**: Encrypting data on the client side before sending it to AWS is the customer's responsibility. AWS provides tools to help (like AWS KMS), but the act itself is a customer responsibility.

❌ **B. Configuring AWS IAM roles**: IAM role configuration — defining who can access what resources — is entirely the customer's responsibility. AWS provides the IAM service, but configuration is up to the customer.

❌ **D. Setting user password policies**: Password policies for IAM users are configured by the customer within their AWS account. AWS does not manage individual account password policies.

💡 **Exam Tip**: AWS = "Security OF the cloud" (hardware, hypervisors, physical facilities, global network). Customer = "Security IN the cloud" (data, IAM, OS patches, application security, encryption configuration).

---

## Q6. Benefit of On-Demand EC2 Pricing

Which of the following is a benefit of On-Demand Amazon EC2 pricing?

- A. The ability to bid for a lower hourly cost
- B. Pay a flat daily rate regardless of how long you use the instance
- C. Pay only for the time used
- D. Pay upfront for instances and receive a lower hourly rate

**Answer: C**

✅ **C. Pay only for the time used**: On-Demand pricing means you pay for compute capacity by the second (Linux) or by the hour (Windows) with no long-term commitments or upfront payments. This pay-as-you-go model is the defining characteristic of On-Demand instances.

❌ **A. The ability to bid for a lower hourly cost**: Bidding for lower costs describes Spot Instances, not On-Demand. Spot Instances allow you to use spare AWS capacity at a discount by placing a maximum price bid.

❌ **B. Pay a flat daily rate regardless of usage time**: On-Demand pricing is granular (per second/hour), not a flat daily rate. You are charged only for actual usage duration.

❌ **D. Pay upfront for instances and receive a lower hourly rate**: This describes Reserved Instances, where you commit to 1 or 3 years upfront in exchange for a significant discount on the hourly rate.

💡 **Exam Tip**: EC2 Pricing Types — On-Demand (pay per second/hour, no commitment), Reserved (upfront commitment, big discount), Spot (bid on spare capacity, cheapest but interruptible), Dedicated (physical server dedicated to you).

---

## Q7. Rapidly Deploying Popular IT Solutions

An administrator needs to quickly deploy a widely-used IT solution and have it ready to use immediately. Where can they get support for this?

- A. AWS Well-Architected Framework documentation
- B. Amazon CloudFront
- C. AWS CodeCommit
- D. AWS Quick Start Reference Deployments

**Answer: D**

✅ **D. AWS Quick Start Reference Deployments**: AWS Quick Starts are automated reference deployments for popular IT workloads (e.g., SAP, Microsoft Active Directory, WordPress). They use AWS CloudFormation templates to deploy complex environments in minutes, letting administrators get up and running immediately with best-practice architectures.

❌ **A. AWS Well-Architected Framework documentation**: This is a set of architectural best practices and guidance documents. It provides advice on how to design well, but does not itself deploy solutions automatically.

❌ **B. Amazon CloudFront**: CloudFront is a content delivery network (CDN) service for distributing content with low latency. It is not a deployment tool for IT solutions.

❌ **C. AWS CodeCommit**: CodeCommit is a managed source control service (like Git). It is used for storing and managing code repositories, not for deploying pre-built IT solutions.

💡 **Exam Tip**: AWS Quick Start = Pre-built CloudFormation templates for popular architectures. Think "deploy in minutes, not days." They are built and maintained by AWS and AWS Partners.

---

## Q8. Service in the AWS Serverless Platform

Which of the following services falls within the category of the AWS serverless platform?

- A. Amazon EMR
- B. Elastic Load Balancing
- C. AWS Lambda
- D. AWS Mobile Hub

**Answer: C**

✅ **C. AWS Lambda**: AWS Lambda is the core serverless compute service on AWS. You run code without provisioning or managing servers — you simply upload your code and Lambda handles execution, scaling, and availability automatically.

❌ **A. Amazon EMR**: EMR (Elastic MapReduce) is a managed cluster platform for big data frameworks like Apache Hadoop and Spark. It uses EC2 instances (servers) under the hood, so it is not serverless.

❌ **B. Elastic Load Balancing**: ELB distributes incoming traffic across multiple targets (EC2, containers, IPs). While it is fully managed, it is not classified as a serverless compute service.

❌ **D. AWS Mobile Hub**: AWS Mobile Hub was a service to help configure and manage mobile backend services. It was deprecated and is no longer available, and was never considered part of the core serverless platform.

💡 **Exam Tip**: Serverless key services — Lambda (compute), DynamoDB (database), S3 (storage), API Gateway (API management), SNS/SQS (messaging), Step Functions (orchestration), Fargate (container compute). No server management required for any of these.

---

## Q9. Services That Are Part of the AWS Serverless Platform

Which combination of services is part of the AWS serverless platform?

- A. Amazon EC2, Amazon S3, Amazon Athena
- B. Amazon Kinesis, Amazon SQS, Amazon EMR
- C. AWS Step Functions, Amazon DynamoDB, Amazon SNS
- D. Amazon Athena, Amazon Cognito, Amazon EC2

**Answer: C**

✅ **C. AWS Step Functions, Amazon DynamoDB, Amazon SNS**: All three of these are serverless services. Step Functions is a serverless workflow orchestration service, DynamoDB is a fully managed serverless NoSQL database, and SNS (Simple Notification Service) is a fully managed serverless pub/sub messaging service.

❌ **A. Amazon EC2, Amazon S3, Amazon Athena**: EC2 requires you to manage virtual machine instances — it is not serverless. S3 is serverless object storage, and Athena is serverless query service, but EC2 disqualifies this option.

❌ **B. Amazon Kinesis, Amazon SQS, Amazon EMR**: Kinesis and SQS are managed/serverless streaming and messaging services, but Amazon EMR requires managing EC2-based clusters and is not serverless.

❌ **D. Amazon Athena, Amazon Cognito, Amazon EC2**: Athena and Cognito are serverless, but Amazon EC2 requires server management, so this group is not fully serverless.

💡 **Exam Tip**: Watch for the "serverless" disqualifier — if EC2 or EMR appears in a group, that group is NOT fully serverless. DynamoDB, Lambda, SNS, SQS, Step Functions, Athena, Cognito, API Gateway, Fargate = serverless.

---

## Q10. AWS's Sole Responsibility Under the Shared Responsibility Model

According to the AWS Shared Responsibility Model, what is AWS's sole responsibility?

- A. Application security
- B. Edge location management
- C. Patch management
- D. Customer-side data

**Answer: B**

✅ **B. Edge location management**: AWS is solely responsible for managing and securing its global infrastructure, which includes edge locations (used by CloudFront and Route 53). Customers have no control over or responsibility for these physical facilities.

❌ **A. Application security**: Application-level security (securing the code, application configurations, and logic) is the customer's responsibility. AWS provides the underlying platform, but application security belongs to the customer.

❌ **C. Patch management**: Patch management is a shared responsibility. AWS patches the underlying infrastructure and managed services, while customers are responsible for patching their own operating systems and applications on EC2 instances.

❌ **D. Customer-side data**: All data that customers put into AWS — its content, classification, encryption, and handling — is solely the customer's responsibility, not AWS's.

💡 **Exam Tip**: AWS's sole responsibilities = physical security of data centers, global network infrastructure, hardware maintenance, hypervisor security, and management of edge locations/Regions/AZs. Anything touching YOUR data or YOUR configuration = customer responsibility.

---

## Q11. AWS IAM Feature for Associating Permissions with Multiple Users

Which AWS IAM feature is used to associate a set of permissions with multiple users?

- A. Multi-Factor Authentication (MFA)
- B. Groups
- C. Password Policy
- D. Access Keys

**Answer: B**

✅ **B. Groups**: IAM Groups allow you to create a collection of IAM users and attach permission policies to the group. All users in the group inherit those permissions, making it efficient to manage access for multiple users at once.

❌ **A. Multi-Factor Authentication (MFA)**: MFA adds an extra layer of security by requiring a second form of authentication (e.g., a code from a device). It is a security feature, not a mechanism for managing permission associations across users.

❌ **C. Password Policy**: Password policies define rules for IAM user passwords (minimum length, complexity, rotation, etc.). They do not associate permissions with users.

❌ **D. Access Keys**: Access keys are long-term credentials (Access Key ID + Secret Access Key) used for programmatic access to AWS via the CLI or SDKs. They authenticate identity but do not define or assign permissions across multiple users.

💡 **Exam Tip**: IAM best practice — Assign permissions to Groups, not individual users. Attach policies to the group, then add users to the group. User inherits group permissions automatically. Never share credentials.

---

## Q12. Benefits of the AWS Cloud (Choose TWO)

Which of the following are benefits of the AWS Cloud? (Select TWO.)

- A. Unlimited uptime
- B. Elasticity
- C. Agility
- D. Colocation
- E. Capital expenses

**Answer: B, C**

✅ **B. Elasticity**: AWS allows resources to automatically scale up or down based on demand, making systems flexible and cost-efficient. This is a core cloud benefit that on-premises infrastructure cannot easily replicate.

✅ **C. Agility**: AWS enables rapid provisioning of resources in minutes, allowing organizations to experiment, innovate, and respond to market changes faster than traditional IT procurement cycles allow.

❌ **A. Unlimited uptime**: No service, cloud or otherwise, guarantees unlimited (100%) uptime. AWS provides high availability through its SLAs, but "unlimited uptime" is not a stated AWS benefit or commitment.

❌ **D. Colocation**: Colocation refers to housing your own physical servers in a third-party data center. This is NOT an AWS Cloud benefit — AWS eliminates the need for colocation by managing the infrastructure for you.

❌ **E. Capital expenses**: Capital expenses (CapEx) for hardware are a characteristic of on-premises, not a benefit of the AWS Cloud. AWS reduces CapEx by shifting to an OpEx model.

💡 **Exam Tip**: Core AWS Cloud benefits — Trade CapEx for OpEx, Elasticity, Agility (speed of innovation), economies of scale, stop guessing capacity, go global in minutes, stop spending money on data centers.

---

## Q13. Enabling SSO to the AWS Console

Which of the following can a customer use to enable Single Sign-On (SSO) to the AWS console?

- A. Amazon Connect
- B. AWS Directory Service
- C. Amazon Pinpoint
- D. Amazon Rekognition

**Answer: B**

✅ **B. AWS Directory Service**: AWS Directory Service lets you connect AWS resources with an existing on-premises Microsoft Active Directory or set up a new directory in the AWS Cloud. It enables Single Sign-On so users can access the AWS Management Console and AWS resources using their existing corporate credentials.

❌ **A. Amazon Connect**: Amazon Connect is a cloud-based contact center service for handling customer phone calls and interactions. It has no role in managing identity or SSO for the AWS console.

❌ **C. Amazon Pinpoint**: Amazon Pinpoint is a customer engagement and marketing communications service for sending targeted messages via email, SMS, and push notifications. It is not an identity or SSO service.

❌ **D. Amazon Rekognition**: Amazon Rekognition is an AI/ML service for image and video analysis (e.g., facial detection, object identification). It does not provide authentication or SSO capabilities.

💡 **Exam Tip**: For SSO and identity federation on AWS, think: AWS IAM Identity Center (formerly AWS SSO) + AWS Directory Service. AWS Directory Service bridges on-premises Active Directory with AWS. Rekognition = image/video AI, Pinpoint = marketing messages, Connect = call center.

---

## Q14. Multiple Isolated Locations with Low-Latency Networking Within an AWS Region

What are the multiple isolated locations within an AWS Region that are connected by low-latency networking?

- A. AWS Direct Connect locations
- B. Amazon VPC
- C. Edge locations
- D. Availability Zones

**Answer: D**

✅ **D. Availability Zones**: Availability Zones (AZs) are physically separate data centers within an AWS Region, connected to each other through low-latency, high-throughput, and highly redundant networking. Deploying across multiple AZs provides fault tolerance and high availability.

❌ **A. AWS Direct Connect locations**: Direct Connect locations are facilities where customers establish dedicated network connections between their on-premises network and AWS. They are not isolated locations within a Region.

❌ **B. Amazon VPC**: A Virtual Private Cloud is a logically isolated network within AWS where you deploy your resources. It spans a Region but is a networking construct, not a physical location description.

❌ **C. Edge locations**: Edge locations are Points of Presence (PoPs) used by CloudFront (CDN) and Route 53 to deliver content closer to end users. They are separate from Availability Zones and are not within a single Region.

💡 **Exam Tip**: AWS Global Infrastructure hierarchy — Region (geographic area) > Availability Zones (2-6 isolated data centers per region, connected by low-latency links) > Edge Locations (100s of PoPs for CDN/DNS caching). AZs = high availability; Regions = disaster recovery.

---

## Q15. Benefits of the AWS Compliance Program for Customers (Choose TWO)

Which of the following are benefits that the AWS Compliance program provides to AWS customers? (Select TWO.)

- A. It ensures that hosted workloads automatically comply with the controls of all supported compliance frameworks.
- B. AWS is responsible for maintaining the documentation of common compliance framework documents.
- C. It assures customers that AWS is maintaining physical security and data protection.
- D. It ensures the use of compliance frameworks used by other cloud providers.
- E. It adopts new compliance frameworks relevant to customer workloads.

**Answer: B, C**

✅ **B. AWS is responsible for maintaining the documentation of common compliance framework documents**: AWS maintains certifications, audit reports, and compliance documentation (available via AWS Artifact) for many frameworks (PCI DSS, SOC, ISO, HIPAA, etc.). This reduces the compliance burden on customers by providing AWS's portion of compliance evidence.

✅ **C. It assures customers that AWS is maintaining physical security and data protection**: AWS's compliance certifications — including SOC reports and ISO certifications — provide formal assurance (backed by third-party audits) that AWS meets stringent physical security and data protection standards for its infrastructure.

❌ **A. It ensures workloads automatically comply with all supported frameworks**: AWS compliance does NOT automatically make customer workloads compliant. Customers are still responsible for configuring their own environments and applications to meet compliance requirements within the shared responsibility model.

❌ **D. It ensures the use of compliance frameworks used by other cloud providers**: AWS Compliance focuses on frameworks relevant to AWS customers, not on replicating what other providers use. This is not a stated benefit.

❌ **E. It adopts new compliance frameworks relevant to customer workloads**: While AWS continuously expands its compliance coverage, the program itself does not adopt frameworks specifically for individual customers' workloads on demand.

💡 **Exam Tip**: AWS Artifact = On-demand access to AWS compliance reports and agreements. AWS Compliance program = AWS maintains certifications (SOC 1/2/3, PCI DSS, ISO 27001, HIPAA) to assure customers that the infrastructure layer is compliant. Customer applications must still be configured to comply.

---

## Q16. On-Demand Access to AWS Compliance Reports

Which service provides on-demand access to AWS compliance reports?

- A. AWS IAM
- B. AWS Artifact
- C. Amazon GuardDuty
- D. AWS KMS

**Answer: B**

✅ **B. AWS Artifact**: AWS Artifact is a self-service portal that provides on-demand access to AWS security and compliance documents, including SOC reports, ISO certifications, PCI DSS documents, and agreements like the Business Associate Addendum (BAA). These can be shared with auditors and regulators.

❌ **A. AWS IAM**: IAM (Identity and Access Management) is used to manage users, roles, and permissions within AWS. It does not provide compliance reports or audit documentation.

❌ **C. Amazon GuardDuty**: GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior in your AWS accounts. It detects threats but does not provide compliance documentation.

❌ **D. AWS KMS**: AWS Key Management Service (KMS) is used to create and manage cryptographic keys for data encryption. It is a security service, not a compliance reporting tool.

💡 **Exam Tip**: AWS Artifact = Compliance documents and reports on demand (SOC, ISO, PCI, HIPAA BAA). Think "artifact" as in "evidence artifact" for audits. GuardDuty = threat detection. Macie = data privacy. Inspector = vulnerability assessment.

---

## Q17. Operational Control Fully Inherited from AWS Under the Shared Responsibility Model

As part of the AWS Shared Responsibility Model, which of the following is an operational control that customers fully inherit from AWS?

- A. Physical security management of data centers
- B. Patch management
- C. Configuration management
- D. User and access management

**Answer: A**

✅ **A. Physical security management of data centers**: Customers fully inherit and benefit from AWS's physical security controls. AWS manages all physical access to its data centers, and customers have zero responsibility for physical security — it is entirely AWS's domain. This is a control customers "inherit" in full from AWS.

❌ **B. Patch management**: Patch management is shared. AWS patches the underlying infrastructure and managed service layers, while customers are responsible for patching their own guest operating systems, databases, and applications running on EC2.

❌ **C. Configuration management**: Configuration management is also shared. AWS manages the configuration of its infrastructure components, while customers are responsible for configuring their own operating systems, applications, and network controls (e.g., security groups, NACLs).

❌ **D. User and access management**: User and access management is entirely the customer's responsibility. Customers control who has access to their AWS accounts and resources through IAM — this is never inherited from AWS.

💡 **Exam Tip**: "Inherited from AWS" = controls where the customer has zero involvement. Physical security of data centers, hardware maintenance, and underlying network infrastructure security are 100% AWS's domain. The customer cannot touch or configure these.

---

## Q18. Costs to Consider When Comparing AWS to On-Premises TCO (Choose TWO)

When comparing AWS Cloud costs to on-premises total cost of ownership (TCO), which costs should be considered? (Select TWO.)

- A. Software development
- B. Project management
- C. Storage hardware
- D. Physical servers
- E. Antivirus software licenses

**Answer: C, D**

✅ **C. Storage hardware**: On-premises environments require purchasing, maintaining, and eventually replacing physical storage hardware (SAN, NAS, disk arrays). In the AWS Cloud, storage is a managed service you pay for by consumption — eliminating hardware procurement costs.

✅ **D. Physical servers**: Physical servers represent a major CapEx investment on-premises (purchase, rack, power, cooling, maintenance, refresh cycles). AWS eliminates this cost entirely — you pay only for the compute you consume, with no server ownership.

❌ **A. Software development**: Software development costs are largely the same whether you run on-premises or in the cloud. This is not a differentiating factor in a cloud vs. on-premises TCO comparison.

❌ **B. Project management**: Project management costs are similar in both environments and not a significant differentiating factor in infrastructure TCO comparisons between on-premises and AWS.

❌ **E. Antivirus software licenses**: Antivirus software is used in both on-premises and cloud environments. It is not an infrastructure cost that changes significantly when migrating to AWS (you may still need it on EC2 instances).

💡 **Exam Tip**: On-premises TCO hidden costs include: physical servers, storage/networking hardware, data center facility costs (power, cooling, space), hardware refresh cycles, and IT staff for maintenance. AWS eliminates all hardware and facility costs.

---

## Q19. Customer Responsibilities Under the Shared Responsibility Model (Choose TWO)

Under the Shared Responsibility Model, which of the following are customer responsibilities? (Select TWO.)

- A. Maintaining the underlying Amazon EC2 hardware
- B. Managing VPC network access control lists (NACLs)
- C. Encrypting data in transit and at rest
- D. Replacing failed hard disk drives
- E. Building hardware across different Availability Zones

**Answer: B, C**

✅ **B. Managing VPC network access control lists (NACLs)**: Network ACLs are stateless firewall rules that control traffic in and out of subnets within a VPC. Configuring and managing NACLs is entirely the customer's responsibility as part of "security in the cloud."

✅ **C. Encrypting data in transit and at rest**: The customer is responsible for deciding how their data is protected — including choosing encryption methods for data at rest (e.g., S3 SSE, EBS encryption) and in transit (e.g., TLS/SSL). AWS provides the tools and services, but enabling encryption is the customer's choice and responsibility.

❌ **A. Maintaining the underlying EC2 hardware**: The physical hardware that EC2 instances run on is maintained entirely by AWS. Customers never interact with or maintain the physical servers.

❌ **D. Replacing failed hard disk drives**: Physical hardware replacement, including failed HDDs, is AWS's responsibility. Customers never have access to physical infrastructure in the cloud.

❌ **E. Building hardware across different Availability Zones**: AWS designs and builds the physical infrastructure across AZs. Customers choose which AZ to deploy their resources in, but the building of that physical infrastructure is AWS's responsibility.

💡 **Exam Tip**: Customer responsibilities in the cloud = data (classification, encryption, integrity), identity management (IAM, MFA), OS/application patches (on EC2), network controls (security groups, NACLs), and client-side configuration. Hardware = always AWS.

---

## Q20. Scenarios Representing AWS Elasticity (Choose TWO)

Which scenarios represent the concept of elasticity in AWS? (Select TWO.)

- A. Scaling the number of Amazon EC2 instances based on traffic
- B. Resizing an Amazon RDS instance as business needs change
- C. Automatically routing traffic to less utilized Amazon EC2 instances
- D. Using AWS compliance documentation to accelerate compliance processes
- E. Having the ability to create and manage environments using code

**Answer: A, B**

✅ **A. Scaling the number of Amazon EC2 instances based on traffic**: This is a direct example of elasticity — automatically adding more EC2 instances when traffic increases and removing them when traffic decreases. AWS Auto Scaling implements this behavior to match capacity to actual demand.

✅ **B. Resizing an Amazon RDS instance as business needs change**: Elasticity also includes the ability to resize resources (scale up/down) based on changing requirements. Changing an RDS instance type to match new workload demands is an elastic behavior unique to cloud infrastructure.

❌ **C. Automatically routing traffic to less utilized EC2 instances**: This describes load balancing (Elastic Load Balancing), which distributes traffic for efficiency and availability. Load balancing is related to availability and performance optimization, not elasticity per se.

❌ **D. Using AWS compliance documentation to accelerate compliance processes**: This describes a compliance benefit of AWS, not elasticity. Elasticity is purely about dynamic resource scaling.

❌ **E. Having the ability to create and manage environments using code**: This describes Infrastructure as Code (IaC), such as AWS CloudFormation or Terraform. IaC is a cloud agility concept, not elasticity.

💡 **Exam Tip**: Elasticity = dynamic scaling of resources to match demand (scale out/in = horizontal, scale up/down = vertical). Auto Scaling Groups = elasticity in action. Do not confuse with Load Balancing (distribution) or IaC (automation/agility).

---

*Good luck on your AWS CLF-C02 exam! Review these concepts carefully — the Shared Responsibility Model, pricing models, support tiers, and serverless services are among the most frequently tested topics.*

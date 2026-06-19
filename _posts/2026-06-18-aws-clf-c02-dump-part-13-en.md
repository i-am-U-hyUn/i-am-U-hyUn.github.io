---
title: "AWS CLF-C02 Dump Explained Part 13"
date: 2026-06-18 01:13:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

This post covers 20 AWS CLF-C02 practice questions from Batch 13, each translated into English with detailed explanations for every answer choice and targeted exam tips to help you pass.

---

## Q1. Amazon VPC Dashboard Features

Which of the following features can be configured through the Amazon VPC (Virtual Private Cloud) dashboard? (Select TWO)

- A. Amazon CloudFront distributions
- B. Amazon Route 53
- C. Security Groups
- D. Subnets
- E. Elastic Load Balancing

**Answer: C, D**

✅ **C. Security Groups**: Security Groups are a core VPC networking feature that act as virtual firewalls for EC2 instances, controlling inbound and outbound traffic at the instance level — fully configurable from the VPC dashboard.

✅ **D. Subnets**: Subnets are created within a VPC to segment the IP address range and are directly managed through the VPC dashboard.

❌ **A. Amazon CloudFront distributions**: CloudFront is a separate CDN service managed through its own console, not through the VPC dashboard.

❌ **B. Amazon Route 53**: Route 53 is a DNS and domain registration service managed independently from the VPC dashboard.

❌ **E. Elastic Load Balancing**: ELB is configured through the EC2 or its own console section, not directly through the VPC dashboard.

💡 **Exam Tip**: VPC dashboard manages = Subnets, Route Tables, Internet Gateways, NAT Gateways, Security Groups, Network ACLs. CloudFront, Route 53, and ELB are separate service consoles.

---

## Q2. AWS Services for Collecting Account Activity Information

Which AWS services can be used to collect information about AWS account activity? (Select TWO)

- A. Amazon CloudFront
- B. AWS Cloud9
- C. AWS CloudTrail
- D. AWS CloudHSM
- E. Amazon CloudWatch

**Answer: C, E**

✅ **C. AWS CloudTrail**: CloudTrail records all API calls and account activity across your AWS infrastructure, providing a full audit trail of who did what, when, and from where.

✅ **E. Amazon CloudWatch**: CloudWatch collects and monitors operational data including metrics, logs, and events from AWS resources, enabling you to observe account and application activity in real time.

❌ **A. Amazon CloudFront**: CloudFront is a content delivery network (CDN) that caches and delivers content globally — it does not collect account activity information.

❌ **B. AWS Cloud9**: Cloud9 is a cloud-based IDE for writing and debugging code, not a monitoring or logging service.

❌ **D. AWS CloudHSM**: CloudHSM is a hardware security module service used for key management and cryptography, not for account activity monitoring.

💡 **Exam Tip**: CloudTrail = WHO did WHAT (API audit logs) | CloudWatch = WHAT is happening NOW (metrics, logs, alarms). These two are the go-to monitoring pair on the exam.

---

## Q3. Uses of AWS Edge Locations

What can AWS edge locations be used for? (Select TWO)

- A. Hosting applications
- B. Delivering content closer to users
- C. Running NoSQL database caching services
- D. Reducing server traffic by caching responses
- E. Sending notification messages to end users

**Answer: B, D**

✅ **B. Delivering content closer to users**: AWS edge locations are part of the Amazon CloudFront network. They store cached copies of content geographically near end users to reduce latency.

✅ **D. Reducing server traffic by caching responses**: By caching responses at the edge, CloudFront reduces the number of requests that must travel all the way back to the origin server, lowering load and improving performance.

❌ **A. Hosting applications**: Edge locations do not host full applications. Full application hosting requires AWS Regions with EC2, ECS, Lambda, etc.

❌ **C. Running NoSQL database caching services**: Services like ElastiCache run in AWS Regions, not at edge locations.

❌ **E. Sending notification messages to end users**: Push notifications are handled by services like Amazon SNS, not edge locations.

💡 **Exam Tip**: Edge Locations = CloudFront CDN caching + AWS Global Accelerator routing. They are NOT the same as Regions or Availability Zones — they are points of presence (PoPs) for low-latency content delivery.

---

## Q4. Purpose of AWS IAM Access Keys

AWS IAM (Identity and Access Management) access keys are used for:

- A. Logging into the AWS Management Console
- B. Making programmatic calls to AWS via the AWS API
- C. Logging into an Amazon EC2 instance
- D. Authenticating to AWS CodeCommit repositories

**Answer: B**

✅ **B. Making programmatic calls to AWS via the AWS API**: IAM access keys (Access Key ID + Secret Access Key) are credentials used by developers, CLI tools, and applications to authenticate programmatic requests to AWS services via the API or SDK.

❌ **A. Logging into the AWS Management Console**: Console login uses a username and password (and optionally MFA), not access keys.

❌ **C. Logging into an Amazon EC2 instance**: EC2 instances are accessed using SSH key pairs (for Linux) or RDP credentials (for Windows), not IAM access keys.

❌ **D. Authenticating to AWS CodeCommit repositories**: CodeCommit uses Git credentials or SSH keys specifically generated for CodeCommit, not standard IAM access keys.

💡 **Exam Tip**: IAM Access Keys = CLI / SDK / API programmatic access only. Console = username + password. EC2 = SSH key pair. Never confuse these three authentication methods.

---

## Q5. Benefits of AWS Cloud for Global Companies

What are the benefits for a company using AWS Cloud across multiple countries worldwide? (Select TWO)

- A. A company can deploy applications in multiple AWS Regions to reduce latency.
- B. Amazon Translate automatically converts third-party website interfaces into multiple languages.
- C. Amazon CloudFront has multiple edge locations worldwide to reduce latency.
- D. Amazon Comprehend allows users to build applications that can respond to customer requests in various languages.
- E. Elastic Load Balancing distributes application web traffic across multiple AWS Regions worldwide to reduce latency.

**Answer: A, C**

✅ **A. Deploying in multiple AWS Regions to reduce latency**: By running applications in Regions close to users around the world, companies can dramatically reduce round-trip latency for their global customers.

✅ **C. Amazon CloudFront edge locations reduce latency globally**: CloudFront's worldwide network of edge locations caches content near end users, reducing the distance data must travel and thus lowering latency.

❌ **B. Amazon Translate automatically converts third-party websites**: Amazon Translate translates text within your own applications — it does not automatically convert third-party website interfaces.

❌ **D. Amazon Comprehend for multi-language customer responses**: Comprehend is a natural language processing (NLP) service for text analysis (sentiment, entities, etc.), not specifically for building multi-language response applications.

❌ **E. ELB distributes traffic across multiple AWS Regions**: Elastic Load Balancing operates within a single Region and a single VPC. It does not distribute traffic across multiple Regions. Route 53 or Global Accelerator handle cross-region routing.

💡 **Exam Tip**: Global latency reduction = Multi-Region deployments + CloudFront edge locations. ELB is REGIONAL only. For cross-region traffic management, think Route 53 or AWS Global Accelerator.

---

## Q6. AWS Service Handling Capacity, Load Balancing, Auto Scaling, and Health Monitoring

Which AWS service handles the implementation details of capacity provisioning, load balancing, auto scaling, and application health monitoring?

- A. AWS Config
- B. AWS Elastic Beanstalk
- C. Amazon Route 53
- D. Amazon CloudFront

**Answer: B**

✅ **B. AWS Elastic Beanstalk**: Elastic Beanstalk is a Platform as a Service (PaaS) that automatically handles infrastructure concerns including capacity provisioning, load balancing, auto scaling, and application health monitoring, so developers can focus on writing code.

❌ **A. AWS Config**: AWS Config is a service that records and evaluates the configuration of your AWS resources for compliance and auditing — it does not manage application infrastructure provisioning.

❌ **C. Amazon Route 53**: Route 53 is a DNS and domain name management service, not an application deployment platform.

❌ **D. Amazon CloudFront**: CloudFront is a CDN for content delivery, not an application hosting or scaling platform.

💡 **Exam Tip**: Elastic Beanstalk = PaaS. You upload your code, AWS handles the rest (EC2, ELB, Auto Scaling, monitoring). Key phrase: "handles implementation details" or "just upload your code."

---

## Q7. AWS Service Providing Inbound and Outbound Network ACLs for EC2

Which AWS service provides inbound and outbound network ACLs to strengthen external connections to Amazon EC2?

- A. AWS IAM
- B. Amazon Connect
- C. Amazon VPC
- D. Amazon API Gateway

**Answer: C**

✅ **C. Amazon VPC**: Amazon VPC (Virtual Private Cloud) provides Network Access Control Lists (NACLs) that act as stateless firewalls at the subnet level, allowing you to control both inbound and outbound traffic to and from subnets containing EC2 instances.

❌ **A. AWS IAM**: IAM manages identity and access permissions for AWS services and resources, not network-level traffic filtering.

❌ **B. Amazon Connect**: Amazon Connect is a cloud-based contact center service for customer communications, completely unrelated to network ACLs.

❌ **D. Amazon API Gateway**: API Gateway is a service for creating, managing, and securing APIs — it does not provide network ACLs for EC2 instances.

💡 **Exam Tip**: Network ACL (NACL) = Subnet-level, stateless firewall in VPC. Security Group = Instance-level, stateful firewall. Both are VPC features. NACL evaluates rules in order by number.

---

## Q8. What Increases When a Company Provisions Web Servers Across Multiple AWS Regions?

What increases when a company provisions web servers across multiple AWS Regions?

- A. Coupling
- B. Availability
- C. Security
- D. Durability

**Answer: B**

✅ **B. Availability**: Deploying web servers across multiple AWS Regions ensures that if one Region experiences an outage, users can be served from another Region, significantly increasing overall application availability.

❌ **A. Coupling**: Coupling refers to the degree of dependency between components. Multi-region deployment is a high-availability strategy and does not inherently increase coupling — in fact, good cloud architecture aims for loose coupling.

❌ **C. Security**: While you can implement security in multiple regions, simply provisioning servers across regions does not automatically increase security.

❌ **D. Durability**: Durability refers to the long-term preservation of data (e.g., S3's 11 nines durability). Provisioning web servers across regions is about availability, not data durability.

💡 **Exam Tip**: Multi-Region = High Availability + Disaster Recovery. Multi-AZ within a Region = Fault Tolerance. Durability = data persistence (S3). Know the difference between availability, durability, and fault tolerance.

---

## Q9. Benefits of AWS Pay-As-You-Go Pricing Model (Select TWO)

Which of the following are benefits of the AWS pay-as-you-go pricing model? (Select TWO)

- A. Reduces capital expenditure
- B. Requires upfront payment for AWS services
- C. Applies only to Amazon EC2, Amazon S3, and Amazon RDS
- D. Reduces operational costs

**Answer: A, D**

✅ **A. Reduces capital expenditure (CapEx)**: With pay-as-you-go, companies no longer need to invest heavily in purchasing and maintaining physical hardware upfront, converting capital expenses to variable operational expenses.

✅ **D. Reduces operational costs**: You only pay for what you actually use, eliminating costs associated with idle or over-provisioned on-premises infrastructure.

❌ **B. Requires upfront payment for AWS services**: Pay-as-you-go means you pay ONLY for what you consume with NO upfront commitment. Upfront payments are associated with Reserved Instances or Savings Plans, not the default model.

❌ **C. Applies only to EC2, S3, and RDS**: AWS pay-as-you-go pricing applies across virtually ALL AWS services — not just a subset of three services.

💡 **Exam Tip**: AWS Pay-As-You-Go = No upfront cost + No long-term contract + Pay only for what you use = CapEx to OpEx shift. This is one of the fundamental cloud economics principles on the CLF-C02 exam.

---

## Q10. AWS Responsibility in the Shared Responsibility Model

In the AWS Shared Responsibility Model, which security-related tasks is AWS responsible for?

- A. Managing the IAM credential lifecycle
- B. Physical security of the global infrastructure
- C. Encrypting Amazon EBS volumes
- D. Firewall configuration

**Answer: B**

✅ **B. Physical security of the global infrastructure**: AWS is responsible for the security OF the cloud, which includes physical security of data centers, hardware, networking infrastructure, and the global facilities where AWS services run.

❌ **A. Managing the IAM credential lifecycle**: IAM user creation, password policies, access key rotation, and MFA configuration are the customer's responsibility — AWS provides the tools but customers manage their identities.

❌ **C. Encrypting Amazon EBS volumes**: EBS encryption is a customer responsibility. AWS provides the capability (KMS integration), but customers must choose to enable and manage encryption.

❌ **D. Firewall configuration**: Configuring Security Groups and Network ACLs (virtual firewalls) is the customer's responsibility. AWS manages the underlying physical network hardware.

💡 **Exam Tip**: AWS = Security OF the cloud (hardware, facilities, global network, hypervisor). Customer = Security IN the cloud (OS patches, app config, data encryption, IAM, firewall rules). This is the most tested concept in the CLF-C02 security domain.

---

## Q11. Example of AWS Security in the Shared Responsibility Model

In the AWS Shared Responsibility Model, which of the following is an example of security OF the AWS Cloud (AWS's responsibility)?

- A. Managing edge locations
- B. Physical security
- C. Firewall configuration
- D. Global infrastructure

**Answer: B**

✅ **B. Physical security**: Physical security of AWS data centers — including access controls, surveillance, environmental protections, and on-site security — is entirely AWS's responsibility. Customers never have physical access to AWS hardware.

❌ **A. Managing edge locations**: While AWS manages the physical edge location infrastructure, "managing edge locations" in the context of CDN configuration (CloudFront distributions, cache behaviors) is a customer responsibility.

❌ **C. Firewall configuration**: Configuring Security Groups and NACLs within VPC is the customer's responsibility. AWS manages the physical network firewall appliances in its data centers.

❌ **D. Global infrastructure**: The global infrastructure itself (Regions, AZs, edge locations as physical facilities) is AWS's responsibility, but this choice is less specific than physical security. Note: if the exam presents both B and D, B (physical security) is the more precise and commonly tested answer for AWS's responsibility.

💡 **Exam Tip**: AWS Responsibility = Physical data center security, hardware maintenance, managed service patching (e.g., RDS OS), global network. Quick rule: "If you can't touch it, AWS is responsible for it."

---

## Q12. Getting Technical Support with AWS Basic Support Plan (Select TWO)

How can an AWS user with an AWS Basic Support plan get technical support from AWS? (Select TWO)

- A. AWS Senior Support Engineer
- B. AWS Technical Account Manager
- C. AWS Trusted Advisor
- D. AWS Discussion Forums

**Answer: C, D**

✅ **C. AWS Trusted Advisor**: Trusted Advisor provides automated best practice checks across cost optimization, security, fault tolerance, performance, and service limits — available to Basic support plan users for core checks.

✅ **D. AWS Discussion Forums**: The AWS Developer Forums (community forums) are accessible to all AWS users including Basic plan users as a resource for peer-to-peer technical help.

❌ **A. AWS Senior Support Engineer**: Direct access to AWS support engineers (including senior engineers) requires at least Developer Support plan or higher.

❌ **B. AWS Technical Account Manager (TAM)**: TAMs are exclusively available with the Enterprise Support plan, providing dedicated proactive guidance.

💡 **Exam Tip**: Basic Support = AWS documentation + Trusted Advisor (core checks) + Community forums + AWS Health Dashboard. Developer = business hours email support. Business = 24/7 phone/chat. Enterprise = TAM + Concierge.

---

## Q13. Key Pillars of the AWS Well-Architected Framework (Select TWO)

Which of the following are key pillars of the AWS Well-Architected Framework? (Select TWO)

- A. Multiple Availability Zones
- B. Performance Efficiency
- C. Security
- D. Using Encryption
- E. High Availability

**Answer: B, C**

✅ **B. Performance Efficiency**: Performance Efficiency is one of the six official pillars of the AWS Well-Architected Framework, focusing on using computing resources efficiently and maintaining efficiency as demand changes.

✅ **C. Security**: Security is another official pillar of the AWS Well-Architected Framework, covering identity management, data protection, infrastructure protection, and incident response.

❌ **A. Multiple Availability Zones**: Using multiple AZs is a best practice and implementation technique, not a named pillar of the Well-Architected Framework.

❌ **D. Using Encryption**: Encryption is a security best practice and a component of the Security pillar, but it is not itself a separate pillar.

❌ **E. High Availability**: High Availability is a design goal achieved through practices in the Reliability pillar, not a named pillar itself.

💡 **Exam Tip**: AWS Well-Architected Framework has 6 pillars: **O**perational Excellence, **S**ecurity, **R**eliability, **P**erformance Efficiency, **C**ost Optimization, **S**ustainability. Mnemonic: **"OSRPCS"** or **"Our Security Requires Proper Cost Sustainability."**

---

## Q14. Pricing Option with Greatest Discount for Amazon EC2 Dedicated Host Reservations

Which pricing option provides the greatest discount after selecting an Amazon EC2 Dedicated Host reservation?

- A. No upfront payment
- B. Pay on-demand hourly
- C. Partial upfront payment
- D. All upfront payment

**Answer: D**

✅ **D. All upfront payment**: Paying the entire reservation cost upfront for a Dedicated Host (1-year or 3-year term) provides the maximum possible discount compared to on-demand pricing, as AWS rewards customers who commit fully.

❌ **A. No upfront payment**: No Upfront with a 1 or 3-year commitment offers a discount over on-demand, but it is the smallest discount among the three reservation payment options.

❌ **B. Pay on-demand hourly**: On-demand pricing has no discount and is the most expensive option — there is no long-term commitment but also no savings.

❌ **C. Partial upfront payment**: Partial Upfront offers a better discount than No Upfront but less than All Upfront.

💡 **Exam Tip**: Reserved Instance / Dedicated Host discount order (highest to lowest): All Upfront > Partial Upfront > No Upfront > On-Demand. Longer term (3 years) also gives bigger discounts than 1 year.

---

## Q15. Benefits of Deploying Applications Across Multiple Availability Zones

What is the benefit of deploying an application across multiple Availability Zones?

- A. The risk of service failure is reduced if a specific AWS Region experiences a service disruption due to natural disaster.
- B. Availability is increased because the application can tolerate an outage in one Availability Zone.
- C. Coverage will be broader because Availability Zones are geographically distant and can serve a wider area.
- D. Application latency is reduced, improving the user experience.

**Answer: B**

✅ **B. Increased availability by tolerating one AZ outage**: Availability Zones are isolated data centers within the same Region. If one AZ fails (power, networking, hardware), applications deployed across multiple AZs continue running in the remaining AZs, maintaining high availability.

❌ **A. Reduces risk from natural disaster affecting a Region**: This describes Multi-REGION deployment, not multi-AZ. AZs are within the same geographic region and could be affected by a large-scale regional disaster. AZs protect against localized failures, not region-wide ones.

❌ **C. Broader geographic coverage**: AZs within a Region are geographically close (typically within 60 miles/100 km) and serve the same local area. They are not designed to broaden geographic coverage.

❌ **D. Reduced application latency**: Multi-AZ deployment is for fault tolerance and high availability, not for reducing latency. Latency reduction uses edge locations, CDN, or multi-Region deployments.

💡 **Exam Tip**: Multi-AZ = Fault Tolerance + High Availability (within a Region). Multi-Region = Disaster Recovery + Geographic Reach. Never confuse these two architectural patterns on the exam.

---

## Q16. How to Estimate Costs for a New AWS Application

A Cloud Practitioner asks how to estimate the cost of using a new application on AWS. What is the most appropriate response?

- A. Inform the user that AWS pricing allows on-demand pricing.
- B. Direct the user to the AWS Pricing Calculator for an estimate.
- C. Use Amazon QuickSight to analyze current in-house spending.
- D. Use Amazon AppStream 2.0 for real-time pricing analysis.

**Answer: B**

✅ **B. AWS Pricing Calculator**: The AWS Pricing Calculator (calculator.aws) is the official tool for estimating the cost of AWS services before you deploy. Users can configure services, choose options, and get a detailed monthly cost estimate.

❌ **A. Informing about on-demand pricing**: Simply knowing on-demand pricing exists doesn't help estimate total costs for a new application with multiple services and configurations.

❌ **C. Amazon QuickSight for current in-house spending**: QuickSight is a business intelligence (BI) and data visualization service, not a cost estimation tool for AWS services.

❌ **D. Amazon AppStream 2.0**: AppStream 2.0 is a fully managed application streaming service for delivering desktop apps to browsers — completely unrelated to pricing analysis.

💡 **Exam Tip**: AWS Cost Tools to know: **Pricing Calculator** = estimate future costs BEFORE deployment. **Cost Explorer** = analyze PAST and current costs. **Budgets** = set alerts when costs exceed thresholds. **Cost and Usage Report** = detailed billing data.

---

## Q17. Connecting Applications in VPC to On-Premises Resources (Select TWO)

A company wants to migrate applications to AWS VPC. These applications need to access on-premises resources. Which combination of actions can the company take to achieve this goal? (Select TWO)

- A. Use AWS Service Catalog to identify a list of on-premises resources that can be migrated.
- B. Establish a VPN connection between the new VPC and on-premises devices using a virtual private gateway.
- C. Use Amazon Athena to query data from on-premises database servers.
- D. Use AWS Direct Connect to connect the on-premises data center to AWS.
- E. Use Amazon CloudFront to restrict access to static web content served through on-premises web servers.

**Answer: B, D**

✅ **B. VPN connection using a virtual private gateway**: An AWS Site-to-Site VPN connection uses a Virtual Private Gateway on the AWS side and a Customer Gateway on the on-premises side to create an encrypted tunnel over the internet, enabling secure connectivity between VPC and on-premises.

✅ **D. AWS Direct Connect**: Direct Connect provides a dedicated, private network connection from an on-premises data center to AWS, bypassing the public internet for more consistent network performance and lower latency.

❌ **A. AWS Service Catalog**: Service Catalog is for managing and provisioning pre-approved AWS service portfolios within your organization — it does not identify on-premises resources for migration.

❌ **C. Amazon Athena for on-premises databases**: Athena is a serverless SQL query service for data stored in Amazon S3, not for querying on-premises database servers directly.

❌ **E. Amazon CloudFront to restrict access**: CloudFront is a CDN for distributing content globally, not a tool for restricting access or connecting on-premises web servers to a VPC.

💡 **Exam Tip**: Hybrid connectivity options: **VPN** = encrypted tunnel over internet (fast to set up, lower cost) vs. **Direct Connect** = dedicated private line (consistent speed, higher cost, weeks to provision). Both connect on-premises to AWS VPC.

---

## Q18. Protecting an Application from Malicious IP-Based Requests

A web application running on AWS is being spammed with malicious requests from a repeated set of IP addresses. Which AWS service can help protect the application and block malicious traffic?

- A. AWS IAM
- B. Amazon GuardDuty
- C. Amazon Simple Notification Service (Amazon SNS)
- D. AWS WAF

**Answer: D**

✅ **D. AWS WAF**: AWS WAF (Web Application Firewall) allows you to create rules that block, allow, or monitor web requests based on conditions such as IP addresses, HTTP headers, request body, URI strings, and more — making it ideal for blocking malicious traffic from known bad IP sets.

❌ **A. AWS IAM**: IAM manages user identities and access permissions to AWS services — it has no capability to filter or block web application traffic.

❌ **B. Amazon GuardDuty**: GuardDuty is a threat detection service that uses machine learning to identify suspicious activity in your AWS account (e.g., unusual API calls, compromised instances). It detects threats but does not actively block web traffic.

❌ **C. Amazon SNS**: SNS (Simple Notification Service) is a messaging and notification service used to send messages to subscribers — it cannot block or filter network traffic.

💡 **Exam Tip**: AWS WAF = Layer 7 (application layer) protection. Blocks by IP, geo, rate limiting, SQL injection, XSS. Often deployed with CloudFront or ALB. AWS Shield = Layer 3/4 DDoS protection. GuardDuty = threat detection (no blocking). Know these three security services and their differences.

---

## Q19. Benefits of Treating Infrastructure as Code on AWS Cloud

Which of the following is a benefit of treating infrastructure as code in the AWS Cloud?

- A. Automates the migration of on-premises hardware to AWS data centers.
- B. Allows third parties to automate audits of AWS infrastructure.
- C. Converts application code to run on AWS infrastructure.
- D. Automates the infrastructure provisioning process.

**Answer: D**

✅ **D. Automates the infrastructure provisioning process**: Infrastructure as Code (IaC) — using tools like AWS CloudFormation or AWS CDK — allows you to define and provision AWS infrastructure through code/templates, enabling repeatable, automated, version-controlled deployments without manual console steps.

❌ **A. Automates migration of on-premises hardware to AWS**: IaC is about provisioning cloud resources through code, not physically migrating hardware. AWS Migration Hub and SMS handle physical-to-cloud migrations.

❌ **B. Allows third parties to automate infrastructure audits**: While IaC templates can be reviewed for compliance, the primary benefit of IaC is automation and repeatability, not enabling third-party audits.

❌ **C. Converts application code to run on AWS infrastructure**: IaC provisions infrastructure (servers, networks, databases), it does not convert or adapt application code to run on cloud platforms.

💡 **Exam Tip**: Infrastructure as Code (IaC) key benefits: automation, repeatability, version control, consistency across environments. AWS CloudFormation is the primary IaC service. Key phrase on exam: "automates provisioning" or "treat infrastructure like software."

---

## Q20. Dedicated Network Connection Between On-Premises and AWS Cloud

A company needs a dedicated network connection between on-premises servers and the AWS Cloud. Which AWS service should be used?

- A. AWS VPN
- B. AWS Direct Connect
- C. Amazon API Gateway
- D. Amazon Connect

**Answer: B**

✅ **B. AWS Direct Connect**: AWS Direct Connect establishes a dedicated, private physical network connection between your on-premises data center and AWS, bypassing the public internet entirely. This provides consistent bandwidth, lower latency, and reduced data transfer costs compared to internet-based connections.

❌ **A. AWS VPN**: AWS Site-to-Site VPN creates an encrypted connection over the PUBLIC internet, not a dedicated private line. It is faster to set up but lacks the consistency and guaranteed bandwidth of Direct Connect.

❌ **C. Amazon API Gateway**: API Gateway is a service for building, deploying, and managing APIs for web and mobile applications — it is not a network connectivity solution for data centers.

❌ **D. Amazon Connect**: Amazon Connect is a cloud-based contact center service for handling customer phone calls and interactions — completely unrelated to network connectivity between data centers.

💡 **Exam Tip**: The keyword "DEDICATED" connection = AWS Direct Connect (private fiber line). "Encrypted" connection over internet = AWS VPN. Direct Connect takes weeks to provision but provides consistent 1 Gbps or 10 Gbps speeds. VPN can be set up in minutes.

---

*Good luck on your AWS CLF-C02 exam! Review these concepts regularly and focus on understanding the WHY behind each answer, not just memorizing choices.*

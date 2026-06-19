---
title: "AWS CLF-C02 Dump Explained Part 10"
date: 2026-06-18 01:10:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

Practice your AWS Cloud Practitioner (CLF-C02) exam skills with this set of 20 questions covering load balancers, cloud benefits, cost management, security, and core AWS services — each with detailed answer explanations and exam tips.

---

## Q1. ELB Load Balancer Types (Choose Two)

Which types of load balancers can be used with Elastic Load Balancing (ELB)? (Choose TWO)

- A. Public load balancer with AWS Application Auto Scaling
- B. F5 Big-IP and Citrix NetScaler load balancers
- C. Classic Load Balancer
- D. Cross-zone load balancer using public and private IPs
- E. Application Load Balancer

**Answer: C, E**

✅ **C. Classic Load Balancer**: The Classic Load Balancer (CLB) is one of the original ELB types provided by AWS, supporting both HTTP/HTTPS and TCP traffic across EC2-Classic and VPC environments.

✅ **E. Application Load Balancer**: The Application Load Balancer (ALB) is an ELB type that operates at Layer 7 (HTTP/HTTPS) and supports advanced routing features such as host-based and path-based routing.

❌ **A. Public load balancer with AWS Application Auto Scaling**: This is not a named ELB load balancer type; Auto Scaling is a separate feature that works alongside ELB but is not a load balancer type itself.

❌ **B. F5 Big-IP and Citrix NetScaler load balancers**: These are third-party hardware/software load balancers, not AWS ELB types.

❌ **D. Cross-zone load balancer using public and private IPs**: Cross-zone load balancing is a configuration option for ELB, not a distinct load balancer type.

💡 **Exam Tip**: AWS ELB has three types — **Application Load Balancer (ALB, Layer 7)**, **Network Load Balancer (NLB, Layer 4)**, and **Classic Load Balancer (CLB, legacy)**. The Gateway Load Balancer (GWLB) is a fourth type used for third-party appliances.

---

## Q2. Why Choose AWS Over Traditional Data Centers?

Why should a company choose AWS over a traditional data center?

- A. AWS gives users complete control over the underlying resources.
- B. AWS does not require long-term contracts and offers a pay-as-you-go model.
- C. AWS provides edge locations in every country to support global reach.
- D. AWS has no limit on the number of resources you can create.

**Answer: B**

✅ **B. AWS does not require long-term contracts and offers a pay-as-you-go model**: One of the most compelling advantages of AWS over traditional data centers is the ability to pay only for what you use, with no upfront capital expenditure and no long-term commitment required. This drastically reduces financial risk and allows organizations to scale economically.

❌ **A. AWS gives users complete control over the underlying resources**: AWS operates on a shared responsibility model; users do not have physical access to or control over the underlying hardware infrastructure.

❌ **C. AWS provides edge locations in every country**: While AWS has an extensive global network, edge locations (used by CloudFront) are not available in every country in the world.

❌ **D. AWS has no limit on the number of resources you can create**: AWS does have default service quotas (limits) on resource creation, though these can be increased upon request.

💡 **Exam Tip**: Key AWS advantages = **Pay-as-you-go pricing**, **No long-term contracts**, **Trade CapEx for OpEx**, and **Elasticity**. These are foundational Cloud Practitioner concepts.

---

## Q3. Fastest Application Response for Users Across Multiple AWS Regions

Which solution provides the fastest application response times for frequently accessed data for users across multiple AWS regions?

- A. AWS CloudTrail across multiple Availability Zones
- B. Edge locations in front of Amazon CloudFront
- C. AWS CloudFormation across multiple regions
- D. Virtual private gateway via AWS Direct Connect

**Answer: B**

✅ **B. Edge locations in front of Amazon CloudFront**: Amazon CloudFront is a Content Delivery Network (CDN) that caches content at globally distributed edge locations close to end users. By serving cached content from the nearest edge location, CloudFront dramatically reduces latency for frequently accessed data.

❌ **A. AWS CloudTrail across multiple Availability Zones**: CloudTrail is an auditing and logging service that records API calls; it is not designed to reduce application response times.

❌ **C. AWS CloudFormation across multiple regions**: CloudFormation is an infrastructure-as-code service for provisioning resources; it does not directly improve application response times for end users.

❌ **D. Virtual private gateway via AWS Direct Connect**: Direct Connect provides a dedicated network connection from on-premises to AWS; it does not cache or distribute content globally to reduce latency for many users.

💡 **Exam Tip**: **Amazon CloudFront** = CDN + Edge Locations + Low Latency + Cache. Whenever a question mentions "fastest response" or "global users," think CloudFront edge locations.

---

## Q4. AWS Service for Running a Self-Managed Database

Which of the following AWS services can be used to run a self-managed database?

- A. Amazon Route 53
- B. AWS X-Ray
- C. AWS Snowmobile
- D. Amazon Elastic Compute Cloud (Amazon EC2)

**Answer: D**

✅ **D. Amazon EC2**: Amazon EC2 provides resizable virtual machines (instances) in the cloud. You can install and manage any database software (such as MySQL, PostgreSQL, or MongoDB) on an EC2 instance, giving you full control over the database configuration, patching, and management.

❌ **A. Amazon Route 53**: Route 53 is a scalable DNS (Domain Name System) and traffic routing service; it is not used to run databases.

❌ **B. AWS X-Ray**: AWS X-Ray is a distributed tracing service used to debug and analyze application performance; it does not host or run databases.

❌ **C. AWS Snowmobile**: AWS Snowmobile is a massive data transfer service (an actual physical truck) used to migrate exabytes of data to AWS; it is not a compute or database service.

💡 **Exam Tip**: **EC2 = full control** (self-managed, any OS/software). **Amazon RDS = managed database** (AWS handles patching, backups). Use EC2 when you need a custom or unsupported database engine.

---

## Q5. Exclusive Benefit of AWS Enterprise Support

What is an exclusive benefit provided to users on the Enterprise Support plan?

- A. Access to a Technical Project Manager
- B. Access to a Technical Account Manager (TAM)
- C. Access to Cloud Support Engineers
- D. Access to Solutions Architects

**Answer: B**

✅ **B. Access to a Technical Account Manager (TAM)**: A Technical Account Manager (TAM) is a dedicated AWS expert assigned exclusively to Enterprise Support customers. The TAM provides proactive guidance, architecture reviews, and acts as the customer's primary point of contact within AWS.

❌ **A. Access to a Technical Project Manager**: AWS does not offer a "Technical Project Manager" as a named support benefit in any plan.

❌ **C. Access to Cloud Support Engineers**: Cloud Support Engineers are available across Business and Enterprise support plans; this is not exclusive to Enterprise.

❌ **D. Access to Solutions Architects**: While Enterprise customers get access to AWS Solutions Architects for consulting, the TAM is the defining exclusive benefit of Enterprise Support.

💡 **Exam Tip**: **Enterprise Support = TAM (Technical Account Manager)**. TAM is the key differentiator. Business Support includes 24/7 phone/chat with Cloud Support Engineers but no dedicated TAM.

---

## Q6. Preventing AWS Service Disruption When a Natural Disaster Affects an Entire Region

How can users prevent AWS service disruption if a natural disaster affects an entire region?

- A. Deploy applications across multiple Availability Zones within a single AWS region.
- B. Use a hybrid cloud computing deployment model within a geographic area.
- C. Deploy applications across multiple AWS regions.
- D. Use AWS Artifact to store application artifacts and replicate them across multiple AWS regions.

**Answer: C**

✅ **C. Deploy applications across multiple AWS regions**: If a natural disaster impacts an entire AWS region, the only way to ensure continued service availability is to have your application deployed in at least one other region. Multi-region deployments provide geographic redundancy at the highest level.

❌ **A. Deploy applications across multiple Availability Zones within a single AWS region**: Multi-AZ deployment protects against AZ-level failures (data center outages, power issues) but not against region-wide disasters, since all AZs in a region are in the same geographic area.

❌ **B. Use a hybrid cloud computing deployment model**: A hybrid model connects on-premises infrastructure with AWS but does not inherently protect against a regional disaster unless the on-premises site is in a different geography.

❌ **D. Use AWS Artifact to store application artifacts**: AWS Artifact is a compliance and audit documentation portal, not a disaster recovery or application deployment tool.

💡 **Exam Tip**: **AZ failures** = Multi-AZ. **Region-wide failures** (e.g., natural disaster) = **Multi-Region**. Remember: Regions are geographically separate; AZs are isolated but within the same region.

---

## Q7. How AWS MOST Effectively Reduces Compute Costs for a Growing Startup

How does AWS most effectively reduce compute costs for a growing startup?

- A. Provides on-demand resources for peak usage.
- B. Automates provisioning of individual developer environments.
- C. Automates customer relationship management.
- D. Implements a fixed monthly compute budget.

**Answer: A**

✅ **A. Provides on-demand resources for peak usage**: AWS allows startups to provision exactly the compute capacity they need at any given moment and release it when no longer needed. This eliminates the need to over-provision infrastructure for peak loads, which is a major cost driver in traditional data center environments.

❌ **B. Automates provisioning of individual developer environments**: While Infrastructure as Code tools like CloudFormation can automate environment provisioning, this is not the primary mechanism by which AWS reduces compute costs.

❌ **C. Automates customer relationship management**: CRM automation is a business process capability unrelated to AWS compute cost reduction.

❌ **D. Implements a fixed monthly compute budget**: A fixed budget is a financial control mechanism, not a method for reducing compute costs through efficient resource usage.

💡 **Exam Tip**: AWS core value proposition = **Pay only for what you use** + **No upfront costs** + **Scale up/down on demand**. This replaces the traditional CapEx model of buying hardware for peak capacity.

---

## Q8. AWS Cloud Feature for Fast Time-to-Market and Flexible Requirements

A startup is developing a new application that needs to reach the market quickly, and compliance requirements may need to be adjusted in the near future. Which characteristic of the AWS Cloud meets these specific requirements?

- A. Elasticity
- B. Reliability
- C. Performance
- D. Agility

**Answer: D**

✅ **D. Agility**: Agility in cloud computing refers to the ability to rapidly develop, test, and deploy applications by accessing a broad set of services on demand. AWS enables startups to innovate faster by reducing the time and resources needed to provision infrastructure, allowing teams to experiment and adjust quickly.

❌ **A. Elasticity**: Elasticity refers to the ability to automatically scale resources up or down based on demand; it addresses capacity management, not speed of development or adaptability to changing requirements.

❌ **B. Reliability**: Reliability refers to a system's ability to operate correctly and consistently even in the face of failures; it addresses uptime and fault tolerance, not speed of delivery.

❌ **C. Performance**: Performance refers to the speed, throughput, and efficiency of computing resources; it does not specifically address how quickly new features or applications can be brought to market.

💡 **Exam Tip**: **Agility** = fast innovation + rapid deployment + low cost of experimentation. Think: "fail fast, learn fast." **Elasticity** = auto-scaling capacity. Do not confuse these two terms on the exam.

---

## Q9. AWS Support Plans That Provide the Full Set of Trusted Advisor Checks

Which AWS Support plans provide the full set of AWS Trusted Advisor checks?

- A. Business and Developer Support
- B. Business and Basic Support
- C. Enterprise and Developer Support
- D. Enterprise and Business Support

**Answer: D**

✅ **D. Enterprise and Business Support**: The full suite of AWS Trusted Advisor checks (covering all five categories: Cost Optimization, Performance, Security, Fault Tolerance, and Service Limits) is only available to customers on the **Business** and **Enterprise** support plans.

❌ **A. Business and Developer Support**: Developer Support only provides access to a limited set of core Trusted Advisor checks (7 checks), not the full suite.

❌ **B. Business and Basic Support**: Basic Support provides only the 7 core Trusted Advisor checks; it does not include the full set.

❌ **C. Enterprise and Developer Support**: Developer Support does not include the full Trusted Advisor check suite; it has access to only the core checks.

💡 **Exam Tip**: **Trusted Advisor full checks** = **Business + Enterprise plans only**. Basic and Developer plans = only 7 core checks (security groups, S3 bucket permissions, MFA on root account, etc.).

---

## Q10. Services Protected by Amazon Shield Standard Against DDoS (Choose Two)

Which of the following services have built-in Distributed Denial of Service (DDoS) mitigation through Amazon Shield Standard? (Choose TWO)

- A. AWS WAF
- B. Amazon DynamoDB
- C. Amazon EC2
- D. Amazon CloudFront
- E. Amazon Inspector

**Answer: C, D**

✅ **C. Amazon EC2**: Amazon Shield Standard automatically protects EC2 instances (through Elastic IP addresses and Elastic Load Balancers) against common network and transport layer DDoS attacks at no additional cost.

✅ **D. Amazon CloudFront**: Amazon CloudFront is one of the primary services protected by Amazon Shield Standard, which defends against the most common and frequent DDoS attacks targeting web applications distributed via CloudFront.

❌ **A. AWS WAF**: AWS WAF is a web application firewall that helps protect against application-layer attacks, but it is a separate service from Shield. Shield Standard provides automatic protection; WAF requires manual rule configuration.

❌ **B. Amazon DynamoDB**: While DynamoDB is a highly available service, it is not listed as one of the primary services covered by Shield Standard's automatic DDoS protection.

❌ **E. Amazon Inspector**: Amazon Inspector is a vulnerability assessment service for EC2 instances and container images; it is not a DDoS protection service.

💡 **Exam Tip**: **Amazon Shield Standard** = FREE, automatic DDoS protection for **CloudFront, Route 53, ELB, and EC2**. **Shield Advanced** = paid, enhanced protection with 24/7 DDoS Response Team (DRT) access.

---

## Q11. Cost Factors to Consider When Building a TCO Model for AWS (Choose Three)

When building a Total Cost of Ownership (TCO) model for workloads running on AWS, which cost factors should be considered? (Choose THREE)

- A. Compute costs
- B. Facility costs
- C. Storage costs
- D. Data transfer costs
- E. Network infrastructure costs
- F. Hardware lifecycle costs

**Answer: A, C, D**

✅ **A. Compute costs**: The cost of EC2 instances or other compute services is a direct, ongoing AWS operational expense that must be included in a cloud TCO model.

✅ **C. Storage costs**: AWS charges for data stored in services like S3, EBS, and Glacier, making storage a key variable cost component in a cloud TCO analysis.

✅ **D. Data transfer costs**: AWS charges for data transferred out of AWS (egress) and in some cases between regions or services. These costs must be accounted for in a TCO model.

❌ **B. Facility costs**: Facility costs (rent, power, cooling for data centers) are an on-premises expense that AWS eliminates; they are not a cost factor when running workloads on AWS.

❌ **E. Network infrastructure costs**: Physical networking hardware (switches, routers, cabling) is an on-premises cost that AWS manages; customers do not pay separately for AWS's underlying network infrastructure.

❌ **F. Hardware lifecycle costs**: Hardware purchasing, depreciation, and refresh cycles are on-premises costs. In AWS, there is no customer-owned hardware, so hardware lifecycle costs do not apply.

💡 **Exam Tip**: When comparing on-premises TCO to AWS TCO, on-premises includes **facilities, hardware, networking, and staff**. AWS TCO includes **compute, storage, data transfer, and managed service fees** — no CapEx hardware costs.

---

## Q12. Time-Saving Benefit of Amazon Rekognition

What is a time-saving benefit of using Amazon Rekognition?

- A. Amazon Rekognition provides automatic watermarking of images.
- B. Amazon Rekognition provides automatic detection of objects appearing in photos.
- C. Amazon Rekognition provides the ability to automatically resize millions of images.
- D. Amazon Rekognition uses Amazon Mechanical Turk to let humans bid on object detection tasks.

**Answer: B**

✅ **B. Amazon Rekognition provides automatic detection of objects appearing in photos**: Amazon Rekognition uses deep learning to automatically identify objects, scenes, activities, faces, text, and inappropriate content in images and videos — tasks that would otherwise require significant manual human effort or complex custom ML model development.

❌ **A. Amazon Rekognition provides automatic watermarking of images**: Watermarking is not a feature of Amazon Rekognition; it is a computer vision and ML service, not an image editing tool.

❌ **C. Amazon Rekognition provides the ability to automatically resize millions of images**: Image resizing is not a Rekognition feature. AWS Lambda or custom scripts combined with S3 triggers are typically used for batch image processing.

❌ **D. Amazon Rekognition uses Amazon Mechanical Turk**: Rekognition uses AWS's own deep learning models, not crowdsourced human labor from Mechanical Turk. Mechanical Turk is a separate service for human intelligence tasks.

💡 **Exam Tip**: **Amazon Rekognition** = AI/ML image and video analysis (object detection, facial recognition, content moderation, text in images). No ML expertise required — it is a fully managed API-based service.

---

## Q13. Costs Included When Comparing AWS vs. On-Premises TCO

When comparing AWS to on-premises Total Cost of Ownership (TCO), which cost is included in the on-premises analysis?

- A. Data center security
- B. Business analytics
- C. Project management
- D. Operating system management

**Answer: A**

✅ **A. Data center security**: Physical data center security (guards, cameras, access control, perimeter security) is a direct on-premises cost that companies pay when running their own data centers. AWS absorbs this cost as part of its shared responsibility for security "of" the cloud.

❌ **B. Business analytics**: Business analytics is a software/operational cost that exists regardless of whether infrastructure is on-premises or in the cloud; it is not a differentiating TCO factor.

❌ **C. Project management**: Project management costs are not a hardware/infrastructure TCO component and exist in both on-premises and cloud environments.

❌ **D. Operating system management**: OS management (patching, licensing) is a customer responsibility in both on-premises and IaaS cloud models (like EC2), so it is not a differentiating TCO factor between the two environments.

💡 **Exam Tip**: On-premises TCO includes **physical security, power, cooling, hardware, networking, and real estate**. AWS eliminates these infrastructure costs — use the **AWS Pricing Calculator** or **TCO Calculator** to quantify savings.

---

## Q14. AWS Responsibilities Under the Shared Responsibility Model

According to the AWS Shared Responsibility Model, what is AWS responsible for?

- A. Amazon VPC configuration
- B. Managing application code
- C. Maintaining application traffic
- D. Managing network infrastructure

**Answer: D**

✅ **D. Managing network infrastructure**: AWS is responsible for the physical network infrastructure that underlies all AWS services — this includes the global fiber network, routers, switches, and the hardware that connects AWS regions, Availability Zones, and edge locations. This is part of AWS's responsibility for the "security of the cloud."

❌ **A. Amazon VPC configuration**: Configuring VPCs (subnets, route tables, security groups, NACLs) is the customer's responsibility. AWS provides the VPC service, but the customer controls how it is configured.

❌ **B. Managing application code**: Application code is entirely the customer's responsibility regardless of the deployment model (EC2, Lambda, containers, etc.).

❌ **C. Maintaining application traffic**: Managing application-level traffic (load balancer rules, routing logic, API design) is the customer's responsibility; AWS provides the tools but does not manage how traffic flows within customer applications.

💡 **Exam Tip**: **AWS is responsible for** security/infrastructure **"OF"** the cloud (hardware, physical facilities, global network). **Customers are responsible for** security **"IN"** the cloud (data, OS, applications, IAM, network config).

---

## Q15. Service for Estimating the Cost of Running a New Project on AWS

Which service should you use to estimate the cost of running a new project on AWS?

- A. AWS TCO Calculator
- B. AWS Pricing Calculator
- C. AWS Cost Explorer API
- D. AWS Budgets

**Answer: B**

✅ **B. AWS Pricing Calculator**: The AWS Pricing Calculator (formerly the Simple Monthly Calculator) allows users to estimate the monthly cost of AWS services before deploying them. It is the primary tool for building cost estimates for new projects and architectures.

❌ **A. AWS TCO Calculator**: The AWS TCO Calculator is used to compare the cost of running workloads on-premises versus on AWS; it is designed for migration justification, not estimating costs of new AWS projects.

❌ **C. AWS Cost Explorer API**: Cost Explorer is used to analyze and visualize historical AWS spending and usage; it requires existing usage data and is not used for future project cost estimation.

❌ **D. AWS Budgets**: AWS Budgets allows you to set spending thresholds and receive alerts when costs exceed them; it is a monitoring and alerting tool, not a cost estimation tool.

💡 **Exam Tip**: **AWS Pricing Calculator** = estimate future costs (before deployment). **Cost Explorer** = analyze past costs (after deployment). **AWS Budgets** = set alerts when costs exceed thresholds.

---

## Q16. AWS Tool for Identifying Security Groups with Unrestricted Internet Access

Which AWS tool identifies Security Groups that have unrestricted internet access on a limited list of ports?

- A. AWS Organizations
- B. AWS Trusted Advisor
- C. AWS Usage Reports
- D. Amazon EC2 Dashboard

**Answer: B**

✅ **B. AWS Trusted Advisor**: AWS Trusted Advisor includes a Security category check specifically for identifying EC2 security groups that allow unrestricted access (0.0.0.0/0) on specific ports such as SSH (port 22), RDP (port 3389), and others. It flags these as potential security risks and recommends remediation.

❌ **A. AWS Organizations**: AWS Organizations is a service for managing multiple AWS accounts centrally (billing, policies, SCPs); it does not inspect security group configurations.

❌ **C. AWS Usage Reports**: AWS Usage Reports provide data about resource consumption and costs; they do not analyze security configurations.

❌ **D. Amazon EC2 Dashboard**: The EC2 Dashboard provides an overview of running instances and related resources, but it does not automatically flag insecure security group configurations.

💡 **Exam Tip**: **AWS Trusted Advisor** checks five pillars: **Cost Optimization, Performance, Security, Fault Tolerance, Service Limits**. Security checks include open security groups, S3 bucket permissions, MFA on root, and exposed access keys.

---

## Q17. AWS Service for Creating Alerts Based on Estimated Monthly Bills

Which AWS service can be used to create alerts based on estimated monthly charges?

- A. AWS Config
- B. Amazon CloudWatch
- C. AWS X-Ray
- D. AWS CloudTrail

**Answer: B**

✅ **B. Amazon CloudWatch**: Amazon CloudWatch supports billing alarms that monitor estimated AWS charges. When the estimated monthly bill exceeds a specified threshold, CloudWatch sends an alert via Amazon SNS, enabling proactive cost management.

❌ **A. AWS Config**: AWS Config is a service that tracks configuration changes to AWS resources and evaluates them against compliance rules; it is not used to create billing alerts.

❌ **C. AWS X-Ray**: AWS X-Ray is a distributed tracing service for analyzing application performance and debugging; it has no billing alerting functionality.

❌ **D. AWS CloudTrail**: AWS CloudTrail records API activity and user actions for auditing and governance purposes; it does not create billing-based alerts.

💡 **Exam Tip**: **CloudWatch Billing Alarm** = set a dollar threshold → get an SNS notification when estimated charges exceed it. Must be enabled in the **us-east-1 (N. Virginia)** region as billing metrics are only published there.

---

## Q18. Amazon EC2 Pricing Model with the Largest Discount vs. On-Demand

Which Amazon EC2 pricing model provides the largest discount compared to On-Demand pricing?

- A. Partial Upfront Reserved Instances for a 1-year term
- B. All Upfront Reserved Instances for a 1-year term
- C. All Upfront Reserved Instances for a 3-year term
- D. No Upfront Reserved Instances for a 3-year term

**Answer: C**

✅ **C. All Upfront Reserved Instances for a 3-year term**: Reserved Instances with a 3-year term and full upfront payment provide the maximum possible discount (up to 72% compared to On-Demand). Longer commitment periods and higher upfront payments always result in greater savings.

❌ **A. Partial Upfront Reserved Instances for a 1-year term**: Partial upfront for 1 year offers a smaller discount than full upfront or longer terms.

❌ **B. All Upfront Reserved Instances for a 1-year term**: While all-upfront maximizes savings for a 1-year term, it is still less discounted than a 3-year all-upfront commitment.

❌ **D. No Upfront Reserved Instances for a 3-year term**: No-upfront payment, even for 3 years, provides a lower discount than all-upfront for the same term because the payment flexibility costs more overall.

💡 **Exam Tip**: For maximum EC2 discount, remember: **Longer term (3yr) + All Upfront = Biggest Discount**. The discount hierarchy is: All Upfront > Partial Upfront > No Upfront, and 3-year > 1-year. **Savings Plans** offer similar flexibility but apply more broadly across compute services.

---

## Q19. AWS Responsibility Under the Shared Responsibility Model

Which of the following is AWS's responsibility?

- A. Setting up AWS IAM users and groups
- B. Physically destroying storage media at end of life
- C. Applying patches to the guest operating system
- D. Configuring security settings on Amazon EC2 instances

**Answer: B**

✅ **B. Physically destroying storage media at end of life**: AWS is responsible for the secure decommissioning and physical destruction of storage hardware when it reaches end of life. This is part of AWS's responsibility for the physical security and disposal of infrastructure in its data centers.

❌ **A. Setting up AWS IAM users and groups**: Creating and managing IAM users, groups, roles, and policies is entirely the customer's responsibility. AWS provides IAM as a service, but configuration is up to the customer.

❌ **C. Applying patches to the guest operating system**: For IaaS services like EC2, patching the guest OS is the customer's responsibility. AWS patches the hypervisor and physical infrastructure, but not the OS running inside customer instances.

❌ **D. Configuring security settings on Amazon EC2 instances**: Security group rules, OS firewall settings, application-level security, and instance configuration are all customer responsibilities.

💡 **Exam Tip**: AWS is responsible for **physical destruction of storage media**, **physical access controls**, **hypervisor security**, and **global infrastructure**. Remember: if it's physical hardware or the underlying platform — it's AWS's job.

---

## Q20. Advantages of Using AWS

Which of the following is an advantage of using AWS?

- A. AWS audits user data.
- B. Data is automatically secured.
- C. There is no need to guess capacity requirements.
- D. AWS manages compliance requirements.

**Answer: C**

✅ **C. There is no need to guess capacity requirements**: One of the six advantages of cloud computing defined by AWS is eliminating the need to guess infrastructure capacity. With AWS, you can scale up or down based on actual demand, avoiding both over-provisioning (wasted spend) and under-provisioning (poor performance).

❌ **A. AWS audits user data**: AWS does not audit, access, or manage customer data. The customer is responsible for their own data governance and auditing.

❌ **B. Data is automatically secured**: While AWS provides security tools and a secure underlying infrastructure, data is not automatically secured. Customers must implement appropriate encryption, access controls, and other security measures for their own data.

❌ **D. AWS manages compliance requirements**: AWS provides compliance programs and reports (via AWS Artifact) to help customers meet regulatory requirements, but customers are still responsible for ensuring their own applications and workloads meet compliance standards.

💡 **Exam Tip**: AWS's **6 Advantages of Cloud Computing** include: Trade CapEx for OpEx, Massive economies of scale, **Stop guessing capacity**, Increase speed & agility, Stop spending money on data center maintenance, Go global in minutes. Memorize all six for the exam.

---

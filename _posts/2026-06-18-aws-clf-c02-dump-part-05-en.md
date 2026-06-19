---
title: "AWS CLF-C02 Dump Explained Part 5"
date: 2026-06-18 01:05:00 +0900
categories: [Certification, AWS]
tags: [AWS, CLF-C02, dump, practice, certification]
toc: true
---

Welcome to Part 5 of the AWS CLF-C02 exam prep series. This post covers 20 practice questions translated from Korean into English, each with detailed answer explanations and exam tips to help you pass the AWS Certified Cloud Practitioner exam.

---

## Q1. Consolidating Usage for Volume Discounts Across Multiple AWS Accounts

A company has multiple AWS accounts and wants to combine usage across all accounts to qualify for volume discounts. Which service enables this?

- A. AWS Server Migration Service
- B. AWS Organizations
- C. AWS Budgets
- D. AWS Trusted Advisor
- E. Amazon QuickSight
- F. Amazon Forecast

**Answer: B**

✅ **B. AWS Organizations**: AWS Organizations allows you to consolidate multiple AWS accounts under a single management account. One of its key billing benefits is consolidated billing, which combines usage across all member accounts — enabling volume pricing discounts on services like S3 and EC2.

❌ **A. AWS Server Migration Service**: This service is used to migrate on-premises servers to AWS, not to manage billing across accounts.

❌ **C. AWS Budgets**: AWS Budgets is used to set cost and usage alerts, not to combine usage for discounts.

❌ **D. AWS Trusted Advisor**: Trusted Advisor provides best-practice recommendations across cost, security, and performance — it does not consolidate billing.

❌ **E. Amazon QuickSight**: QuickSight is a business intelligence (BI) and data visualization service, unrelated to billing consolidation.

❌ **F. Amazon Forecast**: Amazon Forecast is a time-series forecasting ML service, not a billing or account management tool.

💡 **Exam Tip**: AWS Organizations = Consolidated Billing + Volume Discounts + Multi-Account Management. Remember: combining usage under one org = lower per-unit pricing.

---

## Q2. Deploying Applications to On-Premises Servers (Select TWO)

Which of the following services can be used to deploy applications to servers running on-premises? (Choose two.)

- A. AWS Elastic Beanstalk
- B. AWS OpsWorks
- C. AWS CodeDeploy
- D. AWS Batch
- E. AWS X-Ray

**Answer: B, C**

✅ **B. AWS OpsWorks**: OpsWorks is a configuration management service that uses Chef and Puppet. It supports managing both AWS cloud resources and on-premises servers, making it suitable for hybrid deployments.

✅ **C. AWS CodeDeploy**: CodeDeploy automates application deployments to Amazon EC2, AWS Lambda, and also on-premises servers, making it one of the few AWS deployment services that explicitly supports on-premises targets.

❌ **A. AWS Elastic Beanstalk**: Elastic Beanstalk is a PaaS service that deploys applications only to AWS-managed environments; it does not support on-premises deployments.

❌ **D. AWS Batch**: AWS Batch is designed to run batch computing jobs in the AWS cloud, not to deploy applications to on-premises servers.

❌ **E. AWS X-Ray**: X-Ray is a distributed tracing and debugging service, not a deployment tool.

💡 **Exam Tip**: On-premises deployment = AWS CodeDeploy + AWS OpsWorks. CodeDeploy supports EC2, Lambda, AND on-premises. OpsWorks = Chef/Puppet-based hybrid configuration management.

---

## Q3. Amazon EC2 Pricing Model That Fluctuates Based on Supply and Demand

Which Amazon EC2 pricing model adjusts its price based on the supply and demand of EC2 instances?

- A. On-Demand Instances
- B. Reserved Instances
- C. Spot Instances
- D. Convertible Reserved Instances

**Answer: C**

✅ **C. Spot Instances**: Spot Instances allow you to purchase unused EC2 capacity at heavily discounted prices. The price fluctuates based on the current supply and demand of EC2 capacity in each Availability Zone. AWS can reclaim Spot Instances with a 2-minute warning when capacity is needed elsewhere.

❌ **A. On-Demand Instances**: On-Demand pricing is fixed per hour or second and does not fluctuate based on supply and demand.

❌ **B. Reserved Instances**: Reserved Instances provide a significant discount (up to 72%) in exchange for a 1- or 3-year commitment; pricing is fixed at purchase time.

❌ **D. Convertible Reserved Instances**: These are a type of Reserved Instance that allows you to change instance attributes, but the pricing is still based on a committed contract, not supply and demand.

💡 **Exam Tip**: Spot Instances = Market-based pricing + Up to 90% discount + Can be interrupted. Best for fault-tolerant, flexible workloads (batch jobs, big data, CI/CD).

---

## Q4. Cloud Architecture Design Principles When Redesigning a Monolithic Application (Select TWO)

When redesigning a large monolithic application, which cloud architecture design principles should be applied? (Choose two.)

- A. Use manual monitoring.
- B. Use fixed servers.
- C. Implement loose coupling.
- D. Rely on individual components.
- E. Design for scalability.

**Answer: C, E**

✅ **C. Implement loose coupling**: Loose coupling means designing components so they interact with each other through well-defined interfaces (e.g., queues, APIs), reducing dependencies. This makes it easier to update, scale, and replace individual components without affecting the entire system.

✅ **E. Design for scalability**: Cloud-native applications should be architected to scale horizontally (adding more instances) or vertically (adding more resources) automatically in response to demand — a core AWS Well-Architected Framework principle.

❌ **A. Use manual monitoring**: AWS recommends automation and automated monitoring (e.g., CloudWatch alarms) rather than manual oversight, which is error-prone and slow.

❌ **B. Use fixed servers**: Cloud architecture favors elastic, dynamic infrastructure over fixed, static servers to optimize cost and availability.

❌ **D. Rely on individual components**: Tightly coupling logic into individual monolithic components is the anti-pattern being replaced; the goal is to decompose into loosely coupled microservices.

💡 **Exam Tip**: AWS Well-Architected Framework key principles include: Loose Coupling, Design for Failure, Scalability, Elasticity, and Automation. These appear frequently on CLF-C02.

---

## Q5. Minimum AWS Support Plan Allowing 1-Hour Response Time for Support Cases

What is the minimum AWS Support plan that provides a target response time of 1 hour for support cases?

- A. Enterprise
- B. Business
- C. Developer
- D. Basic

**Answer: B**

✅ **B. Business**: The AWS Business Support plan provides a 1-hour response time for production system-down cases (Severity 1). It is the minimum plan offering this response time level, and it includes 24/7 access to Cloud Support Engineers via phone, chat, and email.

❌ **A. Enterprise**: Enterprise Support also provides 1-hour (or faster, 15-minute for business-critical) response times, but it is not the *minimum* plan to offer this.

❌ **C. Developer**: The Developer Support plan provides response times of 12–24 business hours for general guidance and 4 hours for system-impaired issues — no 1-hour SLA.

❌ **D. Basic**: Basic Support is free but includes only documentation, whitepapers, and AWS Trusted Advisor (limited checks) — no technical support SLA at all.

💡 **Exam Tip**: Support plan SLAs — Basic: no SLA | Developer: 12–24 hrs general, 4 hrs impaired | Business: 1 hr production down | Enterprise: 15 min business-critical. Business is the minimum for 1-hour response.

---

## Q6. Where to Download AWS Compliance and Audit Reports

Where can AWS compliance and certification reports be downloaded?

- A. AWS Artifact
- B. AWS Concierge
- C. AWS Certificate Manager
- D. AWS Trusted Advisor

**Answer: A**

✅ **A. AWS Artifact**: AWS Artifact is a self-service portal that provides on-demand access to AWS compliance documentation and reports, including SOC reports, PCI DSS documentation, ISO certifications, and other audit artifacts. Customers can download these for their own compliance reviews or to share with auditors.

❌ **B. AWS Concierge**: AWS Concierge is a dedicated billing and account expert available under the Enterprise Support plan; it is not a compliance document portal.

❌ **C. AWS Certificate Manager**: ACM is used to provision, manage, and deploy SSL/TLS certificates for AWS services — not for downloading compliance reports.

❌ **D. AWS Trusted Advisor**: Trusted Advisor provides real-time guidance on AWS best practices across cost, security, fault tolerance, and performance — not compliance documentation downloads.

💡 **Exam Tip**: AWS Artifact = Compliance Reports + Audit Documents + Agreements (BAA, NDA). Think "artifact" as in legal/audit artifacts that prove AWS meets regulatory standards.

---

## Q7. AWS Service Providing a Personalized View of Service Health for a Customer's Workloads

Which AWS service provides a personalized view of the health of specific AWS services that power a customer's workloads running on AWS?

- A. AWS Service Health Dashboard
- B. AWS X-Ray
- C. AWS Personal Health Dashboard
- D. Amazon CloudWatch

**Answer: C**

✅ **C. AWS Personal Health Dashboard**: The AWS Personal Health Dashboard (now called AWS Health) provides alerts and guidance when AWS is experiencing events that may impact you specifically — based on the services and regions you are using. It gives a personalized, account-specific view rather than a general status page.

❌ **A. AWS Service Health Dashboard**: The Service Health Dashboard shows the general health of ALL AWS services globally (status.aws.amazon.com), but it is not personalized to a specific customer's workloads.

❌ **B. AWS X-Ray**: X-Ray is a distributed tracing service for debugging and analyzing application performance — not for monitoring AWS infrastructure health.

❌ **D. Amazon CloudWatch**: CloudWatch monitors the metrics and logs of your AWS resources and applications, but it does not provide AWS-level service health events or incident notifications.

💡 **Exam Tip**: Personal Health Dashboard = Personalized AWS service alerts for YOUR account. Service Health Dashboard = Public, global AWS service status. Key distinction often tested on CLF-C02.

---

## Q8. Benefits of AWS Consolidated Billing

Which of the following is a benefit of the AWS consolidated billing feature?

- A. Volume pricing eligibility
- B. Shared access permissions
- C. Multiple invoices per account
- D. Necessity of tagging

**Answer: A**

✅ **A. Volume pricing eligibility**: Consolidated billing under AWS Organizations combines the usage of all member accounts into a single bill. This aggregated usage means the organization may qualify for volume pricing tiers (e.g., for S3 storage or data transfer), resulting in lower per-unit costs than if each account were billed separately.

❌ **B. Shared access permissions**: Sharing access permissions between accounts is managed by IAM roles, resource-based policies, and AWS Organizations SCPs — not a function of consolidated billing itself.

❌ **C. Multiple invoices per account**: Consolidated billing produces a SINGLE invoice for all member accounts, not multiple — this answer is the opposite of what consolidated billing does.

❌ **D. Necessity of tagging**: Tagging is a best practice for cost allocation and tracking, but it is not a benefit of consolidated billing; it is a separate activity that is optional.

💡 **Exam Tip**: Consolidated Billing benefits = Single invoice + Volume discount eligibility + Combined free tier usage. It is enabled through AWS Organizations.

---

## Q9. Steps a Customer Must Take When Conducting Penetration Testing on AWS

Which of the following describes what a customer must do when performing penetration testing on AWS?

- A. Use Amazon Inspector to perform the penetration test, then notify AWS Support afterward.
- B. Request approval from the customer's internal security team, wait for approval, then perform the test.
- C. Notify AWS Support and immediately begin testing.
- D. Submit a request to AWS Support and wait for approval before testing.

**Answer: D**

✅ **D. Submit a request to AWS Support and wait for approval before testing**: AWS requires customers to request permission before conducting penetration testing against AWS infrastructure. Customers must submit a Penetration Testing Request form through AWS Support and wait for written authorization before proceeding. This protects against unintended security alerts or service disruptions.

❌ **A. Use Amazon Inspector to perform the penetration test, then notify AWS Support afterward**: Amazon Inspector is an automated vulnerability assessment tool — it is not a penetration testing tool. Notifying AWS after the fact also violates AWS policy.

❌ **B. Request approval from the customer's internal security team**: Internal security team approval is good practice but is not sufficient on its own — AWS itself must authorize the testing.

❌ **C. Notify AWS Support and immediately begin testing**: Notification alone is not enough; AWS must formally approve the testing request before it begins.

💡 **Exam Tip**: Penetration Testing on AWS = Prior written approval from AWS required. AWS allows pen testing on services like EC2, RDS, and CloudFront — but always with advance authorization. Amazon Inspector = automated vulnerability scanning (no approval needed).

---

## Q10. AWS Feature That Helps Users Launch Pre-Configured EC2 Instances

Which AWS feature enables users to launch pre-configured Amazon EC2 instances?

- A. Amazon Elastic Block Store (Amazon EBS)
- B. Amazon Machine Image (AMI)
- C. Amazon EC2 Systems Manager
- D. Amazon AppStream 2.0

**Answer: B**

✅ **B. Amazon Machine Image (AMI)**: An AMI is a template that contains the software configuration (OS, application server, applications) required to launch an EC2 instance. Users can use AWS-provided AMIs, purchase from the AWS Marketplace, or create their own custom AMIs to launch pre-configured instances consistently.

❌ **A. Amazon Elastic Block Store (Amazon EBS)**: EBS is a block storage service used to attach persistent storage volumes to EC2 instances — it is not a template for launching instances.

❌ **C. Amazon EC2 Systems Manager**: AWS Systems Manager provides operational management capabilities (patching, inventory, run commands) for EC2 instances after they are running — it does not define the initial instance configuration.

❌ **D. Amazon AppStream 2.0**: AppStream 2.0 is a fully managed application streaming service for delivering desktop applications to users via a browser — unrelated to EC2 instance launch templates.

💡 **Exam Tip**: AMI = EC2 launch template (OS + software + configuration). Think of it as a "snapshot blueprint." Custom AMIs allow you to replicate the same environment across many instances quickly.

---

## Q11. How AWS Customers Can Easily Apply Common Access Controls to Large Numbers of Users

How can AWS customers easily apply common access controls to a large number of users?

- A. Apply an IAM policy to an IAM group.
- B. Apply an IAM policy to an IAM role.
- C. Apply the same IAM policy to every IAM user who needs access to the same workload.
- D. Apply an IAM policy to an Amazon Cognito user pool.

**Answer: A**

✅ **A. Apply an IAM policy to an IAM group**: IAM groups allow you to assign permissions to multiple users at once. By attaching a policy to a group, all users added to that group automatically inherit those permissions. This is far more scalable and manageable than setting policies on individual users.

❌ **B. Apply an IAM policy to an IAM role**: IAM roles are meant for granting permissions to AWS services, applications, or federated users — not for managing a large group of human users with common access.

❌ **C. Apply the same IAM policy to every IAM user individually**: This approach is operationally inefficient at scale and error-prone; if the policy needs to change, every user must be updated individually.

❌ **D. Apply an IAM policy to an Amazon Cognito user pool**: Cognito user pools manage end-user authentication for web/mobile applications and are not an IAM mechanism for controlling AWS resource access at scale.

💡 **Exam Tip**: IAM best practice = Manage permissions via Groups, not individual users. User -> Group -> Policy is the scalable pattern. Never assign policies to many individual users when a group can do it.

---

## Q12. Technology That Adjusts Computing Capacity Based on Load Changes

Which technology enables computing capacity to be adjusted in response to changes in load?

- A. Load balancing
- B. Automatic failover
- C. Round robin
- D. Auto Scaling

**Answer: D**

✅ **D. Auto Scaling**: AWS Auto Scaling automatically adjusts the number of EC2 instances (or other resources) up or down in response to changing demand. It ensures you have the right amount of compute capacity to handle current traffic while minimizing costs during low-demand periods.

❌ **A. Load balancing**: A load balancer (e.g., Elastic Load Balancing) distributes incoming traffic across multiple instances, but it does not add or remove capacity — it only routes traffic to existing instances.

❌ **B. Automatic failover**: Failover automatically redirects traffic to a standby resource when the primary one fails — it is about high availability, not scaling capacity to match demand.

❌ **C. Round robin**: Round robin is a basic traffic routing algorithm that distributes requests evenly across servers — it is a load-balancing method, not a capacity adjustment mechanism.

💡 **Exam Tip**: Auto Scaling = Elasticity = Adding/removing instances automatically based on demand. ELB distributes traffic; Auto Scaling changes the number of instances. These two often work together.

---

## Q13. AWS Services Defined as Global (Not Regional) Services (Select TWO)

Which of the following AWS services are global services rather than regional services? (Choose two.)

- A. Amazon Route 53
- B. Amazon EC2
- C. Amazon S3
- D. Amazon CloudFront
- E. Amazon DynamoDB

**Answer: A, D**

✅ **A. Amazon Route 53**: Route 53 is a global DNS service. It is not tied to any specific AWS region and operates across AWS's global network to route end-user requests to the appropriate endpoints worldwide.

✅ **D. Amazon CloudFront**: CloudFront is a global Content Delivery Network (CDN) service. It uses a worldwide network of edge locations to deliver content with low latency — its configuration is global, not region-specific.

❌ **B. Amazon EC2**: EC2 is a regional service. Instances are launched in specific regions and Availability Zones, and resources are not automatically shared across regions.

❌ **C. Amazon S3**: While S3 bucket names are globally unique, S3 buckets are actually created in and tied to a specific AWS region. It is a regional service.

❌ **E. Amazon DynamoDB**: DynamoDB is a regional service by default. While DynamoDB Global Tables can replicate across regions, the base service itself is regional.

💡 **Exam Tip**: Global AWS services = IAM, Route 53, CloudFront, AWS WAF (global), Organizations. Regional services = EC2, S3, RDS, Lambda, DynamoDB. IAM + Route 53 + CloudFront is the classic global trio tested on CLF-C02.

---

## Q14. Customer Responsibilities in the Shared Responsibility Model (Select TWO)

Which of the following are the customer's responsibilities under the AWS Shared Responsibility Model? (Choose two.)

- A. Ensuring encryption of application data at rest
- B. Ensuring AWS NTP servers are set to the correct time
- C. Ensuring users receive security training on AWS service usage
- D. Ensuring access to data centers is restricted
- E. Ensuring hardware is properly decommissioned

**Answer: A, C**

✅ **A. Ensuring encryption of application data at rest**: Customers are responsible for securing their own data, including choosing whether to encrypt data at rest using services like AWS KMS, S3 server-side encryption, or EBS encryption. AWS provides the tools; the customer decides and implements.

✅ **C. Ensuring users receive security training on AWS service usage**: Security awareness and training for personnel who use AWS services is a customer responsibility. AWS provides the infrastructure security; customers are responsible for people, processes, and governance within their own organizations.

❌ **B. Ensuring AWS NTP servers are set to the correct time**: The configuration and maintenance of AWS infrastructure — including NTP time servers — is AWS's responsibility, not the customer's.

❌ **D. Ensuring access to data centers is restricted**: Physical data center security (access controls, surveillance, environmental controls) is entirely AWS's responsibility as part of "security OF the cloud."

❌ **E. Ensuring hardware is properly decommissioned**: Hardware lifecycle management, including secure decommissioning, is AWS's responsibility. Customers do not own or manage the physical hardware.

💡 **Exam Tip**: Shared Responsibility = AWS secures the cloud (hardware, facilities, global infrastructure); Customer secures IN the cloud (data, IAM, OS patching, encryption, app security). A helpful phrase: AWS = "Security OF the cloud"; Customer = "Security IN the cloud."

---

## Q15. AWS Service Used to Manually Launch Instances Based on Resource Requirements

Which AWS service can be used to manually launch instances based on specific resource requirements?

- A. Amazon EBS
- B. Amazon S3
- C. Amazon EC2
- D. Amazon ECS

**Answer: C**

✅ **C. Amazon EC2**: Amazon Elastic Compute Cloud (EC2) allows customers to manually select and launch virtual server instances with specific configurations — including instance type (CPU, memory), operating system, storage, and networking — to match their resource requirements.

❌ **A. Amazon EBS**: EBS is a block storage service that provides persistent storage volumes attached to EC2 instances — it does not launch compute instances.

❌ **B. Amazon S3**: S3 is an object storage service used to store and retrieve files — it has no compute instance functionality.

❌ **D. Amazon ECS**: Amazon Elastic Container Service (ECS) is a container orchestration service for running Docker containers. While it uses underlying EC2 instances (or Fargate), ECS itself manages containers, not traditional server instances manually launched by the user.

💡 **Exam Tip**: EC2 = Resizable virtual machines (IaaS). You choose instance type, OS, and specs. EC2 is the foundational compute service tested heavily on CLF-C02.

---

## Q16. Most Cost-Effective Pricing Structure for a 3-Year Continuous Workload Migration

A company is migrating an application that will run a continuous, uninterrupted workload for a 3-year period. Which pricing structure provides the most cost-effective solution?

- A. Amazon EC2 Spot Instances
- B. Amazon EC2 Dedicated Instances
- C. Amazon EC2 On-Demand Instances
- D. Amazon EC2 Reserved Instances

**Answer: D**

✅ **D. Amazon EC2 Reserved Instances**: For steady-state, continuous workloads with predictable usage over a 1- or 3-year period, Reserved Instances offer the greatest cost savings — up to 72% compared to On-Demand pricing. The 3-year term provides the maximum discount.

❌ **A. Amazon EC2 Spot Instances**: Spot Instances are cheapest per hour, but they can be interrupted by AWS with only 2 minutes' notice. They are not suitable for continuous, uninterrupted workloads.

❌ **B. Amazon EC2 Dedicated Instances**: Dedicated Instances run on hardware dedicated to a single customer (for compliance/licensing reasons) and cost significantly more than standard instances. They are not the most cost-effective option.

❌ **C. Amazon EC2 On-Demand Instances**: On-Demand is the most flexible but most expensive option for sustained workloads. It is best for short-term or unpredictable usage.

💡 **Exam Tip**: Pricing model selection — Steady + Long-term = Reserved Instances (max savings). Unpredictable/short = On-Demand. Fault-tolerant/flexible = Spot (cheapest but interruptible). Dedicated = Compliance/licensing needs.

---

## Q17. Financial Benefits of Using AWS (Select TWO)

Which of the following are financial benefits of using AWS? (Choose two.)

- A. Reduction of Total Cost of Ownership (TCO)
- B. Increased capital expenditure (CapEx)
- C. Reduction of operating expenses (OpEx)
- D. Deferred payment plans for startup costs
- E. Business credit lines for startups

**Answer: A, C**

✅ **A. Reduction of Total Cost of Ownership (TCO)**: AWS eliminates the need to purchase, maintain, and operate physical data centers and servers. By shifting to the cloud, organizations reduce their overall TCO by avoiding hardware procurement, facilities costs, and ongoing maintenance expenses.

✅ **C. Reduction of operating expenses (OpEx)**: With AWS, IT costs shift from large upfront capital investments to variable, pay-as-you-go operating expenses. AWS manages infrastructure undifferentiated heavy lifting, reducing ongoing operational costs for customers.

❌ **B. Increased capital expenditure (CapEx)**: AWS actually REDUCES capital expenditure — customers no longer need to buy physical servers or data center equipment. This is a core financial benefit, not an increase.

❌ **D. Deferred payment plans for startup costs**: AWS does not offer deferred payment plans as a standard financial benefit. Costs are incurred on a pay-as-you-go model.

❌ **E. Business credit lines for startups**: While AWS has programs like AWS Activate that provide credits to startups, a "business credit line" is not a standard financial benefit of AWS cloud adoption.

💡 **Exam Tip**: AWS financial benefits = CapEx to OpEx conversion + TCO reduction + No upfront investment + Pay only for what you use + Economies of scale. These themes appear frequently in CLF-C02 scenario questions.

---

## Q18. AWS Cost Management Tool for the Most Granular Billing Data

Which AWS cost management tool provides the most detailed data about your AWS bill?

- A. AWS Cost Explorer
- B. AWS Budgets
- C. AWS Cost and Usage Report (CUR)
- D. AWS Billing Dashboard

**Answer: C**

✅ **C. AWS Cost and Usage Report (CUR)**: The AWS Cost and Usage Report is the most comprehensive and granular source of AWS cost and usage data available. It provides line-item details for every AWS service used, down to the hour and resource level. The report can be delivered to an S3 bucket and queried with Athena or loaded into a data warehouse for deep analysis.

❌ **A. AWS Cost Explorer**: Cost Explorer provides interactive charts and reports for visualizing spending trends and forecasting future costs — useful for analysis, but not as granular as the full CUR data.

❌ **B. AWS Budgets**: AWS Budgets allows you to set custom cost and usage thresholds and receive alerts — it is a monitoring/alerting tool, not a detailed billing data source.

❌ **D. AWS Billing Dashboard**: The Billing Dashboard provides a high-level overview of your current month's charges and payment history — it offers summary-level data, not line-item granularity.

💡 **Exam Tip**: Cost and Usage Report (CUR) = Most granular billing data available. Cost Explorer = Visual trends and forecasting. Budgets = Alerts when thresholds exceeded. Billing Dashboard = High-level monthly summary.

---

## Q19. Features That Can Be Used to Launch a New Amazon RDS Cluster (Select TWO)

Which of the following can an AWS customer use to launch a new Amazon RDS cluster? (Choose two.)

- A. AWS Concierge
- B. AWS CloudFormation
- C. Amazon Simple Storage Service (Amazon S3)
- D. Amazon EC2 Auto Scaling
- E. AWS Management Console

**Answer: B, E**

✅ **B. AWS CloudFormation**: CloudFormation is an Infrastructure as Code (IaC) service that allows you to define and provision AWS resources — including RDS clusters — using JSON or YAML templates. It automates and repeatable infrastructure deployment.

✅ **E. AWS Management Console**: The AWS Management Console is a web-based graphical interface that allows customers to launch and manage AWS services, including creating and configuring new Amazon RDS database clusters through a point-and-click interface.

❌ **A. AWS Concierge**: AWS Concierge is a dedicated support expert available under Enterprise Support for billing and account inquiries — it is not a technical provisioning service.

❌ **C. Amazon Simple Storage Service (Amazon S3)**: S3 is an object storage service and has no capability to launch or provision database instances.

❌ **D. Amazon EC2 Auto Scaling**: EC2 Auto Scaling automatically adjusts the number of EC2 instances based on demand — it does not provision RDS database clusters.

💡 **Exam Tip**: RDS can be launched via: AWS Management Console, AWS CLI, AWS SDKs, AWS CloudFormation (IaC), and AWS CDK. On CLF-C02, remember that both Console (manual) and CloudFormation (automated/IaC) are valid provisioning methods.

---

## Q20. AWS Cloud Architecture Design Principles

Which of the following is an AWS cloud architecture design principle?

- A. Implement a single point of failure
- B. Implement loose coupling
- C. Implement a monolithic design
- D. Implement vertical scaling

**Answer: B**

✅ **B. Implement loose coupling**: Loose coupling is a fundamental AWS Well-Architected Framework design principle. By reducing interdependencies between components (using queues like SQS, APIs, or event-driven architectures), systems become more resilient — failures in one component do not cascade to others.

❌ **A. Implement a single point of failure**: AWS architecture explicitly recommends ELIMINATING single points of failure, not implementing them. Designs should use multiple Availability Zones, redundancy, and failover mechanisms.

❌ **C. Implement a monolithic design**: AWS encourages decomposing monolithic applications into loosely coupled microservices or serverless components, not building monolithic architectures that are difficult to scale and maintain.

❌ **D. Implement vertical scaling**: While vertical scaling (adding more resources to a single instance) is possible, AWS architecture best practices favor horizontal scaling (adding more instances) because it is more resilient and cost-effective at scale.

💡 **Exam Tip**: AWS Well-Architected Framework design principles: Design for failure, Loose coupling, Elasticity (horizontal scaling), Automation, Think services not servers. "Loose coupling" and "Design for failure" are the two most commonly tested architecture principles on CLF-C02.

---

*This post is part of the AWS CLF-C02 exam preparation series. Practice these questions, study the explanations, and use the exam tips to reinforce key AWS concepts before your exam.*

---
title: "Essential CS Knowledge for Interviews: Core Network, Infra, Cloud & Linux Comparisons"
date: 2026-07-01 09:00:00 +0900
categories: [Study, Network]
tags: [Networking, Infrastructure, Cloud, AWS, Linux, TCP, UDP, LoadBalancer, SecurityGroup, NACL, Interview]
toc: true
---

As a CS graduate and engineer, you should be able to answer **"what's the difference between the two?"** cleanly whenever it comes up in an interview or on the job. Here's a rundown of the core network / infra / cloud / Linux comparisons that come up again and again — not just the definitions, but where each concept applies, how it's controlled, and whether it tracks state.

---

## 1. [Cloud/Network] ALB (Application Load Balancer) vs NLB (Network Load Balancer)

These are the two main load balancer types used to distribute traffic when designing cloud infrastructure. Which OSI layer each one operates at completely determines its technical characteristics.

| Aspect | ALB (Application Load Balancer) | NLB (Network Load Balancer) |
| --- | --- | --- |
| **Layer** | **Layer 7 (Application layer)** | **Layer 4 (Transport layer)** |
| **Routing basis** | HTTP/HTTPS headers, URL path, cookie patterns, etc. | IP address, port number, protocol |
| **Static IP** | IP is not fixed (access via DNS name) | Supports **static IP (Elastic IP)** |
| **Throughput** | Relatively slower — it has to inspect the payload | **Extremely fast** — forwards based on the header alone (millions of packets/sec) |
| **Distinguishing features** | SSL certificate offloading, path-based routing | Suited for massive traffic (real-time gaming, financial messaging) |

---

## 2. [Infra/Cloud] NAT Gateway vs Internet Gateway (IGW)

These are the gateways that decide how resources inside a VPC talk to the outside internet. The key distinction is **bidirectional vs. one-directional**.

| Aspect | Internet Gateway (IGW) | NAT Gateway |
| --- | --- | --- |
| **Direction** | **Bidirectional** (both inbound and outbound) | **One-directional** (outbound only) |
| **Placement** | Public subnet | Sits in the public subnet to shield private resources |
| **Main purpose** | Connects resources that external users must reach, like web servers | Used when a resource (e.g., a database) **must be hidden from inbound access but still needs outbound internet** for patches/updates |
| **NAT mapping** | 1:1 mapping (Private IP ↔ Public IP) | N:1 mapping (many private IPs → one NAT public IP) |

---

## 3. [Linux/Infra] Hard Link vs Symbolic Link (Soft Link)

A classic question used to check whether you actually understand the Linux filesystem's inode structure.

| Aspect | Hard Link | Symbolic (Soft) Link |
| --- | --- | --- |
| **Concept** | Another name that **points directly to the original file's inode** | A shortcut that **points to the original file's path** |
| **If the original is deleted** | The link **still works** (data is preserved) | The link **breaks** (dangling/broken link) |
| **Linking directories** | Not allowed | Allowed |
| **Across filesystems** | Only within the same filesystem (disk partition) | Can span different filesystems |
| **Size on disk** | Reported as the same size as the original (doesn't use extra space) | Takes up only the tiny space needed for the path string |

---

## 4. [Network] TCP (Transmission Control Protocol) vs UDP (User Datagram Protocol)

The two core transport-layer (L4) protocols, illustrating the classic reliability-vs-speed trade-off.

| Aspect | TCP | UDP |
| --- | --- | --- |
| **Connection** | **Connection-oriented** (establishes a connection via a 3-way handshake) | **Connectionless** (fires packets with no setup) |
| **State** | **Stateful** — flow/congestion control via sequence and ACK numbers | **Stateless** — doesn't track whether packets arrived |
| **Reliability/order** | Retransmits lost packets, **guarantees order and high reliability** | Packets can be lost, **no ordering guarantee** |
| **Speed** | Relatively slow (lots of acknowledgment overhead) | **Very fast** (almost no overhead) |
| **Typical use** | Web browsing (HTTP), file transfer (FTP), email (SMTP) | Real-time streaming, online gaming, DNS lookups |

---

## 5. [Cloud/Infra] Virtual Machine (VM) vs Container (Docker)

The virtualization technologies underpinning modern infrastructure architecture. The key question: **do you boot an entire OS, or share the host kernel?**

| Aspect | VM (e.g., AWS EC2, VMware) | Container (e.g., Docker) |
| --- | --- | --- |
| **Virtualization level** | **Hardware-level** virtualization | **OS-level (process isolation)** virtualization |
| **Guest OS** | Each VM needs its own **guest OS** (heavy, large) | **No guest OS** — shares the host OS kernel |
| **Startup time** | Requires an OS boot, so it takes minutes | Just spinning up a process, so it starts in **seconds or less** |
| **Resource isolation** | Complete, independent isolation via a hypervisor | Logical isolation via Linux namespaces and cgroups |
| **Image size** | Typically several GB to tens of GB | Typically a few MB to a few hundred MB — lightweight and portable |

---

## 6. [Cloud/Security] Security Group vs NACL (Network ACL)

Two firewall concepts in AWS-style cloud environments that are frequently confused. The distinction comes down to **subnet-level vs. instance-level**, and **allow-and-deny vs. allow-only**.

### 6-1. Key differences at a glance

| Aspect | NACL (Network ACL) | Security Group |
| --- | --- | --- |
| **Scope** | **Subnet level** | **Instance level** |
| **Control model** | Can explicitly define both **Allow and Deny** rules | Can only define **Allow** rules (everything else is denied by default) |
| **State** | **Stateless** | **Stateful** |
| **Rule evaluation** | Evaluated in numbered order | All rules evaluated, then applied |

### 6-2. Subnet level vs. instance level

- **NACL (subnet level):** Think of it as a massive gate at the entrance of the walled subnet. Every instance inside that subnet is behind this gate — traffic **must pass through it first**.
- **Security Group (instance level):** Think of it as a personal bodyguard standing right in front of each instance. Even after clearing the gate (NACL), you still need the bodyguard's permission to reach the individual server.

### 6-3. Allow-and-deny vs. allow-only

- **NACL (both Allow and Deny):** You can not only say "let 10.0.0.5 in (Allow)," but also **explicitly block a specific IP or CIDR range** with "never let blacklisted 20.0.0.9 in (Deny)."
- **Security Group (allow-only):** This is a whitelist model — "only let in who I've explicitly allowed." Everything is denied by default, and you can only add Allow rules like "allow port 80." You cannot write a rule that singles out one malicious IP and denies just that one.

### 6-4. Why the difference exists (stateless vs. stateful)

The most important technical distinction is whether the mechanism "remembers" state.

- **Security Group (Stateful):** The bodyguard has a good memory. If someone was let in on the way inbound, they're waved out on the way out **without a second check** — inbound is allowed → outbound is automatically allowed.
- **NACL (Stateless):** No memory at all. Even if someone passed a strict inbound check, on the way out it asks again: **"Who are you? Is your name on the outbound rule list?"** That's why with NACLs you have to write inbound and outbound rules **separately** for traffic to actually flow both ways.

---

These comparisons are the kind of knowledge that gives you a logical basis for **"why choose this technology"** when designing systems or troubleshooting as a CS engineer. Deeper mechanics — like the TCP handshake sequence or the Linux inode structure — are worth a dedicated follow-up post.

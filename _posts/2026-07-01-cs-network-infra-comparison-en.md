---
title: "Undergraduate CS Concepts Every Engineer Should Know"
date: 2026-07-01 09:00:00 +0900
categories: [Study, CS]
tags: [Networking, Infrastructure, Cloud, AWS, Linux, OS, ComputerArchitecture, SystemsProgramming, TCP, UDP, Process, Thread, Memory]
toc: true
---

As an engineer, you should be able to answer **"what's the difference between the two?"** cleanly — this is a running collection of undergraduate-level CS concepts that come up again and again. It starts with networking, infra, cloud, and Linux, and now extends into operating systems, computer architecture, and systems programming — covering not just the definitions, but where each concept applies, how it's controlled, and whether it tracks state. New topics get added here as they come up.

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

## 7. [OS] Process vs Thread

The most fundamental concept in how an operating system divides and isolates units of execution.

| Aspect | Process | Thread |
| --- | --- | --- |
| **Memory space** | **Independent** — separate Code, Data, Heap, and Stack | Code/Data/Heap are **shared**; only the Stack is per-thread |
| **Creation/switch cost** | Heavy (expensive context switching) | Light (cheap context switching) |
| **Communication** | Requires IPC (pipes, sockets, shared memory, etc.) | Communicates simply via shared globals/memory |
| **Failure blast radius** | One process crashing doesn't affect others | One thread's error can crash the entire process |
| **Typical example** | Each browser tab as an isolated process | The UI-rendering/networking threads inside a tab |

---

## 8. [OS] Mutex vs Semaphore

Both are synchronization primitives, but the distinction is **an ownership-based lock vs. a counter-based signal**.

| Aspect | Mutex | Semaphore |
| --- | --- | --- |
| **Purpose** | Mutual exclusion — only one thread accesses at a time | Controls resource count — allows up to N concurrent accesses |
| **Ownership** | Only the thread that acquired the lock can release it | No ownership — any thread can signal it |
| **Value range** | Binary (0 or 1) | Counting (0 to N) |
| **Typical use** | Protecting a critical section | Managing a limited resource pool, e.g., a connection pool |

---

## 9. [OS] Paging vs Segmentation

Both are virtual memory management techniques, but the key question is **fixed-size blocks vs. variable-size, logically meaningful blocks**.

| Aspect | Paging | Segmentation |
| --- | --- | --- |
| **Unit of division** | Fixed-size pages | Variable-size segments (logical units: code, data, stack, etc.) |
| **External fragmentation** | None | Can occur |
| **Internal fragmentation** | Can occur (wasted space in the last page) | Rare |
| **Address translation** | Page table (page number + offset) | Segment table (segment number + offset) |
| **Visibility to programmer** | Transparent — the OS handles it invisibly | Reflects the program's actual logical structure |

---

## 10. [Computer Architecture] CISC vs RISC

Two competing philosophies for designing a CPU's instruction set (ISA): **fewer, complex instructions vs. more, simple ones executed fast**.

| Aspect | CISC (Complex Instruction Set Computer) | RISC (Reduced Instruction Set Computer) |
| --- | --- | --- |
| **Instruction characteristics** | Many, complex instructions (one instruction does several things) | Few, simple instructions (goal: one instruction per clock cycle) |
| **Instruction length** | Variable | Fixed |
| **Where complexity lives** | Hardware (microcode) absorbs the complexity | The compiler takes on more of the optimization burden |
| **Typical example** | x86 (Intel, AMD) | ARM, RISC-V |
| **Power efficiency** | Relatively lower | Relatively higher — favored in mobile/low-power devices |

---

## 11. [Computer Architecture] Big-Endian vs Little-Endian

The difference in **byte order** when storing multi-byte data in memory.

| Aspect | Big-Endian | Little-Endian |
| --- | --- | --- |
| **Storage order** | Most significant byte (MSB) stored at the lowest address | Least significant byte (LSB) stored at the lowest address |
| **Human readability** | Intuitive — matches the order humans write numbers | Not intuitive |
| **Typical use** | Network protocols (network byte order) | x86/x64 CPUs, ARM (default) |
| **Example (0x12345678)** | `12 34 56 78` | `78 56 34 12` |

---

## 12. [Systems Programming] Stack vs Heap

The two memory regions used during program execution, differing in **who decides allocation/deallocation, and when**.

| Aspect | Stack | Heap |
| --- | --- | --- |
| **Allocation/deallocation** | Determined at compile time; auto-freed when a function returns | Managed at runtime by the developer (malloc/free) or a GC |
| **Speed** | Very fast — just moving a pointer | Relatively slow — the allocator has to search for free space |
| **Size** | Limited (stack overflow if exceeded) | Relatively large (bounded by system memory) |
| **Data structure** | LIFO (local variables, call frames) | No inherent order — accessed via pointers |
| **Typical failure** | Stack overflow (e.g., excessive recursion) | Memory leaks, use-after-free |

---

## 13. [Systems Programming] Static Linking vs Dynamic Linking

The difference is **when the library code gets bundled into the compiled program**.

| Aspect | Static Linking | Dynamic Linking |
| --- | --- | --- |
| **When linking happens** | Compile time — library code is embedded in the executable | Runtime — a `.so`/`.dll` is loaded when the program runs |
| **Executable size** | Larger (includes the library) | Smaller (library lives in a separate file) |
| **Runtime speed** | Faster (no loading overhead) | Relatively slower (the dynamic loader gets involved) |
| **Memory efficiency** | Each process loads its own copy of the library | Multiple processes share one copy of the library (saves memory) |
| **Deployment/updates** | Requires a recompile when the library changes | Swapping the library file alone is enough, e.g. for a security patch |

---

## 14. [Systems Programming] Blocking I/O vs Non-blocking I/O

The difference is **whether the calling thread waits for the I/O operation to finish**. (Note: this is a different axis from sync vs. async.)

| Aspect | Blocking I/O | Non-blocking I/O |
| --- | --- | --- |
| **Calling thread state** | Blocked/waiting until the I/O completes | Returns immediately; the thread can keep doing other work |
| **Resource efficiency** | A waiting thread can't do anything else (wasted resource) | A single thread can handle many I/O operations concurrently |
| **Implementation complexity** | Simple — sequential code flow | More complex — needs an event loop, callbacks, or polling |
| **Typical example** | Traditional `read()`/`write()` system calls | `epoll`/`select`, Node.js's event loop, `io_uring` |

---

These comparisons are the kind of knowledge that gives you a logical basis for **"why choose this technology"** when designing systems or troubleshooting as a CS engineer. More undergraduate CS concepts will keep getting added to this post over time.

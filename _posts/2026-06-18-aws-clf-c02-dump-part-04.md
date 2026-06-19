---
title: "AWS CLF-C02 덤프 해설 Part 4"
date: 2026-06-18 00:04:00 +0900
categories: [자격증, AWS]
tags: [AWS, CLF-C02, 덤프, 문제풀이, 자격증]
toc: true
---

AWS CLF-C02 시험 대비 덤프 문제 Part 4입니다. 총 20문제에 대한 정답과 상세 해설을 제공합니다.

---

## Q1. AWS 관리 서비스의 이점

Amazon ElastiCache 및 Amazon RDS(Amazon Relational Database Service)와 같은 AWS 관리 서비스를 사용하면 어떤 이점이 있습니까?

- A. 장애가 발생한 인스턴스를 모니터링하고 교체해야 합니다.
- B. 고객이 관리하는 서비스보다 성능이 우수합니다.
- C. 기본 OS 패치 및 업데이트를 단순화합니다.
- D. 고객이 인스턴스 유형이나 크기를 최적화할 필요가 없습니다.

**정답: C**

✅ **C. 기본 OS 패치 및 업데이트를 단순화합니다.**: AWS 관리형 서비스(Managed Service)의 핵심 이점은 운영 부담 감소입니다. RDS나 ElastiCache 같은 서비스는 AWS가 운영 체제 패치, 데이터베이스 소프트웨어 업데이트 등의 유지 관리 작업을 대신 처리해 주므로, 고객은 인프라 관리 대신 애플리케이션 개발에 집중할 수 있습니다.

❌ **A. 장애가 발생한 인스턴스를 모니터링하고 교체해야 합니다.**: 관리형 서비스를 사용하는 가장 큰 이유 중 하나가 바로 이런 운영 부담을 AWS에게 넘기는 것입니다. 고객이 직접 모니터링하고 교체해야 한다면 관리형 서비스의 이점이 없습니다.

❌ **B. 고객이 관리하는 서비스보다 성능이 우수합니다.**: AWS 관리형 서비스가 반드시 더 높은 성능을 보장하지는 않습니다. 성능은 인스턴스 크기, 설정, 워크로드 특성에 따라 달라지며, 관리형 서비스의 이점은 성능보다는 운영 편의성에 있습니다.

❌ **D. 고객이 인스턴스 유형이나 크기를 최적화할 필요가 없습니다.**: 관리형 서비스를 사용하더라도 고객은 여전히 워크로드에 맞는 인스턴스 유형과 크기를 선택하고 최적화해야 합니다. AWS는 인프라 운영을 대신하지만, 리소스 사이징 결정은 여전히 고객의 몫입니다.

💡 **시험 꿀팁**: AWS 관리형 서비스(Managed Service)의 핵심 = OS 패치 자동화 + 백업 관리 + 고가용성 설정. RDS, ElastiCache, DynamoDB 등이 대표적이며, 공통 이점은 "운영 오버헤드 감소(Reduced Operational Overhead)"입니다.

---

## Q2. 무제한 객체 스토리지 서비스

내구성이 뛰어난 온라인 객체 스토리지를 사실상 무제한으로 제공하는 서비스는 무엇입니까?

- A. Amazon Redshift
- B. Amazon Elastic 파일 시스템(Amazon EFS)
- C. Amazon Elastic Container Service(Amazon ECS)
- D. Amazon S3

**정답: D**

✅ **D. Amazon S3**: Amazon S3(Simple Storage Service)는 객체 스토리지 서비스로, 99.999999999%(11개의 9) 내구성을 제공하며 용량 제한 없이 사실상 무제한의 데이터를 저장할 수 있습니다. 이미지, 동영상, 백업 파일 등 모든 종류의 비정형 데이터를 저장하는 데 최적화된 서비스입니다.

❌ **A. Amazon Redshift**: Redshift는 데이터 웨어하우스 서비스로, 대규모 데이터 분석과 SQL 쿼리를 위한 서비스입니다. 객체 스토리지가 아닌 관계형 데이터 분석용 서비스입니다.

❌ **B. Amazon EFS(Elastic File System)**: EFS는 파일 시스템 스토리지로 NFS 프로토콜을 사용하며, 여러 EC2 인스턴스에서 동시에 접근할 수 있는 공유 파일 스토리지입니다. 객체 스토리지가 아닌 파일 스토리지입니다.

❌ **C. Amazon ECS(Elastic Container Service)**: ECS는 Docker 컨테이너를 실행하고 관리하는 컨테이너 오케스트레이션 서비스입니다. 스토리지 서비스가 아닙니다.

💡 **시험 꿀팁**: 스토리지 유형 구분 — S3 = 객체(Object) 스토리지 + 무제한 + 내구성 11 9s / EBS = 블록(Block) 스토리지 + EC2 전용 / EFS = 파일(File) 스토리지 + 다중 EC2 공유 / Glacier = 아카이브 스토리지 + 저렴한 장기 보관.

---

## Q3. AWS CLI 액세스 키와 연관된 IAM 엔티티

다음 중 AWS CLI(AWS 명령줄 인터페이스)를 사용할 때 액세스 키 ID 및 비밀 액세스 키와 연관된 IAM(ID and Access Management) 엔티티는 무엇입니까?

- A. IAM 그룹
- B. IAM 사용자
- C. IAM 역할
- D. IAM 정책

**정답: B**

✅ **B. IAM 사용자**: 액세스 키 ID와 비밀 액세스 키는 IAM 사용자(User)에게 발급됩니다. AWS CLI나 SDK를 통해 프로그래밍 방식으로 AWS에 접근할 때 사용하며, 각 IAM 사용자는 최대 2개의 액세스 키 세트를 가질 수 있습니다.

❌ **A. IAM 그룹**: IAM 그룹은 여러 IAM 사용자를 묶어 권한을 일괄 관리하는 논리적 단위입니다. 그룹 자체에는 액세스 키가 발급되지 않으며, 그룹 내 개별 사용자에게만 키가 발급됩니다.

❌ **C. IAM 역할**: IAM 역할은 임시 보안 자격 증명을 사용하며, 영구적인 액세스 키를 직접 가지지 않습니다. EC2 인스턴스나 Lambda 함수 등 AWS 서비스가 역할을 맡아(assume) 임시 자격 증명을 사용합니다.

❌ **D. IAM 정책**: IAM 정책은 권한을 정의하는 JSON 문서로, 어떤 리소스에 어떤 작업을 허용하거나 거부할지를 명시합니다. 정책 자체는 자격 증명이 아니므로 액세스 키와 연관되지 않습니다.

💡 **시험 꿀팁**: IAM 엔티티 핵심 구분 — 사용자(User) = 장기 자격 증명(액세스 키) + 콘솔 로그인 / 역할(Role) = 임시 자격 증명 + 위임 / 그룹(Group) = 사용자 묶음 / 정책(Policy) = 권한 정의 문서. CLI/SDK 사용 시 = IAM 사용자의 액세스 키 사용.

---

## Q4. AWS 보안 관련 서비스 (2개 선택)

다음 중 AWS에서 제공하는 보안 관련 서비스는 무엇입니까? (2개 선택)

- A. 멀티 팩터 인증 물리적 토큰
- B. AWS Trusted Advisor 보안 검사
- C. 데이터 암호화
- D. 자동 침투 테스트
- E. Amazon S3 저작권이 있는 콘텐츠 탐지

**정답: A, B**

✅ **A. 멀티 팩터 인증 물리적 토큰**: AWS는 IAM 계정 보안 강화를 위해 MFA(Multi-Factor Authentication)를 지원하며, 하드웨어 기반의 물리적 MFA 토큰(예: TOTP 디바이스, U2F 키)을 제공합니다. 이는 AWS가 직접 제공하는 보안 서비스입니다.

✅ **B. AWS Trusted Advisor 보안 검사**: Trusted Advisor는 AWS 환경을 분석하여 보안, 비용 최적화, 성능, 내결함성, 서비스 한도의 5가지 범주에서 권장 사항을 제공합니다. 보안 검사 항목에는 MFA 활성화 여부, 공개된 S3 버킷, 루트 계정 접근 키 존재 여부 등이 포함됩니다.

❌ **C. 데이터 암호화**: 데이터 암호화는 AWS가 도구(KMS, S3 암호화 등)를 제공하지만, 암호화 자체는 고객이 선택하고 구현하는 기능입니다. AWS가 자동으로 제공하는 독립적인 보안 "서비스"라고 보기 어렵습니다.

❌ **D. 자동 침투 테스트**: AWS는 자동 침투 테스트 서비스를 제공하지 않습니다. 고객이 자체적으로 침투 테스트를 수행하려면 AWS에 사전 허가를 받아야 하며(일부 서비스는 사전 허가 없이 가능), AWS가 자동으로 수행하지는 않습니다.

❌ **E. Amazon S3 저작권이 있는 콘텐츠 탐지**: AWS에는 S3 내 저작권 침해 콘텐츠를 자동으로 탐지하는 서비스가 없습니다. 이는 AWS가 제공하지 않는 기능입니다.

💡 **시험 꿀팁**: AWS Trusted Advisor의 5가지 검사 범주 암기 — 보안(Security) + 비용 최적화(Cost Optimization) + 성능(Performance) + 내결함성(Fault Tolerance) + 서비스 한도(Service Limits). MFA 토큰은 AWS IAM 보안의 핵심 기능입니다.

---

## Q5. 데이터베이스 호스팅 AWS 관리 서비스

데이터베이스를 호스트하는 데 사용되는 AWS 관리 서비스는 무엇입니까?

- A. AWS 배치(AWS Batch)
- B. AWS 아티팩트(AWS Artifact)
- C. AWS 데이터 파이프라인(AWS Data Pipeline)
- D. Amazon RDS

**정답: D**

✅ **D. Amazon RDS**: Amazon RDS(Relational Database Service)는 AWS에서 제공하는 완전 관리형 관계형 데이터베이스 서비스입니다. MySQL, PostgreSQL, Oracle, SQL Server, MariaDB, Amazon Aurora 등 다양한 데이터베이스 엔진을 지원하며, 자동 백업, 패치, 복제 등을 AWS가 관리합니다.

❌ **A. AWS Batch**: AWS Batch는 완전 관리형 배치 컴퓨팅 서비스로, 수십만 개의 배치 컴퓨팅 작업을 효율적으로 실행하는 데 사용됩니다. 데이터베이스 호스팅 서비스가 아닙니다.

❌ **B. AWS Artifact**: AWS Artifact는 AWS 규정 준수 보고서와 계약서에 온디맨드로 접근할 수 있는 포털 서비스입니다. SOC 보고서, PCI DSS 같은 감사 문서를 제공하며, 데이터베이스와는 무관합니다.

❌ **C. AWS Data Pipeline**: AWS Data Pipeline은 다양한 AWS 서비스와 온프레미스 데이터 소스 간에 데이터를 안정적으로 처리하고 이동시키는 ETL 서비스입니다. 데이터베이스 자체를 호스팅하지는 않습니다.

💡 **시험 꿀팁**: AWS 데이터베이스 서비스 핵심 정리 — RDS = 관계형 DB 관리형 서비스 / DynamoDB = NoSQL 완전 관리형 / ElastiCache = 인메모리 캐시(Redis/Memcached) / Redshift = 데이터 웨어하우스 / Aurora = AWS 자체 고성능 관계형 DB.

---

## Q6. Linux 서버용 공유 파일 스토리지

Linux 기반 AWS 및 사내 서버와 함께 사용할 수 있도록 간단하고 확장 가능한 공유 파일 스토리지 솔루션을 제공하는 AWS 서비스는 무엇입니까?

- A. Amazon S3
- B. Amazon Glacier
- C. Amazon EBS
- D. Amazon EFS

**정답: D**

✅ **D. Amazon EFS(Elastic File System)**: Amazon EFS는 NFS(Network File System) 프로토콜을 기반으로 하는 완전 관리형 파일 스토리지 서비스입니다. 여러 EC2 인스턴스와 온프레미스 서버에서 동시에 마운트하여 공유할 수 있으며, 데이터 증가에 따라 자동으로 확장됩니다. Linux 기반 시스템과 완벽하게 호환됩니다.

❌ **A. Amazon S3**: S3는 객체 스토리지로, 파일 시스템처럼 직접 마운트하여 사용하는 방식이 아닙니다. REST API를 통해 접근하며, 전통적인 공유 파일 스토리지 역할을 하지 않습니다.

❌ **B. Amazon Glacier**: Glacier(현 S3 Glacier)는 장기 아카이브를 위한 저렴한 스토리지 서비스입니다. 데이터 검색에 시간이 걸리며(분~시간), 실시간 공유 파일 스토리지로는 적합하지 않습니다.

❌ **C. Amazon EBS(Elastic Block Store)**: EBS는 블록 스토리지로, 단일 EC2 인스턴스에만 연결할 수 있습니다(Multi-Attach는 제한적). 여러 인스턴스와 온프레미스 서버가 동시에 공유하는 용도로는 설계되지 않았습니다.

💡 **시험 꿀팁**: EFS 핵심 키워드 = "공유(Shared)" + "NFS" + "Linux" + "여러 EC2 동시 마운트" + "자동 확장". EBS는 단일 EC2 전용 블록 스토리지라는 점으로 EFS와 구분하세요.

---

## Q7. 클라우드 애플리케이션 핵심 설계 원칙

클라우드 애플리케이션을 설계할 때 다음 중 핵심 설계 원칙은 무엇입니까?

- A. 최대한 큰 인스턴스 사용
- B. 최대 부하에 대한 용량 프로비저닝
- C. Scrum 개발 프로세스 사용
- D. 탄력성 구현

**정답: D**

✅ **D. 탄력성 구현**: 탄력성(Elasticity)은 AWS Well-Architected Framework의 핵심 클라우드 설계 원칙 중 하나입니다. 실제 수요에 따라 자동으로 리소스를 확장하거나 축소할 수 있어, 최대 부하 시에는 확장하고 수요가 줄면 축소하여 비용을 최적화합니다. Auto Scaling이 대표적인 탄력성 구현 방법입니다.

❌ **A. 최대한 큰 인스턴스 사용**: 클라우드 설계의 원칙은 필요한 만큼만 사용하고 유연하게 조정하는 것입니다. 불필요하게 큰 인스턴스를 사용하면 비용이 낭비됩니다. "올바른 크기 선택(Right-sizing)"이 올바른 원칙입니다.

❌ **B. 최대 부하에 대한 용량 프로비저닝**: 이는 온프레미스 환경에서의 전통적인 방식입니다. 클라우드에서는 최대 부하를 예상해 고정 용량을 미리 확보하는 대신, 탄력적으로 수요에 맞춰 동적으로 조정하는 것이 핵심입니다.

❌ **C. Scrum 개발 프로세스 사용**: Scrum은 소프트웨어 개발 방법론으로, 클라우드 아키텍처 설계 원칙과는 직접적인 관련이 없습니다. 개발 방법론과 클라우드 아키텍처 원칙은 별개의 개념입니다.

💡 **시험 꿀팁**: AWS 클라우드 핵심 설계 원칙 — 탄력성(Elasticity) + 고가용성(High Availability) + 내결함성(Fault Tolerance) + 확장성(Scalability) + 느슨한 결합(Loose Coupling). "탄력성"은 수요에 따른 자동 확장/축소를 의미하며, Auto Scaling과 연결해서 기억하세요.

---

## Q8. 데이터 백업의 장기 경제적 저장 서비스

데이터 백업의 장기적이고 경제적인 저장을 위해 사용해야 하는 AWS 서비스는 무엇입니까?

- A. Amazon RDS
- B. Amazon Glacier
- C. AWS Snowball
- D. Amazon EBS

**정답: B**

✅ **B. Amazon Glacier**: Amazon S3 Glacier는 데이터 아카이빙과 장기 백업을 위해 설계된 저비용 스토리지 서비스입니다. 일반 S3 대비 최대 80% 저렴한 비용으로 데이터를 보관할 수 있으며, 즉각적인 접근이 필요 없는 장기 보관 데이터에 최적화되어 있습니다. S3 Glacier Instant Retrieval, Flexible Retrieval, Deep Archive 등의 티어가 있습니다.

❌ **A. Amazon RDS**: RDS는 관계형 데이터베이스 서비스로, 운영 중인 데이터베이스 호스팅에 사용됩니다. 장기 백업 아카이브용으로 설계된 비용 효율적인 서비스가 아닙니다.

❌ **C. AWS Snowball**: Snowball은 대용량 데이터를 AWS로 물리적으로 이전하기 위한 데이터 마이그레이션 장치입니다. 지속적인 백업 저장 서비스가 아닌 일회성 대규모 데이터 이전 용도입니다.

❌ **D. Amazon EBS**: EBS는 EC2 인스턴스에 연결되는 블록 스토리지로, 운영 중인 시스템의 디스크 역할을 합니다. 비용이 상대적으로 높아 장기적인 경제적 백업 저장 용도로는 적합하지 않습니다.

💡 **시험 꿀팁**: 장기 보관 + 저렴한 비용 = Glacier(S3 Glacier). S3 스토리지 클래스 비용 순서 기억 — S3 Standard(비쌈) → S3 Standard-IA → S3 One Zone-IA → S3 Glacier Flexible Retrieval → S3 Glacier Deep Archive(가장 저렴).

---

## Q9. 공유 책임 모델에서 공유 제어 항목

공유 책임 모델에서 고객과 AWS 간의 공유 제어는 다음 중 어느 것입니까?

- A. 물리적 제어
- B. 패치 관리
- C. 구역 보안
- D. 데이터 센터 감사

**정답: B**

✅ **B. 패치 관리**: 패치 관리는 AWS와 고객이 각자의 영역에서 함께 수행하는 공유 제어(Shared Control)입니다. AWS는 인프라(하이퍼바이저, 네트워크 장비)의 패치를 담당하고, 고객은 EC2의 운영 체제와 애플리케이션의 패치를 담당합니다. 양측 모두 자신의 영역에서 패치 관리 책임을 집니다.

❌ **A. 물리적 제어**: 물리적 보안(데이터 센터 건물, 서버 랙 잠금 등)은 전적으로 AWS의 책임입니다. 고객은 AWS 물리적 시설에 접근할 수 없습니다.

❌ **C. 구역 보안**: 데이터 센터의 구역 보안(Zonal Security), 즉 물리적 경계 보안은 AWS가 단독으로 책임집니다. 고객이 관여하는 영역이 아닙니다.

❌ **D. 데이터 센터 감사**: 데이터 센터의 물리적 감사는 AWS가 책임지며, AWS는 제3자 감사 기관의 검증을 통해 규정 준수를 입증합니다(SOC 보고서, ISO 인증 등). 고객이 직접 수행하는 공유 제어가 아닙니다.

💡 **시험 꿀팁**: 공유 책임 모델 핵심 — AWS 단독 책임 = 물리적 보안, 데이터 센터, 하이퍼바이저 / 고객 단독 책임 = 데이터, 애플리케이션, IAM 설정 / 공유 제어 = 패치 관리 + 구성 관리 + 인식 및 교육. "공유 제어"는 두 당사자 모두 각자 영역에서 수행한다는 점이 포인트입니다.

---

## Q10. VPC와 온프레미스 연결 서비스

기업이 사내 데이터 센터에 Amazon VPC를 연결할 수 있는 AWS 서비스는 무엇입니까?

- A. AWS VPN
- B. Amazon Redshift
- C. API Gateway
- D. Amazon Connect

**정답: A**

✅ **A. AWS VPN**: AWS Site-to-Site VPN은 온프레미스 데이터 센터와 Amazon VPC 간에 암호화된 IPsec VPN 터널을 생성합니다. 인터넷을 통해 안전한 연결을 제공하며, Direct Connect보다 빠르게 설정할 수 있습니다. Client VPN은 사용자가 원격에서 VPC에 접속하는 용도로 사용됩니다.

❌ **B. Amazon Redshift**: Redshift는 페타바이트급 데이터 웨어하우스 서비스입니다. 네트워크 연결 서비스가 아니며, 온프레미스와 VPC를 연결하는 기능을 하지 않습니다.

❌ **C. API Gateway**: Amazon API Gateway는 RESTful API와 WebSocket API를 생성, 게시, 유지 관리하는 서비스입니다. 네트워크 수준의 VPN 연결 서비스가 아닙니다.

❌ **D. Amazon Connect**: Amazon Connect는 클라우드 기반 콜 센터(Contact Center) 서비스입니다. 고객 서비스 통화 관리를 위한 서비스로, 네트워크 연결과는 관련이 없습니다.

💡 **시험 꿀팁**: 온프레미스 ↔ AWS 연결 두 가지 방법 — AWS VPN = 인터넷 경유 + 암호화 + 빠른 설정 + 저렴 / AWS Direct Connect = 전용 물리 회선 + 안정적인 대역폭 + 낮은 지연 + 높은 보안. 시험에서 "빠른 연결" 또는 "비용 효율" = VPN, "전용 회선" 또는 "대역폭 보장" = Direct Connect.

---

## Q11. 서버리스 아키텍처 지원 서비스

한 회사는 개발자가 코드를 실행하는 데 사용하는 물리적 컴퓨팅 공간을 줄이려고 합니다. 서버 없는 아키텍처를 지원하여 이러한 요구를 충족하는 서비스는 무엇입니까?

- A. Amazon EC2(Elastic Compute Cloud)
- B. AWS Lambda
- C. Amazon DynamoDB
- D. AWS CodeCommit

**정답: B**

✅ **B. AWS Lambda**: AWS Lambda는 대표적인 서버리스(Serverless) 컴퓨팅 서비스입니다. 서버를 프로비저닝하거나 관리할 필요 없이 코드를 실행할 수 있으며, 실제 코드 실행 시간에 대해서만 비용을 지불합니다. 물리적 컴퓨팅 리소스 관리 없이 이벤트 기반으로 코드를 실행할 수 있습니다.

❌ **A. Amazon EC2**: EC2는 가상 서버를 제공하는 서비스로, 서버를 직접 관리해야 합니다. 물리적 컴퓨팅 공간을 줄이는 데 도움이 되지만, 여전히 OS 관리, 패치, 용량 계획이 필요한 서버 기반 서비스입니다.

❌ **C. Amazon DynamoDB**: DynamoDB는 완전 관리형 NoSQL 데이터베이스 서비스로 서버리스 특성을 가지고 있지만, 코드 실행이 아닌 데이터 저장을 위한 서비스입니다.

❌ **D. AWS CodeCommit**: CodeCommit은 완전 관리형 소스 제어 서비스(Git 리포지토리)입니다. 코드를 저장하고 관리하는 서비스이지, 코드를 실행하는 서버리스 컴퓨팅 서비스가 아닙니다.

💡 **시험 꿀팁**: 서버리스(Serverless) 핵심 서비스 — AWS Lambda(컴퓨팅) + Amazon S3(스토리지) + DynamoDB(데이터베이스) + API Gateway(API 관리) + SQS/SNS(메시징). "서버 관리 불필요 + 코드 실행 + 이벤트 기반" = Lambda.

---

## Q12. AWS 이벤트 경고 서비스

AWS 이벤트가 회사의 AWS 리소스에 영향을 줄 수 있는 경우 경고를 제공하는 AWS 서비스는 무엇입니까?

- A. AWS 개인 건강 대시보드(AWS Personal Health Dashboard)
- B. AWS 서비스 상태 대시보드(AWS Service Health Dashboard)
- C. AWS Trusted Advisor
- D. AWS 인프라 이벤트 관리(AWS Infrastructure Event Management)

**정답: A**

✅ **A. AWS 개인 건강 대시보드(AWS Personal Health Dashboard)**: AWS Personal Health Dashboard(현재 AWS Health Dashboard - Your Account Health라고도 함)는 사용자의 특정 AWS 계정과 리소스에 영향을 미치는 AWS 이벤트와 알림을 개인화하여 제공합니다. 유지 관리 예정 작업, 서비스 장애, 계정별 문제 등을 사전에 알려줍니다.

❌ **B. AWS 서비스 상태 대시보드**: 서비스 상태 대시보드는 모든 AWS 서비스의 전반적인 상태를 공개적으로 보여주는 페이지입니다. 특정 계정이나 리소스에 맞춤화된 알림이 아닌, 전체 서비스 상태를 일반적으로 표시합니다.

❌ **C. AWS Trusted Advisor**: Trusted Advisor는 비용, 성능, 보안, 내결함성, 서비스 한도에 대한 모범 사례 권장 사항을 제공하는 서비스입니다. AWS 이벤트로 인한 실시간 영향 경고가 아닌, 환경 개선을 위한 권고를 제공합니다.

❌ **D. AWS 인프라 이벤트 관리**: AWS Infrastructure Event Management는 대규모 이벤트(제품 출시, 마이그레이션 등)를 계획할 때 AWS 전문가의 지원을 받는 유료 엔터프라이즈 지원 서비스입니다. 자동 경고 서비스가 아닙니다.

💡 **시험 꿀팁**: 대시보드 구분 — Personal Health Dashboard = "나의 계정"에 영향 미치는 이벤트 + 개인화 알림 / Service Health Dashboard = "전체 AWS 서비스" 상태 공개 페이지. "특정 계정 리소스에 영향" = Personal Health Dashboard.

---

## Q13. AWS Trusted Advisor의 범주 (2개 선택)

다음 중 AWS Trusted Advisor의 범주는 무엇입니까? (두 개를 선택합니다.)

- A. 내결함성
- B. 인스턴스 사용
- C. 인프라
- D. 성능
- E. 스토리지 용량

**정답: A, D**

✅ **A. 내결함성(Fault Tolerance)**: AWS Trusted Advisor의 5가지 공식 범주 중 하나입니다. 내결함성 검사는 백업, 가용 영역 활용, 서비스 이중화 등을 분석하여 애플리케이션의 복원력을 향상시키는 권장 사항을 제공합니다.

✅ **D. 성능(Performance)**: AWS Trusted Advisor의 5가지 공식 범주 중 하나입니다. 성능 검사는 서비스 한도, 과도한 처리량 사용, 인스턴스 크기 최적화 등을 분석하여 서비스 성능을 개선하는 권장 사항을 제공합니다.

❌ **B. 인스턴스 사용**: Trusted Advisor의 공식 범주가 아닙니다. 인스턴스 관련 내용은 "비용 최적화"나 "성능" 범주 내의 세부 검사 항목으로 포함될 수 있지만, 독립된 범주는 아닙니다.

❌ **C. 인프라**: Trusted Advisor의 공식 범주가 아닙니다. 인프라는 너무 광범위한 개념으로, Trusted Advisor는 이보다 구체적인 5가지 범주를 사용합니다.

❌ **E. 스토리지 용량**: Trusted Advisor의 공식 범주가 아닙니다. 스토리지 관련 내용은 "비용 최적화"나 "서비스 한도" 범주에서 다룰 수 있지만, 독립 범주로 존재하지 않습니다.

💡 **시험 꿀팁**: AWS Trusted Advisor 5가지 범주 무조건 암기 — ① 비용 최적화(Cost Optimization) ② 성능(Performance) ③ 보안(Security) ④ 내결함성(Fault Tolerance) ⑤ 서비스 한도(Service Limits). 이 5가지만 기억하면 됩니다!

---

## Q14. 공유 책임 모델에서 AWS의 책임

보안 및 규정 준수를 위한 공유 책임 모델에서 AWS는 어떤 작업을 담당합니까?

- A. 개인 및 서비스에 대한 접근 권한 부여
- B. 전송 중인 데이터 암호화
- C. Amazon EC2 호스트 펌웨어 업데이트
- D. 운영 체제 업데이트

**정답: C**

✅ **C. Amazon EC2 호스트 펌웨어 업데이트**: EC2 인스턴스가 실행되는 물리적 호스트 서버의 펌웨어(BIOS, BMC 등) 업데이트는 AWS의 단독 책임입니다. 고객은 물리적 인프라에 접근할 수 없으므로, 하드웨어 수준의 모든 관리는 AWS가 담당합니다.

❌ **A. 개인 및 서비스에 대한 접근 권한 부여**: IAM을 통한 사용자, 역할, 서비스의 접근 권한 설정은 고객의 책임입니다. 누가 어떤 리소스에 접근할 수 있는지 정의하는 것은 고객이 결정해야 합니다.

❌ **B. 전송 중인 데이터 암호화**: 애플리케이션에서 전송 중인 데이터(TLS/SSL) 암호화 구현은 고객의 책임입니다. AWS는 암호화 도구(ACM, KMS)를 제공하지만, 적용 여부는 고객이 결정합니다.

❌ **D. 운영 체제 업데이트**: EC2 인스턴스의 게스트 OS(Windows, Linux 등) 패치 및 업데이트는 고객의 책임입니다. 고객이 직접 OS를 선택하고 설치했으므로 유지 관리도 고객이 합니다. (단, 관리형 서비스인 RDS의 경우 AWS가 DB 엔진 패치를 담당)

💡 **시험 꿀팁**: 공유 책임 모델 쉬운 기억법 — AWS = "클라우드 인프라의 보안(Security OF the Cloud)" → 물리적 시설, 하드웨어, 하이퍼바이저, 네트워크 장비 / 고객 = "클라우드 내 보안(Security IN the Cloud)" → 데이터, OS, 애플리케이션, IAM 설정.

---

## Q15. 독립 소프트웨어 구매 및 배포 위치

AWS에서 실행되는 소프트웨어를 찾기, 테스트, 구입 및 배포하려면 독립 소프트웨어 공급업체의 소프트웨어 목록을 검색하려면 어디로 가야 합니까?

- A. AWS Marketplace
- B. Amazon Lumberyard
- C. AWS Artifact
- D. Amazon CloudSearch

**정답: A**

✅ **A. AWS Marketplace**: AWS Marketplace는 독립 소프트웨어 공급업체(ISV)가 제공하는 수천 개의 소프트웨어 솔루션을 검색, 테스트, 구매, 배포할 수 있는 디지털 카탈로그입니다. 보안 솔루션, 데이터베이스, 미들웨어, SaaS 애플리케이션 등 다양한 카테고리의 소프트웨어를 AWS 환경에 쉽게 배포할 수 있습니다.

❌ **B. Amazon Lumberyard**: Amazon Lumberyard는 Amazon이 제공하던 무료 3D 게임 엔진이었습니다(현재는 Open 3D Engine으로 전환). 소프트웨어 마켓플레이스가 아닌 게임 개발 도구입니다.

❌ **C. AWS Artifact**: AWS Artifact는 AWS의 규정 준수 관련 문서와 보고서(SOC, ISO 인증 등)에 접근할 수 있는 포털입니다. 소프트웨어를 구매하거나 배포하는 곳이 아닙니다.

❌ **D. Amazon CloudSearch**: Amazon CloudSearch는 웹사이트나 애플리케이션에 검색 기능을 추가하기 위한 관리형 검색 서비스입니다. 소프트웨어 카탈로그 서비스가 아닙니다.

💡 **시험 꿀팁**: AWS Marketplace 핵심 키워드 = 타사(ISV) 소프트웨어 + 검색/구매/배포 + AWS 환경 통합. AWS Artifact = 규정 준수 보고서 및 계약서. 두 서비스 이름이 혼동될 수 있으니 구분하여 기억하세요.

---

## Q16. AWS 클라우드 사용의 이점

다음 중 AWS 클라우드를 사용할 경우의 이점은 무엇입니까?

- A. 관대한 보안이 관리 부담을 덜어줍니다.
- B. 수익 창출 활동에 집중할 수 있는 능력
- C. 클라우드 네트워크 하드웨어에 대한 제어
- D. 특정 클라우드 하드웨어 공급업체 선택

**정답: B**

✅ **B. 수익 창출 활동에 집중할 수 있는 능력**: AWS 클라우드의 핵심 이점 중 하나는 인프라 관리 부담을 AWS에게 넘김으로써, 기업이 핵심 비즈니스 및 수익 창출 활동에 더 많은 시간과 자원을 투자할 수 있다는 것입니다. 이는 AWS Well-Architected Framework에서도 강조하는 "민첩성(Agility)"과 "핵심 역량 집중"의 개념입니다.

❌ **A. 관대한 보안이 관리 부담을 덜어줍니다.**: AWS 클라우드는 "관대한 보안"이 아니라 강력한 보안을 제공합니다. 보안은 최우선 사항(Security as a top priority)이며, 보안 수준을 낮추는 것은 AWS의 이점이 아닙니다.

❌ **C. 클라우드 네트워크 하드웨어에 대한 제어**: AWS 클라우드에서는 물리적 네트워크 하드웨어를 고객이 직접 제어하지 않습니다. 하드웨어 제어는 온프레미스 환경의 특성이며, 클라우드의 이점은 오히려 하드웨어 관리 부담이 없다는 것입니다.

❌ **D. 특정 클라우드 하드웨어 공급업체 선택**: 클라우드를 사용하면 특정 하드웨어 공급업체에 종속되지 않는 것이 이점이지, 특정 공급업체를 선택할 수 있다는 것이 이점이 아닙니다. 이는 오히려 온프레미스 환경의 특성입니다.

💡 **시험 꿀팁**: AWS 클라우드 6가지 핵심 이점 암기 — ① 자본 비용을 가변 비용으로 전환 ② 규모의 경제 활용 ③ 용량 추측 불필요 ④ 속도와 민첩성 향상 ⑤ 데이터 센터 운영 비용 절감 ⑥ 몇 분 만에 전 세계 배포. 핵심 = "인프라 관리 대신 비즈니스 집중".

---

## Q17. 물리적 격리 지원 컴퓨팅 호스팅 모델

고객 워크로드의 물리적 격리를 지원하는 비용 분석을 수행할 때 TCO(총 소유 비용)에서 어떤 컴퓨팅 호스팅 모델을 고려해야 합니까?

- A. 전용 호스트(Dedicated Host)
- B. 예약된 인스턴스(Reserved Instance)
- C. 주문형 인스턴스(On-Demand Instance)
- D. 사전 예약 인스턴스 없음

**정답: A**

✅ **A. 전용 호스트(Dedicated Host)**: Amazon EC2 전용 호스트는 고객에게 완전히 전용으로 할당된 물리적 서버입니다. 물리적 격리가 필요한 규정 준수 요구 사항이나 라이선스 요구 사항(소켓/코어 기반 라이선스)을 충족할 때 사용합니다. TCO 분석 시 물리적 격리 요구 사항이 있다면 전용 호스트를 고려해야 합니다.

❌ **B. 예약된 인스턴스(Reserved Instance)**: 예약 인스턴스는 1년 또는 3년 약정으로 할인된 가격에 EC2를 사용하는 구매 옵션입니다. 물리적 격리를 보장하지 않으며, 공유 하드웨어에서 실행됩니다.

❌ **C. 주문형 인스턴스(On-Demand Instance)**: 온디맨드 인스턴스는 약정 없이 필요할 때 사용하는 표준 EC2 사용 방식입니다. 공유 물리적 하드웨어에서 실행되므로 물리적 격리를 제공하지 않습니다.

❌ **D. 사전 예약 인스턴스 없음**: 이것은 구매 옵션의 선택 여부를 나타내는 것으로, 물리적 격리와는 관련이 없습니다.

💡 **시험 꿀팁**: 물리적 격리 관련 EC2 호스팅 옵션 구분 — 전용 호스트(Dedicated Host) = 물리적 서버 전체 전용 + 소켓/코어 단위 라이선스 관리 가능 / 전용 인스턴스(Dedicated Instance) = 전용 하드웨어에서 실행되지만 하드웨어 제어권 없음. "물리적 격리" = Dedicated Host.

---

## Q18. 인프라를 코드로 관리하는 AWS 서비스

인프라를 코드로 관리할 수 있는 기능을 제공하는 AWS 서비스는 무엇입니까?

- A. AWS CodePipeline
- B. AWS CodeDeploy
- C. AWS Direct Connect
- D. AWS CloudFormation

**정답: D**

✅ **D. AWS CloudFormation**: AWS CloudFormation은 IaC(Infrastructure as Code)를 구현하는 대표적인 AWS 서비스입니다. JSON 또는 YAML 형식의 템플릿으로 AWS 인프라(EC2, VPC, RDS 등)를 코드로 정의하고, 자동으로 프로비저닝 및 관리할 수 있습니다. 버전 관리, 반복 배포, 인프라 자동화가 가능합니다.

❌ **A. AWS CodePipeline**: CodePipeline은 CI/CD(지속적 통합/지속적 배포) 파이프라인을 자동화하는 서비스입니다. 애플리케이션 코드의 빌드, 테스트, 배포 워크플로우를 자동화하지만, 인프라를 코드로 정의하는 IaC 서비스가 아닙니다.

❌ **B. AWS CodeDeploy**: CodeDeploy는 애플리케이션 배포를 자동화하는 서비스로, EC2, Lambda, ECS 등에 애플리케이션을 자동으로 배포합니다. 인프라 프로비저닝이 아닌 애플리케이션 배포 자동화 서비스입니다.

❌ **C. AWS Direct Connect**: Direct Connect는 온프레미스 데이터 센터와 AWS 간의 전용 네트워크 연결 서비스입니다. 네트워크 연결 서비스로, IaC와는 관련이 없습니다.

💡 **시험 꿀팁**: IaC(Infrastructure as Code) = AWS CloudFormation. CloudFormation 핵심 키워드 = 템플릿(YAML/JSON) + 스택(Stack) + 자동 프로비저닝 + 반복 가능한 인프라. AWS CDK(Cloud Development Kit)도 IaC 도구이지만 시험에서는 CloudFormation이 대표 답안입니다.

---

## Q19. AWS 리소스 변경 관리 감사 서비스

고객이 AWS 리소스의 변경 관리를 감사해야 하는 경우 다음 AWS 서비스 중 어떤 서비스를 사용해야 합니까?

- A. AWS Config
- B. AWS Trusted Advisor
- C. Amazon CloudWatch
- D. Amazon Inspector

**정답: A**

✅ **A. AWS Config**: AWS Config는 AWS 리소스의 구성 변경 이력을 기록하고, 규정 준수 여부를 지속적으로 평가하는 서비스입니다. 누가 언제 어떤 리소스를 어떻게 변경했는지 추적할 수 있어 변경 관리 감사(Change Management Audit)에 최적화되어 있습니다. 구성 이력 조회, 규정 준수 대시보드, 자동화된 수정 기능을 제공합니다.

❌ **B. AWS Trusted Advisor**: Trusted Advisor는 모범 사례 권장 사항을 제공하는 서비스로, 비용, 보안, 성능 등을 점검합니다. 리소스 변경 이력을 기록하거나 변경 감사 기능을 제공하지 않습니다.

❌ **C. Amazon CloudWatch**: CloudWatch는 AWS 리소스와 애플리케이션의 모니터링 및 관찰 가능성 서비스입니다. 메트릭, 로그, 이벤트를 모니터링하지만, 리소스 구성 변경 이력 추적에 특화된 서비스는 아닙니다.

❌ **D. Amazon Inspector**: Inspector는 EC2 인스턴스, 컨테이너 이미지, Lambda 함수의 보안 취약점을 자동으로 스캔하는 취약점 평가 서비스입니다. 변경 관리 감사가 아닌 보안 취약점 탐지 목적의 서비스입니다.

💡 **시험 꿀팁**: 감사(Audit) 관련 서비스 구분 — AWS Config = 리소스 구성 변경 이력 추적 + 규정 준수 평가 / AWS CloudTrail = API 호출 이력 추적 + 사용자 활동 감사. "무엇이 변경됐나?" = Config, "누가 무엇을 했나?" = CloudTrail.

---

## Q20. Amazon CloudWatch의 정의

Amazon CloudWatch란 무엇입니까?

- A. 맞춤형 빌드 및 팀 커밋 기능을 갖춘 코드 저장소입니다.
- B. 사용자 정의 가능한 알림 임계값 및 채널이 있는 메트릭 저장소입니다.
- C. 위협 분석 기능이 있는 보안 구성 저장소.
- D. 자동화된 취약성 차단 기능이 있는 웹 애플리케이션 방화벽의 규칙 저장소입니다.

**정답: B**

✅ **B. 사용자 정의 가능한 알림 임계값 및 채널이 있는 메트릭 저장소입니다.**: Amazon CloudWatch는 AWS 리소스와 애플리케이션의 메트릭을 수집, 저장, 시각화하는 모니터링 서비스입니다. CPU 사용률, 네트워크 트래픽 등의 메트릭을 모니터링하고, 사용자가 정의한 임계값에 도달하면 SNS, Lambda 등 다양한 채널을 통해 경보(Alarm)를 발송할 수 있습니다.

❌ **A. 맞춤형 빌드 및 팀 커밋 기능을 갖춘 코드 저장소입니다.**: 이는 AWS CodeCommit(소스 코드 저장소) 또는 AWS CodeBuild(빌드 서비스)에 대한 설명입니다. CloudWatch는 코드 저장소가 아닙니다.

❌ **C. 위협 분석 기능이 있는 보안 구성 저장소.**: 이는 Amazon GuardDuty(위협 탐지 서비스) 또는 AWS Security Hub(보안 관제 서비스)에 가까운 설명입니다. CloudWatch는 보안 위협 분석 서비스가 아닙니다.

❌ **D. 자동화된 취약성 차단 기능이 있는 웹 애플리케이션 방화벽의 규칙 저장소입니다.**: 이는 AWS WAF(Web Application Firewall)에 대한 설명입니다. CloudWatch는 방화벽 서비스가 아닙니다.

💡 **시험 꿀팁**: Amazon CloudWatch 핵심 기능 4가지 — ① 메트릭(Metrics) 수집 및 모니터링 ② 로그(Logs) 집계 및 분석 ③ 경보(Alarms) 설정 및 알림 ④ 대시보드(Dashboard) 시각화. "모니터링 + 메트릭 + 경보" = CloudWatch. AWS 모니터링의 핵심 서비스입니다.

---

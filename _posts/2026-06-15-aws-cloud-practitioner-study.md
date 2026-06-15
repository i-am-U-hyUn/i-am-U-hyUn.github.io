---
title: "AWS Cloud Practitioner (CLF-C02) 핵심 정리"
date: 2026-06-15 21:00:00 +0900
categories: [자격증, AWS]
tags: [AWS, Cloud, CLF-C02, 자격증, 클라우드, IAM, EC2, S3]
toc: true
---

## 들어가며

AWS Certified Cloud Practitioner(CLF-C02) 시험을 준비하면서 각 도메인별 핵심 개념을 정리했다.
**700점 이상**이면 합격이며, 4개 도메인으로 구성된다.

---

## Domain 1: Cloud Concepts (클라우드 개념)

### AWS 클라우드의 6가지 핵심 이점

시험에서 자주 출제되는 주제다. 각 이점이 실제로 어떤 상황에서 적용되는지 함께 이해해두자.

| 이점 | 설명 |
|---|---|
| **보안** (Security) | AWS의 물리적 보안 + 고객 책임 분리 |
| **안정성** (Reliability) | 장애 자동 복구, 다중 AZ 설계 |
| **고가용성** (High Availability) | 서비스 중단 최소화 |
| **탄력성** (Elasticity) | 수요에 따라 자원 자동 확장/축소 |
| **민첩성** (Agility) | 빠른 실험과 배포 |
| **종량제** (Pay-as-you-go) | 쓴 만큼만 지불 |

### TCO (총소유비용) 개념

클라우드 전환의 경제적 효과를 이해하려면 **CapEx vs OpEx** 차이를 명확히 알아야 한다.

| 구분 | 설명 |
|---|---|
| **CapEx** (자본 지출) | 서버, 데이터센터 등 선투자 비용 |
| **OpEx** (운영 지출) | 클라우드 사용료처럼 사용 중 발생하는 비용 |

> 클라우드로 이전하면 **CapEx → OpEx 방식으로 전환**된다. 이것이 TCO 절감의 핵심 원리다.
{: .prompt-tip }

### 클라우드 아키텍처 설계 원칙

- **장애를 가정하고 설계** (Design for Failure)
- **느슨한 결합** (Decouple Components) — 모놀리식 아키텍처 지양
- **탄력성 구현** (Implement Elasticity)
- **병렬 처리** (Think Parallel)

---

## Domain 2: Security & Compliance (보안 및 규정 준수)

### 공동 책임 모델 (Shared Responsibility Model)

CLF-C02에서 **가장 중요한 개념** 중 하나다. AWS와 고객이 각각 무엇을 책임지는지 구분할 수 있어야 한다.

```
AWS 책임:  Security OF the Cloud  →  물리적 인프라, 하드웨어, 글로벌 네트워크
고객 책임: Security IN the Cloud  →  데이터, OS 패치, 애플리케이션, IAM 설정
```

서비스 유형별 책임 범위 차이도 중요하다.

| 서비스 | 고객 책임 범위 |
|---|---|
| **EC2** | OS + 애플리케이션 직접 관리 |
| **RDS** | 데이터만 (OS·DB 엔진은 AWS가 관리) |
| **Lambda** | 코드만 (나머지 인프라는 AWS) |

### AWS IAM 핵심 개념

IAM은 AWS 리소스에 대한 **접근을 제어**하는 서비스다.

| 개념 | 설명 |
|---|---|
| **User** | 개인 계정, 액세스 키/비밀번호로 인증 |
| **Group** | 여러 사용자에게 정책 일괄 적용 |
| **Role** | 서비스/사용자에게 임시 권한 부여 |
| **Policy** | 권한을 정의하는 JSON 문서 |
| **MFA** | 루트 계정 필수 설정 |

> **최소 권한 원칙 (Least Privilege)** — 업무 수행에 필요한 최소한의 권한만 부여해야 한다.
{: .prompt-warning }

### 주요 보안 및 감사 서비스

| 서비스 | 역할 |
|---|---|
| **CloudWatch** | 모니터링 및 알람 |
| **CloudTrail** | API 호출 기록 (누가, 언제, 무엇을) |
| **AWS Config** | 리소스 구성 변경 추적 |

---

## Domain 3: Technology (기술)

### AWS 글로벌 인프라

```
Region (리전)
 └── Availability Zone (가용 영역, AZ) × 2~6개
      └── 데이터센터들

Edge Location (엣지 로케이션) — CloudFront, Global Accelerator
```

| 구성 요소 | 사용 목적 |
|---|---|
| **다중 AZ** | 고가용성 (High Availability) |
| **다중 리전** | 재해복구 (DR), 데이터 주권, 낮은 지연시간 |
| **엣지 로케이션** | 콘텐츠 캐싱, 지연시간 최소화 |

### 핵심 컴퓨팅 서비스

| 서비스 | 특징 |
|---|---|
| **EC2** | 가상 서버, OS 직접 관리 |
| **Lambda** | 서버리스, 코드만 실행 (이벤트 기반) |
| **ECS / EKS** | 컨테이너 관리 서비스 |
| **Auto Scaling** | 수요에 따른 자동 확장/축소 |
| **ELB** | 트래픽 부하 분산 |

### 핵심 스토리지 서비스

| 서비스 | 특징 |
|---|---|
| **S3** | 객체 스토리지, 무제한 용량 |
| **EBS** | EC2 전용 블록 스토리지 (하드디스크 개념) |
| **EFS** | 여러 EC2가 공유하는 파일 스토리지 |
| **S3 Glacier** | 저렴한 장기 보관 아카이브 |
| **Snowball** | 대용량 데이터 물리적 이전 장치 |

### 핵심 데이터베이스 서비스

| 서비스 | 특징 |
|---|---|
| **RDS** | 관리형 관계형 DB (MySQL, PostgreSQL 등) |
| **DynamoDB** | 서버리스 NoSQL DB |
| **Redshift** | 데이터 웨어하우스 (분석용) |

### AWS 리소스 관리 방법

| 방법 | 설명 |
|---|---|
| **Management Console** | 웹 GUI |
| **AWS CLI** | 명령줄 인터페이스 |
| **SDK** | 프로그래밍 언어별 라이브러리 |
| **CloudFormation** | IaC — 인프라를 코드로 관리 |

---

## Domain 4: Billing & Pricing (요금 및 청구)

### EC2 인스턴스 요금 모델

워크로드 특성에 따라 요금 모델을 선택해야 한다.

| 유형 | 적합한 상황 | 할인율 |
|---|---|---|
| **On-Demand** | 예측 불가한 단기 워크로드 | 기준 |
| **Reserved** | 1~3년 약정, 안정적 워크로드 | 최대 72% |
| **Spot** | 중단 가능한 배치 작업 | 최대 90% |

> **Spot 인스턴스** — AWS가 용량이 필요한 경우 **2분 경고 후 회수** 가능. 중단되어도 괜찮은 비동기 배치 작업에 적합하다.
{: .prompt-warning }

### AWS Organizations와 통합 청구

- **Consolidated Billing** — 여러 계정의 비용을 하나로 통합
- 볼륨 할인 혜택 공유 가능
- 부서별 비용 배분 가능

### 비용 관리 도구

| 도구 | 기능 |
|---|---|
| **Cost Explorer** | 비용 시각화 및 예측 |
| **AWS Budgets** | 예산 초과 알람 설정 |
| **Cost & Usage Report** | 상세 사용량 보고서 |
| **태그 (Tag)** | 리소스별 비용 추적 |

### AWS Trusted Advisor

5가지 영역에서 최적화 권고를 제공한다.

> **비용 절감 / 성능 / 보안 / 내결함성 / 서비스 한도**
{: .prompt-info }

---

## 합격을 위한 체크리스트

시험 전 아래 항목을 반드시 점검하자.

- [ ] 공동 책임 모델 완벽 이해
- [ ] IAM User / Group / Role / Policy 구분
- [ ] Region vs AZ vs Edge Location 차이
- [ ] EC2 요금 모델 3가지 (On-Demand / Reserved / Spot)
- [ ] S3, EBS, EFS, Glacier 스토리지 차이
- [ ] RDS vs DynamoDB 차이
- [ ] CloudWatch / CloudTrail / Config 역할 구분

> **700점 이상이면 합격!** 🎯
{: .prompt-tip }

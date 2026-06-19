---
title: "AWS CLF-C02 덤프 해설 Part 11"
date: 2026-06-18 00:11:00 +0900
categories: [자격증, AWS]
tags: [AWS, CLF-C02, 덤프, 문제풀이, 자격증]
toc: true
---

AWS CLF-C02 시험 대비 덤프 문제 Part 11입니다. 총 20문제에 대한 상세 해설과 시험 꿀팁을 제공합니다.

---

## Q1. 정적 웹사이트 지연 시간 감소 서비스

고객이 지연 시간을 줄이고 전송 속도를 높이기 위해 정적 웹 사이트에서 사용하는 AWS 서비스는 무엇입니까?

- A. AWS Lambda
- B. Amazon DynamoDB Accelerator
- C. Amazon Route 53
- D. Amazon CloudFront

**정답: D**

✅ **D. Amazon CloudFront**: CloudFront는 전 세계에 분산된 엣지 로케이션(Edge Location)을 통해 정적 콘텐츠를 사용자와 가까운 위치에서 제공합니다. 이를 통해 지연 시간(latency)을 크게 줄이고 콘텐츠 전송 속도를 높일 수 있습니다. CDN(Content Delivery Network) 서비스로 정적 웹사이트 배포에 최적화되어 있습니다.

❌ **A. AWS Lambda**: Lambda는 서버리스 컴퓨팅 서비스로 코드를 실행하는 데 사용되며, 콘텐츠 배포 가속화 목적이 아닙니다.

❌ **B. Amazon DynamoDB Accelerator**: DAX는 DynamoDB의 인메모리 캐시로, 데이터베이스 쿼리 속도를 높이는 서비스이며 웹사이트 콘텐츠 전송과는 무관합니다.

❌ **C. Amazon Route 53**: Route 53은 DNS 서비스로 도메인 이름을 IP 주소로 변환해주지만, 콘텐츠 자체의 전송 속도를 높이는 CDN 기능은 없습니다.

💡 **시험 꿀팁**: CloudFront = CDN + 엣지 로케이션 + 정적/동적 콘텐츠 가속화 + 지연 시간 감소. "지연 시간", "전송 속도", "정적 콘텐츠", "글로벌 배포" 키워드가 나오면 CloudFront를 떠올리세요.

---

## Q2. 애플리케이션 배포 관리 및 자동화 서비스 (2개 선택)

어떤 서비스가 AWS에서 애플리케이션 배포를 관리하고 자동화합니까? (2개 선택)

- A. AWS Elastic Beanstalk
- B. AWS CodeCommit
- C. AWS Data Pipeline
- D. AWS CloudFormation
- E. AWS Config

**정답: A, D**

✅ **A. AWS Elastic Beanstalk**: Elastic Beanstalk는 웹 애플리케이션 및 서비스를 자동으로 배포하고 관리하는 PaaS 서비스입니다. 코드만 업로드하면 용량 프로비저닝, 로드 밸런싱, 자동 확장, 애플리케이션 모니터링 등을 자동으로 처리합니다.

✅ **D. AWS CloudFormation**: CloudFormation은 인프라를 코드(Infrastructure as Code)로 정의하고 자동으로 프로비저닝하는 서비스입니다. 템플릿을 사용해 전체 애플리케이션 스택의 배포를 자동화할 수 있습니다.

❌ **B. AWS CodeCommit**: CodeCommit은 소스 코드를 저장하는 관리형 Git 리포지토리 서비스로, 배포 자동화 기능은 없습니다.

❌ **C. AWS Data Pipeline**: Data Pipeline은 데이터 처리 및 이동 워크플로를 자동화하는 서비스로, 애플리케이션 배포와는 관련이 없습니다.

❌ **E. AWS Config**: Config는 AWS 리소스 구성을 기록하고 변경 사항을 추적하는 거버넌스 서비스이며, 배포 자동화 목적이 아닙니다.

💡 **시험 꿀팁**: 배포 자동화 핵심 서비스 = Elastic Beanstalk(앱 배포 PaaS) + CloudFormation(IaC 인프라 배포). CodeCommit은 "소스 관리", Config는 "설정 추적"으로 구분하세요.

---

## Q3. AWS 클라우드 안정성 설계 원칙 (3개 선택)

AWS Cloud의 안정성을 위해 애플리케이션을 설계하는 데 사용되는 원칙은 무엇입니까? (3가지 선택)

- A. 자동 고장 복구를 위한 설계
- B. 여러 가용성 영역 사용
- C. 문서화된 프로세스를 통해 변경사항 관리
- D. 중간 수요에 대한 테스트를 통해 신뢰성
- E. 사내 환경으로 백업 복구

**정답: A, B, C**

✅ **A. 자동 고장 복구를 위한 설계**: AWS Well-Architected Framework의 안정성 원칙 중 하나로, 장애 발생 시 자동으로 복구되도록 시스템을 설계하는 것은 핵심 안정성 원칙입니다.

✅ **B. 여러 가용성 영역 사용**: 여러 AZ(Availability Zone)에 걸쳐 리소스를 분산하면 단일 데이터센터 장애로 인한 서비스 중단을 방지할 수 있습니다.

✅ **C. 문서화된 프로세스를 통해 변경사항 관리**: 변경 관리 절차를 문서화하고 체계적으로 관리하면 예기치 않은 장애를 줄이고 안정성을 높일 수 있습니다.

❌ **D. 중간 수요에 대한 테스트를 통해 신뢰성**: "중간 수요" 기준이 아닌 최대 부하(peak load) 또는 프로덕션 수준 테스트가 올바른 원칙입니다. 이는 안정성 설계 원칙으로 적절하지 않습니다.

❌ **E. 사내 환경으로 백업 복구**: 클라우드 안정성 원칙은 클라우드 내에서의 복구를 강조하며, 온프레미스로 복구하는 것은 하이브리드 복잡성을 높이고 클라우드 원칙에 맞지 않습니다.

💡 **시험 꿀팁**: AWS 안정성(Reliability) 3대 원칙 = 자동 복구 설계 + 다중 AZ 분산 + 체계적 변경 관리. Well-Architected Framework의 5대 원칙(운영 우수성, 보안, 안정성, 성능 효율성, 비용 최적화)도 함께 암기하세요.

---

## Q4. AWS 계정 침해 의심 시 조치 (2개 선택)

고객이 AWS 계정의 손상을 의심하는 경우 어떤 작업을 수행해야 합니까? (두 개를 선택합니다.)

- A. 암호 및 액세스 키를 교체합니다.
- B. MFA 토큰을 제거합니다.
- C. 리소스를 다른 AWS 리전으로 이동합니다.
- D. AWS CloudTrail 리소스 삭제
- E. AWS 지원팀에 문의하십시오.

**정답: A, E**

✅ **A. 암호 및 액세스 키를 교체합니다.**: 계정이 침해된 경우 즉시 모든 암호와 액세스 키를 교체(rotate)하여 공격자의 접근을 차단하는 것이 최우선 조치입니다.

✅ **E. AWS 지원팀에 문의하십시오.**: AWS 지원팀은 보안 침해 사고 대응을 지원하며, 전문적인 조사와 복구 절차를 안내해줄 수 있습니다.

❌ **B. MFA 토큰을 제거합니다.**: MFA는 보안을 강화하는 수단이므로 제거하면 보안이 더욱 취약해집니다. 오히려 MFA를 활성화하거나 유지해야 합니다.

❌ **C. 리소스를 다른 AWS 리전으로 이동합니다.**: 리전을 변경해도 계정 자체가 침해된 경우 의미가 없습니다. 공격자는 동일한 자격증명으로 다른 리전에도 접근할 수 있습니다.

❌ **D. AWS CloudTrail 리소스 삭제**: CloudTrail은 보안 감사 로그를 제공하므로 삭제하면 침해 조사에 필요한 증거가 사라집니다. 반드시 보존해야 합니다.

💡 **시험 꿀팁**: 보안 침해 대응 = 자격증명 즉시 교체(암호 + 액세스 키) + AWS 지원팀 연락. CloudTrail은 "삭제"가 아닌 "조사 도구"로 활용. MFA는 제거가 아닌 강화 수단임을 기억하세요.

---

## Q5. AWS 클라우드 고가용성의 예

AWS Cloud에서 고가용성의 예는 무엇입니까?

- A. 밤낮으로 언제든지 AWS 기술 지원 컨설팅
- B. 리소스에 장애가 발생하더라도 애플리케이션에 액세스할 수 있도록 보장
- C. 주문형 결제를 통해 AWS 서비스 사용 가능
- D. AWS 리전을 사용하여 세계 어느 지역에나 구축

**정답: B**

✅ **B. 리소스에 장애가 발생하더라도 애플리케이션에 액세스할 수 있도록 보장**: 고가용성(High Availability)의 정의는 시스템 구성 요소에 장애가 발생하더라도 서비스가 중단 없이 계속 운영되는 능력입니다. 이것이 고가용성의 핵심 개념입니다.

❌ **A. 밤낮으로 언제든지 AWS 기술 지원 컨설팅**: 이는 AWS Support(지원 서비스)에 관한 설명으로, 고가용성 아키텍처 개념과는 다릅니다.

❌ **C. 주문형 결제를 통해 AWS 서비스 사용 가능**: 이는 AWS의 종량제(Pay-as-you-go) 비용 모델에 관한 설명으로 고가용성과는 무관합니다.

❌ **D. AWS 리전을 사용하여 세계 어느 지역에나 구축**: 이는 AWS의 글로벌 인프라(Global Infrastructure)에 관한 설명으로, 고가용성과는 구별되는 글로벌 도달 범위(Global Reach) 개념입니다.

💡 **시험 꿀팁**: 고가용성(HA) = "장애 발생 시에도 서비스 계속 운영". 핵심 키워드: "장애 허용(fault tolerance)", "다운타임 최소화", "자동 장애 조치(failover)". 다중 AZ 배포가 고가용성의 대표적 구현 방법입니다.

---

## Q6. DDoS 공격 방어 AWS 서비스

상시(Always-on) 감지 및 자동 인라인 완화 기능을 통해 분산 서비스 거부 공격으로부터 애플리케이션을 보호하는 AWS 보안 서비스는 무엇입니까?

- A. Amazon Detective
- B. AWS Web Application Firewall (AWS WAF)
- C. Elastic Load Balancing (ELB)
- D. AWS Shield

**정답: D**

✅ **D. AWS Shield**: AWS Shield는 DDoS(Distributed Denial of Service) 공격으로부터 AWS 애플리케이션을 보호하는 관리형 서비스입니다. Shield Standard는 모든 AWS 고객에게 무료로 제공되며, 상시 감지(Always-on detection)와 자동 인라인 완화(automatic inline mitigation) 기능을 제공합니다.

❌ **A. Amazon Detective**: Detective는 보안 이벤트를 분석하고 조사하는 서비스로, DDoS 방어가 아닌 보안 사고 조사에 특화되어 있습니다.

❌ **B. AWS WAF**: WAF는 웹 애플리케이션 방화벽으로 SQL 인젝션, XSS 등의 웹 공격을 방어하지만, DDoS 전용 방어 서비스는 아닙니다. (WAF는 Shield Advanced와 함께 사용 가능)

❌ **C. Elastic Load Balancing**: ELB는 트래픽을 여러 인스턴스에 분산하는 서비스로, DDoS 방어 전용 서비스가 아닙니다.

💡 **시험 꿀팁**: AWS Shield = DDoS 방어 전담 서비스. Shield Standard(무료, 자동 보호) vs Shield Advanced(유료, 추가 보호 + AWS DDoS 대응팀 지원). "DDoS", "상시 감지", "자동 완화" 키워드 = Shield.

---

## Q7. EC2 CPU 사용량 모니터링 서비스

한 회사에서 Amazon EC2 리소스의 CPU 사용량을 모니터링하려고 합니다. 회사는 어떤 AWS 서비스를 사용해야 하나요?

- A. AWS CloudTrail
- B. Amazon CloudWatch
- C. AWS 비용 및 사용량 보고서
- D. Amazon Simple Notification Service (Amazon SNS)

**정답: B**

✅ **B. Amazon CloudWatch**: CloudWatch는 AWS 리소스 및 애플리케이션의 모니터링 서비스입니다. EC2 인스턴스의 CPU 사용률, 네트워크 트래픽, 디스크 I/O 등 다양한 메트릭을 수집하고 시각화하며, 임계값 초과 시 알림을 보낼 수 있습니다.

❌ **A. AWS CloudTrail**: CloudTrail은 AWS 계정의 API 호출 이력을 기록하는 감사 서비스로, 리소스 성능 메트릭 모니터링 기능은 없습니다.

❌ **C. AWS 비용 및 사용량 보고서**: 이 서비스는 AWS 사용 비용을 추적하고 분석하는 도구로, 성능 모니터링과는 관련이 없습니다.

❌ **D. Amazon SNS**: SNS는 알림 메시지를 전송하는 서비스로, 모니터링 자체 기능이 아닌 CloudWatch 알람과 연동하여 알림을 보내는 데 사용됩니다.

💡 **시험 꿀팁**: CloudWatch = 메트릭 모니터링 + 로그 수집 + 알람 설정. CloudTrail = API 호출 감사 로그. 구분 공식: "무엇을 했는가(WHO DID WHAT)" → CloudTrail, "리소스 상태가 어떤가(HOW IS IT)" → CloudWatch.

---

## Q8. AWS IAM 역할(Role)이란?

AWS IAM(Identity and Access Management) 역할은 무엇입니까?

- A. AWS 리소스와 연결된 사용자
- B. AWS 리소스와 연결된 그룹
- C. AWS 리소스에 사용할 권한 집합을 정의하는 엔티티
- D. MFA(다중 인증) 토큰과 연결된 인증 자격 증명

**정답: C**

✅ **C. AWS 리소스에 사용할 권한 집합을 정의하는 엔티티**: IAM Role은 특정 사용자에게 영구적으로 연결되지 않고, AWS 서비스, 사용자, 애플리케이션 등이 일시적으로 권한을 위임받을 수 있는 엔티티입니다. 역할에는 권한 정책이 연결되어 있으며, 수임(assume)을 통해 임시 자격증명을 발급받습니다.

❌ **A. AWS 리소스와 연결된 사용자**: IAM Role은 특정 개인 사용자와 연결되지 않습니다. 이는 IAM User의 개념에 더 가깝습니다.

❌ **B. AWS 리소스와 연결된 그룹**: 이는 IAM Group의 개념으로, 여러 사용자를 묶어 권한을 관리하는 단위입니다. Role과는 다릅니다.

❌ **D. MFA 토큰과 연결된 인증 자격 증명**: MFA는 인증 보안 수단이며, IAM Role의 정의와는 다릅니다. Role은 MFA와 함께 사용될 수 있지만 MFA 자체가 아닙니다.

💡 **시험 꿀팁**: IAM 핵심 요소 = User(개인), Group(사용자 묶음), Role(권한 위임 엔티티), Policy(권한 문서). Role은 EC2, Lambda 등 AWS 서비스나 다른 계정에 권한을 부여할 때 사용. 임시 자격증명(Temporary Security Credentials) 발급이 핵심 특징입니다.

---

## Q9. 예약 인스턴스(Reserved Instances)의 장점 (2개 선택)

예약된 인스턴스의 장점은 무엇입니까? (두 개를 선택합니다.)

- A. 주문형 가격에 비해 할인을 제공합니다.
- B. 추가 인스턴스 유형에 대한 액세스를 제공합니다.
- C. 추가 네트워킹 기능을 제공합니다.
- D. 고객은 새로운 유형을 사용할 수 있게 되면 인스턴스를 업그레이드할 수 있습니다.
- E. 고객은 가용성 영역에서 용량을 예약할 수 있습니다.

**정답: A, E**

✅ **A. 주문형 가격에 비해 할인을 제공합니다.**: Reserved Instance는 1년 또는 3년 약정으로 구매하면 On-Demand 가격 대비 최대 72%까지 할인을 받을 수 있어 비용 절감 효과가 큽니다.

✅ **E. 고객은 가용성 영역에서 용량을 예약할 수 있습니다.**: Zonal Reserved Instance를 구매하면 특정 가용성 영역(AZ)에서 용량을 예약하여 필요할 때 인스턴스 시작을 보장받을 수 있습니다.

❌ **B. 추가 인스턴스 유형에 대한 액세스를 제공합니다.**: Reserved Instance는 특정 인스턴스 유형에 대한 할인이지, 추가 인스턴스 유형 접근 권한을 제공하지 않습니다.

❌ **C. 추가 네트워킹 기능을 제공합니다.**: Reserved Instance는 비용 모델에 관한 것이며, 네트워킹 기능과는 무관합니다.

❌ **D. 고객은 새로운 유형을 사용할 수 있게 되면 인스턴스를 업그레이드할 수 있습니다.**: Convertible Reserved Instance를 통해 인스턴스 패밀리 변경은 가능하지만, "새로운 유형 출시 시 자동 업그레이드"는 Reserved Instance의 장점이 아닙니다.

💡 **시험 꿀팁**: Reserved Instance 핵심 = 할인율(최대 72%) + 용량 예약(Zonal). 구매 유형: Standard(고정, 최대 할인) vs Convertible(변경 가능, 약간 낮은 할인). 1년 또는 3년 약정, 전체/부분/선불 없음 옵션 존재.

---

## Q10. Auto Scaling 그룹과 고가용성

Amazon EC2 Auto Scaling 그룹은 웹 애플리케이션의 고가용성을 실현하는 데 어떻게 도움이 됩니까?

- A. 애플리케이션의 글로벌 수요에 따라 여러 AWS 리전에 걸쳐 자동으로 인스턴스를 추가합니다.
- B. 애플리케이션이 필요할 때 여러 가용성 영역에 걸쳐 인스턴스를 자동으로 추가하거나 교체합니다.
- C. 애플리케이션의 정적 콘텐츠가 최종 사용자에게 더 가까이 상주할 수 있도록 지원합니다.
- D. 수신 요청을 웹 서버 인스턴스 계층 전체에 분산할 수 있습니다.

**정답: B**

✅ **B. 애플리케이션이 필요할 때 여러 가용성 영역에 걸쳐 인스턴스를 자동으로 추가하거나 교체합니다.**: Auto Scaling 그룹은 수요에 따라 인스턴스를 동적으로 추가(Scale Out)하거나 제거(Scale In)하며, 장애가 발생한 인스턴스를 자동으로 교체합니다. 여러 AZ에 걸쳐 인스턴스를 배포하여 고가용성을 실현합니다.

❌ **A. 여러 AWS 리전에 걸쳐 자동으로 인스턴스를 추가합니다.**: Auto Scaling 그룹은 단일 리전 내의 여러 AZ에서 동작하며, 여러 리전에 걸쳐 자동으로 인스턴스를 추가하지는 않습니다.

❌ **C. 정적 콘텐츠가 최종 사용자에게 더 가까이 상주할 수 있도록 지원합니다.**: 이는 Amazon CloudFront(CDN)의 역할입니다. Auto Scaling은 컴퓨팅 용량 조정에 관한 서비스입니다.

❌ **D. 수신 요청을 웹 서버 인스턴스 계층 전체에 분산할 수 있습니다.**: 이는 Elastic Load Balancer(ELB)의 역할입니다. Auto Scaling과 ELB는 함께 사용되지만 역할이 다릅니다.

💡 **시험 꿀팁**: Auto Scaling = 수요 기반 인스턴스 수 자동 조정 + 장애 인스턴스 자동 교체 + 다중 AZ 지원. ELB(트래픽 분산)와 Auto Scaling(용량 조정)은 짝꿍 서비스로 함께 출제됩니다.

---

## Q11. 다른 AWS 계정의 예약 인스턴스 공유

한 AWS 계정이 다른 AWS 계정의 예약된 인스턴스를 사용하려면 어떻게 해야 합니까?

- A. Amazon EC2 전용 인스턴스 사용
- B. AWS Organizations 통합 과금 사용
- C. AWS Cost Explorer 도구 사용
- D. AWS Budgets 사용

**정답: B**

✅ **B. AWS Organizations 통합 과금 사용**: AWS Organizations의 통합 과금(Consolidated Billing) 기능을 통해 조직 내 여러 계정이 하나의 마스터 계정으로 요금을 지불하며, 예약 인스턴스 혜택을 조직 전체에서 공유할 수 있습니다.

❌ **A. Amazon EC2 전용 인스턴스**: 전용 인스턴스는 물리적으로 격리된 하드웨어에서 실행되는 인스턴스로, 계정 간 RI 공유와는 무관합니다.

❌ **C. AWS Cost Explorer**: Cost Explorer는 비용을 시각화하고 분석하는 도구로, 예약 인스턴스 공유 기능을 제공하지 않습니다.

❌ **D. AWS Budgets**: Budgets는 비용 임계값 설정 및 알림 서비스로, 예약 인스턴스 공유 기능이 없습니다.

💡 **시험 꿀팁**: AWS Organizations 통합 과금 = 여러 계정 단일 청구 + RI/Savings Plans 혜택 공유 + 볼륨 할인 공유. "여러 계정 간 리소스/혜택 공유" 키워드 → AWS Organizations Consolidated Billing.

---

## Q12. EC2 주문형 인스턴스 초 단위 과금

고객이 주문형 Amazon Linux EC2 인스턴스를 3시간 5분 6초 동안 실행합니다. 고객에게 얼마 동안 청구됩니까?

- A. 3시간 5분
- B. 3시간 5분 6초
- C. 3시간 6분
- D. 4시간

**정답: B**

✅ **B. 3시간 5분 6초**: Amazon Linux EC2 인스턴스는 초 단위 과금(Per-second billing)이 적용됩니다. 최소 60초가 청구되지만, 그 이후부터는 사용한 정확한 시간(초 단위)만큼 청구됩니다. 따라서 3시간 5분 6초 사용 시 정확히 그 시간만큼 청구됩니다.

❌ **A. 3시간 5분**: 초 단위 과금이므로 6초를 버리고 청구하지 않습니다. 실제로는 6초도 포함됩니다.

❌ **C. 3시간 6분**: 분 단위로 올림하는 방식은 현재 Amazon Linux EC2 과금 방식이 아닙니다.

❌ **D. 4시간**: 시간 단위 올림은 Windows Server 등 일부 인스턴스에 해당하며, Amazon Linux는 초 단위로 과금됩니다.

💡 **시험 꿀팁**: EC2 과금 방식 구분 = Amazon Linux/Ubuntu 등 → 초 단위 과금(최소 60초). Windows Server/일부 상용 OS → 시간 단위 과금. "초 단위 과금", "per-second billing"은 Amazon Linux의 핵심 특징입니다.

---

## Q13. 컴퓨팅 리소스를 제공하는 AWS 서비스 (2개 선택)

다음 중 컴퓨팅 리소스를 제공하는 AWS 서비스는 무엇입니까? (두 개를 선택합니다.)

- A. AWS Lambda
- B. Amazon Elastic Container Service (Amazon ECS)
- C. AWS CodeDeploy
- D. Amazon Glacier
- E. AWS Organizations

**정답: A, B**

✅ **A. AWS Lambda**: Lambda는 서버리스 컴퓨팅 서비스로 코드를 실행하는 컴퓨팅 리소스를 제공합니다. 서버를 프로비저닝하거나 관리하지 않고도 코드를 실행할 수 있습니다.

✅ **B. Amazon ECS**: ECS는 컨테이너를 실행하고 관리하는 컨테이너 오케스트레이션 서비스입니다. Docker 컨테이너 형태의 컴퓨팅 리소스를 제공합니다.

❌ **C. AWS CodeDeploy**: CodeDeploy는 애플리케이션 배포를 자동화하는 서비스로, 컴퓨팅 리소스 자체를 제공하지 않습니다.

❌ **D. Amazon Glacier**: Glacier(현 S3 Glacier)는 저비용 장기 데이터 아카이빙 스토리지 서비스로, 컴퓨팅 리소스가 아닙니다.

❌ **E. AWS Organizations**: Organizations는 여러 AWS 계정을 중앙에서 관리하는 서비스로, 컴퓨팅 리소스 제공 서비스가 아닙니다.

💡 **시험 꿀팁**: AWS 컴퓨팅 서비스 = EC2(가상 서버) + Lambda(서버리스) + ECS/EKS(컨테이너) + Elastic Beanstalk(PaaS). 스토리지(S3, Glacier, EBS), 데이터베이스(RDS, DynamoDB)와 명확히 구분하세요.

---

## Q14. 인프라를 코드로 구현하는 AWS 서비스

리소스 프로비저닝 프로세스를 자동화하여 인프라를 코드로 구현할 수 있도록 지원하는 AWS 서비스는 무엇입니까?

- A. Amazon GameLift
- B. AWS CloudFormation
- C. AWS Data Pipeline
- D. AWS Glue

**정답: B**

✅ **B. AWS CloudFormation**: CloudFormation은 AWS의 IaC(Infrastructure as Code) 서비스입니다. JSON 또는 YAML 형식의 템플릿으로 AWS 리소스를 정의하고, 전체 인프라 스택을 자동으로 프로비저닝하고 관리할 수 있습니다.

❌ **A. Amazon GameLift**: GameLift는 클라우드에서 멀티플레이어 게임 서버를 호스팅하고 확장하는 서비스로, IaC와는 무관합니다.

❌ **C. AWS Data Pipeline**: Data Pipeline은 데이터 처리 및 이동 워크플로를 자동화하는 서비스로, 인프라 프로비저닝과는 다릅니다.

❌ **D. AWS Glue**: Glue는 ETL(Extract, Transform, Load) 작업을 위한 서버리스 데이터 통합 서비스로, 인프라 프로비저닝과는 관련이 없습니다.

💡 **시험 꿀팁**: IaC(Infrastructure as Code) = AWS CloudFormation. 핵심 특징: 템플릿(JSON/YAML) → 스택 생성 → 자동 프로비저닝. "인프라 자동화", "코드로 인프라 관리", "스택 배포" 키워드 → CloudFormation. CDK(Cloud Development Kit)도 CloudFormation 기반 IaC 도구입니다.

---

## Q15. 사내 아키텍처를 AWS로 확장하는 서비스 (2개 선택)

사내 아키텍처를 AWS 클라우드로 확장할 수 있는 방법을 제공하는 AWS 서비스는 무엇입니까? (2개 선택)

- A. Amazon EBS
- B. AWS Direct Connect
- C. Amazon CloudFront
- D. AWS Storage Gateway
- E. Amazon Connect
- F. AWS VPN
- G. CloudHSM

**정답: B, D (또는 B, F)**

✅ **B. AWS Direct Connect**: Direct Connect는 온프레미스 데이터센터와 AWS 간의 전용 네트워크 연결을 제공합니다. 인터넷을 거치지 않는 안정적이고 빠른 사설 연결로 하이브리드 아키텍처를 구현합니다.

✅ **D. AWS Storage Gateway**: Storage Gateway는 온프레미스 환경과 AWS 클라우드 스토리지를 연결하는 하이브리드 스토리지 서비스입니다. 사내 애플리케이션이 AWS 스토리지를 로컬 스토리지처럼 사용할 수 있게 해줍니다.

❌ **A. Amazon EBS**: EBS는 EC2 인스턴스용 블록 스토리지 서비스로, 온프레미스와의 연결 확장 기능이 없습니다.

❌ **C. Amazon CloudFront**: CloudFront는 CDN 서비스로 콘텐츠 전송 가속화가 목적이며, 온프레미스-AWS 연결 확장 서비스가 아닙니다.

❌ **E. Amazon Connect**: Connect는 클라우드 기반 고객 센터(콜센터) 서비스로, 하이브리드 네트워크 확장과는 무관합니다.

❌ **G. CloudHSM**: CloudHSM은 하드웨어 보안 모듈 서비스로 암호화 키 관리에 사용되며, 온프레미스 아키텍처 확장 서비스가 아닙니다.

💡 **시험 꿀팁**: 온프레미스-AWS 연결 서비스 = Direct Connect(전용 회선, 안정적) + AWS VPN(인터넷 기반 암호화 터널) + Storage Gateway(스토리지 하이브리드). "하이브리드 아키텍처", "사내 연결", "온프레미스 확장" 키워드를 보면 이 세 서비스를 떠올리세요.

---

## Q16. AWS 엣지 로케이션을 사용하는 서비스 (2개 선택)

AWS 엣지 위치를 사용하는 서비스는 무엇입니까? (두 개를 선택합니다.)

- A. Amazon CloudFront
- B. AWS Shield
- C. Amazon EC2
- D. Amazon RDS
- E. Amazon ElastiCache

**정답: A, B**

✅ **A. Amazon CloudFront**: CloudFront는 전 세계 엣지 로케이션 네트워크를 통해 콘텐츠를 사용자 근처에서 제공하는 CDN 서비스입니다. 엣지 로케이션은 CloudFront의 핵심 인프라입니다.

✅ **B. AWS Shield**: AWS Shield는 CloudFront, Route 53 등 AWS 엣지 서비스와 통합되어 DDoS 공격으로부터 보호합니다. Shield의 보호는 AWS 엣지 네트워크 레벨에서 동작합니다.

❌ **C. Amazon EC2**: EC2 인스턴스는 특정 리전의 가용성 영역(AZ)에 배포되며, 엣지 로케이션과는 관련이 없습니다.

❌ **D. Amazon RDS**: RDS는 관리형 관계형 데이터베이스 서비스로, 특정 리전/AZ에 배포되며 엣지 로케이션을 사용하지 않습니다.

❌ **E. Amazon ElastiCache**: ElastiCache는 인메모리 캐싱 서비스(Redis/Memcached)로, 리전 내 AZ에 배포되며 엣지 로케이션과 무관합니다.

💡 **시험 꿀팁**: 엣지 로케이션 사용 서비스 = CloudFront(CDN) + Route 53(DNS) + AWS Shield + AWS WAF + Lambda@Edge. 엣지 로케이션은 리전보다 수가 훨씬 많으며(400+개) 사용자와 가장 가까운 곳에 위치합니다.

---

## Q17. 하이브리드 아키텍처 네트워크 연결 서비스

AWS 클라우드를 포함하는 하이브리드 아키텍처에서 네트워크 연결을 제공하는 서비스는 무엇입니까?

- A. Amazon VPC
- B. AWS Direct Connect
- C. AWS Directory Service
- D. Amazon API Gateway

**정답: B**

✅ **B. AWS Direct Connect**: Direct Connect는 온프레미스 데이터센터와 AWS 사이에 전용 사설 네트워크 연결을 구축합니다. 인터넷을 거치지 않아 더 안정적이고 일관된 네트워크 성능을 제공하며, 하이브리드 아키텍처의 핵심 연결 서비스입니다.

❌ **A. Amazon VPC**: VPC(Virtual Private Cloud)는 AWS 클라우드 내에서 격리된 가상 네트워크를 생성하는 서비스입니다. 온프레미스와의 연결은 VPC와 Direct Connect/VPN을 함께 사용해야 합니다.

❌ **C. AWS Directory Service**: Directory Service는 Microsoft Active Directory를 AWS에서 관리하는 서비스로, 네트워크 연결 서비스가 아닙니다.

❌ **D. Amazon API Gateway**: API Gateway는 API를 생성, 관리, 모니터링하는 서비스로, 하이브리드 네트워크 연결과는 무관합니다.

💡 **시험 꿀팁**: 하이브리드 네트워크 연결 = Direct Connect(전용 회선, 빠르고 안정적, 비용 높음) vs AWS Site-to-Site VPN(인터넷 기반, 저렴, 암호화). "전용 연결", "안정적인 네트워크", "하이브리드" → Direct Connect.

---

## Q18. AWS Marketplace 타사 소프트웨어 사용 이유 (2개 선택)

Amazon EC2에 타사 소프트웨어를 설치하는 대신 AWS Marketplace의 타사 소프트웨어를 사용하는 이유는 무엇입니까? (2개 선택)

- A. 사용자는 라이센스에 따라 시간 또는 월 단위로 소프트웨어 비용을 지불합니다.
- B. AWS Marketplace는 사용자가 원클릭으로 애플리케이션을 시작할 수 있도록 지원합니다.
- C. AWS Marketplace 데이터 암호화는 타사 공급업체에서 관리합니다.
- D. AWS Marketplace를 사용하면 새로운 소프트웨어 버전으로 업그레이드할 필요가 없습니다.
- E. 사용자는 테스트 없이 타사 소프트웨어를 배포할 수 있습니다.

**정답: A, B**

✅ **A. 사용자는 라이센스에 따라 시간 또는 월 단위로 소프트웨어 비용을 지불합니다.**: AWS Marketplace는 소프트웨어를 구독 방식(시간당, 월간, 연간)으로 구매할 수 있어 대규모 선불 라이센스 비용 없이 유연하게 소프트웨어를 사용할 수 있습니다.

✅ **B. AWS Marketplace는 사용자가 원클릭으로 애플리케이션을 시작할 수 있도록 지원합니다.**: Marketplace에서 소프트웨어를 구매하면 미리 구성된 AMI나 컨테이너로 원클릭 배포가 가능하여 설치 및 구성 작업을 크게 줄일 수 있습니다.

❌ **C. AWS Marketplace 데이터 암호화는 타사 공급업체에서 관리합니다.**: 데이터 암호화는 공유 책임 모델에 따라 고객이 책임지며, 타사 공급업체가 자동으로 관리하지 않습니다.

❌ **D. 새로운 소프트웨어 버전으로 업그레이드할 필요가 없습니다.**: AWS Marketplace 사용과 관계없이 소프트웨어 업그레이드는 필요에 따라 진행해야 합니다.

❌ **E. 사용자는 테스트 없이 타사 소프트웨어를 배포할 수 있습니다.**: AWS Marketplace에서 구매한 소프트웨어도 프로덕션 환경 배포 전에 테스트는 필요합니다. 이는 모범 사례에 어긋납니다.

💡 **시험 꿀팁**: AWS Marketplace = 타사 소프트웨어 디지털 카탈로그 + 유연한 라이센싱(시간/월/연) + 원클릭 배포 + AWS 요금에 통합 청구. "손쉬운 배포", "유연한 요금", "통합 청구"가 핵심 장점입니다.

---

## Q19. 클라우드 아키텍처 설계 원칙

다음 중 클라우드 아키텍처 설계 원칙은 무엇입니까?

- A. 스케일업, 스케일아웃이 아닌
- B. 느슨하게 결합된 구성 요소
- C. 단일 시스템을 구축합니다.
- D. 상용 데이터베이스 소프트웨어를 사용합니다.

**정답: B**

✅ **B. 느슨하게 결합된 구성 요소**: AWS Well-Architected Framework의 핵심 설계 원칙 중 하나로, 구성 요소 간의 의존성을 최소화하여 한 구성 요소의 변경이나 장애가 다른 구성 요소에 영향을 미치지 않도록 설계합니다. SQS, SNS 등을 통한 비동기 통신이 대표적입니다.

❌ **A. 스케일업, 스케일아웃이 아닌**: 클라우드 설계 원칙은 반대입니다. 수평 확장(Scale Out)을 선호하며, 단일 서버의 사양을 높이는 스케일업보다 여러 서버를 추가하는 스케일아웃이 클라우드 원칙에 부합합니다.

❌ **C. 단일 시스템을 구축합니다.**: 클라우드 설계는 단일 대형 시스템이 아닌 마이크로서비스 또는 분산 시스템 아키텍처를 권장합니다.

❌ **D. 상용 데이터베이스 소프트웨어를 사용합니다.**: 클라우드 설계 원칙은 비용 효율적인 오픈소스 데이터베이스 사용 또는 관리형 서비스(RDS, DynamoDB) 활용을 권장합니다.

💡 **시험 꿀팁**: AWS 클라우드 설계 원칙 핵심 = 느슨한 결합(Loose Coupling) + 수평 확장(Scale Out) + 서비스 분리 + 관리형 서비스 활용 + 장애 설계(Design for Failure). "단단히 결합(Tight Coupling)"은 안티패턴입니다.

---

## Q20. 공유 책임 모델에서 고객의 책임 (2개 선택)

공유 책임 모델에서 다음 중 고객의 책임은 무엇입니까? (두 개를 선택합니다.)

- A. 네트워크 인프라의 펌웨어 업그레이드
- B. 운영 체제 패치 적용
- C. 기본 하이퍼바이저 패치 적용
- D. 데이터 센터의 물리적 보안
- E. Security Group 구성

**정답: B, E**

✅ **B. 운영 체제 패치 적용**: EC2와 같은 IaaS 서비스에서 OS(운영 체제) 패치 및 업데이트는 고객의 책임입니다. AWS는 하이퍼바이저 아래 인프라를 관리하고, 고객은 OS 레벨 이상을 관리합니다.

✅ **E. Security Group 구성**: Security Group은 EC2 인스턴스 레벨의 가상 방화벽으로, 인바운드/아웃바운드 트래픽 규칙 설정은 전적으로 고객의 책임입니다.

❌ **A. 네트워크 인프라의 펌웨어 업그레이드**: 물리적 네트워크 장비의 펌웨어 관리는 AWS의 책임입니다. 고객은 물리적 인프라에 접근할 수 없습니다.

❌ **C. 기본 하이퍼바이저 패치 적용**: 하이퍼바이저는 EC2 인스턴스를 실행하는 가상화 레이어로, AWS가 관리하고 패치합니다. 고객은 하이퍼바이저에 접근할 수 없습니다.

❌ **D. 데이터 센터의 물리적 보안**: 데이터센터의 물리적 보안(출입 통제, 감시 등)은 AWS의 책임입니다. 고객은 데이터센터에 물리적으로 접근할 수 없습니다.

💡 **시험 꿀팁**: 공유 책임 모델 암기법 = AWS 책임(클라우드 "의" 보안): 물리적 보안, 하이퍼바이저, 네트워크 인프라, 글로벌 인프라. 고객 책임(클라우드 "내" 보안): OS 패치, 애플리케이션, 데이터 암호화, IAM 설정, Security Group, Network ACL. EC2는 고객이 OS를 직접 관리하므로 OS 패치는 항상 고객 책임입니다.

---

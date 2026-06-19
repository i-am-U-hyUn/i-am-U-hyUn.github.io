---
title: "AWS CLF-C02 덤프 해설 Part 12"
date: 2026-06-18 00:12:00 +0900
categories: [자격증, AWS]
tags: [AWS, CLF-C02, 덤프, 문제풀이, 자격증]
toc: true
---

AWS CLF-C02 시험 대비 덤프 문제 Part 12입니다. 각 문제마다 정답 해설과 오답 이유, 시험 꿀팁을 정리했습니다.

---

## Q1. 제한 없는 Security Group 식별 서비스

사용자의 AWS 리소스에 제한 없이 액세스할 수 있는 Security Group을 식별하는 AWS 서비스는 무엇입니까?

- A. AWS CloudTrail
- B. AWS Trusted Advisor
- C. Amazon CloudWatch
- D. Amazon Inspector

**정답: B**

✅ **B. AWS Trusted Advisor**: Trusted Advisor는 보안 카테고리에서 "Security Groups - Unrestricted Access(제한 없는 액세스 보안 그룹)" 검사를 제공합니다. 0.0.0.0/0 또는 ::/0으로 설정된 인바운드 규칙을 가진 보안 그룹을 자동으로 탐지하고 알려줍니다.

❌ **A. AWS CloudTrail**: CloudTrail은 AWS 계정의 API 호출 이력을 기록하는 감사 로그 서비스로, 보안 그룹 설정 자체를 분석하여 위험을 식별하지는 않습니다.

❌ **C. Amazon CloudWatch**: CloudWatch는 AWS 리소스의 모니터링 및 지표 수집 서비스로, 보안 그룹의 설정 상태를 분석하는 기능은 없습니다.

❌ **D. Amazon Inspector**: Inspector는 EC2 인스턴스 및 컨테이너 이미지의 취약점을 스캔하는 서비스로, 주로 OS 및 소프트웨어 취약점 분석에 특화되어 있습니다.

💡 **시험 꿀팁**: Trusted Advisor = 5개 카테고리(비용 최적화, 성능, 보안, 내결함성, 서비스 한도) 자동 검사 도구. 보안 그룹 제한 없는 액세스, S3 버킷 공개 여부, MFA 미사용 등을 탐지합니다.

---

## Q2. 구성 관리의 공유 책임

AWS 공유 책임 모델에 따르면 구성 관리는 누가 담당합니까?

- A. 전적으로 고객의 책임입니다.
- B. 전적으로 AWS의 책임입니다.
- C. AWS와 고객 간에 공유됩니다.
- D. AWS 공유 책임 모델의 일부가 아닙니다.

**정답: C**

✅ **C. AWS와 고객 간에 공유됩니다**: AWS는 기본 인프라(하이퍼바이저, 네트워크 장비 등)의 구성 관리를 담당하고, 고객은 자신이 배포하는 서비스(EC2, RDS 등)의 구성 및 애플리케이션 설정을 관리합니다. 구성 관리는 양측이 각자의 영역에서 분담하는 공유 책임입니다.

❌ **A. 전적으로 고객의 책임입니다**: 고객이 자신의 리소스 구성을 관리하는 것은 맞지만, AWS도 물리적 인프라와 관리형 서비스의 구성을 담당하므로 전적으로 고객만의 책임은 아닙니다.

❌ **B. 전적으로 AWS의 책임입니다**: AWS가 하드웨어 인프라 구성을 관리하지만, 고객이 설정하는 보안 그룹, IAM 정책, 애플리케이션 구성 등은 고객 책임입니다.

❌ **D. AWS 공유 책임 모델의 일부가 아닙니다**: 구성 관리는 AWS 공유 책임 모델의 핵심 요소 중 하나입니다. 모델에서 명확히 다루는 영역입니다.

💡 **시험 꿀팁**: 공유 책임 모델 핵심 — AWS는 "클라우드의 보안(Security OF the Cloud)", 고객은 "클라우드에서의 보안(Security IN the Cloud)". 물리적 데이터센터, 하이퍼바이저 = AWS 책임. OS 패치, 데이터 암호화, IAM 설정 = 고객 책임.

---

## Q3. 전 세계 콘텐츠 빠른 전송 CDN 서비스

짧은 대기 시간과 빠른 속도로 전 세계 사용자에게 데이터, 비디오 및 애플리케이션을 안전하게 제공하는 콘텐츠 제공 네트워크인 AWS 서비스는 무엇입니까?

- A. AWS CloudFormation
- B. AWS Direct Connect
- C. Amazon CloudFront
- D. Amazon 핀포인트

**정답: C**

✅ **C. Amazon CloudFront**: CloudFront는 AWS의 CDN(Content Delivery Network) 서비스로, 전 세계 엣지 로케이션을 통해 콘텐츠를 사용자와 가장 가까운 서버에서 제공하여 지연 시간을 최소화합니다. 비디오, 정적 파일, API 응답 등을 빠르고 안전하게 전송합니다.

❌ **A. AWS CloudFormation**: CloudFormation은 인프라를 코드(IaC)로 프로비저닝하는 서비스로, CDN 기능과는 관련이 없습니다.

❌ **B. AWS Direct Connect**: Direct Connect는 온프레미스 데이터센터와 AWS 사이를 전용 물리 회선으로 연결하는 서비스로, 콘텐츠 배포 네트워크가 아닙니다.

❌ **D. Amazon 핀포인트**: Amazon Pinpoint는 마케팅 커뮤니케이션 및 사용자 참여를 위한 서비스(이메일, SMS, 푸시 알림 등)로, 콘텐츠 전송 네트워크가 아닙니다.

💡 **시험 꿀팁**: CloudFront = CDN + 엣지 로케이션 + 짧은 지연 시간 + DDoS 방어(AWS Shield 통합). "전 세계", "짧은 지연 시간", "콘텐츠 배포"가 나오면 CloudFront를 선택하세요.

---

## Q4. 수요 변화에 맞춘 리소스 공급 능력

워크로드 수요 변화에 맞춰 리소스 공급을 지원하는 AWS 클라우드의 이점은 무엇입니까?

- A. 보안
- B. 신뢰성
- C. 탄력성
- D. 고가용성

**정답: C**

✅ **C. 탄력성**: 탄력성(Elasticity)은 수요 변화에 따라 자동으로 리소스를 확장(Scale Out)하거나 축소(Scale In)하는 능력입니다. AWS Auto Scaling, Elastic Load Balancer 등이 이를 지원하며, 사용량에 따라 비용을 최적화할 수 있습니다.

❌ **A. 보안**: 보안은 데이터 보호, 접근 제어, 규정 준수와 관련된 개념으로, 리소스 공급의 탄력적 조정과는 다른 개념입니다.

❌ **B. 신뢰성**: 신뢰성은 시스템이 장애 없이 의도한 기능을 수행하는 능력으로, 내결함성 및 복구와 관련된 개념입니다. 수요 변화에 따른 리소스 조정은 탄력성입니다.

❌ **D. 고가용성**: 고가용성은 시스템이 가능한 한 오랫동안 운영 상태를 유지하는 것을 의미하며, 다중 AZ 배포 등과 관련됩니다. 수요 변화에 대응하는 확장/축소와는 구별됩니다.

💡 **시험 꿀팁**: 탄력성(Elasticity) vs 확장성(Scalability) 구분! 탄력성 = 자동으로 늘어났다가 줄어드는 것(수요 맞춤). 확장성 = 커질 수 있는 능력. AWS에서 탄력성의 대표 서비스는 Auto Scaling입니다.

---

## Q5. DDoS 공격 관련 IP 신고 대상

사용자가 AWS에서 응용 프로그램을 실행하고 있으며 하나 이상의 AWS 소유 IP 주소가 분산 서비스 거부(DDoS) 공격에 관련되어 있음을 알 수 있습니다. 사용자는 이 상황에 대해 누구에게 먼저 연락해야 합니까?

- A. AWS 프리미엄 지원
- B. AWS 기술 계정 관리자
- C. AWS 솔루션 설계자
- D. AWS Trust & Safety 팀

**정답: D**

✅ **D. AWS Trust & Safety 팀**: AWS Trust & Safety 팀은 AWS 인프라가 악용되는 경우(DDoS 공격, 스팸 발송, 악성 콘텐츠 호스팅 등)를 처리하는 전담 팀입니다. AWS 소유 IP 주소가 공격에 사용되는 경우, 이 팀에 신고하면 해당 문제를 조사하고 적절한 조치를 취합니다.

❌ **A. AWS 프리미엄 지원**: 프리미엄 지원은 기술적인 문제 해결을 돕지만, AWS 인프라 악용 신고는 Trust & Safety 팀의 전담 영역입니다.

❌ **B. AWS 기술 계정 관리자**: TAM(Technical Account Manager)은 고객의 AWS 사용을 기술적으로 지원하는 역할이지만, 보안 침해나 AWS 인프라 악용 신고 창구가 아닙니다.

❌ **C. AWS 솔루션 설계자**: 솔루션 설계자는 아키텍처 설계와 기술 컨설팅을 제공하며, 보안 인시던트 신고 담당이 아닙니다.

💡 **시험 꿀팁**: AWS 인프라가 악용(DDoS, 스팸, 피싱 등) = AWS Trust & Safety 팀(abuse@amazonaws.com). 내 계정의 보안 문제 = AWS Support. 구분해서 기억하세요!

---

## Q6. AWS Cloud 인프라 호스팅의 이점 (2개 선택)

다음 중 AWS Cloud에서 인프라를 호스팅할 때 얻을 수 있는 이점은 무엇입니까? (2개 선택)

- A. 선불 약속이 없다.
- B. AWS는 클라우드의 모든 보안을 관리합니다.
- C. 사용자는 필요에 따라 리소스를 프로비저닝할 수 있습니다.
- D. 사용자는 무제한의 무료 스토리지에 액세스할 수 있습니다.
- E. 사용자는 물리적 인프라를 제어할 수 있습니다.

**정답: A, C**

✅ **A. 선불 약속이 없다**: AWS는 종량제(Pay-as-you-go) 방식으로 사용한 만큼만 비용을 지불하며, 온프레미스처럼 대규모 초기 자본 지출(CapEx)이 필요하지 않습니다. 이는 클라우드의 핵심 재정적 이점입니다.

✅ **C. 사용자는 필요에 따라 리소스를 프로비저닝할 수 있습니다**: AWS는 온디맨드 리소스 프로비저닝을 지원하여 필요한 만큼 즉시 리소스를 확장하거나 축소할 수 있습니다. 이는 탄력성과 민첩성의 핵심 이점입니다.

❌ **B. AWS는 클라우드의 모든 보안을 관리합니다**: 공유 책임 모델에 따라 AWS는 인프라 보안만 담당하고, 데이터, IAM, OS 보안 등은 고객 책임입니다. "모든 보안"은 틀린 표현입니다.

❌ **D. 사용자는 무제한의 무료 스토리지에 액세스할 수 있습니다**: AWS 스토리지는 사용량에 따라 비용이 청구됩니다. 무제한 무료 스토리지는 존재하지 않습니다(Free Tier는 제한적).

❌ **E. 사용자는 물리적 인프라를 제어할 수 있습니다**: AWS 클라우드에서는 물리적 하드웨어와 데이터센터 인프라를 AWS가 관리하며, 고객은 물리적 인프라에 접근하거나 제어할 수 없습니다.

💡 **시험 꿀팁**: AWS 클라우드 6대 이점 기억 — ①선불 비용 없음 ②거대한 규모의 경제 ③용량 추정 불필요 ④속도 및 민첩성 향상 ⑤데이터센터 운영 비용 절감 ⑥글로벌 확장. "무료"나 "모든 것" 같은 절대적 표현은 대부분 오답!

---

## Q7. AWS Trusted Advisor의 정의

AWS Trusted Advisor란 무엇입니까?

- A. AWS의 사용 방법에 대한 권장 사항과 모범 사례를 제공하는 AWS 직원입니다.
- B. AWS 파트너의 네트워크로 AWS 사용 방법에 대한 권장 사항과 모범 사례를 제공합니다.
- C. 비용 최적화, 성능 및 보안에 대한 권장 사항을 제공하는 자동 검사 세트가 있는 온라인 도구입니다.
- D. 비용 최적화, 성능 및 보안에 대한 권장 사항을 제공하는 AWS Technical Account Manager의 다른 이름입니다.

**정답: C**

✅ **C. 비용 최적화, 성능 및 보안에 대한 권장 사항을 제공하는 자동 검사 세트가 있는 온라인 도구입니다**: AWS Trusted Advisor는 AWS 계정을 자동으로 분석하여 비용 최적화, 성능, 보안, 내결함성, 서비스 한도 5개 카테고리에 걸쳐 모범 사례 권장 사항을 제공하는 온라인 도구입니다.

❌ **A. AWS의 사용 방법에 대한 권장 사항과 모범 사례를 제공하는 AWS 직원입니다**: Trusted Advisor는 사람(직원)이 아니라 자동화된 온라인 도구입니다.

❌ **B. AWS 파트너의 네트워크로 AWS 사용 방법에 대한 권장 사항과 모범 사례를 제공합니다**: AWS 파트너 네트워크(APN)는 별도의 파트너 생태계 프로그램입니다. Trusted Advisor는 파트너 네트워크가 아닙니다.

❌ **D. 비용 최적화, 성능 및 보안에 대한 권장 사항을 제공하는 AWS Technical Account Manager의 다른 이름입니다**: TAM(Technical Account Manager)은 Enterprise 지원 플랜의 실제 담당자이며, Trusted Advisor와는 완전히 별개의 서비스입니다.

💡 **시험 꿀팁**: Trusted Advisor = 자동화된 도구 (사람 X). 5개 검사 카테고리: 비용 최적화(Cost Optimization), 성능(Performance), 보안(Security), 내결함성(Fault Tolerance), 서비스 한도(Service Limits). Basic/Developer 플랜은 일부 검사만 무료 제공.

---

## Q8. 비용과 사용량 시각화 서비스

AWS 비용과 사용량을 시간에 따라 시각화하고 이해하며 관리할 수 있는 AWS 서비스 또는 기능은 무엇입니까?

- A. AWS 예산
- B. AWS 비용 탐색기
- C. AWS 조직
- D. 통합 청구

**정답: B**

✅ **B. AWS 비용 탐색기**: AWS Cost Explorer(비용 탐색기)는 AWS 비용과 사용량을 시간별, 서비스별, 태그별로 시각화하고 분석할 수 있는 도구입니다. 과거 13개월의 데이터를 그래프로 확인하고 향후 12개월의 비용을 예측할 수 있습니다.

❌ **A. AWS 예산**: AWS Budgets는 비용 또는 사용량 한도를 설정하고 초과 시 알림을 받는 서비스로, 주로 예산 관리와 알림에 초점이 맞춰져 있습니다. 시각화 및 분석 기능은 Cost Explorer가 더 강력합니다.

❌ **C. AWS 조직**: AWS Organizations는 여러 AWS 계정을 중앙에서 관리하는 서비스로, 비용 시각화 도구가 아닙니다.

❌ **D. 통합 청구**: 통합 청구(Consolidated Billing)는 AWS Organizations의 기능으로, 여러 계정의 청구서를 하나로 통합하는 것입니다. 시간별 비용 시각화 도구가 아닙니다.

💡 **시험 꿀팁**: 비용 관련 서비스 구분 — Cost Explorer(탐색기) = 시각화 + 분석 + 예측 / Budgets(예산) = 한도 설정 + 알림 / Cost & Usage Report = 상세 원시 데이터. "시각화"가 핵심 키워드면 Cost Explorer!

---

## Q9. 보안 및 규정 준수 보고서 온디맨드 액세스 서비스

AWS 보안 및 규정 준수 보고서에 대한 온디맨드 액세스를 제공하는 AWS 서비스는 무엇입니까?

- A. AWS CloudTrail
- B. AWS 아티팩트
- C. AWS Health
- D. Amazon CloudWatch

**정답: B**

✅ **B. AWS 아티팩트**: AWS Artifact는 AWS의 보안 및 규정 준수 관련 문서(SOC 보고서, PCI DSS, ISO 인증서 등)를 온디맨드로 다운로드할 수 있는 셀프서비스 포털입니다. 감사 및 규정 준수 검토 시 필요한 공식 문서를 즉시 확인할 수 있습니다.

❌ **A. AWS CloudTrail**: CloudTrail은 AWS 계정 내 API 호출 활동을 기록하는 감사 추적 서비스입니다. AWS의 공식 규정 준수 인증 보고서를 제공하지는 않습니다.

❌ **C. AWS Health**: AWS Health(이전 Personal Health Dashboard)는 AWS 서비스 상태, 유지 관리 일정, 계정에 영향을 주는 이벤트를 알려주는 서비스로, 규정 준수 보고서 제공 서비스가 아닙니다.

❌ **D. Amazon CloudWatch**: CloudWatch는 리소스 모니터링 및 지표 수집 서비스로, 보안 규정 준수 보고서와는 관련이 없습니다.

💡 **시험 꿀팁**: AWS Artifact = AWS의 공식 규정 준수 문서 저장소(SOC 1/2/3, PCI, ISO, HIPAA BAA 등). 감사(Audit), 규정 준수(Compliance), 인증서(Certificate) 키워드가 나오면 Artifact를 선택하세요!

---

## Q10. Amazon CloudWatch 로그의 기능 (2개 선택)

다음 중 Amazon CloudWatch 로그의 기능은 무엇입니까? (2개 선택)

- A. 아마존 간편 알림 서비스(Amazon SNS)별 요약
- B. 무료 Amazon Elastic 검색 서비스 분석
- C. 무상으로 제공됨
- D. 실시간 모니터링
- E. 조절 가능한 고정 장치

**정답: D, E**

✅ **D. 실시간 모니터링**: CloudWatch Logs는 애플리케이션, AWS 서비스, 온프레미스 서버에서 생성되는 로그 데이터를 실시간으로 수집하고 모니터링합니다. 로그 스트림을 통해 실시간 이벤트 추적이 가능합니다.

✅ **E. 조절 가능한 고정 장치**: CloudWatch Logs는 로그 보존 기간(Retention)을 1일부터 최대 10년까지 조절하여 설정할 수 있습니다. 이 "조절 가능한 고정 장치"는 로그 보존 기간 설정 기능을 의미합니다.

❌ **A. 아마존 간편 알림 서비스(Amazon SNS)별 요약**: CloudWatch Logs는 SNS별 요약 기능을 직접 제공하지 않습니다. CloudWatch 경보는 SNS와 연동될 수 있지만, 이는 Logs 자체의 기능이 아닙니다.

❌ **B. 무료 Amazon Elastic 검색 서비스 분석**: CloudWatch Logs는 Amazon OpenSearch Service(구 Elasticsearch)와 연동할 수 있지만, 무료 분석 기능을 기본 제공하지 않으며 별도 비용이 발생합니다.

❌ **C. 무상으로 제공됨**: CloudWatch Logs는 유료 서비스입니다. 수집, 저장, 조회에 각각 비용이 발생하며 완전히 무료로 제공되지 않습니다(일부 Free Tier 제공).

💡 **시험 꿀팁**: CloudWatch Logs 핵심 기능 — 실시간 로그 수집 및 모니터링, 로그 보존 기간 설정, 로그 인사이트를 통한 쿼리 분석, CloudWatch Alarms와 연동. "실시간 모니터링"은 CloudWatch의 대표 키워드입니다.

---

## Q11. AWS 서비스 상호작용 방법 (2개 선택)

다음 중 고객이 AWS 서비스와 상호 작용할 수 있는 유효한 방법은 무엇입니까? (2개 선택)

- A. 명령줄 인터페이스
- B. 사내
- C. 소프트웨어 개발 키트
- D. SaaS(Software-as-a-Service)
- E. 하이브리드

**정답: A, C**

✅ **A. 명령줄 인터페이스**: AWS CLI(Command Line Interface)는 터미널에서 명령어를 통해 AWS 서비스를 제어하는 공식 도구입니다. AWS 관리 콘솔, CLI, SDK가 AWS 서비스와 상호작용하는 3가지 주요 방법입니다.

✅ **C. 소프트웨어 개발 키트**: AWS SDK(Software Development Kit)는 Python(Boto3), Java, JavaScript, .NET 등 다양한 프로그래밍 언어에서 AWS 서비스를 호출할 수 있는 라이브러리입니다.

❌ **B. 사내(On-premises)**: 온프레미스는 AWS와 상호작용하는 방법이 아니라, 자체 데이터센터에 인프라를 배치하는 방식을 의미합니다.

❌ **D. SaaS(Software-as-a-Service)**: SaaS는 클라우드 서비스 제공 모델(소프트웨어를 서비스로 제공)이지, AWS 서비스와 상호작용하는 방법이 아닙니다.

❌ **E. 하이브리드**: 하이브리드는 온프레미스와 클라우드를 혼합 사용하는 아키텍처 방식이지, AWS 서비스와 상호작용하는 수단이 아닙니다.

💡 **시험 꿀팁**: AWS 서비스와 상호작용하는 3가지 방법 = ①AWS 관리 콘솔(웹 브라우저) ②AWS CLI(명령줄) ③AWS SDK(프로그래밍 언어). 이 세 가지가 핵심이며, 그 외에 AWS CloudShell, API 직접 호출도 가능합니다.

---

## Q12. 온라인 비디오 콘텐츠 제공 서비스 (2개 선택)

다음 AWS 서비스 중 지연 시간이 가장 짧은 대량의 온라인 비디오 콘텐츠를 제공하는 데 사용할 수 있는 서비스는 무엇입니까? (2개 선택)

- A. AWS 스토리지 게이트웨이
- B. 아마존 S3
- C. Amazon EFS(Elastic File System)
- D. 아마존 빙하(Amazon Glacier)
- E. Amazon CloudFront

**정답: B, E**

✅ **B. 아마존 S3**: Amazon S3는 비디오 파일을 저장하고 전 세계에 제공하기 위한 고내구성 객체 스토리지 서비스입니다. 대용량 비디오 콘텐츠 원본 스토리지로 적합하며 CloudFront와 결합하면 효율적인 콘텐츠 배포가 가능합니다.

✅ **E. Amazon CloudFront**: CloudFront는 전 세계 엣지 로케이션을 통해 비디오 콘텐츠를 최소 지연 시간으로 사용자에게 전송하는 CDN 서비스입니다. 스트리밍 비디오 배포에 최적화되어 있습니다.

❌ **A. AWS 스토리지 게이트웨이**: Storage Gateway는 온프레미스 환경을 AWS 클라우드 스토리지와 연결하는 하이브리드 스토리지 서비스로, 비디오 콘텐츠 배포에 특화되어 있지 않습니다.

❌ **C. Amazon EFS(Elastic File System)**: EFS는 EC2 인스턴스에서 공유 파일 시스템으로 사용하는 관리형 NFS 스토리지로, 비디오 콘텐츠를 전 세계 사용자에게 배포하는 용도로는 적합하지 않습니다.

❌ **D. 아마존 빙하(Amazon Glacier)**: Amazon S3 Glacier는 저비용 장기 아카이빙 스토리지로, 데이터 검색 시간이 수 분에서 수 시간까지 걸립니다. 실시간 비디오 스트리밍에는 부적합합니다.

💡 **시험 꿀팁**: 비디오 콘텐츠 배포 = S3(원본 저장) + CloudFront(빠른 배포) 조합. Glacier = 콜드 스토리지(아카이빙, 즉시 접근 불가). "짧은 지연 시간" + "콘텐츠 배포" = 항상 CloudFront가 정답에 포함됩니다.

---

## Q13. AWS에서 제공하는 보안 관련 서비스 (2개 선택)

다음 중 AWS에서 제공하는 보안 관련 서비스는 무엇입니까? (2개 선택)

- A. 멀티 팩터 인증 물리적 토큰
- B. AWS Trusted Advisor 보안 검사
- C. 데이터 암호화
- D. 자동 침투 테스트
- E. Amazon S3 저작권이 있는 콘텐츠 탐지

**정답: B, C**

✅ **B. AWS Trusted Advisor 보안 검사**: Trusted Advisor는 보안 카테고리에서 보안 그룹 설정, S3 버킷 공개 여부, IAM 사용자 설정, 루트 계정 MFA 등 다양한 보안 모범 사례를 자동으로 검사합니다.

✅ **C. 데이터 암호화**: AWS는 저장 중(at-rest) 및 전송 중(in-transit) 데이터 암호화를 위해 AWS KMS(Key Management Service), S3 SSE, EBS 암호화, TLS/SSL 등 다양한 암호화 솔루션을 제공합니다.

❌ **A. 멀티 팩터 인증 물리적 토큰**: AWS IAM은 소프트웨어 MFA(가상 MFA 앱)를 기본 제공하지만, 물리적 하드웨어 토큰은 고객이 직접 구매하여 등록해야 합니다. AWS가 물리적 토큰을 직접 제공하지는 않습니다.

❌ **D. 자동 침투 테스트**: AWS는 일부 서비스에 대한 침투 테스트를 허용하지만, 자동 침투 테스트를 서비스로 제공하지는 않습니다. 고객이 사전 승인 없이 자동화된 침투 테스트를 수행하면 이용 약관 위반이 될 수 있습니다.

❌ **E. Amazon S3 저작권이 있는 콘텐츠 탐지**: AWS는 S3에 저장된 콘텐츠의 저작권을 자동으로 탐지하는 서비스를 제공하지 않습니다. 이는 AWS의 보안 서비스 범위 밖입니다.

💡 **시험 꿀팁**: AWS 보안 서비스 핵심 — KMS(키 관리), CloudTrail(API 감사), GuardDuty(위협 탐지), Inspector(취약점 스캔), Macie(민감 데이터 탐지), WAF(웹 방화벽), Shield(DDoS 방어). Trusted Advisor도 보안 검사를 포함합니다.

---

## Q14. AWS Trusted Advisor의 범주 (2개 선택)

다음 중 AWS Trusted Advisor의 범주는 무엇입니까? (2개 선택)

- A. 내결함성
- B. 인스턴스 사용
- C. 인프라
- D. 성능
- E. 스토리지 용량

**정답: A, D**

✅ **A. 내결함성**: 내결함성(Fault Tolerance)은 AWS Trusted Advisor의 5개 공식 검사 카테고리 중 하나입니다. RDS 멀티 AZ, EBS 스냅샷 유무, Auto Scaling 그룹 설정 등을 검사합니다.

✅ **D. 성능**: 성능(Performance)은 Trusted Advisor의 5개 공식 카테고리 중 하나로, EC2 인스턴스 유형, CloudFront 콘텐츠 전송 최적화, 고사용률 EBS 볼륨 등을 분석합니다.

❌ **B. 인스턴스 사용**: "인스턴스 사용"은 Trusted Advisor의 공식 카테고리가 아닙니다. 관련 내용은 비용 최적화(Cost Optimization) 카테고리에서 다룹니다.

❌ **C. 인프라**: "인프라"는 Trusted Advisor의 공식 카테고리명이 아닙니다. Trusted Advisor는 인프라 전반을 검사하지만, 별도의 "인프라" 카테고리는 없습니다.

❌ **E. 스토리지 용량**: "스토리지 용량"은 Trusted Advisor의 독립 카테고리가 아닙니다. 스토리지 관련 내용은 비용 최적화 또는 서비스 한도 카테고리에서 일부 다룹니다.

💡 **시험 꿀팁**: Trusted Advisor 5개 카테고리 반드시 암기! ①비용 최적화(Cost Optimization) ②성능(Performance) ③보안(Security) ④내결함성(Fault Tolerance) ⑤서비스 한도(Service Limits). 이 다섯 가지 외 다른 카테고리는 오답입니다.

---

## Q15. 온프레미스 서버 애플리케이션 배포 서비스 (2개 선택)

다음 중 사내에서 실행 중인 서버에 애플리케이션을 배포하는 데 사용할 수 있는 서비스는 무엇입니까? (2개 선택)

- A. AWS Elastic Beanstalk
- B. AWS OpsWorks
- C. AWS 코드 배포(AWS CodeDeploy)
- D. AWS 배치(AWS Batch)
- E. AWS X-Ray

**정답: B, C**

✅ **B. AWS OpsWorks**: AWS OpsWorks는 Chef 및 Puppet을 사용하여 온프레미스 서버를 포함한 다양한 환경에 애플리케이션을 자동으로 구성하고 배포할 수 있는 구성 관리 서비스입니다.

✅ **C. AWS 코드 배포(AWS CodeDeploy)**: AWS CodeDeploy는 EC2 인스턴스뿐만 아니라 온프레미스 서버에도 애플리케이션을 자동으로 배포할 수 있는 완전 관리형 배포 서비스입니다. 에이전트를 온프레미스 서버에 설치하면 AWS 클라우드 서버와 동일하게 배포를 관리할 수 있습니다.

❌ **A. AWS Elastic Beanstalk**: Elastic Beanstalk는 AWS 클라우드(EC2, ECS 등)에서만 동작하는 PaaS 서비스입니다. 온프레미스 서버에는 배포할 수 없습니다.

❌ **D. AWS 배치(AWS Batch)**: AWS Batch는 대규모 배치 컴퓨팅 작업을 AWS 클라우드에서 실행하는 서비스입니다. 온프레미스 서버 배포와는 관련이 없습니다.

❌ **E. AWS X-Ray**: X-Ray는 애플리케이션의 요청 추적 및 디버깅을 위한 분산 트레이싱 서비스입니다. 배포 서비스가 아닙니다.

💡 **시험 꿀팁**: 온프레미스 배포 가능 서비스 = CodeDeploy + OpsWorks. CodeDeploy = EC2 + 온프레미스 + Lambda + ECS. OpsWorks = Chef/Puppet 기반 구성 관리 + 온프레미스 지원. "하이브리드 배포"가 나오면 이 두 서비스를 떠올리세요!

---

## Q16. 대규모 단일 애플리케이션 재설계 시 클라우드 아키텍처 원칙 (2개 선택)

대규모 단일 애플리케이션을 재설계할 때 클라우드 아키텍처의 설계 원칙은 무엇입니까? (2개 선택)

- A. 수동 모니터링을 사용합니다.
- B. 고정 서버를 사용합니다.
- C. 느슨한 결합을 구현한다.
- D. 개별 부품에 의존한다.
- E. 확장성을 위한 설계.

**정답: C, E**

✅ **C. 느슨한 결합을 구현한다**: 느슨한 결합(Loose Coupling)은 AWS Well-Architected Framework의 핵심 원칙으로, 컴포넌트들이 서로 독립적으로 동작하도록 설계하는 것입니다. 하나의 컴포넌트 장애가 전체 시스템에 영향을 미치지 않도록 SQS, SNS 등을 활용합니다.

✅ **E. 확장성을 위한 설계**: 클라우드 아키텍처에서는 수요 변화에 대응할 수 있도록 Auto Scaling, ELB 등을 활용하여 수평 확장(Scale Out)이 가능하도록 설계해야 합니다. 이는 AWS Well-Architected Framework의 핵심 원칙입니다.

❌ **A. 수동 모니터링을 사용합니다**: AWS의 설계 원칙은 자동화된 모니터링(CloudWatch, CloudTrail 등)을 권장합니다. 수동 모니터링은 확장성과 신뢰성을 저해합니다.

❌ **B. 고정 서버를 사용합니다**: AWS는 고정된(Fixed) 서버 대신 오토 스케일링을 통해 동적으로 프로비저닝되는 서버를 권장합니다. 불변 인프라(Immutable Infrastructure) 개념을 지향합니다.

❌ **D. 개별 부품에 의존한다**: 단일 컴포넌트에 의존하는 설계는 단일 장애점(SPOF)을 만들어 고가용성과 내결함성을 저해합니다. AWS는 다중화와 느슨한 결합을 권장합니다.

💡 **시험 꿀팁**: AWS Well-Architected Framework 5개 핵심 설계 원칙 — ①느슨한 결합(Loose Coupling) ②수평 확장(Scale Out) ③자동화(Automation) ④탄력성(Elasticity) ⑤인프라를 코드로(IaC). 모놀리식 → 마이크로서비스 전환 시 핵심은 느슨한 결합과 확장성!

---

## Q17. 글로벌 서비스로 정의되는 AWS 서비스 (2개 선택)

지역 서비스가 아닌 글로벌 서비스로 정의되는 AWS 서비스는 무엇입니까? (2개 선택)

- A. Amazon 루트 53(Amazon Route 53)
- B. 아마존 EC2
- C. 아마존 S3
- D. Amazon CloudFront
- E. Amazon DynamoDB

**정답: A, D**

✅ **A. Amazon Route 53**: Route 53은 AWS의 글로벌 DNS 서비스로, 특정 리전에 종속되지 않고 전 세계적으로 동작합니다. 도메인 등록, DNS 라우팅, 헬스 체크 기능을 전 세계 단위로 제공합니다.

✅ **D. Amazon CloudFront**: CloudFront는 전 세계 엣지 로케이션 네트워크를 기반으로 동작하는 글로벌 CDN 서비스입니다. 특정 리전이 아닌 글로벌 범위에서 운영됩니다.

❌ **B. 아마존 EC2**: EC2는 리전 기반 서비스로, 인스턴스를 특정 리전과 가용 영역(AZ)에 배포합니다. 글로벌 서비스가 아닙니다.

❌ **C. 아마존 S3**: S3는 리전 기반 서비스입니다. 버킷을 특정 리전에 생성하며, 버킷 이름은 글로벌로 고유하지만 실제 서비스는 리전 단위로 운영됩니다.

❌ **E. Amazon DynamoDB**: DynamoDB는 리전 기반 서비스입니다. 글로벌 테이블(Global Tables) 기능을 통해 다중 리전 복제가 가능하지만, 서비스 자체는 리전 기반입니다.

💡 **시험 꿀팁**: AWS 글로벌 서비스 = IAM(계정 및 권한 관리) + Route 53(DNS) + CloudFront(CDN) + WAF(웹 방화벽) + AWS Shield. S3는 이름이 글로벌하지만 리전 서비스입니다! EC2, RDS, VPC, DynamoDB = 모두 리전 서비스.

---

## Q18. AWS 사용의 재정적 이점 (2개 선택)

AWS를 사용함으로써 얻을 수 있는 재정적 이점은 다음과 같습니다. (2개 선택)

- A. 총소유비용(TCO) 절감
- B. 자본 지출 증가(자본 비용)
- C. 운영비(opex) 절감
- D. 창업에 대한 지급 연기 계획
- E. 계층에 대한 비즈니스 크레딧 라인

**정답: A, C**

✅ **A. 총소유비용(TCO) 절감**: AWS 클라우드로 전환하면 하드웨어 구매, 데이터센터 운영, 전기요금, 인건비 등을 포함한 총소유비용(TCO)이 대폭 절감됩니다. AWS TCO Calculator를 통해 절감액을 추산할 수 있습니다.

✅ **C. 운영비(opex) 절감**: AWS는 서버 유지보수, 데이터센터 관리, 하드웨어 갱신 등의 운영 비용을 줄여줍니다. 변동 비용(종량제)으로 전환되어 사용한 만큼만 지불하므로 고정 운영비가 크게 감소합니다.

❌ **B. 자본 지출 증가(자본 비용)**: AWS 클라우드는 CapEx(자본 지출)를 줄이고 OpEx(운영 지출)로 전환하는 것이 핵심 재정적 이점입니다. 자본 지출이 증가하는 것은 오히려 온프레미스의 특성입니다.

❌ **D. 창업에 대한 지급 연기 계획**: 특정 스타트업 지급 연기 계획은 AWS의 공식 재정적 이점으로 정의되지 않습니다. AWS Activate 프로그램이 있지만 이는 크레딧 제공이지 지급 연기가 아닙니다.

❌ **E. 계층에 대한 비즈니스 크레딧 라인**: AWS는 크레딧 라인(신용 한도) 방식의 재정적 이점을 제공하지 않습니다. AWS Activate나 프로모션 크레딧이 있지만 이는 공식 재정적 이점 목록에 해당하지 않습니다.

💡 **시험 꿀팁**: AWS 재정적 이점 핵심 — CapEx(자본 지출) → OpEx(운영 지출) 전환, TCO 절감, 규모의 경제를 통한 단가 인하. "자본 지출 감소" + "운영비 최적화"가 AWS 재정 이점의 양대 키워드입니다.

---

## Q19. Amazon RDS 클러스터 시작에 사용할 수 있는 항목 (2개 선택)

AWS 고객이 새로운 Amazon RDS(Amazon Relational Database Service) 클러스터를 시작하는 데 사용할 수 있는 항목은 다음 중 무엇입니까? (2개 선택)

- A. AWS 컨시어지
- B. AWS 클라우드 구성(AWS CloudFormation)
- C. Amazon Simple Storage Service(Amazon S3)
- D. Amazon EC2 자동 확장
- E. AWS 관리 콘솔

**정답: B, E**

✅ **B. AWS CloudFormation**: CloudFormation은 인프라를 코드(IaC)로 정의하여 AWS 리소스를 자동으로 프로비저닝하는 서비스입니다. CloudFormation 템플릿에 RDS 클러스터 구성을 정의하면 자동으로 생성됩니다.

✅ **E. AWS 관리 콘솔**: AWS Management Console은 웹 브라우저를 통해 AWS 서비스를 관리하는 GUI 도구입니다. RDS 콘솔에서 마우스 클릭만으로 RDS 클러스터를 쉽게 생성하고 구성할 수 있습니다.

❌ **A. AWS 컨시어지**: AWS Concierge는 Enterprise 지원 플랜 고객에게 제공되는 고객 서비스 지원 담당자로, 직접 RDS 클러스터를 생성하는 도구가 아닙니다.

❌ **C. Amazon S3**: S3는 객체 스토리지 서비스로, RDS 클러스터 생성과는 직접적인 관련이 없습니다(백업 저장은 가능하지만 생성 도구가 아님).

❌ **D. Amazon EC2 자동 확장**: EC2 Auto Scaling은 EC2 인스턴스 수를 자동으로 조절하는 서비스로, RDS 클러스터를 직접 생성하는 데 사용되지 않습니다.

💡 **시험 꿀팁**: AWS 리소스 생성/관리 방법 = ①AWS 관리 콘솔(GUI) ②AWS CLI(명령어) ③AWS SDK(코드) ④CloudFormation(IaC 자동화) ⑤AWS CDK(코드형 인프라). CloudFormation은 반복 가능한 인프라 배포 자동화의 핵심 서비스입니다.

---

## Q20. AWS 계정 보호 보안 조치 (2개 선택)

다음 중 AWS 계정에 대한 액세스를 보호하는 보안 조치는 무엇입니까? (2개 선택)

- A. AWS CloudTrail을 사용합니다.
- B. IAM 사용자에게 최소한의 권한 액세스 부여
- C. 하나의 IAM 사용자를 생성하고 많은 개발자 및 사용자와 공유합니다.
- D. Amazon CloudFront 사용
- E. 권한 있는 사용자에 대한 MFA(다중 인증) 활성화

**정답: B, E**

✅ **B. IAM 사용자에게 최소한의 권한 액세스 부여**: 최소 권한 원칙(Principle of Least Privilege)은 AWS 보안의 핵심 원칙입니다. 각 IAM 사용자에게 업무 수행에 필요한 최소한의 권한만 부여하여 침해 시 피해 범위를 최소화합니다.

✅ **E. 권한 있는 사용자에 대한 MFA(다중 인증) 활성화**: MFA(Multi-Factor Authentication)는 비밀번호 외에 추가 인증 수단을 요구하여 계정 탈취를 방지합니다. 특히 루트 계정과 권한이 높은 IAM 사용자에게 MFA 활성화는 필수 보안 조치입니다.

❌ **A. AWS CloudTrail을 사용합니다**: CloudTrail은 API 활동을 기록하여 감사 추적을 제공하는 서비스입니다. 보안 모니터링에 유용하지만, 계정 "액세스를 보호"하는 능동적 보안 조치라기보다는 사후 감사 도구에 가깝습니다.

❌ **C. 하나의 IAM 사용자를 생성하고 많은 개발자 및 사용자와 공유합니다**: 이는 심각한 보안 위반입니다! IAM 자격 증명을 공유하면 책임 추적이 불가능하고 침해 시 광범위한 피해가 발생합니다. 각 개인마다 별도의 IAM 계정을 생성해야 합니다.

❌ **D. Amazon CloudFront 사용**: CloudFront는 콘텐츠 배포 네트워크(CDN) 서비스로, AWS 계정 액세스 보호와는 직접적인 관련이 없습니다.

💡 **시험 꿀팁**: AWS 계정 보안 핵심 5가지 — ①루트 계정 MFA 활성화 ②루트 계정 일상 사용 금지 ③최소 권한 원칙(Least Privilege) ④IAM 자격 증명 공유 금지 ⑤강력한 암호 정책 설정. MFA + 최소 권한은 시험에서 가장 자주 출제되는 보안 조치입니다!

---

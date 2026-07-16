---
title: "Amazon Bedrock AgentCore, '더 넓은 지식'과 '지속적 학습' 기능 대거 추가"
date: 2026-07-16 09:00:00 +0900
categories: [뉴스, AI]
tags: [AWS, Bedrock, AgentCore, AIAgent, RAG, Guardrails, KnowledgeBase, WebSearch]
toc: true
---

> 출처: [New in Amazon Bedrock AgentCore: Build agents with broader knowledge and continuous learning](https://aws.amazon.com/ko/blogs/machine-learning/new-in-amazon-bedrock-agentcore-build-agents-with-broader-knowledge-and-continuous-learning/) (AWS Machine Learning Blog)
{: .prompt-info }

---

## 개요

AWS가 Amazon Bedrock AgentCore에 신규 기능을 대거 발표했습니다. 핵심은 세 가지입니다.

| 축 | 내용 |
|---|---|
| **지식 접근 확대** | 조직 내부 지식, 실시간 웹 지식, 유료 프리미엄 지식까지 3단계로 접근 가능 |
| **프로덕션 지속 학습** | 에이전트의 조용한 실패를 찾아내고, 개선안을 추천·검증·A/B 테스트까지 자동화 |
| **보안 정책 강화** | 프롬프트 인젝션·메모리 오염 같은 에이전트 고유 위협에 결정론적 가드레일 적용 |

이 발표를 관통하는 메시지는 "더 좋은 모델은 시작점일 뿐, 프로덕션에서 실제 성과를 내려면 필요한 것에 접근하고(access), 행동하고(act), 지속적으로 개선(improve)해야 한다"는 것입니다.

---

## 1. 지식 계층 3단계 아키텍처

### 1-1. 조직 지식 — Bedrock Managed Knowledge Base

SharePoint, Google Drive, Confluence, S3, 내부 Wiki 등에 흩어진 사내 데이터를 에이전트가 바로 활용할 수 있게 통합합니다. 벡터 저장소·임베딩 모델은 AWS가 관리하며, 단순 청크 매칭 방식의 기존 RAG를 넘어 **"에이전트형 리트리버(agentic retriever)"** 를 적용한 것이 특징입니다.

- 다중 쿼리를 스스로 계획해서 실행
- 문서 간 개념을 연결해서 답변
- 중간 검색 결과를 평가하고 재순위화(re-rank)
- 여러 주제에 걸친 복잡한 질문에도 포괄적으로 답변

별도의 검색 파이프라인을 직접 구축할 필요가 없다는 점이 강조됩니다.

### 1-2. 세계 지식 — Web Search

실시간 외부 정보로 에이전트 지식을 보강하는 기능입니다. Alexa+, Amazon Quick Suite, Kiro와 같은 인프라를 기반으로 동작하며, AWS 고유의 지식 그래프와 공개 웹 정보를 결합해 구조화된 엔터티 데이터·검증된 사실·실시간 데이터(주가, 스포츠 스코어 등)를 제공합니다.

- 고가치 발췌(excerpt)만 반환해 토큰 효율을 최적화
- 여러 출처를 동시에 근거로 삼는 다중 출처 접지(grounding)
- 외부 벤더 없이 AWS 보안 경계 내에서 쿼리 처리

연구용 에이전트(공개 출처 교차 검증), 규정 준수 에이전트(정책 업데이트 모니터링) 같은 사용 사례가 제시됩니다.

### 1-3. 유료 지식 — Payments & WAF 연동

프리미엄 데이터 소스에 대한 에이전트의 유료 접근을 가능하게 하는 조합입니다.

| 구성 요소 | 역할 |
|---|---|
| AgentCore Payments | 에이전트가 실행 루프 안에서 직접 유료 서비스에 접근·결제 |
| AWS WAF AI Traffic Monetization | 콘텐츠 제공자가 트래픽을 차단/허용/유료화로 제어 |

에이전트가 유료 리소스를 발견하면 실행 루프 안에서 바로 접근·결제하고, 제공자는 WAF로 접근을 통제하며, AgentCore가 검증한 에이전트임을 자동으로 인식해 마찰 없는 거래가 이뤄지는 구조입니다.

---

## 2. 프로덕션 에이전트의 지속적 개선 루프

AWS는 "가장 위험한 에이전트 실패는 오류를 던지지 않는 실패"라고 지적합니다. 주문 수정이 처리 안 됐는데 확인 메시지는 뜨고, API 타임아웃 상황에서 가짜 재고 정보를 보여주고, 승인 단계를 건너뛰었는데 대시보드에는 99% 성공률로 표시되는 식입니다.

이를 해결하기 위해 **이해 → 수정**의 2단계 루프를 제공합니다.

### 2-1. 이해 — Insights (Preview)

| 인사이트 종류 | 내용 |
|---|---|
| Failure Insights | 수백 개 세션에서 반복되는 실패 패턴을 근본 원인·영향도 순으로 정리 (에러 없이 조용히 실패한 케이스 포함) |
| Intent Insights | 사용자의 실제 목표별로 요청을 군집화해 실사용 패턴 파악 |
| Trajectory Insights | 에이전트가 작업을 수행한 경로를 그룹화해 일반 패턴과 이상 케이스를 구분 |

지속적 모니터링(일일/주간 리포트)뿐 아니라, 배포 직후나 불만 급증 시 몇 분 안에 결과를 받아보는 특별 모니터링도 지원합니다.

### 2-2. 수정 — Recommendations & A/B Testing (GA)

1. **Recommendations**: 프로덕션 트레이스와 평가 결과를 분석해 시스템 프롬프트·도구 설명 개선안을 실제 동작 데이터에 근거해 제안
2. **배치 평가**: 정의된 테스트셋으로 추천안을 미리 검증해 회귀(regression)를 사전에 감지
3. **A/B 테스트**: 실시간 프로덕션 트래픽을 분할해 버전 간 성능을 비교, 커밋 전 실제 조건에서 검증

이 개선 루프는 AgentCore 런타임뿐 아니라 AWS Lambda, Amazon EKS, 심지어 비-AWS 환경에서도 플랫폼 독립적으로 동작합니다.

---

## 3. 정책 강화 — 에이전트 고유 위협에 대한 보안 제어

전통적인 소프트웨어의 위험이 네트워크 침입이었다면, 에이전트는 확률론적으로 결정을 내리고 맥락(context)에 영향을 받는다는 점에서 **프롬프트 인젝션**과 **메모리 오염**이라는 새로운 공격 표면을 갖습니다.

AWS가 제시하는 원칙은 "확률론적 뇌를 결정론적 가드레일로 둘러싼다"는 것입니다. **Bedrock Guardrails**를 게이트웨이 계층(에이전트 코드 바깥)에 배치해 프롬프트 인젝션 시도, 유해 콘텐츠, 민감 데이터 노출을 검증하며, 에이전트가 이 계층을 볼 수 없기 때문에 추론으로 회피할 수 없는 구조입니다(GA).

향후에는 Check Point, Zscaler, Rubrik, Netskope, SentinelOne 등 서드파티 보안 신호도 게이트웨이에 통합될 예정입니다(Coming Soon). 탐지는 다양한 출처에서 확률론적으로 이뤄지더라도, 정책 집행은 항상 임계값 기반의 결정론적 최종 판단으로 귀결되도록 설계했다는 점이 핵심입니다.

---

## 4. AgentCore Harness — "모델이 뇌라면 하네스는 신체"

이번 발표에서 이 모든 기능을 묶는 개념이 **AgentCore Harness**(GA)입니다. 오케스트레이션 루프, 도구 실행, 컨텍스트 윈도우 관리, 상태 지속성(메모리), 실패 복구, 세션 격리까지 에이전트 운영에 필요한 요소를 하나의 플랫폼으로 제공합니다.

모델·도구·스킬·지침을 설정으로 선언하기만 하면 몇 분 안에 동작하는 에이전트를 만들 수 있고, 다른 하네스와 달리 **특정 모델에 종속되지 않고 세션 중에도 모델을 전환**할 수 있다는 점이 차별점으로 제시됩니다. 커스텀 오케스트레이션이 필요해지면 코드로 내보내면서도 같은 플랫폼(게이트웨이, 지식, 메모리, 관찰성)을 계속 활용할 수 있습니다.

---

## 5. 파트너 사례

- **Sony**: SharePoint·Confluence·S3에 흩어진 데이터를 Managed Knowledge Base와 Web Search로 통합해 엔터프라이즈 에이전트 플랫폼의 거버넌스를 표준화
- **FUJISOFT**: 'Character Capsule' 프레임워크로 에이전트 역할·스킬·절차를 재사용 가능하게 패키징하고, AgentCore의 최적화 기능으로 조용한 실패를 프로덕션 트레이스에서 발견해 A/B 테스트로 검증 — 시행착오에서 데이터 기반 개선으로 전환했다고 언급
- **Twilio**: AgentCore Harness와 Twilio Conversations를 결합해 음성·메시징·디지털 채널을 통합한 지능형 에이전트를 인프라 재구성 없이 실시간 배포

---

## 6. 현황 정리

| 상태 | 기능 |
|---|---|
| **GA** | AgentCore Harness, Bedrock Managed Knowledge Base, Web Search, Bedrock Guardrails 연동, Recommendations & A/B Testing |
| **Preview** | Insights(Failure/Intent/Trajectory), AgentCore Payments |
| **Coming Soon** | 서드파티 보안 신호 통합(Check Point 등) |

콘솔(us-west-2 리전)이나 AgentCore CLI로 바로 시작할 수 있습니다.

---

## 정리

이번 업데이트를 한 줄로 요약하면, AgentCore가 **"에이전트가 뭘 알아야 하는가"**(지식), **"프로덕션에서 실제로 잘 동작하는가"**(개선 루프), **"안전하게 동작하는가"**(정책)라는 세 가지 근본 질문에 각각 답을 내놓은 셈입니다. 특히 에러 없이 조용히 실패하는 케이스를 잡아내는 Insights와, 게이트웨이 계층에서 에이전트가 인지하지 못하게 가드레일을 거는 설계는 그동안 에이전트 운영에서 체감했던 "겉으론 잘 도는데 뭔가 이상한" 문제들에 대한 AWS식 해법으로 보입니다.

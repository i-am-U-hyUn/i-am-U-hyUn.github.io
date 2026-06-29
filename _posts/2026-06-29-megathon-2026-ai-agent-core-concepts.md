---
title: "Megathon 2026 사전교육 정리 — AI 에이전트 핵심 개념 (Strands · AgentCore)"
date: 2026-06-29 14:34:00 +0900
categories: [AI, 에이전트]
tags: [Megathon, AI에이전트, Strands, MCP, AgentCore, AWS, Bedrock, AgentticLoop, 멀티에이전트]
toc: true
---

> 문의: iloveit8110@naver.com

---

## 개요

본 포스팅은 **Megathon 2026 사전교육(4월 17일)** 에서 진행된 AI 에이전트 핵심 개념 강의를 정리한 내용입니다.  
오전 세션은 **Strands Agent SDK**, 오후 세션은 **Amazon Bedrock AgentCore** 를 중심으로 진행되었습니다.

| 시간 | 세션 | 진행 |
|------|------|------|
| 09:40 ~ 10:00 | Strands Agent SDK 소개 | 이정환 (AWS PSA) |
| 10:00 ~ 12:30 | Strands Agent SDK 실습 | AWS PSA 팀 |
| 13:30 ~ 14:00 | AgentCore 소개 | 우지환 (AWS AI/ML PSA) |
| 14:00 ~ 16:30 | AgentCore 실습 | AWS AI/ML PSA 팀 |
| 16:30 ~ 17:00 | Q&A / Survey & Closing | 이정환 (AWS PSA) |

---

## 1. 에이전트 및 주요 구성 요소

**Agent(에이전트)** 란 해야 할 일(프롬프트) + 도구(Tools) + 모델(Model)을 통해 **스스로 작업을 수행하는 주체**입니다.

주요 구성 요소의 흐름:

```
Container → Agent → Actions → Environment → Observation → Agent → LLM Prompt
```

- **Goals / Instructions**: 에이전트가 수행할 목표와 지침
- **Tools (and their descriptions)**: 에이전트가 호출할 수 있는 외부 기능들

---

## 2. 에이전트 디자인 패턴

에이전트 간 협력 구조와 작업 흐름을 정의하는 패턴입니다.  
기본적으로 **ReAct (Reasoning + Acting)** 패턴 — 생각하고 행동하는 루프 — 을 기반으로 합니다.

| 패턴 | 핵심 특징 | 적합한 상황 | 핵심 요소 |
|------|----------|------------|----------|
| **Swarm (군집)** | 위계질서 없이 자율적으로 소통하는 '브레인스토밍' 방식 | 창의적인 집단지성이 필요할 때 | Communication Patterns, Shared Memory, Task Distribution |
| **Graph (그래프)** | 작업 결과에 따라 다음 목적지(분기점)가 달라지는 유연한 라우팅 구조 | 조건에 따른 유연한 라우팅이 필요할 때 | Node, Edge, Topology Pattern |
| **Workflow (워크플로우)** | 정해진 순서대로(A → B → C) 진행되는 '공장 라인' 같은 구조 | 단계별 결과물이 명확하고 순서가 중요한 파이프라인 작업 | Task Definition, Dependency Management, Information Flow |

---

## 3. 에이전틱 루프 (Agentic Loop)와 Handoff / Queue

단일 에이전트가 문제를 해결하는 핵심 메커니즘으로, AI가 **'행동하는 주체'** 가 되는 원리입니다.

### 4단계 반복 과정

1. **Invoke Model (생각하기)**: 에이전트가 LLM에게 다음 행동을 묻습니다.
2. **Reasoning & Tool Selection (판단)**: 모델이 추론을 통해 사용할 도구를 결정합니다.
3. **Execute Tool (행동하기)**: 에이전트가 외부 시스템이나 기능을 실행합니다.
4. **Return Result (관찰)**: 도구 실행 결과를 모델에게 다시 전달합니다.

```
Prompt → Agent ──Invoke Model──▶ Model
                 ◀──reasoning──
                 ──Execute Tool──▶ Tools
                 ◀──Return result─
         ↓
        Result
```

### Handoff와 Queue

- **Handoff (핸드오프)**: 에이전트가 혼자 해결하지 못할 때 다른 에이전트에게 작업을 넘기는 행위로, Graph나 Workflow 패턴으로 확장됩니다.
- **Queue (큐)**: Handoff 시 받는 쪽이 바쁘면 큐에 작업을 쌓아두는 완충 역할을 합니다. Execute Tool 작업이 오래 걸릴 때도 큐를 활용해 시스템 정체를 방지합니다.

---

## 4. Strands와 MCP (Model Context Protocol)

Strands와 MCP는 AI 에이전트 생태계의 핵심 기술입니다.

| 기술 | 역할 | Agentic Loop에서의 위치 |
|------|------|----------------------|
| **MCP** (Model Context Protocol) | AI 모델이 외부 데이터나 도구에 접근할 때 사용하는 공통 규격 ('유니버설 USB 포트') | Tools (도구) = MCP Server |
| **Strands** | 여러 에이전트가 협력하는 구조(Swarm, Graph, Workflow)를 만드는 프레임워크 ('오케스트라 지휘자') | Agent (에이전트) = Strands 에이전트 (루프를 관리하는 주체) |

### Strands + MCP의 핵심 이점

- **확장성**: MCP 서버만 추가하면 새로운 도구를 쉽게 연결할 수 있습니다.
- **안정성**: Handoff 시 큐를 활용하여 데이터 유실 없이 작업이 이어집니다.
- **지능적 협업**: MCP를 통해 실제 코드를 실행하고 파일을 수정하는 '행동하는 군집'을 완성합니다.

---

## 5. Amazon Bedrock AgentCore

AgentCore는 AI 에이전트를 **프로덕션 환경에 안정적으로 배포·운영**하기 위한 AWS의 통합 플랫폼입니다.  
MCP, A2A 프로토콜을 지원하며, Strands Agents · OpenAI Agents SDK · LangGraph · LlamaIndex · CrewAI · Google ADK 등 다양한 프레임워크와 호환됩니다.

구성 요소: **Runtime / Memory / Identity / Gateway / Code Interpreter / Browser / Observability**

---

### 5-1. AgentCore Runtime

> 참고: [Amazon Bedrock AgentCore Runtime — 쉽게 배우고 시작하기](https://aws.amazon.com/ko/blogs/tech/amazon-bedrock-agentcore-runtime-easy-learn-start/)

에이전트 코드를 **컨테이너화하여 AWS에서 관리형으로 실행**하는 서비스입니다.

- **멀티모달 지원**
- **자동 스케일업**
- **독립된 VPC** — 고객 간 데이터가 얽히지 않음

**실제 생성 방법:**

```bash
# 1. 설정
agentcore config

# 2. 배포
agentcore launch
```

코드에서는 `BedrockAgentCoreApp` 인스턴스를 초기화하고, 에이전트 진입점 함수에 `@app.entrypoint` 데코레이터를 추가합니다. 매개변수는 `payload`로 설정하고, 파일 마지막에 `app.run()`을 추가합니다.

---

### 5-2. AgentCore Gateway

> 참고: [AgentCore Gateway — Lambda/API를 MCP 서버로 전환하기](https://builder.aws.com/content/31VT54dSRC2N0XRuIqGKS0RgRCq/bedrock-agentcore-mcpfy-your-existing-lambdasapis-by-equipping-your-ai-agent-with-an-agentcore-gateway)

**해커톤 차별화 포인트 == 모델은 다들 비슷할 것이니, 어떤 도구를 쓸 것인지가 차별화 포인트!**

Gateway는 본질적으로 **원격 MCP 서버**로, Agent에게 도구를 사용하기 위한 단일 접속 지점을 제공합니다.

**가장 큰 장점**: Semantic Search + 도구 자동 임베딩(개발자가 임베딩을 고민할 필요 없음) + 토큰 사용량 감소로 비용 절감

- **Gateway target**: Lambda 함수 또는 OpenAPI 규격 / Smithy 모델로 정의된 API
- **Gateway Authorizer**: OAuth 인증 지원, 인/아웃바운드 인증을 독립적으로 설정 가능

**만드는 법:**

1. OpenAPI 인터페이스 설명을 준비하여 S3에 업로드
2. Gateway를 생성하고, 미리 생성해 둔 Cognito Authorizer를 전달
3. API Key Credential Provider 생성
4. 타겟을 생성하고 API 인터페이스 설명 S3 주소와 앞서 생성한 Credential Provider를 연결
5. 배포 완료 후, 게이트웨이는 일반 Streamable MCP 서버처럼 사용됨
6. 도구 이름 = `게이트웨이_이름` + `원본_도구_이름`

---

### 5-3. AgentCore Memory

> 참고: [AgentCore Memory — 단/장기 메모리 구성하기](https://builder.aws.com/content/31WUVjdzcpq2cKbhtc5z6xhK5aC/bedrock-agentcore-equip-your-ai-agent-with-shortlong-term-memory-leveraging-agentcore-memory-with-a-few-lines-of-code)

- **단기 메모리**: 과거 대화 → 즉시 접근 가능 (Chat Messages, Session State)
- **장기 메모리**: 백그라운드에서 비동기적으로 메모리 요약을 처리하며 장기 메모리를 형성 (Semantic, User Preferences, Summary)

---

### 5-4. AgentCore Code Interpreter

> 참고: [AgentCore 내장 도구 — Agentic AI](https://aws.amazon.com/ko/blogs/tech/agentcore-built-in-tools-agentic-ai/)

에이전트가 **격리된 샌드박스 환경에서 실제 코드를 실행**할 수 있게 해주는 기능입니다.  
Code Interpreter 세션 내에 File System과 Shell이 포함되어 있으며, 실행 결과는 Observability로 연계됩니다.

---

### 5-5. AgentCore Identity

> 참고: [AgentCore Identity — Agentic AI 보안](https://aws.amazon.com/ko/blogs/machine-learning/introducing-amazon-bedrock-agentcore-identity-securing-agentic-ai-at-scale/)

**인바운드/아웃바운드 인증이 독립적으로 설정**된다는 것이 핵심 장점입니다.

- **Inbound Auth** (IAM/OAuth): 사용자 → 애플리케이션 → 에이전트로의 접근 인증
- **Outbound Auth** (IAM/OAuth): 에이전트 → AWS 리소스 / 외부 도구 접근 인증

Identity Provider로 Cognito, Auth0, Entra ID, Okta 등을 지원합니다.

---

### 5-6. AgentCore Observability

> 참고: [AgentCore Observability — 신뢰할 수 있는 AI 에이전트 구축](https://aws.amazon.com/ko/blogs/machine-learning/build-trustworthy-ai-agents-with-amazon-bedrock-agentcore-observability/)

에이전트 동작을 **모니터링하고 디버깅**하기 위한 기능입니다.

- AgentCore Runtime에 배포된 에이전트, AgentCore Memory, AgentCore Gateway 도구 사용 현황을 통합 대시보드로 확인
- OTEL(OpenTelemetry) 로그 지원
- 다른 프레임워크에 대한 환경 변수 구성이 가능하여, 원래 프레임워크에서 trace를 활성화할 수 있음

---

## 6. 실습 정리

### 오전 실습 — Strands Agent SDK

AWS SageMaker Studio의 JupyterLab 환경에서 Strands Agent SDK 실습을 진행했습니다.

```
샘플 구성:
├── lab-01-getting-started
├── lab-02-model-providers   (Ollama, OpenAI 모델 연동)
├── lab-03-aws-services
├── lab-04-mcp-tools
├── lab-05-streaming
├── lab-06-guardrails
├── lab-07-memory
└── lab-08-observability
```

첫 번째 에이전트(`01-first-agent.ipynb`) 실행 예시:

```python
agent = Agent(
    model="us.anthropic.claude-sonnet-4-5-20250929-v1:0",
    tools=[calculator, weather],
    system_prompt="You are a helpful assistant."
)
response = agent("what is the weather today?")
```

샘플 리포지토리: `git clone https://github.com/strands-agents/samples.git`

### 오후 실습 — AgentCore

```
git clone https://github.com/awslabs/amazon-bedrock-agentcore-samples.git
```

**중요한 건 의사결정을 어떻게 했는지 — 4가지 의사결정이 차별화 포인트!**

| 구분 | 의사결정 항목 | 선택지 |
|------|------------|--------|
| Runtime | 프로토콜 선택 | HTTP Agent vs MCP Server |
| Runtime | 인증 방식 | OAuth vs IAM |
| Runtime | 응답 패턴 | 동기 vs 스트리밍 vs 대용량 멀티모달 |
| Runtime | 세션 전략 | Stateless vs Stateful 세션 관리 |

---

## 마무리

Amazon Bedrock AgentCore는 AI 에이전트를 **프로덕션 수준**으로 끌어올리기 위한 엔터프라이즈 백본입니다. 모델 자체는 상향 평준화되고 있으므로, 앞으로의 차별화 포인트는 **어떤 도구를 어떻게 조합하느냐** 에 달려 있습니다.

Megathon 2026에서 AgentCore의 다양한 구성 요소를 직접 실습하며 그 가능성을 확인할 수 있었습니다.

---

*참고 자료*
- [Amazon Bedrock AgentCore 공식 문서](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- [AgentCore GA 발표 블로그 (한국어)](https://aws.amazon.com/ko/blogs/korea/amazon-bedrock-agentcore-is-now-generally-available/)
- [Strands Agents GitHub](https://github.com/strands-agents/samples)

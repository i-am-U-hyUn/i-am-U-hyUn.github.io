---
title: "MegazoneCloud Business Operations에서 만든 것들 — 프로젝트 총정리"
date: 2026-09-16 12:00:00 +0900
categories: [프로젝트, 총정리]
tags: [MegazoneCloud, ProcessInnovation, GoogleAppsScript, GCP, Databricks, 포트폴리오]
toc: true
---

## 들어가며

MegazoneCloud Business Operations 조직에서 Process Innovation(PI)을 전담하면서 만든 것들을 한 번 정리해두고 싶었다. 각 프로젝트는 이미 별도 글로 상세히 다뤘는데, 이 글은 그 글들을 한자리에 모아 "왜 만들었고, 어떻게 만들었고, 결과가 어땠는지"를 짧게 훑는 인덱스 역할이다. 기술적으로 더 깊게 보고 싶은 부분은 각 항목의 상세 글 링크로 이어진다.

> 이 글도 각 상세 글과 동일한 마스킹 기준을 따른다 — 실제 회사 내부 정보, 부서명, 실제 통계·수익 수치는 담지 않았고, 이미 각 글에서 공개하기로 정리한 수준까지만 재사용했다.
{: .prompt-warning }

---

## 1. Process Innovation 웹 포털

**무엇을, 왜.** 사내 프로세스 개선 안건을 접수·추적·평가하는 전사 포털을 기획부터 개발·운영까지 전담해서 만들었다. 안건 수가 늘면서 스프레드시트 한 장으로 관리하던 방식이 한계에 부딪혔다 — 안건마다 필요한 열람 권한 제어, 상태는 "진행중"인데 산출물이 안 올라온 안건의 수동 리마인드, 부서·분야별 현황을 보려면 매번 새로 만져야 했던 피벗 테이블. 이 세 가지가 전부 "자동화하면 사라질 반복 작업"이라 직접 포털을 만들었다.

**어떻게.** 별도 서버·DB 없이 Google Apps Script로 기존 스프레드시트를 데이터 계층 삼아 웹앱을 얹었다. 이메일 OTP 인증 후 계정별로 전체/부분 열람 권한을 나누고, 안건 분야 분류는 Vertex AI Gemini에 "목적성·리소스 비중·기대 효과" 3개 지표를 점수화해 합산하는 프롬프트로 맡겨 결정성 있는 자동 태깅을 구현했다. 매주/매일 배치로 미제출 안건을 감지해 자동 리마인드를 보내고, 완료 안건의 만족도 설문도 집계한다.

**상세 글**: [사내 Process Innovation 포털을 Google Apps Script로 직접 만들고 운영한 이야기](/posts/pi-portal-apps-script/)

---

## 2. MBR(Monthly Business Review) 보고서 자동화

**무엇을, 왜.** PI 포털은 안건 관리를 자동화했지만, 그 활동을 매월 정리해 보고하는 일은 여전히 스프레드시트·캘린더·회의록 문서·설문 시트 네 곳을 사람이 손으로 옮겨 적는 방식이었다. 반복 작업을 "집계"(건수·비율), "전사"(일정·링크), "요약"(회의록→결론) 세 유형으로 나눠, 정답이 명확한 집계·전사는 코드가 확정 출력하고 판단이 필요한 요약만 LLM에 맡기는 원칙을 세웠다.

**어떻게.** 새 서버 없이 기존 PI 포털 Apps Script 웹앱에 읽기 전용 JSON 엔드포인트 4종을 얹었다. 시트 셀에 하이퍼링크로만 걸린 회의록 문서를 추출하고, 캘린더 제목에서 정규식으로 안건 번호를 매핑해 관련 회의록을 한 번에 모으는 구조를 짰다. 누적 이력에 폐기안·확정안이 섞여 최신 결론을 잘못 판별하는 문제는 "회의록이 있으면 시트보다 우선"이라는 규칙으로 풀었다.

**결과.** 4개 데이터 소스가 자동 연동되면서 수기 전사 항목이 0건이 됐고, 월간 보고서 작성이 명령 한 줄로 실행된다.

**상세 글**: [① 기존 PI 포털에 읽기 전용 엔드포인트 얹기](/posts/mbr-report-automation-endpoints/) · [② 판단은 LLM에, 계산은 코드에 맡기기까지](/posts/mbr-report-automation-difficulties/)

---

## 3. 프로세스 시각화 대시보드 (Architecture AI)

**무엇을, 왜.** 영업 프로세스 정의서(Word, 20개)가 바뀔 때마다 드로잉 툴로 흐름도를 처음부터 다시 그려야 했고, 그 사이 문서와 그림 버전이 어긋나는 문제가 반복됐다. 정의서를 업로드하면 사람이 다시 그리지 않아도 표준 플로우차트로 자동 렌더링되는 웹 대시보드를 직접 설계·구현했다.

**어떻게.** 그래프 조립·도형 자동 판별(진입/진출 차수 + 키워드 기반)을 저장 시점이 아닌 조회 시점에 수행하는 ELT 구조로 설계했고, 저장 계층을 인터페이스로 추상화해 MongoDB/lowdb/GCP Firestore를 자유롭게 갈아끼울 수 있게 했다. 전체→그룹→단계→스윔레인 통합 4단계 드릴다운 뷰를 제공하고, 자동 배치가 못 푸는 예외는 드래그 편집 + Undo + 저장 이력으로 사람이 보정할 수 있게 했다. GCP Cloud Run + Firestore로 배포해 팀 전체가 실시간으로 최신 흐름을 볼 수 있게 만들었는데, 이 배포 과정에서 서비스 계정 IAM 권한 누락으로 저장소가 조용히 로컬 파일로 폴백되며 업로드 데이터가 유실되는 장애를 겪었고 그 원인 분석·재발 방지도 별도로 기록했다.

**상세 글**: [1편 · ELT 아키텍처](/posts/docx-process-flowchart-elt/) · [2편 · 스윔레인 뷰 렌더링](/posts/flowchart-swimlane-edge-routing/) · [3편 · 상세 패널과 Pain Point 우선순위](/posts/process-panel-pain-point-priority/) · [4편 · GCP 배포 장애 기록](/posts/cloud-run-firestore-iam-permission-data-loss/)

---

## 4. Sales Cycle Lead Time 분석 대시보드

**무엇을, 왜.** "영업 프로세스(DMS 사업성검토)가 실제로 어떻게 돌아가고 있는가"를 데이터로 밝혀달라는 요청을 받아, 승인율·소요시간(리드타임)·마진율 세 축으로 나눠 분석하고 계약 반려 사유까지 자동 분류해 하나의 대시보드로 통합했다.

**어떻게.** 승인율은 딜 등급별로, 소요시간은 버전이 갱신될 때마다 새 SEQ가 생기는 이력 테이블에서 최종 버전만 걸러내고 제출/완료 시각을 한 번의 스캔으로 뽑는 SQL 패턴으로, 마진율은 사업모델마다 제각각인 7개 하위 테이블을 병합하고 이상치(-100% 이하)를 제외하는 방식으로 각각 산출했다. 계약 반려 사유는 Gemini로 자동 분류하는 별도 파이프라인을 붙였는데, 스케줄링을 SEQ 기준에서 날짜 기반으로 바꾸며 멱등성을 `MERGE` 키 매칭만으로 보장하도록 설계했다. 한 번은 "재실행 대비"로 넣어둔 `DELETE` 한 줄이 오히려 매일 데이터를 지우는 장애를 낸 적이 있어, 원인 분석 후 제거하고 스냅샷 기반으로 복구했다.

**상세 글**: [승인율](/posts/dms-review-approval-rate/) · [소요시간](/posts/dms-review-turnaround-time/) · [마진율](/posts/dms-review-margin-rate/) · [반려사유 LLM 분류 파이프라인](/posts/dms-rejection-classification-llm/) · [스케줄링을 날짜 기반으로 바꾼 이유](/posts/dms-scheduling-flag-date-based/) · [데이터 유실 사고와 복구](/posts/dms-rejection-live-table-data-loss/)

---

## 5. MZC SpaceFlow (Megathon 2026 해커톤)

**무엇을, 왜.** AWS 파트너 영업·기술 담당자가 PoA(Proof of Authority) 문서를 쓰는 데 평균 5일(Reject 포함 8일)이 걸리던 문제를, Megathon 2026 해커톤(Team 37)에서 팀으로 풀어봤다. 이메일·미팅록 같은 비정형 자료를 넣으면 자율 에이전트가 구조화·초안 작성·QA/QC·승인까지 이어주는 플랫폼을 만드는 게 목표였다. 나는 이 프로젝트에서 요건 정의·기획·UX(OPS) 트랙을 맡았다.

**어떻게.** Amazon Bedrock AgentCore 기반 Parent Orchestrator가 요청을 Discovery/Architecture/Staffing/Cost/Reviewer/Formatter 6개 서브 에이전트로 라우팅하고, 각 결과를 patch(변경 단위) 하나로 통일해 DynamoDB에 낙관적 락으로 저장한 뒤 AppSync로 프론트에 실시간 반영한다. 승인 전 변경은 같은 patch를 Change Request로 쌓아 AS-IS/TO-BE diff로 검토·승인하게 했고, AWS 비용 조회 같은 외부 기능은 MCP 게이트웨이 도구로 분리했다.

**상세 글**: [MZC SpaceFlow — Bedrock AgentCore 멀티 에이전트로 PoA 문서 자동화하기](/posts/spaceflow-agentcore-multiagent/)

---

## 6. 그 외 — Megathon 2026 사전교육

직접 만든 프로젝트는 아니지만, Megathon 2026 사전교육에서 다룬 AI 에이전트 핵심 개념(Strands Agent SDK, Amazon Bedrock AgentCore)도 정리해뒀다. 위 프로젝트들에서 LLM을 "판단이 필요한 부분에만 좁혀서" 쓰는 설계 원칙을 반복해서 적용한 배경에는 이 교육에서 잡은 에이전트/도구 설계 감각이 깔려 있다.

**상세 글**: [Megathon 2026 사전교육 정리 — AI 에이전트 핵심 개념](/posts/megathon-2026-ai-agent-core-concepts/)

---

## 마치며

PI 포털은 기존 스프레드시트 위에, MBR 자동화는 기존 PI 포털 위에, Architecture AI는 기존 정의서 위에 얹은 것들이라 새 인프라랄 게 별로 없었다. 반대로 Sales Cycle Lead Time 분석의 SQL/파이프라인, Architecture AI의 배포, SpaceFlow는 처음부터 새로 짠 경우였고, 눈에 띄는 사고(데이터 유실)나 마이그레이션 잔재도 딱 그 세 곳에서 나왔다.

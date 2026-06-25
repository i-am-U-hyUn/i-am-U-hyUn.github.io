---
title: "BigQuery 릴리스 노트 정리 (2026년 6월)"
date: 2026-06-25 09:00:00 +0900
categories: [공부, 데이터]
tags: [BigQuery, GCP, GoogleCloud, 릴리스노트, 데이터엔지니어링, Gemini]
toc: true
---

> 이 포스트는 [Google BigQuery 공식 릴리스 노트](https://docs.cloud.google.com/bigquery/docs/release-notes)를 기반으로 2026년 6월의 주요 업데이트를 정리한 글입니다.  
> 문의: iloveit8110@naver.com

---

## 2026년 6월 23일

### 트리거 기반 파이프라인 스케줄링 (Preview)

BigQuery 파이프라인이 특정 BigQuery 테이블 업데이트 시 자동으로 실행되도록 설정할 수 있는 **트리거 기반 파이프라인 스케줄링** 기능이 Preview로 출시되었습니다.

- 특정 테이블이 갱신될 때 파이프라인이 자동 트리거
- 배치 처리 자동화 및 데이터 파이프라인 운영 효율화에 활용 가능

### 대화형 분석 (Conversational Analytics) 정식 출시 (GA)

BigQuery의 **대화형 분석** 기능이 정식 출시(Generally Available)되었으며, 다양한 고급 기능이 함께 포함되었습니다.

| 기능 | 설명 |
|------|------|
| 모델 선택 | Preview / GA 모델 전환 지원 |
| 조정 가능한 추론 모드 | AI 추론 심도 조정 |
| 명확화 질문 | AI가 추가 맥락 요청 가능 |
| 컨텍스트 인용 | 답변 근거 데이터 인용 |
| 검증 쿼리 파라미터 지원 | 검증된 쿼리에 파라미터 적용 |
| AI 함수 지원 | `KEY_DRIVERS`, `IF`, `SCORE`, `CLASSIFY`, `SIMILARITY`, `SEARCH` |

- 지원 리전: US 및 EU MREP

### 데이터셋 대화 (Dataset Conversations) (Preview)

특정 데이터셋을 대상으로 AI와 대화를 생성할 수 있는 **데이터셋 대화** 기능이 Preview로 추가되었습니다.

---

## 2026년 6월 22일

### BigQuery Data Transfer Service — Oracle/MySQL 메타데이터 이전 (Preview)

BigQuery Data Transfer Service가 **Oracle** 및 **MySQL** 소스의 메타데이터를 Knowledge Catalog로 이전하는 기능을 Preview로 지원합니다.

- 기존 Oracle/MySQL 스키마 정보를 Google Cloud의 Knowledge Catalog에 통합 가능
- 데이터 거버넌스 및 메타데이터 관리 강화

---

## 2026년 6월 17일

### 자율 임베딩 생성 정식 출시 (GA)

**자율 임베딩 생성(Autonomous Embedding Generation)** 기능이 정식 출시되었습니다.

- `CREATE TABLE` 또는 `ALTER TABLE` 구문으로 신규/기존 테이블에 자동 임베딩 컬럼 유지 관리 설정 가능
- 벡터 검색, 시맨틱 유사도 분석 등 AI 활용 워크플로우 간소화

---

## 2026년 6월 16일

### Table Explorer → Reference 패널 전환 예정

**Table Explorer** 기능이 2026년 7월 이후 **Reference 패널**로 통합·전환될 예정입니다.

- 현재 Table Explorer를 사용 중인 경우 UI 변경에 대비 필요

---

## 2026년 6월 15일

### Gemini Cloud Assist — SQL 쿼리 최적화 분석 (Preview)

BigQuery Editions 고객을 대상으로 **Gemini Cloud Assist**를 통한 SQL 쿼리 최적화 분석 기능이 Preview로 제공됩니다.

- 쿼리 성능 병목 지점을 AI가 분석하고 개선안 제시

### 생성형 AI 함수 일일 토큰 할당량 설정 일시 중단 (이슈)

BigQuery 생성형 AI 함수의 **일일 토큰 할당량 설정** 기능이 일시적으로 비활성화되었습니다.

- 복구 작업이 진행 중이며, 정상화 일정은 추후 공지 예정

### BigQuery Studio 테이블 목록 컬럼 너비 조정 기능 추가

BigQuery Studio의 테이블 목록 화면에서 **컬럼 너비를 직접 조정**할 수 있는 기능이 추가되었습니다.

### Gemini Code Assist — Jobs 관련 페이지 지원 (Preview)

**Jobs Explorer**, Job 상세보기, Job 기록, 용량 관리 페이지에서 성능 문제 해결을 위한 **Gemini Code Assist** 기능이 Preview로 제공됩니다.

---

## 2026년 6월 12일

### BigQuery AI 함수 — ObjectRef 직접 입력 지원 (GA)

BigQuery AI 함수가 `OBJ.GET_ACCESS_URL()` 호출 없이 **ObjectRef 값을 직접 입력**받을 수 있도록 정식 지원합니다.

- 비정형 데이터(이미지, 오디오, 문서 등)를 AI 함수에 직접 전달 가능
- 파이프라인 단순화 및 코드 간소화 효과

---

## 2026년 6월 11일

### Gemini Cloud Assist — BigQuery 성능 모니터링 및 비용 최적화 (Preview)

**Gemini Cloud Assist**가 BigQuery 성능 모니터링 및 비용 최적화를 지원하는 기능이 Preview로 출시되었습니다.

- 슬롯 사용량, 쿼리 효율, 비용 추세를 AI가 분석하고 최적화 방향 제안

### AI.KEY_DRIVERS 함수 지원 복구 (Preview)

데이터 세그먼트에서 지표 변화를 유발하는 요인을 식별하는 **`AI.KEY_DRIVERS`** 함수 지원이 복구되었습니다.

- 통계적으로 유의미한 메트릭 변화 원인 분석에 활용

---

## 2026년 6월 10일

### BigQuery Continuous Queries — ARRAY_AGG / STRING_AGG 지원 (Preview)

BigQuery **연속 쿼리(Continuous Queries)** 가 `ARRAY_AGG` 및 `STRING_AGG` 집계 함수를 Preview로 지원합니다.

- 실시간 스트리밍 데이터에 대한 집계 처리 범위 확장

---

## 정리

이번 6월 업데이트의 핵심은 **AI/Gemini 기능의 GA 전환**과 **실시간 파이프라인 자동화** 강화입니다. 특히 대화형 분석의 GA 출시와 트리거 기반 파이프라인 스케줄링은 데이터 팀의 생산성을 크게 높여줄 것으로 기대됩니다.

공식 릴리스 노트 전문은 [여기](https://docs.cloud.google.com/bigquery/docs/release-notes)에서 확인하세요.

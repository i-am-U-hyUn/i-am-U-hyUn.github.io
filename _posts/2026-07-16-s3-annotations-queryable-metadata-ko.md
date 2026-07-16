---
title: "Amazon S3 Annotations — 객체에 풍부한 쿼리 가능 메타데이터를 직접 붙이는 기능 발표"
date: 2026-07-16 10:00:00 +0900
categories: [뉴스, 클라우드]
tags: [AWS, S3, S3Metadata, Annotations, Athena, Iceberg, 메타데이터]
toc: true
---

> 출처: [Amazon S3 annotations: attach rich, queryable context directly to your objects](https://aws.amazon.com/ko/blogs/aws/amazon-s3-annotations-attach-rich-queryable-context-directly-to-your-objects/) (AWS Blog)
{: .prompt-info }

---

## 개요

Amazon S3에 **Annotations(어노테이션)** 이라는 새로운 메타데이터 기능이 추가됐습니다. 객체 하나에 최대 1,000개의 명명된 어노테이션을, 각각 최대 1MB(객체당 총 최대 1GB)까지 JSON/XML/YAML/순수 텍스트 형태로 붙일 수 있고, 객체를 다시 쓰지 않고도 언제든 수정·삭제할 수 있습니다.

| 항목 | 내용 |
|---|---|
| 최대 어노테이션 수 | 객체당 1,000개 |
| 어노테이션당 최대 크기 | 1MB |
| 객체당 총합 최대 | 1GB |
| 지원 형식 | JSON, XML, YAML, 순수 텍스트 |
| 수정/삭제 | 객체 재작성 없이 가능 |

---

## 왜 필요한가

AI 에이전트와 자동화 워크플로우가 데이터를 "찾고, 이해하고, 행동"하려면 계속 진화하는 메타데이터가 필요한데, 지금까지는 이런 메타데이터를 별도 데이터베이스나 사이드카 파일에 분산 관리해야 했습니다. 그 결과 동기화 워크플로우가 복잡해지고, 관리 비용이 데이터 저장 비용을 넘어서는 경우도 있었습니다. 규제 준수 상태, 콘텐츠 분류, AI 생성 요약처럼 "풍부한 컨텍스트"를 객체와 분리하지 않고 다루는 방법이 마땅치 않았던 셈입니다.

---

## 동작 방식

- 어노테이션은 **S3 객체와 함께 저장**되어, 객체를 복사·복제·크로스리전 전송하면 자동으로 같이 이동하고, 객체를 삭제하면 함께 제거됩니다.
- S3 Metadata를 활성화하면 어노테이션이 자동으로 **Apache Iceberg 테이블**로 인덱싱되어 Amazon Athena 등 Iceberg 호환 엔진으로 쿼리할 수 있습니다.
  - 저널 테이블: 거의 실시간으로 업데이트
  - 어노테이션 테이블: 약 1시간 내 새로고침
- 미리 스키마를 정의할 필요가 없고, JSON/XML/YAML 구조에 자동으로 적응합니다.

### 기존 메타데이터/태그와의 차이

| 기능 | 최대 크기 | 수정 가능 | 최적 용도 |
|---|---|---|---|
| 시스템 정의 메타데이터 | 고정 | 불가 | 크기, 스토리지 클래스 등 객체 속성 |
| 사용자 정의 메타데이터 | 2KB | 업로드 시에만 | 작은 커스텀 키-값 쌍 |
| 객체 태그 | 10개, 128/256자 | 가능 | 접근 제어, 라이프사이클, 비용 할당 |
| **어노테이션** | **1GB (1,000×1MB)** | **가능** | **JSON/XML/YAML 등 풍부한 비즈니스 컨텍스트** |

기존 사용자 정의 메타데이터(2KB, 업로드 시 고정)의 한계를 큰 폭으로 넘어서면서도, 태그처럼 자유롭게 수정할 수 있다는 점이 핵심 차이입니다.

---

## 사용 방법

### 어노테이션 추가/조회/삭제 (CLI)

```bash
# 기술 메타데이터를 어노테이션으로 첨부
aws s3api put-object-annotation \
  --bucket my-media-bucket \
  --key videos/documentary-2026.mp4 \
  --annotation-name mediainfo \
  --annotation-payload ./mediainfo.json

# 특정 어노테이션 조회
aws s3api get-object-annotation \
  --bucket my-media-bucket \
  --key videos/documentary-2026.mp4 \
  --annotation-name mediainfo \
  ./mediainfo-output.json

# 객체의 모든 어노테이션 나열
aws s3api list-object-annotations \
  --bucket my-media-bucket \
  --key videos/documentary-2026.mp4

# 어노테이션 삭제
aws s3api delete-object-annotation \
  --bucket my-media-bucket \
  --key videos/documentary-2026.mp4 \
  --annotation-name mediainfo
```

같은 이름으로 `put-object-annotation`을 다시 호출하면 업데이트로 처리됩니다.

### 대규모 쿼리를 위한 어노테이션 테이블 활성화

```bash
aws s3api update-bucket-metadata-annotation-table-configuration \
  --bucket my-media-bucket \
  --annotation-table-configuration \
    '{"ConfigurationState":"ENABLED","Role":"arn:aws:iam::123456789012:role/S3MetadataAnnotationRole"}'
```

### Athena 쿼리 예시

```sql
-- 오디오 트랙이 8개를 초과하는 비디오 찾기
SELECT DISTINCT bucket, object_key
FROM "s3tablescatalog/aws-s3"."b_my_media_bucket"."annotation"
WHERE name = 'mediainfo'
AND CAST(json_extract_scalar(text_value, '$.audio_tracks') AS INTEGER) > 8
```

```sql
-- 최근 24시간 내 추가/삭제된 어노테이션 추적 (저널 테이블)
SELECT bucket, key, version_id, record_timestamp, annotation.name
FROM "s3tablescatalog/aws-s3"."b_my_media_bucket"."journal"
WHERE record_timestamp >= (current_date - interval '1' day)
AND annotation.name IS NOT NULL
AND record_type IN ('CREATE_ANNOTATION', 'DELETE_ANNOTATION')
```

Amazon SageMaker Unified Studio나 S3 Tables MCP 서버를 쓰면 "2023년 스페인어 자막이 있는 PG 등급 영화 찾기" 같은 자연어 쿼리도 가능합니다.

---

## 사용 사례

- **미디어·엔터테인먼트**: 비디오 자산에 AI 생성 트랜스크립트, 콘텐츠 조정 결과, 자막, 라이선싱 메타데이터를 어노테이션으로 저장 → 별도 미디어 자산 관리 시스템과의 동기화가 불필요
- **금융 서비스**: 연구 문서에 AI 생성 투자 요약·감정 분석을 붙여, 리서치 에이전트가 자연어 쿼리로 관련 데이터셋을 직접 발견
- **생명과학**: 임상 시험 데이터에 규제 상태·환자 군집·승인 체인을 어노테이션으로 남겨 준수 감사를 가속화 — S3 Glacier에 보관된 데이터도 검색(retrieval) 비용 없이 접근 가능

---

## 가격·리전·제약사항

- **가격**: 어노테이션 스토리지는 부모 객체의 스토리지 클래스(Glacier 등)와 무관하게 항상 **S3 Standard 요금**으로 청구
- **리전**: 어노테이션 자체는 AWS China 리전을 포함한 모든 리전에서 지원, 어노테이션 테이블은 S3 Metadata를 지원하는 리전에서 지원
- **권한**: `s3:PutObjectAnnotation`, `s3:GetObjectAnnotation` IAM 권한 필요
- **멀티파트 업로드**: 업로드 완료 후에 어노테이션 첨부 필요
- **백필**: 기존 어노테이션이 있는 버킷에서 어노테이션 테이블을 새로 활성화하면, 객체 수에 따라 백필에 수 시간~수 일이 걸릴 수 있음

---

## 정리

S3 Annotations는 객체당 최대 1GB, 기존 사용자 정의 메타데이터(2KB) 대비 500배 이상 넉넉한 용량으로 메타데이터를 객체와 물리적으로 묶어버리는 접근입니다. 별도 메타데이터 DB나 사이드카 파일 동기화 부담 없이, 객체가 이동·복제·삭제될 때 메타데이터도 자동으로 따라가고, 필요하면 Athena로 페타바이트 규모까지 쿼리할 수 있다는 게 핵심입니다. AI 에이전트가 스토리지에서 직접 컨텍스트를 찾아 쓰게 하려는 최근 AWS의 방향성과도 자연스럽게 이어지는 기능으로 보입니다. 같은 맥락의 발표인 [Amazon Bedrock AgentCore 지식 확장 소식]({% post_url 2026-07-16-bedrock-agentcore-knowledge-continuous-learning-ko %})도 함께 참고할 만합니다.

---
title: "RFC 822: 인터넷 이메일 형식의 시작"
date: 2026-06-22 18:00:00 +0900
categories: [공부, 네트워크]
tags: [RFC, RFC822, 이메일, 인터넷표준, 네트워크, 프로토콜, 이메일헤더]
toc: true
---

> 이 포스트는 [RFC 822 공식 문서](https://www.rfc-editor.org/info/rfc822/)를 바탕으로, 인터넷 이메일 메시지 형식의 근간을 이루는 RFC 822 표준을 정리한 글이다.

---

## RFC 822란?

RFC 822는 1982년 8월 13일 David H. Crocker가 작성한 문서로, **"ARPA 인터넷 텍스트 메시지의 형식 표준"** 을 정의한다. 이전 버전인 RFC 733을 개정한 것으로, 오늘날 우리가 사용하는 이메일 시스템(`From:`, `To:`, `Subject:`, `Date:` 헤더 등)의 근간을 형성한 역사적으로 중요한 표준이다.

| 항목 | 내용 |
|------|------|
| 발행일 | 1982년 8월 13일 |
| 작성자 | David H. Crocker |
| 이전 버전 | RFC 733 |
| 현재 상태 | 폐기됨 (RFC 2822 → RFC 5322로 대체) |

> **핵심 원칙:** 이 표준은 메시지 **내용(contents)** 의 형식과 의미만 다루며, 봉투(envelope)·저장 형식·UI는 규정 범위 밖이다.

---

## 메시지 기본 구조

RFC 822 메시지는 크게 **헤더**와 **본문** 두 부분으로 나뉘며, 빈 줄(CRLF)로 구분된다.

```
message = fields [CRLF body]
               ↑            ↑
            헤더 필드    (빈 줄로 구분) 본문
```

헤더 필드의 일반 형태는 다음과 같다:

```
field-name ":" field-body CRLF
```

긴 헤더는 `CRLF + 공백(LWSP)`으로 **폴딩(folding)** 이 가능하다. 즉, 헤더가 너무 길면 줄을 나눠서 표현할 수 있다.

---

## 주요 헤더 필드

### 날짜 / 발신자 (필수)

| 필드 | 설명 |
|------|------|
| `Date` | 메시지 원본 작성 시간 (필수) |
| `From` | 메시지 작성자 (필수) |
| `Sender` | 실제 발송자 (From과 다를 경우 사용) |
| `Reply-To` | 회신 수신 주소 |

### 수신자

| 필드 | 설명 |
|------|------|
| `To` | 주요 수신자 |
| `cc` | 참조 수신자 (Carbon Copy) |
| `bcc` | 숨은 참조 (Blind Carbon Copy) — 다른 수신자에게 비공개 |

### 추적 / 참조

| 필드 | 설명 |
|------|------|
| `Received` | 각 중계 서버가 추가하는 경로 추적 정보 |
| `Return-Path` | 반송 경로 |
| `Message-ID` | 메시지 고유 식별자 (`<id@domain>`) |
| `In-Reply-To` | 답장 대상 메시지 ID |
| `References` | 관련 메시지 참조 |

### 기타

| 필드 | 설명 |
|------|------|
| `Subject` | 제목 |
| `Comments` | 추가 의견 |
| `Keywords` | 쉼표 구분 키워드 |
| `Encrypted` | 암호화 방식 표시 |

> 표준에 없는 확장 필드는 **`X-`** 접두어로 시작할 수 있다.

---

## 날짜/시간 형식

```
Date: 13 Aug 82 12:00:00 GMT
      ↑       ↑           ↑
   일 월 연도  시:분:초    시간대
```

지원하는 시간대: `UT`, `GMT`, `EST`, `EDT`, `+0900` 등 오프셋 형식이 모두 허용된다.

---

## 주소 형식

### 기본 형태 (addr-spec)

```
addr-spec = local-part "@" domain
예: user@example.com
```

### 이름 포함 형태

```
"Alfred Neuman" <neuman@bbn.arpa>
Alfred Neuman <neuman@bbn.arpa>
```

### 그룹 주소

여러 수신자를 하나의 그룹으로 묶을 수 있다:

```
Gourmets: chef@host1, baker@host2, taster@host3;
```

### 소스 라우팅 (비권장)

중계 서버를 직접 지정하는 방식으로, **사용을 강력히 권장하지 않는다:**

```
<@relay1,@relay2:user@final.domain>
```

### 예약 주소

- `Postmaster@domain` — 모든 사이트에서 반드시 유효해야 하며, 대소문자에 관계없이 처리해야 한다.

---

## 문법 표기법 (ABNF)

RFC 822는 확장 BNF(Augmented BNF) 표기법으로 문법을 정의한다:

| 표기 | 의미 |
|------|------|
| `a / b` | a 또는 b 선택 |
| `*element` | 0회 이상 반복 |
| `1*element` | 1회 이상 반복 |
| `[element]` | 선택 사항 |
| `#element` | 쉼표로 구분된 리스트 |
| `(comment)` | 주석 — 파싱 시 무시됨 |

---

## 재전송(Forwarding) 메커니즘

메시지를 재전달할 때는 `Resent-` 접두어를 붙인 필드를 새로 추가한다:

```
Resent-From: 재전송 발신자
Resent-Date: 재전송 시간
Resent-To / Resent-cc / Resent-bcc: 재전송 수신자
Resent-Message-ID: 재전송 메시지 ID
```

원본 필드는 그대로 유지되며, `Resent-*` 필드가 더 최신 정보로 취급된다.

---

## 실제 메시지 예시

최소한의 필수 헤더로 구성된 이메일:

```
From: sender@example.com
Date: 13 Aug 82 12:00:00 GMT
To: recipient@example.com
Subject: Hello, ARPA Internet!

메시지 본문이 여기에 옵니다.
빈 줄 하나로 헤더와 본문이 구분됩니다.
```

추적 정보가 포함된 복잡한 예시:

```
Return-Path: <sender@origin.org>
Received: from X by Y ; 13 Aug 82 12:00:02 GMT
Date: 13 Aug 82 12:00:00 GMT
From: Author Name <author@domain>
Sender: actual.sender@domain
Reply-To: reply.target@domain
To: primary@recipient.org
cc: secondary@recipient.org
Message-ID: <unique.id@sender.domain>
Subject: RFC 822 Example
```

---

## 주요 기술 규칙 요약

1. **대소문자 무관**: 필드명, 도메인명 등은 대소문자를 구분하지 않는다 (단, `local-part`는 구분).
2. **공백 처리**: 여러 공백·탭은 단일 공백으로 취급 (quoted-string 내부 제외).
3. **주석 삽입**: `(comment)` 형태로 어디든 삽입 가능하며, 파싱 시 무시된다.
4. **특수문자 이스케이프**: `\"`, `\\` 형태로 처리.
5. **도메인 리터럴**: `[192.168.1.1]` 형태는 **강력 비권장** — 임시 우회 목적에만 허용.

---

## RFC 822의 역사적 위상

```
RFC 733 (1977)
    ↓
RFC 822 (1982)  ← 인터넷 이메일의 사실상 표준
    ↓
RFC 2822 (2001) ← 업데이트된 표준
    ↓
RFC 5322 (2008) ← 현재 최신 표준
```

RFC 822는 현재 **폐기(Obsoleted)** 상태이지만, 1982년부터 수십 년간 전 세계 이메일 시스템의 뼈대가 된 문서다. 지금 우리가 Gmail이나 Outlook에서 보는 `From:`, `To:`, `Subject:`, `Date:` 같은 헤더 필드가 모두 이 표준에서 출발했다고 해도 과언이 아니다.

---

## 마무리

RFC 822는 단순한 기술 문서가 아니라, 인터넷 이메일이라는 거대한 생태계의 씨앗이다. 새로운 기술을 배울 때 그 뿌리를 찾아가는 습관이, 현재의 시스템을 더 깊이 이해하는 데 도움이 된다.

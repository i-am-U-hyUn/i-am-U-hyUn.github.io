---
title: "포스트 작성 방법 가이드"
date: 2026-06-15 10:00:00 +0900
categories: [블로그, 가이드]
tags: [Jekyll, Chirpy, Markdown, 사용법]
---

# Chirpy 블로그 포스트 작성 가이드

이 포스트에서는 블로그에 글을 작성하는 방법을 정리합니다.

## 파일 이름 규칙

`_posts` 폴더에 다음 형식으로 파일을 만들면 됩니다:

```
YYYY-MM-DD-제목.md
```

예시:
```
2026-06-15-my-first-post.md
```

## 프론트매터 (Front Matter)

모든 포스트는 상단에 다음과 같은 설정이 필요합니다:

```yaml
---
title: "포스트 제목"
date: 2026-06-15 09:00:00 +0900
categories: [카테고리1, 서브카테고리]
tags: [태그1, 태그2, 태그3]
---
```

## 유용한 Markdown 문법

### 코드 블록

```python
def hello():
    print("Hello, World!")
```

### 알림 박스

> 💡 일반 정보를 표시합니다.
{: .prompt-info }

> ⚠️ 주의가 필요한 내용입니다.
{: .prompt-warning }

> ❌ 위험한 내용을 경고합니다.
{: .prompt-danger }

> ✅ 팁을 제공합니다.
{: .prompt-tip }

### 목차

`toc: true`를 프론트매터에 추가하면 자동으로 목차가 생성됩니다.

## 이미지 추가

이미지는 `assets/img/posts/` 폴더에 저장하고 다음과 같이 사용합니다:

```markdown
![이미지 설명](/assets/img/posts/my-image.png)
```

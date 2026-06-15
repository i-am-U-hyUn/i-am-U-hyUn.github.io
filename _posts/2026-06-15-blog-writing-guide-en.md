---
title: "How to Write Posts on This Blog"
date: 2026-06-15 00:11:00 +0900
categories: [Blog, Guide]
tags: [Jekyll, Chirpy, Markdown, guide]
---

# Chirpy Blog Post Writing Guide

This post covers how to write and publish posts on this blog.

## File Naming Convention

Create files in the `_posts` folder using this format:

```
YYYY-MM-DD-title.md
```

Example:
```
2026-06-15-my-first-post.md
```

## Front Matter

Every post needs the following configuration at the top:

```yaml
---
title: "Post Title"
date: 2026-06-15 09:00:00 +0900
categories: [Category, Subcategory]
tags: [tag1, tag2, tag3]
---
```

## Useful Markdown Syntax

### Code Block

```python
def hello():
    print("Hello, World!")
```

### Alert Boxes

> 💡 General information.
{: .prompt-info }

> ⚠️ Something to be cautious about.
{: .prompt-warning }

> ❌ Danger warning.
{: .prompt-danger }

> ✅ A helpful tip.
{: .prompt-tip }

### Table of Contents

Add `toc: true` to front matter to auto-generate a table of contents.

## Adding Images

Store images in `assets/img/posts/` and use them like this:

```markdown
![Description](/assets/img/posts/my-image.png)
```

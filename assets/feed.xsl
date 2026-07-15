<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/atom:feed">
    <html lang="ko">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="atom:title"/> · RSS</title>
        <style>
          :root { color-scheme: dark; }
          body {
            margin: 0;
            padding: 2.5rem 1rem;
            min-height: 100vh;
            background: #0b1020;
            color: #e5edff;
            font-family: -apple-system, "Segoe UI", sans-serif;
            display: flex;
            justify-content: center;
          }
          main { width: 100%; max-width: 42rem; }
          .term {
            background: rgb(7 8 13 / 55%);
            border: 1px solid rgb(94 234 212 / 20%);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 12px 32px rgb(0 0 0 / 30%);
            margin-bottom: 1.5rem;
          }
          .titlebar {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.55rem 0.8rem;
            background: rgb(255 255 255 / 4%);
            border-bottom: 1px solid rgb(255 255 255 / 6%);
          }
          .dot { width: 11px; height: 11px; border-radius: 50%; display: inline-block; }
          .dot.red { background: #ff5f56; }
          .dot.yellow { background: #ffbd2e; }
          .dot.green { background: #27c93f; }
          .path {
            margin-left: 0.5rem;
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            font-size: 0.78rem;
            opacity: 0.55;
          }
          .body {
            padding: 1rem 1.1rem 1.25rem;
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            font-size: 0.85rem;
            line-height: 1.7;
            white-space: pre-wrap;
            word-break: break-word;
          }
          .prompt { color: #5eead4; }
          .egg { opacity: 0.85; }
          .egg .star { color: #a78bfa; }
          h1 {
            font-size: 1.05rem;
            margin: 0 0 0.35rem;
          }
          .subtitle { opacity: 0.7; font-size: 0.85rem; margin-bottom: 1.25rem; }
          ul.entries { list-style: none; margin: 0; padding: 0; }
          .entries li {
            padding: 0.85rem 0;
            border-bottom: 1px solid rgb(255 255 255 / 8%);
          }
          .entries li:last-child { border-bottom: none; }
          .entry-date {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            font-size: 0.75rem;
            color: #5eead4;
            opacity: 0.85;
          }
          .entry-title a {
            color: #e5edff;
            text-decoration: none;
            font-weight: 600;
          }
          .entry-title a:hover { color: #a78bfa; text-decoration: underline; }
          .tag {
            display: inline-block;
            font-size: 0.72rem;
            padding: 0.1rem 0.5rem;
            margin: 0.3rem 0.3rem 0 0;
            border-radius: 1rem;
            background: rgb(167 139 250 / 12%);
            border: 1px solid rgb(167 139 250 / 30%);
            opacity: 0.85;
          }
          .subscribe {
            font-size: 0.8rem;
            opacity: 0.6;
            line-height: 1.6;
          }
          .subscribe code {
            background: rgb(255 255 255 / 8%);
            padding: 0.1rem 0.4rem;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <main>
          <div class="term">
            <div class="titlebar">
              <span class="dot red"/><span class="dot yellow"/><span class="dot green"/>
              <span class="path">yuhyeon@portfolio ~ %</span>
            </div>
            <div class="body">
              <div><span class="prompt">$</span> cat feed.xml</div>
              <div class="egg">
                <span class="star">*</span> 오, 진짜로 RSS 파일을 열어보셨네요.
                호기심 많은 분이시군요<span class="star">.</span> 여긴 사람 눈으로 보라고 만든 화면은 아니었는데,
                이왕 오신 김에 예쁘게 보여드릴게요<span class="star">.</span>
              </div>
              <br/>
              <h1><xsl:value-of select="atom:title"/></h1>
              <div class="subtitle"><xsl:value-of select="atom:subtitle"/></div>

              <div><span class="prompt">$</span> ls -la posts/</div>
              <ul class="entries">
                <xsl:for-each select="atom:entry">
                  <li>
                    <div class="entry-date"><xsl:value-of select="substring(atom:published, 1, 10)"/></div>
                    <div class="entry-title">
                      <a href="{atom:link/@href}"><xsl:value-of select="atom:title"/></a>
                    </div>
                    <xsl:for-each select="atom:category">
                      <span class="tag"><xsl:value-of select="@term"/></span>
                    </xsl:for-each>
                  </li>
                </xsl:for-each>
              </ul>

              <br/>
              <div class="subscribe">
                <span class="prompt">$</span> RSS 리더로 구독하려면 이 주소를 그대로 등록하세요:<br/>
                <code><xsl:value-of select="atom:link[@rel='self']/@href"/></code>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

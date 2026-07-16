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
          .game-wrap { margin: 1.1rem 0 1.4rem; }
          .game-hint {
            font-size: 0.72rem;
            opacity: 0.55;
            margin-bottom: 0.4rem;
          }
          #dino-game {
            display: block;
            width: 100%;
            max-width: 100%;
            height: auto;
            background: #070b16;
            border: 1px solid rgb(94 234 212 / 20%);
            border-radius: 6px;
            touch-action: manipulation;
            cursor: pointer;
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

              <div class="game-wrap">
                <div class="game-hint">$ ./run_dino.sh <xsl:text> </xsl:text>— Space / 탭으로 점프, 기다리는 동안 한 판 하고 가세요</div>
                <canvas id="dino-game" width="600" height="150"></canvas>
                <script><![CDATA[
                  (function () {
                    var canvas = document.getElementById('dino-game');
                    if (!canvas || !canvas.getContext) return;
                    var ctx = canvas.getContext('2d');
                    var W = canvas.width, H = canvas.height;
                    var groundY = H - 20;
                    var GRAVITY = 0.9;
                    var JUMP_V = -11;

                    var dino = { x: 30, w: 22, h: 30, y: 0, vy: 0, onGround: true };
                    var obstacles = [];
                    var spawnTimer = 0;
                    var speed = 4;
                    var score = 0;
                    var started = false;
                    var over = false;
                    var frame = 0;

                    function reset() {
                      dino.y = groundY - dino.h;
                      dino.vy = 0;
                      dino.onGround = true;
                      obstacles = [];
                      spawnTimer = 0;
                      speed = 4;
                      score = 0;
                      over = false;
                      frame = 0;
                    }

                    function jumpOrStart() {
                      if (over) { reset(); started = true; return; }
                      if (!started) { started = true; return; }
                      if (dino.onGround) { dino.vy = JUMP_V; dino.onGround = false; }
                    }

                    document.addEventListener('keydown', function (e) {
                      if (e.code === 'Space' || e.code === 'ArrowUp') {
                        e.preventDefault();
                        jumpOrStart();
                      }
                    });
                    canvas.addEventListener('pointerdown', function (e) {
                      e.preventDefault();
                      jumpOrStart();
                    });

                    function spawnObstacle() {
                      var h = 20 + Math.random() * 20;
                      obstacles.push({ x: W + 10, y: groundY - h, w: 14, h: h });
                    }

                    function update() {
                      if (!started || over) return;
                      frame++;
                      dino.vy += GRAVITY;
                      dino.y += dino.vy;
                      if (dino.y >= groundY - dino.h) {
                        dino.y = groundY - dino.h;
                        dino.vy = 0;
                        dino.onGround = true;
                      }

                      spawnTimer--;
                      if (spawnTimer <= 0) {
                        spawnObstacle();
                        spawnTimer = Math.max(28, 55 + Math.random() * 45 - speed * 3);
                      }

                      for (var i = obstacles.length - 1; i >= 0; i--) {
                        obstacles[i].x -= speed;
                        if (obstacles[i].x + obstacles[i].w < 0) {
                          obstacles.splice(i, 1);
                          score++;
                        }
                      }

                      for (var j = 0; j < obstacles.length; j++) {
                        var o = obstacles[j];
                        if (dino.x < o.x + o.w && dino.x + dino.w > o.x &&
                            dino.y < o.y + o.h && dino.y + dino.h > o.y) {
                          over = true;
                        }
                      }

                      if (frame % 300 === 0) speed += 0.4;
                    }

                    function draw() {
                      ctx.clearRect(0, 0, W, H);

                      ctx.strokeStyle = 'rgba(94,234,212,0.35)';
                      ctx.beginPath();
                      ctx.moveTo(0, groundY + 0.5);
                      ctx.lineTo(W, groundY + 0.5);
                      ctx.stroke();

                      ctx.fillStyle = '#5eead4';
                      ctx.fillRect(dino.x, dino.y, dino.w, dino.h);

                      ctx.fillStyle = '#a78bfa';
                      for (var i = 0; i < obstacles.length; i++) {
                        var o = obstacles[i];
                        ctx.fillRect(o.x, o.y, o.w, o.h);
                      }

                      ctx.fillStyle = '#e5edff';
                      ctx.font = '12px monospace';
                      ctx.fillText('SCORE ' + score, W - 90, 18);

                      ctx.font = '13px monospace';
                      ctx.fillStyle = 'rgba(229,237,255,0.85)';
                      if (!started) {
                        ctx.fillText('탭 / Space 로 시작', W / 2 - 58, H / 2);
                      } else if (over) {
                        ctx.fillText('GAME OVER · 다시 탭 / Space', W / 2 - 85, H / 2);
                      }
                    }

                    function loop() {
                      update();
                      draw();
                      requestAnimationFrame(loop);
                    }

                    reset();
                    draw();
                    requestAnimationFrame(loop);
                  })();
                ]]></script>
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

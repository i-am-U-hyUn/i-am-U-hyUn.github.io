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
        <script defer="defer" src="/assets/js/cyberpunk-mode.js"></script>
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
          .game-wrap { margin: 1.1rem 0 1.4rem; }
          .game-hint {
            font-size: 0.72rem;
            opacity: 0.55;
            margin-bottom: 0.4rem;
          }
          .home-cta { margin: 1rem 0 0.25rem; }
          .home-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.55rem 1.1rem;
            border-radius: 8px;
            border: 1px solid rgb(94 234 212 / 30%);
            background: rgb(94 234 212 / 8%);
            color: #5eead4;
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            font-size: 0.82rem;
            font-weight: 600;
            text-decoration: none;
            transition: background 0.2s ease, border-color 0.2s ease;
          }
          .home-btn:hover {
            background: rgb(94 234 212 / 16%);
            border-color: rgb(94 234 212 / 60%);
          }
          .home-btn.win-glow {
            color: #39ff14;
            border-color: rgb(57 255 20 / 55%);
            background: rgb(57 255 20 / 10%);
            animation: home-btn-pulse 1.6s ease-in-out infinite;
          }
          .home-btn.win-glow:hover {
            background: rgb(57 255 20 / 20%);
            border-color: rgb(57 255 20 / 85%);
          }
          @keyframes home-btn-pulse {
            0%, 100% { box-shadow: 0 0 0 rgb(57 255 20 / 0%); }
            50% { box-shadow: 0 0 14px 2px rgb(57 255 20 / 45%); }
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
                <div class="game-hint">$ ./run_dino.sh <xsl:text> </xsl:text>— Space / 탭으로 점프 · 인생이 당신에게 레몬을 준다면? 🍋 22개를 모으면 무슨 일이 일어나는지 확인해보세요</div>
                <canvas id="dino-game" width="600" height="150"></canvas>
                <script><![CDATA[
                  (function () {
                    var canvas = document.getElementById('dino-game');
                    if (!canvas || !canvas.getContext) return;
                    var ctx = canvas.getContext('2d');
                    var W = canvas.width, H = canvas.height;
                    var groundY = H - 20;
                    var GRAVITY = 0.9;
                    var JUMP_V = -12;
                    var PIXEL = 1;

                    // 크롬 오프라인 공룡 게임 스크린샷에서 그대로 딴 도트 실루엣
                    var DINO_FRAME_A = [
                      "..................................########################....",
                      "..................................########################....",
                      "..................................#########################...",
                      "...............................##############################.",
                      "...............................######..######################.",
                      "...............................######...######################",
                      "...............................######...#####################.",
                      "...............................######...#####################.",
                      "...............................##############################.",
                      "...............................##############################.",
                      "...............................##############################.",
                      "...............................##############################.",
                      "...............................###############################",
                      "...............................##############################.",
                      "...............................###############################",
                      "...............................##############################.",
                      "...............................##############################.",
                      "...............................###############................",
                      "...............................###############................",
                      "...............................###############................",
                      "...............................########################.......",
                      "...............................########################.......",
                      "...............................########################.......",
                      ".#..........................###############...................",
                      "###.........................###############...................",
                      "###.........................###############...................",
                      "###.....................###################...................",
                      "###....................####################...................",
                      "###....................####################...................",
                      "######.............##############################.............",
                      "######.............##############################.............",
                      "######............###############################.............",
                      "########........###########################...###.............",
                      "#########.......###########################...###.............",
                      "#########.......###########################....##.............",
                      "###########################################...................",
                      "###########################################...................",
                      "###########################################...................",
                      "###########################################...................",
                      "###########################################...................",
                      "###########################################...................",
                      "...########################################...................",
                      "...######################################.....................",
                      "...#####################################......................",
                      "......##################################......................",
                      "......##################################......................",
                      "......##################################......................",
                      ".........############################.........................",
                      ".........############################.........................",
                      "..........###########################.........................",
                      "............#######################...........................",
                      "............######################............................",
                      ".............#####################............................",
                      "...............##########..#######............................",
                      "................#########...######............................",
                      "................#########...######............................"
                    ];
                    var DINO_FRAME_B = [
                      "..................................########################....",
                      "..................................########################....",
                      "..................................#########################...",
                      "...............................##############################.",
                      "...............................######..######################.",
                      "...............................######...######################",
                      "...............................######...#####################.",
                      "...............................######...#####################.",
                      "...............................##############################.",
                      "...............................##############################.",
                      "...............................##############################.",
                      "...............................##############################.",
                      "...............................###############################",
                      "...............................##############################.",
                      "...............................###############################",
                      "...............................##############################.",
                      "...............................##############################.",
                      "...............................###############................",
                      "...............................###############................",
                      "...............................###############................",
                      "...............................########################.......",
                      "...............................########################.......",
                      "...............................########################.......",
                      ".#..........................###############...................",
                      "###.........................###############...................",
                      "###.........................###############...................",
                      "###.....................###################...................",
                      "###....................####################...................",
                      "###....................####################...................",
                      "######.............##############################.............",
                      "######.............##############################.............",
                      "######............###############################.............",
                      "########........###########################...###.............",
                      "#########.......###########################...###.............",
                      "#########.......###########################....##.............",
                      "###########################################...................",
                      "###########################################...................",
                      "###########################################...................",
                      "###########################################...................",
                      "###########################################...................",
                      "###########################################...................",
                      "...########################################...................",
                      "...######################################.....................",
                      "...#####################################......................",
                      "......##################################......................",
                      "......##################################......................",
                      "......##################################......................",
                      ".........############################.........................",
                      ".........############################.........................",
                      "..........###########################.........................",
                      "............#######################...........................",
                      "............######################............................",
                      ".............#####################............................",
                      "...............#######..##########............................",
                      "................######...#########............................",
                      "................######...#########............................"
                    ];
                    var CACTUS_SPRITE = [
                      "..............########............",
                      ".............##########...........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########......###.",
                      ".............###########.....#####",
                      ".............###########....######",
                      "..####.......###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      "########.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      ".#######.....###########....######",
                      "########.....###########....######",
                      ".#######.....###########....######",
                      ".################################.",
                      "################################..",
                      ".##############################...",
                      "..############################....",
                      "...######################.........",
                      "....####################..........",
                      ".....###################..........",
                      "............############..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########..........",
                      ".............###########.........."
                    ];

                    var DINO_W = DINO_FRAME_A[0].length * PIXEL;
                    var DINO_H = DINO_FRAME_A.length * PIXEL;
                    var CACTUS_W = CACTUS_SPRITE[0].length * PIXEL;
                    var CACTUS_H = CACTUS_SPRITE.length * PIXEL;

                    // 실루엣 전체(꼬리·가시 끝)가 아니라 몸통 중심부만 판정하는 여유 있는 히트박스
                    // (점프 물리 대비 실제 이미지 실루엣이 커서, 풀 바운딩 박스로는 선인장을 절대 못 넘김)
                    var DINO_HIT_W = 36;
                    var CACTUS_HIT_W = 14;
                    var CACTUS_HIT_H = 30;
                    var DINO_HIT_OFFSET_X = (DINO_W - DINO_HIT_W) / 2;
                    var CACTUS_HIT_OFFSET_X = (CACTUS_W - CACTUS_HIT_W) / 2;

                    var dino = { x: 30, w: DINO_W, h: DINO_H, y: 0, vy: 0, onGround: true };
                    var obstacles = [];
                    var spawnTimer = 0;
                    var speed = 4;
                    var score = 0;
                    var started = false;
                    var over = false;
                    var frame = 0;

                    var LEMON_GOAL = 22;
                    var lemons = 0;
                    var won = false;
                    var glitchFrames = 0;
                    var GLITCH_DURATION = 45;
                    var popups = [];

                    function celebrateWin() {
                      try { localStorage.setItem('cyberpunk-mode', '1'); } catch (e) {}
                      if (window.CyberpunkMode && window.CyberpunkMode.enable) window.CyberpunkMode.enable();

                      var btn = document.querySelector('.home-btn');
                      if (btn) {
                        btn.textContent = '🍋 레모네이드 완성 · $ exit matrix';
                        btn.classList.add('win-glow');
                      }
                    }

                    function resetHomeButton() {
                      var btn = document.querySelector('.home-btn');
                      if (btn) {
                        btn.textContent = '접속 해제 · 매트릭스 밖으로';
                        btn.classList.remove('win-glow');
                      }
                    }

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
                      lemons = 0;
                      won = false;
                      glitchFrames = 0;
                      popups = [];
                      resetHomeButton();
                    }

                    function updatePopups() {
                      for (var k = popups.length - 1; k >= 0; k--) {
                        popups[k].y -= 1;
                        popups[k].life -= 0.03;
                        if (popups[k].life <= 0) popups.splice(k, 1);
                      }
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
                      obstacles.push({ x: W + 10, y: groundY - CACTUS_H, w: CACTUS_W, h: CACTUS_H });
                    }

                    function update() {
                      if (!started) return;
                      if (over) {
                        if (glitchFrames > 0) glitchFrames--;
                        return;
                      }
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
                          lemons++;
                          popups.push({ x: dino.x + dino.w / 2, y: dino.y, life: 1 });
                          if (lemons >= LEMON_GOAL) {
                            won = true;
                            over = true;
                            glitchFrames = GLITCH_DURATION;
                            initMatrix();
                            celebrateWin();
                          }
                        }
                      }

                      var hitX = dino.x + DINO_HIT_OFFSET_X;
                      for (var j = 0; j < obstacles.length && !over; j++) {
                        var o = obstacles[j];
                        var oHitX = o.x + CACTUS_HIT_OFFSET_X;
                        var oHitY = groundY - CACTUS_HIT_H;
                        if (hitX < oHitX + CACTUS_HIT_W && hitX + DINO_HIT_W > oHitX &&
                            dino.y < oHitY + CACTUS_HIT_H && dino.y + dino.h > oHitY) {
                          over = true;
                          try {
                            if (localStorage.getItem('cyberpunk-mode') === '1') {
                              localStorage.removeItem('cyberpunk-mode');
                            }
                          } catch (e) {}
                        }
                      }

                      updatePopups();
                      if (frame % 300 === 0) speed += 0.4;
                    }

                    function drawSprite(sprite, x, y, color) {
                      ctx.fillStyle = color;
                      for (var r = 0; r < sprite.length; r++) {
                        var row = sprite[r];
                        for (var c = 0; c < row.length; c++) {
                          if (row.charAt(c) === '#') {
                            ctx.fillRect(x + c * PIXEL, y + r * PIXEL, PIXEL, PIXEL);
                          }
                        }
                      }
                    }

                    var MATRIX_CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%&アイウエオカキクケコサシスセソ';
                    var MATRIX_FONT_SIZE = 10;
                    var matrixCols = [];

                    function initMatrix() {
                      var count = Math.ceil(W / MATRIX_FONT_SIZE);
                      matrixCols = [];
                      for (var i = 0; i < count; i++) {
                        matrixCols.push({ y: Math.random() * -H, speed: 0.8 + Math.random() * 1.4 });
                      }
                    }

                    function drawMatrixRain() {
                      ctx.font = MATRIX_FONT_SIZE + 'px monospace';
                      for (var i = 0; i < matrixCols.length; i++) {
                        var col = matrixCols[i];
                        var x = i * MATRIX_FONT_SIZE;
                        ctx.fillStyle = 'rgba(57,255,20,0.9)';
                        ctx.fillText(MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length)), x, col.y);
                        ctx.fillStyle = 'rgba(57,255,20,0.25)';
                        ctx.fillText(MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length)), x, col.y - MATRIX_FONT_SIZE);
                        col.y += col.speed;
                        if (col.y > H + MATRIX_FONT_SIZE) col.y = Math.random() * -H * 0.5;
                      }
                    }

                    function drawHudCorners() {
                      var m = 9, len = 15;
                      ctx.strokeStyle = 'rgba(0,255,255,0.75)';
                      ctx.lineWidth = 2;
                      ctx.beginPath();
                      ctx.moveTo(m, m + len); ctx.lineTo(m, m); ctx.lineTo(m + len, m);
                      ctx.moveTo(W - m - len, m); ctx.lineTo(W - m, m); ctx.lineTo(W - m, m + len);
                      ctx.moveTo(m, H - m - len); ctx.lineTo(m, H - m); ctx.lineTo(m + len, H - m);
                      ctx.moveTo(W - m - len, H - m); ctx.lineTo(W - m, H - m); ctx.lineTo(W - m, H - m - len);
                      ctx.stroke();
                    }

                    function drawWinSequence() {
                      ctx.fillStyle = '#000';
                      ctx.fillRect(0, 0, W, H);
                      drawMatrixRain();

                      if (glitchFrames > 0) {
                        for (var s = 0; s < 5; s++) {
                          var sy = Math.floor(Math.random() * H);
                          var sh = 3 + Math.floor(Math.random() * 8);
                          var dx = (Math.random() - 0.5) * 26;
                          ctx.drawImage(canvas, 0, sy, W, sh, dx, sy, W, sh);
                        }
                        ctx.globalCompositeOperation = 'lighter';
                        ctx.fillStyle = 'rgba(0,255,255,0.08)';
                        ctx.fillRect(-3, 0, W, H);
                        ctx.fillStyle = 'rgba(255,0,234,0.08)';
                        ctx.fillRect(3, 0, W, H);
                        ctx.globalCompositeOperation = 'source-over';
                      }

                      drawHudCorners();

                      var settled = glitchFrames <= 0;
                      var showText = settled || Math.random() < 0.8;
                      if (showText) {
                        var jx = settled ? 0 : (Math.random() - 0.5) * 5;
                        var jy = settled ? 0 : (Math.random() - 0.5) * 5;

                        ctx.textAlign = 'center';
                        ctx.font = 'bold 20px monospace';
                        ctx.fillStyle = 'rgba(255,0,234,0.9)';
                        ctx.fillText('YOU WIN', W / 2 + 2 + jx, H / 2 - 20 + jy);
                        ctx.fillStyle = 'rgba(0,255,255,0.9)';
                        ctx.fillText('YOU WIN', W / 2 - 2 + jx, H / 2 - 20 + jy);
                        ctx.fillStyle = '#39ff14';
                        ctx.fillText('YOU WIN', W / 2 + jx, H / 2 - 20 + jy);

                        if (settled) {
                          ctx.font = '13px monospace';
                          ctx.fillStyle = '#39ff14';
                          ctx.fillText('🍋 레모네이드 완성! 🥤', W / 2, H / 2 + 4);
                          ctx.font = '11px monospace';
                          ctx.fillStyle = 'rgba(57,255,20,0.7)';
                          ctx.fillText('로그아웃 완료 · 현실로 복귀', W / 2, H / 2 + 24);
                        }
                        ctx.textAlign = 'start';
                      }
                    }

                    function draw() {
                      ctx.clearRect(0, 0, W, H);

                      if (won) {
                        drawWinSequence();
                        return;
                      }

                      ctx.strokeStyle = 'rgba(94,234,212,0.35)';
                      ctx.beginPath();
                      ctx.moveTo(0, groundY + 0.5);
                      ctx.lineTo(W, groundY + 0.5);
                      ctx.stroke();

                      var dinoSprite = DINO_FRAME_A;
                      if (started && !over && dino.onGround) {
                        dinoSprite = Math.floor(frame / 6) % 2 === 0 ? DINO_FRAME_A : DINO_FRAME_B;
                      }
                      drawSprite(dinoSprite, dino.x, dino.y, '#5eead4');

                      for (var i = 0; i < obstacles.length; i++) {
                        var o = obstacles[i];
                        drawSprite(CACTUS_SPRITE, o.x, o.y, '#a78bfa');
                      }

                      for (var p = 0; p < popups.length; p++) {
                        var pu = popups[p];
                        ctx.fillStyle = 'rgba(254,240,138,' + Math.max(0, pu.life) + ')';
                        ctx.font = '12px monospace';
                        ctx.fillText('+1 🍋', pu.x - 14, pu.y - 6);
                      }

                      ctx.fillStyle = '#fef08a';
                      ctx.font = '12px monospace';
                      ctx.fillText('🍋 ' + lemons + '/' + LEMON_GOAL, 8, 18);

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
              <div><span class="prompt">$</span> exit</div>
              <div class="home-cta">
                <a class="home-btn" href="/">접속 해제 · 매트릭스 밖으로</a>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

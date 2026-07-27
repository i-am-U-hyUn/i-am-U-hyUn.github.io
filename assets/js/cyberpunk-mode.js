/**
 * Site-wide "cyberpunk mode": unlocked by winning the RSS feed's dino
 * game (22 lemons) and cleared by losing a later run while it's on
 * (see assets/feed.xsl), persisted via sessionStorage (so it resets to
 * normal once the tab/browser is closed) and applied on every page load.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'cyberpunk-mode';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%&アイウエオカキクケコサシスセソ';
  var FONT_SIZE = 13;
  var TRAIL_LEN = 18;

  // Occasionally, one column spells out a real phrase instead of noise —
  // a small "there's a message in the rain" easter egg.
  var HIDDEN_MESSAGES = ['WAKE UP', 'I AM U HYUN', 'FOLLOW THE WHITE RABBIT', 'THERE IS NO SPOON'];
  var MESSAGE_CHANCE = 0.0012;
  var TYPE_INTERVAL = 6;

  // "Construct"-style perspective wireframe floor, behind the rain, to
  // sell the virtual-world/skeleton-of-reality feel. Each page family
  // gets its own horizon height, vanishing-point position and pace so
  // it doesn't feel like one static, identical backdrop everywhere.
  var GRID_CONFIGS = {
    home: { horizon: 0.55, vanishX: 0.5, rows: 16, depthSpeed: 0.006, sway: 14 },
    post: { horizon: 0.64, vanishX: 0.5, rows: 10, depthSpeed: 0.0045, sway: 6 },
    category: { horizon: 0.5, vanishX: 0.32, rows: 14, depthSpeed: 0.008, sway: 20 },
    archive: { horizon: 0.5, vanishX: 0.68, rows: 14, depthSpeed: 0.007, sway: 20 },
    about: { horizon: 0.6, vanishX: 0.5, rows: 12, depthSpeed: 0.005, sway: 10 },
    // The RSS win screen's backdrop was already approved as-is — kept
    // pinned to the original untuned values so it doesn't drift when
    // the other page configs get adjusted.
    rss: { horizon: 0.58, vanishX: 0.5, rows: 14, depthSpeed: 0.0025, sway: 0 }
  };
  var PULSE_CHANCE = 0.006;
  var gridDepth = 0;
  var gridConfig = GRID_CONFIGS.home;

  function detectGridConfig() {
    var p = window.location.pathname;
    if (p.indexOf('/feed') === 0) return GRID_CONFIGS.rss;
    if (p.indexOf('/categories') === 0 || p.indexOf('/tags') === 0) return GRID_CONFIGS.category;
    if (p.indexOf('/archives') === 0) return GRID_CONFIGS.archive;
    if (p.indexOf('/about') === 0) return GRID_CONFIGS.about;
    if (p === '/' || p === '/index.html') return GRID_CONFIGS.home;
    return GRID_CONFIGS.post;
  }

  var canvas = null;
  var ctx = null;
  var cols = [];
  var rafId = null;
  var message = null;

  function isActive() {
    try {
      return window.sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  // The horizon is drawn as a skyline of "buildings" sized by real
  // per-category post counts (see window.__blogSkyline, injected by
  // _includes/metadata-hook.html) instead of a flat generic line — the
  // RSS page has no such data, so it falls back to the plain line there.
  var MAX_SKYLINE_BARS = 28;
  var MAX_SKYLINE_BAR_HEIGHT = 110;
  var skylineCounts = (function () {
    var data = window.__blogSkyline && window.__blogSkyline.categories;
    if (!data || !data.length) return null;
    return data
      .map(function (c) { return c.count; })
      .sort(function (a, b) { return b - a; })
      .slice(0, MAX_SKYLINE_BARS);
  })();

  // Bars are laid out across the real main-content column, not the
  // full viewport, so the skyline sits where the blog's actual content
  // sits rather than spanning edge-to-edge underneath the sidebar too.
  var contentBounds = { left: 0, width: window.innerWidth };

  function computeContentBounds() {
    var el = document.getElementById('main-wrapper');
    if (!el) return { left: 0, width: window.innerWidth };
    var r = el.getBoundingClientRect();
    return { left: Math.max(0, r.left), width: Math.min(window.innerWidth, r.width || window.innerWidth) };
  }

  function resize() {
    if (!canvas) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    contentBounds = computeContentBounds();

    var count = Math.ceil(window.innerWidth / FONT_SIZE);
    cols = [];
    for (var i = 0; i < count; i++) {
      var trail = [];
      for (var t = 0; t < TRAIL_LEN; t++) trail.push(CHARS.charAt(Math.floor(Math.random() * CHARS.length)));
      cols.push({
        y: Math.random() * -window.innerHeight,
        speed: 0.12 + Math.random() * 0.28,
        hold: 0,
        trail: trail
      });
    }
    message = null;
  }

  function buildCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'cyberpunk-rain';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.insertBefore(canvas, document.body.firstChild);
    ctx = canvas.getContext('2d');
    gridConfig = detectGridConfig();
    resize();
    window.addEventListener('resize', resize);
  }

  function maybeStartMessage() {
    if (message || !cols.length) return;
    if (Math.random() < MESSAGE_CHANCE) {
      message = {
        col: Math.floor(Math.random() * cols.length),
        text: HIDDEN_MESSAGES[Math.floor(Math.random() * HIDDEN_MESSAGES.length)],
        revealed: 0,
        tick: 0
      };
    }
  }

  function drawHorizon(horizonY, w) {
    ctx.strokeStyle = 'rgba(57, 255, 20, 0.35)';
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(w, horizonY);
    ctx.stroke();

    if (!skylineCounts || !skylineCounts.length) return;

    var maxCount = skylineCounts[0];
    var gap = 4;
    var barW = Math.max(5, (contentBounds.width - gap * (skylineCounts.length - 1)) / skylineCounts.length);

    for (var i = 0; i < skylineCounts.length; i++) {
      var barH = Math.max(4, (skylineCounts[i] / maxCount) * MAX_SKYLINE_BAR_HEIGHT);
      var x = contentBounds.left + i * (barW + gap);
      ctx.fillStyle = 'rgba(57, 255, 20, 0.16)';
      ctx.fillRect(x, horizonY - barH, barW, barH);
      ctx.strokeStyle = 'rgba(150, 255, 180, 0.45)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, horizonY - barH + 0.5, Math.max(0, barW - 1), Math.max(0, barH - 1));
    }
  }

  function drawGrid(w, h) {
    var cfg = gridConfig;
    var horizonY = h * cfg.horizon;
    var sway = Math.sin(Date.now() / 4000) * cfg.sway;
    var vanishX = w * cfg.vanishX + sway;

    ctx.save();
    ctx.lineWidth = 1;

    drawHorizon(horizonY, w);

    ctx.strokeStyle = 'rgba(57, 255, 20, 0.18)';
    var vCount = Math.ceil(w / 70);
    ctx.beginPath();
    for (var i = 0; i <= vCount; i++) {
      var bx = (i / vCount) * (w * 1.4) - w * 0.2;
      ctx.moveTo(vanishX, horizonY);
      ctx.lineTo(bx, h);
    }
    ctx.stroke();

    for (var r = 0; r < cfg.rows; r++) {
      var t = (r / cfg.rows + gridDepth) % 1;
      var y = horizonY + (h - horizonY) * (t * t);
      var pulse = Math.random() < PULSE_CHANCE;

      ctx.strokeStyle = pulse
        ? 'rgba(190, 255, 255, ' + (0.55 + t * 0.4) + ')'
        : 'rgba(57, 255, 20, ' + (0.12 + t * 0.4) + ')';
      ctx.lineWidth = pulse ? 1.8 : 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    ctx.restore();
    gridDepth = (gridDepth + cfg.depthSpeed) % 1;
  }

  function draw() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, w, h);

    drawGrid(w, h);
    maybeStartMessage();

    ctx.font = FONT_SIZE + 'px monospace';
    for (var i = 0; i < cols.length; i++) {
      var col = cols[i];
      var isMessageCol = !!message && message.col === i;

      if (isMessageCol) {
        message.tick++;
        if (message.tick % TYPE_INTERVAL === 0 && message.revealed < message.text.length) {
          message.revealed++;
        }
        ctx.fillStyle = 'rgba(235, 255, 245, 0.95)';
        for (var k = 0; k < message.revealed; k++) {
          var mch = message.text.charAt(message.revealed - 1 - k);
          if (mch !== ' ') ctx.fillText(mch, i * FONT_SIZE, col.y - k * FONT_SIZE);
        }
      } else {
        if (col.hold <= 0) {
          col.trail.unshift(CHARS.charAt(Math.floor(Math.random() * CHARS.length)));
          col.trail.length = TRAIL_LEN;
          col.hold = 2 + Math.floor(Math.random() * 4);
        }
        col.hold--;

        for (var t = 0; t < col.trail.length; t++) {
          var ty = col.y - t * FONT_SIZE;
          if (ty < -FONT_SIZE || ty > h + FONT_SIZE) continue;
          if (t === 0) {
            ctx.fillStyle = 'rgba(210, 255, 225, 0.95)';
          } else {
            ctx.fillStyle = 'rgba(57, 255, 20, ' + (0.85 * (1 - t / col.trail.length)).toFixed(3) + ')';
          }
          ctx.fillText(col.trail[t], i * FONT_SIZE, ty);
        }
      }

      col.y += FONT_SIZE * col.speed;
      if (col.y - col.trail.length * FONT_SIZE > h) {
        col.y = -Math.random() * FONT_SIZE * 5;
        if (isMessageCol) message = null;
      }
    }
  }

  function loop() {
    draw();
    rafId = window.requestAnimationFrame(loop);
  }

  function enable() {
    document.documentElement.classList.add('cyberpunk-mode');
    if (!canvas) buildCanvas();
    canvas.style.display = 'block';

    if (reduceMotion) {
      draw();
    } else if (rafId === null) {
      rafId = window.requestAnimationFrame(loop);
    }
  }

  // One-shot "reality glitching back in" effect for arriving via the RSS
  // game's EXIT link or a red/blue pill pick (?glitch=1) — a brief
  // broken-neon flicker, not the persistent cyberpunk mode (that's only
  // earned by winning the game).
  var GLITCH_DURATION = 1500;
  var GLITCH_BAR_COLORS = ['57, 255, 20', '0, 255, 255', '255, 0, 234'];
  var GLITCH_CHARS = '01アイウエオカキクケコ$#%&';

  function runExitGlitch() {
    document.body.classList.add('exit-glitch');

    var gCanvas = document.createElement('canvas');
    gCanvas.id = 'exit-glitch-overlay';
    gCanvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(gCanvas);

    var gctx = gCanvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth;
    var h = window.innerHeight;
    gCanvas.width = w * dpr;
    gCanvas.height = h * dpr;
    gCanvas.style.width = w + 'px';
    gCanvas.style.height = h + 'px';
    gctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var start = null;

    function cleanup() {
      gCanvas.remove();
      document.body.classList.remove('exit-glitch');
    }

    if (reduceMotion) {
      window.setTimeout(cleanup, 200);
      return;
    }

    function frame(ts) {
      if (start === null) start = ts;
      var elapsed = ts - start;
      var fade = Math.max(0, 1 - elapsed / GLITCH_DURATION);

      gctx.clearRect(0, 0, w, h);

      var bars = 4 + Math.floor(Math.random() * 6);
      for (var i = 0; i < bars; i++) {
        var y = Math.random() * h;
        var bh = 2 + Math.random() * 14;
        var dx = (Math.random() - 0.5) * 46 * fade;
        var color = GLITCH_BAR_COLORS[Math.floor(Math.random() * GLITCH_BAR_COLORS.length)];
        gctx.fillStyle = 'rgba(' + color + ', ' + (0.15 + Math.random() * 0.25) * fade + ')';
        gctx.fillRect(dx, y, w, bh);
      }

      if (Math.random() < 0.5) {
        gctx.font = '11px monospace';
        gctx.fillStyle = 'rgba(57, 255, 20, ' + 0.55 * fade + ')';
        for (var k = 0; k < 6; k++) {
          gctx.fillText(
            GLITCH_CHARS.charAt(Math.floor(Math.random() * GLITCH_CHARS.length)),
            Math.random() * w,
            Math.random() * h
          );
        }
      }

      if (elapsed < GLITCH_DURATION) {
        window.requestAnimationFrame(frame);
      } else {
        cleanup();
      }
    }

    window.requestAnimationFrame(frame);
  }

  function checkExitGlitch() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('glitch') !== '1') return;

      params.delete('glitch');
      var qs = params.toString();
      var cleanUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
      window.history.replaceState(null, '', cleanUrl);

      runExitGlitch();
    } catch (e) {}
  }

  // Popup shown on arrival after picking a pill on the RSS game's win
  // screen (see assets/feed.xsl) — red lands on '/', blue lands on
  // '/about/', each carrying a ?pill= param this page reads once.
  var PILL_MESSAGES = {
    red:
      '저에게 관심을 가져주셔서 감사합니다.<br/>' +
      '진실을 택하신 그대여, 사실 제 블로그와 포트폴리오는 존재하지 않습니다.<br/>' +
      '저에 대해서 아시고 싶으시다면, 현실 세계의 저를 만나세요.',
    blue:
      '매트릭스를 택하신 그대여, 저는 이런 사람입니다.<br/>' +
      '제게 관심을 가져 주셔서 감사합니다.<br/>' +
      '어제도, 오늘도, 내일도 항상 좋은 하루 보내세요.'
  };

  // Contact card revealed by the red pill's "인터뷰하기" button — both
  // values are already public elsewhere on the site (site title / footer
  // author name, _config.yml email), so surfacing them here adds nothing
  // new to scrape.
  var CONTACT_NAME = '0202_hyeon';
  var CONTACT_EMAIL = 'iloveit8110@naver.com';

  function mountPopup(innerHtml) {
    var overlay = document.createElement('div');
    overlay.id = 'pill-popup-overlay';
    overlay.innerHTML = innerHtml;
    document.body.appendChild(overlay);

    function close() {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    overlay.querySelector('.pill-popup-close').addEventListener('click', close);
    document.addEventListener('keydown', onKey);

    return { overlay: overlay, close: close };
  }

  function showContactReveal() {
    mountPopup(
      '<div class="pill-popup pill-popup-red" role="dialog" aria-modal="true">' +
        '<button type="button" class="pill-popup-close" aria-label="닫기">&#215;</button>' +
        '<p class="contact-reveal-name">' + CONTACT_NAME + '</p>' +
        '<p class="contact-reveal-email"><a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a></p>' +
      '</div>'
    );
  }

  function showPillPopup(kind) {
    var interviewBtn = kind === 'red'
      ? '<button type="button" class="pill-popup-interview">인터뷰하기</button>'
      : '';
    var popup = mountPopup(
      '<div class="pill-popup pill-popup-' + kind + '" role="dialog" aria-modal="true">' +
        '<button type="button" class="pill-popup-close" aria-label="닫기">&#215;</button>' +
        '<p>' + PILL_MESSAGES[kind] + '</p>' +
        interviewBtn +
      '</div>'
    );

    if (kind === 'red') {
      popup.overlay.querySelector('.pill-popup-interview').addEventListener('click', function () {
        popup.close();
        runGravityCollapse(showContactReveal);
      });
    }
  }

  // "인터뷰하기" easter egg: every character on the page crumbles and
  // bounces off the floor (Google-Gravity-style), then the contact card
  // appears once everything has settled.
  var GRAVITY_G = 0.6;
  var GRAVITY_BOUNCE = 0.42;
  var GRAVITY_FRICTION = 0.85;
  var GRAVITY_MAX_FRAMES = 300;
  var gravityRunning = false;

  function runGravityCollapse(onDone) {
    if (gravityRunning) return;
    gravityRunning = true;

    if (reduceMotion) {
      gravityRunning = false;
      onDone();
      return;
    }

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var tag = node.parentNode && node.parentNode.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var textNodes = [];
    var n;
    while ((n = walker.nextNode())) textNodes.push(n);

    var spans = [];
    textNodes.forEach(function (textNode) {
      var frag = document.createDocumentFragment();
      textNode.nodeValue.split('').forEach(function (ch) {
        var span = document.createElement('span');
        span.textContent = ch;
        span.style.display = 'inline-block';
        if (ch === ' ') span.style.width = '0.28em';
        frag.appendChild(span);
        spans.push(span);
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });

    window.requestAnimationFrame(function () {
      var particles = spans.map(function (span) {
        var r = span.getBoundingClientRect();
        span.style.position = 'relative';
        span.style.zIndex = '9998';
        span.style.pointerEvents = 'none';
        span.style.willChange = 'transform';
        return {
          el: span,
          origX: r.left,
          origY: r.top,
          x: r.left,
          y: r.top,
          w: r.width || 6,
          h: r.height || 14,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 1) * 2,
          rot: 0,
          vrot: (Math.random() - 0.5) * 14
        };
      });

      var frame = 0;

      function step() {
        var settled = true;
        var floorY = window.innerHeight;

        particles.forEach(function (p) {
          p.vy += GRAVITY_G;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vrot;

          if (p.y + p.h >= floorY) {
            p.y = floorY - p.h;
            p.vy *= -GRAVITY_BOUNCE;
            p.vx *= GRAVITY_FRICTION;
            p.vrot *= GRAVITY_FRICTION;
            if (Math.abs(p.vy) < 1) p.vy = 0;
          }
          if (p.x < 0) {
            p.x = 0;
            p.vx *= -GRAVITY_BOUNCE;
          }
          if (p.x + p.w > window.innerWidth) {
            p.x = window.innerWidth - p.w;
            p.vx *= -GRAVITY_BOUNCE;
          }

          p.el.style.transform =
            'translate(' + (p.x - p.origX) + 'px,' + (p.y - p.origY) + 'px) rotate(' + p.rot + 'deg)';

          if (Math.abs(p.vy) > 0.4 || Math.abs(p.vx) > 0.4) settled = false;
        });

        frame++;
        if (!settled && frame < GRAVITY_MAX_FRAMES) {
          window.requestAnimationFrame(step);
        } else {
          gravityRunning = false;
          onDone();
        }
      }

      window.requestAnimationFrame(step);
    });
  }

  function checkPillPopup() {
    try {
      var params = new URLSearchParams(window.location.search);
      var pill = params.get('pill');
      if (pill !== 'red' && pill !== 'blue') return;

      params.delete('pill');
      var qs = params.toString();
      var cleanUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
      window.history.replaceState(null, '', cleanUrl);

      showPillPopup(pill);
    } catch (e) {}
  }

  function init() {
    if (isActive()) enable();
    checkExitGlitch();
    checkPillPopup();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exposed so other pages (e.g. the RSS feed's win screen) can flip the
  // effect on immediately, without waiting for the next page load to
  // notice the localStorage flag.
  window.CyberpunkMode = { enable: enable };
})();

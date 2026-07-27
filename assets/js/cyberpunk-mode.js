/**
 * Site-wide "cyberpunk mode": unlocked by winning the RSS feed's dino
 * game (22 lemons) and cleared by losing a later run while it's on
 * (see assets/feed.xsl), persisted via sessionStorage so it survives
 * clicking around the site, but resets to normal on a plain refresh or
 * once the tab/browser is closed.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'cyberpunk-mode';
  var RETURN_GLITCH_KEY = 'feed-return-glitch';

  // A plain refresh should drop cyberpunk mode back to normal (only
  // navigating elsewhere on the site keeps it on) — the Navigation Timing
  // API is the only reliable way to tell "reload" apart from "clicked a
  // link here", since both just look like a fresh page load otherwise.
  function resetOnReload() {
    try {
      var nav = window.performance && window.performance.getEntriesByType
        ? window.performance.getEntriesByType('navigation')[0]
        : null;
      if (nav && nav.type === 'reload') {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {}
  }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%&アイウエオカキクケコサシスセソ';
  var FONT_SIZE = 13;
  var TRAIL_LEN = 18;

  // Occasionally, one column spells out a real phrase instead of noise —
  // a small "there's a message in the rain" easter egg.
  var HIDDEN_MESSAGES = ['WAKE UP', 'I AM U HYUN', 'FOLLOW THE WHITE RABBIT', 'THERE IS NO SPOON'];
  var MESSAGE_CHANCE = 0.0012;
  var TYPE_INTERVAL = 6;

  // Radar-ping rings behind the rain, to sell the virtual-world/scanning
  // feel. Each page family gets its own horizon height, ping-origin
  // position and pace so it doesn't feel like one static, identical
  // backdrop everywhere.
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

  // Above the horizon sits a night sky of neon stars sized by real
  // per-category post counts (see window.__blogSkyline, injected by
  // _includes/metadata-hook.html) instead of a flat generic line — the
  // RSS page has no such data, so it falls back to the plain line there.
  var MAX_STARS = 28;
  var MIN_STAR_RADIUS = 1.2;
  var MAX_STAR_RADIUS = 4.2;
  var STAR_FIELD_HEIGHT = 120;
  var starCounts = (function () {
    var data = window.__blogSkyline && window.__blogSkyline.categories;
    if (!data || !data.length) return null;
    return data
      .map(function (c) { return c.count; })
      .sort(function (a, b) { return b - a; })
      .slice(0, MAX_STARS);
  })();

  // Each star's position/twinkle is fixed at load time (not re-rolled
  // every frame) so they hang still in the sky and only pulse in place.
  var starOffsets = (starCounts || []).map(function () {
    return {
      xJitter: (Math.random() - 0.5) * 0.7,
      yFrac: Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8
    };
  });

  // Stars are laid out across the real main-content column, not the
  // full viewport, so the sky sits where the blog's actual content
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

    if (!starCounts || !starCounts.length) return;

    var maxCount = starCounts[0];
    var n = starCounts.length;
    var slotW = contentBounds.width / n;
    var now = Date.now();

    for (var i = 0; i < n; i++) {
      var off = starOffsets[i];
      var radius = MIN_STAR_RADIUS + (starCounts[i] / maxCount) * (MAX_STAR_RADIUS - MIN_STAR_RADIUS);
      var x = contentBounds.left + (i + 0.5) * slotW + off.xJitter * slotW;
      var y = horizonY - 8 - off.yFrac * STAR_FIELD_HEIGHT;
      var twinkle = 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(now / 1000 * off.speed + off.phase));

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180, 255, 210, ' + twinkle.toFixed(3) + ')';
      ctx.fill();

      if (radius > MIN_STAR_RADIUS + (MAX_STAR_RADIUS - MIN_STAR_RADIUS) * 0.5) {
        ctx.beginPath();
        ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(57, 255, 20, ' + (twinkle * 0.12).toFixed(3) + ')';
        ctx.fill();
      }
    }
  }

  // Radar-style ping: concentric rings expand from a point below the
  // horizon and fade out as they grow, looping via gridDepth. Reuses each
  // page's GRID_CONFIGS entry — rows = ring count, depthSpeed = expansion
  // speed, sway/vanishX = the ping origin's drift and base position.
  function drawGrid(w, h) {
    var cfg = gridConfig;
    var horizonY = h * cfg.horizon;
    var sway = Math.sin(Date.now() / 4000) * cfg.sway;
    var originX = w * cfg.vanishX + sway;
    var originY = horizonY + (h - horizonY) * 0.25;
    var maxRadius = Math.max(w, h) * 0.75;

    ctx.save();

    drawHorizon(horizonY, w);

    for (var r = 0; r < cfg.rows; r++) {
      var t = (r / cfg.rows + gridDepth) % 1;
      var radius = t * maxRadius;
      var pulse = Math.random() < PULSE_CHANCE;
      var fade = Math.pow(1 - t, 1.4);

      ctx.strokeStyle = pulse
        ? 'rgba(190, 255, 255, ' + Math.min(1, fade * 0.6 + 0.35).toFixed(3) + ')'
        : 'rgba(57, 255, 20, ' + (fade * 0.55).toFixed(3) + ')';
      ctx.lineWidth = pulse ? 1.8 : 1;
      ctx.beginPath();
      ctx.arc(originX, originY, radius, 0, Math.PI * 2);
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
      if (params.get('glitch') !== '1') return false;

      params.delete('glitch');
      var qs = params.toString();
      var cleanUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
      window.history.replaceState(null, '', cleanUrl);

      runExitGlitch();
      return true;
    } catch (e) {
      return false;
    }
  }

  // Leaving the RSS feed's dino game via its EXIT link/pill choice already
  // carries its own ?glitch=1 (handled above). The browser Back button
  // skips that link entirely, so assets/feed.xsl also drops a one-shot
  // sessionStorage flag on pagehide — this picks that up on whichever page
  // Back lands on, so the glitch still plays either way.
  function checkReturnGlitch() {
    try {
      if (window.sessionStorage.getItem(RETURN_GLITCH_KEY) !== '1') return;
      window.sessionStorage.removeItem(RETURN_GLITCH_KEY);
      runExitGlitch();
    } catch (e) {}
  }

  function checkGlitchOnLoad() {
    var fromQuery = checkExitGlitch();
    if (fromQuery) {
      try { window.sessionStorage.removeItem(RETURN_GLITCH_KEY); } catch (e) {}
      return;
    }
    checkReturnGlitch();
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
        runGravityCollapse(function () {});
      });
    }
  }

  // "인터뷰하기" easter egg: every character, image and icon on the page
  // crumbles and bounces off the floor (Google-Gravity-style).
  var GRAVITY_G = 0.6;
  var GRAVITY_BOUNCE = 0.42;
  var GRAVITY_FRICTION = 0.85;
  var GRAVITY_MAX_FRAMES = 300;
  // Inputs like the site search box only show their text as a `placeholder`
  // attribute, never a real text node, so the walker below would otherwise
  // leave them standing untouched while everything around them falls.
  var ATOM_SELECTOR = 'img, i[class*="fa-"], svg, input[placeholder], textarea[placeholder]';
  var gravityRunning = false;

  // Containers like the résumé terminal window are deliberately
  // overflow:hidden for their normal rounded-corner look, which would
  // otherwise clip their text particles the moment they fall past the
  // box edge instead of dropping to the real floor like the rest of
  // the page.
  function unclipAncestors(el) {
    var node = el;
    while (node && node !== document.body) {
      if (!node.__gravityUnclipped) {
        var cs = window.getComputedStyle(node);
        if (cs.overflow !== 'visible' || cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
          node.style.overflow = 'visible';
        }
        if (cs.clipPath && cs.clipPath !== 'none') node.style.clipPath = 'none';
        if (cs.clip && cs.clip !== 'auto') node.style.clip = 'auto';
        node.__gravityUnclipped = true;
      }
      node = node.parentElement;
    }
  }

  function toParticle(el, vrotSpread) {
    var r = el.getBoundingClientRect();
    el.style.position = 'relative';
    el.style.zIndex = '9998';
    el.style.pointerEvents = 'none';
    el.style.willChange = 'transform';
    return {
      el: el,
      origX: r.left,
      origY: r.top,
      x: r.left,
      y: r.top,
      w: r.width || 6,
      h: r.height || 14,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 1) * 2,
      rot: 0,
      vrot: (Math.random() - 0.5) * vrotSpread
    };
  }

  function runGravityCollapse(onDone) {
    if (gravityRunning) return;
    gravityRunning = true;

    // The ascii-clock widget rewrites its own text every second, which
    // would otherwise instantly undo the per-character split below.
    if (window.AsciiClock && window.AsciiClock.stop) window.AsciiClock.stop();

    if (reduceMotion) {
      gravityRunning = false;
      onDone();
      return;
    }

    // The résumé terminal's blinking cursor is a leftover decoration from
    // the typing effect (no text of its own), so it would otherwise hang
    // frozen in mid-air after the real text around it has fallen away.
    var cursors = document.body.querySelectorAll('.rt-cursor');
    for (var ci = 0; ci < cursors.length; ci++) cursors[ci].remove();

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var tag = node.parentNode && node.parentNode.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        // Screen-reader-only duplicates (e.g. the résumé's sr-only summary)
        // are clipped to 1px via CSS on the very element holding the text,
        // which unclipAncestors() can't undo without also making them
        // suddenly visible — simplest to just leave them out of the fall.
        if (node.parentNode && node.parentNode.closest && node.parentNode.closest('.visually-hidden')) {
          return NodeFilter.FILTER_REJECT;
        }
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
      unclipAncestors(textNode.parentNode);
      textNode.parentNode.replaceChild(frag, textNode);
    });

    // Images and icons fall as single pieces rather than being shredded
    // into characters — icon glyphs are CSS content on the element, not
    // real text nodes, so the walker above never sees them.
    var atomEls = Array.prototype.slice.call(document.body.querySelectorAll(ATOM_SELECTOR)).filter(function (el) {
      var r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    atomEls.forEach(function (el) { unclipAncestors(el); });

    window.requestAnimationFrame(function () {
      var particles = spans.map(function (span) { return toParticle(span, 14); })
        .concat(atomEls.map(function (el) { return toParticle(el, 10); }));

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
    resetOnReload();
    if (isActive()) enable();
    checkGlitchOnLoad();
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

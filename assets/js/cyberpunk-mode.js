/**
 * Site-wide "cyberpunk mode": unlocked by winning the RSS feed's dino
 * game (22 lemons) and cleared by losing a later run while it's on
 * (see assets/feed.xsl), persisted via localStorage and applied on
 * every page load.
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
      return window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function resize() {
    if (!canvas) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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

  function drawGrid(w, h) {
    var cfg = gridConfig;
    var horizonY = h * cfg.horizon;
    var sway = Math.sin(Date.now() / 4000) * cfg.sway;
    var vanishX = w * cfg.vanishX + sway;

    ctx.save();
    ctx.lineWidth = 1;

    ctx.strokeStyle = 'rgba(57, 255, 20, 0.35)';
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(w, horizonY);
    ctx.stroke();

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

  function init() {
    if (isActive()) enable();
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

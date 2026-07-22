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
  var FONT_SIZE = 15;

  // Occasionally, one column spells out a real phrase instead of noise —
  // a small "there's a message in the rain" easter egg.
  var HIDDEN_MESSAGES = ['WAKE UP', 'I AM U HYUN', 'FOLLOW THE WHITE RABBIT', 'THERE IS NO SPOON'];
  var MESSAGE_CHANCE = 0.0012;
  var TYPE_INTERVAL = 6;

  // "Construct"-style perspective wireframe floor, behind the rain, to
  // sell the virtual-world/skeleton-of-reality feel.
  var GRID_ROWS = 14;
  var GRID_DEPTH_SPEED = 0.0025;
  var gridDepth = 0;

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
      cols.push({
        y: Math.random() * -window.innerHeight,
        speed: 0.12 + Math.random() * 0.28,
        hold: 0
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
    var horizonY = h * 0.58;
    var vanishX = w / 2;

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

    for (var r = 0; r < GRID_ROWS; r++) {
      var t = (r / GRID_ROWS + gridDepth) % 1;
      var y = horizonY + (h - horizonY) * (t * t);
      ctx.strokeStyle = 'rgba(57, 255, 20, ' + (0.12 + t * 0.4) + ')';
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    ctx.restore();
    gridDepth = (gridDepth + GRID_DEPTH_SPEED) % 1;
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
          col.ch = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
          col.hold = 2 + Math.floor(Math.random() * 4);
        }
        col.hold--;

        ctx.fillStyle = 'rgba(57, 255, 20, 0.85)';
        ctx.fillText(col.ch, i * FONT_SIZE, col.y);
      }

      col.y += FONT_SIZE * col.speed;
      if (col.y > h && Math.random() > 0.985) {
        col.y = Math.random() * -200;
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

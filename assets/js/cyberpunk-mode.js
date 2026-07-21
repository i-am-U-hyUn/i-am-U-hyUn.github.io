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

  var canvas = null;
  var ctx = null;
  var cols = [];
  var rafId = null;

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
    for (var i = 0; i < count; i++) cols.push(Math.random() * -window.innerHeight);
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

  function draw() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
    ctx.fillRect(0, 0, w, h);

    ctx.font = FONT_SIZE + 'px monospace';
    for (var i = 0; i < cols.length; i++) {
      var ch = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
      ctx.fillStyle = 'rgba(57, 255, 20, 0.85)';
      ctx.fillText(ch, i * FONT_SIZE, cols[i]);

      cols[i] += FONT_SIZE * 0.55;
      if (cols[i] > h && Math.random() > 0.975) cols[i] = Math.random() * -100;
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
})();

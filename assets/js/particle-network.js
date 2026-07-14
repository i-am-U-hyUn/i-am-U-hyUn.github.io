/**
 * Ambient particle/node network background.
 * Renders behind all page content (z-index: -1) and reacts to the pointer.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.createElement('canvas');
  canvas.id = 'particle-network';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  canvas.style.display = 'block';

  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var width = 0;
  var height = 0;
  var particles = [];
  var pointer = { x: -9999, y: -9999, active: false };
  var rafId = null;

  var LINK_DISTANCE = 130;
  var POINTER_RADIUS = 160;
  var COLORS = ['94, 234, 212', '167, 139, 250'];

  // Big Dipper (북두칠성) asterism, positioned within a fixed box so the
  // shape stays recognizable at any viewport size. Coordinates are relative
  // (0-1) within that box; radii loosely follow real apparent magnitude
  // (Megrez is the dimmest of the seven).
  var BIG_DIPPER = [
    { x: 0.02, y: 0.55, r: 2.4 }, // Dubhe
    { x: 0.06, y: 0.85, r: 2.1 }, // Merak
    { x: 0.34, y: 0.92, r: 2.0 }, // Phecda
    { x: 0.38, y: 0.58, r: 1.5 }, // Megrez
    { x: 0.62, y: 0.42, r: 2.4 }, // Alioth
    { x: 0.84, y: 0.18, r: 2.1 }, // Mizar
    { x: 1.0, y: 0.0, r: 2.3 }  // Alkaid
  ];
  var DIPPER_LINKS = [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]];
  var dipperStars = [];

  function particleCount() {
    var area = width * height;
    var count = Math.round(area / 22000);
    return Math.max(24, Math.min(count, 110));
  }

  function makeParticle() {
    var speed = 0.15 + Math.random() * 0.25;
    var angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1 + Math.random() * 1.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var target = particleCount();
    if (particles.length > target) {
      particles.length = target;
    } else {
      while (particles.length < target) {
        particles.push(makeParticle());
      }
    }

    resizeDipper();
  }

  function resizeDipper() {
    var boxX = width * 0.06;
    var boxY = height * 0.06;
    var boxW = width * 0.6;
    var boxH = height * 0.3;

    dipperStars = BIG_DIPPER.map(function (star, i) {
      return {
        x: boxX + star.x * boxW,
        y: boxY + star.y * boxH,
        r: star.r,
        phase: i * 0.8
      };
    });
  }

  function step() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      if (pointer.active) {
        var dx = p.x - pointer.x;
        var dy = p.y - pointer.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < POINTER_RADIUS && dist > 0.01) {
          var force = (POINTER_RADIUS - dist) / POINTER_RADIUS * 0.03;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.vx *= 0.985;
      p.vy *= 0.985;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > width) { p.x = width; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > height) { p.y = height; p.vy *= -1; }
    }
  }

  function drawDipper(time) {
    if (!dipperStars.length) return;

    ctx.strokeStyle = 'rgba(210, 226, 255, 0.32)';
    ctx.lineWidth = 1;
    for (var l = 0; l < DIPPER_LINKS.length; l++) {
      var a = dipperStars[DIPPER_LINKS[l][0]];
      var b = dipperStars[DIPPER_LINKS[l][1]];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    for (var i = 0; i < dipperStars.length; i++) {
      var s = dipperStars[i];
      var twinkle = reduceMotion ? 1 : 0.72 + 0.28 * Math.sin(time / 900 + s.phase);

      var glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
      glow.addColorStop(0, 'rgba(255, 255, 255, ' + (0.55 * twinkle) + ')');
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, ' + twinkle + ')';
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    drawDipper(time || 0);

    for (var i = 0; i < particles.length; i++) {
      var a = particles[i];
      for (var j = i + 1; j < particles.length; j++) {
        var b = particles[j];
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DISTANCE) {
          var alpha = (1 - dist / LINK_DISTANCE) * 0.18;
          ctx.strokeStyle = 'rgba(150, 190, 220, ' + alpha + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (pointer.active) {
        var pdx = a.x - pointer.x;
        var pdy = a.y - pointer.y;
        var pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < POINTER_RADIUS) {
          var palpha = (1 - pdist / POINTER_RADIUS) * 0.35;
          ctx.strokeStyle = 'rgba(94, 234, 212, ' + palpha + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
    }

    for (var k = 0; k < particles.length; k++) {
      var p = particles[k];
      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + p.color + ', 0.75)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame(time) {
    step();
    draw(time);
    rafId = window.requestAnimationFrame(frame);
  }

  function start() {
    if (rafId === null) {
      rafId = window.requestAnimationFrame(frame);
    }
  }

  function stop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  window.addEventListener('pointermove', function (e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  }, { passive: true });

  window.addEventListener('pointerleave', function () {
    pointer.active = false;
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stop();
    } else if (!reduceMotion) {
      start();
    }
  });

  resize();

  if (reduceMotion) {
    draw();
  } else {
    start();
  }
})();

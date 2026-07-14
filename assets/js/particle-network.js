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

  function draw() {
    ctx.clearRect(0, 0, width, height);

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

  function frame() {
    step();
    draw();
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

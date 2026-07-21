/**
 * Site cover: a solar-system map of the site's main sections (mirrors
 * the sidebar tabs). Shows automatically once on a visitor's first
 * landing on the home page, and can be reopened any time via the
 * floating trigger button.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STORAGE_KEY = 'site-cover-seen-v1';

  var PLANETS = [
    {
      href: '/',
      icon: 'fas fa-home',
      title: 'HOME',
      desc: '블로그 · 이력서',
      key: '1',
      radius: 17,
      duration: 22,
      size: 62
    },
    {
      href: '/categories/',
      icon: 'fas fa-stream',
      title: 'CATEGORIES',
      desc: '주제별 글 모음',
      key: '2',
      radius: 26,
      duration: 30,
      size: 52
    },
    {
      href: '/tags/',
      icon: 'fas fa-tags',
      title: 'TAGS',
      desc: '태그로 찾기',
      key: '3',
      radius: 34,
      duration: 38,
      size: 48
    },
    {
      href: '/archives/',
      icon: 'fas fa-archive',
      title: 'ARCHIVES',
      desc: '연도별 전체 글',
      key: '4',
      radius: 41,
      duration: 46,
      size: 48
    },
    {
      href: '/about/',
      icon: 'fas fa-info-circle',
      title: 'ABOUT',
      desc: '소개',
      key: '5',
      radius: 47,
      duration: 54,
      size: 46
    }
  ];

  function hasSeenCover() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return true;
    }
  }

  function markCoverSeen() {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {}
  }

  function buildMenu() {
    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = 'site-menu-trigger';
    trigger.className = 'site-menu-trigger';
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'site-menu-overlay');
    trigger.setAttribute('aria-label', 'Menu 열기');
    trigger.innerHTML =
      '<i class="fas fa-meteor fa-fw" aria-hidden="true"></i>' +
      '<span>Menu</span>';

    var overlay = document.createElement('div');
    overlay.id = 'site-menu-overlay';
    overlay.className = 'site-menu-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var planetsHtml = PLANETS.map(function (p, i) {
      var angle = Math.round((360 / PLANETS.length) * i);
      return (
        '<div class="site-menu-orbit" style="--orbit-radius:' + p.radius + '%;--orbit-duration:' + p.duration + 's;--orbit-angle:' + angle + 'deg">' +
          '<span class="site-menu-orbit-ring" aria-hidden="true"></span>' +
          '<div class="site-menu-orbit-spin">' +
            '<a href="' + p.href + '" class="site-menu-planet" data-key="' + p.key + '" ' +
              'style="--planet-size:' + p.size + 'px" aria-label="' + p.title + ' — ' + p.desc + '">' +
              '<i class="' + p.icon + ' fa-fw" aria-hidden="true"></i>' +
              '<span class="site-menu-planet-label">' +
                '<span class="site-menu-planet-title">' + p.title + '</span>' +
                '<span class="site-menu-planet-desc">' + p.desc + '</span>' +
              '</span>' +
            '</a>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    overlay.innerHTML =
      '<canvas class="site-menu-galaxy" aria-hidden="true"></canvas>' +
      '<button type="button" class="site-menu-close" aria-label="닫기">' +
        '<i class="fas fa-times" aria-hidden="true"></i>' +
      '</button>' +
      '<div class="site-menu-header">' +
        '<h2 class="site-menu-heading">Welcome To My Portfolio &amp; Blog</h2>' +
        '<p class="site-menu-eyebrow">Hi, I\'m New Ya, but my name is Yuya.<br>I-am-U-hyUn, but my name is Yuhyeon.</p>' +
      '</div>' +
      '<div class="site-menu-solar" role="navigation" aria-label="사이트 지도">' +
        '<div class="site-menu-sun" aria-hidden="true"></div>' +
        planetsHtml +
      '</div>' +
      '<p class="site-menu-hint">숫자키 1–5 또는 ESC</p>';

    var profileWrapper = document.querySelector('#sidebar .profile-wrapper');
    if (profileWrapper) {
      profileWrapper.appendChild(trigger);
    } else {
      document.body.appendChild(trigger);
    }
    document.body.appendChild(overlay);

    return { trigger: trigger, overlay: overlay };
  }

  function initGalaxy(overlay) {
    var canvas = overlay.querySelector('.site-menu-galaxy');
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = 0;
    var height = 0;
    var stars = [];
    var nebulae = [];
    var trail = [];
    var rafId = null;
    var resizeTimer = null;
    var pointer = { x: -9999, y: -9999, active: false };

    var SPACE_STAR_COLORS = ['255, 255, 255', '94, 234, 212', '167, 139, 250'];
    var NEON_STAR_COLORS = ['255, 255, 255', '57, 255, 20', '0, 255, 255', '255, 0, 234'];
    var POINTER_RADIUS = 150;
    var MAX_TRAIL = 80;

    function isCyberpunk() {
      return document.documentElement.classList.contains('cyberpunk-mode');
    }

    function palette() {
      return isCyberpunk() ? NEON_STAR_COLORS : SPACE_STAR_COLORS;
    }

    function spawnTrail(x, y) {
      var colors = palette();
      trail.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 2.4 + Math.random() * 2.8,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
      if (trail.length > MAX_TRAIL) trail.shift();
    }

    function starCount() {
      var area = width * height;
      var count = Math.round(area / 1800);
      return Math.max(220, Math.min(count, 560));
    }

    function pickColor() {
      var colors = palette();
      var roll = Math.random();
      if (roll < 0.6) return colors[0];
      if (colors.length > 3) {
        return colors[1 + Math.floor(Math.random() * (colors.length - 1))];
      }
      return roll < 0.8 ? colors[1] : colors[2];
    }

    function makeStar(i) {
      var glow = i % 14 === 0; // a sparse subset of brighter "hero" stars
      var driftAngle = Math.random() * Math.PI * 2;
      var driftSpeed = 0.03 + Math.random() * 0.05;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(driftAngle) * driftSpeed,
        vy: Math.sin(driftAngle) * driftSpeed,
        r: glow ? 1.6 + Math.random() * 1.6 : 0.5 + Math.random() * 1.3,
        baseAlpha: glow ? 0.85 + Math.random() * 0.15 : 0.55 + Math.random() * 0.4,
        speed: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        glow: glow,
        color: pickColor()
      };
    }

    function resize() {
      var rect = overlay.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = [];
      var target = starCount();
      for (var i = 0; i < target; i++) stars.push(makeStar(i));

      var span = Math.max(width, height);
      var neon = isCyberpunk();
      var nebA = neon ? '255, 0, 234' : '167, 139, 250';
      var nebB = neon ? '57, 255, 20' : '94, 234, 212';
      nebulae = [
        { x: width * 0.18, y: height * 0.25, r: span * 0.5, color: nebA, base: 0.36 },
        { x: width * 0.82, y: height * 0.7, r: span * 0.55, color: nebB, base: 0.32 },
        { x: width * 0.6, y: height * 0.85, r: span * 0.4, color: nebA, base: 0.22 },
        { x: width * 0.4, y: height * 0.1, r: span * 0.35, color: nebB, base: 0.2 }
      ];
    }

    function step() {
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];

        if (pointer.active) {
          var dx = s.x - pointer.x;
          var dy = s.y - pointer.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < POINTER_RADIUS && dist > 0.01) {
            var force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 0.05;
            s.vx += (dx / dist) * force;
            s.vy += (dy / dist) * force;
          }
        }

        s.vx *= 0.97;
        s.vy *= 0.97;
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) { s.x = 0; s.vx *= -1; }
        if (s.x > width) { s.x = width; s.vx *= -1; }
        if (s.y < 0) { s.y = 0; s.vy *= -1; }
        if (s.y > height) { s.y = height; s.vy *= -1; }
      }

      for (var t = trail.length - 1; t >= 0; t--) {
        var p = trail[t];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.028;
        if (p.life <= 0) trail.splice(t, 1);
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      var bg = ctx.createRadialGradient(
        width / 2, height * 0.4, 0,
        width / 2, height * 0.4, Math.max(width, height) * 0.75
      );
      bg.addColorStop(0, 'rgb(38, 32, 64)');
      bg.addColorStop(0.55, 'rgb(16, 14, 30)');
      bg.addColorStop(1, 'rgb(5, 5, 11)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (var n = 0; n < nebulae.length; n++) {
        var neb = nebulae[n];
        var pulse = reduceMotion ? 1 : 0.75 + 0.25 * Math.sin(time / 4200 + n * 2);
        var grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.r);
        grad.addColorStop(0, 'rgba(' + neb.color + ', ' + (neb.base * pulse) + ')');
        grad.addColorStop(1, 'rgba(' + neb.color + ', 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var twinkle = reduceMotion
          ? s.baseAlpha
          : s.baseAlpha * (0.6 + 0.4 * Math.sin((time / 1000) * s.speed + s.phase));

        if (pointer.active) {
          var pdx = s.x - pointer.x;
          var pdy = s.y - pointer.y;
          var pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pdist < POINTER_RADIUS) {
            twinkle = Math.min(1, twinkle + (1 - pdist / POINTER_RADIUS) * 0.6);
          }
        }

        if (s.glow) {
          var halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
          halo.addColorStop(0, 'rgba(' + s.color + ', ' + twinkle * 0.5 + ')');
          halo.addColorStop(1, 'rgba(' + s.color + ', 0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + s.color + ', ' + twinkle + ')';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (var ti = 0; ti < trail.length; ti++) {
        var p = trail[ti];
        var alpha = Math.max(0, p.life);

        var glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5);
        glow.addColorStop(0, 'rgba(' + p.color + ', ' + alpha * 0.55 + ')');
        glow.addColorStop(1, 'rgba(' + p.color + ', 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
        ctx.arc(p.x, p.y, p.r * alpha * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(time) {
      step();
      draw(time);
      rafId = window.requestAnimationFrame(frame);
    }

    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    }

    function onPointerMove(e) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;

      spawnTrail(pointer.x, pointer.y);
      if (Math.random() < 0.5) spawnTrail(pointer.x, pointer.y);
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function start() {
      resize();
      window.addEventListener('resize', onResize);
      if (reduceMotion) {
        draw(0);
      } else {
        overlay.addEventListener('pointermove', onPointerMove);
        overlay.addEventListener('pointerleave', onPointerLeave);
        if (rafId === null) rafId = window.requestAnimationFrame(frame);
      }
    }

    function stop() {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      window.removeEventListener('resize', onResize);
      overlay.removeEventListener('pointermove', onPointerMove);
      overlay.removeEventListener('pointerleave', onPointerLeave);
      pointer.active = false;
      trail = [];
    }

    return { start: start, stop: stop };
  }

  function initMenu(trigger, overlay) {
    var closeBtn = overlay.querySelector('.site-menu-close');
    var galaxy = initGalaxy(overlay);
    var lastFocused = null;

    function openMenu() {
      lastFocused = document.activeElement;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      trigger.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('site-menu-locked');
      galaxy.start();
      window.setTimeout(
        function () {
          closeBtn.focus();
        },
        reduceMotion ? 0 : 200
      );
    }

    function closeMenu() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      trigger.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('site-menu-locked');
      galaxy.stop();
      if (lastFocused && lastFocused.focus && lastFocused !== document.body) {
        lastFocused.focus();
      }
    }

    trigger.addEventListener('click', function () {
      if (overlay.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    closeBtn.addEventListener('click', closeMenu);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeMenu();
    });

    overlay.querySelectorAll('.site-menu-planet').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        closeMenu();
        return;
      }

      var tag = e.target && e.target.tagName;
      if (tag && /input|textarea/i.test(tag)) return;

      var match = overlay.querySelector('.site-menu-planet[data-key="' + e.key + '"]');
      if (match) match.click();
    });

    return { open: openMenu, close: closeMenu };
  }

  function init() {
    var built = buildMenu();
    var controls = initMenu(built.trigger, built.overlay);

    var onHomeTop = window.location.pathname === '/' && !window.location.hash;
    if (onHomeTop && !hasSeenCover()) {
      markCoverSeen();
      window.setTimeout(controls.open, reduceMotion ? 0 : 400);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

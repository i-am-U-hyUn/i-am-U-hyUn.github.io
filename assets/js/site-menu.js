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
    trigger.setAttribute('aria-label', '사이트 지도 열기');
    trigger.innerHTML =
      '<span class="site-menu-trigger-bar"></span>' +
      '<span class="site-menu-trigger-bar"></span>' +
      '<span class="site-menu-trigger-bar"></span>';

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
        '<p class="site-menu-eyebrow">Yuhyeon\'s Daily Log</p>' +
        '<h2 class="site-menu-heading">둘러보고 싶은 곳을 선택하세요</h2>' +
      '</div>' +
      '<div class="site-menu-solar" role="navigation" aria-label="사이트 지도">' +
        '<div class="site-menu-sun" aria-hidden="true"></div>' +
        planetsHtml +
      '</div>' +
      '<p class="site-menu-hint">숫자키 1–5 또는 ESC</p>';

    document.body.appendChild(trigger);
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
    var rafId = null;
    var resizeTimer = null;

    var STAR_COLORS = ['255, 255, 255', '94, 234, 212', '167, 139, 250'];

    function starCount() {
      var area = width * height;
      var count = Math.round(area / 2600);
      return Math.max(160, Math.min(count, 420));
    }

    function pickColor() {
      var roll = Math.random();
      if (roll < 0.72) return STAR_COLORS[0];
      return roll < 0.86 ? STAR_COLORS[1] : STAR_COLORS[2];
    }

    function makeStar() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.4 + Math.random() * 1.4,
        baseAlpha: 0.35 + Math.random() * 0.55,
        speed: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
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
      while (stars.length < target) stars.push(makeStar());

      var span = Math.max(width, height);
      nebulae = [
        { x: width * 0.22, y: height * 0.28, r: span * 0.42, color: '167, 139, 250', base: 0.11 },
        { x: width * 0.8, y: height * 0.72, r: span * 0.46, color: '94, 234, 212', base: 0.1 },
        { x: width * 0.55, y: height * 0.12, r: span * 0.3, color: '94, 234, 212', base: 0.06 }
      ];
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      var bg = ctx.createRadialGradient(
        width / 2, height * 0.4, 0,
        width / 2, height * 0.4, Math.max(width, height) * 0.75
      );
      bg.addColorStop(0, 'rgb(20, 18, 34)');
      bg.addColorStop(1, 'rgb(4, 5, 9)');
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
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + s.color + ', ' + twinkle + ')';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(time) {
      draw(time);
      rafId = window.requestAnimationFrame(frame);
    }

    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    }

    function start() {
      resize();
      window.addEventListener('resize', onResize);
      if (reduceMotion) {
        draw(0);
      } else if (rafId === null) {
        rafId = window.requestAnimationFrame(frame);
      }
    }

    function stop() {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      window.removeEventListener('resize', onResize);
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

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

  function initMenu(trigger, overlay) {
    var closeBtn = overlay.querySelector('.site-menu-close');
    var lastFocused = null;

    function openMenu() {
      lastFocused = document.activeElement;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      trigger.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('site-menu-locked');
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

/**
 * Site-wide menu: a floating trigger button that opens a fullscreen
 * overlay with large nav links (blog / résumé). Links carry a cursor
 * -following glow, and the destination section pulses once reached.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var LINKS = [
    { href: '/#post-list', index: '01', title: '블로그 글', desc: '공부, 자격증, 일상 기록', key: '1' },
    { href: '/#resume-interactive', index: '02', title: '이력서 · 포트폴리오', desc: '경력, 프로젝트, 기술 스택', key: '2' }
  ];

  function buildMenu() {
    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = 'site-menu-trigger';
    trigger.className = 'site-menu-trigger';
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'site-menu-overlay');
    trigger.setAttribute('aria-label', '메뉴 열기');
    trigger.innerHTML =
      '<span class="site-menu-trigger-bar"></span>' +
      '<span class="site-menu-trigger-bar"></span>' +
      '<span class="site-menu-trigger-bar"></span>';

    var overlay = document.createElement('div');
    overlay.id = 'site-menu-overlay';
    overlay.className = 'site-menu-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var linksHtml = LINKS.map(function (link, i) {
      return (
        '<a href="' + link.href + '" class="site-menu-link" data-key="' + link.key + '" ' +
          'style="transition-delay:' + (reduceMotion ? 0 : i * 70) + 'ms">' +
          '<span class="site-menu-link-glow" aria-hidden="true"></span>' +
          '<span class="site-menu-link-index">' + link.index + '</span>' +
          '<span class="site-menu-link-body">' +
            '<span class="site-menu-link-text">' + link.title + '</span>' +
            '<span class="site-menu-link-desc">' + link.desc + '</span>' +
          '</span>' +
        '</a>'
      );
    }).join('');

    overlay.innerHTML =
      '<button type="button" class="site-menu-close" aria-label="메뉴 닫기">' +
        '<i class="fas fa-times" aria-hidden="true"></i>' +
      '</button>' +
      '<nav class="site-menu-nav" aria-label="주요 메뉴">' + linksHtml + '</nav>' +
      '<p class="site-menu-hint">숫자키 1 / 2 또는 ESC</p>';

    document.body.appendChild(trigger);
    document.body.appendChild(overlay);

    return { trigger: trigger, overlay: overlay };
  }

  function initGlow(overlay) {
    if (reduceMotion) return;

    var links = overlay.querySelectorAll('.site-menu-link');
    links.forEach(function (link) {
      link.addEventListener('pointermove', function (e) {
        var rect = link.getBoundingClientRect();
        link.style.setProperty('--mx', e.clientX - rect.left + 'px');
        link.style.setProperty('--my', e.clientY - rect.top + 'px');
      });
    });
  }

  function pulseTarget(id) {
    var target = document.getElementById(id);
    if (!target || reduceMotion) return;

    target.classList.remove('scroll-target-pulse');
    void target.offsetWidth; // restart the animation if triggered again
    target.classList.add('scroll-target-pulse');

    window.setTimeout(function () {
      target.classList.remove('scroll-target-pulse');
    }, 1200);
  }

  function initHashArrivalPulse() {
    var id = (window.location.hash || '').slice(1);
    if (id === 'post-list' || id === 'resume-interactive') {
      window.setTimeout(function () {
        pulseTarget(id);
      }, 300);
    }
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
      if (lastFocused && lastFocused.focus) lastFocused.focus();
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

    overlay.querySelectorAll('.site-menu-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        var samePageAnchor = href.indexOf('/#') === 0 && window.location.pathname === '/';
        closeMenu();

        if (samePageAnchor) {
          e.preventDefault();
          var id = href.slice(2);
          var target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
            window.setTimeout(
              function () {
                pulseTarget(id);
              },
              reduceMotion ? 0 : 450
            );
          }
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        closeMenu();
        return;
      }

      var tag = e.target && e.target.tagName;
      if (tag && /input|textarea/i.test(tag)) return;

      var match = overlay.querySelector('.site-menu-link[data-key="' + e.key + '"]');
      if (match) match.click();
    });
  }

  function init() {
    var built = buildMenu();
    initGlow(built.overlay);
    initMenu(built.trigger, built.overlay);
    initHashArrivalPulse();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

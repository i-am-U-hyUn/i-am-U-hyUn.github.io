/**
 * Interactive résumé section on the home page:
 * - terminal-style typing intro
 * - scroll-revealed career timeline with a growing progress line
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeLines(el, lines, opts) {
    var speed = (opts && opts.speed) || 22;
    var lineDelay = (opts && opts.lineDelay) || 350;
    var cursor = document.createElement('span');
    cursor.className = 'rt-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    if (reduceMotion) {
      lines.forEach(function (line) {
        var div = document.createElement('div');
        div.className = 'resume-terminal-line ' + (line.className || '');
        div.textContent = line.text;
        el.appendChild(div);
      });
      el.appendChild(cursor);
      if (opts && opts.onDone) opts.onDone();
      return;
    }

    var i = 0;
    var j = 0;

    function step() {
      if (i >= lines.length) {
        if (opts && opts.onDone) opts.onDone();
        return;
      }

      var line = lines[i];
      var div = el.querySelector('[data-line="' + i + '"]');
      if (!div) {
        div = document.createElement('div');
        div.className = 'resume-terminal-line ' + (line.className || '');
        div.setAttribute('data-line', String(i));
        el.appendChild(div);
      }

      if (j <= line.text.length) {
        div.textContent = line.text.slice(0, j);
        div.appendChild(cursor);
        j += 1;
        window.setTimeout(step, speed);
      } else {
        i += 1;
        j = 0;
        window.setTimeout(step, lineDelay);
      }
    }

    step();
  }

  function initTerminal() {
    var dataEl = document.getElementById('resume-terminal-data');
    var body = document.getElementById('resume-terminal-body');
    var links = document.getElementById('resume-terminal-links');
    if (!dataEl || !body) return;

    var data;
    try {
      data = JSON.parse(dataEl.textContent);
    } catch (e) {
      return;
    }

    var lines = [
      { text: '$ whoami', className: 'prompt' },
      { text: data.name + ' — ' + data.title, className: 'output' },
      { text: '$ cat about.md', className: 'prompt' },
      { text: (data.summary || '').replace(/\s+/g, ' ').trim(), className: 'output' }
    ];

    typeLines(body, lines, {
      onDone: function () {
        if (links) {
          links.classList.remove('pending');
        }
      }
    });
  }

  function initTimeline() {
    var container = document.getElementById('rt-line-container');
    var fill = container && container.querySelector('.rt-track-fill');
    var nodes = document.querySelectorAll('.rt-node');
    if (!container || !nodes.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) {
        n.classList.add('is-visible');
      });
      if (fill) fill.style.height = '100%';
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }
    );

    nodes.forEach(function (n) {
      io.observe(n);
    });

    if (fill) {
      var ticking = false;

      var updateFill = function () {
        var rect = container.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        var start = vh * 0.85;
        var progressPx = start - rect.top;
        var ratio = Math.min(1, Math.max(0, rect.height ? progressPx / rect.height : 0));
        fill.style.height = ratio * 100 + '%';
        ticking = false;
      };

      window.addEventListener(
        'scroll',
        function () {
          if (!ticking) {
            window.requestAnimationFrame(updateFill);
            ticking = true;
          }
        },
        { passive: true }
      );
      window.addEventListener('resize', updateFill);
      updateFill();
    }
  }

  function initProjects() {
    var cards = document.querySelectorAll('.rt-project-card');
    if (!cards.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      cards.forEach(function (c) {
        c.classList.add('is-visible');
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    cards.forEach(function (c) {
      io.observe(c);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTerminal();
    initTimeline();
    initProjects();
  });
})();

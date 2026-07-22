/**
 * Small ASCII-style live clock + monthly calendar. Mounts below the
 * right-hand panel's "Trending Tags" section when that panel is laid
 * out (xl+ viewports), otherwise falls back to the top of the sidebar
 * nav menu (below the profile header) so it stays clear of the social
 * icon row at the very bottom of the sidebar on narrower windows.
 */
(function () {
  'use strict';

  var WEEKDAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];
  var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function padDay(n) {
    return (n < 10 ? ' ' : '') + n;
  }

  function buildCalendarHtml(now) {
    var year = now.getFullYear();
    var month = now.getMonth();
    var today = now.getDate();
    var firstDow = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    var lines = [MONTH_NAMES[month] + ' ' + year, 'Su Mo Tu We Th Fr Sa'];

    var cells = [];
    for (var i = 0; i < firstDow; i++) cells.push('  ');
    for (var d = 1; d <= daysInMonth; d++) {
      cells.push(d === today ? '<span class="ascii-cal-today">' + padDay(d) + '</span>' : padDay(d));
    }
    while (cells.length % 7 !== 0) cells.push('  ');

    for (var row = 0; row < cells.length; row += 7) {
      lines.push(cells.slice(row, row + 7).join(' '));
    }

    return lines.join('\n');
  }

  function isVisible(el) {
    if (!el) return false;
    return el.offsetParent !== null && window.getComputedStyle(el).display !== 'none';
  }

  function mount(widget) {
    var panelAccess = document.querySelector('#panel-wrapper .access');
    var panel = document.getElementById('panel-wrapper');
    var target = panelAccess || panel;

    // The right-hand panel is only laid out on wide (xl+) viewports; on
    // anything narrower it's hidden, so fall back to the sidebar instead
    // of mounting somewhere invisible.
    if (target && isVisible(target)) {
      if (widget.parentNode !== target) target.appendChild(widget);
      return;
    }

    var sidebar = document.getElementById('sidebar');
    var sidebarNav = sidebar && sidebar.querySelector(':scope > nav');
    if (sidebar && sidebarNav) {
      if (widget.parentNode !== sidebar || widget.nextSibling !== sidebarNav) {
        sidebar.insertBefore(widget, sidebarNav);
      }
      return;
    }

    if (sidebar && widget.parentNode !== sidebar) sidebar.appendChild(widget);
  }

  function build() {
    var widget = document.createElement('div');
    widget.className = 'ascii-clock';
    widget.setAttribute('aria-label', '현재 시간 및 달력');
    widget.innerHTML =
      '<div class="ascii-clock-prompt">$ date &amp;&amp; cal</div>' +
      '<div class="ascii-clock-time" id="ascii-clock-time"></div>' +
      '<div class="ascii-clock-date" id="ascii-clock-date"></div>' +
      '<pre class="ascii-cal" id="ascii-cal" aria-hidden="true"></pre>';

    mount(widget);

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        mount(widget);
      }, 150);
    });

    return widget;
  }

  function tick(widget) {
    var now = new Date();
    var timeEl = widget.querySelector('#ascii-clock-time');
    var dateEl = widget.querySelector('#ascii-clock-date');
    var calEl = widget.querySelector('#ascii-cal');

    timeEl.textContent = pad2(now.getHours()) + ':' + pad2(now.getMinutes()) + ':' + pad2(now.getSeconds());
    dateEl.textContent =
      now.getFullYear() + '-' + pad2(now.getMonth() + 1) + '-' + pad2(now.getDate()) +
      ' (' + WEEKDAYS_KO[now.getDay()] + ')';
    calEl.innerHTML = buildCalendarHtml(now);
  }

  function init() {
    var widget = build();
    tick(widget);
    window.setInterval(function () {
      tick(widget);
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

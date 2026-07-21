/**
 * Landing purpose-select gate on the home page:
 * - clicking (or pressing 1 / 2) jumps to the matching section
 * - briefly pulses the arrived-at section so the jump is obvious
 */
(function () {
  'use strict';

  var choices = document.querySelectorAll('.landing-choice');
  if (!choices.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  choices.forEach(function (choice) {
    choice.addEventListener('click', function () {
      var id = choice.getAttribute('href').slice(1);
      window.setTimeout(function () {
        pulseTarget(id);
      }, reduceMotion ? 0 : 450);
    });
  });

  document.addEventListener('keydown', function (e) {
    var tag = e.target && e.target.tagName;
    if (tag && /input|textarea/i.test(tag)) return;

    var match = document.querySelector('.landing-choice[data-key="' + e.key + '"]');
    if (match) match.click();
  });
})();

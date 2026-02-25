(function () {
  "use strict";

  function initTransition(container) {
    var els = [
      ".kanvas-ingress-gateway",
      ".kanvas-kubernetes",
      ".kanvas-pod",
      ".kanvas-prometheus",
      ".kanvas-supporting-arrows",
    ].map(function (s) { return container.querySelector(s); }).filter(Boolean);

    var active = false;
    new IntersectionObserver(function (entries) {
      var hit = entries[0].isIntersecting;
      if (hit === active) return;
      active = hit;
      els.forEach(function (el) { el.classList.toggle("in-view", hit); });
    }, { threshold: 0.7 }).observe(container);
  }

  window.initKanvasTransition = initTransition;

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll(".kanvas-transition-container").forEach(initTransition);
    })
    : document.querySelectorAll(".kanvas-transition-container").forEach(initTransition);
})();

(function () {
  "use strict";

  function attachBehavior(el) {
    if (!el) return;

    var closeBtn = el.querySelector(".close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        el.classList.add("kanvas-corner-popup--hiding");
        el.addEventListener(
          "transitionend",
          function () {
            el.remove();
          },
          { once: true }
        );
      });
    }

    if (typeof window.initKanvasTransition === "function") {
      var c = el.querySelector(".kanvas-transition-container");
      if (c) window.initKanvasTransition(c);
    }
  }

  function show() {
    var el = document.getElementById("kanvas-corner-popup");
    if (!el) return;

    attachBehavior(el);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.classList.add("kanvas-corner-popup--visible");
      });
    });
  }

  function init() {
    setTimeout(show, 8000);
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();

(function () {
  "use strict";

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function init(el) {
    if (el.__resizableReady) return;
    el.__resizableReady = true;

    var side   = el.dataset.resizableSide || "right";
    var key    = "resizable:" + el.dataset.resizableKey;
    var min    = parseFloat(el.dataset.resizableMin) || 0;
    var max    = parseFloat(el.dataset.resizableMax) || Infinity;
    var def    = parseFloat(el.dataset.resizableDefault) || min || 280;
    var handle = el.querySelector(":scope > .resizable__handle");
    if (!handle || !el.dataset.resizableKey) return;

    function setWidth(px) {
      el.style.setProperty("--resizable-w", clamp(px, min, max) + "px");
    }
    function save() {
      localStorage.setItem(key, parseFloat(getComputedStyle(el).width));
    }

    var saved = parseFloat(localStorage.getItem(key));
    setWidth(isNaN(saved) ? def : saved);

    var startX = 0, startW = 0;

    function onMove(e) {
      var delta = side === "right" ? e.clientX - startX : startX - e.clientX;
      setWidth(startW + delta);
    }
    function onUp(e) {
      handle.releasePointerCapture(e.pointerId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.classList.remove("is-resizing");
      document.body.classList.remove("is-resizing");
      save();
    }

    handle.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      startX = e.clientX;
      startW = el.getBoundingClientRect().width;
      handle.setPointerCapture(e.pointerId);
      el.classList.add("is-resizing");
      document.body.classList.add("is-resizing");
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });

    handle.addEventListener("dblclick", function () { setWidth(def); save(); });

    // Keyboard accessibility
    handle.setAttribute("role", "separator");
    handle.setAttribute("aria-orientation", "vertical");
    handle.setAttribute("tabindex", "0");
    handle.addEventListener("keydown", function (e) {
      var grow = side === "right" ? "ArrowRight" : "ArrowLeft";
      var shrink = side === "right" ? "ArrowLeft" : "ArrowRight";
      var step = e.shiftKey ? 40 : 12;
      var w = parseFloat(getComputedStyle(el).width);
      if (e.key === grow) w += step;
      else if (e.key === shrink) w -= step;
      else return;
      e.preventDefault();
      setWidth(w);
      save();
    });
  }

  function initAll() {
    document.querySelectorAll("[data-resizable]").forEach(init);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initAll);
  else initAll();
})();
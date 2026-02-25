(function () {
  "use strict";

  var CLOSE_SVG =
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"/>' +
    "</svg>";

  function img(cls, file) {
    return '<img class="' + cls + '" src="/images/banner-transitions/' + file + '" alt="" />';
  }

  function buildPopup() {
    var el = document.createElement("div");
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Kanvas Collaboration Popup");
    el.className = "kanvas-corner-popup";
    var bgFile = "empty-dark.svg";
    var svcFile = "service-interface-partial-colorMode.svg";
    var ingressFile = "ingress-gateway-partial-colorMode.svg";
    var kubernetesFile = "kubernetes-partial-colorMode.svg";
    var podFile = "pod-partial-colorMode.svg";
    var prometheusFile = "prometheus-partial-colorMode.svg";
    var arrowsFile = "supporting-arrows.svg";

    el.innerHTML =
      '<div class="popup"><div class="popup-inner">' +
      '<button class="close-btn" aria-label="Close popup">' + CLOSE_SVG + "</button>" +
      '<a class="popup-content-link" href="https://kanvas.new/" target="_blank" rel="noopener noreferrer">' +
      '<div class="popup-text"><h4>Build solutions together</h4><h1>Collaborate with the team</h1></div>' +
      '<div class="kanvas-transition-container">' +
      '<div class="canvas-grid"></div>' +
      '<img class="kanvas-canvas-bg" src="/images/banner-transitions/' + bgFile + '" alt="" />' +
      '<div class="kanvas-layer">' + img("kanvas-service-interface", svcFile) + "</div>" +
      '<div class="kanvas-layer">' + img("kanvas-ingress-gateway", ingressFile) + "</div>" +
      '<div class="kanvas-layer">' + img("kanvas-kubernetes", kubernetesFile) + "</div>" +
      '<div class="kanvas-layer">' + img("kanvas-pod", podFile) + "</div>" +
      '<div class="kanvas-layer">' + img("kanvas-prometheus", prometheusFile) + "</div>" +
      img("kanvas-supporting-arrows", arrowsFile) +
      "</div>" +
      '<div class="try-it-text"><span>Try it now at </span><strong>kanvas.new</strong></div>' +
      "</a>" +
      '<a class="explore-playground-button" href="https://kanvas.new/" target="_blank" rel="noopener noreferrer">Access Kanvas</a>' +
      "</div></div>";

    el.querySelector(".close-btn").addEventListener("click", function () {
      el.classList.add("kanvas-corner-popup--hiding");
      el.addEventListener("transitionend", function () {
        el.remove();
      }, { once: true });
    });

    return el;
  }

  function show() {
    var el = buildPopup();
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add("kanvas-corner-popup--visible"); });
    });
    if (typeof window.initKanvasTransition === "function") {
      var c = el.querySelector(".kanvas-transition-container");
      if (c) window.initKanvasTransition(c);
    }
  }

  function init() {
    setTimeout(show, 8000);
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();

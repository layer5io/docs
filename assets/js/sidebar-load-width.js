(function () {
    try {
        var leftWidth = parseInt(localStorage.getItem("left-sidebar-width"), 10);
        var tocWidth = parseInt(localStorage.getItem("toc-width"), 10);
        var cssStyles = "";

        if (!isNaN(leftWidth)) cssStyles += "--left-sidebar-width: " + leftWidth + "px;";
        if (!isNaN(tocWidth)) cssStyles += "--toc-width: " + tocWidth + "px;";

        if (cssStyles) {
            var styleTag = document.createElement("style");
            styleTag.innerHTML = ".r-grid-container {" + cssStyles + "}";
            document.head.appendChild(styleTag);
        }
    } catch (e) {
        console.warn("LocalStorage blocked or unavailable:", e);
    }
})();
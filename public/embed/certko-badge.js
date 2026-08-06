(function () {
  "use strict";
  var script = document.currentScript;
  if (!script) return;

  var theme = (script.getAttribute("data-theme") || "light").toLowerCase();
  var base = script.getAttribute("data-base") || "https://info.certko.com";
  var target = script.getAttribute("data-href") || "https://certko.com/?utm_source=embed&utm_medium=badge&utm_campaign=backlink";
  var label = script.getAttribute("data-label") || "Certko";

  var src =
    theme === "dark"
      ? base + "/embed/badge-dark.svg"
      : theme === "compact"
        ? base + "/embed/badge-compact.svg"
        : base + "/embed/badge-light.svg";

  var a = document.createElement("a");
  a.href = target;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.title = "Open Certko — free BIS compliance checker";
  a.setAttribute("aria-label", "Certko");

  var img = document.createElement("img");
  img.src = src;
  img.alt = label;
  img.width = theme === "compact" ? 148 : 200;
  img.height = theme === "compact" ? 36 : 48;
  img.loading = "lazy";
  img.decoding = "async";
  img.style.cssText = "display:inline-block;border:0;max-width:100%;height:auto;";

  a.appendChild(img);
  script.parentNode.insertBefore(a, script);
})();

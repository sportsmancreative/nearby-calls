/* Nearby Calls — homepage behavior */
(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Revenue calculator */
  var input = document.getElementById("customerValue");
  var tiles = document.querySelectorAll(".calc-tile .rev");
  function money(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }
  function updateCalc() {
    var v = parseFloat(input.value);
    if (!isFinite(v) || v <= 0) v = 0;
    if (v > 1000000) v = 1000000;
    tiles.forEach(function (t) {
      var mult = parseInt(t.getAttribute("data-mult"), 10) || 1;
      t.textContent = v > 0 ? money(v * mult) : "—";
    });
  }
  if (input && tiles.length) {
    input.addEventListener("input", updateCalc);
    updateCalc();
  }

  /* Sticky mobile buy bar: show after scrolling past the hero */
  var bar = document.getElementById("stickyBar");
  var hero = document.querySelector(".hero");
  if (bar && hero && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        var heroVisible = entries[0].isIntersecting;
        bar.classList.toggle("show", !heroVisible);
        bar.setAttribute("aria-hidden", heroVisible ? "true" : "false");
      },
      { rootMargin: "-80px 0px 0px 0px" }
    );
    io.observe(hero);
  }
})();

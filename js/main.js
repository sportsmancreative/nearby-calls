/* Nearby Calls — homepage behavior */
(function () {
  "use strict";

  /* GoHighLevel inbound webhook for the email list.
     Create it in GHL: Automation -> Create Workflow -> trigger "Inbound Webhook",
     paste the URL here, then add Create/Update Contact (name, email) + a tag. */
  var GHL_NEWSLETTER_WEBHOOK = "https://services.leadconnectorhq.com/hooks/vjMScN0jFkg3d0Rvjk7O/webhook-trigger/5123e325-b4e3-4811-b5ba-bec9efa8a7cb";

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

  /* Personalized example popup (GoHighLevel form) */
  var modal = document.getElementById("exampleModal");
  var openBtn = document.getElementById("exampleBtn");
  if (modal && openBtn) {
    function openModal() {
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    }
    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
    }
    openBtn.addEventListener("click", openModal);
    modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  /* Email list signup -> GoHighLevel webhook */
  var nlForm = document.getElementById("newsletterForm");
  if (nlForm) {
    var nlStatus = document.getElementById("nlStatus");
    nlForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (nlForm.querySelector(".hp").value) return; // bot
      var name = document.getElementById("nlName").value.trim();
      var email = document.getElementById("nlEmail").value.trim();
      if (!name || !email || email.indexOf("@") < 1) {
        nlStatus.textContent = "Please enter your name and a valid email.";
        nlStatus.className = "subscribe-note err";
        return;
      }
      if (!GHL_NEWSLETTER_WEBHOOK) {
        nlStatus.textContent = "Signup isn't connected yet — email team@nearbycalls.com and we'll add you.";
        nlStatus.className = "subscribe-note err";
        return;
      }
      var btn = nlForm.querySelector("button");
      btn.disabled = true;
      nlStatus.textContent = "Signing you up…";
      nlStatus.className = "subscribe-note";
      var payload = JSON.stringify({ name: name, email: email, source: "nearbycalls.com newsletter" });
      fetch(GHL_NEWSLETTER_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return true;
      }).catch(function () {
        /* CORS-blocked or network hiccup: fire-and-forget fallback still delivers */
        return fetch(GHL_NEWSLETTER_WEBHOOK, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: payload
        });
      }).then(function () {
        nlStatus.textContent = "You're in! Check your inbox for a welcome email.";
        nlStatus.className = "subscribe-note ok";
      }).catch(function () {
        btn.disabled = false;
        nlStatus.textContent = "Something went wrong — email team@nearbycalls.com and we'll add you.";
        nlStatus.className = "subscribe-note err";
      });
    });
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

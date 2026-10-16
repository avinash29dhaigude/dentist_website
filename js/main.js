/* ==========================================================================
   main.js — shared rendering & site-wide components.
   Reads all content from clinic-config.js (window.CLINIC_CONFIG).
   ========================================================================== */

(function () {
  "use strict";

  var C = window.CLINIC_CONFIG || {};

  /* ---------- tiny helpers ---------- */

  function cfg(key, fallback) {
    var v = C[key];
    return v === undefined || v === null || v === "" ? fallback : v;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Click-to-call href from any phone string.
  function telHref(p) { return "tel:" + String(p).replace(/[^\d+]/g, ""); }
  // WhatsApp number as digits only, with country code (+91...).
  function waDigits() {
    var n = String(cfg("WHATSAPP_NUMBER", cfg("PHONE_NUMBER", ""))).replace(/[^\d]/g, "");
    if (n.length === 10) n = "91" + n; // assume Indian number if no country code
    return n;
  }
  function waLink(message) {
    return "https://wa.me/" + waDigits() + "?text=" + encodeURIComponent(message || "");
  }
  function mapsLink() {
    if (C.GOOGLE_MAPS_LINK) return C.GOOGLE_MAPS_LINK;
    return "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent([C.CLINIC_ADDRESS, C.CITY, C.STATE].join(", "));
  }
  function stars(n) {
    var out = "";
    for (var i = 0; i < 5; i++) {
      out += '<svg class="h-4 w-4 ' + (i < n ? "text-amber-400" : "text-navy-200") +
        '" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M9.05 2.93c.3-1 1.6-1 1.9 0l1.2 3.8a1 1 0 0 0 .95.7h3.9c1 0 1.4 1.3.6 1.9l-3.1 2.3a1 1 0 0 0-.36 1.1l1.2 3.8c.3 1-.8 1.8-1.6 1.3l-3.1-2.3a1 1 0 0 0-1.2 0l-3.1 2.3c-.8.5-1.9-.3-1.6-1.3l1.2-3.8a1 1 0 0 0-.36-1.1l-3.1-2.3c-.8-.6-.4-1.9.6-1.9h3.9a1 1 0 0 0 .95-.7z"/></svg>';
    }
    return out;
  }
  function svgIcon(name, cls) {
    var p = {
      tooth: '<path d="M12 2C8 2 5.5 4.5 5 7c-.35 1.7.3 3.4-.8 4.7C3.2 12.9 4 14.5 4 16s.9 4 2 4c1.7 0 1-2.5 2-2.5s.9 2.5 2 2.5 1-2.5 2-2.5 2.5 2.5 2.5 2.5c1.4 0 2-1.5 2-3s1.8-3 1.8-5.3c0-1.3.3-2.7-.5-3.9C17 3.4 15 2 12 2z" transform="translate(-2,1) scale(1.1)"/>',
      hand: '<path d="M7 11.5V6a1.5 1.5 0 0 1 3 0v4.5M10 10V4.5a1.5 1.5 0 0 1 3 0V10m0-4.5V6a1.5 1.5 0 0 1 3 0v5.5c0 3.6-2.5 6.75-6 6.75-3.9 0-5-3.2-5-6.75V9.5a1.5 1.5 0 0 1 3 0v2"/>',
      shield: '<path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
      sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><circle cx="19" cy="5" r="1" />',
      clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
      star: '<path d="M9.05 2.93c.3-1 1.6-1 1.9 0l1.2 3.8a1 1 0 0 0 .95.7h3.9c1 0 1.4 1.3.6 1.9l-3.1 2.3a1 1 0 0 0-.36 1.1l1.2 3.8c.3 1-.8 1.8-1.6 1.3l-3.1-2.3a1 1 0 0 0-1.2 0l-3.1 2.3c-.8.5-1.9-.3-1.6-1.3l1.2-3.8a1 1 0 0 0-.36-1.1l-3.1-2.3c-.8-.6-.4-1.9.6-1.9h3.9a1 1 0 0 0 .95-.7z"/>',
      smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 13.5c.8 1.2 2 1.9 3.5 1.9s2.7-.7 3.5-1.9"/><circle cx="9" cy="10" r=".9" fill="currentColor"/><circle cx="15" cy="10" r=".9" fill="currentColor"/>',
      heart: '<path d="M12 20s-7-4.4-9.2-8.6C1.3 8.6 2.6 5.5 5.6 5.5c2 0 3.2 1.1 4.4 3 .1-1.4.6-5 4-5 3 0 4.7 2.5 3.2 5.4C18.7 15.6 12 20 12 20z"/>',
      team: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.7-3 2.6-4.5 5.5-4.5s4.8 1.5 5.5 4.5"/><circle cx="16.5" cy="9" r="2.6"/><path d="M15.5 14.6c2.2.2 3.7 1.5 4.4 3.5"/>',
      check: '<path d="M5 13l4 4 10-10"/>',
      phone: '<path d="M6.6 3.5c.4 0 .8.2 1 .6l1.5 2.6c.2.4.2.8 0 1.2L8.2 9.3c.8 1.7 2.4 3.3 4.1 4.1l1.4-1c.3-.2.8-.2 1.2 0l2.6 1.5c.4.3.6.7.6 1.1-.2 1.6-1.6 2.8-3.2 2.6-4.1-.3-8.5-4.5-8.8-8.6-.2-1.6 1-3 2.5-3.5z"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
      map: '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/>',
      whatsapp: '<path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.4 14.2c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6s.6-1.8.9-2c.2-.2.5-.3.6-.3h.5c.1 0 .3-.1.5.3l.8 1.9c.1.1.1.3 0 .4l-.4.6-.5.5c-.1.1-.2.3-.1.5.1.2.6 1.1 1.4 1.8.9.9 1.7 1.2 2 1.3.2.1.4.1.5-.1l.7-.9c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.5.3.2.2.2.6 0 .4zM9.7 8.2c0 .4-.1.7-.3.9l-.9 1c-.1.2-.1.5 0 .7.1.3.8 1.6 2 2.7 1.5 1.4 2.7 1.8 3.1 1.9.2.1.5 0 .6-.2l.9-1.2c.2-.2.4-.3.6-.1l2 1c.3.1.5.3.4.6-.1.6-.6 1.6-2.4 1.9-1.9.3-4.9-1.2-6.5-2.8-1.9-1.8-2.9-4-2.8-5.3.1-1.4 1-2.3 1.5-2.6.4-.2.7-.2.9-.2.2 0 .4 0 .5.3.2.4.6 1.3.7 1.5z"/>',
      chevron: '<path d="M6 9l6 6 6-6"/>'
    };
    var body = p[name] || p.tooth;
    return '<svg class="' + (cls || "h-5 w-5") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>";
  }

  /* ---------- site values ---------- */

  var NAME = esc(cfg("CLINIC_NAME", "Your Dental Clinic"));
  var TAG  = esc(cfg("CLINIC_TAGLINE", ""));
  var CITY = esc(cfg("CITY", "Your City"));
  var STATE = esc(cfg("STATE", ""));
  var PHONE = cfg("PHONE_NUMBER", "");
  var PHONE_DISP = cfg("PHONE_DISPLAY", "") || PHONE;
  var WA_MSG = "Hello " + cfg("CLINIC_NAME", "Your Dental Clinic") +
               ", I would like to book an appointment.";

  var NAV = [
    { label: "Home", href: "index.html" },
    { label: "About Us", href: "about.html" },
    { label: "Services", href: "services.html" },
    { label: "Appointment", href: "appointment.html" },
    { label: "Patient Information", href: "patient-info.html" }
  ];

  // from https://raw.githubusercontent.com/anuraghazra/... no — local helper:
  function currentPage() {
    var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    return path;
  }

  /* ---------- header / footer / floating buttons ---------- */

  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var page = currentPage();
    // service-detail.html belongs to the Services nav item.
    if (page === "service-detail.html") page = "services.html";
    var navHtml = NAV.map(function (n) {
      var active = n.href === page;
      return '<a class="nav-link" href="' + n.href + '"' + (active ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a>";
    }).join("");

    host.innerHTML =
      '<header class="sticky top-0 z-40 border-b border-teal-100 bg-white/95 backdrop-blur">' +
        '<div class="container-site flex items-center justify-between gap-3 py-3">' +
          '<a href="index.html" class="flex min-w-0 items-center gap-2.5" aria-label="' + NAME + ' — home">' +
            '<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white" aria-hidden="true">' + svgIcon("tooth", "h-6 w-6") + "</span>" +
            '<span class="min-w-0 leading-tight">' +
              '<span class="block truncate text-base font-bold text-navy-900 sm:text-lg">' + NAME + "</span>" +
              (TAG ? '<span class="block truncate text-xs text-teal-700">' + TAG + "</span>" : "") +
            "</span>" +
          "</a>" +
          '<nav class="hidden items-center gap-1 lg:flex" aria-label="Main">' + navHtml + "</nav>" +
          '<div class="flex items-center gap-2">' +
            '<a href="' + telHref(PHONE) + '" class="nav-link hidden items-center gap-1.5 md:inline-flex" aria-label="Call ' +
              esc(String(PHONE)) + '">' + svgIcon("phone", "h-4 w-4") + '<span class="font-medium">' + esc(PHONE_DISP) + "</span></a>" +
            '<a href="' + telHref(PHONE) + '" class="btn-icon-soft md:hidden" aria-label="Call clinic">' + svgIcon("phone") + "</a>" +
            '<a href="appointment.html" class="btn btn-primary hidden sm:inline-flex">Book Appointment</a>' +
            '<button type="button" id="menu-toggle" class="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy-900 hover:bg-teal-50 lg:hidden" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">' +
              '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
            "</button>" +
          "</div>" +
        "</div>" +
        '<div id="mobile-menu" class="hidden border-t border-teal-100 bg-white lg:hidden">' +
          '<nav class="container-site flex flex-col gap-1 py-3" aria-label="Mobile">' +
            NAV.map(function (n) {
              return '<a class="rounded-xl px-3 py-2.5 font-medium text-navy-800 hover:bg-teal-50"' +
                (n.href === page ? ' aria-current="page"' : "") + ' href="' + n.href + '">' + esc(n.label) + "</a>";
            }).join("") +
            '<a href="appointment.html" class="btn btn-primary mt-2 sm:hidden">Book Appointment</a>' +
          "</nav>" +
        "</div>" +
      "</header>";

    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("hidden");
        toggle.setAttribute("aria-expanded", String(!open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.add("hidden");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    var services = (C.SERVICES || []).slice(0, 6).map(function (s) {
      return '<li><a class="text-teal-50/80 transition hover:text-white" href="service-detail.html?service=' + esc(s.slug) + '">' + esc(s.name) + "</a></li>";
    }).join("");
    var social = "";
    if (C.INSTAGRAM_LINK)
      social += '<a class="btn-icon-soft h-9 w-9" href="' + esc(C.INSTAGRAM_LINK) + '" target="_blank" rel="noopener" aria-label="Instagram"></a>';
    if (C.FACEBOOK_LINK)
      social += '<a class="btn-icon-soft h-9 w-9" href="' + esc(C.FACEBOOK_LINK) + '" target="_blank" rel="noopener" aria-label="Facebook"></a>';

    var foot = cfg("SITE_FOOTNOTE", "").replace("{city}", CITY);
    host.innerHTML =
      '<footer class="bg-navy-900 text-navy-100">' +
        '<div class="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">' +
          '<div>' +
            '<div class="flex items-center gap-2.5">' +
              '<span class="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white" aria-hidden="true">' + svgIcon("tooth", "h-5 w-5") + "</span>" +
              '<span class="text-lg font-bold text-white">' + NAME + "</span>" +
            "</div>" +
            '<p class="mt-4 text-sm leading-relaxed text-navy-200">' + foot + "</p>" +
            (social ? '<div class="mt-4 flex gap-2">' + social + "</div>" : "") +
          "</div>" +
          '<div>' +
            '<h2 class="text-sm font-semibold uppercase tracking-wide text-teal-300">Quick Links</h2>' +
            '<ul class="mt-4 space-y-2.5 text-sm">' +
              NAV.map(function (n) { return '<li><a class="text-navy-100 transition hover:text-white" href="' + n.href + '">' + esc(n.label) + "</a></li>"; }).join("") +
            "</ul>" +
          "</div>" +
          '<div>' +
            '<h2 class="text-sm font-semibold uppercase tracking-wide text-teal-300">Our Services</h2>' +
            '<ul class="mt-4 space-y-2.5 text-sm">' + (services || "<li>—</li>") + "</ul>" +
          "</div>" +
          '<div>' +
            '<h2 class="text-sm font-semibold uppercase tracking-wide text-teal-300">Contact</h2>' +
            '<ul class="mt-4 space-y-3 text-sm">' +
              '<li class="flex gap-2.5"><span class="mt-0.5 text-teal-300">' + svgIcon("map", "h-4 w-4") + '</span><span>' + esc(C.CLINIC_ADDRESS || "") + "</span></li>" +
              (PHONE ? '<li class="flex gap-2.5"><span class="mt-0.5 text-teal-300">' + svgIcon("phone", "h-4 w-4") + '</span><a class="hover:text-white" href="' + telHref(PHONE) + '">' + esc(PHONE_DISP) + "</a></li>" : "") +
              (C.EMAIL ? '<li class="flex gap-2.5"><span class="mt-0.5 text-teal-300">' + svgIcon("mail", "h-4 w-4") + '</span><a class="break-all hover:text-white" href="mailto:' + esc(C.EMAIL) + '">' + esc(C.EMAIL) + "</a></li>" : "") +
            "</ul>" +
          "</div>" +
        "</div>" +
        '<div class="border-t border-white/10">' +
          '<div class="container-site flex flex-col gap-2 py-5 text-center text-xs text-navy-200 sm:flex-row sm:justify-between sm:text-left">' +
            "<p>&copy; " + new Date().getFullYear() + " " + NAME + ". All rights reserved.</p>" +
            "<p>Dentist in " + CITY + (STATE ? ", " + STATE : "") + "</p>" +
          "</div>" +
        "</div>" +
      "</footer>";
  }

  function renderFloating() {
    var host = document.getElementById("floating-actions");
    if (!host) return;
    host.innerHTML =
      '<a href="' + telHref(PHONE) + '" class="btn-icon call-float fixed bottom-4 left-4 z-50 bg-navy-900 shadow-xl md:hidden" aria-label="Call clinic">' +
        svgIcon("phone") + "</a>" +
      '<a href="' + waLink(WA_MSG) + '" target="_blank" rel="noopener" class="btn-icon wa-float fixed bottom-4 right-4 z-50 bg-teal-600 shadow-xl" aria-label="Chat on WhatsApp">' +
        svgIcon("whatsapp") + "</a>";
  }

  /* ---------- SEO ---------- */

  function injectSEO(pageDefaults) {
    if (!C) return;
    document.title = pageDefaults.title;
    var desc = pageDefaults.description;
    var origin = location.origin || "https://www.yourdomain.com";
    var ogImage = origin + "/images/" + (cfg("IMAGES", {}).dentist || "dentist.svg").replace(/^images\//, "");

    var m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", desc);
    var canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute("href", location.href.split("#")[0]);
    function setOG(prop, content) {
      var el = document.querySelector('meta[property="og:' + prop + '"]');
      if (el) el.setAttribute("content", content);
    }
    setOG("title", pageDefaults.title);
    setOG("description", desc);
    setOG("image", ogImage);
    setOG("url", location.href);
  }

  function labelForPage() {
    var t = (C.SERVICES || []).find(function (s) { return s.name && location.search.indexOf(s.slug) > -1; });
    if (t) return " | " + t.name;
    return "";
  }

  /* ---------- reusable components ---------- */

  function serviceCard(s) {
    var img = s.image || "images/services/" + s.slug + ".jpg";
    return (
      '<article class="card card-hover group flex flex-col overflow-hidden">' +
        '<a href="service-detail.html?service=' + esc(s.slug) + '" class="block aspect-[4/3] overflow-hidden bg-teal-50" tabindex="-1" aria-hidden="true">' +
          '<img src="' + esc(img) + '" alt="' + esc(s.name) + '" class="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy">' +
        "</a>" +
        '<div class="flex flex-1 flex-col p-5">' +
          '<h3 class="text-lg font-bold text-navy-900"><a href="service-detail.html?service=' + esc(s.slug) + '" class="transition hover:text-teal-700">' + esc(s.name) + "</a></h3>" +
          '<p class="mt-2 flex-1 text-sm leading-relaxed text-navy-600">' + esc(s.shortDescription) + "</p>" +
          '<p class="mt-4"><a class="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800" href="service-detail.html?service=' + esc(s.slug) + '">Learn more ' +
            '<svg class="h-4 w-4 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          "</a></p>" +
        "</div>" +
      "</article>"
    );
  }

  function whyCard(item) {
    return (
      '<div class="card card-hover p-6">' +
        '<span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-teal-700" aria-hidden="true">' + svgIcon(item.icon || "tooth", "h-5 w-5") + "</span>" +
        '<h3 class="mt-4 text-base font-bold text-navy-900">' + esc(item.title) + "</h3>" +
        '<p class="mt-2 text-sm leading-relaxed text-navy-600">' + esc(item.description) + "</p>" +
      "</div>"
    );
  }

  function testimonialCard(t) {
    return (
      '<figure class="card card-hover flex h-full flex-col p-6">' +
        '<div class="flex gap-0.5" aria-label="' + t.rating + " out of 5 stars\">" + stars(t.rating || 5) + "</div>" +
        '<blockquote class="mt-4 flex-1 text-sm leading-relaxed text-navy-700">' + esc(t.text) + "</blockquote>" +
        '<figcaption class="mt-5 border-t border-navy-100 pt-3">' +
          '<p class="font-semibold text-navy-900">' + esc(t.name) + "</p>" +
          (t.location ? '<p class="text-xs text-navy-500">' + esc(t.location) + "</p>" : "") +
        "</figcaption>" +
      "</figure>"
    );
  }

  function faqItem(q, a, i) {
    return (
      '<div class="faq-item card overflow-hidden">' +
        '<h3>' +
          '<button type="button" class="faq-q flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-navy-900" aria-expanded="false" aria-controls="faq-panel-' + i + '">' +
            "<span>" + esc(q) + "</span>" +
            '<span class="faq-icon shrink-0 text-teal-700 transition-transform" aria-hidden="true">' + svgIcon("chevron", "h-4 w-4") + "</span>" +
          "</button>" +
        "</h3>" +
        '<div id="faq-panel-' + i + '" class="faq-body hidden px-5 pb-4 text-sm leading-relaxed text-navy-600"><p>' + esc(a) + "</p></div>" +
      "</div>"
    );
  }

  function timingRows() {
    return (C.CLINIC_TIMINGS || []).map(function (t) {
      return '<li class="flex justify-between gap-4 border-b border-teal-100 py-2.5 last:border-0"><span class="font-medium text-navy-900">' + esc(t.days) + '</span><span class="text-right text-navy-600">' + esc(t.hours) + "</span></li>";
    }).join("");
  }

  // A shared "contact strip" used on Home (and reused on Appointment page).
  function contactStrip() {
    var addrHtml =
      '<p class="mt-1 text-sm text-navy-600">' + esc(C.CLINIC_ADDRESS || "") + "</p>" +
      '<p class="mt-1 text-sm text-navy-600">' + esc(C.CITY) + ", " + esc(C.STATE) + (C.PINCODE ? " " + esc(C.PINCODE) : "") + "</p>" +
      '<a class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800" href="' + mapsLink() + '" target="_blank" rel="noopener">Get directions</a>';
    return (
      '<div class="grid gap-6 md:grid-cols-2">' +
        '<div class="flex gap-3">' +
          '<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700" aria-hidden="true">' + svgIcon("map", "h-5 w-5") + "</span>" +
          "<div><h3 class=\"font-bold text-navy-900\">Visit Us</h3>" +
            addrHtml +
          "</div>" +
        "</div>" +
        '<div class="flex gap-3">' +
          '<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700" aria-hidden="true">' + svgIcon("clock", "h-5 w-5") + "</span>" +
          "<div><h3 class=\"font-bold text-navy-900\">Clinic Timings</h3><ul class=\"mt-1 min-w-[240px] text-sm\">" + timingRows() + "</ul></div>" +
        "</div>" +
        '<div class="flex gap-3">' +
          '<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700" aria-hidden="true">' + svgIcon("phone", "h-5 w-5") + "</span>" +
          "<div><h3 class=\"font-bold text-navy-900\">Call or WhatsApp</h3>" +
            '<p class="mt-1 text-sm text-navy-600">' + esc(PHONE_DISP) + "</p>" +
            '<div class="mt-2 flex flex-wrap gap-2">' +
              '<a class="btn btn-outline px-4 py-2 text-xs" href="' + telHref(PHONE) + '">' + svgIcon("phone", "h-3.5 w-3.5") + "Call now</a>" +
              '<a class="btn btn-primary px-4 py-2 text-xs" href="' + waLink(WA_MSG) + '" target="_blank" rel="noopener">' + svgIcon("whatsapp", "h-3.5 w-3.5") + "WhatsApp</a>" +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div class="flex gap-3">' +
          '<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700" aria-hidden="true">' + svgIcon("star", "h-5 w-5") + "</span>" +
          "<div><h3 class=\"font-bold text-navy-900\">Reviews</h3>" +
            '<p class="mt-1 text-sm text-navy-600">Heard good things? We\'d love your feedback.</p>' +
            (C.GOOGLE_REVIEWS_LINK ? '<a class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800" href="' + esc(C.GOOGLE_REVIEWS_LINK) + '" target="_blank" rel="noopener">Read & leave a review</a>' : "") +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  /* ---------- FAQ accordion (event delegation) ---------- */

  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".faq-q") : null;
    if (!btn) return;
    var body = document.getElementById(btn.getAttribute("aria-controls"));
    var icon = btn.querySelector(".faq-icon");
    if (!body) return;
    var wasHidden = body.classList.contains("hidden");
    body.classList.toggle("hidden", !wasHidden);
    btn.setAttribute("aria-expanded", String(wasHidden));
    if (icon) icon.classList.toggle("rotate-180", wasHidden);
  });

  /* ---------- structured data ---------- */

  function injectJSONLD() {
    if (!C || !C.CLINIC_NAME) return;
    var base = location.origin + location.pathname.replace(/[^/]*$/, "");
    function abs(p) { return base + String(p || "").replace(/^\.?\//, ""); }
    var dentist = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: C.CLINIC_NAME,
      description: (C.CLINIC_INTRO || "").slice(0, 300),
      image: abs((C.IMAGES || {}).dentist),
      url: location.origin + "/",
      telephone: String(C.PHONE_NUMBER || ""),
      email: C.EMAIL || undefined,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: C.CLINIC_ADDRESS || undefined,
        addressLocality: C.CITY || undefined,
        addressRegion: C.STATE || undefined,
        postalCode: C.PINCODE || undefined,
        addressCountry: "IN"
      }
    };
    var scripts = [
      { type: "application/ld+json", data: dentist },
      { type: "application/ld+json", data: { "@context": "https://schema.org", "@type": "WebSite", name: C.CLINIC_NAME, url: location.origin + "/" } }
    ];
    // FAQ schema where FAQs exist (Home).
    if (C.FAQS && C.FAQS.length) {
      scripts.push({
        type: "application/ld+json",
        data: {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: C.FAQS.map(function (f) {
            return { "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } };
          })
        }
      });
    }
    scripts.forEach(function (s) {
      var el = document.createElement("script");
      el.type = s.type;
      el.textContent = JSON.stringify(s.data);
      document.head.appendChild(el);
    });
  }

  /* ---------- shared init ---------- */

  window.site = {
    cfg: cfg, esc: esc, telHref: telHref, waLink: waLink, mapsLink: mapsLink,
    svgIcon: svgIcon, stars: stars, serviceCard: serviceCard, whyCard: whyCard,
    testimonialCard: testimonialCard, faqItem: faqItem, timingRows: timingRows,
    contactStrip: contactStrip, injectSEO: injectSEO, labelForPage: labelForPage,
    NAME: NAME, CITY: CITY, STATE: STATE, PHONE: PHONE, PHONE_DISP: PHONE_DISP,
    WA_MSG: WA_MSG, C: C, currentPage: currentPage
  };

  function init() {
    injectJSONLD();
    renderHeader();
    renderFooter();
    renderFloating();
    // Let each page's script run its own renderer.
    var pageScript = document.querySelector("script[data-page]");
    if (pageScript) {
      // data-page is lowercase-first ("about", "serviceDetail"); page scripts
      // define window.renderAbout / renderServiceDetail etc.
      var name = pageScript.getAttribute("data-page");
      var fn = window["render" + name.charAt(0).toUpperCase() + name.slice(1)];
      if (typeof fn === "function") fn();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
/* Home page rendering — pulls content from clinic-config.js via window.site. */

window.renderHome = function () {
  var site = window.site;
  var C = site.C;
  var esc = site.esc;

  // ---- SEO ----
  site.injectSEO({
    title: site.NAME + " | Trusted Dentist in " + site.CITY + ", " + site.STATE,
    description:
      (C.CLINIC_INTRO || "Gentle dental care in " + site.CITY) + " Book an appointment with " + C.CLINIC_NAME + ", the trusted dental clinic in " + site.CITY + "."
  });

  var IMG = C.IMAGES || {};

  // ---- HERO ----
  var hero = document.getElementById("hero-clinic");
  if (hero) {
    var heroImg = IMG.hero || "";
    var heroHtml =
      '<section class="relative overflow-hidden bg-navy-900">' +
        (heroImg
          ? '<img src="' + esc(heroImg) + '" alt="' + esc((C.IMAGE_ALTS || {}).hero || "Dental clinic") +
            '" class="absolute inset-0 h-full w-full object-cover opacity-25" loading="eager">'
          : "") +
        '<div class="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-900/70 to-teal-900/40" aria-hidden="true"></div>' +
        '<div class="container-site relative py-20 sm:py-28 lg:py-32">' +
          '<div class="max-w-2xl">' +
            '<p class="section-eyebrow">' + site.svgIcon("tooth", "h-3.5 w-3.5") + " " + esc(C.CLINIC_TAGLINE || "Gentle dental care") + "</p>" +
            '<h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Trusted Dental Care in ' + site.CITY + "</h1>" +
            '<p class="mt-4 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">' + esc(C.CLINIC_INTRO || "") + "</p>" +
            '<div class="mt-8 flex flex-wrap gap-3">' +
              '<a href="appointment.html" class="btn btn-primary bg-teal-600 px-6 py-3 text-base hover:bg-teal-500">Book Appointment</a>' +
              '<a href="' + site.telHref(site.PHONE) + '" class="btn btn-white px-6 py-3 text-base">' + site.svgIcon("phone", "h-4 w-4") + "Call Now</a>" +
            "</div>" +
            '<dl class="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-navy-100">' +
              "<div><dt class=\"font-semibold text-teal-300\">Clinic</dt><dd>Mon–Sat</dd></div>" +
              "<div><dt class=\"font-semibold text-teal-300\">Slot</dt><dd>Convenient timings</dd></div>" +
              "<div><dt class=\"font-semibold text-teal-300\">Care</dt><dd>Gentle &amp; painless</dd></div>" +
            "</dl>" +
          "</div>" +
        "</div>" +
      "</section>";
    hero.innerHTML = heroHtml;
  }

  // ---- SERVICES PREVIEW ----
  var svcs = document.getElementById("home-services");
  if (svcs) {
    var services = (C.SERVICES || []).slice(0, 4);
    svcs.innerHTML =
      '<section id="services" class="py-16 sm:py-20">' +
        '<div class="container-site">' +
          '<div class="flex flex-wrap items-end justify-between gap-4">' +
            '<div><p class="section-eyebrow">' + site.svgIcon("star", "h-3.5 w-3.5") + " Our Treatments</p>" +
            '<h2 class="section-title">Dental Services We Offer</h2></div>' +
            '<a href="services.html" class="btn btn-outline px-4 py-2 text-xs">View all services</a>' +
          "</div>" +
          '<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">' +
            services.map(site.serviceCard).join("") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  // ---- WHY CHOOSE US ----
  var why = document.getElementById("home-whychoose");
  if (why) {
    why.innerHTML =
      '<section id="why-choose-us" class="bg-teal-50/60 py-16 sm:py-20">' +
        '<div class="container-site">' +
          '<p class="section-eyebrow">' + site.svgIcon("heart", "h-3.5 w-3.5") + " Why Choose Us</p>" +
          '<h2 class="section-title">Care You Can Trust, Comfort You\'ll Feel</h2>' +
          '<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">' +
            (C.WHY_CHOOSE_US || []).map(site.whyCard).join("") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  // ---- DOCTOR ----
  var doc = document.getElementById("home-doctor");
  if (doc) {
    var bio = (C.DOCTOR_BIO || [])[0] || "";
    doc.innerHTML =
      '<section id="doctor" class="py-16 sm:py-20">' +
        '<div class="container-site grid items-center gap-10 lg:grid-cols-2">' +
          '<div class="relative mx-auto max-w-md">' +
            '<div class="absolute -left-4 -top-4 h-full w-full rounded-2xl bg-teal-100" aria-hidden="true"></div>' +
            '<img src="' + esc(IMG.dentist || "images/dentist.jpg") + '" alt="' + esc((C.IMAGE_ALTS || {}).dentist || C.DOCTOR_NAME) +
              '" class="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-lg" loading="lazy">' +
          "</div>" +
          '<div>' +
            '<p class="section-eyebrow">' + site.svgIcon("smile", "h-3.5 w-3.5") + " Meet the Doctor</p>" +
            '<h2 class="section-title">' + esc(C.DOCTOR_NAME || "Our Dentist") + "</h2>" +
            '<p class="mt-1 text-sm font-semibold text-teal-700">' + esc(C.DOCTOR_QUALIFICATIONS || "") + "</p>" +
            '<p class="mt-1 text-sm text-navy-500">' + esc(C.EXPERIENCE || "") + " experience</p>" +
            '<p class="mt-4 text-base leading-relaxed text-navy-600">' + esc(bio || "") + "</p>" +
            '<div class="mt-6 flex flex-wrap gap-3">' +
              '<a href="about.html" class="btn btn-primary">More about the doctor</a>' +
              '<a href="appointment.html" class="btn btn-outline">Book a Visit</a>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>";
  }

  // ---- TESTIMONIALS ----
  var reviews = document.getElementById("home-reviews");
  if (reviews) {
    var ts = (C.TESTIMONIALS || []).slice(0, 3);
    reviews.innerHTML =
      '<section id="testimonials" class="bg-teal-50/60 py-16 sm:py-20">' +
        '<div class="container-site">' +
          '<div class="flex flex-wrap items-end justify-between gap-4">' +
            '<div><p class="section-eyebrow">' + site.svgIcon("star", "h-3.5 w-3.5") + " Patient Stories</p>" +
            '<h2 class="section-title">What Our Patients Say</h2></div>' +
            (C.GOOGLE_REVIEWS_LINK ? '<a href="' + esc(C.GOOGLE_REVIEWS_LINK) + '" target="_blank" rel="noopener" class="btn btn-outline px-4 py-2 text-xs">See all reviews</a>' : "") +
          "</div>" +
          '<div class="mt-10 grid gap-6 md:grid-cols-3">' +
            ts.map(site.testimonialCard).join("") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  // ---- FAQ ----
  var faq = document.getElementById("home-faq");
  if (faq) {
    var faqs = C.FAQS || [];
    faq.innerHTML =
      '<section id="faqs" class="py-16 sm:py-20">' +
        '<div class="container-site max-w-3xl">' +
          '<p class="section-eyebrow text-center">' + site.svgIcon("team", "h-3.5 w-3.5") + " Have Questions?</p>" +
          '<h2 class="section-title text-center">Frequently Asked Questions</h2>' +
          '<div class="mt-8 space-y-3">' +
            faqs.map(function (f, i) { return site.faqItem(f.q, f.a, i); }).join("") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  // ---- CONTACT STRIP ----
  var contact = document.getElementById("home-contact");
  if (contact) {
    contact.innerHTML =
      '<section id="contact" class="pb-16 sm:pb-20">' +
        '<div class="container-site">' +
          '<div class="card p-6 sm:p-10">' +
            '<p class="section-eyebrow">' + site.svgIcon("phone", "h-3.5 w-3.5") + " Visit / Contact</p>" +
            '<h2 class="section-title">We\'re Here for You</h2>' +
            '<div class="mt-8">' + site.contactStrip() + "</div>" +
          "</div>" +
        "</div>" +
      "</section>";
  }
};
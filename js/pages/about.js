/* About Us page rendering. */

window.renderAbout = function () {
  var site = window.site;
  var C = site.C;
  var esc = site.esc;
  var IMG = C.IMAGES || {};

  site.injectSEO({
    title: site.NAME + " | About Us | Dentist in " + site.CITY + ", " + site.STATE,
    description:
      "Meet the team behind " + site.NAME + " and learn about our approach to gentle, " +
      "modern dentistry in " + site.CITY + ". " + (C.CLINIC_INTRO || "").slice(0, 140)
  });

  var pageHero = document.getElementById("about-hero");
  if (pageHero) {
    pageHero.innerHTML =
      '<section class="bg-teal-50/70">' +
        '<div class="container-site py-12 sm:py-16">' +
          '<nav aria-label="Breadcrumb" class="text-xs text-navy-500"><a href="index.html" class="hover:text-teal-700">Home</a> / <span aria-current="page">About Us</span></nav>' +
          '<h1 class="mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">About ' + site.NAME + "</h1>" +
          "<p>Dentist in " + site.CITY + (site.STATE ? ", " + site.STATE : "") + "</p>" +
        "</div>" +
      "</section>";
  }

  var story = document.getElementById("about-story");
  if (story) {
    var paragraphs = (C.CLINIC_INTRO ? ["<p>" + esc(C.CLINIC_INTRO) + "</p>"] : []);
    story.innerHTML =
      '<section class="py-16 sm:py-20">' +
        '<div class="container-site grid items-center gap-10 lg:grid-cols-2">' +
          '<div class="relative mx-auto max-w-lg">' +
            '<img src="' + esc(IMG.clinicExterior || "images/clinic-exterior.jpg") + '" alt="' + esc((C.IMAGE_ALTS || {}).clinicExterior || "Our clinic") +
              '" class="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg" loading="lazy">' +
          "</div>" +
          "<div>" +
            '<p class="section-eyebrow">' + site.svgIcon("heart", "h-3.5 w-3.5") + " Our Story</p>" +
            '<h2 class="section-title">A Clinic That Cares About Your Smile</h2>' +
            '<div class="mt-4 space-y-4 text-navy-600 leading-relaxed">' + paragraphs.join("") + "</div>" +
          "</div>" +
        "</div>" +
      "</section>";
  }

  var doc = document.getElementById("about-doctor");
  if (doc) {
    var memberships = (C.DOCTOR_MEMBERSHIPS || []);
    doc.innerHTML =
      '<section class="bg-teal-50/60 py-16 sm:py-20">' +
        '<div class="container-site grid items-center gap-10 lg:grid-cols-2">' +
          '<div class="relative mx-auto max-w-md order-2 lg:order-1">' +
            '<div class="absolute -left-4 -top-4 h-full w-full rounded-2xl bg-navy-100" aria-hidden="true"></div>' +
            '<img src="' + esc(IMG.dentist || "images/dentist.jpg") + '" alt="' + esc((C.IMAGE_ALTS || {}).dentist || C.DOCTOR_NAME) +
              '" class="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-lg" loading="lazy">' +
          "</div>" +
          '<div class="order-1 lg:order-2">' +
            '<p class="section-eyebrow">' + site.svgIcon("smile", "h-3.5 w-3.5") + " The Doctor</p>" +
            '<h2 class="section-title">' + esc(C.DOCTOR_NAME || "Our Dentist") + "</h2>" +
            '<p class="mt-2 font-semibold text-teal-700">' + esc(C.DOCTOR_QUALIFICATIONS || "") + "</p>" +
            '<p class="text-sm font-medium text-navy-500">' + esc(C.EXPERIENCE || "") + " of experience</p>" +
            '<div class="mt-5 space-y-4 text-navy-600 leading-relaxed">' +
              (C.DOCTOR_BIO || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
            "</div>" +
            (memberships.length ?
              '<div class="mt-6"><p class="text-sm font-semibold text-navy-900">Memberships & professional bodies:</p>' +
                '<ul class="mt-2 flex flex-wrap gap-2">' +
                  memberships.map(function (m) { return '<li class="chip rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800">' + esc(m) + "</li>"; }).join("") +
                "</ul></div>" : "") +
            '<div class="mt-7 flex flex-wrap gap-3">' +
              '<a href="appointment.html" class="btn btn-primary">Book an Appointment</a>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>";
  }

  var why = document.getElementById("about-whychoose");
  if (why) {
    why.innerHTML =
      '<section class="py-16 sm:py-20">' +
        '<div class="container-site">' +
          '<p class="section-eyebrow">' + site.svgIcon("shield", "h-3.5 w-3.5") + " Our Commitment</p>" +
          '<h2 class="section-title">Why Patients Choose Us</h2>' +
          '<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">' +
            (C.WHY_CHOOSE_US || []).map(site.whyCard).join("") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  var facilities = document.getElementById("about-facilities");
  if (facilities) {
    var facs = C.FACILITIES || [];
    if (!facs.length) { facilities.remove(); }
    else facilities.innerHTML =
      '<section class="bg-teal-50/60 py-16 sm:py-20">' +
        '<div class="container-site">' +
          '<div class="grid gap-8 lg:grid-cols-2">' +
            '<div>' +
              '<p class="section-eyebrow">' + site.svgIcon("team", "h-3.5 w-3.5") + " Our Facilities</p>" +
              '<h2 class="section-title">Modern Equipment, Comfortable Clinic</h2>' +
              '<p class="section-lead">We keep our clinic spotless and our equipment up-to-date, so your visit is safe, quiet and as pleasant as a dental visit can be.</p>' +
            "</div>" +
            '<ul class="grid gap-3 sm:grid-cols-2">' +
              (facs.map(function (f) {
                return '<li class="card flex items-center gap-3 p-4 text-sm font-medium text-navy-800"><span class="text-teal-700">' + site.svgIcon("check", "h-4 w-4") + "</span>" + esc(f) + "</li>";
              }) || [])
            "</ul>" +
          "</div>" +
        "</div>" +
      "</section>";
  }

  var stats = document.getElementById("about-stats");
  if (stats) {
    var st = C.STATS || [];
    if (st.length) {
      stats.innerHTML =
        '<section class="border-y border-teal-100 bg-navy-900 py-12">' +
          '<div class="container-site grid grid-cols-2 gap-6 text-center sm:grid-cols-4">' +
            st.map(function (s) {
              return '<div><p class="text-2xl font-bold text-teal-300">' + esc(s.value) + "</p><p class=\"mt-1 text-sm text-navy-100\">" + esc(s.label) + "</p></div>";
            }).join("") +
          "</div>" +
        "</section>";
    }
  }
};
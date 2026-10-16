/* Services listing page. */

window.renderServices = function () {
  var site = window.site;
  var C = site.C;
  var esc = site.esc;
  var services = C.SERVICES || [];

  site.injectSEO({
    title: site.NAME + " | Dental Services | Dentist in " + site.CITY + ", " + site.STATE,
    description:
      "Explore all dental treatments at " + site.NAME + " in " + site.CITY +
      " — " + services.map(function (s) { return s.name; }).slice(0, 5).join(", ") + " and more."
  });

  var hero = document.getElementById("services-hero");
  if (hero) {
    hero.innerHTML =
      '<section class="bg-teal-50/70">' +
        '<div class="container-site py-12 sm:py-16">' +
          '<nav aria-label="Breadcrumb" class="text-xs text-navy-500"><a href="index.html" class="hover:text-teal-700">Home</a> / <span aria-current="page">Services</span></nav>' +
          '<h1 class="mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Our Dental Services</h1>' +
          '<p class="mt-3 max-w-2xl text-navy-600">Comprehensive care for the whole family — from routine check-ups and cleanings to implants and clear aligners.</p>' +
        "</div>" +
      "</section>";
  }

  var grid = document.getElementById("services-grid");
  if (grid) {
    grid.innerHTML =
      '<section class="py-14 sm:py-18">' +
        '<div class="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">' +
          services.map(site.serviceCard).join("") +
        "</div>" +
      "</section>";
  }

  var cta = document.getElementById("services-cta");
  if (cta) {
    cta.innerHTML =
      '<section class="pb-16">' +
        '<div class="container-site"><div class="card flex flex-col items-start gap-4 bg-teal-50/70 p-8 sm:flex-row sm:items-center sm:justify-between">' +
          "<div><p class=\"text-lg font-bold text-navy-900\">Not sure what you need?</p>" +
          '<p class="mt-1 text-sm text-navy-600">Tell us your concern and we\'ll recommend the right treatment — no obligation.</p></div>' +
          '<div class="flex flex-wrap gap-3"><a href="appointment.html" class="btn btn-primary">Book an Appointment</a>' +
          '<a href="' + site.waLink(site.WA_MSG) + '" target="_blank" rel="noopener" class="btn btn-outline px-4 py-2 text-xs">Ask on WhatsApp</a></div>' +
        "</div></div>" +
      "</section>";
  }
};
/* Patient Information page. */

window.renderPatientInfo = function () {
  var site = window.site;
  var C = site.C;
  var esc = site.esc;
  var info = C.PATIENT_INFO || {};
  var sections = info.sections || [];

  site.injectSEO({
    title: "Patient Information | " + site.NAME + " | Dentist in " + site.CITY + ", " + site.STATE,
    description:
      "Everything you need to know before your visit to " + site.NAME + " in " + site.CITY +
      " — first visit, what to bring, insurance and billing, and dental emergencies."
  });

  var root = document.getElementById("patient-root");
  if (!root) return;

  root.innerHTML =
    '<section class="py-10 sm:py-14">' +
      '<div class="container-site">' +
        '<nav aria-label="Breadcrumb" class="text-xs text-navy-500"><a href="index.html" class="hover:text-teal-700">Home</a> / <span aria-current="page">Patient Information</span></nav>' +
        '<div class="mt-4 max-w-2xl">' +
          '<h1 class="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Patient Information</h1>' +
          (info.intro ? '<p class="mt-3 text-navy-600">' + esc(info.intro) + "</p>" : "") +
        "</div>" +

        '<div class="mt-8 grid gap-6 md:grid-cols-2">' +
          sections.map(function (s, i) {
            return (
              '<div class="card p-6">' +
                '<div class="flex items-center gap-3">' +
                  '<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700" aria-hidden="true">' + (i + 1) + "</span>" +
                  "<h2 class=\"text-lg font-bold text-navy-900\">" + esc(s.title) + "</h2>" +
                "</div>" +
                "<p class=\"mt-3 text-sm leading-relaxed text-navy-600\">" + esc(s.body) + "</p>" +
                (s.bullets && s.bullets.length ?
                  '<ul class="mt-3 space-y-2">' +
                    s.bullets.map(function (b) {
                      return '<li class="flex gap-2.5 text-sm leading-relaxed text-navy-600"><span class="mt-0.5 shrink-0 text-teal-700">' + site.svgIcon("check", "h-4 w-4") + "</span>" + esc(b) + "</li>";
                    }).join("") +
                  "</ul>" : "") +
              "</div>"
            );
          }).join("") +
        "</div>" +

        '<div class="mt-10"><div class="card flex flex-col items-start gap-4 bg-teal-50/70 p-8 sm:flex-row sm:items-center sm:justify-between">' +
          "<div><p class=\"text-lg font-bold text-navy-900\">Still have a question?</p>" +
          "<p class=\"text-sm text-navy-600\">Our front desk staff is happy to help before your visit.</p></div>" +
          '<div class="flex flex-wrap gap-3">' +
            '<a href="appointment.html" class="btn btn-primary">Book a Visit</a>' +
            '<a href="' + site.telHref(site.PHONE) + '" class="btn btn-outline" aria-label="Call clinic">' + site.svgIcon("phone", "h-4 w-4") + " " + esc(site.PHONE_DISP) + "</a>" +
          "</div></div></div>" +
      "</div>" +
    "</section>";
};
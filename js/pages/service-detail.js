/* Individual service detail page.
   Reads ?service=<slug> from the URL and shows full info for that service. */

window.renderServiceDetail = function () {
  var site = window.site;
  var C = site.C;
  var esc = site.esc;
  var services = C.SERVICES || [];

  var slug;
  try { slug = new URLSearchParams(location.search).get("service") || ""; }
  catch (e) { slug = (location.search.match(/service=([^&]+)/) || [])[1] || ""; }

  var service = services.filter(function (s) {
    return s.slug === slug || s.name.toLowerCase() === decodeURIComponent(slug).toLowerCase();
  })[0];

  var root = document.getElementById("service-root");
  if (!root) return;

  if (!service) {
    root.innerHTML =
      '<section class="py-20"><div class="container-site max-w-xl text-center">' +
        '<h1 class="text-2xl font-bold text-navy-900">Service not found</h1>' +
        '<p class="mt-3 text-navy-600">We couldn\'t find the service you were looking for.</p>' +
        '<a href="services.html" class="btn btn-primary mt-6">Browse all services</a>' +
      "</div></section>";
    return;
  }

  site.injectSEO({
    title: service.name + " in " + site.CITY + " | " + site.NAME,
    description: service.shortDescription + " " + site.NAME + " — " + site.CITY + ", " + site.STATE + "."
  });

  var other = services.filter(function (s) { return s.slug !== service.slug; });

  function bulletList(items, heading) {
    return (
      '<div>' +
        "<h3 class=\"text-base font-bold text-navy-900\">" + heading + "</h3>" +
        '<ul class="mt-3 space-y-2">' +
          items.map(function (i) {
            return '<li class="flex gap-2.5 text-sm leading-relaxed text-navy-600"><span class="mt-0.5 shrink-0 text-teal-700">' + site.svgIcon("check", "h-4 w-4") + "</span>" + esc(i) + "</li>";
          }).join("") +
        "</ul>" +
      "</div>"
    );
  }

  root.innerHTML =
    '<section class="py-10 sm:py-14">' +
      '<div class="container-site">' +
        '<nav aria-label="Breadcrumb" class="text-xs text-navy-500"><a href="index.html" class="hover:text-teal-700">Home</a> / <a href="services.html" class="hover:text-teal-700">Services</a> / <span aria-current="page">' + esc(service.name) + "</span></nav>" +

        '<div class="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">' +
          "<div>" +
            '<h1 class="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">' + esc(service.name) + "</h1>" +
            '<p class="mt-2 max-w-2xl text-lg font-medium text-teal-700">' + esc(service.shortDescription) + "</p>" +
            '<img src="' + esc(service.image || "images/services/" + service.slug + ".jpg") + '" alt="' + esc(service.name) + '" class="mt-6 aspect-[16/9] w-full rounded-2xl object-cover shadow" loading="lazy">' +
            '<div class="mt-8 space-y-2 text-navy-700 leading-relaxed">' +
              service.detailedDescription.split("\n\n").map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
            "</div>" +
            '<div class="mt-10 space-y-8">' +
              (service.benefits && service.benefits.length ? bulletList(service.benefits, "Benefits of this treatment") : "") +
              (service.whoNeedsIt ? '<div><h3 class="text-base font-bold text-navy-900">Who needs it?</h3><p class="mt-3 text-sm leading-relaxed text-navy-600">' + esc(service.whoNeedsIt) + "</p></div>" : "") +
              (service.aftercare && service.aftercare.length ? bulletList(service.aftercare, "Aftercare instructions") : "") +
            "</div>" +
          "</div>" +

          '<aside class="lg:sticky lg:top-24 lg:self-start">' +
            '<div class="card p-6">' +
              '<h2 class="text-lg font-bold text-navy-900">Book this treatment</h2>' +
              '<p class="mt-2 text-sm text-navy-600">Reserve a convenient time for ' + esc(service.name) + " with our team.</p>" +
              '<div class="mt-5 flex flex-col gap-3">' +
                '<a href="appointment.html?service=' + esc(service.slug) + '" class="btn btn-primary">Book Appointment</a>' +
                '<a href="' + site.waLink("Hello, I would like to book: " + service.name + " at " + site.NAME + ".") + '" target="_blank" rel="noopener" class="btn btn-outline">Ask on WhatsApp</a>' +
              "</div>" +
              '<hr class="my-6 border-navy-100">' +
              "<h3 class=\"text-sm font-bold text-navy-900\">Clinic timings</h3>" +
              '<ul class="mt-2 text-sm">' + site.timingRows() + "</ul>" +
              '<a href="' + site.mapsLink() + '" target="_blank" rel="noopener" class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800">' + site.svgIcon("map", "h-4 w-4") + " Get directions</a>" +
            "</div>" +
            (service.faqs && service.faqs.length ?
              '<div class="card mt-6 p-6"><h3 class="text-base font-bold text-navy-900">Questions about this treatment</h3>' +
                '<div class="mt-4 space-y-2">' +
                  service.faqs.map(function (f, i) { return site.faqItem(f.q, f.a, "svc-" + i); }).join("") +
                "</div>" +
              "</div>" : "") +
          "</aside>" +
        "</div>" +

        (other.length ?
          '<div class="mt-16"><h2 class="section-title">Other services</h2>' +
            '<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">' +
              other.slice(0, 3).map(site.serviceCard).join("") +
            "</div>" +
          "</div>" : "") +
      "</div>" +
    "</section>";
};
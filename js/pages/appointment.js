/* Appointment / Contact page.
   Two no-cost booking options, both always available on the page:
     - WhatsApp: builds a pre-filled message and opens WhatsApp (default)
     - Static form: POSTs to APPOINTMENT_FORM_ACTION_URL (Formspree / Google Form)
   Which one the form submit uses is chosen by APPOINTMENT_METHOD in the config. */

window.renderAppointment = function () {
  var site = window.site;
  var C = site.C;
  var esc = site.esc;
  var services = C.SERVICES || [];

  site.injectSEO({
    title: "Book an Appointment | " + site.NAME + " | Dentist in " + site.CITY + ", " + site.STATE,
    description:
      "Book your dental appointment at " + site.NAME + " in " + site.CITY + ". " +
      "Choose your preferred date and time — we confirm by call or WhatsApp. " +
      "Call " + site.PHONE_DISP + "."
  });

  // Pre-select a service if linked from a service page (?service=slug).
  var preService = "";
  try { preService = new URLSearchParams(location.search).get("service") || ""; }
  catch (e) { preService = (location.search.match(/service=([^&]+)/) || [])[1] || ""; }

  var root = document.getElementById("appointment-root");
  if (!root) return;

  var serviceOptions = ['<option value="">Select a service (optional)</option>']
    .concat(services.map(function (s) {
      var sel = s.slug === preService ? " selected" : "";
      return '<option value="' + esc(s.name) + '"' + sel + ">" + esc(s.name) + "</option>";
    }))
    .join("");

  var slots = (C.APPOINTMENT_SLOTS || ["Morning", "Afternoon", "Evening"]).map(function (t) {
    return '<option>' + esc(t) + "</option>";
  }).join("");

  var method = C.APPOINTMENT_METHOD === "form" ? "form" : "whatsapp";
  var activeNote = method === "form"
    ? "Send your request securely through the form below — we\'ll confirm on WhatsApp or call."
    : "Submit the form and it will open WhatsApp with your request pre-filled — we\'ll confirm your slot.";

  root.innerHTML =
    '<section class="py-10 sm:py-14">' +
      '<div class="container-site">' +
        '<nav aria-label="Breadcrumb" class="text-xs text-navy-500"><a href="index.html" class="hover:text-teal-700">Home</a> / <span aria-current="page">Appointment</span></nav>' +
        '<div class="mt-4 max-w-2xl">' +
          '<h1 class="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Book an Appointment</h1>' +
          '<p class="mt-3 text-navy-600">Tell us when you\'d like to come and what you need — our team will confirm your slot quickly. ' + activeNote + "</p>" +
        "</div>" +

        '<div class="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">' +

          /* ----- Booking form ----- */
          '<div class="card p-6 sm:p-8">' +
            '<h2 class="text-lg font-bold text-navy-900">Request an appointment</h2>' +
            '<form id="appointment-form" class="mt-5 grid gap-5 sm:grid-cols-2" novalidate>' +

              "<div><label class=\"field-label\" for=\"f-name\">Full name *</label>" +
              '<input id="f-name" name="name" type="text" required autocomplete="name" class="field-input" placeholder="Your name"></div>' +

              "<div><label class=\"field-label\" for=\"f-phone\">Phone number *</label>" +
              '<input id="f-phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel" class="field-input" placeholder="+91 98765 43210"></div>' +

              "<div><label class=\"field-label\" for=\"f-date\">Preferred date</label>" +
              '<input id="f-date" name="date" type="date" class="field-input"></div>' +

              "<div><label class=\"field-label\" for=\"f-time\">Preferred time</label>" +
              '<select id="f-time" name="time" class="field-input">' + slots + "</select></div>" +

              '<div class="sm:col-span-2"><label class="field-label" for="f-service">Service needed</label>' +
              '<select id="f-service" name="service" class="field-input">' + serviceOptions + "</select></div>" +

              '<div class="sm:col-span-2"><label class="field-label" for="f-concern">Briefly describe your concern <span class="font-normal text-navy-400">(optional)</span></label>' +
              '<textarea id="f-concern" name="concern" rows="3" class="field-input" placeholder="e.g. Tooth pain since 2 days"></textarea></div>' +

              '<p class="sm:col-span-2 text-xs text-navy-500">Your details will be used only to contact you regarding your appointment.</p>' +

              '<div class="sm:col-span-2 flex flex-col gap-3 sm:flex-row">' +
                '<button type="submit" class="btn btn-primary flex-1">' + (method === "form" ? "Send Request" : "Book on WhatsApp") + "</button>" +
                '<a href="' + site.telHref(site.PHONE) + '" class="btn btn-outline"><span class="hidden sm:inline">Call us instead</span><span class="sm:hidden">Call now</span></a>' +
              "</div>" +

              '<div id="form-result" role="status" aria-live="polite" class="sm:col-span-2"></div>' +
            "</form>" +
          "</div>" +

          /* ----- Contact side panel + map ----- */
          '<div class="space-y-6">' +
            '<div class="card p-6">' +
              "<h2 class=\"text-lg font-bold text-navy-900\">Contact details</h2>" +
              '<div class="mt-4">' + site.contactStrip() + "</div>" +
            "</div>" +

            (C.GOOGLE_MAPS_EMBED_URL ?
              '<div class="card overflow-hidden p-0">' +
                '<iframe class="h-72 w-full border-0" title="Clinic location map" src="' + esc(C.GOOGLE_MAPS_EMBED_URL) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
              "</div>" : "") +
          "</div>" +

        "</div>" +
      "</div>" +
    "</section>";

  /* ----- Form behaviour ----- */
  var form = document.getElementById("appointment-form");
  var result = document.getElementById("form-result");
  var today = new Date().toISOString().split("T")[0];
  var dateInput = document.getElementById("f-date");
  if (dateInput) dateInput.setAttribute("min", today);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var name = document.getElementById("f-name").value.trim();
    var phone = document.getElementById("f-phone").value.trim();
    var date = document.getElementById("f-date").value || "Flexible";
    var time = document.getElementById("f-time").value || "As available";
    var service = document.getElementById("f-service").value || "General consultation";
    var concern = document.getElementById("f-concern").value.trim() || "—";

    function showResult(html) { if (result) result.innerHTML = html; }
    function showError(msg) {
      showResult('<p class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">' + msg + "</p>");
    }

    if (method === "form") {
      /* Static form branch (Formspree / Google Forms) */
      var action = C.APPOINTMENT_FORM_ACTION_URL;
      if (!action || action.indexOf("yourFormId") !== -1) {
        showError("The contact form is not connected yet. Please add your Formspree/Google form link in clinic-config.js (APPOINTMENT_FORM_ACTION_URL), or use the WhatsApp button instead.");
        return;
      }
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.textContent = "Sending…";
      fetch(action, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "New appointment request — website",
          name: name, phone: phone, date: date, time: time,
          service: service, concern: concern
        })
      })
      .then(function (res) {
        if (res.ok) {
          showResult('<p class="rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-800">Thank you, ' + esc(name) + "! Your request was sent. Our team will contact you shortly to confirm your appointment.</p>");
          form.reset();
        } else {
          showError("Something went wrong. Please try again, or message us on WhatsApp.");
        }
        btn.disabled = false; btn.textContent = "Send Request";
      })
      .catch(function () {
        showError("Could not reach the form service. Please try again, or book directly on WhatsApp.");
        btn.disabled = false; btn.textContent = "Send Request";
      });
    } else {
      /* WhatsApp branch */
      var message = (C.WHATSAPP_BOOKING_TEMPLATE || "")
        .replace("{name}", name)
        .replace("{date}", date)
        .replace("{time}", time)
        .replace("{service}", service)
        .replace("{concern}", concern)
        .replace(/\{clinic_name\}/gi, C.CLINIC_NAME || "");
      window.open(site.waLink(message), "_blank", "noopener");
      showResult('<p class="rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-800">WhatsApp opened with your request. If it didn\'t open, send it from your browser — then press "Send".</p>');
    }
  });
};
/*
 * ============================================================================
 *  clinic-config.js  —  THE ONLY FILE YOU NEED TO EDIT
 * ============================================================================
 *  This file holds ALL of your clinic's content. Every page of the website
 *  reads its content from this file. To update your website (phone number,
 *  address, services, FAQs, etc.), edit this file and re-upload it to your
 *  hosting. You never need to touch the HTML, CSS or JS files.
 *
 *  HOW TO EDIT:
 *   - Replace the placeholder values below with your real information.
 *   - Keep the quotes around text values:  CLINIC_NAME: "My Clinic"
 *   - Use commas between items. Watch out: the last item in a list has no comma.
 *   - Keep at least the example structure — just change the text inside.
 *
 *  After editing, visit any page. Open the website again (or refresh).
 *  No build step or re-deploy is needed for content only — the site reads
 *  this file directly in the browser.
 * ============================================================================
 */

window.CLINIC_CONFIG = {

  /* ------------------------------------------------------------------ *
   *  1. BASIC CLINIC INFORMATION                                        *
   * ------------------------------------------------------------------ */

  // Full clinic name shown in the header, footer and page titles.
  CLINIC_NAME: "Shree Dental clinic",

  // One short line shown under the clinic name in the header.
  CLINIC_TAGLINE: "Gentle, modern & trusted dental care",

  // 1–2 sentence introduction about the clinic (used on Home and About).
  CLINIC_INTRO:
    "Your Dental Clinic is a modern, family-friendly dental clinic offering gentle, " +
    "affordable and high-quality dental care. From routine check-ups to complete smile " +
    "makeovers, our experienced team uses the latest equipment to keep your teeth " +
    "healthy and your smile bright.",

  // City and State are used everywhere: hero text, SEO titles, contact strip, footer.
  CITY: "Your City",
  STATE: "Your State",

  // Door/street address (shown in the footer and on the contact/appointment page).
  CLINIC_ADDRESS: "Shop / Lane / Building No., Main Road, Your Area",

  // 6-digit PIN code (used in structured data / map fallback).
  PINCODE: "000000",

  /* ------------------------------------------------------------------ *
   *  2. DOCTOR / TEAM                                                  *
   * ------------------------------------------------------------------ */

  // Doctor's full name with title.
  DOCTOR_NAME: "Dr. Your Name",

  // Degrees / qualifications as shown on the website.
  DOCTOR_QUALIFICATIONS: "BDS, MDS – Orthodontics and Dentofacial Orthopedics",

  // How many years of experience (text, so you can write "12+").
  EXPERIENCE: "12+ years",

  // A short 2–4 paragraph biography of the doctor.
  DOCTOR_BIO: [
    "Dr. Your Name is a qualified dental surgeon with 12+ years of experience in " +
    "general, cosmetic and orthodontic dentistry. They hold a Master's degree in " +
    "Orthodontics and have completed advanced training in modern dental treatments, " +
    "including digital smile design and painless dentistry techniques.",

    "Known for a gentle, patient-first approach, Dr. Your Name believes in " +
    "explaining every treatment clearly, using the least invasive options, and " +
    "making every visit comfortable — especially for children and nervous patients.",

    "The doctor regularly attends continuing education programs to stay updated " +
    "with the latest dental technology and procedures, so patients always receive " +
    "up-to-date, ethical and safe treatment."
  ],

  // Optional memberships / certifications (plain text, shown on About page).
  // Fill with your REAL memberships only. Do not invent certifications.
  DOCTOR_MEMBERSHIPS: [],

  // Facilities / equipment highlights (shown on the About page).
  // Add or remove items freely. Keep each item short.
  FACILITIES: [
    "Digital X-ray & intraoral camera",
    "Fully sterilised operatories",
    "Painless / single-visit RCT",
    "Kids-friendly environment",
    "Separate sterilisation room",
    "Comfortable waiting lounge"
  ],

  // Numbers shown on the About page as a stats bar. Use REAL figures —
  // these are examples that you should replace before going live.
  STATS: [
    { value: "15+", label: "Years of experience" },
    { value: "50000+", label: "Happy patients" },
    { value: "15+", label: "Treatments offered" },
    
  ],

  // Public clinic contact email.
  EMAIL: "hello@yourclinic.com",

  // Phone number shown on the site. Use international format for calls; the
  // browser converts it into a click-to-call link.
  PHONE_NUMBER: "+91-0000000000",

  // Number used for WhatsApp (with country code, no "+", e.g. "91900000000").
  // Placeholder format is shown with dashes; remove them or keep them —
  // the site cleans them automatically.
  WHATSAPP_NUMBER: "+91-0000000000",

  // Optional: a number to display separately from the click-to-call number.
  // Leave empty string "" to just show PHONE_NUMBER.
  PHONE_DISPLAY: "",

  /* ------------------------------------------------------------------ *
   *  3. HOURS & LOCATION                                               *
   * ------------------------------------------------------------------ */

  // Weekly opening hours. Add or remove rows as needed.
  CLINIC_TIMINGS: [
    { days: "Monday – Saturday", hours: "10:00 AM – 2:00 PM, 5:00 PM – 9:00 PM" },
    { days: "Sunday",            hours: "By appointment" }
  ],

  // Link to your clinic on Google Maps. Either a "share" link or, if you have
  // a Google Business Profile, the direct link. The map icon uses this.
  GOOGLE_MAPS_LINK: "https://www.google.com/maps/search/?api=1&query=Your+Dental+Clinic+Your+City",

  // Deep URL used to embed a map on the front page / contact page.
  // How to get it: open Google Maps > search your clinic > Share > Copy link,
  // then paste it in a browser address bar, find the "output=embed" version.
  // If left blank, no map box is shown (the "Open in Maps" link still works).
  GOOGLE_MAPS_EMBED_URL: "",

  // Google reviews / Google Business Profile link (for the "Review us" links).
  // On Google Maps, click "Write a review" and copy that URL here.
  GOOGLE_REVIEWS_LINK: "https://www.google.com/maps/search/?api=1&query=Your+Dental+Clinic+reviews",

  /* ------------------------------------------------------------------ *
   *  4. SOCIAL MEDIA (optional)                                        *
   * ------------------------------------------------------------------ */

  INSTAGRAM_LINK: "",
  FACEBOOK_LINK: "",

  /* ------------------------------------------------------------------ *
   *  5. APPOINTMENT SETTINGS                                           *
   * ------------------------------------------------------------------ */

  // How the appointment form sends your request. Two no-cost options:
  //   "whatsapp"  - Form opens WhatsApp with a pre-filled message
  //                 (no account or setup needed, uses WHATSAPP_NUMBER above)
  //   "form"      - Form posts to a free Google Form / Formspree address
  //                 (set APPOINTMENT_FORM_ACTION_URL below)
  APPOINTMENT_METHOD: "whatsapp",

  // Used only when APPOINTMENT_METHOD is "form".
  // Get a free one at https://formspree.io (free tier) and paste the address,
  // OR use a Google Form: create a form, open "Pre-filled link"/Form response
  // collection, and use its action URL (advanced).
  APPOINTMENT_FORM_ACTION_URL: "https://formspree.io/f/yourFormId",

  // Time slots offered in the appointment form.
  APPOINTMENT_SLOTS: [
    "Morning (10:00 AM – 12:00 PM)",
    "Afternoon (12:00 PM – 2:00 PM)",
    "Evening (5:00 PM – 7:00 PM)",
    "Night (7:00 PM – 9:00 PM)"
  ],

  // The WhatsApp message template used for booking. {placeholders} are
  // replaced automatically with the visitor's form inputs.
  WHATSAPP_BOOKING_TEMPLATE:
    "Hello, I would like to book an appointment at your clinic.\n\n" +
    "Name: {name}\n" +
    "Preferred date: {date}\n" +
    "Preferred time: {time}\n" +
    "Service: {service}\n" +
    "Brief concern: {concern}\n\n" +
    "Please confirm a convenient slot. Thank you!",

  /* ------------------------------------------------------------------ *
   *  6. IMAGES                                                         *
   * ------------------------------------------------------------------ *
   *  Paths are inside the /images/ folder. The website ships with simple
   *  grey placeholder images with the SAME file names. To put your real
   *  photos up, just replace the files in the images/ folder keeping the
   *  same names — no code changes needed.
   * ------------------------------------------------------------------ */

  IMAGES: {
    // Large hero banner (recommended 1920x1080). The shipped placeholder files
    // are .svg; when you add real photos you may use .jpg/.webp — just update
    // the path here (keep the leading "images/").
    hero: "images/hero.svg",
    // Photo of the clinic building / exterior.
    clinicExterior: "images/clinic-exterior.svg",
    // Reception / waiting area photo.
    reception: "images/reception.svg",
    // Treatment / operation room photo.
    treatmentRoom: "images/treatment-room.svg",
    // Doctor's profile photo (recommended portrait 900x1100).
    dentist: "images/dentist.svg"
  },

  // Short alt-text descriptions for key images (used for SEO/accessibility).
  IMAGE_ALTS: {
    hero: "Bright and clean dental treatment room",
    clinicExterior: "Entrance of the dental clinic",
    reception: "Reception area of the dental clinic",
    treatmentRoom: "Modern dental treatment chair and equipment",
    dentist: "Portrait of the dentist"
  },

  /* ------------------------------------------------------------------ *
   *  7. WHY CHOOSE US  (exactly 4 items, shown on Home & About)        *
   * ------------------------------------------------------------------ *
   *  icon can be one of: tooth, smile, heart, shield, clock, star,
   *  team, sparkle, hand  (a small matching icon is drawn automatically)
   * ------------------------------------------------------------------ */

  WHY_CHOOSE_US: [
    {
      icon: "hand",
      title: "Gentle & Painless Treatment",
      description:
        "We use modern, gentle techniques and local anaesthesia so your treatment is as comfortable and stress-free as possible."
    },
    {
      icon: "shield",
      title: "Strict Hygiene & Safety",
      description:
        "Every instrument is sterilised through multiple steps and single-use kits are used wherever possible. Your safety comes first."
    },
    {
      icon: "sparkle",
      title: "Transparent Pricing",
      description:
        "Clear treatment plans and honest cost estimates before we begin. No hidden charges, no surprises at the desk."
    },
    {
      icon: "clock",
      title: "Flexible & On-Time Appointments",
      description:
        "Convenient morning and evening slots, and we respect your time by running appointments on schedule."
    }
  ],

  /* ------------------------------------------------------------------ *
   *  8. SERVICES  (you can add or remove services freely)              *
   * ------------------------------------------------------------------ *
   *  Each service card + a detail page are generated automatically.
   *  slug: a short url-friendly name (letters, numbers and dashes only).
   *  faqs: 2–4 questions about that specific treatment.
   * ------------------------------------------------------------------ */

  SERVICES: [
    {
      slug: "dental-checkup-and-cleaning",
      name: "Dental Check-up & Cleaning",
      shortDescription:
        "A thorough check-up with professional scaling and polishing to prevent cavities and gum problems.",
      detailedDescription:
        "A regular dental check-up is the foundation of good oral health. We examine your teeth, gums and bite, take digital X-rays where needed, and professionally remove plaque and tartar that brushing cannot reach. Scaling and polishing is followed by fluoride application to make your enamel stronger. Regular visits help catch small issues early — when they are far easier and cheaper to treat.",
      benefits: [
        "Removes plaque, tartar and surface stains",
        "Prevents cavities, bad breath and gum disease",
        "Early detection of hidden problems with digital X-rays",
        "Polished, fresh feeling and a brighter smile"
      ],
      whoNeedsIt: "Everyone aged 6 and above should get a check-up and cleaning at least once every 6 months — even if you have no pain or visible problems.",
      aftercare: [
        "Avoid hot or hard foods for a few hours if sensitivity occurs",
        "Brush twice daily with a soft-bristle brush and floss once a day",
        "Use a desensitising toothpaste if teeth feel sensitive",
        "Keep your next 6-monthly appointment"
      ],
      image: "images/services/dental-checkup-and-cleaning.png",
      faqs: [
        { q: "Does scaling and polishing hurt?", a: "Usually not. Most patients feel only mild vibration. We use modern ultrasonic scalers and can apply a numbing gel if you feel sensitive." },
        { q: "How often should I visit the dentist?", a: "Every 6 months is ideal for most people. If you have gum disease or a higher risk of cavities, we may recommend 3–4 monthly visits." },
        { q: "Is scaling bad for my teeth?", a: "No. Professional scaling only removes deposit build-up. Done properly, it protects your teeth and gums and does not damage enamel." }
      ]
    },
    {
      slug: "teeth-whitening",
      name: "Teeth Whitening",
      shortDescription:
        "Safe, in-clinic whitening to lift stains and brighten your smile by several shades.",
      detailedDescription:
        "Teeth whitening removes deep stains caused by tea, coffee, tobacco and ageing. In-clinic whitening applies a professional whitening gel activated by a special light, usually in a single 45–60 minute session. We first clean your teeth, then protect your gums and apply the gel. You will see several shades of improvement immediately, with results lasting months when good habits are followed.",
      benefits: [
        "Visibly whiter smile in a single sitting",
        "Done safely under dental supervision",
        "Gum protection and customised strength for sensitive teeth",
        "Long-lasting results with simple home care"
      ],
      whoNeedsIt: "Anyone unhappy with the colour of their teeth due to food, drink, smoking or natural ageing. It is cosmetic and not a medical necessity.",
      aftercare: [
        "Avoid coffee, tea, red wine, tobacco and dark foods for 48 hours",
        "Brush with the provided desensitising paste for a few days",
        "Use a straw for colourful drinks if possible",
        "Touch-ups after 6–12 months may be advised to maintain the shade"
      ],
      image: "images/services/teeth-whitening.jpg",
      faqs: [
        { q: "Is teeth whitening safe?", a: "Yes when performed by a dental professional. We protect your gums and use controlled-strength gels suitable for your enamel." },
        { q: "Will whitening damage sensitive teeth?", a: "Some temporary sensitivity is common and settles within 1–2 days. We provide a desensitising paste to manage it." },
        { q: "How long do results last?", a: "Typically 6–12 months, depending on your food, drink and smoking habits. Avoiding stains keeps the result for longer." }
      ]
    },
    {
      slug: "root-canal-treatment",
      name: "Painless Root Canal Treatment",
      shortDescription:
        "Save a badly decayed or infected tooth with modern, usually single-visit, painless root canal treatment.",
      detailedDescription:
        "When decay or injury reaches the nerve inside a tooth, the tooth becomes infected and painful. A root canal removes the infected pulp, cleans and seals the root canals, and saves the natural tooth — avoiding extraction. Using rotary instruments, magnification and modern anaesthesia, the procedure is usually completed comfortably, often in a single visit. A crown is generally recommended afterwards to protect the tooth.",
      benefits: [
        "Relieves pain and saves your natural tooth",
        "Usually completed in 1–2 comfortable visits",
        "No need to remove the tooth or get a bridge/implant later",
        "Modern single-visit rotary RCT technique"
      ],
      whoNeedsIt: "Patients with deep decay, severe toothache, sensitivity to hot/cold, a cracked tooth, or infection seen on X-ray.",
      aftercare: [
        "Wait for numbness to wear off before eating",
        "Chew on the other side until the crown is placed",
        "Keep the area clean — gentle brushing and rinsing",
        "Book follow-up appointments as advised"
      ],
      image: "images/services/root-canal-treatment.png",
      faqs: [
        { q: "Is root canal treatment painful?", a: "With modern anaesthesia, most patients feel little to no pain during the procedure. Any soreness after settles in a couple of days." },
        { q: "Why do I need a crown after RCT?", a: "After a root canal a tooth becomes brittle. A crown protects it from fracturing and restores full chewing strength." },
        { q: "Can a root canal tooth fail later?", a: "Rarely, if re-infection occurs. Good oral hygiene and regular check-ups minimise this risk. Most root-treated teeth last for many years." }
      ]
    },
    {
      slug: "braces-and-aligners",
      name: "Braces & Clear Aligners",
      shortDescription:
        "Straighten crooked or crowded teeth with metal braces or discreet clear aligners.",
      detailedDescription:
        "Crooked, crowded or uneven teeth are corrected with orthodontic treatment. We offer both traditional metal braces and clear removable aligners. After a full examination and digital records, we plan the movement of your teeth over the treatment period. Clear aligners are nearly invisible, removable for eating and cleaning, and popular with teens and adults. Treatment length varies from a few months to a couple of years depending on the case.",
      benefits: [
        "Straight, well-aligned teeth that are easier to clean",
        "Choice of metal braces or invisible clear aligners",
        "Improved bite, chewing and reduced wear of teeth",
        "A confident smile and face profile"
      ],
      whoNeedsIt: "Teenagers and adults with crooked, crowded or gapped teeth, a bad bite, or jaw alignment concerns.",
      aftercare: [
        "Brush after every meal and clean braces/aligners daily",
        "Avoid hard, sticky and sugary foods with braces",
        "Wear aligners 20–22 hours a day as instructed",
        "Keep all adjustment visits without fail"
      ],
      image: "images/services/braces-and-aligners.jpg",
      faqs: [
        { q: "What is the best age for braces?", a: "An orthodontic evaluation is best around age 7–9, but adults can be treated successfully at any age if gums and bone are healthy." },
        { q: "Are clear aligners better than metal braces?", a: "Aligners are discreet and removable, but suitability depends on your case. We examine and recommend the most effective option for you." },
        { q: "Is treatment painful?", a: "There is mild soreness for a few days after each adjustment, which settles quickly. Routine painkillers usually manage it." }
      ]
    },
    {
      slug: "dental-implants",
      name: "Dental Implants",
      shortDescription:
        "Permanent, natural-looking replacement for missing teeth using titanium implants.",
      detailedDescription:
        "A dental implant is a small titanium post placed into the jawbone that acts like a natural tooth root. After it fuses with the bone, a custom crown is attached. Implants look, feel and function like natural teeth and are the most durable long-term solution for missing teeth — far better for your health than a bridge that requires grinding the neighbouring teeth.",
      benefits: [
        "Looks and functions like your natural tooth",
        "Prevents bone loss where the tooth is missing",
        "No grinding or damage to adjacent healthy teeth",
        "Permanent solution — can last decades with good care"
      ],
      whoNeedsIt: "Anyone with one or more missing teeth who wants a permanent replacement, provided they have adequate bone and healthy gums.",
      aftercare: [
        "Maintain strict oral hygiene around the implant",
        "Avoid hard or chewy food right after placement",
        "Attend all healing and crown-fitting visits",
        "Brush and floss carefully; regular 6-monthly check-ups"
      ],
      image: "images/services/dental-implants.jpg",
      faqs: [
        { q: "Are implants painful?", a: "Placed under local anaesthesia, the procedure is usually comfortable. Mild soreness for a few days after is normal and settles with medication." },
        { q: "How long do implants last?", a: "With good oral hygiene and regular check-ups, implants can last 20+ years or a lifetime." },
        { q: "Am I a candidate for implants?", a: "Most healthy adults are. The dentist evaluates your bone and gums with an X-ray before deciding the best option." }
      ]
    },
    {
      slug: "kids-dentistry",
      name: "Kids Dentistry",
      shortDescription:
        "Friendly, gentle dental care for children — from first tooth to teens.",
      detailedDescription:
        "Children need special care and a friendly first visit. We make dental visits fun and non-scary, and teach kids how to brush properly. Services include fluoride application, pit and fissure sealants to prevent cavities, fillings, and habit counselling for thumb-sucking or early alignment issues. Starting early builds a lifetime of healthy, cavity-free smiles.",
      benefits: [
        "Gentle, fear-free care that children enjoy",
        "Prevents cavities with fluoride and sealants",
        "Early advice on brushing, diet and habits",
        "Monitoring of jaw and teeth growth"
      ],
      whoNeedsIt: "Children from their first tooth or first birthday onwards, and especially before starting school.",
      aftercare: [
        "Help children brush twice daily until age 7–8",
        "Limit sugary drinks and sweets between meals",
        "Bring your child every 6 months for a check-up",
        "Celebrate each visit so it stays a positive experience"
      ],
      image: "images/services/kids-dentistry.jpg",
      faqs: [
        { q: "At what age should a child first see the dentist?", a: "Ideally by their first birthday or when the first tooth appears — whichever comes first." },
        { q: "How do I prepare my child for the visit?", a: "Keep it positive and simple — say a dentist will count their teeth and make them shiny. Avoid words like pain or injection." },
        { q: "Is it normal for kids to be afraid?", a: "Very common, and our team is trained to handle it gently. Regular short visits help fear fade quickly." }
      ]
    },
    {
      slug: "crowns-and-bridges",
      name: "Crowns & Bridges",
      shortDescription:
        "Durable caps and bridges that restore broken, decayed or missing teeth.",
      detailedDescription:
        "A crown is a tooth-shaped cap that covers a weak, broken or root-treated tooth and restores its strength, shape and appearance. A bridge replaces one or more missing teeth by attaching to the adjacent healthy teeth. We offer metal, metal-ceramic and all-ceramic (tooth-coloured) options made to match your natural teeth, with most crowns fabricated in just a few days.",
      benefits: [
        "Restores strength to weak or broken teeth",
        "Natural, tooth-coloured appearance",
        "Chewing comfort and proper mouth function",
        "Prevents neighbouring teeth from shifting"
      ],
      whoNeedsIt: "Patients with a badly broken or decayed tooth, a completed root canal, or one or more missing teeth.",
      aftercare: [
        "Gently brush around the crown/bridge edges",
        "Avoid very hard foods like ice or betel nut",
        "Use floss threaders to clean under the bridge",
        "Return for check-up so we can verify the fit and gum health"
      ],
      image: "images/services/crowns-and-bridges.jpg",
      faqs: [
        { q: "How long do crowns last?", a: "With good care, crowns typically last 10–15 years or longer. Grinding and poor hygiene can shorten their life." },
        { q: "Will the crown match my teeth colour?", a: "Yes — all-ceramic crowns are custom-shaded to blend with your natural teeth." },
        { q: "Do bridges require grinding my healthy teeth?", a: "The supporting teeth are minimally reshaped to hold the bridge. An implant may be an alternative that avoids touching healthy teeth." }
      ]
    },
    {
      slug: "tooth-extraction",
      name: "Tooth Extraction & Wisdom Tooth Care",
      shortDescription:
        "Safe, comfortable removal of badly damaged teeth and expert wisdom tooth management.",
      detailedDescription:
        "When a tooth is too damaged or decayed to be saved, extraction is the right choice. We perform simple and surgical extractions, including wisdom teeth, under effective local anaesthesia with minimal discomfort. For impacted wisdom teeth we evaluate with X-rays, plan carefully and give you clear aftercare instructions so recovery is smooth and quick.",
      benefits: [
        "Removes the source of pain and infection",
        "Skilled management of complex wisdom teeth",
        "Clear, written aftercare for quick healing",
        "Gentle handling under effective anaesthesia"
      ],
      whoNeedsIt: "Patients with severely decayed or loose teeth, impacted wisdom teeth, orthodontic extractions, or teeth blocking new teeth from erupting.",
      aftercare: [
        "Bite on the gauze for 30–45 minutes to control bleeding",
        "Avoid spitting, rinsing hard or drinking through a straw for 24 hours",
        "Eat soft foods and avoid hot meals on the first day",
        "Take prescribed medicines as directed and avoid smoking for the first week"
      ],
      image: "images/services/tooth-extraction.jpg",
      faqs: [
        { q: "Is tooth extraction painful?", a: "The area is numbed completely before the procedure, so you feel only pressure. Any discomfort after is managed with painkillers." },
        { q: "When can I eat normally after extraction?", a: "Soft foods from day 2, and most people return to normal eating within a week." },
        { q: "Do I need to replace an extracted tooth?", a: "For teeth that help chewing, yes — options include implants, bridges or a removable replacement. We will discuss this with you." }
      ]
    }
  ],

  /* ------------------------------------------------------------------ *
   *  9. TESTIMONIALS  (replace with REAL reviews from your patients)   *
   * ------------------------------------------------------------------ *
   *  ⚠ IMPORTANT: These are sample placeholders. Replace them with real
   *  patient reviews (with patient permission) before going live. Do not
   *  display reviews that have not actually been given.
   * ------------------------------------------------------------------ */

  TESTIMONIALS: [
    {
      name: "Sample Patient 1",
      location: "Your City",
      rating: 5,
      text: "“Very clean clinic and the doctor explains everything patiently. My root canal was completely painless. Highly recommended!”"
    },
    {
      name: "Sample Patient 2",
      location: "Your City",
      rating: 5,
      text: "“Took my kids here for their first check-up and they actually enjoyed it! The team is so friendly and gentle with children.”"
    },
    {
      name: "Sample Patient 3",
      location: "Your City",
      rating: 5,
      text: "“Got my teeth whitening done here. The results were amazing and the pricing was very transparent. Great experience overall.”"
    }
  ],

  /* ------------------------------------------------------------------ *
   *  10. GENERAL FAQS  (shown on the Home page)                         *
   * ------------------------------------------------------------------ */

  FAQS: [
    {
      q: "How do I book an appointment?",
      a: "The easiest way is to use the 'Book Appointment' button — it opens WhatsApp with a pre-filled message, or a quick form depending on how we have it set up. You can also simply call us during clinic hours."
    },
    {
      q: "What should I expect on my first visit?",
      a: "Your first visit includes a friendly consultation, a complete dental examination and, if needed, digital X-rays. We then explain your treatment options clearly — with an honest cost estimate — before starting anything."
    },
    {
      q: "Do you treat children and elderly patients?",
      a: "Yes. We provide family dentistry for all age groups, from kids at their first tooth to complete dentures for elderly patients."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept cash, UPI and major credit/debit cards. Detailed cost estimates are always shared before any treatment begins."
    },
    {
      q: "What if I have a dental emergency?",
      a: "For a broken tooth, severe pain or swelling, call us immediately. We prioritise appointments for emergencies during clinic hours and will guide you on what to do immediately."
    }
  ],

  /* ------------------------------------------------------------------ *
   *  11. PATIENT INFORMATION PAGE                                      *
   * ------------------------------------------------------------------ */

  PATIENT_INFO: {

    intro:
      "To make your visit smooth and comfortable, here is everything you need to know " +
      "before, during and after your appointment.",

    sections: [
      {
        title: "Your First Visit",
        body:
          "Your first appointment usually takes 20–40 minutes. We start with a friendly " +
          "conversation about your concerns, then a full dental examination with digital " +
          "X-rays if needed. You will always receive a clear explanation of what we find " +
          "and a written treatment plan with an honest estimate — before any treatment starts."
      },
      {
        title: "What to Bring",
        body: "Bring the following to help us help you:",
        bullets: [
          "A valid photo ID (for your patient record)",
          "Your previous dental records or X-rays, if any",
          "A list of medicines you currently take",
          "Questions you want to ask — we love questions!"
        ]
      },
      
      {
        title: "Dental Emergency?",
        body:
          "For severe toothache, a broken tooth or swelling: rinse gently, apply a cold " +
          "compress, and call us immediately. We reserve time during clinic hours for " +
          "emergencies and will guide you over the phone to manage the pain until you arrive."
      },
      {
        title: "Frequently Asked Questions",
        body:
          "General questions are answered on the Home page FAQ section. For anything else, " +
          "call or message us on WhatsApp — a real member of our team replies during clinic hours."
      }
    ]
  },

  /* ------------------------------------------------------------------ *
   *  12. COPYRIGHT / SITE FOOTNOTE                                    *
   * ------------------------------------------------------------------ */

  SITE_FOOTNOTE: "Gentle dental care for the whole family — {city}.",
  FOOTER_CREDIT: "Designed with care for your practice."
};

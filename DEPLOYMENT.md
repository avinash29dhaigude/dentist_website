# 🚀 Deployment Guide — Dental Clinic Website

This project is **fully static**, so deploying it is the same on almost any
provider: upload the project folder's files and you're live. Nothing needs to
be "built" on the server.

> **Prerequisite on your computer (one time):** if you ever change the code
> (HTML/CSS/JS), run `npm install` then `npm run build` to regenerate
> `css/app.css`. If you only edit `clinic-config.js` or images, no build step
> is needed — the site reads the config file directly.

---

## Part 1 — Generic guide (works on any host)

1. Edit `clinic-config.js` with your real details.
2. Replace placeholder images in `images/` with real photos (keep the file
   names, or update the paths in `clinic-config.js`).
3. Upload **the whole folder** (all `.html` files, `clinic-config.js`,
   `css/`, `js/`, `images/`) to your web space so that `index.html` sits at the
   root (e.g. `public_html/index.html`).
4. Open your domain — you're live. 🎉

The only files a host must serve are the static ones listed above. There is no
`.htaccess` requirement, no Node process, no database, no environment variables.

---

## Part 2 — Guides per provider

### Hostinger or any cPanel shared hosting

1. Log in to your Hostinger panel → **Websites** → **Manage** for your domain
   → **Files** → **File Manager** (or use **hPanel** → Files Manager).
2. Zip the project folder on your computer.
3. Click **Upload** in File Manager and upload the zip inside **`public_html`**.
4. Right-click the zip → **Extract**. You should see the files directly in
   `public_html` (not inside a sub-folder). If they are inside a sub-folder,
   cut/paste them back to `public_html`.
5. Set your domain's document root if needed (hosting → General →
   Document Root: `public_html`).
6. Visit https://yourdomain.com — done.

*Same steps apply to GoDaddy, Bluehost, HostMonster, A2, Namecheap cPanel:
  upload the zip and extract into `public_html`.*

### Vercel

1. `npm i -g vercel`
2. In the project folder: `vercel` → when asked, choose:
   - Framework Preset: **Other**
   - Build Command: leave empty (or `npm run build`)
   - Output Directory: `.` (root)
   - Install Command: `npm install`
3. `vercel --prod` to deploy. Or connect your GitHub repo in the Vercel
   dashboard (Import Project → it auto-detects a static site).

**No paid plan needed.**

### Netlify

1. Go to https://app.netlify.com/drop
2. Drag-and-drop the project folder onto the page. Deployed instantly.
3. (Repo way) In Netlify → Add new site → Import from Git → Build command:
   (leave empty or `npm run build`) → Publish directory: `.`

**No paid plan needed.**

### GitHub Pages

1. Create a repo on GitHub and push this folder to it.
2. Repo **Settings → Pages → Source → Deploy from a branch** → branch `main`
   folder `/ (root)` → Save.
3. In ~1 minute the site is live at `https://<username>.github.io/<repo>/`.

> If the site lives under a sub-path (`/<repo>/`), the links in the header/footer
> work because they are relative paths. The `canonical` URL in each page's
> `<head>` is a placeholder — update it after you know your final URL if you
> care about canonical URLs. (Optional fix: use a custom domain so the site is
> at the root.)

### Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**
   (or **Direct Upload** — drag the folder).
2. For Git: Framework preset **None/Static** → Build command (leave empty) →
   Build output directory `.` → Save & Deploy.
3. Live in about a minute at `https://<project>.pages.dev`.

**No paid plan needed.**

---

## Part 3 — Buying & connecting a custom domain

### Part A — Buy a domain (free/fast way)

- Get one from a registrar: **Cloudflare Registrar** (at-cost, no markup),
  **Namecheap**, **GoDaddy**, **Hostinger**, or **Google Domains**
  (now Squarespace). Prices are typically **~$8–15/year** for `.com`.
- When buying, avoid paid "privacy protection" add-ons — basic registration is
  all you need. You do NOT need hosting from the registrar.

### Part B — Point it at your site

**If your site is on cPanel / Hostinger (or any shared host):**
1. The host provides nameservers (in your hosting panel, e.g.
   `ns1.dns-parking.com`, `ns2.dns-parking.com`).
2. At your registrar, edit the domain's **Name Servers** (NS) to those values.
3. Wait up to 24–48h (usually ~1h) for DNS to propagate. The host's SSL
   (free via Let's Encrypt in cPanel) will be applied automatically when you
   enable it in Cloud.cPanel.

**If your site is on Vercel:**
1. In the Vercel dashboard → your project → **Settings → Domains → Add** —
   type your domain.
2. Vercel shows you DNS records to add at your registrar:
   - `@` (apex) → **A record** to `76.76.21.21`
   - `www` → **CNAME** to `cname.vercel-dns.com`
3. Add those records, wait for DNS to update, then Vercel auto-provisions a
   free SSL certificate (HTTPS).

**If your site is on Netlify:**
1. In Dashboard → **Domain settings → Add a custom domain**.
2. At your registrar add:
   - `@` → **A record** to `75.2.60.5`
   - `www` → **CNAME** to `<your-site>.netlify.app`
3. Netlify auto-issues a free SSL certificate.

**If your site is on GitHub Pages:**
1. Rename the repo to `<username>.github.io` for the domain `<username>.github.io`,
   **or** in **Settings → Pages → Custom domain** add your domain.
2. At your registrar add:
   - `@` → **A records** to `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - `www` → **CNAME** to `<username>.github.io`
3. Check **Enforce HTTPS** in Pages settings after DNS updates.

**If your site is on Cloudflare Pages:**
1. Add the domain in **Pages → project → Custom domains → Set up**
   (Cloudflare guides you to also add the domain to your Cloudflare zone).
2. Follow the on-screen DNS instructions (CNAME to
   `<project>.pages.dev`, plus apex handling).
3. Cloudflare issues free SSL automatically.

> **General tip:** always add BOTH the apex (`yourdomain.com`) and `www`
> (`www.yourdomain.com`) so both work.

---

## Part 4 — Appointment form notifications (STATIC form option)

The site's form only **sends** data; with no backend, use one of these free
services. Both cost nothing.

### Option 1 — Formspree (recommended, easiest)
1. Go to https://formspree.io, create a free account → **New form**
   (name it "Appointment requests").
2. Copy the form **ID / action URL**, e.g. `https://formspree.io/f/abcdwxyz`.
3. In `clinic-config.js`:
   - Set `APPOINTMENT_METHOD: "form"`
   - Paste the URL into `APPOINTMENT_FORM_ACTION_URL`
   - Verify your email so submissions get forwarded to you.
4. Free tier: 50 submissions/month — plenty for most clinics.

### Option 2 — Google Forms (free, unlimited)
1. https://forms.google.com → create a form with matching fields (name,
   phone, date, time, service, concern).
2. Settings → **Collect email addresses**: off (not required).
3. Share → any link is fine; open the form's "Pre-fill" if you want.
4. In `clinic-config.js` set `APPOINTMENT_METHOD: "form"` and paste the form
   link into `APPOINTMENT_FORM_ACTION_URL`. *(The form will submit normally —
   responses collect in your Google Sheet.)*

> With either option, submissions also arrive as normal website reading —
> the form contains only name, phone, date/time, service and a short concern;
> no sensitive medical history is collected.

---

## Part 5 — Optional SEO extras

### Google Search Console (free)
1. Create a free account at https://search.google.com/search-console
2. Add your property (domain or URL prefix).
3. HTML-tag verification: the site supports the `<meta name="google-site-verification">`
   tag — uncomment the placeholder line in each page's `<head>` (or see the note
   at `index.html`) and paste your code.
4. Submit `sitemap.xml` (update the domain first).

### Sitemap & robots.txt
The included `sitemap.xml` and `robots.txt` use a placeholder domain
(`https://www.yourdomain.com`) — edit them to your real domain before/after
going live so search engines index the right URLs.

### Local SEO keywords (already built in)
Page titles and descriptions automatically include your clinic name, city and
state, e.g. *"Trusted Dentist in Your City"* — set `CITY`/`STATE` correctly and
they update on every page.

---

## Part 6 — Moving to a production-grade CSS (optional)

By default the site uses `css/app.css` that was compiled once with Tailwind.
For very light deployments you can instead load the Tailwind Play CDN, but the
compiled file is what this project ships with — it's faster, works offline and
has no runtime dependency. To rebuild it after design changes:

```bash
npm install
npm run build
```

---

## Checklist before going live

- [ ] Real values in `clinic-config.js` (name, city, state, address, phone, WhatsApp, email, timings)
- [ ] Real images replaced in `images/`
- [ ] `APPOINTMENT_METHOD` set (`whatsapp` or `form`) + form URL configured correctly
- [ ] Real patient reviews (not samples)
- [ ] `sitemap.xml` / `robots.txt` domain updated
- [ ] `canonical` URLs in page `<head>`s point to your real domain
- [ ] Google Search Console verification added (optional but recommended)
- [ ] Check the site on a phone — mobile menu, floating call & WhatsApp buttons
- [ ] HTTPS enabled (all the hosts above do this automatically)
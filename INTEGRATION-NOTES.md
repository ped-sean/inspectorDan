# Integration notes

Everything that points at outside software is left deliberately easy to find and
swap. In the HTML, integration points are marked two ways:

- `data-external="..."` — a real outbound link that already works but may need updating.
- `data-todo="..."` — a placeholder `href="#"` that still needs a real URL.

To list every integration point at once, search the project for `data-external` and `data-todo`
(e.g. `grep -rn "data-external\|data-todo" *.html`).

---

## Site structure (multi-page)

All pages are flat in the project root, so asset paths (`styles.css`, `images/logo.webp`)
are identical everywhere.

- `index.html` — home / landing page (hero, services overview, about, process,
  reviews, referrals stub, CTA).
- `services.html` — full service detail + "Areas I Inspect" breakdown.
- `blog.html` — blog index, linking to the three article pages:
  `blog-letting-go.html`, `blog-inspector-humility.html`, `blog-mistakes-part-one.html`.
- `contact.html` — contact details + message form.

**Shared header/footer caveat:** the header and footer are hand-copied into every
page (no build step). If you change a nav/footer link, update it in **all** HTML
files. The home page uses bare anchors (`#reviews`, `#referrals`) for smooth
scrolling; the subpages link back with `index.html#reviews` etc. If this
duplication becomes painful, introduce a static site generator (e.g. Eleventy) so
the header/footer live in one place — see the note at the bottom.

---

## 1. Booking / reservation link  (`data-external="schedule"`)

- **Software:** HomeGauge ScheduleNow.
- **Current URL:** `https://schedulenow.homegauge.com/11ecebf8-c830-7b99-af04-77c0e9971dab/schedule`
- **Where it's used:** the "Book Now" nav button, CTA "Book Online" buttons, and
  footer "Book an Inspection" link on **every page**, plus the hero button on the
  home page and the booking links on `services.html` / `contact.html`.
- **What to do:** if the HomeGauge account/URL changes, update every
  `data-external="schedule"` link. To embed the scheduler in the page instead of
  linking out, drop an `<iframe>` pointing at the same URL into a new section.

## 2. Reviews link  (`data-todo="reviews-url"`)  — NEEDS A URL

- **Status:** placeholder only. The archive had reviews as on-page text, not a link,
  so there is no URL yet.
- **Note:** the **nav** "Reviews" link is internal — it scrolls to the on-page
  testimonials section (`#reviews` on the home page). The only external (Google)
  placeholder is the "Read more reviews →" link under the testimonials on `index.html`.
- **Where it's used:** "Read more reviews →" under the home-page testimonials.
- **What to do:** get the public review profile URL from Dan (most likely the
  Google Business Profile — looks like `https://g.page/r/XXXX/review` or a
  `https://www.google.com/maps/place/...` reviews link). Replace each `href="#"`
  on the `data-todo="reviews-url"` links and remove the `data-todo` attribute.

## 3. Sample reports  (`data-external="report"`)

- **Software:** Google Drive file previews.
- **Current URLs (under the Process section in `index.html`):**
  - North Shore — `https://drive.google.com/file/d/1UeZR9JVOIHH5J9lHdoTQQhaR7uZ8s5A5/preview`
  - Condo — `https://drive.google.com/file/d/1Sgf4ZkVDe26BIkzhBD4-iSaVUt2CSSLS/preview`
  - Suburban Townhome — `https://drive.google.com/file/d/1CP464SDiEZIWea5hTbq4fkgdFOKQN9mq/preview`
- **What to do:** to add/replace a report, upload the PDF to Drive, set sharing to
  "Anyone with the link", and use the `/preview` URL. Copies of these PDFs also live
  in the archive's `documents/` folder if you'd rather self-host them.

## 4. Documents  (`data-external="document"`)

- **Software:** Google Drive.
- **Current URL:** Consumer-Contractor Cautions and Protections —
  `https://drive.google.com/file/d/1SZl1VHj6Nne5dlst_AArIiMVNMm-kAN8/view?usp=sharing`
- **Where it's used:** footer of `index.html`.
- **What to do:** same as sample reports — Drive share link, or self-host the PDF
  from the archive's `documents/` folder.

## 5. Contact form  (`data-todo="form-endpoint"`)  — NEEDS A BACKEND

- **Status:** the form on `contact.html` does not submit anywhere yet. A static
  site can't send email on its own — it needs a form service.
- **What to do:** sign up for a form backend (e.g. **Formspree** at
  https://formspree.io, or **Netlify Forms** if hosting on Netlify), then set the
  form's `action` to the endpoint they give you and remove `data-todo="form-endpoint"`:
  `<form action="https://formspree.io/f/XXXX" method="POST">`. The phone/email/booking
  links on the page work regardless, so the form is a nice-to-have, not a blocker.

---

## Contractor Referrals  (`#referrals` section — STUB)

The referrals content is **intentionally not built**. It lives as a stub section
(`#referrals` in `index.html`) — just a heading and a placeholder note inside
`.referrals-stub`. The nav and footer "Referrals" links scroll to it.

To build it out: replace the `.referrals-stub` block with a `.cards` grid (reuse
the existing card styles) — one card per referral with trade/category, business
name, phone, and an optional outbound link (`target="_blank" rel="noopener"`).
Source data is in the archive's `Contractor_Referrals.htm`. See the HTML comment
right above the section.

## Logo

The real logo is in use — `images/logo.webp` (copied from the archive's
`Dan-Logo@4x.webp`), shown top-left in the header (`.brand-logo`) and in the
footer (`.footer-logo`). It already contains the "INSPECTOR DAN" name, so there's
no separate text wordmark. To replace it, drop a new file at `images/logo.webp`
or update the two `<img>` `src` values.

## Images

All photos are CSS placeholders (`.ph` elements with `role="img"`). To use a real
image, replace the placeholder `<div>` with an `<img src="..." alt="...">`. The
brand photos ("Himself", inspection shots) are in the archive's `images/` folder.

## Testimonials

The reviews in the carousel are pulled from the archive and hard-coded in the
testimonial section of `index.html`. To add/edit one, copy an existing
`<li class="quote">…</li>` inside `.quotes-track`; the script builds the dots and
handles rotation automatically. Full review text (and the `Reviews.xlsx` source)
is in the archive.

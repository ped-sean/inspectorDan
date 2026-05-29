# Integration notes

Everything that points at outside software is left deliberately easy to find and
swap. In the HTML, integration points are marked two ways:

- `data-external="..."` — a real outbound link that already works but may need updating.
- `data-todo="..."` — a placeholder `href="#"` that still needs a real URL.

To list every integration point at once, search the project for `data-external` and `data-todo`
(e.g. `grep -rn "data-external\|data-todo" *.html`).

---

## Site structure (Eleventy)

This site is built with **Eleventy** (a static site generator), so the header and
footer live in **one** place — no more copy-paste across pages.

### How to run it

```
npm install          # once, to install Eleventy
npm start            # dev server at http://localhost:5500 (auto-rebuilds + live-reloads on save)
npm run build        # one-off production build into _site/
```

The dev server serves the freshly built output. Edit a file in `src/`, save, and
the browser reloads automatically.

### Where things live

- `src/_includes/base.njk` — **the layout**: the whole `<head>`, the header/nav,
  and the footer. Edit nav or footer links **here, once**, and every page updates.
  The active nav item is driven by each page's `active:` front-matter value.
- `src/*.njk` — one file per page. Each has a small front-matter block
  (`title`, `description`, `active`, `permalink`) and **only that page's body**:
  - `index.njk` — home / landing page
  - `services.njk` — full service detail + "Areas I Inspect"
  - `reviews.njk` — testimonial carousel + external "read more" link
  - `blog.njk` — blog index → `blog-letting-go.njk`, `blog-inspector-humility.njk`,
    `blog-mistakes-part-one.njk`
  - `referrals.njk` — contractor referrals (STUB — see below)
  - `contact.njk` — contact details + message form
- `src/styles.css`, `src/script.js`, `src/images/` — static assets, copied as-is.
- `_site/` — the **generated** site (git-ignored). Never edit by hand; it's
  overwritten on every build. This is the folder you deploy/host.

Nav order (same on every page, defined once in `base.njk`): Home · Services ·
Reviews · Blog · Contact · Referrals · **Book Now** (external).

To **add a page**: create `src/whatever.njk` with the same front matter shape,
add a nav entry to the `navItems` list in `base.njk`, and rebuild.

---

## 1. Booking / reservation link  (`data-external="schedule"`)

- **Software:** HomeGauge ScheduleNow.
- **Current URL:** `https://schedulenow.homegauge.com/11ecebf8-c830-7b99-af04-77c0e9971dab/schedule`
- **Where it's used:** the "Book Now" nav button and footer "Book an Inspection"
  link (both in `src/_includes/base.njk`, so on every page), plus CTA / hero
  buttons in several `src/*.njk` pages.
- **What to do:** if the HomeGauge account/URL changes, update every
  `data-external="schedule"` link (the nav/footer one is in `base.njk`; the rest
  are in the page templates). To embed the scheduler instead of linking out, drop
  an `<iframe>` pointing at the same URL into a page.

## 2. Reviews link  (`data-todo="reviews-url"`)  — NEEDS A URL

- **Status:** placeholder only. The archive had reviews as on-page text, not a link,
  so there is no URL yet.
- **Note:** the testimonials live in `src/reviews.njk` (a carousel of real quotes
  from the archive). The nav "Reviews" link goes to that page. The only external
  (Google) placeholder is the "Read more reviews on Google →" link at the bottom of
  `src/reviews.njk`.
- **Where it's used:** "Read more reviews on Google →" in `src/reviews.njk`.
- **What to do:** get the public review profile URL from Dan (most likely the
  Google Business Profile — looks like `https://g.page/r/XXXX/review` or a
  `https://www.google.com/maps/place/...` reviews link). Replace each `href="#"`
  on the `data-todo="reviews-url"` links and remove the `data-todo` attribute.

## 3. Sample reports  (`data-external="report"`)

- **Software:** Google Drive file previews.
- **Current URLs (in `src/index.njk` Process section, and one in `src/services.njk`):**
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
- **Where it's used:** the footer in `src/_includes/base.njk` (so it shows on every page).
- **What to do:** same as sample reports — Drive share link, or self-host the PDF
  from the archive's `documents/` folder.

## 5. Contact form  (`data-todo="form-endpoint"`)  — NEEDS A BACKEND

- **Status:** the form in `src/contact.njk` does not submit anywhere yet. A static
  site can't send email on its own — it needs a form service.
- **What to do:** sign up for a form backend (e.g. **Formspree** at
  https://formspree.io, or **Netlify Forms** if hosting on Netlify), then set the
  form's `action` to the endpoint they give you and remove `data-todo="form-endpoint"`:
  `<form action="https://formspree.io/f/XXXX" method="POST">`. The phone/email/booking
  links on the page work regardless, so the form is a nice-to-have, not a blocker.

---

## Contractor Referrals  (`src/referrals.njk` — STUB)

The referrals content is **intentionally not built**. `src/referrals.njk` is a full
page with a placeholder note inside `.referrals-stub`.

To build it out: replace the `.referrals-stub` block in `src/referrals.njk` with a
`.cards` grid (reuse the existing card styles) — one card per referral with
trade/category, business name, phone, and an optional outbound link
(`target="_blank" rel="noopener"`). Source data is in the archive's
`Contractor_Referrals.htm`. See the comment at the top of the file.

## Logo

The real logo is in use — `src/images/logo.webp` (copied from the archive's
`Dan-Logo@4x.webp`), shown in the header (`.brand-logo`) and footer (`.footer-logo`),
both defined once in `src/_includes/base.njk`. It already contains the
"INSPECTOR DAN" name, so there's no separate text wordmark. To replace it, drop a
new file at `src/images/logo.webp` or update the two `<img>` `src` values in the layout.

## Images

All photos are CSS placeholders (`.ph` elements with `role="img"`). To use a real
image, replace the placeholder `<div>` in the relevant `src/*.njk` with an
`<img src="..." alt="...">`. The brand photos ("Himself", inspection shots) are in
the archive's `images/` folder.

## Testimonials

The reviews in the carousel are pulled from the archive and live in `src/reviews.njk`
(with one featured quote on the home page, `src/index.njk`). To add/edit one, copy an
existing `<li class="quote">…</li>` inside `.quotes-track`; the script builds the dots and
handles rotation automatically. Full review text (and the `Reviews.xlsx` source)
is in the archive.

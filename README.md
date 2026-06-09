# InspectorDan LLC — Marketing Site

Static marketing site for InspectorDan LLC, a Westchester / Chicago-area home inspection business run by Daniel Cullen (Certified Professional Inspector — InterNACHI).

Built with [Eleventy](https://www.11ty.dev/) (Nunjucks templates) and hand-rolled CSS.

## Quick start

```bash
npm install
npm start         # dev server on http://localhost:5500/, live reload
npm run build     # one-shot build into _site/
```

## Project layout

```
.
├── src/                       # Eleventy input
│   ├── _includes/base.njk     # Single layout (head, header, footer)
│   ├── images/                # logo + photos
│   ├── index.njk              # Home
│   ├── services.njk           # Services
│   ├── referrals.njk          # Contractor referrals (accordion)
│   ├── blog.njk               # Blog index
│   ├── blog-*.njk             # Individual blog posts
│   ├── styles.css             # All styles (passthrough)
│   └── script.js              # All interactivity (passthrough)
├── eleventy.config.js
└── _site/                     # Built output (gitignored)
```

## Pages

| Page          | Source                          |
|---------------|----------------------------------|
| Home          | [src/index.njk](src/index.njk)   |
| Services      | [src/services.njk](src/services.njk) |
| Referrals     | [src/referrals.njk](src/referrals.njk) |
| Blog          | [src/blog.njk](src/blog.njk)     |
| Blog posts    | `src/blog-*.njk`                 |

## External integrations (not yet self-hosted)

- **Booking**: [HomeGauge ScheduleNow](https://schedulenow.homegauge.com/11ecebf8-c830-7b99-af04-77c0e9971dab/schedule) — linked from the header CTA, hero, and footer.
- **Sample reports**: Google Drive PDFs — linked from the Services page.
- **Consumer-Contractor Cautions**: Google Drive PDF — linked from the footer.

## Design system

Tokens are CSS custom properties at the top of [src/styles.css](src/styles.css):

```css
--orange: #f57c00;   /* primary accent */
--dark:   #16161a;   /* header, footer, dark band */
--ink:    #16161a;   /* headings */
--text:   #4c4c55;   /* body */
--wrap:   1280px;    /* container max-width */
--radius: 12px;
```

Fonts are loaded from Google Fonts: **Sora** (headings), **Poppins** (body).

## Conventions

- One layout file. The header and footer live in [src/_includes/base.njk](src/_includes/base.njk) only — edit there, not in individual pages.
- SEO and social meta (OG, Twitter Card, canonical, JSON-LD `HomeAndConstructionBusiness`) are also in the layout — every page gets them for free.
- All images use explicit `width` / `height` to prevent layout shift. Above-the-fold images use `fetchpriority="high"`; below-the-fold use `loading="lazy"`.
- No inline styles. Use a class.
- No build step beyond Eleventy — CSS and JS are passed through as-is.

## Deploy

The site is static. Any host that serves static files works:

```bash
npm run build
# upload _site/ to Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, etc.
```

## Contact

Daniel Cullen · 773-771-6466 · inspectordan@gmail.com · Westchester, IL

# Instacertify Landing Pages

Small frontend + backend for publishing SEO landing pages on **info.instacertify.com**.

## What you get

- Admin UI at `/admin` to create, edit, publish, and delete pages
- 5 design templates: **Service**, **Trust**, **Bold**, **Minimal**, **Signal**
- **Service** design for compliance/lead-gen pages with a locked format (offer → hero+form → stats → section nav → content blocks → CTA). See [`docs/SERVICE-FORMAT.md`](docs/SERVICE-FORMAT.md).
- Lead capture with UTM/gclid storage, admin leads inbox, optional webhook
- Per-page SEO: title, description, keywords, canonical, robots, OG image, custom head, FAQ schema
- Site-wide tracking settings: Google Analytics, Google Tag Manager, Facebook Pixel, Search Console verification, custom head/body scripts
- Public pages at `/:slug`, previews at `/preview/:slug`
- `robots.txt` and `sitemap.xml` for published pages

## Quick start

```bash
npm install
cp .env.example .env   # if needed
npm run seed           # optional sample pages
npm start
```

- Public home: http://localhost:3000
- Admin: http://localhost:3000/admin
- Default admin password: value of `ADMIN_PASSWORD` in `.env` (default `change-me`)

## Environment

| Variable | Purpose |
| --- | --- |
| `PORT` | Server port (default `3000`) |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `SESSION_SECRET` | Reserved for future signed sessions |
| `PUBLIC_BASE_URL` | Canonical base URL used in sitemap/SEO (default `https://info.instacertify.com`) |

## Admin workflow

1. Sign in at `/admin`
2. Create a page, choose **Service** for lead-gen/compliance landers (or another design)
3. Fill hero content, trust points, process, documents, FAQs, and SEO
4. Publish when ready
5. Under **SEO & Tracking**, add GA / GTM / Pixel IDs, support phone/WhatsApp, and optional lead webhook
6. Review form submissions under **Leads**

Sample seed pages: `/sds-certificate` (primary Ads LP), `/lmpc-registration`, `/bis-registration`

### Primary Ads page: `/sds-certificate`
Focus keywords from Google Keyword Stats: **msds cert** (highest volume), SDS certification, MSDS certificate for export/chemicals, plus **UN38.3** for battery shipping. Includes Instacertify logo, teal/orange brand, legal name, phone, and email for Google landing-page contact clarity.

## Service formatting checklist

When creating a new Service page in admin, fill in this order:

1. Offer banner + badge + headline + subheadline  
2. Form title/subtitle + service options + trust points  
3. Hero stats  
4. Overview sections  
5. Schemes → timelines → products → benefits → documents → procedure → risks → FAQs  
6. SEO title/description/keywords  

Full field map: [`docs/SERVICE-FORMAT.md`](docs/SERVICE-FORMAT.md)

## API

- `POST /api/auth/login` `{ "password": "..." }`
- `GET /api/pages` / `POST /api/pages` / `PUT /api/pages/:id` / `DELETE /api/pages/:id`
- `GET /api/settings` / `PUT /api/settings`
- `GET /api/leads` (auth)
- `POST /api/leads` (public form endpoint)

Data is stored in SQLite at `data/landing.db`.

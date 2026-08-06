# Landing Pages CMS (Certko + Instacertify)

Small frontend + backend for publishing SEO / Ads landing pages on **info.certko.com** (and optionally **info.instacertify.com**).

## What you get

- Admin UI at `/admin` to create, edit, publish, and delete pages
- 6 design templates: **Certko**, **Service**, **Trust**, **Bold**, **Minimal**, **Signal**
- **Certko** design for Certko-branded lead-gen landers (navy / cream / butter, full-bleed hero + enquiry form)
- **Service** design for Instacertify compliance landers — see [`docs/SERVICE-FORMAT.md`](docs/SERVICE-FORMAT.md)
- Lead capture with UTM/gclid storage, admin leads inbox, optional webhook
- Per-page SEO: title, description, keywords, canonical, robots, OG image, custom head, FAQ schema
- Site-wide tracking settings: Google Analytics, Google Tag Manager, Facebook Pixel, Search Console verification, custom head/body scripts
- Public pages at `/:slug`, previews at `/preview/:slug`
- `robots.txt` and `sitemap.xml` for published pages

## Quick start

```bash
npm install
cp .env.example .env   # if needed
npm run seed:certko    # Certko certification landers
# or: npm run seed     # Instacertify sample pages
npm start
```

- Public home: http://localhost:3000
- Admin: http://localhost:3000/admin
- Default admin password: value of `ADMIN_PASSWORD` in `.env` (default `change-me`)

## Certko pages

After `npm run seed:certko`:

| Path | Topic |
| --- | --- |
| `/bis-certification` | BIS / ISI / CRS / FMCS |
| `/bee-star-rating` | BEE star labelling |
| `/gmark-certification` | GCC GMARK |
| `/ce-marking` | EU CE marking |
| `/wpc-eta` | WPC / ETA |
| `/saber-certification` | Saudi SABER |
| `/fcc-certification` | US FCC |

Details: [`docs/CERTKO-PAGES.md`](docs/CERTKO-PAGES.md)

## Certko backlink kit

Earn branded links to **certko.com** with useful embeds (not paid link spam):

```bash
npm run seed:backlinks
```

| Path | Purpose |
| --- | --- |
| `/backlink-kit` | Badge + widget copy kit + outreach emails |
| `/embed/widget` | Iframe BIS search → certko.com |
| `/embed/badge-*.svg` | Light / dark / compact badges |
| `/resources-bis-statistics` | Citeable stats page |
| `/resources-qco-deadlines` | QCO briefing page |

Playbook: [`docs/CERTKO-BACKLINKS.md`](docs/CERTKO-BACKLINKS.md)

## Environment

| Variable | Purpose |
| --- | --- |
| `PORT` | Server port (default `3000`) |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `SESSION_SECRET` | Reserved for future signed sessions |
| `PUBLIC_BASE_URL` | Canonical base URL used in sitemap/SEO (default `https://info.certko.com`) |

## Admin workflow

1. Sign in at `/admin`
2. Create a page, choose **Certko** for Certko Ads landers (or **Service** for Instacertify)
3. Fill hero content, trust points, process, documents, FAQs, and SEO
4. Publish when ready
5. Under **SEO & Tracking**, add GA / GTM / Pixel IDs, support phone/WhatsApp, and optional lead webhook
6. Review form submissions under **Leads**

## API

- `POST /api/auth/login` `{ "password": "..." }`
- `GET /api/pages` / `POST /api/pages` / `PUT /api/pages/:id` / `DELETE /api/pages/:id`
- `GET /api/settings` / `PUT /api/settings`
- `GET /api/leads` (auth)
- `POST /api/leads` (public form endpoint)

Data is stored in SQLite at `data/landing.db`.

# Instacertify Landing Pages

Small frontend + backend for publishing SEO/Ads landing pages on **info.instacertify.com**.

## System rule

- **Same backend** for every landing page (pages, `content_json`, leads, SEO, tracking)
- **Unique design structure** per campaign when requested (new template + registry entry)
- **Complete edit space** in admin: hero, chrome/theme, content blocks, SEO, advanced JSON

See [`docs/LANDING-PAGE-SYSTEM.md`](docs/LANDING-PAGE-SYSTEM.md).

## What you get

- Admin UI at `/admin` to create, edit, publish, and delete pages
- Design registry: **Battery** (unique SDS/MSDS/UN38.3), **Service**, **Trust**, **Bold**, **Minimal**, **Signal**
- **Page images**: upload, replace, preview, show/hide, set as hero/OG/gallery
- **Review pool** per landing page: quote, rating, image, show toggle
- Lead capture with UTM/gclid storage, admin leads inbox, optional webhook
- Per-page SEO + site-wide GA / GTM / Pixel / Search Console / custom scripts
- Public pages at `/:slug`, previews at `/preview/:slug`
- `robots.txt` and `sitemap.xml` for published pages

## Quick start

```bash
npm install
cp .env.example .env   # if needed
npm run seed           # optional sample pages
npm start
```

## Deploy on Hostinger

This is an Express app. Use Hostinger **Node.js Web App** (Business/Cloud) with entry file `server/index.js`. Full steps: [`docs/HOSTINGER-DEPLOY.md`](docs/HOSTINGER-DEPLOY.md).

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
2. Create a page and choose a design (unique campaign designs are marked ★)
3. Edit hero, chrome/theme, lead-gen blocks, advanced JSON, and SEO
4. Publish when ready
5. Under **SEO & Tracking**, add GA / GTM / Pixel IDs and support contacts
6. Review form submissions under **Leads**

Sample seed pages: `/sds-certificate` (Battery design), `/lmpc-registration`, `/bis-registration`

### Primary Ads page: `/sds-certificate`

Unique **Battery** design. Focus keywords: **msds cert**, SDS certification, MSDS certificate for export/chemicals, plus **UN38.3** for battery shipping. Complete solution positioning with Instacertify contacts for Google landing-page clarity.

## Adding another unique landing page

1. Register design in `server/designs/registry.js`
2. Add `server/views/templates/<name>.ejs` using the shared `page.content` fields
3. Create/seed the page in admin (same backend fields)

Service format checklist: [`docs/SERVICE-FORMAT.md`](docs/SERVICE-FORMAT.md)

## API

- `POST /api/auth/login` `{ "password": "..." }`
- `GET /api/designs`
- `GET /api/pages` / `POST /api/pages` / `PUT /api/pages/:id` / `DELETE /api/pages/:id`
- `GET /api/settings` / `PUT /api/settings`
- `GET /api/leads` (auth)
- `POST /api/leads` (public form endpoint)

Data is stored in SQLite at `data/landing.db`.

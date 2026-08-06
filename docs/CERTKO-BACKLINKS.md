# Certko backlink kit

Legitimate, useful assets that earn **branded** links back to [certko.com](https://certko.com) — not a paid link scheme.

## Public URLs

| URL | Purpose |
| --- | --- |
| `/backlink-kit` | Copy-paste badges, widget, outreach templates |
| `/embed/widget` | Iframe BIS search widget → certko.com/search |
| `/embed/badge-light.svg` | Light SVG badge |
| `/embed/badge-dark.svg` | Dark SVG badge |
| `/embed/badge-compact.svg` | Compact “Powered by Certko” |
| `/embed/certko-badge.js` | Optional script loader |
| `/resources-bis-statistics` | Citeable stats page |
| `/resources-qco-deadlines` | QCO briefing → live tracker |

## Seed

```bash
npm run seed:certko      # certification landers
npm run seed:backlinks   # citeable resource pages
npm start
```

Open `http://localhost:3000/backlink-kit`.

## SEO / safety rules (built into the kit)

1. **Branded anchors only** — `Certko` / `Powered by Certko` (not “BIS certification India”).
2. **Useful first** — widget searches the real Certko database.
3. **Optional** — hosts can remove snippets anytime (stated on the kit page).
4. **UTM tracking** — `utm_source=embed` / `utm_medium=badge|widget`.
5. **No cloaking / no forced sitewide injection.**

## Outreach motions

1. Email manufacturers & exporters with the widget iframe (template on `/backlink-kit`).
2. Offer labs/consultants the compact badge on resource pages.
3. Pitch journalists the statistics + QCO pages as citeable sources.
4. Add badges to owned properties (blog, partner microsites, email footers) with branded anchors.
5. List Certko in relevant *editorial* directories only when a real profile/value exists — avoid spammy free-for-all link farms.

## Measuring

In analytics on certko.com, filter:

- `utm_source=embed`
- `utm_campaign=backlink`
- `utm_source=backlink_kit` / `utm_source=resource`

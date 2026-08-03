# Landing page system

## Rule for every new landing page

1. **Keep the backend the same** — pages table, `content_json`, leads, SEO, tracking, admin API.
2. **Build a unique design structure** — add a new design id + EJS template when a campaign needs its own layout.
3. **Give complete edit space in admin** — hero, chrome/theme, lead-gen blocks, SEO, and advanced content JSON.

## Shared backend (never fork)

| Piece | Location |
| --- | --- |
| Pages / leads / settings | `server/db.js` |
| Auth + CRUD API | `server/routes/api.js` |
| Design registry | `server/designs/registry.js` |
| Admin editor | `public/admin/*` |
| Public render | `server/index.js` → `templates/<design>` |

Every page stores the same shape:

- Top-level: `slug`, `title`, `design`, `status`, hero fields, `sections`, `bodyHtml`, SEO
- `content_json`: shared lead-gen + chrome/theme fields (and any custom keys)

## Unique designs

Register each new structure in `server/designs/registry.js`:

```js
{
  id: "battery",
  name: "Battery / SDS shipping",
  family: "leadgen",   // leadgen | editorial
  description: "...",
  template: "battery", // server/views/templates/battery.ejs
  unique: true
}
```

Then add `server/views/templates/<template>.ejs` that reads the **same** `page` / `page.content` fields.

### Current designs

| id | Family | Notes |
| --- | --- | --- |
| `battery` | leadgen | Unique SDS / MSDS / UN38.3 shipping layout |
| `service` | leadgen | Shared compliance lead-gen format |
| `trust` / `bold` / `minimal` / `signal` | editorial | Simpler brand/editorial pages |

## Complete edit in admin

When editing a page you can change:

1. Basics + design choice  
2. Hero content  
3. **Page images** — add / replace / preview / show on page / use as hero, OG, or gallery  
4. **Page chrome & theme** — logos, wordmark, colors, side rail, bottom CTA, form labels, nav labels, footer  
5. Sections + lead-gen repeaters (schemes, timelines, docs, FAQs, …)  
6. **Review pool** — per-page reviews with rating, image, and show toggle  
7. Optional HTML body  
8. **Advanced complete content JSON** — full `content_json` merge for bulk/custom keys  
9. Page SEO  

Form fields win over advanced JSON when both set the same key.

### Image + review APIs

- `GET/POST /api/pages/:id/images`
- `PUT/DELETE /api/pages/:id/images/:imageId`
- `POST /api/pages/:id/images/:imageId/use` `{ "target": "hero"|"og"|"gallery"|"logoLight"|"logoDark" }`
- Reviews live in `content.reviewPool[]` (`quote`, `name`, `rating`, `image`, `show`)

## Workflow for a new requested landing page

1. Keep using `/admin` + existing APIs (no new CMS).
2. Add a unique design in the registry + new EJS template.
3. Seed or create the page with that `design` id and fill `content_json`.
4. Confirm contacts/offer match Google landing-page clarity rules.

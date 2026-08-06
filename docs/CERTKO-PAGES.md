# Certko landing pages

Lead-gen / Ads landing pages for **Certko** (`info.certko.com`), using the **Certko** design template.

## Brand

| Token | Value |
| --- | --- |
| Ink | `#16263d` |
| Cream | `#faf6ee` |
| Butter accent | `#f7c453` |
| Contact | `info@certko.com` · `+91 9999118039` |
| Logo | `/assets/certko-logo.png` |
| Favicon | `/assets/certko-favicon.png` |

## Seed

```bash
npm run seed:certko
```

Sets site settings to Certko and upserts these published pages:

| Slug | Focus |
| --- | --- |
| `/bis-certification` | BIS / ISI / CRS / FMCS (primary) |
| `/bee-star-rating` | BEE star labelling |
| `/gmark-certification` | GCC GMARK |
| `/ce-marking` | EU CE marking |
| `/wpc-eta` | WPC Equipment Type Approval |
| `/saber-certification` | Saudi SABER |
| `/fcc-certification` | US FCC authorisation |

## Admin

1. Sign in at `/admin`
2. Choose design **Certko**
3. Fill Service-format fields (offer → hero+form → stats → content → FAQs → SEO)
4. Point CTAs to `https://certko.com/contact`
5. Set `PUBLIC_BASE_URL=https://info.certko.com` in `.env`

Instacertify pages remain available via `npm run seed` and the **Service** design.

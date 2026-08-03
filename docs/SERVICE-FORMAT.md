# Service page format (locked)

Use the **Service** design for compliance / certification lead-gen pages on `info.instacertify.com`.

This format is distilled from common Indian certification landers (LMPC / BIS style):

1. offer strip  
2. sticky brand bar + CTA  
3. hero + enquiry form  
4. stats  
5. sticky section nav  
6. content blocks  
7. bottom CTA  

## Page order

| # | Block | Content fields |
| --- | --- | --- |
| 1 | Offer strip | `content.offerBanner` |
| 2 | Top bar | `brandName`, phone/WhatsApp, `ctaLabel` |
| 3 | Hero left | `badgeText`, `brandName`, `headline`, `headlineHighlight`, `subheadline`, `ratingText`, `trustPoints` (max 4 shown) |
| 4 | Hero form | `formTitle`, `formSubtitle`, name, mobile, email, city, `serviceOptions` select, message, `formSubmitLabel`, `formTrustPoints`, expert card |
| 5 | Stats row | `heroStats` (fallback: `whyUs`) |
| 6 | Section nav | Auto from filled sections |
| 7 | Overview | `sections[]` |
| 8 | Schemes | `typesTitle`, `types[]` |
| 9 | Timelines | `timelinesTitle`, `timelines[]` |
| 10 | Products | `productsTitle`, `products[]` |
| 11 | Benefits | `benefitsTitle`, `benefits[]` |
| 12 | Documents | `documentsTitle`, `documents[]` (tabbed) |
| 13 | Procedure | `detailProcess` (or `process`) |
| 14 | How we work | `process[]` when both process + detailProcess exist |
| 15 | Risks | `penaltiesTitle`, `penalties[]` |
| 16 | Testimonials | `testimonials[]` |
| 17 | Why us | `whyTitle`, `whyUs[]` |
| 18 | FAQs | `faqsTitle`, `faqs[]` (+ FAQ schema) |
| 19 | Bottom CTA | `bottomCtaText` |
| 20 | Utilities | scroll CTA, mobile CTA, WhatsApp float |

## Form format

Always collect:

1. Full name  
2. Mobile  
3. Email  
4. City  
5. Certification / service type (`serviceOptions`)  
6. Message  

Submit label examples: `Get Free Expert Consultation`, `Get Free Consultation`.

Under-form trust line examples: `100% confidential`, `No spam`, `Quick response`.

UTM / gclid / gbraid are captured automatically from the URL.

## Writing rules

- One job per section: one H2 + short support copy.  
- Hero: brand first, then one headline, one short supporting sentence, CTA/form.  
- Prefer concrete scheme names (ISI, CRS, FMCS, LMPC).  
- Keep timelines honest ranges, not fake guarantees.  
- SEO: fill `seo.title`, `seo.description`, `seo.keywords`, robots `index,follow`.

## Seed examples

- `/bis-registration` — full Service format  
- `/lmpc-registration` — same format for Legal Metrology  

# WordPress build (Hostinger-ready)

Plugin path: `wordpress/instacertify-landing-pages/`

This is the WordPress version of the same Instacertify landing-page CMS:

- Unique designs (`battery`, `service`)
- Complete content editing (JSON + key fields)
- Media Library add/replace for hero + gallery
- Review pool (quote, rating, image, show)
- Lead form + admin Leads inbox
- Seeded SDS / MSDS / UN38.3 page

## Install on Hostinger WordPress

1. Zip the plugin folder (or use the artifact zip)
2. In WordPress admin → **Plugins → Add New → Upload Plugin**
3. Upload and **Activate**
4. Go to **IC Landing Pages**
5. SDS page is created automatically
6. Public Ads URL page is also created: `/sds-certificate` with shortcode  
   `[iclp_landing slug="sds-certificate"]`
7. CPT URL: `/lp/sds-certificate`
8. Settings: **IC Landing Pages → Settings** (legal name, email, phone, WhatsApp)

## Create another landing page

1. **IC Landing Pages → Add Landing Page**
2. Choose a unique design
3. Fill hero/content JSON / review pool / gallery
4. Publish
5. Embed with shortcode on any WordPress Page for a clean Ads URL

## Notes

- Works on standard Hostinger WordPress (no Node.js required)
- Node Express CMS remains available separately in this repo for `info` Node hosting

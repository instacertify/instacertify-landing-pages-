=== Instacertify Landing Pages ===
Contributors: instacertify
Requires at least: 6.0
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later

WordPress landing-page CMS for Instacertify Ads pages (SDS / MSDS / UN38.3), with unique designs, gallery, review pool, and lead forms.

== Description ==

* Custom post type: Landing Pages
* Designs: Battery (SDS shipping) and Service
* Complete content JSON editor + Media Library image tools
* Review pool with rating / image / show toggle
* Lead form + Leads inbox
* Shortcode for clean Ads URLs on normal WordPress Pages

== Installation ==

1. Upload the `instacertify-landing-pages` folder to `/wp-content/plugins/`
2. Activate the plugin
3. Open **IC Landing Pages** — SDS page is seeded automatically
4. Public Ads URL: create/use WordPress Page slug `sds-certificate` with shortcode `[iclp_landing slug="sds-certificate"]`
5. Direct CPT URL also works: `/lp/sds-certificate`

== Shortcodes ==

`[iclp_landing slug="sds-certificate"]`
`[iclp_landing id="123"]`

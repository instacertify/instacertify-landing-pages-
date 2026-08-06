require("dotenv").config();
const {
  createPage,
  getPageBySlug,
  updatePage,
  updateSettings,
  listPages,
} = require("./db");

updateSettings({
  site_name: "Certko",
  legal_name: "Certko",
  support_email: "info@certko.com",
  support_phone: "+91 9999118039",
  support_whatsapp: "919999118039",
  favicon_url: "/assets/certko-favicon.png",
});

const BASE = process.env.PUBLIC_BASE_URL || "https://info.certko.com";

function upsert(page) {
  const existing = getPageBySlug(page.slug);
  if (existing) {
    updatePage(existing.id, page);
    console.log(`Updated page: /${page.slug}`);
  } else {
    createPage(page);
    console.log(`Created page: /${page.slug}`);
  }
}

upsert({
  slug: "resources-bis-statistics",
  title: "BIS Certification Statistics",
  design: "certko",
  status: "published",
  brandName: "Certko",
  headline: "BIS certification statistics manufacturers cite",
  subheadline:
    "A citeable snapshot of Certko’s public BIS intelligence — products, schemes, labs and what the numbers mean for importers and factories.",
  ctaLabel: "Open Certko database",
  ctaUrl: "https://certko.com/products/all?utm_source=resource&utm_medium=backlink&utm_campaign=bis_stats",
  heroImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80",
  sections: [
    {
      heading: "Why these numbers matter",
      text: "Journalists, consultants and marketplace sellers often need a single trustworthy snapshot of India’s BIS landscape. The figures below are compiled from Certko’s cleaned view of official BIS laboratory scopes, notified product lists and QCO schedules. Always confirm live status on certko.com before filing.",
    },
    {
      heading: "How to cite Certko",
      text: "Suggested attribution: “Source: Certko BIS database (certko.com)”. For embeds and partner badges, use the free kit at /backlink-kit with branded Certko links only.",
    },
  ],
  content: {
    offerBanner: "Free to cite · Updated from Certko’s public BIS database",
    badgeText: "Linkable resource",
    ratingText: "Built for journalists, partners and compliance blogs",
    phone: "+91 9999118039",
    whatsapp: "919999118039",
    trustPoints: [
      "1,400+ notified products mapped to IS standards",
      "400+ BIS-recognised laboratories",
      "Indicative lab test price ranges by standard",
      "QCO mandatory / upcoming status flags",
    ],
    heroStats: [
      { value: "1,400+", label: "BIS products mapped" },
      { value: "400+", label: "Recognised labs" },
      { value: "243", label: "Mandatory now*" },
      { value: "170", label: "Upcoming QCOs*" },
    ],
    formEnabled: true,
    formTitle: "Need a deeper data pull?",
    formSubtitle: "Tell us what you’re researching — we reply within 24 hours",
    formSubmitLabel: "Request data help",
    formSuccessMessage: "Thanks! Certko will follow up shortly.",
    formTrustPoints: ["Free for editorial use", "No spam", "24h response"],
    serviceOptions: [
      "Editorial / press citation",
      "Partner directory listing",
      "Lab comparison research",
      "Other",
    ],
    scrollCtaText: "Cite Certko — or embed a free badge",
    typesTitle: "Scheme mix (illustrative)",
    types: [
      {
        title: "ISI Mark (Scheme I)",
        text: "Testing + factory inspection for most QCO industrial and consumer products.",
        items: ["Cement, steel, cables, appliances, toys", "Factory surveillance"],
      },
      {
        title: "CRS (Scheme II)",
        text: "Lab-test registration for electronics and IT under MeitY orders.",
        items: ["IT equipment, A/V, batteries", "No factory inspection in classic CRS"],
      },
      {
        title: "FMCS",
        text: "Foreign manufacturers exporting notified goods to India.",
        items: ["AIR required", "Overseas inspection path"],
      },
    ],
    benefitsTitle: "Link-worthy Certko assets",
    benefits: [
      {
        title: "Product database",
        text: "https://certko.com/products — browse categories and open IS-level pages with fees and labs.",
      },
      {
        title: "QCO tracker",
        text: "https://certko.com/qco — enforcement dates teams watch before marketplace deadlines.",
      },
      {
        title: "Labs directory",
        text: "https://certko.com/labs — search BIS-recognised laboratories by scope.",
      },
      {
        title: "Embed kit",
        text: `${BASE}/backlink-kit — free badges and BIS checker widget with branded Certko attribution.`,
      },
    ],
    faqsTitle: "Citation FAQs",
    faqs: [
      {
        q: "Can I republish these statistics?",
        a: "Yes for editorial and educational use with attribution to Certko and a link to https://certko.com/. Figures marked with * are indicative snapshots and should be re-checked on the live site.",
      },
      {
        q: "Are prices official BIS fees?",
        a: "Lab test ranges on Certko are compiled from reported laboratory scope data and are indicative (typically exclusive of GST). Confirm with the laboratory before budgeting.",
      },
      {
        q: "How do I add a Certko backlink from my site?",
        a: `Use a branded badge or the BIS widget from ${BASE}/backlink-kit. Prefer anchors like “Certko” or “Powered by Certko”.`,
      },
    ],
    bottomCtaText: "Embed a Certko badge or open the live database",
    expertName: "Talk to Certko",
    expertNote: "info@certko.com · +91 9999118039",
  },
  seo: {
    title: "BIS Certification Statistics & Citeable Data | Certko",
    description:
      "Citeable BIS certification statistics from Certko — products, labs, mandatory QCOs and scheme overview. Free to reference with attribution.",
    keywords:
      "BIS certification statistics, BIS products count, BIS labs India, QCO statistics, Certko",
    robots: "index,follow",
    canonicalUrl: `${BASE}/resources-bis-statistics`,
  },
});

upsert({
  slug: "resources-qco-deadlines",
  title: "Upcoming QCO Deadlines",
  design: "certko",
  status: "published",
  brandName: "Certko",
  headline: "Upcoming BIS QCO deadlines worth linking to",
  subheadline:
    "Quality Control Orders keep adding products to India’s mandatory BIS list. Use this page as a linkable briefing — then jump to Certko’s live QCO tracker for the full schedule.",
  ctaLabel: "Open live QCO tracker",
  ctaUrl: "https://certko.com/qco?utm_source=resource&utm_medium=backlink&utm_campaign=qco",
  heroImage:
    "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1800&q=80",
  sections: [
    {
      heading: "What a QCO changes",
      text: "When a Quality Control Order enters force for a product, manufacture, import and sale in India generally require BIS certification under the cited Indian Standard. Missing the date risks customs holds and marketplace delisting.",
    },
    {
      heading: "Always verify live dates",
      text: "Enforcement dates can shift. Treat examples on this page as a briefing; confirm the current list on https://certko.com/qco before planning production or imports.",
    },
  ],
  content: {
    offerBanner: "Link to Certko’s live QCO tracker for the full calendar",
    badgeText: "Linkable resource",
    ratingText: "For trade blogs, ops teams and partner newsletters",
    phone: "+91 9999118039",
    whatsapp: "919999118039",
    trustPoints: [
      "Mandatory vs upcoming status in one view",
      "Product → IS standard mapping",
      "Jump to labs and cost ranges on Certko",
      "Free embed kit for partner sites",
    ],
    heroStats: [
      { value: "QCO", label: "Enforcement calendar" },
      { value: "Live", label: "Tracker on certko.com" },
      { value: "ISI/CRS", label: "Scheme clarity" },
      { value: "Free", label: "Public access" },
    ],
    formEnabled: true,
    formTitle: "Get deadline alerts help",
    formSubtitle: "Share your product list — we’ll map QCO exposure",
    formSubmitLabel: "Request QCO review",
    formSuccessMessage: "Thanks! A Certko specialist will reply within 24 hours.",
    formTrustPoints: ["Free mapping", "No spam", "24h response"],
    serviceOptions: [
      "Upcoming QCO for my products",
      "Marketplace deadline risk",
      "Import shipment planning",
      "Other",
    ],
    productsTitle: "Example upcoming / watched items",
    products: [
      {
        title: "Digital Television Receiver for Satellite Broadcast",
        text: "IS 18112:2022 · CRS pathway — confirm live date on Certko QCO tracker.",
      },
      {
        title: "n-Butyl Acrylate",
        text: "IS 14709:1999 · ISI pathway — chemical importers should verify enforcement timing.",
      },
      {
        title: "Linear Alkyl Benzene",
        text: "IS 12795:2020 · ISI pathway — check certko.com/qco for the current mandate window.",
      },
    ],
    processTitle: "How teams use this page",
    process: [
      {
        title: "Brief stakeholders",
        text: "Share this URL in ops or compliance updates.",
      },
      {
        title: "Verify live",
        text: "Open certko.com/qco for the authoritative schedule.",
      },
      {
        title: "Map products",
        text: "Search each SKU on Certko for IS standard and labs.",
      },
      {
        title: "Act before enforcement",
        text: "Start testing and filing with enough lead time for ISI/CRS.",
      },
    ],
    faqsTitle: "QCO briefing FAQs",
    faqs: [
      {
        q: "Where is the live deadline list?",
        a: "https://certko.com/qco — this resource page is a linkable briefing that should always be checked against the live tracker.",
      },
      {
        q: "Can partners embed a Certko tool next to this article?",
        a: `Yes. Use ${BASE}/backlink-kit for badges or the BIS checker iframe with branded Certko attribution.`,
      },
    ],
    bottomCtaText: "Open the live QCO tracker on Certko",
    expertName: "Talk to Certko",
    expertNote: "info@certko.com · +91 9999118039",
  },
  seo: {
    title: "Upcoming BIS QCO Deadlines | Linkable Briefing | Certko",
    description:
      "Linkable briefing on upcoming BIS Quality Control Order deadlines. Verify live dates on Certko’s QCO tracker and map products to IS standards.",
    keywords:
      "QCO deadlines, BIS QCO, Quality Control Order, mandatory BIS products, Certko",
    robots: "index,follow",
    canonicalUrl: `${BASE}/resources-qco-deadlines`,
  },
});

console.log(`Backlink resources seeded. Total pages: ${listPages().length}`);
console.log(`Backlink kit UI: ${BASE}/backlink-kit`);

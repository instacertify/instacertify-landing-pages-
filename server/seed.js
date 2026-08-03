require("dotenv").config();
const { createPage, getPageBySlug, updateSettings, listPages } = require("./db");

const samples = [
  {
    slug: "iso-certification",
    title: "ISO Certification Guide",
    design: "trust",
    status: "published",
    brandName: "Instacertify",
    headline: "Certification clarity without the paperwork fog.",
    subheadline:
      "Understand ISO pathways, evidence requirements, and audit readiness with a practical information page.",
    ctaLabel: "Talk to Instacertify",
    ctaUrl: "https://instacertify.com",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What this page covers",
        text: "A concise overview of certification scope, documentation, and how teams prepare for assessment.",
      },
      {
        heading: "Who it is for",
        text: "Operations, quality, and compliance leads who need a clear public explainer for stakeholders.",
      },
    ],
    seo: {
      title: "ISO Certification Guide | Instacertify",
      description:
        "Practical ISO certification information from Instacertify for teams preparing for audit and compliance.",
      keywords: "ISO certification, audit readiness, Instacertify",
      robots: "index,follow",
    },
  },
  {
    slug: "product-info",
    title: "Product Information",
    design: "signal",
    status: "published",
    brandName: "Instacertify",
    headline: "The signal your compliance stack needs.",
    subheadline:
      "A modern landing layout for product explainers, feature overviews, and conversion-focused info pages.",
    ctaLabel: "Explore platform",
    ctaUrl: "https://instacertify.com",
    heroImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "Built for clear decisions",
        text: "Use this design when you need a sharp, tech-forward page for product or service information.",
      },
    ],
    seo: {
      title: "Instacertify Product Information",
      description:
        "Product information landing page template for Instacertify info properties.",
      keywords: "Instacertify product, compliance platform",
      robots: "index,follow",
    },
  },
];

updateSettings({
  site_name: "Instacertify",
  google_analytics_id: "",
  google_tag_manager_id: "",
});

for (const sample of samples) {
  const existing = getPageBySlug(sample.slug);
  if (existing) {
    console.log(`Skipping existing page: ${sample.slug}`);
    continue;
  }
  createPage(sample);
  console.log(`Created page: /${sample.slug}`);
}

console.log(`Total pages: ${listPages().length}`);

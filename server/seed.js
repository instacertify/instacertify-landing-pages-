require("dotenv").config();
const {
  createPage,
  getPageBySlug,
  updatePage,
  updateSettings,
  listPages,
} = require("./db");

updateSettings({
  site_name: "Instacertify",
  google_analytics_id: "",
  google_tag_manager_id: "",
});

const samples = [
  {
    slug: "lmpc-registration",
    title: "LMPC Registration",
    design: "service",
    status: "published",
    brandName: "Instacertify",
    headline: "Get LMPC certificate support with clear timelines",
    subheadline:
      "Guidance for importers, manufacturers, and packers who need Legal Metrology / LMPC registration without the paperwork maze.",
    ctaLabel: "Book a free consultation",
    ctaUrl: "https://instacertify.com",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What is Legal Metrology?",
        text: "Legal metrology sets rules for weights, measures, and packaged commodities so trade stays fair for buyers and sellers. If you sell or distribute packaged goods in India, LMPC compliance is often required under the Legal Metrology Act, 2009.",
      },
      {
        heading: "Who typically needs LMPC?",
        text: "Importers, manufacturers, packers, and dealers handling weighing/measuring instruments or pre-packaged commodities that fall under Legal Metrology rules.",
      },
    ],
    content: {
      phone: "",
      whatsapp: "",
      trustPoints: [
        "Dedicated compliance specialists",
        "Document checklist before you start",
        "End-to-end application support",
        "Clear updates through each stage",
        "Support for importer, manufacturer, and packer use cases",
      ],
      offerText: "Consultation-first onboarding for LMPC registration",
      offerPrice: "Talk to Instacertify today",
      formEnabled: true,
      formTitle: "Fill the form now",
      formSubmitLabel: "Get a free consultation",
      formSuccessMessage:
        "Thanks! An Instacertify specialist will contact you shortly.",
      processTitle: "LMPC registration procedure",
      process: [
        {
          title: "Application filling",
          text: "We help prepare and file the LMPC registration application with the required details.",
        },
        {
          title: "Document submission",
          text: "Share identity, business, and premises documents from a clear checklist.",
        },
        {
          title: "Certification support",
          text: "Track review stages and receive guidance until the certificate is issued.",
        },
      ],
      typesTitle: "Types of LMPC / Legal Metrology coverage",
      types: [
        {
          title: "For weight & measuring instruments",
          text: "Common pathways for W&M tools and related approvals.",
          items: [
            "Model approval support",
            "Importer registration",
            "Manufacturer / dealer / repairer pathways",
            "Packer registration where applicable",
          ],
        },
        {
          title: "For other packaged commodities",
          text: "Support for packers, manufacturers, and importers of pre-packaged goods.",
          items: [
            "Packer / manufacturer registration",
            "Importer certification / LMPC registration",
          ],
        },
      ],
      documentsTitle: "Documents commonly required",
      documents: [
        {
          title: "Manufacturer / dealer / repairer",
          items: [
            "Photo ID and address proof",
            "Date of birth proof",
            "PAN, GST, and premises documents",
            "Partnership deed (if applicable)",
            "Affidavit / declaration as required",
            "Shop / establishment or trade licence where needed",
          ],
        },
        {
          title: "Additional for dealers / equipment cases",
          items: [
            "Model approval related papers where applicable",
            "Equipment / tools list",
            "Experience certificates for repairer cases when required",
          ],
        },
      ],
      benefitsTitle: "Benefits of LMPC compliance",
      benefits: [
        {
          title: "Fair trade clarity",
          text: "Accurate measurement and labelling practices build trust between sellers and buyers.",
        },
        {
          title: "Lower friction in commerce",
          text: "Proper compliance reduces disputes, rework, and avoidable transaction delays.",
        },
        {
          title: "Market readiness",
          text: "Stay aligned with Legal Metrology expectations for packaged goods and instruments.",
        },
        {
          title: "Stronger documentation hygiene",
          text: "A clean file makes inspections, renewals, and future filings easier.",
        },
      ],
      testimonialsTitle: "What clients say",
      testimonials: [
        {
          quote:
            "The checklist and follow-ups made LMPC registration much easier than doing it alone.",
          name: "Operations lead, packaging business",
        },
        {
          quote:
            "Clear communication on documents and timelines. Exactly what we needed for importer compliance.",
          name: "Import coordinator",
        },
      ],
      whyTitle: "Why choose Instacertify",
      whyUs: [
        { value: "Expert", label: "Compliance guidance" },
        { value: "Clear", label: "Document checklists" },
        { value: "Fast", label: "Response turnaround" },
        { value: "End-to-end", label: "Filing support" },
      ],
      faqsTitle: "FAQs",
      faqs: [
        {
          q: "What does the Legal Metrology department oversee?",
          a: "It regulates accuracy and compliance for weights, measures, and many packaged commodities used in trade.",
        },
        {
          q: "Who issues LMPC licences?",
          a: "Applications are typically examined by Legal Metrology officials and granted through the designated controller process after review and fee payment.",
        },
        {
          q: "Which products may need mandatory declarations?",
          a: "Pre-packaged commodities often need packer/importer/manufacturer details, net quantity, MRP, and related declarations under Legal Metrology rules.",
        },
        {
          q: "Can Instacertify help if I am unsure which licence I need?",
          a: "Yes. Start with the form and our team will help identify the likely pathway based on your product and business activity.",
        },
      ],
      bottomCtaText: "Ready to start your LMPC registration?",
    },
    seo: {
      title: "LMPC Registration Support | Instacertify",
      description:
        "Instacertify helps with LMPC / Legal Metrology registration for importers, manufacturers, and packers. Get consultation, document guidance, and filing support.",
      keywords:
        "LMPC registration, Legal Metrology, LMPC certificate, importer registration, Instacertify",
      robots: "index,follow",
    },
  },
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
];

for (const sample of samples) {
  const existing = getPageBySlug(sample.slug);
  if (existing) {
    updatePage(existing.id, sample);
    console.log(`Updated page: /${sample.slug}`);
  } else {
    createPage(sample);
    console.log(`Created page: /${sample.slug}`);
  }
}

console.log(`Total pages: ${listPages().length}`);

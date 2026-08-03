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
  support_phone: "",
  support_whatsapp: "",
});

const samples = [
  {
    slug: "lmpc-registration",
    title: "Legal Metrology Act Registration",
    design: "service",
    status: "published",
    brandName: "Instacertify",
    headline: "Legal Metrology Act Registration",
    subheadline:
      "Measurements are part of everyday commerce. Get guided support for LMPC / Legal Metrology registration covering benefits, documents, procedure, and compliance readiness.",
    ctaLabel: "Get Free Consultation",
    ctaUrl: "https://instacertify.com",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "An Overview of Legal Metrology Act Registration",
        text: "Legal Metrology regulates weights, measures, and packaged commodities to keep trade fair and transparent. If you manufacture, import, pack, deal in, or repair regulated weighing/measuring instruments—or sell many pre-packaged goods—you may need registration or licensing under the Legal Metrology Act, 2009 and related rules.",
      },
      {
        heading: "Who typically needs this?",
        text: "Importers, manufacturers, packers, dealers, and repairers dealing with weights & measures or packaged commodities that fall under Legal Metrology requirements.",
      },
    ],
    content: {
      badgeText: "Includes free support",
      ratingText: "Trusted by compliance teams across India",
      headlineHighlight: "",
      expertName: "Talk to Instacertify",
      expertNote: "We are available to discuss your requirement.",
      phone: "",
      whatsapp: "",
      trustPoints: [
        "Document checklist before filing",
        "Pathway guidance for importer, manufacturer, packer & dealer",
        "Dedicated support through application stages",
        "Clear updates on progress and next steps",
      ],
      heroStats: [
        { value: "End-to-end", label: "Filing support" },
        { value: "Expert", label: "Compliance guidance" },
        { value: "Clear", label: "Document checklists" },
        { value: "Fast", label: "Consultation turnaround" },
      ],
      offerText: "",
      offerPrice: "",
      formEnabled: true,
      formTitle: "Enquiry Now",
      formSubmitLabel: "Get Free Consultation",
      formSuccessMessage:
        "Thanks! An Instacertify specialist will contact you shortly.",
      processTitle: "How we work",
      process: [
        {
          title: "Connect with Instacertify",
          text: "Share your requirement. A short discussion helps identify the right LMPC pathway.",
        },
        {
          title: "Dedicated manager",
          text: "We align a specialist to understand your business and guide documentation.",
        },
        {
          title: "Real-time updates",
          text: "Track what is in progress and what is completed at each stage.",
        },
        {
          title: "Job completed",
          text: "Receive registration/certification outcomes with clear handover.",
        },
      ],
      licencesTitle: "Types of Legal Metrology Licence",
      licences: [
        {
          title: "Manufacturer's Licence",
          text: "For makers of weights and measures who need manufacturer licensing support.",
        },
        {
          title: "Repairer Licence",
          text: "For anyone who cleans, lubricates, modifies, or paints any weight or measure.",
        },
        {
          title: "Dealer Licence",
          text: "For those who trade and market weights and measures, often with importer or producer pathways.",
        },
      ],
      typesTitle: "Types of LMPC Certificates",
      types: [
        {
          title: "Weight & Measuring (W&M) Tools",
          text: "",
          items: [
            "Model approval support",
            "Importer registration for W&M equipment",
            "Manufacturer / dealer / repairer pathways",
            "Packer registration where applicable",
          ],
        },
        {
          title: "Other packaged commodities",
          text: "",
          items: [
            "Packer / manufacturer registration",
            "Importer certification / LMPC registration",
          ],
        },
      ],
      documentsTitle: "Documents Required under Legal Metrology Act",
      documents: [
        {
          title: "Manufacturer's License",
          items: [
            "Photo ID and address proof",
            "Date of birth proof",
            "Premises documents, GST, and PAN",
            "Partnership deed (if applicable)",
            "Declarations / affidavit as required",
            "Shop / establishment or trade licence if needed",
          ],
        },
        {
          title: "Repairer’s License",
          items: [
            "Photo ID and address proof",
            "Date of birth proof",
            "Premises documents, GST, and PAN",
            "Equipment list and experience certificates where required",
            "Declarations / affidavit as required",
          ],
        },
        {
          title: "Dealer License",
          items: [
            "Photo ID and address proof",
            "Date of birth proof",
            "Premises documents, GST, and PAN",
            "Model approval papers where applicable",
            "List of equipment / tools",
          ],
        },
      ],
      detailProcessTitle: "Procedure for Legal Metrology Registration",
      detailProcess: [
        {
          title: "Application filing",
          text: "Prepare and submit the application in the prescribed format with supporting documents to the relevant Legal Metrology authority.",
        },
        {
          title: "Premises inspection",
          text: "An inspector may examine the premises and documentation to assess suitability and prepare a report.",
        },
        {
          title: "Application review",
          text: "Authorities review the file and may raise objections if corrections or additional documents are needed.",
        },
        {
          title: "Fee payment",
          text: "After assessment, pay the applicable licence/registration fee as directed.",
        },
        {
          title: "Certificate issuance",
          text: "On successful completion, the LMPC / Legal Metrology certificate or licence is issued in the prescribed format.",
        },
      ],
      benefitsTitle: "Benefits of LMPC Certificate under Legal Metrology Act",
      benefits: [
        {
          title: "Fair trade clarity",
          text: "Accurate measurement practices strengthen trust between sellers and buyers.",
        },
        {
          title: "Lower commercial friction",
          text: "Proper compliance reduces disputes, rework, and avoidable delays.",
        },
        {
          title: "Market readiness",
          text: "Stay aligned with Legal Metrology expectations for instruments and packaged goods.",
        },
        {
          title: "Stronger documentation hygiene",
          text: "A clean compliance file makes inspections, renewals, and future filings easier.",
        },
      ],
      penaltiesTitle: "Penalties for Non-Compliance",
      penalties: [
        {
          title: "Regulatory exposure",
          text: "Non-compliance with Legal Metrology rules can attract notices, penalties, and business disruption depending on the violation.",
        },
        {
          title: "Operational risk",
          text: "Missing licences or incorrect declarations can delay shipments, sales, or inspections.",
        },
      ],
      testimonialsTitle: "What clients say",
      testimonials: [
        {
          quote:
            "The checklist and follow-ups made Legal Metrology registration much easier than doing it alone.",
          name: "Importer, Delhi NCR",
        },
        {
          quote:
            "Clear communication on documents and timelines. Exactly what we needed for compliance.",
          name: "Packaging business owner",
        },
      ],
      whyTitle: "Why Instacertify?",
      whyUs: [
        { value: "Expert", label: "Compliance guidance" },
        { value: "Clear", label: "Document checklists" },
        { value: "Fast", label: "Response turnaround" },
        { value: "End-to-end", label: "Filing support" },
      ],
      faqsTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "What is Legal Metrology Act Registration?",
          a: "It is the process of obtaining the required registration or licence under the Legal Metrology framework for regulated weights, measures, or packaged commodities.",
        },
        {
          q: "What is an LMPC Certificate?",
          a: "An LMPC certificate generally refers to Legal Metrology Packaged Commodities related registration/compliance needed for certain manufacturing, packing, or importing activities.",
        },
        {
          q: "What documents are basically required?",
          a: "Common requirements include identity/address proof, business/premises papers, GST/PAN, and activity-specific documents for manufacturer, dealer, repairer, or importer pathways.",
        },
        {
          q: "What is the process to get LMPC support with Instacertify?",
          a: "Share your requirement via the enquiry form, receive pathway guidance and a document checklist, then get support through filing and follow-ups.",
        },
        {
          q: "What is the difference between manufacturers, dealers and repairers?",
          a: "Manufacturers make weights/measures, dealers trade them, and repairers service or alter them. Each pathway has its own licensing requirements.",
        },
      ],
      bottomCtaText: "Need help? Talk to an expert",
    },
    seo: {
      title:
        "Legal Metrology Act Registration | LMPC Certificate Support | Instacertify",
      description:
        "Legal Metrology Act registration support from Instacertify. Learn benefits, documents, procedure, penalties, and get a free consultation for LMPC compliance.",
      keywords:
        "Legal Metrology Act registration, LMPC certificate, Legal Metrology licence, documents, procedure, Instacertify",
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

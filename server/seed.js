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
      formSubtitle: "Legal Metrology / LMPC guidance",
      formSubmitLabel: "Get Free Consultation",
      formSuccessMessage:
        "Thanks! An Instacertify specialist will contact you shortly.",
      formTrustPoints: [
        "Free consultation",
        "Document checklist",
        "End-to-end support",
      ],
      scrollCtaText: "Start your Legal Metrology registration today",
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
    slug: "bis-registration",
    title: "BIS Registration",
    design: "service",
    status: "published",
    brandName: "Instacertify",
    headline: "Get BIS Certified Fast",
    subheadline:
      "BIS registration support for ISI Mark, CRS, FMCS, Hallmark, and Scheme X pathways — documentation, testing coordination, and filing guidance end to end.",
    ctaLabel: "Get Free Quote",
    ctaUrl: "https://instacertify.com",
    heroImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "Bureau of Indian Standards — overview",
        text: "BIS certification helps ensure products meet Indian safety, quality, and reliability requirements. For many regulated categories, certification is mandatory before manufacture, import, or sale in India.",
      },
      {
        heading: "Who typically needs BIS registration?",
        text: "Domestic manufacturers, foreign manufacturers entering India, importers, brand owners, and electronics/IT sellers whose products fall under ISI, CRS, FMCS, Hallmark, or Scheme X requirements.",
      },
    ],
    content: {
      badgeText: "Free consultation",
      ratingText: "Expert guidance for ISI, CRS, FMCS & more",
      headlineHighlight: "— Compliant",
      expertName: "Talk to Instacertify",
      expertNote: "Free consultation · same-day callback",
      phone: "",
      whatsapp: "",
      trustPoints: [
        "Identify the right BIS scheme for your product",
        "Documentation and application support",
        "Testing coordination guidance",
        "End-to-end follow-up through certification",
      ],
      heroStats: [
        { value: "ISI", label: "Mark pathway" },
        { value: "CRS", label: "Electronics route" },
        { value: "FMCS", label: "Foreign makers" },
        { value: "End-to-end", label: "Filing support" },
      ],
      formEnabled: true,
      formTitle: "Free Consultation",
      formSubtitle: "Same-day callback · Get best price & timeline",
      formSubmitLabel: "Get Free Consultation",
      formSuccessMessage:
        "Thanks! An Instacertify specialist will contact you shortly.",
      formTrustPoints: [
        "Free consultation",
        "Fast response",
        "End-to-end support",
      ],
      scrollCtaText: "Get BIS Compliant Faster — Talk To Our Experts",
      processTitle: "How we work",
      process: [
        {
          title: "Connect & scope",
          text: "Share your product and manufacturing location so we can map the right BIS pathway.",
        },
        {
          title: "Documentation & testing plan",
          text: "Get a checklist covering reports, business papers, and lab/testing coordination needs.",
        },
        {
          title: "Application support",
          text: "Guidance for portal filing, follow-ups, and inspection readiness where applicable.",
        },
        {
          title: "Certification handover",
          text: "Track progress through grant/renewal milestones with clear next steps.",
        },
      ],
      typesTitle: "Types of BIS certification",
      types: [
        {
          title: "ISI Mark",
          text: "Common pathway for many domestic manufacturers needing product certification under Indian Standards.",
          items: [
            "Product standard mapping",
            "Factory / quality documentation support",
            "Application and inspection readiness guidance",
          ],
        },
        {
          title: "CRS Registration",
          text: "Compulsory Registration Scheme route often used for electronics and IT products before sale in India.",
          items: [
            "Model/product category guidance",
            "Test report coordination support",
            "Online application package support",
          ],
        },
        {
          title: "FMCS",
          text: "Foreign Manufacturer Certification Scheme support for overseas factories selling into India.",
          items: [
            "AIR / representation guidance",
            "Documentation readiness",
            "Inspection and liaison support planning",
          ],
        },
        {
          title: "Hallmark & Scheme X",
          text: "Support pathways for jewellery hallmarking and machinery-related Scheme X categories where applicable.",
          items: [
            "Eligibility check",
            "Document checklist",
            "Filing and follow-up support",
          ],
        },
      ],
      documentsTitle: "Documents often required for BIS registration",
      documents: [
        {
          title: "Business basics",
          items: [
            "Business licence / incorporation papers",
            "GST certificate",
            "PAN card",
            "Brand / trademark certificate where applicable",
          ],
        },
        {
          title: "Technical package",
          items: [
            "Test reports from recognized labs where required",
            "Factory layout / process flow",
            "Raw material list",
            "Quality system documentation",
          ],
        },
      ],
      detailProcessTitle: "How is the process done?",
      detailProcess: [
        {
          title: "Identify the right scheme",
          text: "Confirm whether your product needs ISI, CRS, FMCS, Hallmark, Scheme X, or another route based on category and manufacturing location.",
        },
        {
          title: "Prepare documents and testing",
          text: "Compile business and technical documents and coordinate product testing where required.",
        },
        {
          title: "Submit application",
          text: "File through the relevant BIS portal with the complete documentation package.",
        },
        {
          title: "Inspection / review",
          text: "Support review queries and factory inspection readiness where the scheme requires it.",
        },
        {
          title: "Grant and compliance",
          text: "Receive certification outcomes and plan renewals / ongoing compliance.",
        },
      ],
      benefitsTitle: "Benefits of BIS certification",
      benefits: [
        {
          title: "Legal market access",
          text: "Sell regulated products in India with the required certification pathway in place.",
        },
        {
          title: "Buyer and retail confidence",
          text: "Demonstrate conformity to recognized Indian standards and safety expectations.",
        },
        {
          title: "Import / customs readiness",
          text: "Reduce clearance friction for products that need BIS before entry or sale.",
        },
        {
          title: "Brand protection",
          text: "Avoid seizures, penalties, and reputation damage linked to non-compliance.",
        },
      ],
      penaltiesTitle: "Non-compliance isn’t just a risk",
      penalties: [
        {
          title: "Penalties and enforcement",
          text: "Selling without required BIS certification can attract monetary penalties, product action, and other enforcement measures.",
        },
        {
          title: "Business disruption",
          text: "Missing certification can block imports, marketplace listings, and retail distribution.",
        },
      ],
      testimonialsTitle: "Trusted by compliance-focused teams",
      testimonials: [
        {
          quote:
            "Clear guidance on whether we needed CRS or another route, plus a practical document checklist.",
          name: "Electronics brand manager",
        },
        {
          quote:
            "Helpful end-to-end support for documentation and follow-ups. Made BIS registration far less confusing.",
          name: "Import operations lead",
        },
      ],
      whyTitle: "Your expert partner in BIS compliance",
      whyUs: [
        { value: "Scheme", label: "Selection guidance" },
        { value: "Docs", label: "Checklist ready" },
        { value: "Filing", label: "Application support" },
        { value: "Follow-up", label: "Until handover" },
      ],
      faqsTitle: "Got questions? We have answers",
      faqs: [
        {
          q: "What is BIS certification and why is it mandatory?",
          a: "BIS certification is a quality/conformity mark framework used in India. For many regulated products it is mandatory before legal sale, helping ensure safety and standard compliance.",
        },
        {
          q: "How long does the BIS certification process take?",
          a: "Timelines vary by scheme and product. CRS is often weeks, while ISI/FMCS can take longer depending on testing, inspection, and documentation readiness.",
        },
        {
          q: "Can foreign manufacturers get BIS certification?",
          a: "Yes. Foreign manufacturers commonly use FMCS or CRS with an Authorized Indian Representative, depending on product category.",
        },
        {
          q: "Which products require mandatory BIS CRS registration?",
          a: "Many electronics and IT products such as phones, laptops, LED lights, power banks, chargers, and related accessories may require CRS before sale in India.",
        },
        {
          q: "What documents are needed for BIS registration?",
          a: "Common papers include business licence, GST, PAN, trademark (if applicable), test reports, factory/process details, and quality documentation. Exact needs depend on the scheme.",
        },
        {
          q: "Do you help with certification renewal?",
          a: "Yes. Instacertify can support renewal reminders, documentation updates, re-testing coordination, and filing follow-ups.",
        },
      ],
      bottomCtaText: "Get BIS Compliant Faster! Talk To Our Experts Today",
    },
    seo: {
      title: "BIS Registration India | ISI, CRS, FMCS Support | Instacertify",
      description:
        "BIS registration support from Instacertify for ISI Mark, CRS, FMCS, Hallmark and Scheme X. Get free consultation on documents, process, and timelines.",
      keywords:
        "BIS registration, ISI Mark, CRS registration, FMCS, Hallmark, Scheme X, Instacertify",
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

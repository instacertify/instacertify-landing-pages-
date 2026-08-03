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
      serviceOptions: [
        "LMPC / Packaged Commodities",
        "Manufacturer Licence",
        "Dealer Licence",
        "Repairer Licence",
        "Importer Registration",
        "Not Sure – Need Guidance",
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
    headline: "Get BIS Certification Without Delays and Rejections",
    subheadline:
      "End-to-end support for BIS ISI, CRS, and FMCS approvals. Fast documentation, expert handling, and clear guidance from first checklist to certification handover.",
    ctaLabel: "Talk to BIS Experts",
    ctaUrl: "https://instacertify.com",
    heroImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What is BIS?",
        text: "BIS stands for Bureau of Indian Standards. It is the Indian standards body that helps ensure products manufactured or imported for the Indian market meet applicable safety and quality parameters.",
      },
      {
        heading: "What is BIS Certification?",
        text: "BIS certification is an approval framework confirming that a manufacturer or importer is aligned with the relevant Indian Standard / scheme requirements for their product category.",
      },
      {
        heading: "Why BIS certification matters",
        text: "For many regulated products it is mandatory before sale or import in India. It protects consumers from low-quality goods and builds trust for manufacturers and importers.",
      },
    ],
    content: {
      offerBanner: "Limited Offer — Free Expert Consultation",
      badgeText: "Free expert consultation",
      ratingText: "Trusted guidance for ISI, CRS, FMCS & Hallmark pathways",
      headlineHighlight: "",
      expertName: "Get Expert BIS Advice Now",
      expertNote: "Fill in your details — our advisor will call you shortly.",
      phone: "",
      whatsapp: "",
      trustPoints: [
        "Scheme selection for ISI, CRS, FMCS, Hallmark & Scheme X",
        "Documentation and portal filing support",
        "Lab / testing coordination guidance",
        "Follow-up through review and grant stages",
      ],
      heroStats: [
        { value: "ISI + CRS", label: "Core pathways" },
        { value: "FMCS", label: "Foreign makers" },
        { value: "Clear", label: "Document checklists" },
        { value: "End-to-end", label: "Filing support" },
      ],
      formEnabled: true,
      formTitle: "Get Expert BIS Advice Now",
      formSubtitle: "Fill in your details — our advisor will call within 30 minutes",
      formSubmitLabel: "Get Free Expert Consultation",
      formSuccessMessage:
        "Thanks! An Instacertify specialist will contact you shortly.",
      formTrustPoints: [
        "100% confidential",
        "No spam",
        "Quick response",
      ],
      serviceOptions: [
        "BIS CRS Registration",
        "BIS ISI Mark Certification",
        "FMCS (Foreign Manufacturer)",
        "BIS Hallmark Registration",
        "BIS Scheme X",
        "Not Sure – Need Guidance",
      ],
      scrollCtaText: "Ready to get your BIS certificate? Talk to our experts",
      processTitle: "How we get your BIS done",
      process: [
        {
          title: "Connect & scope",
          text: "Share your product and manufacturing location so we can map the right BIS pathway.",
        },
        {
          title: "Documentation plan",
          text: "Receive a checklist covering business papers, technical files, and testing needs.",
        },
        {
          title: "Testing coordination",
          text: "Guidance for BIS-recognized lab testing and report readiness where required.",
        },
        {
          title: "Application & follow-up",
          text: "Support portal filing, queries, inspection readiness, and grant/renewal handover.",
        },
      ],
      typesTitle: "Types of BIS certification",
      types: [
        {
          title: "ISI Mark for Domestic Manufacturers",
          text: "ISI Mark certification for Indian manufacturers whose products must meet applicable BIS standards and testing parameters.",
          items: [
            "Who can apply: Indian manufacturers",
            "Valid for about 1 year (renewal applies)",
            "Support: application, lab coordination, audit prep",
          ],
        },
        {
          title: "FMCS for Foreign Manufacturers",
          text: "Foreign Manufacturer Certification Scheme support for overseas factories selling products into India.",
          items: [
            "Who can apply: foreign manufacturers / importers with AIR setup",
            "Valid for about 1 year (renewal applies)",
            "Support: AIR guidance, docs, audit coordination",
          ],
        },
        {
          title: "Compulsory Registration Scheme (CRS)",
          text: "CRS is commonly used for telecom, IT, and electronics products that need testing at BIS-recognized labs before sale in India.",
          items: [
            "Who can apply: Indian makers, importers, foreign companies with AIR",
            "Valid for about 2 years (renewal applies)",
            "Support: test report coordination and portal filing",
          ],
        },
        {
          title: "Hallmark Registration",
          text: "Hallmark registration support for gold and silver jewellery businesses needing purity and compliance assurance.",
          items: [
            "Who can apply: gold and silver outlets / shops",
            "Often treated as long-term registration",
            "Support: application and approval tracking",
          ],
        },
      ],
      timelinesTitle: "How long does BIS certification take?",
      timelines: [
        {
          title: "Hallmark Certificate",
          value: "3–5 Days",
          text: "Often the fastest turnaround for eligible jewellery registrations.",
        },
        {
          title: "ISI Mark Certificate",
          value: "30–60 Days",
          text: "Typical planning window for domestic manufacturer pathways.",
        },
        {
          title: "CRS Certificate",
          value: "90–120 Days",
          text: "Common range for electronics / IT / telecom categories.",
        },
        {
          title: "FMCS Certificate",
          value: "120–180 Days",
          text: "Longer cycle for foreign manufacturer certifications.",
        },
      ],
      productsTitle: "Mandatory products and categories",
      products: [
        {
          title: "FMCS & ISI Mark examples",
          text: "",
          items: [
            "Air purifier",
            "Pressure cooker",
            "Refrigerator",
            "Cement",
            "Helmet",
            "LPG cylinder",
            "Switches / motors",
            "Plywood / steel products",
          ],
        },
        {
          title: "CRS examples",
          text: "",
          items: [
            "Laptop / tablet",
            "Monitor / TV",
            "Printer / scanner",
            "LED products",
            "Bluetooth speaker",
            "Camera",
            "Power bank / charger accessories",
            "External storage devices",
          ],
        },
        {
          title: "Scheme X examples",
          text: "",
          items: [
            "Circuit breaker",
            "Pumps / cranes",
            "Switchgear",
            "Transformers",
            "Rotary electrical machines",
            "Industrial machinery categories",
          ],
        },
      ],
      documentsTitle: "What you'll need for BIS registration",
      documents: [
        {
          title: "For ISI Mark",
          items: [
            "Business registration proof",
            "Factory address proof",
            "Product specifications",
            "List of machinery",
            "Process flowchart",
            "Quality control plan",
            "In-house test facility details",
            "Calibration certificates",
            "Raw material list",
            "Identity and address proof",
          ],
        },
        {
          title: "For BIS FMCS",
          items: [
            "Business license",
            "Manufacturing unit details",
            "Machinery / equipment list",
            "Quality control system",
            "Production flowchart",
            "Calibration certificates",
            "Product technical specification",
            "Factory layout plan",
            "Raw material details",
            "Packaging and labelling details",
          ],
        },
        {
          title: "For BIS CRS",
          items: [
            "Business registration certificate",
            "Brand license",
            "ID and address proof of applicant",
            "Product / model specifications",
            "Circuit / block diagram",
            "Test report from BIS-recognized laboratory",
            "Factory address proof",
            "AIR authorization letter where applicable",
            "Self-declaration of conformity",
            "Undertaking / affidavit",
          ],
        },
      ],
      detailProcessTitle: "How we get your BIS done",
      detailProcess: [
        {
          title: "Create pathway & login readiness",
          text: "Identify the correct scheme and prepare portal credentials / applicant details.",
        },
        {
          title: "Submit application package",
          text: "Compile and file documents for ISI, CRS, FMCS, or Hallmark as applicable.",
        },
        {
          title: "Testing / sample stage",
          text: "Coordinate sample testing at recognized labs and review reports before submission.",
        },
        {
          title: "Audit / review",
          text: "Support factory audit readiness or portal queries depending on the scheme.",
        },
        {
          title: "Grant of certificate",
          text: "Track approval and hand over next steps for marking, compliance, and renewal.",
        },
      ],
      benefitsTitle: "Benefits of BIS certification",
      benefits: [
        {
          title: "Legal market access",
          text: "Sell or import regulated products in India with the required scheme in place.",
        },
        {
          title: "Consumer confidence",
          text: "Signal that products meet recognized Indian quality and safety expectations.",
        },
        {
          title: "Lower enforcement risk",
          text: "Reduce exposure to seizures, penalties, and listing / customs disruptions.",
        },
        {
          title: "Clearer go-to-market planning",
          text: "Use scheme timelines and document checklists to plan launches with fewer surprises.",
        },
      ],
      penaltiesTitle: "Non-compliance risks",
      penalties: [
        {
          title: "Mandatory for many categories",
          text: "Without valid BIS certification, applicable products may not be legally imported or sold in India.",
        },
        {
          title: "Operational disruption",
          text: "Missing approvals can delay customs clearance, marketplace listings, and retail distribution.",
        },
      ],
      testimonialsTitle: "What clients say",
      testimonials: [
        {
          quote:
            "BIS felt complex at first, but the checklist and step-by-step guidance made the process manageable.",
          name: "Operations lead, manufacturing brand",
        },
        {
          quote:
            "Helpful support on electronics testing requirements and portal filing. Saved us a lot of back-and-forth.",
          name: "Electronics category manager",
        },
        {
          quote:
            "Clear communication on what needed fixing before submission. No vague promises — just practical advice.",
          name: "Importer, industrial products",
        },
      ],
      whyTitle: "Why businesses choose Instacertify",
      whyUs: [
        { value: "One-stop", label: "Compliance guidance" },
        { value: "End-to-end", label: "Docs to follow-up" },
        { value: "Transparent", label: "Scoped next steps" },
        { value: "Dedicated", label: "Project support" },
      ],
      faqsTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "What is a BIS certificate?",
          a: "BIS issues conformity / quality certifications such as CRS, ISI Mark, Hallmark, and FMCS for manufacturers and importers of regulated product categories.",
        },
        {
          q: "Is BIS certification mandatory?",
          a: "For many product categories, yes. Applicable products generally cannot be imported or sold in India without the required BIS certification.",
        },
        {
          q: "Who needs BIS certification?",
          a: "Indian manufacturers, foreign manufacturers, domestic importers, Authorized Indian Representatives, and e-commerce sellers dealing in regulated categories.",
        },
        {
          q: "What is the validity of BIS certification?",
          a: "It varies by scheme. CRS is often around 2 years, ISI/FMCS around 1 year, and Hallmark registration may be longer-term. Renewals and ongoing compliance still apply.",
        },
        {
          q: "What is the FMCS certification scheme?",
          a: "FMCS is the Foreign Manufacturer Certification Scheme used by overseas manufacturers who want to sell covered products in the Indian market.",
        },
        {
          q: "How much does BIS registration cost?",
          a: "Cost depends on scheme, product category, number of models, government fees, and lab testing. Contact Instacertify for a scoped consultation and quote.",
        },
      ],
      bottomCtaText: "Ready to get your BIS certificate?",
    },
    seo: {
      title: "BIS Registration in India | ISI, CRS, FMCS Consultants | Instacertify",
      description:
        "Get BIS certification support from Instacertify for ISI Mark, CRS, FMCS, Hallmark and Scheme X. Free expert consultation on documents, timelines, and filing.",
      keywords:
        "BIS registration, BIS license certificate, ISI Mark, CRS, FMCS, Hallmark, Scheme X, Instacertify",
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

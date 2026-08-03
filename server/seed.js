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
    slug: "msds-certificate",
    title: "MSDS Certificate",
    design: "service",
    status: "published",
    brandName: "Instacertify",
    headline: "MSDS Certificate for Safe Handling & Export Compliance",
    subheadline:
      "Material Safety Data Sheet support for storing, handling, transporting, and exporting hazardous products — clear documentation for employees, handlers, and customs readiness.",
    ctaLabel: "Get Started Now",
    ctaUrl: "https://instacertify.com",
    heroImage:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "Overview of MSDS Certificate",
        text: "MSDS (Material Safety Data Sheet) is a technical safety document covering chemical and physical properties of a product—especially hazardous substances—plus guidance for safe handling, storage, transport, and disposal. Under GHS it is formally called SDS (Safety Data Sheet), but many Indian and Asian trade workflows still refer to it as MSDS for import/export compliance.",
      },
      {
        heading: "Who can apply for MSDS support in India?",
        text: "Companies that manufacture, import, export, transport, or store chemical / hazardous products—including chemical makers, agrochemical firms, paint & coating units, pharma/API, fragrance & essential oils, cosmetics, research labs, logistics providers, and shipping agents.",
      },
      {
        heading: "Validity, renewal & fees",
        text: "MSDS documentation is commonly maintained on a multi-year review cycle (often around 3 years for controlled products). Fees vary by substance complexity and urgency. Instacertify helps scope documentation needs and prepare a clear package for your product.",
      },
      {
        heading: "MSDS vs SDS",
        text: "Older MSDS formats varied by supplier and country. SDS under GHS follows a mandatory 16-section structure with standardized hazard communication. For cross-border shipments, aligning to the destination market’s SDS/GHS expectations reduces clearance risk.",
      },
    ],
    content: {
      offerBanner: "Free expert consultation for MSDS / SDS documentation",
      badgeText: "Consultation by expert",
      ratingText: "Trusted guidance for chemical safety documentation",
      headlineHighlight: "",
      expertName: "Talk to an Instacertify specialist",
      expertNote: "We’ll never share your details with third parties.",
      phone: "",
      whatsapp: "",
      trustPoints: [
        "Documentation checklist for hazardous products",
        "Support aligned to common GHS / SDS section structure",
        "Useful for export, logistics, and handling workflows",
        "Clear next steps from product data to draft readiness",
      ],
      heroStats: [
        { value: "16", label: "SDS sections covered" },
        { value: "9", label: "Hazard class groups" },
        { value: "Export", label: "Trade documentation" },
        { value: "Expert", label: "Compliance guidance" },
      ],
      formEnabled: true,
      formTitle: "Consultation by expert",
      formSubtitle: "Share your product details — we’ll guide the MSDS / SDS path",
      formSubmitLabel: "Get Started Now",
      formSuccessMessage:
        "Thanks! An Instacertify specialist will contact you shortly.",
      formTrustPoints: [
        "No spam",
        "Confidential enquiry",
        "Quick response",
      ],
      serviceOptions: [
        "New MSDS / SDS preparation",
        "MSDS review / update",
        "Export documentation support",
        "Renewal / re-issue support",
        "Not Sure – Need Guidance",
      ],
      scrollCtaText: "Need MSDS Certificate support? Talk to our experts",
      processTitle: "How we work",
      process: [
        {
          title: "Gather product data",
          text: "Collect composition, product category, and handling details needed for the safety sheet.",
        },
        {
          title: "Document checklist",
          text: "Confirm GST, COA/test inputs, product images, and ingredient breakdown.",
        },
        {
          title: "Draft & organize",
          text: "Structure hazard, first-aid, storage, transport, and regulatory information clearly.",
        },
        {
          title: "Handover",
          text: "Deliver a review-ready package and guidance for use in trade / handling workflows.",
        },
      ],
      typesTitle: "Different classes of hazardous products under MSDS",
      types: [
        {
          title: "Flammable gas",
          text: "Gases that can ignite easily, such as aerosols and camping gas.",
          items: ["Ignition risk in storage and transit", "Needs clear handling controls"],
        },
        {
          title: "Explosives",
          text: "Substances that can detonate or trigger explosive devices.",
          items: ["High transport controls", "Emergency response clarity required"],
        },
        {
          title: "Flammable liquids & solids",
          text: "Liquids/solids that emit flammable vapours or contribute to fire risk.",
          items: ["Examples: solvents, oil-based paints, matches", "Storage temperature and packaging matter"],
        },
        {
          title: "Toxic, oxidizing, corrosive, radioactive & misc.",
          text: "Broader hazard groups needing exposure, spill, and disposal guidance.",
          items: [
            "Toxic substances and insecticides",
            "Oxidizers that intensify fire",
            "Corrosives and radioactive sources",
            "Miscellaneous dangerous goods (e.g. dry ice, asbestos)",
          ],
        },
      ],
      timelinesTitle: "Validity and renewal",
      timelines: [
        {
          title: "Typical validity window",
          value: "About 3 years",
          text: "Common review cycle for controlled-product MSDS documentation; confirm product-specific needs.",
        },
        {
          title: "Renewal",
          value: "On review cycle",
          text: "Update composition, shipment, and safety data when products or regulations change.",
        },
        {
          title: "Standard documentation",
          value: "Scoped quote",
          text: "Fees usually vary by substance complexity and urgency rather than a single flat rate.",
        },
        {
          title: "Complex mixtures / urgent",
          value: "Higher effort",
          text: "Multi-component or rush requests need more technical review and coordination.",
        },
      ],
      productsTitle: "Who typically needs MSDS documentation",
      products: [
        {
          title: "Manufacturers & formulators",
          text: "",
          items: [
            "Chemical manufacturers",
            "Agrochemical companies",
            "Paint and coating industry",
            "Pharmaceutical and API manufacturers",
            "Fragrance / perfume / essential oil makers",
            "Cosmetic manufacturers",
          ],
        },
        {
          title: "Trade & logistics",
          text: "",
          items: [
            "Chemical importers",
            "Exporters of hazardous goods",
            "Logistics and freight forwarders",
            "Shipping agents",
            "Research labs and academic institutions",
          ],
        },
      ],
      documentsTitle: "Documents required for MSDS Certificate",
      documents: [
        {
          title: "Business & contact",
          items: [
            "Valid GST registration certificate",
            "Email ID and contact number",
            "Company letterhead for application / request",
          ],
        },
        {
          title: "Product & technical",
          items: [
            "Name and category of the product",
            "Ingredient composition with percent-wise breakdown",
            "Certificate of Analysis and/or third-party test reports",
            "Clear product images (front and back)",
          ],
        },
      ],
      detailProcessTitle: "Online process for MSDS Certificate",
      detailProcess: [
        {
          title: "Provide documents",
          text: "Share business papers, product composition, COA/test inputs, and images.",
        },
        {
          title: "Verification",
          text: "Review submitted details for completeness and consistency before drafting.",
        },
        {
          title: "Fee confirmation",
          text: "Confirm scoped commercials based on product complexity and urgency.",
        },
        {
          title: "Preparation & organizing",
          text: "Compile chemical/physical properties, first-aid, handling, and transport guidance into the sheet structure.",
        },
        {
          title: "Issuance / handover",
          text: "Deliver the prepared MSDS/SDS package for your compliance and shipping use cases.",
        },
      ],
      benefitsTitle: "Benefits of MSDS Certificate",
      benefits: [
        {
          title: "Safer handling guidance",
          text: "Gives teams clear information for production, storage, transport, and disposal of hazardous substances.",
        },
        {
          title: "Trade readiness",
          text: "Supports import/export documentation expectations and smoother customs conversations.",
        },
        {
          title: "Emergency preparedness",
          text: "Provides first-aid, spill, and fire-related technical data when incidents occur.",
        },
        {
          title: "Compliance starting point",
          text: "Acts as a foundation document for chemical registration and workplace safety workflows.",
        },
      ],
      penaltiesTitle: "Why incomplete safety sheets create risk",
      penalties: [
        {
          title: "Shipment delays",
          text: "Missing or inconsistent hazard documentation can slow customs clearance and logistics handoffs.",
        },
        {
          title: "Workplace exposure risk",
          text: "Handlers and staff need clear precautions for storage, PPE, spills, and disposal.",
        },
      ],
      testimonialsTitle: "What clients say",
      testimonials: [
        {
          quote:
            "Clear checklist for composition and COA inputs. Made MSDS documentation far less confusing.",
          name: "Export coordinator, specialty chemicals",
        },
        {
          quote:
            "Helpful guidance on SDS section structure for our coating products before shipment.",
          name: "Operations lead, coatings manufacturer",
        },
      ],
      whyTitle: "Why Instacertify for MSDS / SDS support",
      whyUs: [
        { value: "Clear", label: "Document checklists" },
        { value: "Structured", label: "16-section alignment" },
        { value: "Practical", label: "Export-focused guidance" },
        { value: "Responsive", label: "Expert consultation" },
      ],
      faqsTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "What is the full form of MSDS?",
          a: "MSDS means Material Safety Data Sheet. It covers hazards, properties, safe handling, and emergency measures for chemical/hazardous products.",
        },
        {
          q: "How many sections are in an MSDS / SDS?",
          a: "Modern SDS documents follow a 16-section structure covering identification, hazards, composition, first aid, fire-fighting, spill response, handling/storage, exposure controls, properties, stability, toxicology, ecology, disposal, transport, regulatory information, and other information.",
        },
        {
          q: "Who is eligible for MSDS documentation support?",
          a: "Manufacturers, importers, exporters, logistics teams, and other businesses dealing with hazardous or chemical products that need safety documentation for handling or trade.",
        },
        {
          q: "What documents are required?",
          a: "Common inputs include GST certificate, contact details, product images, ingredient composition, and Certificate of Analysis / lab test reports.",
        },
        {
          q: "What does MSDS support usually cost?",
          a: "Pricing depends on product complexity, number of substances, and urgency. Instacertify provides a scoped consultation instead of a one-size quote.",
        },
        {
          q: "What is the validity of an MSDS Certificate?",
          a: "Many workflows treat MSDS/SDS as subject to periodic review (often around 3 years for controlled products). Update whenever composition or regulatory needs change.",
        },
        {
          q: "Can MSDS documentation be renewed or updated online?",
          a: "Yes. Renewals/updates typically involve refreshing product data and submitting an updated documentation package.",
        },
      ],
      bottomCtaText: "Get support for your MSDS / SDS documentation",
    },
    seo: {
      title: "MSDS Certificate | Benefits, Documents, Process & Fees | Instacertify",
      description:
        "MSDS Certificate support from Instacertify for hazardous product safety documentation. Learn benefits, documents, process, validity, fees, and get a free consultation.",
      keywords:
        "MSDS Certificate, Material Safety Data Sheet, SDS, GHS, hazardous chemicals, export compliance, Instacertify",
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

require("dotenv").config();
const db = require("./db");
const {
  createPage,
  getPageBySlug,
  updatePage,
  updateSettings,
  listPages,
} = db;

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
    slug: "sds-certificate",
    title: "SDS / MSDS Certificate & UN38.3 for Battery Shipping",
    design: "battery",
    status: "published",
    brandName: "Instacertify",
    headline: "SDS Certificate, MSDS Certificate & UN38.3 for Battery Shipping",
    subheadline:
      "Complete documentation support from Instacertify Labs Private Limited for SDS/MSDS certificates and UN38.3 testing documentation — critical when shipping lithium batteries and hazardous products for export.",
    ctaLabel: "Get Free Consultation",
    ctaUrl: "https://instacertify.com",
    heroImage:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "SDS Certificate & MSDS Certificate — complete solution",
        text: "SDS (Safety Data Sheet) and MSDS (Material Safety Data Sheet) documentation explain chemical hazards, handling, storage, transport, and emergency measures. Search demand is highest for “msds cert” and related certificate terms. Instacertify helps exporters, importers, and manufacturers prepare clear SDS/MSDS packages for chemicals and related products.",
      },
      {
        heading: "Why UN38.3 matters when shipping batteries",
        text: "UN38.3 is the UN Manual of Tests and Criteria transport test series for lithium cells and batteries. Airlines, freight forwarders, and customs commonly expect UN38.3 test evidence before accepting lithium battery shipments. Pairing SDS/MSDS with UN38.3 support helps you move batteries with fewer documentation gaps.",
      },
      {
        heading: "One partner for shipping-ready compliance docs",
        text: "Instacertify Labs Private Limited focuses on a complete solution: SDS/MSDS preparation or review, UN38.3 pathway guidance for battery shipping, document checklists, and expert consultation — so your team is not juggling multiple vendors for related export paperwork.",
      },
      {
        heading: "MSDS certificate full form & meaning",
        text: "MSDS full form is Material Safety Data Sheet. It is widely used in India and Asian trade workflows, while SDS is the GHS-aligned term with a standard 16-section structure. Both communicate product hazards for safe handling and shipment readiness.",
      },
    ],
    content: {
      offerBanner: "Complete solution: SDS / MSDS Certificate + UN38.3 support for battery shipping",
      badgeText: "Instacertify Labs Private Limited",
      ratingText: "Keyword focus: msds cert · sds certification · msds certificate for export",
      headlineHighlight: "",
      expertName: "Talk to Instacertify",
      expertNote: "Call +91 99999118039 or email contact@instacertify.com",
      phone: "+91 99999118039",
      whatsapp: "9199999118039",
      themeBrand: "#00557A",
      themeAccent: "#F27121",
      themeInk: "#0e1620",
      themeBg: "#f3f6f8",
      brandPrefix: "Insta",
      brandSuffix: "certify",
      logoLightUrl: "/assets/instacertify-logo-light.svg",
      logoDarkUrl: "/assets/instacertify-logo.svg",
      sideRailTitle: "Ship with complete docs",
      sideRailText: "Get SDS/MSDS and UN38.3 guidance in one place — chemicals, batteries, or both.",
      sideHelpTitle: "Need help?",
      sideHelpText: "Talk to Instacertify for battery shipping documentation support.",
      bottomCtaText: "Ready for SDS, MSDS & UN38.3?",
      bottomCtaSubtitle:
        "Complete solution for SDS Certificate, MSDS Certificate, and UN38.3 when shipping batteries.",
      faqsIntro: "Quick answers about SDS, MSDS Certificate, and UN38.3 for battery shipping.",
      footerBlurb:
        "SDS / MSDS Certificate and UN38.3 battery shipping support by Instacertify Labs Private Limited. Contacts and offer match this page.",
      pillarsTitle: "Complete solution pillars",
      navTypes: "Solutions",
      trustPoints: [
        "SDS Certificate & MSDS Certificate documentation support",
        "UN38.3 guidance for lithium battery shipping",
        "Export-focused checklists for chemicals and batteries",
        "Clear consultation with reachable phone & email",
      ],
      heroStats: [
        { value: "SDS", label: "Safety Data Sheet" },
        { value: "MSDS", label: "Certificate support" },
        { value: "UN38.3", label: "Battery shipping" },
        { value: "Export", label: "Complete solution" },
      ],
      formEnabled: true,
      formTitle: "Get SDS / MSDS / UN38.3 guidance",
      formSubtitle: "Tell us your product — chemicals, batteries, or both",
      formSubmitLabel: "Get Free Consultation",
      formSuccessMessage:
        "Thanks! Instacertify will contact you at the earliest on your phone or email.",
      formTrustPoints: [
        "No spam",
        "Confidential enquiry",
        "Human response",
      ],
      serviceOptions: [
        "SDS Certificate",
        "MSDS Certificate",
        "MSDS Certificate for Export",
        "MSDS Certificate for Chemicals",
        "UN38.3 Certificate (Battery Shipping)",
        "Complete Solution (SDS/MSDS + UN38.3)",
        "Not Sure – Need Guidance",
      ],
      scrollCtaText: "Need SDS, MSDS or UN38.3 for battery shipping? Talk to Instacertify",
      processTitle: "How our complete solution works",
      process: [
        {
          title: "Scope your product",
          text: "Share whether you need SDS/MSDS for chemicals, UN38.3 for batteries, or both for export shipping.",
        },
        {
          title: "Document checklist",
          text: "Get a clear list of composition, COA/test inputs, battery model details, and business papers.",
        },
        {
          title: "Prepare / review package",
          text: "Structure SDS/MSDS content and UN38.3 pathway requirements around your shipping use case.",
        },
        {
          title: "Handover & next steps",
          text: "Receive a review-ready package and practical guidance for logistics and compliance teams.",
        },
      ],
      typesTitle: "What this landing page covers",
      types: [
        {
          title: "SDS Certificate",
          text: "GHS-aligned Safety Data Sheet support with a clear 16-section structure for hazard communication.",
          items: [
            "Identification & hazards",
            "Composition & first aid",
            "Handling, storage, transport & disposal",
          ],
        },
        {
          title: "MSDS Certificate",
          text: "Material Safety Data Sheet support for manufacturers, importers, and exporters still using MSDS terminology in India/Asia trade.",
          items: [
            "msds cert / msds certificate online intent",
            "msds certificate for chemicals",
            "msds certificate for export",
          ],
        },
        {
          title: "UN38.3 Certificate for battery shipping",
          text: "Support around UN38.3 transport test documentation expectations for lithium cells/batteries before air/sea freight acceptance.",
          items: [
            "Important when shipping out batteries",
            "Model / packing documentation readiness",
            "Works alongside SDS/MSDS where chemicals or packs require both",
          ],
        },
        {
          title: "Complete solution",
          text: "One Instacertify workflow for related export documents instead of fragmented vendors.",
          items: [
            "Combined SDS/MSDS + UN38.3 scoping",
            "Export checklist in one place",
            "Direct contact: phone + email",
          ],
        },
      ],
      timelinesTitle: "Typical planning windows",
      timelines: [
        {
          title: "SDS / MSDS documentation",
          value: "Scoped per product",
          text: "Depends on composition complexity, available COA/test data, and urgency.",
        },
        {
          title: "MSDS for export",
          value: "Export checklist first",
          text: "Confirm destination expectations early to avoid shipment holds.",
        },
        {
          title: "UN38.3 for batteries",
          value: "Before booking freight",
          text: "Align test evidence and packing docs before airline/forwarder acceptance.",
        },
        {
          title: "Complete solution",
          value: "Parallel tracks",
          text: "Run SDS/MSDS and UN38.3 preparation together when shipping battery products.",
        },
      ],
      productsTitle: "Who this page is for",
      products: [
        {
          title: "Chemical & hazardous goods teams",
          text: "",
          items: [
            "Chemical manufacturers",
            "Importers / exporters",
            "Paint, coatings, agrochemical, pharma/API",
            "Teams searching msds certificate for chemicals",
          ],
        },
        {
          title: "Battery shipping & electronics",
          text: "",
          items: [
            "Lithium battery manufacturers",
            "Device makers shipping packed batteries",
            "Exporters needing UN38.3 readiness",
            "Logistics teams preparing dangerous goods paperwork",
          ],
        },
      ],
      documentsTitle: "Documents commonly required",
      documents: [
        {
          title: "For SDS / MSDS Certificate",
          items: [
            "GST / business registration proof",
            "Product name and category",
            "Ingredient composition (% breakdown)",
            "Certificate of Analysis / lab inputs",
            "Product images (front/back)",
            "Contact email and phone",
          ],
        },
        {
          title: "For UN38.3 battery shipping support",
          items: [
            "Battery / cell model details",
            "Pack configuration and ratings",
            "Existing test reports (if any)",
            "Intended transport mode (air/sea/road)",
            "Shipper / consignee basics",
          ],
        },
      ],
      detailProcessTitle: "Process for SDS, MSDS & UN38.3 support",
      detailProcess: [
        {
          title: "Submit enquiry",
          text: "Choose SDS, MSDS, UN38.3, or complete solution in the form and share product basics.",
        },
        {
          title: "Verification call / email",
          text: "Instacertify confirms scope on +91 99999118039 or contact@instacertify.com.",
        },
        {
          title: "Collect inputs",
          text: "Composition, COA, battery model data, and shipping context.",
        },
        {
          title: "Prepare documentation package",
          text: "Draft/review SDS/MSDS structure and UN38.3 pathway checklist as applicable.",
        },
        {
          title: "Handover for shipping use",
          text: "Deliver a clear package your operations and logistics teams can use.",
        },
      ],
      benefitsTitle: "Benefits of a complete SDS / MSDS / UN38.3 approach",
      benefits: [
        {
          title: "Export clarity",
          text: "Reduce confusion between MSDS certificate language and GHS SDS expectations.",
        },
        {
          title: "Battery shipment readiness",
          text: "Address UN38.3 documentation needs early — important when shipping out batteries.",
        },
        {
          title: "Fewer vendor handoffs",
          text: "Keep related safety and transport docs under one Instacertify workflow.",
        },
        {
          title: "Reachable business contact",
          text: "Phone and email shown clearly for trust and Google landing-page contact expectations.",
        },
      ],
      penaltiesTitle: "Risks of incomplete shipping documentation",
      penalties: [
        {
          title: "Shipment delays or refusals",
          text: "Missing SDS/MSDS or UN38.3 evidence can stall airline, forwarder, or customs acceptance.",
        },
        {
          title: "Handling and compliance gaps",
          text: "Teams need clear hazard and packing information before goods move.",
        },
      ],
      testimonialsTitle: "What teams need from this page",
      testimonials: [
        {
          quote:
            "We needed MSDS for export chemicals and UN38.3 clarity for battery packs in the same shipment plan. One checklist helped.",
          name: "Export operations lead",
        },
        {
          quote:
            "Clear distinction between SDS and MSDS terminology, plus practical next steps for battery shipping docs.",
          name: "Compliance coordinator",
        },
      ],
      reviewsTitle: "Customer reviews",
      reviewsIntro: "Feedback from teams handling SDS, MSDS Certificate, and UN38.3 battery shipping docs.",
      galleryTitle: "Related visuals",
      reviewPool: [
        {
          quote:
            "We needed MSDS for export chemicals and UN38.3 clarity for battery packs in the same shipment plan. One checklist helped.",
          name: "Export operations lead",
          rating: 5,
          image: "",
          show: true,
        },
        {
          quote:
            "Clear distinction between SDS and MSDS terminology, plus practical next steps for battery shipping docs.",
          name: "Compliance coordinator",
          rating: 5,
          image: "",
          show: true,
        },
        {
          quote:
            "Fast response on what documents we needed before booking lithium battery air freight.",
          name: "Logistics manager",
          rating: 4,
          image: "",
          show: true,
        },
      ],
      whyTitle: "Why Instacertify Labs Private Limited",
      whyUs: [
        { value: "SDS", label: "Certificate focus" },
        { value: "MSDS", label: "Export support" },
        { value: "UN38.3", label: "Battery shipping" },
        { value: "1 team", label: "Complete solution" },
      ],
      faqsTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "What is the full form of MSDS?",
          a: "MSDS means Material Safety Data Sheet. It is commonly searched as “msds certificate full form” and used for chemical hazard communication in many Indian export workflows.",
        },
        {
          q: "What is SDS certification / SDS certificate?",
          a: "SDS refers to Safety Data Sheet under GHS. It typically follows 16 sections covering identification, hazards, composition, emergency measures, handling, transport, and regulatory information.",
        },
        {
          q: "Do I need MSDS certificate for export?",
          a: "Many export and logistics workflows expect SDS/MSDS-style documentation for hazardous or chemical products. Requirements depend on product and destination — Instacertify helps scope what you need.",
        },
        {
          q: "Why is UN38.3 important when shipping batteries?",
          a: "UN38.3 covers transport tests for lithium cells and batteries. Carriers often require evidence before accepting battery shipments by air or other modes.",
        },
        {
          q: "Can Instacertify handle SDS/MSDS and UN38.3 together?",
          a: "Yes. This page is built as a complete solution for teams that need both chemical safety documentation and battery shipping documentation support.",
        },
        {
          q: "How do I contact Instacertify?",
          a: "Email contact@instacertify.com or call +91 99999118039. Legal entity: Instacertify Labs Private Limited.",
        },
        {
          q: "Is this page for online MSDS certificate support?",
          a: "Yes. You can start with the on-page form for MSDS certificate online consultation, SDS certificate guidance, or UN38.3 battery shipping support.",
        },
      ],
      bottomCtaText: "Get your SDS / MSDS / UN38.3 complete solution started",
    },
    seo: {
      title: "SDS Certificate | MSDS Cert | UN38.3 Battery Shipping | Instacertify",
      description:
        "SDS certificate and MSDS certificate support plus UN38.3 guidance for battery shipping. Complete export documentation solution by Instacertify Labs Private Limited. Call +91 99999118039.",
      keywords:
        "msds cert, sds certification, msds certificate, msds certificate online, msds certificate for export, msds certificate for chemicals, material safety data sheet certificate, UN38.3 certificate, battery shipping, Instacertify",
      robots: "index,follow",
      canonicalUrl: "https://info.instacertify.com/sds-certificate",
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

db.ready
  .then(() => {
    updateSettings({
      site_name: "Instacertify",
      legal_name: "Instacertify Labs Private Limited",
      support_email: "contact@instacertify.com",
      support_phone: "+91 99999118039",
      support_whatsapp: "9199999118039",
      favicon_url: "/assets/instacertify-logo.svg",
      google_analytics_id: "",
      google_tag_manager_id: "",
    });

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
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });

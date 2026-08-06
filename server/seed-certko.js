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
  google_analytics_id: "",
  google_tag_manager_id: "",
});

const BASE = process.env.PUBLIC_BASE_URL || "https://info.certko.com";

const sharedTestimonials = [
  {
    quote:
      "After the Toys QCO, we were lost. Certko's team mapped our full range to the right standards, coordinated testing and we had our ISI licence before the enforcement deadline.",
    name: "Meera K.",
    role: "Toy Manufacturer, Delhi NCR",
  },
  {
    quote:
      "Certko showed me the exact IS standard, real lab prices and a shortlist of labs near my warehouse in one evening. The quote was 30% below what I had been offered elsewhere.",
    name: "Rohan T.",
    role: "Appliance Importer, Mumbai",
  },
  {
    quote:
      "GMARK categories were confusing until Certko mapped our catalogue to the right standards matrix. Clear next steps, clear costs — we certified on the first attempt.",
    name: "Hassan A.",
    role: "GCC Importer, Dubai",
  },
];

const sharedWhy = [
  { value: "1,400+", label: "BIS products mapped" },
  { value: "400+", label: "Recognised labs" },
  { value: "24h", label: "Free quote turnaround" },
  { value: "7+", label: "Certification routes" },
];

function certkoPage(page) {
  return {
    design: "certko",
    status: "published",
    brandName: "Certko",
    ctaUrl: "https://certko.com/contact",
    ...page,
    content: {
      phone: "+91 9999118039",
      whatsapp: "919999118039",
      formEnabled: true,
      formSubmitLabel: "Get Free Quote",
      formSuccessMessage:
        "Thanks! A Certko specialist will reply within 24 hours.",
      formTrustPoints: ["Free quote in 24 hours", "No spam", "Transparent costs"],
      expertName: "Talk to a Certko specialist",
      expertNote: "Free quote in 24 hours — info@certko.com",
      testimonials: sharedTestimonials,
      whyTitle: "Why teams use Certko",
      whyUs: sharedWhy,
      bottomCtaText: "Need certification or testing help?",
      ...page.content,
    },
    seo: {
      robots: "index,follow",
      canonicalUrl: `${BASE}/${page.slug}`,
      ...page.seo,
    },
  };
}

const samples = [
  certkoPage({
    slug: "bis-certification",
    title: "BIS / ISI Mark Certification",
    headline: "Get BIS / ISI certification without delays or guesswork",
    subheadline:
      "Map the right Indian Standard, compare real lab costs, and hand off application, testing and inspection readiness to Certko — free quote in 24 hours.",
    ctaLabel: "Get Free BIS Quote",
    heroImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What is BIS certification?",
        text: "BIS certification is the Bureau of Indian Standards conformity assessment for products sold in India. For notified products it is mandatory: goods cannot legally be manufactured, imported or sold without the ISI mark licence or CRS registration.",
      },
      {
        heading: "When it is mandatory",
        text: "Whenever a Quality Control Order covering your product is in force. Certko's product database shows QCO status, IS standard, indicative test prices and recognised labs for 1,400+ products.",
      },
      {
        heading: "Who this page is for",
        text: "Indian manufacturers, importers, marketplace sellers, and foreign factories needing FMCS — anyone who must prove conformity before production, import clearance or Amazon/Flipkart listing.",
      },
    ],
    content: {
      offerBanner: "Free BIS standard mapping + itemised quote in 24 hours",
      badgeText: "BIS · ISI · CRS · FMCS",
      ratingText: "Trusted by importers & manufacturers across India",
      trustPoints: [
        "Exact IS standard and scheme (ISI / CRS / FMCS)",
        "Real reported lab test price ranges",
        "Application, lab booking and inspection readiness",
        "Marketplace and customs-ready documentation",
      ],
      heroStats: [
        { value: "1,400+", label: "BIS products" },
        { value: "243", label: "Mandatory now" },
        { value: "400+", label: "Recognised labs" },
        { value: "24h", label: "Quote turnaround" },
      ],
      formTitle: "Get your free BIS quote",
      formSubtitle: "Tell us the product — we map the standard and full cost",
      serviceOptions: [
        "BIS ISI Mark (Scheme I)",
        "BIS CRS Registration (Scheme II)",
        "FMCS (Foreign Manufacturer)",
        "Not Sure – Need Guidance",
      ],
      scrollCtaText: "Ready for BIS? Get a free quote from Certko",
      typesTitle: "BIS schemes we support",
      types: [
        {
          title: "ISI Mark (Scheme I)",
          text: "Testing plus factory inspection for industrial and consumer products under QCOs.",
          items: [
            "Cement, steel, cables, appliances, toys, footwear",
            "Factory inspection readiness",
            "Surveillance and marking-fee guidance",
          ],
        },
        {
          title: "CRS (Scheme II)",
          text: "Lab-test-based registration for electronics and IT products under MeitY orders.",
          items: [
            "IT equipment, audio/video, batteries, LED drivers",
            "BIS-recognised lab coordination",
            "Portal filing and grant follow-up",
          ],
        },
        {
          title: "FMCS",
          text: "Foreign Manufacturers Certification Scheme for overseas factories exporting to India.",
          items: [
            "Authorised Indian Representative (AIR)",
            "Overseas factory inspection support",
            "End-to-end FMCS dossier handling",
          ],
        },
      ],
      timelinesTitle: "Typical timelines",
      timelines: [
        {
          title: "CRS registration",
          value: "6–10 weeks",
          text: "Once samples and technical files are ready; lab turnaround is the main variable.",
        },
        {
          title: "ISI mark licence",
          value: "10–26 weeks",
          text: "Includes testing, factory inspection and BIS query resolution.",
        },
        {
          title: "FMCS",
          value: "3–8 months",
          text: "Depends on product category, overseas inspection slots and AIR readiness.",
        },
      ],
      productsTitle: "Popular BIS product categories",
      products: [
        {
          title: "Electrical & electronics",
          text: "IT equipment, audio/video, switches, lamps, batteries — often CRS or ISI.",
        },
        {
          title: "Cement & construction",
          text: "OPC, PPC, steel bars, safety glass and related QCO products.",
        },
        {
          title: "Food, dairy & beverages",
          text: "Packaged drinking water, milk powders and complementary foods.",
        },
        {
          title: "Cables, PVC & plastics",
          text: "PVC cables, pipes and notified polymer products with active QCOs.",
        },
      ],
      benefitsTitle: "What you get with Certko",
      benefits: [
        {
          title: "Standard mapped first",
          text: "Know the exact IS number and scheme before you spend on samples or labs.",
        },
        {
          title: "Transparent costs",
          text: "Lab charges, BIS fees and consultant fees itemised — no bundled surprises.",
        },
        {
          title: "End-to-end handling",
          text: "Application, technical file, lab booking, inspection readiness and grant.",
        },
        {
          title: "Deadline-aware",
          text: "Upcoming QCO dates tracked so marketplace listings stay live.",
        },
      ],
      documentsTitle: "Documents typically required",
      documents: [
        {
          title: "Business",
          items: [
            "Company incorporation / GST / PAN",
            "Authorised signatory ID proof",
            "Factory or warehouse address proof",
            "Brand / trademark details where applicable",
          ],
        },
        {
          title: "Technical",
          items: [
            "Product specification / BOM",
            "Circuit diagrams or process flow",
            "User manual and marking artwork",
            "Test reports from BIS-recognised labs",
          ],
        },
        {
          title: "FMCS extras",
          items: [
            "AIR appointment letter",
            "Overseas factory layout and process details",
            "Local representative contact in India",
          ],
        },
      ],
      detailProcess: [
        {
          title: "Map the product",
          text: "Search by product, IS standard or HSN — confirm mandatory status and scheme.",
        },
        {
          title: "Prepare the file",
          text: "Compile application, technical file and sample plan with Certko guidance.",
        },
        {
          title: "Test at a recognised lab",
          text: "Compare indicative lab charges and book testing at a BIS-recognised laboratory.",
        },
        {
          title: "Inspection & grant",
          text: "Factory inspection readiness (ISI/FMCS), query handling and licence grant.",
        },
      ],
      processTitle: "How Certko works with you",
      process: [
        {
          title: "Share your product",
          text: "Name, model, manufacturing location and target market.",
        },
        {
          title: "Receive mapped quote",
          text: "Standard, scheme, lab options and itemised costs within 24 hours.",
        },
        {
          title: "We coordinate",
          text: "Filing, lab booking, inspection readiness and follow-ups.",
        },
        {
          title: "Licence granted",
          text: "Clear handover with renewal and marking-fee notes.",
        },
      ],
      penaltiesTitle: "Risks of selling without BIS",
      penalties: [
        {
          title: "Seizure and penalties",
          text: "Selling notified products without certification violates the BIS Act, 2016 — seizure, fines and, in serious cases, imprisonment.",
        },
        {
          title: "Marketplace delisting",
          text: "Amazon, Flipkart and other platforms actively verify BIS registration numbers.",
        },
        {
          title: "Customs holds",
          text: "Imports of notified goods can be detained without valid BIS / CRS / FMCS coverage.",
        },
      ],
      faqsTitle: "BIS certification FAQs",
      faqs: [
        {
          q: "What is the difference between ISI mark and CRS?",
          a: "ISI (Scheme I) needs testing plus factory inspection for most QCO products. CRS (Scheme II) is registration based on testing at a BIS-recognised lab, mainly for electronics and IT. Certko shows which scheme applies to your product.",
        },
        {
          q: "How much does BIS certification cost?",
          a: "Total cost = laboratory testing + BIS government fees + marking fee + optional consultant fee. Test charges alone range from a few thousand rupees to several lakhs depending on the standard.",
        },
        {
          q: "How long does a BIS licence take?",
          a: "Simple CRS registrations often complete in 6–10 weeks. ISI licences with factory inspection usually take 10–26 weeks depending on category and lab turnaround.",
        },
        {
          q: "Do foreign manufacturers need BIS?",
          a: "Yes. Overseas factories exporting notified products need FMCS or CRS and must appoint an Authorised Indian Representative (AIR). Certko supports the full FMCS path.",
        },
        {
          q: "Is Certko affiliated with BIS?",
          a: "No. Certko is an independent compliance-intelligence platform. Licences are always issued by BIS; we provide data and consulting support around the process.",
        },
      ],
    },
    seo: {
      title: "BIS Certification | ISI Mark, CRS & FMCS Help | Certko",
      description:
        "BIS / ISI mark, CRS and FMCS support from Certko. Map standards, compare lab costs and get a free itemised quote in 24 hours. Call +91 9999118039.",
      keywords:
        "BIS certification, ISI mark, BIS CRS, FMCS, BIS registration, BIS licence cost, Certko",
    },
  }),

  certkoPage({
    slug: "bee-star-rating",
    title: "BEE Star Rating Certification",
    headline: "BEE star labelling for appliances — model by model",
    subheadline:
      "Register brands and models with the Bureau of Energy Efficiency. Certko coordinates NABL testing, portal filing and label artwork — often sequenced with BIS.",
    ctaLabel: "Get Free BEE Quote",
    heroImage:
      "https://images.unsplash.com/photo-1558002038-8091e8f0d0b0?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What is BEE star rating?",
        text: "The Bureau of Energy Efficiency runs India's Standards & Labelling programme. Appliances on the mandatory list must carry a 1–5 star energy label before sale.",
      },
      {
        heading: "BIS + BEE together",
        text: "Many appliances need BIS for safety and BEE for efficiency. Certko sequences both so lab tests are not repeated unnecessarily.",
      },
    ],
    content: {
      offerBanner: "Free BEE scope check + quote in 24 hours",
      badgeText: "BEE Standards & Labelling",
      ratingText: "35 schemes · Mandatory & voluntary models",
      trustPoints: [
        "Mandatory vs voluntary category check",
        "NABL lab coordination for ISEER / IEC methods",
        "Portal registration and label artwork support",
        "Sequenced with BIS where both are required",
      ],
      heroStats: [
        { value: "35", label: "BEE schemes" },
        { value: "16", label: "Mandatory now" },
        { value: "4–8 wks", label: "Typical per model" },
        { value: "24h", label: "Quote turnaround" },
      ],
      formTitle: "Get your free BEE quote",
      formSubtitle: "Share brand, models and appliance type",
      serviceOptions: [
        "Room AC / Refrigerator",
        "Ceiling fan / TV / Geyser",
        "LED / Transformer / Other mandatory",
        "Voluntary BEE labelling",
        "Not Sure – Need Guidance",
      ],
      scrollCtaText: "Start BEE star labelling with Certko",
      typesTitle: "Mandatory BEE categories (examples)",
      types: [
        {
          title: "Cooling & refrigeration",
          text: "Room ACs (fixed & inverter), frost-free and direct-cool refrigerators, deep freezers, chillers.",
          items: ["ISEER / CSPF methods", "Model-level registration"],
        },
        {
          title: "Home appliances",
          text: "Ceiling fans, colour/UHD TVs, storage water heaters, washing machines.",
          items: ["Service value / standing loss tests", "Label artwork support"],
        },
        {
          title: "Lighting & power",
          text: "LED lamps, tubular fluorescents, distribution transformers, solar inverters.",
          items: ["Photometry / loss tests", "Portal filing"],
        },
      ],
      timelinesTitle: "Typical timelines",
      timelines: [
        {
          title: "Per model (reports ready)",
          value: "4–8 weeks",
          text: "Portal approval after NABL test reports and label artwork are submitted.",
        },
        {
          title: "Lab testing",
          value: "Variable",
          text: "Main schedule driver — depends on appliance and lab capacity.",
        },
      ],
      processTitle: "How BEE registration works",
      process: [
        {
          title: "Register the brand",
          text: "Open or update your BEE brand account.",
        },
        {
          title: "Test each model",
          text: "NABL-accredited lab testing against the relevant IS/IEC method.",
        },
        {
          title: "Submit & label",
          text: "Upload reports and artwork, pay fees, apply the star label to every unit.",
        },
        {
          title: "Stay current",
          text: "Star tables are re-based — we flag when re-registration is needed.",
        },
      ],
      faqsTitle: "BEE star rating FAQs",
      faqs: [
        {
          q: "Is the BEE star label mandatory for my appliance?",
          a: "It is mandatory for categories on BEE's compulsory list (room ACs, frost-free refrigerators, TVs, ceiling fans and more). Other categories are voluntary but often expected by retailers.",
        },
        {
          q: "Do I need BIS and BEE?",
          a: "Frequently yes — BIS covers safety and BEE covers energy efficiency. They are separate registrations with separate testing.",
        },
        {
          q: "How long does BEE registration take?",
          a: "Typically 4–8 weeks per model once test reports are ready. Lab testing is the main variable.",
        },
      ],
    },
    seo: {
      title: "BEE Star Rating Certification | Appliance Labelling | Certko",
      description:
        "BEE star labelling support for ACs, refrigerators, fans, TVs and more. NABL testing coordination and portal filing — free quote in 24 hours from Certko.",
      keywords:
        "BEE star rating, BEE certification, energy star label India, BEE registration, Certko",
    },
  }),

  certkoPage({
    slug: "gmark-certification",
    title: "GMARK Certification",
    headline: "GMARK for GCC markets — clear standards, clear costs",
    subheadline:
      "Map your catalogue to the Gulf GMARK / GSO standards matrix. Certko coordinates testing, notified-body pathways and shipment-ready documentation.",
    ctaLabel: "Get Free GMARK Quote",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What is GMARK?",
        text: "GMARK (Gulf Conformity Mark) is the conformity mark for products sold in GCC member states under GSO technical regulations — covering toys, low-voltage equipment, vehicles and more.",
      },
      {
        heading: "Why exporters need it",
        text: "Without GMARK, shipments can stall at GCC customs. Certko maps categories, testing and certificate validity so you clear on the first attempt.",
      },
    ],
    content: {
      offerBanner: "Free GMARK category mapping + quote in 24 hours",
      badgeText: "GCC / Middle East",
      ratingText: "Standards matrix mapped before you test",
      trustPoints: [
        "Category and GSO regulation mapping",
        "Test plan aligned to notified-body expectations",
        "Certificate and shipment documentation support",
        "Can run in parallel with SABER where needed",
      ],
      heroStats: [
        { value: "GCC", label: "Market access" },
        { value: "GSO", label: "Tech regulations" },
        { value: "Clear", label: "Cost breakdown" },
        { value: "24h", label: "Quote turnaround" },
      ],
      formTitle: "Get your free GMARK quote",
      formSubtitle: "Share products and destination GCC countries",
      serviceOptions: [
        "Low-voltage electrical equipment",
        "Toys",
        "Automotive / other GMARK",
        "GMARK + SABER together",
        "Not Sure – Need Guidance",
      ],
      scrollCtaText: "Unlock GCC market access with Certko",
      processTitle: "How we approach GMARK",
      process: [
        {
          title: "Map the catalogue",
          text: "Match each SKU to the right GSO regulation and risk class.",
        },
        {
          title: "Plan testing",
          text: "Define samples, labs and notified-body route before spending.",
        },
        {
          title: "Certificate & mark",
          text: "Support technical file, certificate issuance and GMARK labelling.",
        },
        {
          title: "Ship with confidence",
          text: "Documentation pack ready for customs and distributors.",
        },
      ],
      faqsTitle: "GMARK FAQs",
      faqs: [
        {
          q: "Is GMARK the same as SABER?",
          a: "No. GMARK is the Gulf conformity mark under GSO rules; SABER is Saudi Arabia's product conformity platform. Many exporters need both — Certko can run them together.",
        },
        {
          q: "How long does GMARK take?",
          a: "Typically several weeks to a few months depending on product family, testing and notified-body review.",
        },
      ],
    },
    seo: {
      title: "GMARK Certification | GCC Conformity Mark Help | Certko",
      description:
        "GMARK / Gulf Conformity Mark support for GCC exports. Category mapping, testing coordination and shipment docs — free quote in 24 hours from Certko.",
      keywords:
        "GMARK certification, Gulf Conformity Mark, GSO certification, GCC product compliance, Certko",
    },
  }),

  certkoPage({
    slug: "ce-marking",
    title: "CE Marking",
    headline: "CE marking for the EU single market",
    subheadline:
      "Identify directives, harmonised EN standards and Notified Body needs. Certko helps Indian exporters build the technical file and Declaration of Conformity.",
    ctaLabel: "Get Free CE Quote",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What CE marking covers",
        text: "CE marking declares that a product meets applicable EU directives and regulations — LVD, EMC, Toy Safety, Machinery, MDR and others — for sale in the European Economic Area.",
      },
      {
        heading: "Why Indian exporters care",
        text: "CE is the gateway to the EU market. An EU Authorised Representative and correct labelling are required; customs authorities actively check documentation.",
      },
    ],
    content: {
      offerBanner: "Free CE directive check + quote in 24 hours",
      badgeText: "European Economic Area",
      ratingText: "Directives mapped · Technical file ready",
      trustPoints: [
        "Applicable directive / regulation shortlist",
        "EN harmonised standards and test plan",
        "Technical file and DoC support",
        "Notified Body path when required",
      ],
      heroStats: [
        { value: "EEA", label: "Market access" },
        { value: "EN", label: "Harmonised standards" },
        { value: "DoC", label: "Declaration support" },
        { value: "24h", label: "Quote turnaround" },
      ],
      formTitle: "Get your free CE quote",
      formSubtitle: "Share product type and target EU countries",
      serviceOptions: [
        "Electrical / EMC / LVD",
        "Toys",
        "Machinery",
        "Medical devices",
        "Not Sure – Need Guidance",
      ],
      scrollCtaText: "Get CE-ready with Certko",
      processTitle: "Typical CE pathway",
      process: [
        {
          title: "Identify directives",
          text: "List every EU directive/regulation that applies to the product.",
        },
        {
          title: "Test to EN standards",
          text: "Lab testing against harmonised standards for each applicable route.",
        },
        {
          title: "Compile the file",
          text: "Technical file, risk assessment and, where needed, Notified Body involvement.",
        },
        {
          title: "Declare & affix",
          text: "Sign the EU Declaration of Conformity and affix the CE mark.",
        },
      ],
      faqsTitle: "CE marking FAQs",
      faqs: [
        {
          q: "Is CE marking self-declared?",
          a: "For many product families, yes — the manufacturer tests, compiles the technical file and self-declares. Higher-risk categories require a Notified Body assessment.",
        },
        {
          q: "Do I need an EU representative?",
          a: "Manufacturers outside the EU need an EU-based Authorised Representative or responsible person whose details appear on the product or packaging.",
        },
      ],
    },
    seo: {
      title: "CE Marking Certification | EU Conformity Help | Certko",
      description:
        "CE marking support for Indian exporters — directive mapping, EN testing coordination, technical file and DoC. Free quote in 24 hours from Certko.",
      keywords:
        "CE marking, CE certification, EU conformity, Declaration of Conformity, Certko",
    },
  }),

  certkoPage({
    slug: "wpc-eta",
    title: "WPC / ETA Certification",
    headline: "WPC ETA for wireless devices — before import or sale",
    subheadline:
      "Bluetooth, Wi-Fi and other licence-exempt radio products need Equipment Type Approval from India's WPC. Certko handles RF reports and Saral Sanchar filing — often with BIS CRS.",
    ctaLabel: "Get Free WPC Quote",
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What WPC / ETA covers",
        text: "The Wireless Planning & Coordination wing of DoT approves radio-frequency devices. Products with wireless modules in de-licensed bands need an ETA before import or sale in India.",
      },
      {
        heading: "Works alongside BIS",
        text: "Wireless consumer electronics typically need BIS/CRS (safety) and WPC ETA (radio), plus sometimes EPR for e-waste. Certko handles these together.",
      },
    ],
    content: {
      offerBanner: "Free WPC scope check + quote in 24 hours",
      badgeText: "DoT · Saral Sanchar",
      ratingText: "ETA for Bluetooth, Wi-Fi, IoT & more",
      trustPoints: [
        "De-licensed band confirmation",
        "RF test report review (India or overseas)",
        "Saral Sanchar ETA application support",
        "Bundled with BIS CRS when needed",
      ],
      heroStats: [
        { value: "ETA", label: "Equipment Type Approval" },
        { value: "2.4/5 GHz", label: "Common bands" },
        { value: "Customs", label: "Import ready" },
        { value: "24h", label: "Quote turnaround" },
      ],
      formTitle: "Get your free WPC quote",
      formSubtitle: "Share device type, frequencies and modules",
      serviceOptions: [
        "Bluetooth / Wi-Fi device",
        "IoT / sensor / drone",
        "Module maker ETA reference",
        "WPC + BIS CRS together",
        "Not Sure – Need Guidance",
      ],
      scrollCtaText: "Get WPC ETA with Certko",
      processTitle: "How ETA works",
      process: [
        {
          title: "Confirm frequencies",
          text: "Check that operating bands are in India's de-licensed list.",
        },
        {
          title: "RF test report",
          text: "Obtain an accredited RF report (overseas reports often accepted).",
        },
        {
          title: "Apply on Saral Sanchar",
          text: "File ETA with technical details and the test report.",
        },
        {
          title: "Import & sell",
          text: "Use the ETA certificate for customs clearance and market access.",
        },
      ],
      faqsTitle: "WPC / ETA FAQs",
      faqs: [
        {
          q: "My device uses plain Bluetooth — do I still need ETA?",
          a: "Yes. Bluetooth operates in the 2.4 GHz de-licensed band, which requires an ETA before import or sale.",
        },
        {
          q: "Can I use the module maker's ETA?",
          a: "If an approved module is used unmodified, its ETA can often be referenced; end-product requirements still apply in some cases. Certko reviews this case by case.",
        },
      ],
    },
    seo: {
      title: "WPC ETA Certification | Wireless Approval India | Certko",
      description:
        "WPC / ETA certification for Bluetooth, Wi-Fi and wireless devices in India. RF report review and Saral Sanchar filing — free quote in 24 hours from Certko.",
      keywords:
        "WPC ETA, WPC certification, Equipment Type Approval, wireless approval India, Certko",
    },
  }),

  certkoPage({
    slug: "saber-certification",
    title: "SABER Certification",
    headline: "SABER conformity for Saudi Arabia shipments",
    subheadline:
      "Product registration, PCoC/SCoC pathways and shipment certificates for the Saudi SABER platform — coordinated with GMARK when your catalogue needs both.",
    ctaLabel: "Get Free SABER Quote",
    heroImage:
      "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What is SABER?",
        text: "SABER is Saudi Arabia's online product conformity platform. Exporters and importers register products, obtain conformity certificates and clear shipments against Saudi technical regulations.",
      },
      {
        heading: "Keep shipments moving",
        text: "SABER and GMARK hand-offs often stall cargo. Certko keeps both tracks moving so you clear customs without last-minute surprises.",
      },
    ],
    content: {
      offerBanner: "Free SABER pathway check + quote in 24 hours",
      badgeText: "Saudi Arabia · SABER",
      ratingText: "PCoC / SCoC / shipment certificates",
      trustPoints: [
        "Regulation and risk-class mapping",
        "PCoC / SCoC pathway guidance",
        "Shipment certificate coordination",
        "Parallel GMARK support when needed",
      ],
      heroStats: [
        { value: "KSA", label: "Market access" },
        { value: "PCoC", label: "Product certificate" },
        { value: "SCoC", label: "Shipment certificate" },
        { value: "24h", label: "Quote turnaround" },
      ],
      formTitle: "Get your free SABER quote",
      formSubtitle: "Share HS codes, products and shipment plans",
      serviceOptions: [
        "Product registration (PCoC)",
        "Shipment certificate (SCoC)",
        "SABER + GMARK together",
        "Not Sure – Need Guidance",
      ],
      scrollCtaText: "Clear Saudi shipments with Certko",
      processTitle: "How SABER engagements run",
      process: [
        {
          title: "Classify products",
          text: "Map HS codes and Saudi technical regulations.",
        },
        {
          title: "Register & certify",
          text: "Product conformity certificates via the SABER platform.",
        },
        {
          title: "Shipment certificates",
          text: "Issue SCoC / shipment docs aligned to each consignment.",
        },
        {
          title: "Customs clearance",
          text: "Documentation pack ready for Saudi ports and distributors.",
        },
      ],
      faqsTitle: "SABER FAQs",
      faqs: [
        {
          q: "Do I need SABER and GMARK?",
          a: "Often yes for GCC portfolios. SABER is Saudi-specific; GMARK covers broader Gulf conformity. Certko can coordinate both.",
        },
        {
          q: "How fast can a shipment certificate be issued?",
          a: "Once product registration is in place, shipment certificates are typically much faster — timelines depend on document completeness and the conformity body.",
        },
      ],
    },
    seo: {
      title: "SABER Certification | Saudi Product Conformity | Certko",
      description:
        "SABER certification support for Saudi Arabia — product registration, PCoC/SCoC and shipment certificates. Free quote in 24 hours from Certko.",
      keywords:
        "SABER certification, Saudi conformity, PCoC, SCoC, SABER registration, Certko",
    },
  }),

  certkoPage({
    slug: "fcc-certification",
    title: "FCC Certification",
    headline: "FCC equipment authorisation for the US market",
    subheadline:
      "Supplier's Declaration of Conformity or Certification for radio and digital devices. Certko helps scope FCC Part rules, testing and labelling for US-bound products.",
    ctaLabel: "Get Free FCC Quote",
    heroImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What FCC authorisation covers",
        text: "The US Federal Communications Commission requires equipment authorisation for many radio-frequency and digital devices before they can be marketed in the United States.",
      },
      {
        heading: "SDoC vs Certification",
        text: "Lower-risk devices often use Supplier's Declaration of Conformity; intentional radiators usually need Certification with an FCC ID via a Telecommunication Certification Body (TCB).",
      },
    ],
    content: {
      offerBanner: "Free FCC pathway check + quote in 24 hours",
      badgeText: "United States · FCC",
      ratingText: "SDoC · Certification · FCC ID",
      trustPoints: [
        "Part 15 / radio rule scoping",
        "SDoC vs Certification decision",
        "Accredited lab coordination",
        "Labelling and user-manual notes",
      ],
      heroStats: [
        { value: "US", label: "Market access" },
        { value: "SDoC", label: "Declaration route" },
        { value: "TCB", label: "Certification route" },
        { value: "24h", label: "Quote turnaround" },
      ],
      formTitle: "Get your free FCC quote",
      formSubtitle: "Share device type, frequencies and interfaces",
      serviceOptions: [
        "Wi-Fi / Bluetooth / radio device",
        "Digital device (SDoC)",
        "FCC ID / TCB certification",
        "Not Sure – Need Guidance",
      ],
      scrollCtaText: "Get FCC-ready with Certko",
      processTitle: "How FCC projects run",
      process: [
        {
          title: "Scope the rules",
          text: "Identify applicable FCC Parts and authorisation route.",
        },
        {
          title: "Test the device",
          text: "Accredited EMC / RF testing against the required methods.",
        },
        {
          title: "Authorise",
          text: "Complete SDoC documentation or TCB Certification for an FCC ID.",
        },
        {
          title: "Label & ship",
          text: "Correct labelling, manuals and import documentation for the US.",
        },
      ],
      faqsTitle: "FCC FAQs",
      faqs: [
        {
          q: "Do all electronics need an FCC ID?",
          a: "No. Many digital devices use SDoC without an FCC ID. Intentional radiators (Wi-Fi, Bluetooth, cellular, etc.) typically need Certification with an FCC ID.",
        },
        {
          q: "Can Certko coordinate FCC with CE or BIS?",
          a: "Yes. Multi-market programmes often reuse test evidence intelligently across FCC, CE and Indian BIS/CRS — Certko plans the sequence to avoid duplicate sample batches.",
        },
      ],
    },
    seo: {
      title: "FCC Certification | US Equipment Authorisation | Certko",
      description:
        "FCC SDoC and Certification support for US-bound electronics and radio devices. Testing coordination and labelling guidance — free quote in 24 hours from Certko.",
      keywords:
        "FCC certification, FCC ID, SDoC, equipment authorisation, FCC Part 15, Certko",
    },
  }),
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

console.log(`Certko seed complete. Total pages: ${listPages().length}`);

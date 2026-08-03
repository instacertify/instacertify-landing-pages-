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
    title: "LMPC Registration",
    design: "service",
    status: "published",
    brandName: "Instacertify",
    headline: "Get LMPC Certificate Within 1 Day",
    subheadline:
      "Seek LMPC Certificate for import, manufacturer, packing, weighing machine, and related use cases. Hassle-free support with clear documentation and guided filing.",
    ctaLabel: "Book a Free Consultation",
    ctaUrl: "https://instacertify.com",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
    sections: [
      {
        heading: "What is Legal Metrology?",
        text: "Metrology is the scientific study of measurement. Legal metrology sets rules for measures and measuring devices to protect the public, environment, customers, and merchants—critical for fair commerce. Under the Legal Metrology Act, 2009, businesses engaged in sale or distribution of packaged goods in India (including many export, food, and consumer products) may need Legal Metrology / LMPC compliance from the Metrology Department of Consumer Affairs.",
      },
    ],
    content: {
      headlineHighlight: "100% @ Lowest Price Today",
      phone: "",
      whatsapp: "",
      trustPoints: [
        "Experienced compliance support for LMPC pathways",
        "Document checklist before you apply",
        "Guidance for importer, manufacturer, packer & dealer cases",
        "Clear updates through application and review stages",
        "Free consultation to identify the right licence type",
        "Support across India for packaged commodity compliance",
      ],
      offerText: 'GREAT OFFER "LMPC Registration support with advisory"',
      offerPrice: "Talk to Instacertify",
      formEnabled: true,
      formTitle: "Fill The Form Now!",
      formSubmitLabel: "Proceed",
      formSuccessMessage:
        "Thanks! An Instacertify specialist will contact you shortly.",
      processTitle: "LMPC Registration Procedure",
      process: [
        {
          title: "Application Filling",
          text: "On your behalf, we help complete the LMPC application registration form.",
        },
        {
          title: "Document Submission",
          text: "Share the appropriate identity, business, and premises documents from our checklist.",
        },
        {
          title: "Certification Issuance",
          text: "Receive guided follow-up until your LMPC certificate is issued.",
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
          title: "Legal Metrology Dealer Licence",
          text: "For those who trade and market weights and measures, often alongside importer or producer pathways.",
        },
      ],
      typesTitle: "Types of LMPC Certificates",
      types: [
        {
          title: "Regarding Weight and Measuring (W&M) Tools",
          text: "",
          items: [
            "Model approval for Indian W&M instruments",
            "Registration of importers of weight and measurement equipment",
            "Model approval for manufacturing licence & imported goods",
            "Registering as a packer for an LMPC certificate",
            "Dealer permit for scales and measuring devices",
            "Repair permit",
          ],
        },
        {
          title: "For Instruments Other Than Weight and Measurement (W&M)",
          text: "",
          items: [
            "Registration of the packer or manufacturer for the LMPC certificate",
            "Importer certification / LMPC registration",
          ],
        },
      ],
      documentsTitle: "Documents Required for Different Types of License",
      documents: [
        {
          title: "Manufacturer's License",
          items: [
            "Applicant's photo ID and proof of address",
            "Date of birth proof",
            "Lease for the planned property, GST registration, and PAN",
            "Partnership deed for partnership firms",
            "Declaration that the applicant has no criminal history",
            "Affidavit confirming legal requirements will be followed",
            "Shop / establishment or municipal trade licence (if necessary)",
          ],
        },
        {
          title: "Repairer’s License",
          items: [
            "Applicant's photo ID and proof of address",
            "Date of birth proof",
            "Lease, GST registration, and PAN",
            "Partnership deed for partnership firms",
            "No-criminal-history declaration and affidavit",
            "Shop / establishment or municipal trade licence (if necessary)",
            "Documents for electronic weighing devices where applicable",
            "List of required equipment and experience certificates",
          ],
        },
        {
          title: "Legal Metrology Dealer License",
          items: [
            "Applicant's photo ID and proof of address",
            "Date of birth proof",
            "Lease, GST registration, and PAN",
            "Partnership deed for partnership firms",
            "No-criminal-history declaration and affidavit",
            "Shop / establishment or municipal trade licence (if necessary)",
            "Model certificate of approval where applicable",
            "List of equipment and tools for registration",
          ],
        },
      ],
      detailProcessTitle: "Process for LMPC Registration",
      detailProcess: [
        {
          title: "Filling of LMPC Registration Application",
          text: "Submit an application in the prescribed format with supporting documentation. Based on the firm's location, the nodal official forwards it to the appropriate Legal Metrology Officer.",
        },
        {
          title: "Inspection of Premises",
          text: "An inspector may examine the planned premises and documentation to assess capacity, then prepare a report for further recommendations.",
        },
        {
          title: "Reviewing of Application",
          text: "If the application has material errors, the Local Inspector, Asst. Controller, or Controller may raise objections that must be resolved.",
        },
        {
          title: "Make Payment",
          text: "After assessment, the Controller may ask the applicant to pay the applicable licence fee in the relevant accounts.",
        },
        {
          title: "Issuing of LMPC Certificate",
          text: "After fee deposit and receipt at the Controller's office, the LMPC Certificate is issued in the specified format.",
        },
      ],
      benefitsTitle: "Benefits of LMPC Certificate in India",
      benefits: [
        {
          title: "Balance between sellers and buyers",
          text: "Accurate measurement supports transparent trade practices for both sides of a transaction.",
        },
        {
          title: "Reducing transaction costs",
          text: "Precise measures that follow Legal Metrology rules can reduce time and cost for sellers and purchasers.",
        },
        {
          title: "Supporting and promoting trade",
          text: "Compliance helps prevent unfair practices and keeps measuring devices fit for intended use and standards.",
        },
        {
          title: "Reducing technical barriers to trade",
          text: "Trusted measurement systems improve confidence and readiness for broader market participation.",
        },
      ],
      testimonialsTitle: "Testimonials",
      testimonials: [
        {
          quote:
            "I had many queries about LMPC certification. The team explained each step and helped with documentation end to end.",
          name: "Importer, Delhi NCR",
        },
        {
          quote:
            "The process felt smooth once the checklist was clear. Good follow-up through application and review.",
          name: "Packaging business owner",
        },
        {
          quote:
            "Helpful consultation for choosing between manufacturer, dealer, and importer pathways.",
          name: "Operations manager",
        },
        {
          quote:
            "Clear communication and practical guidance. Recommended for LMPC registration support.",
          name: "Quality lead",
        },
      ],
      whyTitle: "Why Choose Us?",
      whyUs: [
        { value: "Pan-India", label: "Support coverage" },
        { value: "Expert", label: "Compliance guidance" },
        { value: "Fast", label: "Consultation turnaround" },
        { value: "Clear", label: "Document checklists" },
      ],
      faqsTitle: "FAQ'S",
      faqs: [
        {
          q: "1. What is the Legal Metrology department's job description?",
          a: "It is a regulatory agency responsible for consistency and accuracy in weights and measures equipment used by traders in markets and trading hubs. Traders using regulated weights and measures typically need appropriate LMPC / Legal Metrology compliance.",
        },
        {
          q: "2. In which LMPC certificate program does model approval exist?",
          a: "Before manufacturing or importing many weighing and measuring instruments regulated by the Legal Metrology Act, 2009, manufacturers and importers may need government model approval. Some limited retail measurement categories may have specific exemptions.",
        },
        {
          q: "3. Who issues LMPC licences?",
          a: "An application is generally examined by the Inspector of Legal Metrology, who may inspect the business and recommend it to the Controller of Legal Metrology for consideration before the certificate is awarded.",
        },
        {
          q: "4. What products are covered by the Rules as commodities?",
          a: "The Rules under the Legal Metrology Act generally govern pre-packaged goods and related declarations, with specific exceptions such as certain pharmaceuticals, quick-food products, and very small package sizes as defined in the rules.",
        },
        {
          q: "5. What obligatory statements must packaged goods include?",
          a: "Common mandatory declarations include name and address of packager/importer/manufacturer, net quantity, manufacture/import/pack date details, price, expiry where applicable, and customer support information.",
        },
      ],
      bottomCtaText: "Book a Free Consultation",
    },
    seo: {
      title: "LMPC Registration | Get LMPC Certificate Support | Instacertify",
      description:
        "Get LMPC certificate support with Instacertify. Guidance for importer, manufacturer, packer and dealer registration, documents, process, and free consultation.",
      keywords:
        "LMPC registration, LMPC certificate, Legal Metrology, importer registration, manufacturer licence, Instacertify",
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

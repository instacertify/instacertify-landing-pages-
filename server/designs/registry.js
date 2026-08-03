/**
 * Shared design registry for Instacertify landing pages.
 *
 * Rule:
 * - Backend (pages, content_json, leads, SEO, tracking) stays the same for every page.
 * - Each new landing-page request gets a UNIQUE design id + EJS template structure.
 * - Admin can completely edit page content via shared fields + advanced content JSON.
 */

const DESIGNS = [
  {
    id: "battery",
    name: "Battery / SDS shipping",
    family: "leadgen",
    description:
      "Unique Ads layout for SDS, MSDS Certificate, and UN38.3 battery shipping — pillar hero, shipping-focused sections, complete solution CTA.",
    template: "battery",
    unique: true,
  },
  {
    id: "service",
    name: "Service",
    family: "leadgen",
    description:
      "Lead-gen compliance layout: offer strip, hero form, stats, section nav, schemes/docs/FAQs.",
    template: "service",
    unique: false,
  },
  {
    id: "trust",
    name: "Trust",
    family: "editorial",
    description: "Warm, credible certification feel with strong brand hero.",
    template: "trust",
    unique: false,
  },
  {
    id: "bold",
    name: "Bold",
    family: "editorial",
    description: "High-contrast conversion layout with sharp type.",
    template: "bold",
    unique: false,
  },
  {
    id: "minimal",
    name: "Minimal",
    family: "editorial",
    description: "Clean editorial layout focused on clarity.",
    template: "minimal",
    unique: false,
  },
  {
    id: "signal",
    name: "Signal",
    family: "editorial",
    description: "Modern teal tech aesthetic for product explainers.",
    template: "signal",
    unique: false,
  },
];

const DESIGN_IDS = DESIGNS.map((d) => d.id);
const DEFAULT_DESIGN = "service";

function listDesigns() {
  return DESIGNS.map(({ id, name, family, description, unique }) => ({
    id,
    name,
    family,
    description,
    unique,
  }));
}

function getDesign(id) {
  return DESIGNS.find((d) => d.id === id) || null;
}

function resolveDesignId(id) {
  return DESIGN_IDS.includes(id) ? id : DEFAULT_DESIGN;
}

function resolveTemplate(id) {
  const design = getDesign(resolveDesignId(id));
  return design.template;
}

function isLeadgen(id) {
  const design = getDesign(resolveDesignId(id));
  return design.family === "leadgen";
}

module.exports = {
  DESIGNS,
  DESIGN_IDS,
  DEFAULT_DESIGN,
  listDesigns,
  getDesign,
  resolveDesignId,
  resolveTemplate,
  isLeadgen,
};

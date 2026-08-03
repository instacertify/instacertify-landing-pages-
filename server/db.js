const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "landing.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    design TEXT NOT NULL DEFAULT 'trust',
    status TEXT NOT NULL DEFAULT 'draft',
    brand_name TEXT NOT NULL DEFAULT 'Instacertify',
    headline TEXT NOT NULL DEFAULT '',
    subheadline TEXT NOT NULL DEFAULT '',
    cta_label TEXT NOT NULL DEFAULT 'Get started',
    cta_url TEXT NOT NULL DEFAULT 'https://instacertify.com',
    hero_image TEXT NOT NULL DEFAULT '',
    body_html TEXT NOT NULL DEFAULT '',
    sections_json TEXT NOT NULL DEFAULT '[]',
    content_json TEXT NOT NULL DEFAULT '{}',
    seo_title TEXT NOT NULL DEFAULT '',
    seo_description TEXT NOT NULL DEFAULT '',
    seo_keywords TEXT NOT NULL DEFAULT '',
    og_image TEXT NOT NULL DEFAULT '',
    canonical_url TEXT NOT NULL DEFAULT '',
    robots TEXT NOT NULL DEFAULT 'index,follow',
    custom_head TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_id INTEGER,
    page_slug TEXT NOT NULL DEFAULT '',
    name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    city TEXT NOT NULL DEFAULT '',
    service TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL DEFAULT '',
    utm_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE SET NULL
  );
`);

function ensureColumn(table, column, definition) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all();
  if (!cols.some((col) => col.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

ensureColumn("pages", "content_json", "TEXT NOT NULL DEFAULT '{}'");

const DEFAULT_SETTINGS = {
  google_analytics_id: "",
  google_tag_manager_id: "",
  facebook_pixel_id: "",
  google_search_console_meta: "",
  custom_head_scripts: "",
  custom_body_scripts: "",
  site_name: "Instacertify",
  default_og_image: "",
  favicon_url: "",
  lead_webhook_url: "",
  support_phone: "",
  support_whatsapp: "",
};

const EMPTY_CONTENT = {
  phone: "",
  whatsapp: "",
  headlineHighlight: "",
  badgeText: "Includes free support",
  ratingText: "",
  expertName: "",
  expertNote: "We are available 24/7.",
  trustPoints: [],
  heroStats: [],
  offerBanner: "",
  offerText: "",
  offerPrice: "",
  formEnabled: true,
  formTitle: "Enquiry Now",
  formSubtitle: "",
  formSubmitLabel: "Get Free Consultation",
  formSuccessMessage: "Thanks! Our team will contact you shortly.",
  formTrustPoints: [],
  serviceOptions: [],
  scrollCtaText: "",
  processTitle: "How we work",
  process: [],
  licencesTitle: "",
  licences: [],
  typesTitle: "",
  types: [],
  timelinesTitle: "",
  timelines: [],
  productsTitle: "",
  products: [],
  documentsTitle: "",
  documents: [],
  detailProcessTitle: "",
  detailProcess: [],
  benefitsTitle: "",
  benefits: [],
  penaltiesTitle: "",
  penalties: [],
  testimonialsTitle: "Testimonials",
  testimonials: [],
  whyTitle: "Why choose us?",
  whyUs: [],
  faqsTitle: "Frequently Asked Questions",
  faqs: [],
  bottomCtaText: "Talk to an expert",
};

function ensureSettings() {
  const insert = db.prepare(
    "INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)"
  );
  const tx = db.transaction(() => {
    for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
      insert.run(key, value);
    }
  });
  tx();
}

ensureSettings();

function getSettings() {
  const rows = db.prepare("SELECT key, value FROM site_settings").all();
  const settings = { ...DEFAULT_SETTINGS };
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return settings;
}

function updateSettings(updates) {
  const stmt = db.prepare(
    "INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  );
  const tx = db.transaction((entries) => {
    for (const [key, value] of entries) {
      if (!(key in DEFAULT_SETTINGS)) continue;
      stmt.run(key, value == null ? "" : String(value));
    }
  });
  tx(Object.entries(updates));
  return getSettings();
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value || "");
  } catch {
    return fallback;
  }
}

function normalizeContent(raw, existing = null) {
  const base = {
    ...EMPTY_CONTENT,
    ...(existing || {}),
    ...(raw && typeof raw === "object" ? raw : {}),
  };

  return {
    ...base,
    trustPoints: asStringArray(base.trustPoints),
    formTrustPoints: asStringArray(base.formTrustPoints),
    serviceOptions: asStringArray(base.serviceOptions),
    heroStats: asWhyUs(base.heroStats),
    process: asNamedBlocks(base.process),
    licences: asNamedBlocks(base.licences),
    types: asTypeBlocks(base.types),
    timelines: asTimelines(base.timelines),
    products: asTypeBlocks(base.products),
    documents: asDocGroups(base.documents),
    detailProcess: asNamedBlocks(base.detailProcess),
    benefits: asNamedBlocks(base.benefits),
    penalties: asNamedBlocks(base.penalties),
    testimonials: asTestimonials(base.testimonials),
    whyUs: asWhyUs(base.whyUs),
    faqs: asFaqs(base.faqs),
    formEnabled: Boolean(base.formEnabled),
  };
}

function asTimelines(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      title: String(item?.title || "").trim(),
      value: String(item?.value || "").trim(),
      text: String(item?.text || "").trim(),
    }))
    .filter((item) => item.title || item.value || item.text);
}

function asStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item || "").trim()).filter(Boolean);
}

function asNamedBlocks(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      title: String(item?.title || "").trim(),
      text: String(item?.text || "").trim(),
    }))
    .filter((item) => item.title || item.text);
}

function asTypeBlocks(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      title: String(item?.title || "").trim(),
      text: String(item?.text || "").trim(),
      items: asStringArray(item?.items),
    }))
    .filter((item) => item.title || item.text || item.items.length);
}

function asDocGroups(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      title: String(item?.title || "").trim(),
      items: asStringArray(item?.items),
    }))
    .filter((item) => item.title || item.items.length);
}

function asTestimonials(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      quote: String(item?.quote || "").trim(),
      name: String(item?.name || "").trim(),
    }))
    .filter((item) => item.quote || item.name);
}

function asWhyUs(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      value: String(item?.value || "").trim(),
      label: String(item?.label || "").trim(),
    }))
    .filter((item) => item.value || item.label);
}

function asFaqs(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      q: String(item?.q || item?.question || "").trim(),
      a: String(item?.a || item?.answer || "").trim(),
    }))
    .filter((item) => item.q || item.a);
}

function rowToPage(row) {
  if (!row) return null;
  const sections = parseJson(row.sections_json, []);
  const content = normalizeContent(parseJson(row.content_json, {}));
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    design: row.design,
    status: row.status,
    brandName: row.brand_name,
    headline: row.headline,
    subheadline: row.subheadline,
    ctaLabel: row.cta_label,
    ctaUrl: row.cta_url,
    heroImage: row.hero_image,
    bodyHtml: row.body_html,
    sections: Array.isArray(sections) ? sections : [],
    content,
    seo: {
      title: row.seo_title,
      description: row.seo_description,
      keywords: row.seo_keywords,
      ogImage: row.og_image,
      canonicalUrl: row.canonical_url,
      robots: row.robots,
      customHead: row.custom_head,
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function listPages() {
  return db
    .prepare("SELECT * FROM pages ORDER BY updated_at DESC")
    .all()
    .map(rowToPage);
}

function getPageById(id) {
  return rowToPage(db.prepare("SELECT * FROM pages WHERE id = ?").get(id));
}

function getPageBySlug(slug) {
  return rowToPage(db.prepare("SELECT * FROM pages WHERE slug = ?").get(slug));
}

function normalizeSlug(slug) {
  return String(slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function createPage(input) {
  const slug = normalizeSlug(input.slug);
  if (!slug) throw new Error("Slug is required");
  if (!input.title) throw new Error("Title is required");

  const info = db
    .prepare(
      `INSERT INTO pages (
        slug, title, design, status, brand_name, headline, subheadline,
        cta_label, cta_url, hero_image, body_html, sections_json, content_json,
        seo_title, seo_description, seo_keywords, og_image, canonical_url,
        robots, custom_head
      ) VALUES (
        @slug, @title, @design, @status, @brand_name, @headline, @subheadline,
        @cta_label, @cta_url, @hero_image, @body_html, @sections_json, @content_json,
        @seo_title, @seo_description, @seo_keywords, @og_image, @canonical_url,
        @robots, @custom_head
      )`
    )
    .run(pageParams(input, slug));

  return getPageById(info.lastInsertRowid);
}

function updatePage(id, input) {
  const existing = getPageById(id);
  if (!existing) throw new Error("Page not found");

  const slug = normalizeSlug(input.slug || existing.slug);
  if (!slug) throw new Error("Slug is required");

  db.prepare(
    `UPDATE pages SET
      slug = @slug,
      title = @title,
      design = @design,
      status = @status,
      brand_name = @brand_name,
      headline = @headline,
      subheadline = @subheadline,
      cta_label = @cta_label,
      cta_url = @cta_url,
      hero_image = @hero_image,
      body_html = @body_html,
      sections_json = @sections_json,
      content_json = @content_json,
      seo_title = @seo_title,
      seo_description = @seo_description,
      seo_keywords = @seo_keywords,
      og_image = @og_image,
      canonical_url = @canonical_url,
      robots = @robots,
      custom_head = @custom_head,
      updated_at = datetime('now')
    WHERE id = @id`
  ).run({ id, ...pageParams(input, slug, existing) });

  return getPageById(id);
}

function deletePage(id) {
  const info = db.prepare("DELETE FROM pages WHERE id = ?").run(id);
  return info.changes > 0;
}

function pageParams(input, slug, existing = null) {
  const seo = input.seo || {};
  const content = normalizeContent(
    input.content !== undefined ? input.content : null,
    existing?.content || EMPTY_CONTENT
  );

  return {
    slug,
    title: pick(input.title, existing?.title, ""),
    design: pick(input.design, existing?.design, "trust"),
    status: pick(input.status, existing?.status, "draft"),
    brand_name: pick(input.brandName, existing?.brandName, "Instacertify"),
    headline: pick(input.headline, existing?.headline, ""),
    subheadline: pick(input.subheadline, existing?.subheadline, ""),
    cta_label: pick(input.ctaLabel, existing?.ctaLabel, "Get started"),
    cta_url: pick(input.ctaUrl, existing?.ctaUrl, "https://instacertify.com"),
    hero_image: pick(input.heroImage, existing?.heroImage, ""),
    body_html: pick(input.bodyHtml, existing?.bodyHtml, ""),
    sections_json: JSON.stringify(
      Array.isArray(input.sections)
        ? input.sections
        : existing?.sections || []
    ),
    content_json: JSON.stringify(content),
    seo_title: pick(seo.title, existing?.seo?.title, ""),
    seo_description: pick(seo.description, existing?.seo?.description, ""),
    seo_keywords: pick(seo.keywords, existing?.seo?.keywords, ""),
    og_image: pick(seo.ogImage, existing?.seo?.ogImage, ""),
    canonical_url: pick(seo.canonicalUrl, existing?.seo?.canonicalUrl, ""),
    robots: pick(seo.robots, existing?.seo?.robots, "index,follow"),
    custom_head: pick(seo.customHead, existing?.seo?.customHead, ""),
  };
}

function createLead(input) {
  const pageSlug = String(input.pageSlug || "").trim();
  const page = pageSlug ? getPageBySlug(pageSlug) : null;
  const name = String(input.name || "").trim();
  const phone = String(input.phone || "").trim();
  const email = String(input.email || "").trim();

  if (!name) throw new Error("Name is required");
  if (!phone && !email) throw new Error("Phone or email is required");

  const info = db
    .prepare(
      `INSERT INTO leads (
        page_id, page_slug, name, email, phone, city, service, message, utm_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      page?.id || null,
      pageSlug,
      name,
      email,
      phone,
      String(input.city || "").trim(),
      String(input.service || "").trim(),
      String(input.message || "").trim(),
      JSON.stringify(input.utm || {})
    );

  return getLeadById(info.lastInsertRowid);
}

function getLeadById(id) {
  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(id);
  if (!row) return null;
  return {
    id: row.id,
    pageId: row.page_id,
    pageSlug: row.page_slug,
    name: row.name,
    email: row.email,
    phone: row.phone,
    city: row.city,
    service: row.service,
    message: row.message,
    utm: parseJson(row.utm_json, {}),
    createdAt: row.created_at,
  };
}

function listLeads(limit = 100) {
  return db
    .prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT ?")
    .all(limit)
    .map((row) => ({
      id: row.id,
      pageId: row.page_id,
      pageSlug: row.page_slug,
      name: row.name,
      email: row.email,
      phone: row.phone,
      city: row.city,
      service: row.service,
      message: row.message,
      utm: parseJson(row.utm_json, {}),
      createdAt: row.created_at,
    }));
}

function pick(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null) return value;
  }
  return "";
}

module.exports = {
  db,
  EMPTY_CONTENT,
  getSettings,
  updateSettings,
  listPages,
  getPageById,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  normalizeSlug,
  createLead,
  listLeads,
};

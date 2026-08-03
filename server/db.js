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
`);

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

function rowToPage(row) {
  if (!row) return null;
  let sections = [];
  try {
    sections = JSON.parse(row.sections_json || "[]");
  } catch {
    sections = [];
  }
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
    sections,
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
        cta_label, cta_url, hero_image, body_html, sections_json,
        seo_title, seo_description, seo_keywords, og_image, canonical_url,
        robots, custom_head
      ) VALUES (
        @slug, @title, @design, @status, @brand_name, @headline, @subheadline,
        @cta_label, @cta_url, @hero_image, @body_html, @sections_json,
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
    seo_title: pick(seo.title, existing?.seo?.title, ""),
    seo_description: pick(seo.description, existing?.seo?.description, ""),
    seo_keywords: pick(seo.keywords, existing?.seo?.keywords, ""),
    og_image: pick(seo.ogImage, existing?.seo?.ogImage, ""),
    canonical_url: pick(seo.canonicalUrl, existing?.seo?.canonicalUrl, ""),
    robots: pick(seo.robots, existing?.seo?.robots, "index,follow"),
    custom_head: pick(seo.customHead, existing?.seo?.customHead, ""),
  };
}

function pick(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null) return value;
  }
  return "";
}

module.exports = {
  db,
  getSettings,
  updateSettings,
  listPages,
  getPageById,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  normalizeSlug,
};

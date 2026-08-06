require("dotenv").config();

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const api = require("./routes/api");
const { getPageBySlug, getSettings, listPages } = require("./db");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL || "https://info.certko.com";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  helmet({
    contentSecurityPolicy: false,
    // Allow partner sites to iframe /embed/widget (badge SVGs are plain images).
    frameguard: false,
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", api);

app.get("/admin", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "admin", "index.html"));
});

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(`User-agent: *
Allow: /

Sitemap: ${PUBLIC_BASE_URL}/sitemap.xml
`);
});

app.get("/sitemap.xml", (_req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const staticUrls = [
    { loc: `${PUBLIC_BASE_URL}/backlink-kit`, lastmod: today },
    { loc: `${PUBLIC_BASE_URL}/embed/widget`, lastmod: today },
  ];
  const pageUrls = listPages()
    .filter((page) => page.status === "published")
    .map((page) => ({
      loc: `${PUBLIC_BASE_URL}/${page.slug}`,
      lastmod: page.updatedAt.slice(0, 10),
    }));

  const urls = [...staticUrls, ...pageUrls]
    .map(
      (item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </url>`
    )
    .join("\n");

  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`);
});

app.get("/backlink-kit", (_req, res) => {
  return res.render("backlink-kit", {
    baseUrl: PUBLIC_BASE_URL,
    settings: getSettings(),
  });
});

app.get("/embed/widget", (_req, res) => {
  // Explicitly allow cross-origin iframes for the partner embed.
  res.set("Content-Security-Policy", "frame-ancestors *");
  return res.render("embed/widget", {
    baseUrl: PUBLIC_BASE_URL,
  });
});

app.get("/", (_req, res) => {
  const published = listPages().filter((page) => page.status === "published");
  if (published.length === 1) {
    return res.redirect(`/${published[0].slug}`);
  }
  return res.render("home", {
    pages: published,
    settings: getSettings(),
    baseUrl: PUBLIC_BASE_URL,
  });
});

app.get("/preview/:slug", (req, res) => {
  const aliases = { "msds-certificate": "sds-certificate" };
  const slug = aliases[req.params.slug] || req.params.slug;
  const page = getPageBySlug(slug);
  if (!page) return res.status(404).render("404", { slug: req.params.slug });
  return renderLanding(res, page, true);
});

app.get("/:slug", (req, res) => {
  const reserved = new Set([
    "api",
    "admin",
    "assets",
    "embed",
    "backlink-kit",
    "robots.txt",
    "sitemap.xml",
  ]);
  if (reserved.has(req.params.slug)) return res.status(404).end();

  if (req.params.slug === "msds-certificate") {
    return res.redirect(301, "/sds-certificate");
  }

  const page = getPageBySlug(req.params.slug);
  if (!page || page.status !== "published") {
    return res.status(404).render("404", { slug: req.params.slug });
  }
  return renderLanding(res, page, false);
});

function renderLanding(res, page, isPreview) {
  const settings = getSettings();
  const design = [
    "certko",
    "service",
    "trust",
    "bold",
    "minimal",
    "signal",
  ].includes(page.design)
    ? page.design
    : "trust";

  const seoTitle = page.seo.title || page.title;
  const seoDescription = page.seo.description || page.subheadline;
  const ogImage = page.seo.ogImage || page.heroImage || settings.default_og_image;
  const canonical =
    page.seo.canonicalUrl || `${PUBLIC_BASE_URL}/${page.slug}`;

  return res.render(`templates/${design}`, {
    page,
    settings,
    isPreview,
    seo: {
      title: seoTitle,
      description: seoDescription,
      keywords: page.seo.keywords,
      ogImage,
      canonical,
      robots: isPreview ? "noindex,nofollow" : page.seo.robots || "index,follow",
      customHead: page.seo.customHead,
    },
    baseUrl: PUBLIC_BASE_URL,
  });
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

app.listen(PORT, () => {
  console.log(`Landing pages running on http://localhost:${PORT}`);
  console.log(`Admin: http://localhost:${PORT}/admin`);
});

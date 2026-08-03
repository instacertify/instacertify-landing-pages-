require("dotenv").config();

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const api = require("./routes/api");
const { getPageBySlug, getSettings, listPages } = require("./db");
const { resolveTemplate } = require("./designs/registry");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL || "https://info.instacertify.com";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  helmet({
    contentSecurityPolicy: false,
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
  const pages = listPages().filter((page) => page.status === "published");
  const urls = pages
    .map((page) => {
      const loc = `${PUBLIC_BASE_URL}/${page.slug}`;
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${page.updatedAt.slice(0, 10)}</lastmod>
  </url>`;
    })
    .join("\n");

  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`);
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
  const reserved = new Set(["api", "admin", "assets", "robots.txt", "sitemap.xml"]);
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
  const design = resolveTemplate(page.design);

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

const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Instacertify landing pages running on http://${HOST}:${PORT}`);
  console.log(`Admin: http://${HOST}:${PORT}/admin`);
});

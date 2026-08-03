const express = require("express");
const {
  listPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  getSettings,
  updateSettings,
  createLead,
  listLeads,
  listPageImages,
  getPageImage,
  createPageImage,
  updatePageImage,
  deletePageImage,
  deletePageImagesForPage,
} = require("../db");
const {
  SESSION_COOKIE,
  requireAuth,
  login,
  destroySession,
  isAuthenticated,
} = require("../auth");
const { listDesigns } = require("../designs/registry");
const {
  upload,
  publicUrl,
  removeFileByUrl,
  removePageUploadDir,
} = require("../media");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

router.get("/designs", (_req, res) => {
  res.json(listDesigns());
});

router.get("/auth/me", (req, res) => {
  res.json({ authenticated: isAuthenticated(req) });
});

router.post("/auth/login", (req, res) => {
  const token = login(req.body?.password || "");
  if (!token) {
    return res.status(401).json({ error: "Invalid password" });
  }
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.json({ ok: true });
});

router.post("/auth/logout", (req, res) => {
  destroySession(req.cookies?.[SESSION_COOKIE]);
  res.clearCookie(SESSION_COOKIE);
  res.json({ ok: true });
});

router.get("/pages", requireAuth, (_req, res) => {
  res.json(listPages());
});

router.get("/pages/:id", requireAuth, (req, res) => {
  const page = getPageById(Number(req.params.id));
  if (!page) return res.status(404).json({ error: "Page not found" });
  return res.json(page);
});

router.post("/pages", requireAuth, (req, res) => {
  try {
    const page = createPage(req.body || {});
    return res.status(201).json(page);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/pages/:id", requireAuth, (req, res) => {
  try {
    const page = updatePage(Number(req.params.id), req.body || {});
    return res.json(page);
  } catch (error) {
    const status = error.message === "Page not found" ? 404 : 400;
    return res.status(status).json({ error: error.message });
  }
});

router.delete("/pages/:id", requireAuth, (req, res) => {
  const pageId = Number(req.params.id);
  const images = deletePageImagesForPage(pageId);
  images.forEach((image) => removeFileByUrl(image.url));
  removePageUploadDir(pageId);
  const ok = deletePage(pageId);
  if (!ok) return res.status(404).json({ error: "Page not found" });
  return res.json({ ok: true });
});

router.get("/pages/:id/images", requireAuth, (req, res) => {
  const pageId = Number(req.params.id);
  if (!getPageById(pageId)) {
    return res.status(404).json({ error: "Page not found" });
  }
  return res.json(listPageImages(pageId));
});

router.post(
  "/pages/:id/images",
  requireAuth,
  (req, res, next) => {
    upload.single("image")(req, res, (error) => {
      if (error) return res.status(400).json({ error: error.message });
      return next();
    });
  },
  (req, res) => {
    try {
      const pageId = Number(req.params.id);
      if (!getPageById(pageId)) {
        return res.status(404).json({ error: "Page not found" });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }

      const image = createPageImage(pageId, {
        url: publicUrl(pageId, req.file.filename),
        originalName: req.file.originalname || req.file.filename,
        alt: req.body?.alt || "",
        role: req.body?.role || "gallery",
        showOnPage: req.body?.showOnPage !== "0" && req.body?.showOnPage !== "false",
      });

      return res.status(201).json(image);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

router.put(
  "/pages/:id/images/:imageId",
  requireAuth,
  (req, res, next) => {
    if (req.is("multipart/form-data")) {
      return upload.single("image")(req, res, (error) => {
        if (error) return res.status(400).json({ error: error.message });
        return next();
      });
    }
    return next();
  },
  (req, res) => {
    try {
      const pageId = Number(req.params.id);
      const imageId = Number(req.params.imageId);
      const existing = getPageImage(pageId, imageId);
      if (!existing) return res.status(404).json({ error: "Image not found" });

      const updates = {
        alt: req.body?.alt,
        role: req.body?.role,
        showOnPage:
          req.body?.showOnPage === undefined
            ? undefined
            : !(
                req.body.showOnPage === false ||
                req.body.showOnPage === "false" ||
                req.body.showOnPage === "0"
              ),
        sortOrder: req.body?.sortOrder,
        originalName: req.body?.originalName,
      };

      if (req.file) {
        removeFileByUrl(existing.url);
        updates.url = publicUrl(pageId, req.file.filename);
        updates.originalName = req.file.originalname || req.file.filename;
      }

      const image = updatePageImage(pageId, imageId, updates);

      // Keep page hero/OG in sync when the assigned file is replaced
      if (req.file) {
        const page = getPageById(pageId);
        if (page) {
          const patch = {};
          if (page.heroImage === existing.url) patch.heroImage = image.url;
          if (page.seo?.ogImage === existing.url) {
            patch.seo = { ...page.seo, ogImage: image.url };
          }
          if (Object.keys(patch).length) {
            updatePage(pageId, {
              ...page,
              ...patch,
              content: page.content,
              seo: patch.seo || page.seo,
            });
          }
        }
      }

      return res.json(image);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

router.delete("/pages/:id/images/:imageId", requireAuth, (req, res) => {
  const pageId = Number(req.params.id);
  const imageId = Number(req.params.imageId);
  const existing = deletePageImage(pageId, imageId);
  if (!existing) return res.status(404).json({ error: "Image not found" });
  removeFileByUrl(existing.url);
  return res.json({ ok: true });
});

router.post("/pages/:id/images/:imageId/use", requireAuth, (req, res) => {
  try {
    const pageId = Number(req.params.id);
    const imageId = Number(req.params.imageId);
    const page = getPageById(pageId);
    const image = getPageImage(pageId, imageId);
    if (!page || !image) {
      return res.status(404).json({ error: "Image or page not found" });
    }

    const target = String(req.body?.target || "hero").trim();
    const payload = {};

    if (target === "hero") {
      payload.heroImage = image.url;
      updatePageImage(pageId, imageId, { role: "hero", showOnPage: true });
    } else if (target === "og") {
      payload.seo = { ...(page.seo || {}), ogImage: image.url };
      updatePageImage(pageId, imageId, { role: "og", showOnPage: true });
    } else if (target === "logoLight") {
      payload.content = {
        ...(page.content || {}),
        logoLightUrl: image.url,
      };
    } else if (target === "logoDark") {
      payload.content = {
        ...(page.content || {}),
        logoDarkUrl: image.url,
      };
    } else if (target === "gallery") {
      updatePageImage(pageId, imageId, { role: "gallery", showOnPage: true });
    } else {
      return res.status(400).json({
        error: "target must be one of: hero, og, logoLight, logoDark, gallery",
      });
    }

    const updated = Object.keys(payload).length
      ? updatePage(pageId, {
          ...page,
          ...payload,
          content: payload.content || page.content,
          seo: payload.seo || page.seo,
        })
      : getPageById(pageId);

    return res.json({
      ok: true,
      target,
      image,
      page: updated,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/settings", requireAuth, (_req, res) => {
  res.json(getSettings());
});

router.put("/settings", requireAuth, (req, res) => {
  const settings = updateSettings(req.body || {});
  res.json(settings);
});

router.get("/leads", requireAuth, (_req, res) => {
  res.json(listLeads());
});

router.post("/leads", async (req, res) => {
  try {
    const lead = createLead(req.body || {});
    const settings = getSettings();

    if (settings.lead_webhook_url) {
      try {
        await fetch(settings.lead_webhook_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (error) {
        console.error("Lead webhook failed:", error.message);
      }
    }

    return res.status(201).json({ ok: true, id: lead.id });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;

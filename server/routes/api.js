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
} = require("../db");
const {
  SESSION_COOKIE,
  requireAuth,
  login,
  destroySession,
  isAuthenticated,
} = require("../auth");

const router = express.Router();

const DESIGNS = [
  {
    id: "certko",
    name: "Certko",
    description:
      "Certko-branded lead-gen lander: navy/butter palette, full-bleed hero, enquiry form, FAQs.",
  },
  {
    id: "service",
    name: "Service",
    description:
      "Lead-gen layout inspired by compliance landing pages: hero form, process, docs, FAQs.",
  },
  {
    id: "trust",
    name: "Trust",
    description: "Warm, credible certification feel with strong brand hero.",
  },
  {
    id: "bold",
    name: "Bold",
    description: "High-contrast conversion layout with sharp type.",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean editorial layout focused on clarity.",
  },
  {
    id: "signal",
    name: "Signal",
    description: "Modern teal tech aesthetic for product explainers.",
  },
];

router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

router.get("/designs", (_req, res) => {
  res.json(DESIGNS);
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
  const ok = deletePage(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: "Page not found" });
  return res.json({ ok: true });
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

const state = {
  authenticated: false,
  designs: [],
  pages: [],
  settings: null,
  editingId: null,
  sections: [],
};

const els = {
  loginView: document.getElementById("login-view"),
  dashboard: document.getElementById("dashboard"),
  loginForm: document.getElementById("login-form"),
  loginError: document.getElementById("login-error"),
  password: document.getElementById("password"),
  logoutBtn: document.getElementById("logout-btn"),
  pagesView: document.getElementById("pages-view"),
  editorView: document.getElementById("editor-view"),
  settingsView: document.getElementById("settings-view"),
  pagesList: document.getElementById("pages-list"),
  newPageBtn: document.getElementById("new-page-btn"),
  backBtn: document.getElementById("back-btn"),
  saveBtn: document.getElementById("save-btn"),
  previewBtn: document.getElementById("preview-btn"),
  design: document.getElementById("design"),
  sectionsList: document.getElementById("sections-list"),
  addSectionBtn: document.getElementById("add-section-btn"),
  editorStatus: document.getElementById("editor-status"),
  settingsForm: document.getElementById("settings-form"),
  saveSettingsBtn: document.getElementById("save-settings-btn"),
  settingsStatus: document.getElementById("settings-status"),
  navButtons: document.querySelectorAll(".nav-btn"),
};

async function api(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

function showStatus(el, message, isError = false) {
  el.hidden = false;
  el.textContent = message;
  el.style.color = isError ? "var(--danger)" : "var(--accent-ink)";
}

function setAuthed(authed) {
  state.authenticated = authed;
  els.loginView.classList.toggle("hidden", authed);
  els.dashboard.classList.toggle("hidden", !authed);
}

function showView(name) {
  els.pagesView.classList.toggle("hidden", name !== "pages");
  els.editorView.classList.toggle("hidden", name !== "editor");
  els.settingsView.classList.toggle("hidden", name !== "settings");
  els.navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === (name === "editor" ? "pages" : name));
  });
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function renderDesignOptions() {
  els.design.innerHTML = state.designs
    .map(
      (d) =>
        `<option value="${d.id}">${d.name} — ${d.description}</option>`
    )
    .join("");
}

function renderPages() {
  if (!state.pages.length) {
    els.pagesList.innerHTML =
      '<div class="empty">No pages yet. Create your first landing page.</div>';
    return;
  }

  els.pagesList.innerHTML = state.pages
    .map((page) => {
      const url = page.status === "published" ? `/${page.slug}` : `/preview/${page.slug}`;
      return `
        <article class="page-row" data-id="${page.id}">
          <div>
            <h3>${escapeHtml(page.title)}</h3>
            <div class="meta">
              <span class="badge">${escapeHtml(page.status)}</span>
              <span class="badge">${escapeHtml(page.design)}</span>
              /${escapeHtml(page.slug)}
            </div>
          </div>
          <div class="row-actions">
            <a href="${url}" target="_blank" rel="noopener">
              <button type="button" class="ghost">Open</button>
            </a>
            <button type="button" class="ghost edit-btn">Edit</button>
            <button type="button" class="danger delete-btn">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");

  els.pagesList.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.closest(".page-row").dataset.id);
      openEditor(id);
    });
  });

  els.pagesList.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = Number(btn.closest(".page-row").dataset.id);
      if (!confirm("Delete this page?")) return;
      await api(`/pages/${id}`, { method: "DELETE" });
      await loadPages();
    });
  });
}

function renderSections() {
  if (!state.sections.length) {
    els.sectionsList.innerHTML =
      '<p class="hint">No sections yet. Add one below.</p>';
    return;
  }

  els.sectionsList.innerHTML = state.sections
    .map(
      (section, index) => `
      <div class="section-item" data-index="${index}">
        <label>Heading
          <input class="section-heading" value="${escapeAttr(section.heading || "")}" />
        </label>
        <label>Text
          <textarea class="section-text" rows="3">${escapeHtml(section.text || "")}</textarea>
        </label>
        <button type="button" class="danger remove-section">Remove</button>
      </div>
    `
    )
    .join("");

  els.sectionsList.querySelectorAll(".section-heading").forEach((input) => {
    input.addEventListener("input", (e) => {
      const index = Number(e.target.closest(".section-item").dataset.index);
      state.sections[index].heading = e.target.value;
    });
  });
  els.sectionsList.querySelectorAll(".section-text").forEach((input) => {
    input.addEventListener("input", (e) => {
      const index = Number(e.target.closest(".section-item").dataset.index);
      state.sections[index].text = e.target.value;
    });
  });
  els.sectionsList.querySelectorAll(".remove-section").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.closest(".section-item").dataset.index);
      state.sections.splice(index, 1);
      renderSections();
    });
  });
}

function blankPage() {
  return {
    id: null,
    title: "",
    slug: "",
    status: "draft",
    design: state.designs[0]?.id || "trust",
    brandName: "Instacertify",
    headline: "",
    subheadline: "",
    ctaLabel: "Get started",
    ctaUrl: "https://instacertify.com",
    heroImage: "",
    bodyHtml: "",
    sections: [],
    seo: {
      title: "",
      description: "",
      keywords: "",
      ogImage: "",
      canonicalUrl: "",
      robots: "index,follow",
      customHead: "",
    },
  };
}

function fillEditor(page) {
  state.editingId = page.id;
  state.sections = Array.isArray(page.sections)
    ? page.sections.map((s) => ({ ...s }))
    : [];

  document.getElementById("editor-title").textContent = page.id
    ? "Edit page"
    : "New page";
  document.getElementById("page-id").value = page.id || "";
  document.getElementById("title").value = page.title || "";
  document.getElementById("slug").value = page.slug || "";
  document.getElementById("status").value = page.status || "draft";
  document.getElementById("design").value = page.design || "trust";
  document.getElementById("brandName").value = page.brandName || "Instacertify";
  document.getElementById("headline").value = page.headline || "";
  document.getElementById("subheadline").value = page.subheadline || "";
  document.getElementById("ctaLabel").value = page.ctaLabel || "";
  document.getElementById("ctaUrl").value = page.ctaUrl || "";
  document.getElementById("heroImage").value = page.heroImage || "";
  document.getElementById("bodyHtml").value = page.bodyHtml || "";
  document.getElementById("seoTitle").value = page.seo?.title || "";
  document.getElementById("seoDescription").value = page.seo?.description || "";
  document.getElementById("seoKeywords").value = page.seo?.keywords || "";
  document.getElementById("seoOgImage").value = page.seo?.ogImage || "";
  document.getElementById("seoCanonical").value = page.seo?.canonicalUrl || "";
  document.getElementById("seoRobots").value = page.seo?.robots || "index,follow";
  document.getElementById("seoCustomHead").value = page.seo?.customHead || "";
  els.editorStatus.hidden = true;
  renderSections();
}

function collectPagePayload() {
  return {
    title: document.getElementById("title").value.trim(),
    slug: document.getElementById("slug").value.trim(),
    status: document.getElementById("status").value,
    design: document.getElementById("design").value,
    brandName: document.getElementById("brandName").value.trim(),
    headline: document.getElementById("headline").value.trim(),
    subheadline: document.getElementById("subheadline").value.trim(),
    ctaLabel: document.getElementById("ctaLabel").value.trim(),
    ctaUrl: document.getElementById("ctaUrl").value.trim(),
    heroImage: document.getElementById("heroImage").value.trim(),
    bodyHtml: document.getElementById("bodyHtml").value,
    sections: state.sections,
    seo: {
      title: document.getElementById("seoTitle").value.trim(),
      description: document.getElementById("seoDescription").value.trim(),
      keywords: document.getElementById("seoKeywords").value.trim(),
      ogImage: document.getElementById("seoOgImage").value.trim(),
      canonicalUrl: document.getElementById("seoCanonical").value.trim(),
      robots: document.getElementById("seoRobots").value,
      customHead: document.getElementById("seoCustomHead").value,
    },
  };
}

async function openEditor(id = null) {
  if (id) {
    const page = await api(`/pages/${id}`);
    fillEditor(page);
  } else {
    fillEditor(blankPage());
  }
  showView("editor");
}

function fillSettings(settings) {
  state.settings = settings;
  [
    "site_name",
    "default_og_image",
    "favicon_url",
    "google_analytics_id",
    "google_tag_manager_id",
    "facebook_pixel_id",
    "google_search_console_meta",
    "custom_head_scripts",
    "custom_body_scripts",
  ].forEach((key) => {
    const el = document.getElementById(key);
    if (el) el.value = settings[key] || "";
  });
}

async function loadPages() {
  state.pages = await api("/pages");
  renderPages();
}

async function bootstrapAuthed() {
  const [designs, settings] = await Promise.all([
    api("/designs"),
    api("/settings"),
  ]);
  state.designs = designs;
  renderDesignOptions();
  fillSettings(settings);
  await loadPages();
  showView("pages");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

els.loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  els.loginError.hidden = true;
  try {
    await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ password: els.password.value }),
    });
    setAuthed(true);
    await bootstrapAuthed();
  } catch (error) {
    els.loginError.hidden = false;
    els.loginError.textContent = error.message;
  }
});

els.logoutBtn.addEventListener("click", async () => {
  await api("/auth/logout", { method: "POST", body: "{}" });
  setAuthed(false);
});

els.navButtons.forEach((btn) => {
  btn.addEventListener("click", () => showView(btn.dataset.view));
});

els.newPageBtn.addEventListener("click", () => openEditor(null));
els.backBtn.addEventListener("click", () => showView("pages"));

els.addSectionBtn.addEventListener("click", () => {
  state.sections.push({ heading: "", text: "" });
  renderSections();
});

document.getElementById("title").addEventListener("input", (e) => {
  const slug = document.getElementById("slug");
  if (!state.editingId && !slug.dataset.touched) {
    slug.value = slugify(e.target.value);
  }
});

document.getElementById("slug").addEventListener("input", (e) => {
  e.target.dataset.touched = "1";
});

els.saveBtn.addEventListener("click", async () => {
  try {
    const payload = collectPagePayload();
    if (!payload.title || !payload.slug) {
      throw new Error("Title and slug are required");
    }
    const id = document.getElementById("page-id").value;
    const page = id
      ? await api(`/pages/${id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        })
      : await api("/pages", {
          method: "POST",
          body: JSON.stringify(payload),
        });
    fillEditor(page);
    await loadPages();
    showStatus(els.editorStatus, "Saved");
  } catch (error) {
    showStatus(els.editorStatus, error.message, true);
  }
});

els.previewBtn.addEventListener("click", () => {
  const slug = document.getElementById("slug").value.trim();
  if (!slug) {
    showStatus(els.editorStatus, "Save a slug first to preview", true);
    return;
  }
  window.open(`/preview/${slug}`, "_blank", "noopener");
});

els.saveSettingsBtn.addEventListener("click", async () => {
  try {
    const payload = {};
    [
      "site_name",
      "default_og_image",
      "favicon_url",
      "google_analytics_id",
      "google_tag_manager_id",
      "facebook_pixel_id",
      "google_search_console_meta",
      "custom_head_scripts",
      "custom_body_scripts",
    ].forEach((key) => {
      payload[key] = document.getElementById(key).value;
    });
    const settings = await api("/settings", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    fillSettings(settings);
    showStatus(els.settingsStatus, "Settings saved");
  } catch (error) {
    showStatus(els.settingsStatus, error.message, true);
  }
});

(async function init() {
  try {
    const me = await api("/auth/me");
    if (me.authenticated) {
      setAuthed(true);
      await bootstrapAuthed();
    } else {
      setAuthed(false);
    }
  } catch {
    setAuthed(false);
  }
})();

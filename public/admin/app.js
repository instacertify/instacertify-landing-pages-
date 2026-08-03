const state = {
  authenticated: false,
  designs: [],
  pages: [],
  leads: [],
  settings: null,
  editingId: null,
  sections: [],
  process: [],
  licences: [],
  types: [],
  timelines: [],
  products: [],
  documents: [],
  detailProcess: [],
  benefits: [],
  penalties: [],
  heroStats: [],
  testimonials: [],
  whyUs: [],
  faqs: [],
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
  leadsView: document.getElementById("leads-view"),
  pagesList: document.getElementById("pages-list"),
  leadsList: document.getElementById("leads-list"),
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
  refreshLeadsBtn: document.getElementById("refresh-leads-btn"),
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
  els.leadsView.classList.toggle("hidden", name !== "leads");
  els.navButtons.forEach((btn) => {
    const active =
      btn.dataset.view === (name === "editor" ? "pages" : name);
    btn.classList.toggle("active", active);
  });
  if (name === "leads") loadLeads();
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
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

function linesToArray(value) {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function arrayToLines(value) {
  return Array.isArray(value) ? value.join("\n") : "";
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
      const url =
        page.status === "published" ? `/${page.slug}` : `/preview/${page.slug}`;
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

function renderLeads() {
  if (!state.leads.length) {
    els.leadsList.innerHTML =
      '<div class="empty">No leads yet. Submissions from Service pages will appear here.</div>';
    return;
  }

  els.leadsList.innerHTML = state.leads
    .map(
      (lead) => `
      <article class="page-row">
        <div>
          <h3>${escapeHtml(lead.name)}</h3>
          <div class="meta">
            ${lead.phone ? `<span class="badge">${escapeHtml(lead.phone)}</span>` : ""}
            ${lead.email ? escapeHtml(lead.email) + " · " : ""}
            ${lead.pageSlug ? "/" + escapeHtml(lead.pageSlug) + " · " : ""}
            ${escapeHtml(lead.createdAt)}
          </div>
          <div class="meta">${escapeHtml(lead.service || "")} ${lead.city ? "· " + escapeHtml(lead.city) : ""}</div>
          ${lead.message ? `<p class="hint">${escapeHtml(lead.message)}</p>` : ""}
        </div>
      </article>
    `
    )
    .join("");
}

function renderNamedList(containerId, items, fields, onChange) {
  const container = document.getElementById(containerId);
  if (!items.length) {
    container.innerHTML = '<p class="hint">None yet.</p>';
    return;
  }

  container.innerHTML = items
    .map((item, index) => {
      const inputs = fields
        .map((field) => {
          if (field.type === "textarea") {
            return `<label>${field.label}
              <textarea data-field="${field.key}" rows="${field.rows || 3}">${escapeHtml(item[field.key] || "")}</textarea>
            </label>`;
          }
          return `<label>${field.label}
            <input data-field="${field.key}" value="${escapeAttr(item[field.key] || "")}" />
          </label>`;
        })
        .join("");
      return `<div class="section-item" data-index="${index}">
        ${inputs}
        <button type="button" class="danger remove-item">Remove</button>
      </div>`;
    })
    .join("");

  container.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("input", (e) => {
      const index = Number(e.target.closest(".section-item").dataset.index);
      items[index][e.target.dataset.field] = e.target.value;
    });
  });
  container.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.closest(".section-item").dataset.index);
      items.splice(index, 1);
      onChange?.();
    });
  });
}

function renderSections() {
  renderNamedList(
    "sections-list",
    state.sections,
    [
      { key: "heading", label: "Heading" },
      { key: "text", label: "Text", type: "textarea" },
    ],
    renderSections
  );
}

function renderProcess() {
  renderNamedList(
    "process-list",
    state.process,
    [
      { key: "title", label: "Step title" },
      { key: "text", label: "Step text", type: "textarea" },
    ],
    renderProcess
  );
}

function renderLicences() {
  renderNamedList(
    "licences-list",
    state.licences,
    [
      { key: "title", label: "Licence title" },
      { key: "text", label: "Licence text", type: "textarea" },
    ],
    renderLicences
  );
}

function renderDetailProcess() {
  renderNamedList(
    "detail-process-list",
    state.detailProcess,
    [
      { key: "title", label: "Step title" },
      { key: "text", label: "Step text", type: "textarea" },
    ],
    renderDetailProcess
  );
}

function renderTypedGroups(containerId, items, onRemoveRender) {
  const container = document.getElementById(containerId);
  if (!items.length) {
    container.innerHTML = '<p class="hint">None yet.</p>';
    return;
  }
  container.innerHTML = items
    .map(
      (item, index) => `
      <div class="section-item" data-index="${index}">
        <label>Title <input data-field="title" value="${escapeAttr(item.title || "")}" /></label>
        <label>Text <textarea data-field="text" rows="2">${escapeHtml(item.text || "")}</textarea></label>
        <label>Bullet items (one per line)
          <textarea data-field="items" rows="4">${escapeHtml(arrayToLines(item.items))}</textarea>
        </label>
        <button type="button" class="danger remove-item">Remove</button>
      </div>`
    )
    .join("");

  container.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("input", (e) => {
      const index = Number(e.target.closest(".section-item").dataset.index);
      const field = e.target.dataset.field;
      items[index][field] =
        field === "items" ? linesToArray(e.target.value) : e.target.value;
    });
  });
  container.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.closest(".section-item").dataset.index);
      items.splice(index, 1);
      onRemoveRender();
    });
  });
}

function renderTypes() {
  renderTypedGroups("types-list", state.types, renderTypes);
}

function renderProducts() {
  renderTypedGroups("products-list", state.products, renderProducts);
}

function renderTimelines() {
  renderNamedList(
    "timelines-list",
    state.timelines,
    [
      { key: "title", label: "Scheme title" },
      { key: "value", label: "Timeline value" },
      { key: "text", label: "Notes", type: "textarea" },
    ],
    renderTimelines
  );
}

function renderDocuments() {
  const container = document.getElementById("documents-list");
  if (!state.documents.length) {
    container.innerHTML = '<p class="hint">None yet.</p>';
    return;
  }
  container.innerHTML = state.documents
    .map(
      (item, index) => `
      <div class="section-item" data-index="${index}">
        <label>Group title <input data-field="title" value="${escapeAttr(item.title || "")}" /></label>
        <label>Documents (one per line)
          <textarea data-field="items" rows="4">${escapeHtml(arrayToLines(item.items))}</textarea>
        </label>
        <button type="button" class="danger remove-item">Remove</button>
      </div>`
    )
    .join("");

  container.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("input", (e) => {
      const index = Number(e.target.closest(".section-item").dataset.index);
      const field = e.target.dataset.field;
      state.documents[index][field] =
        field === "items" ? linesToArray(e.target.value) : e.target.value;
    });
  });
  container.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.closest(".section-item").dataset.index);
      state.documents.splice(index, 1);
      renderDocuments();
    });
  });
}

function renderBenefits() {
  renderNamedList(
    "benefits-list",
    state.benefits,
    [
      { key: "title", label: "Benefit title" },
      { key: "text", label: "Benefit text", type: "textarea" },
    ],
    renderBenefits
  );
}

function renderPenalties() {
  renderNamedList(
    "penalties-list",
    state.penalties,
    [
      { key: "title", label: "Penalty title" },
      { key: "text", label: "Penalty text", type: "textarea" },
    ],
    renderPenalties
  );
}

function renderHeroStats() {
  renderNamedList(
    "hero-stats-list",
    state.heroStats,
    [
      { key: "value", label: "Stat value" },
      { key: "label", label: "Stat label" },
    ],
    renderHeroStats
  );
}

function renderTestimonials() {
  renderNamedList(
    "testimonials-list",
    state.testimonials,
    [
      { key: "quote", label: "Quote", type: "textarea" },
      { key: "name", label: "Name" },
    ],
    renderTestimonials
  );
}

function renderWhyUs() {
  renderNamedList(
    "why-list",
    state.whyUs,
    [
      { key: "value", label: "Stat value" },
      { key: "label", label: "Stat label" },
    ],
    renderWhyUs
  );
}

function renderFaqs() {
  renderNamedList(
    "faqs-list",
    state.faqs,
    [
      { key: "q", label: "Question" },
      { key: "a", label: "Answer", type: "textarea", rows: 4 },
    ],
    renderFaqs
  );
}

function blankPage() {
  return {
    id: null,
    title: "",
    slug: "",
    status: "draft",
    design: "service",
    brandName: "Instacertify",
    headline: "",
    subheadline: "",
    ctaLabel: "Get a free consultation",
    ctaUrl: "https://instacertify.com",
    heroImage: "",
    bodyHtml: "",
    sections: [],
    content: {
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
    },
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
  const content = page.content || {};
  state.process = Array.isArray(content.process)
    ? content.process.map((s) => ({ ...s }))
    : [];
  state.licences = Array.isArray(content.licences)
    ? content.licences.map((s) => ({ ...s }))
    : [];
  state.types = Array.isArray(content.types)
    ? content.types.map((s) => ({ ...s, items: [...(s.items || [])] }))
    : [];
  state.timelines = Array.isArray(content.timelines)
    ? content.timelines.map((s) => ({ ...s }))
    : [];
  state.products = Array.isArray(content.products)
    ? content.products.map((s) => ({ ...s, items: [...(s.items || [])] }))
    : [];
  state.documents = Array.isArray(content.documents)
    ? content.documents.map((s) => ({ ...s, items: [...(s.items || [])] }))
    : [];
  state.detailProcess = Array.isArray(content.detailProcess)
    ? content.detailProcess.map((s) => ({ ...s }))
    : [];
  state.benefits = Array.isArray(content.benefits)
    ? content.benefits.map((s) => ({ ...s }))
    : [];
  state.penalties = Array.isArray(content.penalties)
    ? content.penalties.map((s) => ({ ...s }))
    : [];
  state.heroStats = Array.isArray(content.heroStats)
    ? content.heroStats.map((s) => ({ ...s }))
    : [];
  state.testimonials = Array.isArray(content.testimonials)
    ? content.testimonials.map((s) => ({ ...s }))
    : [];
  state.whyUs = Array.isArray(content.whyUs)
    ? content.whyUs.map((s) => ({ ...s }))
    : [];
  state.faqs = Array.isArray(content.faqs)
    ? content.faqs.map((s) => ({ ...s }))
    : [];

  document.getElementById("editor-title").textContent = page.id
    ? "Edit page"
    : "New page";
  document.getElementById("page-id").value = page.id || "";
  document.getElementById("title").value = page.title || "";
  document.getElementById("slug").value = page.slug || "";
  document.getElementById("status").value = page.status || "draft";
  document.getElementById("design").value = page.design || "service";
  document.getElementById("brandName").value = page.brandName || "Instacertify";
  document.getElementById("headline").value = page.headline || "";
  document.getElementById("subheadline").value = page.subheadline || "";
  document.getElementById("ctaLabel").value = page.ctaLabel || "";
  document.getElementById("ctaUrl").value = page.ctaUrl || "";
  document.getElementById("heroImage").value = page.heroImage || "";
  document.getElementById("bodyHtml").value = page.bodyHtml || "";

  document.getElementById("offerBanner").value = content.offerBanner || "";
  document.getElementById("badgeText").value = content.badgeText || "";
  document.getElementById("ratingText").value = content.ratingText || "";
  document.getElementById("headlineHighlight").value =
    content.headlineHighlight || "";
  document.getElementById("expertName").value = content.expertName || "";
  document.getElementById("expertNote").value = content.expertNote || "";
  document.getElementById("contentPhone").value = content.phone || "";
  document.getElementById("contentWhatsapp").value = content.whatsapp || "";
  document.getElementById("offerText").value = content.offerText || "";
  document.getElementById("offerPrice").value = content.offerPrice || "";
  document.getElementById("trustPoints").value = arrayToLines(
    content.trustPoints || []
  );
  document.getElementById("serviceOptions").value = arrayToLines(
    content.serviceOptions || []
  );
  document.getElementById("formTitle").value = content.formTitle || "";
  document.getElementById("formSubtitle").value = content.formSubtitle || "";
  document.getElementById("formSubmitLabel").value =
    content.formSubmitLabel || "";
  document.getElementById("scrollCtaText").value = content.scrollCtaText || "";
  document.getElementById("formTrustPoints").value = arrayToLines(
    content.formTrustPoints || []
  );
  document.getElementById("formSuccessMessage").value =
    content.formSuccessMessage || "";
  document.getElementById("formEnabled").checked = content.formEnabled !== false;
  document.getElementById("bottomCtaText").value = content.bottomCtaText || "";
  document.getElementById("processTitle").value = content.processTitle || "";
  document.getElementById("licencesTitle").value = content.licencesTitle || "";
  document.getElementById("typesTitle").value = content.typesTitle || "";
  document.getElementById("timelinesTitle").value = content.timelinesTitle || "";
  document.getElementById("productsTitle").value = content.productsTitle || "";
  document.getElementById("documentsTitle").value = content.documentsTitle || "";
  document.getElementById("detailProcessTitle").value =
    content.detailProcessTitle || "";
  document.getElementById("benefitsTitle").value = content.benefitsTitle || "";
  document.getElementById("penaltiesTitle").value = content.penaltiesTitle || "";
  document.getElementById("testimonialsTitle").value =
    content.testimonialsTitle || "";
  document.getElementById("whyTitle").value = content.whyTitle || "";
  document.getElementById("faqsTitle").value = content.faqsTitle || "";

  document.getElementById("seoTitle").value = page.seo?.title || "";
  document.getElementById("seoDescription").value = page.seo?.description || "";
  document.getElementById("seoKeywords").value = page.seo?.keywords || "";
  document.getElementById("seoOgImage").value = page.seo?.ogImage || "";
  document.getElementById("seoCanonical").value = page.seo?.canonicalUrl || "";
  document.getElementById("seoRobots").value =
    page.seo?.robots || "index,follow";
  document.getElementById("seoCustomHead").value = page.seo?.customHead || "";
  els.editorStatus.hidden = true;

  renderSections();
  renderHeroStats();
  renderProcess();
  renderLicences();
  renderTypes();
  renderTimelines();
  renderProducts();
  renderDocuments();
  renderDetailProcess();
  renderBenefits();
  renderPenalties();
  renderTestimonials();
  renderWhyUs();
  renderFaqs();
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
    content: {
      phone: document.getElementById("contentPhone").value.trim(),
      whatsapp: document.getElementById("contentWhatsapp").value.trim(),
      headlineHighlight: document
        .getElementById("headlineHighlight")
        .value.trim(),
      badgeText: document.getElementById("badgeText").value.trim(),
      ratingText: document.getElementById("ratingText").value.trim(),
      expertName: document.getElementById("expertName").value.trim(),
      expertNote: document.getElementById("expertNote").value.trim(),
      trustPoints: linesToArray(document.getElementById("trustPoints").value),
      heroStats: state.heroStats,
      offerBanner: document.getElementById("offerBanner").value.trim(),
      offerText: document.getElementById("offerText").value.trim(),
      offerPrice: document.getElementById("offerPrice").value.trim(),
      formEnabled: document.getElementById("formEnabled").checked,
      formTitle: document.getElementById("formTitle").value.trim(),
      formSubtitle: document.getElementById("formSubtitle").value.trim(),
      formSubmitLabel: document.getElementById("formSubmitLabel").value.trim(),
      formSuccessMessage: document
        .getElementById("formSuccessMessage")
        .value.trim(),
      formTrustPoints: linesToArray(
        document.getElementById("formTrustPoints").value
      ),
      serviceOptions: linesToArray(
        document.getElementById("serviceOptions").value
      ),
      scrollCtaText: document.getElementById("scrollCtaText").value.trim(),
      processTitle: document.getElementById("processTitle").value.trim(),
      process: state.process,
      licencesTitle: document.getElementById("licencesTitle").value.trim(),
      licences: state.licences,
      typesTitle: document.getElementById("typesTitle").value.trim(),
      types: state.types,
      timelinesTitle: document.getElementById("timelinesTitle").value.trim(),
      timelines: state.timelines,
      productsTitle: document.getElementById("productsTitle").value.trim(),
      products: state.products,
      documentsTitle: document.getElementById("documentsTitle").value.trim(),
      documents: state.documents,
      detailProcessTitle: document
        .getElementById("detailProcessTitle")
        .value.trim(),
      detailProcess: state.detailProcess,
      benefitsTitle: document.getElementById("benefitsTitle").value.trim(),
      benefits: state.benefits,
      penaltiesTitle: document.getElementById("penaltiesTitle").value.trim(),
      penalties: state.penalties,
      testimonialsTitle: document
        .getElementById("testimonialsTitle")
        .value.trim(),
      testimonials: state.testimonials,
      whyTitle: document.getElementById("whyTitle").value.trim(),
      whyUs: state.whyUs,
      faqsTitle: document.getElementById("faqsTitle").value.trim(),
      faqs: state.faqs,
      bottomCtaText: document.getElementById("bottomCtaText").value.trim(),
    },
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
    "legal_name",
    "support_email",
    "default_og_image",
    "favicon_url",
    "support_phone",
    "support_whatsapp",
    "lead_webhook_url",
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

async function loadLeads() {
  state.leads = await api("/leads");
  renderLeads();
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
els.refreshLeadsBtn.addEventListener("click", () => loadLeads());

els.addSectionBtn.addEventListener("click", () => {
  state.sections.push({ heading: "", text: "" });
  renderSections();
});
document.getElementById("add-hero-stat-btn").addEventListener("click", () => {
  state.heroStats.push({ value: "", label: "" });
  renderHeroStats();
});
document.getElementById("add-process-btn").addEventListener("click", () => {
  state.process.push({ title: "", text: "" });
  renderProcess();
});
document.getElementById("add-licence-btn").addEventListener("click", () => {
  state.licences.push({ title: "", text: "" });
  renderLicences();
});
document.getElementById("add-type-btn").addEventListener("click", () => {
  state.types.push({ title: "", text: "", items: [] });
  renderTypes();
});
document.getElementById("add-timeline-btn").addEventListener("click", () => {
  state.timelines.push({ title: "", value: "", text: "" });
  renderTimelines();
});
document.getElementById("add-product-btn").addEventListener("click", () => {
  state.products.push({ title: "", text: "", items: [] });
  renderProducts();
});
document.getElementById("add-doc-btn").addEventListener("click", () => {
  state.documents.push({ title: "", items: [] });
  renderDocuments();
});
document
  .getElementById("add-detail-process-btn")
  .addEventListener("click", () => {
    state.detailProcess.push({ title: "", text: "" });
    renderDetailProcess();
  });
document.getElementById("add-benefit-btn").addEventListener("click", () => {
  state.benefits.push({ title: "", text: "" });
  renderBenefits();
});
document.getElementById("add-penalty-btn").addEventListener("click", () => {
  state.penalties.push({ title: "", text: "" });
  renderPenalties();
});

document
  .getElementById("add-testimonial-btn")
  .addEventListener("click", () => {
    state.testimonials.push({ quote: "", name: "" });
    renderTestimonials();
  });
document.getElementById("add-why-btn").addEventListener("click", () => {
  state.whyUs.push({ value: "", label: "" });
  renderWhyUs();
});
document.getElementById("add-faq-btn").addEventListener("click", () => {
  state.faqs.push({ q: "", a: "" });
  renderFaqs();
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
      "legal_name",
      "support_email",
      "default_og_image",
      "favicon_url",
      "support_phone",
      "support_whatsapp",
      "lead_webhook_url",
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

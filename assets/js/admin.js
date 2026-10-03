(() => {
  "use strict";

  const config = window.RELENTLESS_SUPABASE_CONFIG;
  const configured = config && /^https:\/\/[^/]+\.supabase\.co$/.test(config.url) &&
    config.anonKey && !config.anonKey.includes("YOUR_");
  const client = configured && window.supabase
    ? window.supabase.createClient(config.url, config.anonKey)
    : null;
  const tables = { products: "cms_products", articles: "cms_articles", gallery: "cms_gallery" };
  const labels = { products: "Inventory", articles: "Article", gallery: "Gallery image" };
  const records = { products: [], articles: [], gallery: [] };
  let activeKind = "products";
  let editingId = null;
  let noticeTimer;

  const $ = (selector) => document.querySelector(selector);
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);

  function showNotice(message, isError = false) {
    const notice = $("#notice");
    notice.textContent = message;
    notice.classList.toggle("error", isError);
    notice.hidden = false;
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => { notice.hidden = true; }, 5000);
  }

  function setLoginError(message) {
    $("#loginError").textContent = message;
  }

  function setSessionVisible(isSignedIn) {
    $("#loginView").hidden = isSignedIn;
    $("#adminView").hidden = !isSignedIn;
  }

  function slugify(value) {
    return String(value || "").toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
  }

  function safeImage(value) {
    const url = String(value || "");
    return /^(https:\/\/|\/|assets\/)/i.test(url) ? url : "assets/hero-tractor.jpg";
  }

  function recordTitle(record, kind) {
    const content = record.content || {};
    return content.name || content.title || content.shortName || record.id || labels[kind];
  }

  function recordImage(record, kind) {
    const content = record.content || {};
    return safeImage(kind === "gallery" ? content.src : content.image);
  }

  function showSection(section) {
    const sectionNames = ["overview", ...Object.keys(tables)];
    if (!sectionNames.includes(section)) section = "overview";
    sectionNames.forEach((name) => {
      $(`#${name}Section`).hidden = name !== section;
    });
    document.querySelectorAll(".nav-item").forEach((button) => {
      button.classList.toggle("active", button.dataset.section === section);
    });
    $("#sectionTitle").textContent = section === "overview"
      ? "Overview" : section === "products" ? "Inventory" : section[0].toUpperCase() + section.slice(1);
    activeKind = section === "overview" ? "products" : section;
    if (section !== "overview") renderList(section);
  }

  async function loadRecords() {
    await Promise.all(Object.entries(tables).map(async ([kind, table]) => {
      const { data, error } = await client.from(table).select("*").order("sort_order").order("id");
      if (error) throw error;
      records[kind] = data || [];
    }));
    renderDashboard();
    Object.keys(tables).forEach(renderList);
  }

  function renderDashboard() {
    const summary = [
      ["products", "productStat", "productPublishedStat", "productNavCount"],
      ["articles", "articleStat", "articlePublishedStat", "articleNavCount"],
      ["gallery", "galleryStat", "galleryPublishedStat", "galleryNavCount"]
    ];
    summary.forEach(([kind, totalId, publishedId, navId]) => {
      const items = records[kind];
      document.getElementById(totalId).textContent = items.length;
      document.getElementById(publishedId).textContent = `${items.filter((item) => item.published).length} published`;
      document.getElementById(navId).textContent = items.length;
    });

    const recent = Object.entries(records).flatMap(([kind, items]) => items.map((item) => ({
      ...item, kind
    }))).sort((a, b) => String(b.updated_at || "").localeCompare(String(a.updated_at || ""))).slice(0, 6);
    $("#recentContent").innerHTML = recent.length ? recent.map((item) => `
      <div class="recent-row">
        <img class="recent-thumb" src="${escapeHtml(recordImage(item, item.kind))}" alt="">
        <span><strong>${escapeHtml(recordTitle(item, item.kind))}</strong><small>${escapeHtml(labels[item.kind])}</small></span>
        <span class="status-pill ${item.published ? "published" : ""}">${item.published ? "Published" : "Draft"}</span>
      </div>`).join("") : '<div class="empty-state">No content yet. Import your current website content to get started.</div>';
  }

  function renderList(kind) {
    if (!tables[kind]) return;
    const query = $(`#${kind}Search`)?.value.trim().toLowerCase() || "";
    const filtered = records[kind].filter((record) =>
      `${recordTitle(record, kind)} ${record.id}`.toLowerCase().includes(query));
    const summary = $(`#${kind}Summary`);
    if (summary) summary.textContent = `${filtered.length} ${filtered.length === 1 ? "item" : "items"}`;

    if (kind === "gallery") {
      $("#galleryList").innerHTML = filtered.length ? filtered.map((item) => `
        <article class="gallery-admin-card">
          <img src="${escapeHtml(recordImage(item, kind))}" alt="${escapeHtml(item.content?.title || "")}">
          <div class="gallery-admin-copy">
            <strong>${escapeHtml(recordTitle(item, kind))}</strong>
            <p class="muted">${escapeHtml(item.content?.subtitle || "No caption")}</p>
            <div class="gallery-actions">
              <span class="status-pill ${item.published ? "published" : ""}">${item.published ? "Published" : "Draft"}</span>
              <div><button class="icon-button" data-action="edit" data-kind="${kind}" data-id="${escapeHtml(item.id)}" aria-label="Edit image">✎</button><button class="icon-button delete" data-action="delete" data-kind="${kind}" data-id="${escapeHtml(item.id)}" aria-label="Delete image">×</button></div>
            </div>
          </div>
        </article>`).join("") : '<div class="empty-state">No gallery images match this search.</div>';
      return;
    }

    const container = $(`#${kind}List`);
    container.innerHTML = filtered.length ? filtered.map((item) => `
      <article class="list-row">
        <img class="list-thumb" src="${escapeHtml(recordImage(item, kind))}" alt="">
        <div class="list-copy"><strong>${escapeHtml(recordTitle(item, kind))}</strong><small>${escapeHtml(kind === "products" ? `${item.content?.brand || "Unbranded"} · ${item.content?.categoryLabel || item.content?.category || "Inventory"}` : `${item.content?.tag || "Guide"} · ${item.content?.date || ""}`)}</small></div>
        ${kind === "products" && item.featured ? '<span class="status-pill">Featured</span>' : ""}
        <span class="status-pill ${item.published ? "published" : ""}">${item.published ? "Published" : "Draft"}</span>
        <div class="list-actions"><button class="icon-button" data-action="edit" data-kind="${kind}" data-id="${escapeHtml(item.id)}" aria-label="Edit item">✎</button><button class="icon-button delete" data-action="delete" data-kind="${kind}" data-id="${escapeHtml(item.id)}" aria-label="Delete item">×</button></div>
      </article>`).join("") : `<div class="empty-state">No ${kind === "products" ? "inventory" : "articles"} match this search.</div>`;
  }

  function field(name, label, value, options = {}) {
    const id = `field-${name}`;
    const cls = options.full ? "field full" : "field";
    const escaped = escapeHtml(value ?? "");
    if (options.select) {
      const optionsHtml = options.select.map(([optionValue, optionLabel]) =>
        `<option value="${escapeHtml(optionValue)}" ${String(value) === optionValue ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`).join("");
      return `<label class="${cls}" for="${id}">${label}<select id="${id}" name="${name}" ${options.required ? "required" : ""}>${optionsHtml}</select></label>`;
    }
    return `<label class="${cls}" for="${id}">${label}${options.textarea
      ? `<textarea id="${id}" name="${name}" class="${options.tall ? "tall" : ""}" ${options.required ? "required" : ""}>${escaped}</textarea>`
      : `<input id="${id}" name="${name}" type="${options.type || "text"}" value="${escaped}" ${options.required ? "required" : ""} ${options.min !== undefined ? `min="${options.min}"` : ""} ${options.maxLength ? `maxlength="${options.maxLength}"` : ""}>`
    }${options.help ? `<small class="help-text">${options.help}</small>` : ""}</label>`;
  }

  function imageField(name, label, value) {
    return `<div class="image-upload full">${field(name, label, value, { required: true })}<label class="upload-button">Upload<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" data-upload-for="${name}"></label></div>`;
  }

  function openEditor(kind, record = null) {
    if (!tables[kind]) return;
    activeKind = kind;
    editingId = record?.id || null;
    const content = record?.content || {};
    $("#editorEyebrow").textContent = labels[kind].toUpperCase();
    $("#editorTitle").textContent = record ? `Edit ${labels[kind].toLowerCase()}` : `Add ${labels[kind].toLowerCase()}`;
    $("#editorPublished").checked = record ? Boolean(record.published) : false;
    $("#editorFeatured").checked = Boolean(record?.featured);
    $("#featuredOption").hidden = kind !== "products";
    $("#editorError").textContent = "";

    if (kind === "products") {
      $("#editorFields").innerHTML = [
        field("id", "Content ID", record?.id || "", { required: true, maxLength: 70, help: "Lowercase letters, numbers and hyphens." }),
        field("name", "Product name", content.name, { required: true }),
        field("category", "Category", content.category || "tractors", { required: true, select: [["tractors", "Tractors"], ["implements", "Implements"], ["trailers", "Trailers"], ["spares", "Genuine spares"], ["pre-owned", "Pre-owned"]] }),
        field("categoryLabel", "Category label", content.categoryLabel || ""),
        field("brand", "Brand", content.brand || ""),
        field("model", "Model", content.model || ""),
        field("year", "Model year", content.year || ""),
        field("condition", "Condition", content.condition || "new", { select: [["new", "Brand new"], ["pre-owned", "Pre-owned"]] }),
        field("conditionLabel", "Condition label", content.conditionLabel || ""),
        field("availability", "Availability", content.availability || "in-stock", { select: [["in-stock", "In stock"], ["in-showroom", "In showroom"], ["made-to-order", "Made to order"]] }),
        field("availabilityLabel", "Availability label", content.availabilityLabel || ""),
        field("priceText", "Price label", content.priceText || "Price on Enquiry"),
        field("hp", "Horsepower", content.hp ?? 0, { type: "number", min: 0 }),
        imageField("image", "Main image URL", content.image || ""),
        field("images", "Additional image URLs (one per line)", (content.images || []).join("\n"), { textarea: true, full: true }),
        field("brief", "Short description", content.brief || "", { textarea: true, full: true }),
        field("description", "Full description", content.description || "", { textarea: true, full: true, tall: true }),
        field("idealFor", "Ideal applications", content.idealFor || "", { textarea: true, full: true }),
        field("specs", "Specifications (JSON object)", JSON.stringify(content.specs || {}, null, 2), { textarea: true, full: true, tall: true, help: 'Example: {"Engine power":"90 HP","Transmission":"12F + 12R"}' }),
        field("sort_order", "Display order", record?.sort_order ?? records[kind].length, { type: "number" })
      ].join("");
    } else if (kind === "articles") {
      $("#editorFields").innerHTML = [
        field("id", "Content ID", record?.id || "", { required: true, maxLength: 70, help: "Lowercase letters, numbers and hyphens." }),
        field("title", "Article title", content.title || "", { required: true }),
        field("tag", "Category", content.tag || "Buying Guide"),
        field("date", "Display date", content.date || new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })),
        field("readTime", "Reading time", content.readTime || "5 min read"),
        imageField("image", "Cover image URL", content.image || ""),
        field("summary", "Article summary", content.summary || "", { textarea: true, full: true }),
        field("content", "Article body (HTML)", content.content || "", { textarea: true, full: true, tall: true, help: "Allowed formatting: headings, paragraphs, lists, bold, emphasis and links. Scripts and unsafe markup are removed on the public site." }),
        field("sort_order", "Display order", record?.sort_order ?? records[kind].length, { type: "number" })
      ].join("");
    } else {
      $("#editorFields").innerHTML = [
        field("id", "Content ID", record?.id || "", { required: true, maxLength: 70, help: "Lowercase letters, numbers and hyphens." }),
        field("title", "Image title", content.title || "", { required: true }),
        field("subtitle", "Caption", content.subtitle || "", { textarea: true, full: true }),
        imageField("src", "Image URL", content.src || ""),
        field("sort_order", "Display order", record?.sort_order ?? records[kind].length, { type: "number" })
      ].join("");
    }

    const idInput = $("#field-id");
    const titleInput = $("#field-name") || $("#field-title");
    if (editingId && idInput) idInput.readOnly = true;
    if (!editingId && idInput && titleInput) {
      titleInput.addEventListener("input", () => {
        if (!idInput.dataset.touched) idInput.value = slugify(titleInput.value);
      });
      idInput.addEventListener("input", () => { idInput.dataset.touched = "true"; });
    }
    $("#editorDialog").showModal();
    $("#editorDialog").querySelector("#editorFields input, #editorFields textarea, #editorFields select")?.focus();
  }

  async function uploadImage(fileInput) {
    const inputName = fileInput.dataset.uploadFor;
    const target = $(`#field-${inputName}`);
    const file = fileInput.files?.[0];
    if (!file || !target) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      $("#editorError").textContent = "Choose an image smaller than 5 MB (JPG, PNG, WebP or GIF).";
      fileInput.value = "";
      return;
    }
    $("#editorError").textContent = "Uploading image…";
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
    const path = `${activeKind}/${Date.now()}-${safeName}`;
    const { data, error } = await client.storage.from("cms-media").upload(path, file, {
      cacheControl: "3600", upsert: false, contentType: file.type
    });
    if (error) {
      $("#editorError").textContent = `Image upload failed: ${error.message}`;
      return;
    }
    const { data: publicUrl } = client.storage.from("cms-media").getPublicUrl(data.path);
    target.value = publicUrl.publicUrl;
    $("#editorError").textContent = "Image uploaded. Save the form to apply it.";
  }

  function formContent(kind, formData) {
    const value = (name) => String(formData.get(name) || "").trim();
    if (kind === "products") {
      let specs;
      try {
        specs = JSON.parse(value("specs") || "{}");
      } catch {
        throw new Error("Specifications must be a valid JSON object.");
      }
      if (!specs || Array.isArray(specs) || typeof specs !== "object") {
        throw new Error("Specifications must be a JSON object of labels and values.");
      }
      const image = value("image");
      const images = value("images").split(/\r?\n/).map((url) => url.trim()).filter(Boolean);
      if (image && !images.includes(image)) images.unshift(image);
      return {
        id: value("id"), name: value("name"), shortName: value("name"),
        category: value("category"), categoryLabel: value("categoryLabel") || value("category"),
        brand: value("brand"), model: value("model"), year: value("year"),
        condition: value("condition"), conditionLabel: value("conditionLabel") || value("condition"),
        availability: value("availability"), availabilityLabel: value("availabilityLabel") || value("availability"),
        priceText: value("priceText") || "Price on Enquiry",
        hp: Number(value("hp")) || 0, hpCategory: Number(value("hp")) >= 100 ? "100-plus" : Number(value("hp")) >= 75 ? "75-100" : "all",
        image, images, brief: value("brief"), description: value("description"), specs,
        idealFor: value("idealFor")
      };
    }
    if (kind === "articles") {
      return {
        id: value("id"), title: value("title"), tag: value("tag"), date: value("date"),
        readTime: value("readTime"), image: value("image"), summary: value("summary"),
        content: value("content")
      };
    }
    return { id: value("id"), title: value("title"), subtitle: value("subtitle"), src: value("src") };
  }

  async function saveEditor(event) {
    event.preventDefault();
    const saveButton = $("#editorSave");
    saveButton.disabled = true;
    $("#editorError").textContent = "";
    try {
      const formData = new FormData(event.currentTarget);
      const id = String(formData.get("id") || "").trim().toLowerCase();
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
        throw new Error("Content ID can contain lowercase letters, numbers and single hyphens only.");
      }
      const content = formContent(activeKind, formData);
      const collision = records[activeKind].some((item) => item.id === id && id !== editingId);
      if (collision) throw new Error("That content ID is already in use.");
      const row = {
        id, content, published: $("#editorPublished").checked,
        sort_order: Number(formData.get("sort_order")) || 0,
        updated_at: new Date().toISOString()
      };
      if (activeKind === "products") row.featured = $("#editorFeatured").checked;
      const { error } = await client.from(tables[activeKind]).upsert(row, { onConflict: "id" });
      if (error) throw error;
      $("#editorDialog").close();
      showNotice(`${labels[activeKind]} saved successfully.`);
      await refresh();
    } catch (error) {
      $("#editorError").textContent = error.message || "The content could not be saved.";
    } finally {
      saveButton.disabled = false;
    }
  }

  async function deleteRecord(kind, id) {
    const record = records[kind].find((item) => item.id === id);
    if (!record || !window.confirm(`Delete "${recordTitle(record, kind)}"? This cannot be undone.`)) return;
    const { error } = await client.from(tables[kind]).delete().eq("id", id);
    if (error) {
      showNotice(`Delete failed: ${error.message}`, true);
      return;
    }
    showNotice(`${labels[kind]} deleted.`);
    await refresh();
  }

  async function refresh() {
    try {
      await loadRecords();
    } catch (error) {
      showNotice(`Could not refresh CMS content: ${error.message}`, true);
    }
  }

  async function setCmsEnabled(enabled) {
    const checkbox = $("#cmsEnabled");
    checkbox.disabled = true;
    const { error } = await client.from("cms_settings")
      .update({ enabled, updated_at: new Date().toISOString() }).eq("id", 1);
    checkbox.disabled = false;
    if (error) {
      checkbox.checked = !enabled;
      showNotice(`Website publishing setting could not be changed: ${error.message}`, true);
      return;
    }
    updatePublishStatus(enabled);
    showNotice(enabled ? "CMS content is now live on the public website." : "The website is using its built-in content.");
  }

  function updatePublishStatus(enabled) {
    $("#cmsEnabled").checked = enabled;
    $("#publishState").textContent = enabled ? "CMS content is live" : "Built-in website content is live";
    $("#publishDescription").textContent = enabled
      ? "Published CMS content is shown on the public website. Drafts stay private."
      : "The public website is using its built-in content while CMS publishing is off.";
  }

  async function importStarterContent() {
    const defaults = window.RELENTLESS_CMS_DEFAULTS;
    if (!defaults) {
      showNotice("Starter content is unavailable. Reload the dashboard and try again.", true);
      return;
    }
    const button = $("#importStarterButton");
    button.disabled = true;
    button.textContent = "Importing starter content…";
    try {
      const sources = {
        products: defaults.products.map((content, index) => ({ id: content.id, content, published: true, featured: index < 3, sort_order: index })),
        articles: defaults.articles.map((content, index) => ({ id: content.id, content, published: true, sort_order: index })),
        gallery: defaults.gallery.map((content, index) => ({ id: slugify(content.title), content, published: true, sort_order: index }))
      };
      for (const [kind, table] of Object.entries(tables)) {
        const { data: existing, error: readError } = await client.from(table).select("id");
        if (readError) throw readError;
        const existingIds = new Set((existing || []).map((row) => row.id));
        const missing = sources[kind].filter((row) => !existingIds.has(row.id));
        if (missing.length) {
          const { error } = await client.from(table).insert(missing);
          if (error) throw error;
        }
      }
      const { error: enableError } = await client.from("cms_settings")
        .update({ enabled: true, updated_at: new Date().toISOString() }).eq("id", 1);
      if (enableError) throw enableError;
      updatePublishStatus(true);
      showNotice("Starter content imported. Published content is now live on your website.");
      await refresh();
    } catch (error) {
      showNotice(`Starter content import failed: ${error.message}`, true);
    } finally {
      button.disabled = false;
      button.textContent = "Import website starter content";
    }
  }

  async function authorizeAndShow(user) {
    if (!user) {
      setSessionVisible(false);
      return;
    }
    const { data, error } = await client.from("cms_admins").select("user_id").eq("user_id", user.id).maybeSingle();
    if (error) {
      await client.auth.signOut();
      setSessionVisible(false);
      setLoginError(`Could not verify admin access: ${error.message}. Check the Supabase setup and admin approval.`);
      return;
    }
    if (!data) {
      await client.auth.signOut();
      setSessionVisible(false);
      setLoginError("This account is not on the approved administrator list.");
      return;
    }
    setSessionVisible(true);
    $("#adminEmail").textContent = user.email || "";
    $("#adminAvatar").textContent = (user.email || "A").charAt(0).toUpperCase();
    try {
      const { data: setting, error: settingError } = await client.from("cms_settings").select("enabled").eq("id", 1).single();
      if (settingError) throw settingError;
      updatePublishStatus(Boolean(setting.enabled));
      await loadRecords();
    } catch (loadError) {
      showNotice(`CMS could not be loaded: ${loadError.message}`, true);
    }
  }

  async function initialize() {
    if (!client) {
      setLoginError(!configured
        ? "Connect Supabase first: set the project URL and public anon key in assets/js/supabase-config.js, then run supabase-setup.sql."
        : "The Supabase client did not load. Check your internet connection or CDN access, then refresh this page.");
      return;
    }
    $("#loginForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = event.currentTarget.querySelector('button[type="submit"]');
      button.disabled = true;
      setLoginError("");
      try {
        const { data, error } = await client.auth.signInWithPassword({
          email: $("#loginEmail").value.trim(),
          password: $("#loginPassword").value
        });
        if (error) throw error;
        await authorizeAndShow(data.user);
      } catch (error) {
        setLoginError(error.message || "Sign-in failed.");
      } finally {
        button.disabled = false;
      }
    });
    $("#signOutButton").addEventListener("click", async () => {
      const { error } = await client.auth.signOut();
      if (error) {
        showNotice(`Sign out failed: ${error.message}`, true);
        return;
      }
      setSessionVisible(false);
      $("#loginPassword").value = "";
    });
    $("#sectionNav").addEventListener("click", (event) => {
      const button = event.target.closest("[data-section]");
      if (button) showSection(button.dataset.section);
    });
    document.querySelectorAll(".add-item").forEach((button) =>
      button.addEventListener("click", () => openEditor(button.dataset.kind)));
    $("#quickAddButton").addEventListener("click", () => openEditor("products"));
    $("#editorForm").addEventListener("submit", saveEditor);
    $("#editorClose").addEventListener("click", () => $("#editorDialog").close());
    $("#editorCancel").addEventListener("click", () => $("#editorDialog").close());
    $("#editorFields").addEventListener("change", (event) => {
      if (event.target.matches("[data-upload-for]")) uploadImage(event.target);
    });
    $("#editorFields").addEventListener("input", (event) => {
      if (event.target.id === "field-id") event.target.dataset.touched = "true";
    });
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const kind = button.dataset.kind;
      const record = records[kind]?.find((item) => item.id === button.dataset.id);
      if (button.dataset.action === "edit" && record) openEditor(kind, record);
      if (button.dataset.action === "delete") deleteRecord(kind, button.dataset.id);
    });
    $("#productsSearch").addEventListener("input", () => renderList("products"));
    $("#articlesSearch").addEventListener("input", () => renderList("articles"));
    $("#cmsEnabled").addEventListener("change", (event) => setCmsEnabled(event.target.checked));
    $("#importStarterButton").addEventListener("click", importStarterContent);

    const { data, error } = await client.auth.getSession();
    if (error) {
      setLoginError(`Could not check your sign-in session: ${error.message}`);
      return;
    }
    if (data.session) await authorizeAndShow(data.session.user);
  }

  initialize().catch((error) => {
    setLoginError(`Admin initialization failed: ${error.message}`);
  });
})();

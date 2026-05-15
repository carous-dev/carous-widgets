(function () {
  "use strict";

  var DEFAULT_OPTIONS = {
    target: "",
    dealerName: "Dealer",
    leadEndpoint: "/leads",
    leadOwner: "",
    leadType: "contact-us",
    leadSource: "contact-page",
    phoneNumber: "",
    phoneTel: "",
    email: "",
    title: "Tell us what you need.",
    subtitle: "Send the team a message and they will come back to you by your preferred route.",
    minSubmitMs: 350,
    rateLimitWindowMs: 60000,
    rateLimitMax: 5
  };

  var TOPICS = [
    ["general", "General enquiry"],
    ["appointment", "Book a visit"],
    ["vehicle", "Vehicle question"],
    ["sell", "Sell my car"]
  ];

  var CONTACT_METHODS = [
    ["phone", "Phone"],
    ["email", "Email"]
  ];

  var mounted = null;
  var modal = null;

  function readScriptOptions(script) {
    if (!script) return {};
    return {
      target: script.dataset.target || "",
      dealerName: script.dataset.dealerName || script.dataset.brandName || "",
      leadEndpoint: script.dataset.leadEndpoint || script.dataset.leadSubmitUrl || "",
      leadOwner: script.dataset.leadOwner || script.dataset.dealerClientId || "",
      leadType: script.dataset.leadType || "",
      leadSource: script.dataset.leadSource || "",
      phoneNumber: script.dataset.phoneNumber || script.dataset.phoneDisplay || "",
      phoneTel: script.dataset.phoneTel || "",
      email: script.dataset.email || "",
      title: script.dataset.title || "",
      subtitle: script.dataset.subtitle || "",
      minSubmitMs: script.dataset.minSubmitMs || "",
      rateLimitWindowMs: script.dataset.rateLimitWindowMs || "",
      rateLimitMax: script.dataset.rateLimitMax || ""
    };
  }

  function mergeOptions(options) {
    var next = {};
    Object.keys(DEFAULT_OPTIONS).forEach(function (key) {
      next[key] = DEFAULT_OPTIONS[key];
    });
    Object.keys(options || {}).forEach(function (key) {
      if (options[key] !== undefined && options[key] !== null && options[key] !== "") {
        next[key] = options[key];
      }
    });
    if (!next.phoneTel && next.phoneNumber) {
      next.phoneTel = next.phoneNumber.replace(/[^\d+]/g, "");
    }
    next.minSubmitMs = parsePositiveInt(next.minSubmitMs, DEFAULT_OPTIONS.minSubmitMs);
    next.rateLimitWindowMs = parsePositiveInt(next.rateLimitWindowMs, DEFAULT_OPTIONS.rateLimitWindowMs);
    next.rateLimitMax = parsePositiveInt(next.rateLimitMax, DEFAULT_OPTIONS.rateLimitMax);
    return next;
  }

  function parsePositiveInt(value, fallback) {
    var parsed = parseInt(value, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
  }

  function resolveTarget(target) {
    if (!target) return null;
    if (typeof target === "string") return document.querySelector(target);
    if (target && target.nodeType === 1) return target;
    return null;
  }

  function optionTags(options, selected) {
    return options.map(function (option) {
      return '<option value="' + escapeAttr(option[0]) + '"' + (option[0] === selected ? " selected" : "") + ">" + escapeHtml(option[1]) + "</option>";
    }).join("");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  function styles() {
    return `
      :host {
        --cfw-accent: var(--color-primary, var(--accent-primary, #d4af37));
        --cfw-accent-hover: var(--accent-secondary-hover, #b69424);
        --cfw-accent-text: var(--color-header-text, #211b0c);
        --cfw-bg: var(--color-bg, #ffffff);
        --cfw-surface: var(--color-surface, #fffdf7);
        --cfw-text: var(--color-text, #2c2514);
        --cfw-muted: var(--color-muted, #6d6241);
        --cfw-border: var(--color-border, #e4d7ab);
        --cfw-error: #b42318;
        --cfw-success: #047857;
        color: var(--cfw-text);
        font-family: inherit;
      }
      * { box-sizing: border-box; }
      .cfw-widget {
        display: grid;
        grid-template-columns: 1fr;
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--cfw-border) 82%, transparent);
        border-radius: 18px;
        background: #fff;
        box-shadow: 0 24px 52px color-mix(in srgb, rgba(92, 74, 18, 0.18) 46%, transparent);
      }
      .cfw-widget.is-compact {
        display: block;
        overflow: visible;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
      }
      .cfw-panel {
        position: relative;
        display: grid;
        gap: 22px;
        padding: 28px 22px;
        color: #fff;
        background: linear-gradient(160deg, color-mix(in srgb, var(--cfw-text) 94%, #000) 0%, color-mix(in srgb, var(--cfw-text) 84%, var(--cfw-accent)) 58%, color-mix(in srgb, #000 76%, var(--cfw-accent)) 100%);
      }
      .is-compact .cfw-panel { display: none; }
      .cfw-kicker,
      .cfw-topline {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        width: fit-content;
        border-radius: 999px;
        font-size: 0.74rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .cfw-kicker {
        margin-bottom: 14px;
        padding: 7px 11px;
        color: color-mix(in srgb, #fff 92%, transparent);
        background: color-mix(in srgb, #fff 12%, transparent);
        border: 1px solid color-mix(in srgb, #fff 18%, transparent);
      }
      .cfw-title {
        margin: 0;
        color: #fff;
        font-size: clamp(1.65rem, 7vw, 2.35rem);
        line-height: 1.08;
        font-weight: 800;
      }
      .cfw-copy {
        max-width: 34rem;
        margin: 12px 0 0;
        color: color-mix(in srgb, #fff 78%, transparent);
        line-height: 1.6;
      }
      .cfw-quick-list { display: grid; gap: 10px; }
      .cfw-quick-item {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
        padding: 12px;
        border: 1px solid color-mix(in srgb, #fff 16%, transparent);
        border-radius: 12px;
        color: #fff;
        text-decoration: none;
        background: color-mix(in srgb, #fff 9%, transparent);
      }
      .cfw-quick-item strong,
      .cfw-quick-item small {
        display: block;
        overflow-wrap: anywhere;
      }
      .cfw-quick-item small {
        margin-top: 2px;
        color: color-mix(in srgb, #fff 68%, transparent);
        font-size: 0.78rem;
      }
      .cfw-form {
        display: grid;
        gap: 18px;
        padding: 22px;
        background: linear-gradient(180deg, color-mix(in srgb, var(--cfw-surface) 72%, #fff) 0%, #fff 100%);
      }
      .is-compact .cfw-form {
        padding: 0;
        background: transparent;
      }
      .cfw-topline {
        padding: 8px 12px;
        color: var(--cfw-text);
        background: color-mix(in srgb, var(--cfw-accent) 14%, #fff);
        border: 1px solid color-mix(in srgb, var(--cfw-accent) 24%, transparent);
      }
      .is-compact .cfw-topline { display: none; }
      .cfw-grid { display: grid; gap: 14px; }
      .is-compact .cfw-grid { gap: 12px; }
      .cfw-field { display: grid; gap: 8px; }
      .cfw-field label {
        color: var(--cfw-muted);
        font-size: 0.84rem;
        font-weight: 800;
      }
      .cfw-field input,
      .cfw-field select,
      .cfw-field textarea {
        width: 100%;
        border: 1px solid color-mix(in srgb, var(--cfw-border) 82%, transparent);
        border-radius: 12px;
        background: #fff;
        color: var(--cfw-text);
        font: inherit;
        outline: none;
        transition: border-color 160ms ease, box-shadow 160ms ease;
      }
      .cfw-field input,
      .cfw-field select {
        min-height: 50px;
        padding: 0 14px;
      }
      .is-compact .cfw-field input,
      .is-compact .cfw-field select { min-height: 46px; }
      .cfw-field textarea {
        min-height: 76px;
        height: auto;
        overflow: hidden;
        padding: 14px;
        resize: none;
      }
      .is-compact .cfw-field textarea { min-height: 72px; }
      .cfw-field input:focus,
      .cfw-field select:focus,
      .cfw-field textarea:focus {
        border-color: color-mix(in srgb, var(--cfw-accent) 64%, var(--cfw-border));
        box-shadow: 0 0 0 4px color-mix(in srgb, var(--cfw-accent) 14%, transparent);
      }
      .cfw-error-text {
        color: var(--cfw-error);
        font-size: 0.78rem;
        font-style: normal;
      }
      .cfw-footer {
        display: grid;
        gap: 10px;
        justify-items: start;
      }
      .cfw-submit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        min-height: 50px;
        width: 100%;
        max-width: 240px;
        border: 0;
        border-radius: 999px;
        padding: 0 22px;
        background: var(--cfw-accent);
        color: var(--cfw-accent-text);
        cursor: pointer;
        font: inherit;
        font-weight: 900;
        transition: transform 140ms ease, background 140ms ease, opacity 140ms ease;
      }
      .cfw-submit:hover:not(:disabled) {
        transform: translateY(-1px);
        background: var(--cfw-accent-hover);
      }
      .cfw-submit:disabled {
        cursor: wait;
        opacity: 0.72;
      }
      .cfw-note,
      .cfw-status {
        margin: 0;
        font-size: 0.8rem;
        line-height: 1.55;
      }
      .cfw-note {
        max-width: 44rem;
        color: var(--cfw-muted);
      }
      .cfw-status.is-success { color: var(--cfw-success); font-weight: 800; }
      .cfw-status.is-error { color: var(--cfw-error); font-weight: 700; }
      .cfw-honeypot {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        opacity: 0;
      }
      .cfw-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 2147483500;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 18px;
        background: color-mix(in srgb, #000 58%, transparent);
        backdrop-filter: blur(8px);
      }
      .cfw-modal {
        width: 100%;
        max-width: 620px;
        max-height: calc(100dvh - 36px);
        overflow-y: auto;
        border: 1px solid color-mix(in srgb, var(--cfw-border) 82%, transparent);
        border-radius: 18px;
        background: #fff;
        box-shadow: 0 24px 64px color-mix(in srgb, #000 28%, transparent);
      }
      .cfw-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 18px;
        padding: 24px 24px 18px;
        border-bottom: 1px solid color-mix(in srgb, var(--cfw-border) 76%, transparent);
        background: linear-gradient(145deg, color-mix(in srgb, var(--cfw-surface) 74%, #fff), #fff);
      }
      .cfw-modal-eyebrow {
        display: block;
        margin-bottom: 8px;
        color: var(--cfw-accent);
        font-size: 0.74rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .cfw-modal-title {
        margin: 0;
        color: var(--cfw-text);
        font-size: clamp(1.35rem, 4vw, 1.8rem);
        line-height: 1.15;
        font-weight: 800;
      }
      .cfw-modal-description {
        max-width: 46rem;
        margin: 8px 0 0;
        color: color-mix(in srgb, var(--cfw-text) 75%, transparent);
        font-size: 0.95rem;
        line-height: 1.55;
      }
      .cfw-modal-close {
        flex: 0 0 auto;
        width: 38px;
        height: 38px;
        border-radius: 999px;
        border: 1px solid color-mix(in srgb, var(--cfw-border) 80%, transparent);
        background: #fff;
        color: var(--cfw-text);
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
      }
      .cfw-modal-content { padding: 24px; }
      @media (min-width: 720px) {
        .cfw-widget {
          grid-template-columns: minmax(260px, 0.78fr) minmax(0, 1.22fr);
          border-radius: 20px;
        }
        .cfw-panel,
        .cfw-form { padding: 30px; }
        .cfw-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .cfw-field.is-wide { grid-column: 1 / -1; }
        .cfw-submit { min-width: 190px; }
        .cfw-widget.is-compact { display: block; }
      }
      @media (max-width: 520px) {
        .cfw-modal-overlay {
          align-items: stretch;
          padding: 0;
        }
        .cfw-modal {
          width: 100%;
          max-width: none;
          max-height: 100dvh;
          border-left: 0;
          border-right: 0;
          border-radius: 0;
        }
        .cfw-modal-header,
        .cfw-modal-content { padding: 18px; }
      }
    `;
  }

  function renderForm(root, options, compact) {
    var formTs = Date.now();
    var id = "cfw-" + Math.random().toString(36).slice(2);
    root.innerHTML = `
      <style>${styles()}</style>
      <article class="cfw-widget${compact ? " is-compact" : ""}">
        <div class="cfw-panel">
          <div>
            <span class="cfw-kicker">Contact Form</span>
            <h2 class="cfw-title">${escapeHtml(options.title)}</h2>
            <p class="cfw-copy">${escapeHtml(options.subtitle)}</p>
          </div>
          <div class="cfw-quick-list" aria-label="${escapeAttr(options.dealerName)} contact options">
            ${options.phoneNumber ? '<a class="cfw-quick-item" href="tel:' + escapeAttr(options.phoneTel) + '"><span><strong>' + escapeHtml(options.phoneNumber) + '</strong><small>Showroom</small></span></a>' : ""}
            ${options.email ? '<a class="cfw-quick-item" href="mailto:' + escapeAttr(options.email) + '"><span><strong>Email us</strong><small>' + escapeHtml(options.email) + '</small></span></a>' : ""}
          </div>
        </div>
        <form class="cfw-form" novalidate>
          <input class="cfw-honeypot" type="text" name="website" tabindex="-1" autocomplete="new-password" aria-hidden="true" />
          <input class="cfw-honeypot" type="text" name="companyWebsite" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div class="cfw-topline">Message ${escapeHtml(options.dealerName)}</div>
          <div class="cfw-grid">
            ${field(id, "name", "Full name", "text", "Your name", "name")}
            ${field(id, "phone", "Phone number", "tel", "Your phone number", "tel")}
            ${field(id, "email", "Email address", "email", "you@example.com", "email")}
            ${selectField(id, "topic", "Enquiry type", TOPICS, "general")}
            ${selectField(id, "preferredContact", "Preferred contact", CONTACT_METHODS, "phone")}
          </div>
          <div class="cfw-field is-wide">
            <label for="${id}-message">Message</label>
            <textarea id="${id}-message" name="message" rows="2" placeholder="Tell us about the vehicle, appointment, or question you have in mind."></textarea>
            <em class="cfw-error-text" data-error-for="message"></em>
          </div>
          <div class="cfw-footer">
            <button class="cfw-submit" type="submit"><span>Send message</span><span aria-hidden="true">→</span></button>
            <p class="cfw-note">By submitting, you agree that ${escapeHtml(options.dealerName)} may contact you about your enquiry.</p>
          </div>
          <p class="cfw-status" hidden></p>
        </form>
      </article>
    `;

    var form = root.querySelector("form");
    var textarea = root.querySelector("textarea");
    if (textarea) {
      textarea.addEventListener("input", function () { resizeTextarea(textarea); });
      resizeTextarea(textarea);
    }
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      submitForm(form, options, formTs);
    });
  }

  function field(id, name, label, type, placeholder, autocomplete) {
    return `
      <div class="cfw-field">
        <label for="${id}-${name}">${escapeHtml(label)}</label>
        <input id="${id}-${name}" name="${name}" type="${type}" placeholder="${escapeAttr(placeholder)}" autocomplete="${escapeAttr(autocomplete)}" />
        <em class="cfw-error-text" data-error-for="${name}"></em>
      </div>
    `;
  }

  function selectField(id, name, label, options, selected) {
    return `
      <div class="cfw-field">
        <label for="${id}-${name}">${escapeHtml(label)}</label>
        <select id="${id}-${name}" name="${name}">${optionTags(options, selected)}</select>
        <em class="cfw-error-text" data-error-for="${name}"></em>
      </div>
    `;
  }

  function resizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  function labelFor(options, value) {
    for (var i = 0; i < options.length; i += 1) {
      if (options[i][0] === value) return options[i][1];
    }
    return value;
  }

  function valuesFrom(form) {
    var data = new FormData(form);
    return {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim().toLowerCase(),
      phone: String(data.get("phone") || "").trim(),
      topic: String(data.get("topic") || "general"),
      preferredContact: String(data.get("preferredContact") || "phone"),
      message: String(data.get("message") || "").trim(),
      website: String(data.get("website") || ""),
      companyWebsite: String(data.get("companyWebsite") || "")
    };
  }

  function storageKey(options) {
    return "carous-contact-form:" + (options.leadOwner || options.dealerName || "dealer") + ":" + options.leadEndpoint;
  }

  function isRateLimited(options) {
    if (!options.rateLimitWindowMs || !options.rateLimitMax) return false;
    var key = storageKey(options);
    var now = Date.now();
    try {
      if (!window.localStorage) return false;
      var stored = window.localStorage.getItem(key);
      var parsed = stored ? JSON.parse(stored) : { count: 0, resetAt: now + options.rateLimitWindowMs };
      if (!parsed.resetAt || now > parsed.resetAt) {
        window.localStorage.setItem(key, JSON.stringify({ count: 1, resetAt: now + options.rateLimitWindowMs }));
        return false;
      }
      if (parsed.count >= options.rateLimitMax) return true;
      window.localStorage.setItem(key, JSON.stringify({ count: parsed.count + 1, resetAt: parsed.resetAt }));
      return false;
    } catch (error) {
      return false;
    }
  }

  function isAutomation(values, options, formTs) {
    if (values.website || values.companyWebsite) return true;
    if (options.minSubmitMs > 0 && Date.now() - formTs < options.minSubmitMs) return true;
    return isRateLimited(options);
  }

  function absorbAutomation(form, options) {
    setStatus(form, "success", "Thank you. Your message has been sent to " + options.dealerName + ".");
    form.reset();
    var textarea = form.querySelector("textarea");
    if (textarea) resizeTextarea(textarea);
  }

  function validate(form, values) {
    var errors = {};
    if (!values.name) errors.name = "Please enter your full name.";
    if (!values.phone) errors.phone = "Please enter your phone number.";
    if (!values.email) errors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please enter a valid email.";
    if (!values.message) errors.message = "Please add a message.";
    else if (values.message.length < 12) errors.message = "Please add a little more detail.";

    form.querySelectorAll("[data-error-for]").forEach(function (node) {
      node.textContent = errors[node.getAttribute("data-error-for")] || "";
    });
    return errors;
  }

  function setStatus(form, type, message) {
    var status = form.querySelector(".cfw-status");
    if (!status) return;
    status.hidden = !message;
    status.textContent = message || "";
    status.className = "cfw-status" + (type ? " is-" + type : "");
  }

  function submitForm(form, options, formTs) {
    var values = valuesFrom(form);
    if (values.website || values.companyWebsite) {
      absorbAutomation(form, options);
      return;
    }

    var errors = validate(form, values);
    if (Object.keys(errors).length) return;

    if (isAutomation(values, options, formTs)) {
      absorbAutomation(form, options);
      return;
    }

    var button = form.querySelector(".cfw-submit");
    if (button) {
      button.disabled = true;
      button.querySelector("span").textContent = "Sending...";
    }
    setStatus(form, "", "");

    var topicLabel = labelFor(TOPICS, values.topic);
    var contactLabel = labelFor(CONTACT_METHODS, values.preferredContact);
    var pageUrl = window.location.href;
    var submittedDetails = [
      "Topic: " + topicLabel,
      "Preferred Contact: " + contactLabel,
      "Page: " + pageUrl
    ].join("\n");
    var payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      subject: options.dealerName + " contact enquiry: " + topicLabel,
      message: [values.message, "", submittedDetails].join("\n"),
      submittedDetails: submittedDetails,
      topic: topicLabel,
      preferredContact: contactLabel,
      preferred_contact: contactLabel,
      permalink: pageUrl,
      url: pageUrl,
      leadType: options.leadType,
      leadSource: options.leadSource,
      leadOwner: options.leadOwner,
      formTs: formTs,
      website: values.website,
      companyWebsite: values.companyWebsite
    };

    fetch(options.leadEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (body) {
          if (!response.ok || body.success === false || body.created === false && body.error) {
            throw new Error(body.error || "Lead submission failed.");
          }
          return body;
        });
      })
      .then(function () {
        setStatus(form, "success", "Thank you. Your message has been sent to " + options.dealerName + ".");
        form.reset();
        var textarea = form.querySelector("textarea");
        if (textarea) resizeTextarea(textarea);
      })
      .catch(function (error) {
        setStatus(form, "error", error && error.message ? error.message : "Something went wrong. Please try again.");
      })
      .finally(function () {
        if (button) {
          button.disabled = false;
          button.querySelector("span").textContent = "Send message";
        }
      });
  }

  function mount(target, options) {
    var merged = mergeOptions(options || {});
    var element = resolveTarget(target || merged.target);
    if (!element) return null;
    element.innerHTML = "";
    var root = element.shadowRoot || (element.attachShadow ? element.attachShadow({ mode: "open" }) : element);
    renderForm(root, merged, false);
    mounted = { element: element, root: root, options: merged };
    return mounted;
  }

  function open(options) {
    var merged = mergeOptions(Object.assign({}, scriptOptions, mounted ? mounted.options : {}, options || {}));
    close();
    var host = document.createElement("div");
    document.body.appendChild(host);
    var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    root.innerHTML = `
      <style>${styles()}</style>
      <div class="cfw-modal-overlay">
        <div class="cfw-modal" role="dialog" aria-modal="true" aria-labelledby="cfw-modal-title">
          <div class="cfw-modal-header">
            <div>
              <span class="cfw-modal-eyebrow">Contact ${escapeHtml(merged.dealerName)}</span>
              <h2 class="cfw-modal-title" id="cfw-modal-title">Send a message</h2>
              <p class="cfw-modal-description">Vehicle questions, appointments, and showroom enquiries all land with the same team.</p>
            </div>
            <button class="cfw-modal-close" type="button" aria-label="Close">×</button>
          </div>
          <div class="cfw-modal-content"></div>
        </div>
      </div>
    `;
    var content = root.querySelector(".cfw-modal-content");
    renderForm(content, merged, true);
    root.querySelector(".cfw-modal-close").addEventListener("click", close);
    root.querySelector(".cfw-modal-overlay").addEventListener("click", function (event) {
      if (event.target.classList.contains("cfw-modal-overlay")) close();
    });
    modal = { host: host, root: root };
    return modal;
  }

  function close() {
    if (modal && modal.host && modal.host.parentNode) {
      modal.host.parentNode.removeChild(modal.host);
    }
    modal = null;
  }

  var currentScript = document.currentScript;
  var scriptOptions = mergeOptions(readScriptOptions(currentScript));
  window.CarousContactForm = Object.assign({}, window.CarousContactForm || {}, {
    mount: mount,
    open: open,
    close: close,
    configure: function (options) {
      scriptOptions = mergeOptions(Object.assign({}, scriptOptions, options || {}));
      if (mounted) mount(mounted.element, scriptOptions);
    }
  });

  function autoMount() {
    if (scriptOptions.target) mount(scriptOptions.target, scriptOptions);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoMount, { once: true });
  } else {
    autoMount();
  }
})();

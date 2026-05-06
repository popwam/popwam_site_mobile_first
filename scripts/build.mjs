import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const data = require("../assets/js/projects.js");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const locales = {
  ar: { code: "ar", dir: "rtl", prefix: "", label: "AR", switchLabel: "EN" },
  en: { code: "en", dir: "ltr", prefix: "/en", label: "EN", switchLabel: "AR" },
};

const serviceMap = new Map(data.services.map((service) => [service.key, service]));
const sectorMap = new Map(data.sectors.map((sector) => [sector.key, sector]));
const routes = [];
const expectedDemoCount = 30;
const servicePriceRanges = {
  web: { ar: "متوسط: 25,000 - 85,000 جنيه", en: "Average: EGP 25k - 85k" },
  crm: { ar: "متوسط: 60,000 - 220,000 جنيه", en: "Average: EGP 60k - 220k" },
  mobile: { ar: "متوسط: 90,000 - 350,000 جنيه", en: "Average: EGP 90k - 350k" },
  "wordpress-firebase": { ar: "متوسط: 45,000 - 160,000 جنيه", en: "Average: EGP 45k - 160k" },
  seo: { ar: "متوسط شهري: 15,000 - 55,000 جنيه", en: "Monthly average: EGP 15k - 55k" },
  "email-migration": { ar: "متوسط: 20,000 - 90,000 جنيه", en: "Average: EGP 20k - 90k" },
  infrastructure: { ar: "متوسط: 15,000 - 70,000 جنيه", en: "Average: EGP 15k - 70k" },
  automation: { ar: "متوسط: 25,000 - 120,000 جنيه", en: "Average: EGP 25k - 120k" },
  ads: { ar: "إدارة شهرية: 12,000 - 45,000 جنيه", en: "Monthly management: EGP 12k - 45k" },
  analytics: { ar: "متوسط: 30,000 - 140,000 جنيه", en: "Average: EGP 30k - 140k" },
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const escapeXml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const text = (value, locale) =>
  value && typeof value === "object" && value[locale] ? value[locale] : value ?? "";

const pathFor = (locale, slug = "") => {
  const clean = String(slug).replace(/^\/+|\/+$/g, "");

  if (!clean) {
    return locale === "ar" ? "/" : "/en/";
  }

  return locale === "ar" ? `/${clean}/` : `/en/${clean}/`;
};

const outputPathFor = (locale, slug = "") => {
  const clean = String(slug).replace(/^\/+|\/+$/g, "");

  if (!clean) {
    return locale === "ar"
      ? path.join(rootDir, "index.html")
      : path.join(rootDir, "en", "index.html");
  }

  return locale === "ar"
    ? path.join(rootDir, clean, "index.html")
    : path.join(rootDir, "en", clean, "index.html");
};

const toUrl = (pathname) => `${data.site.domain}${pathname}`;

const demoPathFor = (project) => `/demos/${project.slug}/`;

const validateData = () => {
  const demoProjects = data.projects.filter((project) => project.demo);
  const invalidDemoProjects = data.projects.filter((project) => project.demo !== demoPathFor(project));

  if (data.projects.length !== expectedDemoCount || demoProjects.length !== expectedDemoCount) {
    throw new Error(
      `Expected ${expectedDemoCount} projects with demo paths, found ${data.projects.length} projects and ${demoProjects.length} demo paths.`
    );
  }

  if (invalidDemoProjects.length) {
    throw new Error(
      `Expected local /demos/<slug>/ paths for every project. Invalid slugs: ${invalidDemoProjects
        .map((project) => project.slug)
        .join(", ")}`
    );
  }
};

const languageRedirectScript = (locale, currentSlug = "") => {
  const targets = {
    ar: pathFor("ar", currentSlug),
    en: pathFor("en", currentSlug),
  };

  return `<script>
(function () {
  var storageKey = "popwam_locale";
  var targetLocale = "";

  try {
    var storedLocale = window.localStorage && window.localStorage.getItem(storageKey);
    if (storedLocale === "ar" || storedLocale === "en") {
      targetLocale = storedLocale;
    }
  } catch (error) {}

  if (!targetLocale) {
    var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || ""];

    for (var index = 0; index < languages.length; index += 1) {
      var code = String(languages[index] || "").toLowerCase().split("-")[0];

      if (code === "ar" || code === "en") {
        targetLocale = code;
        break;
      }
    }
  }

  if (!targetLocale) {
    targetLocale = "en";
  }

  if (targetLocale === ${JSON.stringify(locale)}) {
    return;
  }

  var targets = ${JSON.stringify(targets)};
  var targetPath = targets[targetLocale];

  if (!targetPath || window.location.pathname === targetPath) {
    return;
  }

  window.location.replace(targetPath + window.location.search + window.location.hash);
})();
</script>`;
};

const icon = (name) => {
  const icons = {
    spark:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10 5.5h4"/><path d="M11 18.5h2"/></svg>',
    flow:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h6"/><path d="M14 7h6"/><path d="M7 7v10"/><path d="M17 7v4"/><path d="M7 17h10"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="7" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
    chart:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M7 15v-4"/><path d="M12 15V7"/><path d="M17 15v-7"/></svg>',
    window:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 8h18"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>',
    database:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>',
    stack:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 7l8 4 8-4-8-4Z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.2-4.2"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m5 7 7 5 7-5"/></svg>',
    server:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="6" rx="2"/><rect x="4" y="14" width="16" height="6" rx="2"/><path d="M8 7h.01"/><path d="M8 17h.01"/><path d="M12 7h5"/><path d="M12 17h5"/></svg>',
    megaphone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h3l9-5v10l-9-5H4v-0Z"/><path d="M7 12v6a2 2 0 0 0 2 2h1"/></svg>',
    building:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V5a2 2 0 0 1 2-2h8v17"/><path d="M14 20V9h4a2 2 0 0 1 2 2v9"/><path d="M8 7h2"/><path d="M8 11h2"/><path d="M8 15h2"/></svg>',
    pulse:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-4 4 8 2-4h6"/></svg>',
    graduation:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 11v4c0 1.6 2.2 3 5 3s5-1.4 5-3v-4"/><path d="M21 10v6"/></svg>',
    briefcase:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M3 12h18"/></svg>',
    settings:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z"/></svg>',
    chat:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 3 21V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6Z"/><path d="M8 10h8"/><path d="M8 14h5"/></svg>',
  };

  return icons[name] || icons.spark;
};

const iconTile = (name) => `<span class="icon-tile" aria-hidden="true">${icon(name)}</span>`;

const button = (href, label, className = "button") => {
  const external = /^https?:\/\//.test(href) && !href.startsWith(data.site.domain);
  const opensDemo = href.startsWith("/demos/");
  const attrs = external || opensDemo ? ' target="_blank" rel="noopener noreferrer"' : "";
  const demoAttr = opensDemo ? ' data-demo-link' : "";
  return `<a class="${className}" href="${escapeHtml(href)}"${attrs}${demoAttr}>${escapeHtml(label)}</a>`;
};

const renderServicePills = (keys, locale) =>
  keys
    .map((key) => serviceMap.get(key))
    .filter(Boolean)
    .map((service) => `<span class="service-pill">${escapeHtml(text(service.title, locale))}</span>`)
    .join("");

const renderStackPills = (items) =>
  items.map((item) => `<span class="stack-pill">${escapeHtml(item)}</span>`).join("");

const renderStatCards = (items, locale) =>
  items
    .map(
      (item) => `
        <article class="metric-card">
          <span class="metric-value">${escapeHtml(item.value)}</span>
          <span class="metric-label">${escapeHtml(text(item.label, locale))}</span>
        </article>
      `
    )
    .join("");

const renderServiceCard = (service, locale, compact = false) => `
  <article class="service-card reveal">
    ${iconTile(service.icon)}
    <div class="card-stack">
      <h3 class="mini-title">${escapeHtml(text(service.title, locale))}</h3>
      <p class="card-text">${escapeHtml(text(service.summary, locale))}</p>
      <span class="price-pill">${escapeHtml(text(servicePriceRanges[service.key], locale))}</span>
      ${
        compact
          ? ""
          : `<ul class="bullet-list">${service.bullets
              .map((item) => `<li>${escapeHtml(text(item, locale))}</li>`)
              .join("")}</ul>`
      }
      <p class="card-text">${escapeHtml(text(service.outcome, locale))}</p>
    </div>
  </article>
`;

const renderProjectCard = (project, locale) => {
  const sector = sectorMap.get(project.sector);
  const summary = text(project.summary, locale);
  const metric = project.metrics[0];

  return `
    <article class="project-card reveal" data-project-card data-category="${escapeHtml(project.sector)}">
      <div class="project-top">
        <div>
          <span class="badge">${escapeHtml(text(sector.label, locale))}</span>
          <h3 class="mini-title">${escapeHtml(text(project.title, locale))}</h3>
        </div>
        ${iconTile(sector.icon)}
      </div>
      <p class="card-text">${escapeHtml(summary)}</p>
      <div class="chip-row">${renderServicePills(project.services.slice(0, 3), locale)}</div>
      <article class="metric-card">
        <span class="metric-value">${escapeHtml(metric.value)}</span>
        <span class="metric-label">${escapeHtml(text(metric.label, locale))}</span>
      </article>
      <div class="project-actions">
        ${button(pathFor(locale, `case-study/${project.slug}`), text(data.globals.caseStudy, locale), "button")}
        ${button(demoPathFor(project), text(data.globals.liveDemo, locale), "button-ghost")}
      </div>
    </article>
  `;
};

const renderSectorCard = (sector, locale) => `
  <article class="service-card reveal">
    ${iconTile(sector.icon)}
    <div class="card-stack">
      <h3 class="mini-title">${escapeHtml(text(sector.label, locale))}</h3>
      <p class="card-text">${
        locale === "ar"
          ? "أمثلة مخصصة ورسائل مناسبة لهذا القطاع داخل مكتبة الأعمال."
          : "Sector-specific examples and tailored messaging patterns inside the work library."
      }</p>
    </div>
  </article>
`;

const renderTimelineCard = (step, locale) => `
  <article class="timeline-card reveal">
    ${iconTile(step.icon)}
    <div class="card-stack">
      <h3 class="mini-title">${escapeHtml(text(step.title, locale))}</h3>
      <p class="card-text">${escapeHtml(text(step.body, locale))}</p>
      <span class="badge">${escapeHtml(text(step.deliverable, locale))}</span>
    </div>
  </article>
`;

const renderPrincipleCard = (item, locale) => `
  <article class="service-card reveal">
    ${iconTile(item.icon)}
    <div class="card-stack">
      <h3 class="mini-title">${escapeHtml(text(item.title, locale))}</h3>
      <p class="card-text">${escapeHtml(text(item.body, locale))}</p>
    </div>
  </article>
`;

const renderContactCard = (item, locale) => `
  <article class="contact-card reveal">
    ${iconTile(item.icon)}
    <div class="card-stack">
      <h3 class="mini-title">${escapeHtml(text(item.title, locale))}</h3>
      <p class="card-text">${escapeHtml(text(item.body, locale))}</p>
    </div>
  </article>
`;

const renderSectionHead = (eyebrow, title, body, locale) => `
  <header class="section-head reveal">
    ${eyebrow ? `<span class="eyebrow">${escapeHtml(text(eyebrow, locale))}</span>` : ""}
    <h2 class="section-title">${escapeHtml(text(title, locale))}</h2>
    ${body ? `<p class="section-text">${escapeHtml(text(body, locale))}</p>` : ""}
  </header>
`;

const navMarkup = (locale, currentKey, currentSlug = "") => {
  const alternateLocale = locale === "ar" ? "en" : "ar";
  const logoSubtitle = locale === "ar" ? "مواقع وأنظمة تبيع" : "Sites and systems that sell";
  const mobileLinks = data.navigation
    .map((item) => {
      const href = pathFor(locale, item.slug);
      const current = item.key === currentKey ? ' aria-current="page"' : "";
      return `<a href="${escapeHtml(href)}"${current}>${escapeHtml(text(item.label, locale))}</a>`;
    })
    .join("");

  const desktopLinks = data.navigation
    .map((item) => {
      const href = pathFor(locale, item.slug);
      const current = item.key === currentKey ? ' aria-current="page"' : "";
      return `<a class="nav-link" href="${escapeHtml(href)}"${current}>${escapeHtml(text(item.label, locale))}</a>`;
    })
    .join("");

  return `
    <header class="site-header">
      <div class="shell">
        <div class="nav-bar">
          <a class="brand" href="${pathFor(locale)}" aria-label="${escapeHtml(data.site.name)}">
            <span class="brand-mark"><img src="/assets/img/logo.svg" alt="${escapeHtml(data.site.name)} logo" width="42" height="42"></span>
            <span class="brand-copy">
              <span class="brand-title">${escapeHtml(data.site.name)}</span>
              <span class="brand-subtitle">${escapeHtml(logoSubtitle)}</span>
            </span>
          </a>
          <nav class="nav-links" aria-label="${locale === "ar" ? "روابط أساسية" : "Primary links"}">
            ${desktopLinks}
          </nav>
          <div class="nav-actions">
            <a class="lang-switch" href="${pathFor(alternateLocale, currentSlug)}">${locales[locale].switchLabel}</a>
            <a class="button-accent button" href="${pathFor(locale, "contact")}">${escapeHtml(text(data.globals.requestProposal, locale))}</a>
            <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav">
              ${icon("stack")}
              <span>${escapeHtml(text(data.globals.menu, locale))}</span>
            </button>
          </div>
        </div>
        <div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
          <nav class="mobile-nav-links" aria-label="${locale === "ar" ? "القائمة المحمولة" : "Mobile navigation"}">
            ${mobileLinks}
          </nav>
        </div>
      </div>
    </header>
  `;
};

const footerMarkup = (locale) => `
  <footer class="footer">
    <div class="shell">
      <div class="footer-card reveal">
        <div class="footer-top">
          <div>
            <h2 class="mini-title">${escapeHtml(data.site.name)}</h2>
            <p class="footer-text">${escapeHtml(text(data.globals.footerBlurb, locale))}</p>
          </div>
          <div class="footer-links">
            <a href="https://wa.me/${escapeHtml(data.site.phoneDigits)}" target="_blank" rel="noopener">${escapeHtml(text(data.globals.whatsapp, locale))}</a>
            <a href="mailto:${escapeHtml(data.site.email)}">${escapeHtml(text(data.globals.email, locale))}</a>
            <a href="tel:+${escapeHtml(data.site.phoneDigits)}">${escapeHtml(text(data.globals.phone, locale))}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-nav">
            ${data.navigation
              .map((item) => `<a href="${escapeHtml(pathFor(locale, item.slug))}">${escapeHtml(text(item.label, locale))}</a>`)
              .join("")}
          </div>
          <p class="muted">© <span data-year></span> ${escapeHtml(text(data.globals.footerTag, locale))}</p>
        </div>
      </div>
    </div>
  </footer>
`;

const layout = ({ locale, currentKey, currentSlug, meta, content, schemas, ogType = "website", enableLanguageRedirect = true }) => {
  const alternateLocale = locale === "ar" ? "en" : "ar";
  const pathname = pathFor(locale, currentSlug);
  const alternatePath = pathFor(alternateLocale, currentSlug);
  const title = text(meta.title, locale);
  const description = text(meta.description, locale);
  const languageRedirectMarkup = enableLanguageRedirect ? `\n    ${languageRedirectScript(locale, currentSlug)}` : "";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: data.site.name,
        url: data.site.domain,
        logo: `${data.site.domain}/assets/img/logo.svg`,
        email: data.site.email,
        telephone: data.site.phone,
        areaServed: "MENA",
        address: {
          "@type": "PostalAddress",
          addressLocality: text(data.site.location, locale),
        },
      },
      ...schemas,
    ],
  };

  return `<!doctype html>
<html lang="${locale}" dir="${locales[locale].dir}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#0f1115">
    <link rel="canonical" href="${toUrl(pathname)}">
    <link rel="alternate" hreflang="${locale}" href="${toUrl(pathname)}">
    <link rel="alternate" hreflang="${alternateLocale}" href="${toUrl(alternatePath)}">
    <link rel="alternate" hreflang="x-default" href="${toUrl(pathFor("ar", currentSlug))}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${toUrl(pathname)}">
    <meta property="og:site_name" content="${escapeHtml(data.site.name)}">
    <meta property="og:image" content="${data.site.domain}/assets/img/project-placeholder.svg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
    <link rel="manifest" href="/site.webmanifest">${languageRedirectMarkup}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;700&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
  </head>
  <body>
    <a class="skip-link" href="#main">${locale === "ar" ? "اذهب إلى المحتوى" : "Skip to content"}</a>
    ${navMarkup(locale, currentKey, currentSlug)}
    <main id="main" class="main-content">${content}</main>
    ${footerMarkup(locale)}
    <script src="/assets/js/main.js" defer></script>
  </body>
</html>`;
};

const renderHome = (locale) => {
  const featuredProjects = data.projects.filter((item) => item.featured).slice(0, 6);

  return `
    <div class="shell">
      <section class="hero-card reveal">
        <div class="hero-grid">
          <div class="card-stack">
            <span class="eyebrow">${escapeHtml(text(data.home.hero.badge, locale))}</span>
            <h1 class="hero-title">${escapeHtml(text(data.home.hero.title, locale))}</h1>
            <p class="hero-text">${escapeHtml(text(data.home.hero.body, locale))}</p>
            <div class="button-row">
              ${button(pathFor(locale, "contact"), text(data.home.hero.primary, locale), "button-accent button")}
              ${button(pathFor(locale, "portfolio"), text(data.home.hero.secondary, locale), "button-ghost")}
            </div>
            <div class="trust-list">
              ${data.home.trustPoints.map((item) => `<span class="trust-pill">${escapeHtml(text(item, locale))}</span>`).join("")}
            </div>
          </div>
          <aside class="hero-panel">
            <div class="card-stack">
              <span class="eyebrow">${escapeHtml(text(data.globals.mobileFirst, locale))}</span>
              <h2 class="mini-title">${locale === "ar" ? "واجهة وكالة حديثة وسريعة فعلًا" : "A fast, agency-grade interface in practice"}</h2>
              <p class="card-text">${
                locale === "ar"
                  ? "هذه النسخة تبني الثقة سريعًا، تشرح الخدمات بوضوح، وتعرض الأعمال بطريقة تسهّل البيع والإرسال."
                  : "This build earns trust quickly, explains services clearly, and presents the work in a way that supports real selling."
              }</p>
              <div class="stats-grid">
                ${renderStatCards(data.home.stats, locale)}
              </div>
              <div class="chip-row">
                <span class="chip">${escapeHtml(text(data.globals.seoReady, locale))}</span>
                <span class="chip">${escapeHtml(text(data.globals.staticHosting, locale))}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="section-block">
        ${renderSectionHead(data.home.servicesIntro.eyebrow, data.home.servicesIntro.title, data.home.servicesIntro.body, locale)}
        <div class="service-grid">
          ${data.services.slice(0, 6).map((service) => renderServiceCard(service, locale, true)).join("")}
        </div>
        <div class="button-row reveal">
          ${button(pathFor(locale, "services"), text(data.globals.discoverServices, locale), "button-dark")}
        </div>
      </section>

      <section class="section-block">
        ${renderSectionHead(data.home.portfolioIntro.eyebrow, data.home.portfolioIntro.title, data.home.portfolioIntro.body, locale)}
        <div class="project-grid">
          ${featuredProjects.map((project) => renderProjectCard(project, locale)).join("")}
        </div>
        <div class="button-row reveal">
          ${button(pathFor(locale, "portfolio"), text(data.globals.viewAllProjects, locale), "button-dark")}
        </div>
      </section>

      <section class="section-block">
        ${renderSectionHead(data.home.sectorsIntro.eyebrow, data.home.sectorsIntro.title, data.home.sectorsIntro.body, locale)}
        <div class="card-grid">
          ${data.sectors.map((sector) => renderSectorCard(sector, locale)).join("")}
        </div>
      </section>

      <section class="cta-band reveal">
        <div class="split-grid">
          <div class="card-stack">
            <h2 class="section-title">${escapeHtml(text(data.home.ctaBand.title, locale))}</h2>
            <p class="section-text">${escapeHtml(text(data.home.ctaBand.body, locale))}</p>
          </div>
          <div class="card-stack">
            <span class="badge">${escapeHtml(text(data.site.responseTime, locale))}</span>
            <div class="button-row">
              ${button(pathFor(locale, "contact"), text(data.globals.contactNow, locale), "button-accent button")}
              ${button(pathFor(locale, "process"), text(data.globals.readProcess, locale), "button-ghost")}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
};

const renderAbout = (locale) => `
  <div class="shell">
    <section class="hero-card reveal">
      <div class="split-grid">
        <div class="card-stack">
          <span class="eyebrow">${locale === "ar" ? "من نحن" : "About POPWAM"}</span>
          <h1 class="hero-title">${escapeHtml(text(data.about.hero.title, locale))}</h1>
          <p class="hero-text">${escapeHtml(text(data.about.hero.body, locale))}</p>
        </div>
        <aside class="panel">
          <div class="card-stack">
            <h2 class="mini-title">${escapeHtml(text(data.about.story.title, locale))}</h2>
            <p class="card-text">${escapeHtml(text(data.about.story.body, locale))}</p>
            <div class="chip-row">${data.about.stack.items.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section-block">
      ${renderSectionHead(null, { ar: "مبادئ العمل", en: "Working principles" }, null, locale)}
      <div class="card-grid">
        ${data.about.principles.map((item) => renderPrincipleCard(item, locale)).join("")}
      </div>
    </section>

    <section class="section-block">
      <div class="split-grid">
        <article class="list-card reveal">
          <div class="card-stack">
            <h2 class="mini-title">${escapeHtml(text(data.about.capabilities.title, locale))}</h2>
            <ul class="bullet-list">
              ${data.about.capabilities.items.map((item) => `<li>${escapeHtml(text(item, locale))}</li>`).join("")}
            </ul>
          </div>
        </article>
        <article class="list-card reveal">
          <div class="card-stack">
            <h2 class="mini-title">${escapeHtml(text(data.about.whyPopwam.title, locale))}</h2>
            <div class="card-list">
              ${data.about.whyPopwam.items
                .map(
                  (item) => `
                    <div>
                      <h3 class="mini-title">${escapeHtml(text(item.title, locale))}</h3>
                      <p class="card-text">${escapeHtml(text(item.body, locale))}</p>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
`;

const renderServices = (locale) => `
  <div class="shell">
    <section class="hero-card reveal">
      <div class="split-grid">
        <div class="card-stack">
          <span class="eyebrow">${locale === "ar" ? "خدمات POPWAM" : "POPWAM services"}</span>
          <h1 class="hero-title">${escapeHtml(text(data.servicesPage.hero.title, locale))}</h1>
          <p class="hero-text">${escapeHtml(text(data.servicesPage.hero.body, locale))}</p>
        </div>
        <aside class="panel">
          <div class="card-stack">
            <h2 class="mini-title">${escapeHtml(text(data.servicesPage.engagement.title, locale))}</h2>
            <div class="card-list">
              ${data.servicesPage.engagement.items
                .map(
                  (item) => `
                    <div>
                      <h3 class="mini-title">${escapeHtml(text(item.title, locale))}</h3>
                      <p class="card-text">${escapeHtml(text(item.body, locale))}</p>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section-block">
      ${renderSectionHead(null, { ar: "كل الخدمات", en: "Full service line" }, null, locale)}
      <p class="pricing-note reveal">${
        locale === "ar"
          ? "الأسعار التالية متوسطات إرشادية بالجنيه المصري، وتتغير حسب نطاق العمل والتكاملات والمحتوى المطلوب."
          : "The prices below are indicative average budgets in EGP and vary by scope, integrations, and content needs."
      }</p>
      <div class="service-grid">
        ${data.services.map((service) => renderServiceCard(service, locale)).join("")}
      </div>
    </section>
  </div>
`;

const renderPortfolio = (locale, title, body) => `
  <div class="shell">
    <section class="hero-card reveal">
      <div class="split-grid">
        <div class="card-stack">
          <span class="eyebrow">${locale === "ar" ? "مكتبة الأعمال" : "Work library"}</span>
          <h1 class="hero-title">${escapeHtml(title)}</h1>
          <p class="hero-text">${escapeHtml(body)}</p>
        </div>
        <aside class="panel">
          <div class="card-stack">
            <h2 class="mini-title">${locale === "ar" ? "فلترة حسب القطاع" : "Filter by sector"}</h2>
            <p class="card-text">${
              locale === "ar"
                ? "كل مشروع هنا له صفحة Case Study مستقلة وزر Demo وخدمات مستخدمة."
                : "Every item here has its own case study page, demo button, and service mix."
            }</p>
            <div class="chip-row">
              <span class="chip">${data.projects.length} ${locale === "ar" ? "مشروعًا" : "projects"}</span>
              <span class="chip">${data.services.length} ${locale === "ar" ? "خدمات" : "services"}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section-block">
      <div class="filter-wrap reveal">
        <div class="filter-row">
          <button class="filter-button is-active" type="button" data-filter="all">${escapeHtml(text(data.globals.allFilter, locale))}</button>
          ${data.sectors
            .map(
              (sector) => `
                <button class="filter-button" type="button" data-filter="${escapeHtml(sector.key)}">
                  ${escapeHtml(text(sector.label, locale))}
                </button>
              `
            )
            .join("")}
        </div>
        <div class="filter-status" data-result-count></div>
      </div>
      <div class="project-grid">
        ${data.projects.map((project) => renderProjectCard(project, locale)).join("")}
      </div>
      <div class="empty-state" data-empty-state hidden></div>
    </section>
  </div>
`;

const renderProcess = (locale) => `
  <div class="shell">
    <section class="hero-card reveal">
      <div class="split-grid">
        <div class="card-stack">
          <span class="eyebrow">${locale === "ar" ? "آلية POPWAM" : "POPWAM process"}</span>
          <h1 class="hero-title">${escapeHtml(text(data.processPage.hero.title, locale))}</h1>
          <p class="hero-text">${escapeHtml(text(data.processPage.hero.body, locale))}</p>
        </div>
        <aside class="panel">
          <div class="card-stack">
            <h2 class="mini-title">${escapeHtml(text(data.processPage.promise.title, locale))}</h2>
            <ul class="bullet-list">
              ${data.processPage.promise.items.map((item) => `<li>${escapeHtml(text(item, locale))}</li>`).join("")}
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <section class="section-block">
      ${renderSectionHead(null, { ar: "المراحل الست", en: "Six working phases" }, null, locale)}
      <div class="timeline-grid">
        ${data.processSteps.map((step) => renderTimelineCard(step, locale)).join("")}
      </div>
    </section>
  </div>
`;

const renderContact = (locale) => {
  const serviceOptions = data.services
    .map((service) => `<option value="${escapeHtml(text(service.title, locale))}">${escapeHtml(text(service.title, locale))}</option>`)
    .join("");

  return `
    <div class="shell">
      <section class="hero-card reveal">
        <span class="eyebrow">${locale === "ar" ? "تواصل مباشر" : "Direct contact"}</span>
        <h1 class="hero-title">${escapeHtml(text(data.contactPage.hero.title, locale))}</h1>
        <p class="hero-text">${escapeHtml(text(data.contactPage.hero.body, locale))}</p>
      </section>

      <section class="section-block">
        <div class="contact-grid">
          <div class="card-stack">
            ${data.contactPage.contactCards.map((item) => renderContactCard(item, locale)).join("")}
            <div class="faq-grid">
              ${data.contactPage.faq
                .map(
                  (item) => `
                    <details class="faq-item reveal">
                      <summary>${escapeHtml(text(item.q, locale))}</summary>
                      <p>${escapeHtml(text(item.a, locale))}</p>
                    </details>
                  `
                )
                .join("")}
            </div>
          </div>

          <form class="contact-form reveal" data-brief-form data-wa-number="${escapeHtml(data.site.phoneDigits)}">
            <div class="card-stack">
              <h2 class="mini-title">${locale === "ar" ? "أرسل Brief سريع" : "Send a quick brief"}</h2>
              <p class="card-text">${escapeHtml(text(data.contactPage.form.helper, locale))}</p>
            </div>
            <div class="input-grid">
              <div class="field">
                <label for="name">${escapeHtml(text(data.contactPage.form.name, locale))}</label>
                <input id="name" name="name" type="text" required>
              </div>
              <div class="field">
                <label for="company">${escapeHtml(text(data.contactPage.form.company, locale))}</label>
                <input id="company" name="company" type="text">
              </div>
              <div class="field">
                <label for="email">${escapeHtml(text(data.contactPage.form.email, locale))}</label>
                <input id="email" name="email" type="email">
              </div>
              <div class="field">
                <label for="service">${escapeHtml(text(data.contactPage.form.service, locale))}</label>
                <select id="service" name="service">
                  <option value=""></option>
                  ${serviceOptions}
                </select>
              </div>
              <div class="field full">
                <label for="timeline">${escapeHtml(text(data.contactPage.form.timeline, locale))}</label>
                <input id="timeline" name="timeline" type="text">
              </div>
              <div class="field full">
                <label for="details">${escapeHtml(text(data.contactPage.form.details, locale))}</label>
                <textarea id="details" name="details" required></textarea>
              </div>
            </div>
            <button class="button-accent button" type="submit">${escapeHtml(text(data.contactPage.form.submit, locale))}</button>
            <div class="helper-links">
              <a href="mailto:${escapeHtml(data.site.email)}">${escapeHtml(data.site.email)}</a>
              <a href="tel:+${escapeHtml(data.site.phoneDigits)}">${escapeHtml(data.site.phone)}</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  `;
};

const renderCaseStudy = (project, locale) => {
  const sector = sectorMap.get(project.sector);
  const related = data.projects.filter((item) => item.sector === project.sector && item.slug !== project.slug).slice(0, 3);

  return `
    <div class="shell">
      <section class="hero-card reveal">
        <div class="breadcrumbs">
          <a href="${pathFor(locale)}">${escapeHtml(text(data.globals.breadcrumbHome, locale))}</a>
          <span>/</span>
          <a href="${pathFor(locale, "portfolio")}">${escapeHtml(text(data.globals.breadcrumbPortfolio, locale))}</a>
          <span>/</span>
          <span>${escapeHtml(text(project.title, locale))}</span>
        </div>
        <div class="case-study-grid">
          <div class="card-stack">
            <span class="eyebrow">${escapeHtml(text(sector.label, locale))}</span>
            <h1 class="case-title">${escapeHtml(text(project.title, locale))}</h1>
            <p class="case-summary">${escapeHtml(text(project.summary, locale))}</p>
            <div class="case-actions">
              ${button(demoPathFor(project), text(data.globals.liveDemo, locale), "button-accent button")}
              ${button(pathFor(locale, "portfolio"), text(data.globals.backToPortfolio, locale), "button-ghost")}
            </div>
          </div>
          <aside class="panel">
            <div class="card-stack">
              <span class="badge">${escapeHtml(text(project.client, locale))}</span>
              <div class="stat-strip">
                ${renderStatCards(project.metrics, locale)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="section-block">
        <div class="detail-grid">
          <article class="detail-card reveal">
            <div class="card-stack">
              <h2 class="mini-title">${locale === "ar" ? "التحدي" : "Challenge"}</h2>
              <p class="card-text">${escapeHtml(text(project.challenge, locale))}</p>
            </div>
          </article>
          <article class="detail-card reveal">
            <div class="card-stack">
              <h2 class="mini-title">${locale === "ar" ? "الحل" : "Solution"}</h2>
              <p class="card-text">${escapeHtml(text(project.solution, locale))}</p>
            </div>
          </article>
          <article class="detail-card reveal">
            <div class="card-stack">
              <h2 class="mini-title">${locale === "ar" ? "خدمات مستخدمة" : "Services used"}</h2>
              <div class="chip-row">${renderServicePills(project.services, locale)}</div>
              <div class="chip-row">${renderStackPills(project.stack)}</div>
            </div>
          </article>
        </div>
      </section>

      <section class="section-block">
        <div class="split-grid">
          <article class="list-card reveal">
            <div class="card-stack">
              <h2 class="mini-title">${locale === "ar" ? "النتيجة" : "Outcome"}</h2>
              <ul class="bullet-list">
                ${project.impact.map((item) => `<li>${escapeHtml(text(item, locale))}</li>`).join("")}
              </ul>
            </div>
          </article>
          <article class="list-card reveal">
            <div class="card-stack">
              <h2 class="mini-title">${locale === "ar" ? "ماذا يمكن البناء عليه لاحقًا" : "What this makes possible next"}</h2>
              <ul class="bullet-list">
                <li>${locale === "ar" ? "إطلاق حملات أو مسارات بيع حسب القطاع." : "Launch focused campaigns or sales flows by sector."}</li>
                <li>${locale === "ar" ? "إضافة CRM أو طبقة عضوية أو تطبيق موبايل لاحقًا." : "Add CRM, membership, or a mobile layer later."}</li>
                <li>${locale === "ar" ? "استخدام دراسة الحالة في العروض التجارية والمبيعات." : "Reuse the case study in proposals and sales conversations."}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section class="section-block">
        ${renderSectionHead(null, { ar: "مشاريع مشابهة", en: "Related projects" }, null, locale)}
        <div class="related-grid">
          ${related.map((item) => renderProjectCard(item, locale)).join("")}
        </div>
      </section>
    </div>
  `;
};

const demoCss = String.raw`
:root {
  --bg: #f4f6ef;
  --ink: #101217;
  --muted: #626b7a;
  --soft: #87909f;
  --surface: #ffffff;
  --surface-2: #eef1e7;
  --dark: #11141b;
  --dark-2: #1b202a;
  --line: rgba(16, 18, 23, 0.1);
  --line-strong: rgba(16, 18, 23, 0.18);
  --accent: #d8ff63;
  --accent-2: #57d3c7;
  --accent-3: #ffb84d;
  --shadow: 0 18px 36px rgba(16, 18, 23, 0.08);
  --container: min(1120px, calc(100vw - 32px));
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: linear-gradient(180deg, #ffffff 0%, var(--bg) 48%, #e9ede1 100%);
  color: var(--ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.55;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-user-select: none;
  user-select: none;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

input,
textarea,
select {
  -webkit-user-select: text;
  user-select: text;
}

button {
  border: 0;
  cursor: pointer;
}

img,
svg {
  display: block;
  max-width: 100%;
  -webkit-user-drag: none;
  user-drag: none;
}

.shell {
  width: var(--container);
  margin: 0 auto;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(16, 18, 23, 0.06);
  background: rgba(244, 246, 239, 0.9);
  backdrop-filter: blur(16px);
}

.topbar-inner {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.brand,
.nav-actions,
.inline-actions,
.chip-row,
.metric-toolbar,
.filter-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.brand {
  min-width: 0;
  font-weight: 900;
}

.brand img {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.brand span {
  white-space: nowrap;
}

.nav-actions {
  justify-content: flex-end;
}

.nav-link,
.button,
.button-secondary,
.filter-button,
.metric-button {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  padding: 0 15px;
  font-weight: 850;
}

.nav-link,
.button-secondary,
.filter-button,
.metric-button {
  background: rgba(16, 18, 23, 0.06);
  color: var(--ink);
}

.button {
  background: var(--dark);
  color: #fff;
  box-shadow: 0 14px 24px rgba(16, 18, 23, 0.16);
}

.button-accent {
  background: var(--accent);
  color: var(--dark);
}

.filter-button,
.metric-button {
  border: 1px solid transparent;
}

.filter-button.is-active,
.metric-button.is-active {
  background: var(--dark);
  color: #fff;
}

.hero {
  display: grid;
  gap: 24px;
  padding: 34px 0 18px;
  align-items: center;
}

.eyebrow,
.tag,
.status-pill {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 8px 11px;
  background: rgba(16, 18, 23, 0.07);
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 850;
}

.hero h1,
.section-title,
.card-title {
  margin: 0;
  letter-spacing: 0;
  line-height: 1.05;
}

.hero h1 {
  max-width: 13ch;
  font-size: clamp(2.35rem, 10vw, 5.1rem);
}

.hero p,
.section-copy,
.card-copy,
.muted {
  margin: 0;
  color: var(--muted);
}

.hero p {
  max-width: 68ch;
  font-size: 1.02rem;
}

.hero-copy,
.section-head,
.stack {
  display: grid;
  gap: 14px;
}

.product-frame,
.card,
.metric-card,
.demo-card,
.form-panel,
.workflow-panel,
.demo-index-card {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow);
}

.product-frame {
  overflow: hidden;
  background: var(--dark);
  color: #fff;
}

.frame-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  background: var(--dark-2);
}

.window-dots {
  display: inline-flex;
  gap: 6px;
}

.window-dots span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent);
}

.window-dots span:nth-child(2) {
  background: var(--accent-2);
}

.window-dots span:nth-child(3) {
  background: var(--accent-3);
}

.frame-content {
  padding: 18px;
  display: grid;
  gap: 16px;
}

.screen-grid {
  display: grid;
  gap: 12px;
}

.screen-panel {
  min-height: 98px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.06);
}

.screen-panel strong {
  display: block;
  margin-bottom: 8px;
}

.screen-panel p,
.screen-panel span {
  color: rgba(255, 255, 255, 0.72);
}

.screen-bars {
  display: grid;
  gap: 8px;
}

.screen-bars span {
  height: 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
}

.screen-bars span:nth-child(1) {
  width: 88%;
}

.screen-bars span:nth-child(2) {
  width: 64%;
}

.screen-bars span:nth-child(3) {
  width: 74%;
}

.visual-stage {
  display: grid;
  gap: 16px;
}

.visual-note {
  max-width: 68ch;
  color: var(--muted);
  font-weight: 720;
}

.interface-mockup {
  min-height: min(820px, calc(100vh - 118px));
  overflow: hidden;
  border: 1px solid rgba(16, 18, 23, 0.1);
  border-radius: 8px;
  background: #fff;
  box-shadow: var(--shadow);
}

.mockup-chrome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 46px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--line);
  background: #f8faf4;
}

.mockup-address {
  min-width: 0;
  flex: 1;
  height: 28px;
  border-radius: 999px;
  background: rgba(16, 18, 23, 0.07);
}

.mockup-canvas {
  padding: 18px;
}

.mockup-grid {
  display: grid;
  gap: 14px;
}

.mockup-sidebar-layout {
  display: grid;
  gap: 14px;
}

.mockup-sidebar {
  display: grid;
  align-content: start;
  gap: 10px;
  border-radius: 8px;
  padding: 14px;
  background: var(--dark);
  color: #fff;
}

.mockup-sidebar .mockup-line {
  background: rgba(255, 255, 255, 0.2);
}

.mockup-main {
  display: grid;
  gap: 14px;
}

.mockup-hero-panel,
.mockup-card,
.mockup-table,
.mockup-console {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
}

.mockup-hero-panel {
  min-height: 280px;
  display: grid;
  align-content: center;
  gap: 14px;
  padding: 22px;
  background:
    linear-gradient(135deg, rgba(216, 255, 99, 0.28), rgba(87, 211, 199, 0.16)),
    #fff;
}

.mockup-title {
  width: min(340px, 76%);
  height: 28px;
  border-radius: 999px;
  background: var(--dark);
}

.mockup-subtitle {
  width: min(440px, 92%);
  height: 12px;
  border-radius: 999px;
  background: rgba(16, 18, 23, 0.16);
}

.mockup-line {
  display: block;
  height: 10px;
  border-radius: 999px;
  background: rgba(16, 18, 23, 0.12);
}

.mockup-line.short {
  width: 52%;
}

.mockup-line.medium {
  width: 72%;
}

.mockup-line.long {
  width: 90%;
}

.mockup-button {
  width: 132px;
  height: 38px;
  border-radius: 999px;
  background: var(--accent);
}

.mockup-card {
  display: grid;
  gap: 10px;
  min-height: 108px;
  padding: 14px;
}

.mockup-card.dark {
  background: var(--dark);
}

.mockup-card.dark .mockup-line {
  background: rgba(255, 255, 255, 0.18);
}

.mockup-stat {
  display: grid;
  gap: 8px;
  border-radius: 8px;
  padding: 14px;
  background: rgba(16, 18, 23, 0.05);
}

.mockup-stat strong {
  font-size: 1.35rem;
  line-height: 1;
}

.mockup-chart {
  min-height: 220px;
  display: flex;
  align-items: end;
  gap: 8px;
  border-radius: 8px;
  padding: 12px;
  background: rgba(16, 18, 23, 0.05);
}

.mockup-chart span {
  flex: 1;
  min-height: 28px;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(180deg, var(--accent), var(--accent-2));
}

.mockup-table {
  display: grid;
  gap: 8px;
  padding: 12px;
}

.mockup-table-row {
  display: grid;
  grid-template-columns: 1fr 0.8fr 0.52fr;
  gap: 10px;
  align-items: center;
  min-height: 34px;
  border-bottom: 1px solid rgba(16, 18, 23, 0.06);
}

.mockup-table-row:last-child {
  border-bottom: 0;
}

.mockup-pill {
  height: 22px;
  border-radius: 999px;
  background: rgba(87, 211, 199, 0.22);
}

.mockup-phone-wrap {
  display: grid;
  place-items: center;
  padding: 18px;
  background:
    radial-gradient(circle at top, rgba(216, 255, 99, 0.28), transparent 34%),
    var(--dark);
}

.mockup-phone {
  width: min(310px, 100%);
  min-height: 660px;
  border: 10px solid #07090d;
  border-radius: 34px;
  overflow: hidden;
  background: #f7f9f2;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.26);
}

.phone-screen {
  display: grid;
  gap: 12px;
  padding: 16px;
}

.phone-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phone-avatar {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: var(--dark);
}

.phone-card {
  display: grid;
  gap: 10px;
  border-radius: 8px;
  padding: 14px;
  background: #fff;
  border: 1px solid var(--line);
}

.phone-card.highlight {
  background: var(--accent);
}

.phone-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 6px;
}

.phone-nav span {
  height: 34px;
  border-radius: 12px;
  background: rgba(16, 18, 23, 0.1);
}

.booking-layout {
  display: grid;
  gap: 14px;
}

.mockup-calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 7px;
  padding: 12px;
  border-radius: 8px;
  background: rgba(16, 18, 23, 0.05);
}

.mockup-calendar span {
  aspect-ratio: 1;
  border-radius: 8px;
  background: #fff;
  border: 1px solid var(--line);
}

.mockup-calendar span:nth-child(5n) {
  background: var(--accent);
}

.mockup-console {
  background: #0d1117;
  color: #fff;
  padding: 14px;
}

.console-row {
  display: grid;
  grid-template-columns: 0.85fr 1.2fr 0.55fr;
  gap: 10px;
  align-items: center;
  min-height: 38px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.console-row:last-child {
  border-bottom: 0;
}

.console-chip {
  height: 22px;
  border-radius: 999px;
  background: rgba(216, 255, 99, 0.24);
}

.section {
  padding: 26px 0 0;
}

.section-title {
  font-size: clamp(1.65rem, 5vw, 3rem);
}

.grid,
.metric-grid,
.demo-grid,
.related-grid {
  display: grid;
  gap: 14px;
}

.metric-grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.metric-card,
.card,
.demo-card,
.form-panel,
.workflow-panel,
.demo-index-card {
  padding: 18px;
}

.metric-value {
  display: block;
  font-size: clamp(1.8rem, 8vw, 3.2rem);
  line-height: 1;
  font-weight: 950;
}

.metric-label {
  display: block;
  margin-top: 10px;
  color: var(--muted);
  font-weight: 720;
}

.card-title {
  font-size: 1.16rem;
}

.chip,
.stack-chip {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  border-radius: 999px;
  padding: 0 11px;
  background: rgba(16, 18, 23, 0.06);
  color: var(--ink);
  font-size: 0.84rem;
  font-weight: 780;
}

.stack-chip {
  background: rgba(87, 211, 199, 0.15);
}

.workflow-band {
  display: grid;
  gap: 16px;
  border-radius: 8px;
  padding: 18px;
  background: var(--dark);
  color: #fff;
}

.workflow-band .section-copy,
.workflow-band .muted {
  color: rgba(255, 255, 255, 0.72);
}

.workflow-panel {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: none;
}

.timeline {
  display: grid;
  gap: 12px;
}

.timeline-row {
  display: grid;
  gap: 6px;
  border-left: 3px solid var(--accent);
  padding-left: 12px;
}

.timeline-row span {
  color: rgba(255, 255, 255, 0.7);
}

.card .timeline-row span {
  color: var(--muted);
}

.form-panel form {
  display: grid;
  gap: 12px;
}

.field {
  display: grid;
  gap: 7px;
}

.field label {
  font-size: 0.88rem;
  font-weight: 850;
}

.field input,
.field textarea {
  width: 100%;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  padding: 12px 13px;
  background: #fff;
  color: var(--ink);
}

.field textarea {
  min-height: 112px;
  resize: vertical;
}

.result-box {
  border: 1px solid rgba(87, 211, 199, 0.42);
  border-radius: 8px;
  padding: 13px;
  background: rgba(87, 211, 199, 0.12);
  color: var(--ink);
  font-weight: 760;
}

.demo-index-card {
  display: grid;
  gap: 12px;
}

.demo-index-card[hidden],
.empty-state[hidden],
.result-box[hidden] {
  display: none;
}

.demo-index-card .button-secondary {
  width: fit-content;
}

.footer {
  padding: 34px 0;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  border-top: 1px solid var(--line);
  padding-top: 22px;
}

@media (max-width: 640px) {
  .nav-actions .nav-link {
    display: none;
  }

  .topbar-inner {
    min-height: 64px;
  }

  .hero {
    padding-top: 24px;
  }
}

@media (min-width: 720px) {
  .hero {
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
  }

  .metric-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .grid,
  .demo-grid,
  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .screen-grid {
    grid-template-columns: 1.1fr 0.9fr;
  }

  .mockup-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .mockup-sidebar-layout {
    grid-template-columns: 190px minmax(0, 1fr);
  }

  .booking-layout {
    grid-template-columns: minmax(0, 1fr) minmax(240px, 0.72fr);
  }
}

@media (min-width: 980px) {
  .demo-grid,
  .related-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

body[data-theme="aurora"] {
  --bg: #f4f6ef;
  --ink: #101217;
  --muted: #626b7a;
  --surface: #ffffff;
  --surface-2: #eef1e7;
  --dark: #11141b;
  --dark-2: #1b202a;
  --line: rgba(16, 18, 23, 0.1);
  --line-strong: rgba(16, 18, 23, 0.18);
  --accent: #d8ff63;
  --accent-2: #57d3c7;
  --accent-3: #ffb84d;
}

body[data-theme="studio"] {
  --bg: #f7f1e7;
  --ink: #1b1713;
  --muted: #76685a;
  --surface: #fffaf2;
  --surface-2: #efe3d4;
  --dark: #231b15;
  --dark-2: #3a2b20;
  --line: rgba(35, 27, 21, 0.12);
  --line-strong: rgba(35, 27, 21, 0.22);
  --accent: #ffca62;
  --accent-2: #f06f5b;
  --accent-3: #7cc2a8;
}

body[data-theme="night"] {
  --bg: #0e1118;
  --ink: #f6f8fb;
  --muted: #a5adbd;
  --surface: #171c26;
  --surface-2: #202736;
  --dark: #f4f7fb;
  --dark-2: #dce4f2;
  --line: rgba(255, 255, 255, 0.1);
  --line-strong: rgba(255, 255, 255, 0.18);
  --accent: #7cf7d4;
  --accent-2: #8eb6ff;
  --accent-3: #f0b86b;
}

body[data-theme] {
  background:
    radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 22%, transparent), transparent 34%),
    linear-gradient(180deg, var(--surface) 0%, var(--bg) 56%, var(--surface-2) 100%);
  color: var(--ink);
}

body[data-theme] .topbar {
  background: color-mix(in srgb, var(--surface) 86%, transparent);
}

.control-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(16, 18, 23, 0.06);
}

body[data-theme="night"] .control-group {
  background: rgba(255, 255, 255, 0.08);
}

.control-button {
  min-height: 34px;
  border-radius: 999px;
  padding: 0 11px;
  background: transparent;
  color: var(--ink);
  font-weight: 850;
}

.control-button.is-active {
  background: var(--dark);
  color: var(--surface);
}

.demo-app {
  min-height: calc(100vh - 72px);
  padding: 26px 0 70px;
}

.app-shell {
  width: min(1280px, calc(100vw - 28px));
  margin: 0 auto;
  display: grid;
  gap: 18px;
}

.app-hero {
  display: grid;
  gap: 18px;
  align-items: stretch;
}

.app-panel,
.app-card,
.app-sidebar,
.app-screen,
.app-phone,
.app-console,
.app-form {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  box-shadow: var(--shadow);
}

.app-panel,
.app-card,
.app-sidebar,
.app-screen,
.app-console,
.app-form {
  padding: 18px;
}

.app-title {
  margin: 0;
  font-size: clamp(2rem, 7vw, 4.8rem);
  line-height: 1.02;
  letter-spacing: 0;
}

.app-copy {
  color: var(--muted);
  margin: 0;
}

.app-layout {
  display: grid;
  gap: 14px;
}

.app-sidebar {
  display: grid;
  gap: 10px;
  align-content: start;
}

.side-button,
.tab-button,
.screen-button,
.calendar-day,
.table-filter {
  min-height: 42px;
  border-radius: 8px;
  padding: 0 12px;
  background: rgba(16, 18, 23, 0.06);
  color: var(--ink);
  font-weight: 830;
  text-align: start;
}

body[data-theme="night"] .side-button,
body[data-theme="night"] .tab-button,
body[data-theme="night"] .screen-button,
body[data-theme="night"] .calendar-day,
body[data-theme="night"] .table-filter {
  background: rgba(255, 255, 255, 0.08);
}

.side-button.is-active,
.tab-button.is-active,
.screen-button.is-active,
.calendar-day.is-selected,
.table-filter.is-active {
  background: var(--dark);
  color: var(--surface);
}

.app-grid,
.feature-grid,
.kpi-grid,
.table-grid,
.booking-grid,
.portal-grid {
  display: grid;
  gap: 14px;
}

.kpi-grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.kpi-card {
  display: grid;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  background: rgba(16, 18, 23, 0.05);
  border: 1px solid var(--line);
}

body[data-theme="night"] .kpi-card {
  background: rgba(255, 255, 255, 0.07);
}

.kpi-card strong {
  font-size: clamp(1.8rem, 7vw, 3rem);
  line-height: 1;
}

.progress-track {
  height: 10px;
  border-radius: 999px;
  background: rgba(16, 18, 23, 0.09);
  overflow: hidden;
}

.progress-track span {
  display: block;
  height: 100%;
  width: var(--value, 60%);
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
}

.chart-card {
  min-height: 240px;
  display: flex;
  align-items: end;
  gap: 10px;
  padding: 16px;
  border-radius: 8px;
  background: rgba(16, 18, 23, 0.05);
}

.chart-card span {
  flex: 1;
  min-height: 36px;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(180deg, var(--accent), var(--accent-2));
}

.data-table {
  display: grid;
  gap: 8px;
}

.data-row {
  display: grid;
  grid-template-columns: 1fr 0.7fr 0.45fr;
  gap: 10px;
  align-items: center;
  min-height: 46px;
  padding: 8px 0;
  border-bottom: 1px solid var(--line);
}

.data-row[hidden] {
  display: none;
}

.status {
  width: fit-content;
  border-radius: 999px;
  padding: 5px 9px;
  background: color-mix(in srgb, var(--accent) 24%, transparent);
  font-size: 0.8rem;
  font-weight: 850;
}

.site-preview {
  overflow: hidden;
}

.preview-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  border-bottom: 1px solid var(--line);
}

.preview-hero {
  min-height: 360px;
  display: grid;
  gap: 16px;
  align-content: center;
  padding: 24px;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 36%, transparent), color-mix(in srgb, var(--accent-2) 18%, transparent)),
    var(--surface);
}

.preview-section {
  padding: 18px;
}

.interactive-card {
  display: grid;
  gap: 10px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: rgba(16, 18, 23, 0.04);
}

body[data-theme="night"] .interactive-card {
  background: rgba(255, 255, 255, 0.06);
}

.demo-input,
.demo-select,
.demo-textarea {
  width: 100%;
  min-height: 44px;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  padding: 10px 12px;
}

.demo-textarea {
  min-height: 110px;
  resize: vertical;
}

.form-result,
.screen-result {
  border-radius: 8px;
  padding: 12px;
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  color: var(--ink);
  font-weight: 780;
}

.form-result[hidden],
.screen-result[hidden],
.app-view[hidden],
.phone-view[hidden],
.portal-view[hidden] {
  display: none;
}

.phone-stage {
  display: grid;
  place-items: center;
  padding: 20px;
  border-radius: 8px;
  background: var(--dark);
}

.app-phone {
  width: min(360px, 100%);
  min-height: 680px;
  border: 10px solid #06080d;
  border-radius: 34px;
  overflow: hidden;
  background: var(--surface);
}

.phone-content {
  display: grid;
  gap: 14px;
  padding: 18px;
}

.phone-topline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px;
}

.calendar-day {
  aspect-ratio: 1;
  min-height: 0;
  padding: 0;
  text-align: center;
}

.app-console {
  background: #0d1117;
  color: #fff;
}

.console-line {
  display: grid;
  grid-template-columns: 0.7fr 1.1fr 0.45fr;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.console-line:last-child {
  border-bottom: 0;
}

.console-line .status {
  color: #11141b;
}

html[dir="rtl"] .timeline-row {
  border-left: 0;
  border-right: 3px solid var(--accent);
  padding-left: 0;
  padding-right: 12px;
}

@media (min-width: 720px) {
  .app-hero {
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  }

  .app-layout {
    grid-template-columns: 220px minmax(0, 1fr);
  }

  .feature-grid,
  .portal-grid,
  .booking-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .kpi-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 980px) {
  .feature-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.real-demo {
  min-height: calc(100vh - 72px);
  padding: 18px 0 72px;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--surface) 80%, transparent), transparent 28%),
    var(--bg);
}

.real-shell {
  width: min(1240px, calc(100vw - 28px));
  margin: 0 auto;
  display: grid;
  gap: 18px;
}

.real-hero {
  min-height: min(760px, calc(100vh - 108px));
  display: grid;
  gap: 18px;
  align-items: stretch;
}

.real-panel,
.real-card,
.property-card,
.crm-panel,
.crm-card,
.lead-card,
.schedule-card {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  box-shadow: var(--shadow);
}

.real-panel,
.real-card,
.crm-panel,
.crm-card,
.lead-card,
.schedule-card {
  padding: 18px;
}

.real-title {
  margin: 0;
  max-width: 11ch;
  font-size: clamp(2.5rem, 9vw, 6.4rem);
  line-height: 0.98;
  letter-spacing: 0;
}

.real-copy {
  margin: 0;
  max-width: 68ch;
  color: var(--muted);
}

.real-menu,
.estate-toolbar,
.unit-meta,
.crm-toolbar,
.crm-stage-head,
.lead-meta,
.task-line,
.contact-line {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.real-menu {
  justify-content: space-between;
}

.real-menu strong {
  font-size: 1.05rem;
}

.real-menu nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.real-link {
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0 13px;
  background: rgba(16, 18, 23, 0.06);
  color: var(--ink);
  font-weight: 820;
}

body[data-theme="night"] .real-link {
  background: rgba(255, 255, 255, 0.08);
}

.estate-hero-card {
  display: grid;
  gap: 18px;
  align-content: space-between;
  min-height: 100%;
  padding: clamp(20px, 4vw, 34px);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 28%, transparent), transparent 45%),
    color-mix(in srgb, var(--surface) 94%, transparent);
}

.estate-visual {
  min-height: 460px;
  display: grid;
  align-content: end;
  overflow: hidden;
  padding: 18px;
  background:
    linear-gradient(180deg, transparent 0 36%, color-mix(in srgb, var(--dark) 74%, transparent) 100%),
    linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 34%, var(--surface)), color-mix(in srgb, var(--accent-3) 28%, var(--bg)));
}

.estate-towers {
  min-height: 320px;
  display: flex;
  align-items: end;
  gap: 12px;
  padding: 0 10px;
}

.estate-towers span {
  flex: 1;
  min-width: 44px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 8px 8px 0 0;
  background:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0 10px, transparent 10px 24px),
    color-mix(in srgb, var(--dark) 74%, var(--accent-2));
}

.estate-towers span:nth-child(1) {
  height: 52%;
}

.estate-towers span:nth-child(2) {
  height: 78%;
}

.estate-towers span:nth-child(3) {
  height: 64%;
}

.estate-towers span:nth-child(4) {
  height: 90%;
}

.estate-caption {
  display: grid;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 88%, transparent);
  color: var(--ink);
}

.search-grid,
.estimate-grid,
.crm-stats,
.unit-grid,
.estate-info-grid,
.pipeline-board,
.lead-list-grid {
  display: grid;
  gap: 12px;
}

.search-grid,
.estimate-grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.estate-field,
.crm-field {
  display: grid;
  gap: 7px;
}

.estate-field span,
.crm-field span {
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 800;
}

.estate-select,
.estate-input,
.crm-input,
.crm-select {
  width: 100%;
  min-height: 46px;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  padding: 10px 12px;
}

.unit-filter {
  min-height: 40px;
  border-radius: 999px;
  padding: 0 14px;
  background: rgba(16, 18, 23, 0.06);
  color: var(--ink);
  font-weight: 830;
}

body[data-theme="night"] .unit-filter {
  background: rgba(255, 255, 255, 0.08);
}

.unit-filter.is-active {
  background: var(--dark);
  color: var(--surface);
}

.property-card {
  overflow: hidden;
  padding: 0;
}

.property-media {
  min-height: 190px;
  display: grid;
  align-content: end;
  padding: 14px;
  background:
    linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.32)),
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 34%, var(--surface)), color-mix(in srgb, var(--accent-2) 30%, var(--bg)));
}

.property-media.dark {
  background:
    linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.42)),
    linear-gradient(135deg, color-mix(in srgb, var(--dark) 72%, var(--accent)), color-mix(in srgb, var(--accent-3) 42%, var(--dark)));
}

.property-body {
  display: grid;
  gap: 12px;
  padding: 16px;
}

.unit-meta {
  justify-content: space-between;
  color: var(--muted);
  font-weight: 760;
}

.floor-plan {
  min-height: 250px;
  display: grid;
  grid-template-columns: 1.1fr 0.8fr;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  background: var(--surface-2);
}

.floor-room {
  min-height: 88px;
  display: grid;
  place-items: center;
  border: 2px solid color-mix(in srgb, var(--dark) 28%, transparent);
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 72%, transparent);
  color: var(--muted);
  font-weight: 820;
}

.floor-room.wide {
  grid-column: span 2;
}

.estimate-result,
.compare-tray,
.lead-detail {
  border-radius: 8px;
  padding: 14px;
  background: color-mix(in srgb, var(--accent) 20%, transparent);
}

.compare-tray {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.crm-workspace {
  grid-template-columns: 1fr;
}

.crm-sidebar {
  display: grid;
  gap: 12px;
  align-content: start;
  background: var(--dark);
  color: var(--surface);
}

.crm-sidebar .side-button {
  color: inherit;
  background: rgba(255, 255, 255, 0.08);
}

.crm-sidebar .side-button.is-active {
  background: var(--accent);
  color: var(--dark);
}

.crm-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.crm-stats {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.crm-stat {
  display: grid;
  gap: 7px;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: rgba(16, 18, 23, 0.04);
}

body[data-theme="night"] .crm-stat {
  background: rgba(255, 255, 255, 0.06);
}

.crm-stat strong {
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  line-height: 1;
}

.pipeline-board {
  align-items: start;
}

.pipeline-stage {
  display: grid;
  gap: 10px;
  min-height: 320px;
  padding: 12px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface-2) 86%, transparent);
}

.crm-stage-head {
  justify-content: space-between;
}

.lead-card {
  display: grid;
  gap: 8px;
  width: 100%;
  color: var(--ink);
  text-align: start;
}

.lead-card.is-active {
  outline: 2px solid var(--accent);
}

.lead-score {
  width: fit-content;
  border-radius: 999px;
  padding: 5px 9px;
  background: color-mix(in srgb, var(--accent-2) 24%, transparent);
  color: var(--ink);
  font-size: 0.82rem;
  font-weight: 850;
}

.crm-view-grid {
  display: grid;
  gap: 14px;
}

.task-line {
  justify-content: space-between;
  min-height: 44px;
  border-bottom: 1px solid var(--line);
}

.task-line:last-child {
  border-bottom: 0;
}

.real-panel .timeline-row span,
.real-card .timeline-row span {
  color: var(--muted);
}

.task-line input {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
}

.lead-detail {
  display: grid;
  gap: 10px;
}

.lead-detail strong {
  font-size: 1.4rem;
}

.contact-line {
  justify-content: space-between;
  color: var(--muted);
}

@media (max-width: 719px) {
  :root {
    --container: min(100vw - 20px, 520px);
  }

  .topbar {
    position: static;
  }

  .topbar-inner {
    min-height: 0;
    align-items: flex-start;
    padding: 10px 0;
  }

  .brand {
    max-width: 46vw;
  }

  .brand span {
    white-space: normal;
    line-height: 1.1;
  }

  .nav-actions {
    width: auto;
    justify-content: flex-end;
    gap: 6px;
  }

  .control-group {
    gap: 3px;
    padding: 4px;
  }

  .control-button {
    min-height: 32px;
    padding: 0 9px;
  }

  .hero,
  .real-demo,
  .demo-app {
    padding-top: 12px;
  }

  .app-shell,
  .real-shell {
    width: min(100vw - 20px, 520px);
    gap: 12px;
  }

  .app-panel,
  .app-card,
  .app-sidebar,
  .app-screen,
  .app-console,
  .app-form,
  .real-panel,
  .real-card,
  .crm-panel,
  .crm-card,
  .property-card,
  .lead-card,
  .schedule-card {
    padding: 14px;
  }

  .real-hero {
    min-height: auto;
  }

  .real-title,
  .app-title {
    max-width: 100%;
    font-size: clamp(2rem, 13vw, 3.25rem);
  }

  .section-title {
    font-size: clamp(1.55rem, 9vw, 2.35rem);
  }

  .inline-actions,
  .real-menu,
  .crm-toolbar,
  .estate-toolbar {
    align-items: stretch;
  }

  .inline-actions > *,
  .real-link,
  .button,
  .button-secondary,
  .unit-filter,
  .screen-button,
  .side-button {
    width: 100%;
  }

  .real-menu nav {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .estate-visual {
    min-height: 330px;
  }

  .estate-towers {
    min-height: 210px;
  }

  .property-media {
    min-height: 150px;
  }

  .floor-plan {
    grid-template-columns: 1fr;
  }

  .floor-room,
  .floor-room.wide {
    grid-column: auto;
    min-height: 64px;
  }

  .crm-sidebar {
    position: sticky;
    top: 0;
    z-index: 8;
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 10px;
  }

  .crm-sidebar .stack {
    min-width: 180px;
  }

  .crm-sidebar .side-button {
    min-width: 140px;
    width: auto;
  }

  .pipeline-board {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(250px, 82vw);
    overflow-x: auto;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
  }

  .pipeline-stage {
    min-height: 260px;
    scroll-snap-align: start;
  }

  .data-row,
  .console-line {
    grid-template-columns: 1fr;
  }

  .contact-line {
    align-items: flex-start;
  }

  .app-phone {
    min-height: 590px;
    border-width: 8px;
  }

  .phone-stage {
    padding: 12px;
  }

  .footer-inner {
    align-items: stretch;
  }
}

@media (min-width: 720px) {
  .search-grid,
  .estimate-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .unit-grid,
  .estate-info-grid,
  .crm-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .pipeline-board {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .crm-view-grid {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 0.42fr);
  }
}

@media (min-width: 980px) {
  .real-hero {
    grid-template-columns: minmax(0, 0.98fr) minmax(430px, 1.02fr);
  }

  .crm-workspace {
    display: grid;
    grid-template-columns: 230px minmax(0, 1fr);
    gap: 14px;
  }
}
`;

const demoJs = `
(function () {
  var yearNodes = document.querySelectorAll("[data-year]");
  yearNodes.forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  var storagePrefix = "popwam_demo_";
  var lang = localStorage.getItem(storagePrefix + "lang") || document.documentElement.lang || "en";
  var theme = localStorage.getItem(storagePrefix + "theme") || document.body.getAttribute("data-theme") || "aurora";

  function setLanguage(nextLang) {
    lang = nextLang === "ar" ? "ar" : "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var value = node.getAttribute("data-" + lang);
      if (value !== null) {
        node.textContent = value;
      }
    });
    document.querySelectorAll("[data-placeholder-en]").forEach(function (node) {
      var value = node.getAttribute("data-placeholder-" + lang);
      if (value !== null) {
        node.setAttribute("placeholder", value);
      }
    });
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-lang") === lang);
    });
    try {
      localStorage.setItem(storagePrefix + "lang", lang);
    } catch (error) {}
    updateFilterCount();
  }

  function setTheme(nextTheme) {
    theme = nextTheme || "aurora";
    document.body.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-theme-option]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-theme-option") === theme);
    });
    try {
      localStorage.setItem(storagePrefix + "theme", theme);
    } catch (error) {}
  }

  document.querySelectorAll("[data-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.getAttribute("data-lang"));
    });
  });

  document.querySelectorAll("[data-theme-option]").forEach(function (button) {
    button.addEventListener("click", function () {
      setTheme(button.getAttribute("data-theme-option"));
    });
  });

  var filterButtons = document.querySelectorAll("[data-sector-filter]");
  var demoCards = document.querySelectorAll("[data-demo-card]");
  var countNode = document.querySelector("[data-filter-count]");
  var emptyState = document.querySelector("[data-empty-state]");
  var currentVisible = demoCards.length;

  function updateFilterCount() {
    if (countNode) {
      countNode.textContent = currentVisible + " " + (lang === "ar" ? "ديمو ظاهر" : "demos shown");
    }
  }

  function applyFilter(value) {
    var visible = 0;

    demoCards.forEach(function (card) {
      var matches = value === "all" || card.getAttribute("data-sector") === value;
      card.hidden = !matches;
      if (matches) {
        visible += 1;
      }
    });

    filterButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-sector-filter") === value);
    });

    if (countNode) {
      currentVisible = visible;
      updateFilterCount();
    }

    if (emptyState) {
      emptyState.hidden = visible > 0;
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyFilter(button.getAttribute("data-sector-filter"));
    });
  });

  if (filterButtons.length && demoCards.length) {
    applyFilter("all");
  }

  document.querySelectorAll("[data-tab-target]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = button.getAttribute("data-tab-target");
      document.querySelectorAll("[data-tab-target]").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      document.querySelectorAll("[data-app-view]").forEach(function (view) {
        view.hidden = view.getAttribute("data-app-view") !== target;
      });
    });
  });

  document.querySelectorAll("[data-phone-target]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = button.getAttribute("data-phone-target");
      document.querySelectorAll("[data-phone-target]").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      document.querySelectorAll("[data-phone-view]").forEach(function (view) {
        view.hidden = view.getAttribute("data-phone-view") !== target;
      });
    });
  });

  document.querySelectorAll("[data-calendar-day]").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-calendar-day]").forEach(function (item) {
        item.classList.toggle("is-selected", item === button);
      });
      document.querySelectorAll("[data-selected-date]").forEach(function (node) {
        node.textContent = button.textContent.trim();
      });
    });
  });

  document.querySelectorAll("[data-table-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-table-filter");
      document.querySelectorAll("[data-table-filter]").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      document.querySelectorAll("[data-row-status]").forEach(function (row) {
        row.hidden = filter !== "all" && row.getAttribute("data-row-status") !== filter;
      });
    });
  });

  document.querySelectorAll("[data-task-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      button.classList.toggle("is-active");
    });
  });

  document.querySelectorAll("[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var result = form.querySelector("[data-form-result]");
      if (!result) {
        return;
      }
      result.hidden = false;
      result.textContent = result.getAttribute("data-result-" + lang) || result.getAttribute("data-result-en") || "Saved.";
    });
  });

  var unitFilters = document.querySelectorAll("[data-unit-filter]");
  var unitCards = document.querySelectorAll("[data-unit-card]");

  unitFilters.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-unit-filter");
      unitFilters.forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      unitCards.forEach(function (card) {
        card.hidden = filter !== "all" && card.getAttribute("data-unit-type") !== filter;
      });
    });
  });

  function updateCompareTray() {
    var selected = document.querySelectorAll("[data-compare-unit].is-active").length;
    document.querySelectorAll("[data-compare-count]").forEach(function (node) {
      node.textContent = selected;
    });
  }

  document.querySelectorAll("[data-compare-unit]").forEach(function (button) {
    button.addEventListener("click", function () {
      button.classList.toggle("is-active");
      updateCompareTray();
    });
  });

  document.querySelectorAll("[data-estimator-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var result = form.querySelector("[data-estimate-result]");
      if (!result) {
        return;
      }
      var budget = Number(form.querySelector("[name='budget']").value || 0);
      var downPayment = Number(form.querySelector("[name='downPayment']").value || 0);
      var remaining = Math.max(budget - downPayment, 0);
      var monthly = Math.max(Math.round(remaining / 84), 0);
      result.hidden = false;
      result.textContent = lang === "ar"
        ? "تقدير القسط الشهري: " + monthly.toLocaleString("ar-EG") + " جنيه على 7 سنوات."
        : "Estimated monthly payment: EGP " + monthly.toLocaleString("en-US") + " over 7 years.";
    });
  });

  document.querySelectorAll("[data-lead-card]").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-lead-card]").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      document.querySelectorAll("[data-lead-name]").forEach(function (node) {
        node.textContent = button.getAttribute("data-name") || "";
      });
      document.querySelectorAll("[data-lead-project]").forEach(function (node) {
        node.textContent = button.getAttribute("data-project") || "";
      });
      document.querySelectorAll("[data-lead-source]").forEach(function (node) {
        node.textContent = button.getAttribute("data-source") || "";
      });
      document.querySelectorAll("[data-lead-next]").forEach(function (node) {
        node.textContent = button.getAttribute("data-next") || "";
      });
    });
  });

  document.querySelectorAll("[data-copy-link]").forEach(function (button) {
    button.addEventListener("click", function () {
      var url = window.location.href;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          button.textContent = "Link copied";
        });
      } else {
        button.textContent = url;
      }
    });
  });

  function isEditableTarget(target) {
    return Boolean(target && target.closest && target.closest("input, textarea, select, [contenteditable='true']"));
  }

  ["copy", "cut", "contextmenu", "selectstart", "dragstart"].forEach(function (eventName) {
    document.addEventListener(eventName, function (event) {
      if (!isEditableTarget(event.target)) {
        event.preventDefault();
      }
    });
  });

  setTheme(theme);
  setLanguage(lang);
})();
`;

const renderDemoChips = (items, className = "chip") =>
  items.map((item) => `<span class="${className}">${escapeHtml(item)}</span>`).join("");

const renderDemoMetricCards = (project) =>
  project.metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <span class="metric-value">${escapeHtml(metric.value)}</span>
          ${i18nText(metric.label, "span", "metric-label")}
        </article>
      `
    )
    .join("");

const uiText = {
  interactiveDemo: { en: "Interactive demo", ar: "ديمو تفاعلي" },
  openExperience: { en: "Open the experience", ar: "افتح التجربة" },
  mainSite: { en: "Main site", ar: "الموقع الرئيسي" },
  copyLink: { en: "Copy link", ar: "نسخ الرابط" },
  theme: { en: "Theme", ar: "الثيم" },
  language: { en: "Language", ar: "اللغة" },
  overview: { en: "Overview", ar: "نظرة عامة" },
  pipeline: { en: "Pipeline", ar: "المسار" },
  reports: { en: "Reports", ar: "التقارير" },
  lead: { en: "Lead", ar: "عميل محتمل" },
  active: { en: "Active", ar: "نشط" },
  done: { en: "Done", ar: "تم" },
  pending: { en: "Pending", ar: "قيد المتابعة" },
  all: { en: "All", ar: "الكل" },
  today: { en: "Today", ar: "اليوم" },
  submit: { en: "Submit request", ar: "إرسال الطلب" },
  saved: { en: "Request captured. The interface updated the sample workflow.", ar: "تم تسجيل الطلب وتحديث مسار التجربة." },
  selectedDate: { en: "Selected date", ar: "الموعد المختار" },
  content: { en: "Content", ar: "المحتوى" },
  members: { en: "Members", ar: "الأعضاء" },
  files: { en: "Files", ar: "الملفات" },
  records: { en: "Records", ar: "السجلات" },
  verified: { en: "Verified", ar: "موثق" },
  warning: { en: "Needs review", ar: "يحتاج مراجعة" },
  mobileHome: { en: "Home", ar: "الرئيسية" },
  mobileBooking: { en: "Booking", ar: "الحجز" },
  mobileMessages: { en: "Messages", ar: "الرسائل" },
};

const i18nText = (value, tag = "span", className = "", attrs = "") => {
  const en = escapeHtml(text(value, "en"));
  const ar = escapeHtml(text(value, "ar") || text(value, "en"));
  const classAttr = className ? ` class="${className}"` : "";
  const attrsText = attrs ? ` ${attrs}` : "";
  return `<${tag}${classAttr}${attrsText} data-i18n data-en="${en}" data-ar="${ar}">${en}</${tag}>`;
};

const i18nLabel = (key, tag = "span", className = "", attrs = "") =>
  i18nText(uiText[key], tag, className, attrs);

const i18nPlain = (key) => i18nText(uiText[key]);

const localizedAttr = (value) =>
  `data-en="${escapeHtml(text(value, "en"))}" data-ar="${escapeHtml(text(value, "ar") || text(value, "en"))}"`;

const demoFormResultAttrs = () =>
  `data-result-en="${escapeHtml(uiText.saved.en)}" data-result-ar="${escapeHtml(uiText.saved.ar)}"`;

const renderBilingualChips = (items, className = "chip") =>
  items.map((item) => i18nText(item, "span", className)).join("");

const placeholderAttrs = (en, ar) =>
  `placeholder="${escapeHtml(en)}" data-placeholder-en="${escapeHtml(en)}" data-placeholder-ar="${escapeHtml(ar)}"`;

const renderInteractiveKpis = (project) => `
  <div class="kpi-grid">
    ${project.metrics
      .map(
        (metric, index) => `
          <article class="kpi-card">
            <strong>${escapeHtml(metric.value)}</strong>
            ${i18nText(metric.label, "span", "app-copy")}
            <span class="progress-track"><span style="--value: ${55 + index * 14}%;"></span></span>
          </article>
        `
      )
      .join("")}
  </div>
`;

const renderInteractiveFeatures = (items) => `
  <div class="feature-grid">
    ${items
      .map(
        (item, index) => `
          <article class="interactive-card">
            <span class="tag">0${index + 1}</span>
            ${i18nText(item, "p", "app-copy")}
          </article>
        `
      )
      .join("")}
  </div>
`;

const renderWebsiteExperience = (project, services) => `
  <section class="site-preview app-screen">
    <div class="preview-nav">
      ${i18nText(project.client, "strong")}
      <div class="inline-actions">
        ${renderBilingualChips(services.slice(0, 2))}
      </div>
    </div>
    <div class="preview-hero">
      ${i18nText(project.title, "h2", "section-title")}
      ${i18nText(project.summary, "p", "app-copy")}
      <div class="inline-actions">
        <button class="button button-accent" type="button" data-task-toggle>${i18nPlain("active")}</button>
        <a class="button-secondary" href="#demo-form">${i18nPlain("submit")}</a>
      </div>
    </div>
    <div class="preview-section">
      ${renderInteractiveKpis(project)}
    </div>
    <div class="preview-section">
      ${renderInteractiveFeatures(project.impact)}
    </div>
    <div class="preview-section booking-grid">
      <article class="app-form" id="demo-form">
        <div class="stack">
          <span class="tag">${i18nPlain("lead")}</span>
          ${i18nText({ en: "Send a quick request", ar: "أرسل طلب سريع" }, "h3", "card-title")}
          <form class="stack" data-demo-form>
            <input class="demo-input" type="text" ${placeholderAttrs("Name", "الاسم")} required>
            <textarea class="demo-textarea" ${placeholderAttrs("Project details", "تفاصيل المشروع")} required></textarea>
            <button class="button" type="submit">${i18nPlain("submit")}</button>
            <div class="form-result" ${demoFormResultAttrs()} data-form-result hidden></div>
          </form>
        </div>
      </article>
      <article class="app-card stack">
        <span class="tag">FAQ</span>
        <details open>
          <summary>${i18nText(project.challenge)}</summary>
          ${i18nText(project.solution, "p", "app-copy")}
        </details>
        <details>
          <summary>${i18nText(services[0] || { en: "Service", ar: "خدمة" })}</summary>
          ${i18nText(project.impact[0], "p", "app-copy")}
        </details>
      </article>
    </div>
  </section>
`;

const renderDashboardExperience = (project) => `
  <section class="app-layout">
    <aside class="app-sidebar">
      <button class="side-button is-active" type="button" data-tab-target="overview">${i18nPlain("overview")}</button>
      <button class="side-button" type="button" data-tab-target="pipeline">${i18nPlain("pipeline")}</button>
      <button class="side-button" type="button" data-tab-target="reports">${i18nPlain("reports")}</button>
    </aside>
    <div class="app-panel">
      <div class="app-view stack" data-app-view="overview">
        ${renderInteractiveKpis(project)}
        <div class="chart-card">
          <span style="height: 48%;"></span><span style="height: 72%;"></span><span style="height: 58%;"></span><span style="height: 86%;"></span><span style="height: 67%;"></span><span style="height: 92%;"></span>
        </div>
      </div>
      <div class="app-view stack" data-app-view="pipeline" hidden>
        <div class="inline-actions">
          <button class="table-filter is-active" type="button" data-table-filter="all">${i18nPlain("all")}</button>
          <button class="table-filter" type="button" data-table-filter="active">${i18nPlain("active")}</button>
          <button class="table-filter" type="button" data-table-filter="pending">${i18nPlain("pending")}</button>
        </div>
        <div class="data-table">
          ${project.impact
            .map(
              (item, index) => `
                <div class="data-row" data-row-status="${index === 1 ? "pending" : "active"}">
                  ${i18nText(item, "span")}
                  <span>${escapeHtml(project.stack[index % project.stack.length] || "System")}</span>
                  <span class="status">${index === 1 ? i18nPlain("pending") : i18nPlain("active")}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="app-view stack" data-app-view="reports" hidden>
        <article class="app-card stack">
          ${i18nText(project.challenge, "h3", "card-title")}
          ${i18nText(project.solution, "p", "app-copy")}
        </article>
        ${renderInteractiveFeatures(project.impact)}
      </div>
    </div>
  </section>
`;

const renderMobileExperience = (project) => `
  <section class="phone-stage">
    <div class="app-phone">
      <div class="phone-content">
        <div class="phone-topline">
          ${i18nText(project.title, "strong")}
          <span class="status">${escapeHtml(project.stack[0] || "App")}</span>
        </div>
        <div class="inline-actions">
          <button class="screen-button is-active" type="button" data-phone-target="home">${i18nPlain("mobileHome")}</button>
          <button class="screen-button" type="button" data-phone-target="booking">${i18nPlain("mobileBooking")}</button>
          <button class="screen-button" type="button" data-phone-target="messages">${i18nPlain("mobileMessages")}</button>
        </div>
        <div class="phone-view stack" data-phone-view="home">
          <article class="interactive-card">${i18nText(project.summary, "p", "app-copy")}</article>
          ${renderInteractiveKpis(project)}
        </div>
        <div class="phone-view stack" data-phone-view="booking" hidden>
          ${renderBookingTools(project)}
        </div>
        <div class="phone-view stack" data-phone-view="messages" hidden>
          ${renderInteractiveFeatures(project.impact)}
        </div>
      </div>
    </div>
  </section>
`;

const renderBookingTools = (project) => `
  <div class="calendar-grid">
    ${Array.from({ length: 21 }, (_, index) => `<button class="calendar-day${index === 4 ? " is-selected" : ""}" type="button" data-calendar-day>${index + 1}</button>`).join("")}
  </div>
  <article class="interactive-card">
    <strong>${i18nPlain("selectedDate")}: <span data-selected-date>5</span></strong>
    ${i18nText(project.solution, "p", "app-copy")}
  </article>
`;

const renderBookingExperience = (project, services) => `
  <section class="booking-grid">
    <article class="app-panel stack">
      ${i18nText(project.title, "h2", "section-title")}
      ${i18nText(project.summary, "p", "app-copy")}
      ${renderBookingTools(project)}
    </article>
    <article class="app-form stack">
      <span class="tag">${i18nPlain("lead")}</span>
      ${renderBilingualChips(services.slice(0, 3))}
      <form class="stack" data-demo-form>
        <input class="demo-input" type="text" ${placeholderAttrs("Visitor name", "اسم الزائر")} required>
        <select class="demo-select"><option>${escapeHtml(project.stack[0] || "Option")}</option><option>${escapeHtml(project.stack[1] || "Follow-up")}</option></select>
        <button class="button" type="submit">${i18nPlain("submit")}</button>
        <div class="form-result" ${demoFormResultAttrs()} data-form-result hidden></div>
      </form>
    </article>
  </section>
`;

const renderPortalExperience = (project) => `
  <section class="app-layout">
    <aside class="app-sidebar">
      <button class="side-button is-active" type="button" data-tab-target="content">${i18nPlain("content")}</button>
      <button class="side-button" type="button" data-tab-target="members">${i18nPlain("members")}</button>
      <button class="side-button" type="button" data-tab-target="files">${i18nPlain("files")}</button>
    </aside>
    <div class="app-panel">
      <div class="portal-view app-view stack" data-app-view="content">
        ${i18nText(project.summary, "p", "app-copy")}
        ${renderInteractiveFeatures(project.impact)}
      </div>
      <div class="portal-view app-view stack" data-app-view="members" hidden>
        ${renderInteractiveKpis(project)}
        <button class="button-secondary" type="button" data-task-toggle>${i18nPlain("active")}</button>
      </div>
      <div class="portal-view app-view stack" data-app-view="files" hidden>
        <div class="data-table">
          ${project.stack
            .map(
              (item, index) => `
                <div class="data-row" data-row-status="active">
                  <span>${escapeHtml(item)}</span>
                  <span>${index + 1}.0 MB</span>
                  <span class="status">${i18nPlain("done")}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </div>
  </section>
`;

const renderInfrastructureExperience = (project) => `
  <section class="app-layout">
    <aside class="app-sidebar">
      <button class="side-button is-active" type="button" data-tab-target="records">${i18nPlain("records")}</button>
      <button class="side-button" type="button" data-tab-target="reports">${i18nPlain("reports")}</button>
    </aside>
    <div class="app-panel">
      <div class="app-view stack" data-app-view="records">
        <div class="app-console">
          <div class="console-line"><strong>Type</strong><strong>Target</strong><strong>Status</strong></div>
          <div class="console-line"><span>SPF</span><span>include:spf.protection.outlook.com</span><span class="status">${i18nPlain("verified")}</span></div>
          <div class="console-line"><span>DKIM</span><span>selector1._domainkey</span><span class="status">${i18nPlain("verified")}</span></div>
          <div class="console-line"><span>MX</span><span>mail.protection.outlook.com</span><span class="status">${i18nPlain("warning")}</span></div>
        </div>
      </div>
      <div class="app-view stack" data-app-view="reports" hidden>
        ${renderInteractiveKpis(project)}
        ${i18nText(project.solution, "p", "app-copy")}
      </div>
    </div>
  </section>
`;

const demoKindFor = (project) => {
  const services = new Set(project.services);
  const slug = project.slug;

  if (services.has("email-migration") || services.has("infrastructure")) {
    return "infrastructure";
  }

  if (services.has("mobile")) {
    return "mobile";
  }

  if (services.has("wordpress-firebase")) {
    return "portal";
  }

  if (/booking|ordering|ticketing/.test(slug)) {
    return "booking";
  }

  if (services.has("crm") || services.has("analytics") || /dashboard|erp|tower|automation|portal/.test(slug)) {
    return "dashboard";
  }

  return "website";
};

const renderMockupDots = () => `<span class="window-dots"><span></span><span></span><span></span></span>`;

const renderWebsiteMockup = (project, title, sectorLabel) => `
  <div class="interface-mockup" aria-label="${escapeHtml(title)} static website mockup">
    <div class="mockup-chrome">
      ${renderMockupDots()}
      <span class="mockup-address"></span>
    </div>
    <div class="mockup-canvas">
      <div class="mockup-hero-panel">
        <span class="tag">${escapeHtml(sectorLabel)}</span>
        <span class="mockup-title"></span>
        <span class="mockup-subtitle"></span>
        <span class="mockup-subtitle"></span>
        <span class="mockup-button"></span>
      </div>
      <div class="mockup-grid" style="margin-top: 14px;">
        <div class="mockup-card">
          <span class="mockup-line long"></span>
          <span class="mockup-line medium"></span>
          <span class="mockup-line short"></span>
        </div>
        <div class="mockup-card">
          <span class="mockup-line medium"></span>
          <span class="mockup-line long"></span>
          <span class="mockup-pill"></span>
        </div>
        <div class="mockup-card dark">
          <span class="mockup-line long"></span>
          <span class="mockup-line medium"></span>
          <span class="mockup-button"></span>
        </div>
      </div>
    </div>
  </div>
`;

const renderDashboardMockup = (project, title) => `
  <div class="interface-mockup" aria-label="${escapeHtml(title)} static dashboard mockup">
    <div class="mockup-chrome">
      ${renderMockupDots()}
      <span class="mockup-address"></span>
    </div>
    <div class="mockup-canvas mockup-sidebar-layout">
      <aside class="mockup-sidebar">
        <span class="mockup-line long"></span>
        <span class="mockup-line medium"></span>
        <span class="mockup-line short"></span>
        <span class="mockup-line medium"></span>
      </aside>
      <div class="mockup-main">
        <div class="mockup-grid">
          ${project.metrics
            .map(
              (metric) => `
                <div class="mockup-stat">
                  <strong>${escapeHtml(metric.value)}</strong>
                  <span class="mockup-line long"></span>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="mockup-grid">
          <div class="mockup-chart">
            <span style="height: 42%;"></span>
            <span style="height: 68%;"></span>
            <span style="height: 54%;"></span>
            <span style="height: 84%;"></span>
            <span style="height: 62%;"></span>
            <span style="height: 92%;"></span>
          </div>
          <div class="mockup-table" style="grid-column: span 2;">
            <div class="mockup-table-row"><span class="mockup-line long"></span><span class="mockup-line medium"></span><span class="mockup-pill"></span></div>
            <div class="mockup-table-row"><span class="mockup-line medium"></span><span class="mockup-line long"></span><span class="mockup-pill"></span></div>
            <div class="mockup-table-row"><span class="mockup-line long"></span><span class="mockup-line short"></span><span class="mockup-pill"></span></div>
            <div class="mockup-table-row"><span class="mockup-line medium"></span><span class="mockup-line medium"></span><span class="mockup-pill"></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const renderMobileMockup = (project, title) => `
  <div class="interface-mockup mockup-phone-wrap" aria-label="${escapeHtml(title)} static mobile app mockup">
    <div class="mockup-phone">
      <div class="phone-screen">
        <div class="phone-top">
          <span class="phone-avatar"></span>
          <span class="tag">${escapeHtml(project.stack[0] || "App")}</span>
        </div>
        <div class="phone-card highlight">
          <span class="mockup-line long"></span>
          <span class="mockup-line medium"></span>
          <span class="mockup-button"></span>
        </div>
        <div class="phone-card">
          <span class="mockup-line long"></span>
          <span class="mockup-line short"></span>
        </div>
        <div class="phone-card">
          <span class="mockup-line medium"></span>
          <span class="mockup-line long"></span>
          <span class="mockup-pill"></span>
        </div>
        <div class="phone-card">
          <span class="mockup-line long"></span>
          <span class="mockup-line medium"></span>
        </div>
        <nav class="phone-nav" aria-hidden="true"><span></span><span></span><span></span><span></span></nav>
      </div>
    </div>
  </div>
`;

const renderPortalMockup = (project, title) => `
  <div class="interface-mockup" aria-label="${escapeHtml(title)} static portal mockup">
    <div class="mockup-chrome">
      ${renderMockupDots()}
      <span class="mockup-address"></span>
    </div>
    <div class="mockup-canvas mockup-sidebar-layout">
      <aside class="mockup-sidebar">
        <span class="mockup-line long"></span>
        <span class="mockup-line medium"></span>
        <span class="mockup-line medium"></span>
        <span class="mockup-line short"></span>
      </aside>
      <div class="mockup-main">
        <div class="mockup-hero-panel">
          <span class="tag">Member workspace</span>
          <span class="mockup-title"></span>
          <span class="mockup-subtitle"></span>
        </div>
        <div class="mockup-grid">
          <div class="mockup-card"><span class="mockup-line long"></span><span class="mockup-pill"></span></div>
          <div class="mockup-card"><span class="mockup-line medium"></span><span class="mockup-pill"></span></div>
          <div class="mockup-card"><span class="mockup-line short"></span><span class="mockup-pill"></span></div>
        </div>
      </div>
    </div>
  </div>
`;

const renderBookingMockup = (project, title) => `
  <div class="interface-mockup" aria-label="${escapeHtml(title)} static booking flow mockup">
    <div class="mockup-chrome">
      ${renderMockupDots()}
      <span class="mockup-address"></span>
    </div>
    <div class="mockup-canvas booking-layout">
      <div class="mockup-main">
        <div class="mockup-hero-panel">
          <span class="tag">Booking journey</span>
          <span class="mockup-title"></span>
          <span class="mockup-subtitle"></span>
          <span class="mockup-button"></span>
        </div>
        <div class="mockup-calendar">
          ${Array.from({ length: 28 }, () => "<span></span>").join("")}
        </div>
      </div>
      <aside class="mockup-card">
        <span class="tag">Selected item</span>
        <span class="mockup-line long"></span>
        <span class="mockup-line medium"></span>
        <span class="mockup-line short"></span>
        <span class="mockup-button"></span>
      </aside>
    </div>
  </div>
`;

const renderInfrastructureMockup = (project, title) => `
  <div class="interface-mockup" aria-label="${escapeHtml(title)} static infrastructure console mockup">
    <div class="mockup-chrome">
      ${renderMockupDots()}
      <span class="mockup-address"></span>
    </div>
    <div class="mockup-canvas mockup-sidebar-layout">
      <aside class="mockup-sidebar">
        <span class="mockup-line long"></span>
        <span class="mockup-line medium"></span>
        <span class="mockup-line short"></span>
      </aside>
      <div class="mockup-main">
        <div class="mockup-grid">
          <div class="mockup-stat"><strong>SPF</strong><span class="mockup-line medium"></span></div>
          <div class="mockup-stat"><strong>DKIM</strong><span class="mockup-line medium"></span></div>
          <div class="mockup-stat"><strong>MX</strong><span class="mockup-line medium"></span></div>
        </div>
        <div class="mockup-console">
          <div class="console-row"><span>Record</span><span>Target</span><span>Status</span></div>
          <div class="console-row"><span class="mockup-line medium"></span><span class="mockup-line long"></span><span class="console-chip"></span></div>
          <div class="console-row"><span class="mockup-line short"></span><span class="mockup-line medium"></span><span class="console-chip"></span></div>
          <div class="console-row"><span class="mockup-line medium"></span><span class="mockup-line long"></span><span class="console-chip"></span></div>
        </div>
      </div>
    </div>
  </div>
`;

const renderDemoVisual = (project, title, sectorLabel, services) => {
  const kind = demoKindFor(project);

  if (kind === "mobile") {
    return renderMobileExperience(project);
  }

  if (kind === "portal") {
    return renderPortalExperience(project);
  }

  if (kind === "booking") {
    return renderBookingExperience(project, services);
  }

  if (kind === "infrastructure") {
    return renderInfrastructureExperience(project);
  }

  if (kind === "dashboard") {
    return renderDashboardExperience(project);
  }

  return renderWebsiteExperience(project, services);
};

const renderDemoShell = ({
  title,
  description,
  content,
  canonicalPath,
  isIndex = false,
  assetPath,
  brandHref,
  brandLabel = "POPWAM Demos",
  footerLabel = "POPWAM demo library.",
  ogImagePath,
  scriptFile = "demos.js",
  showCopyLink = true,
  showDemoHomeLink = isIndex,
  showSiteLink = true,
  siteHome,
  styleFile = "demos.css",
}) => {
  const resolvedAssetPath = assetPath ?? (isIndex ? "assets" : "../assets");
  const demoHome = brandHref ?? (isIndex ? "./" : "../");
  const resolvedSiteHome = siteHome ?? (isIndex ? "../" : "../../");
  const canonicalTag = canonicalPath ? `<link rel="canonical" href="${toUrl(canonicalPath)}">` : "";
  const ogUrlTag = canonicalPath ? `<meta property="og:url" content="${toUrl(canonicalPath)}">` : "";
  const resolvedOgImage = ogImagePath ?? toUrl("/demos/assets/img/project-placeholder.svg");
  const schema = {
    "@context": "https://schema.org",
    "@type": isIndex ? "CollectionPage" : "SoftwareApplication",
    name: title,
    description,
    ...(canonicalPath ? { url: toUrl(canonicalPath) } : {}),
    ...(isIndex
      ? {}
      : {
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          inLanguage: ["en", "ar"],
          isAccessibleForFree: true,
          creator: {
            "@type": "Organization",
            name: data.site.name,
            url: data.site.domain,
          },
        }),
  };

  return `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#11141b">
    ${canonicalTag}
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    ${ogUrlTag}
    <meta property="og:image" content="${escapeHtml(resolvedOgImage)}">
    <link rel="icon" href="${resolvedAssetPath}/img/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="${resolvedAssetPath}/css/${styleFile}">
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
  </head>
  <body data-theme="aurora">
    <header class="topbar">
      <div class="shell topbar-inner">
        <a class="brand" href="${demoHome}" aria-label="POPWAM demos">
          <img src="${resolvedAssetPath}/img/logo.svg" alt="POPWAM logo" width="38" height="38">
          <span>${escapeHtml(brandLabel)}</span>
        </a>
        <nav class="nav-actions" aria-label="Demo navigation">
          ${showDemoHomeLink ? `<a class="nav-link" href="${demoHome}">${i18nText({ en: "All demos", ar: "كل الديموهات" })}</a>` : ""}
          ${showSiteLink ? `<a class="nav-link" href="${resolvedSiteHome}">${i18nLabel("mainSite")}</a>` : ""}
          ${showCopyLink ? `<button class="button-secondary" type="button" data-copy-link>${i18nLabel("copyLink")}</button>` : ""}
          <div class="control-group" aria-label="Language">
            <button class="control-button is-active" type="button" data-lang="en">EN</button>
            <button class="control-button" type="button" data-lang="ar">AR</button>
          </div>
          <div class="control-group" aria-label="Theme">
            <button class="control-button is-active" type="button" data-theme-option="aurora">1</button>
            <button class="control-button" type="button" data-theme-option="studio">2</button>
            <button class="control-button" type="button" data-theme-option="night">3</button>
          </div>
        </nav>
      </div>
    </header>
    <main>
      ${content}
    </main>
    <footer class="footer">
      <div class="shell footer-inner">
        <p class="muted">© <span data-year></span> ${escapeHtml(footerLabel)}</p>
        <div class="inline-actions">
          <a class="button-secondary" href="mailto:${escapeHtml(data.site.email)}">Email</a>
          <a class="button-secondary" href="tel:+${escapeHtml(data.site.phoneDigits)}">Call</a>
        </div>
      </div>
    </footer>
    <script src="${resolvedAssetPath}/js/${scriptFile}" defer></script>
  </body>
</html>`;
};

const renderDemoIndex = () => {
  const cards = data.projects
    .map((project) => {
      const sector = sectorMap.get(project.sector);
      const metric = project.metrics[0];

      return `
        <article class="demo-index-card" data-demo-card data-sector="${escapeHtml(project.sector)}">
          ${i18nText(sector.label, "span", "tag")}
          <div class="stack">
            ${i18nText(project.title, "h2", "card-title")}
            ${i18nText(project.summary, "p", "card-copy")}
          </div>
          <div class="chip-row">
            <span class="chip">${escapeHtml(metric.value)} ${i18nText(metric.label)}</span>
          </div>
          <a class="button-secondary" href="${escapeHtml(project.slug)}/" target="_blank" rel="noopener noreferrer">${i18nText({ en: "Open interactive demo", ar: "افتح الديمو التفاعلي" })}</a>
        </article>
      `;
    })
    .join("");

  const content = `
    <section class="shell hero">
      <div class="hero-copy">
        ${i18nText({ en: "30 local interactive demos", ar: "30 ديمو تفاعلي محلي" }, "span", "eyebrow")}
        ${i18nText({ en: "Demo library ready for internal hosting", ar: "مكتبة ديموهات جاهزة للسيرفر الداخلي" }, "h1")}
        ${i18nText({ en: "Every demo now behaves like a complete web experience with language switching, theme switching, forms, filters, tabs, and local assets.", ar: "كل ديمو يعمل كتجربة ويب كاملة مع تبديل اللغة والثيمات والفورمات والفلاتر والتبويبات وملفات محلية." }, "p")}
        <div class="inline-actions">
          <a class="button button-accent" href="#library">${i18nText({ en: "Browse demos", ar: "استعرض الديموهات" })}</a>
          <a class="button-secondary" href="../portfolio/">${i18nText({ en: "Back to portfolio", ar: "الرجوع للأعمال" })}</a>
        </div>
      </div>
      <div class="product-frame" aria-label="Demo library preview">
        <div class="frame-bar">
          ${i18nText({ en: "Internal server package", ar: "حزمة للسيرفر الداخلي" })}
          <span class="window-dots"><span></span><span></span><span></span></span>
        </div>
        <div class="frame-content">
          <div class="screen-grid">
            <div class="screen-panel">
              <strong>30 demo pages</strong>
              ${i18nText({ en: "Generated from the project data and linked from every case study.", ar: "مولدة من بيانات المشاريع ومربوطة بكل دراسة حالة." }, "p")}
            </div>
            <div class="screen-panel">
              <strong>Separated assets</strong>
              ${i18nText({ en: "Each demo folder contains its own HTML, CSS, JavaScript, and image assets.", ar: "كل فولدر ديمو يحتوي HTML و CSS و JavaScript والصور الخاصة به." }, "p")}
            </div>
          </div>
          <div class="screen-bars"><span></span><span></span><span></span></div>
        </div>
      </div>
    </section>

    <section class="shell section" id="library">
      <div class="section-head">
        ${i18nText({ en: "Choose a demo", ar: "اختر ديمو" }, "h2", "section-title")}
        ${i18nText({ en: "Filter by sector or open any demo directly. These routes are relative and work cleanly from a static server.", ar: "فلتر حسب القطاع أو افتح أي ديمو مباشرة. المسارات محلية وتعمل على سيرفر Static." }, "p", "section-copy")}
      </div>
      <div class="filter-row">
        <button class="filter-button is-active" type="button" data-sector-filter="all">${i18nPlain("all")}</button>
        ${data.sectors
          .map(
            (sector) => `<button class="filter-button" type="button" data-sector-filter="${escapeHtml(sector.key)}">${i18nText(sector.label)}</button>`
          )
          .join("")}
      </div>
      <p class="muted" data-filter-count></p>
      <div class="demo-grid">
        ${cards}
      </div>
      <p class="card-copy empty-state" data-empty-state hidden>${i18nText({ en: "No demos match this filter.", ar: "لا توجد ديموهات في هذا التصنيف." })}</p>
    </section>
  `;

  return renderDemoShell({
    title: "POPWAM Demo Library",
    description: "A local library of 30 POPWAM demo pages for internal server hosting.",
    content,
    canonicalPath: "/demos/",
    isIndex: true,
  });
};

const renderDemoPage = (project, shellOptions = {}) => {
  const sector = sectorMap.get(project.sector);
  const title = text(project.title, "en");
  const summary = text(project.summary, "en");
  const sectorLabel = text(sector.label, "en");
  const services = project.services
    .map((key) => serviceMap.get(key))
    .filter(Boolean)
    .map((service) => service.title);

  const content = `
    <div class="demo-app">
      <div class="app-shell">
        <section class="app-hero">
          <div class="app-panel stack">
            <span class="eyebrow">${i18nPlain("interactiveDemo")} / ${i18nText(sector.label)}</span>
            ${i18nText(project.title, "h1", "app-title")}
            ${i18nText(project.summary, "p", "app-copy")}
            <div class="inline-actions">
              <a class="button button-accent" href="#experience">${i18nLabel("openExperience")}</a>
            </div>
            <div class="chip-row">
              ${renderBilingualChips(services.slice(0, 4))}
            </div>
          </div>
          <article class="app-panel stack">
            <span class="tag">${i18nLabel("theme")}: 1 / 2 / 3</span>
            ${i18nText({ en: "This is a complete local demo: switch language, change theme, click tabs, select records, submit forms, and review the generated workflow without leaving this URL.", ar: "هذا ديمو محلي كامل: بدّل اللغة، غيّر الثيم، اضغط التبويبات، اختَر السجلات، أرسل الفورم، وراجع مسار التجربة بدون مغادرة نفس الرابط." }, "p", "app-copy")}
            <div class="chip-row">${renderDemoChips(project.stack, "stack-chip")}</div>
          </article>
        </section>

        <section id="experience">
          ${renderDemoVisual(project, title, sectorLabel, services)}
        </section>

        <section class="app-grid">
          ${renderInteractiveKpis(project)}
          <div class="grid">
            <article class="app-card stack">
              ${i18nText({ en: "Challenge", ar: "التحدي" }, "span", "tag")}
              ${i18nText(project.challenge, "p", "app-copy")}
            </article>
            <article class="app-card stack">
              ${i18nText({ en: "Solution", ar: "الحل" }, "span", "tag")}
              ${i18nText(project.solution, "p", "app-copy")}
            </article>
          </div>
        </section>
      </div>
    </div>
  `;

  return renderDemoShell({
    title: `${title} Demo | POPWAM`,
    description: summary,
    content,
    canonicalPath: demoPathFor(project),
    ...shellOptions,
  });
};

const demoImageFiles = ["logo.svg", "favicon.svg", "project-placeholder.svg"];

const writeDemoAssetBundle = async ({ assetDir, styleFile, scriptFile }) => {
  await fs.mkdir(path.join(assetDir, "css"), { recursive: true });
  await fs.mkdir(path.join(assetDir, "js"), { recursive: true });
  await fs.mkdir(path.join(assetDir, "img"), { recursive: true });

  await fs.writeFile(path.join(assetDir, "css", styleFile), demoCss.trimStart(), "utf8");
  await fs.writeFile(path.join(assetDir, "js", scriptFile), demoJs.trimStart(), "utf8");

  await Promise.all(
    demoImageFiles.map((fileName) =>
      fs.copyFile(path.join(rootDir, "assets", "img", fileName), path.join(assetDir, "img", fileName))
    )
  );
};

const writeDemoAssets = async () => {
  await writeDemoAssetBundle({
    assetDir: path.join(rootDir, "demos", "assets"),
    styleFile: "demos.css",
    scriptFile: "demos.js",
  });
};

const writeDemoPage = async (filePath, html, pathname) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, html, "utf8");
  routes.push(toUrl(pathname));
};

const buildDemos = async () => {
  await writeDemoAssets();
  await writeDemoPage(path.join(rootDir, "demos", "index.html"), renderDemoIndex(), "/demos/");

  for (const project of data.projects) {
    await writeDemoAssetBundle({
      assetDir: path.join(rootDir, "demos", project.slug, "assets"),
      styleFile: "style.css",
      scriptFile: "app.js",
    });

    await writeDemoPage(
      path.join(rootDir, "demos", project.slug, "index.html"),
      renderStandaloneDemoPage(project),
      demoPathFor(project)
    );
  }
};

const standaloneShellOptions = ({ brandLabel, footerLabel }) => ({
  assetPath: "assets",
  brandHref: "./",
  brandLabel,
  canonicalPath: null,
  footerLabel,
  ogImagePath: "assets/img/project-placeholder.svg",
  scriptFile: "app.js",
  showCopyLink: false,
  showDemoHomeLink: false,
  showSiteLink: false,
  styleFile: "style.css",
});

const renderPrimeEstatesStandalone = (project) => {
  const units = [
    {
      type: "apartment",
      title: { en: "Skyline Residence A12", ar: "سكاي لاين ريزيدنس A12" },
      location: { en: "New Cairo - Garden view", ar: "القاهرة الجديدة - إطلالة حديقة" },
      price: "EGP 6.8M",
      meta: "152 m² / 3 bedrooms",
      status: { en: "Ready 2027", ar: "تسليم 2027" },
    },
    {
      type: "villa",
      title: { en: "Palm Courtyard Villa", ar: "فيلا بالم كورت يارد" },
      location: { en: "West Cairo - Club district", ar: "غرب القاهرة - منطقة النادي" },
      price: "EGP 18.4M",
      meta: "315 m² / 4 bedrooms",
      status: { en: "Limited release", ar: "طرح محدود" },
    },
    {
      type: "studio",
      title: { en: "Capital Park Studio", ar: "استوديو كابيتال بارك" },
      location: { en: "Business district - serviced", ar: "منطقة الأعمال - مخدوم" },
      price: "EGP 3.1M",
      meta: "68 m² / 1 bedroom",
      status: { en: "Move-in soon", ar: "استلام قريب" },
    },
  ];

  const unitCards = units
    .map(
      (unit, index) => `
        <article class="property-card" data-unit-card data-unit-type="${unit.type}">
          <div class="property-media${index === 1 ? " dark" : ""}">
            <span class="tag">${i18nText(unit.status)}</span>
          </div>
          <div class="property-body">
            ${i18nText(unit.title, "h3", "card-title")}
            ${i18nText(unit.location, "p", "real-copy")}
            <div class="unit-meta">
              <strong>${escapeHtml(unit.price)}</strong>
              <span>${escapeHtml(unit.meta)}</span>
            </div>
            <button class="button-secondary" type="button" data-compare-unit>${i18nText({ en: "Add to comparison", ar: "أضف للمقارنة" })}</button>
          </div>
        </article>
      `
    )
    .join("");

  const content = `
    <div class="real-demo">
      <div class="real-shell">
        <section class="real-hero">
          <div class="real-panel estate-hero-card">
            <div class="real-menu">
              <strong>Prime Estates</strong>
              <nav aria-label="Prime Estates sections">
                <a class="real-link" href="#developments">${i18nText({ en: "Developments", ar: "المشروعات" })}</a>
                <a class="real-link" href="#plans">${i18nText({ en: "Plans", ar: "المخططات" })}</a>
                <a class="real-link" href="#visit">${i18nText({ en: "Book visit", ar: "احجز زيارة" })}</a>
              </nav>
            </div>
            <div class="stack">
              ${i18nText({ en: "Prime Estates", ar: "برايم إستيتس" }, "span", "eyebrow")}
              ${i18nText({ en: "Find the right property before the sales call.", ar: "اختار الوحدة المناسبة قبل مكالمة المبيعات." }, "h1", "real-title")}
              ${i18nText(project.summary, "p", "real-copy")}
              <div class="inline-actions">
                <a class="button button-accent" href="#developments">${i18nText({ en: "Explore units", ar: "استعرض الوحدات" })}</a>
                <a class="button-secondary" href="#visit">${i18nText({ en: "Request consultation", ar: "اطلب استشارة" })}</a>
              </div>
            </div>
            <form class="real-card search-grid" data-demo-form>
              <label class="estate-field">
                <span>${i18nText({ en: "Area", ar: "المنطقة" })}</span>
                <select class="estate-select"><option>New Cairo</option><option>West Cairo</option><option>Capital District</option></select>
              </label>
              <label class="estate-field">
                <span>${i18nText({ en: "Budget", ar: "الميزانية" })}</span>
                <select class="estate-select"><option>EGP 3M - 7M</option><option>EGP 7M - 14M</option><option>EGP 14M+</option></select>
              </label>
              <label class="estate-field">
                <span>${i18nText({ en: "Delivery", ar: "التسليم" })}</span>
                <select class="estate-select"><option>2026</option><option>2027</option><option>Ready soon</option></select>
              </label>
              <button class="button" type="submit">${i18nText({ en: "Match units", ar: "رشح وحدات" })}</button>
              <div class="form-result" ${demoFormResultAttrs()} data-form-result hidden></div>
            </form>
          </div>
          <div class="real-panel estate-visual" aria-label="Prime Estates skyline preview">
            <div class="estate-towers" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
            <div class="estate-caption">
              ${i18nText({ en: "Live availability across 3 active developments", ar: "توافر مباشر داخل 3 مشروعات نشطة" }, "strong")}
              ${i18nText(project.impact[2], "p", "real-copy")}
            </div>
          </div>
        </section>

        <section class="real-panel stack" id="developments">
          <div class="section-head">
            ${i18nText({ en: "Available homes", ar: "الوحدات المتاحة" }, "h2", "section-title")}
            ${i18nText({ en: "Filter inventory, compare units, then send a qualified inquiry with the exact unit context.", ar: "فلتر المخزون، قارن الوحدات، ثم أرسل استفسار مؤهل بتفاصيل الوحدة." }, "p", "real-copy")}
          </div>
          <div class="estate-toolbar">
            <button class="unit-filter is-active" type="button" data-unit-filter="all">${i18nText({ en: "All", ar: "الكل" })}</button>
            <button class="unit-filter" type="button" data-unit-filter="apartment">${i18nText({ en: "Apartments", ar: "شقق" })}</button>
            <button class="unit-filter" type="button" data-unit-filter="villa">${i18nText({ en: "Villas", ar: "فيلات" })}</button>
            <button class="unit-filter" type="button" data-unit-filter="studio">${i18nText({ en: "Studios", ar: "استوديوهات" })}</button>
          </div>
          <div class="unit-grid">${unitCards}</div>
          <div class="compare-tray">
            ${i18nText({ en: "Selected for comparison", ar: "وحدات مختارة للمقارنة" }, "strong")}
            <strong><span data-compare-count>0</span> / 3</strong>
          </div>
        </section>

        <section class="estate-info-grid" id="plans">
          <article class="real-panel stack">
            ${i18nText({ en: "Sample floor plan", ar: "مخطط وحدة تجريبي" }, "h2", "section-title")}
            <div class="floor-plan">
              <span class="floor-room wide">${i18nText({ en: "Reception", ar: "ريسيبشن" })}</span>
              <span class="floor-room">${i18nText({ en: "Master", ar: "غرفة رئيسية" })}</span>
              <span class="floor-room">${i18nText({ en: "Kitchen", ar: "مطبخ" })}</span>
              <span class="floor-room">${i18nText({ en: "Bedroom", ar: "غرفة" })}</span>
              <span class="floor-room">${i18nText({ en: "Terrace", ar: "تراس" })}</span>
            </div>
          </article>
          <article class="real-panel stack">
            ${i18nText({ en: "Payment estimator", ar: "حاسبة السداد" }, "h2", "section-title")}
            <form class="stack" data-estimator-form>
              <label class="estate-field">
                <span>${i18nText({ en: "Unit price", ar: "سعر الوحدة" })}</span>
                <input class="estate-input" type="number" name="budget" value="6800000">
              </label>
              <label class="estate-field">
                <span>${i18nText({ en: "Down payment", ar: "المقدم" })}</span>
                <input class="estate-input" type="number" name="downPayment" value="680000">
              </label>
              <button class="button" type="submit">${i18nText({ en: "Calculate", ar: "احسب" })}</button>
              <div class="estimate-result" data-estimate-result hidden></div>
            </form>
          </article>
          <article class="real-panel stack" id="visit">
            ${i18nText({ en: "Book a private tour", ar: "احجز جولة خاصة" }, "h2", "section-title")}
            <form class="stack" data-demo-form>
              <input class="estate-input" type="text" ${placeholderAttrs("Full name", "الاسم بالكامل")} required>
              <input class="estate-input" type="tel" ${placeholderAttrs("Mobile number", "رقم الموبايل")} required>
              <select class="estate-select"><option>Skyline Residence A12</option><option>Palm Courtyard Villa</option><option>Capital Park Studio</option></select>
              <button class="button button-accent" type="submit">${i18nText({ en: "Send request", ar: "إرسال الطلب" })}</button>
              <div class="form-result" ${demoFormResultAttrs()} data-form-result hidden></div>
            </form>
          </article>
        </section>
      </div>
    </div>
  `;

  return renderDemoShell({
    title: "Prime Estates | Sales Platform",
    description: text(project.summary, "en"),
    content,
    ...standaloneShellOptions({ brandLabel: "Prime Estates", footerLabel: "Prime Estates sales platform." }),
  });
};

const renderBrokerHubStandalone = (project) => {
  const leads = [
    { name: "Mona Adel", project: "Palm Courtyard", source: "Facebook Ads", next: "Call today 6:30 PM", stage: "New", score: "92" },
    { name: "Karim Nabil", project: "Skyline Residence", source: "Website form", next: "Send payment plan", stage: "Qualified", score: "81" },
    { name: "Heba Samir", project: "Capital Park", source: "Broker referral", next: "Visit tomorrow 4:00 PM", stage: "Visit", score: "76" },
    { name: "Youssef Hany", project: "Palm Courtyard", source: "WhatsApp", next: "Manager review", stage: "Reservation", score: "88" },
  ];

  const stageNames = ["New", "Qualified", "Visit"];
  const pipeline = stageNames
    .map(
      (stage) => `
        <div class="pipeline-stage">
          <div class="crm-stage-head">
            <strong>${escapeHtml(stage)}</strong>
            <span class="status">${leads.filter((lead) => lead.stage === stage || (stage === "Visit" && lead.stage === "Reservation")).length}</span>
          </div>
          ${leads
            .filter((lead) => lead.stage === stage || (stage === "Visit" && lead.stage === "Reservation"))
            .map(
              (lead, index) => `
                <button class="lead-card${index === 0 && stage === "New" ? " is-active" : ""}" type="button" data-lead-card data-name="${escapeHtml(lead.name)}" data-project="${escapeHtml(lead.project)}" data-source="${escapeHtml(lead.source)}" data-next="${escapeHtml(lead.next)}">
                  <strong>${escapeHtml(lead.name)}</strong>
                  <span class="real-copy">${escapeHtml(lead.project)}</span>
                  <span class="lead-meta"><span>${escapeHtml(lead.source)}</span><span class="lead-score">${escapeHtml(lead.score)}%</span></span>
                </button>
              `
            )
            .join("")}
        </div>
      `
    )
    .join("");

  const content = `
    <div class="real-demo">
      <div class="real-shell crm-workspace">
        <aside class="crm-panel crm-sidebar">
          <div class="stack">
            <strong>BrokerHub</strong>
            ${i18nText({ en: "Property broker operating room", ar: "غرفة تشغيل للوسطاء العقاريين" }, "p", "real-copy")}
          </div>
          <button class="side-button is-active" type="button" data-tab-target="workspace">${i18nText({ en: "Workspace", ar: "مساحة العمل" })}</button>
          <button class="side-button" type="button" data-tab-target="reports">${i18nText({ en: "Reports", ar: "التقارير" })}</button>
          <button class="side-button" type="button" data-tab-target="settings">${i18nText({ en: "Automation", ar: "الأتمتة" })}</button>
        </aside>

        <main class="stack">
          <section class="crm-panel stack">
            <div class="crm-top">
              <div class="stack">
                ${i18nText({ en: "BrokerHub CRM", ar: "BrokerHub CRM" }, "span", "eyebrow")}
                ${i18nText({ en: "One workspace for every lead, visit, and reservation.", ar: "مساحة واحدة لكل عميل وزيارة وحجز." }, "h1", "real-title")}
                ${i18nText(project.summary, "p", "real-copy")}
              </div>
              <form class="crm-toolbar" data-demo-form>
                <input class="crm-input" type="search" ${placeholderAttrs("Search leads", "ابحث عن عميل")}>
                <button class="button button-accent" type="submit">${i18nText({ en: "Add lead", ar: "إضافة عميل" })}</button>
                <div class="form-result" ${demoFormResultAttrs()} data-form-result hidden></div>
              </form>
            </div>
            <div class="crm-stats">
              ${project.metrics
                .map(
                  (metric) => `
                    <article class="crm-stat">
                      <strong>${escapeHtml(metric.value)}</strong>
                      ${i18nText(metric.label, "span", "real-copy")}
                    </article>
                  `
                )
                .join("")}
            </div>
          </section>

          <section class="app-view crm-view-grid" data-app-view="workspace">
            <div class="crm-panel stack">
              <div class="section-head">
                ${i18nText({ en: "Live sales pipeline", ar: "مسار المبيعات المباشر" }, "h2", "section-title")}
                ${i18nText({ en: "Select a lead to update the side profile, next action, and source context.", ar: "اختر عميلا لتحديث بياناته والإجراء التالي ومصدره." }, "p", "real-copy")}
              </div>
              <div class="pipeline-board">${pipeline}</div>
            </div>
            <aside class="crm-panel stack">
              ${i18nText({ en: "Lead profile", ar: "ملف العميل" }, "h2", "card-title")}
              <div class="lead-detail">
                <strong data-lead-name>Mona Adel</strong>
                <div class="contact-line"><span>${i18nText({ en: "Project", ar: "المشروع" })}</span><strong data-lead-project>Palm Courtyard</strong></div>
                <div class="contact-line"><span>${i18nText({ en: "Source", ar: "المصدر" })}</span><strong data-lead-source>Facebook Ads</strong></div>
                <div class="contact-line"><span>${i18nText({ en: "Next action", ar: "الإجراء التالي" })}</span><strong data-lead-next>Call today 6:30 PM</strong></div>
              </div>
              <div class="schedule-card stack">
                ${i18nText({ en: "Today", ar: "اليوم" }, "span", "tag")}
                <label class="task-line"><span>${i18nText({ en: "Confirm visit", ar: "تأكيد الزيارة" })}</span><input type="checkbox" checked></label>
                <label class="task-line"><span>${i18nText({ en: "Send brochure", ar: "إرسال البروشور" })}</span><input type="checkbox"></label>
                <label class="task-line"><span>${i18nText({ en: "Manager handoff", ar: "تسليم للمدير" })}</span><input type="checkbox"></label>
              </div>
            </aside>
          </section>

          <section class="app-view crm-panel stack" data-app-view="reports" hidden>
            ${i18nText({ en: "Performance reports", ar: "تقارير الأداء" }, "h2", "section-title")}
            <div class="chart-card">
              <span style="height: 46%;"></span><span style="height: 72%;"></span><span style="height: 61%;"></span><span style="height: 88%;"></span><span style="height: 79%;"></span><span style="height: 94%;"></span>
            </div>
            ${renderInteractiveFeatures(project.impact)}
          </section>

          <section class="app-view crm-panel stack" data-app-view="settings" hidden>
            ${i18nText({ en: "Automation rules", ar: "قواعد الأتمتة" }, "h2", "section-title")}
            <div class="lead-list-grid">
              <article class="crm-card stack">
                <span class="tag">01</span>
                ${i18nText({ en: "If a lead requests a visit, assign the nearest available broker and create a reminder.", ar: "عند طلب زيارة يتم تعيين أقرب وسيط متاح وإنشاء تذكير." }, "p", "real-copy")}
              </article>
              <article class="crm-card stack">
                <span class="tag">02</span>
                ${i18nText({ en: "If no response happens in two hours, escalate to the sales manager.", ar: "إذا لم يحدث رد خلال ساعتين يتم التصعيد لمدير المبيعات." }, "p", "real-copy")}
              </article>
              <article class="crm-card stack">
                <span class="tag">03</span>
                ${i18nText({ en: "Sync reserved units to the reporting sheet and mark duplicates before follow-up.", ar: "مزامنة الوحدات المحجوزة مع التقرير وتحديد التكرارات قبل المتابعة." }, "p", "real-copy")}
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  `;

  return renderDemoShell({
    title: "BrokerHub CRM | Property Broker Workspace",
    description: text(project.summary, "en"),
    content,
    ...standaloneShellOptions({ brandLabel: "BrokerHub", footerLabel: "BrokerHub CRM workspace." }),
  });
};

const renderStandaloneStats = (project) => `
  <div class="crm-stats">
    ${project.metrics
      .map(
        (metric) => `
          <article class="crm-stat">
            <strong>${escapeHtml(metric.value)}</strong>
            ${i18nText(metric.label, "span", "real-copy")}
          </article>
        `
      )
      .join("")}
  </div>
`;

const renderStandaloneImpactCards = (project) => `
  <div class="feature-grid">
    ${project.impact
      .map(
        (item, index) => `
          <article class="interactive-card">
            <span class="tag">0${index + 1}</span>
            ${i18nText(item, "p", "real-copy")}
          </article>
        `
      )
      .join("")}
  </div>
`;

const renderStandaloneLeadForm = ({ title, button, fields = [], selectOptions = [] }) => `
  <form class="stack" data-demo-form>
    ${i18nText(title, "h3", "card-title")}
    ${fields
      .map(
        (field) => `<input class="estate-input" type="${field.type || "text"}" ${placeholderAttrs(field.en, field.ar)} required>`
      )
      .join("")}
    ${
      selectOptions.length
        ? `<select class="estate-select">${selectOptions.map((option) => `<option>${escapeHtml(option)}</option>`).join("")}</select>`
        : ""
    }
    <button class="button button-accent" type="submit">${i18nText(button)}</button>
    <div class="form-result" ${demoFormResultAttrs()} data-form-result hidden></div>
  </form>
`;

const renderLaunchStandalone = (project, config) => {
  const content = `
    <div class="real-demo">
      <div class="real-shell">
        <section class="real-hero">
          <div class="real-panel estate-hero-card">
            <div class="real-menu">
              <strong>${escapeHtml(config.brand)}</strong>
              <nav aria-label="${escapeHtml(config.brand)} navigation">
                ${config.nav
                  .map((item) => `<a class="real-link" href="${escapeHtml(item.href)}">${i18nText(item.label)}</a>`)
                  .join("")}
              </nav>
            </div>
            <div class="stack">
              ${i18nText(config.eyebrow, "span", "eyebrow")}
              ${i18nText(config.headline, "h1", "real-title")}
              ${i18nText(project.summary, "p", "real-copy")}
              <div class="inline-actions">
                <a class="button button-accent" href="#lead">${i18nText(config.primary)}</a>
                <a class="button-secondary" href="#proof">${i18nText(config.secondary)}</a>
              </div>
            </div>
            <div class="real-card stack">
              ${i18nText(config.quickTitle, "h3", "card-title")}
              <div class="estimate-grid">
                ${config.quickItems
                  .map(
                    (item) => `
                      <div class="estate-field">
                        <span>${i18nText(item.label)}</span>
                        <select class="estate-select">${item.options.map((option) => `<option>${escapeHtml(option)}</option>`).join("")}</select>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </div>
          <div class="real-panel estate-visual" aria-label="${escapeHtml(config.brand)} visual preview">
            <div class="estate-towers" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
            <div class="estate-caption">
              ${i18nText(config.visualTitle, "strong")}
              ${i18nText(project.challenge, "p", "real-copy")}
            </div>
          </div>
        </section>

        <section class="real-panel stack" id="proof">
          <div class="section-head">
            ${i18nText(config.proofTitle, "h2", "section-title")}
            ${i18nText(project.solution, "p", "real-copy")}
          </div>
          ${renderStandaloneStats(project)}
          ${renderStandaloneImpactCards(project)}
        </section>

        <section class="estate-info-grid">
          ${config.sections
            .map(
              (section, index) => `
                <article class="real-panel stack">
                  <span class="tag">0${index + 1}</span>
                  ${i18nText(section.title, "h2", "card-title")}
                  ${i18nText(section.body, "p", "real-copy")}
                </article>
              `
            )
            .join("")}
          <article class="real-panel stack" id="lead">
            ${renderStandaloneLeadForm(config.form)}
          </article>
        </section>
      </div>
    </div>
  `;

  return renderDemoShell({
    title: config.title,
    description: text(project.summary, "en"),
    content,
    ...standaloneShellOptions({ brandLabel: config.brand, footerLabel: config.footer }),
  });
};

const renderMobileStandalone = (project, config) => {
  const content = `
    <div class="real-demo">
      <div class="real-shell">
        <section class="real-hero">
          <div class="real-panel estate-hero-card">
            <div class="real-menu">
              <strong>${escapeHtml(config.brand)}</strong>
              <nav aria-label="${escapeHtml(config.brand)} navigation">
                <a class="real-link" href="#app">${i18nText({ en: "App", ar: "التطبيق" })}</a>
                <a class="real-link" href="#modules">${i18nText({ en: "Modules", ar: "الوحدات" })}</a>
                <a class="real-link" href="#request">${i18nText({ en: "Request", ar: "طلب" })}</a>
              </nav>
            </div>
            <div class="stack">
              ${i18nText(config.eyebrow, "span", "eyebrow")}
              ${i18nText(config.headline, "h1", "real-title")}
              ${i18nText(project.summary, "p", "real-copy")}
              <div class="inline-actions">
                <a class="button button-accent" href="#app">${i18nText({ en: "Open app preview", ar: "افتح معاينة التطبيق" })}</a>
                <a class="button-secondary" href="#request">${i18nText({ en: "Request access", ar: "اطلب الوصول" })}</a>
              </div>
            </div>
            ${renderStandaloneStats(project)}
          </div>

          <section class="phone-stage" id="app">
            <div class="app-phone">
              <div class="phone-content">
                <div class="phone-topline">
                  <strong>${escapeHtml(config.brand)}</strong>
                  <span class="status">${escapeHtml(project.stack[0] || "App")}</span>
                </div>
                <div class="inline-actions">
                  <button class="screen-button is-active" type="button" data-phone-target="home">${i18nText(config.tabs[0])}</button>
                  <button class="screen-button" type="button" data-phone-target="booking">${i18nText(config.tabs[1])}</button>
                  <button class="screen-button" type="button" data-phone-target="messages">${i18nText(config.tabs[2])}</button>
                </div>
                <div class="phone-view stack" data-phone-view="home">
                  <article class="interactive-card">
                    ${i18nText(config.phoneHome, "h3", "card-title")}
                    ${i18nText(project.solution, "p", "real-copy")}
                  </article>
                  <div class="data-table">
                    ${config.items
                      .map(
                        (item, index) => `
                          <div class="data-row" data-row-status="active">
                            ${i18nText(item, "span")}
                            <span>${escapeHtml(project.stack[index % project.stack.length] || "Module")}</span>
                            <span class="status">${i18nPlain("active")}</span>
                          </div>
                        `
                      )
                      .join("")}
                  </div>
                </div>
                <div class="phone-view stack" data-phone-view="booking" hidden>
                  ${renderBookingTools(project)}
                </div>
                <div class="phone-view stack" data-phone-view="messages" hidden>
                  ${renderStandaloneImpactCards(project)}
                </div>
              </div>
            </div>
          </section>
        </section>

        <section class="real-panel stack" id="modules">
          <div class="section-head">
            ${i18nText(config.modulesTitle, "h2", "section-title")}
            ${i18nText(project.challenge, "p", "real-copy")}
          </div>
          ${renderStandaloneImpactCards(project)}
        </section>

        <section class="estate-info-grid" id="request">
          <article class="real-panel stack">
            ${renderStandaloneLeadForm(config.form)}
          </article>
          <article class="real-panel stack">
            ${i18nText({ en: "Operating workflow", ar: "مسار التشغيل" }, "h2", "card-title")}
            <div class="timeline">
              ${config.workflow
                .map(
                  (item) => `
                    <div class="timeline-row">
                      ${i18nText(item.title, "strong")}
                      ${i18nText(item.body, "span")}
                    </div>
                  `
                )
                .join("")}
            </div>
          </article>
          <article class="real-panel stack">
            ${i18nText({ en: "Stack", ar: "التقنيات" }, "h2", "card-title")}
            <div class="chip-row">${renderDemoChips(project.stack, "chip")}</div>
          </article>
        </section>
      </div>
    </div>
  `;

  return renderDemoShell({
    title: config.title,
    description: text(project.summary, "en"),
    content,
    ...standaloneShellOptions({ brandLabel: config.brand, footerLabel: config.footer }),
  });
};

const renderOpsStandalone = (project, config) => {
  const stages = config.stages;
  const records = config.records;
  const board = stages
    .map(
      (stage) => `
        <div class="pipeline-stage">
          <div class="crm-stage-head">
            ${i18nText(stage.label, "strong")}
            <span class="status">${records.filter((record) => record.stage === stage.key).length}</span>
          </div>
          ${records
            .filter((record) => record.stage === stage.key)
            .map(
              (record, index) => `
                <button class="lead-card${index === 0 && stage.key === stages[0].key ? " is-active" : ""}" type="button" data-lead-card data-name="${escapeHtml(record.name)}" data-project="${escapeHtml(record.detail)}" data-source="${escapeHtml(record.source)}" data-next="${escapeHtml(record.next)}">
                  <strong>${escapeHtml(record.name)}</strong>
                  <span class="real-copy">${escapeHtml(record.detail)}</span>
                  <span class="lead-meta"><span>${escapeHtml(record.source)}</span><span class="lead-score">${escapeHtml(record.score)}</span></span>
                </button>
              `
            )
            .join("")}
        </div>
      `
    )
    .join("");

  const firstRecord = records[0];
  const content = `
    <div class="real-demo">
      <div class="real-shell crm-workspace">
        <aside class="crm-panel crm-sidebar">
          <div class="stack">
            <strong>${escapeHtml(config.brand)}</strong>
            ${i18nText(config.sidebar, "p", "real-copy")}
          </div>
          <button class="side-button is-active" type="button" data-tab-target="workspace">${i18nText({ en: "Board", ar: "اللوحة" })}</button>
          <button class="side-button" type="button" data-tab-target="reports">${i18nText({ en: "Reports", ar: "التقارير" })}</button>
          <button class="side-button" type="button" data-tab-target="settings">${i18nText({ en: "Rules", ar: "القواعد" })}</button>
        </aside>
        <main class="stack">
          <section class="crm-panel stack">
            ${i18nText(config.eyebrow, "span", "eyebrow")}
            ${i18nText(config.headline, "h1", "real-title")}
            ${i18nText(project.summary, "p", "real-copy")}
            ${renderStandaloneStats(project)}
          </section>

          <section class="app-view crm-view-grid" data-app-view="workspace">
            <div class="crm-panel stack">
              <div class="section-head">
                ${i18nText(config.boardTitle, "h2", "section-title")}
                ${i18nText(project.solution, "p", "real-copy")}
              </div>
              <div class="pipeline-board">${board}</div>
            </div>
            <aside class="crm-panel stack">
              ${i18nText(config.detailTitle, "h2", "card-title")}
              <div class="lead-detail">
                <strong data-lead-name>${escapeHtml(firstRecord.name)}</strong>
                <div class="contact-line"><span>${i18nText({ en: "Record", ar: "السجل" })}</span><strong data-lead-project>${escapeHtml(firstRecord.detail)}</strong></div>
                <div class="contact-line"><span>${i18nText({ en: "Source", ar: "المصدر" })}</span><strong data-lead-source>${escapeHtml(firstRecord.source)}</strong></div>
                <div class="contact-line"><span>${i18nText({ en: "Next", ar: "التالي" })}</span><strong data-lead-next>${escapeHtml(firstRecord.next)}</strong></div>
              </div>
              <form class="stack" data-demo-form>
                <input class="crm-input" type="text" ${placeholderAttrs(config.notePlaceholder.en, config.notePlaceholder.ar)}>
                <button class="button" type="submit">${i18nText({ en: "Save update", ar: "حفظ التحديث" })}</button>
                <div class="form-result" ${demoFormResultAttrs()} data-form-result hidden></div>
              </form>
            </aside>
          </section>

          <section class="app-view crm-panel stack" data-app-view="reports" hidden>
            ${i18nText({ en: "Operations performance", ar: "أداء التشغيل" }, "h2", "section-title")}
            <div class="chart-card"><span style="height: 64%;"></span><span style="height: 48%;"></span><span style="height: 72%;"></span><span style="height: 86%;"></span><span style="height: 59%;"></span><span style="height: 93%;"></span></div>
            ${renderStandaloneImpactCards(project)}
          </section>

          <section class="app-view crm-panel stack" data-app-view="settings" hidden>
            ${i18nText({ en: "Automation rules", ar: "قواعد الأتمتة" }, "h2", "section-title")}
            ${renderStandaloneImpactCards({ ...project, impact: config.rules })}
          </section>
        </main>
      </div>
    </div>
  `;

  return renderDemoShell({
    title: config.title,
    description: text(project.summary, "en"),
    content,
    ...standaloneShellOptions({ brandLabel: config.brand, footerLabel: config.footer }),
  });
};

const renderHealthcareBookingStandalone = (project, config) => {
  const content = `
    <div class="real-demo">
      <div class="real-shell">
        <section class="real-hero">
          <div class="real-panel estate-hero-card">
            <div class="real-menu">
              <strong>${escapeHtml(config.brand)}</strong>
              <nav aria-label="${escapeHtml(config.brand)} navigation">
                <a class="real-link" href="#services">${i18nText({ en: "Services", ar: "الخدمات" })}</a>
                <a class="real-link" href="#booking">${i18nText({ en: "Booking", ar: "الحجز" })}</a>
                <a class="real-link" href="#branches">${i18nText({ en: "Branches", ar: "الفروع" })}</a>
              </nav>
            </div>
            <div class="stack">
              ${i18nText(config.eyebrow, "span", "eyebrow")}
              ${i18nText(config.headline, "h1", "real-title")}
              ${i18nText(project.summary, "p", "real-copy")}
              <div class="inline-actions">
                <a class="button button-accent" href="#booking">${i18nText({ en: "Book now", ar: "احجز الآن" })}</a>
                <a class="button-secondary" href="#services">${i18nText({ en: "View services", ar: "عرض الخدمات" })}</a>
              </div>
            </div>
            ${renderStandaloneStats(project)}
          </div>
          <div class="real-panel stack">
            ${i18nText(config.bookingTitle, "h2", "section-title")}
            ${renderBookingTools(project)}
            <form class="stack" data-demo-form>
              <input class="estate-input" type="text" ${placeholderAttrs("Patient name", "اسم المريض")} required>
              <input class="estate-input" type="tel" ${placeholderAttrs("Mobile number", "رقم الموبايل")} required>
              <select class="estate-select">${config.services.map((service) => `<option>${escapeHtml(service)}</option>`).join("")}</select>
              <button class="button button-accent" type="submit">${i18nText({ en: "Confirm request", ar: "تأكيد الطلب" })}</button>
              <div class="form-result" ${demoFormResultAttrs()} data-form-result hidden></div>
            </form>
          </div>
        </section>

        <section class="real-panel stack" id="services">
          <div class="section-head">
            ${i18nText(config.servicesTitle, "h2", "section-title")}
            ${i18nText(project.solution, "p", "real-copy")}
          </div>
          <div class="unit-grid">
            ${config.services
              .map(
                (service, index) => `
                  <article class="property-card">
                    <div class="property-media${index % 2 ? " dark" : ""}">
                      <span class="tag">${index + 1}</span>
                    </div>
                    <div class="property-body">
                      <h3 class="card-title">${escapeHtml(service)}</h3>
                      ${i18nText(project.impact[index % project.impact.length], "p", "real-copy")}
                      <a class="button-secondary" href="#booking">${i18nText({ en: "Choose service", ar: "اختر الخدمة" })}</a>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>

        <section class="estate-info-grid" id="branches">
          ${config.branches
            .map(
              (branch) => `
                <article class="real-panel stack">
                  ${i18nText(branch.name, "h2", "card-title")}
                  ${i18nText(branch.body, "p", "real-copy")}
                  <div class="floor-plan">
                    <span class="floor-room wide">${i18nText({ en: "Reception", ar: "استقبال" })}</span>
                    <span class="floor-room">${i18nText({ en: "Room 1", ar: "غرفة 1" })}</span>
                    <span class="floor-room">${i18nText({ en: "Room 2", ar: "غرفة 2" })}</span>
                    <span class="floor-room wide">${i18nText({ en: "Available today", ar: "متاح اليوم" })}</span>
                  </div>
                </article>
              `
            )
            .join("")}
          <article class="real-panel stack" id="booking">
            ${i18nText({ en: "Fast intake", ar: "تسجيل سريع" }, "h2", "card-title")}
            ${renderStandaloneLeadForm(config.form)}
          </article>
        </section>
      </div>
    </div>
  `;

  return renderDemoShell({
    title: config.title,
    description: text(project.summary, "en"),
    content,
    ...standaloneShellOptions({ brandLabel: config.brand, footerLabel: config.footer }),
  });
};

const renderBlueHarborStandalone = (project) =>
  renderLaunchStandalone(project, {
    brand: "Blue Harbor",
    title: "Blue Harbor | Launch Page",
    footer: "Blue Harbor launch experience.",
    eyebrow: { en: "Coastal launch", ar: "إطلاق ساحلي" },
    headline: { en: "Reserve early access before the sales center opens.", ar: "احجز اهتمامك قبل افتتاح مركز المبيعات." },
    primary: { en: "Reserve interest", ar: "سجل اهتمامك" },
    secondary: { en: "See proof", ar: "شاهد التفاصيل" },
    visualTitle: { en: "Campaign-ready landing page", ar: "صفحة جاهزة للحملات" },
    proofTitle: { en: "Launch proof points", ar: "نقاط قوة الإطلاق" },
    quickTitle: { en: "Find your launch fit", ar: "حدد اختيارك المبدئي" },
    nav: [
      { href: "#proof", label: { en: "Benefits", ar: "المزايا" } },
      { href: "#lead", label: { en: "Reserve", ar: "الحجز" } },
    ],
    quickItems: [
      { label: { en: "Unit type", ar: "نوع الوحدة" }, options: ["Chalet", "Twin house", "Cabana"] },
      { label: { en: "Budget", ar: "الميزانية" }, options: ["EGP 4M - 7M", "EGP 7M - 12M", "EGP 12M+"] },
      { label: { en: "Visit timing", ar: "موعد الزيارة" }, options: ["This week", "Weekend", "Online first"] },
    ],
    sections: [
      { title: { en: "Message testing", ar: "اختبار الرسائل" }, body: { en: "The page separates offer angles so campaigns can learn which promise attracts serious buyers.", ar: "الصفحة تفصل زوايا العرض لمعرفة الرسالة التي تجذب المهتمين الجادين." } },
      { title: { en: "WhatsApp handoff", ar: "تحويل واتساب" }, body: { en: "Every request carries budget, timing, and preferred unit context before the first conversation.", ar: "كل طلب يحمل الميزانية والموعد ونوع الوحدة قبل أول محادثة." } },
    ],
    form: {
      title: { en: "Reserve launch priority", ar: "احجز أولوية الإطلاق" },
      button: { en: "Send reservation request", ar: "إرسال طلب الحجز" },
      fields: [
        { en: "Full name", ar: "الاسم بالكامل" },
        { en: "Mobile number", ar: "رقم الموبايل", type: "tel" },
      ],
      selectOptions: ["Chalet preview", "Twin house preview", "Investment call"],
    },
  });

const renderCompoundScoutStandalone = (project) =>
  renderMobileStandalone(project, {
    brand: "Compound Scout",
    title: "Compound Scout | Field Sales App",
    footer: "Compound Scout mobile app.",
    eyebrow: { en: "Field sales app", ar: "تطبيق مبيعات ميداني" },
    headline: { en: "Show units, save notes, and share a shortlist on the visit.", ar: "اعرض الوحدات واحفظ الملاحظات وشارك قائمة مختصرة أثناء الزيارة." },
    tabs: [
      { en: "Units", ar: "الوحدات" },
      { en: "Visit", ar: "الزيارة" },
      { en: "Share", ar: "المشاركة" },
    ],
    phoneHome: { en: "Today shortlist", ar: "القائمة المختصرة اليوم" },
    modulesTitle: { en: "Rep tools", ar: "أدوات المندوب" },
    items: [
      { en: "Filter by budget and handover date", ar: "فلترة حسب الميزانية والتسليم" },
      { en: "Create visit notes per prospect", ar: "تسجيل ملاحظات لكل عميل" },
      { en: "Share selected units by message", ar: "مشاركة الوحدات المختارة برسالة" },
    ],
    workflow: [
      { title: { en: "Prepare", ar: "تجهيز" }, body: { en: "Build a shortlist before arriving.", ar: "تجهيز قائمة قصيرة قبل الوصول." } },
      { title: { en: "Present", ar: "عرض" }, body: { en: "Open unit cards with fast details.", ar: "فتح بطاقات الوحدات بتفاصيل سريعة." } },
      { title: { en: "Follow up", ar: "متابعة" }, body: { en: "Save interest signals after the visit.", ar: "حفظ مؤشرات الاهتمام بعد الزيارة." } },
    ],
    form: {
      title: { en: "Request app access", ar: "اطلب وصول للتطبيق" },
      button: { en: "Create demo account", ar: "إنشاء حساب تجريبي" },
      fields: [
        { en: "Rep name", ar: "اسم المندوب" },
        { en: "Sales team", ar: "فريق المبيعات" },
      ],
      selectOptions: ["North Coast inventory", "New Cairo inventory", "West Cairo inventory"],
    },
  });

const renderRentalOpsStandalone = (project) =>
  renderOpsStandalone(project, {
    brand: "Rental Ops",
    title: "Rental Ops | Property Management Dashboard",
    footer: "Rental Ops dashboard.",
    sidebar: { en: "Unit, tenant, maintenance, and billing operations.", ar: "تشغيل الوحدات والمستأجرين والصيانة والفواتير." },
    eyebrow: { en: "Property operations", ar: "تشغيل عقاري" },
    headline: { en: "Track every tenant request from call to close.", ar: "تابع كل طلب من المكالمة حتى الإغلاق." },
    boardTitle: { en: "Maintenance board", ar: "لوحة الصيانة" },
    detailTitle: { en: "Unit record", ar: "سجل الوحدة" },
    notePlaceholder: { en: "Add technician update", ar: "أضف تحديث الفني" },
    stages: [
      { key: "new", label: { en: "New", ar: "جديد" } },
      { key: "working", label: { en: "Working", ar: "قيد التنفيذ" } },
      { key: "closed", label: { en: "Closed", ar: "مغلق" } },
    ],
    records: [
      { name: "A-204 AC leak", detail: "Tenant: Nour Adel", source: "Phone", next: "Assign technician", stage: "new", score: "High" },
      { name: "B-118 renewal", detail: "Lease ends in 12 days", source: "System", next: "Send renewal offer", stage: "new", score: "Due" },
      { name: "C-310 plumbing", detail: "Kitchen sink follow-up", source: "WhatsApp", next: "Upload invoice", stage: "working", score: "Open" },
      { name: "D-502 inspection", detail: "Move-out checklist", source: "Manager", next: "Archive report", stage: "closed", score: "Done" },
    ],
    rules: [
      { en: "Escalate high-priority maintenance if no update lands within 24 hours.", ar: "تصعيد طلبات الصيانة المهمة إذا لم يحدث تحديث خلال 24 ساعة." },
      { en: "Create renewal reminders 30, 14, and 7 days before lease end.", ar: "إنشاء تذكيرات تجديد قبل نهاية العقد بـ30 و14 و7 أيام." },
      { en: "Attach every invoice to the unit history before closure.", ar: "ربط كل فاتورة بسجل الوحدة قبل الإغلاق." },
    ],
  });

const renderClinicBookingProStandalone = (project) =>
  renderHealthcareBookingStandalone(project, {
    brand: "Clinic Booking Pro",
    title: "Clinic Booking Pro | Appointment Site",
    footer: "Clinic Booking Pro appointment flow.",
    eyebrow: { en: "Clinic booking", ar: "حجز عيادات" },
    headline: { en: "Book the right doctor without calling three numbers.", ar: "احجز الطبيب المناسب بدون الاتصال بثلاثة أرقام." },
    bookingTitle: { en: "Choose an available day", ar: "اختر يومًا متاحًا" },
    servicesTitle: { en: "Specialties", ar: "التخصصات" },
    services: ["Dermatology", "Nutrition", "Orthopedics"],
    branches: [
      { name: { en: "Downtown branch", ar: "فرع وسط البلد" }, body: { en: "Fast access for consultations and first visits.", ar: "وصول سريع للاستشارات والزيارات الأولى." } },
      { name: { en: "New Cairo branch", ar: "فرع القاهرة الجديدة" }, body: { en: "Extended evening schedule for working patients.", ar: "مواعيد مسائية أطول للمرضى العاملين." } },
    ],
    form: {
      title: { en: "Send booking intake", ar: "إرسال بيانات الحجز" },
      button: { en: "Submit booking", ar: "إرسال الحجز" },
      fields: [
        { en: "Patient name", ar: "اسم المريض" },
        { en: "Mobile number", ar: "رقم الموبايل", type: "tel" },
      ],
      selectOptions: ["First visit", "Follow-up", "Online consultation"],
    },
  });

const renderDentalBranchStandalone = (project) =>
  renderHealthcareBookingStandalone(project, {
    brand: "Bright Dental",
    title: "Bright Dental | Branch Site",
    footer: "Bright Dental branch site.",
    eyebrow: { en: "Dental branches", ar: "فروع أسنان" },
    headline: { en: "Pick the nearest branch and the right treatment path.", ar: "اختر أقرب فرع ومسار العلاج المناسب." },
    bookingTitle: { en: "Available appointment slots", ar: "المواعيد المتاحة" },
    servicesTitle: { en: "Dental services", ar: "خدمات الأسنان" },
    services: ["Implants", "Whitening", "Braces"],
    branches: [
      { name: { en: "Nasr City", ar: "مدينة نصر" }, body: { en: "Family dental care and orthodontic consultations.", ar: "رعاية عائلية واستشارات تقويم." } },
      { name: { en: "Maadi", ar: "المعادي" }, body: { en: "Cosmetic dentistry and implant planning.", ar: "تجميل الأسنان وتخطيط الزراعة." } },
    ],
    form: {
      title: { en: "Route me to a branch", ar: "وجهني للفرع المناسب" },
      button: { en: "Request a call", ar: "اطلب اتصال" },
      fields: [
        { en: "Full name", ar: "الاسم بالكامل" },
        { en: "Phone", ar: "الهاتف", type: "tel" },
      ],
      selectOptions: ["Nearest branch", "Implants consultation", "Whitening offer"],
    },
  });

const renderTelehealthStandalone = (project) =>
  renderMobileStandalone(project, {
    brand: "Telehealth Suite",
    title: "Telehealth Suite | Patient App",
    footer: "Telehealth patient app.",
    eyebrow: { en: "Remote care", ar: "رعاية عن بعد" },
    headline: { en: "Book, prepare, and follow your consultation in one app.", ar: "احجز وجهز وتابع الاستشارة من تطبيق واحد." },
    tabs: [
      { en: "Session", ar: "الجلسة" },
      { en: "Calendar", ar: "التقويم" },
      { en: "Files", ar: "الملفات" },
    ],
    phoneHome: { en: "Next consultation", ar: "الاستشارة القادمة" },
    modulesTitle: { en: "Patient journey", ar: "رحلة المريض" },
    items: [
      { en: "Upload documents before the session", ar: "رفع المستندات قبل الجلسة" },
      { en: "Receive preparation reminders", ar: "استقبال تذكيرات التجهيز" },
      { en: "Track recommendations after the call", ar: "متابعة التوصيات بعد المكالمة" },
    ],
    workflow: [
      { title: { en: "Book", ar: "حجز" }, body: { en: "Pick a doctor and session time.", ar: "اختيار الطبيب ووقت الجلسة." } },
      { title: { en: "Prepare", ar: "تجهيز" }, body: { en: "Upload files and answer intake questions.", ar: "رفع الملفات والإجابة على الأسئلة." } },
      { title: { en: "Follow", ar: "متابعة" }, body: { en: "Review notes and next steps.", ar: "مراجعة الملاحظات والخطوات التالية." } },
    ],
    form: {
      title: { en: "Request patient access", ar: "اطلب وصول المريض" },
      button: { en: "Send access link", ar: "إرسال رابط الدخول" },
      fields: [
        { en: "Patient name", ar: "اسم المريض" },
        { en: "Mobile number", ar: "رقم الموبايل", type: "tel" },
      ],
      selectOptions: ["General medicine", "Follow-up session", "File review"],
    },
  });

const renderLabBookingStandalone = (project) =>
  renderOpsStandalone(project, {
    brand: "Lab Booking",
    title: "Lab Booking | Home Visit System",
    footer: "Lab Booking system.",
    sidebar: { en: "Home visits, samples, payment, and result delivery.", ar: "زيارات منزلية وعينات وسداد وتسليم نتائج." },
    eyebrow: { en: "Diagnostic lab operations", ar: "تشغيل مختبر تحاليل" },
    headline: { en: "Move home test requests through one clean board.", ar: "انقل طلبات التحاليل المنزلية داخل لوحة واضحة." },
    boardTitle: { en: "Sample tracking board", ar: "لوحة تتبع العينات" },
    detailTitle: { en: "Visit detail", ar: "تفاصيل الزيارة" },
    notePlaceholder: { en: "Add sample note", ar: "أضف ملاحظة العينة" },
    stages: [
      { key: "requested", label: { en: "Requested", ar: "مطلوب" } },
      { key: "visit", label: { en: "Visit", ar: "زيارة" } },
      { key: "results", label: { en: "Results", ar: "نتائج" } },
    ],
    records: [
      { name: "CBC + Lipid", detail: "Home visit - Maadi", source: "Website", next: "Confirm payment", stage: "requested", score: "New" },
      { name: "Thyroid panel", detail: "Home visit - Nasr City", source: "Call center", next: "Collector on route", stage: "visit", score: "Live" },
      { name: "Vitamin D", detail: "Branch pickup", source: "WhatsApp", next: "Upload result PDF", stage: "results", score: "Ready" },
      { name: "PCR bundle", detail: "Corporate request", source: "Email", next: "Send invoice", stage: "requested", score: "Bulk" },
    ],
    rules: [
      { en: "Send customer status updates at request, collection, and result-ready stages.", ar: "إرسال تحديثات للعميل عند الطلب وسحب العينة وجاهزية النتائج." },
      { en: "Prevent duplicate home visits in the same area and time window.", ar: "منع تكرار الزيارات المنزلية في نفس المنطقة ونفس الوقت." },
      { en: "Flag unpaid requests before collector dispatch.", ar: "تمييز الطلبات غير المسددة قبل خروج المندوب." },
    ],
  });

const renderMedicalFunnelStandalone = (project) =>
  renderLaunchStandalone(project, {
    brand: "Aesthetic Funnel",
    title: "Aesthetic Funnel | Medical Campaign",
    footer: "Aesthetic clinic funnel.",
    eyebrow: { en: "Medical conversion funnel", ar: "فانل طبي للتحويل" },
    headline: { en: "Turn one treatment campaign into qualified bookings.", ar: "حوّل حملة علاج واحد إلى حجوزات مؤهلة." },
    primary: { en: "Check eligibility", ar: "تحقق من الملاءمة" },
    secondary: { en: "View proof", ar: "شاهد الإثبات" },
    visualTitle: { en: "Service-specific landing flow", ar: "مسار مخصص للخدمة" },
    proofTitle: { en: "Conversion assets", ar: "عناصر التحويل" },
    quickTitle: { en: "Treatment matcher", ar: "اختيار الخدمة" },
    nav: [
      { href: "#proof", label: { en: "Proof", ar: "الإثبات" } },
      { href: "#lead", label: { en: "Eligibility", ar: "الملاءمة" } },
    ],
    quickItems: [
      { label: { en: "Concern", ar: "الاحتياج" }, options: ["Skin tightening", "Acne scars", "Body contouring"] },
      { label: { en: "Timeline", ar: "الوقت" }, options: ["This week", "This month", "Just comparing"] },
      { label: { en: "Preferred contact", ar: "التواصل" }, options: ["WhatsApp", "Phone call", "Clinic visit"] },
    ],
    sections: [
      { title: { en: "Trust section", ar: "قسم الثقة" }, body: { en: "Proof, expectations, and FAQs reduce hesitation before the first call.", ar: "الإثبات والتوقعات والأسئلة تقلل التردد قبل أول مكالمة." } },
      { title: { en: "Lead qualification", ar: "تأهيل العميل" }, body: { en: "The form captures service interest and seriousness before the coordinator replies.", ar: "النموذج يجمع الاهتمام والجدية قبل رد المنسق." } },
    ],
    form: {
      title: { en: "Check treatment fit", ar: "تحقق من مناسبة الخدمة" },
      button: { en: "Send eligibility request", ar: "إرسال طلب الملاءمة" },
      fields: [
        { en: "Full name", ar: "الاسم بالكامل" },
        { en: "Mobile number", ar: "رقم الموبايل", type: "tel" },
      ],
      selectOptions: ["Skin consultation", "Body contouring", "Laser package"],
    },
  });

const standaloneProjectConfigs = {
  "tutor-booking-app": {
    type: "mobile",
    config: {
      brand: "Tutor Match",
      title: "Tutor Match | Booking App",
      footer: "Tutor Match booking app.",
      eyebrow: { en: "Tutor booking", ar: "حجز مدرسين" },
      headline: { en: "Match parents with the right tutor in minutes.", ar: "طابق ولي الأمر مع المدرس المناسب خلال دقائق." },
      tabs: [
        { en: "Tutors", ar: "المدرسون" },
        { en: "Slots", ar: "المواعيد" },
        { en: "Requests", ar: "الطلبات" },
      ],
      phoneHome: { en: "Recommended tutors", ar: "مدرسون مرشحون" },
      modulesTitle: { en: "Matching workflow", ar: "مسار المطابقة" },
      items: [
        { en: "Filter by subject, level, and district", ar: "فلترة حسب المادة والمرحلة والمنطقة" },
        { en: "Compare tutor availability and fees", ar: "مقارنة المواعيد والأسعار" },
        { en: "Track every parent request", ar: "متابعة كل طلب من ولي الأمر" },
      ],
      workflow: [
        { title: { en: "Request", ar: "طلب" }, body: { en: "Parent sends subject and timing.", ar: "ولي الأمر يرسل المادة والوقت." } },
        { title: { en: "Match", ar: "مطابقة" }, body: { en: "System recommends fitting tutors.", ar: "النظام يرشح المدرسين المناسبين." } },
        { title: { en: "Confirm", ar: "تأكيد" }, body: { en: "Team confirms trial session.", ar: "الفريق يؤكد الحصة التجريبية." } },
      ],
      form: {
        title: { en: "Create parent request", ar: "إنشاء طلب ولي أمر" },
        button: { en: "Find tutor", ar: "ابحث عن مدرس" },
        fields: [
          { en: "Parent name", ar: "اسم ولي الأمر" },
          { en: "Student level", ar: "مرحلة الطالب" },
        ],
        selectOptions: ["Math", "English", "Science"],
      },
    },
  },
  "academy-learning-hub": {
    type: "launch",
    config: {
      brand: "Academy Hub",
      title: "Academy Hub | Learning Tracks",
      footer: "Academy Hub learning site.",
      eyebrow: { en: "Learning tracks", ar: "مسارات تعليمية" },
      headline: { en: "Choose the right course path without getting lost.", ar: "اختر المسار التعليمي المناسب بدون تشتت." },
      primary: { en: "Find my track", ar: "حدد مساري" },
      secondary: { en: "Compare tracks", ar: "قارن المسارات" },
      visualTitle: { en: "Course map built for enrollment", ar: "خريطة كورسات مبنية للتسجيل" },
      proofTitle: { en: "Why learners convert", ar: "لماذا يسجل المتعلمون" },
      quickTitle: { en: "Track finder", ar: "محدد المسار" },
      nav: [
        { href: "#proof", label: { en: "Tracks", ar: "المسارات" } },
        { href: "#lead", label: { en: "Enroll", ar: "التسجيل" } },
      ],
      quickItems: [
        { label: { en: "Goal", ar: "الهدف" }, options: ["Career shift", "Skill upgrade", "Exam prep"] },
        { label: { en: "Level", ar: "المستوى" }, options: ["Beginner", "Intermediate", "Advanced"] },
        { label: { en: "Format", ar: "الشكل" }, options: ["Live", "Recorded", "Hybrid"] },
      ],
      sections: [
        { title: { en: "Comparison cards", ar: "بطاقات مقارنة" }, body: { en: "Visitors can compare outcomes, duration, and next steps for each track.", ar: "الزائر يقارن النتائج والمدة والخطوة التالية لكل مسار." } },
        { title: { en: "Advice funnel", ar: "مسار استشارة" }, body: { en: "Unsure learners can request guidance instead of leaving the page.", ar: "المتعلم غير المتأكد يطلب استشارة بدل مغادرة الصفحة." } },
      ],
      form: {
        title: { en: "Get course advice", ar: "احصل على ترشيح كورس" },
        button: { en: "Send advice request", ar: "إرسال طلب الترشيح" },
        fields: [
          { en: "Learner name", ar: "اسم المتعلم" },
          { en: "Learning goal", ar: "هدف التعلم" },
        ],
        selectOptions: ["Business English", "Data analysis", "Marketing fundamentals"],
      },
    },
  },
  "school-parent-portal": {
    type: "ops",
    config: {
      brand: "Parent Portal",
      title: "Parent Portal | School Workspace",
      footer: "School parent portal.",
      sidebar: { en: "Fees, documents, updates, and parent requests.", ar: "رسوم ومستندات وتحديثات وطلبات أولياء الأمور." },
      eyebrow: { en: "School portal", ar: "بوابة مدرسية" },
      headline: { en: "Keep parents informed from one clean portal.", ar: "أبقِ أولياء الأمور على اطلاع من بوابة واحدة." },
      boardTitle: { en: "Parent request board", ar: "لوحة طلبات أولياء الأمور" },
      detailTitle: { en: "Request detail", ar: "تفاصيل الطلب" },
      notePlaceholder: { en: "Add admin update", ar: "أضف تحديث الإدارة" },
      stages: [
        { key: "new", label: { en: "New", ar: "جديد" } },
        { key: "review", label: { en: "Review", ar: "مراجعة" } },
        { key: "done", label: { en: "Done", ar: "تم" } },
      ],
      records: [
        { name: "Bus subscription", detail: "Grade 4 - Omar", source: "Parent portal", next: "Confirm route", stage: "new", score: "New" },
        { name: "Fee receipt", detail: "KG2 - Laila", source: "Finance", next: "Upload receipt", stage: "review", score: "Open" },
        { name: "Missing document", detail: "Grade 2 - Adam", source: "Admission", next: "Notify parent", stage: "review", score: "Due" },
        { name: "Trip approval", detail: "Grade 6", source: "Activities", next: "Archive approval", stage: "done", score: "Done" },
      ],
      rules: [
        { en: "Send parent reminders for missing documents every three days.", ar: "إرسال تذكير للمستندات الناقصة كل ثلاثة أيام." },
        { en: "Route finance requests to the accounting team.", ar: "توجيه طلبات الرسوم إلى الحسابات." },
        { en: "Close resolved requests with a parent-visible update.", ar: "إغلاق الطلبات بتحديث ظاهر لولي الأمر." },
      ],
    },
  },
  "executive-profile-site": {
    type: "launch",
    config: {
      brand: "Executive Profile",
      title: "Executive Profile | Consulting Site",
      footer: "Executive Profile consulting site.",
      eyebrow: { en: "Consulting profile", ar: "بروفايل استشاري" },
      headline: { en: "Turn a company PDF into a living sales profile.", ar: "حوّل ملف الشركة إلى بروفايل حي للبيع." },
      primary: { en: "View services", ar: "عرض الخدمات" },
      secondary: { en: "Proof points", ar: "نقاط الإثبات" },
      visualTitle: { en: "Service story, sectors, and proof in one link", ar: "قصة الخدمات والقطاعات والإثبات في رابط واحد" },
      proofTitle: { en: "Profile sections", ar: "أقسام البروفايل" },
      quickTitle: { en: "Inquiry path", ar: "مسار الاستفسار" },
      nav: [
        { href: "#proof", label: { en: "Services", ar: "الخدمات" } },
        { href: "#lead", label: { en: "Contact", ar: "تواصل" } },
      ],
      quickItems: [
        { label: { en: "Need", ar: "الاحتياج" }, options: ["Strategy", "Operations", "Market entry"] },
        { label: { en: "Company size", ar: "حجم الشركة" }, options: ["Startup", "SME", "Enterprise"] },
        { label: { en: "Timeline", ar: "الوقت" }, options: ["Now", "This quarter", "Exploring"] },
      ],
      sections: [
        { title: { en: "Sector proof", ar: "إثبات حسب القطاع" }, body: { en: "Case snippets make the firm easier to trust before a meeting.", ar: "نماذج الأعمال المختصرة تزيد الثقة قبل الاجتماع." } },
        { title: { en: "Shareable profile", ar: "بروفايل قابل للمشاركة" }, body: { en: "A single link replaces outdated attachments and scattered decks.", ar: "رابط واحد بدل المرفقات القديمة والعروض المتفرقة." } },
      ],
      form: {
        title: { en: "Request consultation", ar: "اطلب استشارة" },
        button: { en: "Send inquiry", ar: "إرسال الاستفسار" },
        fields: [
          { en: "Company name", ar: "اسم الشركة" },
          { en: "Work email", ar: "البريد المهني", type: "email" },
        ],
        selectOptions: ["Strategy session", "Operations review", "Partnership call"],
      },
    },
  },
  "manufacturing-erp-lite": {
    type: "ops",
    config: {
      brand: "ERP Lite",
      title: "ERP Lite | Manufacturing Board",
      footer: "Manufacturing ERP Lite.",
      sidebar: { en: "Work orders, inventory, delivery, and team status.", ar: "أوامر عمل ومخزون وتسليم وحالة الفرق." },
      eyebrow: { en: "Factory operations", ar: "تشغيل مصنع" },
      headline: { en: "See work orders before they become delays.", ar: "شاهد أوامر العمل قبل أن تتحول لتأخير." },
      boardTitle: { en: "Production board", ar: "لوحة الإنتاج" },
      detailTitle: { en: "Work order", ar: "أمر العمل" },
      notePlaceholder: { en: "Add production update", ar: "أضف تحديث الإنتاج" },
      stages: [
        { key: "planned", label: { en: "Planned", ar: "مخطط" } },
        { key: "production", label: { en: "Production", ar: "إنتاج" } },
        { key: "shipping", label: { en: "Shipping", ar: "شحن" } },
      ],
      records: [
        { name: "WO-1421", detail: "Metal cabinet batch", source: "Sales order", next: "Reserve materials", stage: "planned", score: "72%" },
        { name: "WO-1422", detail: "Packaging run", source: "Inventory", next: "Quality check", stage: "production", score: "Live" },
        { name: "WO-1418", detail: "Replacement parts", source: "Maintenance", next: "Dispatch", stage: "shipping", score: "Ready" },
        { name: "WO-1424", detail: "Custom order", source: "Manager", next: "Approve specs", stage: "planned", score: "New" },
      ],
      rules: [
        { en: "Alert managers when a work order waits too long between stages.", ar: "تنبيه المدير عند توقف أمر عمل بين المراحل." },
        { en: "Block shipping until quality notes are attached.", ar: "منع الشحن حتى يتم إرفاق ملاحظات الجودة." },
        { en: "Summarize delayed orders at the start of each day.", ar: "تلخيص الأوامر المتأخرة في بداية كل يوم." },
      ],
    },
  },
  "law-firm-intake-site": {
    type: "launch",
    config: {
      brand: "Legal Intake",
      title: "Legal Intake | Law Firm Site",
      footer: "Legal Intake site.",
      eyebrow: { en: "Legal services", ar: "خدمات قانونية" },
      headline: { en: "Qualify the case before the first consultation.", ar: "أهل الحالة قبل أول استشارة." },
      primary: { en: "Start intake", ar: "ابدأ التأهيل" },
      secondary: { en: "Case types", ar: "أنواع القضايا" },
      visualTitle: { en: "Calm, trust-focused intake flow", ar: "مسار تأهيل هادئ مبني على الثقة" },
      proofTitle: { en: "Case paths", ar: "مسارات القضايا" },
      quickTitle: { en: "Case checker", ar: "فحص الحالة" },
      nav: [
        { href: "#proof", label: { en: "Practice areas", ar: "التخصصات" } },
        { href: "#lead", label: { en: "Intake", ar: "التأهيل" } },
      ],
      quickItems: [
        { label: { en: "Case type", ar: "نوع القضية" }, options: ["Corporate", "Family", "Real estate"] },
        { label: { en: "Urgency", ar: "الأولوية" }, options: ["This week", "This month", "Exploring"] },
        { label: { en: "Documents", ar: "المستندات" }, options: ["Ready", "Partial", "Not yet"] },
      ],
      sections: [
        { title: { en: "Pre-qualification", ar: "تأهيل أولي" }, body: { en: "Simple questions reduce unsuitable consultations.", ar: "أسئلة بسيطة تقلل الاستشارات غير المناسبة." } },
        { title: { en: "FAQ clarity", ar: "وضوح الأسئلة" }, body: { en: "Clear answers build trust before a sensitive conversation.", ar: "إجابات واضحة تبني الثقة قبل محادثة حساسة." } },
      ],
      form: {
        title: { en: "Send case summary", ar: "أرسل ملخص الحالة" },
        button: { en: "Submit intake", ar: "إرسال التأهيل" },
        fields: [
          { en: "Full name", ar: "الاسم بالكامل" },
          { en: "Phone number", ar: "رقم الهاتف", type: "tel" },
        ],
        selectOptions: ["Corporate dispute", "Contract review", "Property case"],
      },
    },
  },
  "corporate-brand-refresh": {
    type: "launch",
    config: {
      brand: "Brand Refresh",
      title: "Brand Refresh | Corporate Site",
      footer: "Corporate brand refresh site.",
      eyebrow: { en: "Corporate rebuild", ar: "إعادة بناء مؤسسي" },
      headline: { en: "Make the refreshed brand visible in every section.", ar: "اجعل الهوية الجديدة ظاهرة في كل قسم." },
      primary: { en: "View system", ar: "عرض النظام" },
      secondary: { en: "Proof", ar: "الإثبات" },
      visualTitle: { en: "Modern service story with reusable patterns", ar: "قصة خدمات حديثة بمكونات قابلة لإعادة الاستخدام" },
      proofTitle: { en: "Brand system", ar: "نظام الهوية" },
      quickTitle: { en: "Brief builder", ar: "بناء الملخص" },
      nav: [
        { href: "#proof", label: { en: "System", ar: "النظام" } },
        { href: "#lead", label: { en: "Brief", ar: "الملخص" } },
      ],
      quickItems: [
        { label: { en: "Priority", ar: "الأولوية" }, options: ["Messaging", "Visual design", "Conversion"] },
        { label: { en: "Audience", ar: "الجمهور" }, options: ["Enterprise", "SME", "Partners"] },
        { label: { en: "Launch", ar: "الإطلاق" }, options: ["2 weeks", "1 month", "Phased"] },
      ],
      sections: [
        { title: { en: "Reusable blocks", ar: "مكونات متكررة" }, body: { en: "Cards, stats, proof, and CTAs stay consistent across pages.", ar: "البطاقات والأرقام والإثبات والدعوات تظل متناسقة." } },
        { title: { en: "Clear positioning", ar: "تموضع واضح" }, body: { en: "Each service gets a more precise promise and next action.", ar: "كل خدمة تحصل على وعد وخطوة تالية أكثر وضوحًا." } },
      ],
      form: {
        title: { en: "Request refresh scope", ar: "اطلب نطاق التجديد" },
        button: { en: "Send brief", ar: "إرسال الملخص" },
        fields: [
          { en: "Company name", ar: "اسم الشركة" },
          { en: "Current site issue", ar: "مشكلة الموقع الحالية" },
        ],
        selectOptions: ["Full rebuild", "Homepage first", "Service pages"],
      },
    },
  },
  "b2b-proposal-hub": {
    type: "launch",
    config: {
      brand: "Proposal Hub",
      title: "Proposal Hub | B2B Sales Space",
      footer: "B2B proposal hub.",
      eyebrow: { en: "Proposal workspace", ar: "مساحة عروض" },
      headline: { en: "Send one tailored link instead of scattered files.", ar: "أرسل رابطًا مخصصًا بدل ملفات متفرقة." },
      primary: { en: "Build proposal", ar: "بناء العرض" },
      secondary: { en: "Modules", ar: "الوحدات" },
      visualTitle: { en: "Reusable proposal modules for sales teams", ar: "وحدات عروض قابلة لإعادة الاستخدام لفريق البيع" },
      proofTitle: { en: "Proposal modules", ar: "وحدات العرض" },
      quickTitle: { en: "Proposal setup", ar: "إعداد العرض" },
      nav: [
        { href: "#proof", label: { en: "Modules", ar: "الوحدات" } },
        { href: "#lead", label: { en: "Create", ar: "إنشاء" } },
      ],
      quickItems: [
        { label: { en: "Sector", ar: "القطاع" }, options: ["Healthcare", "Real estate", "Education"] },
        { label: { en: "Package", ar: "الباقة" }, options: ["Starter", "Growth", "Enterprise"] },
        { label: { en: "Decision stage", ar: "مرحلة القرار" }, options: ["Intro", "Negotiation", "Final"] },
      ],
      sections: [
        { title: { en: "Custom sections", ar: "أقسام مخصصة" }, body: { en: "Swap services, proof, and pricing blocks per client.", ar: "بدل الخدمات والإثبات والأسعار حسب العميل." } },
        { title: { en: "Follow-up ready", ar: "جاهز للمتابعة" }, body: { en: "Sales can reuse one source of truth in every negotiation.", ar: "فريق البيع يستخدم مصدرًا واحدًا في كل تفاوض." } },
      ],
      form: {
        title: { en: "Generate proposal outline", ar: "إنشاء ملخص عرض" },
        button: { en: "Prepare proposal", ar: "تجهيز العرض" },
        fields: [
          { en: "Client name", ar: "اسم العميل" },
          { en: "Deal objective", ar: "هدف الصفقة" },
        ],
        selectOptions: ["Website build", "CRM rollout", "Marketing funnel"],
      },
    },
  },
};

Object.assign(standaloneProjectConfigs, {
  "logistics-control-tower": {
    type: "ops",
    config: {
      brand: "Control Tower",
      title: "Control Tower | Logistics Dashboard",
      footer: "Logistics control tower.",
      sidebar: { en: "Shipments, exceptions, routes, and delivery updates.", ar: "شحنات واستثناءات ومسارات وتحديثات تسليم." },
      eyebrow: { en: "Logistics operations", ar: "تشغيل لوجستي" },
      headline: { en: "Track shipment exceptions before customers call.", ar: "تابع استثناءات الشحن قبل اتصال العملاء." },
      boardTitle: { en: "Shipment board", ar: "لوحة الشحنات" },
      detailTitle: { en: "Shipment detail", ar: "تفاصيل الشحنة" },
      notePlaceholder: { en: "Add route update", ar: "أضف تحديث المسار" },
      stages: [
        { key: "pickup", label: { en: "Pickup", ar: "استلام" } },
        { key: "transit", label: { en: "Transit", ar: "في الطريق" } },
        { key: "exception", label: { en: "Exception", ar: "استثناء" } },
      ],
      records: [
        { name: "SHP-4582", detail: "Cairo to Alex", source: "Fleet", next: "Confirm loading", stage: "pickup", score: "New" },
        { name: "SHP-4590", detail: "Airport delivery", source: "Map", next: "Update ETA", stage: "transit", score: "On time" },
        { name: "SHP-4594", detail: "Damaged label", source: "Warehouse", next: "Reprint label", stage: "exception", score: "Risk" },
        { name: "SHP-4598", detail: "Branch transfer", source: "Driver", next: "Call receiver", stage: "transit", score: "Live" },
      ],
      rules: [
        { en: "Notify operations when ETA slips by more than 30 minutes.", ar: "تنبيه التشغيل عند تأخر الوصول أكثر من 30 دقيقة." },
        { en: "Flag damaged-label shipments before dispatch.", ar: "تمييز شحنات الليبل التالف قبل الخروج." },
        { en: "Summarize open exceptions at shift handover.", ar: "تلخيص الاستثناءات المفتوحة عند تسليم الشيفت." },
      ],
    },
  },
  "hotel-booking-suite": {
    type: "launch",
    config: {
      brand: "Hotel Suite",
      title: "Hotel Suite | Booking Website",
      footer: "Hotel booking suite.",
      eyebrow: { en: "Hotel booking", ar: "حجز فندقي" },
      headline: { en: "Move guests from room browsing to direct booking.", ar: "انقل الضيف من استعراض الغرف إلى الحجز المباشر." },
      primary: { en: "Check rooms", ar: "تحقق من الغرف" },
      secondary: { en: "Offers", ar: "العروض" },
      visualTitle: { en: "Direct booking experience with offers and room context", ar: "تجربة حجز مباشر بعروض وتفاصيل غرف" },
      proofTitle: { en: "Booking drivers", ar: "محركات الحجز" },
      quickTitle: { en: "Room search", ar: "بحث الغرف" },
      nav: [
        { href: "#proof", label: { en: "Rooms", ar: "الغرف" } },
        { href: "#lead", label: { en: "Book", ar: "احجز" } },
      ],
      quickItems: [
        { label: { en: "Guests", ar: "الضيوف" }, options: ["1 guest", "2 guests", "Family"] },
        { label: { en: "Stay", ar: "الإقامة" }, options: ["Weekend", "3 nights", "Week"] },
        { label: { en: "Room", ar: "الغرفة" }, options: ["Standard", "Sea view", "Suite"] },
      ],
      sections: [
        { title: { en: "Room cards", ar: "بطاقات الغرف" }, body: { en: "Every room shows fit, amenities, and next booking action.", ar: "كل غرفة تعرض الملاءمة والمزايا وخطوة الحجز التالية." } },
        { title: { en: "Offer routing", ar: "توجيه العروض" }, body: { en: "Guests choose packages without calling reception first.", ar: "الضيف يختار الباقة بدون الاتصال بالاستقبال أولًا." } },
      ],
      form: {
        title: { en: "Request room hold", ar: "اطلب تثبيت غرفة" },
        button: { en: "Send booking request", ar: "إرسال طلب الحجز" },
        fields: [
          { en: "Guest name", ar: "اسم الضيف" },
          { en: "Phone number", ar: "رقم الهاتف", type: "tel" },
        ],
        selectOptions: ["Sea view room", "Family suite", "Weekend offer"],
      },
    },
  },
  "restaurant-qr-ordering": {
    type: "ops",
    config: {
      brand: "QR Ordering",
      title: "QR Ordering | Restaurant Flow",
      footer: "Restaurant QR ordering.",
      sidebar: { en: "Tables, QR orders, kitchen status, and payments.", ar: "طاولات وطلبات QR وحالة المطبخ والمدفوعات." },
      eyebrow: { en: "Restaurant operations", ar: "تشغيل مطعم" },
      headline: { en: "Let guests order while the kitchen sees every status.", ar: "دع الضيف يطلب والمطبخ يرى كل حالة." },
      boardTitle: { en: "Kitchen board", ar: "لوحة المطبخ" },
      detailTitle: { en: "Order detail", ar: "تفاصيل الطلب" },
      notePlaceholder: { en: "Add kitchen note", ar: "أضف ملاحظة المطبخ" },
      stages: [
        { key: "new", label: { en: "New", ar: "جديد" } },
        { key: "cooking", label: { en: "Cooking", ar: "تحضير" } },
        { key: "served", label: { en: "Served", ar: "تم التقديم" } },
      ],
      records: [
        { name: "Table 04", detail: "2 burgers + drinks", source: "QR", next: "Start grill", stage: "new", score: "EGP 620" },
        { name: "Table 09", detail: "Pasta + salad", source: "QR", next: "Plate order", stage: "cooking", score: "12m" },
        { name: "Table 02", detail: "Dessert add-on", source: "Waiter", next: "Close bill", stage: "served", score: "Paid" },
        { name: "Table 11", detail: "Kids meal", source: "QR", next: "Confirm allergy", stage: "new", score: "Note" },
      ],
      rules: [
        { en: "Push urgent allergy notes to the kitchen header.", ar: "إظهار ملاحظات الحساسية في أعلى لوحة المطبخ." },
        { en: "Notify waiter when an order is ready to serve.", ar: "تنبيه الويتر عند جاهزية الطلب." },
        { en: "Group table add-ons under one bill.", ar: "تجميع إضافات الطاولة في فاتورة واحدة." },
      ],
    },
  },
  "retail-ops-dashboard": {
    type: "ops",
    config: {
      brand: "Retail Ops",
      title: "Retail Ops | Store Dashboard",
      footer: "Retail operations dashboard.",
      sidebar: { en: "Inventory, orders, branches, and daily store tasks.", ar: "مخزون وطلبات وفروع ومهام يومية." },
      eyebrow: { en: "Retail operations", ar: "تشغيل تجزئة" },
      headline: { en: "See branch issues before stockouts hit sales.", ar: "شاهد مشاكل الفروع قبل أن يؤثر نفاد المخزون على البيع." },
      boardTitle: { en: "Store board", ar: "لوحة الفروع" },
      detailTitle: { en: "Store item", ar: "عنصر الفرع" },
      notePlaceholder: { en: "Add stock note", ar: "أضف ملاحظة مخزون" },
      stages: [
        { key: "low", label: { en: "Low stock", ar: "مخزون منخفض" } },
        { key: "transfer", label: { en: "Transfer", ar: "تحويل" } },
        { key: "done", label: { en: "Done", ar: "تم" } },
      ],
      records: [
        { name: "SKU-281", detail: "Nasr City branch", source: "POS", next: "Transfer 20 units", stage: "low", score: "Low" },
        { name: "SKU-155", detail: "Maadi branch", source: "Webhook", next: "Approve transfer", stage: "transfer", score: "Open" },
        { name: "Daily cash", detail: "October branch", source: "Manager", next: "Archive close", stage: "done", score: "Done" },
        { name: "Return batch", detail: "Online orders", source: "Support", next: "Quality check", stage: "transfer", score: "Due" },
      ],
      rules: [
        { en: "Create transfer tasks when branch stock drops below threshold.", ar: "إنشاء مهام تحويل عند نزول مخزون الفرع عن الحد." },
        { en: "Highlight branches missing daily closing reports.", ar: "إظهار الفروع التي لم ترسل تقرير الإغلاق." },
        { en: "Sync online returns with inventory before restock.", ar: "مزامنة مرتجعات الأونلاين قبل إعادة التخزين." },
      ],
    },
  },
});

Object.assign(standaloneProjectConfigs, {
  "contractor-project-portal": {
    type: "ops",
    config: {
      brand: "Contractor Portal",
      title: "Contractor Portal | Project Workspace",
      footer: "Contractor project portal.",
      sidebar: { en: "Milestones, files, approvals, and site updates.", ar: "مراحل وملفات واعتمادات وتحديثات موقع." },
      eyebrow: { en: "Project portal", ar: "بوابة مشروعات" },
      headline: { en: "Keep every project update tied to a milestone.", ar: "اربط كل تحديث مشروع بمرحلة واضحة." },
      boardTitle: { en: "Milestone board", ar: "لوحة المراحل" },
      detailTitle: { en: "Project item", ar: "عنصر المشروع" },
      notePlaceholder: { en: "Add site update", ar: "أضف تحديث الموقع" },
      stages: [
        { key: "review", label: { en: "Review", ar: "مراجعة" } },
        { key: "site", label: { en: "On site", ar: "في الموقع" } },
        { key: "approved", label: { en: "Approved", ar: "معتمد" } },
      ],
      records: [
        { name: "Drawing V4", detail: "Villa A - structure", source: "Engineer", next: "Client approval", stage: "review", score: "PDF" },
        { name: "Concrete pour", detail: "Block C basement", source: "Site team", next: "Upload photos", stage: "site", score: "Live" },
        { name: "Material invoice", detail: "Steel batch", source: "Procurement", next: "Finance sign-off", stage: "review", score: "Due" },
        { name: "Snag list", detail: "Apartment 12", source: "QA", next: "Archive closeout", stage: "approved", score: "Done" },
      ],
      rules: [
        { en: "Notify clients when a milestone receives a new approval request.", ar: "تنبيه العميل عند وجود طلب اعتماد جديد." },
        { en: "Require photos before closing site tasks.", ar: "طلب صور قبل إغلاق مهام الموقع." },
        { en: "Group all files under the matching project phase.", ar: "تجميع كل الملفات تحت مرحلة المشروع المناسبة." },
      ],
    },
  },
  "ads-roi-dashboard": {
    type: "ops",
    config: {
      brand: "Ads ROI",
      title: "Ads ROI | Marketing Dashboard",
      footer: "Ads ROI dashboard.",
      sidebar: { en: "Campaign spend, leads, pages, and quality outcomes.", ar: "إنفاق الحملات والعملاء والصفحات وجودة النتائج." },
      eyebrow: { en: "Marketing analytics", ar: "تحليلات تسويق" },
      headline: { en: "Connect ad spend to qualified outcomes.", ar: "اربط الإنفاق الإعلاني بالنتائج المؤهلة." },
      boardTitle: { en: "Campaign decision board", ar: "لوحة قرارات الحملات" },
      detailTitle: { en: "Campaign detail", ar: "تفاصيل الحملة" },
      notePlaceholder: { en: "Add budget decision", ar: "أضف قرار الميزانية" },
      stages: [
        { key: "scale", label: { en: "Scale", ar: "توسيع" } },
        { key: "watch", label: { en: "Watch", ar: "مراقبة" } },
        { key: "fix", label: { en: "Fix", ar: "تحسين" } },
      ],
      records: [
        { name: "Clinic search", detail: "Landing page A", source: "Google Ads", next: "Increase 15%", stage: "scale", score: "ROAS 4.2" },
        { name: "Real estate lead", detail: "Project page", source: "Search", next: "Review CPL", stage: "watch", score: "CPL -8%" },
        { name: "Brand campaign", detail: "Homepage", source: "Display", next: "Pause weak ad", stage: "fix", score: "Low quality" },
        { name: "Retargeting", detail: "Offer page", source: "Remarketing", next: "Keep budget", stage: "scale", score: "Lead 38" },
      ],
      rules: [
        { en: "Flag campaigns with good CPL but weak lead quality.", ar: "تمييز الحملات ذات تكلفة جيدة وجودة ضعيفة." },
        { en: "Suggest budget shifts when landing-page conversion changes.", ar: "اقتراح نقل الميزانية عند تغير تحويل الصفحة." },
        { en: "Send a weekly executive summary without manual reports.", ar: "إرسال ملخص أسبوعي بدون تقارير يدوية." },
      ],
    },
  },
  "beauty-clinic-funnel": {
    type: "launch",
    config: {
      brand: "Beauty Funnel",
      title: "Beauty Funnel | Treatment Campaign",
      footer: "Beauty clinic funnel.",
      eyebrow: { en: "Beauty treatment funnel", ar: "فانل تجميل" },
      headline: { en: "Answer objections before the booking call.", ar: "أجب على الاعتراضات قبل مكالمة الحجز." },
      primary: { en: "Check offer", ar: "شاهد العرض" },
      secondary: { en: "Trust proof", ar: "إثبات الثقة" },
      visualTitle: { en: "Mobile-first treatment page for paid traffic", ar: "صفحة علاج موبايل أولًا للزيارات المدفوعة" },
      proofTitle: { en: "Persuasion blocks", ar: "أقسام الإقناع" },
      quickTitle: { en: "Treatment interest", ar: "اهتمام الخدمة" },
      nav: [
        { href: "#proof", label: { en: "Proof", ar: "الإثبات" } },
        { href: "#lead", label: { en: "Book", ar: "الحجز" } },
      ],
      quickItems: [
        { label: { en: "Concern", ar: "الاحتياج" }, options: ["Laser", "Facial", "Slimming"] },
        { label: { en: "Readiness", ar: "الجاهزية" }, options: ["Ready now", "This month", "Comparing"] },
        { label: { en: "Contact", ar: "التواصل" }, options: ["WhatsApp", "Call", "Clinic visit"] },
      ],
      sections: [
        { title: { en: "Before/after logic", ar: "منطق قبل وبعد" }, body: { en: "The page explains expectations without relying on heavy imagery.", ar: "الصفحة تشرح التوقعات بدون الاعتماد على صور كثيرة." } },
        { title: { en: "Offer testing", ar: "اختبار العروض" }, body: { en: "Multiple offers can run while keeping the lead capture consistent.", ar: "يمكن تشغيل عروض متعددة مع الحفاظ على نفس مسار التسجيل." } },
      ],
      form: {
        title: { en: "Request beauty consultation", ar: "اطلب استشارة تجميل" },
        button: { en: "Send request", ar: "إرسال الطلب" },
        fields: [
          { en: "Full name", ar: "الاسم بالكامل" },
          { en: "Mobile number", ar: "رقم الموبايل", type: "tel" },
        ],
        selectOptions: ["Laser session", "Skin consultation", "Body package"],
      },
    },
  },
  "ngo-donation-landing": {
    type: "launch",
    config: {
      brand: "Donation Drive",
      title: "Donation Drive | NGO Landing",
      footer: "NGO donation landing.",
      eyebrow: { en: "Impact campaign", ar: "حملة أثر" },
      headline: { en: "Show the mission, the impact, and the next donation step.", ar: "اعرض الرسالة والأثر وخطوة التبرع التالية." },
      primary: { en: "Donate now", ar: "تبرع الآن" },
      secondary: { en: "See impact", ar: "شاهد الأثر" },
      visualTitle: { en: "One clear campaign link for supporters", ar: "رابط حملة واضح للمتبرعين" },
      proofTitle: { en: "Impact story", ar: "قصة الأثر" },
      quickTitle: { en: "Donation path", ar: "مسار التبرع" },
      nav: [
        { href: "#proof", label: { en: "Impact", ar: "الأثر" } },
        { href: "#lead", label: { en: "Donate", ar: "التبرع" } },
      ],
      quickItems: [
        { label: { en: "Amount", ar: "المبلغ" }, options: ["EGP 100", "EGP 250", "EGP 500"] },
        { label: { en: "Cause", ar: "القضية" }, options: ["Meals", "Education", "Medical support"] },
        { label: { en: "Frequency", ar: "التكرار" }, options: ["Once", "Monthly", "Campaign"] },
      ],
      sections: [
        { title: { en: "Impact blocks", ar: "أقسام الأثر" }, body: { en: "Supporters see what each contribution helps fund.", ar: "المتبرع يرى ما الذي يموله كل مبلغ." } },
        { title: { en: "Trust answers", ar: "إجابات الثقة" }, body: { en: "Basic questions about usage, reporting, and follow-up are handled on-page.", ar: "الأسئلة الأساسية عن الاستخدام والتقارير والمتابعة موجودة في الصفحة." } },
      ],
      form: {
        title: { en: "Pledge a donation", ar: "سجل تبرعك" },
        button: { en: "Send donation pledge", ar: "إرسال تعهد التبرع" },
        fields: [
          { en: "Supporter name", ar: "اسم المتبرع" },
          { en: "Mobile number", ar: "رقم الموبايل", type: "tel" },
        ],
        selectOptions: ["Meals fund", "Education fund", "Medical support"],
      },
    },
  },
  "event-ticketing-app": {
    type: "mobile",
    config: {
      brand: "Event Pass",
      title: "Event Pass | Ticketing App",
      footer: "Event ticketing app.",
      eyebrow: { en: "Event ticketing", ar: "تذاكر فعاليات" },
      headline: { en: "Sell tickets and track attendance from one mobile flow.", ar: "بع التذاكر وتابع الحضور من مسار موبايل واحد." },
      tabs: [
        { en: "Event", ar: "الفعالية" },
        { en: "Tickets", ar: "التذاكر" },
        { en: "Passes", ar: "البطاقات" },
      ],
      phoneHome: { en: "Featured event", ar: "الفعالية المميزة" },
      modulesTitle: { en: "Ticket flow", ar: "مسار التذاكر" },
      items: [
        { en: "Choose ticket class", ar: "اختيار نوع التذكرة" },
        { en: "Confirm attendee details", ar: "تأكيد بيانات الحضور" },
        { en: "Generate QR pass", ar: "إنشاء بطاقة QR" },
      ],
      workflow: [
        { title: { en: "Discover", ar: "اكتشاف" }, body: { en: "Visitor sees schedule and speakers.", ar: "الزائر يرى الجدول والمتحدثين." } },
        { title: { en: "Book", ar: "حجز" }, body: { en: "Ticket class and details are captured.", ar: "يتم تسجيل نوع التذكرة والبيانات." } },
        { title: { en: "Check in", ar: "دخول" }, body: { en: "QR pass supports gate verification.", ar: "بطاقة QR تدعم التحقق على الباب." } },
      ],
      form: {
        title: { en: "Reserve ticket", ar: "احجز تذكرة" },
        button: { en: "Generate pass", ar: "إنشاء البطاقة" },
        fields: [
          { en: "Attendee name", ar: "اسم الحاضر" },
          { en: "Email address", ar: "البريد الإلكتروني", type: "email" },
        ],
        selectOptions: ["General pass", "VIP pass", "Workshop pass"],
      },
    },
  },
  "membership-portal-wpfb": {
    type: "ops",
    config: {
      brand: "Member Portal",
      title: "Member Portal | WP + Firebase",
      footer: "Membership portal.",
      sidebar: { en: "Content, members, access, and live portal actions.", ar: "محتوى وأعضاء وصلاحيات وتفاعلات حية." },
      eyebrow: { en: "Membership platform", ar: "منصة عضوية" },
      headline: { en: "Keep WordPress editing with Firebase-powered membership.", ar: "احتفظ بسهولة ووردبريس مع عضوية مدعومة بفايربيز." },
      boardTitle: { en: "Member operations", ar: "تشغيل العضوية" },
      detailTitle: { en: "Member record", ar: "سجل العضو" },
      notePlaceholder: { en: "Add member note", ar: "أضف ملاحظة عضو" },
      stages: [
        { key: "new", label: { en: "New", ar: "جديد" } },
        { key: "active", label: { en: "Active", ar: "نشط" } },
        { key: "renew", label: { en: "Renewal", ar: "تجديد" } },
      ],
      records: [
        { name: "Sarah M.", detail: "Growth membership", source: "WordPress form", next: "Approve access", stage: "new", score: "New" },
        { name: "Kareem A.", detail: "Business community", source: "Firebase", next: "Send event invite", stage: "active", score: "Live" },
        { name: "Nour H.", detail: "Annual plan", source: "Billing", next: "Renewal reminder", stage: "renew", score: "Due" },
        { name: "Team Alpha", detail: "Corporate seats", source: "Admin", next: "Add 3 users", stage: "active", score: "Seats" },
      ],
      rules: [
        { en: "Grant access after payment confirmation without editor work.", ar: "منح الوصول بعد تأكيد الدفع بدون تدخل المحرر." },
        { en: "Show members-only content based on Firebase status.", ar: "إظهار محتوى الأعضاء حسب حالة Firebase." },
        { en: "Send renewal reminders before access expires.", ar: "إرسال تذكيرات التجديد قبل انتهاء الوصول." },
      ],
    },
  },
  "multi-branch-email-migration": {
    type: "ops",
    config: {
      brand: "Mail Migration",
      title: "Mail Migration | Multi-Branch Console",
      footer: "Multi-branch email migration.",
      sidebar: { en: "Domains, mailboxes, DNS records, and branch validation.", ar: "دومينات وصناديق بريد وسجلات DNS والتحقق من الفروع." },
      eyebrow: { en: "Email infrastructure", ar: "بنية بريد" },
      headline: { en: "Move every branch without losing critical email.", ar: "انقل كل فرع بدون فقدان بريد مهم." },
      boardTitle: { en: "Migration board", ar: "لوحة الترحيل" },
      detailTitle: { en: "Mailbox batch", ar: "دفعة البريد" },
      notePlaceholder: { en: "Add DNS validation note", ar: "أضف ملاحظة تحقق DNS" },
      stages: [
        { key: "prepare", label: { en: "Prepare", ar: "تجهيز" } },
        { key: "migrate", label: { en: "Migrate", ar: "نقل" } },
        { key: "verify", label: { en: "Verify", ar: "تحقق" } },
      ],
      records: [
        { name: "HQ mailboxes", detail: "45 accounts", source: "Microsoft 365", next: "Final sync", stage: "migrate", score: "Live" },
        { name: "Alex branch", detail: "12 accounts", source: "DNS", next: "DKIM check", stage: "verify", score: "SPF/DKIM" },
        { name: "Sales aliases", detail: "Groups + forwards", source: "Admin", next: "Map owners", stage: "prepare", score: "New" },
        { name: "Support domain", detail: "MX cutover", source: "Cloudflare", next: "Deliverability test", stage: "verify", score: "Ready" },
      ],
      rules: [
        { en: "Validate SPF, DKIM, DMARC, and MX before branch cutover.", ar: "التحقق من SPF وDKIM وDMARC وMX قبل نقل الفرع." },
        { en: "Move mailboxes in batches to avoid downtime.", ar: "نقل البريد على دفعات لتجنب التوقف." },
        { en: "Log delivery tests before closing a branch.", ar: "تسجيل اختبارات التسليم قبل إغلاق الفرع." },
      ],
    },
  },
  "hiring-automation-flow": {
    type: "ops",
    config: {
      brand: "Hiring Flow",
      title: "Hiring Flow | Automation Board",
      footer: "Hiring automation flow.",
      sidebar: { en: "Roles, candidates, interviews, and internal alerts.", ar: "وظائف ومرشحون ومقابلات وتنبيهات داخلية." },
      eyebrow: { en: "Hiring automation", ar: "أتمتة توظيف" },
      headline: { en: "Move candidates from request to interview without messy messages.", ar: "انقل المرشحين من الطلب للمقابلة بدون رسائل عشوائية." },
      boardTitle: { en: "Candidate board", ar: "لوحة المرشحين" },
      detailTitle: { en: "Candidate detail", ar: "تفاصيل المرشح" },
      notePlaceholder: { en: "Add interview note", ar: "أضف ملاحظة مقابلة" },
      stages: [
        { key: "screen", label: { en: "Screen", ar: "فرز" } },
        { key: "interview", label: { en: "Interview", ar: "مقابلة" } },
        { key: "offer", label: { en: "Offer", ar: "عرض" } },
      ],
      records: [
        { name: "Mariam S.", detail: "Customer success", source: "LinkedIn", next: "Phone screen", stage: "screen", score: "82%" },
        { name: "Omar N.", detail: "Operations lead", source: "Referral", next: "Manager interview", stage: "interview", score: "Strong" },
        { name: "Dina A.", detail: "Marketing specialist", source: "Website", next: "Send offer", stage: "offer", score: "Final" },
        { name: "Ahmed K.", detail: "Sales associate", source: "Job post", next: "Review CV", stage: "screen", score: "New" },
      ],
      rules: [
        { en: "Notify managers when candidates wait too long after screening.", ar: "تنبيه المديرين عند انتظار المرشح طويلًا بعد الفرز." },
        { en: "Create interview reminders with candidate context.", ar: "إنشاء تذكيرات مقابلة بسياق المرشح." },
        { en: "Summarize pipeline status every morning.", ar: "تلخيص حالة المسار كل صباح." },
      ],
    },
  },
});

const renderConfiguredStandaloneDemo = (project) => {
  const entry = standaloneProjectConfigs[project.slug];

  if (!entry) {
    return null;
  }

  if (entry.type === "mobile") {
    return renderMobileStandalone(project, entry.config);
  }

  if (entry.type === "ops") {
    return renderOpsStandalone(project, entry.config);
  }

  return renderLaunchStandalone(project, entry.config);
};

const renderStandaloneDemoPage = (project) =>
  project.slug === "prime-estates-platform"
    ? renderPrimeEstatesStandalone(project)
    : project.slug === "brokerhub-crm"
      ? renderBrokerHubStandalone(project)
      : project.slug === "blueharbor-launch-page"
        ? renderBlueHarborStandalone(project)
        : project.slug === "compound-scout-app"
          ? renderCompoundScoutStandalone(project)
          : project.slug === "rental-ops-dashboard"
            ? renderRentalOpsStandalone(project)
            : project.slug === "clinic-booking-pro"
              ? renderClinicBookingProStandalone(project)
              : project.slug === "dental-branch-site"
                ? renderDentalBranchStandalone(project)
                : project.slug === "telehealth-mobile-suite"
                  ? renderTelehealthStandalone(project)
                  : project.slug === "lab-booking-system"
                    ? renderLabBookingStandalone(project)
                    : project.slug === "medical-funnel-campaign"
                      ? renderMedicalFunnelStandalone(project)
                      : renderConfiguredStandaloneDemo(project) || renderDemoPage(project, standaloneShellOptions({
          brandLabel: `${text(project.title, "en")} Demo`,
          footerLabel: "POPWAM standalone demo.",
        }));

const writeStandaloneDemoProject = async (project) => {
  const demoDir = path.join(rootDir, "standalone-demos", project.slug);

  await writeDemoAssetBundle({
    assetDir: path.join(demoDir, "assets"),
    styleFile: "style.css",
    scriptFile: "app.js",
  });

  await fs.writeFile(path.join(demoDir, "index.html"), renderStandaloneDemoPage(project), "utf8");
};

const buildStandaloneDemos = async () => {
  await Promise.all(data.projects.map((project) => writeStandaloneDemoProject(project)));
};

const writePage = async ({ locale, currentKey, currentSlug, meta, content, schemas, ogType }) => {
  const filePath = outputPathFor(locale, currentSlug);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const html = layout({ locale, currentKey, currentSlug, meta, content, schemas, ogType });
  await fs.writeFile(filePath, html, "utf8");
  routes.push(toUrl(pathFor(locale, currentSlug)));
};

const baseSchemas = {
  home: (locale) => [
    {
      "@type": "WebSite",
      name: data.site.name,
      url: toUrl(pathFor(locale)),
      inLanguage: locale,
      description: text(data.home.meta[locale].description, locale),
    },
  ],
  page: (locale, slug, description) => [
    {
      "@type": "WebPage",
      name: toUrl(pathFor(locale, slug)),
      url: toUrl(pathFor(locale, slug)),
      inLanguage: locale,
      description,
    },
  ],
};

const buildCorePages = async () => {
  for (const locale of Object.keys(locales)) {
    await writePage({
      locale,
      currentKey: "home",
      currentSlug: "",
      meta: data.home.meta[locale],
      content: renderHome(locale),
      schemas: baseSchemas.home(locale),
    });

    await writePage({
      locale,
      currentKey: "about",
      currentSlug: "about",
      meta: data.about.meta[locale],
      content: renderAbout(locale),
      schemas: baseSchemas.page(locale, "about", data.about.meta[locale].description),
    });

    await writePage({
      locale,
      currentKey: "services",
      currentSlug: "services",
      meta: data.servicesPage.meta[locale],
      content: renderServices(locale),
      schemas: [
        ...baseSchemas.page(locale, "services", data.servicesPage.meta[locale].description),
        {
          "@type": "ItemList",
          name: locale === "ar" ? "خدمات POPWAM" : "POPWAM service catalog",
          itemListElement: data.services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: text(service.title, locale),
              description: text(service.summary, locale),
              provider: {
                "@type": "Organization",
                name: data.site.name,
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "EGP",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  description: text(servicePriceRanges[service.key], locale),
                },
              },
            },
          })),
        },
      ],
    });

    await writePage({
      locale,
      currentKey: "portfolio",
      currentSlug: "portfolio",
      meta: data.portfolioPage.meta[locale],
      content: renderPortfolio(locale, text(data.portfolioPage.hero.title, locale), text(data.portfolioPage.hero.body, locale)),
      schemas: [
        ...baseSchemas.page(locale, "portfolio", data.portfolioPage.meta[locale].description),
        {
          "@type": "ItemList",
          name: locale === "ar" ? "أعمال POPWAM" : "POPWAM portfolio",
          itemListElement: data.projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: toUrl(pathFor(locale, `case-study/${project.slug}`)),
            name: text(project.title, locale),
          })),
        },
      ],
    });

    await writePage({
      locale,
      currentKey: "process",
      currentSlug: "process",
      meta: data.processPage.meta[locale],
      content: renderProcess(locale),
      schemas: baseSchemas.page(locale, "process", data.processPage.meta[locale].description),
    });

    await writePage({
      locale,
      currentKey: "contact",
      currentSlug: "contact",
      meta: data.contactPage.meta[locale],
      content: renderContact(locale),
      schemas: [
        ...baseSchemas.page(locale, "contact", data.contactPage.meta[locale].description),
        {
          "@type": "ContactPage",
          url: toUrl(pathFor(locale, "contact")),
          inLanguage: locale,
        },
      ],
    });

    await writePage({
      locale,
      currentKey: "portfolio",
      currentSlug: "case-study",
      meta: data.caseStudyIndex.meta[locale],
      content: renderPortfolio(locale, text(data.caseStudyIndex.hero.title, locale), text(data.caseStudyIndex.hero.body, locale)),
      schemas: baseSchemas.page(locale, "case-study", data.caseStudyIndex.meta[locale].description),
    });
  }
};

const buildCaseStudies = async () => {
  for (const locale of Object.keys(locales)) {
    for (const project of data.projects) {
      await writePage({
        locale,
        currentKey: "portfolio",
        currentSlug: `case-study/${project.slug}`,
        meta: {
          title: `${text(project.title, locale)} | POPWAM`,
          description: text(project.summary, locale),
        },
        content: renderCaseStudy(project, locale),
        schemas: [
          {
            "@type": "CreativeWork",
            name: text(project.title, locale),
            description: text(project.summary, locale),
            url: toUrl(pathFor(locale, `case-study/${project.slug}`)),
            inLanguage: locale,
            creator: {
              "@type": "Organization",
              name: data.site.name,
            },
          },
        ],
        ogType: "article",
      });
    }
  }
};

const build404 = async () => {
  const html = layout({
    locale: "en",
    currentKey: "home",
    currentSlug: "",
    meta: {
      title: { ar: "404 | POPWAM", en: "404 | POPWAM" },
      description: {
        ar: "الصفحة غير موجودة.",
        en: "The page could not be found.",
      },
    },
    content: `
      <div class="shell">
        <section class="hero-card reveal">
          <div class="card-stack">
            <span class="eyebrow">404</span>
            <h1 class="hero-title">Page not found</h1>
            <p class="hero-text">The link may have changed. Use the main navigation or return to the homepage.</p>
            <div class="button-row">${button("/", "Back home", "button-accent button")}</div>
          </div>
        </section>
      </div>
    `,
    schemas: baseSchemas.page("en", "", "Not found"),
    enableLanguageRedirect: false,
  });

  await fs.writeFile(path.join(rootDir, "404.html"), html, "utf8");
};

const routePathname = (route) => new URL(route).pathname;

const routeSlugFromPathname = (pathname) => {
  if (pathname === "/" || pathname === "/en/") {
    return "";
  }

  const withoutLocale = pathname.startsWith("/en/") ? pathname.slice(4) : pathname.slice(1);
  return withoutLocale.replace(/\/$/g, "");
};

const sitemapChangefreq = (route) => {
  const pathname = routePathname(route);

  if (pathname === "/" || pathname === "/en/" || pathname === "/portfolio/" || pathname === "/demos/") {
    return "weekly";
  }

  if (pathname.includes("/case-study/") || pathname.startsWith("/demos/")) {
    return "monthly";
  }

  return "monthly";
};

const sitemapPriority = (route) => {
  const pathname = routePathname(route);

  if (pathname === "/") {
    return "1.00";
  }

  if (pathname === "/en/") {
    return "0.90";
  }

  if (["/services/", "/portfolio/", "/case-study/", "/demos/", "/contact/"].includes(pathname)) {
    return "0.85";
  }

  if (pathname.includes("/case-study/")) {
    return "0.72";
  }

  if (pathname.startsWith("/demos/")) {
    return "0.68";
  }

  if (pathname.startsWith("/en/")) {
    return "0.70";
  }

  return "0.75";
};

const sitemapAlternates = (route, routeSet) => {
  const pathname = routePathname(route);

  if (pathname.startsWith("/demos/")) {
    return "";
  }

  const slug = routeSlugFromPathname(pathname);
  const arUrl = toUrl(pathFor("ar", slug));
  const enUrl = toUrl(pathFor("en", slug));

  if (!routeSet.has(arUrl) || !routeSet.has(enUrl)) {
    return "";
  }

  return `
    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(arUrl)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(arUrl)}"/>`;
};

const buildSitemap = async () => {
  const uniqueRoutes = [...new Set(routes)].sort((a, b) => a.localeCompare(b));
  const routeSet = new Set(uniqueRoutes);
  const lastmod = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${uniqueRoutes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(route)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${sitemapChangefreq(route)}</changefreq>
    <priority>${sitemapPriority(route)}</priority>${sitemapAlternates(route, routeSet)}
  </url>`
  )
  .join("\n")}
</urlset>
`;

  await fs.writeFile(path.join(rootDir, "sitemap.xml"), xml, "utf8");
};

const buildRobots = async () => {
  const robots = `User-agent: *
Allow: /
Disallow: /standalone-demos/

Host: ${data.site.domain.replace(/^https?:\/\//, "")}
Sitemap: ${data.site.domain}/sitemap.xml
LLMs: ${data.site.domain}/llms.txt
`;

  await fs.writeFile(path.join(rootDir, "robots.txt"), robots, "utf8");
};

const buildLlms = async () => {
  const routeCount = new Set(routes).size;
  const serviceLines = data.services
    .map((service) => `- ${text(service.title, "en")} (${text(servicePriceRanges[service.key], "en")})`)
    .join("\n");
  const projectLines = data.projects
    .map((project) => {
      const sector = sectorMap.get(project.sector);
      const services = project.services
        .map((key) => serviceMap.get(key))
        .filter(Boolean)
        .map((service) => text(service.title, "en"))
        .join(", ");

      return `- ${text(project.title, "en")} | sector: ${text(sector.label, "en")} | case study: ${toUrl(
        pathFor("en", `case-study/${project.slug}`)
      )} | demo: ${toUrl(demoPathFor(project))} | services: ${services}`;
    })
    .join("\n");
  const llms = `# POPWAM
> POPWAM is a mobile-first software agency that builds sales-focused websites, landing pages, internal systems, Flutter apps, and operational automations for business growth.

Site: ${data.site.domain}
Public route count: ${routeCount}
Languages:
- Arabic default at /
- English mirror at /en/

External index files:
- /sitemap.xml : public XML sitemap for search crawlers
- /robots.txt : crawler policy and sitemap/LLMs discovery
- /site.webmanifest : install metadata for browser/PWA surfaces
- /llms.txt : AI-readable summary of the agency, services, and project routes

Main pages:
- / : agency overview and featured work
- /about/ : positioning and working principles
- /services/ : full service catalog
- /portfolio/ : filtered project gallery
- /case-study/ : case study library
- /demos/ : local demo library with 30 generated demos
- /process/ : delivery process
- /contact/ : static contact brief and direct outreach

Key services:
${serviceLines}

Project library:
- 30 case studies with sector, challenge, solution, metrics, services used, and local demo links
- 30 generated demo pages in /demos/; every project folder contains its own index.html, CSS, JavaScript, and images
- 30 standalone copies in /standalone-demos/ for moving individual demos to separate servers; these copies are intentionally excluded from the public sitemap on popwam.com to avoid duplicate indexing
- Demo links open in a new tab from portfolio and case study pages
- Demos support Arabic/English switching and three visual themes from the same local route

Project routes:
${projectLines}

Contact:
- Email: ${data.site.email}
- WhatsApp: https://wa.me/${data.site.phoneDigits}
`;

  await fs.writeFile(path.join(rootDir, "llms.txt"), llms, "utf8");
};

const buildManifest = async () => {
  const manifest = {
    id: "/",
    name: "POPWAM",
    short_name: "POPWAM",
    description: "Mobile-first websites, funnels, internal systems, apps, and automation demos by POPWAM.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "ar",
    dir: "rtl",
    background_color: "#f5f6f0",
    theme_color: "#0f1115",
    categories: ["business", "productivity", "developer"],
    shortcuts: [
      {
        name: "Services",
        short_name: "Services",
        url: "/services/",
      },
      {
        name: "Portfolio",
        short_name: "Work",
        url: "/portfolio/",
      },
      {
        name: "Demos",
        short_name: "Demos",
        url: "/demos/",
      },
      {
        name: "Contact",
        short_name: "Contact",
        url: "/contact/",
      },
    ],
    icons: [
      {
        src: "/assets/img/favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
  };

  await fs.writeFile(path.join(rootDir, "site.webmanifest"), JSON.stringify(manifest, null, 2), "utf8");
};

const cleanGenerated = async () => {
  const targets = [
    "index.html",
    "404.html",
    "about",
    "services",
    "portfolio",
    "process",
    "contact",
    "case-study",
    "demos",
    "standalone-demos",
    "en",
    "sitemap.xml",
    "robots.txt",
    "llms.txt",
    "site.webmanifest",
  ];

  await Promise.all(
    targets.map((target) => fs.rm(path.join(rootDir, target), { recursive: true, force: true }))
  );
};

const main = async () => {
  validateData();
  routes.length = 0;
  await cleanGenerated();
  await buildCorePages();
  await buildCaseStudies();
  await buildDemos();
  await buildStandaloneDemos();
  await build404();
  await buildSitemap();
  await buildRobots();
  await buildLlms();
  await buildManifest();
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

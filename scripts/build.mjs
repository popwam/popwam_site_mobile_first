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

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

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
  const attrs = external ? ' target="_blank" rel="noopener"' : "";
  return `<a class="${className}" href="${escapeHtml(href)}"${attrs}>${escapeHtml(label)}</a>`;
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
        ${button(project.demo, text(data.globals.liveDemo, locale), "button-ghost")}
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

const layout = ({ locale, currentKey, currentSlug, meta, content, schemas, ogType = "website" }) => {
  const alternateLocale = locale === "ar" ? "en" : "ar";
  const pathname = pathFor(locale, currentSlug);
  const alternatePath = pathFor(alternateLocale, currentSlug);
  const title = text(meta.title, locale);
  const description = text(meta.description, locale);
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
    <link rel="manifest" href="/site.webmanifest">
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
              ${button(project.demo, text(data.globals.liveDemo, locale), "button-accent button")}
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
            name: text(service.title, locale),
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
  });

  await fs.writeFile(path.join(rootDir, "404.html"), html, "utf8");
};

const buildSitemap = async () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .sort()
  .map((route) => `  <url><loc>${route}</loc></url>`)
  .join("\n")}
</urlset>
`;

  await fs.writeFile(path.join(rootDir, "sitemap.xml"), xml, "utf8");
};

const buildRobots = async () => {
  const robots = `User-agent: *
Allow: /

Host: ${data.site.domain.replace(/^https?:\/\//, "")}
Sitemap: ${data.site.domain}/sitemap.xml
`;

  await fs.writeFile(path.join(rootDir, "robots.txt"), robots, "utf8");
};

const buildLlms = async () => {
  const llms = `# POPWAM
> POPWAM is a mobile-first software agency that builds sales-focused websites, landing pages, internal systems, Flutter apps, and operational automations for business growth.

Site: ${data.site.domain}
Languages:
- Arabic default at /
- English mirror at /en/

Main pages:
- / : agency overview and featured work
- /about/ : positioning and working principles
- /services/ : full service catalog
- /portfolio/ : filtered project gallery
- /case-study/ : case study library
- /process/ : delivery process
- /contact/ : static contact brief and direct outreach

Key services:
${data.services.map((service) => `- ${text(service.title, "en")}`).join("\n")}

Project library:
- 30 case studies with sector, challenge, solution, metrics, services used, and demo links

Contact:
- Email: ${data.site.email}
- WhatsApp: https://wa.me/${data.site.phoneDigits}
`;

  await fs.writeFile(path.join(rootDir, "llms.txt"), llms, "utf8");
};

const buildManifest = async () => {
  const manifest = {
    name: "POPWAM",
    short_name: "POPWAM",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f6f0",
    theme_color: "#0f1115",
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
  routes.length = 0;
  await cleanGenerated();
  await buildCorePages();
  await buildCaseStudies();
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

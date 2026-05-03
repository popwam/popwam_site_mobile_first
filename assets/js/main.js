const root = document.documentElement;
const locale = root.lang || "ar";

const copy = {
  ar: {
    close: "إغلاق",
    menu: "القائمة",
    shownProjects: "مشروع ظاهر",
    noResults: "لا توجد مشاريع في هذا التصنيف حاليًا.",
    whatsappIntro: "مرحبًا POPWAM، أرسل لكم ملخص المشروع:",
  },
  en: {
    close: "Close",
    menu: "Menu",
    shownProjects: "projects shown",
    noResults: "No projects match this filter yet.",
    whatsappIntro: "Hello POPWAM, here is a quick project brief:",
  },
};

const ui = copy[locale] || copy.en;

const setYear = () => {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
};

const setupMenu = () => {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menuPanel = document.querySelector("[data-mobile-nav]");

  if (!menuButton || !menuPanel) {
    return;
  }

  const updateState = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuPanel.hidden = !isOpen;
    document.body.classList.toggle("nav-open", isOpen);
    menuButton.querySelector("span").textContent = isOpen ? ui.close : ui.menu;
  };

  updateState(false);

  menuButton.addEventListener("click", () => {
    const next = menuButton.getAttribute("aria-expanded") !== "true";
    updateState(next);
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => updateState(false));
  });
};

const setupReveal = () => {
  const items = [...document.querySelectorAll(".reveal")];

  if (!items.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));
};

const setupPortfolioFilters = () => {
  const filters = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll("[data-project-card]")];
  const resultCount = document.querySelector("[data-result-count]");
  const emptyState = document.querySelector("[data-empty-state]");

  if (!filters.length || !cards.length) {
    return;
  }

  const applyFilter = (value) => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const matches = value === "all" || card.dataset.category === value;
      card.hidden = !matches;
      if (matches) {
        visibleCount += 1;
      }
    });

    filters.forEach((filter) => {
      filter.classList.toggle("is-active", filter.dataset.filter === value);
    });

    if (resultCount) {
      resultCount.textContent = `${visibleCount} ${ui.shownProjects}`;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
      emptyState.textContent = ui.noResults;
    }
  };

  filters.forEach((filter) => {
    filter.addEventListener("click", () => applyFilter(filter.dataset.filter));
  });

  applyFilter("all");
};

const setupContactForm = () => {
  const form = document.querySelector("[data-brief-form]");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const lines = [ui.whatsappIntro, ""];

    for (const [key, value] of data.entries()) {
      if (!String(value).trim()) {
        continue;
      }

      const label = form.querySelector(`[for="${key}"]`)?.textContent?.trim() || key;
      lines.push(`${label}: ${String(value).trim()}`);
    }

    const url = `https://wa.me/${form.dataset.waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });
};

setYear();
setupMenu();
setupReveal();
setupPortfolioFilters();
setupContactForm();

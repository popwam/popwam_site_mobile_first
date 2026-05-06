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

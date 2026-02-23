/**
 * menu.js
 * ─────────────────────────────────────────────────────────
 * Lógica do menu mobile (drawer lateral — esquerda → direita)
 */

const TOGGLE_ID = "js-menu-toggle";
const ASIDE_ID = "js-nav-aside";
const OPEN_CLASS = "is-open";
const DESKTOP_BP = 768;
const SESSION_KEY = "menuOpen";

/* ── Estado ── */
let isMenuOpen = false;
let toggleBtn = null;
let aside = null;

/* ── Utilitários ── */
const getToggleBtn = () => document.getElementById(TOGGLE_ID);
const getAside = () => document.getElementById(ASIDE_ID);

const getFocusable = (container) =>
  Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => el.offsetParent !== null);

/* ── Sincroniza ícone ── */
const syncToggleIcon = (open) => {
  if (!toggleBtn) return;

  const iconOpen = toggleBtn.querySelector(".nav__icon--open");
  const iconClose = toggleBtn.querySelector(".nav__icon--close");

  if (open) {
    iconOpen?.classList.add("hidden");
    iconClose?.classList.remove("hidden");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Fechar menu");
  } else {
    iconOpen?.classList.remove("hidden");
    iconClose?.classList.add("hidden");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Abrir menu");
  }
};

/* ── Persistência ── */
const persistState = (open) => {
  sessionStorage.setItem(SESSION_KEY, open ? "1" : "0");
};

/* ── Stagger animation ── */
const applyStaggerIndex = () => {
  aside = aside ?? getAside();

  aside
    ?.querySelectorAll(".nav__list--mobile li")
    .forEach((li, i) => li.style.setProperty("--i", i));
};

/* ── Abrir menu ── */
const openMenu = (restoring = false) => {
  toggleBtn = toggleBtn ?? getToggleBtn();
  aside = aside ?? getAside();
  if (!aside || !toggleBtn) return;

  isMenuOpen = true;

  aside.classList.add(OPEN_CLASS);
  syncToggleIcon(true);

  document.body.style.overflow = "hidden";

  persistState(true);

  if (!restoring) {
    requestAnimationFrame(() => {
      getFocusable(aside)[0]?.focus();
    });
  }
};

/* ── Fechar menu ── */
const closeMenu = (returnFocus = true) => {
  toggleBtn = toggleBtn ?? getToggleBtn();
  aside = aside ?? getAside();
  if (!aside || !toggleBtn) return;

  isMenuOpen = false;

  aside.classList.remove(OPEN_CLASS);
  syncToggleIcon(false);

  document.body.style.overflow = "";

  persistState(false);

  if (returnFocus) toggleBtn.focus();
};

/* ── Toggle ── */
const toggleMenu = () => {
  isMenuOpen ? closeMenu() : openMenu();
};

/* ── Trap de foco ── */
const handleFocusTrap = (e) => {
  if (!isMenuOpen || e.key !== "Tab") return;

  aside = aside ?? getAside();
  if (!aside) return;

  const focusable = getFocusable(aside);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
};

/* ── Keydown ── */
const handleKeydown = (e) => {
  if (e.key === "Escape" && isMenuOpen) closeMenu();
  handleFocusTrap(e);
};

/* ── Clique fora do drawer ── */
const handleAsideClick = (e) => {
  aside = aside ?? getAside();

  const wrapper = aside?.querySelector(".nav__mobile-wrapper");

  if (wrapper && !wrapper.contains(e.target)) {
    closeMenu();
  }
};

/* ── Clique no botão toggle ── */
const handleDocumentClick = (e) => {
  const btn = e.target.closest(`#${TOGGLE_ID}`);
  if (!btn) return;

  toggleBtn = btn;
  toggleMenu();
};

/* ── Clique em links do menu mobile ── */
const handleMenuLinkClick = (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;

  aside = aside ?? getAside();

  if (!aside.contains(link)) return;

  closeMenu(false);
};

/* ── ResizeObserver ── */
const watchResize = () => {
  const ro = new ResizeObserver(() => {
    if (window.innerWidth >= DESKTOP_BP && isMenuOpen) {
      closeMenu(false);
    }
  });

  ro.observe(document.documentElement);
};

/* ── Restaurar estado ── */
const restoreState = () => {
  const saved = sessionStorage.getItem(SESSION_KEY);

  if (saved === "1" && window.innerWidth < DESKTOP_BP) {
    openMenu(true);
  }
};

/* ── Espera Web Component montar ── */
const waitForComponent = () =>
  new Promise((resolve) => {
    if (getToggleBtn() && getAside()) {
      resolve();
      return;
    }

    const observer = new MutationObserver(() => {
      if (getToggleBtn() && getAside()) {
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

/* ── Init ── */
const initMenu = async () => {
  await waitForComponent();

  toggleBtn = getToggleBtn();
  aside = getAside();

  applyStaggerIndex();
  restoreState();
  watchResize();

  document.addEventListener("click", handleDocumentClick);

  aside.addEventListener("click", handleAsideClick);

  /* fecha ao clicar em links */
  aside.addEventListener("click", handleMenuLinkClick);

  document.addEventListener("keydown", handleKeydown);
};

initMenu();
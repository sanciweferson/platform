/* =========================================================
   ICONES
========================================================= */
const Icons = {
  logo: `<svg viewBox="0 0 32 32"><path d="M18.774,19.7a3.727,3.727,0,0,0,3.376,2.078c1.418,0,2.324-.709,2.324-1.688c0-1.173-.931-1.589-2.491-2.272l-.856-.367c-2.469-1.052-4.11-2.37-4.11-5.156c0-2.567,1.956-4.52,5.012-4.52A5.058,5.058,0,0,1,26.9,10.52l-2.665,1.711a2.327,2.327,0,0,0-2.2-1.467a1.489,1.489,0,0,0-1.638,1.467c0,1.027.636,1.442,2.1,2.078l.856.366c2.908,1.247,4.549,2.518,4.549,5.376c0,3.081-2.42,4.769-5.671,4.769a6.575,6.575,0,0,1-6.236-3.5ZM6.686,20c.538.954,1.027,1.76,2.2,1.76c1.124,0,1.834-.44,1.834-2.15V7.975h3.422V19.658c0,3.543-2.078,5.156-5.11,5.156A5.312,5.312,0,0,1,3.9,21.688Z"/></svg>`,
  hamburger: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
  close: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
 moon: `<svg class="icon-moon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`,
  sun: `<svg class="icon-sun " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
};

/* =========================================================
   MENU ITEMS  (sem acentos nos hrefs)
========================================================= */
const menuItems = [
  {id: "home", href: "/", text: "Home"},
  { id: "fundamentos", href: "?pagina=fundamentos", text: "Fundamentos" },
  { id: "variaveisTipos", href: "?pagina=variaveis-tipos", text: "Variáveis & Tipos" },
  { id: "logicaFluxo", href: "?pagina=logica-fluxo", text: "Lógica & Fluxo" },
  { id: "funcoes", href: "?pagina=funcoes", text: "Funções" },
  { id: "objetosLiterais", href: "?pagina=objetos-literais", text: "Objetos Literais" },
  { id: "dominacaoDom", href: "?pagina=dominacao-dom", text: "Dominação do DOM" },
  { id: "jsAssincrono", href: "?pagina=js-assincrono", text: "JS Assíncrono" },
  { id: "orientacaoObjetos", href: "?pagina=orientacao-objetos", text: "Orientação a Objetos" }
];
/* =========================================================
   FUNÇÕES DE TEMPLATE
========================================================= */
const createLogoItem = (href = "/") => `
  <li class="logo">
    <a href="${href}" aria-label="Ir para a página inicial">
      ${Icons.logo}
    </a>
  </li>`;

const createNavLink = ({ href, text }) => `
  <li>
    <a href="${href}">${text}</a>
  </li>`;

const createHamburgerButton = () => `
  <button id="js-menu-toggle" type="button" class="nav__btn-toggle" aria-label="Abrir menu" aria-expanded="false">
    <span class="nav__icon--open">${Icons.hamburger}</span>
    <span class="nav__icon--close hidde">${Icons.close}</span>
  </button>`;

const createThemeToggleB =() => {
  return `
 
      <button class="nav__btn-theme" type="button" aria-label="Alternar tema">
        <span class=" icon--moon">${Icons.moon}</span>
        <span class=" icon--sun ">${Icons.sun}</span>
      </button>
  
  `;
}

/* =========================================================
   WEB COMPONENT
========================================================= */
class HeaderBar extends HTMLElement {
  connectedCallback() {
    const logoJs = createLogoItem();
    const hamburgerBtn = createHamburgerButton();
    const themeBtn = createThemeToggleB();
    const themeDesktopBtn = createThemeToggleB()
    const navList = menuItems.map(createNavLink).join("");

    this.innerHTML = `
      <header>
        <nav>
          <ul>  ${logoJs} </ul>
          <ul>
            ${navList}
                
          </ul>
      <div class="nav__theme-desktop">
          ${themeDesktopBtn}</div>
          ${hamburgerBtn}

          <aside class="nav__aside" id="js-nav-aside">
            <div class="nav__mobile-wrapper">
              <ul class="nav__list--mobile">
                ${navList}
               
              </ul>
              ${themeBtn}
            </div>
          </aside>
        </nav>
      </header>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
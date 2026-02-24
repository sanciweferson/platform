/* =========================================================
   SPA — Roteador de páginas

   O index.html da raiz É a home (boas-vindas).
   O #app começa vazio e recebe as páginas ao navegar.
   Ao voltar para a home (logo ou URL sem ?pagina=),
   o #app é limpo e o conteúdo fixo do index.html fica visível.
========================================================= */

let app = null;
let paginaAtual = null;

/* ── Captura o #app ── */
const capturarApp = () => {
  app = document.getElementById("app");
};

/* ── CSS compartilhado das aulas (carrega uma vez) ── */
const garantirCSSCompartilhado = () => {
  if (document.getElementById("css-shared-aula")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/partials/shared/aula.css";
  link.id = "css-shared-aula";
  document.head.appendChild(link);
};

/* ── Carrega CSS da página dinamicamente ── */
const carregarCSS = (pagina) => {
  const id = "css-pagina";
  document.getElementById(id)?.remove();
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `/partials/pages/${pagina}/index.css`;
  link.id = id;
  // Ignora silenciosamente se não existir
  link.onerror = () => link.remove();
  document.head.appendChild(link);
};

/* ── Remove CSS da página ao voltar para home ── */
const removerCSS = () => {
  document.getElementById("css-pagina")?.remove();
};

/* ── Carrega JS da página dinamicamente ── */
const carregarScript = (pagina) => {
  const id = "script-pagina";
  document.getElementById(id)?.remove();
  const script = document.createElement("script");
  script.src = `/partials/pages/${pagina}/index.js`;
  script.id = id;
  script.onerror = () => script.remove();
  document.body.appendChild(script);
};

/* ── Busca e renderiza a página no #app ── */
const carregarPagina = (pagina) => {
  if (!app) return;

  // Páginas de aula precisam do CSS compartilhado
  if (pagina.includes("/aulas/")) garantirCSSCompartilhado();

  const url = `/partials/pages/${pagina}/index.html`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status} — ${url}`);
      return res.text();
    })
    .then((html) => {
      app.innerHTML = html;
      window.scrollTo(0, 0);

      // Título amigável: "variaveis-tipos/aulas/02" → "variaveis tipos aulas 02"
      const titulo = pagina.split("/").pop().replace(/-/g, " ");
      document.title = `JS — ${titulo}`;

      // Esconde o conteúdo fixo da home
      document.getElementById("home-content")?.style.setProperty("display", "none");

      carregarCSS(pagina);
      carregarScript(pagina);
    })
    .catch((err) => {
      console.error("[SPA]", err);
      app.innerHTML = `
        <div style="padding:4rem 1.5rem;text-align:center;">
          <h2 style="font-size:1.5rem;margin-bottom:.5rem;color:var(--foreground)">404</h2>
          <p style="color:var(--muted-foreground)">
            Página <strong>${pagina}</strong> não encontrada.
          </p>
        </div>`;
    });
};

/* ── Volta para a home ── */
const mostrarHome = () => {
  if (!app) return;
  app.innerHTML = "";
  paginaAtual = null;
  removerCSS();
  document.title = "JS Learning Platform";
  window.scrollTo(0, 0);
  document.getElementById("home-content")?.style.removeProperty("display");
};

/* ── Navega para uma página SPA ── */
const navegarPagina = (pagina) => {
  if (pagina === paginaAtual) return;
  paginaAtual = pagina;
  history.pushState(null, "", `?pagina=${pagina}`);
  carregarPagina(pagina);
};

/* ── Navega para um hash na home (#secao) ── */
const navegarHash = (hash) => {
  mostrarHome();
  history.pushState(null, "", "/#" + hash);
  setTimeout(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  }, 50);
};

/* ── Intercepta todos os cliques em links ── */
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("http") || href.startsWith("mailto")) return;

  // Logo / link para a raiz → home
  if (href === "/" || href === "/index.html" || href === "./") {
    e.preventDefault();
    mostrarHome();
    history.pushState(null, "", "/");
    return;
  }

  // Hash puro (#secao)
  if (href.startsWith("#")) {
    e.preventDefault();
    navegarHash(href.slice(1));
    return;
  }

  // Rota SPA (?pagina=)
  if (href.includes("?pagina=")) {
    e.preventDefault();
    const pagina = new URL(href, location.origin).searchParams.get("pagina");
    if (pagina) navegarPagina(pagina);
    return;
  }
});

/* ── Carrega o estado correto conforme a URL atual ── */
const carregarEstado = () => {
  if (!app) capturarApp();

  const params = new URLSearchParams(location.search);
  const pagina = params.get("pagina");

  if (pagina) {
    paginaAtual = pagina;
    carregarPagina(pagina);
  } else if (location.hash) {
    const hash = location.hash.slice(1);
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView();
    }, 100);
  } else {
    mostrarHome();
  }
};

/* ── Botões voltar/avançar do navegador ── */
window.addEventListener("popstate", carregarEstado);
window.addEventListener("DOMContentLoaded", carregarEstado);
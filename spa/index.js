/* =========================================================
   SPA — Roteador de páginas
========================================================= */

let app = null;
let paginaAtual = null;

const capturarApp = () => {
  app = document.getElementById("app");
};

/* =========================================================
   RECURSOS COMPARTILHADOS
   utils.js deve ser carregado ANTES do script da página.
   Usamos Promise para garantir a ordem.
========================================================= */
let utilsCarregado = false;
let utilsPromise = null;

const garantirUtils = () => {
  // Já carregado
  if (utilsCarregado) return Promise.resolve();
  // Carregamento em andamento — devolve a mesma promise
  if (utilsPromise) return utilsPromise;

  utilsPromise = new Promise((resolve) => {
    if (document.getElementById("js-shared-utils")) {
      utilsCarregado = true;
      return resolve();
    }
    const script = document.createElement("script");
    script.src = "/partials/shared/utils.js";
    script.id = "js-shared-utils";
    script.onload = () => { utilsCarregado = true; resolve(); };
    script.onerror = () => resolve(); // falha silenciosa, não trava o SPA
    document.body.appendChild(script);
  });

  return utilsPromise;
};

const garantirCSS = () => {
  if (document.getElementById("css-shared-aula")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/partials/shared/aula.css";
  link.id = "css-shared-aula";
  document.head.appendChild(link);
};

/* ── CSS da página (módulo) ── */
const carregarCSS = (pagina) => {
  const id = "css-pagina";
  document.getElementById(id)?.remove();

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `/partials/pages/${pagina}/index.css`;
  link.id = id;
  link.onerror = () => link.remove(); // não existe → remove silenciosamente
  document.head.appendChild(link);
};

const removerCSS = () => {
  document.getElementById("css-pagina")?.remove();
};

/* ── JS da página — só injeta DEPOIS que utils.js estiver pronto ── */
const carregarScript = (pagina) => {
  const id = "script-pagina";
  document.getElementById(id)?.remove();

  return garantirUtils().then(() => {
    const script = document.createElement("script");
    script.src = `/partials/pages/${pagina}/index.js`;
    script.id = id;
    script.onerror = () => script.remove();
    document.body.appendChild(script);
  });
};

/* ── Busca e renderiza a página no #app ── */
const carregarPagina = (pagina) => {
  if (!app) return;

  const ehAula = pagina.includes("/aulas/");
  if (ehAula) garantirCSS();

  const url = `/partials/pages/${pagina}/index.html`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status} — ${url}`);
      return res.text();
    })
    .then((html) => {
      app.innerHTML = html;
      window.scrollTo(0, 0);

      const titulo = pagina.split("/").pop().replace(/-/g, " ");
      document.title = `JS — ${titulo}`;

      document.getElementById("home-content")?.style.setProperty("display", "none");

      // CSS do módulo (só para páginas de lista de aulas, não para as aulas em si)
      if (!ehAula) carregarCSS(pagina);

      // JS da página — garante utils antes
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

/* ── Home ── */
const mostrarHome = () => {
  if (!app) return;
  app.innerHTML = "";
  paginaAtual = null;
  removerCSS();
  document.title = "JS Learning Platform";
  window.scrollTo(0, 0);
  document.getElementById("home-content")?.style.removeProperty("display");
};

const navegarPagina = (pagina) => {
  if (pagina === paginaAtual) return;
  paginaAtual = pagina;
  history.pushState(null, "", `?pagina=${pagina}`);
  carregarPagina(pagina);
};

const navegarHash = (hash) => {
  mostrarHome();
  history.pushState(null, "", "/#" + hash);
  setTimeout(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  }, 50);
};

/* ── Intercepta cliques ── */
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("http") || href.startsWith("mailto")) return;

  if (href === "/" || href === "/index.html" || href === "./") {
    e.preventDefault();
    mostrarHome();
    history.pushState(null, "", "/");
    return;
  }

  if (href.startsWith("#")) {
    e.preventDefault();
    navegarHash(href.slice(1));
    return;
  }

  if (href.includes("?pagina=")) {
    e.preventDefault();
    const pagina = new URL(href, location.origin).searchParams.get("pagina");
    if (pagina) navegarPagina(pagina);
    return;
  }
});

/* ── Estado inicial ── */
const carregarEstado = () => {
  if (!app) capturarApp();

  const params = new URLSearchParams(location.search);
  const pagina = params.get("pagina");

  if (pagina) {
    paginaAtual = pagina;
    carregarPagina(pagina);
  } else if (location.hash) {
    setTimeout(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }, 100);
  } else {
    mostrarHome();
  }
};

window.addEventListener("popstate", carregarEstado);
window.addEventListener("DOMContentLoaded", carregarEstado);
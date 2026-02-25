if (!customElements.get("aula-fundamentos-01")) {

  /* =========================================================
     CONTEÚDO DA AULA
  ========================================================= */
  const META = {
    pagina: "fundamentos/aulas/01",  // ← Adicionado para tracking
    modulo: "Fundamentos",
    moduloHref: "?pagina=fundamentos",  // ← Adicionado
    num: "01",
    title: "Introdução ao JavaScript",
    duration: "8 min",
    badge: "Grátis",
    prev: null,
    next: "?pagina=fundamentos/aulas/02",
  };

  /* =========================================================
     TEMPLATES
  ========================================================= */
  const createHeader = (done) => `
    <header class="aula-header">
      <div class="aula-header__meta">
        <a href="${META.moduloHref}" class="aula-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          ${META.modulo}
        </a>
        <span class="aula-header__num">Aula ${META.num}</span>
      </div>
      <h1 class="aula-header__title">${META.title}</h1>
      <div class="aula-header__info">
        <span class="aula-badge aula-badge--${META.badge === "Grátis" ? "free" : "pro"}">${META.badge}</span>
        <span class="aula-duration">${META.duration} de leitura</span>
        <button class="btn-concluir ${done ? 'done' : ''}" id="btn-concluir">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          ${done ? 'Concluída' : 'Marcar como concluída'}
        </button>
      </div>
    </header>`;

   const createContent = () => /*HTML*/`
    <div class="aula-body">

      <section class="aula-section">
        <h2>O que é JavaScript?</h2>
        <p>
          JavaScript é uma linguagem de programação <strong>interpretada</strong>, 
          <strong>dinâmica</strong> e <strong>multiparadigma</strong>. Criada em 1995 por 
          Brendan Eich enquanto trabalhava na Netscape, ela nasceu com um objetivo simples: 
          tornar páginas web interativas.
        </p>
        <p>
          Hoje, JS vai muito além do navegador. Com o Node.js, ele roda no servidor. 
          Com React Native e Electron, ele cria apps mobile e desktop. 
          É literalmente a linguagem mais usada do mundo há mais de uma década.
        </p>
      </section>

      <section class="aula-section">
        <h2>Onde o JavaScript roda?</h2>
        <div class="aula-cards">
          <div class="aula-card">
            <div class="aula-card__icon">🌐</div>
            <h3>Navegador</h3>
            <p>Chrome, Firefox, Safari — todo navegador tem uma engine JS embutida.</p>
          </div>
          <div class="aula-card">
            <div class="aula-card__icon">🖥️</div>
            <h3>Servidor</h3>
            <p>Node.js permite rodar JS fora do navegador, no backend.</p>
          </div>
          <div class="aula-card">
            <div class="aula-card__icon">📱</div>
            <h3>Mobile</h3>
            <p>React Native e Expo criam apps iOS e Android com JS.</p>
          </div>
          <div class="aula-card">
            <div class="aula-card__icon">🖱️</div>
            <h3>Desktop</h3>
            <p>Electron roda apps desktop como VSCode e Figma usando JS.</p>
          </div>
        </div>
      </section>

      <section class="aula-section">
        <h2>Para que serve?</h2>
        <p>
          No navegador, o JavaScript é responsável por tudo que <em>se move</em> ou 
          <em>reage</em> na página — validar um formulário, abrir um menu, 
          buscar dados sem recarregar, animar elementos.
        </p>
        <p>
          É a única linguagem que roda nativamente no navegador, o que a torna 
          indispensável para qualquer desenvolvedor web.
        </p>
      </section>

      <section class="aula-section">
        <h2>JS vs Java — não é a mesma coisa</h2>
        <div class="aula-callout aula-callout--info">
          <strong>Atenção:</strong> JavaScript e Java são linguagens completamente diferentes. 
          O nome "JavaScript" foi uma jogada de marketing da Netscape para pegar carona 
          na popularidade do Java. Elas não compartilham sintaxe, runtime nem filosofia.
        </div>
      </section>

      <section class="aula-section">
        <h2>Seu primeiro código</h2>
        <p>Abra o console do navegador (F12 → Console) e digite:</p>
        <pre class="aula-code"><code>console.log("Olá, JavaScript!");</code></pre>
        <p>
          O <code>console.log()</code> é a função mais usada para depurar código. 
          Ela imprime qualquer valor no console do DevTools.
        </p>
      </section>

      <section class="aula-section">
        <h2>Resumo</h2>
        <ul class="aula-list">
          <li>JavaScript foi criado em 1995 e é a linguagem da web.</li>
          <li>Roda no navegador, servidor, mobile e desktop.</li>
          <li>É interpretado — não precisa compilar para executar.</li>
          <li>Não tem nada a ver com Java.</li>
          <li><code>console.log()</code> é seu melhor amigo no início.</li>
        </ul>
      </section>

    </div>`;

  const createNav = () => `
    <nav class="aula-nav">
      ${META.prev
      ? `<a href="${META.prev}" class="aula-nav__btn aula-nav__btn--prev">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Aula anterior
          </a>`
      : `<span></span>`
    }
      ${META.next
      ? `<a href="${META.next}" class="aula-nav__btn aula-nav__btn--next">
            Próxima aula
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>`
      : ""
    }
    </nav>`;

  /* =========================================================
     WEB COMPONENT
  ========================================================= */
  class AulaFundamentos01 extends HTMLElement {
    connectedCallback() {
      const done = window.Progress?.isDone(META.pagina);

      this.innerHTML = `
        <main class="page-aula">
          <div class="aula-wrapper">
            ${createHeader(done)}
            ${createContent()}
            ${createNav()}
          </div>
        </main>
      `;

      /* ── Botão concluir ── */
      document.getElementById("btn-concluir")?.addEventListener("click", function () {
        const isDone = window.Progress?.isDone(META.pagina);
        isDone ? window.Progress?.uncomplete(META.pagina) : window.Progress?.complete(META.pagina);
        this.classList.toggle("done", !isDone);
        this.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${!isDone ? "Concluída" : "Marcar como concluída"}`;
      });
    }
  }

  customElements.define("aula-fundamentos-01", AulaFundamentos01);
}
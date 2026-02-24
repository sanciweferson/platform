if (!customElements.get("aula-var")) {
  const meta = {
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "01", title: "var",
    duration: "8 min", badge: "Grátis",
    prev: null, next: "?pagina=variaveis-tipos/aulas/02",
  };
  class AulaVar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <main class="page-aula">
          <div class="aula-wrapper">

            <header class="aula-header">
              <div class="aula-header__meta">
                <a href="${meta.moduloHref}" class="aula-back">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  ${meta.modulo}
                </a>
                <span class="aula-header__num">Aula ${meta.num}</span>
              </div>
              <h1 class="aula-header__title">${meta.title}</h1>
              <div class="aula-header__info">
                <span class="aula-badge aula-badge--free">${meta.badge}</span>
                <span class="aula-duration">${meta.duration} de leitura</span>
              </div>
            </header>

            <div class="aula-body">

              <section class="aula-section">
                <h2>O que é var?</h2>
                <p><code>var</code> é a forma original de declarar variáveis em JavaScript, disponível desde 1995. Antes do ES6 (2015), era a única opção — e suas peculiaridades causaram incontáveis bugs.</p>
              </section>

              <section class="aula-section">
                <h2>Escopo de função</h2>
                <p><code>var</code> não respeita blocos <code>{}</code> como <code>if</code>, <code>for</code> ou <code>while</code>. Ela vive no escopo da <strong>função</strong> mais próxima — ou no escopo global, se declarada fora de uma função.</p>
                <pre class="aula-code"><code>function teste() {
  if (true) {
    var mensagem = "olá";
  }
  console.log(mensagem); // "olá" — vazou do bloco if!
}

teste();
console.log(mensagem); // ReferenceError — mas só aqui, fora da função</code></pre>
              </section>

              <section class="aula-section">
                <h2>Hoisting</h2>
                <p>Declarações <code>var</code> são <em>içadas</em> (hoisted) ao topo do escopo durante a fase de compilação. A declaração sobe, mas a atribuição não — a variável existe com valor <code>undefined</code> antes da linha onde foi escrita.</p>
                <pre class="aula-code"><code>console.log(x); // undefined — não lança erro!
var x = 10;
console.log(x); // 10

// O que o motor JS realmente faz:
var x;          // sobe a declaração
console.log(x); // undefined
x = 10;         // atribuição fica no lugar
console.log(x); // 10</code></pre>
              </section>

              <section class="aula-section">
                <h2>Redeclaração sem erro</h2>
                <p>Com <code>var</code>, você pode declarar a mesma variável várias vezes sem erro — o que torna bugs silenciosos muito fáceis de criar.</p>
                <pre class="aula-code"><code>var usuario = "Ana";
var usuario = "Bruno"; // sem erro!
console.log(usuario);  // "Bruno"</code></pre>
              </section>

              <section class="aula-section">
                <h2>O problema clássico com loops</h2>
                <p>O comportamento de escopo do <code>var</code> causa um bug muito famoso com closures em loops:</p>
                <pre class="aula-code"><code>// Com var — bug clássico
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Imprime: 3, 3, 3 — todas as funções compartilham o mesmo i

// Com let — correto
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Imprime: 0, 1, 2 — cada iteração tem seu próprio i</code></pre>
                <div class="aula-callout aula-callout--warning">
                  <strong>Evite var em código moderno.</strong> Use <code>let</code> ou <code>const</code>. O <code>var</code> ainda é válido por compatibilidade, mas cria comportamentos imprevisíveis.
                </div>
              </section>

              <section class="aula-section">
                <h2>Resumo</h2>
                <ul class="aula-list">
                  <li><code>var</code> tem <strong>escopo de função</strong> — não respeita blocos <code>{}</code>.</li>
                  <li>Sofre <strong>hoisting</strong> — a declaração sobe, mas o valor fica <code>undefined</code> até a atribuição.</li>
                  <li>Permite <strong>redeclaração</strong> sem erro — fonte de bugs silenciosos.</li>
                  <li>Causa problemas com closures em loops.</li>
                  <li>Não use <code>var</code> em código novo.</li>
                </ul>
              </section>

            </div>

            <nav class="aula-nav">
              <span></span>
              <a href="${meta.next}" class="aula-nav__btn aula-nav__btn--next">
                Próxima aula
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </nav>

          </div>
        </main>`;
    }
  }
  customElements.define("aula-var", AulaVar);
}
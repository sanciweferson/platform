if (!customElements.get("aula-const")) {
  const META = {
    pagina: "variaveis-tipos/aulas/03",
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "03", title: "const", duration: "9 min", badge: "Grátis",
    prev: "?pagina=variaveis-tipos/aulas/02", next: "?pagina=variaveis-tipos/aulas/04",
  };
  const nav = (m) => /*html*/`<nav class="aula-nav"><a href="${m.prev}" class="aula-nav__btn aula-nav__btn--prev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>Aula anterior</a><a href="${m.next}" class="aula-nav__btn aula-nav__btn--next">Próxima aula<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></nav>`;

  class AulaConst extends HTMLElement {
    connectedCallback() {
      const done = window.Progress?.isDone(META.pagina);
      this.innerHTML = /*html*/`
        <main class="page-aula"><div class="aula-wrapper">
          <header class="aula-header">
            <div class="aula-header__meta">
              <a href="${META.moduloHref}" class="aula-back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>${META.modulo}</a>
              <span class="aula-header__num">Aula ${META.num}</span>
            </div>
            <h1 class="aula-header__title">${META.title}</h1>
            <div class="aula-header__info">
              <span class="aula-badge aula-badge--free">${META.badge}</span>
              <span class="aula-duration">${META.duration} de leitura</span>
              <button class="btn-concluir ${done ? 'done' : ''}" id="btn-concluir"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${done ? 'Concluída' : 'Marcar como concluída'}</button>
            </div>
          </header>
          <div class="aula-body">

            <section class="aula-section">
              <h2>O que é <code>const</code>?</h2>
              <p>Também do ES6, <code>const</code> declara uma <strong>referência constante</strong> — você não pode reatribuir a variável após a declaração. É o padrão recomendado: use <code>const</code> sempre que possível e só troque para <code>let</code> quando precisar reatribuir.</p>
            </section>

            <section class="aula-section">
              <h2>Referência imutável ≠ valor imutável</h2>
              <p>Esse é o ponto mais importante sobre <code>const</code>: ela torna a <em>ligação</em> entre o nome e o valor imutável — mas se o valor for um objeto ou array, o <strong>conteúdo</strong> ainda pode mudar.</p>
              ${window.codeBlock(`// Com primitivos — totalmente imutável
const PI = 3.14159;
PI = 3; // TypeError: Assignment to constant variable

const nome = "Ana";
nome = "Bruno"; // TypeError!
nome += "!";    // TypeError!`)}
            </section>

            <section class="aula-section">
              <h2><code>const</code> com objetos</h2>
              <p>A referência ao objeto é constante — mas as <strong>propriedades</strong> podem mudar livremente.</p>
              ${window.codeBlock(`const usuario = { nome: "Ana", idade: 25 };

// Modificar propriedades — ✓ permitido
usuario.nome  = "Bruno";
usuario.email = "b@email.com";
delete usuario.idade;

console.log(usuario); // { nome: "Bruno", email: "b@email.com" }

// Reatribuir a variável — ✗ TypeError
usuario = {};       // TypeError!
usuario = { nome: "Carlos" }; // TypeError!`)}
            </section>

            <section class="aula-section">
              <h2><code>const</code> com arrays</h2>
              ${window.codeBlock(`const frutas = ["maçã", "banana", "uva"];

// Modificar o array — ✓ permitido
frutas.push("manga");   // adiciona
frutas.pop();           // remove o último
frutas[0] = "pera";     // modifica índice
frutas.sort();          // ordena no lugar

console.log(frutas); // ["banana", "pera", "uva"]

// Reatribuir a variável — ✗ TypeError
frutas = ["kiwi"];  // TypeError!
frutas = [];        // TypeError!`)}
            </section>

            <section class="aula-section">
              <h2>Obrigatório inicializar</h2>
              <p><code>const</code> exige um valor na declaração — diferente de <code>let</code> e <code>var</code>.</p>
              ${window.codeBlock(`const x;       // SyntaxError: Missing initializer in const declaration
const y = 10;  // ✓

// let pode ser declarada sem valor
let z;
console.log(z); // undefined`)}
            </section>

            <section class="aula-section">
              <h2>Object.freeze() — imutabilidade real</h2>
              <p>Para tornar o <em>conteúdo</em> de um objeto imutável, use <code>Object.freeze()</code>. Mas atenção: o freeze é <strong>raso</strong> — objetos aninhados ainda podem ser modificados.</p>
              ${window.codeBlock(`const config = Object.freeze({
  versao: "1.0",
  debug: false,
  db: { host: "localhost" } // objeto aninhado
});

config.versao = "2.0"; // ignorado silenciosamente (ou TypeError no strict mode)
config.debug  = true;  // ignorado

// O freeze não é profundo!
config.db.host = "producao"; // ✓ funciona — bug potencial!

console.log(config.versao);  // "1.0"  — freeze funcionou
console.log(config.db.host); // "producao" — aninhado não foi congelado`)}
              <div class="aula-callout aula-callout--info">
                Para imutabilidade profunda, use bibliotecas como <code>immer</code> ou crie
                uma função recursiva de freeze. Para a maioria dos casos, <code>Object.freeze()</code> é suficiente.
              </div>
            </section>

            <section class="aula-section">
              <h2>A regra de ouro</h2>
              <div class="aula-cards">
                <div class="aula-card">
                  <div class="aula-card__icon">🥇</div>
                  <h3>Sempre const</h3>
                  <p>Comece toda variável com <code>const</code>. É a escolha mais segura por padrão.</p>
                </div>
                <div class="aula-card">
                  <div class="aula-card__icon">🔄</div>
                  <h3>let quando mudar</h3>
                  <p>Troque para <code>let</code> apenas quando precisar reatribuir.</p>
                </div>
                <div class="aula-card">
                  <div class="aula-card__icon">🚫</div>
                  <h3>Nunca var</h3>
                  <p>Esqueça <code>var</code> em código moderno.</p>
                </div>
              </div>
            </section>

            <section class="aula-section">
              <h2>Comparativo final</h2>
              <div class="aula-table-wrapper">
                <table class="aula-table">
                  <thead><tr><th></th><th><code>var</code></th><th><code>let</code></th><th><code>const</code></th></tr></thead>
                  <tbody>
                    <tr><td>Escopo</td><td>Função</td><td>Bloco</td><td>Bloco</td></tr>
                    <tr><td>Hoisting</td><td>Sim (undefined)</td><td>Sim (TDZ)</td><td>Sim (TDZ)</td></tr>
                    <tr><td>Redeclaração</td><td>✓</td><td>✗</td><td>✗</td></tr>
                    <tr><td>Reatribuição</td><td>✓</td><td>✓</td><td>✗</td></tr>
                    <tr><td>Inicialização</td><td>Opcional</td><td>Opcional</td><td>Obrigatória</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section class="aula-section">
              <h2>Resumo</h2>
              <ul class="aula-list">
                <li><code>const</code> cria uma <strong>referência imutável</strong> — não o valor em si.</li>
                <li>Objetos e arrays com <code>const</code> têm conteúdo <strong>mutável</strong>.</li>
                <li>Use <code>Object.freeze()</code> para imutabilidade rasa do conteúdo.</li>
                <li><code>const</code> exige <strong>inicialização</strong> na declaração.</li>
                <li>Use <code>const</code> por padrão — troque para <code>let</code> só quando necessário.</li>
              </ul>
            </section>

          </div>
          ${nav(META)}
        </div></main>`;

      document.getElementById("btn-concluir")?.addEventListener("click", function () {
        const isDone = window.Progress?.isDone(META.pagina);
        isDone ? window.Progress?.uncomplete(META.pagina) : window.Progress?.complete(META.pagina);
        this.classList.toggle("done", !isDone);
        this.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${!isDone ? "Concluída" : "Marcar como concluída"}`;
      });
    }
  }
  customElements.define("aula-const", AulaConst);
}
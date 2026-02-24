if (!customElements.get("aula-const")) {
  const meta = {
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "03", title: "const",
    duration: "8 min", badge: "Grátis",
    prev: "?pagina=variaveis-tipos/aulas/02", next: "?pagina=variaveis-tipos/aulas/04",
  };
  class AulaConst extends HTMLElement {
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
                <h2>O que é const?</h2>
                <p>Também introduzido no ES6, <code>const</code> declara uma <strong>referência constante</strong>. Você não pode reatribuir a variável após a declaração. É o padrão recomendado — use <code>const</code> sempre que possível.</p>
              </section>

              <section class="aula-section">
                <h2>Referência imutável, não valor</h2>
                <p>A palavra "constante" pode enganar. <code>const</code> torna a <strong>ligação</strong> entre nome e valor imutável — mas se o valor for um objeto ou array, o seu <em>conteúdo</em> ainda pode ser alterado.</p>
                <pre class="aula-code"><code>// Primitivo — totalmente imutável
const PI = 3.14159;
PI = 3; // TypeError: Assignment to constant variable

const nome = "Ana";
nome = "Bruno"; // TypeError!</code></pre>
              </section>

              <section class="aula-section">
                <h2>const com objetos</h2>
                <p>A referência ao objeto é constante — mas as propriedades podem mudar.</p>
                <pre class="aula-code"><code>const usuario = { nome: "Ana", idade: 25 };

usuario.nome = "Bruno";  // ✓ propriedade pode mudar
usuario.email = "b@b.com"; // ✓ pode adicionar

usuario = {}; // ✗ TypeError — reatribuição não permitida!

console.log(usuario); // { nome: "Bruno", idade: 25, email: "b@b.com" }</code></pre>
              </section>

              <section class="aula-section">
                <h2>const com arrays</h2>
                <p>O mesmo vale para arrays — o conteúdo pode mudar, mas você não pode reatribuir.</p>
                <pre class="aula-code"><code>const frutas = ["maçã", "banana"];

frutas.push("uva");   // ✓ ["maçã", "banana", "uva"]
frutas[0] = "pera";   // ✓ ["pera", "banana", "uva"]
frutas.pop();         // ✓ ["pera", "banana"]

frutas = ["kiwi"];    // ✗ TypeError!</code></pre>
              </section>

              <section class="aula-section">
                <h2>Object.freeze — imutabilidade real</h2>
                <p>Se você precisa que o objeto em si seja imutável, use <code>Object.freeze()</code>. Mas atenção: o freeze é <strong>raso</strong> — objetos aninhados ainda podem mudar.</p>
                <pre class="aula-code"><code>const config = Object.freeze({
  versao: "1.0",
  debug: false,
  db: { host: "localhost" }
});

config.versao = "2.0";    // silenciosamente ignorado (ou TypeError no strict mode)
config.debug = true;      // ignorado
config.db.host = "prod";  // ✓ funciona — freeze é raso!

console.log(config.versao);   // "1.0"
console.log(config.db.host);  // "prod"</code></pre>
              </section>

              <section class="aula-section">
                <h2>Obrigatório inicializar</h2>
                <p>Diferente de <code>let</code> e <code>var</code>, <code>const</code> exige um valor na declaração.</p>
                <pre class="aula-code"><code>const x;      // SyntaxError: Missing initializer in const declaration
const y = 10; // ✓</code></pre>
              </section>

              <section class="aula-section">
                <h2>A regra de ouro</h2>
                <div class="aula-cards">
                  <div class="aula-card">
                    <div class="aula-card__icon">🥇</div>
                    <h3>Sempre const</h3>
                    <p>Comece toda variável com <code>const</code>. Só troque se precisar reatribuir.</p>
                  </div>
                  <div class="aula-card">
                    <div class="aula-card__icon">🔄</div>
                    <h3>let se necessário</h3>
                    <p>Troque para <code>let</code> apenas quando o valor vai mudar.</p>
                  </div>
                  <div class="aula-card">
                    <div class="aula-card__icon">🚫</div>
                    <h3>Nunca var</h3>
                    <p>Esqueça <code>var</code> em código moderno.</p>
                  </div>
                </div>
              </section>

              <section class="aula-section">
                <h2>Resumo</h2>
                <ul class="aula-list">
                  <li><code>const</code> cria uma <strong>referência imutável</strong> — não o valor em si.</li>
                  <li>Objetos e arrays com <code>const</code> ainda têm conteúdo <strong>mutável</strong>.</li>
                  <li>Para imutabilidade real, use <code>Object.freeze()</code> (mas é raso).</li>
                  <li><code>const</code> exige <strong>inicialização</strong> na declaração.</li>
                  <li>Use <code>const</code> por padrão — é a escolha mais segura.</li>
                </ul>
              </section>

            </div>

            <nav class="aula-nav">
              <a href="${meta.prev}" class="aula-nav__btn aula-nav__btn--prev">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Aula anterior
              </a>
              <a href="${meta.next}" class="aula-nav__btn aula-nav__btn--next">
                Próxima aula
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </nav>

          </div>
        </main>`;
    }
  }
  customElements.define("aula-const", AulaConst);
}
if (!customElements.get("aula-let")) {
  const meta = {
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "02", title: "let",
    duration: "9 min", badge: "Grátis",
    prev: "?pagina=variaveis-tipos/aulas/01", next: "?pagina=variaveis-tipos/aulas/03",
  };
  class AulaLet extends HTMLElement {
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
                <h2>O que é let?</h2>
                <p>Introduzido no ES6 (2015), <code>let</code> resolve os principais problemas do <code>var</code>: tem <strong>escopo de bloco</strong> e não permite redeclaração. É o substituto moderno para a maioria dos casos onde você usaria <code>var</code>.</p>
              </section>

              <section class="aula-section">
                <h2>Escopo de bloco</h2>
                <p>Diferente do <code>var</code>, uma variável <code>let</code> existe <strong>apenas dentro do bloco</strong> <code>{}</code> em que foi declarada.</p>
                <pre class="aula-code"><code>if (true) {
  let cidade = "São Paulo";
  console.log(cidade); // "São Paulo" ✓
}
console.log(cidade); // ReferenceError — não existe aqui!

for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2 ✓
}
console.log(i); // ReferenceError</code></pre>
              </section>

              <section class="aula-section">
                <h2>Temporal Dead Zone (TDZ)</h2>
                <p><code>let</code> também sofre hoisting — mas ao contrário do <code>var</code>, não é inicializado com <code>undefined</code>. A variável fica na <strong>Temporal Dead Zone</strong> até a linha de declaração: qualquer acesso antes disso lança <code>ReferenceError</code>.</p>
                <pre class="aula-code"><code>console.log(nome); // ReferenceError — TDZ!
let nome = "Ana";
console.log(nome); // "Ana"

// Com var, seria diferente:
console.log(outro); // undefined (sem erro)
var outro = "x";</code></pre>
                <div class="aula-callout aula-callout--info">
                  A TDZ é um comportamento <strong>intencional e saudável</strong>. Ela força você a declarar variáveis antes de usá-las, tornando o código mais previsível.
                </div>
              </section>

              <section class="aula-section">
                <h2>Sem redeclaração</h2>
                <p><code>let</code> não permite declarar a mesma variável duas vezes no mesmo escopo — o que previne bugs silenciosos do <code>var</code>.</p>
                <pre class="aula-code"><code>let usuario = "Ana";
let usuario = "Bruno"; // SyntaxError!

// Mas em escopos diferentes é ok
let x = 1;
{
  let x = 2; // novo x, escopo diferente
  console.log(x); // 2
}
console.log(x); // 1</code></pre>
              </section>

              <section class="aula-section">
                <h2>let em loops — resolvendo o bug clássico</h2>
                <p>Lembra do bug com <code>var</code> em loops? <code>let</code> resolve isso porque cada iteração cria um <strong>novo escopo</strong> para a variável.</p>
                <pre class="aula-code"><code>// ✓ com let — funciona corretamente
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Imprime: 0, 1, 2</code></pre>
              </section>

              <section class="aula-section">
                <h2>Quando usar let?</h2>
                <div class="aula-cards">
                  <div class="aula-card">
                    <div class="aula-card__icon">🔢</div>
                    <h3>Contadores</h3>
                    <p>Variáveis que incrementam ou decrementam em loops.</p>
                  </div>
                  <div class="aula-card">
                    <div class="aula-card__icon">🔄</div>
                    <h3>Reatribuição</h3>
                    <p>Quando o valor da variável vai mudar ao longo do código.</p>
                  </div>
                  <div class="aula-card">
                    <div class="aula-card__icon">🎯</div>
                    <h3>Estado local</h3>
                    <p>Variáveis de estado dentro de funções ou blocos específicos.</p>
                  </div>
                </div>
                <pre class="aula-code"><code>let contador = 0;
contador++;      // 1
contador += 5;   // 6

let nome = "Ana";
nome = "Bruno";  // ✓ reatribuição permitida</code></pre>
              </section>

              <section class="aula-section">
                <h2>Resumo</h2>
                <ul class="aula-list">
                  <li><code>let</code> tem <strong>escopo de bloco</strong> — vive apenas dentro do <code>{}</code> onde foi declarado.</li>
                  <li>Entra na <strong>TDZ</strong> — acessar antes da declaração lança <code>ReferenceError</code>.</li>
                  <li><strong>Não permite redeclaração</strong> no mesmo escopo.</li>
                  <li>Resolve o bug clássico de closures em loops.</li>
                  <li>Use quando o valor precisa ser <strong>reatribuído</strong>. Se não precisar, prefira <code>const</code>.</li>
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
  customElements.define("aula-let", AulaLet);
}
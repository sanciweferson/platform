if (!customElements.get("aula-tipos-referencia")) {
  const meta = {
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "06", title: "Tipos de referência",
    duration: "12 min", badge: "Pro",
    prev: "?pagina=variaveis-tipos/aulas/05", next: "?pagina=variaveis-tipos/aulas/07",
  };
  class AulaTiposReferencia extends HTMLElement {
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
                <span class="aula-badge aula-badge--pro">${meta.badge}</span>
                <span class="aula-duration">${meta.duration} de leitura</span>
              </div>
            </header>

            <div class="aula-body">

              <section class="aula-section">
                <h2>Stack vs Heap</h2>
                <p>A diferença entre primitivos e tipos de referência está em <strong>onde ficam na memória</strong>.</p>
                <div class="aula-cards">
                  <div class="aula-card">
                    <div class="aula-card__icon">📦</div>
                    <h3>Stack</h3>
                    <p>Primitivos ficam aqui. Acesso rápido, tamanho fixo, copiados por <strong>valor</strong>.</p>
                  </div>
                  <div class="aula-card">
                    <div class="aula-card__icon">🏗️</div>
                    <h3>Heap</h3>
                    <p>Objetos e arrays ficam aqui. Tamanho dinâmico, acessados por <strong>referência</strong>.</p>
                  </div>
                </div>
              </section>

              <section class="aula-section">
                <h2>Objetos — cópia por referência</h2>
                <p>Ao atribuir um objeto a outra variável, você copia a <strong>referência</strong> — ambas apontam para o mesmo lugar na memória.</p>
                <pre class="aula-code"><code>const pessoa = { nome: "Ana" };
const outra  = pessoa;       // copia a referência!

outra.nome = "Bruno";
console.log(pessoa.nome);    // "Bruno" — foi alterado!

// Para clonar (cópia rasa)
const clone = { ...pessoa };
clone.nome = "Carlos";
console.log(pessoa.nome);    // "Bruno" — não foi afetado</code></pre>
              </section>

              <section class="aula-section">
                <h2>Arrays — mesma lógica</h2>
                <pre class="aula-code"><code>const frutas  = ["maçã", "banana"];
const copia   = frutas;      // referência!
copia.push("uva");
console.log(frutas);         // ["maçã", "banana", "uva"]

// Para clonar
const clone1 = [...frutas];
const clone2 = frutas.slice();

// Checar se é array
Array.isArray(frutas);       // true
typeof frutas;               // "object" — não use isso</code></pre>
              </section>

              <section class="aula-section">
                <h2>Funções são objetos</h2>
                <pre class="aula-code"><code>function somar(a, b) { return a + b; }
typeof somar;                // "function"
somar instanceof Object;     // true

// Funções como valor (first-class)
const fn = somar;
fn(2, 3);                    // 5

// Como argumento (callback)
[3,1,2].sort((a, b) => a - b); // [1, 2, 3]</code></pre>
              </section>

              <section class="aula-section">
                <h2>Comparação por referência</h2>
                <pre class="aula-code"><code>// Primitivos — compara valores
5 === 5;            // true
"oi" === "oi";      // true

// Objetos — compara endereços na memória
const a = { x: 1 };
const b = { x: 1 };
const c = a;

a === b;  // false — objetos diferentes
a === c;  // true  — mesma referência</code></pre>
              </section>

              <section class="aula-section">
                <h2>Cópia rasa vs profunda</h2>
                <p>O spread faz cópia <strong>rasa</strong> — objetos aninhados ainda são referências.</p>
                <pre class="aula-code"><code>const original = {
  nome: "Ana",
  endereco: { cidade: "SP" }
};

const raso = { ...original };
raso.nome = "Bruno";            // ✓ independente
raso.endereco.cidade = "RJ";    // ✗ afeta original!

console.log(original.endereco.cidade); // "RJ"

// Cópia profunda moderna
const profundo = structuredClone(original);
profundo.endereco.cidade = "MG";
console.log(original.endereco.cidade); // "RJ" — agora seguro</code></pre>
                <div class="aula-callout aula-callout--info">
                  <strong>structuredClone()</strong> é o método moderno para cópia profunda — disponível em todos os browsers modernos desde 2022.
                </div>
              </section>

              <section class="aula-section">
                <h2>Resumo</h2>
                <ul class="aula-list">
                  <li>Primitivos ficam na <strong>stack</strong>, copiados por valor.</li>
                  <li>Objetos/arrays ficam na <strong>heap</strong>, copiados por referência.</li>
                  <li>Dois objetos com mesmo conteúdo <strong>não são iguais</strong> com <code>===</code>.</li>
                  <li>Spread <code>{ ...obj }</code> faz cópia <strong>rasa</strong>.</li>
                  <li>Use <code>structuredClone()</code> para cópia <strong>profunda</strong>.</li>
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
  customElements.define("aula-tipos-referencia", AulaTiposReferencia);
}
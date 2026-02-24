if (!customElements.get("aula-tipos-primitivos")) {
  const meta = {
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "05", title: "Tipos primitivos",
    duration: "13 min", badge: "Pro",
    prev: "?pagina=variaveis-tipos/aulas/04", next: "?pagina=variaveis-tipos/aulas/06",
  };
  class AulaTiposPrimitivos extends HTMLElement {
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
                <h2>Primitivos em profundidade</h2>
                <p>Primitivos são valores <strong>imutáveis</strong> armazenados diretamente na <strong>stack</strong>. Quando você copia um primitivo, cria uma cópia completamente independente. O JS tem 7 tipos primitivos.</p>
                <pre class="aula-code"><code>let a = 10;
let b = a;  // cópia do valor
b = 20;
console.log(a); // 10 — não foi afetado
console.log(b); // 20</code></pre>
              </section>

              <section class="aula-section">
                <h2>String</h2>
                <p>Sequência imutável de caracteres Unicode. Pode usar aspas simples, duplas ou backtick.</p>
                <pre class="aula-code"><code>const s1 = "aspas duplas";
const s2 = 'aspas simples';
const s3 = \`template \${"literal"}\`;

// Métodos úteis
"Ana".length;           // 3
"Ana".toUpperCase();    // "ANA"
"Ana".includes("n");    // true
"Ana".slice(1);         // "na"
"  espaços  ".trim();   // "espaços"
"a,b,c".split(",");     // ["a", "b", "c"]</code></pre>
              </section>

              <section class="aula-section">
                <h2>Number</h2>
                <p>Um único tipo para inteiros e decimais — IEEE 754 de 64 bits. Causa a famosa imprecisão de ponto flutuante.</p>
                <pre class="aula-code"><code>42;      // inteiro
3.14;    // decimal
-7;      // negativo
0.1 + 0.2; // 0.30000000000000004 ← ponto flutuante!

// Valores especiais
Infinity;        // maior que qualquer número
-Infinity;
NaN;             // Not a Number — ainda é do tipo "number"

// Helpers
Number.isNaN(NaN);          // true  ← use esse
Number.isFinite(Infinity);  // false
Number.isInteger(42);       // true
Number.MAX_SAFE_INTEGER;    // 9007199254740991</code></pre>
              </section>

              <section class="aula-section">
                <h2>Boolean</h2>
                <p>Apenas <code>true</code> ou <code>false</code>. Usado em condicionais, comparações e operações lógicas.</p>
                <pre class="aula-code"><code>true && false  // false
true || false  // true
!true          // false

// Conversão explícita
Boolean(0)     // false
Boolean("")    // false
Boolean(null)  // false
Boolean("oi")  // true
Boolean([])    // true  ← array vazio é truthy!</code></pre>
              </section>

              <section class="aula-section">
                <h2>undefined</h2>
                <p>Atribuído automaticamente pelo JS quando uma variável é declarada sem valor, ou quando uma função não retorna nada.</p>
                <pre class="aula-code"><code>let x;
console.log(x);           // undefined
console.log(typeof x);    // "undefined"

function semRetorno() {}
console.log(semRetorno()); // undefined

const obj = {};
console.log(obj.prop);    // undefined — propriedade inexistente</code></pre>
              </section>

              <section class="aula-section">
                <h2>null</h2>
                <p>Ausência <strong>intencional</strong> de valor. Você atribui quando quer dizer explicitamente "sem valor aqui".</p>
                <pre class="aula-code"><code>const resultado = null; // sem valor por enquanto

console.log(typeof null); // "object" ← bug histórico!

// Para checar null corretamente
resultado === null; // true
resultado == undefined; // true  (loose equality)
resultado === undefined; // false (strict — tipos diferentes)</code></pre>
              </section>

              <section class="aula-section">
                <h2>Symbol</h2>
                <p>Valor único e imutável. Útil como chave de propriedade sem risco de colisão.</p>
                <pre class="aula-code"><code>const id = Symbol("id");
const id2 = Symbol("id");
id === id2; // false — sempre únicos!

const obj = { [id]: 123 };
console.log(obj[id]); // 123</code></pre>
              </section>

              <section class="aula-section">
                <h2>BigInt</h2>
                <p>Para inteiros maiores que <code>Number.MAX_SAFE_INTEGER</code>. Adicione <code>n</code> ao final.</p>
                <pre class="aula-code"><code>const grande = 9007199254740992n;
typeof grande;    // "bigint"
grande + 1n;      // 9007199254740993n

// Não misture com Number!
grande + 1;       // TypeError</code></pre>
              </section>

              <section class="aula-section">
                <h2>Tabela dos 7 tipos</h2>
                <div class="aula-table-wrapper">
                  <table class="aula-table">
                    <thead><tr><th>Tipo</th><th>Exemplo</th><th>typeof</th><th>Mutável?</th></tr></thead>
                    <tbody>
                      <tr><td>String</td><td><code>"texto"</code></td><td><code>"string"</code></td><td>Não</td></tr>
                      <tr><td>Number</td><td><code>42</code>, <code>3.14</code></td><td><code>"number"</code></td><td>Não</td></tr>
                      <tr><td>Boolean</td><td><code>true</code></td><td><code>"boolean"</code></td><td>Não</td></tr>
                      <tr><td>undefined</td><td><code>undefined</code></td><td><code>"undefined"</code></td><td>Não</td></tr>
                      <tr><td>null</td><td><code>null</code></td><td><code>"object"</code> ⚠️</td><td>Não</td></tr>
                      <tr><td>Symbol</td><td><code>Symbol()</code></td><td><code>"symbol"</code></td><td>Não</td></tr>
                      <tr><td>BigInt</td><td><code>42n</code></td><td><code>"bigint"</code></td><td>Não</td></tr>
                    </tbody>
                  </table>
                </div>
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
  customElements.define("aula-tipos-primitivos", AulaTiposPrimitivos);
}
if (!customElements.get("aula-tipos-dados")) {
  const meta = {
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "04", title: "Tipos de dados",
    duration: "9 min", badge: "Grátis",
    prev: "?pagina=variaveis-tipos/aulas/03", next: "?pagina=variaveis-tipos/aulas/05",
  };
  class AulaTiposDados extends HTMLElement {
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
                <h2>As duas categorias</h2>
                <p>Todo valor em JavaScript pertence a um tipo. Esses tipos se dividem em duas categorias fundamentais que diferem em <strong>como são armazenados e copiados na memória</strong>.</p>
                <div class="aula-cards">
                  <div class="aula-card">
                    <div class="aula-card__icon">🔹</div>
                    <h3>Primitivos</h3>
                    <p>Imutáveis. Armazenados por <strong>valor</strong> na stack. Copiados integralmente.</p>
                  </div>
                  <div class="aula-card">
                    <div class="aula-card__icon">🔷</div>
                    <h3>Referência</h3>
                    <p>Mutáveis. Armazenados por <strong>referência</strong> na heap. Copiados como ponteiro.</p>
                  </div>
                </div>
              </section>

              <section class="aula-section">
                <h2>typeof — identificando tipos</h2>
                <p><code>typeof</code> retorna uma string com o tipo do valor. É a forma mais rápida de checar — mas tem uma exceção histórica famosa.</p>
                <pre class="aula-code"><code>typeof "texto"       // "string"
typeof 42            // "number"
typeof 3.14          // "number"   — mesmo tipo para int e float
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object"   ← bug de 1995, nunca corrigido
typeof Symbol()      // "symbol"
typeof 42n           // "bigint"
typeof {}            // "object"
typeof []            // "object"   ← arrays são objetos
typeof function(){}  // "function"</code></pre>
                <div class="aula-callout aula-callout--warning">
                  <strong>typeof null === "object"</strong> é um bug histórico que existe desde o JavaScript 1.0 e nunca foi corrigido para não quebrar código legado. Para checar null, use <code>=== null</code>.
                </div>
              </section>

              <section class="aula-section">
                <h2>Tipagem dinâmica</h2>
                <p>JavaScript é <strong>dinamicamente tipado</strong> — uma variável pode mudar de tipo em tempo de execução. Isso dá flexibilidade, mas exige atenção.</p>
                <pre class="aula-code"><code>let valor = 42;
console.log(typeof valor); // "number"

valor = "texto";
console.log(typeof valor); // "string"

valor = true;
console.log(typeof valor); // "boolean"

valor = { nome: "Ana" };
console.log(typeof valor); // "object"</code></pre>
              </section>

              <section class="aula-section">
                <h2>Truthy e Falsy</h2>
                <p>Em JavaScript, qualquer valor pode ser usado em contexto booleano. Valores <strong>falsy</strong> são convertidos para <code>false</code>; todos os outros são <strong>truthy</strong>.</p>
                <div class="aula-table-wrapper">
                  <table class="aula-table">
                    <thead><tr><th>Falsy (vira false)</th><th>Truthy (exemplos)</th></tr></thead>
                    <tbody>
                      <tr><td><code>false</code></td><td><code>true</code></td></tr>
                      <tr><td><code>0</code>, <code>-0</code>, <code>0n</code></td><td>Qualquer número ≠ 0</td></tr>
                      <tr><td><code>""</code> (string vazia)</td><td>Qualquer string não vazia</td></tr>
                      <tr><td><code>null</code></td><td><code>[]</code> array vazio!</td></tr>
                      <tr><td><code>undefined</code></td><td><code>{}</code> objeto vazio!</td></tr>
                      <tr><td><code>NaN</code></td><td>Qualquer função</td></tr>
                    </tbody>
                  </table>
                </div>
                <pre class="aula-code"><code>// Cuidado: arrays e objetos vazios são truthy!
if ([]) console.log("truthy"); // imprime!
if ({}) console.log("truthy"); // imprime!

// Checagem comum
const nome = "";
if (!nome) console.log("Nome vazio!"); // imprime</code></pre>
              </section>

              <section class="aula-section">
                <h2>Resumo</h2>
                <ul class="aula-list">
                  <li>JS tem dois grupos: <strong>primitivos</strong> (por valor) e <strong>referência</strong> (por referência).</li>
                  <li><code>typeof</code> retorna o tipo como string — mas <code>typeof null</code> é <code>"object"</code> por bug histórico.</li>
                  <li>JS é <strong>dinamicamente tipado</strong> — variáveis podem mudar de tipo.</li>
                  <li>Arrays e objetos vazios são <strong>truthy</strong> — cuidado com checagens diretas.</li>
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
  customElements.define("aula-tipos-dados", AulaTiposDados);
}
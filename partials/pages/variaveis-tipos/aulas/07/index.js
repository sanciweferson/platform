if (!customElements.get("aula-coercao-tipos")) {
  const meta = {
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "07", title: "Coerção de tipos",
    duration: "11 min", badge: "Pro",
    prev: "?pagina=variaveis-tipos/aulas/06", next: "?pagina=variaveis-tipos/aulas/08",
  };

  class AulaCoercaoTipos extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <main class="page-aula">
          <div class="aula-wrapper">

            <header class="aula-header">
              <div class="aula-header__meta">
                <a href="${meta.moduloHref}" class="aula-back">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
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
                <h2>O que é coerção de tipos?</h2>
                <p>
                  Coerção acontece quando o JavaScript <strong>converte automaticamente um tipo em outro</strong>
                  para conseguir executar uma operação.
                </p>

                <pre class="aula-code"><code>"5" + 1
// "51"  → o número virou string

"5" - 1
// 4 → a string virou número</code></pre>

                <div class="aula-callout aula-callout--info">
                  O operador <code>+</code> pode significar soma ou concatenação.  
                  O JavaScript tenta adivinhar o que você quer.
                </div>
              </section>


              <section class="aula-section">
                <h2>Coerção implícita</h2>
                <p>
                  Acontece automaticamente, sem você pedir. O JS tenta converter valores para tipos compatíveis.
                </p>

                <pre class="aula-code"><code>10 + "5"
// "105" → número virou string

"10" * 2
// 20 → string virou número

true + 1
// 2 → true vira 1

false + 1
// 1 → false vira 0</code></pre>

                <p>
                  O JavaScript usa regras internas para converter valores. Às vezes essas regras são intuitivas…
                  às vezes parecem magia negra.
                </p>
              </section>


              <section class="aula-section">
                <h2>Coerção explícita</h2>
                <p>
                  Aqui você <strong>manda explicitamente</strong> converter o tipo.
                </p>

                <pre class="aula-code"><code>// String → Number
Number("42");      // 42

// String → Integer
parseInt("42");    // 42

// Qualquer valor → String
String(100);       // "100"

// Qualquer valor → Boolean
Boolean(1);        // true
Boolean(0);        // false</code></pre>

                <div class="aula-callout aula-callout--info">
                  Converter explicitamente é mais seguro do que depender da coerção automática.
                </div>
              </section>


              <section class="aula-section">
                <h2>Valores falsy e truthy</h2>
                <p>
                  Em contextos booleanos (como <code>if</code>), alguns valores viram automaticamente
                  <strong>true</strong> ou <strong>false</strong>.
                </p>

                <pre class="aula-code"><code>// Falsy (viram false)
Boolean(0)
Boolean("")
Boolean(null)
Boolean(undefined)
Boolean(NaN)

// Truthy (viram true)
Boolean("hello")
Boolean(42)
Boolean([])
Boolean({})</code></pre>

                <p>
                  Quase tudo em JavaScript é considerado <strong>true</strong>.  
                  Apenas alguns valores específicos são falsy.
                </p>
              </section>


              <section class="aula-section">
                <h2>== vs ===</h2>
                <p>
                  Aqui mora uma das maiores armadilhas do JavaScript.
                </p>

                <div class="aula-cards">

                  <div class="aula-card">
                    <div class="aula-card__icon">⚠️</div>
                    <h3>==</h3>
                    <p>
                      Compara valores <strong>após coerção de tipos</strong>.
                    </p>
                  </div>

                  <div class="aula-card">
                    <div class="aula-card__icon">✅</div>
                    <h3>===</h3>
                    <p>
                      Compara valor e tipo.  
                      <strong>Não faz coerção.</strong>
                    </p>
                  </div>

                </div>

                <pre class="aula-code"><code>5 == "5"
// true → coerção aconteceu

5 === "5"
// false → tipos diferentes</code></pre>
              </section>


              <section class="aula-section">
                <h2>Algumas bizarrices famosas</h2>

                <pre class="aula-code"><code>[] + []
// ""

[] + {}
// "[object Object]"

{} + []
// 0

"5" + 2
// "52"

"5" - 2
// 3</code></pre>

                <p>
                  Essas coisas acontecem porque o JavaScript tenta converter objetos em
                  <strong>strings ou números</strong> antes de executar a operação.
                </p>
              </section>


              <section class="aula-section">
                <h2>Resumo</h2>

                <ul class="aula-list">
                  <li><strong>Coerção</strong> é a conversão automática de tipos.</li>
                  <li>Operadores podem forçar conversões inesperadas.</li>
                  <li><code>==</code> permite coerção.</li>
                  <li><code>===</code> compara tipo e valor.</li>
                  <li>Prefira conversões explícitas com <code>Number()</code>, <code>String()</code> e <code>Boolean()</code>.</li>
                </ul>

              </section>

            </div>


            <nav class="aula-nav">
              <a href="${meta.prev}" class="aula-nav__btn aula-nav__btn--prev">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Aula anterior
              </a>

              <a href="${meta.next}" class="aula-nav__btn aula-nav__btn--next">
                Próxima aula
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </nav>

          </div>
        </main>`;
    }
  }

  customElements.define("aula-coercao-tipos", AulaCoercaoTipos);
}
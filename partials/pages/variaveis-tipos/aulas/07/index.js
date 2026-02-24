if (!customElements.get("aula-coercao-tipos")) {
  const META = {
    pagina: "variaveis-tipos/aulas/07",
    modulo: "Variáveis & Tipos",
    moduloHref: "?pagina=variaveis-tipos",
    num: "07",
    title: "Coerção de tipos",
    duration: "11 min",
    badge: "Pro",
    prev: "?pagina=variaveis-tipos/aulas/06",
    next: "?pagina=variaveis-tipos/aulas/08",
  };

  const nav = (m) => `
    <nav class="aula-nav">
      <a href="${m.prev}" class="aula-nav__btn aula-nav__btn--prev">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Aula anterior
      </a>
      <a href="${m.next}" class="aula-nav__btn aula-nav__btn--next">
        Próxima aula
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </nav>`;

  class AulaCoercaoTipos extends HTMLElement {
    connectedCallback() {
      const done = window.Progress?.isDone(META.pagina);

      this.innerHTML = `
        <main class="page-aula">
          <div class="aula-wrapper">
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
                <span class="aula-badge aula-badge--pro">${META.badge}</span>
                <span class="aula-duration">${META.duration} de leitura</span>
                <button class="btn-concluir ${done ? 'done' : ''}" id="btn-concluir">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ${done ? 'Concluída' : 'Marcar como concluída'}
                </button>
              </div>
            </header>

            <div class="aula-body">
              <section class="aula-section">
                <h2>O que é coerção de tipos?</h2>
                <p>Coerção acontece quando o JavaScript <strong>converte automaticamente um tipo em outro</strong> para conseguir executar uma operação.</p>
                
                ${window.codeBlock(`"5" + 1; // "51" (o número virou string)
"5" - 1; // 4    (a string virou número)
"5" * "2"; // 10   (ambas viraram números)`)}

                <div class="aula-callout aula-callout--info">
                  <strong>Nota:</strong> O operador <code>+</code> é ambíguo pois serve para soma e concatenação. Em qualquer dúvida, o JS prioriza a <strong>String</strong> se um dos lados for texto.
                </div>
              </section>

              <section class="aula-section">
                <h2>Coerção Implícita vs Explícita</h2>
                <p>A coerção <strong>implícita</strong> é o "jeitinho" do JS. A <strong>explícita</strong> (ou Type Casting) é quando você assume o controle.</p>
                
                ${window.codeBlock(`// Implícita (automática)
if ("") { ... }       // "" vira false
const check = !!1;     // 1 vira true

// Explícita (manual)
const num = Number("123"); 
const str = String(true);
const bool = Boolean(0);`)}
              </section>

              <section class="aula-section">
                <h2>Valores Falsy e Truthy</h2>
                <p>Em contextos booleanos (como no <code>if</code>), estes 6 valores sempre serão <strong>falsy</strong>:</p>
                
                <ul class="aula-list">
                  <li><code>false</code>, <code>0</code> (e <code>-0</code> ou <code>0n</code>)</li>
                  <li><code>""</code> (string vazia)</li>
                  <li><code>null</code> e <code>undefined</code></li>
                  <li><code>NaN</code></li>
                </ul>
                <p>Todo o resto (incluindo <code>[]</code> e <code>{}</code> vazios) é <strong>truthy</strong>.</p>
              </section>

              <section class="aula-section">
                <h2>A Armadilha do Igualdade (== vs ===)</h2>
                <div class="aula-cards">
                  <div class="aula-card">
                    <div class="aula-card__icon">⚠️</div>
                    <h3>Abstrata (==)</h3>
                    <p>Compara valores <strong>permitindo coerção</strong>. Tenta converter antes de comparar.</p>
                  </div>
                  <div class="aula-card">
                    <div class="aula-card__icon">✅</div>
                    <h3>Estrita (===)</h3>
                    <p>Compara <strong>valor e tipo</strong>. Se forem tipos diferentes, retorna false imediatamente.</p>
                  </div>
                </div>

                ${window.codeBlock(`5 == "5";   // true
5 === "5";  // false

null == undefined;  // true
null === undefined; // false`)}
              </section>

              <section class="aula-section">
                <h2>Resumo</h2>
                <ul class="aula-list">
                  <li><strong>Coerção</strong> é a conversão "na força" de tipos.</li>
                  <li>O JS é <strong>fracamente tipado</strong>, por isso faz muita coerção implícita.</li>
                  <li>Use sempre <code>===</code> para evitar bugs silenciosos.</li>
                  <li>Valores "vazios" como <code>null</code>, <code>undefined</code> e <code>""</code> tendem a ser <strong>falsy</strong>.</li>
                </ul>
              </section>
            </div>
            ${nav(META)}
          </div>
        </main>`;

                }}

  /* =========================================================
   CODE BLOCK HIGHLIGHTER
   simples, leve e sem bibliotecas
========================================================= */

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  window.codeBlock = function (code) {

    // evita que o navegador interprete HTML
    code = escapeHtml(code);

    // armazenamento temporário
    const store = [];
    let i = 0;

    function protect(regex, cssClass) {
      code = code.replace(regex, match => {
        const id = `___PLACE_${i++}___`;

        store.push({
          id,
          html: `<span class="${cssClass}">${match}</span>`
        });

        return id;
      });
    }

    /* =========================================================
       PROTEGER PARTES SENSÍVEIS
       (strings e comentários primeiro)
    ========================================================= */

    protect(/\/\/.*/g, "hl-comment");

    protect(/(".*?"|'.*?'|`.*?`)/g, "hl-string");


    /* =========================================================
       KEYWORDS
    ========================================================= */

    code = code.replace(
      /\b(var|let|const|if|else|for|while|return|function|class|new|switch|case|break|continue)\b/g,
      '<span class="hl-keyword">$1</span>'
    );


    /* =========================================================
       NÚMEROS
    ========================================================= */

    code = code.replace(
      /\b(\d+)\b/g,
      '<span class="hl-number">$1</span>'
    );


    /* =========================================================
       CONSOLE
    ========================================================= */

    code = code.replace(
      /\b(console)\b/g,
      '<span class="hl-fn">$1</span>'
    );


    /* =========================================================
       PROPRIEDADES
    ========================================================= */

    code = code.replace(
      /\.([a-zA-Z_]+)/g,
      '.<span class="hl-prop">$1</span>'
    );


    /* =========================================================
       RESTAURAR PARTES PROTEGIDAS
    ========================================================= */

    store.forEach(item => {
      code = code.replace(item.id, item.html);
    });


    /* =========================================================
       RETORNAR BLOCO FINAL
    ========================================================= */

    /* =========================================================
    RETORNAR BLOCO FINAL COM BOTÃO DE COPIAR
 ========================================================= */
    return `
<div class="code-container" style="position: relative;">
  <button class="btn-copy" onclick="copyCode(this)" title="Copiar código">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
  </button>
  <pre class="aula-code"><code>${code}</code></pre>
</div>
`;
  };
  window.copyCode = function (btn) {
    // Busca o texto dentro do <code> que está no mesmo container
    const code = btn.parentElement.querySelector('code').innerText;

    navigator.clipboard.writeText(code).then(() => {
      const originalInner = btn.innerHTML;
      btn.innerHTML = '<span>Copiado!</span>';
      btn.classList.add('copied');

      setTimeout(() => {
        btn.innerHTML = originalInner;
        btn.classList.remove('copied');
      }, 2000);
    });
  };

  customElements.define("aula-coercao-tipos", AulaCoercaoTipos);
}
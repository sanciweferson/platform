if (!customElements.get("aula-tipos-dados")) {
  const META = {
    pagina: "variaveis-tipos/aulas/04",
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "04", title: "Tipos de dados", duration: "10 min", badge: "Grátis",
    prev: "?pagina=variaveis-tipos/aulas/03", next: "?pagina=variaveis-tipos/aulas/05",
  };
  const nav = (m) => `<nav class="aula-nav"><a href="${m.prev}" class="aula-nav__btn aula-nav__btn--prev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>Aula anterior</a><a href="${m.next}" class="aula-nav__btn aula-nav__btn--next">Próxima aula<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></nav>`;

  class AulaTiposDados extends HTMLElement {
    connectedCallback() {
      const done = window.Progress?.isDone(META.pagina);
      this.innerHTML = `
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
              <h2>As duas categorias</h2>
              <p>Todo valor em JavaScript pertence a uma das duas categorias. A diferença fundamental está em <strong>como são armazenados e copiados na memória</strong>.</p>
              <div class="aula-cards">
                <div class="aula-card"><div class="aula-card__icon">🔹</div><h3>Primitivos</h3><p>Imutáveis. Armazenados por <strong>valor</strong> na stack. Copiados integralmente. 7 tipos.</p></div>
                <div class="aula-card"><div class="aula-card__icon">🔷</div><h3>Referência</h3><p>Mutáveis. Armazenados por <strong>referência</strong> na heap. Copiados como ponteiro.</p></div>
              </div>
            </section>

            <section class="aula-section">
              <h2>O operador <code>typeof</code></h2>
              <p><code>typeof</code> retorna uma string identificando o tipo do valor. É a forma mais rápida de verificar — mas tem peculiaridades históricas.</p>
              ${window.codeBlock(`typeof "texto"       // "string"
typeof 42            // "number"
typeof 3.14          // "number"   — mesmo tipo para int e decimal
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object"   ← BUG HISTÓRICO de 1995!
typeof Symbol()      // "symbol"
typeof 42n           // "bigint"
typeof {}            // "object"
typeof []            // "object"   ← arrays também são objetos
typeof function(){}  // "function"`)}
              <div class="aula-callout aula-callout--warning">
                <strong>typeof null === "object"</strong> é um bug que existe desde o JavaScript 1.0.
                Nunca foi corrigido para não quebrar código legado. Sempre use <code>=== null</code>
                para verificar null especificamente.
              </div>
            </section>

            <section class="aula-section">
              <h2>Tipagem dinâmica</h2>
              <p>JavaScript é <strong>dinamicamente tipado</strong> — uma variável pode armazenar qualquer tipo e mudar em tempo de execução. Diferente de linguagens como Java ou TypeScript (que são estaticamente tipadas).</p>
              ${window.codeBlock(`let valor = 42;
console.log(typeof valor); // "number"

valor = "agora sou texto";
console.log(typeof valor); // "string"

valor = true;
console.log(typeof valor); // "boolean"

valor = { nome: "Ana" };
console.log(typeof valor); // "object"

// TypeScript resolve isso em tempo de compilação:
// let valor: number = 42;
// valor = "texto"; // Erro de compilação!`)}
            </section>

            <section class="aula-section">
              <h2>Valores Truthy e Falsy</h2>
              <p>Em JavaScript, qualquer valor pode ser usado em contexto booleano. Valores <strong>falsy</strong> viram <code>false</code>; todos os outros são <strong>truthy</strong>.</p>
              <div class="aula-table-wrapper">
                <table class="aula-table">
                  <thead><tr><th>Falsy (→ false)</th><th>Truthy (exemplos → true)</th></tr></thead>
                  <tbody>
                    <tr><td><code>false</code></td><td><code>true</code></td></tr>
                    <tr><td><code>0</code>, <code>-0</code>, <code>0n</code></td><td>Qualquer número ≠ 0</td></tr>
                    <tr><td><code>""</code> (string vazia)</td><td>Qualquer string não vazia, até <code>" "</code></td></tr>
                    <tr><td><code>null</code></td><td><code>[]</code> array vazio ← surpresa!</td></tr>
                    <tr><td><code>undefined</code></td><td><code>{}</code> objeto vazio ← surpresa!</td></tr>
                    <tr><td><code>NaN</code></td><td>Qualquer função, <code>new Date()</code></td></tr>
                  </tbody>
                </table>
              </div>
              ${window.codeBlock(`// Arrays e objetos vazios são TRUTHY — cuidado!
if ([])   console.log("array vazio é truthy!");   // imprime
if ({})   console.log("objeto vazio é truthy!");  // imprime
if (" ")  console.log("espaço é truthy!");        // imprime

// Checar array vazio corretamente
const arr = [];
if (arr.length === 0) console.log("array vazio"); // ✓

// Checar objeto vazio corretamente
const obj = {};
if (Object.keys(obj).length === 0) console.log("objeto vazio"); // ✓`)}
            </section>

            <section class="aula-section">
              <h2>Resumo</h2>
              <ul class="aula-list">
                <li>JS tem dois grupos: <strong>primitivos</strong> (por valor) e <strong>referência</strong> (por referência).</li>
                <li><code>typeof</code> retorna o tipo — mas <code>typeof null</code> é <code>"object"</code> por bug histórico.</li>
                <li>JS é <strong>dinamicamente tipado</strong> — variáveis podem mudar de tipo.</li>
                <li>Arrays e objetos vazios são <strong>truthy</strong> — use <code>.length</code> e <code>Object.keys()</code> para checar.</li>
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
  customElements.define("aula-tipos-dados", AulaTiposDados);
}
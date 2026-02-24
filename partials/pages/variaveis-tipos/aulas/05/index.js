if (!customElements.get("aula-tipos-primitivos")) {
  const META = {
    pagina: "variaveis-tipos/aulas/05",
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "05", title: "Tipos primitivos", duration: "14 min", badge: "Pro",
    prev: "?pagina=variaveis-tipos/aulas/04", next: "?pagina=variaveis-tipos/aulas/06",
  };
  const nav = (m) => `<nav class="aula-nav"><a href="${m.prev}" class="aula-nav__btn aula-nav__btn--prev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>Aula anterior</a><a href="${m.next}" class="aula-nav__btn aula-nav__btn--next">Próxima aula<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></nav>`;

  class AulaTiposPrimitivos extends HTMLElement {
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
              <span class="aula-badge aula-badge--pro">${META.badge}</span>
              <span class="aula-duration">${META.duration} de leitura</span>
              <button class="btn-concluir ${done ? 'done' : ''}" id="btn-concluir"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${done ? 'Concluída' : 'Marcar como concluída'}</button>
            </div>
          </header>
          <div class="aula-body">

            <section class="aula-section">
              <h2>Primitivos são copiados por valor</h2>
              <p>Um valor primitivo é <strong>imutável</strong> e armazenado diretamente na <strong>stack</strong>. Ao copiar, você cria um valor completamente independente — alterar um não afeta o outro.</p>
              ${window.codeBlock(`let a = 10;
let b = a;   // cópia do valor — completamente independente
b = 20;

console.log(a); // 10 — não foi afetado
console.log(b); // 20

// String — imutável
let s = "Ana";
let t = s;
t = t.toUpperCase();
console.log(s); // "Ana" — original intacto
console.log(t); // "ANA"`)}
            </section>

            <section class="aula-section">
              <h2>String</h2>
              <p>Sequência imutável de caracteres Unicode. Pode usar aspas simples, duplas ou backtick (template literal). Strings têm dezenas de métodos úteis — são tratadas como objetos temporários pelo JS.</p>
              ${window.codeBlock(`const nome    = "Ana Silva";
const cidade  = 'São Paulo';
const frase   = \`Olá, \${nome}! Você é de \${cidade}?\`;

// Métodos essenciais
nome.length;                    // 9
nome.toUpperCase();             // "ANA SILVA"
nome.toLowerCase();             // "ana silva"
nome.includes("Silva");         // true
nome.startsWith("Ana");         // true
nome.indexOf("Silva");          // 4
nome.slice(0, 3);               // "Ana"
nome.split(" ");                // ["Ana", "Silva"]
"  espaços  ".trim();          // "espaços"
"a-b-c".replace("-", "/");     // "a/b-c"
"a-b-c".replaceAll("-", "/");  // "a/b/c"
"abc".padStart(5, "0");        // "00abc"
"abc".repeat(3);               // "abcabcabc"`)}
            </section>

            <section class="aula-section">
              <h2>Number</h2>
              <p>JavaScript tem <strong>um único tipo numérico</strong> para inteiros e decimais: o <code>Number</code>, baseado no padrão IEEE 754 de 64 bits (double precision). Isso explica a famosa imprecisão do ponto flutuante.</p>
              ${window.codeBlock(`const inteiro  = 42;
const decimal  = 3.14;
const negativo = -7;
const hex      = 0xFF;   // 255
const binario  = 0b1010; // 10
const octal    = 0o17;   // 15

// O problema do ponto flutuante
0.1 + 0.2; // 0.30000000000000004 ← não é 0.3!

// Solução: arredondar
+(0.1 + 0.2).toFixed(1); // 0.3

// Valores especiais
Infinity;        // maior que qualquer número
-Infinity;       // menor que qualquer número
NaN;             // Not a Number (ainda é typeof "number"!)

// Helpers do Number
Number.isNaN(NaN);          // true  ← use esse, não isNaN()
Number.isFinite(42);        // true
Number.isFinite(Infinity);  // false
Number.isInteger(42);       // true
Number.isInteger(42.5);     // false
Number.MAX_SAFE_INTEGER;    // 9007199254740991 (2^53 - 1)
Number.MIN_SAFE_INTEGER;    // -9007199254740991`)}
              <div class="aula-callout aula-callout--warning">
                <strong>NaN é contagioso:</strong> qualquer operação com <code>NaN</code> retorna <code>NaN</code>.
                E <code>NaN !== NaN</code> é <code>true</code>! Use sempre <code>Number.isNaN()</code> para verificar.
              </div>
            </section>

            <section class="aula-section">
              <h2>Boolean</h2>
              <p>Apenas <code>true</code> ou <code>false</code>. O tipo mais simples, mas o mais usado em lógica de controle.</p>
              ${window.codeBlock(`const ativo  = true;
const logado = false;

// Operadores lógicos
!ativo;          // false  — NOT
ativo && logado; // false  — AND (ambos devem ser true)
ativo || logado; // true   — OR  (pelo menos um true)

// Short-circuit evaluation
const usuario = null;
const nome = usuario?.nome || "Visitante"; // "Visitante"

// Nullish coalescing (retorna direita só se esquerda é null/undefined)
const config = null;
const debug = config ?? false; // false

// Conversão para boolean
Boolean(0);       // false
Boolean("");      // false
Boolean(null);    // false
Boolean(undefined); // false
Boolean(NaN);     // false
Boolean("oi");    // true
Boolean(1);       // true
Boolean([]);      // true — array vazio!
Boolean({});      // true — objeto vazio!`)}
            </section>

            <section class="aula-section">
              <h2>undefined vs null</h2>
              <p>Ambos representam ausência de valor, mas têm semânticas distintas — entender a diferença evita muita confusão.</p>
              <div class="aula-cards">
                <div class="aula-card"><div class="aula-card__icon">❓</div><h3>undefined</h3><p>Atribuído <em>automaticamente</em> pelo JavaScript. "Não foi inicializado."</p></div>
                <div class="aula-card"><div class="aula-card__icon">🚫</div><h3>null</h3><p>Atribuído <em>intencionalmente</em> por você. "Intencionalmente sem valor."</p></div>
              </div>
              ${window.codeBlock(`// undefined — o JS atribui
let idade;
console.log(idade);              // undefined
console.log(typeof idade);       // "undefined"

function semRetorno() {}
console.log(semRetorno());       // undefined

const obj = {};
console.log(obj.propriedade);   // undefined — não existe

// null — você atribui
const resultado = null;
console.log(typeof resultado);   // "object" ← bug histórico!

// Comparação
null == undefined;   // true  — coerção
null === undefined;  // false — tipos diferentes
null == 0;           // false — null só é igual a undefined
null == "";          // false

// Checagem correta
resultado === null;  // true ✓`)}
            </section>

            <section class="aula-section">
              <h2>Symbol</h2>
              <p>Adicionado no ES6. Cada <code>Symbol</code> é <strong>único e imutável</strong>, mesmo que tenha a mesma descrição. Perfeito para criar chaves de objeto sem risco de colisão.</p>
              ${window.codeBlock(`const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2);  // false — SEMPRE únicos!
console.log(typeof id1);   // "symbol"
console.log(id1.toString()); // "Symbol(id)"
console.log(id1.description); // "id"

// Uso como chave de objeto
const ID    = Symbol("id");
const ADMIN = Symbol("admin");

const usuario = {
  nome: "Ana",
  [ID]: 123,       // chave simbólica — não aparece em for..in
  [ADMIN]: true,
};

console.log(usuario[ID]);     // 123
console.log(usuario[ADMIN]);  // true

// Symbols não aparecem em iterações comuns
Object.keys(usuario);         // ["nome"]
JSON.stringify(usuario);      // {"nome":"Ana"} — symbols ignorados`)}
            </section>

            <section class="aula-section">
              <h2>BigInt</h2>
              <p>Para inteiros além do limite seguro de <code>Number</code> (2⁵³ - 1). Adicione <code>n</code> ao final do número.</p>
              ${window.codeBlock(`const grande  = 9007199254740992n; // maior que MAX_SAFE_INTEGER
const outro   = BigInt("9007199254740993");

console.log(typeof grande); // "bigint"
console.log(grande + 1n);   // 9007199254740993n

// Aritmética funciona normalmente
const soma    = 100n + 200n; // 300n
const produto = 50n * 20n;   // 1000n

// Não misture Number com BigInt!
1n + 1;           // TypeError — tipos incompatíveis
1n + BigInt(1);   // 2n ✓ — converta explicitamente

// Comparação
1n == 1;   // true  — coerção
1n === 1;  // false — tipos diferentes`)}
            </section>

            <section class="aula-section">
              <h2>Tabela dos 7 tipos primitivos</h2>
              <div class="aula-table-wrapper">
                <table class="aula-table">
                  <thead><tr><th>Tipo</th><th>Exemplo</th><th>typeof</th><th>Mutável?</th></tr></thead>
                  <tbody>
                    <tr><td>String</td><td><code>"texto"</code></td><td><code>"string"</code></td><td>Não</td></tr>
                    <tr><td>Number</td><td><code>42</code>, <code>3.14</code>, <code>NaN</code></td><td><code>"number"</code></td><td>Não</td></tr>
                    <tr><td>Boolean</td><td><code>true</code>, <code>false</code></td><td><code>"boolean"</code></td><td>Não</td></tr>
                    <tr><td>undefined</td><td><code>undefined</code></td><td><code>"undefined"</code></td><td>Não</td></tr>
                    <tr><td>null</td><td><code>null</code></td><td><code>"object"</code> ⚠️</td><td>Não</td></tr>
                    <tr><td>Symbol</td><td><code>Symbol("id")</code></td><td><code>"symbol"</code></td><td>Não</td></tr>
                    <tr><td>BigInt</td><td><code>42n</code></td><td><code>"bigint"</code></td><td>Não</td></tr>
                  </tbody>
                </table>
              </div>
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
  customElements.define("aula-tipos-primitivos", AulaTiposPrimitivos);
}
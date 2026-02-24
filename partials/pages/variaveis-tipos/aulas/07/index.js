if (!customElements.get("aula-coercao")) {
  const META = {
    pagina: "variaveis-tipos/aulas/07",
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "07", title: "Coerção de tipos", duration: "12 min", badge: "Pro",
    prev: "?pagina=variaveis-tipos/aulas/06", next: null,
  };
  const nav = (m) => `<nav class="aula-nav"><a href="${m.prev}" class="aula-nav__btn aula-nav__btn--prev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>Aula anterior</a><span></span></nav>`;

  class AulaCoercao extends HTMLElement {
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
              <h2>O que é coerção?</h2>
              <p>Coerção de tipos é a <strong>conversão automática</strong> que o JavaScript faz ao comparar ou operar valores de tipos diferentes. É um dos comportamentos mais polêmicos da linguagem — fonte de bugs famosos e piadas da comunidade.</p>
              <p>Há dois tipos: <strong>coerção implícita</strong> (feita pelo JS automaticamente) e <strong>coerção explícita</strong> (feita por você intencionalmente com funções de conversão).</p>
            </section>

            <section class="aula-section">
              <h2>== vs === (a diferença fundamental)</h2>
              <p><code>==</code> compara com coerção — o JS tenta converter os tipos antes de comparar. <code>===</code> compara sem coerção — tipo <strong>e</strong> valor devem ser iguais.</p>
              ${window.codeBlock(`// == permite coerção de tipos
0  == false;   // true  — false vira 0
1  == true;    // true  — true vira 1
"" == false;   // true  — "" e false viram 0
"1" == 1;      // true  — "1" vira número 1
null == undefined; // true  — exceção especial
0  == "";      // true  — "" vira 0

// === sem coerção — tipo e valor devem bater
0   === false;  // false — number vs boolean
"1" === 1;      // false — string vs number
null === undefined; // false — tipos diferentes

// Regra: use === sempre!
// Use == apenas para checar null OU undefined de uma vez:
value == null; // true se value é null OU undefined`)}
              <div class="aula-callout aula-callout--warning">
                <strong>Use sempre <code>===</code>.</strong> O <code>==</code> tem mais de 50 regras de coerção
                que ninguém decora. A única exceção aceitável é <code>value == null</code> para checar
                null e undefined simultaneamente.
              </div>
            </section>

            <section class="aula-section">
              <h2>Coerção em operações aritméticas</h2>
              <p>O operador <code>+</code> tem comportamento duplo: se <em>algum</em> operando for string, concatena. Se forem números, soma.</p>
              ${window.codeBlock(`// + com strings — concatenação!
"3" + 4;        // "34"  — 4 vira string
4 + "3";        // "43"
1 + 2 + "3";    // "33" — esquerda p/ direita: 1+2=3, depois 3+"3"="33"
"1" + 2 + 3;    // "123"

// Outros operadores convertem para número
"6" - 2;        // 4  — "6" vira número
"6" * "2";      // 12
"10" / 2;       // 5
"3" ** 2;       // 9

// Casos confusos
null + 1;       // 1   — null vira 0
undefined + 1;  // NaN — undefined vira NaN
true + 1;       // 2   — true vira 1
false + 1;      // 1   — false vira 0
[] + [];        // ""  — arrays viram strings vazias
{} + [];        // 0   — {} interpretado como bloco
[] + {};        // "[object Object]"`)}
            </section>

            <section class="aula-section">
              <h2>Coerção para Boolean (contexto lógico)</h2>
              <p>Qualquer valor em contexto booleano (if, &&, ||, !) sofre coerção. Lembre: apenas 6 valores são <strong>falsy</strong>.</p>
              ${window.codeBlock(`// Coerção implícita em if
if ("0")  console.log("truthy!"); // imprime — string não vazia!
if (0)    console.log("truthy"); // não imprime — 0 é falsy
if ([])   console.log("truthy!"); // imprime — array é truthy!

// Operador || — retorna o primeiro valor truthy
const nome = "" || "Visitante";  // "Visitante"
const porta = 0 || 3000;         // 3000  (cuidado! 0 é falsy mas pode ser válido)

// Operador && — retorna o primeiro valor falsy, ou o último
const logado = true;
const msg = logado && "Bem-vindo!"; // "Bem-vindo!"

// Operador ?? (nullish coalescing) — só faz coerção para null/undefined
const porta2 = 0 ?? 3000;  // 0  ← não faz coerção de 0 (falsy)!
const porta3 = null ?? 3000; // 3000

// Conversão explícita para boolean
Boolean(0);    // false
Boolean("0");  // true — string "0" é truthy!
!!0;           // false — dupla negação
!!"";          // false
!!"texto";     // true`)}
            </section>

            <section class="aula-section">
              <h2>Coerção explícita — conversões seguras</h2>
              <p>Quando você precisa converter tipos, faça <em>explicitamente</em> — o código fica claro e previsível.</p>
              ${window.codeBlock(`// Para Number
Number("42");       // 42
Number("3.14");     // 3.14
Number("");         // 0
Number("  3  ");    // 3  — ignora espaços
Number("abc");      // NaN
Number(true);       // 1
Number(false);      // 0
Number(null);       // 0
Number(undefined);  // NaN

parseInt("42px");    // 42  — para até o não-numérico
parseInt("3.14");    // 3   — só a parte inteira
parseFloat("3.14m"); // 3.14

// Para String
String(42);          // "42"
String(true);        // "true"
String(null);        // "null"
String(undefined);   // "undefined"
(42).toString();     // "42"
(255).toString(16);  // "ff"  — base hexadecimal

// Para Boolean
Boolean(0);          // false
Boolean("");         // false
Boolean(null);       // false
Boolean(undefined);  // false
Boolean(NaN);        // false
Boolean("tudo o mais"); // true`)}
            </section>

            <section class="aula-section">
              <h2>As piadas mais famosas do JS</h2>
              ${window.codeBlock(`// Os exemplos que viraram meme
typeof NaN === "number"    // true
NaN === NaN                // false  (NaN não é igual nem a si mesmo!)
null == undefined          // true
null === undefined         // false
typeof null === "object"   // true  (bug histórico)
0.1 + 0.2 === 0.3         // false  (ponto flutuante)
"" == false               // true
"0" == false              // true   MAS
"" == "0"                 // false  (== não é transitivo!)

// Por isso use === e conversões explícitas sempre!`)}
              <div class="aula-callout aula-callout--tip">
                <strong>Dica prática:</strong> Use <code>===</code> por padrão, <code>??</code> em vez de <code>||</code> quando
                valores falsy legítimos (0, "") importam, e sempre converta explicitamente com
                <code>Number()</code>, <code>String()</code> ou <code>Boolean()</code>.
              </div>
            </section>

            <section class="aula-section">
              <h2>Resumo</h2>
              <ul class="aula-list">
                <li>Coerção <strong>implícita</strong> acontece automaticamente — pode causar bugs.</li>
                <li>Use <strong><code>===</code></strong> sempre. <code>==</code> tem regras complexas demais.</li>
                <li><code>+</code> com strings <strong>concatena</strong> — outros operadores convertem para número.</li>
                <li><code>||</code> retorna o primeiro <em>truthy</em> — use <code>??</code> quando 0 e "" são válidos.</li>
                <li>Coerção <strong>explícita</strong>: <code>Number()</code>, <code>String()</code>, <code>Boolean()</code> — clara e segura.</li>
                <li><code>NaN !== NaN</code> — use <code>Number.isNaN()</code> para verificar.</li>
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
  customElements.define("aula-coercao", AulaCoercao);
}
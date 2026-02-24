if (!customElements.get("aula-var")) {
  const META = {
    pagina: "variaveis-tipos/aulas/01",
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "01", title: "var", duration: "10 min", badge: "Grátis",
    prev: null, next: "?pagina=variaveis-tipos/aulas/02",
  };

  /* Valores dinâmicos separados do HTML */
  const exemplos = {
    nomeVar: "usuario",
    valorVar: '"Ana"',
    resultHoisting: "undefined",
  };

  const nav = (meta) => /*html*/`
    <nav class="aula-nav">
      ${meta.prev
      ? `<a href="${meta.prev}" class="aula-nav__btn aula-nav__btn--prev">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
             Aula anterior
           </a>`
      : `<span></span>`}
      <a href="${meta.next}" class="aula-nav__btn aula-nav__btn--next">
        Próxima aula
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </nav>`;

  class AulaVar extends HTMLElement {
    connectedCallback() {
      const done = window.Progress?.isDone(META.pagina);

      this.innerHTML = /*html*/`
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
                <span class="aula-badge aula-badge--free">${META.badge}</span>
                <span class="aula-duration">${META.duration} de leitura</span>
                <button class="btn-concluir ${done ? 'done' : ''}" id="btn-concluir">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ${done ? 'Concluída' : 'Marcar como concluída'}
                </button>
              </div>
            </header>

            <div class="aula-body">

              <section class="aula-section">
                <h2>O que é <code>var</code>?</h2>
                <p>
                  <code>var</code> é a forma original de declarar variáveis em JavaScript — existe desde 1995.
                  Por anos foi a única opção disponível. Hoje, sabemos que seus comportamentos causam
                  bugs difíceis de detectar, por isso foi substituída pelo <code>let</code> e <code>const</code> no ES6.
                </p>
                <p>
                  Ainda é importante entender <code>var</code> para ler código legado e entender
                  <strong>por que</strong> o ES6 trouxe alternativas melhores.
                </p>
              </section>

              <section class="aula-section">
                <h2>Declaração básica</h2>
                <p>
                  A variável <strong id="demo-nome-var"></strong> abaixo recebe o valor
                  <strong id="demo-valor-var"></strong>. Simples assim:
                </p>
                ${window.codeBlock(`var usuario = "Ana";
var idade   = 25;
var ativo   = true;

console.log(usuario); // Ana
console.log(idade);   // 25`)}
              </section>

              <section class="aula-section">
                <h2>Escopo de função — não de bloco</h2>
                <p>
                  O maior problema do <code>var</code>: ele ignora blocos <code>{}</code> como
                  <code>if</code>, <code>for</code> e <code>while</code>. Ele vive no escopo
                  da <strong>função</strong> mais próxima — ou no escopo <strong>global</strong>.
                </p>
                ${window.codeBlock(`// var vaza do bloco if
if (true) {
  var mensagem = "Olá!";
}
console.log(mensagem); // "Olá!" — vazou!

// var vaza do for
for (var i = 0; i < 3; i++) {
  // ...
}
console.log(i); // 3 — ainda existe!

// let NÃO vaza
if (true) {
  let outra = "Oi";
}
console.log(outra); // ReferenceError ✓`)}
                <div class="aula-callout aula-callout--warning">
                  <strong>Por que isso é perigoso?</strong> Em funções longas, você pode acidentalmente
                  usar uma variável que "vazou" de um bloco sem perceber, gerando valores inesperados.
                </div>
              </section>

              <section class="aula-section">
                <h2>Hoisting — o içamento</h2>
                <p>
                  O motor JavaScript separa a execução em duas fases: <strong>compilação</strong> e
                  <strong>execução</strong>. Na fase de compilação, todas as declarações <code>var</code>
                  são "içadas" (hoisted) ao topo do escopo — mas <em>sem o valor</em>.
                </p>
                ${window.codeBlock(`// O que você escreve:
console.log(nome); // undefined — sem erro!
var nome = "Ana";
console.log(nome); // "Ana"

// O que o motor JS realmente executa:
var nome;          // ← içamento da declaração
console.log(nome); // undefined
nome = "Ana";      // atribuição fica no lugar
console.log(nome); // "Ana"`)}
                <p>
                  O resultado <code id="demo-hoisting"></code> aparece porque a variável existe
                  (foi içada), mas ainda não tem valor.
                </p>
              </section>

              <section class="aula-section">
                <h2>Redeclaração silenciosa</h2>
                <p>
                  Com <code>var</code>, você pode declarar a mesma variável duas vezes sem erro.
                  Isso torna bugs silenciosos muito fáceis de introduzir em código longo.
                </p>
                ${window.codeBlock(`var email = "ana@email.com";

// ... 200 linhas de código depois ...

var email = "outro@email.com"; // sem erro! sobrescreve silenciosamente

console.log(email); // "outro@email.com" — bug difícil de achar`)}
                ${window.codeBlock(`// let previne isso:
let nome = "Ana";
let nome = "Bruno"; // SyntaxError! — erro na hora, fácil de corrigir`)}
              </section>

              <section class="aula-section">
                <h2>O bug clássico com loops e closures</h2>
                <p>
                  Um dos bugs mais famosos do JavaScript. Com <code>var</code> em loops,
                  todas as funções criadas dentro compartilham a <em>mesma variável</em>:
                </p>
                ${window.codeBlock(`// Com var — bug clássico
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Imprime: 3, 3, 3
// Todas as funções leem o mesmo "i" que já chegou em 3

// Com let — cada iteração tem seu próprio "i"
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Imprime: 0, 1, 2  ✓`)}
                <div class="aula-callout aula-callout--info">
                  <strong>Por quê?</strong> <code>var i</code> existe no escopo da função (ou global),
                  então todas as callbacks do <code>setTimeout</code> apontam para a mesma variável.
                  <code>let i</code> cria um novo binding a cada iteração.
                </div>
              </section>

              <section class="aula-section">
                <h2>Resumo</h2>
                <ul class="aula-list">
                  <li><code>var</code> tem <strong>escopo de função</strong> — ignora blocos <code>{}</code>.</li>
                  <li>Sofre <strong>hoisting</strong> — declaração sobe, valor fica <code>undefined</code> até a atribuição.</li>
                  <li>Permite <strong>redeclaração</strong> sem erro — fonte de bugs silenciosos.</li>
                  <li>Causa o <strong>bug do closure em loops</strong> com <code>setTimeout</code>, <code>addEventListener</code>, etc.</li>
                  <li><strong>Não use <code>var</code></strong> em código moderno. Prefira <code>const</code> ou <code>let</code>.</li>
                </ul>
              </section>

            </div>

            ${nav(META)}

          </div>
        </main>`;

      /* ── Injeta valores dinâmicos ── */
      document.getElementById("demo-nome-var").textContent = exemplos.nomeVar;
      document.getElementById("demo-valor-var").textContent = exemplos.valorVar;
      document.getElementById("demo-hoisting").textContent = exemplos.resultHoisting;

      /* ── Botão concluir ── */
      document.getElementById("btn-concluir")?.addEventListener("click", function () {
        const isDone = window.Progress?.isDone(META.pagina);
        isDone ? window.Progress?.uncomplete(META.pagina) : window.Progress?.complete(META.pagina);
        this.classList.toggle("done", !isDone);
        this.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${!isDone ? "Concluída" : "Marcar como concluída"}`;
      });
    }
  }

  customElements.define("aula-var", AulaVar);
}
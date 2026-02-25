if (!customElements.get("aula-let")) {
  const META = {
    pagina: "variaveis-tipos/aulas/02",
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "02", title: "let", duration: "10 min", badge: "Grátis",
    prev: "?pagina=variaveis-tipos/aulas/01", next: "?pagina=variaveis-tipos/aulas/03",
  };

  const nav = (meta) => /*html*/`
    <nav class="aula-nav">
      <a href="${meta.prev}" class="aula-nav__btn aula-nav__btn--prev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>Aula anterior</a>
      <a href="${meta.next}" class="aula-nav__btn aula-nav__btn--next">Próxima aula<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
    </nav>`;

  class AulaLet extends HTMLElement {
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
                <h2>O que é <code>let</code>?</h2>
                <p>
                  Introduzido no <strong>ES6 (2015)</strong>, <code>let</code> resolve os principais
                  problemas do <code>var</code>. Tem <strong>escopo de bloco</strong>, não permite
                  redeclaração e sua TDZ força boas práticas de código.
                </p>
              </section>

              <section class="aula-section">
                <h2>Escopo de bloco</h2>
                <p>
                  Diferente do <code>var</code>, uma variável <code>let</code> existe
                  <strong>apenas dentro do bloco <code>{}</code></strong> onde foi declarada.
                  Isso inclui <code>if</code>, <code>for</code>, <code>while</code> e blocos simples.
                </p>
                ${window.codeBlock(`// let respeita o bloco if
if (true) {
  let cidade = "São Paulo";
  console.log(cidade); // "São Paulo" ✓
}
console.log(cidade); // ReferenceError! — não existe aqui

// let respeita o for
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2 ✓
}
console.log(i); // ReferenceError!

// Bloco simples
{
  let segredo = 42;
}
console.log(segredo); // ReferenceError!`)}
              </section>

              <section class="aula-section">
                <h2>Temporal Dead Zone (TDZ)</h2>
                <p>
                  <code>let</code> também sofre hoisting — mas diferente do <code>var</code>,
                  <strong>não é inicializado com <code>undefined</code></strong>.
                  A variável fica na <em>Temporal Dead Zone</em> (zona morta temporária) até
                  a linha de declaração. Qualquer acesso antes lança <code>ReferenceError</code>.
                </p>
                ${window.codeBlock(`// TDZ em ação
console.log(nome); // ReferenceError — está na TDZ!
let nome = "Ana";
console.log(nome); // "Ana" ✓

// Comparando com var:
console.log(outro); // undefined — sem erro (ruim!)
var outro = "x";

// TDZ também acontece em blocos
{
  console.log(x); // ReferenceError — TDZ
  let x = 10;
}`)}


                <div class="aula-callout aula-callout--tip">
                  <strong>TDZ é uma feature, não um bug!</strong> Ela força você a declarar variáveis
                  antes de usá-las — tornando o código mais previsível e fácil de entender.
                </div>
              </section>

              <section class="aula-section">
                <h2>Sem redeclaração no mesmo escopo</h2>
                ${window.codeBlock(`let usuario = "Ana";
let usuario = "Bruno"; // SyntaxError! — erro imediato

// Em escopos diferentes é permitido (shadowing)
let x = 1;
{
  let x = 2; // novo x, escopo diferente
  console.log(x); // 2
}
console.log(x); // 1 — o original não mudou`)}
              </section>

              <section class="aula-section">
                <h2>Reatribuição é permitida</h2>
                <p>
                  <code>let</code> permite trocar o valor da variável. Use quando o valor
                  vai <strong>mudar</strong> — contadores, estado, acumuladores.
                </p>
                ${window.codeBlock(`let contador = 0;
contador++;      // 1
contador += 10;  // 11
contador = 0;    // reset

let status = "carregando";
// ... operação async ...
status = "sucesso";

let nome = "Ana";
nome = "Bruno"; // ✓ reatribuição permitida`)}
              </section>

              <section class="aula-section">
                <h2>Resolvendo o bug do loop</h2>
                <p>
                  Com <code>let</code>, cada iteração do loop cria um <strong>novo binding</strong>
                  para a variável. As closures capturam versões independentes:
                </p>
                ${window.codeBlock(`// let cria um novo "i" para cada iteração
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Imprime: 0, 1, 2 ✓

// Botões com event listener — clássico com var
const botoes = document.querySelectorAll("button");
botoes.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    console.log("Botão", index); // funciona corretamente com let
  });
});`)}
              </section>

              <section class="aula-section">
                <h2>Quando usar <code>let</code>?</h2>
                <div class="aula-cards">
                  <div class="aula-card">
                    <div class="aula-card__icon">🔢</div>
                    <h3>Contadores</h3>
                    <p>Variáveis que incrementam ou mudam em loops e iterações.</p>
                  </div>
                  <div class="aula-card">
                    <div class="aula-card__icon">🔄</div>
                    <h3>Estado mutável</h3>
                    <p>Valores que mudam durante a execução: status, resultado, acumulador.</p>
                  </div>
                  <div class="aula-card">
                    <div class="aula-card__icon">🎯</div>
                    <h3>Reatribuição necessária</h3>
                    <p>Quando você sabe que vai precisar trocar o valor mais de uma vez.</p>
                  </div>
                </div>
              </section>

              <section class="aula-section">
                <h2>Resumo</h2>
                <ul class="aula-list">
                  <li><code>let</code> tem <strong>escopo de bloco</strong> — respeita <code>{}</code>.</li>
                  <li>Entra na <strong>TDZ</strong> — acessar antes da declaração lança <code>ReferenceError</code>.</li>
                  <li><strong>Não permite redeclaração</strong> no mesmo escopo.</li>
                  <li>Permite <strong>reatribuição</strong> — diferente do <code>const</code>.</li>
                  <li>Resolve o bug do closure em loops: cada iteração tem seu próprio binding.</li>
                  <li>Use <code>let</code> quando o valor vai <strong>mudar</strong>. Se não vai mudar, prefira <code>const</code>.</li>
                </ul>
              </section>

            </div>
            ${nav(META)}
          </div>
        </main>`;

      document.getElementById("btn-concluir")?.addEventListener("click", function () {
        const isDone = window.Progress?.isDone(META.pagina);
        isDone ? window.Progress?.uncomplete(META.pagina) : window.Progress?.complete(META.pagina);
        this.classList.toggle("done", !isDone);
        this.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${!isDone ? "Concluída" : "Marcar como concluída"}`;
      });
    }
  }
  customElements.define("aula-let", AulaLet);
}
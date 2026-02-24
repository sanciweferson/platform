if (!customElements.get("aula-tipos-referencia")) {
  const META = {
    pagina: "variaveis-tipos/aulas/06",
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "06", title: "Tipos de referência", duration: "13 min", badge: "Pro",
    prev: "?pagina=variaveis-tipos/aulas/05", next: "?pagina=variaveis-tipos/aulas/07",
  };
  const nav = (m) => `<nav class="aula-nav"><a href="${m.prev}" class="aula-nav__btn aula-nav__btn--prev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>Aula anterior</a><a href="${m.next}" class="aula-nav__btn aula-nav__btn--next">Próxima aula<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></nav>`;

  class AulaTiposReferencia extends HTMLElement {
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
              <h2>Stack vs Heap</h2>
              <p>A diferença entre primitivos e tipos de referência está em <strong>onde vivem na memória</strong>.</p>
              <div class="aula-cards">
                <div class="aula-card"><div class="aula-card__icon">📦</div><h3>Stack (pilha)</h3><p>Primitivos ficam aqui. Tamanho fixo conhecido, acesso rápido, copiados por <strong>valor</strong>.</p></div>
                <div class="aula-card"><div class="aula-card__icon">🏗️</div><h3>Heap (monte)</h3><p>Objetos, arrays e funções ficam aqui. Tamanho dinâmico, acessados por <strong>referência</strong> (endereço de memória).</p></div>
              </div>
              ${window.codeBlock(`// Primitivo — cópia por VALOR (stack)
let a = 10;
let b = a;
b = 99;
console.log(a); // 10 — não mudou

// Objeto — cópia por REFERÊNCIA (heap)
let obj1 = { x: 10 };
let obj2 = obj1;    // obj2 aponta para o MESMO objeto
obj2.x = 99;
console.log(obj1.x); // 99 — mudou!`)}
            </section>

            <section class="aula-section">
              <h2>Objetos</h2>
              <p>Um objeto é uma coleção de pares <strong>chave-valor</strong>. Quando você atribui um objeto a outra variável, você copia o <em>endereço de memória</em> — não o objeto em si.</p>
              ${window.codeBlock(`const pessoa = { nome: "Ana", idade: 25 };
const outra  = pessoa;       // mesma referência!

outra.nome = "Bruno";
outra.email = "b@b.com";

console.log(pessoa); // { nome: "Bruno", idade: 25, email: "b@b.com" }
console.log(outra);  // { nome: "Bruno", idade: 25, email: "b@b.com" }
console.log(pessoa === outra); // true — mesma referência

// Para clonar (cópia RASA com spread)
const clone = { ...pessoa };
clone.nome = "Carlos";

console.log(pessoa.nome); // "Bruno" — não afetou
console.log(clone.nome);  // "Carlos"`)}
            </section>

            <section class="aula-section">
              <h2>Arrays</h2>
              <p>Arrays são objetos especiais com índices numéricos. O mesmo comportamento de referência se aplica.</p>
              ${window.codeBlock(`const frutas = ["maçã", "banana", "uva"];
const copia  = frutas;     // referência!

copia.push("manga");
copia[0] = "pera";

console.log(frutas); // ["pera", "banana", "uva", "manga"]

// Para clonar
const clone1 = [...frutas];          // spread ✓
const clone2 = frutas.slice();       // slice sem args ✓
const clone3 = Array.from(frutas);   // Array.from ✓

clone1.push("kiwi");
console.log(frutas.length); // 4 — não afetou

// Checar se é array
Array.isArray(frutas);   // true  ✓
typeof frutas;           // "object" ✗ — não use para checar array`)}
            </section>

            <section class="aula-section">
              <h2>Funções são objetos de primeira classe</h2>
              <p>Em JavaScript, funções são objetos — podem ser atribuídas a variáveis, passadas como argumento e retornadas de outras funções.</p>
              ${window.codeBlock(`function somar(a, b) { return a + b; }

typeof somar;               // "function"
somar instanceof Object;    // true

// Atribuir a variável
const fn = somar;
fn(2, 3);                   // 5

// Passar como argumento (callback)
const numeros = [3, 1, 4, 1, 5];
numeros.sort((a, b) => a - b); // [1, 1, 3, 4, 5]

// Retornar de outra função (higher-order function)
function multiplicador(fator) {
  return (numero) => numero * fator; // retorna função
}

const dobrar  = multiplicador(2);
const triplicar = multiplicador(3);

dobrar(5);     // 10
triplicar(5);  // 15`)}
            </section>

            <section class="aula-section">
              <h2>Comparação por referência</h2>
              <p>Dois objetos com o mesmo conteúdo <strong>não são iguais</strong> — a comparação verifica se apontam para o mesmo endereço na memória.</p>
              ${window.codeBlock(`// Primitivos — comparação por VALOR
5 === 5;            // true
"oi" === "oi";      // true

// Objetos — comparação por REFERÊNCIA
const a = { x: 1 };
const b = { x: 1 };
const c = a;

a === b; // false — conteúdo igual, mas objetos DIFERENTES na memória
a === c; // true  — mesma referência!

// Arrays
[1, 2] === [1, 2]; // false — sempre!

// Para comparar conteúdo, serialize:
JSON.stringify(a) === JSON.stringify(b); // true (cuidado: não funciona com functions/undefined)`)}
            </section>

            <section class="aula-section">
              <h2>Cópia rasa vs cópia profunda</h2>
              <p>Spread e <code>Object.assign</code> fazem <strong>cópia rasa</strong> — propriedades com valores primitivos são copiadas, mas objetos aninhados ainda são referências compartilhadas.</p>
              ${window.codeBlock(`const original = {
  nome: "Ana",
  endereco: { cidade: "SP", bairro: "Centro" }, // objeto aninhado
  hobbies: ["leitura", "código"],               // array aninhado
};

// Cópia RASA
const raso = { ...original };
raso.nome = "Bruno";             // ✓ independente — primitivo
raso.endereco.cidade = "RJ";     // ✗ afeta original — ainda é referência!
raso.hobbies.push("música");     // ✗ afeta original!

console.log(original.nome);              // "Ana" ✓
console.log(original.endereco.cidade);   // "RJ"  ✗
console.log(original.hobbies);           // ["leitura", "código", "música"] ✗

// Cópia PROFUNDA — structuredClone (ES2022)
const profundo = structuredClone(original);
profundo.endereco.cidade = "MG";
profundo.hobbies.push("yoga");

console.log(original.endereco.cidade); // "RJ" ✓ — não afetou
console.log(original.hobbies);         // ["leitura", "código", "música"] ✓`)}
              <div class="aula-callout aula-callout--info">
                <strong>structuredClone()</strong> é o método moderno para cópia profunda, disponível em todos os browsers desde 2022. Substitui o velho truque de <code>JSON.parse(JSON.stringify(obj))</code>, que perdia funções, <code>undefined</code> e <code>Date</code>.
              </div>
            </section>

            <section class="aula-section">
              <h2>Resumo</h2>
              <ul class="aula-list">
                <li>Primitivos ficam na <strong>stack</strong>, copiados por valor — independentes.</li>
                <li>Objetos/arrays ficam na <strong>heap</strong>, copiados por referência — compartilham dados.</li>
                <li>Dois objetos com mesmo conteúdo <strong>não são iguais</strong> com <code>===</code>.</li>
                <li>Use <code>Array.isArray()</code> para checar arrays — <code>typeof []</code> retorna <code>"object"</code>.</li>
                <li>Spread faz cópia <strong>rasa</strong> — objetos aninhados ainda são referências.</li>
                <li>Use <code>structuredClone()</code> para cópia <strong>profunda</strong> segura.</li>
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
  customElements.define("aula-tipos-referencia", AulaTiposReferencia);
}
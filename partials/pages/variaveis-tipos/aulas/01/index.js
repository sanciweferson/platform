if (!customElements.get("aula-var")) {
  const META = {
    pagina: "variaveis-tipos/aulas/01",
    modulo: "Variáveis & Tipos", moduloHref: "?pagina=variaveis-tipos",
    num: "01", title: "var", duration: "10 min", badge: "Grátis",
    prev: null, next: "?pagina=variaveis-tipos/aulas/02",
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
                <h2>1. Declaração básica</h2>
                <div class="code-block">
                  <span class="palavra-chave">var</span>
                  <span class="identificador">name</span>
                  <span class="operator">=</span>
                  <span class="valor">"Sanciweferson"</span>
                </div>
                <div class="result">
                  <h3>console.log(name) → <span id="js-value-1"></span></h3>
                </div>
                <div class="explanation">
                  <p>
                    Antes de qualquer linha rodar, o JavaScript faz uma fase invisível chamada
                    <strong>fase de criação</strong>. Nela, o motor já cria a variável <code>name</code> 
                    e coloca o valor <code class="undefined">undefined</code> na memória.
                    Só depois, na fase de execução, o valor <code>"Sanciweferson"</code> é atribuído.
                  </p>
                </div>
              </section>

              <section class="aula-section">
                <h2>2. Redeclaração silenciosa</h2>
                <div class="code-block">
                  <span class="palavra-chave">var</span>
                  <span class="identificador">name</span>
                  <span class="operator">=</span>
                  <span class="valor">"San"</span>
                </div>
                <div class="result">
                  <h3>console.log(name) → <span id="js-value-2"></span></h3>
                </div>
                <div class="explanation">
                  <p>
                    <code>var</code> permite declarar a mesma variável mais de uma vez no mesmo escopo.
                    O motor verifica: a variável já existe? Se sim, ele ignora a nova declaração e 
                    executa apenas a atribuição. Não há erro, aviso ou proteção.
                  </p>
                </div>
              </section>

              <section class="aula-section">
                <h2>3. Reatribuição</h2>
                <div class="code-block">
                  <span class="identificador">name</span>
                  <span class="operator">=</span>
                  <span class="valor">"Weferson"</span>
                </div>
                <div class="result">
                  <h3>console.log(name) → <span id="js-value-3"></span></h3>
                </div>
                <div class="explanation">
                  <p>
                    Aqui não existe nova variável. Apenas o valor apontado por <code>name</code> é trocado.
                    Variáveis em JavaScript funcionam como etiquetas que apontam para valores na memória.
                  </p>
                </div>
              </section>

              <section class="aula-section">
                <h2>4. Hoisting básico</h2>
                <div class="result">
                  <h3>console.log(hoist) → <span class="undefined">undefined</span></h3>
                </div>
                <div class="code-block">
                  <span class="palavra-chave">var</span>
                  <span class="identificador">hoist</span>
                  <span class="operator">=</span>
                  <span class="valor">"JavaScript"</span>
                </div>
                <div class="result">
                  <h3>console.log(hoist) → <span id="js-value-4"></span></h3>
                </div>
                <div class="explanation">
                  <p>
                    Durante a fase de criação, o motor transforma o código internamente em:
                    <code>var hoist;</code><br>
                    <code>console.log(hoist);</code><br>
                    <code>hoist = "JavaScript";</code>
                    <br><br>
                    A declaração sobe, mas a atribuição fica no lugar.
                    <code class="undefined">undefined</code> significa: a variável existe, mas ainda não recebeu valor.
                  </p>
                </div>
              </section>

              <section class="aula-section">
                <h2>5. Hoisting em função (shadowing com <code>var</code>)</h2>
                <div class="code-block">
                 
                   <span class="palavra-chave">var</span>
                    <span class="identificador">valor</span>
                    <span class="operator">=</span>
                    <span class="valor">100</span>
                    <span class="function">function shadowing () {<br>
                   <span class="return">return</span> <span class="identificador">valor</span><br>
                  <span class="palavra-chave">var</span> <span class="identificador">valor</span> <span class="operator">=</span> <span class="valor">10</span><br>
                    }</span>
                 
                </div>
                <div class="result">
                  <h3>console.log(shadowing()) → <span id="js-value-5"></span></h3>
                </div>
                <div class="explanation">
                  <p>
                    Neste exemplo ocorre um caso clássico de hoisting combinado com shadowing usando <code>var</code>.
                    A variável local esconde a variável global (shadowing), mas apenas a declaração é movida — 
                    a atribuição permanece na posição original. Como o <code>return</code> é executado antes 
                    da atribuição, a função retorna <code class="undefined">undefined</code>.
                  </p>
                </div>
              </section>

              <section class="aula-section">
                <h2>6. <code>var</code> ignora blocos</h2>
                <div class="code-block">
                  <span class="for">for (<span class="palavra-chave">var</span> <span class="identificador">i</span> <span class="operator">=</span> <span class="valor">0</span>; i &lt; 1; i++) {}</span>
                </div>
                <div class="result">
                  <h3>console.log(i) → <span id="js-value-6"></span></h3>
                </div>
                <div class="explanation">
                  <p>
                    Blocos como <code>for</code>, <code>if</code> e <code>while</code> não criam escopo para <code>var</code>.
                    A variável <code>i</code> pertence ao escopo da função ou global.
                    Esse comportamento causou inúmeros bugs históricos e motivou a criação do <code>let</code>.
                  </p>
                </div>
              </section>

              <section class="aula-section">
                <h2>7. Função atribuída a variável</h2>
                <div class="code-block">
                  <span class="identificador">dizerOi</span>()<br>
                  <span class="palavra-chave">var</span>
                  <span class="identificador">dizerOi</span>
                  <span class="operator">=</span>
                  <span class="function">function () {}</span>
                </div>
                <div class="result">
                  <h3>console.log(dizerOi()) → <span class="error">TypeError</span></h3>
                </div>
                <div class="explanation">
                  <p>
                    Apenas a variável <code>dizerOi</code> sobe. No momento da chamada, ela ainda vale 
                    <code class="undefined">undefined</code>. Funções declaradas com 
                    <code>function name(){}</code> sobem por completo. Funções atribuídas a variáveis não.
                  </p>
                </div>
              </section>

              <section class="aula-section">
                <h2>8. Closure com <code>var</code></h2>
                <div class="code-block">
                  <span class="palavra-chave">var</span> <span class="identificador">funcoes</span> <span class="operator">=</span> <span class="valor">[]</span><br><br>
                  <span class="for">for (<span class="palavra-chave">var</span> <span class="identificador">i</span> <span class="operator">=</span> <span class="valor">0</span>; i &lt; 3; i++) {<br>
                  &nbsp;&nbsp;funcoes.push(<span class="function">function () {<span class="return"> return</span> i }</span>)<br>
                  }</span>
                </div>
                <div class="result">
                  <h3>console.log(funcoes[0]()) → <span id="js-value-7"></span></h3>
                </div>
                <div class="result">
                  <h3>console.log(funcoes[1]()) → <span class="valor">3</span></h3>
                </div>
                <div class="result">
                  <h3>console.log(funcoes[2]()) → <span class="valor">3</span></h3>
                </div>
                <div class="explanation">
                  <p>
                    Todas as funções fecham sobre a mesma variável <code>i</code>.
                    Quando o loop termina, <code>i</code> vale 3.
                    Closure não copia valores, ela mantém referências vivas na memória.
                  </p>
                </div>
              </section>

              <section class="aula-section">
                <h2>9. Closure correto usando <code>var</code></h2>
                <div class="code-block">
                  <span class="palavra-chave">var</span> <span class="identificador">funcoes</span> <span class="operator">=</span> <span class="valor">[]</span><br><br>
                  <span class="for">for (<span class="palavra-chave">var</span> <span class="identificador">i</span> <span class="operator">=</span> <span class="valor">0</span>; i &lt; 3; i++) {<br>
                  &nbsp;&nbsp;(<span class="function">function (valorAtual) {<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;funcoes.push(<span class="function">function () { <span class="return">return</span> valorAtual }</span>)<br>
                  &nbsp;&nbsp;})</span>(<span class="identificador">i</span>)<br>
                  }</span>
                </div>
                <div class="result">
                  <h3>console.log(funcoes[0](), funcoes[1](), funcoes[2]()) → <span id="js-value-8"></span></h3>
                </div>
                <div class="explanation">
                  <p>
                    Cada execução da IIFE cria um novo escopo. O valor de <code>i</code> é copiado para 
                    <code>valorAtual</code>. Assim, cada função fecha sobre uma memória diferente.
                  </p>
                </div>
              </section>

              <section class="aula-section">
                <h2>10. Variável sem valor</h2>
                <div class="code-block">
                  <span class="palavra-chave">var</span>
                  <span class="identificador">lixo</span>
                </div>
                <div class="result">
                  <h3>console.log(lixo) → <span id="js-value-9"></span></h3>
                </div>
                <div class="explanation">
                  <p>
                    A variável foi declarada, mas nenhum valor foi atribuído. Por isso, o resultado é 
                    <code>undefined</code>. O Garbage Collector só atua quando um valor já existiu e 
                    não possui mais nenhuma referência apontando para ele.
                  </p>
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

      /* ── Executa exemplos dinâmicos ── */
      this.executarExemplos();

      /* ── Botão concluir ── */
      document.getElementById("btn-concluir")?.addEventListener("click", function () {
        const isDone = window.Progress?.isDone(META.pagina);
        isDone ? window.Progress?.uncomplete(META.pagina) : window.Progress?.complete(META.pagina);
        this.classList.toggle("done", !isDone);
        this.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${!isDone ? "Concluída" : "Marcar como concluída"}`;
      });
    }

    executarExemplos() {
      // 1. Declaração
      var declaracao = document.getElementById("js-value-1");
      var name = "Sanciweferson";
      declaracao.textContent = `"${name}"`;

      // 2. Redeclaração
      var Redeclaracao = document.getElementById("js-value-2");
      var name = "San";
      Redeclaracao.textContent = `"${name}"`;

      // 3. Reatribuição
      var Reatribuicao = document.getElementById("js-value-3");
      name = "Weferson";
      Reatribuicao.textContent = `"${name}"`;

      // 4. Hoisting básico
      var HoistBasico = document.getElementById("js-value-4");
      HoistBasico.textContent = `"JavaScript"`;

      // 5. Hoisting em função
      var HoistingEmFuncao = document.getElementById("js-value-5");
      var valor = 100;
      function shadowing() {
        return valor;
        var valor = 10;
      }
      HoistingEmFuncao.textContent = `${shadowing()}`;

      // 6. var ignora blocos
      var varBloco = document.getElementById("js-value-6");
      for (var i = 0; i < 1; i++) {
        // i existe aqui
      }
      varBloco.textContent = `${i}`;

      // 7. Closure com var (problema)
      var closure = document.getElementById("js-value-7");
      var funcoes = [];
      for (var i = 0; i < 3; i++) {
        funcoes.push(function () {
          return i;
        });
      }
      closure.textContent = `${funcoes[0]()}`;

      // 8. Closure correto com IIFE
      var atual = document.getElementById("js-value-8");
      funcoes = [];
      for (var i = 0; i < 3; i++) {
        (function (valorAtual) {
          funcoes.push(function () {
            return valorAtual;
          });
        })(i);
      }
      var valores = funcoes.map((fn) => fn());
      atual.textContent = `${valores.join(", ")}`;

      // 9. Variável sem valor
      var garbage = document.getElementById("js-value-9");
      var lixo;
      garbage.textContent = `${lixo}`;
    }
  }

  customElements.define("aula-var", AulaVar);
}
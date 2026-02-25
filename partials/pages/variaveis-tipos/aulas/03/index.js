/* =========================================================
   AULA 03 — const
   Módulo: Variáveis & Tipos
   Web Component: <aula-const>
========================================================= */
if (!customElements.get("aula-const")) {

  const META = {
    pagina: "variaveis-tipos/aulas/03", modulo: "Variáveis & Tipos",
    moduloHref: "?pagina=variaveis-tipos", num: "03", title: "const",
    duration: "9 min", badge: "Grátis",
    prev: "?pagina=variaveis-tipos/aulas/02", next: "?pagina=variaveis-tipos/aulas/04",
  };

  /* Valores dos exemplos — altere só aqui */
  const dados = {
    constNome: "PI", constVal: "3.14159",
    usuarioNome: "usuario", frutaNome: "frutas",
    configNome: "config", configVersao: "1.0",
  };

  const nav = (m) => `<nav class="aula-nav">
    <a href="${m.prev}" class="aula-nav__btn aula-nav__btn--prev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>Aula anterior</a>
    <a href="${m.next}" class="aula-nav__btn aula-nav__btn--next">Próxima aula<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
  </nav>`;

  class AulaConst extends HTMLElement {
    connectedCallback() {
      const done = window.Progress?.isDone(META.pagina);
      this.innerHTML =  /*HTML*/`
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
              <button class="btn-concluir ${done ? "done" : ""}" id="btn-concluir"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${done ? "Concluída" : "Marcar como concluída"}</button>
            </div>
          </header>
          <div class="aula-body">

            <!-- SEÇÃO 1: O que é const -->
            <section class="aula-section">
              <h2>O que é <code>const</code>?</h2>
              <p>Também do ES6, <code>const</code> declara uma <strong>referência constante</strong> — você não pode reatribuir após a declaração. É o padrão recomendado: use <code>const</code> sempre que possível.</p>
            </section>

            <!-- SEÇÃO 2: Referência imutável demo -->
            <section class="aula-section">
              <h2>Referência imutável ≠ valor imutável</h2>
              <p><code>const</code> torna a <em>ligação</em> entre o nome e o valor imutável — mas se o valor for um objeto, o <strong>conteúdo</strong> ainda pode mudar.</p>

              <!--
                DEMO INTERATIVO
                .kw=keyword | .ident=variável | .op=operador
                .num=número  | .str=string | .obj=objeto
                .fn=função   | .out=saída  | .out--warn=aviso
                IDs preenchidos pelo JS abaixo (connectedCallback)
              -->
              <div class="demo-code">
                <!-- const PI = 3.14159; -->
                <div class="demo-line">
                  <span class="kw">const</span>
                  <span class="ident" id="d1-nome"></span>
                  <span class="op">=</span>
                  <span class="num" id="d1-val"></span>
                  <span class="punct">;</span>
                </div>
                <!-- console.log(PI) → 3.14159 -->
                <div class="demo-line demo-line--output">
                  <span class="fn">console</span><span class="punct">.</span><span class="fn">log</span><span class="punct">(</span><span class="ident" id="d1-nome2"></span><span class="punct">);</span>
                  <span class="demo-arrow">→</span>
                  <span class="out" id="d1-saida"></span>
                </div>
              </div>

              <!-- Tentativa de reatribuição -->
              <div class="demo-code">
                <div class="demo-line"><span class="punct">// Tentar reatribuir → TypeError</span></div>
                <div class="demo-line">
                  <span class="kw">const</span>
                  <span class="ident" id="d2-nome"></span>
                  <span class="op">=</span>
                  <span class="num" id="d2-val"></span>
                  <span class="punct">;</span>
                </div>
                <div class="demo-line demo-line--output">
                  <span class="ident" id="d2-nome2"></span>
                  <span class="op">=</span>
                  <span class="num">3</span>
                  <span class="punct">;</span>
                  <span class="demo-arrow">→</span>
                  <span class="out out--warn" id="d2-erro"></span>
                </div>
              </div>
            </section>

            <!-- SEÇÃO 3: const com objetos -->
            <section class="aula-section">
              <h2><code>const</code> com objetos</h2>
              <p>A referência ao objeto é constante — mas as <strong>propriedades</strong> podem mudar.</p>
              <div class="demo-code">
                <!-- const usuario = { nome: "Ana", idade: 25 }; -->
                <div class="demo-line">
                  <span class="kw">const</span>
                  <span class="ident" id="d3-nome"></span>
                  <span class="op">=</span>
                  <span class="obj">{ nome: <span class="str">&quot;Ana&quot;</span>, idade: <span class="num">25</span> }</span>
                  <span class="punct">;</span>
                </div>
                <!-- usuario.nome = "Bruno" → ok -->
                <div class="demo-line demo-line--output">
                  <span class="ident" id="d3-nome2"></span><span class="punct">.</span><span class="ident">nome</span>
                  <span class="op">=</span>
                  <span class="str">&quot;Bruno&quot;</span>
                  <span class="punct">;</span>
                  <span class="demo-arrow">→</span>
                  <span class="out" id="d3-ok"></span>
                </div>
                <!-- usuario = {} → TypeError -->
                <div class="demo-line demo-line--output">
                  <span class="ident" id="d3-nome3"></span>
                  <span class="op">=</span>
                  <span class="obj">{}</span>
                  <span class="punct">;</span>
                  <span class="demo-arrow">→</span>
                  <span class="out out--warn" id="d3-erro"></span>
                </div>
              </div>
            </section>

            <!-- SEÇÃO 4: const com arrays -->
            <section class="aula-section">
              <h2><code>const</code> com arrays</h2>
              <div class="demo-code">
                <div class="demo-line">
                  <span class="kw">const</span>
                  <span class="ident" id="d4-nome"></span>
                  <span class="op">=</span>
                  <span class="obj">[<span class="str">&quot;maçã&quot;</span>, <span class="str">&quot;banana&quot;</span>]</span>
                  <span class="punct">;</span>
                </div>
                <div class="demo-line demo-line--output">
                  <span class="ident" id="d4-nome2"></span><span class="punct">.</span><span class="fn">push</span><span class="punct">(</span><span class="str">&quot;manga&quot;</span><span class="punct">);</span>
                  <span class="demo-arrow">→</span>
                  <span class="out" id="d4-ok"></span>
                </div>
                <div class="demo-line demo-line--output">
                  <span class="ident" id="d4-nome3"></span>
                  <span class="op">=</span>
                  <span class="obj">[]</span>
                  <span class="punct">;</span>
                  <span class="demo-arrow">→</span>
                  <span class="out out--warn" id="d4-erro"></span>
                </div>
              </div>
            </section>

            <!-- SEÇÃO 5: Inicialização obrigatória -->
            <section class="aula-section">
              <h2>Obrigatório inicializar</h2>
              <p><code>const</code> exige um valor na declaração — diferente de <code>let</code> e <code>var</code>.</p>
              <div class="demo-code">
                <div class="demo-line demo-line--output">
                  <span class="kw">const</span> <span class="ident">x</span><span class="punct">;</span>
                  <span class="demo-arrow">→</span>
                  <span class="out out--warn" id="d5-erro"></span>
                </div>
                <div class="demo-line">
                  <span class="kw">const</span>
                  <span class="ident">y</span>
                  <span class="op">=</span>
                  <span class="num">10</span>
                  <span class="punct">;</span>
                  <span class="out" id="d5-ok"></span>
                </div>
              </div>
            </section>

            <!-- SEÇÃO 6: Object.freeze -->
            <section class="aula-section">
              <h2>Object.freeze() — imutabilidade real</h2>
              <p>Para congelar o <em>conteúdo</em> de um objeto, use <code>Object.freeze()</code>. Atenção: o freeze é <strong>raso</strong> — objetos aninhados ainda podem mudar.</p>
              <div class="demo-code">
                <div class="demo-line">
                  <span class="kw">const</span>
                  <span class="ident" id="d6-nome"></span>
                  <span class="op">=</span>
                  <span class="fn">Object</span><span class="punct">.</span><span class="fn">freeze</span><span class="punct">({</span>
                  <span class="ident">versao</span><span class="punct">:</span>
                  <span class="str">&quot;<span id="d6-versao"></span>&quot;</span>
                  <span class="punct">});</span>
                </div>
                <div class="demo-line demo-line--output">
                  <span class="ident" id="d6-nome2"></span><span class="punct">.</span><span class="ident">versao</span>
                  <span class="op">=</span>
                  <span class="str">&quot;2.0&quot;</span>
                  <span class="punct">;</span>
                  <span class="demo-arrow">→</span>
                  <span class="out out--warn" id="d6-res"></span>
                </div>
                <div class="demo-line demo-line--output">
                  <span class="fn">console</span><span class="punct">.</span><span class="fn">log</span><span class="punct">(</span><span class="ident" id="d6-nome3"></span><span class="punct">.</span><span class="ident">versao</span><span class="punct">);</span>
                  <span class="demo-arrow">→</span>
                  <span class="out" id="d6-saida"></span>
                </div>
              </div>
              <div class="aula-callout aula-callout--info">Para imutabilidade profunda, use <code>structuredClone()</code> ou bibliotecas como <code>immer</code>.</div>
            </section>

            <!-- SEÇÃO 7: Regra de ouro -->
            <section class="aula-section">
              <h2>A regra de ouro</h2>
              <div class="aula-cards">
                <div class="aula-card"><div class="aula-card__icon">🥇</div><h3>Sempre const</h3><p>Comece toda variável com <code>const</code>. É a escolha mais segura por padrão.</p></div>
                <div class="aula-card"><div class="aula-card__icon">🔄</div><h3>let quando mudar</h3><p>Troque para <code>let</code> apenas quando precisar reatribuir.</p></div>
                <div class="aula-card"><div class="aula-card__icon">🚫</div><h3>Nunca var</h3><p>Esqueça <code>var</code> em código moderno.</p></div>
              </div>
            </section>

            <!-- SEÇÃO 8: Comparativo -->
            <section class="aula-section">
              <h2>Comparativo final</h2>
              <div class="aula-table-wrapper">
                <table class="aula-table">
                  <thead><tr><th></th><th><code>var</code></th><th><code>let</code></th><th><code>const</code></th></tr></thead>
                  <tbody>
                    <tr><td>Escopo</td><td>Função</td><td>Bloco</td><td>Bloco</td></tr>
                    <tr><td>Hoisting</td><td>Sim (undefined)</td><td>Sim (TDZ)</td><td>Sim (TDZ)</td></tr>
                    <tr><td>Redeclaração</td><td>✓</td><td>✗</td><td>✗</td></tr>
                    <tr><td>Reatribuição</td><td>✓</td><td>✓</td><td>✗</td></tr>
                    <tr><td>Inicialização</td><td>Opcional</td><td>Opcional</td><td>Obrigatória</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- SEÇÃO 9: Resumo -->
            <section class="aula-section">
              <h2>Resumo</h2>
              <ul class="aula-list">
                <li><code>const</code> cria uma <strong>referência imutável</strong> — não o valor em si.</li>
                <li>Objetos e arrays com <code>const</code> têm conteúdo <strong>mutável</strong>.</li>
                <li>Use <code>Object.freeze()</code> para imutabilidade rasa do conteúdo.</li>
                <li><code>const</code> exige <strong>inicialização</strong> na declaração.</li>
                <li>Use <code>const</code> por padrão — troque para <code>let</code> só quando necessário.</li>
              </ul>
            </section>

          </div>
          ${nav(META)}
        </div></main>`;

      /* ── Injeção dos dados ── */
      // Seção 2 — const PI = 3.14159
      document.getElementById("d1-nome").textContent = dados.constNome;  // nome da constante
      document.getElementById("d1-nome2").textContent = dados.constNome;
      document.getElementById("d1-val").textContent = dados.constVal;   // valor
      document.getElementById("d1-saida").textContent = dados.constVal;   // saída do log

      // Seção 2 — reatribuição proibida
      document.getElementById("d2-nome").textContent = dados.constNome;
      document.getElementById("d2-nome2").textContent = dados.constNome;
      document.getElementById("d2-val").textContent = dados.constVal;
      document.getElementById("d2-erro").textContent = "TypeError: Assignment to constant variable";

      // Seção 3 — objeto
      document.getElementById("d3-nome").textContent = dados.usuarioNome;
      document.getElementById("d3-nome2").textContent = dados.usuarioNome;
      document.getElementById("d3-nome3").textContent = dados.usuarioNome;
      document.getElementById("d3-ok").textContent = "✓ propriedade atualizada";
      document.getElementById("d3-erro").textContent = "TypeError! — reatribuição proibida";

      // Seção 4 — array
      document.getElementById("d4-nome").textContent = dados.frutaNome;
      document.getElementById("d4-nome2").textContent = dados.frutaNome;
      document.getElementById("d4-nome3").textContent = dados.frutaNome;
      document.getElementById("d4-ok").textContent = "✓ array modificado";
      document.getElementById("d4-erro").textContent = "TypeError! — reatribuição proibida";

      // Seção 5 — inicialização obrigatória
      document.getElementById("d5-erro").textContent = "SyntaxError: Missing initializer";
      document.getElementById("d5-ok").textContent = "✓";

      // Seção 6 — Object.freeze
      document.getElementById("d6-nome").textContent = dados.configNome;
      document.getElementById("d6-nome2").textContent = dados.configNome;
      document.getElementById("d6-nome3").textContent = dados.configNome;
      document.getElementById("d6-versao").textContent = dados.configVersao;
      document.getElementById("d6-res").textContent = "ignorado (ou TypeError no strict mode)";
      document.getElementById("d6-saida").textContent = `"${dados.configVersao}" — freeze funcionou`;

      /* ── Botão concluir ── */
      document.getElementById("btn-concluir")?.addEventListener("click", function () {
        const isDone = window.Progress?.isDone(META.pagina); // lê estado atual
        isDone ? window.Progress?.uncomplete(META.pagina) : window.Progress?.complete(META.pagina);
        this.classList.toggle("done", !isDone);
        this.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${!isDone ? "Concluída" : "Marcar como concluída"}`;
      });
    }
  }

  customElements.define("aula-const", AulaConst);
}
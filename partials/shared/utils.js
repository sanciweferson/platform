/* =========================================================
   SYNTAX HIGHLIGHT
========================================================= */

if (!window.highlight) {

  window.highlight = (code) => {

    // Escapa HTML primeiro
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return escaped
      // Comentários de linha
      .replace(/(\/\/[^\n]*)/g, '<span class="hl-comment">$1</span>')

      // Comentários de bloco
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>')

      // Strings
      .replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="hl-string">$&</span>')

      // Keywords JS
      .replace(/\b(var|let|const|function|return|if|else|for|while|do|switch|case|break|continue|new|delete|typeof|instanceof|in|of|class|extends|import|export|default|async|await|try|catch|finally|throw|this|super|null|undefined|true|false|NaN|Infinity)\b/g,
        '<span class="hl-keyword">$1</span>'
      )

      // Números
      .replace(/\b(\d+\.?\d*n?)\b/g, '<span class="hl-number">$1</span>')

      // Funções chamadas
      .replace(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, '<span class="hl-fn">$1</span>')

      // Propriedades
      .replace(/\.([a-zA-Z_$][\w$]*)/g, '.<span class="hl-prop">$1</span>');
  };

}


/* =========================================================
   HELPER PARA BLOCO DE CÓDIGO
========================================================= */

if (!window.codeBlock) {

  window.codeBlock = (code) => {
    return `
<pre class="aula-code">
<code>${window.highlight(code.trim())}</code>
</pre>
`;
  };

}


/* =========================================================
   PROGRESS TRACKER
   localStorage key: jslearn_progress
   Estrutura:
   {
     "variaveis-tipos/aulas/01": true,
     "fundamentos/aulas/03": true
   }
========================================================= */

if (!window.Progress) {

  const PROGRESS_KEY = "jslearn_progress";

  window.Progress = {

    /* Retorna objeto completo */
    all() {
      try {
        return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
      } catch {
        return {};
      }
    },

    /* Marca aula como concluída */
    complete(pagina) {

      const data = this.all();

      data[pagina] = true;

      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify(data)
      );

      this._dispatch();
    },

    /* Remove conclusão */
    uncomplete(pagina) {

      const data = this.all();

      delete data[pagina];

      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify(data)
      );

      this._dispatch();
    },

    /* Verifica se aula está concluída */
    isDone(pagina) {
      return !!this.all()[pagina];
    },

    /* Retorna progresso de módulo */
    module(modulo, total) {

      const data = this.all();

      const done = Object
        .keys(data)
        .filter(key =>
          key.startsWith(modulo + "/aulas/")
        )
        .length;

      const pct = total > 0
        ? Math.round((done / total) * 100)
        : 0;

      return {
        done,
        total,
        pct
      };
    },

    /* Resetar progresso */
    reset() {

      localStorage.removeItem(PROGRESS_KEY);

      this._dispatch();
    },

    /* Evento global para atualizar UI */
    _dispatch() {

      window.dispatchEvent(
        new CustomEvent("progress-update")
      );

    }

  };

}
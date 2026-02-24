/* =========================================================
   SHARED UTILS
   window.highlight()  — syntax highlight
   window.codeBlock()  — bloco com botão copiar
   window.Progress     — tracker de progresso
========================================================= */

/* =========================================================
   SYNTAX HIGHLIGHT
   Estratégia de placeholders:
   1. Escapa HTML (&, <, >)
   2. Salva comentários e strings como __SLTn__ (nunca afetados pelas regexes JS)
   3. Aplica keywords, números, funções e props
   4. Restaura os placeholders com os <span> prontos
========================================================= */
window.highlight = (raw) => {
  let code = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const slots = [];
  const ph = (i) => `__SLT${i}__`; // nunca aparece em JS real

  const save = (match, cls) => {
    const i = slots.length;
    slots.push(`<span class="${cls}">${match}</span>`);
    return ph(i);
  };

  /* ── Protege primeiro (ordem importa) ── */
  code = code.replace(/(\/\/[^\n]*)/g, (m) => save(m, "hl-comment")); // // linha
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, (m) => save(m, "hl-comment")); // /* bloco */
  code = code.replace(/((?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`))/g,
    (m) => save(m, "hl-string"));  // strings

  /* ── Tokens ── */
  code = code.replace(
    /\b(var|let|const|function|return|if|else|for|while|do|switch|case|break|continue|new|delete|typeof|instanceof|in|of|class|extends|import|export|default|async|await|try|catch|finally|throw|this|super|null|undefined|true|false|NaN|Infinity)\b/g,
    '<span class="hl-keyword">$1</span>'
  );
  code = code.replace(/\b(\d+\.?\d*n?)\b/g,
    '<span class="hl-number">$1</span>');
  code = code.replace(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
    '<span class="hl-fn">$1</span>');
  code = code.replace(/\.([a-zA-Z_$][\w$]*)/g,
    '.<span class="hl-prop">$1</span>');

  /* ── Restaura comentários e strings ── */
  slots.forEach((html, i) => {
    code = code.split(ph(i)).join(html);
  });

  return code;
};

/* =========================================================
   CODE BLOCK — bloco escuro com botão copiar
   Usa addEventListener após render — sem onclick inline
   (evita conflito de aspas dentro de template literals)
========================================================= */
window.codeBlock = (raw) => {
  const id = "cb-" + Math.random().toString(36).slice(2, 8);
  const html = window.highlight(raw.trim());

  /* Registra o listener no próximo frame (DOM já inserido) */
  requestAnimationFrame(() => {
    const btn = document.querySelector(`[data-cb="${id}"]`);
    const pre = document.getElementById(id);
    if (!btn || !pre) return;

    const iconCopy = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    const iconDone = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.classList.add("copied");
        btn.innerHTML = iconDone + " Copiado!";
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.innerHTML = iconCopy + " Copiar";
        }, 2000);
      });
    });
  });

  return `<div class="code-container">
  <button class="btn-copy" data-cb="${id}" aria-label="Copiar código">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
    Copiar
  </button>
  <pre class="aula-code"><code id="${id}">${html}</code></pre>
</div>`;
};

/* =========================================================
   PROGRESS TRACKER
   Chave: "jslearn_progress"
   Estrutura: { "variaveis-tipos/aulas/01": true, ... }
========================================================= */
const PROGRESS_KEY = "jslearn_progress";

window.Progress = {
  all() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch { return {}; }
  },

  complete(pagina) {
    const d = this.all();
    d[pagina] = true;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(d));
    this._emit();
  },

  uncomplete(pagina) {
    const d = this.all();
    delete d[pagina];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(d));
    this._emit();
  },

  isDone(pagina) {
    return !!this.all()[pagina];
  },

  module(modulo, total) {
    const d = this.all();
    const done = Object.keys(d).filter(k => k.startsWith(modulo + "/aulas/")).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  },

  reset() {
    localStorage.removeItem(PROGRESS_KEY);
    this._emit();
  },

  _emit() {
    window.dispatchEvent(new CustomEvent("progress-update"));
  },
};
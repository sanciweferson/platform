/* =========================================================
   HOME — progresso, conquistas, streak, meta diária
========================================================= */

const MODULOS = [
  { id: "fundamentos", label: "Fundamentos", total: 8, href: "?pagina=fundamentos", cor: "var(--mod-1)" },
  { id: "variaveis-tipos", label: "Variáveis & Tipos", total: 7, href: "?pagina=variaveis-tipos", cor: "var(--mod-2)" },
  { id: "logica-fluxo", label: "Lógica & Fluxo", total: 0, href: "?pagina=logica-fluxo", cor: "var(--mod-3)" },
  { id: "funcoes", label: "Funções", total: 0, href: "?pagina=funcoes", cor: "var(--mod-4)" },
  { id: "objetos-literais", label: "Objetos Literais", total: 0, href: "?pagina=objetos-literais", cor: "var(--mod-5)" },
  { id: "dominacao-dom", label: "Dominação do DOM", total: 0, href: "?pagina=dominacao-dom", cor: "var(--mod-6)" },
  { id: "js-assincrono", label: "JS Assíncrono", total: 0, href: "?pagina=js-assincrono", cor: "var(--mod-7)" },
  { id: "orientacao-objetos", label: "Orientação a Objetos", total: 0, href: "?pagina=orientacao-objetos", cor: "var(--mod-8)" },
];

const CONQUISTAS = {
  "fundamentos": { icon: "🌱", label: "Raízes do JS" },
  "variaveis-tipos": { icon: "📦", label: "Mestre das Caixas" },
  "logica-fluxo": { icon: "🔀", label: "Lógico" },
  "funcoes": { icon: "⚡", label: "Funcional" },
  "objetos-literais": { icon: "🗂️", label: "Organizador" },
  "dominacao-dom": { icon: "🌐", label: "Dom do DOM" },
  "js-assincrono": { icon: "⏳", label: "Async Master" },
  "orientacao-objetos": { icon: "🏛️", label: "Arquiteto" },
};

/* =========================================================
   MODAL SYSTEM — substitui confirm() e prompt()
========================================================= */
const Modal = (() => {
  let overlay = null;

  const getOverlay = () => {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    document.body.appendChild(overlay);
    return overlay;
  };

  const close = () => {
    const el = document.querySelector(".modal-overlay");
    if (!el) return;
    el.classList.remove("modal-overlay--visible");
    setTimeout(() => { el.innerHTML = ""; }, 200);
  };

  /* Fecha ao clicar no overlay escuro */
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) close();
  });

  /* Fecha com Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  /* ── Modal de confirmação ── */
  const confirm = ({ icon = "⚠️", title, message, labelOk = "Confirmar", labelCancel = "Cancelar", danger = false }) =>
    new Promise((resolve) => {
      const el = getOverlay();
      el.innerHTML = /*html*/`
        <div class="modal">
          <div class="modal__icon modal__icon--${danger ? "danger" : "warn"}">${icon}</div>
          <h2 class="modal__title">${title}</h2>
          <p class="modal__message">${message}</p>
          <div class="modal__actions">
            <button class="modal__btn modal__btn--cancel" id="modal-cancel">${labelCancel}</button>
            <button class="modal__btn modal__btn--${danger ? "danger" : "primary"}" id="modal-ok">${labelOk}</button>
          </div>
        </div>`;
      requestAnimationFrame(() => el.classList.add("modal-overlay--visible"));

      el.querySelector("#modal-ok").addEventListener("click", () => { close(); resolve(true); });
      el.querySelector("#modal-cancel").addEventListener("click", () => { close(); resolve(false); });
      el.querySelector("#modal-ok").focus();
    });

  /* ── Modal de seleção numérica (substitui prompt) ── */
  const pick = ({ icon = "🎯", title, message, min = 1, max = 10, current = 2 }) =>
    new Promise((resolve) => {
      const el = getOverlay();
      el.innerHTML = /*html*/`
        <div class="modal">
          <div class="modal__icon modal__icon--primary">${icon}</div>
          <h2 class="modal__title">${title}</h2>
          <p class="modal__message">${message}</p>
          <div class="modal__picker">
            <button class="modal__picker-btn" id="picker-dec" aria-label="Diminuir">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <span class="modal__picker-val" id="picker-val">${current}</span>
            <button class="modal__picker-btn" id="picker-inc" aria-label="Aumentar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          <p class="modal__picker-hint">${min} a ${max} aulas por dia</p>
          <div class="modal__actions">
            <button class="modal__btn modal__btn--cancel" id="modal-cancel">Cancelar</button>
            <button class="modal__btn modal__btn--primary" id="modal-ok">Salvar meta</button>
          </div>
        </div>`;
      requestAnimationFrame(() => el.classList.add("modal-overlay--visible"));

      let val = current;
      const valEl = el.querySelector("#picker-val");
      const decBtn = el.querySelector("#picker-dec");
      const incBtn = el.querySelector("#picker-inc");

      const update = () => {
        valEl.textContent = val;
        decBtn.disabled = val <= min;
        incBtn.disabled = val >= max;
      };
      update();

      decBtn.addEventListener("click", () => { if (val > min) { val--; update(); } });
      incBtn.addEventListener("click", () => { if (val < max) { val++; update(); } });
      el.querySelector("#modal-ok").addEventListener("click", () => { close(); resolve(val); });
      el.querySelector("#modal-cancel").addEventListener("click", () => { close(); resolve(null); });
    });

  return { confirm, pick, close };
})();

/* =========================================================
   STREAK
========================================================= */
const Streak = {
  KEY: "jslearn_streak",
  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || { count: 0, lastDate: null }; }
    catch { return { count: 0, lastDate: null }; }
  },
  touch() {
    const hoje = new Date().toISOString().slice(0, 10);
    const data = this.get();
    const ontem = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    if (data.lastDate === hoje) return data;
    if (data.lastDate === ontem) data.count++;
    else data.count = 1;
    data.lastDate = hoje;
    localStorage.setItem(this.KEY, JSON.stringify(data));
    return data;
  },
  reset() { localStorage.removeItem(this.KEY); },
};

/* =========================================================
   META DIÁRIA
========================================================= */
const META_KEY = "jslearn_meta";
const META_PAD = "jslearn_meta_pad";

const getMeta = () => parseInt(localStorage.getItem(META_KEY) || "2");
const setMeta = (n) => localStorage.setItem(META_KEY, n);
const getMetaPad = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(META_PAD));
    const hoje = new Date().toISOString().slice(0, 10);
    return (raw?.date === hoje) ? raw.count : 0;
  } catch { return 0; }
};
const incMetaPad = () => {
  const hoje = new Date().toISOString().slice(0, 10);
  const atual = getMetaPad();
  localStorage.setItem(META_PAD, JSON.stringify({ date: hoje, count: atual + 1 }));
  return atual + 1;
};

/* =========================================================
   CONFETE
========================================================= */
const confete = () => {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const cores = ["#f97316", "#8b5cf6", "#22c55e", "#3b82f6", "#ec4899", "#eab308"];
  const pcs = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: -10 - Math.random() * 100,
    r: 4 + Math.random() * 6,
    cor: cores[Math.floor(Math.random() * cores.length)],
    vy: 2 + Math.random() * 4,
    vx: (Math.random() - .5) * 3,
    rot: Math.random() * 360,
    vrot: (Math.random() - .5) * 8,
  }));
  let frame;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let vivos = false;
    pcs.forEach(p => {
      p.y += p.vy; p.x += p.vx; p.rot += p.vrot; p.vy += .05;
      if (p.y < canvas.height + 20) vivos = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.cor;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
      ctx.restore();
    });
    if (vivos) frame = requestAnimationFrame(draw);
    else canvas.remove();
  };
  draw();
  setTimeout(() => { cancelAnimationFrame(frame); canvas.remove(); }, 4000);
};

/* =========================================================
   TEMPO RESTANTE
========================================================= */
const tempoRestante = () => {
  const data = window.Progress?.all() || {};
  const mins = MODULOS.reduce((acc, m) => {
    const feitas = Object.keys(data).filter(k => k.startsWith(m.id + "/aulas/")).length;
    return acc + Math.max(0, m.total - feitas) * 11;
  }, 0);
  if (mins <= 0) return "🎉 Concluído!";
  if (mins < 60) return `~${mins} min restantes`;
  const h = Math.floor(mins / 60), m = mins % 60;
  return m > 0 ? `~${h}h ${m}min restantes` : `~${h}h restantes`;
};

/* =========================================================
   RENDER
========================================================= */
const renderProgress = () => {
  const container = document.getElementById("home-progress");
  if (!container || !window.Progress) return;

  const data = window.Progress.all();
  const totalAulas = MODULOS.reduce((acc, m) => acc + m.total, 0);
  const totalFeitas = Object.keys(data).length;
  const pctGlobal = totalAulas > 0 ? Math.round((totalFeitas / totalAulas) * 100) : 0;
  const streak = Streak.get();
  const meta = getMeta();
  const metaHoje = getMetaPad();
  const metaPct = Math.min(100, Math.round((metaHoje / meta) * 100));
  const tempo = tempoRestante();

  const conquistasDesbloqueadas = MODULOS
    .filter(m => m.total > 0 && window.Progress.module(m.id, m.total).pct === 100)
    .map(m => CONQUISTAS[m.id]);

  container.innerHTML = /*html*/`
    <div class="home-progress">

      <div class="home-progress__header">
        <div>
          <h2 class="home-progress__title">Seu progresso</h2>
          <p class="home-progress__subtitle">
            <strong>${totalFeitas}</strong> de <strong>${totalAulas}</strong> aulas concluídas
            <span class="home-progress__tempo">· ${tempo}</span>
          </p>
        </div>
        <button class="home-progress__reset" id="btn-reset-progress" title="Resetar progresso">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.41"/></svg>
          Resetar
        </button>
      </div>

      <div class="home-progress__global">
        <div class="home-progress__track">
          <div class="home-progress__fill" style="width:${pctGlobal}%"></div>
        </div>
        <span class="home-progress__pct">${pctGlobal}%</span>
      </div>

      <div class="home-progress__stats">
        <div class="progress-stat">
          <div class="progress-stat__icon">${streak.count >= 3 ? "🔥" : "📅"}</div>
          <div class="progress-stat__info">
            <span class="progress-stat__value">${streak.count} dia${streak.count !== 1 ? "s" : ""}</span>
            <span class="progress-stat__label">Sequência</span>
          </div>
        </div>

        <div class="progress-stat">
          <div class="progress-stat__icon">🎯</div>
          <div class="progress-stat__info">
            <span class="progress-stat__value">${metaHoje}/${meta} aulas</span>
            <span class="progress-stat__label">Meta de hoje</span>
          </div>
          <div class="progress-stat__mini-track">
            <div class="progress-stat__mini-fill" style="width:${metaPct}%"></div>
          </div>
        </div>

        <div class="progress-stat progress-stat--meta-edit" id="btn-editar-meta" title="Alterar meta diária" style="cursor:pointer">
          <div class="progress-stat__icon">⚙️</div>
          <div class="progress-stat__info">
            <span class="progress-stat__value">${meta} aulas/dia</span>
            <span class="progress-stat__label">Alterar meta</span>
          </div>
        </div>
      </div>

      ${conquistasDesbloqueadas.length > 0 ? /*html*/`
        <div class="home-progress__conquistas">
          <p class="home-progress__conquistas-label">Conquistas</p>
          <div class="conquistas-list">
            ${conquistasDesbloqueadas.map(c => /*html*/`
              <div class="conquista" title="${c.label}">
                <span class="conquista__icon">${c.icon}</span>
                <span class="conquista__label">${c.label}</span>
              </div>`).join("")}
          </div>
        </div>` : ""}

      <div class="home-progress__modules">
        ${MODULOS.map(m => {
    const { done, pct } = window.Progress.module(m.id, m.total);
    const bloqueado = m.total === 0;
    const completo = pct === 100;
    return /*html*/`
            <a href="${bloqueado ? "#" : m.href}"
               class="progress-module ${bloqueado ? "progress-module--locked" : ""} ${completo ? "progress-module--done" : ""}">
              <div class="progress-module__info">
                <span class="progress-module__label">${m.label}</span>
                <span class="progress-module__right">
                  ${completo ? `<svg class="progress-module__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>` : ""}
                  <span class="progress-module__count">${bloqueado ? "Em breve" : `${done}/${m.total}`}</span>
                </span>
              </div>
              <div class="progress-module__track">
                <div class="progress-module__fill" style="width:${pct}%;background-color:${m.cor}"></div>
              </div>
            </a>`;
  }).join("")}
      </div>

    </div>
  `;

  /* ── Resetar ── */
  document.getElementById("btn-reset-progress")?.addEventListener("click", async () => {
    const ok = await Modal.confirm({
      icon: "🗑️",
      title: "Resetar progresso",
      message: "Todo o seu progresso, sequência de dias e conquistas serão apagados. Essa ação não pode ser desfeita.",
      labelOk: "Sim, resetar",
      labelCancel: "Cancelar",
      danger: true,
    });
    if (ok) {
      window.Progress.reset();
      Streak.reset();
      localStorage.removeItem(META_PAD);
    }
  });

  /* ── Alterar meta ── */
  document.getElementById("btn-editar-meta")?.addEventListener("click", async () => {
    const nova = await Modal.pick({
      icon: "🎯",
      title: "Meta diária",
      message: "Quantas aulas você quer concluir por dia?",
      min: 1,
      max: 10,
      current: getMeta(),
    });
    if (nova !== null) { setMeta(nova); renderProgress(); }
  });
};

/* =========================================================
   HOOK NO PROGRESS
========================================================= */
const hookProgress = () => {
  if (!window.Progress) return;
  const orig = window.Progress.complete.bind(window.Progress);
  window.Progress.complete = function (pagina) {
    orig(pagina);
    Streak.touch();
    const hoje = incMetaPad();
    if (hoje === getMeta()) setTimeout(() => confete(), 300);
    const modId = MODULOS.find(m => pagina.startsWith(m.id + "/aulas/"))?.id;
    if (modId) {
      const { pct } = window.Progress.module(modId, MODULOS.find(m => m.id === modId)?.total || 0);
      if (pct === 100) setTimeout(() => confete(), 600);
    }
  };
};

/* ── Listeners ── */
window.addEventListener("progress-update", renderProgress);

document.addEventListener("DOMContentLoaded", () => {
  const init = () => { hookProgress(); renderProgress(); };
  if (!window.Progress) {
    const s = document.createElement("script");
    s.src = "/partials/shared/utils.js";
    s.onload = init;
    document.body.appendChild(s);
  } else {
    init();
  }
});
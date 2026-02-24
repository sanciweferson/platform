/* =========================================================
   HOME — progresso dos módulos
   Adicionar no index.html: <script src="index.js"></script>
========================================================= */

/* Configuração dos módulos com total de aulas */
const MODULOS = [
  { id: "fundamentos", label: "Fundamentos", total: 8, href: "?pagina=fundamentos" },
  { id: "variaveis-tipos", label: "Variáveis & Tipos", total: 7, href: "?pagina=variaveis-tipos" },
  { id: "logica-fluxo", label: "Lógica & Fluxo", total: 0, href: "?pagina=logica-fluxo" },
  { id: "funcoes", label: "Funções", total: 0, href: "?pagina=funcoes" },
  { id: "objetos-literais", label: "Objetos Literais", total: 0, href: "?pagina=objetos-literais" },
  { id: "dominacao-dom", label: "Dominação do DOM", total: 0, href: "?pagina=dominacao-dom" },
  { id: "js-assincrono", label: "JS Assíncrono", total: 0, href: "?pagina=js-assincrono" },
  { id: "orientacao-objetos", label: "Orientação a Objetos", total: 0, href: "?pagina=orientacao-objetos" },
];

/* ── Renderiza o widget de progresso ── */
const renderProgress = () => {
  const container = document.getElementById("home-progress");
  if (!container || !window.Progress) return;

  const data = window.Progress.all();

  /* Totais globais */
  const totalAulas = MODULOS.reduce((acc, m) => acc + m.total, 0);
  const totalFeitas = Object.keys(data).length;
  const pctGlobal = totalAulas > 0 ? Math.round((totalFeitas / totalAulas) * 100) : 0;

  container.innerHTML = /*html*/`
    <div class="home-progress">
      <div class="home-progress__header">
        <div>
          <h2 class="home-progress__title">Seu progresso</h2>
          <p class="home-progress__subtitle">
            <strong id="progress-feitas">${totalFeitas}</strong> de
            <strong>${totalAulas}</strong> aulas concluídas
          </p>
        </div>
        <button class="home-progress__reset" id="btn-reset-progress" title="Resetar progresso">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.41"/></svg>
          Resetar
        </button>
      </div>

      <div class="home-progress__global">
        <div class="home-progress__track">
          <div class="home-progress__fill" style="width: ${pctGlobal}%"></div>
        </div>
        <span class="home-progress__pct">${pctGlobal}%</span>
      </div>

      <div class="home-progress__modules">
        ${MODULOS.map(m => {
    const { done, pct } = window.Progress.module(m.id, m.total);
    const bloqueado = m.total === 0;
    return /*html*/`
            <a href="${bloqueado ? '#' : m.href}" class="progress-module ${bloqueado ? 'progress-module--locked' : ''}">
              <div class="progress-module__info">
                <span class="progress-module__label">${m.label}</span>
                <span class="progress-module__count">${bloqueado ? 'Em breve' : `${done}/${m.total}`}</span>
              </div>
              <div class="progress-module__track">
                <div class="progress-module__fill" style="width: ${pct}%"></div>
              </div>
            </a>`;
  }).join("")}
      </div>
    </div>
  `;

  /* Botão resetar */
  document.getElementById("btn-reset-progress")?.addEventListener("click", () => {
    if (confirm("Resetar todo o progresso? Essa ação não pode ser desfeita.")) {
      window.Progress.reset();
    }
  });
};

/* Atualiza quando progresso muda (evento do utils.js) */
window.addEventListener("progress-update", renderProgress);

/* Inicializa quando o DOM estiver pronto */
document.addEventListener("DOMContentLoaded", () => {
  /* Carrega utils.js se não estiver carregado */
  if (!window.Progress) {
    const s = document.createElement("script");
    s.src = "/partials/shared/utils.js";
    s.onload = renderProgress;
    document.body.appendChild(s);
  } else {
    renderProgress();
  }
});
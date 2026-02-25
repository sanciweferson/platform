/* =========================================================
   SCROLL TO TOP — botão flutuante com anel de progresso
   Aparece em TODAS as páginas após rolar 200px.
   O anel SVG mostra o percentual de leitura da página.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Cria o botão e o SVG do anel de progresso ── */
  const btn = document.createElement("button");
  btn.id = "scroll-top-btn";
  btn.className = "scroll-top";
  btn.setAttribute("aria-label", "Voltar ao topo");
  btn.setAttribute("title", "Voltar ao topo");

  // O SVG tem dois círculos: trilha (fundo) e progresso (colorido)
  // O circumference do círculo r=18 é 2π×18 ≈ 113.1
  const CIRCUNF = 2 * Math.PI * 18; // ≈ 113.097

  btn.innerHTML = `
    <!-- Anel de progresso SVG -->
    <svg class="scroll-top__ring" viewBox="0 0 44 44" aria-hidden="true">
      <!-- Trilha cinza -->
      <circle class="scroll-top__track" cx="22" cy="22" r="18"/>
      <!-- Arco colorido — stroke-dashoffset controla o quanto aparece -->
      <circle class="scroll-top__arc"   cx="22" cy="22" r="18"
              stroke-dasharray="${CIRCUNF}"
              stroke-dashoffset="${CIRCUNF}"/>
    </svg>

    <!-- Percentual numérico no centro -->
    <span class="scroll-top__pct" id="scroll-pct">0%</span>

    <!-- Seta para cima (aparece ao chegar em 100%) -->
    <svg class="scroll-top__arrow" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>`;

  document.body.appendChild(btn);

  /* ── Referências internas ── */
  const arcEl = btn.querySelector(".scroll-top__arc");   // arco colorido
  const pctEl = document.getElementById("scroll-pct");   // texto "%"

  /* ── Atualiza o anel e a visibilidade no scroll ── */
  const onScroll = () => {
    const scrollTop = window.scrollY;                        // pixels rolados
    const docHeight = document.documentElement.scrollHeight  // altura total
      - document.documentElement.clientHeight; // menos a viewport

    // Percentual de 0 a 1
    const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    const pctInt = Math.round(pct * 100); // 0–100

    // Atualiza o traço do SVG:
    // dashoffset = CIRCUNF - (CIRCUNF × pct)
    // → 0% = offset total (arco invisível)
    // → 100% = offset zero (arco completo)
    arcEl.style.strokeDashoffset = CIRCUNF * (1 - pct);

    // Atualiza o texto central
    pctEl.textContent = pctInt + "%";

    // Mostra/esconde o botão (aparece após 200px)
    btn.classList.toggle("scroll-top--visible", scrollTop > 200);

    // Quando chega a 100%: esconde o número e mostra a seta
    btn.classList.toggle("scroll-top--done", pct >= 0.99);
  };

  // Registra o listener com passive:true para melhor performance
  window.addEventListener("scroll", onScroll, { passive: true });

  // Executa uma vez ao carregar para estado inicial correto
  onScroll();

  /* ── Clique: volta ao topo com animação suave ── */
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
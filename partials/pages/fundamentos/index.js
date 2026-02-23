/* Garante que o Web Component só é registrado uma vez */
if (!customElements.get("fundamentos-page")) {

  /* =========================================================
     DADOS DAS AULAS
  ========================================================= */
  const lessons = [
    { num: "01", badge: "Grátis", title: "Introdução ao JavaScript", desc: "O que é JS, onde roda e para que serve.", duration: "8 min", active: true },
    { num: "02", badge: "Grátis", title: "Seu primeiro código", desc: "Console, alert e como executar JS no navegador.", duration: "10 min", active: false },
    { num: "03", badge: "Grátis", title: "Como o navegador interpreta JS", desc: "A engine V8, JIT compilation e o event loop simplificado.", duration: "12 min", active: false },
    { num: "04", badge: "Pro", title: "Erros e o Console DevTools", desc: "Tipos de erro, stack trace e como ler mensagens de debug.", duration: "14 min", active: false },
    { num: "05", badge: "Pro", title: "Comentários e boas práticas", desc: "Quando comentar, estilo de código e linters.", duration: "9 min", active: false },
    { num: "06", badge: "Pro", title: "Strict Mode", desc: "O que muda com 'use strict' e por que usar.", duration: "7 min", active: false },
    { num: "07", badge: "Pro", title: "Scripts externos e módulos", desc: "Como importar JS no HTML e a diferença entre scripts e módulos.", duration: "11 min", active: false },
    { num: "08", badge: "Pro", title: "Ecossistema JavaScript", desc: "Node.js, npm, bundlers e onde o JS está hoje.", duration: "15 min", active: false },
  ];

  /* =========================================================
     TEMPLATES
  ========================================================= */
  const createLessonCard = ({ num, badge, title, desc, duration, active }) => `
    <a href="?pagina=fundamentos/aulas/${num}" class="lesson-card${active ? " active" : ""}">
      <div class="lesson-meta">
        <span class="lesson-num">${num}</span>
        <span class="lesson-badge lesson-badge--${badge === "Grátis" ? "free" : "pro"}">${badge}</span>
      </div>
      <div class="lesson-info">
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
      <span class="lesson-duration">${duration}</span>
    </a>`;

  const createHero = () => `
    <div class="page-hero">
      <div class="page-hero__eyebrow">Módulo 1</div>
      <h1 class="page-hero__title">Fundamentos</h1>
      <p class="page-hero__desc">
        Comece do zero e entenda o que é JavaScript, como ele funciona
        por baixo dos panos e por que ele domina a web moderna.
      </p>
      <div class="page-hero__stats">
        <span><strong>${lessons.length}</strong> aulas</span>
        <span><strong>${lessons.filter(l => l.badge === "Grátis").length}</strong> grátis</span>
        <span><strong>~${lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)} min</strong> de conteúdo</span>
      </div>
    </div>`;

  /* =========================================================
     WEB COMPONENT
  ========================================================= */
  class FundamentosPage extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <main class="page-fundamentos">
          ${createHero()}
          <section class="lessons-section">
            <div class="lessons-grid">
              ${lessons.map(createLessonCard).join("")}
            </div>
          </section>
        </main>
      `;
    }
  }

  customElements.define("fundamentos-page", FundamentosPage);
}
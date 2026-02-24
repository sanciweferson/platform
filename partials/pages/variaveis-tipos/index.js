if (!customElements.get("variaveis-tipos-page")) {

  const lessons = [
    { num: "01", badge: "Grátis", title: "var", desc: "Escopo de função, hoisting e por que evitar.", duration: "8 min", active: true },
    { num: "02", badge: "Grátis", title: "let", desc: "Escopo de bloco, TDZ e quando usar.", duration: "9 min", active: false },
    { num: "03", badge: "Grátis", title: "const", desc: "Referência imutável, objetos e arrays com const.", duration: "8 min", active: false },
    { num: "04", badge: "Grátis", title: "Tipos de dados", desc: "Visão geral dos tipos, typeof e tipagem dinâmica.", duration: "9 min", active: false },
    { num: "05", badge: "Pro", title: "Tipos primitivos", desc: "String, Number, Boolean, null, undefined, Symbol, BigInt.", duration: "13 min", active: false },
    { num: "06", badge: "Pro", title: "Tipos de referência", desc: "Objetos, arrays, funções — stack vs heap, cópia.", duration: "12 min", active: false },
    { num: "07", badge: "Pro", title: "Coerção de tipos", desc: "Conversão implícita, == vs ===, armadilhas do JS.", duration: "11 min", active: false },
  ];

  const createLessonCard = ({ num, badge, title, desc, duration, active }) => `
    <a href="?pagina=variaveis-tipos/aulas/${num}" class="lesson-card${active ? " active" : ""}">
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
      <div class="page-hero__eyebrow">Módulo 2</div>
      <h1 class="page-hero__title">Variáveis & Tipos</h1>
      <p class="page-hero__desc">
        Entenda como o JavaScript armazena e manipula dados —
        de var/let/const até primitivos, referências e coerção.
      </p>
      <div class="page-hero__stats">
        <span><strong>${lessons.length}</strong> aulas</span>
        <span><strong>${lessons.filter(l => l.badge === "Grátis").length}</strong> grátis</span>
        <span><strong>~${lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)} min</strong> de conteúdo</span>
      </div>
    </div>`;

  class VariaveisTiposPage extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <main class="page-fundamentos">
          ${createHero()}
          <section class="lessons-section">
            <div class="lessons-grid">
              ${lessons.map(createLessonCard).join("")}
            </div>
          </section>
        </main>`;
    }
  }
  customElements.define("variaveis-tipos-page", VariaveisTiposPage);
}
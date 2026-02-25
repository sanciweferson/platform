/* =========================================================
   HOME WIDGETS
   - Saudação animada
   - Frases com efeito de digitação
   - Relógio + data ao vivo (resistente a SPA e aba inativa)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────────────────────────────
     BOAS-VINDAS ANIMADA
  ───────────────────────────────────────────────────── */

  const getSaudacao = () => {
    const hora = new Date().getHours();

    if (hora >= 5 && hora < 12) return "Bom dia";
    if (hora >= 12 && hora < 18) return "Boa tarde";
    return "Boa noite";
  };

  const frases = [
    "Pronto para aprender JavaScript?",
    "Cada aula te deixa mais perto do próximo nível.",
    "Consistência supera talento. Vamos nessa!",
    "O melhor momento para aprender é agora.",
  ];

  const homeContent = document.getElementById("home-content");
  if (!homeContent) return;

  const widget = document.createElement("div");
  widget.className = "welcome-widget";

  widget.innerHTML = `
    <div class="welcome-widget__inner">
      <span class="welcome-widget__saudacao">${getSaudacao()}! 👋</span>

      <p class="welcome-widget__frase">
        <span class="welcome-widget__texto" id="welcome-texto"></span>
        <span class="welcome-widget__cursor">|</span>
      </p>
    </div>
  `;

  homeContent.insertBefore(widget, homeContent.firstChild);


  /* ─────────────────────────────────────────────────────
     TYPEWRITER
  ───────────────────────────────────────────────────── */

  const textoEl = document.getElementById("welcome-texto");

  let fraseIdx = 0;
  let charIdx = 0;
  let apagando = false;

  const digitar = () => {

    const frase = frases[fraseIdx];

    if (!apagando) {

      textoEl.textContent = frase.slice(0, charIdx + 1);
      charIdx++;

      if (charIdx === frase.length) {
        apagando = true;
        setTimeout(digitar, 2200);
        return;
      }

      setTimeout(digitar, 48);

    } else {

      textoEl.textContent = frase.slice(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        apagando = false;
        fraseIdx = (fraseIdx + 1) % frases.length;
        setTimeout(digitar, 400);
        return;
      }

      setTimeout(digitar, 28);
    }
  };

  setTimeout(digitar, 600);


  /* ─────────────────────────────────────────────────────
     RELÓGIO AO VIVO
  ───────────────────────────────────────────────────── */

  let clockInterval = null;

  const formatarData = (d) => {
    return d.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatarHora = (d) => {
    return d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const tick = () => {

    const dataEl = document.getElementById("clock-data");
    const horaEl = document.getElementById("clock-hora");

    if (!dataEl || !horaEl) return;

    const agora = new Date();

    dataEl.textContent = formatarData(agora);
    horaEl.textContent = formatarHora(agora);
  };

  const iniciarRelogio = () => {

    tick();

    if (clockInterval) {
      clearInterval(clockInterval);
    }

    clockInterval = setInterval(tick, 1000);
  };


  /* ─────────────────────────────────────────────────────
     OBSERVER
     espera o relógio aparecer no DOM
  ───────────────────────────────────────────────────── */

  const observer = new MutationObserver(() => {

    if (document.getElementById("clock-hora")) {

      iniciarRelogio();
      observer.disconnect();

    }

  });

  observer.observe(homeContent, {
    childList: true,
    subtree: true
  });


  /* ─────────────────────────────────────────────────────
     CORREÇÃO PARA ABA INATIVA
  ───────────────────────────────────────────────────── */

  document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

      iniciarRelogio();

    }

  });

});
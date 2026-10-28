/**
 * TaleCraft — landing page.
 *
 * Sem dependências. Quatro comportamentos:
 *   1. menu móvel;
 *   2. sombra da barra ao rolar;
 *   3. revelação das seções no scroll;
 *   4. lightbox das telas do aplicativo.
 *
 * Tudo degrada bem sem JavaScript: o menu continua visível no layout
 * grande, as telas abrem pelo próprio link quando o <dialog> não existe e
 * as imagens já estão no HTML.
 */
(() => {
  "use strict";

  const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* 1. Menu móvel ------------------------------------------------------ */

  const botaoMenu = document.querySelector(".menu__botao");
  const menu = document.querySelector(".menu");

  if (botaoMenu && menu) {
    const fecharMenu = () => {
      menu.classList.remove("is-aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.setAttribute("aria-label", "Abrir menu");
    };

    const alternarMenu = () => {
      const aberto = menu.classList.toggle("is-aberto");
      botaoMenu.setAttribute("aria-expanded", String(aberto));
      botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    };

    botaoMenu.addEventListener("click", alternarMenu);
    menu.addEventListener("click", (evento) => {
      if (evento.target.closest("a")) fecharMenu();
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape") fecharMenu();
    });

    document.addEventListener("click", (evento) => {
      if (!menu.classList.contains("is-aberto")) return;
      if (!evento.target.closest(".topbar")) fecharMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) fecharMenu();
    });
  }

  /* 2. Sombra da topbar ------------------------------------------------ */

  const topbar = document.querySelector(".topbar");
  if (topbar) {
    const aoRolar = () => topbar.classList.toggle("is-rolada", window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
  }

  /* 3. Revelação no scroll --------------------------------------------- */

  const alvos = document.querySelectorAll(
    ".cabecalho-secao, .cartao-lista, .recurso, .relacoes > div, .relacoes__midia, .tela, .tema, .stack__item, .entrega, .proximo, .download"
  );

  if ("IntersectionObserver" in window && !movimentoReduzido.matches) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    alvos.forEach((alvo, indice) => {
      alvo.classList.add("revelar");
      alvo.style.transitionDelay = `${(indice % 3) * 70}ms`;
      observador.observe(alvo);
    });
  }

  /* 4. Lightbox -------------------------------------------------------- */

  const dialogo = document.getElementById("lightbox");
  const quadros = Array.from(document.querySelectorAll("[data-cheia]"));

  if (!dialogo || quadros.length === 0) return;

  const imagem = dialogo.querySelector(".lightbox__imagem");
  const titulo = dialogo.querySelector(".lightbox__titulo");
  const legenda = dialogo.querySelector(".lightbox__legenda");
  const anterior = dialogo.querySelector('[data-acao="anterior"]');
  const proxima = dialogo.querySelector('[data-acao="proxima"]');
  const fechar = dialogo.querySelector('[data-acao="fechar"]');

  let atual = -1;
  let ultimoFoco = null;

  const mostrar = (indice) => {
    if (indice < 0 || indice >= quadros.length) return;
    const quadro = quadros[indice];
    const miniatura = quadro.querySelector("img");
    atual = indice;

    imagem.src = quadro.dataset.cheia;
    imagem.alt = miniatura ? miniatura.alt : "";
    titulo.textContent = quadro.dataset.titulo || "Tela do TaleCraft";
    legenda.textContent = quadro.dataset.legenda || "";
    anterior.disabled = indice === 0;
    proxima.disabled = indice === quadros.length - 1;
  };

  const abrir = (indice) => {
    if (typeof dialogo.showModal !== "function") {
      window.open(quadros[indice].dataset.cheia, "_blank", "noopener");
      return;
    }
    if (dialogo.open) return;
    ultimoFoco = document.activeElement;
    mostrar(indice);
    document.body.classList.add("sem-rolagem");
    dialogo.showModal();
    fechar.focus();
  };

  const encerrar = () => {
    if (dialogo.open) dialogo.close();
  };

  quadros.forEach((quadro, indice) => {
    quadro.addEventListener("click", () => abrir(indice));
  });

  anterior.addEventListener("click", () => mostrar(atual - 1));
  proxima.addEventListener("click", () => mostrar(atual + 1));
  fechar.addEventListener("click", encerrar);

  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) encerrar();
  });

  dialogo.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      mostrar(atual - 1);
    } else if (evento.key === "ArrowRight") {
      evento.preventDefault();
      mostrar(atual + 1);
    }
  });

  dialogo.addEventListener("close", () => {
    document.body.classList.remove("sem-rolagem");
    imagem.removeAttribute("src");
    imagem.alt = "";
    atual = -1;
    if (ultimoFoco && typeof ultimoFoco.focus === "function") ultimoFoco.focus();
  });
})();

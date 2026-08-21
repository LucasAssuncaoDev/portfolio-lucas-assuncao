// =========================
// GALERIA DOS PROJETOS
// =========================

const projetos = {
  "nails-pro": {
    titulo: "Nails Pro",

    imagens: [
      "assets/img-nails/Criação.png",
      "assets/img-nails/login.png",
      "assets/img-nails/Painel.png",
      "assets/img-nails/Horários.png",
      "assets/img-nails/Clientes.png",
      "assets/img-nails/Agenda.png",
      "assets/img-nails/Painel.png",
      "assets/img-nails/Financeiro.png",
      "assets/img-nails/Despesas.png",
      "assets/img-nails/Serviços.png",
    ]
  }
};


const modalGaleria =
  document.querySelector("#galeria-modal");

const imagemGaleria =
  document.querySelector("#galeria-imagem");

const tituloGaleria =
  document.querySelector("#galeria-titulo");

const contadorGaleria =
  document.querySelector("#galeria-contador");

const miniaturasGaleria =
  document.querySelector("#galeria-miniaturas");

const botaoFechar =
  document.querySelector("#galeria-fechar");

const botaoAnterior =
  document.querySelector("#galeria-anterior");

const botaoProximo =
  document.querySelector("#galeria-proxima");


let imagensAtuais = [];

let imagemAtual = 0;


/* ABRIR GALERIA */

document
  .querySelectorAll(".btn-galeria")
  .forEach((botao) => {

    botao.addEventListener("click", () => {

      const nomeProjeto =
        botao.dataset.projeto;

      const projeto =
        projetos[nomeProjeto];

      if (!projeto) return;

      imagensAtuais =
        projeto.imagens;

      imagemAtual = 0;

      tituloGaleria.textContent =
        projeto.titulo;

      criarMiniaturas();

      atualizarGaleria();

      modalGaleria.classList.add("ativo");

      document.body.style.overflow =
        "hidden";
    });

  });


/* ATUALIZAR IMAGEM */

function atualizarGaleria() {

  imagemGaleria.src =
    imagensAtuais[imagemAtual];

  contadorGaleria.textContent =
    `${imagemAtual + 1} / ${imagensAtuais.length}`;

  const miniaturas =
    document.querySelectorAll(
      ".galeria-miniaturas img"
    );

  miniaturas.forEach(
    (miniatura, index) => {

      miniatura.classList.toggle(
        "ativa",
        index === imagemAtual
      );

    }
  );

}


/* MINIATURAS */

function criarMiniaturas() {

  miniaturasGaleria.innerHTML = "";

  imagensAtuais.forEach(
    (imagem, index) => {

      const miniatura =
        document.createElement("img");

      miniatura.src = imagem;

      miniatura.alt =
        `Imagem ${index + 1}`;

      miniatura.addEventListener(
        "click",
        () => {

          imagemAtual = index;

          atualizarGaleria();

        }
      );

      miniaturasGaleria.appendChild(
        miniatura
      );

    }
  );

}


/* PRÓXIMA IMAGEM */

botaoProximo.addEventListener(
  "click",
  () => {

    imagemAtual++;

    if (
      imagemAtual >=
      imagensAtuais.length
    ) {
      imagemAtual = 0;
    }

    atualizarGaleria();

  }
);


/* IMAGEM ANTERIOR */

botaoAnterior.addEventListener(
  "click",
  () => {

    imagemAtual--;

    if (imagemAtual < 0) {
      imagemAtual =
        imagensAtuais.length - 1;
    }

    atualizarGaleria();

  }
);


/* FECHAR GALERIA */

function fecharGaleria() {

  modalGaleria.classList.remove(
    "ativo"
  );

  document.body.style.overflow =
    "";
}


botaoFechar.addEventListener(
  "click",
  fecharGaleria
);


/* CLICAR FORA */

document
  .querySelector(".galeria-overlay")
  .addEventListener(
    "click",
    fecharGaleria
  );


/* TECLADO */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      !modalGaleria.classList.contains(
        "ativo"
      )
    ) {
      return;
    }

    if (event.key === "Escape") {
      fecharGaleria();
    }

    if (event.key === "ArrowRight") {
      botaoProximo.click();
    }

    if (event.key === "ArrowLeft") {
      botaoAnterior.click();
    }

  }
);

// =========================
// ANIMAÇÃO AO ROLAR
// =========================

const elementosRevelar =
  document.querySelectorAll(".revelar");

const observador = new IntersectionObserver(
  (entradas) => {

    entradas.forEach((entrada) => {

      if (entrada.isIntersecting) {

        entrada.target.classList.add("ativo");

        observador.unobserve(entrada.target);

      }

    });

  },
  {
    threshold: 0.15
  }
);

elementosRevelar.forEach((elemento) => {
  observador.observe(elemento);
});

// =========================
// MENU ATIVO AO ROLAR
// =========================

const secoes = document.querySelectorAll("section[id]");
const linksMenu = document.querySelectorAll(".nav-links a");

function atualizarMenuAtivo() {

  let secaoAtual = "";

  secoes.forEach((secao) => {

    const topoSecao = secao.offsetTop;
    const alturaSecao = secao.offsetHeight;

    if (window.scrollY >= topoSecao - 200) {
      secaoAtual = secao.getAttribute("id");
    }

  });

  linksMenu.forEach((link) => {

    link.classList.remove("ativo");

    if (
      link.getAttribute("href") ===
      `#${secaoAtual}`
    ) {
      link.classList.add("ativo");
    }

  });

}

window.addEventListener(
  "scroll",
  atualizarMenuAtivo
);

atualizarMenuAtivo();
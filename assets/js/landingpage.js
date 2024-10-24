document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.querySelector(".overlay");
  const message = document.querySelector(".message");
  const giflanding = document.querySelector(".giflanding");
  const menu = document.querySelector(".navbar");
  const nextCircuit = document.querySelector(".nextcircuit");
  const race = document.querySelector(".race");
  const scrollButton = document.getElementById("scrollButton");
  const nextSection = document.getElementById("nextSection");
  const logo = document.querySelector(".logo");
  const cronometroElem = document.getElementById("cronometro");

  let claridade = false;
  let countdown; // Para armazenar o intervalo do cronômetro

  // Tempo inicial em segundos (5 dias)
  let remainingTime = 5 * 24 * 60 * 60; // 5 dias em segundos

  // Verifica se há um tempo salvo no localStorage
  const savedTime = localStorage.getItem("remainingTime");
  if (savedTime) {
    remainingTime = parseInt(savedTime, 10);
  }

  // Atualiza o cronômetro na tela
  function updateCronometro() {
    const dias = Math.floor(remainingTime / (24 * 60 * 60));
    const horas = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
    const minutos = Math.floor((remainingTime % (60 * 60)) / 60);
    const segundos = remainingTime % 60;

    cronometroElem.textContent = `${String(dias).padStart(2, "0")}:${String(
      horas
    ).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(
      segundos
    ).padStart(2, "0")}`;

    // Salva o tempo restante no localStorage
    localStorage.setItem("remainingTime", remainingTime);
  }

  // Inicia o cronômetro
  function startCronometro() {
    countdown = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateCronometro();
      } else {
        clearInterval(countdown);
        // Opcional: Remova o tempo do localStorage quando acabar
        localStorage.removeItem("remainingTime");
      }
    }, 1000);
  }

  // Função para abrir o modal
  function openModal() {
    document.getElementById("videoModal").style.display = "block";
  }

  // Função para fechar o modal
  function closeModal() {
    document.getElementById("videoModal").style.display = "none";
  }

  // Adiciona evento de clique ao card
  const eventCard = document.getElementById("eventCard");
  eventCard.addEventListener("click", function () {
    showCronometro(); // Chame essa função se necessário
    openModal(); // Abra o modal ao clicar no card
  });

  // Desativa o scroll inicial
  document.body.classList.add("noscroll");

  // Evento de clique na overlay
  overlay.addEventListener("click", function () {
    claridade = !claridade; // Mude o estado da clareza aqui

    if (claridade) {
      overlay.style.backgroundColor = "rgba(255, 255, 255, 0)";
      message.style.display = "none";
      giflanding.style.display = "none";
      overlay.style.cursor = "default";
      menu.style.display = "flex";
      scrollButton.style.display = "flex";
      logo.style.display = "none";

      if (nextCircuit) nextCircuit.classList.remove("hidden");
      if (race) race.classList.remove("hidden");

      document.body.classList.remove("noscroll");
      scrollButton.disabled = false;
    } else {
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      message.style.display = "block";
      giflanding.style.display = "block";
      overlay.style.cursor = "pointer";
      menu.style.display = "none";
      scrollButton.style.display = "none";
      logo.style.display = "flex";

      document.body.classList.add("noscroll");
      scrollButton.disabled = true;

      if (nextCircuit) nextCircuit.classList.add("hidden");
      if (race) race.classList.add("hidden");
    }
  });

  if (scrollButton) {
    scrollButton.addEventListener("click", function () {
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Atualiza e inicia o cronômetro
  updateCronometro();
  startCronometro();

  window.addEventListener("resize", function () {
    if (claridade) {
      document.body.classList.remove("noscroll");
    } else {
      document.body.classList.add("noscroll");
    }
  });
});

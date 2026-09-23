let selectedHeroId: string | null = null;

const heroCards = document.querySelectorAll<HTMLElement>(".hero-card");
const startButton = document.getElementById("startButton") as HTMLButtonElement;
const selectionMessage = document.getElementById("heroSelectionMessage") as HTMLElement;
const rulesButton = document.getElementById("rulesButton") as HTMLButtonElement;
const closeRulesButton = document.getElementById("closeRulesButton") as HTMLButtonElement;
const rulesModal = document.getElementById("rulesModal") as HTMLElement;

heroCards.forEach((card) => {
  card.addEventListener("click", () => {
    heroCards.forEach((heroCard) => {
      heroCard.classList.remove("selected");
    });

    card.classList.add("selected");
    selectedHeroId = card.dataset.hero ?? null;

    if (selectedHeroId) {
      const heroName = card.querySelector(".hero-name")?.textContent ?? "héroe";
      selectionMessage.textContent = `Héroe seleccionado: ${heroName}`;
      startButton.disabled = false;
    }
  });
});

startButton.addEventListener("click", () => {
  if (!selectedHeroId) {
    selectionMessage.textContent = "Selecciona un héroe para empezar";
    return;
  }

  localStorage.setItem("playerHeroId", selectedHeroId);
  window.location.href = "game.html";
});

const closeRules = document.getElementById("closeRules");

rulesButton?.addEventListener("click", () => {
  rulesModal?.classList.remove("hidden");
});

closeRules?.addEventListener("click", () => {
  rulesModal?.classList.add("hidden");
});

rulesModal?.addEventListener("click", (event) => {
  if (event.target === rulesModal) {
    rulesModal.classList.add("hidden");
  }
});
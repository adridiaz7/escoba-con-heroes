

let selectedHeroId: string | null = null;

const heroCards = document.querySelectorAll<HTMLElement>(".hero-card");
const startButton = document.getElementById("startButton") as HTMLButtonElement;
const selectionMessage = document.getElementById("heroSelectionMessage") as HTMLElement;

heroCards.forEach((card) => {
  card.addEventListener("click", () => {
    heroCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    
    startButton.addEventListener("click", () => {
    if (!selectedHeroId) return;

    localStorage.setItem("playerHeroId", selectedHeroId);
    window.location.href = "game.html";
    });

    selectedHeroId = card.dataset.hero ?? null;

    if (selectedHeroId) {
      selectionMessage.textContent = `Héroe seleccionado: ${card.querySelector(".hero-name")?.textContent}`;
      startButton.disabled = false;
    }
  });
  startButton.addEventListener("click", () => {
  if (!selectedHeroId) return;

  localStorage.setItem("playerHeroId", selectedHeroId);
  window.location.href = "game.html";
});
});

import { Game } from "./Game.js";
import { DomController } from "./DomController.js";
import { createHeroFromId, createRandomHero } from "./Hero.js";

const playerHeroId = localStorage.getItem("playerHeroId");

if (!playerHeroId) {
  window.location.href = "index.html";
}

let game = new Game();

if (playerHeroId) {
  const playerHero = createHeroFromId(playerHeroId);
  if (playerHero) {
    game.player.setHero(playerHero);
  }
}

const cpuHero = createRandomHero(playerHeroId ?? "");
game.cpuPlayer.setHero(cpuHero);

const domController = new DomController((cardId, selectedIds) => {
  const success = game.playerPlaysCard(cardId, selectedIds);

  if (!success) {
    domController.showMessage(game.lastError ?? "Jugada no válida.");
  }
  else{
    domController.showMessage("")
  }

  renderScreen();

  if (success) {
    window.setTimeout(() => {
      game.cpuPlaysTurn();
      renderScreen();
    }, 1200);
  }
});

const renderScreen = (): void => {
  domController.renderHand(game.player.getHand());
  domController.renderCpuHand(game.cpuPlayer.getHand());
  domController.renderTable(game.table.getCardsOnTable());
  domController.updateScores(game.player.getScore(), game.cpuPlayer.getScore());
  domController.updateTurn(game.isPlayerTurn ? "Jugador" : "CPU");
  domController.updateDeckCount(game.deck.getRemainingCards());
  domController.updatePileCounts(game.player.getWonCards().length, game.cpuPlayer.getWonCards().length);

  domController.updateHeroInfo(
  game.player.hero?.getName() ?? "Sin héroe",
  game.cpuPlayer.hero?.getName() ?? "Sin héroe"
);
};

const heroButton = document.getElementById("heroButton");

heroButton?.addEventListener("click", () => {
  const cardId = domController.getSelectedHandCardId();

  if (!cardId) {
    domController.showMessage("Selecciona primero una carta de tu mano.");
    return;
  }

  const success = game.playerUsesHeroAbility(cardId);

  if (!success) {
    domController.showMessage(game.lastError ?? "No se pudo usar la habilidad.");
  } else {
    domController.showMessage("¡Habilidad usada!");
    domController.clearSelectedHandCard(); // limpiamos la selección visual
  }

  renderScreen();
});

renderScreen();

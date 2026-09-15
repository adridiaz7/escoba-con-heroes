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
  const canSelectHandCard =
  game.player.hero?.getAbilityMoment() === "active" &&
  !game.player.hero?.isAbilityUsed() &&
  !game.isGameOver;

  domController.renderHand(game.player.getHand(), canSelectHandCard);
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

  const isActiveHero = game.player.hero?.getAbilityMoment() === "active";
  const abilityAvailable = isActiveHero && !game.player.hero?.isAbilityUsed();
  domController.updateHeroButton(isActiveHero, abilityAvailable);

  const playerHeroId = game.player.hero?.getId() ?? "";
  const cpuHeroId = game.cpuPlayer.hero?.getId() ?? "";
  domController.updateHeroImages(playerHeroId, cpuHeroId);
  if (game.isGameOver) {
    const playerScore = game.player.getScore();
    const cpuScore = game.cpuPlayer.getScore();

    domController.updateTurn("Fin de partida");
    domController.updateHeroButton(false, false);

    if (playerScore > cpuScore) {
      domController.showMessage(`Fin de la partida. Has ganado ${playerScore} - ${cpuScore}.`);
    } else if (cpuScore > playerScore) {
      domController.showMessage(`Fin de la partida. Ha ganado la CPU ${cpuScore} - ${playerScore}.`);
    } else {
      domController.showMessage(`Fin de la partida. Empate ${playerScore} - ${cpuScore}.`);
    }

    return;
  }
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

const restartButton = document.getElementById("restartButton");
restartButton?.addEventListener("click", () => {
  localStorage.removeItem("playerHeroId");
  window.location.href = "index.html";
});




renderScreen();

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
    renderScreen(); // muestra la carta de la CPU antes de resolver

    window.setTimeout(() => {
      game.resolveCpuTurn();
      renderScreen(); // muestra el resultado final
    }, 1000);
  }, 1200);
}
});

const getFinalScoreMessage = (): string => {
  const playerScore = game.player.getScore();
  const cpuScore = game.cpuPlayer.getScore();

  const playerCardCount = game.player.getWonCards().length;
  const cpuCardCount = game.cpuPlayer.getWonCards().length;

  const playerCardsPoint = playerCardCount > cpuCardCount ? 1 : 0;
  const cpuCardsPoint = cpuCardCount > playerCardCount ? 1 : 0;

  const playerGoldCount = game.player.getWonCardsBySuit("oros");
  const cpuGoldCount = game.cpuPlayer.getWonCardsBySuit("oros");

  const playerGoldPoint = playerGoldCount > cpuGoldCount ? 1 : 0;
  const cpuGoldPoint = cpuGoldCount > playerGoldCount ? 1 : 0;

  const playerSevenPoint = game.player.hasSevenOfGold() ? 1 : 0;
  const cpuSevenPoint = game.cpuPlayer.hasSevenOfGold() ? 1 : 0;

  const playerScopaPoints = game.player.getScopas();
  const cpuScopaPoints = game.cpuPlayer.getScopas();

  const playerNormalPoints =
    playerCardsPoint + playerGoldPoint + playerSevenPoint + playerScopaPoints;

  const cpuNormalPoints =
    cpuCardsPoint + cpuGoldPoint + cpuSevenPoint + cpuScopaPoints;

  const playerHeroPoints = Math.max(0, playerScore - playerNormalPoints);
  const cpuHeroPoints = Math.max(0, cpuScore - cpuNormalPoints);

  const formatPoints = (points: number): string => {
    return points === 1 ? "1 punto" : `${points} puntos`;
  };

  const formatSevenOfGold = (points: number): string => {
    return points === 1 ? "Sí (+1 punto)" : "No (+0 puntos)";
  };

 let resultMessage = "";

if (playerScore > cpuScore) {
  resultMessage = `🏆 Ganador: Jugador (${playerScore} - ${cpuScore})`;
} else if (cpuScore > playerScore) {
  resultMessage = `🏆 Ganador: CPU (${cpuScore} - ${playerScore})`;
} else {
  resultMessage = `🤝 Empate (${playerScore} - ${cpuScore})`;
}

return `🎉 FIN DE LA PARTIDA

${resultMessage}

DESGLOSE FINAL

🧑 JUGADOR
Cartas capturadas: ${playerCardCount} (${formatPoints(playerCardsPoint)})
Oros capturados: ${playerGoldCount} (${formatPoints(playerGoldPoint)})
Siete de oros: ${formatSevenOfGold(playerSevenPoint)}
Escobas: ${playerScopaPoints} (${formatPoints(playerScopaPoints)})
Bonificación de héroe: ${formatPoints(playerHeroPoints)}
TOTAL: ${formatPoints(playerScore)}

🤖 CPU
Cartas capturadas: ${cpuCardCount} (${formatPoints(cpuCardsPoint)})
Oros capturados: ${cpuGoldCount} (${formatPoints(cpuGoldPoint)})
Siete de oros: ${formatSevenOfGold(cpuSevenPoint)}
Escobas: ${cpuScopaPoints} (${formatPoints(cpuScopaPoints)})
Bonificación de héroe: ${formatPoints(cpuHeroPoints)}
TOTAL: ${formatPoints(cpuScore)}`;
};

const renderScreen = (): void => {
  const canSelectHandCard =
  game.player.hero?.getAbilityMoment() === "active" &&
  !game.player.hero?.isAbilityUsed() &&
  !game.isGameOver;

  domController.renderHand(game.player.getHand(), canSelectHandCard);
  domController.renderCpuHand(game.cpuPlayer.getHand());
  domController.renderTable(game.table.getCardsOnTable(), game.cpuPlayedCard);
  domController.updateScores(game.player.getScore(), game.cpuPlayer.getScore());
  domController.updateTurn(game.isPlayerTurn ? "Jugador" : "CPU");
  domController.updateDeckCount(game.deck.getRemainingCards());
  domController.updatePileCounts(game.player.getWonCards().length, game.cpuPlayer.getWonCards().length);
  domController.updateScopaCount(game.player.getScopas(),game.cpuPlayer.getScopas());
  
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
    domController.updateTurn("Fin de partida");
    domController.updateHeroButton(false, false);
    domController.showMessage(getFinalScoreMessage());
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


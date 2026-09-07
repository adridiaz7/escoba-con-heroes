import { Game } from "./Game.js";
import { DomController } from "./DomController.js";

let game = new Game();

const domController = new DomController((cardId, selectedIds) => {
  const success = game.playerPlaysCard(cardId, selectedIds);

  if (!success) {
    domController.showMessage(game.lastError ?? "Jugada no válida.");
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
};

renderScreen();

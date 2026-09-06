import { Game } from "./Game.js";
import { DomController } from "./DomController.js";

const game = new Game();
const domController = new DomController((cardId, selectedIds) => {
  console.log("Carta jugada:", cardId, "seleccionadas:", selectedIds);
});

domController.showMessage("Partida creada. Selecciona una carta para empezar a jugar.");
domController.updateTurn("Jugador");
domController.updateScores(0, 0);

console.log("Escoba con héroes iniciada");
console.log(game);
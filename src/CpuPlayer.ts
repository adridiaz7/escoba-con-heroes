import { Player } from "./Player.js";
import { Card } from "./Card.js";
import { Table } from "./Table.js";

export class CpuPlayer extends Player {

  constructor() {
    super("CPU");
  }

  chooseMove(table: Table): { card: Card; combination: Card[] } {
    let bestMove: { card: Card; combination: Card[] } | null = null;

    this.getHand().forEach((card) => {
      const combinations = table.findCombinationsThatSum15(card.getFigureValue());

      if (combinations.length === 0) {
        return;
      }

      let bestCombinationForThisCard: Card[] = combinations[0];

      combinations.forEach((combination) => {
        if (combination.length > bestCombinationForThisCard.length) {
          bestCombinationForThisCard = combination;
        }
      });

      if (!bestMove || bestCombinationForThisCard.length > bestMove.combination.length) {
        bestMove = { card, combination: bestCombinationForThisCard };
      }
    });

    if (bestMove) {
      return bestMove;
    }

    return { card: this.getHand()[0], combination: [] };
  }
}
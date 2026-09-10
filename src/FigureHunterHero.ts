import { Hero, HeroAbilityMoment } from "./Hero.js";
import { Player } from "./Player.js";

export class FigureHunterHero extends Hero {
  constructor() {
    super(
      "coleccionista",
      "Coleccionista",
      "Al final de la partida, si tiene 6 o más figuras capturadas, suma 2 puntos extra."
    );
  }

  getAbilityMoment(): HeroAbilityMoment {
    return "endGame";
  }

  onGameEnd(player: Player): void {
    if (player.getWonFigureCount() >= 6) {
      player.addScore(2);
    }
  }
}
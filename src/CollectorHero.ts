import { Hero, HeroAbilityMoment } from "./Hero.js";
import { Player } from "./Player.js";

export class CollectorHero extends Hero {
  constructor() {
    super(
      "recolectora",
      "Recolectora",
      "Si captura 3 o más cartas en una jugada, suma 1 punto extra."
    );
  }

  getAbilityMoment(): HeroAbilityMoment {
    return "onCapture";
  }

  onCardCaptured(capturedCount: number, player: Player): void {
     console.log("onCardCaptured llamado con:", capturedCount); // temporal
    if (capturedCount >= 3) {
      player.addScore(1);
    }
  }
}
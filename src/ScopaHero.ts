import { Hero, HeroAbilityMoment } from "./Hero.js";
import { Player } from "./Player.js";

export class ScopaHero extends Hero {
  constructor() {
    super(
      "escobero",
      "Escobero",
      "Cada vez que hace una escoba, suma 1 punto adicional."
    );
  }

  getAbilityMoment(): HeroAbilityMoment {
    return "onScopa";
  }

  onScopa(player: Player): void {
    player.addScore(1);
  }
}
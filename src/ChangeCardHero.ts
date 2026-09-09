import { Hero, HeroAbilityMoment } from "./Hero.js";

export class ChangeCardHero extends Hero {
  constructor() {
    super(
      "cambiacartas",
      "Cambiacartas",
      "Una vez por partida puede devolver una carta de la mano al mazo, barajar y robar otra."
    );
  }

  getAbilityMoment(): HeroAbilityMoment {
    return "active";
  }
}
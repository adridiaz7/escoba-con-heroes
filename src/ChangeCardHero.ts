import { Hero, HeroAbilityMoment } from "./Hero.js";
import { Player } from "./Player.js";
import { Deck } from "./Deck.js";

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

  useAbility(player: Player, deck: Deck, cardId: string): boolean {
    if (this.isAbilityUsed()) {
      return false;
    }

    const card = player.playCard(cardId);

    if (!card) {
      return false;
    }

    deck.returnCardToDeck(card);
    deck.shuffleDeckCards();
    player.receiveCards(deck.dealCards(1));

    this.markAbilityAsUsed();
    return true;
  }
}
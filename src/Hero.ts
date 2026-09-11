import { Player } from "./Player.js";
import { Deck } from "./Deck.js";

export type HeroId = "cambiacartas" | "recolectora" | "coleccionista" | "escobero";
export type HeroAbilityMoment = "active" | "onCapture" | "endGame" | "onScopa";

export abstract class Hero {
  protected id: HeroId;
  protected name: string;
  protected description: string;
  protected abilityUsed: boolean = false;

  constructor(id: HeroId, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  getId(): HeroId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  isAbilityUsed(): boolean {
    return this.abilityUsed;
  }

  markAbilityAsUsed(): void {
    this.abilityUsed = true;
  }

  resetAbility(): void {
    this.abilityUsed = false;
  }

  abstract getAbilityMoment(): HeroAbilityMoment;

  onCardCaptured(capturedCount: number, player: Player): void {}
  onScopa(player: Player): void {}
  onGameEnd(player: Player): void {}
}

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
    if (capturedCount >= 3) {
      player.addScore(1);
    }
  }
}

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

export function createHeroFromId(heroId: string): Hero | undefined {
  switch (heroId) {
    case "cambiacartas": return new ChangeCardHero();
    case "recolectora": return new CollectorHero();
    case "coleccionista": return new FigureHunterHero();
    case "escobero": return new ScopaHero();
    default: return undefined;
  }
}

export function createInitialHeroes(): Hero[] {
  return [
    new ChangeCardHero(),
    new CollectorHero(),
    new FigureHunterHero(),
    new ScopaHero()
  ];
}

export function createRandomHero(excludeHeroId: string): Hero {
  const allHeroes = createInitialHeroes();
  const available = allHeroes.filter((hero) => hero.getId() !== excludeHeroId);
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}
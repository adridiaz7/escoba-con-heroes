import { Player } from "./Player.js";

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


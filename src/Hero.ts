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
}

export function createInitialHeroes(): Hero[] {
    return [
        new ChangeCardHero(),
        new CollectorHero(),
        new FigureHunterHero(),
        new ScopaHero()
    ];
}

export function findHeroById(heroes: Hero[], heroId: string): Hero | undefined {
    return heroes.find((hero) => hero.getId() === heroId);
}
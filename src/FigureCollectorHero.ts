import { Hero, HeroAbilityMoment } from "./Hero.js";
import { Player } from "./Player.js";

export class FigureCollectorHero extends Hero {
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
        const wonCards = player.getWonCards();

        let totalFigures = 0;

        wonCards.forEach((card) => {
            if (card.value === 10 || card.value === 11 || card.value === 12) {
                totalFigures++;
            }
        });

        if (totalFigures >= 6) {
            player.addScore(2);
        }
    }
}
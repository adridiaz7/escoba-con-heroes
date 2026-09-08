import { Card } from "./Card.js";
import { Hero } from "./Hero.js";

export function isFigure(card: Card): boolean {
    return card.value === 10 || card.value === 11 || card.value === 12;
}

export function countFigures(cards: Card[]): number {
    let totalFigures = 0;

    cards.forEach((card) => {
        if (isFigure(card)) {
            totalFigures++;
        }
    });

    return totalFigures;
}

export function canUseChangeCardAbility(
    hero: Hero | undefined,
    handCards: Card[],
    remainingDeckCards: number
): boolean {
    if (!hero) {
        return false;
    }

    return (
        hero.getId() === "cambiacartas" &&
        !hero.isAbilityUsed() &&
        handCards.length > 0 &&
        remainingDeckCards > 0
    );
}

export function getCollectorBonusPoints(
    hero: Hero | undefined,
    capturedTableCards: Card[]
): number {
    if (!hero) {
        return 0;
    }

    if (hero.getId() === "recolectora" && capturedTableCards.length >= 3) {
        return 1;
    }

    return 0;
}

export function getScopaBonusPoints(
    hero: Hero | undefined,
    isScopa: boolean
): number {
    if (!hero) {
        return 0;
    }

    if (hero.getId() === "escobero" && isScopa) {
        return 1;
    }

    return 0;
}

export function getFigureHunterBonusPoints(
    hero: Hero | undefined,
    wonCards: Card[]
): number {
    if (!hero) {
        return 0;
    }

    const totalFigures = countFigures(wonCards);

    if (hero.getId() === "coleccionista" && totalFigures >= 6) {
        return 2;
    }

    return 0;
}

export function getCaptureBonusPoints(
    hero: Hero | undefined,
    capturedTableCards: Card[],
    isScopa: boolean
): number {
    const collectorBonus = getCollectorBonusPoints(hero, capturedTableCards);
    const scopaBonus = getScopaBonusPoints(hero, isScopa);

    return collectorBonus + scopaBonus;
}
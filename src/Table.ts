import { Card } from "./Card.js";

export class Table {

    #cardsOnTable: Card [] =[]

    addCardsOnTable(card: Card): void{
        this.#cardsOnTable.push(card)
    }

    removeCards(cardsToRemove: Card[]): void {
     cardsToRemove.forEach((cardToRemove) => {
        const cardToRemoveIndex = this.#cardsOnTable.findIndex((card) => card.getCardId() === cardToRemove.getCardId());

     if (cardToRemoveIndex !== -1) {
      this.#cardsOnTable.splice(cardToRemoveIndex, 1);
    }
     });
    }

    findCardById(cardId: string): Card | undefined {
        return this.#cardsOnTable.find((card) => card.getCardId() === cardId);
    }

    isTableEmpty(): boolean {
        return this.#cardsOnTable.length == 0;
    }

    findCombinationsThatSum15(playedCardPoints: number): Card[][] {
        const validCombinations: Card[][] = [];
        const totalCards = this.#cardsOnTable.length;
        const targetSum = 15 - playedCardPoints;

        for (let combinationMask = 1; combinationMask < 2 ** totalCards; combinationMask++) {
            const currentCombination: Card[] = [];
            let sum = 0;

            for (let cardPosition = 0; cardPosition < totalCards; cardPosition++) {
            const isIncluded = Math.floor(combinationMask / 2 ** cardPosition) % 2 === 1;

            if (isIncluded) {
                currentCombination.push(this.#cardsOnTable[cardPosition]);
                sum += this.#cardsOnTable[cardPosition].getFigureValue();
            }
            }

            if (sum === targetSum) {
            validCombinations.push(currentCombination);
            }
        }

        return validCombinations;
    }

}

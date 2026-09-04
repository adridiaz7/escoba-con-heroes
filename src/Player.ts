import { Card, Suit } from "./Card.js";

export class Player{
    name: string
    #hand: Card[] =[];
    #wonCards: Card[] = []
    #score: number = 0
    #scopas: number = 0

    constructor(name:string){
       this.name = name  
    }

    getHand(): Card[] {
        return this.#hand
    }

    playCard(cardId:string): Card | undefined{
        const index = this.#hand.findIndex((card) => card.getCardId() === cardId);

        if (index === -1){
            return undefined
        }
        return this.#hand.splice(index, 1)[0]
    }

    receiveCards(cards: Card[]): void {
        cards.forEach((card) =>{
            this.#hand.push(card);
        });
    }

    winCards(cards: Card[], isScopa: boolean): void {
        cards.forEach((card) =>{
            this.#wonCards.push(card);
        });
        if (isScopa) {
         this.#scopas ++;
        }
    }

    addScore(points:number): void{
        this.#score +=points
    }

    getWonCardsBySuit(suit: Suit): number {
        return this.#wonCards.filter((card) => card.suit === suit).length;
    }

    getScore():number{
        return this.#score
    }

    getWonCards():Card[]{
        return this.#wonCards
    }

    getScopas():number{
        return this.#scopas
    }

    hasSevenOfGold():boolean {
        return this.#wonCards.some((card)=> card.suit ==="oros" && card.value === 7);
    }

    hasCardsInHand(): boolean {
        return this.#hand.length > 0;
    }
}
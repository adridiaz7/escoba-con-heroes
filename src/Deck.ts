import { Card, Suit } from "./Card.js";

export class Deck {
    #deckCards: Card[] =[]

    constructor() {
       const suits:Suit[] = ["oros","copas","bastos", "espadas"]
       const values: number[] = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];

       suits.forEach((suit) => {
            values.forEach((value) => {
                this.#deckCards.push(new Card(suit,value));
         });
       });

    }

    shuffleDeckCards():void{
          let shuffledCards: Card[] = [];
        while (this.#deckCards.length > 0) {
            let position = Math.floor(Math.random() * this.#deckCards.length);
            let card = this.#deckCards.splice(position, 1)[0];
            shuffledCards.push(card);
        }
        this.#deckCards = shuffledCards;
    }

    dealCards(amount:number): Card[] {
        return this.#deckCards.splice(0, amount)
    }

    getRemainingCards():number{
        return this.#deckCards.length;
    }
}

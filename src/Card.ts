export type Suit = "oros" | "copas" | "bastos" | "espadas"

 export class Card {
    suit: Suit
    value:number

    constructor(suit: Suit, value: number){
        this.suit = suit 
        this.value = value
    }

    getFigureValue=(): number => {
        if (this.value == 10) return 8;
        if (this.value == 11) return 9;
        if (this.value == 12) return 10;
        return this.value;
    }

    getCardId = (): string => {
        return(`${this.value}-${this.suit}`)
    }
}
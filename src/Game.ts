import { Deck } from "./Deck.js";
import { Table } from "./Table.js";
import { Player } from "./Player.js";
import { CpuPlayer } from "./CpuPlayer.js";
import { Card } from "./Card.js";

export class Game {

    deck: Deck;
    table: Table;
    player: Player;
    cpuPlayer: CpuPlayer;
    isPlayerTurn: boolean = true;
    isGameOver: boolean = false;

    constructor () {
        this.deck = new Deck ();
        this.table = new Table ();
        this.player =new Player ("Tú");
        this.cpuPlayer = new CpuPlayer;
        
        this.deck.shuffleDeckCards();

        this.deck.dealCards(4).forEach((card) =>{
            this.table.addCardsOnTable(card);
        })

        this.player.receiveCards(this.deck.dealCards(3))
        this.cpuPlayer.receiveCards(this.deck.dealCards(3))
    }

    playerPlaysCard(cardId: string, selectedCardIds: string[]): boolean {
            if (!this.isPlayerTurn || this.isGameOver) {
            return false;
            }

            const playedCard = this.player.playCard(cardId);

        if (!playedCard) {
            return false;
            }

        const selectedCards = selectedCardIds
            .map((id) => this.table.findCardById(id))
            .filter((card): card is Card => card !== undefined);

        let selectedCardsSum = 0;

        selectedCards.forEach((card) => {
            selectedCardsSum += card.getFigureValue();
            });

        if (selectedCards.length > 0) {
            const totalSum = selectedCardsSum + playedCard.getFigureValue();

            if (totalSum !== 15) {
            this.player.receiveCards([playedCard]);
            return false;
            }

            this.table.removeCards(selectedCards);
            const isScopa = this.table.isTableEmpty();
            this.player.winCards([...selectedCards, playedCard], isScopa);
            } else {
            this.table.addCardsOnTable(playedCard);
            }

            this.isPlayerTurn = false;
            return true;
     }

    cpuPlaysTurn(): void {
        if (this.isPlayerTurn || this.isGameOver) {
        return;
        }

        const { card, combination } = this.cpuPlayer.chooseMove(this.table);
        const playedCard = this.cpuPlayer.playCard(card.getCardId());

        if (!playedCard) {
            return;
        }

        if (combination.length > 0) {
            this.table.removeCards(combination);
            const isScopa = this.table.isTableEmpty();
            this.cpuPlayer.winCards([...combination, playedCard], isScopa);
        } else {
            this.table.addCardsOnTable(playedCard);
        }

        this.isPlayerTurn = true;
    }

    checkRoundEnd(): void {
        const bothHandsEmpty =!this.player.hasCardsInHand() && !this.cpuPlayer.hasCardsInHand()

        if (!bothHandsEmpty)
            return;
        if (this.deck.getRemainingCards() > 0){
            this.player.receiveCards(this.deck.dealCards(3))
            this.cpuPlayer.receiveCards(this.deck.dealCards(3))
        }
        else{
            this.isGameOver = true;
        }

    }

    calculateFinalScore(): void {
        this.player.addScore(this.player.getScopas())
        this.cpuPlayer.addScore(this.cpuPlayer.getScopas())

        const playerCardCount = this.player.getWonCards().length;
        const cpuCardCount = this.cpuPlayer.getWonCards().length;

        if (playerCardCount > cpuCardCount){
            this.player.addScore(1)
        }
        else if (cpuCardCount > playerCardCount){
            this.cpuPlayer.addScore(1)
        }

        const playerGoldCount = this.player.getWonCardsBySuit("oros")
        const cpuGoldCount = this.cpuPlayer.getWonCardsBySuit("oros")

        if (playerGoldCount >cpuGoldCount){
            this.player.addScore(1)
        }
        else if (cpuGoldCount > playerGoldCount){
            this.cpuPlayer.addScore(1)
        }

    }


}
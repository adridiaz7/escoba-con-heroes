import { Deck } from "./Deck.js";
import { Table } from "./Table.js";
import { Player } from "./Player.js";
import { CpuPlayer } from "./CpuPlayer.js";
import { Card } from "./Card.js";
import { ChangeCardHero } from "./Hero.js";

export class Game {

    deck: Deck;
    table: Table;
    player: Player;
    cpuPlayer: CpuPlayer;
    isPlayerTurn: boolean = true;
    isGameOver: boolean = false;
    lastError: string | null = null;
    lastCapturingPlayer: Player | null = null;
    

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

            this.lastError ="No es tu turno";
            return false;
            }

            const playedCard = this.player.playCard(cardId);

        if (!playedCard) {
        
            this.lastError ="Esta carta no está en tu mano";
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
            this.lastError = `Esa combinación suma ${totalSum}, no 15.`;
            return false;
            }

            this.table.removeCards(selectedCards);
            const isScopa = this.table.isTableEmpty();
            this.player.winCards([...selectedCards, playedCard], isScopa);
            this.lastCapturingPlayer = this.player;
            this.player.hero?.onCardCaptured(selectedCards.length + 1, this.player);

            if (isScopa) {
            this.player.hero?.onScopa(this.player);
            }
            
            } else {
            this.table.addCardsOnTable(playedCard);
            }

            this.isPlayerTurn = false;
            this.lastError = null;
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
            this.lastCapturingPlayer = this.cpuPlayer;
            this.cpuPlayer.hero?.onCardCaptured(combination.length + 1, this.cpuPlayer);
            
            if (isScopa) {
            this.cpuPlayer.hero?.onScopa(this.cpuPlayer);
            }

        } else {
            this.table.addCardsOnTable(playedCard);
        }

        this.checkRoundEnd();
        this.isPlayerTurn = true;
    }

    playerUsesHeroAbility(cardId: string): boolean {
    if (!this.player.hero || this.player.hero.getAbilityMoment() !== "active") {
        this.lastError = "Tu héroe no tiene habilidad activa.";
        return false;
    }

    if (this.player.hero.isAbilityUsed()) {
        this.lastError = "Ya usaste tu habilidad esta partida.";
        return false;
    }


    this.lastError = null;
    return true;
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
            const remainingCards = this.table.getCardsOnTable();

            if (remainingCards.length > 0 && this.lastCapturingPlayer) {
                this.table.removeCards(remainingCards);
                this.lastCapturingPlayer.winCards(remainingCards, false);
            }

            this.player.hero?.onGameEnd(this.player);
            this.cpuPlayer.hero?.onGameEnd(this.cpuPlayer);

            this.isGameOver = true;
            this.calculateFinalScore();
        }
    }

    calculateFinalScore(): void {
        this.player.addScore(this.player.getScopas())
        this.cpuPlayer.addScore(this.cpuPlayer.getScopas())

        const playerCardCount = this.player.getWonCards().length;
        const cpuCardCount = this.cpuPlayer.getWonCards().length;

        if (playerCardCount > cpuCardCount){
            this.player.addScore(1);
        }
        else if (cpuCardCount > playerCardCount){
            this.cpuPlayer.addScore(1);
        }

        const playerGoldCount = this.player.getWonCardsBySuit("oros")
        const cpuGoldCount = this.cpuPlayer.getWonCardsBySuit("oros")

        if (playerGoldCount >cpuGoldCount){
            this.player.addScore(1);
        }
        else if (cpuGoldCount > playerGoldCount){
            this.cpuPlayer.addScore(1);
        }

        if (this.player.hasSevenOfGold()){
            this.player.addScore(1);
        } 
        else if (this.cpuPlayer.hasSevenOfGold()){
            this.cpuPlayer.addScore(1);
        }
    }
}

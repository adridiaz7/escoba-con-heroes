

import { Card } from "./Card.js";

export class DomController {
  private messageBox: HTMLElement | null;
  private turnInfo: HTMLElement | null;
  private playerScore: HTMLElement | null;
  private cpuScore: HTMLElement | null;
  private playerHandElement: HTMLElement | null;
  private cpuHandElement: HTMLElement | null;
  private tableElement: HTMLElement | null;
  private selectedTableCardIds: string[] = [];
  private onCardPlayed: (cardId: string, selectedIds: string[]) => void;

  constructor(onCardPlayed: (cardId: string, selectedIds: string[]) => void) {
    this.messageBox = document.querySelector("#messageBox");
    this.turnInfo = document.querySelector("#turnInfo");
    this.playerScore = document.querySelector("#playerScore");
    this.cpuScore = document.querySelector("#cpuScore");
    this.playerHandElement = document.querySelector("#playerHand");
    this.cpuHandElement = document.querySelector("#cpuHand");
    this.tableElement = document.querySelector("#tableCards");

    this.onCardPlayed = onCardPlayed;
  }

  showMessage(message: string): void {
    if (this.messageBox) {
      this.messageBox.textContent = message;
    }
  }

  updateTurn(turnText: string): void {
    if (this.turnInfo) {
      this.turnInfo.textContent = turnText;
    }
  }

  updateScores(playerPoints: number, cpuPoints: number): void {
    if (this.playerScore) {
      this.playerScore.textContent = playerPoints.toString();
    }
    if (this.cpuScore) {
      this.cpuScore.textContent = cpuPoints.toString();
    }
  }

  private createCardElement(card: Card, faceUp: boolean, draggable: boolean): HTMLElement {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.id = card.getCardId();

    const image = document.createElement("img");
    image.src = faceUp ? `img/${card.getCardId()}.png` : "img/back.png";
    cardElement.appendChild(image);

    if (draggable) {
      cardElement.setAttribute("draggable", "true");
      cardElement.addEventListener("dragstart", (event) => {
        event.dataTransfer?.setData("text/plain", cardElement.id);
      });
    }

    return cardElement;
  }

  private toggleTableCardSelection(cardElement: HTMLElement): void {
  const isAlreadySelected = this.selectedTableCardIds.includes(cardElement.id);

  if (isAlreadySelected) {
    this.selectedTableCardIds = this.selectedTableCardIds.filter((id) => id !== cardElement.id);
  } else {
    this.selectedTableCardIds.push(cardElement.id);
  }

  cardElement.classList.toggle("selected");
}

  renderHand(cards: Card[]): void {
    if (!this.playerHandElement) return;

    this.playerHandElement.innerHTML = "";

    cards.forEach((card) => {
      const cardElement = this.createCardElement(card, true, true);
      this.playerHandElement!.appendChild(cardElement);
    });
  }

  renderCpuHand (cards: Card[]): void {
    if (!this.cpuHandElement) return;

    this.cpuHandElement.innerHTML = "";

   cards.forEach((card) => {
      const cardElement = this.createCardElement(card, false, false);
      this.cpuHandElement!.appendChild(cardElement);
    });
  }
renderTable(cards: Card[]): void {
  if (!this.tableElement) return;

  this.tableElement.innerHTML = "";

  cards.forEach((card) => {
    const cardElement = this.createCardElement(card, true, false);

    if (this.selectedTableCardIds.includes(card.getCardId())) {
      cardElement.classList.add("selected");
    }

    cardElement.addEventListener("click", () => {
      this.toggleTableCardSelection(cardElement);
    });

    this.tableElement!.appendChild(cardElement);
  });
}
  // selección por click — pendiente
  // setupTableDropZone (drag & drop en la mesa) — pendiente
}
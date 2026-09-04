export class DomController {
    private messageBox: HTMLElement | null;
    private turnInfo: HTMLElement | null;
    private playerScore: HTMLElement | null;
    private cpuScore: HTMLElement | null;

    constructor() {
        this.messageBox = document.querySelector("#messageBox");
        this.turnInfo = document.querySelector("#turnInfo");
        this.playerScore = document.querySelector("#playerScore");
        this.cpuScore = document.querySelector("#cpuScore");
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
}
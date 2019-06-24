import { TurnPhase } from '../DomainTypes';

export class PieceLocation {
    id: string;
    pieceId: string;
    turnId: string;
    gameId: string;
    phase: TurnPhase;
    nameOfLocationAtBeginningOfPhase: string;
    nameOfLocationAtEndOfPhase: string | null;
    mustRetreatAtEndOfTurn: boolean;

    constructor(anId: string | null, aPieceId: string, aTurnId: string, aGameId: string, aPhase: TurnPhase,
                aNameOfLocationAtBeginningOfPhase: string, aNameOfLocationAtEndOfPhase: string | null, 
                retreatAtEndOfTurn: boolean) {
        if (anId) {
            this.id = anId;
        }
        this.pieceId = aPieceId;
        this.gameId = aGameId;
        this.turnId = aTurnId;
        this.phase = aPhase;
        this.nameOfLocationAtBeginningOfPhase = aNameOfLocationAtBeginningOfPhase;
        this.nameOfLocationAtEndOfPhase = aNameOfLocationAtEndOfPhase;
        this.mustRetreatAtEndOfTurn = retreatAtEndOfTurn;
    }
}

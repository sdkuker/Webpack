import { PieceTypes } from '../DomainTypes';

export class Piece {
    id: string;
    owningCountryName: string;
    type: PieceTypes;
    nameOfLocationAtBeginningOfTurn: string;
    nameOfLocationAtEndOfTurn: string | null;
    mustRetreatAtEndOfTurn: boolean;
    turnId: string;
    gameId: string;

    constructor(anId: string | null, aGameId: string, aTurnId: string, anOwningCountryName: string, 
                aNameOfLocationAtBeginningOfTurn: string, aNameOfLocationAtEndOfTurn: string | null, 
                retreatAtEndOfTurn: boolean, aType: PieceTypes) {
        if (anId) {
            this.id = anId;
        }
        this.gameId = aGameId;
        this.turnId = aTurnId;
        this.owningCountryName = anOwningCountryName;
        this.nameOfLocationAtBeginningOfTurn = aNameOfLocationAtBeginningOfTurn;
        this.nameOfLocationAtEndOfTurn = aNameOfLocationAtEndOfTurn;
        this.mustRetreatAtEndOfTurn = retreatAtEndOfTurn;
        this.type = aType;
    }
}

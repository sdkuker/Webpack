import { PieceTypes } from '../DomainTypes';

export class Piece {
    id: string;
    owningCountryName: string;
    type: PieceTypes;
    nameOfLocationAtBeginningOfTurn: string;
    nameOfLocationAtEndOfTurn: string;
    mustRetreatAtEndOfTurn: boolean;
    turnId: string;
    gameId: string;

    constructor(anId: string | null, aGameId: string, aTurnId: string, anOwningCountryName: string, 
                nameOfLocationAtStartOfTurn: string, aType: PieceTypes) {
        if (anId) {
            this.id = anId;
        }
        this.gameId = aGameId;
        this.turnId = aTurnId;
        this.owningCountryName = anOwningCountryName;
        this.nameOfLocationAtBeginningOfTurn = nameOfLocationAtStartOfTurn;
        this.type = aType;
    }
}

import { PieceTypes } from '../DomainTypes';
import { PieceLocation } from '../piece/PieceLocation';
export class Piece {
    id: string;
    owningCountryName: string;
    type: PieceTypes;
    gameId: string;
    pieceLocation: PieceLocation;

    constructor(anId: string | null, aGameId: string,  anOwningCountryName: string, 
                aType: PieceTypes, aPieceLocation: PieceLocation) {
        if (anId) {
            this.id = anId;
        }
        this.gameId = aGameId;
        this.owningCountryName = anOwningCountryName;
        this.type = aType;
        this.pieceLocation = aPieceLocation;
    }
}

import { Turn } from '../turn/Turn';
import { Game } from '../game/Game';
import { IPieceWarehouse } from './IPieceWarehouse';
import { IPieceDataProvider } from './IPieceDataProvider';
import { Location } from '../location/Location';

export class PieceWarehouse implements IPieceWarehouse {

    dataProvider: IPieceDataProvider;

    constructor(myDataProvider: IPieceDataProvider) {
        this.dataProvider = myDataProvider;
    }

    getPieces = (forTurn: Turn) => {
        return this.dataProvider.getPieces(forTurn);
    }

    createPiece = ( forGame: Game, forTurn: Turn, theLocation: Location,
                    theLocationName: string, countryName: string, type: string) => {
        return this.dataProvider.createPiece(forGame, forTurn, theLocation, theLocationName, countryName, type);
    }

    deletePieces = (forTurn: Turn) => {

        let allPiecesDeleted = true;
        let thisPieceDeleted = true;
        let thePieces = this.dataProvider.getPieces(forTurn);
        let index = thePieces.length;
        while (index--) {
            thisPieceDeleted = this.dataProvider.deletePiece(thePieces[index]);
            if (! thisPieceDeleted) {
                allPiecesDeleted = false;
            }
        }
        return allPiecesDeleted;
    }
}

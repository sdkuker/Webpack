import { Turn } from './Turn';
import { Game } from './Game';
import { IPieceWarehouse } from './IPieceWarehouse';
import { IPieceDataProvider } from './IPieceDataProvider';
import { Location } from './Location';

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
        console.log('nbr to delete: ' + index);
        while (index--) {
            console.log('index being deleted: ' + index);
            console.log('piece turn id: ' + thePieces[index].turn.id + ' game id: ' + thePieces[index].turn.game.id);
            thisPieceDeleted = this.dataProvider.deletePiece(thePieces[index]);
            if (! thisPieceDeleted) {
                allPiecesDeleted = false;
            }
        }
        return allPiecesDeleted;
    }
}

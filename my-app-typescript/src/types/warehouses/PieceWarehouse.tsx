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
}

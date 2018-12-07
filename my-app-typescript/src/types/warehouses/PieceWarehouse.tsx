import { Turn } from './Turn';
import { IPieceWarehouse } from './IPieceWarehouse';
import { IPieceDataProvider } from './IPieceDataProvider';

export class PieceWarehouse implements IPieceWarehouse {

    dataProvider: IPieceDataProvider;

    constructor(myDataProvider: IPieceDataProvider) {
        this.dataProvider = myDataProvider;
    }

    getPieces = (forTurn: Turn) => {
        return this.dataProvider.getPieces(forTurn);
    }
}

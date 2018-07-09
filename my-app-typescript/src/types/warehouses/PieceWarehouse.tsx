import { Piece } from './Piece';
import { observable } from 'mobx';
import { IPieceWarehouse } from './IPieceWarehouse';
import { IPieceDataProvider } from './IPieceDataProvider';

export class PieceWarehouse implements IPieceWarehouse {

    @observable pieces: Map<String, Piece>;

    constructor(dataProvider: IPieceDataProvider) {
        this.pieces = dataProvider.getPieces();
    }

    getPieces = () => {
        return this.pieces;
    }
}

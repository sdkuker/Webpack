import { Move } from './Move';
import { Turn } from './Turn';
import { Piece } from './Piece';
import { IMoveDataProvider } from './IMoveDataProvider';
import { IMoveWarehouse } from './IMoveWarehouse';
import { action } from 'mobx';

export class MoveWarehouse implements IMoveWarehouse {

    nonPersistentMoveOrder: string = 'New Move Order';
    dataProvider: IMoveDataProvider;

    constructor(myDataProvider: IMoveDataProvider) {
        this.dataProvider = myDataProvider;
    }

    @action
    deleteMove = (aMove: Move) => {
        this.dataProvider.deleteMove(aMove);
    }
    @action
    persistMove = (aMove: Move) => {
        this.dataProvider.persistMove(aMove, this.nonPersistentMoveOrder);
    }

    createNonPersistentMove = (aCountryName: string, aTurn: Turn) => {
        return this.dataProvider.createNonPersistentMove(aCountryName, aTurn, this.nonPersistentMoveOrder);
    }

    getMoves = (countryName: string, aTurn: Turn, includeNonPersistentMove: boolean | null) => {

        const theReturn = Array<Move>();
        let index: number;
        let theMoves = this.dataProvider.getMoves(aTurn);
        for (index = 0; index < theMoves.length; index++) {
            if (theMoves[index].owningCountryName === countryName &&
                theMoves[index].turn === aTurn) {
                theReturn.push(theMoves[index]);
            }
        }
        if (includeNonPersistentMove) {
            theReturn.push(this.createNonPersistentMove(countryName, aTurn));
        }

        return theReturn;
    }

    createInitialMoves = (aTurn: Turn, pieces: Array<Piece>) => {

        const theReturn = Array<Move>();

        pieces.forEach((aPiece: Piece, anIndex: number) => {
            let moveOrder = aPiece.type + ' ' + aPiece.owningCountryName + ' Holds';
            let aMove = new Move(null, moveOrder, aPiece.owningCountryName, aTurn);
            this.persistMove(aMove);
            theReturn.push(aMove);
        });

        return theReturn;

    }

}
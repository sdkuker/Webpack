import { Move } from './Move';
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
        return this.dataProvider.deleteMove(aMove);
    }

    deleteMoves = (aTurnId: string, aGameId: string) => {

        let allMovesDeleted = true;
        let thisMoveDeleted = true;
        let theMoves = this.dataProvider.getMoves(aTurnId, aGameId);
        let index = theMoves.length;
        while (index--) {
            thisMoveDeleted = this.deleteMove(theMoves[index]);
            if (! thisMoveDeleted) {
                allMovesDeleted = false;
            }
        }
        return allMovesDeleted;
    }
    
    @action
    persistMove = (aMove: Move) => {
        this.dataProvider.persistMove(aMove, this.nonPersistentMoveOrder);
    }

    createNonPersistentMove = (aCountryName: string, aTurnId: string, aGameId: string) => {
        return this.dataProvider.createNonPersistentMove(aCountryName, aTurnId, aGameId, this.nonPersistentMoveOrder);
    }

    getMoves = (countryName: string, aTurnId: string, aGameId: string, includeNonPersistentMove: boolean | null) => {

        const theReturn = Array<Move>();
        let index: number;
        let theMoves = this.dataProvider.getMoves(aTurnId, aGameId);
        for (index = 0; index < theMoves.length; index++) {
            if (theMoves[index].owningCountryName === countryName &&
                theMoves[index].turnId === aTurnId) {
                theReturn.push(theMoves[index]);
            }
        }
        if (includeNonPersistentMove) {
            theReturn.push(this.createNonPersistentMove(countryName, aTurnId, aGameId));
        }

        return theReturn;
    }

    createInitialMoves = (aTurnId: string, aGameId: string, pieces: Array<Piece>) => {

        const theReturn = Array<Move>();

        pieces.forEach((aPiece: Piece, anIndex: number) => {
            let moveOrder = aPiece.type + ' ' + aPiece.locationName + ' Holds';
            let aMove = new Move(null, moveOrder, aPiece.owningCountryName, aTurnId, aGameId);
            this.persistMove(aMove);
            theReturn.push(aMove);
        });

        return theReturn;

    }

}
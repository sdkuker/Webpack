import { Move } from './Move';
import { Turn } from './Turn';
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

    getMoves = (countryName: string, aTurn: Turn | null, includeNonPersistentMove: boolean | null) => {

        const theReturn = Array<Move>();

        if (aTurn) {
            let index: number;
            for (index = 0; index < this.dataProvider.getMoves().length; index++) {
                if (this.dataProvider.getMoves()[index].owningCountryName === countryName &&
                    this.dataProvider.getMoves()[index].turn === aTurn) {
                    theReturn.push(this.dataProvider.getMoves()[index]);
                }
            }
            if (includeNonPersistentMove) {
                theReturn.push(this.createNonPersistentMove(countryName, aTurn));
            }
        }

        return theReturn;
    }

    getAllMoves = () => {
        return this.dataProvider.getMoves();
    }
}
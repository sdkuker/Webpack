import { Move } from './Move';
import { Turn } from './Turn';
import { IMoveDataProvider } from './IMoveDataProvider';
import { IMoveWarehouse } from './IMoveWarehouse';
import { Game } from './Game';
import { action } from 'mobx';

export class MoveWarehouse implements IMoveWarehouse {

    nonPersistentMoveOrder: string = 'New Move Order';
    dataProvider: IMoveDataProvider;

    constructor(myDataProvider: IMoveDataProvider) {
        this.dataProvider = myDataProvider;
    }

    @action
    deleteMove = (forGame: Game, aMove: Move) => {
        this.dataProvider.deleteMove(forGame, aMove);
    }
    @action
    persistMove = (forGame: Game, aMove: Move) => {
        this.dataProvider.persistMove(forGame, aMove, this.nonPersistentMoveOrder);
    }

    createNonPersistentMove = (forGame: Game, aCountryName: string, aTurn: Turn) => {
        return this.dataProvider.createNonPersistentMove(forGame, aCountryName, aTurn, this.nonPersistentMoveOrder);
    }

    getMoves = (forGame: Game, countryName: string, aTurn: Turn | null, includeNonPersistentMove: boolean | null) => {

        const theReturn = Array<Move>();

        if (aTurn) {
            let index: number;
            for (index = 0; index < this.dataProvider.getMoves(forGame).length; index++) {
                if (this.dataProvider.getMoves(forGame)[index].owningCountryName === countryName &&
                    this.dataProvider.getMoves(forGame)[index].turn === aTurn) {
                    theReturn.push(this.dataProvider.getMoves(forGame)[index]);
                }
            }
            if (includeNonPersistentMove) {
                theReturn.push(this.createNonPersistentMove(forGame, countryName, aTurn));
            }
        }

        return theReturn;
    }

    getAllMoves = (forGame: Game) => {
        return this.dataProvider.getMoves(forGame);
    }
}
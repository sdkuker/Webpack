import { Move } from './Move';
import { Turn } from './Turn';
import { warehouse as TurnWarehouse } from './TurnWarehouse';
import { warehouse as GameWarehouse } from './GameWarehouse';
import { SeasonTypes, TurnStatus } from './DomainTypes';
import { observable, action } from 'mobx';
import { IMoveWarehouse } from './IMoveWarehouse';

class MoveWarehouse implements IMoveWarehouse {

    @observable moves: Array<Move>;
    // nonPersistantMoveKey: number = 999999;
    nonPersistentMoveOrder: string = 'New Move Order';
    nextAvailableMoveKey: number = 1;

    constructor() {
        this.initializeMoves();
    }

    @action
    persistMove = (aMove: Move) => {

        if (aMove.order !== this.nonPersistentMoveOrder) {
            if (aMove.id === (this.nextAvailableMoveKey - 1) ) {
                this.moves.push(aMove);
            }
        }
    }

    createNonPersistentMove = (aCountryName: string, aTurn: Turn) => {
        return new Move(this.nextAvailableMoveKey++, this.nonPersistentMoveOrder, aCountryName, aTurn);
    }

    initializeMoves = () => {

        let myGame = GameWarehouse.games[0];
        let turn1Spring = TurnWarehouse.getTurn(myGame, 1, SeasonTypes.Spring);
        let turn1Fall = TurnWarehouse.getTurn(myGame, 1, SeasonTypes.Fall);

        const myMoves = Array<Move>();

        if (turn1Spring && turn1Fall) {
            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Fleet London movesTo North_Sea', 'England', turn1Spring));
            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Army Liverpool movesTo Yorkshire', 'England', turn1Spring));

            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Army Paris movesTo Picardy', 'France', turn1Spring));
            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Army Marseilles movesTo Gascony', 'France', turn1Spring));

            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Fleet North_Sea movesTo Norway', 'England', turn1Fall));
            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Army Yorkshire movesTo Wales', 'England', turn1Fall));

            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Army Picardy movesTo Belguim', 'France', turn1Fall));
            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Army Gascony movesTo Spain_(sc)', 'France', turn1Fall));

        }

        this.moves = myMoves;
    }

    getMoves = (countryName: string, aTurn: Turn | null, includeNonPersistentMove: boolean | null) => {

        const theReturn = Array<Move>();

        if (aTurn) {
            let index: number;
            for (index = 0; index < this.moves.length; index++) {
                if (this.moves[index].owningCountryName === countryName &&
                    this.moves[index].turn === aTurn) {
                    theReturn.push(this.moves[index]);
                }
            }
            if (includeNonPersistentMove) {
                theReturn.push(this.createNonPersistentMove(countryName, aTurn));
            }
        }

        return theReturn;
    }

    getAllMoves = () => {
        return this.moves;
    }

    // this should only be used for testing
    setMoves = (bunchOfMoves: Array<Move>) => {
        this.moves = bunchOfMoves;
    }
}

export const warehouse = new MoveWarehouse();
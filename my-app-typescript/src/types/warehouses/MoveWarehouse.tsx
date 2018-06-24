import { Move } from './Move';
import { Turn } from './Turn';
import { warehouse as TurnWarehouse } from './TurnWarehouse';
import { warehouse as GameWarehouse } from './GameWarehouse';
import { SeasonTypes, TurnStatus } from './DomainTypes';
import { observable, action } from 'mobx';
import { IMoveWarehouse } from './IMoveWarehouse';

class MoveWarehouse implements IMoveWarehouse {

    @observable moves: Array<Move>;
    nonPersistantMoveKey: number = 999999;

    constructor() {
        this.initializeMoves();
    }

    @action
    persistMove = (aMove: Move) => {

    }

    createNonPersistentMove = (aCountryName: string, aTurn: Turn) => {
        return new Move(this.nonPersistantMoveKey, 'New Move Order', aCountryName, aTurn);
    }

    initializeMoves = () => {

        let myGame = GameWarehouse.games[0];
        let turn1Spring = TurnWarehouse.getTurn(myGame, 1, SeasonTypes.Spring);
        let turn1Fall = TurnWarehouse.getTurn(myGame, 1, SeasonTypes.Fall);

        const myMoves = Array<Move>();

        if (turn1Spring && turn1Fall) {
            myMoves.push(new Move(1, 'Fleet London movesTo North_Sea', 'England', turn1Spring));
            myMoves.push(new Move(2, 'Army Liverpool movesTo Yorkshire', 'England', turn1Spring));

            myMoves.push(new Move(3, 'Army Paris movesTo Picardy', 'France', turn1Spring));
            myMoves.push(new Move(4, 'Army Marseilles movesTo Gascony', 'France', turn1Spring));

            myMoves.push(new Move(5, 'Fleet North_Sea movesTo Norway', 'England', turn1Fall));
            myMoves.push(new Move(6, 'Army Yorkshire movesTo Wales', 'England', turn1Fall));

            myMoves.push(new Move(7, 'Army Picardy movesTo Belguim', 'France', turn1Fall));
            myMoves.push(new Move(8, 'Army Gascony movesTo Spain_(sc)', 'France', turn1Fall));

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
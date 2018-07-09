import { IMoveDataProvider } from './IMoveDataProvider';
import { GameWarehouse} from './GameWarehouse';
import { TurnWarehouse} from './TurnWarehouse';
import { SeasonTypes } from './DomainTypes';
import { Move } from './Move';
import { Turn } from './Turn';
import { observable, action } from 'mobx';

export class StaticMoveDataProvider implements IMoveDataProvider {

    @observable moves: Array<Move>;
    nextAvailableMoveKey: number = 1;

    constructor(myMoves: Array<Move> | null, myGameWarehouse: GameWarehouse | null, myTurnWarehouse: TurnWarehouse | null) {
        if (myMoves) {
            this.moves = myMoves;
        } else {
            if (myGameWarehouse && myTurnWarehouse) {
                this.initializeMoves(myGameWarehouse, myTurnWarehouse);
            }
        }
    }

    getMoves = () => {
        return this.moves;
    }

    initializeMoves = (myGameWarehouse: GameWarehouse, myTurnWarehouse: TurnWarehouse) => {

        let myGame = myGameWarehouse.games[0];
        let turn1Spring = myTurnWarehouse.getTurn(myGame, 1, SeasonTypes.Spring);
        let turn1Fall = myTurnWarehouse.getTurn(myGame, 1, SeasonTypes.Fall);

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

    @action
    deleteMove = (aMove: Move) => {
        let i: number;
        for (i = 0; i < this.moves.length; i++) {
            if (this.moves[i].id === aMove.id) {
                this.moves.splice(i, 1);
            }
        }
    }
    @action
    persistMove = (aMove: Move, aNonPersistentMoveOrder: string) => {
        if (aMove.order !== aNonPersistentMoveOrder) {
            if (aMove.id === (this.nextAvailableMoveKey - 1) ) {
                this.moves.push(aMove);
            }
        }
    }

    @action
    createNonPersistentMove = (aCountryName: string, aTurn: Turn, aNonPersistentMoveOrder: string) => {
        return new Move(this.nextAvailableMoveKey++, aNonPersistentMoveOrder, aCountryName, aTurn);
    }


}
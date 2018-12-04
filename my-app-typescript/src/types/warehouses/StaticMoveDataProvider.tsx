import { IMoveDataProvider } from './IMoveDataProvider';
import { Move } from './Move';
import { Turn } from './Turn';
import { observable, action } from 'mobx';

export class StaticMoveDataProvider implements IMoveDataProvider {

    // contains the moves for a single turn.  
    @observable moves: Array<Move>;
    movesTurnId: string;
    nextAvailableMoveKey: number = 1;
    allMovesForGame: { [turnId: string]: Array<Move> } = {};

    constructor(myMoves: Array<Move> | null) {
        if ( myMoves && myMoves.length > 0 ) {
            this.allMovesForGame[myMoves[0].id] = myMoves;
            this.movesTurnId = myMoves[0].id;
            this.moves = myMoves;
        } 
    }

    getMoves = (forTurn: Turn) => {

        this.adjustCacheForTurnId(forTurn.id);

        return this.moves;
    }

    adjustCacheForTurnId = (aTurnId: string) => {

        if ( aTurnId ! === this.movesTurnId ) {
            if (this.allMovesForGame[aTurnId]) {
                this.moves = this.allMovesForGame[aTurnId];
                this.movesTurnId = aTurnId;
            }
        } 
    }

    @action
    deleteMove = (aMove: Move) => {

        this.adjustCacheForTurnId(aMove.turn.id);

        let i: number;
        for (i = 0; i < this.moves.length; i++) {
            if (this.moves[i].id === aMove.id) {
                this.moves.splice(i, 1);
            }
        }
    }
    @action
    persistMove = (aMove: Move, aNonPersistentMoveOrder: string) => {

        this.adjustCacheForTurnId(aMove.turn.id);

        if (aMove.order !== aNonPersistentMoveOrder) {
            this.moves.push(aMove);
        }
    }

    @action
    createNonPersistentMove = (aCountryName: string, aTurn: Turn, aNonPersistentMoveOrder: string) => {

        return new Move(aTurn.id + this.nextAvailableMoveKey++, aNonPersistentMoveOrder, aCountryName, aTurn);
    }
}
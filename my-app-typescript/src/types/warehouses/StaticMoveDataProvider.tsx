import { IMoveDataProvider } from './IMoveDataProvider';
import { Move } from './Move';
import { Turn } from './Turn';
import { observable, action } from 'mobx';

export class StaticMoveDataProvider implements IMoveDataProvider {

    // contains the moves for a single turn for a chosen game.  
    @observable moves: Array<Move>;
    movesTurnId: string = 'initialValue';
    nextAvailableMoveKey: number = 1;
    // the key to the outer map is the game id.  The key to the inner map is the turn id
    allMoves: Map<string, Map<string, Array<Move>>> = new Map();

    getMoves = (forTurn: Turn) => {

        this.adjustCacheForTurn(forTurn);

        return this.moves;
    }

    adjustCacheForTurn = (aTurn: Turn) => {

        if (aTurn.id !== this.movesTurnId) {
            if (this.allMoves.get(aTurn.game.id)) {  // have a map for the turn
                // @ts-ignore
                if (!this.allMoves.get(aTurn.game.id).get(aTurn.id)) { // no moves for the turn
                    // @ts-ignore
                    this.allMoves.get(aTurn.game.id).set(aTurn.id, new Array<Move>());
                }
            } else {  // no map for the game - add an empty map
                this.allMoves.set(aTurn.game.id, new Map<string, Array<Move>>());
                // also add an array for this turn
                // @ts-ignore
                this.allMoves.get(aTurn.game.id).set(aTurn.id, new Array<Move>());
            }

            // @ts-ignore
            this.moves = this.allMoves.get(aTurn.game.id).get(aTurn.id);
            this.movesTurnId = aTurn.id;
        }
    }

    @action
    deleteMove = (aMove: Move) => {

        this.adjustCacheForTurn(aMove.turn);

        let i: number;
        for (i = 0; i < this.moves.length; i++) {
            if (this.moves[i].id === aMove.id) {
                this.moves.splice(i, 1);
            }
        }
    }
    @action
    persistMove = (aMove: Move, aNonPersistentMoveOrder: string | null) => {

        this.adjustCacheForTurn(aMove.turn);

        if (aMove.order !== aNonPersistentMoveOrder) {
            if (!aMove.id) {
                this.nextAvailableMoveKey++ 
                aMove.id = this.nextAvailableMoveKey.toString();
            }
            // it seems tht you have to push the move in both arrarys.  putting it in this.moves w/o the other doesn't
            // seem to get it in this.allMoves.  Kinda surprising actually.
            // @ts-ignore
            this.allMoves.get(aMove.turn.game.id).get(aMove.turn.id).push(aMove);
            this.moves.push(aMove);
        }
    }

    @action
    createNonPersistentMove = (aCountryName: string, aTurn: Turn, aNonPersistentMoveOrder: string) => {

        return new Move(aTurn.id + this.nextAvailableMoveKey++, aNonPersistentMoveOrder, aCountryName, aTurn);
    }
}
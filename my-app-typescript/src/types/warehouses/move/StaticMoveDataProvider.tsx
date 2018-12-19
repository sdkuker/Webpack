import { IMoveDataProvider } from './IMoveDataProvider';
import { Move } from './Move';
import { observable, action } from 'mobx';

export class StaticMoveDataProvider implements IMoveDataProvider {

    // contains the moves for a single turn for a chosen game.  
    @observable moves: Array<Move>;
    movesTurnId: string = 'initialValue';
    nextAvailableMoveKey: number = 0;
    // the key to the outer map is the game id.  The key to the inner map is the turn id
    allMoves: Map<string, Map<string, Array<Move>>> = new Map();

    getMoves = (forTurnId: string, forGameId: string) => {

        this.adjustCacheForTurn(forTurnId, forGameId);

        return this.moves;
    }

    adjustCacheForTurn = (aTurnId: string, aGameId: string) => {

        if (aTurnId !== this.movesTurnId) {
            if (this.allMoves.get(aGameId)) {  // have a map for the turn
                // @ts-ignore
                if (!this.allMoves.get(aGameId).get(aTurnId)) { // no moves for the turn
                    // @ts-ignore
                    this.allMoves.get(aGameId).set(aTurnId, new Array<Move>());
                }
            } else {  // no map for the game - add an empty map
                this.allMoves.set(aGameId, new Map<string, Array<Move>>());
                // also add an array for this turn
                // @ts-ignore
                this.allMoves.get(aGameId).set(aTurnId, new Array<Move>());
            }

            // @ts-ignore
            this.moves = this.allMoves.get(aGameId).get(aTurnId);
            this.movesTurnId = aTurnId;
        }
    }

    @action
    deleteMove = (aMove: Move) => {

        let moveDeleted = false;
        this.adjustCacheForTurn(aMove.turnId, aMove.gameId);

        let i: number;
        for (i = 0; i < this.moves.length; i++) {
            if (this.moves[i].id === aMove.id) {
                // @ts-ignore
                // this assumes the indices are the same in both arrays.  They should be...
                this.allMoves.get(aMove.gameId).get(aMove.turnId).splice(i, 1);
                this.moves.splice(i, 1);
                moveDeleted = true;
            }
        }

        return moveDeleted;
    }
    
    @action
    persistMove = (aMove: Move, aNonPersistentMoveOrder: string | null) => {

        this.adjustCacheForTurn(aMove.turnId, aMove.gameId);

        if (aMove.order !== aNonPersistentMoveOrder) {
            if (!aMove.id) {
                this.nextAvailableMoveKey++;
                aMove.id = this.nextAvailableMoveKey.toString();

                // it seems tht you have to push the move in both arrarys.  
                // putting it in this.moves w/o the other doesn't
                // seem to get it in this.allMoves.  Kinda surprising actually.
                // @ts-ignore
                this.allMoves.get(aMove.gameId).get(aMove.turnId).push(aMove);
                this.moves.push(aMove);
            }
        }
    }

    @action
    createNonPersistentMove = ( aCountryName: string, aTurnId: string, aGameId: string, 
                                aNonPersistentMoveOrder: string) => {

        return new Move(aTurnId + this.nextAvailableMoveKey++, aNonPersistentMoveOrder, aCountryName, aTurnId, aGameId);
    }
}
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

        let myPromise = new Promise<Array<Move>>((resolve, reject) => {

            this.adjustCacheForTurn(forTurnId, forGameId);
            resolve(this.moves);
        });

        return myPromise;
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

        let myPromise = new Promise<boolean>((resolve, reject) => {

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
            resolve(moveDeleted);
        });

        return myPromise;
    }

    createMove = (moveOrder: string, owningCountryName: string, turnId: string, gameId: string) => {

        let myPromise = new Promise<Move>((resolve, reject) => {

            this.adjustCacheForTurn(turnId, gameId);

            this.nextAvailableMoveKey++;
            let newMove = new Move(this.nextAvailableMoveKey.toString(), moveOrder, owningCountryName, turnId, gameId);
            // it seems tht you have to push the move in both arrarys.  
            // putting it in this.moves w/o the other doesn't
            // seem to get it in this.allMoves.  Kinda surprising actually.
            // @ts-ignore
            this.allMoves.get(newMove.gameId).get(newMove.turnId).push(newMove);
            this.moves.push(newMove);

            resolve(newMove);
        });

        return myPromise;
    }

    updateMove = (aMove: Move) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {

            this.adjustCacheForTurn(aMove.turnId, aMove.gameId);
            // don't have to do anything here - this is all in memory and the incomming
            // move was already updated
            resolve(true);
        });

        return myPromise;
    }

    @action
    createNonPersistentMove = ( aCountryName: string, aTurnId: string, aGameId: string,
                                aNonPersistentMoveOrder: string) => {

        let myPromise = new Promise<Move>((resolve, reject) => {
            resolve(new Move(aTurnId + this.nextAvailableMoveKey++, aNonPersistentMoveOrder,
                aCountryName, aTurnId, aGameId));
        });

        return myPromise;
    }
}
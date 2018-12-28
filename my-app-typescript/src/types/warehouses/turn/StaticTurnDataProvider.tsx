import { ITurnDataProvider } from './ITurnDataProvider';
import { Turn } from './Turn';

export class StaticTurnDataProvider implements ITurnDataProvider {

    allTurns: { [gameId: string]: Array<Turn> } = {};
    nextAvailableTurnId = 0;

    constructor(aGameId: string | null, myTurns: Array<Turn> | null) {
        if (aGameId && myTurns) {
            this.allTurns[aGameId] = myTurns;
        }
    }

    getTurns = (aGameId: string) => {

        let self = this;
        let myPromise = new Promise<Array<Turn>>((resolve, reject) => {

            if (!self.allTurns[aGameId]) {
                self.allTurns[aGameId] = Array<Turn>();
            }

            resolve(self.allTurns[aGameId]);
        });

        return myPromise;
    }

    createTurn = (aTurn: Turn) => {

        let myPromise = new Promise<Turn>((resolve, reject) => {

            this.nextAvailableTurnId++;
            aTurn.id = this.nextAvailableTurnId.toString();

            if (!this.allTurns[aTurn.gameId]) {
                this.allTurns[aTurn.gameId] = Array<Turn>();
            }
            this.allTurns[aTurn.gameId].push(aTurn);

            resolve(aTurn);
        });

        return myPromise;
    }

    updateTurn = (aTurn: Turn) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            // there is no real persistence so the turn was updated before calling this function
            resolve(true);
        });

        return myPromise;
    }

    deleteTurn = (aTurn: Turn) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            let turnDeleted = false;

            let theTurns = this.allTurns[aTurn.gameId];

            if (theTurns) {
                let index = theTurns.length;
                while (index--) {
                    if (aTurn.id === theTurns[index].id) {
                        theTurns.splice(index, 1);
                        turnDeleted = true;
                    }
                }
            }
            resolve(turnDeleted);
        });

        return myPromise;
    }

}
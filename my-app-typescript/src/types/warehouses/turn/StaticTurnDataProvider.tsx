import { ITurnDataProvider } from './ITurnDataProvider';
import { Turn } from './Turn';
import { SeasonTypes, TurnStatus } from '../DomainTypes';

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

    createTurn = (aGameId: string, aSeason: SeasonTypes, aYear: number, aStatus: TurnStatus) => {

        let myPromise = new Promise<Turn>((resolve, reject) => {

            this.nextAvailableTurnId++;
            let newTurn = new Turn(this.nextAvailableTurnId.toString(), aGameId, aYear, aSeason, aStatus);

            if (!this.allTurns[aGameId]) {
                this.allTurns[aGameId] = Array<Turn>();
            }
            this.allTurns[aGameId].push(newTurn);

            resolve(newTurn);
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
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

        if (!this.allTurns[aGameId]) {
            this.allTurns[aGameId] = Array<Turn>();
        }

        return this.allTurns[aGameId];
    }

    persistTurn = (aTurn: Turn) => {
        if (! this.allTurns[aTurn.gameId]) {
            this.allTurns[aTurn.gameId] = Array<Turn>();
        } 
        if (! aTurn.id) {
            this.nextAvailableTurnId++;
            aTurn.id = this.nextAvailableTurnId.toString();
            this.allTurns[aTurn.gameId].push(aTurn);
        }
    }

    deleteTurn = (aTurn: Turn) => {

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

        return turnDeleted;
    }

}
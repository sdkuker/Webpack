import { ITurnDataProvider } from './ITurnDataProvider';
import { Turn } from './Turn';
import { Game } from './Game';

export class StaticTurnDataProvider implements ITurnDataProvider {

    allTurns: { [gameId: string]: Array<Turn> } = {};
    nextAvailableTurnId = 0;

    constructor(aGame: Game | null, myTurns: Array<Turn> | null) {
        if (aGame && myTurns) {
            this.allTurns[aGame.id] = myTurns;
        }
    }

    getTurns = (aGame: Game) => {

        if (!this.allTurns[aGame.id]) {
            this.allTurns[aGame.id] = Array<Turn>();
        }

        return this.allTurns[aGame.id];
    }

    persistTurn = (aTurn: Turn) => {
        if (! this.allTurns[aTurn.game.id]) {
            this.allTurns[aTurn.game.id] = Array<Turn>();
        } 
        if (! aTurn.id) {
            this.nextAvailableTurnId++;
            aTurn.id = this.nextAvailableTurnId.toString();
            this.allTurns[aTurn.game.id].push(aTurn);
        }
    }

    deleteTurn = (aTurn: Turn) => {

        let turnDeleted = false;
        
        let theTurns = this.allTurns[aTurn.game.id];
        
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
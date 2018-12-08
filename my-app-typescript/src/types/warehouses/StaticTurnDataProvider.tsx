import { ITurnDataProvider } from './ITurnDataProvider';
import { Turn } from './Turn';
import { observable, action } from 'mobx';
import { Game } from './Game';

export class StaticTurnDataProvider implements ITurnDataProvider {

    @observable turns: Array<Turn>;
    gameId: string;
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
        var currentTurnNumber = 0;
        if (! this.allTurns[aTurn.game.id]) {
            this.allTurns[aTurn.game.id] = Array<Turn>();
        } 
        if (! aTurn.id) {
            this.nextAvailableTurnId++;
            aTurn.id = this.nextAvailableTurnId.toString();
            this.allTurns[aTurn.game.id].push(aTurn);
        }
    }

}
import { ITurnDataProvider } from './ITurnDataProvider';
import { Turn } from './Turn';
import { observable, action } from 'mobx';
import { Game } from './Game';

export class StaticTurnDataProvider implements ITurnDataProvider {

    @observable turns: Array<Turn>;
    gameId: string;
    allTurns: { [gameId: string]: Array<Turn> } = {};

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
        if (this.allTurns[aTurn.game.id]) {
            currentTurnNumber = this.allTurns[aTurn.game.id].length;
        } else {
            this.allTurns[aTurn.game.id] = Array<Turn>();
        }
        if (! aTurn.id) {
            aTurn.id = (currentTurnNumber + 1).toString();
            this.allTurns[aTurn.game.id].push(aTurn);
        }
    }

}
import { ITurnDataProvider } from './ITurnDataProvider';
import { Turn } from './Turn';
import { observable, action } from 'mobx';
import { Game } from './Game';
import { SeasonTypes, TurnStatus } from './DomainTypes';

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

        if ((aGame.id === '1' || aGame.id === '2') && !this.allTurns[aGame.id]) {
            this.initializeTurns(aGame);
        }

        if (!this.allTurns[aGame.id]) {
            this.allTurns[aGame.id] = Array<Turn>();
        }

        return this.allTurns[aGame.id];
    }

    initializeTurns = (aGame: Game | null) => {

        if (aGame) {
            const myTurns = Array<Turn>();

            myTurns.push(new Turn('1', aGame, 1, SeasonTypes.Spring, TurnStatus.Complete));
            myTurns.push(new Turn('2', aGame, 1, SeasonTypes.Fall, TurnStatus.Open));

            this.allTurns[aGame.id] = myTurns;
        }
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
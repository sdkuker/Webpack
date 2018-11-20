import { ITurnDataProvider } from './ITurnDataProvider';
import { Turn } from './Turn';
import { observable, action } from 'mobx';
import { Game } from './Game';
import { SeasonTypes, TurnStatus } from './DomainTypes';

export class StaticTurnDataProvider implements ITurnDataProvider {

    @observable turns: Array<Turn>;

    constructor(myTurns: Array<Turn> | null) {
        if (myTurns) {
            this.turns = myTurns;
        }
    }

    getTurns = (aGame: Game) => {

        if (! this.turns) {
            this.initializeTurns(aGame);
        }
        
        const theReturn = Array<Turn>();

        let index: number;
        for (index = 0; index < this.turns.length; index++) {
            if (this.turns[index].game === aGame)  {
                    theReturn.push(this.turns[index]);
                }
        }
        return theReturn;
    }

    initializeTurns = (aGame: Game | null) => {

        if (aGame) {
            const myTurns = Array<Turn>();

            myTurns.push(new Turn(aGame, 1, SeasonTypes.Spring, TurnStatus.Complete));
            myTurns.push(new Turn(aGame, 1, SeasonTypes.Fall, TurnStatus.Open));

            this.turns = myTurns;
        }
    }
}
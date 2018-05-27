import { Turn } from './Turn';
import { SeasonTypes, TurnStatus } from './DomainTypes';
import { observable } from 'mobx';
import { Game } from './Game';
import { warehouse as GameWarehouse } from './GameWarehouse';

class TurnWarehouse {
   
    @observable turns: Array<Turn>;

    constructor() {
        this.initializeTurns();
    }

    initializeTurns = () => {

        const myTurns = Array<Turn>();

        myTurns.push(new Turn(GameWarehouse.games[0], 1, SeasonTypes.Spring, TurnStatus.Complete));
        myTurns.push(new Turn(GameWarehouse.games[0], 1, SeasonTypes.Fall, TurnStatus.Open));

        this.turns = myTurns;
    }

    setTurns = (someTurns: Turn[]) => {
        this.turns = someTurns;
    }

    getAllTurns = () => {
        return this.turns;
    }

    getTurns = (aGame: Game) => {
        const theReturn = Array<Turn>();

        let index: number;
        for (index = 0; index < this.turns.length; index++) {
            if (this.turns[index].game === aGame)  {
                    theReturn.push(this.turns[index]);
                }
        }
        return theReturn;
    }

    getOpenTurn = (aGame: Game) => {

        let index: number;
        const turnsForGame = this.getTurns(aGame);
        for (index = 0; index < turnsForGame.length; index++) {
            if (turnsForGame[index].status === TurnStatus.Open)  {
                    return turnsForGame[index];
                }
        }
        return null;
    }

    getTurn = (aGame: Game, aYear: number, aSeason: SeasonTypes) => {

        let index: number;
        const turnsForGame = this.getTurns(aGame);
        for (index = 0; index < turnsForGame.length; index++) {
            if (turnsForGame[index].year === aYear && turnsForGame[index].season === aSeason)  {
                    return turnsForGame[index];
                }
        }
        return null;
    }
}

export const warehouse = new TurnWarehouse();
import { Turn } from './Turn';
import { SeasonTypes, TurnStatus } from './DomainTypes';
import { observable } from 'mobx';
import { Game } from './Game';
import { ITurnWarehouse } from './ITurnWarehouse';
import { ITurnDataProvider } from './ITurnDataProvider';

export class TurnWarehouse implements ITurnWarehouse {
   
    dataProvider: ITurnDataProvider;

    constructor(aDataProvider: ITurnDataProvider) {
        this.dataProvider = aDataProvider;
    }

    getTurns = (aGame: Game) => {

        return this.dataProvider.getTurns(aGame);
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
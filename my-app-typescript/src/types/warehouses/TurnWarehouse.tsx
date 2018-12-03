import { Turn } from './Turn';
import { SeasonTypes, TurnStatus } from './DomainTypes';
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
        let theReturn: Turn;
        let highestTurn: Turn;
        const turnsForGame = this.getTurns(aGame);
        for (index = 0; index < turnsForGame.length; index++) {
            if (turnsForGame[index].status === TurnStatus.Open) {
                theReturn = turnsForGame[index];
            } else {
                // @ts-ignore
                if (highestTurn) {
                    if (highestTurn.year < turnsForGame[index].year) {
                        highestTurn = turnsForGame[index];
                    } else {
                        if (highestTurn.year === turnsForGame[index].year &&
                            highestTurn.season === SeasonTypes.Spring) {
                            highestTurn = turnsForGame[index];
                        }
                    }

                } else {
                    highestTurn = turnsForGame[index];
                }
            }
        }

        // @ts-ignore
        if (!theReturn) {
            // @ts-ignore
            theReturn = highestTurn;
        }

        return theReturn;
    }

    getTurn = (aGame: Game, aYear: number, aSeason: SeasonTypes) => {

        let index: number;
        const turnsForGame = this.getTurns(aGame);
        for (index = 0; index < turnsForGame.length; index++) {
            if (turnsForGame[index].year === aYear && turnsForGame[index].season === aSeason) {
                return turnsForGame[index];
            }
        }
        return null;
    }

    generateNextTurn = (aGame: Game) => {

        // TODO write some nice unit test for this...

        let currentlyOpenTurn = this.getOpenTurn(aGame);
        if (currentlyOpenTurn) {
            var newSeason: SeasonTypes;
            var newYear: number;
            if (currentlyOpenTurn.season === SeasonTypes.Fall) {
                newSeason = SeasonTypes.Spring;
                newYear = currentlyOpenTurn.year + 1;
            } else {
                newSeason = SeasonTypes.Fall;
                newYear = currentlyOpenTurn.year;
            }
            currentlyOpenTurn.status = TurnStatus.Complete;
            this.dataProvider.persistTurn(currentlyOpenTurn);

            const nextTurn = new Turn(null, aGame, newYear, newSeason, TurnStatus.Open);
            this.dataProvider.persistTurn(nextTurn);
            return nextTurn;

        } else {
            // assume there are no turns at all - make the first one
            const nextTurn = new Turn(null, aGame, 1, SeasonTypes.Spring, TurnStatus.Open);
            this.dataProvider.persistTurn(nextTurn);
            return nextTurn;
        }
    }
}
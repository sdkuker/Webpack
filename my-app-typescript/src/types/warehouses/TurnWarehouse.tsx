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

    getTurns = (aGameId: string) => {

        return this.dataProvider.getTurns(aGameId);
    }

    getOpenTurn = (aGameId: string) => {

        let index: number;
        let theReturn: Turn;
        let highestTurn: Turn;
        const turnsForGame = this.getTurns(aGameId);
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

    getTurn = (aGameId: string, aYear: number, aSeason: SeasonTypes) => {

        let index: number;
        const turnsForGame = this.getTurns(aGameId);
        for (index = 0; index < turnsForGame.length; index++) {
            if (turnsForGame[index].year === aYear && turnsForGame[index].season === aSeason) {
                return turnsForGame[index];
            }
        }
        return null;
    }

    deleteTurn = (aTurn: Turn) => {
        return this.dataProvider.deleteTurn(aTurn);
    }

    generateNextTurn = (aGameId: string) => {

        let currentlyOpenTurn = this.getOpenTurn(aGameId);
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

            const nextTurn = new Turn(null, aGameId, newYear, newSeason, TurnStatus.Open);
            this.dataProvider.persistTurn(nextTurn);
            return nextTurn;

        } else {
            // assume there are no turns at all - make the first one
            const nextTurn = new Turn(null, aGameId, 1, SeasonTypes.Spring, TurnStatus.Open);
            this.dataProvider.persistTurn(nextTurn);
            return nextTurn;
        }
    }
}
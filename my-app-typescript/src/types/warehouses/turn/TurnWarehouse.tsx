import { Turn } from './Turn';
import { SeasonTypes, TurnStatus, TurnPhase } from '../DomainTypes';
import { ITurnWarehouse } from './ITurnWarehouse';
import { IAwsWarehouse } from '../aws/IAwsWarehouse';
import { ITurnDataProvider } from './ITurnDataProvider';
import { observable } from 'mobx';

export class TurnWarehouse implements ITurnWarehouse {

    dataProvider: ITurnDataProvider;
    awsWarehouse: IAwsWarehouse;

    @observable
    openTurn: Turn;

    constructor(aDataProvider: ITurnDataProvider, anAwsWarehouse: IAwsWarehouse) {
        this.dataProvider = aDataProvider;
        this.awsWarehouse = anAwsWarehouse;
    }

    getTurns = (aGameId: string) => {

        let myPromise = new Promise<Array<Turn>>((resolve, reject) => {
            this.dataProvider.getTurns(aGameId).then((arrayOfTurns) => {
                resolve(arrayOfTurns);
            }).catch((error) => {
                reject('unable to get turns for game: ' + aGameId + error);
            });
        });

        return myPromise;
    }

    getOpenTurn = (aGameId: string) => {

        let myPromise = new Promise<Turn>((resolve, reject) => {

            let index: number;
            let theReturn: Turn;
            let highestTurn: Turn;
            this.getTurns(aGameId).then((turnsForGame) => {
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
                this.openTurn = theReturn;
                resolve(this.openTurn);
            }).catch((error) => {
                reject('unable to get turns to determine the open turn: ' + aGameId + error);
            });
        });

        return myPromise;
    }

    getTurn = (aGameId: string, aYear: number, aSeason: SeasonTypes) => {

        let myPromise = new Promise<Turn | null>((resolve, reject) => {
            let index: number;
            this.getTurns(aGameId).then((turnsForGame) => {
                for (index = 0; index < turnsForGame.length; index++) {
                    if (turnsForGame[index].year === aYear && turnsForGame[index].season === aSeason) {
                        resolve(turnsForGame[index]);
                    }
                }
                resolve(null);
            }).catch((error) => {
                reject('error getting turns to get an individual turn' + error);
            });
        });

        return myPromise;
    }

    deleteTurn = (aTurn: Turn) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            this.dataProvider.deleteTurn(aTurn).then((wasTurnDeleted) => {
                resolve(wasTurnDeleted);
            }).catch((error) => {
                reject('error deleting a turn' + error);
            });
        });

        return myPromise;
    }

    generateNextPhase = (aGameId: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            this.awsWarehouse.generateNextPhase(aGameId).then((wasPhaseGenerated) => {
                this.getOpenTurn(aGameId).then((theOpenTurn) => {
                    resolve(wasPhaseGenerated);
                }).catch((error1) => {
                    reject('unable to get open turn after generating new phase: ' +  error1);
                });
            }).catch((error) => {
                reject('error generating the next phase for game: ' + aGameId + error);
            });
        });

        return myPromise;
    }

    generateNextTurn = (aGameId: string) => {

        let myPromise = new Promise<Turn>((resolve, reject) => {

            this.getOpenTurn(aGameId).then((currentlyOpenTurn) => {
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
                    this.dataProvider.updateTurn(currentlyOpenTurn).then((wasUpdateSuccessful) => {
                        if (wasUpdateSuccessful) {
                            this.dataProvider.createTurn(aGameId, newSeason, newYear, TurnStatus.Open,
                                TurnPhase.Diplomatic).
                                then((newTurn) => {
                                    resolve(newTurn);
                                }).catch((error) => {
                                    reject('unable to create new turn' + error);
                                });
                        } else {
                            reject('unable to update currently open turn');
                        }
                    }).catch((error) => {
                        reject('unable to persist the currently open turn' + error);
                    });

                } else {
                    // assume there are no turns at all - make the first one
                    this.dataProvider.createTurn(aGameId, SeasonTypes.Spring, 1, TurnStatus.Open, TurnPhase.Diplomatic)
                        .then((newTurn) => {
                            resolve(newTurn);
                        }).catch((error) => {
                            reject('unable to make the first turn for the game' + error);
                        });
                }
            });
        });

        return myPromise;
    }
}
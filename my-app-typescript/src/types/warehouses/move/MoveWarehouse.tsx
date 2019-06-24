import { Move } from './Move';
import { Piece } from '../piece/Piece';
import { IMoveDataProvider } from './IMoveDataProvider';
import { IMoveWarehouse } from './IMoveWarehouse';
import { action } from 'mobx';

export class MoveWarehouse implements IMoveWarehouse {

    nonPersistentMoveOrder: string = 'New Move Order';
    dataProvider: IMoveDataProvider;

    constructor(myDataProvider: IMoveDataProvider) {
        this.dataProvider = myDataProvider;
    }

    @action
    deleteMove = (aMove: Move) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {

            this.dataProvider.deleteMove(aMove).then((wasMoveDeleted) => {
                resolve(wasMoveDeleted);
            }).catch((error) => {
                reject('error deleting a move' + error);
            });
        });
        return myPromise;
    }

    deleteMoves = (aTurnId: string, aGameId: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            const deleteMovesPromiseArray = Array<Promise<boolean>>();
            this.dataProvider.getMoves(aTurnId, aGameId).then((theMovesArray) => {
                let index = theMovesArray.length;
                while (index--) {
                    deleteMovesPromiseArray.push(this.deleteMove(theMovesArray[index]));
                }
                Promise.all(deleteMovesPromiseArray).then((arrayOfBooleanDeleteResponses) => {
                    resolve(true);
                }).catch((error) => {
                    reject('unable to delete all the moves  ' + error);
                });
            }).catch((error) => {
                reject('unable to get moves to delete ' + error);
            });
        });

        return myPromise;
    }

    updateMove = (aMove: Move) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            this.dataProvider.updateMove(aMove).then((wasMoveUpdated) => {
                resolve(wasMoveUpdated);
            }).catch((error) => {
                reject('unable to update the move ' + error);
            });
        });

        return myPromise;
    }

    createMove = (moveOrder: string, owningCountryName: string, turnId: string, gameId: string) => {

        let myPromise = new Promise<Move>((resolve, reject) => {
            this.dataProvider.createMove(moveOrder, owningCountryName, turnId, gameId).then((newMove) => {
                resolve(newMove);
            }).catch((error) => {
                reject('unable to create the move ' + error);
            });
        });

        return myPromise;
    }

    createNonPersistentMove = (aCountryName: string, aTurnId: string, aGameId: string) => {

        let myPromise = new Promise<Move>((resolve, reject) => {
            this.dataProvider.createNonPersistentMove(aCountryName, aTurnId, aGameId,
                this.nonPersistentMoveOrder).then((aMove) => {
                    resolve(aMove);
                }).catch((error) => {
                    reject('unable to create a non persistent move ' + error);
                });
        });

        return myPromise;

    }

    getMoves = (countryName: string, aTurnId: string, aGameId: string, includeNonPersistentMove: boolean | null) => {

        let myPromise = new Promise<Array<Move>>((resolve, reject) => {
            const theReturn = Array<Move>();
            let index: number;
            this.dataProvider.getMoves(aTurnId, aGameId).then((theMoves) => {
                for (index = 0; index < theMoves.length; index++) {
                    if (theMoves[index].owningCountryName === countryName &&
                        theMoves[index].turnId === aTurnId) {
                        theReturn.push(theMoves[index]);
                    }
                }
                if (includeNonPersistentMove) {
                    this.createNonPersistentMove(countryName, aTurnId, aGameId).then((newNonPersistentMove) => {
                        theReturn.push(newNonPersistentMove);
                        resolve(theReturn);
                    }).catch((error) => {
                        reject('unable to create non persistent move when getting moves ' + error);
                    });
                } else {
                    resolve(theReturn);
                }
            }).catch((error) => {
                reject('unable to get moves ' + error);
            });
        });

        return myPromise;
    }

    createInitialMoves = (aTurnId: string, aGameId: string, pieces: Array<Piece>) => {

        let myPromise = new Promise<Array<Move>>((resolve, reject) => {

            const theReturn = Array<Move>();
            const createMovesPromiseArray = Array<Promise<Move>>();

            pieces.forEach((aPiece: Piece, anIndex: number) => {
                let moveOrder = aPiece.type + ' ' + aPiece.pieceLocation.nameOfLocationAtBeginningOfPhase + ' Holds';
                createMovesPromiseArray.push(this.createMove(moveOrder, aPiece.owningCountryName, aTurnId, aGameId));
            });

            Promise.all(createMovesPromiseArray).then((newMovesArray) => {
                newMovesArray.forEach((aMove: Move, anIndex: number) => {
                    theReturn.push(aMove);
                });
                resolve(theReturn);

            }).catch((error) => {
                reject('error creating initial moves ' + error);
            });

        });

        return myPromise;
    }

}
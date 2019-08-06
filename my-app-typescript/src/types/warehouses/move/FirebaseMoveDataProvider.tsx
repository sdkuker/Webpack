import db from '../../../firebase';
import { IMoveDataProvider } from './IMoveDataProvider';
import { Move } from './Move';
import { MoveResults } from './MoveResults';
import { EnvironmentName } from '../PersistenceTypes';

export class FirebaseMoveDataProvider implements IMoveDataProvider {

    environmentName: EnvironmentName;
    moveDocumentName: string;
    moveCollectionName: string;
    moveResultsDocumentName: string;
    moveResultsCollectionName: string;
    nextAvailableMoveKey: number = 0;

    constructor(anEnviornmentName: EnvironmentName) {
        this.environmentName = anEnviornmentName;
        this.moveDocumentName = 'moves';
        this.moveCollectionName = 'allMoves';
        this.moveResultsDocumentName = 'orderResolutionResults';
        this.moveResultsCollectionName = 'allOrderResolutionResults';
    }

    createMove = (moveOrder: string, anOwningCountryName: string, aTurnId: string, aGameId: string) => {

        let self = this;
        let tempMove = new Move(null, moveOrder, anOwningCountryName, aTurnId, aGameId);

        let myPromise = new Promise<Move>((resolve, reject) => {

            db.collection(self.environmentName).doc(self.moveDocumentName).collection(self.moveCollectionName).add({
                order: moveOrder,
                owningCountryName: anOwningCountryName,
                turnId: aTurnId,
                gameId: aGameId,
                pieceType: tempMove.pieceType,
                currentLocationName: tempMove.currentLocationName,
                action: tempMove.action,
                endingLocationName: (tempMove.endingLocationName !== undefined) ? tempMove.endingLocationName : null,
                secondaryPieceType: (tempMove.secondaryPieceType !== undefined) ? tempMove.secondaryPieceType : null,
                secondaryCurrentLocationName: (tempMove.secondaryCurrentLocationName !== undefined) ?
                    tempMove.secondaryCurrentLocationName : null,
                secondaryAction: (tempMove.secondaryAction !== undefined) ? tempMove.secondaryAction : null,
                secondaryEndingLocationName: (tempMove.secondaryEndingLocationName) ?
                    tempMove.secondaryEndingLocationName : null
            }).then((docRef) => {
                let newMove = new Move(docRef.id, moveOrder, anOwningCountryName, aTurnId, aGameId);
                resolve(newMove);
            }).catch((error) => {
                reject('error creating a move: ' + error);
            });
        });

        return myPromise;
    }

    getMove = (aMoveId: string) => {

        let self = this;

        let myPromise = new Promise<Move | null>((resolve, reject) => {

            db.collection(self.environmentName).doc(self.moveDocumentName).collection(self.moveCollectionName)
                .doc(aMoveId).get().then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        // @ts-ignore
                        resolve(new Move(aMoveId, documentSnapshot.data().order,
                            // @ts-ignore
                            documentSnapshot.data().owningCountryName, documentSnapshot.data().turnId,
                            // @ts-ignore
                            documentSnapshot.data().gameId));
                    } else {
                        resolve(null);
                    }
                }).catch((error) => {
                    reject('unable to get a move for ID:  ' + aMoveId + ' ' + error);
                });
        });

        return myPromise;
    }

    deleteMove = (aMove: Move) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            db.collection(self.environmentName).doc(self.moveDocumentName)
                .collection(self.moveCollectionName).doc(aMove.id).delete().then(() => {
                    resolve(true);
                }).catch((error) => {
                    reject('unable to delete the Move: ' + error);
                });
        });

        return myPromise;
    }

    deleteMoves = (arrayOfMoves: Array<Move>) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {
            let arrayOfPromises = new Array<Promise<boolean>>();
            arrayOfMoves.forEach((aMove: Move) => {
                arrayOfPromises.push(self.deleteMove(aMove));
            });
            Promise.all(arrayOfPromises).then((arrayOfBooleans) => {
                resolve(true);
            }).catch((error) => {
                reject('unable to delete all the moves ' + error);
            });
        });

        return myPromise;
    }

    getMoveResults = (aTurnId: string) => {

        let self = this;

        let myPromise = new Promise<Map<string, MoveResults>>((resolve, reject) => {
            db.collection(self.environmentName).doc(self.moveResultsDocumentName)
                .collection(self.moveResultsCollectionName)
                .where('turnId', '==', aTurnId).get().then((querySnapshot) => {
                    let myMap = new Map<string, MoveResults>();
                    querySnapshot.forEach((doc) => {
                        myMap.set(doc.data().orderId, new MoveResults(doc.id, doc.data().executionDescription,
                            doc.data().executionFailedDueToStandoff, doc.data().gameId, doc.data().isValidOrder,
                            doc.data().orderExecutedSuccessfully, doc.data().orderId,
                            doc.data().orderResolutionCompleted, doc.data().turnId));
                    });
                    resolve(myMap);
                }).catch((error) => {
                    reject('error getting move results: ' + error);
                });
        });

        return myPromise;
    }

    getMoves = (aTurnId: string, aGameId: string) => {

        let self = this;

        let myPromise = new Promise<Array<Move>>((resolve, reject) => {
            db.collection(self.environmentName).doc(self.moveDocumentName).collection(self.moveCollectionName)
                .where('turnId', '==', aTurnId).get().then((querySnapshot) => {
                    let myArray = new Array<Move>();
                    querySnapshot.forEach((doc) => {
                        myArray.push(new Move(doc.id, doc.data().order, doc.data().owningCountryName,
                            doc.data().turnId, doc.data().gameId));
                    });
                    resolve(myArray);
                }).catch((error) => {
                    reject('error getting moves: ' + error);
                });
        });

        return myPromise;
    }

    updateMove = (aMove: Move) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            db.collection(self.environmentName).doc(self.moveDocumentName)
                .collection(self.moveCollectionName).doc(aMove.id).update({
                    order: aMove.order,
                    owningCountryName: aMove.owningCountryName,
                    turnId: aMove.turnId,
                    gameId: aMove.gameId,
                    pieceType: aMove.pieceType,
                    currentLocationName: aMove.currentLocationName,
                    action: aMove.action,
                    endingLocationName: (aMove.endingLocationName !== undefined) ? aMove.endingLocationName : null,
                    secondaryPieceType: (aMove.secondaryPieceType !== undefined) ? aMove.secondaryPieceType : null,
                    secondaryCurrentLocationName: (aMove.secondaryCurrentLocationName !== undefined) ?
                        aMove.secondaryCurrentLocationName : null,
                    secondaryAction: (aMove.secondaryAction !== undefined) ? aMove.secondaryAction : null,
                    secondaryEndingLocationName: (aMove.secondaryEndingLocationName !== undefined) ?
                        aMove.secondaryEndingLocationName : null
                }).then(() => {
                    resolve(true);
                }).catch((error) => {
                    reject('error updating a move: ' + error);
                });
        });

        return myPromise;
    }

    createNonPersistentMove = (aCountryName: string, aTurnId: string, aGameId: string,
        aNonPersistentMoveOrder: string) => {

        let myPromise = new Promise<Move>((resolve, reject) => {
            resolve(new Move(aTurnId + this.nextAvailableMoveKey++, aNonPersistentMoveOrder,
                aCountryName, aTurnId, aGameId));
        });

        return myPromise;
    }
}
import db from '../../../firebase';
import { IMoveDataProvider } from './IMoveDataProvider';
import { Move } from './Move';
import { EnvironmentName } from '../PersistenceTypes';

export class FirebaseMoveDataProvider implements IMoveDataProvider {

    environmentName: EnvironmentName;
    nextAvailableMoveKey: number = 0;

    constructor(anEnviornmentName: EnvironmentName) {
        this.environmentName = anEnviornmentName;
    }

    createMove = (moveOrder: string, anOwningCountryName: string, aTurnId: string, aGameId: string) => {

        let self = this;

        let myPromise = new Promise<Move>((resolve, reject) => {

            db.collection(self.environmentName).doc('moves').collection('allMoves').add({
                order: moveOrder,
                owningCountryName: anOwningCountryName,
                turnId: aTurnId,
                gameId: aGameId
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

            db.collection(self.environmentName).doc('moves').collection('allMoves')
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

            db.collection(self.environmentName).doc('moves').collection('allMoves').doc(aMove.id).delete().then(() => {
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

    getMoves = (aTurnId: string, aGameId: string) => {

        let self = this;

        let myPromise = new Promise<Array<Move>>((resolve, reject) => {
            db.collection(self.environmentName).doc('moves').collection('allMoves')
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

            db.collection(self.environmentName).doc('moves').collection('allMoves').doc(aMove.id).update({
                order: aMove.order,
                owningCountryName: aMove.owningCountryName,
                turnId: aMove.turnId,
                gameId: aMove.gameId
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
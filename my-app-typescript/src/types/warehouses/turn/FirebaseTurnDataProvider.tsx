import db from '../../../firebase';
import { ITurnDataProvider } from './ITurnDataProvider';
import { Turn } from './Turn';
import { SeasonTypes, TurnStatus, TurnPhase } from '../DomainTypes';
import { EnvironmentName } from '../PersistenceTypes';

export class FirebaseTurnDataProvider implements ITurnDataProvider {

    environmentName: EnvironmentName;

    constructor(anEnviornmentName: EnvironmentName) {
        this.environmentName = anEnviornmentName;
    }

    createTurn = (aGameId: string, aSeason: SeasonTypes, aYear: number, aStatus: TurnStatus, aPhase: TurnPhase) => {

        let self = this;

        let myPromise = new Promise<Turn>((resolve, reject) => {

            db.collection(self.environmentName).doc('turns').collection('allTurns').add({
                gameId: aGameId,
                season: aSeason,
                year: aYear,
                status: aStatus,
                phase: aPhase
            }).then((docRef) => {
                let newTurn = new Turn(docRef.id, aGameId, aYear, aSeason, aStatus, aPhase);
                resolve(newTurn);
            }).catch((error) => {
                reject('error creating a turn: ' + error);
            });
        });

        return myPromise;
    }

    getTurns = (aGameId: string) => {

        let self = this;

        let myPromise = new Promise<Array<Turn>>((resolve, reject) => {
            db.collection(self.environmentName).doc('turns').collection('allTurns')
                .where('gameId', '==', aGameId).get().then((querySnapshot) => {
                    let myArray = new Array<Turn>();
                    querySnapshot.forEach((doc) => {
                        myArray.push(new Turn(doc.id, doc.data().gameId, doc.data().year, 
                        doc.data().season, doc.data().status, doc.data().phase));
                    });
                    resolve(myArray);
                }).catch((error) => {
                    reject('error getting turns: ' + error);
                });
        });

        return myPromise;
    }

    updateTurn = (aTurn: Turn) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            db.collection(self.environmentName).doc('turns').collection('allTurns').doc(aTurn.id).set({
                gameId: aTurn.gameId,
                season: aTurn.season,
                year: aTurn.year,
                status: aTurn.status,
                phase: aTurn.phase
            }).then(() => {
                resolve(true);
            }).catch((error) => {
                reject('unable to update the turn ' + error);
            });
        });

        return myPromise;
    }

    deleteTurn = (aTurn: Turn) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            db.collection(self.environmentName).doc('turns').collection('allTurns').doc(aTurn.id).delete().then(() => {
                resolve(true);
            }).catch((error) => {
                reject('unable to delete the turn ' + error);
            });
        });

        return myPromise;
    }

    getTurn = (aTurnId: string) => {

        let self = this;

        let myPromise = new Promise<Turn | null>((resolve, reject) => {

            db.collection(self.environmentName).doc('turns').collection('allTurns')
                .doc(aTurnId).get().then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        // @ts-ignore
                        resolve(new Turn(aTurnId, documentSnapshot.data().gameId, documentSnapshot.data().year,
                            // @ts-ignore
                            documentSnapshot.data().season, documentSnapshot.data().status, 
                             // @ts-ignore
                            documentSnapshot.data().phase));
                    } else {
                        resolve(null);
                    }
                }).catch((error) => {
                    reject('unable to get turn with ID: ' + aTurnId + ' ' + error);
                });
        });

        return myPromise;
    }
}
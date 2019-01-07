import db from '../../../firebase';
import { ITurnDataProvider } from './ITurnDataProvider';
import { Turn } from './Turn';
import { SeasonTypes, TurnStatus } from '../DomainTypes';
import { EnvironmentName } from '../PersistenceTypes';

export class FirebaseTurnDataProvider {

    environmentName: EnvironmentName;

    constructor(anEnviornmentName: EnvironmentName) {
        this.environmentName = anEnviornmentName;
    }

    createTurn = (aGameId: string, aSeason: SeasonTypes, aYear: number, aStatus: TurnStatus) => {

        let self = this;

        let myPromise = new Promise<Turn>((resolve, reject) => {

            db.collection(self.environmentName).doc('turns').collection('allTurns').add({
                gameId: aGameId,
                season: aSeason,
                year: aYear,
                status: aStatus
            }).then((docRef) => {
                let newTurn = new Turn(docRef.id, aGameId, aYear, aSeason, aStatus);
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
            db.collection(self.environmentName).doc('turns').collection('allTurns').where('gameId', '==', aGameId).get().then((querySnapshot) => {
                let myArray = new Array<Turn>();
                querySnapshot.forEach((doc) => {
                    myArray.push(new Turn(doc.id, doc.data().gameId, doc.data().year, doc.data().season, doc.data().status));
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
                status: aTurn.status
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
                reject('unable to update the turn ' + error);
            });
        });

        return myPromise;
    }

    getTurn = (aTurnId: string) => {

        let self = this;

        let myPromise = new Promise<Turn | null>((resolve, reject) => {

            db.collection(self.environmentName).doc('turns').collection('allTurns').doc(aTurnId).get().then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    // @ts-ignore
                    resolve(new Turn(aTurnId, documentSnapshot.data().gameId, documentSnapshot.data().year,
                        // @ts-ignore
                        documentSnapshot.data().season, documentSnapshot.data().status));
                } else {
                    resolve(null);
                }
            }).catch((error) => {
                reject('unable to update the turn ' + error);
            });
        });

        return myPromise;
    }
}
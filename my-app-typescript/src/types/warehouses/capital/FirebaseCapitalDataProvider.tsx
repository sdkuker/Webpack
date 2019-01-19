import db from '../../../firebase';
import { ICapitalDataProvider } from './ICapitalDataProvider';
import { Capital } from './Capital';
import { EnvironmentName } from '../PersistenceTypes';

export class FirebaseCapitalDataProvider implements ICapitalDataProvider {

    environmentName: EnvironmentName;

    constructor(anEnviornmentName: EnvironmentName) {
        this.environmentName = anEnviornmentName;
    }

    createCapital = (aTurnId: string, capitalName: string, forCountryName: string) => {

        let self = this;

        let myPromise = new Promise<Capital>((resolve, reject) => {

            db.collection(self.environmentName).doc('capitals').collection('allCapitals').add({
                owningCountryName: forCountryName,
                locationName: capitalName,
                turnId: aTurnId
            }).then((docRef) => {
                let newCapital = new Capital(docRef.id, forCountryName, capitalName, aTurnId);
                resolve(newCapital);
            }).catch((error) => {
                reject('error creating a capital: ' + error);
            });
        });

        return myPromise;
    }

    getCapital = (aCapitalId: string) => {

        let self = this;

        let myPromise = new Promise<Capital | null>((resolve, reject) => {

            db.collection(self.environmentName).doc('capitals').collection('allCapitals').doc(aCapitalId).get().then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    // @ts-ignore
                    resolve(new Capital(aCapitalId, documentSnapshot.data().owningCountryName, documentSnapshot.data().locationName,
                        // @ts-ignore
                        documentSnapshot.data().turnId));
                } else {
                    resolve(null);
                }
            }).catch((error) => {
                reject('unable to get a capital for ID:  ' + aCapitalId + ' ' + error);
            });
        });

        return myPromise;
    }

    deleteCapital = (aCapital: Capital) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            db.collection(self.environmentName).doc('capitals').collection('allCapitals').doc(aCapital.id).delete().then(() => {
                resolve(true);
            }).catch((error) => {
                reject('unable to delete the capital ' + error);
            });
        });

        return myPromise;
    }

    deleteCapitals = (arrayOfCapitals: Array<Capital>) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {
            let arrayOfPromises = new Array<Promise<boolean>>();
            arrayOfCapitals.forEach((aCapital: Capital) => {
                arrayOfPromises.push(self.deleteCapital(aCapital));
            });
            Promise.all(arrayOfPromises).then((arrayOfBooleans) => {
                resolve(true);
            }).catch((error) => {
                reject('unable to delete all the capitals ' + error);
            });
        });

        return myPromise;
    }

    getCapitals = (forTurnId: string) => {

        let self = this;

        let myPromise = new Promise<Map<string, Capital>>((resolve, reject) => {
            db.collection(self.environmentName).doc('capitals').collection('allCapitals').where('turnId', '==', forTurnId).get().then((querySnapshot) => {

                let myMap = new Map<string, Capital>();
                querySnapshot.forEach((doc) => {
                    myMap.set(doc.data().locationName,  new Capital(doc.id, doc.data().owningCountryName, doc.data().locationName, doc.data().turnId));
                });
                resolve(myMap);
            }).catch((error) => {
                reject('error getting capitals: ' + error);
            });
        });

        return myPromise;
    }
}
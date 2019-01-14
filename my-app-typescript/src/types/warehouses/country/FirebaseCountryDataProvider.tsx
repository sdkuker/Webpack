import db from '../../../firebase';
import { ICountryDataProvider } from './ICountryDataProvider';
import { Country } from './Country';
import { EnvironmentName } from '../PersistenceTypes';

export class FirebaseCountryDataProvider {

    environmentName: EnvironmentName;

    constructor(anEnviornmentName: EnvironmentName) {
        this.environmentName = anEnviornmentName;
    }

    addCountry = (countryName: string, playerName: string, forGameId: string) => {

        let self = this;

        let myPromise = new Promise<Country>((resolve, reject) => {

            db.collection(self.environmentName).doc('countries').collection('allCountries').add({
                name: countryName,
                playerName: playerName,
                owningCountryName: countryName,
                gameId: forGameId
            }).then((docRef) => {
                let newCountry = new Country(docRef.id, countryName, playerName, forGameId);
                resolve(newCountry);
            }).catch((error) => {
                reject('error creating a country: ' + error);
            });
        });

        return myPromise;
    }

    deleteCountry = (aCountry: Country) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            db.collection(self.environmentName).doc('countries').collection('allCountries').doc(aCountry.id).delete().then(() => {
                resolve(true);
            }).catch((error) => {
                reject('unable to delete the country ' + error);
            });
        });

        return myPromise;
    }

    deleteCountries = (aGameId: string) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            let arrayOfPromises = new Array<Promise<boolean>>();
            self.getCountries(aGameId).then((arrayOfCountries) => {
                arrayOfCountries.forEach((aCountryToDelete: Country) => {
                    arrayOfPromises.push(self.deleteCountry(aCountryToDelete));
                });
                Promise.all(arrayOfPromises).then((arrayOfBooleans) => {
                    resolve(true);
                }).catch((error) => {
                    reject('unable to delete some or all of the countries: ' + error);
                })
            }).catch((error) => {
                reject('unable to get the countries for the game to delete: ' + error);
            })
        });

        return myPromise;
    }

    getCountry = (aGameId: string,aCountryId: string) => {

        let self = this;

        let myPromise = new Promise<Country | null>((resolve, reject) => {

            db.collection(self.environmentName).doc('countries').collection('allCountries').doc(aCountryId).get().then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    // @ts-ignore
                    resolve(new Country(aCountryId, documentSnapshot.data().name, documentSnapshot.data().playerName,
                        // @ts-ignore
                        documentSnapshot.data().gameId));
                } else {
                    resolve(null);
                }
            }).catch((error) => {
                reject('unable to get a country for ID:  ' + aCountryId + ' ' + error);
            });
        });

        return myPromise;
    }

    getCountries = (forGameId: string) => {

        let self = this;

        let myPromise = new Promise<Array<Country>>((resolve, reject) => {
            db.collection(self.environmentName).doc('countries').collection('allCountries').where('gameId', '==', forGameId).get().then((querySnapshot) => {
                let myArray = new Array<Country>();
                querySnapshot.forEach((doc) => {
                    myArray.push(new Country(doc.id, doc.data().name, doc.data().playerName, doc.data().gameId));
                });
                resolve(myArray);
            }).catch((error) => {
                reject('error getting countries: ' + error);
            });
        });

        return myPromise;
    }

    updatePlayerNameForCountry = (forGameId: string, aCountry: Country, newPlayerName: string) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {
            this.getCountries(forGameId).then((countryArray) => {
                let index = 0;
                let countryToUpdate: Country | null = null;
                for (index = 0; index < countryArray.length; index++) {
                    if (aCountry.id === countryArray[index].id) {
                        countryToUpdate = countryArray[index];
                    }
                }
                if (countryToUpdate) {
                    let countryRef = db.collection(self.environmentName).doc('countries').collection('allCountries')
                        .doc(countryToUpdate.id);
                        countryRef.update({
                        playerName: newPlayerName
                    }).then(() => {
                        // @ts-ignore
                        countryToUpdate.playerName = newPlayerName;
                        resolve(true);
                    }).catch((error) => {
                        reject('unable to update the country' + error);
                    });
                } else {
                    reject('unable to find the country to update');
                }
            }).catch((error) => {
                reject('error getting countries to update one: ' + error);
            });
        });

        return myPromise;
    }

}
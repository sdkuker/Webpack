import { Country } from './Country';
import { ICountryDataProvider } from './ICountryDataProvider';
import { ICountryWarehouse } from './ICountryWarehouse';

export class CountryWarehouse implements ICountryWarehouse {

    myDataProvider: ICountryDataProvider;

    constructor(dataProvider: ICountryDataProvider, aGameId: string | null) {
        this.myDataProvider = dataProvider;
        if (aGameId) {
            this.initializeCountries(aGameId);
        }
    }

    initializeCountries = (forGameId: string) => {

        return this.myDataProvider.initializeCountries(forGameId);
    }

    getCountryByName = (aCountryName: String, forGameId: string) => {

        let myPromise = new Promise<Country | undefined>((resolve, reject) => {

            let theCountry: Country | undefined;

            this.myDataProvider.getCountries(forGameId).then((countriesArray) => {
                countriesArray.forEach((aCountry: Country) => {
                    if (aCountry.name === aCountryName) {
                        theCountry = aCountry;
                    }
                });
                resolve(theCountry);
            }).catch((error) => {
                reject('unable to get the countries to select from ' + error);
            });
        });

        return myPromise;
    }

    getAllCountries = (forGameId: string) => {

        let myPromise = new Promise<Array<Country>>((resolve, reject) => {

            this.myDataProvider.getCountries(forGameId).then((arrayOfCountries) => {
                resolve(arrayOfCountries);
            }).catch((error) => {
                reject('unable to get countries' + error);
            });
        });

        return myPromise;
    }

    getCountryById = (aCountryId: String, forGameId: string) => {

        let myPromise = new Promise<Country | undefined>((resolve, reject) => {

            let theCountry: Country | undefined;
            this.myDataProvider.getCountries(forGameId).then((arrayOfCountries) => {
                arrayOfCountries.forEach((aCountry: Country) => {
                    if (aCountry.id === aCountryId) {
                        theCountry = aCountry;
                    }
                });
                resolve(theCountry);
            }).catch((error) => {
                reject('unable to get countries' + error);
            });
        });

        return myPromise;

    }

    updatePlayerNameForCountry = (forGameId: string, aCountry: Country, newPlayerName: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {

            this.myDataProvider.updatePlayerNameForCountry(forGameId, aCountry, newPlayerName).
                then((updateSuccessful) => {
                    resolve(updateSuccessful);
                }).catch((error) => {
                    reject('unable to update the player name ' + error);
                });
        });

        return myPromise;
    }

    deleteCountries = (forGameId: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            this.myDataProvider.deleteCountries(forGameId).then((deleteSuccessful) => {
                resolve(deleteSuccessful);
            }).catch((error) => {
                reject('unable to delete countries');
            });
        });

        return myPromise;
    }

}
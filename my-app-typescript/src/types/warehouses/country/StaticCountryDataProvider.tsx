import { ICountryDataProvider } from './ICountryDataProvider';
import { Country } from './Country';

export class StaticCountryDataProvider implements ICountryDataProvider {

    allCountries: { [gameId: string]: Array<Country> } = {};
    nextAvailableCountryId = 0;

    constructor(aGameId: string | null, myCountries: Array<Country> | null) {
        if (aGameId && myCountries) {
            this.allCountries[aGameId] = myCountries;
        }
    }

    addCountry = (countryName: string, playerName: string, forGameId: string) => {

        let myPromise = new Promise<Country>((resolve, reject) => {

            this.nextAvailableCountryId++
            let theReturn = new Country(this.nextAvailableCountryId.toString(), countryName, playerName, forGameId);
            if (! this.allCountries[forGameId]) {
                this.allCountries[forGameId] = new Array<Country>();
            }
            this.allCountries[forGameId].push(theReturn);

            resolve(theReturn);
        });

        return myPromise;
    }

    getCountries = (forGameId: string) => {

        let myPromise = new Promise<Array<Country>>((resolve, reject) => {

            if (!this.allCountries[forGameId]) {
                this.allCountries[forGameId] = new Array<Country>();
            }
            resolve(this.allCountries[forGameId]);
        });

        return myPromise;
    }

    updatePlayerNameForCountry = (forGameId: string, aCountry: Country, newPlayerName: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            aCountry.playerName = newPlayerName;
            resolve(true);
        });

        return myPromise;

    }

    deleteCountries = (forGameId: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            let successfulDeletion = true;

            if (this.allCountries[forGameId]) {
                delete this.allCountries[forGameId];
            }

            resolve(successfulDeletion);
        });

        return myPromise;
    }
}
import { ICountryDataProvider } from './ICountryDataProvider';
import { Country } from './Country';
import { Game } from './Game';

export class StaticCountryDataProvider implements ICountryDataProvider {

    allCountries: { [gameId: string]: Array<Country> } = {};
    nextAvailableCountryId = 0;

    constructor(aGameId: string | null, myCountries: Array<Country> | null) {
        if (aGameId && myCountries) {
            this.allCountries[aGameId] = myCountries;
        }
    }

    initializeCountries = (forGameId: string) => {

        let wasSuccessfull = true;

        let myArray = new Array<Country>();

        this.nextAvailableCountryId++;
        myArray.push(new Country(this.nextAvailableCountryId.toString(), 'Austria', 'Beth', forGameId));
        this.nextAvailableCountryId++;
        myArray.push(new Country(this.nextAvailableCountryId.toString(), 'England', 'Michelle', forGameId));
        this.nextAvailableCountryId++;
        myArray.push(new Country(this.nextAvailableCountryId.toString(), 'France', 'Marie', forGameId));
        this.nextAvailableCountryId++;
        myArray.push(new Country(this.nextAvailableCountryId.toString(), 'Germany', 'Steve', forGameId));
        this.nextAvailableCountryId++;
        myArray.push(new Country(this.nextAvailableCountryId.toString(), 'Russia', 'Kurtis', forGameId));
        this.nextAvailableCountryId++;
        myArray.push(new Country(this.nextAvailableCountryId.toString(), 'Turkey', 'Alex', forGameId));
        this.nextAvailableCountryId++;
        myArray.push(new Country(this.nextAvailableCountryId.toString(), 'Italy', 'Hootie', forGameId));

        this.allCountries[forGameId] =  myArray;

        return wasSuccessfull;

    }

    getCountries = (forGameId: string) => {

        if (! this.allCountries[forGameId]) {
            this.allCountries[forGameId] = new Array<Country>();
        }

        return this.allCountries[forGameId];
    }

    updatePlayerNameForCountry = (forGameId: string, aCountry: Country, newPlayerName: string) => {

        aCountry.playerName = newPlayerName;

    }

    deleteCountries = (forGameId: string) => {

        let successfulDeletion = true;

        if (this.allCountries[forGameId]) {
            delete this.allCountries[forGameId];
        }

        return successfulDeletion;
    }
}
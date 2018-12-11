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

        let theReturn: Country | undefined;

        this.myDataProvider.getCountries(forGameId).forEach((aCountry: Country) => {
            if (aCountry.name === aCountryName) {
                theReturn = aCountry;
            }
        });

        return theReturn;
    }

    getAllCountries = (forGameId: string) => {

        return this.myDataProvider.getCountries(forGameId);
    }

    getCountryById = (aCountryId: String, forGameId: string) => {

        let theReturn: Country | undefined;

        this.myDataProvider.getCountries(forGameId).forEach((aCountry: Country) => {
            if (aCountry.id === aCountryId) {
                theReturn = aCountry;
            }
        });

        return theReturn;

    }

    updatePlayerNameForCountry = (forGameId: string, aCountry: Country, newPlayerName: string) => {
        this.myDataProvider.updatePlayerNameForCountry(forGameId, aCountry, newPlayerName);
    }

    deleteCountries = (forGameId: string) => {
        return this.myDataProvider.deleteCountries(forGameId);
    }

}
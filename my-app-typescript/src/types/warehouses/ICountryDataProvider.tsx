import { Country } from './Country';

export interface ICountryDataProvider {
    getCountries(forGameId: string) : Country[];
    updatePlayerNameForCountry(forGameId: string, aCountry: Country, newPlayerName: string) : void;
    initializeCountries(forGameId: string) : boolean;
    deleteCountries(forGameId: string) : boolean;
} 

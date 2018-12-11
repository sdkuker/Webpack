import { Country } from './Country';

export interface ICountryWarehouse {
    getCountryByName(aCountryName: String, forGameId: string): Country | undefined;
    getAllCountries(forGameId: string) : Country[];
    getCountryById(aCountryId: String, forGameId: string): Country | undefined;
    updatePlayerNameForCountry(forGameId: string, aCountry: Country, newPlayerName: string) : void;
    initializeCountries(forGameId: string): boolean;
    deleteCountries(forGameId: string) : boolean;
} 

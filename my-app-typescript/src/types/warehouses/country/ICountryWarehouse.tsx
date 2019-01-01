import { Country } from './Country';

export interface ICountryWarehouse {
    getCountryByName(aCountryName: String, forGameId: string): Promise<Country | undefined>;
    getAllCountries(forGameId: string) : Promise<Country[]>;
    getCountryById(aCountryId: String, forGameId: string): Promise<Country | undefined>;
    updatePlayerNameForCountry(forGameId: string, aCountry: Country, newPlayerName: string) :Promise<boolean>;
    initializeCountries(forGameId: string): Promise<boolean>;
    deleteCountries(forGameId: string) : Promise<boolean>;
} 

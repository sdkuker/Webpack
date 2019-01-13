import { Country } from './Country';

export interface ICountryDataProvider {
    getCountries(forGameId: string) : Promise<Country[]>;
    updatePlayerNameForCountry(forGameId: string, aCountry: Country, newPlayerName: string) : Promise<boolean>;
    deleteCountries(forGameId: string) : Promise<boolean>;
    addCountry(countryName: string, playerName: string, forGameId: string) : Promise<Country>;
} 

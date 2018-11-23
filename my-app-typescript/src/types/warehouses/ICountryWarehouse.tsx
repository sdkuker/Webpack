import { Country } from './Country';
import { Game } from './Game';

export interface ICountryWarehouse {
    getCountryByName(aCountryName: String, forGame: Game): Country | undefined;
    getAllCountries(forGame: Game) : Country[];
    getCountryById(aCountryId: String, forGame: Game): Country | undefined;
    updatePlayerNameForCountry(forGame: Game, aCountry: Country, newPlayerName: string) : void;
} 

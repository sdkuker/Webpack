import { Country } from './Country';
import { Game } from './Game';

export interface ICountryDataProvider {
    getCountries(forGame: Game) : Country[];
    updatePlayerNameForCountry(forGame: Game, aCountry: Country, newPlayerName: string) : void;
} 

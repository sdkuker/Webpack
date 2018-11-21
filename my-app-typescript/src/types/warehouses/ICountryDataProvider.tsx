import { Country } from './Country';
import { Game } from './Game';

export interface ICountryDataProvider {
    getCountries(forGame: Game) : Country[];
} 

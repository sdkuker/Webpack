import { ICountryDataProvider } from './ICountryDataProvider';
import { Country } from './Country';
import { Game } from './Game';

export class StaticCountryDataProvider implements ICountryDataProvider {

    countries: Array<Country>;

    constructor(myCountries: Array<Country> | null) {
        if (myCountries) {
            this.countries = myCountries;
        } else {
            const staticCountries = Array<Country>();
            const myGame = new Game('1', 'myGame');
            staticCountries.push(new Country('1', 'Austria', 'Beth', myGame));
            staticCountries.push(new Country('2', 'England', 'Michelle', myGame));
            staticCountries.push(new Country('3', 'France', 'Marie', myGame));
            staticCountries.push(new Country('4', 'Germany', 'Steve', myGame));
            staticCountries.push(new Country('5', 'Russia', 'Kurtis', myGame));
            staticCountries.push(new Country('6', 'Turkey', 'Alex', myGame));
            staticCountries.push(new Country('7', 'Italy', 'Hootie', myGame));
            
            this.countries = staticCountries;
        }
    }

    getCountries = (forGame: Game) => {

        // for the static provider, ignore the game for now.
        return this.countries;
    }

    updatePlayerNameForCountry = (forGame: Game, aCountry: Country, newPlayerName: string) => {

        aCountry.playerName = newPlayerName;

    }
}
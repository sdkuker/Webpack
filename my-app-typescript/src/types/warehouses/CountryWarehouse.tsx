import { Game } from './Game';
import { Country } from './Country';
import { ICountryDataProvider } from './ICountryDataProvider';
import { observable } from 'mobx';
import { ICountryWarehouse } from './ICountryWarehouse';

export class CountryWarehouse implements ICountryWarehouse {

    @observable countries: Array<Country>;
    myGame: Game;
    myDataProvider: ICountryDataProvider;

    constructor(dataProvider: ICountryDataProvider, aGame: Game | null) {
        this.myDataProvider = dataProvider;
        if (aGame) {
            this.initializeCache(aGame);
        }
    }

    initializeCache = (forGame: Game) => {
        this.myGame = forGame;
        this.countries = this.myDataProvider.getCountries(this.myGame);
    }

    getCountryByName = (aCountryName: String, forGame: Game) => {

        if (this.myGame !== forGame) {
            this.initializeCache(forGame);
        }

        let theReturn: Country | undefined;

        this.countries.forEach((aCountry: Country) => {
            if (aCountry.name === aCountryName) {
                theReturn = aCountry;
            }
        });
        return theReturn;
    }

    getAllCountries = (forGame: Game) => {

        if (this.myGame !== forGame) {
            this.initializeCache(forGame);
        }

        return this.countries;
    }

    getCountryById = (aCountryId: String, forGame: Game) => {

        if (this.myGame !== forGame) {
            this.initializeCache(forGame);
        }

        let theReturn: Country | undefined;

        this.countries.forEach((aCountry: Country) => {
            if (aCountry.id === aCountryId) {
                theReturn = aCountry;
            }
        });

        return theReturn;

    }

    updatePlayerNameForCountry = (aGame: Game, aCountry: Country, newPlayerName: string) => {
        this.myDataProvider.updatePlayerNameForCountry(aGame, aCountry, newPlayerName);
    }

}
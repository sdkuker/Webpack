import { Game } from './Game';
import { IGameDataProvider } from './IGameDataProvider';
import { observable } from 'mobx';
import { IGameWarehouse } from './IGameWarehouse';

export class GameWarehouse implements IGameWarehouse {
   
    @observable games: Array<Game>;

    constructor(dataProvider: IGameDataProvider) {
        this.games = dataProvider.getGames();
    }

    getGameByName = (aGameName: string) => {
        let theReturn: Game   | undefined;

        this.games.forEach((aGame: Game) => {
            if (aGame.name === aGameName) {
                theReturn = aGame;
            }
        });
        return theReturn;
    }

    getAllGames = () => {
        return this.games;
    }

    getGameById = (aGameId: string) => {
        let theReturn: Game | undefined;

        this.games.forEach((aGame: Game) => {
            if (aGame.id === aGameId) {
                theReturn = aGame;
            }
        });

        return theReturn;

    }
    
}
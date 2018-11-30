import { Game } from './Game';
import { IGameDataProvider } from './IGameDataProvider';
import { observable } from 'mobx';
import { IGameWarehouse } from './IGameWarehouse';

export class GameWarehouse implements IGameWarehouse {
   
    @observable games: Array<Game>;
    dataProvider: IGameDataProvider;

    constructor(myDataProvider: IGameDataProvider) {
        this.dataProvider = myDataProvider;
        this.games = this.dataProvider.getGames();
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
    
    createGame = () => {
        let theNewGame = this.dataProvider.createGame();

        return theNewGame;
    }
}
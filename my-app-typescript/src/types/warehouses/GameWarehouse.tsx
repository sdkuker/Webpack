import { Game } from './Game';
import { IGameDataProvider } from './IGameDataProvider';
import { IGameWarehouse } from './IGameWarehouse';

export class GameWarehouse implements IGameWarehouse {
   
    dataProvider: IGameDataProvider;

    constructor(myDataProvider: IGameDataProvider) {
        this.dataProvider = myDataProvider;
    }

    getGameByName = (aGameName: string) => {
        let theReturn: Game   | undefined;

        this.dataProvider.getGames().forEach((aGame: Game) => {
            if (aGame.name === aGameName) {
                theReturn = aGame;
            }
        });
        return theReturn;
    }

    getAllGames = () => {
        return this.dataProvider.getGames();
    }

    getGameById = (aGameId: string) => {
        let theReturn: Game | undefined;

        this.dataProvider.getGames().forEach((aGame: Game) => {
            if (aGame.id === aGameId) {
                theReturn = aGame;
            }
        });

        return theReturn;

    }
    
    createGame = () => {
        let theNewGame = this.dataProvider.createGame();
        this.dataProvider.persistGame(theNewGame);

        return theNewGame;
    }

    updateGameName = (aGame: Game, newGameName: string) => {

        aGame.name = newGameName;
        
        return this.dataProvider.persistGame(aGame);
    }
}
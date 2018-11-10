import { Game } from './Game';
import { IGameDataProvider } from './IGameDataProvider';
import { observable } from 'mobx';

export class GameWarehouse {
   
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
    
}
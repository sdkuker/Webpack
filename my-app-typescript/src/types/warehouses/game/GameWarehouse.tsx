import { Game } from './Game';
import { IGameDataProvider } from './IGameDataProvider';
import { IGameWarehouse } from './IGameWarehouse';

export class GameWarehouse implements IGameWarehouse {

    dataProvider: IGameDataProvider;

    constructor(myDataProvider: IGameDataProvider) {
        this.dataProvider = myDataProvider;
    }

    getGameByName = (aGameName: string) => {

        let myPromise = new Promise<Game | undefined>((resolve, reject) => {
            this.dataProvider.getGames().then((gameArray) => {
                let theReturn: Game | undefined;
                gameArray.forEach((aGame: Game) => {
                    if (aGame.name === aGameName) {
                        theReturn = aGame;
                    }
                });
                resolve(theReturn);
            }).catch((error) => {
                reject(error);
            });
        });

        return myPromise;
    }

    getAllGames = () => {

        let myPromise = new Promise<Array<Game>>((resolve, reject) => {
            this.dataProvider.getGames().then((gameArray) => {
                resolve(gameArray);
            }).catch((error) => {
                reject(error);
            });
        });

        return myPromise;
    }

    getGameById = (aGameId: string) => {

        let myPromise = new Promise<Game | undefined>((resolve, reject) => {
            this.dataProvider.getGames().then((gameArray) => {
                let theReturn: Game | undefined;
                gameArray.forEach((aGame: Game) => {
                    if (aGame.id === aGameId) {
                        theReturn = aGame;
                    }
                });
                resolve(theReturn);
            }).catch((error) => {
                reject(error);
            });
        });

        return myPromise;
    }

    createGame = () => {

        let myPromise = new Promise<Game>((resolve, reject) => {
            this.dataProvider.createGame(null).then((newGame) => {
                resolve(newGame);
            }).catch((error) => {
                reject(error);
            });
        });

        return myPromise;
    }

    updateGameName = (aGame: Game, newGameName: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            aGame.name = newGameName;
            this.dataProvider.updateGame(aGame).then((wasGameUpdated) => {
                resolve(wasGameUpdated);
            }).catch((error) => {
                reject(error);
            });
        });

        return myPromise;
    }

    deleteGame = (aGame: Game) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            this.dataProvider.deleteGame(aGame).then((booleanResult) => {
                resolve(booleanResult);
            }).catch((error) => {
                reject(error);
            });
        });

        return myPromise;
    }
}
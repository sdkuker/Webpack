import { IGameDataProvider } from './IGameDataProvider';
import { Game } from './Game';
import { observable } from 'mobx';

export class StaticGameDataProvider implements IGameDataProvider {

    @observable
    games = new Array<Game>();
    lastUsedId = 0;

    constructor(myGames: Array<Game> | null) {
         if (myGames) {
            this.games = myGames;
        } 
    }

    getGames = () => {

        let self = this;
        let myPromise = new Promise<Array<Game>>((resolve, reject) => {
            resolve(self.games);
        });

        return myPromise;
    }

    createGame = (gameName: string | null) => {

        let myPromise = new Promise<Game>((resolve, reject) => {
            this.lastUsedId++;
            let myGameName = gameName ? gameName : 'Game Name';
            let theReturn = new Game(this.lastUsedId.toString(), myGameName);
            this.games.push(theReturn);
            resolve(theReturn);
        });

        return myPromise;
    }

    updateGame = (aGame: Game) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            // there is no real persistence so the game was updated before calling this function
            resolve(true);
        });
        
        return myPromise;
    }

    deleteGame = (aGame: Game) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            let index = 0;
            let indexOfGameToDelete = -1;
    
            for (index = 0; index < this.games.length; index++) {
                if (this.games[index].id === aGame.id) {
                    indexOfGameToDelete = index;
                }
            }
    
            if (indexOfGameToDelete > -1) {
                this.games.splice(indexOfGameToDelete, 1);
            }
            resolve(indexOfGameToDelete > -1);
        });

        return myPromise;
    }

}
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

    createGame = () => {

        let myPromise = new Promise<Game>((resolve, reject) => {
            this.lastUsedId++;
            let theReturn = new Game(this.lastUsedId.toString(), 'Game Name');
            resolve(theReturn);
        });

        return myPromise;
    }

    persistGame = (aGame: Game) => {

        let myPromise = new Promise<Game>((resolve, reject) => {
            // might be a brand new game or just a change to the name
            let i: number;
            let newGame = true;
            for (i = 0; i < this.games.length; i++) {
                if (this.games[i].id === aGame.id) {
                    newGame = false;
                }
            }
            if (newGame) {
                this.games.push(aGame);
            }
            resolve(aGame);
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
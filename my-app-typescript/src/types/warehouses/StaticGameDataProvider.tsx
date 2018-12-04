import { IGameDataProvider } from './IGameDataProvider';
import { Game } from './Game';

export class StaticGameDataProvider implements IGameDataProvider {

    games = new Array<Game>();
    lastUsedId = 0;

    constructor(myGames: Array<Game> | null) {
        if (myGames) {
            this.games = myGames;
        } 
    }

    getGames = () => {
        return this.games;
    }

    createGame = () => {

        this.lastUsedId++;
        let theReturn = new Game(this.lastUsedId.toString(), 'Game Name');

        return theReturn;
    }

    persistGame = (aGame: Game) => {

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
       
        return aGame;
    }

}
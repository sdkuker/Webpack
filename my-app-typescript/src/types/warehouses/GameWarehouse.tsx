import { Game } from './Game';
import { observable } from 'mobx';

class GameWarehouse {
   
    @observable games: Array<Game>;

    constructor() {
        this.initializeGames();
    }

    initializeGames = () => {

        const myTurns = Array<Game>();

        myTurns.push(new Game('Diplomacy - Greatest Ever'));
        myTurns.push(new Game('Diplomacy - Almost the Greatest Ever'));

        this.games = myTurns;
    }

    getGameByName = (aGameName: string) => {
        let theReturn : Game   | undefined;

        this.games.forEach((aGame: Game) => {
            if (aGame.name === aGameName) {
                theReturn = aGame;
            }
        });

        return theReturn;

    }
}

export const warehouse = new GameWarehouse();
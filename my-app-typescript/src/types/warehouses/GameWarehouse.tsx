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
}

export const warehouse = new GameWarehouse();
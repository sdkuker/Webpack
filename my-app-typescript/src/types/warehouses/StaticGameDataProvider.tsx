import { IGameDataProvider } from './IGameDataProvider';
import { Game } from './Game';

export class StaticGameDataProvider implements IGameDataProvider {

    games: Array<Game>;
    lastUsedId = 0;

    constructor(myGames: Array<Game> | null) {
        if (myGames) {
            this.games = myGames;
        } else {
            const staticGames = Array<Game>();
            staticGames.push(new Game('1', 'Diplomacy - Greatest Ever'));
            this.lastUsedId ++;
            staticGames.push(new Game('2', 'Diplomacy - Almost the Greatest Ever'));
            this.lastUsedId ++;
            this.games = staticGames;
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

}
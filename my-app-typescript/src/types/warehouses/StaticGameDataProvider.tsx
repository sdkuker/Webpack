import { IGameDataProvider } from './IGameDataProvider';
import { Game } from './Game';

export class StaticGameDataProvider implements IGameDataProvider {

    games: Array<Game>;

    constructor(myGames: Array<Game> | null) {
        if (myGames) {
            this.games = myGames;
        } else {
            const staticGames = Array<Game>();
            staticGames.push(new Game('1', 'Diplomacy - Greatest Ever'));
            staticGames.push(new Game('2', 'Diplomacy - Almost the Greatest Ever'));
            this.games = staticGames;
        }
    }

    getGames = () => {
        return this.games;
    }

}
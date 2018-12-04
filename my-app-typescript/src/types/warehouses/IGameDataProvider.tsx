import { Game } from './Game';

export interface IGameDataProvider {
    getGames(): Array<Game>;
    createGame() : Game;
    persistGame( aGame: Game) : Game;
} 

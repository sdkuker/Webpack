import { Game } from './Game';

export interface IGameDataProvider {
    getGames(): Promise<Array<Game>>;
    createGame() : Promise<Game>;
    persistGame( aGame: Game) : Promise<Game>;
    deleteGame( aGame: Game) : Promise<boolean>;
} 

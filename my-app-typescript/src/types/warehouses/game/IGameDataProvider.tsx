import { Game } from './Game';

export interface IGameDataProvider {
    getGames(): Promise<Array<Game>>;
    createGame(name: string | null) : Promise<Game>;
    updateGame( aGame: Game) : Promise<boolean>;
    deleteGame( aGame: Game) : Promise<boolean>;
} 

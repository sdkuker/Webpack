import { Game } from './Game';

export interface IGameWarehouse {
    getGameByName(aGameName: String): Promise<Game | undefined>;
    getAllGames() : Promise<Array<Game>>;
    getGameById(aGameId: String): Promise<Game | undefined>;
    createGame() : Promise<Game>;
    updateGameName(aGame: Game, newGameName: string): Promise<Game>;
    deleteGame(aGame: Game): Promise<boolean>;
} 

import { Game } from './Game';

export interface IGameWarehouse {
    getGameByName(aGameName: String): Game | undefined;
    getAllGames() : Game[];
    getGameById(aGameId: String): Game | undefined;
    createGame() : Game;
    updateGameName(aGame: Game, newGameName: string): Game;
} 

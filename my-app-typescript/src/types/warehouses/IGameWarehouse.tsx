import { Game } from './Game';

export interface IGameWarehouse {
    getGameByName(aGameName: String): Game;
    getAllGames() : Game[];
} 

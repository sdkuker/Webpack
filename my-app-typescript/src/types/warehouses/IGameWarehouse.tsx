import { Game } from './Game';

export interface IGameWarehouse {
    getGameByName(aGameName: String): Game | undefined;
    getAllGames() : Game[];
} 

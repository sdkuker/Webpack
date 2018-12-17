import { Game } from './Game';

export interface IGameCreator {
    createGame() : Promise<Game>;
    deleteGame(aGame: Game) : Promise<boolean>;
} 

import { Game } from './Game';

export interface IGameCreator {
    createGame() : Game;
    deleteGame(aGame: Game) : boolean;
} 

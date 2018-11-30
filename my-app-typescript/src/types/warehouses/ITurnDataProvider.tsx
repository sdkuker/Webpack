import { Turn } from './Turn';
import { Game } from './Game';

export interface ITurnDataProvider {
    getTurns(aGame: Game): Array<Turn>;
    persistTurn(aTurn: Turn): void;
} 

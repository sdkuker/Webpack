import { Turn } from './Turn';

export interface ITurnDataProvider {
    getTurns(aGameId: string): Array<Turn>;
    persistTurn(aTurn: Turn): void;
    deleteTurn(aTurn: Turn): boolean;
} 

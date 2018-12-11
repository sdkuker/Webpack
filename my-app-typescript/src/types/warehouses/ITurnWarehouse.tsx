import { Turn } from './Turn';
import { SeasonTypes } from './DomainTypes';

export interface ITurnWarehouse {
    getTurns (aGameId : string): Array<Turn>;
    getTurn (aGameId : string, aYear : number, aSeason : SeasonTypes) : Turn | null;
    getOpenTurn (aGameId : string) : Turn;
    generateNextTurn (aGameId: string) : Turn;
    deleteTurn(aTurn: Turn): boolean;
} 

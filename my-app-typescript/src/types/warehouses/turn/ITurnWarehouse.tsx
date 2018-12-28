import { Turn } from './Turn';
import { SeasonTypes } from '../DomainTypes';

export interface ITurnWarehouse {
    getTurns (aGameId : string): Promise<Array<Turn>>;
    getTurn (aGameId : string, aYear : number, aSeason : SeasonTypes) : Promise<Turn | null>;
    getOpenTurn (aGameId : string) : Promise<Turn>;
    generateNextTurn (aGameId: string) : Promise<Turn>;
    deleteTurn(aTurn: Turn): Promise<boolean>;
} 

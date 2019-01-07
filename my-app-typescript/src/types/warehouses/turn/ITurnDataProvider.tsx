import { Turn } from './Turn';
import { SeasonTypes, TurnStatus } from '../DomainTypes';

export interface ITurnDataProvider {
    getTurns(aGameId: string): Promise<Array<Turn>>;
    createTurn(aGameId: string, aSeason: SeasonTypes, aYear: number, aStatus: TurnStatus): Promise<Turn>;
    updateTurn(aTurn: Turn): Promise<boolean>;
    deleteTurn(aTurn: Turn): Promise<boolean>;
} 

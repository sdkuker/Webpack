import { Turn } from './Turn';
import { SeasonTypes, TurnStatus, TurnPhase } from '../DomainTypes';

export interface ITurnDataProvider {
    getTurns(aGameId: string): Promise<Array<Turn>>;
    createTurn(aGameId: string, aSeason: SeasonTypes, aYear: number, aStatus: TurnStatus, aPhase: TurnPhase): Promise<Turn>;
    updateTurn(aTurn: Turn): Promise<boolean>;
    deleteTurn(aTurn: Turn): Promise<boolean>;
} 

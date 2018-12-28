import { Turn } from './Turn';

export interface ITurnDataProvider {
    getTurns(aGameId: string): Promise<Array<Turn>>;
    createTurn(aTurn: Turn): Promise<Turn>;
    updateTurn(aTurn: Turn): Promise<boolean>;
    deleteTurn(aTurn: Turn): Promise<boolean>;
} 

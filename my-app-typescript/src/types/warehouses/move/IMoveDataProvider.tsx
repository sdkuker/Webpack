import { Move } from './Move';
import { MoveResults } from './MoveResults';

export interface IMoveDataProvider {
    getMoves(aTurnId: string, aGameId: string): Promise<Array<Move>>;
    getMoveResults(aTurnId: string): Promise<Map<string, MoveResults>>;
    deleteMove(aMove: Move): Promise<boolean>;
    updateMove(aMove: Move): Promise<boolean>;
    createMove(moveOrder: string, owningCountryName: string, turnId: string, gameId: string): Promise<Move>;
    createNonPersistentMove(aCountryName: string, aTurnId: string, aGameId: string, aNonPersistentMoveOrder: string): Promise<Move>;
} 

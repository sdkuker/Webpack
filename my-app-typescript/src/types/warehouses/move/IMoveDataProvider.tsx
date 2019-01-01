import { Move } from './Move';

export interface IMoveDataProvider {
    getMoves(aTurnId: string, aGameId: string): Promise<Array<Move>>;
    deleteMove(aMove: Move): Promise<boolean>;
    updateMove(aMove: Move): Promise<boolean>;
    createMove(moveOrder: string, owningCountryName: string, turnId: string, gameId: string): Promise<Move>;
    createNonPersistentMove(aCountryName: string, aTurnId: string, aGameId: string, aNonPersistentMoveOrder: string): Promise<Move>;
} 

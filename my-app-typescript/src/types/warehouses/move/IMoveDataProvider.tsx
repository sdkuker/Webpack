import { Move } from './Move';

export interface IMoveDataProvider {
    getMoves(aTurnId: string, aGameId: string): Array<Move>;
    deleteMove(aMove: Move): boolean;
    persistMove(aMove: Move, aNonPersistentMoveOrder: string): void;
    createNonPersistentMove(aCountryName: string, aTurnId: string, aGameId: string, aNonPersistentMoveOrder: string): Move;
} 

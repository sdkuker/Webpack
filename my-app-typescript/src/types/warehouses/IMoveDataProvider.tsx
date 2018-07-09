import { Move } from './Move';
import { Turn } from './Turn';

export interface IMoveDataProvider {
    getMoves(): Array<Move>;
    deleteMove(aMove: Move): void;
    persistMove(aMove: Move, aNonPersistentMoveOrder: string): void;
    createNonPersistentMove(aCountryName: string, aTurn: Turn, aNonPersistentMoveOrder: string): Move;
} 

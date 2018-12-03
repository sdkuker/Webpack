import { Move } from './Move';
import { Turn } from './Turn';
import { Game } from './Game';

export interface IMoveDataProvider {
    getMoves(aTurn: Turn): Array<Move>;
    deleteMove(aMove: Move): void;
    persistMove(aMove: Move, aNonPersistentMoveOrder: string): void;
    createNonPersistentMove(aCountryName: string, aTurn: Turn, aNonPersistentMoveOrder: string): Move;
} 

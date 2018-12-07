import { Move } from './Move';
import { Turn } from './Turn';
import { Piece } from './Piece';

export interface IMoveWarehouse {
    persistMove(aMove: Move): void;
    deleteMove(aMove: Move): void;
    getMoves(countryName: string, aTurn: Turn, includeNonPersistentMove: boolean | null): Array<Move>;
    createInitialMoves(aTurn: Turn, pieces: Array<Piece>): Array<Move>;
} 

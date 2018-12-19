import { Move } from './Move';
import { Piece } from '../piece/Piece';

export interface IMoveWarehouse {
    persistMove(aMove: Move): void;
    deleteMove(aMove: Move): boolean;
    getMoves(countryName: string, aTurnId: string, aGameId: string, includeNonPersistentMove: boolean | null): Array<Move>;
    createInitialMoves(aTurnId: string, aGameId: string, pieces: Array<Piece>): Array<Move>;
    deleteMoves(aTurnId: string, aGameId: string): boolean;
} 

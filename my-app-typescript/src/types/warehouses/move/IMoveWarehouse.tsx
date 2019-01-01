import { Move } from './Move';
import { Piece } from '../piece/Piece';

export interface IMoveWarehouse {
    updateMove(aMove: Move): Promise<boolean>;
    createMove(moveOrder: string, owningCountryName: string, turnId: string, gameId: string): Promise<Move>;
    deleteMove(aMove: Move): Promise<boolean>;
    getMoves(countryName: string, aTurnId: string, aGameId: string, includeNonPersistentMove: boolean | null): Promise<Array<Move>>;
    createInitialMoves(aTurnId: string, aGameId: string, pieces: Array<Piece>): Promise<Array<Move>>;
    deleteMoves(aTurnId: string, aGameId: string): Promise<boolean>;
} 

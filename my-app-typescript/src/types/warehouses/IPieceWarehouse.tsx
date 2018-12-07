import { Piece } from './Piece';
import { Turn } from './Turn';

export interface IPieceWarehouse {
    getPieces(forTurn: Turn): Array<Piece>;
} 

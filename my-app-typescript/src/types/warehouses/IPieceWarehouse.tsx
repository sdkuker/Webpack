import { Piece } from './Piece';

export interface IPieceWarehouse {
    getPieces(): Map<String, Piece>;
} 

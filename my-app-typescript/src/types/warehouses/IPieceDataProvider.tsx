import { Piece } from './Piece';

export interface IPieceDataProvider {
    getPieces(): Map<String, Piece>;
} 

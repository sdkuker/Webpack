import { Piece } from './Piece';
import { Turn } from './Turn';

export interface IPieceDataProvider {
    getPieces(forTurn: Turn): Array<Piece>;
} 

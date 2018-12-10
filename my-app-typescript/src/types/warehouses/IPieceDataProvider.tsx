import { Piece } from './Piece';
import { Turn } from './Turn';
import { Location } from './Location';
import { Game } from './Game';

export interface IPieceDataProvider {
    getPieces(forTurn: Turn): Array<Piece>;
    createPiece(forGame: Game, forTurn: Turn, theLocation: Location, 
                theLocationName: string, countryName: string, type: string): Piece;
    deletePiece(aPiece: Piece): boolean;
} 

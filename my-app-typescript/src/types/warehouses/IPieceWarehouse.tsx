import { Piece } from './Piece';
import { Turn } from './Turn';
import { Game } from './Game';
import { Location } from './Location';

export interface IPieceWarehouse {
    getPieces(forTurn: Turn): Array<Piece>;
    createPiece(forGame: Game, forTurn: Turn, theLocation: Location, 
        theLocationName: string, countryName: string, type: string): Piece;
} 

import { Piece } from '../piece/Piece';
import { Turn } from '../turn/Turn';
import { Location } from '../location/Location';
import { Game } from '../game/Game';

export interface IPieceDataProvider {
    getPieces(forTurn: Turn): Array<Piece>;
    createPiece(forGame: Game, forTurn: Turn, theLocation: Location, 
                theLocationName: string, countryName: string, type: string): Piece;
    deletePiece(aPiece: Piece): boolean;
} 

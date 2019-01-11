import { Piece } from '../piece/Piece';
import { Turn } from '../turn/Turn';
import { Game } from '../game/Game';

export interface IPieceDataProvider {
    getPieces(forTurn: Turn): Promise<Array<Piece>>;
    createPiece(forGame: Game, forTurn: Turn, 
                theLocationName: string, countryName: string, type: string): Promise<Piece>;
    deletePiece(aPiece: Piece): Promise<boolean>;
} 

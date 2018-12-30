import { Piece } from './Piece';
import { Turn } from '../turn/Turn';
import { Game } from '../game/Game';
import { Location } from '../location/Location';

export interface IPieceWarehouse {
    getPieces(forTurn: Turn): Promise<Array<Piece>>;
    createPiece(forGame: Game, forTurn: Turn, theLocation: Location, 
        theLocationName: string, countryName: string, type: string): Promise<Piece>;
    deletePieces(forTurn: Turn): Promise<boolean>;
} 

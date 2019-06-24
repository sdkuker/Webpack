import { Piece } from './Piece';
import { Turn } from '../turn/Turn';
import { Game } from '../game/Game';
import { TurnPhase } from '../DomainTypes';

export interface IPieceWarehouse {
    getPieces(forTurn: Turn, forPhase: TurnPhase): Promise<Array<Piece>>;
    createPiece(forGame: Game, forTurn: Turn, 
        theLocationName: string, countryName: string, type: string): Promise<Piece>;
    deletePieces(forTurn: Turn): Promise<boolean>;
} 

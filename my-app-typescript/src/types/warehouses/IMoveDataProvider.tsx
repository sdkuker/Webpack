import { Move } from './Move';
import { Turn } from './Turn';
import { Game } from './Game';

export interface IMoveDataProvider {
    getMoves(forGame: Game): Array<Move>;
    deleteMove(forGame: Game, aMove: Move): void;
    persistMove(forGame: Game, aMove: Move, aNonPersistentMoveOrder: string): void;
    createNonPersistentMove(forGame: Game, aCountryName: string, aTurn: Turn, aNonPersistentMoveOrder: string): Move;
} 

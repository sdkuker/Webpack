import { Move } from './Move';
import { Turn } from './Turn';
import { Game } from './Game';

export interface IMoveWarehouse {
    persistMove(forGame: Game, aMove: Move): void;
    deleteMove(forGame: Game, aMove: Move): void;
    getMoves(forGame: Game, countryName: string, aTurn: Turn | null, includeNonPersistentMove: boolean | null): Array<Move>;
} 

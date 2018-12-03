import { Move } from './Move';
import { Turn } from './Turn';
import { Game } from './Game';

export interface IMoveWarehouse {
    persistMove(aMove: Move): void;
    deleteMove(aMove: Move): void;
    getMoves(countryName: string, aTurn: Turn, includeNonPersistentMove: boolean | null): Array<Move>;
} 

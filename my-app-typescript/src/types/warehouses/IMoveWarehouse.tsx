import { Move } from './Move';
import { Turn } from './Turn';

export interface IMoveWarehouse {
    persistMove(aMove: Move): void;
    deleteMove(aMove: Move): void;
    getMoves(countryName: string, aTurn: Turn | null, includeNonPersistentMove: boolean | null): Array<Move>;
} 

import { Game } from './Game';
import { Turn } from './Turn';
import { SeasonTypes } from './DomainTypes';

export interface ITurnWarehouse {
    getTurns (aGame : Game): Array<Turn>;
    getTurn (aGame : Game, aYear : number, aSeason : SeasonTypes) : Turn | null;
} 

import { SeasonTypes, TurnStatus } from './DomainTypes';
import { Game } from './Game';

export class Turn {
    game: Game;
    season: SeasonTypes;
    year: number;
    status: TurnStatus;
    constructor(aGame: Game, aYear: number, aSeason: SeasonTypes, aStatus: TurnStatus) {
        this.game = aGame;
        this.year = aYear;
        this.season = aSeason;
        this.status = aStatus;
    }
}


import { SeasonTypes, TurnStatus } from './DomainTypes';

export class Turn {
    season: SeasonTypes;
    year: number;
    status: TurnStatus;
    constructor(aYear: number, aSeason: SeasonTypes, aStatus: TurnStatus) {
        this.year = aYear;
        this.season = aSeason;
        this.status = aStatus;
    }
}

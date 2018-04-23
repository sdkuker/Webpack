
import { SeasonTypes } from './DomainTypes';

export class Turn {
    season: SeasonTypes;
    year: number;
    constructor(aYear: number, aSeason: SeasonTypes) {
        this.year = aYear;
        this.season = aSeason;
    }
}

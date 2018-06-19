
import { SeasonTypes, TurnStatus } from './DomainTypes';
import { Game } from './Game';
import { observable } from 'mobx';

export class Turn {
    @observable game: Game;
    @observable season: SeasonTypes;
    @observable year: number;
    @observable status: TurnStatus;
    constructor(aGame: Game, aYear: number, aSeason: SeasonTypes, aStatus: TurnStatus) {
        this.game = aGame;
        this.year = aYear;
        this.season = aSeason;
        this.status = aStatus;
    }
}

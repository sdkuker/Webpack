
import { SeasonTypes, TurnStatus } from './DomainTypes';
import { Game } from './Game';
import { observable } from 'mobx';

export class Turn {
    @observable id: string;
    @observable game: Game;
    @observable season: SeasonTypes;
    @observable year: number;
    @observable status: TurnStatus;
    constructor(anId: string | null, aGame: Game, aYear: number, aSeason: SeasonTypes, aStatus: TurnStatus) {
        if (anId) {
            this.id = anId;
        }
        this.game = aGame;
        this.year = aYear;
        this.season = aSeason;
        this.status = aStatus;
    }
}

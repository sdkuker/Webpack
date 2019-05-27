
import { SeasonTypes, TurnStatus, TurnPhase } from '../DomainTypes';
import { observable } from 'mobx';

export class Turn {
    @observable id: string;
    @observable gameId: string;
    @observable season: SeasonTypes;
    @observable year: number;
    @observable status: TurnStatus;
    @observable phase: TurnPhase;
    constructor(anId: string | null, aGameId: string, aYear: number, aSeason: SeasonTypes, 
                aStatus: TurnStatus, aPhase: TurnPhase) {
        if (anId) {
            this.id = anId;
        }
        this.gameId = aGameId;
        this.year = aYear;
        this.season = aSeason;
        this.status = aStatus;
        this.phase = aPhase;
    }
}

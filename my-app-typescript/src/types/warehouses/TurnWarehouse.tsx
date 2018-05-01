import { Turn } from './Turn';
import { SeasonTypes, TurnStatus } from './DomainTypes';
import { observable } from 'mobx';


class TurnWarehouse {
   
    @observable turns: Array<Turn>;

    constructor() {
        this.initializeTurns();
    }

    initializeTurns = () => {

        const myTurns = Array<Turn>();

        myTurns.push(new Turn(1, SeasonTypes.Spring, TurnStatus.Complete));
        myTurns.push(new Turn(1, SeasonTypes.Fall, TurnStatus.Open));

        this.turns = myTurns;
    }
}

export const warehouse = new TurnWarehouse();
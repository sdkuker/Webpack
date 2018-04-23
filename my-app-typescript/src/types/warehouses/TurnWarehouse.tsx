import { Turn } from './Turn';
import { SeasonTypes } from './DomainTypes';
import { observable } from 'mobx';


class TurnWarehouse {
   
    @observable turns: Array<Turn>;

    constructor() {
        this.initializeTurns();
    }

    initializeTurns = () => {

        const myTurns = Array<Turn>();

        myTurns.push(new Turn(1, SeasonTypes.Spring));

        this.turns = myTurns;
    }
}

export const warehouse = new TurnWarehouse();
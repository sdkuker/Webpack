import { Move } from './Move';
import { Turn } from './Turn';
import { SeasonTypes, TurnStatus } from './DomainTypes';
import { observable } from 'mobx';


class MoveWarehouse {
   
    @observable moves: Array<Move>;

    constructor() {
        this.initializeMoves();
    }

    initializeMoves = () => {

        const myMoves = Array<Move>();

        myMoves.push(new Move(1, 'Fleet London movesTo North_Sea', 'England', 1, SeasonTypes.Spring));
        myMoves.push(new Move(2, 'Army Liverpool movesTo Yorkshire', 'England', 1, SeasonTypes.Spring));

        myMoves.push(new Move(3, 'Army Paris movesTo Picardy', 'France', 1, SeasonTypes.Spring));
        myMoves.push(new Move(4, 'Army Marseilles movesTo Gascony', 'France', 1, SeasonTypes.Spring));

        myMoves.push(new Move(5, 'Fleet North_Sea movesTo Norway', 'England', 1, SeasonTypes.Fall));
        myMoves.push(new Move(6, 'Army Yorkshire movesTo Wales', 'England', 1, SeasonTypes.Fall));

        myMoves.push(new Move(7, 'Army Picardy movesTo Belguim', 'France', 1, SeasonTypes.Fall));
        myMoves.push(new Move(8, 'Army Gascony movesTo Spain_(sc)', 'France', 1, SeasonTypes.Fall));


        this.moves = myMoves;
    }

    getMoves = (countryName: string, aTurn: Turn) => {

        const theReturn = Array<Move>();

        let index : number;
        for (index = 0; index < this.moves.length; index++) {
            if (this.moves[index].owningCountryName == countryName && 
                this.moves[index].turnYear == aTurn.year && 
                this.moves[index].turnSeason == aTurn.season ) {
                    theReturn.push(this.moves[index]);
                }
        }
        return theReturn;
    }

    getAllMoves = () => {
        return this.moves;
    }

    // this should only be used for testing
    setMoves = (bunchOfMoves: Array<Move>) => {
        this.moves = bunchOfMoves;
    }
}

export const warehouse = new MoveWarehouse();
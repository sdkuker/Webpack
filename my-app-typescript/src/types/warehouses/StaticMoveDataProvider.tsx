import { IMoveDataProvider } from './IMoveDataProvider';
import { Game } from './Game';
import { ITurnWarehouse } from './ITurnWarehouse';
import { SeasonTypes } from './DomainTypes';
import { Move } from './Move';
import { Turn } from './Turn';
import { observable, action } from 'mobx';

export class StaticMoveDataProvider implements IMoveDataProvider {

    @observable moves: Array<Move>;
    nextAvailableMoveKey: number = 1;
    myGame: Game;
    myTurnWarehouse: ITurnWarehouse;

    constructor(myMoves: Array<Move> | null, aGame: Game | null,
        aTurnWarehouse: ITurnWarehouse | null) {
        if (myMoves) {
            this.moves = myMoves;
        } else {
            if (aGame) {
                this.myGame = aGame;
            }
            if (aTurnWarehouse) {
                this.myTurnWarehouse = aTurnWarehouse;
            }
            if (this.myGame && this.myTurnWarehouse) {
                this.initializeMoves();
            }
        }
    }

    getMoves = (forGame: Game) => {
        if (forGame !== this.myGame) {
            this.myGame = forGame;
            this.initializeMoves();
        }
        return this.moves;
    }

    initializeMoves = () => {

        let turn1Spring = this.myTurnWarehouse.getTurn(this.myGame, 1, SeasonTypes.Spring);
        let turn1Fall = this.myTurnWarehouse.getTurn(this.myGame, 1, SeasonTypes.Fall);

        const myMoves = Array<Move>();

        if (turn1Spring && turn1Fall) {
            myMoves.push(new Move(this.nextAvailableMoveKey++,
                'Fleet London movesTo North_Sea', 'England', turn1Spring));
            myMoves.push(new Move(this.nextAvailableMoveKey++,
                'Army Liverpool movesTo Yorkshire', 'England', turn1Spring));
            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Army Paris movesTo Picardy', 'France', turn1Spring));
            myMoves.push(new Move(this.nextAvailableMoveKey++,
                'Army Marseilles movesTo Gascony', 'France', turn1Spring));

            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Fleet North_Sea movesTo Norway', 'England', turn1Fall));
            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Army Yorkshire movesTo Wales', 'England', turn1Fall));

            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Army Picardy movesTo Belguim', 'France', turn1Fall));
            myMoves.push(new Move(this.nextAvailableMoveKey++, 'Army Gascony movesTo Spain_(sc)', 'France', turn1Fall));

        }

        this.moves = myMoves;
    }

    @action
    deleteMove = (forGame: Game, aMove: Move) => {
        if (forGame !== this.myGame) {
            this.myGame = forGame;
            this.initializeMoves();
        }

        let i: number;
        for (i = 0; i < this.moves.length; i++) {
            if (this.moves[i].id === aMove.id) {
                this.moves.splice(i, 1);
            }
        }
    }
    @action
    persistMove = (forGame: Game, aMove: Move, aNonPersistentMoveOrder: string) => {

        if (forGame !== this.myGame) {
            this.myGame = forGame;
            this.initializeMoves();
        }
        if (aMove.order !== aNonPersistentMoveOrder) {
            if (aMove.id === (this.nextAvailableMoveKey - 1)) {
                this.moves.push(aMove);
            }
        }
    }

    @action
    createNonPersistentMove = (forGame: Game, aCountryName: string, aTurn: Turn, aNonPersistentMoveOrder: string) => {
        if (forGame !== this.myGame) {
            this.myGame = forGame;
            this.initializeMoves();
        }
        return new Move(this.nextAvailableMoveKey++, aNonPersistentMoveOrder, aCountryName, aTurn);
    }
}
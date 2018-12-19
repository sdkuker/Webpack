import { Game } from './game/Game';
import { Turn } from './turn/Turn';
import { LocationTypes } from './DomainTypes';
import { IGameCreator } from './IGameCreator';
import { IGameWarehouse } from './game/IGameWarehouse';
import { IMoveWarehouse } from './move/IMoveWarehouse';
import { ITurnWarehouse } from './turn/ITurnWarehouse';
import { IPieceWarehouse } from './piece/IPieceWarehouse';
import { Warehouse as LocationWarehouse } from './location/LocationWarehouse';
import { ICountryWarehouse } from './country/ICountryWarehouse';

export class GameCreator implements IGameCreator {

    gameWarehouse: IGameWarehouse;
    turnWarehouse: ITurnWarehouse;
    pieceWarehouse: IPieceWarehouse;
    moveWarehouse: IMoveWarehouse;
    countryWarehouse: ICountryWarehouse;

    constructor(
        myGameWarehouse: IGameWarehouse, myTurnWarehouse: ITurnWarehouse,
        myPieceWarehouse: IPieceWarehouse, myMoveWarehouse: IMoveWarehouse,
        myCountryWarehouse: ICountryWarehouse) {
        this.gameWarehouse = myGameWarehouse;
        this.turnWarehouse = myTurnWarehouse;
        this.pieceWarehouse = myPieceWarehouse;
        this.moveWarehouse = myMoveWarehouse;
        this.countryWarehouse = myCountryWarehouse;
    }

    deleteGame = (aGame: Game) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            let everythingDeleted = true;
            let turnsForGame = this.turnWarehouse.getTurns(aGame.id);
            let index = turnsForGame.length;
            while (index--) {
                let movesForTurnDeleted = this.moveWarehouse.deleteMoves(   turnsForGame[index].id,
                                                                            turnsForGame[index].gameId);
                let piecesForTurnDeleted = this.pieceWarehouse.deletePieces(turnsForGame[index]);
                let turnDeleted = this.turnWarehouse.deleteTurn(turnsForGame[index]);
                everythingDeleted = everythingDeleted && movesForTurnDeleted &&
                    piecesForTurnDeleted && turnDeleted;
            }
            let countriesDeleted = this.countryWarehouse.deleteCountries(aGame.id);
            this.gameWarehouse.deleteGame(aGame).then((wasGameDeletionSuccessful) => {
                everythingDeleted = everythingDeleted && countriesDeleted && wasGameDeletionSuccessful;
                resolve(everythingDeleted);
            }).catch((error) => {
                reject(error);
            });
        });

        return myPromise;
    }

    createGame = () => {

        let myPromise = new Promise<Game>((resolve, reject) => {
            this.gameWarehouse.createGame().then((newGame) => {
                let initialTurn = this.turnWarehouse.generateNextTurn(newGame.id);
                let initialPieces = this.createInitialPieces(newGame, initialTurn);
                let initialMoves = this.moveWarehouse.createInitialMoves(initialTurn.id, newGame.id, initialPieces);
                let countriesCreated = this.countryWarehouse.initializeCountries(newGame.id);
                resolve(newGame);
            }).catch((error) => {
                reject(error);
            });
        });

        return myPromise;
    }

    createInitialPieces = (theNewGame: Game, initialTurn: Turn) => {

        this.createPiece(theNewGame, initialTurn, 'Vienna', 'Austria', 'Army');
        this.createPiece(theNewGame, initialTurn, 'Budapest', 'Austria', 'Army');
        this.createPiece(theNewGame, initialTurn, 'Trieste', 'Austria', 'Fleet');

        this.createPiece(theNewGame, initialTurn, 'London', 'England', 'Fleet');
        this.createPiece(theNewGame, initialTurn, 'Edinburgh', 'England', 'Fleet');
        this.createPiece(theNewGame, initialTurn, 'Liverpool', 'England', 'Army');

        this.createPiece(theNewGame, initialTurn, 'Paris', 'France', 'Army');
        this.createPiece(theNewGame, initialTurn, 'Marseilles', 'France', 'Army');
        this.createPiece(theNewGame, initialTurn, 'Brest', 'France', 'Fleet');

        this.createPiece(theNewGame, initialTurn, 'Berlin', 'Germany', 'Army');
        this.createPiece(theNewGame, initialTurn, 'Munich', 'Germany', 'Army');
        this.createPiece(theNewGame, initialTurn, 'Kiel', 'Germany', 'Fleet');

        this.createPiece(theNewGame, initialTurn, 'Rome', 'Italy', 'Army');
        this.createPiece(theNewGame, initialTurn, 'Venice', 'Italy', 'Army');
        this.createPiece(theNewGame, initialTurn, 'Naples', 'Italy', 'Fleet');

        this.createPiece(theNewGame, initialTurn, 'Moscow', 'Russia', 'Army');
        this.createPiece(theNewGame, initialTurn, 'Sevastopol', 'Russia', 'Fleet');
        this.createPiece(theNewGame, initialTurn, 'StPetersburg_sc', 'Russia', 'Fleet');
        this.createPiece(theNewGame, initialTurn, 'Warsaw', 'Russia', 'Army');

        this.createPiece(theNewGame, initialTurn, 'Ankara', 'Turkey', 'Fleet');
        this.createPiece(theNewGame, initialTurn, 'Constantinople', 'Turkey', 'Army');
        this.createPiece(theNewGame, initialTurn, 'Smyrna', 'Turkey', 'Army');

        return this.pieceWarehouse.getPieces(initialTurn);
    }

    createPiece = ( theNewGame: Game, initialTurn: Turn, locationName: string, countryName: string,
                    pieceType: string) => {

        const myLocation = this.findLocation(locationName);

        if (myLocation) {
            this.pieceWarehouse.createPiece(theNewGame, initialTurn, myLocation, locationName, countryName, pieceType);
        }
    }

    findLocation = (locationName: string) => {

        const myLocations = LocationWarehouse.locations;
        const locationKey: string = locationName + LocationTypes.Piece;

        return myLocations.get(locationKey);

    }

}
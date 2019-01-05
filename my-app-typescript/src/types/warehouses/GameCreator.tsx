import { Game } from './game/Game';
import { Turn } from './turn/Turn';
import { Piece } from './piece/Piece';
import { LocationTypes } from './DomainTypes';
import { IGameCreator } from './IGameCreator';
import { IGameWarehouse } from './game/IGameWarehouse';
import { IMoveWarehouse } from './move/IMoveWarehouse';
import { ITurnWarehouse } from './turn/ITurnWarehouse';
import { IPieceWarehouse } from './piece/IPieceWarehouse';
import { Warehouse as LocationWarehouse } from './location/LocationWarehouse';
import { ICountryWarehouse } from './country/ICountryWarehouse';
import { ICapitalWarehouse } from './capital/ICapitalWarehouse';

export class GameCreator implements IGameCreator {

    gameWarehouse: IGameWarehouse;
    turnWarehouse: ITurnWarehouse;
    pieceWarehouse: IPieceWarehouse;
    moveWarehouse: IMoveWarehouse;
    countryWarehouse: ICountryWarehouse;
    capitalWarehouse: ICapitalWarehouse;

    constructor(
        myGameWarehouse: IGameWarehouse, myTurnWarehouse: ITurnWarehouse,
        myPieceWarehouse: IPieceWarehouse, myMoveWarehouse: IMoveWarehouse,
        myCountryWarehouse: ICountryWarehouse, myCapitalWarehouse: ICapitalWarehouse) {
        this.gameWarehouse = myGameWarehouse;
        this.turnWarehouse = myTurnWarehouse;
        this.pieceWarehouse = myPieceWarehouse;
        this.moveWarehouse = myMoveWarehouse;
        this.countryWarehouse = myCountryWarehouse;
        this.capitalWarehouse = myCapitalWarehouse;
    }

    deleteGame = (aGame: Game) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            const deleteEverythingPromiseArray = Array<Promise<boolean>>();
            this.turnWarehouse.getTurns(aGame.id).then((turnsForGame) => {
                let index = turnsForGame.length;
                while (index--) {
                    deleteEverythingPromiseArray.push(this.moveWarehouse.deleteMoves(turnsForGame[index].id,
                        turnsForGame[index].gameId));
                    deleteEverythingPromiseArray.push(this.pieceWarehouse.deletePieces(turnsForGame[index]));
                    deleteEverythingPromiseArray.push(this.capitalWarehouse.deleteCapitals(turnsForGame[index].id));
                    deleteEverythingPromiseArray.push(this.turnWarehouse.deleteTurn(turnsForGame[index]));
                }
                deleteEverythingPromiseArray.push(this.countryWarehouse.deleteCountries(aGame.id));
                deleteEverythingPromiseArray.push(this.gameWarehouse.deleteGame(aGame));
                Promise.all(deleteEverythingPromiseArray).then((arrayOfBooleanResponses) => {
                    resolve(true);
                }).catch((error) => {
                    reject('error deleting something' + error);
                });
            }).catch((error) => {
                reject('unable to get turns for a game when trying to delete the game - ' + error);
            });
        });

        return myPromise;
    }

    createGame = () => {

        let myPromise = new Promise<Game>((resolve, reject) => {
            this.gameWarehouse.createGame().then((newGame) => {
                this.turnWarehouse.generateNextTurn(newGame.id).then((initialTurn) => {
                    this.createInitialPieces(newGame, initialTurn).then((initialPieces) => {
                        this.moveWarehouse.createInitialMoves(initialTurn.id, newGame.id, initialPieces).
                            then((initialMovesArray) => {
                                this.countryWarehouse.initializeCountries(newGame.id).then((countriesCreated) => {
                                    this.capitalWarehouse.initilizeCapitals(initialTurn.id).
                                                then((capitalsInitialized) => {
                                        resolve(newGame);
                                    }).catch((error) => {
                                        reject(error);
                                    });  
                                }).catch((error) => {
                                    reject(error);
                                });
                            }).catch((error) => {
                                reject(error);
                            });
                    }).catch((error) => {
                        reject(error);
                    });
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });

        return myPromise;
    }

    createInitialPieces = (theNewGame: Game, initialTurn: Turn) => {

        let myPromise = new Promise<Array<Piece>>((resolve, reject) => {

            let arrayOfPromises = new Array<Promise<Piece>>();

            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Vienna', 'Austria', 'Army'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Budapest', 'Austria', 'Army'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Trieste', 'Austria', 'Fleet'));

            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'London', 'England', 'Fleet'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Edinburgh', 'England', 'Fleet'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Liverpool', 'England', 'Army'));

            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Paris', 'France', 'Army'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Marseilles', 'France', 'Army'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Brest', 'France', 'Fleet'));

            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Berlin', 'Germany', 'Army'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Munich', 'Germany', 'Army'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Kiel', 'Germany', 'Fleet'));

            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Rome', 'Italy', 'Army'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Venice', 'Italy', 'Army'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Naples', 'Italy', 'Fleet'));

            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Moscow', 'Russia', 'Army'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Sevastopol', 'Russia', 'Fleet'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'StPetersburg_sc', 'Russia', 'Fleet'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Warsaw', 'Russia', 'Army'));

            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Ankara', 'Turkey', 'Fleet'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Constantinople', 'Turkey', 'Army'));
            arrayOfPromises.push(this.createPiece(theNewGame, initialTurn, 'Smyrna', 'Turkey', 'Army'));

            Promise.all(arrayOfPromises).then((values) => {
                this.pieceWarehouse.getPieces(initialTurn).then((myPieces) => {
                    resolve(myPieces);
                }).catch((error) => {
                    reject('unable to get pieces after creating them' + error);
                });
            }).catch((error) => {
                reject('unable to create at least 1 piece' + error);
            });
        });

        return myPromise;
    }

    createPiece = ( theNewGame: Game, initialTurn: Turn, locationName: string, countryName: string,
                    pieceType: string) => {

        let myPromise = new Promise<Piece>((resolve, reject) => {
            const myLocation = this.findLocation(locationName);
            if (myLocation) {
                this.pieceWarehouse.createPiece(theNewGame, initialTurn, myLocation,
                    locationName, countryName, pieceType).then((newPiece) => {
                        resolve(newPiece);
                    }).catch((error) => {
                        reject(error);
                    });
            }
        });

        return myPromise;
    }

    findLocation = (locationName: string) => {

        const myLocations = LocationWarehouse.locations;
        const locationKey: string = locationName + LocationTypes.Piece;

        return myLocations.get(locationKey);

    }

}
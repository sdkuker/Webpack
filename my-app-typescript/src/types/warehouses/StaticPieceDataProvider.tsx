import { IPieceDataProvider } from './IPieceDataProvider';
import { Warehouse as LocationWarehouse } from './LocationWarehouse';
import { Piece } from './Piece';
import { Turn } from './Turn';
import { observable } from 'mobx';
import { LocationTypes, SeasonTypes } from './DomainTypes';
import { Location } from './Location';

export class StaticPieceDataProvider implements IPieceDataProvider {

    // contains all the pieces for a single turn
    @observable pieces: Array<Piece>;
    piecesTurnId: string;
    nextAvailablePieceKey = 0;
    // the key to the outer map is the game id.  The key to the inner map is the turn id
    allPieces: Map<string, Map<string, Array<Piece>>> = new Map();

    getPieces = (forTurn: Turn) => {

        this.adjustCacheForTurn(forTurn);

        if ((this.pieces.length === 0) && forTurn.year === 1 && forTurn.season === SeasonTypes.Spring) {
            let initializedPieces = this.initializePieces();
             // @ts-ignore
            this.allPieces.get(forTurn.game.id).set(forTurn.id, initializedPieces);
            this.pieces = initializedPieces;
        }

        return this.pieces;
    }

    adjustCacheForTurn = (aTurn: Turn) => {

        if (aTurn.id !== this.piecesTurnId) {
            if (this.allPieces.get(aTurn.game.id)) {  // have a map for the turn
                // @ts-ignore
                if (!this.allPieces.get(aTurn.game.id).get(aTurn.id)) { // no moves for the turn
                    // @ts-ignore
                    this.allPieces.get(aTurn.game.id).set(aTurn.id, new Array<Piece>());
                }
            } else {  // no map for the game - add an empty map
                this.allPieces.set(aTurn.game.id, new Map<string, Array<Piece>>());
                // also add an array for this turn
                // @ts-ignore
                this.allPieces.get(aTurn.game.id).set(aTurn.id, new Array<Piece>());
            }

            // @ts-ignore
            this.pieces = this.allPieces.get(aTurn.game.id).get(aTurn.id);
            this.piecesTurnId = aTurn.id;
        }
    }

    initializePieces = () => {

        const myArray = new Array<Piece>();
        const myLocations = LocationWarehouse.locations;

        this.insertPiece(myArray, myLocations, 'Vienna', 'Austria', 'Army');
        this.insertPiece(myArray, myLocations, 'Budapest', 'Austria', 'Army');
        this.insertPiece(myArray, myLocations, 'Trieste', 'Austria', 'Fleet');

        this.insertPiece(myArray, myLocations, 'London', 'England', 'Fleet');
        this.insertPiece(myArray, myLocations, 'Edinburgh', 'England', 'Fleet');
        this.insertPiece(myArray, myLocations, 'Liverpool', 'England', 'Army');

        this.insertPiece(myArray, myLocations, 'Paris', 'France', 'Army');
        this.insertPiece(myArray, myLocations, 'Marseilles', 'France', 'Army');
        this.insertPiece(myArray, myLocations, 'Brest', 'France', 'Fleet');

        this.insertPiece(myArray, myLocations, 'Berlin', 'Germany', 'Army');
        this.insertPiece(myArray, myLocations, 'Munich', 'Germany', 'Army');
        this.insertPiece(myArray, myLocations, 'Kiel', 'Germany', 'Fleet');

        this.insertPiece(myArray, myLocations, 'Rome', 'Italy', 'Army');
        this.insertPiece(myArray, myLocations, 'Venice', 'Italy', 'Army');
        this.insertPiece(myArray, myLocations, 'Naples', 'Italy', 'Fleet');

        this.insertPiece(myArray, myLocations, 'Moscow', 'Russia', 'Army');
        this.insertPiece(myArray, myLocations, 'Sevastopol', 'Russia', 'Fleet');
        this.insertPiece(myArray, myLocations, 'StPetersburg', 'Russia', 'Fleet');
        this.insertPiece(myArray, myLocations, 'Warsaw', 'Russia', 'Army');

        this.insertPiece(myArray, myLocations, 'Ankara', 'Turkey', 'Fleet');
        this.insertPiece(myArray, myLocations, 'Constantinople', 'Turkey', 'Army');
        this.insertPiece(myArray, myLocations, 'Smyrna', 'Turkey', 'Army');

        return myArray;
    }

    insertPiece = ( pieceArray: Array<Piece>, locationMap: Map<String, Location>,
                    locationName: string, countryName: string, type: string) => {
        const locationKey: string = locationName + LocationTypes.Piece;
        const theLocation: Location | undefined = locationMap.get(locationKey);
        if (theLocation) {
            this.nextAvailablePieceKey++;
            const thePiece = new Piece(this.nextAvailablePieceKey.toString(), countryName, theLocation, type);
            pieceArray.push(thePiece);
        }
    }
}
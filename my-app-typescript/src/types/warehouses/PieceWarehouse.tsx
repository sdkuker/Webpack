import { Warehouse as LocationWarehouse } from './LocationWarehouse';
import { Piece } from './Piece';
import { observable } from 'mobx';
import { PieceTypes, LocationTypes } from './DomainTypes';
import { Location } from './Location';

class PieceWarehouse {
   
    @observable pieces: Map<String, Piece>;

    constructor() {
        this.initializePieces();
    }

    initializePieces = () => {

        const myMap = new Map<String, Piece>();
        const myLocations = LocationWarehouse.locations;

        this.insertPiece(myMap, myLocations, 'Vienna', 'Austria', 'Army');
        this.insertPiece(myMap, myLocations, 'Budapest', 'Austria', 'Army');
        this.insertPiece(myMap, myLocations, 'Trieste', 'Austria', 'Fleet');

        this.insertPiece(myMap, myLocations, 'London', 'England', 'Fleet');
        this.insertPiece(myMap, myLocations, 'Edinburgh', 'England', 'Fleet');
        this.insertPiece(myMap, myLocations, 'Liverpool', 'England', 'Army');

        this.insertPiece(myMap, myLocations, 'Paris', 'France', 'Army');
        this.insertPiece(myMap, myLocations, 'Marseilles', 'France', 'Army');
        this.insertPiece(myMap, myLocations, 'Brest', 'France', 'Fleet');

        this.insertPiece(myMap, myLocations, 'Berlin', 'Germany', 'Army');
        this.insertPiece(myMap, myLocations, 'Munich', 'Germany', 'Army');
        this.insertPiece(myMap, myLocations, 'Kiel', 'Germany', 'Fleet');

        this.insertPiece(myMap, myLocations, 'Rome', 'Italy', 'Army');
        this.insertPiece(myMap, myLocations, 'Venice', 'Italy', 'Army');
        this.insertPiece(myMap, myLocations, 'Naples', 'Italy', 'Fleet');

        this.insertPiece(myMap, myLocations, 'Moscow', 'Russia', 'Army');
        this.insertPiece(myMap, myLocations, 'Sevastopol', 'Russia', 'Fleet');
        this.insertPiece(myMap, myLocations, 'StPetersburg', 'Russia', 'Fleet');
        this.insertPiece(myMap, myLocations, 'Warsaw', 'Russia', 'Army');

        this.insertPiece(myMap, myLocations, 'Ankara', 'Turkey', 'Fleet');
        this.insertPiece(myMap, myLocations, 'Constantinople', 'Turkey', 'Army');
        this.insertPiece(myMap, myLocations, 'Smyrna', 'Turkey', 'Army');

        this.pieces = myMap;
    }

    insertPiece = (pieceMap: Map<String, Piece>, locationMap: Map<String, Location>, 
                   locationName: string, countryName: string, type: string) => {
        const locationKey: string  = locationName + LocationTypes.Piece;
        const theLocation: Location | undefined =  locationMap.get(locationKey);
        if (theLocation) {
            const thePiece = new Piece(countryName, theLocation, type);
            pieceMap.set(locationName + type, thePiece);
        }
    }

}

export const warehouse = new PieceWarehouse();
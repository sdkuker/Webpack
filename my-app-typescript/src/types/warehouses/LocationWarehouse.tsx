import { Location } from './Location';

class LocationWarehouse {

    LocationTypes = Object.freeze({
        CAPITAL: " - Capital",
        PIECE : " - Piece"
    });

    locations = new Map<String, Location>();

    constructor() {
        this.initilizeLocations();
    };

    public getLocations = () => {
        return this.locations;
    }
   
    initilizeLocations = () => {

        const myMap = new Map<String, Location>();

        myMap.set('Switzerland' + this.LocationTypes.PIECE, new Location('219', '376'));
        myMap.set('Adriatic_Sea' + this.LocationTypes.PIECE, new Location('296', '441'));
        myMap.set('Aegean_Sea' + this.LocationTypes.PIECE, new Location('403', '524'));
        myMap.set('Albania' + this.LocationTypes.PIECE, new Location('339', '469'));
        myMap.set('Ankara' + this.LocationTypes.CAPITAL, new Location('482', '469'));
        myMap.set('Ankara' + this.LocationTypes.PIECE, new Location('500', '460'));


        myMap.set('London' + this.LocationTypes.CAPITAL, new Location('162', '290'));
        myMap.set('London' + this.LocationTypes.PIECE,  new Location('162', '281'));

        this.locations = myMap;
    }

}

export const Warehouse = new LocationWarehouse();
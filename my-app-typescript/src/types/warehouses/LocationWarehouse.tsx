import { Location } from './Location';

class LocationWarehouse {

    LocationTypes = Object.freeze({
        CAPITAL: " - Capital",
        PIECE : " - Piece"
    });
   
    public getLocations = () => {
        const myMap = {};
        myMap['Switzerland' + this.LocationTypes.PIECE] = new Location('219', '376');
        myMap['Adriatic_Sea' + this.LocationTypes.PIECE] = new Location('296', '441');
        myMap['Aegean_Sea' + this.LocationTypes.PIECE] = new Location('403', '524');
        myMap['Albania' + this.LocationTypes.PIECE] = new Location('339', '469');
        myMap['Ankara' + this.LocationTypes.CAPITAL] = new Location('482', '469');
        myMap['Ankara' + this.LocationTypes.PIECE] = new Location('500', '460');


        myMap['London' + this.LocationTypes.CAPITAL] = new Location('162', '290');
        myMap['London' + this.LocationTypes.PIECE] = new Location('162', '281');

        return [myMap];
    }

}

export const myWarehouse = new LocationWarehouse();
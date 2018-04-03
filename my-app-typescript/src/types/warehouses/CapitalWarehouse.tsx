import { Capital } from './Capital';
import { Warehouse as LocationWarehouse } from './LocationWarehouse';
import { Location } from './Location';
import { observable } from 'mobx';

class CapitalWarehouse {
   
    @observable capitals = new Map<String, Capital>();

    constructor() {
        this.initilizeCapitals();
    };

    initilizeCapitals = () => {

        const myMap = new Map<String, Capital>();
        const myLocations = LocationWarehouse.getLocations();

        this.insertCapital(myMap, myLocations, 'London', 'Englnd');
        
        // myMap.set('London' + this.LocationTypes.PIECE,  new Location('162', '281'));

        this.capitals = myMap;
    }

    insertCapital = (capitalMap : Map<String, Capital>, locationMap : Map<String, Location>, capitalName : string, countryName : string) => {
        const capitalKey : string  = capitalName + LocationWarehouse.LocationTypes.CAPITAL;
        const theLocation : Location | undefined =  locationMap.get(capitalKey);
        if (theLocation) {
            const theCapital = new Capital(capitalName, countryName, theLocation);
            capitalMap.set('London' + LocationWarehouse.LocationTypes.PIECE, theCapital);
        }
    }

}

export const warehouse = new CapitalWarehouse();
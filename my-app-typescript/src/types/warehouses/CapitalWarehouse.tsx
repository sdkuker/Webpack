import { Capital } from './Capital';
import { Warehouse as LocationWarehouse } from './LocationWarehouse';
import { Location } from './Location';
import { observable } from 'mobx';

class CapitalWarehouse {
   
    @observable capitals: Map<String, Capital>;

    constructor() {
        this.initilizeCapitals();
    }

    initilizeCapitals = () => {

        const myMap = new Map<String, Capital>();
        const myLocations = LocationWarehouse.getLocations();

        this.insertCapital(myMap, myLocations, 'Vienna', 'Austria');
        this.insertCapital(myMap, myLocations, 'Budapest', 'Austria');
        this.insertCapital(myMap, myLocations, 'Trieste', 'Austria');

        this.insertCapital(myMap, myLocations, 'London', 'England');
        this.insertCapital(myMap, myLocations, 'Edinburgh', 'England');
        this.insertCapital(myMap, myLocations, 'Liverpool', 'England');

        this.insertCapital(myMap, myLocations, 'Paris', 'France');
        this.insertCapital(myMap, myLocations, 'Marseilles', 'France');
        this.insertCapital(myMap, myLocations, 'Brest', 'France');

        this.insertCapital(myMap, myLocations, 'Berlin', 'Germany');
        this.insertCapital(myMap, myLocations, 'Munich', 'Germany');
        this.insertCapital(myMap, myLocations, 'Kiel', 'Germany');

        this.insertCapital(myMap, myLocations, 'Rome', 'Italy');
        this.insertCapital(myMap, myLocations, 'Venice', 'Italy');
        this.insertCapital(myMap, myLocations, 'Naples', 'Italy');

        this.insertCapital(myMap, myLocations, 'Moscow', 'Russia');
        this.insertCapital(myMap, myLocations, 'Sevastopol', 'Russia');
        this.insertCapital(myMap, myLocations, 'StPetersburg', 'Russia');
        this.insertCapital(myMap, myLocations, 'Warsaw', 'Russia');

        this.insertCapital(myMap, myLocations, 'Ankara', 'Turkey');
        this.insertCapital(myMap, myLocations, 'Constantinople', 'Turkey');
        this.insertCapital(myMap, myLocations, 'Smyrna', 'Turkey');
        
        // myMap.set('London' + this.LocationTypes.PIECE,  new Location('162', '281'));

        this.capitals = myMap;
    }

    insertCapital = (capitalMap: Map<String, Capital>, locationMap: Map<String, Location>, 
                     capitalName: string, countryName: string) => {
        const capitalKey: string  = capitalName + LocationWarehouse.LocationTypes.CAPITAL;
        const theLocation: Location | undefined =  locationMap.get(capitalKey);
        if (theLocation) {
            const theCapital = new Capital(capitalName, countryName, theLocation);
            capitalMap.set(capitalName + LocationWarehouse.LocationTypes.PIECE, theCapital);
        }
    }

}

export const warehouse = new CapitalWarehouse();
import { Capital } from './Capital';
import { Warehouse as LocationWarehouse } from './LocationWarehouse';
import { Location } from './Location';
import { observable } from 'mobx';
import { LocationTypes } from './DomainTypes';

class CapitalWarehouse {
   
    @observable capitals: Map<String, Capital>;

    constructor() {
        this.initilizeCapitals();
    }

    initilizeCapitals = () => {

        const myMap = new Map<String, Capital>();
        const myLocations = LocationWarehouse.locations;

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

        this.insertCapital(myMap, myLocations, 'Portugal', 'unowned');
        this.insertCapital(myMap, myLocations, 'Spain', 'unowned');
        this.insertCapital(myMap, myLocations, 'Norway', 'unowned');
        this.insertCapital(myMap, myLocations, 'Sweden', 'unowned');
        this.insertCapital(myMap, myLocations, 'Denmark', 'unowned');
        this.insertCapital(myMap, myLocations, 'Rumania', 'unowned');
        this.insertCapital(myMap, myLocations, 'Serbia', 'unowned');
        this.insertCapital(myMap, myLocations, 'Bulgaria', 'unowned');
        this.insertCapital(myMap, myLocations, 'Greece', 'unowned');
        this.insertCapital(myMap, myLocations, 'Tunis', 'unowned');
        this.insertCapital(myMap, myLocations, 'Holland', 'unowned');
        this.insertCapital(myMap, myLocations, 'Belgium', 'unowned');

        this.capitals = myMap;
    }

    insertCapital = (capitalMap: Map<String, Capital>, locationMap: Map<String, Location>, 
                     locationName: string, countryName: string) => {
        const capitalKey: string  = locationName + LocationTypes.Capital;
        const theLocation: Location | undefined =  locationMap.get(capitalKey);
        if (theLocation) {
            const theCapital = new Capital(locationName, countryName, theLocation);
            capitalMap.set(locationName + LocationTypes.Piece, theCapital);
        }
    }

}

export const warehouse = new CapitalWarehouse();
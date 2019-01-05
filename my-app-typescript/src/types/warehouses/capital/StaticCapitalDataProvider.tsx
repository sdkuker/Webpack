import { ICapitalDataProvider } from './ICapitalDataProvider';
import { Capital } from './Capital';
import { Warehouse as LocationWarehouse } from '../location/LocationWarehouse';
import { Location } from '../location/Location';
import { LocationTypes } from '../DomainTypes';

export class StaticCapitalDataProvider implements ICapitalDataProvider {

    // allCapitals: { [gameId: string]: Array<Capital> } = {};

    // the outer map key is the turn id.  the inner map key is the location/capital name
    allCapitals = new Map<string, Map<string, Capital>>();
    nextAvailableCapitalId = 0;
    allLocations = LocationWarehouse.locations;

    constructor(aTurnId: string | null, myCapitals: Array<Capital> | null) {

        if (aTurnId && myCapitals) {
            this.allCapitals[aTurnId] = myCapitals;
        }
    }

    getCapitals = (aTurnId: string) => {

        let myPromise = new Promise<Map<string, Capital>>((resolve, reject) => {

            if (!this.allCapitals.get(aTurnId)) {
                this.allCapitals.set(aTurnId, new Map<string, Capital>());
            }
            resolve(this.allCapitals.get(aTurnId));
        });

        return myPromise;
    }

    deleteCapitals = (aTurnId: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {

            if (this.allCapitals.get(aTurnId)) {
                this.allCapitals.set(aTurnId, new Map<string, Capital>());
                resolve(true);
            } else {
                resolve(false);
            }
        });

        return myPromise;

    }

    createCapital = (aTurnId: string, capitalName: string, forCountryName: string) => {

        let myPromise = new Promise<Capital>((resolve, reject) => {

            if (!this.allCapitals.get(aTurnId)) {
                this.allCapitals.set(aTurnId, new Map<string, Capital>());
            }

            const capitalKey: string = capitalName + LocationTypes.Capital;
            const theLocation: Location | undefined = this.allLocations.get(capitalKey);

            if (theLocation) {
                this.nextAvailableCapitalId++;
                const theCapital = new Capital(this.nextAvailableCapitalId.toString(), capitalName,
                    forCountryName, theLocation);
                // @ts-ignore
                this.allCapitals.get(aTurnId).set(capitalKey, theCapital);
                resolve(theCapital);
            } else {
                reject('unable to find a location for the capital');
            }
        });

        return myPromise;
    }
}
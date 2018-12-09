import { observable } from 'mobx';
import { Location } from './Location';

export class Piece {
    id: string;
    @observable owningCountryName: string;
    @observable location: Location;
    type: string;
    locationName: string;
    turnId: string;

    constructor(anId: string | null, aTurnId: string, anOwningCountryName: string, aLocation: Location, 
                aLocationName: string, aType: string) {
        if (anId) {
            this.id = anId;
        }
        this.turnId = aTurnId;
        this.owningCountryName = anOwningCountryName;
        this.location = aLocation;
        this.locationName = aLocationName;
        this.type = aType;
    }
}

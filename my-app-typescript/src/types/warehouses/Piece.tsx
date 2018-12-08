import { observable } from 'mobx';
import { Location } from './Location';

export class Piece {
    id: string;
    @observable owningCountryName: string;
    @observable location: Location;
    type: string;
    locationName: string;

    constructor(anId: string | null, anOwningCountryName: string, aLocation: Location, 
                aLocationName: string, aType: string) {
        if (anId) {
            this.id = anId;
        }
        this.owningCountryName = anOwningCountryName;
        this.location = aLocation;
        this.locationName = aLocationName;
        this.type = aType;
    }
}

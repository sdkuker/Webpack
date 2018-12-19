import { observable } from 'mobx';
import { Location } from '../location/Location';
import { Turn } from '../turn/Turn';

export class Piece {
    id: string;
    @observable owningCountryName: string;
    @observable location: Location;
    type: string;
    locationName: string;
    turn: Turn;

    constructor(anId: string | null, aTurn: Turn, anOwningCountryName: string, aLocation: Location, 
                aLocationName: string, aType: string) {
        if (anId) {
            this.id = anId;
        }
        this.turn = aTurn;
        this.owningCountryName = anOwningCountryName;
        this.location = aLocation;
        this.locationName = aLocationName;
        this.type = aType;
    }
}

import { observable } from 'mobx';
import { Location } from './Location';

export class Piece {
    id: string;
    @observable owningCountryName: string;
    @observable location: Location;
    type: string;

    constructor(anId: string | null, anOwningCountryName: string, aLocation: Location, aType: string) {
        if (anId) {
            this.id = anId;
        }
        this.owningCountryName = anOwningCountryName;
        this.location = aLocation;
        this.type = aType;
    }
}

import { observable } from 'mobx';
import { Location } from './Location';

export class Piece {

    @observable owningCountry: string;
    @observable location: Location;
    type: string;

    constructor(anOwningCountry: string, aLocation: Location, aType: string) {
        this.owningCountry = anOwningCountry;
        this.location = aLocation;
        this.type = aType;
    }
}

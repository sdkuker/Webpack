import { observable } from 'mobx';
import { Location } from './Location';
import { PieceTypes } from './DomainTypes';

export class Piece {

    @observable name: string;
    @observable owningCountry: string;
    @observable location: Location;
    type: string;

    constructor(aName: string, anOwningCountry: string, aLocation: Location, aType: string) {
        this.name = aName;
        this.owningCountry = anOwningCountry;
        this.location = aLocation;
        this.type = aType;
    }
}

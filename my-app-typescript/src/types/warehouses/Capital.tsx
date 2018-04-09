import { observable } from 'mobx';
import { Location } from './Location';

export class Capital {
    @observable name: string;
    @observable owningCountry: string;
    @observable location: Location;
    constructor(aName: string, anOwningCountry: string, aLocation: Location) {
        this.name = aName;
        this.owningCountry = anOwningCountry;
        this.location = aLocation;
    }
}

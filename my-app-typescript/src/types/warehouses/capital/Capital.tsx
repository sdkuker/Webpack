import { observable } from 'mobx';
import { Location } from '../location/Location';

export class Capital {
    @observable id: string;
    @observable name: string;
    @observable owningCountry: string;
    @observable location: Location;
    constructor(anId: string | null, aName: string, anOwningCountry: string, aLocation: Location) {
        if (anId) {
            this.id = anId;
        }
        this.name = aName;
        this.owningCountry = anOwningCountry;
        this.location = aLocation;
    }
}

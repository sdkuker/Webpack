
import { observable } from 'mobx';

export class Country {
    @observable name: string
    constructor(aName: string) {
        this.name = aName;
    }
}

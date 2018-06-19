import { observable } from 'mobx';
export class Game {
    @observable name: string;
    constructor(aName: string) {
        this.name = aName;
    }
}

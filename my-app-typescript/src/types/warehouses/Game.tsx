import { observable } from 'mobx';
export class Game {
    @observable id: string;
    @observable name: string;
    constructor(myId: string, aName: string) {
        this.id = myId;
        this.name = aName;
    }
}

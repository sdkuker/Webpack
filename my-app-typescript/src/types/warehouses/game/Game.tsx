import { observable } from 'mobx';
export class Game {
    @observable id = '';
    @observable name: string;
    constructor(myId: string | null, aName: string) {
        if (myId) {
            this.id = myId;
        }
        this.name = aName;
    }
}

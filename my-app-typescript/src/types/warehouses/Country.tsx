
import { observable } from 'mobx';

export class Country {
    @observable id: string;
    @observable name: string;
    @observable playerName: string;
    @observable gameId: string;

    constructor(anId: string, aName: string, aPlayerName: string | null, aGameId: string) {
        this.id = anId;
        this.name = aName;
        this.gameId = aGameId;
        if (aPlayerName) {
            this.playerName = aPlayerName;
        }
    }
}

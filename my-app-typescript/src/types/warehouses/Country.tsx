
import { observable } from 'mobx';
import { Game } from './Game';

export class Country {
    @observable id: string;
    @observable name: string;
    @observable playerName: string;
    @observable game: Game;

    constructor(anId: string, aName: string, aPlayerName: string | null, aGame: Game) {
        this.id = anId;
        this.name = aName;
        this.game = aGame;
        if (aPlayerName) {
            this.playerName = aPlayerName;
        }
    }
}

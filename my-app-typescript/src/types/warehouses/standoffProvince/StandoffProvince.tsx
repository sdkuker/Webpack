export class StandoffProvince {
    id: string;
    provinceName: string;
    turnId: string;
    gameId: string;

    constructor(anId: string | null, aProvinceName: string,  aTurnId: string, 
                aGameId: string) {
        if (anId) {
            this.id = anId;
        }
        this.gameId = aGameId;
        this.provinceName = aProvinceName;
        this.turnId = aTurnId;
    }
}

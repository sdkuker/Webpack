
export class Piece {
    id: string;
    owningCountryName: string;
    type: string;
    locationName: string;
    turnId: string;
    gameId: string;

    constructor(anId: string | null, aGameId: string, aTurnId: string, anOwningCountryName: string, 
                aLocationName: string, aType: string) {
        if (anId) {
            this.id = anId;
        }
        this.gameId = aGameId;
        this.turnId = aTurnId;
        this.owningCountryName = anOwningCountryName;
        this.locationName = aLocationName;
        this.type = aType;
    }
}

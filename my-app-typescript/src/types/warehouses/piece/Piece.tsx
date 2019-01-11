import { Turn } from '../turn/Turn';

export class Piece {
    id: string;
    owningCountryName: string;
    type: string;
    locationName: string;
    turn: Turn;

    constructor(anId: string | null, aTurn: Turn, anOwningCountryName: string, 
                aLocationName: string, aType: string) {
        if (anId) {
            this.id = anId;
        }
        this.turn = aTurn;
        this.owningCountryName = anOwningCountryName;
        this.locationName = aLocationName;
        this.type = aType;
    }
}

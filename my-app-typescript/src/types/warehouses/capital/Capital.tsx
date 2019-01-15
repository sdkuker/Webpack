export class Capital {
    id: string;
    owningCountryName: string;
    locationName: string;
    turnId: string;
    constructor(anId: string | null, anOwningCountryName: string, aLocationName: string, aTurnId: string) {
        if (anId) {
            this.id = anId;
        }
        this.owningCountryName = anOwningCountryName;
        this.locationName = aLocationName;
        this.turnId = aTurnId;
    }
}

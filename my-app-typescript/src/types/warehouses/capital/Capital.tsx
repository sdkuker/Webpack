export class Capital {
    id: string;
    owningCountry: string;
    locationName: string;
    constructor(anId: string | null, anOwningCountry: string, aLocationName: string) {
        if (anId) {
            this.id = anId;
        }
        this.owningCountry = anOwningCountry;
        this.locationName = aLocationName;
    }
}

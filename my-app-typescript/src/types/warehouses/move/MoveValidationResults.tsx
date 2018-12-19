
export class MoveValidationResults {

    isValid: boolean;
    description: string;

    constructor(isItValid: boolean, aDescription: string) {
        this.isValid = isItValid;
        this.description = aDescription;
    }
}

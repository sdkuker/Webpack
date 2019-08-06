
export class MoveResults {

    id: string;
    executionDescription: string;
    executionFailedDueToStandoff: boolean;
    gameId: string;
    isValidMove: boolean;
    moveExecutedSuccessfully: boolean;
    moveId: string;
    moveResolutionCompleted: boolean;
    turnId: string;

    constructor(anId: string, executionDescription: string, wasExecutionFailedDueToStandoff: boolean,
        aGameId: string, isMoveValid: boolean, wasMoveExecutedSuccessfully: boolean, associatedMoveId: string,
        wasMoveResolutionCompleted: boolean, aTurnId: string) {
        this.id = anId;
        this.executionDescription = executionDescription;
        this.executionFailedDueToStandoff = wasExecutionFailedDueToStandoff;
        this.gameId = aGameId;
        this.isValidMove = isMoveValid;
        this.moveExecutedSuccessfully = wasMoveExecutedSuccessfully;
        this.moveId = associatedMoveId;
        this.moveResolutionCompleted = wasMoveResolutionCompleted;
        this.turnId = aTurnId;
    }
}

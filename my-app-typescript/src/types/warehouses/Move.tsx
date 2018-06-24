import { observable } from 'mobx';
import { PieceTypes, LocationTypes, MoveAction } from './DomainTypes';
import { Warehouse as LocationWarehouse } from './LocationWarehouse';
import { Turn } from './Turn';
import { MoveValidationResults } from './MoveValidationResults';

export class Move {

    @observable order: string;
    id: number;
    pieceType?: PieceTypes;
    currentLocationName?: string;
    action?: MoveAction;
    endingLocationName?: string;
    secondaryPieceType?: PieceTypes;
    secondaryCurrentLocationName?: string;
    secondaryAction?: MoveAction;
    secondaryEndingLocationName?: string;
    owningCountryName?: string;
    turn: Turn;

    constructor(anId: number, anOrder: string, anOwningCountrName: string, aTurn: Turn) {
        this.id = anId;
        this.owningCountryName = anOwningCountrName;
        this.turn = aTurn;
        this.order = anOrder;
        this.parseOrder();
    }

    updateOrder = (newOrder: string) => {
        this.resetOrderFields();
        this.order = newOrder;
        this.parseOrder();
    }

    resetOrderFields = () =>  {
        this.pieceType = undefined;
        this.currentLocationName = undefined;
        this.action = undefined;
        this.endingLocationName = undefined;
        this.secondaryPieceType = undefined;
        this.secondaryCurrentLocationName = undefined;
        this.secondaryAction = undefined;
        this.secondaryEndingLocationName = undefined;
    }
    parseOrder = () => {
        const parsedOrder = this.order.split(' ');
        if (parsedOrder.length > 0) {
            this.parcePieceType(parsedOrder[0], 'primary');
            if (parsedOrder.length > 1) {
                if (LocationWarehouse.locations.has(parsedOrder[1] + LocationTypes.Piece)) {
                    this.currentLocationName = parsedOrder[1];
                }
                if (parsedOrder.length > 2) {
                    if (parsedOrder[2].toUpperCase() === 'HOLDS') {
                        this.action = MoveAction.Holds;
                    } else {
                        if (parsedOrder[2].toUpperCase() === 'MOVESTO') {
                            const movesToArray = Array<string>();
                            movesToArray.push(parsedOrder[2]);
                            movesToArray.push(parsedOrder[3]);
                            this.parseMovesTo(movesToArray, 'primary');
                        } else {
                            if (parsedOrder[2].toUpperCase() === 'CONVOYS' ||
                                parsedOrder[2].toUpperCase() === 'SUPPORTS') {
                                if (parsedOrder.length > 5) {
                                    const movesToArray = Array<string>();
                                    movesToArray.push(parsedOrder[2]);
                                    movesToArray.push(parsedOrder[3]);
                                    movesToArray.push(parsedOrder[4]);
                                    movesToArray.push(parsedOrder[5]);
                                    movesToArray.push(parsedOrder[6]);
                                    this.parseConvoysAndSupports(movesToArray);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    parcePieceType = (proposedPieceType: string, orderSegment: string) => {
        if (proposedPieceType) {
            if (proposedPieceType.toUpperCase() === 'F' || proposedPieceType.toUpperCase() === 'FLEET') {
                if (orderSegment === 'primary') {
                    this.pieceType = PieceTypes.Fleet;
                } else {
                    this.secondaryPieceType = PieceTypes.Fleet;
                }
            } else {
                if (proposedPieceType.toUpperCase() === 'A' || proposedPieceType.toUpperCase() === 'ARMY') {
                    if (orderSegment === 'primary') {
                        this.pieceType = PieceTypes.Army;
                    } else {
                        this.secondaryPieceType = PieceTypes.Army;
                    }
                }
            }
        }
    }

    parseMovesTo = (aParsedOrder: Array<string>, orderSegment: string) => {
        if (aParsedOrder[0].toUpperCase() === 'MOVESTO') {
            if (aParsedOrder.length > 0) {
                if (orderSegment === 'primary') {
                    this.action = MoveAction.MovesTo;
                } else {
                    this.secondaryAction = MoveAction.MovesTo;
                }
                if (LocationWarehouse.locations.has(aParsedOrder[1] + LocationTypes.Piece)) {
                    if (orderSegment === 'primary') {
                        this.endingLocationName = aParsedOrder[1];
                    } else {
                        this.secondaryEndingLocationName = aParsedOrder[1];
                    }
                }
            }
        }
    }

    parseConvoysAndSupports = (aParsedOrder: Array<string>) => {
        if (aParsedOrder[0].toUpperCase() === 'CONVOYS' || aParsedOrder[0].toUpperCase() === 'SUPPORTS') {
            if (aParsedOrder[0].toUpperCase() === 'CONVOYS') {
                this.action = MoveAction.Convoys;
            } else {
                this.action = MoveAction.Supports;
            }
            if (aParsedOrder.length > 0) {
                this.parcePieceType(aParsedOrder[1], 'secondary');
                if (LocationWarehouse.locations.has(aParsedOrder[2] + LocationTypes.Piece)) {
                    this.secondaryCurrentLocationName = aParsedOrder[2];
                }
                if (aParsedOrder[3].toUpperCase() === 'MOVESTO') {
                    const movesToArray = Array<string>();
                    movesToArray.push(aParsedOrder[3]);
                    movesToArray.push(aParsedOrder[4]);
                    this.parseMovesTo(movesToArray, 'secondary');
                }
            }
        }
    }

    isValidMove = () => {
        // tslint:disable-next-line
        const invalidActionDescription = 'Invalid Action.  The move order must contain one of the following valid actions (regardless of case): HOLDS, MOVESTO, CONVOYS, or SUPPORTS.';

        let theReturn: MoveValidationResults = new MoveValidationResults(false, invalidActionDescription);

        if (this.action) {
            if (this.action === MoveAction.Holds) {
                theReturn = this.validateHoldsAction();
            } else {
                if (this.action === MoveAction.MovesTo) {
                    theReturn = this.validateMovesToAction();
                } else {
                    if (this.action === MoveAction.Convoys) {
                        theReturn = this.validateConvoyAction();
                    } else {
                        if (this.action === MoveAction.Supports) {
                            theReturn = this.validateSupportsAction();
                        } else {
                            theReturn.description = 'invalid move type';
                        }
                    }
                }
            }
        }

        return theReturn;
    }

    validateHoldsAction = () => {
        let theReturn: MoveValidationResults = new MoveValidationResults(false, 'initial description');
        if (this.action === MoveAction.Holds) {
            if (this.pieceType) {
                if (this.currentLocationName) {
                    if (this.endingLocationName === undefined) {
                        if (this.secondaryPieceType === undefined) {
                            if (this.secondaryCurrentLocationName === undefined) {
                                if (this.secondaryAction === undefined) {
                                    if (this.secondaryEndingLocationName === undefined) {
                                        theReturn.isValid = true;
                                        theReturn.description = 'Valid hold';
                                    } else {
                                        // tslint:disable-next-line
                                        theReturn.description = 'Holds can not include an ending location for a second piece';
                                    } 
                                } else {
                                    theReturn.description = 'Holds can not include an action for a second piece';
                                }
                            } else {
                                theReturn.description = 'Holds can not include an current location for a second piece';
                            }
                        } else {
                            theReturn.description = 'Holds can not include asecond piece';
                        }
                    } else {
                        theReturn.description = 'Holds can not include a second location';
                    }
                } else {
                    theReturn.description = 'Holds must include the location of the piece';
                }
            }
        }
        return theReturn;
    }

    validateMovesToAction = () => {
        let theReturn: MoveValidationResults = new MoveValidationResults(false, 'initial description');

        if (this.action === MoveAction.MovesTo) {
            if (this.pieceType) {
                if (this.currentLocationName) {
                    if (this.endingLocationName) {
                        if (this.secondaryPieceType === undefined) {
                            if (this.secondaryCurrentLocationName === undefined) {
                                if (this.secondaryAction === undefined) {
                                    if (this.secondaryEndingLocationName === undefined) {
                                        theReturn.isValid = true;
                                        theReturn.description = 'Valid move';
                                    } else {
                                        // tslint:disable-next-line
                                        theReturn.description = 'Moves can not include an ending location for a second piece';
                                    } 
                                } else {
                                    theReturn.description = 'Moves can not include an action for a second piece';
                                }
                            } else {
                                theReturn.description = 'Moves can not include an current location for a second piece';
                            }
                        } else {
                            theReturn.description = 'Moves can not include asecond piece';
                        }
                    } else {
                        theReturn.description = 'Moves must include a valid second location';
                    }
                } else {
                    theReturn.description = 'Moves must include the location of the piece';
                }
            } else {
                theReturn.description = 'A valid piece type must be specified to move';
            }
        }

        return theReturn;
    }

    validateConvoyAction = () => {
        let theReturn: MoveValidationResults = new MoveValidationResults(false, 'initial description');

        if (this.action === MoveAction.Convoys) {
            if (this.pieceType === PieceTypes.Fleet) {
                if (this.currentLocationName) {
                    if (this.endingLocationName === undefined) {
                        if (this.secondaryPieceType  === PieceTypes.Army) {
                            if (this.secondaryCurrentLocationName) {
                                if (this.secondaryAction === MoveAction.MovesTo) {
                                    if (this.secondaryEndingLocationName) {
                                        theReturn.isValid = true;
                                        theReturn.description = 'Valid convoy';
                                    } else {
                                        // tslint:disable-next-line
                                        theReturn.description = 'Convoys must include an ending location for the convoyed army';
                                    } 
                                } else {
                                    // tslint:disable-next-line
                                    theReturn.description = 'Convoys must include a moveTo action for the convoyed army';
                                }
                            } else {
                                // tslint:disable-next-line
                                theReturn.description = 'Convoys must include an current location for the convoyed army';
                            }
                        } else {
                            theReturn.description = 'Convoys must specify an army to be convoyed';
                        }
                    } else {
                        theReturn.description = 'Convoys must not include a valid second location';
                    }
                } else {
                    theReturn.description = 'Convoys must include the location of the piece';
                }
            } else {
                theReturn.description = 'A fleet must be specified for a convoy';
            }
        }

        return theReturn;
    }

    validateSupportsAction = () => {
        let theReturn: MoveValidationResults = new MoveValidationResults(false, 'initial description');

        if (this.action === MoveAction.Supports) {
            if (this.pieceType) {
                if (this.currentLocationName) {
                    if (this.endingLocationName === undefined) {
                        if (this.secondaryPieceType) {
                            if (this.secondaryCurrentLocationName) {
                                // tslint:disable-next-line
                                if (this.secondaryAction === MoveAction.MovesTo || this.secondaryAction === MoveAction.Holds) {
                                    if (this.secondaryEndingLocationName) {
                                        theReturn.isValid = true;
                                        theReturn.description = 'Valid support';
                                    } else {
                                        // tslint:disable-next-line
                                        theReturn.description = 'Support must include an ending location for the supported piece';
                                    } 
                                } else {
                                    theReturn.description = 'Support can only be done for movesTo or holds actions';
                                }
                            } else {
                                // tslint:disable-next-line
                                theReturn.description = 'Support must include an current location for the supported piece';
                            }
                        } else {
                            theReturn.description = 'Support must specify the type of piece being supported';
                        }
                    } else {
                        theReturn.description = 'Support must not include a valid second location';
                    }
                } else {
                    theReturn.description = 'Support must include the location of the piece thats doing the supporting';
                }
            } else {
                theReturn.description = 'A piece type must be specified for the piece doing the supporting';
            }
        }

        return theReturn;
    }
}

import { observable } from 'mobx';
import { Location } from './Location';
import { PieceTypes, LocationTypes, MoveAction } from './DomainTypes';
import { Warehouse as LocationWarehouse } from './LocationWarehouse';

export class Move {

    @observable order: string;
    pieceType: PieceTypes;
    currentLocationName: string;
    action: MoveAction;
    endingLocationName: string;
    secondaryPieceType: PieceTypes;
    secondaryCurrentLocationName: string;
    secondaryAction: MoveAction;
    secondaryEndingLocationName: string;

    constructor(anOrder: string) {
        this.order = anOrder;
        this.parseOrder();
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
                    if (parsedOrder[2].toUpperCase() == 'HOLDS') {
                        this.action = MoveAction.Holds;
                    } else {
                        if (parsedOrder[2].toUpperCase() == 'MOVESTO') {
                            const movesToArray = Array<string>();
                            movesToArray.push(parsedOrder[2]);
                            movesToArray.push(parsedOrder[3]);
                            this.parseMovesTo(movesToArray, 'primary');
                        } else {
                            if (parsedOrder[2].toUpperCase() == 'CONVOYS' ||
                                parsedOrder[2].toUpperCase() == 'SUPPORTS') {
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
            if (proposedPieceType.toUpperCase() == 'F' || proposedPieceType.toUpperCase() == 'FLEET') {
                if (orderSegment == 'primary') {
                    this.pieceType = PieceTypes.Fleet;
                } else {
                    this.secondaryPieceType = PieceTypes.Fleet;
                }
            } else {
                if (proposedPieceType.toUpperCase() == 'A' || proposedPieceType.toUpperCase() == 'ARMY') {
                    if (orderSegment == 'primary') {
                        this.pieceType = PieceTypes.Army;
                    } else {
                        this.secondaryPieceType = PieceTypes.Army;
                    }
                }
            }
        }
    }

    parseMovesTo = (aParsedOrder: Array<string>, orderSegment: string) => {
        if (aParsedOrder[0].toUpperCase() == 'MOVESTO') {
            if (aParsedOrder.length > 0) {
                if (orderSegment == 'primary') {
                    this.action = MoveAction.MovesTo;
                } else {
                    this.secondaryAction = MoveAction.MovesTo;
                }
                if (LocationWarehouse.locations.has(aParsedOrder[1] + LocationTypes.Piece)) {
                    if (orderSegment == 'primary') {
                        this.endingLocationName = aParsedOrder[1];
                    } else {
                        this.secondaryEndingLocationName = aParsedOrder[1];
                    }
                }
            }
        }
    }

    parseConvoysAndSupports = (aParsedOrder: Array<string>) => {
        if (aParsedOrder[0].toUpperCase() == 'CONVOYS' || aParsedOrder[0].toUpperCase() == 'SUPPORTS') {
            if (aParsedOrder[0].toUpperCase() == 'CONVOYS') {
                this.action = MoveAction.Convoys;
            } else {
                this.action = MoveAction.Supports;
            }
            if (aParsedOrder.length > 0) {
                this.parcePieceType(aParsedOrder[1], 'secondary');
                if (LocationWarehouse.locations.has(aParsedOrder[2] + LocationTypes.Piece)) {
                    this.secondaryCurrentLocationName = aParsedOrder[2];
                }
                if (aParsedOrder[3].toUpperCase() == 'MOVESTO') {
                    const movesToArray = Array<string>();
                    movesToArray.push(aParsedOrder[3]);
                    movesToArray.push(aParsedOrder[4]);
                    this.parseMovesTo(movesToArray, 'secondary');
                }
            }
        }
    }

    isValidMove = () => {
        let theReturn: boolean = false;

        if (this.action) {
            if (this.action == MoveAction.Holds) {
                theReturn = this.validateHoldsAction();
            } else {
                if (this.action == MoveAction.MovesTo) {
                    theReturn = this.validateMovesToAction();
                } else {
                    if (this.action == MoveAction.Convoys) {
                        theReturn = this.validateConvoyAction();
                    } else {
                        if (this.action == MoveAction.Supports) {
                            theReturn = this.validateSupportsAction();
                        }
                    }
                }
            }
        }

        return theReturn;
    }

    validateHoldsAction = () => {
        let theReturn: boolean = false;
        if (this.action == MoveAction.Holds) {
            if (this.pieceType && this.currentLocationName && this.endingLocationName === undefined &&
                this.secondaryPieceType === undefined && this.secondaryCurrentLocationName === undefined &&
                this.secondaryAction === undefined &&
                this.secondaryEndingLocationName === undefined) {
                theReturn = true;
            }
        }
        return theReturn;
    }

    validateMovesToAction = () => {
        let theReturn: boolean = false;
        if (this.action == MoveAction.MovesTo) {
            if (this.pieceType && this.currentLocationName && this.endingLocationName &&
                this.secondaryPieceType === undefined && this.secondaryCurrentLocationName === undefined &&
                this.secondaryAction === undefined &&
                this.secondaryEndingLocationName === undefined) {
                theReturn = true;
            }
        }

        return theReturn;
    }

    validateConvoyAction = () => {
        let theReturn: boolean = false;
        if (this.action == MoveAction.Convoys) {
            if (this.pieceType == PieceTypes.Fleet && this.currentLocationName && this.endingLocationName === undefined &&
                this.secondaryPieceType == PieceTypes.Army && this.secondaryCurrentLocationName &&
                this.secondaryAction == MoveAction.MovesTo &&
                this.secondaryEndingLocationName) {
                theReturn = true;
            }
        }
        return theReturn;
    }

    validateSupportsAction = () => {
            let theReturn: boolean = false;
            if (this.action == MoveAction.Supports) {
                if (this.pieceType == PieceTypes.Fleet && this.currentLocationName && this.endingLocationName === undefined &&
                    this.secondaryPieceType == PieceTypes.Army && this.secondaryCurrentLocationName &&
                    this.secondaryAction == MoveAction.MovesTo &&
                    this.secondaryEndingLocationName) {
                    theReturn = true;
                }
            }

            return theReturn;
        }
    }

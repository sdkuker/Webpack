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
    secondaryEndingLocation: string;

    constructor(anOrder: string) {
        this.order = anOrder;
        this.parseOrder();
    }

    parseOrder = () => {
        const parsedOrder = this.order.split(' ');
        if (parsedOrder.length > 0) {
            var aPieceType : any = this.parcePieceType(parsedOrder[0]);
            if (aPieceType) {
                 this.pieceType = aPieceType;
            }

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
                            this.parseMovesTo(movesToArray);
                        } else {
                            if (parsedOrder[2].toUpperCase() == 'CONVOYS') {
                                if (parsedOrder.length > 4) {
                                    const movesToArray = Array<string>();
                                    movesToArray.push(parsedOrder[2]);
                                    movesToArray.push(parsedOrder[3]);
                                    movesToArray.push(parsedOrder[4]);
                                    movesToArray.push(parsedOrder[5]);
                                    this.parseConvoys(parsedOrder);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    parcePieceType = (proposedPieceType: string) => {
        var theReturn : PieceTypes;
        if (proposedPieceType) {
            if (proposedPieceType.toUpperCase() == 'F' || proposedPieceType.toUpperCase() == 'FLEET') {
                theReturn = PieceTypes.Fleet;
                return theReturn;
            } else {
                if (proposedPieceType.toUpperCase() == 'A' || proposedPieceType.toUpperCase() == 'ARMY') {
                    theReturn = PieceTypes.Army;
                    return theReturn;
                }
            }
        }
        return undefined;
    }

    parseMovesTo = (aParsedOrder: Array<string>) => {
        if (aParsedOrder[0].toUpperCase() == 'MOVESTO') {
            this.action = MoveAction.MovesTo;
            if (aParsedOrder.length > 0) {
                if (LocationWarehouse.locations.has(aParsedOrder[1] + LocationTypes.Piece)) {
                    this.endingLocationName = aParsedOrder[1];
                }
            }
        }
    }

    parseConvoys = (aParsedOrder: Array<string>) => {
        if (aParsedOrder[0].toUpperCase() == 'CONVOYS') {
            this.action = MoveAction.Convoys;
            if (aParsedOrder.length > 3) {
                if (LocationWarehouse.locations.has(aParsedOrder[3] + LocationTypes.Piece)) {
                    this.endingLocationName = aParsedOrder[3];
                }
            }
        }
    }
}

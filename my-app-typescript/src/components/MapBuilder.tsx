import * as React from 'react';
import { observer } from 'mobx-react';
import { Capital } from '../types/warehouses/capital/Capital';
import { Piece } from '../types/warehouses/piece/Piece';
import { Warehouse as LocationWarehouse } from '../types/warehouses/location/LocationWarehouse';
import { LocationTypes, PieceTypes, TurnPhase } from '../types/warehouses/DomainTypes';
import { Location } from '../types/warehouses/location/Location';

interface PropValues {
    pieces: Array<Piece>;
    capitals: Map<string, Capital>;
}

@observer
class MapBuilder extends React.Component<PropValues, {}> {

    constructor(props: PropValues) {
        super(props);
    }

    findLocation = (locationName: string, aLocationType: LocationTypes) => {

        const myLocations = LocationWarehouse.locations;
        const locationKey: string = locationName + aLocationType;

        let locationToReturn = myLocations.get(locationKey);

        if (locationToReturn) {
            return locationToReturn;
        } else {
            return new Location('unknown', '100', '100');
        }

    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];
        this.props.capitals.forEach((aCapital: Capital, myKey: string) => {
            theReturn.push(
                <circle
                    key={myKey}
                    r="4"
                    cx={this.findLocation(aCapital.locationName, LocationTypes.Capital).x}
                    cy={this.findLocation(aCapital.locationName, LocationTypes.Capital).y}
                    className={aCapital.owningCountryName}
                />);
        });

        if (this.props.pieces) {

            this.props.pieces.forEach((aPiece: Piece, anIndex: number) => {
                if (aPiece.type === PieceTypes.Fleet) {
                    theReturn.push(
                        <g
                            key={anIndex}
                            className={aPiece.owningCountryName}
                            transform={'translate(' + 
                                this.findLocation(aPiece.pieceLocation.nameOfLocationAtBeginningOfPhase, 
                                    LocationTypes.Piece).x + ', ' + 
                                this.findLocation(aPiece.pieceLocation.nameOfLocationAtBeginningOfPhase, 
                                    LocationTypes.Piece).y + ')'}
                        >
                            <polygon key={anIndex + 'a'} points="-2,-3 10,-3 -2,-13" />
                            <polygon key={anIndex + 'b'} points="-12,-1 -6,5 6,5 12,-1" />
                        </g>);
                } else {
                    theReturn.push(
                        <g
                            key={anIndex}
                            className={aPiece.owningCountryName}
                            transform={'translate(' + 
                                this.findLocation(aPiece.pieceLocation.nameOfLocationAtBeginningOfPhase, 
                                    LocationTypes.Piece).x + ', ' + 
                                this.findLocation(aPiece.pieceLocation.nameOfLocationAtBeginningOfPhase, 
                                    LocationTypes.Piece).y + ')'}
                        >
                            <path key={anIndex + 'a'} d="M9,-6 L2,0 M9,6 L0,0" />
                            <path key={anIndex + 'b'} d="M-11,-6 v4 h17 a2,2 0,0 0 0,-4z" />
                            <circle key={anIndex + 'c'} r="6" />
                        </g>);
                }
            });
        }

        return (
            <g>
                {theReturn}
            </g>
        );
    }
}

export default MapBuilder;
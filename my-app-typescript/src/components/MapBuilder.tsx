import * as React from 'react';
import { observer } from 'mobx-react';
import { warehouse as CapitalWarehouse } from '../types/warehouses/CapitalWarehouse';
import { IPieceWarehouse } from '../types/warehouses/IPieceWarehouse';
import { Capital } from '../types/warehouses/Capital';
import { Piece } from '../types/warehouses/Piece';
import { Turn } from '../types/warehouses/Turn';

interface PropValues {
    pieceWarehouse: IPieceWarehouse;
}
interface StateValues {
    myTurn: Turn | null;
}
@observer
class MapBuilder extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);
        this.state = {myTurn:  null};
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];
        let capitals: Map<String, Capital> = CapitalWarehouse.capitals;
        capitals.forEach((value: Capital, myKey: string) => {
            theReturn.push(
                <circle
                    key={myKey}
                    r="4"
                    cx={value.location.x}
                    cy={value.location.y}
                    className={value.owningCountry}
                />);
        });

        if (this.state.myTurn) {

            let pieces: Array<Piece> = this.props.pieceWarehouse.getPieces(this.state.myTurn);

            pieces.forEach((aPiece: Piece, anIndex: number) => {
                if (aPiece.type === 'Fleet') {
                    theReturn.push(
                        <g
                            key={anIndex}
                            className={aPiece.owningCountryName}
                            transform={'translate(' + aPiece.location.x + ', ' + aPiece.location.y + ')'}
                        >
                            <polygon key={anIndex + 'a'} points="-2,-3 10,-3 -2,-13" />
                            <polygon key={anIndex + 'b'} points="-12,-1 -6,5 6,5 12,-1" />
                        </g>);
                } else {
                    theReturn.push(
                        <g
                            key={anIndex}
                            className={aPiece.owningCountryName}
                            transform={'translate(' + aPiece.location.x + ', ' + aPiece.location.y + ')'}
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

    setTurn = (aTurn: Turn ) => {
        this.state = {myTurn: aTurn};
    }
}

export default MapBuilder;
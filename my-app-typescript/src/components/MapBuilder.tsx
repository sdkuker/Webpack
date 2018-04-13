import * as React from 'react';
import { Map as GameMap } from './Map';
import { warehouse as CapitalWarehouse } from '../types/warehouses/CapitalWarehouse';
import { warehouse as PieceWarehouse } from '../types/warehouses/PieceWarehouse';
import { Capital } from '../types/warehouses/Capital';
import { Piece } from '../types/warehouses/Piece';

class MapBuilder extends React.Component {

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
        let pieces: Map<String, Piece> = PieceWarehouse.pieces;
        pieces.forEach((value: Piece, myKey: string) => {
            if (value.type === 'Fleet') {
                theReturn.push(
                    <g 
                        key={myKey}
                        className={value.owningCountry}
                        transform={'translate(' + value.location.x + ', ' + value.location.y + ')'}
                    >
                        <polygon key={myKey + 'a'} points="-2,-3 10,-3 -2,-13" />
                        <polygon key={myKey + 'b'} points="-12,-1 -6,5 6,5 12,-1" />
                    </g>);
            } else {
                theReturn.push(
                    <g 
                        key={myKey}
                        className={value.owningCountry}
                        transform={'translate(' + value.location.x + ', ' + value.location.y + ')'}
                    >
                        <path key={myKey + 'a'} d="M9,-6 L2,0 M9,6 L0,0" />
                        <path key={myKey + 'b'}  d="M-11,-6 v4 h17 a2,2 0,0 0 0,-4z" />
                        <circle key={myKey + 'c'} r="6" />
                    </g>);
            }
        });
        return (
            <g>
                {theReturn}
            </g>
        );
    }

}

export default MapBuilder;
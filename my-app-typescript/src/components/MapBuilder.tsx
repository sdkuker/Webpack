import * as React from 'react';
import { Map as GameMap } from './Map';
import { warehouse as CapitalWarehouse } from '../types/warehouses/CapitalWarehouse';
import { Capital } from '../types/warehouses/Capital';
import Circle from './Circle';

class MapBuilder extends React.Component {

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];
        let mine: Map<String, Capital> = CapitalWarehouse.capitals;
        mine.forEach((value: Capital, key: string) => {
            theReturn.push(
                <circle 
                    r="4"
                    cx={value.location.x}
                    cy={value.location.y}
                    className={value.owningCountry}
                />);
        });
        return (
            <g>
                {theReturn}
            </g>
        );
    }

}

export default MapBuilder;
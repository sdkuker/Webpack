import * as React from 'react';
import { SeasonTypes } from '../types/warehouses/DomainTypes';

class SeasonSelectorOptions extends React.Component {

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        for (let aType in SeasonTypes) {
            if (SeasonTypes.hasOwnProperty(aType)) {
                theReturn.push(<option key={aType}>{aType}</option>);
            }
        }

        return (
           theReturn
        );
    }

}

export default SeasonSelectorOptions;
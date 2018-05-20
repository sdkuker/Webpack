import * as React from 'react';
import MoveCountrySelector  from './MoveCountrySelector';
import MovesListComponent from './MovesListComponent';
import { warehouse as MoveWarehouse } from '../types/warehouses/MoveWarehouse';
import { Turn } from '../types/warehouses/Turn';
import { SeasonTypes, TurnStatus } from '../types/warehouses/DomainTypes';

interface StateValues {
    countryToDisplay: string;
}

class MovesForCountryComponent extends React.Component<{}, StateValues> {
    constructor() {
        super({});
        this.countrySelected = this.countrySelected.bind(this);
        this.state = { countryToDisplay : 'England'};
    }
    render() {
        return (
            <div className="container">
                <MoveCountrySelector onCountrySelected={this.countrySelected}/>
                <MovesListComponent moves={MoveWarehouse.getMoves(
                    this.state.countryToDisplay, new Turn(1, SeasonTypes.Spring, TurnStatus.Complete))} />
            </div>
        );
    }

    countrySelected(countryName: string) {
        this.setState({ countryToDisplay: countryName });
    }

}

export default MovesForCountryComponent;
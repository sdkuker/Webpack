import * as React from 'react';
import MoveCountrySelector  from './MoveCountrySelector';
import MovesListComponent from './MovesListComponent';
import { warehouse as MoveWarehouse } from '../types/warehouses/MoveWarehouse';
import { Turn } from '../types/warehouses/Turn';
import { SeasonTypes, TurnStatus } from '../types/warehouses/DomainTypes';

interface PropValues {
    myTurn: Turn | null;
}
interface StateValues {
    countryToDisplay: string;
}

class MovesForCountryComponent extends React.Component<PropValues, StateValues> {
    constructor(props: PropValues) {
        super(props);
        this.countrySelected = this.countrySelected.bind(this);
        this.state = { countryToDisplay : 'England'};
    }
    render() {
        return (
            <div className="container">
                <MoveCountrySelector 
                    onCountrySelected={this.countrySelected} 
                    initialCountryName={this.state.countryToDisplay}
                />
                <MovesListComponent 
                    moves={MoveWarehouse.getMoves(
                    this.state.countryToDisplay, this.props.myTurn)} 
                />
            </div>
        );
    }

    countrySelected(countryName: string) {
        this.setState({ countryToDisplay: countryName });
    }

}

export default MovesForCountryComponent;
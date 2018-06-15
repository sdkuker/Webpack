import * as React from 'react';
import MoveCountrySelector from './MoveCountrySelector';
import MovesListComponent from './MovesListComponent';
import MovesEntryListComponent from './MovesEntryListComponent';
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
        this.state = { countryToDisplay: 'England' };
    }
    render() {
        // tslint:disable-next-line
        let theMovesComponent: any;
        if (this.props.myTurn && this.props.myTurn.status === TurnStatus.Open) {
            theMovesComponent =
                (
                    <MovesEntryListComponent
                        countryName={this.state.countryToDisplay} 
                        turn={this.props.myTurn}
                        moves={MoveWarehouse.getMoves(
                            this.state.countryToDisplay, this.props.myTurn)}
                    />
                );
        } else {
            theMovesComponent =
                (
                    <MovesListComponent
                        moves={MoveWarehouse.getMoves(
                            this.state.countryToDisplay, this.props.myTurn)}
                    />
                );
        }

        return (
            <div className="container">
                <MoveCountrySelector
                    onCountrySelected={this.countrySelected}
                    initialCountryName={this.state.countryToDisplay}
                />
                {theMovesComponent}
            </div>
        );
    }

    countrySelected(countryName: string) {
        this.setState({ countryToDisplay: countryName });
    }

}

export default MovesForCountryComponent;
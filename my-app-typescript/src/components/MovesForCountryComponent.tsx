import * as React from 'react';
import { observer } from 'mobx-react';
import MoveCountrySelector from './MoveCountrySelector';
import MovesListComponent from './MovesListComponent';
import MovesEntryListComponent from './MovesEntryListComponent';
import { MoveWarehouse } from '../types/warehouses/MoveWarehouse';
import { Turn } from '../types/warehouses/Turn';
import { TurnStatus } from '../types/warehouses/DomainTypes';

interface PropValues {
    moveWarehouse: MoveWarehouse;
    myTurn: Turn | null;
}
interface StateValues {
    countryToDisplay: string;
}

@observer
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
                        key={this.state.countryToDisplay}
                        countryName={this.state.countryToDisplay}
                        turn={this.props.myTurn}
                        moveWarehouse={this.props.moveWarehouse}
                    />
                );
        } else {
            theMovesComponent =
                (
                    <MovesListComponent
                        key={this.state.countryToDisplay}
                        moves={this.props.moveWarehouse.getMoves(
                            this.state.countryToDisplay, this.props.myTurn, false)}
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
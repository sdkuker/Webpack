import * as React from 'react';
import { observer } from 'mobx-react';
import MoveCountrySelector from './MoveCountrySelector';
import MovesListComponent from './MovesListComponent';
import MovesEntryListComponent from './MovesEntryListComponent';
import { IMoveWarehouse } from '../types/warehouses/IMoveWarehouse';
import { Turn } from '../types/warehouses/Turn';
import { TurnStatus } from '../types/warehouses/DomainTypes';
import { Game } from '../types/warehouses/Game';

interface PropValues {
    moveWarehouse: IMoveWarehouse;
    myGame: Game;
    myTurn: Turn;
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
                        game={this.props.myGame}
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
                            this.state.countryToDisplay, this.props.myTurn.id, this.props.myTurn.gameId, false)}
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
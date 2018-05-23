import * as React from 'react';
import { warehouse as TurnWarehouse } from '../types/warehouses/TurnWarehouse';
import { SeasonTypes } from '../types/warehouses/DomainTypes';
import SeasonSelectorOptions from './SeasonSelectorOptions';
import { Game } from '../types/warehouses/Game';
import { Turn } from '../types/warehouses/Turn';

interface PropValues {
    onTurnSelected: Function;
    myGame: Game;
    initialTurn: Turn | null;
}

interface StateValues {
    selectedTurn: Turn;
}
class SeasonSelector extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);
        if (props.initialTurn) {
            this.state = { selectedTurn: props.initialTurn};
        }
    }

    render() {
        return (
            <form className="form-inline row">
                <div className="col-md-2">
                    <div className="form-group">
                        <label htmlFor="yearSelector"><b>Year:</b></label>
                        <select className="form-control" id="yearSelector">
                            <option>1</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="seasonSelector"><b>Season:</b> </label>
                        <select className="form-control" id="seasonSelector">
                            <SeasonSelectorOptions />
                        </select>
                    </div>
                </div>
            </form>
        );
    }
}

export default SeasonSelector;
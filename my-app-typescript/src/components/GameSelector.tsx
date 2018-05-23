import * as React from 'react';
import '../map.css';
import { Game } from '../types/warehouses/Game';
import { warehouse as GameWarehouse } from '../types/warehouses/GameWarehouse';

interface PropValues {
    onGameSelected: Function;
    initialGame: Game;
}

interface StateValues {
    selectedGame: Game;
}

class GameSelector extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);
        this.state = { selectedGame: props.initialGame };
    }

    render() {
        // tslint:disable-next-line
        let options: any = [];
        GameWarehouse.games.forEach((aGame: Game) => {
            if (this.state.selectedGame === aGame) {
                // tslint:disable-next-line
                options.push(<option selected>{aGame.name}</option>);
            } else {
                options.push(<option>{aGame.name}</option>);
            }
        });

        return (
            <form className="form-inline row">
                <div className="col-md-2">
                    <div className="form-group">
                        <label htmlFor="gameSelector"><b>Game:</b></label>
                        <select className="form-control" id="gameSelector">
                            {options}
                        </select>
                    </div>
                </div>
            </form>
        );
    }
}

export default GameSelector;
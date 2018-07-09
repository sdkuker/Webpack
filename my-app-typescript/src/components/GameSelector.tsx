import * as React from 'react';
import { observer } from 'mobx-react';
import '../map.css';
import { Game } from '../types/warehouses/Game';
import { GameWarehouse } from '../types/warehouses/GameWarehouse';

interface PropValues {
    onGameSelected: Function;
    initialGame: Game;
    gameWarehouse: GameWarehouse;
}

interface StateValues {
    selectedGame: Game;
}

@observer
class GameSelector extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);
        this.state = { selectedGame: props.initialGame };
    }

    render() {
        // tslint:disable-next-line
        let options: any = [];
        this.props.gameWarehouse.games.forEach((aGame: Game) => {
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
                        <select className="form-control" id="gameSelector" onChange={e => this.gameSelected(e)}>
                            {options}
                        </select>
                    </div>
                </div>
            </form>
        );
    }

    gameSelected(event: React.FormEvent<HTMLSelectElement>) {
        let myValue: string = event.currentTarget.value;
        let selectedGame = this.props.gameWarehouse.getGameByName(myValue);
        if ( selectedGame ) {
            this.setState({ selectedGame: selectedGame });
            this.props.onGameSelected(selectedGame);
        }

    }
}

export default GameSelector;
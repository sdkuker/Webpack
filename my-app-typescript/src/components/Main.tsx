import * as React from 'react';
import GameMap from './Map';
import GameSelector from './GameSelector';
import SeasonSelector from './SeasonSelector';
import MovesForCountryComponent from './MovesForCountryComponent';
import { Game } from '../types/warehouses/Game';
import { warehouse as GameWarehouse } from '../types/warehouses/GameWarehouse'

interface StateValues {
    selectedGame: Game;
}

class Main extends React.Component<{}, StateValues> {

    constructor() {
        super({});
        this.gameSelected = this.gameSelected.bind(this);
        this.state = { selectedGame : GameWarehouse.games[0]};
    }

    render() {
        return (
            <div className="container">
                <GameSelector onGameSelected={this.gameSelected} initialGame={this.state.selectedGame} />
                <SeasonSelector />
                <div className="row">
                    <div className="col-md-12">
                        <GameMap />
                    </div>
                </div>
                <MovesForCountryComponent />
            </div>
        );
    }

    gameSelected(aGame: Game) {
        this.setState({ selectedGame: aGame });
    }
}

export default Main;
import * as React from 'react';
import GameMap from './Map';
import GameSelector from './GameSelector';
import SeasonSelector from './SeasonSelector';
import MovesForCountryComponent from './MovesForCountryComponent';
import { Game } from '../types/warehouses/Game';
import { Turn } from '../types/warehouses/Turn';
import { warehouse as GameWarehouse } from '../types/warehouses/GameWarehouse';
import { SeasonTypes } from '../types/warehouses/DomainTypes';
import { warehouse as TurnWarehouse } from '../types/warehouses/TurnWarehouse';

interface StateValues {
    selectedGame: Game;
    selectedTurn: Turn | null;
}

class Main extends React.Component<{}, StateValues> {

    constructor() {
        super({});
        this.gameSelected = this.gameSelected.bind(this);
        const myGame = GameWarehouse.games[0];
        this.state = { selectedGame: myGame, selectedTurn: TurnWarehouse.getOpenTurn(myGame) };
        this.turnSelected = this.turnSelected.bind(this);
    }

    render() {
        return (
            <div className="container">
                <GameSelector onGameSelected={this.gameSelected} initialGame={this.state.selectedGame} />
                <SeasonSelector 
                    onTurnSelected={this.turnSelected} 
                    myGame={this.state.selectedGame}
                    initialTurn={this.state.selectedTurn}
                    myTurnWarehouse={TurnWarehouse} 
                />
                <div className="row">
                    <div className="col-md-12">
                        <GameMap />
                    </div>
                </div>
                <MovesForCountryComponent myTurn={this.state.selectedTurn} />
            </div>
        );
    }

    gameSelected(aGame: Game) {
        this.setState({ selectedGame: aGame, selectedTurn: TurnWarehouse.getOpenTurn(aGame) });
    }

    turnSelected(aTurn: Turn) {
        this.setState({ selectedTurn: aTurn });
    }
}

export default Main;
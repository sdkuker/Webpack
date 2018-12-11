import * as React from 'react';
import { observer } from 'mobx-react';
import GameMap from './Map';
import SeasonSelector from './SeasonSelector';
import MovesForCountryComponent from './MovesForCountryComponent';
import { Game } from '../types/warehouses/Game';
import { Turn } from '../types/warehouses/Turn';
import { ITurnWarehouse } from '../types/warehouses/ITurnWarehouse';
import { IPieceWarehouse } from '../types/warehouses/IPieceWarehouse';
import { IMoveWarehouse } from '../types/warehouses/IMoveWarehouse';

interface PropertyValues {
    turnWarehouse: ITurnWarehouse;
    pieceWarehouse: IPieceWarehouse;
    moveWarehouse: IMoveWarehouse;
    selectedGame: Game;
}

interface StateValues {
    selectedTurn: Turn;
}

@observer
class GameComponent extends React.Component<PropertyValues, StateValues> {

    constructor(props: PropertyValues) {
        super(props);
        this.turnSelected = this.turnSelected.bind(this);
        this.state = { selectedTurn: this.props.turnWarehouse.getOpenTurn(props.selectedGame.id) };
    }

    render() {
        return (
            <div className="container">
                <h1>{this.props.selectedGame.name}</h1>
                <SeasonSelector
                    onTurnSelected={this.turnSelected}
                    myGame={this.props.selectedGame}
                    initialTurn={this.state.selectedTurn}
                    myTurnWarehouse={this.props.turnWarehouse}
                />
                <div className="row">
                    <div className="col-md-12">
                        <GameMap 
                            pieceWarehouse={this.props.pieceWarehouse}
                            turn={this.state.selectedTurn} 
                        />
                    </div>
                </div>
                <MovesForCountryComponent 
                    myGame={this.props.selectedGame} 
                    moveWarehouse={this.props.moveWarehouse} 
                    myTurn={this.state.selectedTurn} 
                />
            </div>
        );
    }

    turnSelected(aTurn: Turn) {
        this.setState({ selectedTurn: aTurn });
    }
}

export default GameComponent;
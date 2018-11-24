import * as React from 'react';
import { observer } from 'mobx-react';
import GameMap from './Map';
import SeasonSelector from './SeasonSelector';
import MovesForCountryComponent from './MovesForCountryComponent';
import { Game } from '../types/warehouses/Game';
import { Turn } from '../types/warehouses/Turn';
import { TurnWarehouse } from '../types/warehouses/TurnWarehouse';
import { PieceWarehouse } from '../types/warehouses/PieceWarehouse';
import { MoveWarehouse } from '../types/warehouses/MoveWarehouse';
import { myConfig } from '../types/warehouses/Config';
import { StaticTurnDataProvider } from '../types/warehouses/StaticTurnDataProvider';
import { StaticPieceDataProvider } from '../types/warehouses/StaticPieceDataProvider';
import { StaticMoveDataProvider } from '../types/warehouses/StaticMoveDataProvider';

interface PropertyValues {
    selectedGame: Game;
}

interface StateValues {
    selectedTurn: Turn | null;
}

@observer
class GameComponent extends React.Component<PropertyValues, StateValues> {

    turnWarehouse: TurnWarehouse;
    pieceWarehouse: PieceWarehouse;
    moveWarehouse: MoveWarehouse;

    constructor(props: PropertyValues) {
        super(props);
       // this.gameSelected = this.gameSelected.bind(this);
        this.turnSelected = this.turnSelected.bind(this);
        if (myConfig.dataProviders === 'static') {
            const myGame = this.props.selectedGame;
            this.turnWarehouse = new TurnWarehouse(new StaticTurnDataProvider(null));
            this.pieceWarehouse = new PieceWarehouse(new StaticPieceDataProvider(null));
            const myMoveDataProvider = new StaticMoveDataProvider(null, myGame, this.turnWarehouse);
            this.moveWarehouse = new MoveWarehouse(myMoveDataProvider);
            this.state = { selectedTurn: this.turnWarehouse.getOpenTurn(myGame) };
        }
    }

    render() {
        return (
            <div className="container">
                <h1>{this.props.selectedGame.name}</h1>
                <SeasonSelector
                    onTurnSelected={this.turnSelected}
                    myGame={this.props.selectedGame}
                    initialTurn={this.state.selectedTurn}
                    myTurnWarehouse={this.turnWarehouse}
                />
                <div className="row">
                    <div className="col-md-12">
                        <GameMap pieceWarehouse={this.pieceWarehouse} />
                    </div>
                </div>
                <MovesForCountryComponent moveWarehouse={this.moveWarehouse} myTurn={this.state.selectedTurn} />
            </div>
        );
    }

    turnSelected(aTurn: Turn) {
        this.setState({ selectedTurn: aTurn });
    }
}

export default GameComponent;
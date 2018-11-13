import * as React from 'react';
import { observer } from 'mobx-react';
import GameMap from './Map';
import GameSelector from './GameSelector';
import SeasonSelector from './SeasonSelector';
import MovesForCountryComponent from './MovesForCountryComponent';
import { Game } from '../types/warehouses/Game';
import { Turn } from '../types/warehouses/Turn';
import { GameWarehouse } from '../types/warehouses/GameWarehouse';
import { TurnWarehouse } from '../types/warehouses/TurnWarehouse';
import { PieceWarehouse } from '../types/warehouses/PieceWarehouse';
import { MoveWarehouse } from '../types/warehouses/MoveWarehouse';
import { StaticGameDataProvider } from '../types/warehouses/StaticGameDataProvider';
import { myConfig } from './Config';
import { StaticTurnDataProvider } from '../types/warehouses/StaticTurnDataProvider';
import { StaticPieceDataProvider } from '../types/warehouses/StaticPieceDataProvider';
import { StaticMoveDataProvider } from '../types/warehouses/StaticMoveDataProvider';

interface StateValues {
    selectedGame: Game;
    selectedTurn: Turn | null;
}

@observer
class GameComponent extends React.Component<{}, StateValues> {

    gameWarehouse: GameWarehouse;
    turnWarehouse: TurnWarehouse;
    pieceWarehouse: PieceWarehouse;
    moveWarehouse: MoveWarehouse;

    constructor() {
        super({});
        this.gameSelected = this.gameSelected.bind(this);
        this.turnSelected = this.turnSelected.bind(this);
        if (myConfig.dataProviders === 'static') {
            this.gameWarehouse = new GameWarehouse(new StaticGameDataProvider(null));
            const myGame = this.gameWarehouse.games[0];
            this.turnWarehouse = new TurnWarehouse(new StaticTurnDataProvider(null, myGame));
            this.pieceWarehouse = new PieceWarehouse(new StaticPieceDataProvider(null));
            const myMoveDataProvider = new StaticMoveDataProvider(null, this.gameWarehouse, this.turnWarehouse);
            this.moveWarehouse = new MoveWarehouse(myMoveDataProvider);
            this.state = { selectedGame: myGame, selectedTurn: this.turnWarehouse.getOpenTurn(myGame) };
        }
    }

    render() {
        return (
            <div className="container">
                <GameSelector 
                    onGameSelected={this.gameSelected} 
                    initialGame={this.state.selectedGame} 
                    gameWarehouse={this.gameWarehouse} 
                />
                <SeasonSelector
                    onTurnSelected={this.turnSelected}
                    myGame={this.state.selectedGame}
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

    gameSelected(aGame: Game) {
        this.setState({ selectedGame: aGame, selectedTurn: this.turnWarehouse.getOpenTurn(aGame) });
    }

    turnSelected(aTurn: Turn) {
        this.setState({ selectedTurn: aTurn });
    }
}

export default GameComponent;
import * as React from 'react';
import { observer } from 'mobx-react';
import GameListComponent from './GameListComponent';
import { Game } from '../../types/warehouses/Game';
import { IGameWarehouse } from '../../types/warehouses/IGameWarehouse';

interface StateValues {
    selectedGame: Game | null;
}

interface PropValues {
    gameWarehouse: IGameWarehouse;
}

@observer
class GameManagementComponent extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Stevieware Diplomacy</h1>
                    <h2>Games</h2>
                </div>
                <GameListComponent
                    gameWarehouse={this.props.gameWarehouse}
                />
            </div>
        );
    }

    gameSelected(aGame: Game) {
        this.setState({ selectedGame: aGame });
    }
}

export default GameManagementComponent;
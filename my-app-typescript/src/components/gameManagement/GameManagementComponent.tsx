import * as React from 'react';
import { observer } from 'mobx-react';
import GameListComponent from './GameListComponent';
import GameManagementButtonComponent from './GameManagementButtonComponent';
import { Game } from '../../types/warehouses/Game';
import { IGameWarehouse } from '../../types/warehouses/IGameWarehouse';

interface StateValues {
    selectedGameId: String | null;
}

interface PropValues {
    gameWarehouse: IGameWarehouse;
}

@observer
class GameManagementComponent extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);
        this.gameSelected = this.gameSelected.bind(this);
        this.openSelectedGame = this.openSelectedGame.bind(this);
        this.addGame = this.addGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
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
                    whenGameSelected={this.gameSelected}
                />
                <GameManagementButtonComponent
                    whenOpenGameClicked={this.openSelectedGame}
                    whenAddGameClicked={this.addGame}
                    whenDeleteGameClicked={this.deleteGame}
                />
            </div>
        );
    }

    gameSelected(aGameId: String) {
        this.setState({ selectedGameId: aGameId });
        console.log('gave saved: ' + aGameId);
    }

    openSelectedGame() {
        console.log('open the game');
    }

    addGame() {
        console.log('add game');
    }

    deleteGame() {
        console.log('delete the game');
    }
}

export default GameManagementComponent;
import * as React from 'react';
import { observer } from 'mobx-react';

import GameListGameComponent from './GameListGameComponent';
import { IGameWarehouse } from '../../types/warehouses/IGameWarehouse';
import { Game } from '../../types/warehouses/Game';

interface PropValues {
    gameWarehouse: IGameWarehouse;
}
interface StateValues {
    games: Game[];
    selectedGameName: String | null;
}
@observer
class GameListComponent extends React.Component<PropValues, StateValues> {
    constructor(props: PropValues) {
        super(props);
        this.state = {
            games: this.props.gameWarehouse.getAllGames(),
            selectedGameName: null
        };
        this.selectedGameChanged = this.selectedGameChanged.bind(this);
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        // add components for the existing moves
        this.state.games.forEach((aGame: Game) => {
            theReturn.push((
                <GameListGameComponent
                    game={aGame}
                    whenGameSelected={this.selectedGameChanged}
                    isGameSelected={aGame.name === this.state.selectedGameName}
                />
            )
            );
        });

        return (
            <div id="gamesEntryListComponent">
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Game Name</th>
                    </tr>
                </thead>
                    <tbody>
                        {theReturn}
                    </tbody>
                </table>
            </div>
        );
    }

    selectedGameChanged(aGameName: String, selected: boolean) {
        if (selected) {
            this.setState({ selectedGameName: aGameName });
        } else {
            this.setState({ selectedGameName: null });
        }
    }
}

export default GameListComponent;
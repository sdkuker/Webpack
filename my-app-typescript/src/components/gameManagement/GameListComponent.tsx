import * as React from 'react';
import { observer } from 'mobx-react';

import GameListGameComponent from './GameListGameComponent';
import { IGameWarehouse } from '../../types/warehouses/IGameWarehouse';
import { Game } from '../../types/warehouses/Game';

interface PropValues {
    gameWarehouse: IGameWarehouse;
    whenGameSelected: Function;
}
interface StateValues {
    games: Game[];
    selectedGameId: String | null;
}
@observer
class GameListComponent extends React.Component<PropValues, StateValues> {
    constructor(props: PropValues) {
        super(props);
        this.state = {
            games: this.props.gameWarehouse.getAllGames(),
            selectedGameId: null
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
                    isGameSelected={aGame.id === this.state.selectedGameId}
                />
            )
            );
        });

        return (
            <div id="gamesEntryListComponent">
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Select</th>
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

    selectedGameChanged(aGameId: String, selected: boolean) {
        if (selected) {
            this.setState({ selectedGameId: aGameId });
            this.props.whenGameSelected(aGameId);
        } else {
            this.setState({ selectedGameId: null });
            this.props.whenGameSelected(null);
        }
    }
}

export default GameListComponent;
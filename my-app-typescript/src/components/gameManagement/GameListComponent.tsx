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
    selectedGame: Game | null;
}
@observer
class GameListComponent extends React.Component<PropValues, StateValues> {
    constructor(props: PropValues) {
        super(props);
        this.state = {
            games: this.props.gameWarehouse.getAllGames(),
            selectedGame: null
        };
        this.gameSelected = this.gameSelected.bind(this);
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        // add components for the existing moves
        this.state.games.forEach((aGame: Game) => {
            theReturn.push((
                <GameListGameComponent
                    game={aGame}
                />
            )
            );
        });

        return (
            <div id="gamesEntryListComponent">
                <table className="table">
                    <tbody>
                        {theReturn}
                    </tbody>
                </table>
            </div>
        );
    }

    gameSelected(aGame: Game) {
        this.setState({ selectedGame: aGame });
    }

}

export default GameListComponent;
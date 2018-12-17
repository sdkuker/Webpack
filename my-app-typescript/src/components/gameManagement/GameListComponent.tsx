import * as React from 'react';
import { observer } from 'mobx-react';
import GameListGameComponent from './GameListGameComponent';
import { IGameWarehouse } from '../../types/warehouses/IGameWarehouse';
import { Game } from '../../types/warehouses/Game';
import { observable } from 'mobx';

interface PropValues {
    gameWarehouse: IGameWarehouse;
    whenGameSelected: Function;
}
interface StateValues {
    selectedGameId: String | null;
}
@observer
class GameListComponent extends React.Component<PropValues, StateValues> {

    @observable
    games = new Array<Game>();

    constructor(props: PropValues) {
        super(props);
        this.selectedGameChanged = this.selectedGameChanged.bind(this);
        this.state = {
            selectedGameId: null
        };
    }

    componentDidMount = () => {
        let self = this;
        this.props.gameWarehouse.getAllGames().then((allGamesArray) => {
            self.games = allGamesArray;
        }).catch((error) => {
            console.log('error getting games: ' + error);
        });
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        // add components for the existing moves
        this.games.forEach((aGame: Game) => {
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
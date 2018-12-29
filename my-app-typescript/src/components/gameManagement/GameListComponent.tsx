import * as React from 'react';
import ModalComponent from '../ModalComponent';
import { observer } from 'mobx-react';
import GameListGameComponent from './GameListGameComponent';
import { IGameWarehouse } from '../../types/warehouses/game/IGameWarehouse';
import { Game } from '../../types/warehouses/game/Game';
import { observable } from 'mobx';

interface PropValues {
    gameWarehouse: IGameWarehouse;
    whenGameSelected: Function;
}
interface StateValues {
    selectedGameId: string | null;
    isModalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
}
@observer
class GameListComponent extends React.Component<PropValues, StateValues> {

    @observable
    games = new Array<Game>();

    constructor(props: PropValues) {
        super(props);
        this.selectedGameChanged = this.selectedGameChanged.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            selectedGameId: null,
            isModalOpen: false,
            modalTitle: '',
            modalDescription: ''
        };
    }

    componentDidMount = () => {
        let self = this;
        this.props.gameWarehouse.getAllGames().then((allGamesArray) => {
            self.games = allGamesArray;
        }).catch((error) => {
            this.setState({ isModalOpen: true, modalTitle: 'Unable to get games', modalDescription: error });
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
                <div>
                    <ModalComponent
                        title={this.state.modalTitle}
                        description={this.state.modalDescription}
                        openInitially={this.state.isModalOpen}
                        onClose={this.closeModal}
                    />
                </div>
            </div>
        );
    }

    selectedGameChanged(aGameId: string, selected: boolean) {
        if (selected) {
            this.setState({ selectedGameId: aGameId });
            this.props.whenGameSelected(aGameId);
        } else {
            this.setState({ selectedGameId: null });
            this.props.whenGameSelected(null);
        }
    }
    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }
}

export default GameListComponent;
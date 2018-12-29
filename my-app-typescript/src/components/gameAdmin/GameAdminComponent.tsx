import * as React from 'react';
import ModalComponent from '../ModalComponent';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Game } from '../../types/warehouses/game/Game';
import { IGameWarehouse } from '../../types/warehouses/game/IGameWarehouse';
import { ITurnWarehouse } from '../../types/warehouses/turn/ITurnWarehouse';
import { ICountryWarehouse } from '../../types/warehouses/country/ICountryWarehouse';
import GameAdminGameDetailsComponent from './GameAdminGameDetailsComponent';
import CountryListComponent from './CountryListComponent';
import { observable } from 'mobx';

interface StateValues {
    redirectPath: String | null;
    isModalOpen: boolean;
    errorDescription: string | null;
}

interface PropValues {
    gameId: string;
    gameWarehouse: IGameWarehouse;
    turnWarehouse: ITurnWarehouse;
    countryWarehouse: ICountryWarehouse;
}

@observer
class GameAdminComponent extends React.Component<PropValues, StateValues> {

    @observable
    myGame: Game;

    constructor(props: PropValues) {
        super(props);
        this.nameChanged = this.nameChanged.bind(this);
        this.generateNextTurn = this.generateNextTurn.bind(this);
        this.openGame = this.openGame.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = { redirectPath: null, isModalOpen: false, errorDescription: null };
    }

    componentDidMount = () => {
        let self = this;
        this.props.gameWarehouse.getGameById(this.props.gameId).then((selectedGame) => {
            if (selectedGame) {
                self.myGame = selectedGame;
            }
        }).catch((error) => {
            console.log('error getting game for ID: ' + this.props.gameId + ' with error: ' + error);
        });
    }

    render() {

        // tslint:disable-next-line
        let theReturn: any = [];
        if (this.state.redirectPath) {
            if (this.state.redirectPath === 'openGame') {
                const myPath = '/game/' + this.myGame.id;
                theReturn.push(<Redirect to={myPath} />);
            } else {
                theReturn.push(<Redirect to="/error/" />);
            }
        } else {
            theReturn.push(
                <div className="text-center">
                    <h1>Game Administration</h1>
                </div>
            );
            if (this.myGame) {
                theReturn.push(
                    <GameAdminGameDetailsComponent
                        whenOpenGameClicked={this.openGame}
                        onGameNameChange={this.nameChanged}
                        game={this.myGame}
                        turnWarehouse={this.props.turnWarehouse}
                    />
                );
                theReturn.push(
                    <CountryListComponent
                        game={this.myGame}
                        countryWarehouse={this.props.countryWarehouse}
                    />
                );
            }

        }

        let modalTitle: string = 'Error';
        let modalDescription: string = '';
        if (this.state.errorDescription) {
            modalTitle = 'Error';
            modalDescription = this.state.errorDescription;
        }
        return (
            <div>
                {theReturn}
                <div>
                    <ModalComponent
                        title={modalTitle}
                        description={modalDescription}
                        openInitially={this.state.isModalOpen}
                        onClose={this.closeModal}
                    />
                </div>
            </div>
        );
    }

    nameChanged(aNewGameName: string) {
        this.props.gameWarehouse.updateGameName(this.myGame, aNewGameName);
    }

    openGame() {
        this.setState({ redirectPath: 'openGame' });
    }

    generateNextTurn() {
        console.log('next turn button clicked');
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }
}

export default GameAdminComponent;
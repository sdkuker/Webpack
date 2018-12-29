import * as React from 'react';
import ModalComponent from '../ModalComponent';
import { observer } from 'mobx-react';
import GameListComponent from './GameListComponent';
import GameManagementButtonComponent from './GameManagementButtonComponent';
import { Redirect } from 'react-router-dom';
import { WarehouseManager } from '../../types/warehouses/WarehouseManager';

interface StateValues {
    selectedGameId: String | null;
    redirectPath: String | null;
    isModalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
}

interface PropValues {
    warehouseManager: WarehouseManager;
}

@observer
class GameManagementComponent extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);
        this.gameSelected = this.gameSelected.bind(this);
        this.openSelectedGame = this.openSelectedGame.bind(this);
        this.addGame = this.addGame.bind(this);
        this.administerGame = this.administerGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = { selectedGameId: null, 
                       redirectPath: null, 
                       isModalOpen: false, 
                       modalDescription: '', 
                       modalTitle: '' };
    }

    render() {

        // tslint:disable-next-line
        let theReturn: any = [];
        if (this.state.redirectPath) {
            if (this.state.redirectPath === 'openGame') {
                const myPath = '/game/' + this.state.selectedGameId;
                theReturn.push(<Redirect to={myPath} />);
            } else {
                if (this.state.redirectPath === 'addGame') {
                    const myPath = '/addGame/';
                    theReturn.push(<Redirect to={myPath} />);
                } else {
                    if (this.state.redirectPath === 'deleteGame') {
                        const myPath = '/deleteGame/' + this.state.selectedGameId;
                        theReturn.push(<Redirect to={myPath} />);
                    } else
                        if (this.state.redirectPath === 'administerGame') {
                            const myPath = '/administerGame/' + this.state.selectedGameId;
                            theReturn.push(<Redirect to={myPath} />);
                        } else {
                            theReturn.push(<Redirect to="/error" />);
                        }
                }
            }
        } else {
            theReturn.push(
                (
                    <div className="text-center">
                        <h1>Game List</h1>
                    </div>));

            theReturn.push(
                <GameListComponent
                    gameWarehouse={this.props.warehouseManager.gameWarehouse}
                    whenGameSelected={this.gameSelected}
                />);

            theReturn.push(
                <GameManagementButtonComponent
                    whenOpenGameClicked={this.openSelectedGame}
                    whenAddGameClicked={this.addGame}
                    whenDeleteGameClicked={this.deleteGame}
                    whenAdministerGameClicked={this.administerGame}
                />);
        }

        return (
            <div>
                {theReturn}
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

    gameSelected(aGameId: String) {
        this.setState({ selectedGameId: aGameId });
    }

    openSelectedGame() {
        if (this.state.selectedGameId) {
            this.props.warehouseManager.gameWarehouse.getGameById(this.state.selectedGameId).then((selectedGame) => {
                if (selectedGame) {
                    this.props.warehouseManager.turnWarehouse.getTurns(selectedGame.id);
                    this.setState({ redirectPath: 'openGame' });
                } else {
                    this.setState({
                        isModalOpen: true,
                        modalTitle: 'Error',
                        modalDescription: 'Not able to find game with ID:' + this.state.selectedGameId
                    });
                }
            }).catch((error) => {
                this.setState({
                    isModalOpen: true,
                    modalTitle: 'Unable to get game by ID for : ' + this.state.selectedGameId,
                    modalDescription: error
                });
            });
        } else {
            this.setState({ isModalOpen: true, 
                            modalTitle: 'Error',
                            modalDescription: 'Must select a game to open' });
        }
    }

    addGame = () => {
        let self = this;
        this.props.warehouseManager.gameCreator.createGame().then((newGame) => {
            self.setState({ selectedGameId: newGame.id, redirectPath: 'administerGame' });
        }).catch((error) => {
            this.setState({
                isModalOpen: true,
                modalTitle: 'Error adding a game',
                modalDescription: error
            });
        });
    }

    deleteGame() {
        if (this.state.selectedGameId) {
            this.props.warehouseManager.gameWarehouse.getGameById(this.state.selectedGameId).then((gameToDelete) => {
                if (gameToDelete) {
                    this.props.warehouseManager.gameCreator.deleteGame(gameToDelete).then((gameWasDeleted) => {
                        if (gameWasDeleted) {
                            this.setState({ selectedGameId: null });
                        }
                    }).catch((error) => {
                        this.setState({
                            isModalOpen: true,
                            modalTitle: 'Error deleting a game',
                            modalDescription: error
                        });
                    });
                } else {
                    this.setState({
                        isModalOpen: true,
                        modalTitle: 'Error',
                        modalDescription: 'Unable to delete the game'
                    });
                }
            }).catch((error) => {
                this.setState({
                    isModalOpen: true,
                    modalTitle: 'Unable to get game to delete',
                    modalDescription: error
                });
            });
        } else {
            this.setState({
                isModalOpen: true,
                modalTitle: 'Error',
                modalDescription: 'Must select a game to open'
            });
        }
    }

    administerGame() {
        if (this.state.selectedGameId) {
            this.setState({ redirectPath: 'administerGame' });
        } else {
            this.setState({
                isModalOpen: true,
                modalTitle: 'Error',
                modalDescription: 'Must select a game to administer'
            });
        }
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }
}

export default GameManagementComponent;
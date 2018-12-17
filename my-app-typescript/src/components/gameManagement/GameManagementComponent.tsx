import * as React from 'react';
import * as Modal from 'react-modal';
import { observer } from 'mobx-react';
import GameListComponent from './GameListComponent';
import GameManagementButtonComponent from './GameManagementButtonComponent';
import { Redirect } from 'react-router-dom';
import { WarehouseManager } from '../../types/warehouses/WarehouseManager';

interface StateValues {
    selectedGameId: String | null;
    redirectPath: String | null;
    isModalOpen: boolean;
    errorDescription: string | null;
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

        this.state = { selectedGameId: null, redirectPath: null, isModalOpen: false, errorDescription: null };
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
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };

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
                    <Modal
                        isOpen={this.state.isModalOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        parentSelector={() => document.body}
                    >
                        <h2>{modalTitle}</h2>
                        <div>{modalDescription}</div>
                        <button onClick={this.closeModal}>close</button>
                    </Modal>
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
                        errorDescription: 'Not able to find game with ID:' + this.state.selectedGameId
                    });
                }
            }).catch((error) => {
                console.log('unable to acquire selected game: ' + error);
            });
        } else {
            this.setState({ isModalOpen: true, errorDescription: 'Must select a game to open' });
        }
    }

    addGame = () => {
        let self = this;
        this.props.warehouseManager.gameCreator.createGame().then((newGame) => {
            self.setState({ selectedGameId: newGame.id, redirectPath: 'administerGame' });
        }).catch((error) => {
            console.log('Error adding a game: ' + error);
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
                        console.log('unable to delete game: ' + error);
                    });
                } else {
                    this.setState({ isModalOpen: true, errorDescription: 'Unable to delete the game' });
                }
            }).catch((error) => {
                console.log('unable to get game to delete: ' + error);
            });
        } else {
            this.setState({ isModalOpen: true, errorDescription: 'Must select a game to open' });
        }
    }

    administerGame() {
        if (this.state.selectedGameId) {
            this.setState({ redirectPath: 'administerGame' });
        } else {
            this.setState({ isModalOpen: true, errorDescription: 'Must select a game to administer' });
        }
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }
}

export default GameManagementComponent;
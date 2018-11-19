import * as React from 'react';
import * as Modal from 'react-modal';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Game } from '../../types/warehouses/Game';
import { IGameWarehouse } from '../../types/warehouses/IGameWarehouse';
import GameAdminGameDetailsComponent from './GameAdminGameDetailsComponent';

interface StateValues {
    redirectPath: String | null;
    isModalOpen: boolean;
    errorDescription: string | null;
}

interface PropValues {
    gameWarehouse: IGameWarehouse;
    game: Game;
}

@observer
class GameAdminComponent extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);
        this.nameChanged = this.nameChanged.bind(this);
        this.playerChanged = this.playerChanged.bind(this);
        this.generateNextTurn = this.generateNextTurn.bind(this);
        this.openGame = this.openGame.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = { redirectPath: null, isModalOpen: false, errorDescription: null };
    }

    render() {

        // tslint:disable-next-line
        let theReturn: any = [];
        if (this.state.redirectPath) {
            if (this.state.redirectPath === 'openGame') {
                const myPath = '/game/' + this.props.game.id;
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
            theReturn.push(
                <GameAdminGameDetailsComponent onGameNameChange={this.nameChanged} game={this.props.game} />
            );
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

    nameChanged(aNewGameName: string) {
        console.log('name was changed to: ' + aNewGameName);
    }

    openGame() {
        this.setState({ redirectPath: 'openGame' });
    }

    playerChanged(countryName: string, playerName: string) {
        console.log('payer was changed to: ' + playerName + ' for country: ' + countryName);
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
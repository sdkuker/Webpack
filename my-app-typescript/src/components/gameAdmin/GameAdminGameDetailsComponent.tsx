import * as React from 'react';
import ModalComponent from '../ModalComponent';
import { observer } from 'mobx-react';
import { Game } from '../../types/warehouses/game/Game';
import { ITurnWarehouse } from '../../types/warehouses/turn/ITurnWarehouse';
import { observable } from 'mobx';
import { Turn } from '../../types/warehouses/turn/Turn';

interface PropValues {
    onGameNameChange: Function;
    whenOpenGameClicked: Function;
    game: Game;
    turnWarehouse: ITurnWarehouse;
}

interface StateValues {
    gameName: string | undefined;
    isModalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
}
@observer
class GameAdminGameDetailsComponent extends React.Component<PropValues, StateValues> {

    @observable
    openTurn: Turn;
    constructor(props: PropValues) {
        super(props);
        this.gameNameOnBlurHandler = this.gameNameOnBlurHandler.bind(this);
        this.gameNameOnChangeHandler = this.gameNameOnChangeHandler.bind(this);
        this.openGameClicked = this.openGameClicked.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = { 
            gameName: this.props.game.name, 
            isModalOpen: false, 
            modalDescription: '', 
            modalTitle: '' };
    }

    componentDidMount = () => {
        let self = this;
        this.props.turnWarehouse.getOpenTurn(this.props.game.id).then((anOpenTurn) => {
            self.openTurn = anOpenTurn;
        }).catch((error) => {
            this.setState({ isModalOpen: true, modalTitle: 'Error getting the open turn', modalDescription: error });
        });
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="gameName"><b>Name:</b></label>
                    <input
                        id="gameName"
                        className="col-md-9"
                        type="text"
                        onBlur={this.gameNameOnBlurHandler}
                        value={this.state.gameName}
                        onChange={this.gameNameOnChangeHandler}
                    />
                </div>
                <h2>Current Turn</h2>
                <p>
                    <b>Year: </b>
                    {this.openTurn ? this.openTurn.year : 'no open turn'} 
                    <b> Season: </b>
                    {this.openTurn ? this.openTurn.season : 'no open turn'}
                </p>
                <div className="btn-toolbar" role="toolbar">
                    <div className="brn-group mr-2" role="group">
                        <button 
                            className="btn btn-outline-dark" 
                            onClick={this.openGameClicked}
                        >Open
                        </button>
                    </div>
                    <div className="brn-group mr-2" role="group">
                        <button className="btn btn-outline-dark">Generate Next Turn</button>
                    </div>
                </div>
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

    gameNameOnBlurHandler(event: React.FocusEvent<HTMLInputElement>) {
        this.props.onGameNameChange(this.state.gameName);
    }

    gameNameOnChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let newName = event.target.value;
        // @ts-ignore
        this.setState({ gameName: newName });
    }

    openGameClicked(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.whenOpenGameClicked();
    }
    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }
}

export default GameAdminGameDetailsComponent;
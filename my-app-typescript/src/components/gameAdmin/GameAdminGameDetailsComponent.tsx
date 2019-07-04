import * as React from 'react';
import ModalComponent from '../ModalComponent';
import { observer } from 'mobx-react';
import { Game } from '../../types/warehouses/game/Game';
import { ITurnWarehouse } from '../../types/warehouses/turn/ITurnWarehouse';
import { observable } from 'mobx';
import { Turn } from '../../types/warehouses/turn/Turn';
import { SeasonTypes, TurnPhase } from '../../types/warehouses/DomainTypes';

interface PropValues {
    onGameNameChange: Function;
    whenOpenGameClicked: Function;
    whenNextTurnClicked: Function;
    whenNextPhaseClicked: Function;
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
        this.generateNextTurnClicked = this.generateNextTurnClicked.bind(this);
        this.generateNextPhaseClicked = this.generateNextPhaseClicked.bind(this);
        this.enableGenerateNextTurnButton = this.enableGenerateNextTurnButton.bind(this);
        this.enableGenerateNextPhaseButton = this.enableGenerateNextPhaseButton.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            gameName: this.props.game.name,
            isModalOpen: false,
            modalDescription: '',
            modalTitle: ''
        };
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
        // tslint:disable-next-line
        let generateButtons: any = [];
        let self = this;

        if (self.enableGenerateNextTurnButton(this.openTurn)) {
            generateButtons.push((
                <div className="brn-group mr-2" role="group">
                <button className="btn btn-outline-dark" >Generate Next Turn</button>
                </div>
            ));
        } else {
            generateButtons.push((
                <div className="brn-group mr-2" role="group">
                <button className="btn btn-outline-dark" disabled >Generate Next Turn</button>
                </div>
            ));
        }

        if (self.enableGenerateNextPhaseButton(this.openTurn)) {
            generateButtons.push((
                <div className="brn-group mr-2" role="group">
                <button className="btn btn-outline-dark" >Generate Next Phase</button>
                </div>
            ));
        } else {
            generateButtons.push((
                <div className="brn-group mr-2" role="group">
                <button className="btn btn-outline-dark" disabled >Generate Next Phase</button>
                </div>
            ));
        }

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
                <p className="row">
                    <b className="col-md-1">Year: </b>
                    {this.openTurn ? this.openTurn.year : 'no open turn'}
                    <b className="col-md-1">Season: </b>
                    {this.openTurn ? this.openTurn.season : 'no open turn'}
                    <b className="col-md-1">Phase: </b>
                    {this.openTurn ? this.openTurn.phase : 'no open turn'}
                </p>
                <div className="btn-toolbar" role="toolbar">
                    <div className="brn-group mr-2" role="group">
                        <button
                            className="btn btn-outline-dark"
                            onClick={this.openGameClicked}
                        >Open
                        </button>
                    </div>
                    {generateButtons}
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

    generateNextTurnClicked(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.whenNextTurnClicked();
    }

    generateNextPhaseClicked(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.whenNextPhaseClicked();
    }

    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }

    enableGenerateNextTurnButton(aTurn: Turn) {
        if (aTurn) {
            if (SeasonTypes.Spring === aTurn.season) {
                if (TurnPhase.RetreatAndDisbanding === aTurn.phase) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (TurnPhase.GainingAndLosingUnits === aTurn.phase) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }

    }

    enableGenerateNextPhaseButton(aTurn: Turn) {
        if (aTurn) {
            if (SeasonTypes.Spring === aTurn.season) {
                if (TurnPhase.RetreatAndDisbanding === aTurn.phase) {
                    return false;
                } else {
                    return true;
                }
            } else {
                if (TurnPhase.GainingAndLosingUnits === aTurn.phase) {
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            return false;
        }
    }
}

export default GameAdminGameDetailsComponent;
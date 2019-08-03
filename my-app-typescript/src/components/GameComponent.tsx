import * as React from 'react';
import ModalComponent from './ModalComponent';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import GameMap from './GameMap';
import SeasonSelector from './SeasonSelectorComponent';
import MovesForCountryComponent from './MovesForCountryComponent';
import { Game } from '../types/warehouses/game/Game';
import { Turn } from '../types/warehouses/turn/Turn';
import { TurnPhase } from '../types/warehouses/DomainTypes';
import { ITurnWarehouse } from '../types/warehouses/turn/ITurnWarehouse';
import { IPieceWarehouse } from '../types/warehouses/piece/IPieceWarehouse';
import { IMoveWarehouse } from '../types/warehouses/move/IMoveWarehouse';
import { IGameWarehouse } from '../types/warehouses/game/IGameWarehouse';
import { ICapitalWarehouse } from '../types/warehouses/capital/ICapitalWarehouse';

interface PropertyValues {
    turnWarehouse: ITurnWarehouse;
    pieceWarehouse: IPieceWarehouse;
    moveWarehouse: IMoveWarehouse;
    gameWarehouse: IGameWarehouse;
    capitalWarehouse: ICapitalWarehouse;
    gameId: string;
}
interface StateValues {
    isModalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
}

@observer
class GameComponent extends React.Component<PropertyValues, StateValues> {

    @observable
    myGame: Game;
    @observable
    myTurn: Turn;
    @observable
    myTurnPhase: TurnPhase;

    constructor(props: PropertyValues) {
        super(props);
        this.turnSelected = this.turnSelected.bind(this);
        this.turnPhaseSelected = this.turnPhaseSelected.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            isModalOpen: false,
            modalTitle: '',
            modalDescription: ''
        };
    }

    componentDidMount = () => {
        let self = this;
        this.props.gameWarehouse.getGameById(this.props.gameId).then((selectedGame) => {
            if (selectedGame) {
                self.myGame = selectedGame;
                this.props.turnWarehouse.getOpenTurn(selectedGame.id).then((myOpenTurn) => {
                    self.myTurnPhase = myOpenTurn.phase;
                    self.myTurn = myOpenTurn;
                }).catch((error) => {
                    this.setState({ isModalOpen: true, 
                                    modalTitle: 'Unable to get the open turn', 
                                    modalDescription: error 
                                });
                });
            }
        }).catch((error) => {
            this.setState({ isModalOpen: true, 
                            modalTitle: 'Error getting game for ID: ' + this.props.gameId, 
                            modalDescription: error 
                        });
        });
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];
        if (this.myGame && this.myTurn) {
            theReturn.push(
                <h1>{this.myGame.name}</h1>
            );
            theReturn.push(
                <SeasonSelector
                    onTurnSelected={this.turnSelected}
                    onTurnPhaseSelected={this.turnPhaseSelected}
                    myGame={this.myGame}
                    initialTurn={this.myTurn}
                    myTurnWarehouse={this.props.turnWarehouse}
                />
            );
            theReturn.push(
                <div className="row">
                    <div className="col-md-12">
                        <GameMap
                            pieceWarehouse={this.props.pieceWarehouse}
                            capitalWarehouse={this.props.capitalWarehouse}
                            turn={this.myTurn}
                            turnPhase={this.myTurnPhase}
                        />
                    </div>
                </div>
            );
            if (this.myTurn && 
                (this.myTurn.phase === TurnPhase.OrderWriting  || this.myTurn.phase === TurnPhase.OrderResolution)) {
                theReturn.push(
                    <MovesForCountryComponent
                        myGame={this.myGame}
                        moveWarehouse={this.props.moveWarehouse}
                        myTurn={this.myTurn}
                    />
                );
            }
        }
        return (
            <div className="container">
            <div>
                {theReturn}
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

    turnSelected(aTurn: Turn) {
        // this.setState({ selectedTurn: aTurn });
        this.myTurn = aTurn;
    }

    turnPhaseSelected(aTurnPhase: TurnPhase) {
        // this.setState({ selectedTurnPhase: aTurnPhase });
        this.myTurnPhase = aTurnPhase;
    }

    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }
}

export default GameComponent;
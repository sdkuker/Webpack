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
import { IStandoffProvinceWarehouse } from '../types/warehouses/standoffProvince/IStandoffProvinceWarehouse';
import { StandoffProvince } from '../types/warehouses/standoffProvince/StandoffProvince';
import { ICapitalWarehouse } from '../types/warehouses/capital/ICapitalWarehouse';
import { Piece } from '../types/warehouses/piece/Piece';
import { Capital } from '../types/warehouses/capital/Capital';

interface PropertyValues {
    turnWarehouse: ITurnWarehouse;
    pieceWarehouse: IPieceWarehouse;
    moveWarehouse: IMoveWarehouse;
    gameWarehouse: IGameWarehouse;
    capitalWarehouse: ICapitalWarehouse;
    standoffProvinceWarehouse: IStandoffProvinceWarehouse;
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
    @observable
    pieces = new Array<Piece>();
    @observable
    capitals = new Map<string, Capital>();
    @observable
    myStandoffProvinces = new Array<StandoffProvince>();

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
                    self.getPiecesCapitalsAndStandoffProvinces();
                }).catch((error) => {
                    this.setState({
                        isModalOpen: true,
                        modalTitle: 'Unable to get the open turn',
                        modalDescription: error
                    });
                });
            }
        }).catch((error) => {
            this.setState({
                isModalOpen: true,
                modalTitle: 'Error getting game for ID: ' + this.props.gameId,
                modalDescription: error
            });
        });
    }

    getPiecesCapitalsAndStandoffProvinces = () => {

        let self = this;
        if (self.myTurn && self.myTurnPhase) {
            this.props.pieceWarehouse.getPieces(self.myTurn, self.myTurnPhase).then((pieceArray) => {
                self.pieces = pieceArray;
                // @ts-ignore
                this.props.capitalWarehouse.getCapitals(self.myTurn.id).then((capitalMap) => {
                    self.capitals = capitalMap;
                    this.props.standoffProvinceWarehouse.getStandoffProvincesForTurn(self.myTurn.id)
                        .then((standoffProvinceArray) => {
                            self.myStandoffProvinces = standoffProvinceArray;
                        }).catch((anError) => {
                            this.setState({
                                isModalOpen: true, modalTitle: 'Unable to get standoff provinces',
                                modalDescription: anError
                            });
                        });
                }).catch((error) => {
                    this.setState({ isModalOpen: true, modalTitle: 'Unable to get capitals', modalDescription: error });
                });
            }).catch((error) => {
                this.setState({ isModalOpen: true, modalTitle: 'Unable to get pieces', modalDescription: error });
            });
        }
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
                            pieces={this.pieces}
                            capitals={this.capitals}
                        />
                    </div>
                </div>
            );
            if (this.myTurn &&
                (this.myTurnPhase === TurnPhase.OrderWriting || this.myTurnPhase === TurnPhase.OrderResolution ||
                    this.myTurnPhase === TurnPhase.RetreatAndDisbanding ||
                    this.myTurnPhase === TurnPhase.GainingAndLosingUnits)) {
                theReturn.push(
                    <MovesForCountryComponent
                        myGame={this.myGame}
                        standoffProvinces={this.myStandoffProvinces}
                        moveWarehouse={this.props.moveWarehouse}
                        myTurn={this.myTurn}
                        myTurnPhase={this.myTurnPhase}
                        myPieces={this.pieces}
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
        this.getPiecesCapitalsAndStandoffProvinces();
    }

    turnPhaseSelected(aTurnPhase: TurnPhase) {
        // this.setState({ selectedTurnPhase: aTurnPhase });
        this.myTurnPhase = aTurnPhase;
        this.getPiecesCapitalsAndStandoffProvinces();
    }

    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }
}

export default GameComponent;
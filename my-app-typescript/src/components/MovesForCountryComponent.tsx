import * as React from 'react';
import ModalComponent from './ModalComponent';
import { observer } from 'mobx-react';
import MoveCountrySelector from './MoveCountrySelector';
import MovesListComponent from './MovesListComponent';
import MovesEntryListComponent from './MovesEntryListComponent';
import { IMoveWarehouse } from '../types/warehouses/move/IMoveWarehouse';
import { Turn } from '../types/warehouses/turn/Turn';
import { TurnPhase } from '../types/warehouses/DomainTypes';
import { Game } from '../types/warehouses/game/Game';
import { Move } from '../types/warehouses/move/Move';
import { MoveResults } from '../types/warehouses/move/MoveResults';
import { observable } from 'mobx';

interface PropValues {
    moveWarehouse: IMoveWarehouse;
    myGame: Game;
    myTurn: Turn;
    myTurnPhase: TurnPhase;
}
interface StateValues {
    isModalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
}

@observer
class MovesForCountryComponent extends React.Component<PropValues, StateValues> {

    @observable
    moves = new Array<Move>();
    @observable
    moveResults = new Map<string, MoveResults>();
    @observable
    countryToDisplay: string;

    constructor(props: PropValues) {
        super(props);
        this.countrySelected = this.countrySelected.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            isModalOpen: false,
            modalTitle: '',
            modalDescription: ''
        };
        this.countryToDisplay = 'England';
    }

    componentDidMount = () => {

        this.getMovesAndResults();
    }

    getMovesAndResults = () => {
        let self = this;
        this.props.moveWarehouse.getMoves(self.countryToDisplay, this.props.myTurn.id,
            this.props.myTurn.gameId, false).then((myMovesArray) => {
                self.moves = myMovesArray;
            }).catch((error) => {
                this.setState({ isModalOpen: true, modalTitle: 'Error getting the moves', modalDescription: error });
            });
        this.props.moveWarehouse.getMoveResults(this.props.myTurn.id).then((myMoveResults) => {
                self.moveResults = myMoveResults;
            }).catch((error1) => {
                this.setState({ isModalOpen: true, modalTitle: 'Error getting the move results', 
                    modalDescription: error1 });
            });
    }
    render() {
        // tslint:disable-next-line
        let theMovesComponent: any;
        if (this.props.myTurn) {
            if (this.props.myTurnPhase === TurnPhase.OrderWriting) {
                theMovesComponent =
                    (
                        <MovesEntryListComponent
                            key={this.countryToDisplay}
                            countryName={this.countryToDisplay}
                            game={this.props.myGame}
                            turn={this.props.myTurn}
                            moveWarehouse={this.props.moveWarehouse}
                        />
                    );
            } else {
                if (this.props.myTurnPhase === TurnPhase.RetreatAndDisbanding ||
                    this.props.myTurnPhase === TurnPhase.GainingAndLosingUnits) {
                    theMovesComponent =
                        (
                            <MovesListComponent
                                key={this.countryToDisplay}
                                moves={this.moves}
                            />
                        );
                }
            }
        }

        return (
            <div className="container">
                <div>
                    <MoveCountrySelector
                        onCountrySelected={this.countrySelected}
                        initialCountryName={this.countryToDisplay}
                    />
                    {theMovesComponent}
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

    countrySelected(countryName: string) {
        this.countryToDisplay = countryName;
        this.getMovesAndResults();
    }

    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }

}

export default MovesForCountryComponent;
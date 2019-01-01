import * as React from 'react';
import { observer } from 'mobx-react';

import ModalComponent from './ModalComponent';
import MoveEntryComponent from './MoveEntryComponent';
import { IMoveWarehouse } from '../types/warehouses/move/IMoveWarehouse';
import { Move } from '../types/warehouses/move/Move';
import { Turn } from '../types/warehouses/turn/Turn';
import { Game } from '../types/warehouses/game/Game';
import { MoveValidationResults } from '../types/warehouses/move/MoveValidationResults';
import { observable } from 'mobx';

interface PropValues {
    countryName: string;
    game: Game;
    turn: Turn;
    moveWarehouse: IMoveWarehouse;
}

interface StateValues {
    isModalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
    countryToDisplay: string;
}

@observer
class MovesEntryListComponent extends React.Component<PropValues, StateValues> {

    @observable
    moves = new Array<Move>();

    constructor(props: PropValues) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalTitle: '',
            modalDescription: '',
            countryToDisplay: ''
        };
        this.moveSelected = this.moveSelected.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.moveValidated = this.moveValidated.bind(this);
        this.movePersisted = this.movePersisted.bind(this);
    }

    componentDidMount = () => {
        let self = this;
        this.props.moveWarehouse.getMoves(this.props.countryName,
            this.props.turn.id, this.props.turn.gameId, true).then((myMovesArray) => {
                self.moves = myMovesArray;
            }).catch((error) => {
                this.setState({ isModalOpen: true, modalTitle: 'Error getting the moves', modalDescription: error });
            });
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        // add components for the existing moves
        this.moves.forEach((aMove: Move) => {
            theReturn.push((
                <MoveEntryComponent
                    key={aMove.id}
                    onMoveEntryValidation={this.moveValidated}
                    game={this.props.game}
                    move={aMove}
                    moveWarehouse={this.props.moveWarehouse}
                    onMovePersisted={this.movePersisted}
                />
            )
            );
        });

        return (
            <div id="movesEntryListComponent">
                <table className="table">
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

    moveSelected(countryName: string) {
        this.setState({ countryToDisplay: countryName });
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    moveValidated(myValidationResults: MoveValidationResults) {
        let myModalTitle: string;
        let myModalDescription: string = '';
        if (myValidationResults.isValid) {
            myModalTitle = 'Valid Move';
            myModalDescription = myValidationResults.description;
        } else {
            myModalTitle = 'Invalid Move';
            myModalDescription = myValidationResults.description;
        }
        this.setState({ isModalOpen: true, modalTitle: myModalTitle, modalDescription: myModalDescription });
    }
    movePersisted() {
        // tslint:disable-next-line
        this.props.moveWarehouse.getMoves(this.props.countryName,
            this.props.turn.id, this.props.turn.gameId, true).then((arrayOfMoves) => {
                this.moves = arrayOfMoves;
            }).catch((error) => {
                this.setState({
                    isModalOpen: true, modalTitle: 'Error getting the moves after move persisted',
                    modalDescription: error
                });
            });
    }

}

export default MovesEntryListComponent;
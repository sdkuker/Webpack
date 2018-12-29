import * as React from 'react';
import { observer } from 'mobx-react';

import ModalComponent from './ModalComponent';
import MoveEntryComponent from './MoveEntryComponent';
import { IMoveWarehouse } from '../types/warehouses/move/IMoveWarehouse';
import { Move } from '../types/warehouses/move/Move';
import { Turn } from '../types/warehouses/turn/Turn';
import { Game } from '../types/warehouses/game/Game';
import { MoveValidationResults } from '../types/warehouses/move/MoveValidationResults';

interface PropValues {
    countryName: string;
    game: Game;
    turn: Turn;
    moveWarehouse: IMoveWarehouse;
}
interface StateValues {
    isModalOpen: boolean;
    countryToDisplay: string;
    validationResults: MoveValidationResults;
    moves: Move[];
}
@observer
class MovesEntryListComponent extends React.Component<PropValues, StateValues> {
    constructor(props: PropValues) {
        super(props);
        this.state = {
            isModalOpen: false,
            countryToDisplay: '',
            validationResults: new MoveValidationResults(false, 'placeholder'),
            moves: this.props.moveWarehouse.getMoves(this.props.countryName, 
                                                     this.props.turn.id,
                                                     this.props.turn.gameId, 
                                                     true)
        };
        this.moveSelected = this.moveSelected.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.moveValidated = this.moveValidated.bind(this);
        this.movePersisted = this.movePersisted.bind(this);
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        // add components for the existing moves
        this.state.moves.forEach((aMove: Move) => {
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

        let modalTitle: string = 'Valid Move';
        let modalDescription: string = '';
        if (!this.state.validationResults.isValid) {
            modalTitle = 'Invalid Move';
            modalDescription = this.state.validationResults.description;
        }
        return (
            <div id="movesEntryListComponent">
                <table className="table">
                    <tbody>
                        {theReturn}
                    </tbody>
                </table>
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
        this.setState({ validationResults: myValidationResults, isModalOpen: true });
    }
    movePersisted() {
        // tslint:disable-next-line
        this.setState({ moves: this.props.moveWarehouse.getMoves(this.props.countryName, this.props.turn.id, this.props.turn.gameId, true) });
    }

}

export default MovesEntryListComponent;
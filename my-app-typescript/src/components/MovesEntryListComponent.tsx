import * as React from 'react';
import * as Modal from 'react-modal';
import { observer } from 'mobx-react';

import MoveEntryComponent from './MoveEntryComponent';
import { Move } from '../types/warehouses/Move';
import { Turn } from '../types/warehouses/Turn';
import { MoveValidationResults } from '../types/warehouses/MoveValidationResults';

interface PropValues {
    countryName: string;
    turn: Turn;
    moves: Move[];
}
interface StateValues {
    isModalOpen: boolean;
    countryToDisplay: string;
    validationResults: MoveValidationResults;
}
@observer
class MovesEntryListComponent extends React.Component<PropValues, StateValues> {
    constructor(props: PropValues) {
        super(props);
        this.state = {
            isModalOpen: false,
            countryToDisplay: '',
            validationResults: new MoveValidationResults(false, 'placeholder')
        };
        this.moveSelected = this.moveSelected.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.moveValidated = this.moveValidated.bind(this);
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        // add components for the existing moves
        this.props.moves.forEach((aMove: Move) => {
            theReturn.push((
                <MoveEntryComponent
                    key={aMove.id}
                    onMoveEntryValidation={this.moveValidated}
                    move={aMove}
                />
            )
            );
        });

        // add one more component for a new move to be entered
        const newEntryMove = new Move(999999, 'New Order', this.props.countryName, this.props.turn);
        theReturn.push((
            <MoveEntryComponent
                key={999999}
                onMoveEntryValidation={this.moveValidated}
                move={newEntryMove}
            />
        )
        );

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

        let modalTitle: string = 'Valid Move';
        let modalDescription: string = '';
        if (! this.state.validationResults.isValid) {
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

}

export default MovesEntryListComponent;
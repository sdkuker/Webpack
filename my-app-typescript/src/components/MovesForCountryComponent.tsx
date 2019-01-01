import * as React from 'react';
import ModalComponent from './ModalComponent';
import { observer } from 'mobx-react';
import MoveCountrySelector from './MoveCountrySelector';
import MovesListComponent from './MovesListComponent';
import MovesEntryListComponent from './MovesEntryListComponent';
import { IMoveWarehouse } from '../types/warehouses/move/IMoveWarehouse';
import { Turn } from '../types/warehouses/turn/Turn';
import { TurnStatus } from '../types/warehouses/DomainTypes';
import { Game } from '../types/warehouses/game/Game';
import { Move } from '../types/warehouses/move/Move';
import { observable } from 'mobx';

interface PropValues {
    moveWarehouse: IMoveWarehouse;
    myGame: Game;
    myTurn: Turn;
}
interface StateValues {
    countryToDisplay: string;
    isModalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
}

@observer
class MovesForCountryComponent extends React.Component<PropValues, StateValues> {

    @observable
    moves = new Array<Move>();

    constructor(props: PropValues) {
        super(props);
        this.countrySelected = this.countrySelected.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            countryToDisplay: 'England',
            isModalOpen: false,
            modalTitle: '',
            modalDescription: ''
        };
    }

    componentDidMount = () => {
        let self = this;
        this.props.moveWarehouse.getMoves(this.state.countryToDisplay, this.props.myTurn.id,
            this.props.myTurn.gameId, false).then((myMovesArray) => {
                self.moves = myMovesArray;
            }).catch((error) => {
                this.setState({ isModalOpen: true, modalTitle: 'Error getting the moves', modalDescription: error });
            });
    }

    render() {
        // tslint:disable-next-line
        let theMovesComponent: any;
        if (this.props.myTurn && this.props.myTurn.status === TurnStatus.Open) {
            theMovesComponent =
                (
                    <MovesEntryListComponent
                        key={this.state.countryToDisplay}
                        countryName={this.state.countryToDisplay}
                        game={this.props.myGame}
                        turn={this.props.myTurn}
                        moveWarehouse={this.props.moveWarehouse}
                    />
                );
        } else {
            theMovesComponent =
                (
                    <MovesListComponent
                        key={this.state.countryToDisplay}
                        moves={this.moves}
                    />
                );
        }

        return (
            <div className="container">
                <MoveCountrySelector
                    onCountrySelected={this.countrySelected}
                    initialCountryName={this.state.countryToDisplay}
                />
                {theMovesComponent}
            </div>
        );
    }

    countrySelected(countryName: string) {
        this.setState({ countryToDisplay: countryName });
    }

    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }

}

export default MovesForCountryComponent;
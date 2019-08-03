import * as React from 'react';
import ModalComponent from './ModalComponent';
import { observer, propTypes } from 'mobx-react';
import { ITurnWarehouse } from '../types/warehouses/turn/ITurnWarehouse';
import { SeasonTypes, TurnPhase } from '../types/warehouses/DomainTypes';
import { Game } from '../types/warehouses/game/Game';
import { Turn } from '../types/warehouses/turn/Turn';
import { observable } from 'mobx';

interface PropValues {
    onTurnSelected: Function;
    onTurnPhaseSelected: Function;
    myGame: Game;
    initialTurn: Turn | null;
    myTurnWarehouse: ITurnWarehouse;
}

interface StateValues {
    isModalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
}

@observer
class SeasonSelectorComponent extends React.Component<PropValues, StateValues> {

    @observable
    turns = new Array<Turn>();
    @observable
    myTurn: Turn;
    @observable
    myTurnPhase: TurnPhase;

    constructor(props: PropValues) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        if (props.initialTurn) {
            this.myTurn = props.initialTurn;
            this.myTurnPhase = props.initialTurn.phase;
            this.state = {
                isModalOpen: false,
                modalTitle: '',
                modalDescription: ''
            };
        } else {
            this.state = {
                // @ts-ignore
                selectedTurn: null,
                isModalOpen: false,
                modalTitle: '',
                modalDescription: '',
                selectedTurnPhase: TurnPhase.Diplomatic
            };
        }
    }

    componentDidMount = () => {
        let self = this;
        this.props.myTurnWarehouse.getTurns(this.props.myGame.id).then((myTurnArray) => {
            self.turns = myTurnArray;
        }).catch((error) => {
            this.setState({ isModalOpen: true, modalTitle: 'Error getting the turns', modalDescription: error });
        });
    }

    render() {
        // tslint:disable-next-line
        let yearOptions: any = [];
        let hasSpringTurn = false;
        let hasFallTurn = false;
        if (this.props.myGame) {
            this.turns.forEach((aTurn: Turn) => {
                if (aTurn.season === SeasonTypes.Spring) {
                    // only add the year once
                    if (this.myTurn.year === aTurn.year) {
                        // tslint:disable-next-line
                        yearOptions.push(<option selected>{aTurn.year}</option>);
                    } else {
                        yearOptions.push(<option>{aTurn.year}</option>);
                    }
                }
                if (aTurn.year === this.myTurn.year) {
                    if (aTurn.season === SeasonTypes.Spring) {
                        hasSpringTurn = true;
                    } else {
                        hasFallTurn = true;
                    }
                }
            });
        }
        // tslint:disable-next-line
        let seasonOptions: any = [];
        for (let aType in SeasonTypes) {
            if (SeasonTypes.hasOwnProperty(aType)) {
                if (this.myTurn.season === SeasonTypes[aType]) {
                    // tslint:disable-next-line
                    seasonOptions.push(<option selected key={aType}>{aType}</option>);
                } else {
                    if ((aType === 'Spring' && hasSpringTurn) || (aType === 'Fall' && hasFallTurn)) {
                        seasonOptions.push(<option key={aType}>{aType}</option>);
                    }
                }
            }
        }

        // tslint:disable-next-line
        let phaseOptions: any = [];
        if (this.myTurn.phase === TurnPhase.Diplomatic) {
            phaseOptions.push(<option selected key={'Diplomatic'}>Diplomatic</option>);
        } else {
            phaseOptions.push(<option key={'Diplomatic'}>Diplomatic</option>);
            if (this.myTurn.phase === TurnPhase.OrderWriting) {
                phaseOptions.push(<option selected key={'OrderWriting'}>OrderWriting</option>);
            } else {
                phaseOptions.push(<option key={'OrderWriting'}>OrderWriting</option>);
                if (this.myTurn.phase === TurnPhase.OrderResolution) {
                    phaseOptions.push(<option selected key={'OrderResolution'}>OrderResolution</option>);
                } else {
                    phaseOptions.push(<option key={'OrderResolution'}>OrderResolution</option>);
                    if (this.myTurn.phase === TurnPhase.RetreatAndDisbanding) {
                        phaseOptions.push(<option selected key={'RetreatAndDisbanding'}>RetreatAndDisbanding</option>);
                    } else {
                        phaseOptions.push(<option key={'RetreatAndDisbanding'}>RetreatAndDisbanding</option>);
                        phaseOptions.push((
                            <option selected key={'GainingAndLosingUnits'}>GainingAndLosingUnits</option>));
                    }
                }
            }
        }

        return (
            <form>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label htmlFor="yearSelector"><b>Year:</b></label>
                        <select className="form-control" id="yearSelector" onChange={e => this.yearSelected(e)}>
                            {yearOptions}
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="seasonSelector"><b>Season:</b> </label>
                        <select className="form-control" id="seasonSelector" onChange={e => this.seasonSelected(e)}>
                            {seasonOptions}
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="phaseSelector"><b>Phase:</b> </label>
                        <select className="form-control" id="phaseSelector" onChange={e => this.phaseSelected(e)}>
                            {phaseOptions}
                        </select>
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
            </form>
        );
    }

    yearSelected(event: React.FormEvent<HTMLSelectElement>) {
        let myValue: string = event.currentTarget.value;

        this.props.myTurnWarehouse.getTurn(
            this.props.myGame.id,
            parseInt(myValue, 10),
            this.myTurn.season).then((mySelectedTurn) => {
                if (mySelectedTurn) {
                    this.myTurn = mySelectedTurn;
                    this.props.onTurnSelected(mySelectedTurn);
                }
            }).catch((error) => {
                this.setState({
                    isModalOpen: true,
                    modalTitle: 'Unable to get a turn to set the year',
                    modalDescription: error
                });
            });

    }

    seasonSelected(event: React.FormEvent<HTMLSelectElement>) {
        const myValue: string = event.currentTarget.value;
        let mySeason: SeasonTypes;
        if (myValue === 'Fall') {
            mySeason = SeasonTypes.Fall;
        } else {
            mySeason = SeasonTypes.Spring;
        }
        this.props.myTurnWarehouse.getTurn(
            this.props.myGame.id,
            this.myTurn.year,
            mySeason).then((mySelectedTurn) => {
                if (mySelectedTurn) {
                    this.myTurn = mySelectedTurn;
                    this.props.onTurnSelected(mySelectedTurn);
                }
            }).catch((error) => {
                this.setState({
                    isModalOpen: true,
                    modalTitle: 'error getting a turn when a season was selected',
                    modalDescription: error
                });
            });
    }

    phaseSelected(event: React.FormEvent<HTMLSelectElement>) {
        const myValue: string = event.currentTarget.value;
        if (myValue === 'OrderWriting') {
            this.myTurnPhase = TurnPhase.OrderWriting;
        } else {
            if (myValue === 'OrderResolution') {
                this.myTurnPhase = TurnPhase.OrderResolution;
            } else {
                if (myValue === 'RetreatAndDisbanding') {
                    this.myTurnPhase = TurnPhase.RetreatAndDisbanding;
                } else {
                    if (myValue === 'GainingAndLosingUnits') {
                        this.myTurnPhase = TurnPhase.GainingAndLosingUnits;
                    } else {
                        if (myValue === 'Diplomatic') {
                            this.myTurnPhase = TurnPhase.Diplomatic;
                        }
                    }
                }
            }

        }
        this.props.onTurnPhaseSelected(this.myTurnPhase);
    }

    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }
}

export default SeasonSelectorComponent;
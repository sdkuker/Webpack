import * as React from 'react';
import ModalComponent from './ModalComponent';
import { observer } from 'mobx-react';
import { ITurnWarehouse } from '../types/warehouses/turn/ITurnWarehouse';
import { SeasonTypes, TurnPhase } from '../types/warehouses/DomainTypes';
import { Game } from '../types/warehouses/game/Game';
import { Turn } from '../types/warehouses/turn/Turn';
import { observable } from 'mobx';

interface PropValues {
    onTurnSelected: Function;
    myGame: Game;
    initialTurn: Turn | null;
    myTurnWarehouse: ITurnWarehouse;
}

interface StateValues {
    selectedTurn: Turn;
    isModalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
}

@observer
class SeasonSelectorComponent extends React.Component<PropValues, StateValues> {

    @observable
    turns = new Array<Turn>();

    constructor(props: PropValues) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        if (props.initialTurn) {
            this.state = {
                selectedTurn: props.initialTurn,
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
                modalDescription: ''
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
                    if (this.state.selectedTurn.year === aTurn.year) {
                        // tslint:disable-next-line
                        yearOptions.push(<option selected>{aTurn.year}</option>);
                    } else {
                        yearOptions.push(<option>{aTurn.year}</option>);
                    }
                }
                if (aTurn.year === this.state.selectedTurn.year) {
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
                if (this.state.selectedTurn.season === SeasonTypes[aType]) {
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
        for (let aType in TurnPhase) {
            if (TurnPhase.hasOwnProperty(aType)) {
                if (this.state.selectedTurn.phase === TurnPhase[aType]) {
                    // tslint:disable-next-line
                    phaseOptions.push(<option selected key={aType}>{aType}</option>);
                } else {
                    if (aType === 'Diplomatic' || aType === 'OrderWriting' || aType === 'OrderResolution') {
                        phaseOptions.push(<option key={aType}>{aType}</option>);
                    } else {
                        if (this.state.selectedTurn.season === SeasonTypes.Fall) {
                            phaseOptions.push(<option key={aType}>{aType}</option>);
                        }
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
            this.state.selectedTurn.season).then((mySelectedTurn) => {
                if (mySelectedTurn) {
                    this.setState({ selectedTurn: mySelectedTurn });
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
            this.state.selectedTurn.year,
            mySeason).then((mySelectedTurn) => {
                if (mySelectedTurn) {
                    this.setState({ selectedTurn: mySelectedTurn });
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
        let myPhase: TurnPhase;
        myPhase = TurnPhase.Diplomatic;
        if (myValue === 'OrderWriting') {
            myPhase = TurnPhase.OrderWriting;
        } else {
            if (myValue === 'OrderResolution') {
                myPhase = TurnPhase.OrderResolution;
            } else {
                if (myValue === 'RetreatAndDisbanding') {
                    myPhase = TurnPhase.RetreatAndDisbanding;
                } else {
                    if (myValue === 'GainingAndLosingUnits') {
                        myPhase = TurnPhase.GainingAndLosingUnits;
                    }
                }
            }

        }

        this.state.selectedTurn.phase = myPhase;
        // figure out exactly what to do when these phases change...
        // at a minimum, persist to the db but also trigger some lambda functions
        // probably to do order resolution etc.
    }

    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }
}

export default SeasonSelectorComponent;
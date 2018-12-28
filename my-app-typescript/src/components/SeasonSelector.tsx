import * as React from 'react';
import { observer } from 'mobx-react';
import { ITurnWarehouse } from '../types/warehouses/turn/ITurnWarehouse';
import { SeasonTypes } from '../types/warehouses/DomainTypes';
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
}

@observer
class SeasonSelector extends React.Component<PropValues, StateValues> {

    @observable
    turns = new Array<Turn>();

    constructor(props: PropValues) {
        super(props);
        if (props.initialTurn) {
            this.state = { selectedTurn: props.initialTurn };
        }
    }

    componentDidMount = () => {
        let self = this;
        this.props.myTurnWarehouse.getTurns(this.props.myGame.id).then((myTurnArray) => {
            self.turns = myTurnArray;
        }).catch((error) => {
            console.log('error getting the turns: ' + error);
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

        return (
            <form className="form-inline row">
                <div className="col-md-2">
                    <div className="form-group">
                        <label htmlFor="yearSelector"><b>Year:</b></label>
                        <select className="form-control" id="yearSelector" onChange={e => this.yearSelected(e)}>
                            {yearOptions}
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="seasonSelector"><b>Season:</b> </label>
                        <select className="form-control" id="seasonSelector" onChange={e => this.seasonSelected(e)}>
                            {seasonOptions}
                        </select>
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
                console.log('unable to get a turn to set the year' + error);
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
                console.log('error getting a turn when a season was selected' + error);
            });

    }
}

export default SeasonSelector;
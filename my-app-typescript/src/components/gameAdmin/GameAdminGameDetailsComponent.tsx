import * as React from 'react';
import { observer } from 'mobx-react';
import { Game } from '../../types/warehouses/game/Game';
import { TurnWarehouse } from '../../types/warehouses/turn/TurnWarehouse';
import { ITurnWarehouse } from '../../types/warehouses/turn/ITurnWarehouse';

interface PropValues {
    onGameNameChange: Function;
    whenOpenGameClicked: Function;
    game: Game;
    turnWarehouse: ITurnWarehouse;
}

interface StateValues {
    gameName: string | undefined;
}
@observer
class GameAdminGameDetailsComponent extends React.Component<PropValues, StateValues> {
    constructor(props: PropValues) {
        super(props);
        this.gameNameOnBlurHandler = this.gameNameOnBlurHandler.bind(this);
        this.gameNameOnChangeHandler = this.gameNameOnChangeHandler.bind(this);
        this.openGameClicked = this.openGameClicked.bind(this);
        this.state = { gameName: this.props.game.name };
    }

    render() {

        let openTurn = this.props.turnWarehouse.getOpenTurn(this.props.game.id);
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="gameName"><b>Name:</b></label>
                    <input
                        id="gameName"
                        className="col-md-9"
                        type="text"
                        onBlur={this.gameNameOnBlurHandler}
                        value={this.state.gameName}
                        onChange={this.gameNameOnChangeHandler}
                    />
                </div>
                <h2>Current Turn</h2>
                <p>
                    <b>Year: </b>
                    {openTurn ? openTurn.year : 'no open turn'} 
                    <b> Season: </b>
                    {openTurn ? openTurn.season : 'no open turn'}
                </p>
                <div className="btn-toolbar" role="toolbar">
                    <div className="brn-group mr-2" role="group">
                        <button 
                            className="btn btn-outline-dark" 
                            onClick={this.openGameClicked}
                        >Open
                        </button>
                    </div>
                    <div className="brn-group mr-2" role="group">
                        <button className="btn btn-outline-dark">Generate Next Turn</button>
                    </div>
                </div>

            </div>
        );
    }

    gameNameOnBlurHandler(event: React.FocusEvent<HTMLInputElement>) {
        this.props.onGameNameChange(this.state.gameName);
    }

    gameNameOnChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let newName = event.target.value;
        // @ts-ignore
        this.setState({ gameName: newName });
    }

    openGameClicked(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.whenOpenGameClicked();
    }
}

export default GameAdminGameDetailsComponent;
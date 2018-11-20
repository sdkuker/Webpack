import * as React from 'react';
import { observer } from 'mobx-react';
import { Game } from '../../types/warehouses/Game';
import { TurnWarehouse } from '../../types/warehouses/TurnWarehouse';
import { ITurnWarehouse } from '../../types/warehouses/ITurnWarehouse';

interface PropValues {
    onGameNameChange: Function;
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
        this.state = { gameName: this.props.game.name};
    }

    render() {

        let openTurn = this.props.turnWarehouse.getOpenTurn(this.props.game);
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
                <p><b>Current Turn</b></p>
                <p><b>Year: </b>{openTurn ? openTurn.year : 'no open turn'} <b>Season: </b>{openTurn ? openTurn.season : 'no open turn'}</p>
            </div>
        );
    }

    gameNameOnBlurHandler(event: React.FocusEvent<HTMLInputElement>) {
        this.props.onGameNameChange(this.state.gameName);
    }

    gameNameOnChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let newName = event.target.value;
        // @ts-ignore
        this.setState({ gameName: newName});
    }
}

export default GameAdminGameDetailsComponent;
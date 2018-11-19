import * as React from 'react';
import { observer } from 'mobx-react';
import { Game } from '../../types/warehouses/Game';

interface PropValues {
    onGameNameChange: Function;
    game: Game;
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
        return (
            <div>
                <div className="row">
                    <label>Name: 
                        <input type="text" name="gameName" onBlur={this.gameNameOnBlurHandler} value={this.state.gameName} onChange={this.gameNameOnChangeHandler}/>
                    </label>
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
        this.setState({ gameName: newName});
    }
}

export default GameAdminGameDetailsComponent;
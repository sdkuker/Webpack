import * as React from 'react';
import { Game } from '../../types/warehouses/Game';

interface PropValues {
    game: Game;
    whenGameSelected: Function;
    isGameSelected: boolean;
}
class GameListGameComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
        this.checkboxChanged = this.checkboxChanged.bind(this);
    }
    render() {
        return (
            <tr>
                <td>
                    <input 
                        type="checkbox" 
                        id={this.props.game.id} 
                        onChange={this.checkboxChanged} 
                        checked={this.props.isGameSelected}
                    />
                </td>
                <td>
                    {this.props.game.name}
                </td>
            </tr>
        );
    }
    checkboxChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.whenGameSelected(event.target.id, event.target.checked);
    }
}

export default GameListGameComponent;
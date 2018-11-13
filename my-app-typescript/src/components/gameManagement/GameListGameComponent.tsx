import * as React from 'react';
import { Game } from '../../types/warehouses/Game';

interface PropValues {
    game: Game;
}
class GameListGameComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
    }
    render() {
        return (
            <tr className="d-flex">
                <td className="col-sm-10">
                    {this.props.game.name}
                </td>
            </tr>
        );
    }
}

export default GameListGameComponent;
import * as React from 'react';
import GameMap from './Map';
import GameSelector from './GameSelector';
import SeasonSelector from './SeasonSelector';
import MoveSelector from './MoveSelector';

class Main extends React.Component {
    render() {
        return (
            <div className="container">
                <GameSelector />
                <SeasonSelector />
                <div className="row">
                    <div className="col-md-12">
                        <GameMap />
                    </div>
                </div>
                <MoveSelector />
            </div>
        );
    }
}

export default Main;
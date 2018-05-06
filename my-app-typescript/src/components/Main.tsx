import * as React from 'react';
import GameMap from './Map';
import GameSelector from './GameSelector';
import SeasonSelector from './SeasonSelector';
import MovesComponent from './MovesComponent';

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
                <MovesComponent />
            </div>
        );
    }
}

export default Main;
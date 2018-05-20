import * as React from 'react';
import GameMap from './Map';
import GameSelector from './GameSelector';
import SeasonSelector from './SeasonSelector';
import MovesForCountryComponent from './MovesForCountryComponent';

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
                <MovesForCountryComponent />
            </div>
        );
    }
}

export default Main;
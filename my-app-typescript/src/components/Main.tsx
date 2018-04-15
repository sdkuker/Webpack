import * as React from 'react';
import GameMap from './Map';
import '../map.css';

class Main extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Stevieware Diplomacy</h1>
                <div className="row">
                    <div className="col-md-8">
                        <GameMap />
                    </div>
                    <div className="col-md-2">
                        <span>steve</span>
                    </div>
                    <div className="col-md-2">
                        <span>Marie</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
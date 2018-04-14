import * as React from 'react';
import GameMap from './Map';
import '../map.css';

class Main extends React.Component {
    render() {
        return (
            <div>
                <h1>Stevieware Diplomacy</h1>
                <GameMap />
            </div>
        );
    }
}

export default Main;
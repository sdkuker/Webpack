import * as React from 'react';
import './Map.css';
import { IPositioningProperties } from './PropertyInterfaces';

class Army extends React.Component<IPositioningProperties> {

    render() {
        return (
            <g className={this.props.className} transform={'translate(' + this.props.x + ', ' + this.props.y + ')'}>
                <path d="M9,-6 L2,0 M9,6 L0,0" />
                <path d="M-11,-6 v4 h17 a2,2 0,0 0 0,-4z" />
                <circle r="6" />
            </g>
        );
    }

}

export default Army;

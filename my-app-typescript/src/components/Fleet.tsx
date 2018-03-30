import * as React from 'react';
import './Map.css';
import { ICircleProperties } from './PropertyInterfaces';

class Fleet extends React.Component<ICircleProperties> {

    render() {
        return (
            <g className={this.props.className} transform={'translate(' + this.props.x + ', ' + this.props.y + ')'}>
                <polygon points="-2,-3 10,-3 -2,-13" />
                <polygon points="-12,-1 -6,5 6,5 12,-1" />
            </g>

        );
    }

}

export default Fleet;

import * as React from 'react';
import './Map.css';
import { ICircleProperties } from './PropertyInterfaces';

class Fleet extends React.Component<ICircleProperties> {

    render() {
        return (
            <svg className={this.props.className}>
                <g transform="translate(162, 281)">
                    <polygon points="-2,-3 10,-3 -2,-13" />
                    <polygon points="-12,-1 -6,5 6,5 12,-1" />
                </g>
            </svg>
        );
    }

}

export default Fleet;

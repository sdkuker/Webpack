import * as React from 'react';
import './Map.css';
import { ICircleProperties } from './PropertyInterfaces';

class Circle extends React.Component<ICircleProperties> {

  render() {
    return (
        <g> 
          <circle r="4" cx={this.props.x} cy={this.props.y} className={this.props.className}/>
        </g>
    );
  }

}

export default Circle;

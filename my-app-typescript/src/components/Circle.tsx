import * as React from 'react';
import './Map.css';
import { IPositioningProperties } from './PropertyInterfaces';

class Circle extends React.Component<IPositioningProperties> {

  render() {
    return (
      <circle r="4" cx={this.props.x} cy={this.props.y} className={this.props.className} />
    );
  }

}

export default Circle;

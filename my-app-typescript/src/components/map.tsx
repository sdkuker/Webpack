import * as React from 'react';

class Map extends React.Component {

  render() {
    return (
      <svg width={window.innerWidth} height={window.innerHeight} >
        <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
        <text x="0" y="115" fill="red">Steveie's svg text</text>
      </svg>
    );
  }

}

export default Map;

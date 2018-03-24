import * as React from 'react';
import './Hello.css';
import { observer } from 'mobx-react';
import * as DomainStore from '../types/stores/domainStore';

@observer
class Map extends React.Component {

  render() {
    return (
      <div className="hello">
        <div className="greeting">
          Hello {DomainStore.domainState.name + getExclamationMarks(DomainStore.domainState.enthusiasmLevel)}
        </div>
        <div>
          <button onClick={DomainStore.domainState.incrementEnthusiasmLevel}>+</button>
          <button onClick={DomainStore.domainState.decrementEnthusiasmLevel}>-</button>
        </div>
      </div>
    );
  }

}

export default Map;

// helpers

function getExclamationMarks(numChars: number) {
  if (numChars < 1) {
    return Array(1).join('!');
  } else {
      return Array(numChars + 1).join('!');
  }
}
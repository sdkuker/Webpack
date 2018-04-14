import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './map.css';
import Main from './components/Main';

ReactDOM.render(
  <Main/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// import Hello from './components/Hello';
import Map from './components/Map';

/*ReactDOM.render(
  <Hello/>,
  document.getElementById('root') as HTMLElement
); */
ReactDOM.render(
  <Map/>,
  document.getElementById('map') as HTMLElement
);
registerServiceWorker();

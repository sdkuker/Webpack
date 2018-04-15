import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './map.css';
import Main from './components/Main';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Main/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

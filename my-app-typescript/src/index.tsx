import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './map.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Modal from 'react-modal';

Modal.setAppElement('#root');

ReactDOM.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), 
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

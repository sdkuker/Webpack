import * as React from 'react';
import Router from './Router';
import Header from './Header';

class App extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <Header />
                <Router />
            </div>
        );
    }
}

export default App;
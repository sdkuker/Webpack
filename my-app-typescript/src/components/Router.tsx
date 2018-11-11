import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Player from './Player';
import AdminComponent from './AdminComponent';

class Router extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Player} />
                    <Route path="/player" component={Player} />
                    <Route path="/admin" component={AdminComponent} />
                </Switch>
            </div>
        );
    }
}

export default Router;
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameComponent from './GameComponent';
import AdminComponent from './AdminComponent';

class Router extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={GameComponent} />
                    <Route path="/game" component={GameComponent} />
                    <Route path="/admin" component={AdminComponent} />
                </Switch>
            </div>
        );
    }
}

export default Router;
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IGameWarehouse } from '../types/warehouses/IGameWarehouse';
import GameComponent from './GameComponent';
import AdminComponent from './AdminComponent';
import GameManagementComponent from './gameManagement/GameManagementComponent';
import { GameWarehouse } from '../types/warehouses/GameWarehouse';
import { StaticGameDataProvider } from '../types/warehouses/StaticGameDataProvider';
import { myConfig } from './Config';

interface StateValues {
    gameWarehouse: IGameWarehouse;
}
class Router extends React.Component < { }, StateValues> {

    constructor() {
        super({});
        if (myConfig.dataProviders === 'static') {
            const mine =  new GameWarehouse(new StaticGameDataProvider(null));
            this.state = { gameWarehouse: mine };
        }
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route 
                           exact 
                           path="/" 
                           render={(routeProps) => 
                           (<GameManagementComponent {...routeProps} gameWarehouse={this.state.gameWarehouse}/>)} 
                    />
                    <Route 
                        path="/game" 
                        render={(routeProps) => 
                            (<GameManagementComponent {...routeProps} gameWarehouse={this.state.gameWarehouse}/>)} 
                    />
                    <Route path="/admin" component={AdminComponent} />
                </Switch>
            </div>
        );
    }
}

export default Router;
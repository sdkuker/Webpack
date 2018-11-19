import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IGameWarehouse } from '../types/warehouses/IGameWarehouse';
import GameComponent from './GameComponent';
import GameAdminComponent from './gameAdmin/GameAdminComponent';
import ErrorComponent from './ErrorComponent';
import GameManagementComponent from './gameManagement/GameManagementComponent';
import { GameWarehouse } from '../types/warehouses/GameWarehouse';
import { StaticGameDataProvider } from '../types/warehouses/StaticGameDataProvider';
import { myConfig } from './Config';

interface StateValues {
    gameWarehouse: IGameWarehouse;
}
class Router extends React.Component<{}, StateValues> {

    constructor() {
        super({});
        if (myConfig.dataProviders === 'static') {
            const mine = new GameWarehouse(new StaticGameDataProvider(null));
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
                            (<GameManagementComponent {...routeProps} gameWarehouse={this.state.gameWarehouse} />)}
                    />
                    <Route
                        path="/gameManagement"
                        render={(routeProps) =>
                            (<GameManagementComponent {...routeProps} gameWarehouse={this.state.gameWarehouse} />)}
                    />
                    <Route
                        path="/administerGame/:gameId"
                        render={(routeProps) =>
                            (this.state.gameWarehouse.getGameById(routeProps.match.params.gameId) ?
                                // @ts-ignore
                                <GameAdminComponent {...routeProps} gameWarehouse={this.state.gameWarehouse} game={this.state.gameWarehouse.getGameById(routeProps.match.params.gameId)} /> :
                                <ErrorComponent />
                            )}
                    />
                    <Route
                        path="/game/:gameId"
                        render={(routeProps) =>
                            (this.state.gameWarehouse.getGameById(routeProps.match.params.gameId) ?
                                // @ts-ignore
                                <GameComponent {...routeProps} selectedGame={this.state.gameWarehouse.getGameById(routeProps.match.params.gameId)} /> :
                                <ErrorComponent />
                            )}
                    />
                    <Route
                        path="/error/"
                        render={(routeProps) =>
                            (<ErrorComponent {...routeProps} />)}
                    />
                </Switch>
            </div>
        );
    }
}

export default Router;
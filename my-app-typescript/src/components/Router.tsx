import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameComponent from './GameComponent';
import GameAdminComponent from './gameAdmin/GameAdminComponent';
import ErrorComponent from './ErrorComponent';
import GameManagementComponent from './gameManagement/GameManagementComponent';
import { WarehouseManager } from '../types/warehouses/WarehouseManager';

interface StateValues {
    warehouseManager: WarehouseManager;
}

class Router extends React.Component<{}, StateValues> {

    constructor() {
        super({});
        this.state = { warehouseManager: new WarehouseManager() };
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(routeProps) =>
                            (<GameManagementComponent
                                {...routeProps}
                                warehouseManager={this.state.warehouseManager}
                            />)}
                    />
                    <Route
                        path="/gameManagement"
                        render={(routeProps) =>
                            (<GameManagementComponent
                                {...routeProps}
                                warehouseManager={this.state.warehouseManager}
                            />)}
                    />
                    <Route
                        path="/administerGame/:gameId"
                        render={(routeProps) =>
                            (routeProps.match.params.gameId ?
                                <GameAdminComponent
                                    {...routeProps}
                                    gameWarehouse={this.state.warehouseManager.gameWarehouse}
                                    gameId={routeProps.match.params.gameId}
                                    turnWarehouse={this.state.warehouseManager.turnWarehouse}
                                    countryWarehouse={this.state.warehouseManager.countryWarehouse}
                                /> :
                        <ErrorComponent />)}
                    />
                    <Route
                        path="/game/:gameId"
                        render={(routeProps) =>
                            (this.state.warehouseManager.gameWarehouse.getGameById(routeProps.match.params.gameId) ?
                                <GameComponent
                                    {...routeProps}
                                    gameWarehouse={this.state.warehouseManager.gameWarehouse}
                                    turnWarehouse={this.state.warehouseManager.turnWarehouse}
                                    pieceWarehouse={this.state.warehouseManager.pieceWarehouse}
                                    moveWarehouse={this.state.warehouseManager.moveWarehouse}
                                    capitalWarehouse={this.state.warehouseManager.capitalWarehouse}
                                    gameId={routeProps.match.params.gameId}
                                /> :
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
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IGameWarehouse } from '../types/warehouses/IGameWarehouse';
import GameComponent from './GameComponent';
import GameAdminComponent from './gameAdmin/GameAdminComponent';
import ErrorComponent from './ErrorComponent';
import GameManagementComponent from './gameManagement/GameManagementComponent';
import { GameWarehouse } from '../types/warehouses/GameWarehouse';
import { StaticGameDataProvider } from '../types/warehouses/StaticGameDataProvider';
import { ITurnWarehouse } from '../types/warehouses/ITurnWarehouse';
import { TurnWarehouse } from '../types/warehouses/TurnWarehouse';
import { StaticTurnDataProvider } from '../types/warehouses/StaticTurnDataProvider';

import { myConfig } from './Config';

interface StateValues {
    gameWarehouse: IGameWarehouse;
    turnWarehouse: ITurnWarehouse;
}
class Router extends React.Component<{}, StateValues> {

    constructor() {
        super({});
        if (myConfig.dataProviders === 'static') {
            const myGameWarehouse = new GameWarehouse(new StaticGameDataProvider(null));
            const myTurnWarehouse = new TurnWarehouse(new StaticTurnDataProvider(null));
            this.state = { gameWarehouse: myGameWarehouse, turnWarehouse:  myTurnWarehouse };
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
                                <GameAdminComponent 
                                    {...routeProps} 
                                    gameWarehouse={this.state.gameWarehouse} 
                                     // @ts-ignore
                                    game={this.state.gameWarehouse.getGameById(routeProps.match.params.gameId)} 
                                    turnWarehouse={this.state.turnWarehouse}
                                /> :
                                <ErrorComponent />
                            )}
                    />
                    <Route
                        path="/game/:gameId"
                        render={(routeProps) =>
                            (this.state.gameWarehouse.getGameById(routeProps.match.params.gameId) ?
                                <GameComponent 
                                    {...routeProps} 
                                    // @ts-ignore
                                    selectedGame={this.state.gameWarehouse.getGameById(routeProps.match.params.gameId)} 
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
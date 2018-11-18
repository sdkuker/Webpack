import * as React from 'react';
import { observer } from 'mobx-react';
import GameListComponent from './GameListComponent';
import GameManagementButtonComponent from './GameManagementButtonComponent';
import { Redirect } from 'react-router-dom';
import { IGameWarehouse } from '../../types/warehouses/IGameWarehouse';

interface StateValues {
    selectedGameId: String | null;
    redirectPath: String | null;
}

interface PropValues {
    gameWarehouse: IGameWarehouse;
}

@observer
class GameManagementComponent extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);
        this.gameSelected = this.gameSelected.bind(this);
        this.openSelectedGame = this.openSelectedGame.bind(this);
        this.addGame = this.addGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);

        this.state = { selectedGameId: null, redirectPath: null };
    }

    render() {

        // tslint:disable-next-line
        let theReturn: any = [];
        if (this.state.redirectPath) {
            if (this.state.redirectPath === 'openGame') {
                const myPath = '/game/' + this.state.selectedGameId;
                theReturn.push(<Redirect to={myPath} />);
            } else {
                if (this.state.redirectPath === 'newGame') {
                    const myPath = '/newGame/';
                    theReturn.push(<Redirect to={myPath} />);
                } else {
                    if (this.state.redirectPath === 'deleteGame') {
                        const myPath = '/delete/' + this.state.selectedGameId;
                        theReturn.push(<Redirect to={myPath} />);
                    } else {
                        theReturn.push(<Redirect to="/admin" />);
                    }
                }
            }
        } else {
            theReturn.push(
                (
                    <div className="jumbotron text-center">
                        <h1>Stevieware Diplomacy</h1>
                        <h2>Games</h2>
                    </div>));

            theReturn.push(
                <GameListComponent
                    gameWarehouse={this.props.gameWarehouse}
                    whenGameSelected={this.gameSelected}
                />);

            theReturn.push(
                <GameManagementButtonComponent
                    whenOpenGameClicked={this.openSelectedGame}
                    whenAddGameClicked={this.addGame}
                    whenDeleteGameClicked={this.deleteGame}
                />);
        }
        return (
            <div>
                {theReturn}
            </div>
        );
    }

    gameSelected(aGameId: String) {
        this.setState({ selectedGameId: aGameId });
    }

    openSelectedGame() {
        this.setState({ redirectPath: 'openGame' });
    }

    addGame() {
        console.log('add game');
    }

    deleteGame() {
        console.log('delete the game');
    }
}

export default GameManagementComponent;
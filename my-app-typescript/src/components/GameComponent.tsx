import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import GameMap from './Map';
import SeasonSelector from './SeasonSelector';
import MovesForCountryComponent from './MovesForCountryComponent';
import { Game } from '../types/warehouses/game/Game';
import { Turn } from '../types/warehouses/turn/Turn';
import { ITurnWarehouse } from '../types/warehouses/turn/ITurnWarehouse';
import { IPieceWarehouse } from '../types/warehouses/piece/IPieceWarehouse';
import { IMoveWarehouse } from '../types/warehouses/move/IMoveWarehouse';
import { IGameWarehouse } from '../types/warehouses/game/IGameWarehouse';

interface PropertyValues {
    turnWarehouse: ITurnWarehouse;
    pieceWarehouse: IPieceWarehouse;
    moveWarehouse: IMoveWarehouse;
    gameWarehouse: IGameWarehouse;
    gameId: string;
}

@observer
class GameComponent extends React.Component<PropertyValues, {}> {

    @observable
    myGame: Game;
    @observable
    myTurn: Turn;

    constructor(props: PropertyValues) {
        super(props);
        this.turnSelected = this.turnSelected.bind(this);
    }

    componentDidMount = () => {
        let self = this;
        this.props.gameWarehouse.getGameById(this.props.gameId).then((selectedGame) => {
            if (selectedGame) {
                self.myGame = selectedGame;
                self.myTurn = this.props.turnWarehouse.getOpenTurn(selectedGame.id);
            }
        }).catch((error) => {
            console.log('error getting game for ID: ' + this.props.gameId + ' with error: ' + error);
        });
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];
        if (this.myGame && this.myTurn) {
            theReturn.push(
                <h1>{this.myGame.name}</h1>
            );
            theReturn.push(
                <SeasonSelector
                    onTurnSelected={this.turnSelected}
                    myGame={this.myGame}
                    initialTurn={this.myTurn}
                    myTurnWarehouse={this.props.turnWarehouse}
                />
            );
            theReturn.push(
                <div className="row">
                    <div className="col-md-12">
                        <GameMap
                            pieceWarehouse={this.props.pieceWarehouse}
                            turn={this.myTurn}
                        />
                    </div>
                </div>
            );
            theReturn.push(
                <MovesForCountryComponent
                    myGame={this.myGame}
                    moveWarehouse={this.props.moveWarehouse}
                    myTurn={this.myTurn}
                />
            );
        }
        return (
            <div className="container">
                {theReturn}
            </div>
        );
    }

    turnSelected(aTurn: Turn) {
        this.setState({ selectedTurn: aTurn });
    }
}

export default GameComponent;

import { IGameWarehouse } from './game/IGameWarehouse';
import { GameWarehouse } from './game/GameWarehouse';
import { StaticGameDataProvider } from './game/StaticGameDataProvider';
import { ITurnWarehouse } from './turn/ITurnWarehouse';
import { TurnWarehouse } from './turn/TurnWarehouse';
import { StaticTurnDataProvider } from './turn/StaticTurnDataProvider';
import { ICountryWarehouse } from './country/ICountryWarehouse';
import { CountryWarehouse } from './country/CountryWarehouse';
import { StaticCountryDataProvider } from './country/StaticCountryDataProvider';
import { IMoveWarehouse } from './move/IMoveWarehouse';
import { MoveWarehouse } from './move/MoveWarehouse';
import { StaticMoveDataProvider } from './move/StaticMoveDataProvider';
import { IPieceWarehouse } from './piece/IPieceWarehouse';
import { PieceWarehouse } from './piece/PieceWarehouse';
import { StaticPieceDataProvider } from './piece/StaticPieceDataProvider';
import { GameCreator } from './GameCreator';
import { IGameCreator } from './IGameCreator';
import { myConfig } from './Config';

export class WarehouseManager  {

    gameWarehouse: IGameWarehouse;
    turnWarehouse: ITurnWarehouse;
    countryWarehouse: ICountryWarehouse;
    moveWarehouse: IMoveWarehouse;
    pieceWarehouse: IPieceWarehouse;
    gameCreator: IGameCreator;

    constructor() {

        if (myConfig.gameWarehouseDataProvider === 'static') {
            this.gameWarehouse = new GameWarehouse(new StaticGameDataProvider(null));
        } else {
            this.gameWarehouse = new GameWarehouse(new StaticGameDataProvider(null));
        }

        if (myConfig.turnWarehouseDataProvider === 'static') {
            this.turnWarehouse = new TurnWarehouse(new StaticTurnDataProvider(null, null));
        } else {
            this.turnWarehouse = new TurnWarehouse(new StaticTurnDataProvider(null, null));
        }

        if (myConfig.countryWarehouseDataProvider === 'static') {
            this.countryWarehouse = new CountryWarehouse(new StaticCountryDataProvider(null, null), null);
        } else {
            this.countryWarehouse = new CountryWarehouse(new StaticCountryDataProvider(null, null), null);
        }

        if (myConfig.moveWarehouseDataProvider === 'static') {
            this.moveWarehouse = new MoveWarehouse(new StaticMoveDataProvider());
        } else {
            this.moveWarehouse = new MoveWarehouse(new StaticMoveDataProvider());
        }

        if (myConfig.pieceWarehouseDataProvider === 'static') {
            this.pieceWarehouse = new PieceWarehouse(new StaticPieceDataProvider());
        } else {
            this.pieceWarehouse = new PieceWarehouse(new StaticPieceDataProvider());
        }

        this.gameCreator = new GameCreator( this.gameWarehouse, this.turnWarehouse, 
                                            this.pieceWarehouse, this.moveWarehouse,
                                            this.countryWarehouse);
    }
}
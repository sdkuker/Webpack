
import { IGameWarehouse } from './IGameWarehouse';
import { GameWarehouse } from './GameWarehouse';
import { StaticGameDataProvider } from './StaticGameDataProvider';
import { ITurnWarehouse } from './ITurnWarehouse';
import { TurnWarehouse } from './TurnWarehouse';
import { StaticTurnDataProvider } from './StaticTurnDataProvider';
import { ICountryWarehouse } from './ICountryWarehouse';
import { CountryWarehouse } from './CountryWarehouse';
import { StaticCountryDataProvider } from './StaticCountryDataProvider';
import { IMoveWarehouse } from './IMoveWarehouse';
import { MoveWarehouse } from './MoveWarehouse';
import { StaticMoveDataProvider } from './StaticMoveDataProvider';
import { IPieceWarehouse } from './IPieceWarehouse';
import { PieceWarehouse } from './PieceWarehouse';
import { StaticPieceDataProvider } from './StaticPieceDataProvider';
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
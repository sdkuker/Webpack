
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

import { myConfig } from './Config';

export class WarehouseManager  {

    gameWarehouse: IGameWarehouse;
    turnWarehouse: ITurnWarehouse;
    countryWarehouse: ICountryWarehouse;
    moveWarehouse: IMoveWarehouse;
    pieceWarehouse: IPieceWarehouse;

    constructor() {

        if (myConfig.dataProviders === 'static') {
            this.gameWarehouse = new GameWarehouse(new StaticGameDataProvider(null));
            this.turnWarehouse = new TurnWarehouse(new StaticTurnDataProvider(null, null));
            this.countryWarehouse = new CountryWarehouse(new StaticCountryDataProvider(null), null);
            this.moveWarehouse = new MoveWarehouse(new StaticMoveDataProvider(null, null, this.turnWarehouse));
            this.pieceWarehouse = new PieceWarehouse(new StaticPieceDataProvider(null));
        }
    }
}
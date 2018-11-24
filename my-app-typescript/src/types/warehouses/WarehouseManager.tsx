
import { IGameWarehouse } from './IGameWarehouse';
import { GameWarehouse } from './GameWarehouse';
import { StaticGameDataProvider } from './StaticGameDataProvider';
import { ITurnWarehouse } from './ITurnWarehouse';
import { TurnWarehouse } from './TurnWarehouse';
import { StaticTurnDataProvider } from './StaticTurnDataProvider';
import { ICountryWarehouse } from './ICountryWarehouse';
import { CountryWarehouse } from './CountryWarehouse';
import { StaticCountryDataProvider } from './StaticCountryDataProvider';

import { myConfig } from './Config';

export class WarehouseManager  {

    gameWarehouse: IGameWarehouse;
    turnWarehouse: ITurnWarehouse;
    countryWarehouse: ICountryWarehouse;

    constructor() {

        if (myConfig.dataProviders === 'static') {
            this.gameWarehouse = new GameWarehouse(new StaticGameDataProvider(null));
            this.turnWarehouse = new TurnWarehouse(new StaticTurnDataProvider(null));
            this.countryWarehouse = new CountryWarehouse(new StaticCountryDataProvider(null), null);
        }
    
    }
}
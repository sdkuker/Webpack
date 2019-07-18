
import { IGameWarehouse } from './game/IGameWarehouse';
import { GameWarehouse } from './game/GameWarehouse';
import { StaticGameDataProvider } from './game/StaticGameDataProvider';
import { FirebaseGameDataProvider } from './game/FirebaseGameDataProvider';
import { ITurnWarehouse } from './turn/ITurnWarehouse';
import { TurnWarehouse } from './turn/TurnWarehouse';
import { StaticTurnDataProvider } from './turn/StaticTurnDataProvider';
import { FirebaseTurnDataProvider } from './turn/FirebaseTurnDataProvider';
import { ICountryWarehouse } from './country/ICountryWarehouse';
import { CountryWarehouse } from './country/CountryWarehouse';
import { StaticCountryDataProvider } from './country/StaticCountryDataProvider';
import { FirebaseCountryDataProvider } from './country/FirebaseCountryDataProvider';
import { IMoveWarehouse } from './move/IMoveWarehouse';
import { MoveWarehouse } from './move/MoveWarehouse';
import { StaticMoveDataProvider } from './move/StaticMoveDataProvider';
import { FirebaseMoveDataProvider } from './move/FirebaseMoveDataProvider';
import { IPieceWarehouse } from './piece/IPieceWarehouse';
import { PieceWarehouse } from './piece/PieceWarehouse';
import { StaticPieceDataProvider } from './piece/StaticPieceDataProvider';
import { FirebasePieceDataProvider } from './piece/FirebasePieceDataProvider';
import { AwsWarehouse } from './aws/AwsWarehouse';
import { IAwsWarehouse } from './aws/IAwsWarehouse';
import { StaticAwsWarehouse } from './aws/StaticAwsWarehouse';

import { ICapitalWarehouse } from './capital/ICapitalWarehouse';
import { CapitalWarehouse } from './capital/CapitalWarehouse';
import { StaticCapitalDataProvider } from './capital/StaticCapitalDataProvider';
import { FirebaseCapitalDataProvider } from './capital/FirebaseCapitalDataProvider';

import { GameCreator } from './GameCreator';
import { IGameCreator } from './IGameCreator';
import { myConfig } from './Config';
import { EnvironmentName } from './PersistenceTypes';

export class WarehouseManager {

    gameWarehouse: IGameWarehouse;
    turnWarehouse: ITurnWarehouse;
    countryWarehouse: ICountryWarehouse;
    moveWarehouse: IMoveWarehouse;
    pieceWarehouse: IPieceWarehouse;
    capitalWarehouse: ICapitalWarehouse;
    gameCreator: IGameCreator;
    awsWarehouse: IAwsWarehouse;

    constructor() {

        let myEnvironment = EnvironmentName.Prod;
        if (myConfig.environment === 'PROD') {
            myEnvironment = EnvironmentName.Prod;
        } else {
            if (myConfig.environment === 'TEST') {
                myEnvironment = EnvironmentName.Test;
            } else {
                myEnvironment = EnvironmentName.UnitTest;
            }
        }

        if (myConfig.gameWarehouseDataProvider === 'static') {
            this.gameWarehouse = new GameWarehouse(new StaticGameDataProvider(null));
        } else {
            this.gameWarehouse = new GameWarehouse(new FirebaseGameDataProvider(myEnvironment));
        }

        if (myConfig.countryWarehouseDataProvider === 'static') {
            this.countryWarehouse = new CountryWarehouse(new StaticCountryDataProvider(null, null), null);
        } else {
            this.countryWarehouse = new CountryWarehouse(new FirebaseCountryDataProvider(myEnvironment), null);
        }

        if (myConfig.moveWarehouseDataProvider === 'static') {
            this.moveWarehouse = new MoveWarehouse(new StaticMoveDataProvider());
        } else {
            this.moveWarehouse = new MoveWarehouse(new FirebaseMoveDataProvider(myEnvironment));
        }

        if (myConfig.pieceWarehouseDataProvider === 'static') {
            this.pieceWarehouse = new PieceWarehouse(new StaticPieceDataProvider());
        } else {
            this.pieceWarehouse = new PieceWarehouse(new FirebasePieceDataProvider(myEnvironment));
        }

        if (myConfig.capitalWarehouseDataProvider === 'static') {
            this.capitalWarehouse = new CapitalWarehouse(new StaticCapitalDataProvider(null, null));
        } else {
            this.capitalWarehouse = new CapitalWarehouse(new FirebaseCapitalDataProvider(myEnvironment));
        }

        if (myConfig.awsEnvironment === 'REMOTE') {
            this.awsWarehouse = new AwsWarehouse(myConfig.awsRemoteConnectionURL);
        } else {
            this.awsWarehouse = new AwsWarehouse(myConfig.awsLocalConnectionURL);
        }

        if (myConfig.turnWarehouseDataProvider === 'static') {
            this.turnWarehouse = new TurnWarehouse(new StaticTurnDataProvider(null, null), this.awsWarehouse);
        } else {
            this.turnWarehouse = new TurnWarehouse(new FirebaseTurnDataProvider(myEnvironment), this.awsWarehouse);
        }

        this.gameCreator = new GameCreator(this.gameWarehouse, this.turnWarehouse,
            this.pieceWarehouse, this.moveWarehouse,
            this.countryWarehouse, this.capitalWarehouse);
    }
}
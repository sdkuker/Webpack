import { StandoffProvince } from './StandoffProvince';
import { IStandoffProvinceWarehouse } from './IStandoffProvinceWarehouse';
import { IStandoffProvinceDataProvider } from './IStandoffProvinceDataProvider';

export class StandoffProvinceWarehouse implements IStandoffProvinceWarehouse {

    dataProvider: IStandoffProvinceDataProvider;

    constructor(myDataProvider: IStandoffProvinceDataProvider) {
        this.dataProvider = myDataProvider;
    }

    getStandoffProvincesForTurn = (forTurnId: string) => {

        let myPromise = new Promise<Array<StandoffProvince>>((resolve, reject) => {
            this.dataProvider.getStandoffProvincesForTurn(forTurnId).then((arrayOfStandoffProvinces) => {
                resolve(arrayOfStandoffProvinces);
            }).catch((error) => {
                reject('unable to get standoff provinces for turn: ' + forTurnId + error);
            });
        });

        return myPromise;
    }

    createStandoffProvince = (provinceName: string, turnId: string, gameId: string) => {

        let myPromise = new Promise<StandoffProvince>((resolve, reject) => {
            this.dataProvider.createStandoffProvince(provinceName, turnId, gameId).then((newStandoffProvince) => {
                resolve(newStandoffProvince);
            }).catch((error) => {
                reject('unable to create a standoff province' + error);
            });
        });

        return myPromise;
    }

    deleteStandoffProvince = (aStandoffProvince: StandoffProvince) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            this.dataProvider.deleteStandoffProvince(aStandoffProvince).then((aBoolean) => {
                resolve(true);
            }).catch((error) => {
                reject('unable to delete all the pieces: ' + error);
            });
        });

        return myPromise;
    }
}

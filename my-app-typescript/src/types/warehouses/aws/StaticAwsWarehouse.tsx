import { IAwsWarehouse } from './IAwsWarehouse';

export class StaticAwsWarehouse implements IAwsWarehouse {

    generateNextPhase = (aGameId: string) => {

        let self = this;
        let myPromise = new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });

        return myPromise;
    }
}
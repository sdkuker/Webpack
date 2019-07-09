import axios from 'axios';
import { IAwsWarehouse } from './IAwsWarehouse';

export class AwsWarehouse implements IAwsWarehouse {

    awsURL: string;

    constructor(myAwsUrl: string) {
        this.awsURL = myAwsUrl;
    }

    generateNextPhase(gameId: string) {

        const self = this;
        let myPromise = new Promise<boolean>((resolve, reject) => {
            let tempString = 'generateNextPhaseForGame='.concat(gameId);
            let myCompleteURL = self.awsURL.concat(tempString);
            axios.get(myCompleteURL, {timeout: 100000}).then((response) => {
                resolve(true);
            }).catch((error) => {
                console.error(error);
                reject('unable to make a successful all to aws URL: ' + this.awsURL);
            });
        });

        return myPromise;

    }
}
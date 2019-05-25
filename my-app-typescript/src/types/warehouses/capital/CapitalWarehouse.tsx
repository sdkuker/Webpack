import { Capital } from './Capital';
import { ICapitalWarehouse } from './ICapitalWarehouse';
import { ICapitalDataProvider } from './ICapitalDataProvider';

export class CapitalWarehouse implements ICapitalWarehouse {
   
    myDataProvider: ICapitalDataProvider;

    constructor(dataProvider: ICapitalDataProvider) {
       this.myDataProvider = dataProvider;
    }

    getCapitals = (aTurnId: string) => {

        let myPromise = new Promise<Map<string, Capital>>((resolve, reject) => {

            this.myDataProvider.getCapitals(aTurnId).then((arrayOfCapitals) => {
                resolve(arrayOfCapitals);
            }).catch((error) => {
                reject('unable to get capitals ' + error);
            });
        });

        return myPromise;
    }

    deleteCapitals = (forTurnId: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            let arrayofPromises = new Array<Promise<boolean>>();
            this.myDataProvider.getCapitals(forTurnId).then((mapOfCapitalsToDelete) => {
                mapOfCapitalsToDelete.forEach((aCapital: Capital, key: string) => {
                    arrayofPromises.push(this.myDataProvider.deleteCapital(aCapital));
                });
                Promise.all(arrayofPromises).then((arrayOfBooleans) => {
                    resolve(true);
                }).catch((error) => {
                    reject('unable to delete all the capitals: ' + error);
                });
            }).catch((error) => {
                reject('unable to get capitals to delete' + error);
            });
        });

        return myPromise;
    }

    initilizeCapitals = (aGameId: string, aTurnId: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {

            let allCapitalPromises = new Array<Promise<Capital>>();

            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Vienna', 'Austria'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Budapest', 'Austria'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Trieste', 'Austria'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'London', 'England'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Edinburgh', 'England'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Liverpool', 'England'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Paris', 'France'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Marseilles', 'France'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Brest', 'France'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Berlin', 'Germany'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Munich', 'Germany'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Kiel', 'Germany'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Rome', 'Italy'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Venice', 'Italy'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Naples', 'Italy'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Moscow', 'Russia'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Sevastopol', 'Russia'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'StPetersburg', 'Russia'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Warsaw', 'Russia'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Ankara', 'Turkey'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Constantinople', 'Turkey'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Smyrna', 'Turkey'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Portugal', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Spain', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Norway', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Sweden', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Denmark', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Rumania', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Serbia', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Bulgaria', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Greece', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Tunis', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Holland', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aGameId, aTurnId, 'Belgium', 'unowned'));

            Promise.all(allCapitalPromises).then((arrayOfBooleans) => {
                resolve(true);
            });
        });    

        return myPromise;
    }
}
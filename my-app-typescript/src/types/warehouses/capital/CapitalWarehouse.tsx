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

    initilizeCapitals = (aTurnId: string) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {

            let allCapitalPromises = new Array<Promise<Capital>>();

            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Vienna', 'Austria'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Budapest', 'Austria'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Trieste', 'Austria'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'London', 'England'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Edinburgh', 'England'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Liverpool', 'England'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Paris', 'France'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Marseilles', 'France'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Brest', 'France'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Berlin', 'Germany'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Munich', 'Germany'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Kiel', 'Germany'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Rome', 'Italy'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Venice', 'Italy'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Naples', 'Italy'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Moscow', 'Russia'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Sevastopol', 'Russia'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'StPetersburg', 'Russia'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Warsaw', 'Russia'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Ankara', 'Turkey'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Constantinople', 'Turkey'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Smyrna', 'Turkey'));

            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Portugal', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Spain', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Norway', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Sweden', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Denmark', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Rumania', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Serbia', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Bulgaria', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Greece', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Tunis', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Holland', 'unowned'));
            allCapitalPromises.push(this.myDataProvider.createCapital(aTurnId, 'Belgium', 'unowned'));

            Promise.all(allCapitalPromises).then((arrayOfBooleans) => {
                resolve(true);
            });
        });    

        return myPromise;
    }
}
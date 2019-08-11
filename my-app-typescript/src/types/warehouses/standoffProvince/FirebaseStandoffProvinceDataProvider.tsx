import db from '../../../firebase';
import { IStandoffProvinceDataProvider } from './IStandoffProvinceDataProvider';
import { StandoffProvince } from './StandoffProvince';
import { EnvironmentName } from '../PersistenceTypes';

export class FirebaseStandoffProvinceDataProvider implements IStandoffProvinceDataProvider {

    environmentName: EnvironmentName;
    standoffProvinceDocumentName: string;
    standoffProvinceCollectionName: string;

    constructor(anEnviornmentName: EnvironmentName) {
        this.environmentName = anEnviornmentName;
        this.standoffProvinceDocumentName = 'standoffProvinces';
        this.standoffProvinceCollectionName = 'allStandoffProvinces';
    }

    createStandoffProvince = (provinceName: string, turnId: string, gameId: string) => {

        let self = this;

        let myPromise = new Promise<StandoffProvince>((resolve, reject) => {

            db.collection(self.environmentName).doc(self.standoffProvinceDocumentName)
                .collection(self.standoffProvinceCollectionName).add({
                    provinceName: provinceName,
                    turnId: turnId,
                    gameId: gameId
                }).then((standoffLocationDocRef) => {
                    let newStandoffProvince = new StandoffProvince(standoffLocationDocRef.id,
                        provinceName, turnId, gameId);
                    resolve(newStandoffProvince);
                }).catch((error) => {
                    reject('error creating a piece standoff province: ' + error);
                });
        });

        return myPromise;
    }

    deleteStandoffProvince = (aStandoffProvince: StandoffProvince) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            db.collection(self.environmentName).doc(self.standoffProvinceDocumentName)
                .collection(self.standoffProvinceCollectionName)
                .doc(aStandoffProvince.id).delete().then(() => {
                    resolve(true);
                }).catch((error) => {
                    reject('unable to delete standoff province: ' + aStandoffProvince.id + '  ' + error);
                });
        });

        return myPromise;
    }

    getStandoffProvincesForTurn = (forTurnId: string) => {

        let self = this;

        let myPromise = new Promise<Array<StandoffProvince>>((resolve, reject) => {
            db.collection(self.environmentName).doc(self.standoffProvinceDocumentName)
                .collection(self.standoffProvinceCollectionName)
                .where('turnId', '==', forTurnId)
                .get().then((querySnapshot) => {
                    let myStandoffProvinceArray = new Array<StandoffProvince>();
                    querySnapshot.forEach((doc) => {
                        myStandoffProvinceArray.push(new StandoffProvince(doc.id,
                            doc.data().provinceName, doc.data().turnId, doc.data().gameId));
                    });
                    resolve(myStandoffProvinceArray);
                }).catch((error) => {
                    reject('error getting standoff provinces for turnId: ' + forTurnId + error);
                });
        });

        return myPromise;
    }
}
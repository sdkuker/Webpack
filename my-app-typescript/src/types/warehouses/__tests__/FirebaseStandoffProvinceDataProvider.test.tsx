import { FirebaseStandoffProvinceDataProvider } from '../standoffProvince/FirebaseStandoffProvinceDataProvider';
import { StandoffProvince } from '../standoffProvince/StandoffProvince';
import { EnvironmentName } from '../PersistenceTypes';

it('create and retrieve a standoff province', () => {

    const provinceName = 'London';
    const turnId1 = 'createAndRetrieveStandoffProvTurnId1';
    const turnId2 = 'createAndRetrieveStandoffProvTurnId2';
    const gameId1 = 'createAndRetrieveStandoffProvGameId1';

    expect.assertions(19);

    let myProvider = new FirebaseStandoffProvinceDataProvider(EnvironmentName.UnitTest);
    expect(myProvider).not.toBeNull();

    return myProvider.createStandoffProvince(provinceName, turnId1, gameId1).then((newStandoffProvince) => {
        expect(newStandoffProvince).not.toBeNull();
        expect(newStandoffProvince.id).not.toBeNull();
        expect(newStandoffProvince.provinceName).toEqual(provinceName);
        expect(newStandoffProvince.turnId).toEqual(turnId1);
        expect(newStandoffProvince.gameId).toEqual(gameId1);
        return myProvider.createStandoffProvince(provinceName, turnId2, gameId1).then((newStandoffProvince2) => {
            expect(newStandoffProvince2).not.toBeNull();
            expect(newStandoffProvince2.id).not.toBeNull();
            expect(newStandoffProvince2.provinceName).toEqual(provinceName);
            expect(newStandoffProvince2.turnId).toEqual(turnId2);
            expect(newStandoffProvince2.gameId).toEqual(gameId1);
            // @ts-ignore
            return myProvider.getStandoffProvincesForTurn(turnId1).then((retrievedStandoffProvinces) => {
                expect(retrievedStandoffProvinces).not.toBeNull();
                expect(retrievedStandoffProvinces.length).toEqual(1);
                const returnedProvince = retrievedStandoffProvinces[0];
                expect(returnedProvince.id).toEqual(newStandoffProvince.id);
                expect(returnedProvince.provinceName).toEqual(newStandoffProvince.provinceName);
                expect(returnedProvince.turnId).toEqual(newStandoffProvince.turnId);
                expect(returnedProvince.gameId).toEqual(newStandoffProvince.gameId);
                return myProvider.deleteStandoffProvince(newStandoffProvince).then((wasStandoffProvinceDeleted) => {
                    expect(wasStandoffProvinceDeleted).toBeTruthy();
                    return myProvider.deleteStandoffProvince(newStandoffProvince2).then((wasStandoffProvince2Deleted) => {
                        expect(wasStandoffProvince2Deleted).toBeTruthy();
                    }).catch((error) => {
                        expect(error).toBeNull();
                    })
                }).catch((error) => {
                    expect(error).toBeNull();
                });
            }).catch((error) => {
                expect(error).toBeNull();
            });
        }).catch((error) => {
            expect(error).toBeNull();
        })
    }).catch((error) => {
        expect(error).toBeNull();
    });
})
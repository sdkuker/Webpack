import { FirebaseCapitalDataProvider } from '../capital/FirebaseCapitalDataProvider';
import { Capital } from '../capital/Capital';
import { EnvironmentName } from '../PersistenceTypes';

it('create and retrieve a capital', () => {

    const gameId  = '2';
    const turn1Id = '1';
    const capital1OwningCountryName = 'Austria';
    const capital1LocationName = 'Paris';

    // hi
    expect.assertions(14);

    let myProvider = new FirebaseCapitalDataProvider(EnvironmentName.UnitTest);
    expect(myProvider).not.toBeNull();

    return myProvider.createCapital(gameId, turn1Id, capital1LocationName, capital1OwningCountryName).then((newCapital) => {
        expect(newCapital).not.toBeNull();
        expect(newCapital.id).not.toBeNull();
        expect(newCapital.owningCountryName).toEqual(capital1OwningCountryName);
        expect(newCapital.locationName).toEqual(capital1LocationName);
        expect(newCapital.turnId).toEqual(turn1Id);
        expect(newCapital.gameId).toEqual(gameId);
        // @ts-ignore
        return myProvider.getCapital(newCapital.id).then((retrivedNewCapital) => {
            expect(retrivedNewCapital).not.toBeNull();
            if (retrivedNewCapital) {
                expect(retrivedNewCapital.id).toEqual(newCapital.id);
                expect(retrivedNewCapital.owningCountryName).toEqual(newCapital.owningCountryName);
                expect(retrivedNewCapital.locationName).toEqual(newCapital.locationName);
                expect(retrivedNewCapital.turnId).toEqual(newCapital.turnId);
                expect(retrivedNewCapital.gameId).toEqual(newCapital.gameId);
                return myProvider.deleteCapital(retrivedNewCapital).then((wasCapitalDeleted) => {
                    expect(wasCapitalDeleted).toBeTruthy();
                }).catch((error) => {
                    expect(error).toBeNull();
                });
            }
        }).catch((error) => {
            expect(error).toBeNull();
        });
    }).catch((error) => {
        expect(error).toBeNull();
    });
})

it('getting pieces for a capital', () => {

    const gameId = '45';
    const turn1Id = '1';
    const turn2Id = '2';
    const capital1OwningCountryName = 'Austria';
    const capital1LocationName = 'Paris';
    const capital2OwningCountryName = 'Germany';
    const capital2LocationName = 'Berlin';
    const capital3OwningCountryName = 'Turkey';
    const capital3LocationName = 'Constantiniple';

    expect.assertions(11);

    let myProvider = new FirebaseCapitalDataProvider(EnvironmentName.UnitTest);
    expect(myProvider).not.toBeNull();

    return myProvider.createCapital(gameId, turn1Id, capital1LocationName, capital1OwningCountryName).then((newCapital1) => {
        expect(newCapital1).not.toBeNull();
        return myProvider.createCapital(gameId, turn2Id, capital2LocationName, capital2OwningCountryName).then((newCapital2) => {
            expect(newCapital2).not.toBeNull();
            return myProvider.createCapital(gameId, turn2Id, capital3LocationName, capital3OwningCountryName).then((newCapital3) => {
                expect(newCapital3).not.toBeNull();
                return myProvider.getCapitals(turn1Id).then((mapOfCapitals) => {
                    expect(mapOfCapitals).not.toBeNull();
                    expect(mapOfCapitals.size).toEqual(1);
                    expect(mapOfCapitals.get(newCapital1.locationName)).not.toBeNull();
                    // @ts-ignore
                    expect(mapOfCapitals.get(newCapital1.locationName).id).toEqual(newCapital1.id);
                    return myProvider.getCapitals(turn2Id).then((mapOfCapitals2) => {
                        expect(mapOfCapitals2).not.toBeNull();
                        expect(mapOfCapitals2.size).toEqual(2);
                        const arrayOfCapitalsToDelete = new Array<Capital>();
                        arrayOfCapitalsToDelete.push(newCapital1);
                        arrayOfCapitalsToDelete.push(newCapital2);
                        arrayOfCapitalsToDelete.push(newCapital3);
                        return myProvider.deleteCapitals(arrayOfCapitalsToDelete).then((wereCapitalsDeleted) => {
                            expect(wereCapitalsDeleted).toBeTruthy();
                        }).catch((error) => {
                            expect(error).toBeNull();
                        });
                    }).catch((error) => {
                        expect(error).toBeNull();
                    });
                }).catch((error) => {
                    expect(error).toBeNull();
                });
            }).catch((error) => {
                expect(error).toBeNull();
            });
        }).catch((error) => {
            expect(error).toBeNull();
        });
    }).catch((error) => {
        expect(error).toBeNull();
    });
})
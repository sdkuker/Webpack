import { FirebaseMoveDataProvider } from '../move/FirebaseMoveDataProvider';
import { Move } from '../move/Move';
import { EnvironmentName } from '../PersistenceTypes';

it('create and retrieve a move', () => {

    const moveOrder1 = 'ARMY London movesTo Wales';
    const owningCountry1 = 'Austria';
    const turnId1 = 't1';
    const gameId1 = 'g1';

    expect.assertions(12);

    let myProvider = new FirebaseMoveDataProvider(EnvironmentName.UnitTest);
    expect(myProvider).not.toBeNull();

    return myProvider.createMove(moveOrder1, owningCountry1, turnId1, gameId1).then((newMove) => {
        expect(newMove).not.toBeNull();
        expect(newMove.id).not.toBeNull();
        expect(newMove.owningCountryName).toEqual(owningCountry1);
        expect(newMove.turnId).toEqual(turnId1);
        expect(newMove.gameId).toEqual(gameId1);
        // hi
        // @ts-ignore
        return myProvider.getMove(newMove.id).then((retrivedNewMove) => {
            expect(retrivedNewMove).not.toBeNull();
            if (retrivedNewMove) {
                expect(retrivedNewMove.id).toEqual(newMove.id);
                expect(retrivedNewMove.owningCountryName).toEqual(newMove.owningCountryName);
                expect(retrivedNewMove.turnId).toEqual(newMove.turnId);
                expect(retrivedNewMove.gameId).toEqual(newMove.gameId);
                return myProvider.deleteMove(retrivedNewMove).then((wasMoveDeleted) => {
                    expect(wasMoveDeleted).toBeTruthy();
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

// it('getting pieces for a capital', () => {

//     const turn1Id = '1';
//     const turn2Id = '2';
//     const capital1OwningCountryName = 'Austria';
//     const capital1LocationName = 'Paris';
//     const capital2OwningCountryName = 'Germany';
//     const capital2LocationName = 'Berlin';
//     const capital3OwningCountryName = 'Turkey';
//     const capital3LocationName = 'Constantiniple';

//     expect.assertions(11);

//     let myProvider = new FirebaseCapitalDataProvider(EnvironmentName.UnitTest);
//     expect(myProvider).not.toBeNull();

//     return myProvider.createCapital(turn1Id, capital1LocationName, capital1OwningCountryName).then((newCapital1) => {
//         expect(newCapital1).not.toBeNull();
//         return myProvider.createCapital(turn2Id, capital2LocationName, capital2OwningCountryName).then((newCapital2) => {
//             expect(newCapital2).not.toBeNull();
//             return myProvider.createCapital(turn2Id, capital3LocationName, capital3OwningCountryName).then((newCapital3) => {
//                 expect(newCapital3).not.toBeNull();
//                 return myProvider.getCapitals(turn1Id).then((mapOfCapitals) => {
//                     expect(mapOfCapitals).not.toBeNull();
//                     expect(mapOfCapitals.size).toEqual(1);
//                     expect(mapOfCapitals.get(newCapital1.locationName)).not.toBeNull();
//                     // @ts-ignore
//                     expect(mapOfCapitals.get(newCapital1.locationName).id).toEqual(newCapital1.id);
//                     return myProvider.getCapitals(turn2Id).then((mapOfCapitals2) => {
//                         expect(mapOfCapitals2).not.toBeNull();
//                         expect(mapOfCapitals2.size).toEqual(2);
//                         const arrayOfCapitalsToDelete = new Array<Capital>();
//                         arrayOfCapitalsToDelete.push(newCapital1);
//                         arrayOfCapitalsToDelete.push(newCapital2);
//                         arrayOfCapitalsToDelete.push(newCapital3);
//                         return myProvider.deleteCapitals(arrayOfCapitalsToDelete).then((wereCapitalsDeleted) => {
//                             expect(wereCapitalsDeleted).toBeTruthy();
//                         }).catch((error) => {
//                             expect(error).toBeNull();
//                         });
//                     }).catch((error) => {
//                         expect(error).toBeNull();
//                     });
//                 }).catch((error) => {
//                     expect(error).toBeNull();
//                 });
//             }).catch((error) => {
//                 expect(error).toBeNull();
//             });
//         }).catch((error) => {
//             expect(error).toBeNull();
//         });
//     }).catch((error) => {
//         expect(error).toBeNull();
//     });
// })
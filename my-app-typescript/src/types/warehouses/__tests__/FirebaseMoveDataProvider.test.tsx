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
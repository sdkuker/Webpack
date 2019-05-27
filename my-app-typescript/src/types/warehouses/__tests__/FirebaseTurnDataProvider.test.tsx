import { FirebaseTurnDataProvider } from '../turn/FirebaseTurnDataProvider';
import { Turn } from '../turn/Turn';
import { SeasonTypes, TurnStatus, TurnPhase } from '../DomainTypes';
import { EnvironmentName } from '../PersistenceTypes';

it('create, retrieve, update and lastly delete turns', () => {

    expect.assertions(27);

    let myProvider = new FirebaseTurnDataProvider(EnvironmentName.UnitTest);
    const game1Id = '1';
    const game2Id = '2';
    expect(myProvider).not.toBeNull();

    return myProvider.createTurn(game1Id, SeasonTypes.Spring, 1, TurnStatus.Open, TurnPhase.Diplomatic).then((newTurn) => {
        expect(newTurn).not.toBeNull();
        expect(newTurn.id).not.toBeNull();
        expect(newTurn.gameId).toEqual(game1Id);
        expect(newTurn.season).toEqual(SeasonTypes.Spring);
        expect(newTurn.status).toEqual(TurnStatus.Open);
        expect(newTurn.year).toEqual(1);
        return myProvider.createTurn(game2Id, SeasonTypes.Fall, 2, TurnStatus.Complete, TurnPhase.GainingAndLosingUnits).then((newTurn2) => {
            expect(newTurn2).not.toBeNull();
            expect(newTurn2.id).not.toBeNull();
            expect(newTurn2.gameId).toEqual(game2Id);
            expect(newTurn2.season).toEqual(SeasonTypes.Fall);
            expect(newTurn2.status).toEqual(TurnStatus.Complete);
            expect(newTurn2.year).toEqual(2);
            return myProvider.getTurn(newTurn.id).then((newTurnGet) => {
                expect(newTurnGet).not.toBeNull();
                if (newTurnGet) {
                    expect(newTurnGet.id).toEqual(newTurn.id);
                    expect(newTurnGet.gameId).toEqual(newTurn.gameId);
                    expect(newTurnGet.season).toEqual(newTurn.season);
                    expect(newTurnGet.status).toEqual(newTurn.status);
                    expect(newTurnGet.year).toEqual(newTurn.year);
                }
                let updatedNewTurn = new Turn(newTurn.id, newTurn.gameId, 5, newTurn.season, newTurn.status, newTurn.phase);
                return myProvider.updateTurn(updatedNewTurn).then((wasUpdateSuccessful) => {
                    expect(wasUpdateSuccessful).toBeTruthy();
                    return myProvider.getTurn(newTurn.id).then((turnOrNull) => {
                        expect(turnOrNull).not.toBeNull();
                        if (turnOrNull) {
                            expect(turnOrNull.id).toEqual(newTurn.id);
                            expect(turnOrNull.year).toEqual(5);
                        }
                        return myProvider.deleteTurn(newTurn).then((wasTurn1Deleted) => {
                            expect(wasTurn1Deleted).toBeTruthy();
                            return myProvider.getTurn(newTurn.id).then((newTurnGet2) => {
                                expect(newTurnGet2).toBeNull();
                                return myProvider.deleteTurn(newTurn2).then((wasTurn2Deleted) => {
                                    expect(wasTurn2Deleted).toBeTruthy();
                                    return myProvider.getTurn(newTurn2.id).then((newTurn2Get3) => {
                                        expect(newTurn2Get3).toBeNull();
                                    }).catch((error) => {
                                        expect(error.toBeNull());
                                    })
                                }).catch((error) => {
                                    expect(error).toBeNull();
                                })
                            }).catch((error) => {
                                expect(error).not.toBeNull();
                            });
                        }).catch((error) => {
                            expect(error).not.toBeNull();
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
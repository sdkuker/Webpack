import { Turn } from '.././turn/Turn';
import { SeasonTypes, TurnStatus, TurnPhase } from '.././DomainTypes';
import { TurnWarehouse } from '../turn/TurnWarehouse';
import { StaticTurnDataProvider } from '../turn/StaticTurnDataProvider';
import { StaticAwsWarehouse } from '../aws/StaticAwsWarehouse';

let myTurnWarehouse: TurnWarehouse;

beforeAll(() => {
    const myDataProvider = new StaticTurnDataProvider(null, null);
    const myAwsWarehouse = new StaticAwsWarehouse();
    return myDataProvider.createTurn('1', SeasonTypes.Spring, 1, TurnStatus.Complete, TurnPhase.GainingAndLosingUnits).then((success) => {
        return myDataProvider.createTurn('1', SeasonTypes.Fall, 1, TurnStatus.Complete, TurnPhase.GainingAndLosingUnits).then((success2) => {
            return myDataProvider.createTurn('1', SeasonTypes.Spring, 2, TurnStatus.Complete, TurnPhase.GainingAndLosingUnits).then((success3) => {
                return myDataProvider.createTurn('1', SeasonTypes.Fall, 2, TurnStatus.Open, TurnPhase.Diplomatic).then((success4) => {
                    return myDataProvider.createTurn('2', SeasonTypes.Spring, 1, TurnStatus.Complete, TurnPhase.GainingAndLosingUnits).then((success5) => {
                        return myDataProvider.createTurn('2', SeasonTypes.Fall, 1, TurnStatus.Open, TurnPhase.Diplomatic).then((success6) => {
                            return myDataProvider.createTurn('3', SeasonTypes.Spring, 1, TurnStatus.Complete, TurnPhase.GainingAndLosingUnits).then((success7) => {
                                 myTurnWarehouse = new TurnWarehouse(myDataProvider, myAwsWarehouse);
                            })
                        })
                    })
                })
            })
        })
    })
});

it('getting turns for game1', () => {
    expect.assertions(2);
    return myTurnWarehouse.getTurns('1').then((turnArray) => {
        expect(turnArray).not.toBeNull();
        expect(turnArray.length).toEqual(4);
    })
})

it('getting turns for game2', () => {
    expect.assertions(2);
    return myTurnWarehouse.getTurns('2').then((turnArray) => {
        expect(turnArray).not.toBeNull();
        expect(turnArray.length).toEqual(2);
    })
})

it('getting turns for game3', () => {
    expect.assertions(2);
    return myTurnWarehouse.getTurns('3').then((turnArray) => {
        expect(turnArray).not.toBeNull();
        expect(turnArray.length).toEqual(1);
    })
})

it('getting open turn for game 1', () => {
    expect.assertions(4);
    return myTurnWarehouse.getOpenTurn('1').then((openTurn) => {
        expect(openTurn).not.toBeNull();
        expect(openTurn.gameId).toEqual('1');
        expect(openTurn.year).toEqual(2);
        expect(openTurn.season).toEqual(SeasonTypes.Fall);
    })

})

it('game 3 had no open turn - should get most recent turn', () => {
    expect.assertions(4);
    return myTurnWarehouse.getOpenTurn('3').then((openTurn) => {
        expect(openTurn).not.toBeNull();
        expect(openTurn.gameId).toEqual('3');
        expect(openTurn.year).toEqual(1);
        expect(openTurn.season).toEqual(SeasonTypes.Spring);
    })
})

it('get turn for game1 year 1 spring', () => {
    expect.assertions(5);
    return myTurnWarehouse.getTurn('1', 1, SeasonTypes.Spring).then((myTurn) => {
        expect(myTurn).not.toBeNull();
        if (myTurn) {
            expect(myTurn.year).toEqual(1);
            expect(myTurn.season).toEqual(SeasonTypes.Spring);
            expect(myTurn.status).toEqual(TurnStatus.Complete);
            expect(myTurn.gameId).toEqual('1');
        }
    });
})

it('get turn that does not exist', () => {
    expect.assertions(1);
    return myTurnWarehouse.getTurn('1', 3, SeasonTypes.Spring).then((myTurn) => {
        expect(myTurn).toBeNull();
    });
})

it('creating the first, second, and third turns for a game', () => {

    expect.assertions(24);
    return myTurnWarehouse.generateNextTurn('5').then((myfirstTurn) => {
        expect(myfirstTurn).not.toBeNull();
        expect(myfirstTurn.id).toEqual('8');
        expect(myfirstTurn.gameId).toEqual('5');
        expect(myfirstTurn.season).toEqual(SeasonTypes.Spring);
        expect(myfirstTurn.status).toEqual(TurnStatus.Open);
        expect(myfirstTurn.year).toEqual(1);
        return  myTurnWarehouse.generateNextTurn('5').then((mySecondTurn) => {
            expect(myfirstTurn.status).toEqual(TurnStatus.Complete);
            expect(myfirstTurn.id).toEqual('8');
            expect(mySecondTurn).not.toBeNull();
            expect(mySecondTurn.id).toEqual('9');
            expect(mySecondTurn.gameId).toEqual('5');
            expect(mySecondTurn.season).toEqual(SeasonTypes.Fall);
            expect(mySecondTurn.status).toEqual(TurnStatus.Open);
            expect(mySecondTurn.year).toEqual(1);
            return myTurnWarehouse.generateNextTurn('5').then((myThirdTurn) => {
                expect(myfirstTurn.status).toEqual(TurnStatus.Complete);
                expect(myfirstTurn.id).toEqual('8');
                expect(mySecondTurn.status).toEqual(TurnStatus.Complete);
                expect(mySecondTurn.id).toEqual('9');
                expect(myThirdTurn).not.toBeNull();
                expect(myThirdTurn.id).toEqual('10');
                expect(myThirdTurn.gameId).toEqual('5');
                expect(myThirdTurn.season).toEqual(SeasonTypes.Spring);
                expect(myThirdTurn.status).toEqual(TurnStatus.Open);
                expect(myThirdTurn.year).toEqual(2);
            });
        });
    });
})

it('test deleting turns', () => {
    expect.assertions(8);
    return myTurnWarehouse.getTurns('5').then((turnArray) => {
        expect(turnArray.length).toEqual(3);
        return myTurnWarehouse.getTurn('5', 2, SeasonTypes.Spring).then((turnToDelete) => {
            expect(turnToDelete).not.toBeNull();
             // @ts-ignore
             return myTurnWarehouse.deleteTurn(turnToDelete).then((wasTurnDeleted) => {
                expect(wasTurnDeleted).toBeTruthy();
                return myTurnWarehouse.getTurns('5').then((newTurnArray) => {
                    expect(newTurnArray.length).toEqual(2);
                    return myTurnWarehouse.deleteTurn(newTurnArray[0]).then((wasTheFirstTurnDeleted) => {
                        expect(wasTheFirstTurnDeleted).toBeTruthy();
                        return myTurnWarehouse.deleteTurn(newTurnArray[0]).then((wasTheSecondTurnDeleted) => {
                            expect(wasTheSecondTurnDeleted).toBeTruthy();
                            return myTurnWarehouse.getTurns('5').then((shouldBeEmptyArray) => {
                                expect(shouldBeEmptyArray).not.toBeNull();
                                expect(shouldBeEmptyArray.length).toEqual(0);
                            })
                        })
                    })
                })
            })
        })
    })
})
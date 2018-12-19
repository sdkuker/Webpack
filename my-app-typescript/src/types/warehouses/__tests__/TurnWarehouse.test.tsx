import { Turn } from '.././turn/Turn';
import { SeasonTypes, TurnStatus } from '.././DomainTypes';
import { TurnWarehouse } from '../turn/TurnWarehouse';
import { StaticTurnDataProvider } from '../turn/StaticTurnDataProvider';

let myTurnWarehouse : TurnWarehouse;

beforeAll(() => {
    const myDataProvider = new StaticTurnDataProvider(null, null);

    myDataProvider.persistTurn(new Turn(null, '1', 1, SeasonTypes.Spring, TurnStatus.Complete));
    myDataProvider.persistTurn(new Turn(null, '1', 1, SeasonTypes.Fall, TurnStatus.Complete));
    myDataProvider.persistTurn(new Turn(null, '1', 2, SeasonTypes.Spring, TurnStatus.Complete));
    myDataProvider.persistTurn(new Turn(null, '1', 2, SeasonTypes.Fall, TurnStatus.Open));

    myDataProvider.persistTurn(new Turn(null, '2', 1, SeasonTypes.Spring, TurnStatus.Complete));
    myDataProvider.persistTurn(new Turn(null, '2', 1, SeasonTypes.Fall, TurnStatus.Open));

    myDataProvider.persistTurn(new Turn(null, '3', 1, SeasonTypes.Spring, TurnStatus.Complete));

    myTurnWarehouse = new TurnWarehouse(myDataProvider);

});

it('getting turns for game1', () => {
    expect(myTurnWarehouse.getTurns('1').length).toEqual(4);
})

it('getting turns for game2', () => {
    expect(myTurnWarehouse.getTurns('2').length).toEqual(2);
})

it('getting turns for game3', () => {
    expect(myTurnWarehouse.getTurns('3').length).toEqual(1);
})

it('getting open turn for game 1', () => {
    const openTurn = myTurnWarehouse.getOpenTurn('1');
    expect(openTurn).not.toBeNull();
    if (openTurn) {
        expect(openTurn.gameId).toEqual('1');
        expect(openTurn.year).toEqual(2);
        expect(openTurn.season).toEqual(SeasonTypes.Fall);
    }

})

it('game 3 had no open turn - should get most recent turn', () => {
    const openTurn = myTurnWarehouse.getOpenTurn('3');
    expect(openTurn).not.toBeNull();
    if (openTurn) {
        expect(openTurn.gameId).toEqual('3');
        expect(openTurn.year).toEqual(1);
        expect(openTurn.season).toEqual(SeasonTypes.Spring);
    }
})

it('get turn for game1 year 1 spring', () => {
    const myTurn = myTurnWarehouse.getTurn('1', 1, SeasonTypes.Spring)
    expect(myTurn).not.toBeNull();
    if (myTurn) {
        expect(myTurn.year).toEqual(1);
        expect(myTurn.season).toEqual(SeasonTypes.Spring);
        expect(myTurn.status).toEqual(TurnStatus.Complete);
        expect(myTurn.gameId).toEqual('1');
    }

})

it('get turn that does not exist', () => {
    const myTurn = myTurnWarehouse.getTurn('1', 3, SeasonTypes.Spring)
    expect(myTurn).toBeNull();
})

it('creating the first, second, third and fourth for a game', () => {

    // the first turn is automatically created when getTurns is called -
    // which it is from getOpenTurna
    const myfirstTurn = myTurnWarehouse.generateNextTurn('5');
    expect(myfirstTurn).not.toBeNull();
    expect(myfirstTurn.id).toEqual('8');
    expect(myfirstTurn.gameId).toEqual('5');
    expect(myfirstTurn.season).toEqual(SeasonTypes.Spring);
    expect(myfirstTurn.status).toEqual(TurnStatus.Open);
    expect(myfirstTurn.year).toEqual(1);


    const mySecondTurn = myTurnWarehouse.generateNextTurn('5');
    expect(myfirstTurn.status).toEqual(TurnStatus.Complete);
    expect(myfirstTurn.id).toEqual('8');
    expect(mySecondTurn).not.toBeNull();
    expect(mySecondTurn.id).toEqual('9');
    expect(mySecondTurn.gameId).toEqual('5');
    expect(mySecondTurn.season).toEqual(SeasonTypes.Fall);
    expect(mySecondTurn.status).toEqual(TurnStatus.Open);
    expect(mySecondTurn.year).toEqual(1);

    const myThirdTurn = myTurnWarehouse.generateNextTurn('5');
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
})

it('test deleting a turn', () => {
    expect(myTurnWarehouse.getTurns('5').length).toEqual(3);
    let turnToDelete = myTurnWarehouse.getTurn('5', 2, SeasonTypes.Spring);
    expect(turnToDelete).not.toBeNull();
    // @ts-ignore
    myTurnWarehouse.deleteTurn(turnToDelete);
    expect(myTurnWarehouse.getTurns('5').length).toEqual(2);
})
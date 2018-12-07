import { Turn } from '.././Turn';
import { Game } from '.././Game';
import { SeasonTypes, TurnStatus } from '.././DomainTypes';
import { TurnWarehouse } from '.././TurnWarehouse';
import { StaticTurnDataProvider } from '.././StaticTurnDataProvider';

let game1 = new Game('1', 'test');
let game2 = new Game('2', 'test2');
let game3 = new Game('3', 'test3');
let game4 = new Game('4', 'Game with no turns');
let game5 = new Game('5', 'creating 2 turns');
let myTurnWarehouse : TurnWarehouse;

beforeAll(() => {
    const myDataProvider = new StaticTurnDataProvider(null, null);

    myDataProvider.persistTurn(new Turn(null, game1, 1, SeasonTypes.Spring, TurnStatus.Complete));
    myDataProvider.persistTurn(new Turn(null, game1, 1, SeasonTypes.Fall, TurnStatus.Complete));
    myDataProvider.persistTurn(new Turn(null, game1, 2, SeasonTypes.Spring, TurnStatus.Complete));
    myDataProvider.persistTurn(new Turn(null, game1, 2, SeasonTypes.Fall, TurnStatus.Open));

    myDataProvider.persistTurn(new Turn(null, game2, 1, SeasonTypes.Spring, TurnStatus.Complete));
    myDataProvider.persistTurn(new Turn(null, game2, 1, SeasonTypes.Fall, TurnStatus.Open));

    myDataProvider.persistTurn(new Turn(null, game3, 1, SeasonTypes.Spring, TurnStatus.Complete));

    myTurnWarehouse = new TurnWarehouse(myDataProvider);

});

it('getting turns for game1', () => {
    expect(myTurnWarehouse.getTurns(game1).length).toEqual(4);
})

it('getting turns for game2', () => {
    expect(myTurnWarehouse.getTurns(game2).length).toEqual(2);
})

it('getting turns for game3', () => {
    expect(myTurnWarehouse.getTurns(game3).length).toEqual(1);
})

it('getting open turn for game 1', () => {
    const openTurn = myTurnWarehouse.getOpenTurn(game1);
    expect(openTurn).not.toBeNull();
    if (openTurn) {
        expect(openTurn.game).toEqual(game1);
        expect(openTurn.year).toEqual(2);
        expect(openTurn.season).toEqual(SeasonTypes.Fall);
    }

})

it('game 3 had no open turn - should get most recent turn', () => {
    const openTurn = myTurnWarehouse.getOpenTurn(game3);
    expect(openTurn).not.toBeNull();
    if (openTurn) {
        expect(openTurn.game).toEqual(game3);
        expect(openTurn.year).toEqual(1);
        expect(openTurn.season).toEqual(SeasonTypes.Spring);
    }
})

it('get turn for game1 year 1 spring', () => {
    const myTurn = myTurnWarehouse.getTurn(game1, 1, SeasonTypes.Spring)
    expect(myTurn).not.toBeNull();
    if (myTurn) {
        expect(myTurn.year).toEqual(1);
        expect(myTurn.season).toEqual(SeasonTypes.Spring);
        expect(myTurn.status).toEqual(TurnStatus.Complete);
        expect(myTurn.game).toEqual(game1);
    }

})

it('get turn that does not exist', () => {
    const myTurn = myTurnWarehouse.getTurn(game1, 3, SeasonTypes.Spring)
    expect(myTurn).toBeNull();
})

it('creating the first, second, third and fourth for a game', () => {

    // the first turn is automatically created when getTurns is called -
    // which it is from getOpenTurna
    const myfirstTurn = myTurnWarehouse.getOpenTurn(game5);
    expect(myfirstTurn).not.toBeNull();
    expect(myfirstTurn.id).toEqual('1');
    expect(myfirstTurn.game).toEqual(game5);
    expect(myfirstTurn.season).toEqual(SeasonTypes.Spring);
    expect(myfirstTurn.status).toEqual(TurnStatus.Open);
    expect(myfirstTurn.year).toEqual(1);


    const mySecondTurn = myTurnWarehouse.generateNextTurn(game5);
    expect(myfirstTurn.status).toEqual(TurnStatus.Complete);
    expect(myfirstTurn.id).toEqual('1');
    expect(mySecondTurn).not.toBeNull();
    expect(mySecondTurn.id).toEqual('2');
    expect(mySecondTurn.game).toEqual(game5);
    expect(mySecondTurn.season).toEqual(SeasonTypes.Fall);
    expect(mySecondTurn.status).toEqual(TurnStatus.Open);
    expect(mySecondTurn.year).toEqual(1);

    const myThirdTurn = myTurnWarehouse.generateNextTurn(game5);
    expect(myfirstTurn.status).toEqual(TurnStatus.Complete);
    expect(myfirstTurn.id).toEqual('1');
    expect(mySecondTurn.status).toEqual(TurnStatus.Complete);
    expect(mySecondTurn.id).toEqual('2');
    expect(myThirdTurn).not.toBeNull();
    expect(myThirdTurn.id).toEqual('3');
    expect(myThirdTurn.game).toEqual(game5);
    expect(myThirdTurn.season).toEqual(SeasonTypes.Spring);
    expect(myThirdTurn.status).toEqual(TurnStatus.Open);
    expect(myThirdTurn.year).toEqual(2);
})
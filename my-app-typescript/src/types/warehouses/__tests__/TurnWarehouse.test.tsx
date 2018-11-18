import { Turn } from '.././Turn';
import { Game } from '.././Game';
import { SeasonTypes, TurnStatus } from '.././DomainTypes';
import { TurnWarehouse } from '.././TurnWarehouse';
import { StaticTurnDataProvider } from '.././StaticTurnDataProvider';

let game1 = new Game('1', 'test');
let game2 = new Game('2', 'test2');
let game3 = new Game('3', 'test3');
let myTurnWarehouse : TurnWarehouse;

beforeAll(() => {
    const myTurns = Array<Turn>();

    myTurns.push(new Turn(game1, 1, SeasonTypes.Spring, TurnStatus.Complete));
    myTurns.push(new Turn(game1, 1, SeasonTypes.Fall, TurnStatus.Complete));
    myTurns.push(new Turn(game1, 2, SeasonTypes.Spring, TurnStatus.Complete));
    myTurns.push(new Turn(game1, 2, SeasonTypes.Fall, TurnStatus.Open));

    myTurns.push(new Turn(game2, 1, SeasonTypes.Spring, TurnStatus.Complete));
    myTurns.push(new Turn(game2, 1, SeasonTypes.Fall, TurnStatus.Open));

    myTurns.push(new Turn(game3, 1, SeasonTypes.Spring, TurnStatus.Complete));

    const myDataProvider = new StaticTurnDataProvider(myTurns, null);
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

it('getting no open turn for game 3', () => {
    const openTurn = myTurnWarehouse.getOpenTurn(game3);
    expect(openTurn).toBeNull();
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
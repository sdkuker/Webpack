import { Turn } from '.././Turn';
import { Game } from '.././Game';
import { SeasonTypes, TurnStatus } from '.././DomainTypes';
import { warehouse as TurnWarehouse } from '.././TurnWarehouse';

let game1 = new Game('test');
let game2 = new Game('test2');
let game3 = new Game('test3');

beforeAll(() => {
    const myTurns = Array<Turn>();

    myTurns.push(new Turn(game1, 1, SeasonTypes.Spring, TurnStatus.Complete));
    myTurns.push(new Turn(game1, 1, SeasonTypes.Fall, TurnStatus.Complete));
    myTurns.push(new Turn(game1, 2, SeasonTypes.Spring, TurnStatus.Complete));
    myTurns.push(new Turn(game1, 2, SeasonTypes.Fall, TurnStatus.Open));

    myTurns.push(new Turn(game2, 1, SeasonTypes.Spring, TurnStatus.Complete));
    myTurns.push(new Turn(game2, 1, SeasonTypes.Fall, TurnStatus.Open));

    myTurns.push(new Turn(game3, 1, SeasonTypes.Spring, TurnStatus.Complete));

    TurnWarehouse.setTurns(myTurns);

});

it('setting test turns in the beforeAll', () => {
    expect(TurnWarehouse.getAllTurns().length).toEqual(7);
})

it('getting turns for game1', () => {
    expect(TurnWarehouse.getTurns(game1).length).toEqual(4);
})

it('getting turns for game2', () => {
    expect(TurnWarehouse.getTurns(game2).length).toEqual(2);
})

it('getting turns for game3', () => {
    expect(TurnWarehouse.getTurns(game3).length).toEqual(1);
})

it('getting open turn for game 1', () => {
    const openTurn = TurnWarehouse.getOpenTurn(game1);
    expect(openTurn).not.toBeNull();
    if (openTurn) {
        expect(openTurn.game).toEqual(game1);
        expect(openTurn.year).toEqual(2);
        expect(openTurn.season).toEqual(SeasonTypes.Fall);
    }

})

it('getting no open turn for game 3', () => {
    const openTurn = TurnWarehouse.getOpenTurn(game3);
    expect(openTurn).toBeNull();
})
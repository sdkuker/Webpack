import { Turn } from '.././Turn';
import { Game } from '.././Game';
import { SeasonTypes, TurnStatus } from '.././DomainTypes';
import { StaticPieceDataProvider } from '.././StaticPieceDataProvider';
import { PieceWarehouse } from '../PieceWarehouse';

let game1 = new Game('1', 'test');
let game2 = new Game('2', 'test2');
let turnGame1Spring = new Turn('1', game1, 1, SeasonTypes.Spring, TurnStatus.Open);
let turnGame1Fall = new Turn('2', game1, 1, SeasonTypes.Fall, TurnStatus.Open);
let turnGame2Spring = new Turn('3', game2, 1, SeasonTypes.Spring, TurnStatus.Open);

let myPieceWarehouse: PieceWarehouse;

beforeAll(() => {
    const myDataProvider = new StaticPieceDataProvider();
    myPieceWarehouse = new PieceWarehouse(myDataProvider);

});

it('warehouse should exist', () => {
    expect(myPieceWarehouse).not.toBeNull();
})

it('should default pieces for game 1 turn 1 spring', () => {
    let pieces = myPieceWarehouse.getPieces(turnGame1Spring);
    expect(pieces).not.toBeNull();
    expect(pieces.length).toEqual(22);
    expect(pieces[0].id).toEqual('1');
})

it('should not default pieces for game 1 turn 1 fall', () => {
    let pieces = myPieceWarehouse.getPieces(turnGame1Fall);
    expect(pieces).not.toBeNull();
    expect(pieces.length).toEqual(0);
})

it('should default pieces for game 2 turn 1 spring', () => {
    let pieces = myPieceWarehouse.getPieces(turnGame2Spring);
    expect(pieces).not.toBeNull();
    expect(pieces.length).toEqual(22);
    // make sure the pieces are different than the ones for game 1
    expect(pieces[0].id).toEqual('23');
})

it('should return the same pieces that were created earlier', () => {
    let pieces = myPieceWarehouse.getPieces(turnGame1Spring);
    expect(pieces).not.toBeNull();
    expect(pieces.length).toEqual(22);
    expect(pieces[0].id).toEqual('1');
})


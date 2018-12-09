import { Turn } from '.././Turn';
import { Game } from '.././Game';
import { SeasonTypes, TurnStatus, PieceTypes } from '.././DomainTypes';
import { StaticPieceDataProvider } from '.././StaticPieceDataProvider';
import { PieceWarehouse } from '../PieceWarehouse';
import { Warehouse as LocationWarehouse } from '../LocationWarehouse';
import { LocationTypes } from '../DomainTypes';

let game1 = new Game('1', 'test');
let game2 = new Game('2', 'test2');
let turnGame1Spring = new Turn('1', game1, 1, SeasonTypes.Spring, TurnStatus.Open);
let turnGame1Fall = new Turn('2', game1, 1, SeasonTypes.Fall, TurnStatus.Open);

let myPieceWarehouse: PieceWarehouse;

beforeAll(() => {
    const myDataProvider = new StaticPieceDataProvider();
    myPieceWarehouse = new PieceWarehouse(myDataProvider);

});

it('warehouse should exist', () => {
    expect(myPieceWarehouse).not.toBeNull();
})

it('the array should be created, but it should have nothing in it', () => {
    let pieces = myPieceWarehouse.getPieces(turnGame1Spring);
    expect(pieces).not.toBeNull();
    expect(pieces.length).toEqual(0);
})

it('pieces added should be returned', () => {
    let pieces = myPieceWarehouse.getPieces(turnGame1Spring);
    expect(pieces).not.toBeNull();
    expect(pieces.length).toEqual(0);
    console.log('looking for location');
    let londonLocation = LocationWarehouse.locations.get('London' + LocationTypes.Piece);
    if (londonLocation) {
        console.log('found location');
        myPieceWarehouse.createPiece(game1, turnGame1Spring, londonLocation, 'London', 'England', 'FLEET');
    };
    pieces = myPieceWarehouse.getPieces(turnGame1Spring);
    expect(pieces.length).toEqual(1);
    let myPiece = pieces[0];
    expect(myPiece.id).toEqual('1');
    expect(myPiece.location).toEqual(londonLocation);
    expect(myPiece.locationName).toEqual('London');
    expect(myPiece.owningCountryName).toEqual('England');
    expect(myPiece.turnId).toEqual('1');
    expect(myPiece.type).toEqual(PieceTypes.Fleet);
})

it('should not default pieces for game 1 turn 1 fall', () => {
    let pieces = myPieceWarehouse.getPieces(turnGame1Fall);
    expect(pieces).not.toBeNull();
    expect(pieces.length).toEqual(0);
})

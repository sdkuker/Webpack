import { Turn } from '.././turn/Turn';
import { Game } from '../game/Game';
import { SeasonTypes, TurnStatus, PieceTypes } from '.././DomainTypes';
import { StaticPieceDataProvider } from '../piece/StaticPieceDataProvider';
import { PieceWarehouse } from '../piece/PieceWarehouse';
import { Warehouse as LocationWarehouse } from '../location/LocationWarehouse';
import { LocationTypes } from '../DomainTypes';

let game1 = new Game('1', 'myGame');
let turnGame1Spring = new Turn('1', '1', 1, SeasonTypes.Spring, TurnStatus.Open);
let turnGame1Fall = new Turn('2', '1', 1, SeasonTypes.Fall, TurnStatus.Open);

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
    let londonLocation = LocationWarehouse.locations.get('London' + LocationTypes.Piece);
    if (londonLocation) {
        myPieceWarehouse.createPiece(game1, turnGame1Spring, londonLocation, 'London', 'England', 'FLEET');
    };
    pieces = myPieceWarehouse.getPieces(turnGame1Spring);
    expect(pieces.length).toEqual(1);
    let myPiece = pieces[0];
    expect(myPiece.id).toEqual('1');
    expect(myPiece.location).toEqual(londonLocation);
    expect(myPiece.locationName).toEqual('London');
    expect(myPiece.owningCountryName).toEqual('England');
    expect(myPiece.turn.id).toEqual('1');
    expect(myPiece.type).toEqual(PieceTypes.Fleet);
})

it('deleting pieces', () => {
    let springPieces = myPieceWarehouse.getPieces(turnGame1Spring);
    expect(springPieces).not.toBeNull();
    expect(springPieces.length).toEqual(1);

    let fallPieces = myPieceWarehouse.getPieces(turnGame1Fall);
    expect(fallPieces).not.toBeNull();
    expect(fallPieces.length).toEqual(0);

    let londonLocation = LocationWarehouse.locations.get('London' + LocationTypes.Piece);
    if (londonLocation) {
        myPieceWarehouse.createPiece(game1, turnGame1Fall, londonLocation, 'London', 'England', 'FLEET');
        myPieceWarehouse.createPiece(game1, turnGame1Fall, londonLocation, 'London', 'England', 'FLEET');
    };
    fallPieces = myPieceWarehouse.getPieces(turnGame1Fall);
    expect(fallPieces.length).toEqual(2);

    myPieceWarehouse.deletePieces(turnGame1Fall);
    fallPieces = myPieceWarehouse.getPieces(turnGame1Fall);
    expect(fallPieces).not.toBeNull();
    expect(fallPieces.length).toEqual(0);
    springPieces = myPieceWarehouse.getPieces(turnGame1Spring);
    expect(springPieces).not.toBeNull();
    expect(springPieces.length).toEqual(1);

})

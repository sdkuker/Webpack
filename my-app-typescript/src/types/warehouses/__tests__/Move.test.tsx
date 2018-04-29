import { Move } from '.././Move';
import { PieceTypes, MoveAction } from '.././DomainTypes';
import { Warehouse as LocationWarehouse } from '.././LocationWarehouse';

it('constructor', () => {
    let myOrder = 'this is my order';
    let myMove = new Move(myOrder);
    expect(myMove.order).toEqual(myOrder);
})

it('piece type F', () => {
    let myOrder = 'F London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
})
it('piece type Fleet', () => {
    let myOrder = 'Fleet London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
})

it('piece type f', () => {
    let myOrder = 'f London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
})
it('piece type fleet', () => {
    let myOrder = 'fleet London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
})

it('piece type A', () => {
    let myOrder = 'A London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
})
it('piece type Army', () => {
    let myOrder = 'Army London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
})

it('piece type a', () => {
    let myOrder = 'a London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
})
it('piece type army', () => {
    let myOrder = 'army London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
})

it('invalid piece type', () => {
    let myOrder = 'george London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toBeUndefined();
})

it('good current Location', () => {
    let myOrder = 'Army London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toEqual('London');
})

it('Bad current Location', () => {
    let myOrder = 'Army George Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toBeUndefined();
})

it('Good hold', () => {
    let myOrder = 'Army London Holds';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.Holds);
})

it('Bad action', () => {
    let myOrder = 'Army London ScrewsAround';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toBeUndefined();
})

it('Good army move', () => {
    let myOrder = 'Army London MovesTo Edinburgh';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.MovesTo);
    expect(myMove.endingLocationName).toEqual('Edinburgh');
})

it('Good fleet move', () => {
    let myOrder = 'Fleet London MovesTo Edinburgh';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.MovesTo);
    expect(myMove.endingLocationName).toEqual('Edinburgh');
})

it('Bad army move - ending location', () => {
    let myOrder = 'Army London MovesTo EdinburghX';
    let myMove = new Move(myOrder);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.MovesTo);
    expect(myMove.endingLocationName).toBeUndefined();
})





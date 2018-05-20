import { Move } from '.././Move';
import { PieceTypes, MoveAction, SeasonTypes } from '.././DomainTypes';
import { Warehouse as LocationWarehouse } from '.././LocationWarehouse';

it('constructor', () => {
    let myOrder = 'this is my order';
    let myMove = new Move(1, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.order).toEqual(myOrder);
    expect(myMove.owningCountryName).toEqual('Germany');
    expect(myMove.id).toEqual(1);
})

it('piece type F', () => {
    let myOrder = 'F London Holds';
    let myMove = new Move(2, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
})
it('piece type Fleet', () => {
    let myOrder = 'Fleet London Holds';
    let myMove = new Move(3, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
})

it('piece type f', () => {
    let myOrder = 'f London Holds';
    let myMove = new Move(4, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
})
it('piece type fleet', () => {
    let myOrder = 'fleet London Holds';
    let myMove = new Move(5, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
})

it('piece type A', () => {
    let myOrder = 'A London Holds';
    let myMove = new Move(6, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
})
it('piece type Army', () => {
    let myOrder = 'Army London Holds';
    let myMove = new Move(7, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
})

it('piece type a', () => {
    let myOrder = 'a London Holds';
    let myMove = new Move(8, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
})
it('piece type army', () => {
    let myOrder = 'army London Holds';
    let myMove = new Move(9, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
})

it('invalid piece type', () => {
    let myOrder = 'george London Holds';
    let myMove = new Move(10, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toBeUndefined();
})

it('good current Location', () => {
    let myOrder = 'Army London Holds';
    let myMove = new Move(11, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toEqual('London');
})

it('Bad current Location', () => {
    let myOrder = 'Army George Holds';
    let myMove = new Move(12, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toBeUndefined();
})

it('Good hold', () => {
    let myOrder = 'Army London Holds';
    let myMove = new Move(13, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.Holds);
    expect(myMove.isValidMove()).toBeTruthy();
})

it('Bad action', () => {
    let myOrder = 'Army London ScrewsAround';
    let myMove = new Move(14, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toBeUndefined();
    expect(myMove.isValidMove()).toBeFalsy();
})

it('Good army move', () => {
    let myOrder = 'Army London MovesTo Edinburgh';
    let myMove = new Move(15, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.MovesTo);
    expect(myMove.endingLocationName).toEqual('Edinburgh');
    expect(myMove.isValidMove()).toBeTruthy();
})

it('Good fleet move', () => {
    let myOrder = 'Fleet London MovesTo Edinburgh';
    let myMove = new Move(16, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.MovesTo);
    expect(myMove.endingLocationName).toEqual('Edinburgh');
    expect(myMove.isValidMove()).toBeTruthy();
})

it('Bad army move - ending location', () => {
    let myOrder = 'Army London MovesTo EdinburghX';
    let myMove = new Move(17, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Army);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.MovesTo);
    expect(myMove.endingLocationName).toBeUndefined();
    expect(myMove.isValidMove()).toBeFalsy();
})

it('Good convoy', () => {
    let myOrder = 'Fleet London Convoys Army Berlin MovesTo Edinburgh';
    let myMove = new Move(18, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.Convoys);
    expect(myMove.endingLocationName).toBeUndefined();
    expect(myMove.secondaryPieceType).toEqual(PieceTypes.Army);
    expect(myMove.secondaryCurrentLocationName).toEqual('Berlin');
    expect(myMove.secondaryAction).toEqual(MoveAction.MovesTo);
    expect(myMove.secondaryEndingLocationName).toEqual('Edinburgh');
    expect(myMove.isValidMove()).toBeTruthy();
})

it('Bad convoy - convoy verb', () => {
    let myOrder = 'Fleet London ConvoysX Army Berlin MovesTo Edinburgh';
    let myMove = new Move(19, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toBeUndefined();
    expect(myMove.endingLocationName).toBeUndefined();
    expect(myMove.secondaryPieceType).toBeUndefined();
    expect(myMove.secondaryCurrentLocationName).toBeUndefined();
    expect(myMove.secondaryAction).toBeUndefined();
    expect(myMove.secondaryEndingLocationName).toBeUndefined();
    expect(myMove.isValidMove()).toBeFalsy();
})

it('Bad convoy - bad secondary piece', () => {
    let myOrder = 'Fleet London Convoys badThang Berlin MovesTo Edinburgh';
    let myMove = new Move(20, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.Convoys);
    expect(myMove.endingLocationName).toBeUndefined();
    expect(myMove.secondaryPieceType).toBeUndefined();
    expect(myMove.secondaryCurrentLocationName).toEqual('Berlin');
    expect(myMove.secondaryAction).toEqual(MoveAction.MovesTo);
    expect(myMove.secondaryEndingLocationName).toEqual('Edinburgh');
    expect(myMove.isValidMove()).toBeFalsy();
})

it('Bad convoy - bad secondary current location', () => {
    let myOrder = 'Fleet London Convoys Army badThing MovesTo Edinburgh';
    let myMove = new Move(21, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.Convoys);
    expect(myMove.endingLocationName).toBeUndefined();
    expect(myMove.secondaryPieceType).toEqual(PieceTypes.Army);
    expect(myMove.secondaryCurrentLocationName).toBeUndefined();
    expect(myMove.secondaryAction).toEqual(MoveAction.MovesTo);
    expect(myMove.secondaryEndingLocationName).toEqual('Edinburgh');
    expect(myMove.isValidMove()).toBeFalsy();
})

it('Bad convoy - bad secondary action', () => {
    let myOrder = 'Fleet London Convoys Army Berlin badThing Edinburgh';
    let myMove = new Move(22, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.Convoys);
    expect(myMove.endingLocationName).toBeUndefined();
    expect(myMove.secondaryPieceType).toEqual(PieceTypes.Army);
    expect(myMove.secondaryCurrentLocationName).toEqual('Berlin');
    expect(myMove.secondaryAction).toBeUndefined();
    expect(myMove.secondaryEndingLocationName).toBeUndefined();
    expect(myMove.isValidMove()).toBeFalsy();
})

it('Bad convoy - bad secondary ending location', () => {
    let myOrder = 'Fleet London Convoys Army Berlin MovesTo badThing';
    let myMove = new Move(23, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.Convoys);
    expect(myMove.endingLocationName).toBeUndefined();
    expect(myMove.secondaryPieceType).toEqual(PieceTypes.Army);
    expect(myMove.secondaryCurrentLocationName).toEqual('Berlin');
    expect(myMove.secondaryAction).toEqual(MoveAction.MovesTo);
    expect(myMove.secondaryEndingLocationName).toBeUndefined();
    expect(myMove.isValidMove()).toBeFalsy();
})

it('Good support', () => {
    let myOrder = 'Fleet London Supports Army Berlin MovesTo Edinburgh';
    let myMove = new Move(24, myOrder, 'Germany', 1, SeasonTypes.Spring);
    expect(myMove.pieceType).toEqual(PieceTypes.Fleet);
    expect(myMove.currentLocationName).toEqual('London');
    expect(myMove.action).toEqual(MoveAction.Supports);
    expect(myMove.endingLocationName).toBeUndefined();
    expect(myMove.secondaryPieceType).toEqual(PieceTypes.Army);
    expect(myMove.secondaryCurrentLocationName).toEqual('Berlin');
    expect(myMove.secondaryAction).toEqual(MoveAction.MovesTo);
    expect(myMove.secondaryEndingLocationName).toEqual('Edinburgh');
    expect(myMove.isValidMove()).toBeTruthy();
})



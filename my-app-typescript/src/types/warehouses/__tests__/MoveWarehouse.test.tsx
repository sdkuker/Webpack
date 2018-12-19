import { Move } from '../move/Move';
import { Turn } from '.././turn/Turn';
import { Location } from '../location/Location';
import { PieceTypes, MoveAction, SeasonTypes, TurnStatus } from '.././DomainTypes';
import { MoveWarehouse } from '../move/MoveWarehouse';
import { StaticMoveDataProvider } from '../move/StaticMoveDataProvider';
import { Piece } from '../piece/Piece';

let myGameId = '1';
let turn1SpringId = '1';
let turn1FallId = '2';
let turn1Spring = new Turn('1', '1', 1, SeasonTypes.Spring, TurnStatus.Complete);
let turn1Fall = new Turn('2', '1', 1, SeasonTypes.Fall, TurnStatus.Open);
let myMoveWarehouse: MoveWarehouse;
let myDataProvider: StaticMoveDataProvider;

beforeAll(() => {

    myDataProvider = new StaticMoveDataProvider();

    myDataProvider.persistMove(new Move(null, 'Fleet London movesTo North_Sea', 'England', turn1SpringId, myGameId), null);

    myDataProvider.persistMove(new Move(null, 'Army Paris movesTo Picardy', 'France', turn1SpringId, myGameId), null);
    myDataProvider.persistMove(new Move(null, 'Army Marseilles movesTo Gascony', 'France', turn1SpringId, myGameId), null);
    myDataProvider.persistMove(new Move(null, 'Fleet Brest movesTo North_Atlantic_Ocean', 'France', turn1SpringId, myGameId), null);

    myDataProvider.persistMove(new Move(null, 'Fleet North_Sea movesTo Norway', 'England', turn1FallId, myGameId), null);
    myDataProvider.persistMove(new Move(null, 'Army Yorkshire movesTo Wales', 'England', turn1FallId, myGameId), null);

    myDataProvider.persistMove(new Move(null, 'Army Picardy movesTo Belguim', 'France', turn1FallId, myGameId), null);
    myDataProvider.persistMove(new Move(null, 'Army Gascony movesTo Spain_(sc)', 'France', turn1FallId, myGameId), null);

    myMoveWarehouse = new MoveWarehouse(myDataProvider);

});

it('is the cache the same array as allMoves', () => {
    const theReturn = myMoveWarehouse.getMoves('England', turn1SpringId, myGameId, false);
    let movesArray = myDataProvider.moves;
    // @ts-ignore
    let allMovesArrayYear1Spring = myDataProvider.allMoves.get('1').get('1');
    expect(theReturn.length).toEqual(1);
    expect(movesArray.length).toEqual(4);
    // @ts-ignore
    expect(allMovesArrayYear1Spring.length).toEqual(4);

    const theReturnFall = myMoveWarehouse.getMoves('England', turn1FallId, myGameId, false);
    let movesArrayFall = myDataProvider.moves;
    // @ts-ignore
    let allMovesArrayYear1Fall = myDataProvider.allMoves.get('1').get('2');
    expect(theReturnFall.length).toEqual(2);
    expect(movesArrayFall.length).toEqual(4);
    // @ts-ignore
    expect(allMovesArrayYear1Fall.length).toEqual(4);

})

it('Successfully get England 1-spring moves', () => {
    const theReturn = myMoveWarehouse.getMoves('England', turn1SpringId, myGameId, false);
    expect(theReturn.length).toEqual(1);
    expect(theReturn[0].id).toEqual('1');
    expect(theReturn[0].order).toEqual('Fleet London movesTo North_Sea');
    expect(theReturn[0].owningCountryName).toEqual('England');
    expect(theReturn[0].turnId).toEqual('1');
    expect(theReturn[0].gameId).toEqual('1');
})

it('Successfully get England 1-fall moves', () => {
    const theReturn = myMoveWarehouse.getMoves('England', turn1FallId, myGameId, false);
    expect(theReturn.length).toEqual(2);
})

it('Successfully get France 1-spring moves', () => {
    const theReturn = myMoveWarehouse.getMoves('France', turn1SpringId, myGameId, false);
    expect(theReturn.length).toEqual(3);
})

it('Successfully get France 1-fall moves', () => {
    const theReturn = myMoveWarehouse.getMoves('France', turn1FallId, myGameId, false);
    expect(theReturn.length).toEqual(2);
})

it('Create initial moves for a turn', () => {
    const location1 = new Location('1', '1');
    const piece1 = new Piece(null, turn1Spring, 'England', location1, 'London', PieceTypes.Army);
    const location2 = new Location('2', '2');
    const piece2 = new Piece(null, turn1Spring, 'France', location2, 'Paris', PieceTypes.Fleet);
    const pieces = new Array<Piece>();
    pieces.push(piece1);
    pieces.push(piece2);
    const theReturn = myMoveWarehouse.createInitialMoves(turn1SpringId, myGameId, pieces);
    expect(theReturn.length).toEqual(2);
})

it('Delete a single move from a turn and all the moves from a turn', () => {
    let game3Id = '3';
    let turn1SpringId = '10';
    let turn1FallId = '11';
    let turn1Spring = new Turn(turn1SpringId, game3Id, 1, SeasonTypes.Spring, TurnStatus.Complete);
    let turn1Fall = new Turn(turn1FallId, game3Id, 1, SeasonTypes.Fall, TurnStatus.Open);
    let move1 = new Move(null, 'a move order', 'England', turn1SpringId, game3Id);
    let move2 = new Move(null, 'a move order', 'England', turn1SpringId, game3Id);
    let move3 = new Move(null, 'a move order', 'England', turn1FallId, game3Id);

    let game4Id = '4';
    let turn1SpringGame2Id = '12';
    let turn1FallGame2Id = '13';
    let turn1SpringGame2 = new Turn(turn1SpringGame2Id, game4Id, 1, SeasonTypes.Spring, TurnStatus.Complete);
    let turn1FallGame2 = new Turn(turn1FallGame2Id, game4Id, 1, SeasonTypes.Fall, TurnStatus.Open);
    let move4 = new Move(null, 'a move order', 'England', turn1SpringGame2Id, game4Id);
    let move5 = new Move(null, 'a move order', 'England', turn1SpringGame2Id, game4Id);
    let move6 = new Move(null, 'a move order', 'England', turn1FallGame2Id, game4Id);

    myMoveWarehouse.persistMove(move1);
    myMoveWarehouse.persistMove(move2);
    myMoveWarehouse.persistMove(move3);
    myMoveWarehouse.persistMove(move4);
    myMoveWarehouse.persistMove(move5);
    myMoveWarehouse.persistMove(move6);

    expect(myMoveWarehouse.getMoves('England', turn1SpringId, game3Id, null).length).toEqual(2);
    expect(myMoveWarehouse.getMoves('England', turn1FallId, game3Id, null).length).toEqual(1);
    expect(myMoveWarehouse.getMoves('England', turn1SpringGame2Id, game4Id, null).length).toEqual(2);
    expect(myMoveWarehouse.getMoves('England', turn1FallGame2Id, game4Id, null).length).toEqual(1);

    const allMovedDeleted = myMoveWarehouse.deleteMove(move2);

    expect(allMovedDeleted).toBeTruthy();
    expect(myMoveWarehouse.getMoves('England', turn1SpringId, game3Id, null).length).toEqual(1);
    expect(myMoveWarehouse.getMoves('England', turn1FallId, game3Id, null).length).toEqual(1);
    expect(myMoveWarehouse.getMoves('England', turn1SpringGame2Id, game4Id, null).length).toEqual(2);
    expect(myMoveWarehouse.getMoves('England', turn1FallGame2Id, game4Id, null).length).toEqual(1);

    myMoveWarehouse.deleteMoves(turn1SpringGame2Id, game4Id);

    expect(myMoveWarehouse.getMoves('England', turn1SpringId, game3Id, null).length).toEqual(1);
    expect(myMoveWarehouse.getMoves('England', turn1FallId, game3Id, null).length).toEqual(1);
    expect(myMoveWarehouse.getMoves('England', turn1SpringGame2Id, game4Id, null).length).toEqual(0);
    expect(myMoveWarehouse.getMoves('England', turn1FallGame2Id, game4Id, null).length).toEqual(1);

})



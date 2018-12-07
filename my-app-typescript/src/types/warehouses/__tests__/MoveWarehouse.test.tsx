import { Move } from '.././Move';
import { Turn } from '.././Turn';
import { Game } from '.././Game';
import { Location } from '.././Location';
import { PieceTypes, MoveAction, SeasonTypes, TurnStatus } from '.././DomainTypes';
import { MoveWarehouse } from '.././MoveWarehouse';
import { StaticMoveDataProvider } from '.././StaticMoveDataProvider';
import { Piece } from '../Piece';

let myGame = new Game('1', 'test');
let turn1Spring = new Turn('1', myGame, 1, SeasonTypes.Spring, TurnStatus.Complete);
let turn1Fall = new Turn('2', myGame, 1, SeasonTypes.Fall, TurnStatus.Open);
let myMoveWarehouse : MoveWarehouse;
let myDataProvider : StaticMoveDataProvider;

beforeAll(() => {

    myDataProvider = new StaticMoveDataProvider();

    myDataProvider.persistMove(new Move('1', 'Fleet London movesTo North_Sea', 'England', turn1Spring), null);

    myDataProvider.persistMove(new Move('2', 'Army Paris movesTo Picardy', 'France', turn1Spring), null);
    myDataProvider.persistMove(new Move('3', 'Army Marseilles movesTo Gascony', 'France', turn1Spring), null);
    myDataProvider.persistMove(new Move('4', 'Fleet Brest movesTo North_Atlantic_Ocean', 'France', turn1Spring), null);

    myDataProvider.persistMove(new Move('5', 'Fleet North_Sea movesTo Norway', 'England', turn1Fall), null);
    myDataProvider.persistMove(new Move('6', 'Army Yorkshire movesTo Wales', 'England', turn1Fall), null);

    myDataProvider.persistMove(new Move('7', 'Army Picardy movesTo Belguim', 'France', turn1Fall), null);
    myDataProvider.persistMove(new Move('8', 'Army Gascony movesTo Spain_(sc)', 'France', turn1Fall), null);

    myMoveWarehouse = new MoveWarehouse(myDataProvider);

});

it ('is the cache the same array as allMoves', () => {
    const theReturn = myMoveWarehouse.getMoves('England', turn1Spring, false);
    let movesArray = myDataProvider.moves;
    // @ts-ignore
    let allMovesArrayYear1Spring =  myDataProvider.allMoves.get('1').get('1');
    expect(theReturn.length).toEqual(1);
    expect(movesArray.length).toEqual(4);
     // @ts-ignore
    expect(allMovesArrayYear1Spring.length).toEqual(4);

    const theReturnFall = myMoveWarehouse.getMoves('England', turn1Fall, false);
    let movesArrayFall = myDataProvider.moves;
    // @ts-ignore
    let allMovesArrayYear1Fall =  myDataProvider.allMoves.get('1').get('2');
    expect(theReturnFall.length).toEqual(2);
    expect(movesArrayFall.length).toEqual(4);
     // @ts-ignore
    expect(allMovesArrayYear1Fall.length).toEqual(4);

})

it('Successfully get England 1-spring moves', () => {
    const theReturn = myMoveWarehouse.getMoves('England', turn1Spring, false);
    expect(theReturn.length).toEqual(1);
    expect(theReturn[0].id).toEqual('1');
    expect(theReturn[0].order).toEqual('Fleet London movesTo North_Sea');
    expect(theReturn[0].owningCountryName).toEqual('England');
    expect(theReturn[0].turn.year).toEqual(1);
    expect(theReturn[0].turn.season).toEqual(SeasonTypes.Spring);
})

it('Successfully get England 1-fall moves', () => {
    const theReturn = myMoveWarehouse.getMoves('England', turn1Fall, false);
    expect(theReturn.length).toEqual(2);
})

it('Successfully get France 1-spring moves', () => {
    const theReturn = myMoveWarehouse.getMoves('France', turn1Spring, false);
    expect(theReturn.length).toEqual(3);
})

it('Successfully get France 1-fall moves', () => {
    const theReturn = myMoveWarehouse.getMoves('France', turn1Fall, false);
    expect(theReturn.length).toEqual(2);
})

it('Create initial moves for a turn', () => {
    const location1 = new Location('1', '1');
    const piece1 = new Piece(null, 'England', location1, PieceTypes.Army);
    const location2 = new Location('2', '2');
    const piece2 = new Piece(null, 'France', location2, PieceTypes.Fleet);
    const pieces = new Array<Piece>();
    pieces.push(piece1);
    pieces.push(piece2);
    const theReturn = myMoveWarehouse.createInitialMoves(turn1Spring, pieces);
    expect(theReturn.length).toEqual(2);
})



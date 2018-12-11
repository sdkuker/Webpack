import { MoveAction } from '.././DomainTypes';
import { IGameCreator } from '.././IGameCreator';
import { GameCreator } from '.././GameCreator';
import { SeasonTypes, TurnStatus } from '.././DomainTypes';
import { IGameWarehouse } from '.././IGameWarehouse';
import { GameWarehouse } from '.././GameWarehouse';
import { StaticGameDataProvider } from '.././StaticGameDataProvider';
import { ITurnWarehouse } from '.././ITurnWarehouse';
import { TurnWarehouse } from '.././TurnWarehouse';
import { StaticTurnDataProvider } from '.././StaticTurnDataProvider';
import { IMoveWarehouse } from '.././IMoveWarehouse';
import { MoveWarehouse } from '.././MoveWarehouse';
import { StaticMoveDataProvider } from '.././StaticMoveDataProvider';
import { IPieceWarehouse } from '.././IPieceWarehouse';
import { PieceWarehouse } from '.././PieceWarehouse';
import { StaticPieceDataProvider } from '.././StaticPieceDataProvider';


let gameWarehouse: IGameWarehouse = new GameWarehouse(new StaticGameDataProvider(null));
let turnWarehouse: ITurnWarehouse = new TurnWarehouse(new StaticTurnDataProvider(null, null));
let moveWarehouse: IMoveWarehouse = new MoveWarehouse(new StaticMoveDataProvider());
let pieceWarehouse: IPieceWarehouse = new PieceWarehouse(new StaticPieceDataProvider());
let gameCreator: IGameCreator = new GameCreator(gameWarehouse, turnWarehouse, pieceWarehouse, moveWarehouse);

let newGame = gameCreator.createGame();

it('the game should have been created', () => {
    expect(newGame).not.toBeNull();
    expect(newGame.id).toEqual('1');
})

it('the game warehouse should have the game', () => {
    let allGames = gameWarehouse.getAllGames();
    expect(allGames).not.toBeNull();
    expect(allGames.length).toEqual(1);
    expect(allGames[0].id).toEqual('1');
})

it('the turn warehouse should have the turn', () => {
    let allTurns = turnWarehouse.getTurns(newGame);
    expect(allTurns).not.toBeNull();
    expect(allTurns.length).toEqual(1);
    expect(allTurns[0].id).toEqual('1');
    expect(allTurns[0].year).toEqual(1);
    expect(allTurns[0].season).toEqual(SeasonTypes.Spring);
})

it('the piece warehouse should have the pieces', () => {
    let allPieces = pieceWarehouse.getPieces(turnWarehouse.getTurns(newGame)[0]);
    expect(allPieces).not.toBeNull();
    expect(allPieces.length).toEqual(22);
    expect(Number(allPieces[0].id)).toBeGreaterThanOrEqual(1);
    expect(Number(allPieces[0].id)).toBeLessThanOrEqual(22);
})

it('the move warehouse should have the moves', () => {
    let allEnglishMoves = moveWarehouse.getMoves('England', turnWarehouse.getTurns(newGame)[0], false);
    expect(allEnglishMoves).not.toBeNull();
    expect(allEnglishMoves.length).toEqual(3);
    expect(allEnglishMoves[0].action).toEqual(MoveAction.Holds);
    expect(Number(allEnglishMoves[0].id)).toBeGreaterThanOrEqual(1);
    expect(Number(allEnglishMoves[0].id)).toBeLessThanOrEqual(22);
})

it('the second game should have been created', () => {
    let secondGame = gameCreator.createGame();
    expect(secondGame).not.toBeNull();
    expect(secondGame.id).toEqual('2');

    let allGames = gameWarehouse.getAllGames();
    expect(allGames).not.toBeNull();
    expect(allGames.length).toEqual(2);
    expect(allGames[1].id).toEqual('2');

    let allTurns = turnWarehouse.getTurns(secondGame);
    expect(allTurns).not.toBeNull();
    expect(allTurns.length).toEqual(1);
    expect(allTurns[0].id).toEqual('2');
    expect(allTurns[0].year).toEqual(1);
    expect(allTurns[0].season).toEqual(SeasonTypes.Spring);

    let allPieces = pieceWarehouse.getPieces(turnWarehouse.getTurns(secondGame)[0]);
    expect(allPieces).not.toBeNull();
    expect(allPieces.length).toEqual(22);
    expect(Number(allPieces[0].id)).toBeGreaterThanOrEqual(23);
    expect(Number(allPieces[0].id)).toBeLessThanOrEqual(44);

    let allEnglishMoves = moveWarehouse.getMoves('England', turnWarehouse.getTurns(secondGame)[0], false);
    expect(allEnglishMoves).not.toBeNull();
    expect(allEnglishMoves.length).toEqual(3);
    expect(allEnglishMoves[0].action).toEqual(MoveAction.Holds);
    expect(Number(allEnglishMoves[0].id)).toBeGreaterThanOrEqual(23);
    expect(Number(allEnglishMoves[0].id)).toBeLessThanOrEqual(44);
})

it('delete a game', () => {

    expect(gameWarehouse.getAllGames().length).toEqual(2);
    let turns = turnWarehouse.getTurns(newGame);
    expect(turns.length).toEqual(1);
    let myTurn = turns[0];
    expect(moveWarehouse.getMoves('England', myTurn, null).length).toEqual(3);
    expect(pieceWarehouse.getPieces(myTurn).length).toEqual(22);

    expect(gameCreator.deleteGame(newGame)).toBeTruthy;
    expect(turnWarehouse.getTurns(newGame).length).toEqual(0);
    expect(moveWarehouse.getMoves('England', myTurn, null).length).toEqual(0);
    expect(pieceWarehouse.getPieces(myTurn).length).toEqual(0);
})

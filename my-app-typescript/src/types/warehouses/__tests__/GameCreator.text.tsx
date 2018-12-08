import { Turn } from '.././Turn';
import { MoveAction } from '.././DomainTypes';
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
let gameCreator = new GameCreator(gameWarehouse, turnWarehouse, pieceWarehouse, moveWarehouse);

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
})

it('the move warehouse should have the moves', () => {
    let allEnglishMoves = moveWarehouse.getMoves('England', turnWarehouse.getTurns(newGame)[0], false);
    expect(allEnglishMoves).not.toBeNull();
    expect(allEnglishMoves.length).toEqual(3);
    expect(allEnglishMoves[0].action).toEqual(MoveAction.Holds);
})

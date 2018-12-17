import { MoveAction } from '../DomainTypes';
import { IGameCreator } from '../IGameCreator';
import { GameCreator } from '../GameCreator';
import { SeasonTypes, TurnStatus } from '../DomainTypes';
import { IGameWarehouse } from '../IGameWarehouse';
import { GameWarehouse } from '../GameWarehouse';
import { StaticGameDataProvider } from '../StaticGameDataProvider';
import { ITurnWarehouse } from '../ITurnWarehouse';
import { TurnWarehouse } from '../TurnWarehouse';
import { StaticTurnDataProvider } from '../StaticTurnDataProvider';
import { IMoveWarehouse } from '../IMoveWarehouse';
import { MoveWarehouse } from '../MoveWarehouse';
import { StaticMoveDataProvider } from '../StaticMoveDataProvider';
import { IPieceWarehouse } from '../IPieceWarehouse';
import { PieceWarehouse } from '../PieceWarehouse';
import { StaticPieceDataProvider } from '../StaticPieceDataProvider';
import { ICountryWarehouse } from '../ICountryWarehouse';
import { CountryWarehouse } from '../CountryWarehouse';
import { StaticCountryDataProvider } from '../StaticCountryDataProvider';

let gameWarehouse: IGameWarehouse = new GameWarehouse(new StaticGameDataProvider(null));
let turnWarehouse: ITurnWarehouse = new TurnWarehouse(new StaticTurnDataProvider(null, null));
let moveWarehouse: IMoveWarehouse = new MoveWarehouse(new StaticMoveDataProvider());
let pieceWarehouse: IPieceWarehouse = new PieceWarehouse(new StaticPieceDataProvider());
let countryWarehouse: ICountryWarehouse = new CountryWarehouse(new StaticCountryDataProvider(null, null), null);
let gameCreator: IGameCreator = new GameCreator(gameWarehouse, turnWarehouse, pieceWarehouse,
    moveWarehouse, countryWarehouse);

it('the game should have been created', () => {
    expect.assertions(2);
    return gameCreator.createGame().then((newGame) => {
        expect(newGame).not.toBeNull();
        expect(newGame.id).toEqual('1');
    })
})

it('the game warehouse should have the game', () => {
    expect.assertions(3);
    return gameWarehouse.getAllGames().then((gameArray) => {
        expect(gameArray).not.toBeNull();
        expect(gameArray.length).toEqual(1);
        expect(gameArray[0].id).toEqual('1');
    })
})

it('the turn warehouse should have the turn', () => {
    let allTurns = turnWarehouse.getTurns('1');
    expect(allTurns).not.toBeNull();
    expect(allTurns.length).toEqual(1);
    expect(allTurns[0].id).toEqual('1');
    expect(allTurns[0].year).toEqual(1);
    expect(allTurns[0].season).toEqual(SeasonTypes.Spring);
})

it('the piece warehouse should have the pieces', () => {
    let allPieces = pieceWarehouse.getPieces(turnWarehouse.getTurns('1')[0]);
    expect(allPieces).not.toBeNull();
    expect(allPieces.length).toEqual(22);
    expect(Number(allPieces[0].id)).toBeGreaterThanOrEqual(1);
    expect(Number(allPieces[0].id)).toBeLessThanOrEqual(22);
})

it('the move warehouse should have the moves', () => {
    let allEnglishMoves = moveWarehouse.getMoves('England', turnWarehouse.getTurns('1')[0].id,
        turnWarehouse.getTurns('1')[0].gameId, false);
    expect(allEnglishMoves).not.toBeNull();
    expect(allEnglishMoves.length).toEqual(3);
    expect(allEnglishMoves[0].action).toEqual(MoveAction.Holds);
    expect(Number(allEnglishMoves[0].id)).toBeGreaterThanOrEqual(1);
    expect(Number(allEnglishMoves[0].id)).toBeLessThanOrEqual(22);
})

it('the country warehouse should have the countries', () => {
    let allCountries = countryWarehouse.getAllCountries('1');
    expect(allCountries).not.toBeNull();
    expect(allCountries.length).toEqual(7);
})

it('the second game should have been created', () => {

    expect.assertions(2);
    return gameCreator.createGame().then((secondGame) => {
        expect(secondGame).not.toBeNull();
        expect(secondGame.id).toEqual('2');
    })
})

it('the second game should be in the warehouse', () => {

    expect.assertions(3);
    gameWarehouse.getAllGames().then((arrayOfGames) => {
        expect(arrayOfGames).not.toBeNull();
        expect(arrayOfGames.length).toEqual(2);
        expect(arrayOfGames[1].id).toEqual('2');
    })
})

it('the second game should have turns and pieces', () => {
    let allTurns = turnWarehouse.getTurns('2');
    expect(allTurns).not.toBeNull();
    expect(allTurns.length).toEqual(1);
    expect(allTurns[0].id).toEqual('2');
    expect(allTurns[0].year).toEqual(1);
    expect(allTurns[0].season).toEqual(SeasonTypes.Spring);

    let allPieces = pieceWarehouse.getPieces(turnWarehouse.getTurns('2')[0]);
    expect(allPieces).not.toBeNull();
    expect(allPieces.length).toEqual(22);
    expect(Number(allPieces[0].id)).toBeGreaterThanOrEqual(23);
    expect(Number(allPieces[0].id)).toBeLessThanOrEqual(44);
})

it('should have english moves and actions', () => {
    let allEnglishMoves = moveWarehouse.getMoves('England', turnWarehouse.getTurns('2')[0].id,
        turnWarehouse.getTurns('2')[0].gameId, false);
    expect(allEnglishMoves).not.toBeNull();
    expect(allEnglishMoves.length).toEqual(3);
    expect(allEnglishMoves[0].action).toEqual(MoveAction.Holds);
    expect(Number(allEnglishMoves[0].id)).toBeGreaterThanOrEqual(23);
    expect(Number(allEnglishMoves[0].id)).toBeLessThanOrEqual(44);
})

it('delete a game', () => {

    expect.assertions(10);
    return gameWarehouse.getAllGames().then((arrayOfGames) => {
        expect(arrayOfGames.length).toEqual(2);
        let turns = turnWarehouse.getTurns('1');
        expect(turns.length).toEqual(1);
        let myTurn = turns[0];
        expect(moveWarehouse.getMoves('England', myTurn.id, myTurn.gameId, null).length).toEqual(3);
        expect(pieceWarehouse.getPieces(myTurn).length).toEqual(22);
        expect(countryWarehouse.getAllCountries('1').length).toEqual(7);
        return gameCreator.deleteGame(arrayOfGames[0]).then((wasGameSuccessfullyDeleted) => {
            expect(wasGameSuccessfullyDeleted).toBeTruthy;
            return gameWarehouse.getAllGames().then((newArrayOfGames) => {
                expect(newArrayOfGames.length).toEqual(1);
                expect(turnWarehouse.getTurns('1').length).toEqual(0);
                expect(moveWarehouse.getMoves('England', myTurn.id, myTurn.gameId, null).length).toEqual(0);
                expect(pieceWarehouse.getPieces(myTurn).length).toEqual(0);
                expect(countryWarehouse.getAllCountries('1').length).toEqual(0);
            })
        })
    })
})

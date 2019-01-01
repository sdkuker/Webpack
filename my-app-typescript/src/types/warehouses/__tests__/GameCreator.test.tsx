import { MoveAction } from '../DomainTypes';
import { IGameCreator } from '../IGameCreator';
import { GameCreator } from '../GameCreator';
import { SeasonTypes, TurnStatus } from '../DomainTypes';
import { IGameWarehouse } from '../game/IGameWarehouse';
import { GameWarehouse } from '../game/GameWarehouse';
import { StaticGameDataProvider } from '../game/StaticGameDataProvider';
import { ITurnWarehouse } from '../turn/ITurnWarehouse';
import { TurnWarehouse } from '../turn/TurnWarehouse';
import { StaticTurnDataProvider } from '../turn/StaticTurnDataProvider';
import { IMoveWarehouse } from '../move/IMoveWarehouse';
import { MoveWarehouse } from '../move/MoveWarehouse';
import { StaticMoveDataProvider } from '../move/StaticMoveDataProvider';
import { IPieceWarehouse } from '../piece/IPieceWarehouse';
import { PieceWarehouse } from '../piece/PieceWarehouse';
import { StaticPieceDataProvider } from '../piece/StaticPieceDataProvider';
import { ICountryWarehouse } from '../country/ICountryWarehouse';
import { CountryWarehouse } from '../country/CountryWarehouse';
import { StaticCountryDataProvider } from '../country/StaticCountryDataProvider';

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
    expect.assertions(5);
    return turnWarehouse.getTurns('1').then((allTurns) => {
        expect(allTurns).not.toBeNull();
        expect(allTurns.length).toEqual(1);
        expect(allTurns[0].id).toEqual('1');
        expect(allTurns[0].year).toEqual(1);
        expect(allTurns[0].season).toEqual(SeasonTypes.Spring);
    })

})

it('the piece warehouse should have the pieces', () => {
    expect.assertions(6);
    return turnWarehouse.getTurns('1').then((turnsArray) => {
        expect(turnsArray).not.toBeNull();
        expect(turnsArray.length).toEqual(1);
        return pieceWarehouse.getPieces(turnsArray[0]).then((allPieces) => {
            expect(allPieces).not.toBeNull();
            expect(allPieces.length).toEqual(22);
            expect(Number(allPieces[0].id)).toBeGreaterThanOrEqual(1);
            expect(Number(allPieces[0].id)).toBeLessThanOrEqual(22);
        })

    })

})

it('the move warehouse should have the moves', () => {

    expect.assertions(5);

    return turnWarehouse.getTurns('1').then((turnsArray) => {
        return moveWarehouse.getMoves('England', turnsArray[0].id, turnsArray[0].gameId, false).then((allEnglishMoves) => {
            expect(allEnglishMoves).not.toBeNull();
            expect(allEnglishMoves.length).toEqual(3);
            expect(allEnglishMoves[0].action).toEqual(MoveAction.Holds);
            expect(Number(allEnglishMoves[0].id)).toBeGreaterThanOrEqual(1);
            expect(Number(allEnglishMoves[0].id)).toBeLessThanOrEqual(22);
        });
    });
})

it('the country warehouse should have the countries', () => {

    expect.assertions(2);

    return countryWarehouse.getAllCountries('1').then((allCountries) => {
        expect(allCountries).not.toBeNull();
        expect(allCountries.length).toEqual(7);
    })

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
    expect.assertions(9);
    return turnWarehouse.getTurns('2').then((allTurns) => {
        expect(allTurns).not.toBeNull();
        expect(allTurns.length).toEqual(1);
        expect(allTurns[0].id).toEqual('2');
        expect(allTurns[0].year).toEqual(1);
        expect(allTurns[0].season).toEqual(SeasonTypes.Spring);

        return pieceWarehouse.getPieces(allTurns[0]).then((allPieces) => {
            expect(allPieces).not.toBeNull();
            expect(allPieces.length).toEqual(22);
            expect(Number(allPieces[0].id)).toBeGreaterThanOrEqual(23);
            expect(Number(allPieces[0].id)).toBeLessThanOrEqual(44);
        })

    })
})

it('should have english moves and actions', () => {
    expect.assertions(5);
    return turnWarehouse.getTurns('2').then((turnsArray) => {
        return moveWarehouse.getMoves('England', turnsArray[0].id,
            turnsArray[0].gameId, false).then((allEnglishMoves) => {
                expect(allEnglishMoves).not.toBeNull();
                expect(allEnglishMoves.length).toEqual(3);
                expect(allEnglishMoves[0].action).toEqual(MoveAction.Holds);
                expect(Number(allEnglishMoves[0].id)).toBeGreaterThanOrEqual(23);
                expect(Number(allEnglishMoves[0].id)).toBeLessThanOrEqual(44);
            });
    });
})

it('delete a game', () => {

    expect.assertions(13);
    return gameWarehouse.getAllGames().then((arrayOfGames) => {
        expect(arrayOfGames.length).toEqual(2);
        expect(arrayOfGames[0].id).toEqual('1');
        expect(arrayOfGames[1].id).toEqual('2');
        return turnWarehouse.getTurns('1').then((turns) => {
            expect(turns.length).toEqual(1);
            let myTurn = turns[0];
            return moveWarehouse.getMoves('England', myTurn.id, myTurn.gameId, null).then((englishTurns) => {
                expect(englishTurns.length).toEqual(3);
                return pieceWarehouse.getPieces(myTurn).then((piecesArray) => {
                    expect(piecesArray.length).toEqual(22);
                    return countryWarehouse.getAllCountries('1').then((countryArray) => {
                        expect(countryArray.length).toEqual(7);
                        return gameCreator.deleteGame(arrayOfGames[0]).then((wasGameSuccessfullyDeleted) => {
                            expect(wasGameSuccessfullyDeleted).toBeTruthy;
                            return gameWarehouse.getAllGames().then((newArrayOfGames) => {
                                expect(newArrayOfGames.length).toEqual(1);
                                expect(newArrayOfGames[0].id).toEqual('2');
                                return turnWarehouse.getTurns('1').then((turnArray) => {
                                    expect(turnArray.length).toEqual(0);
                                    return moveWarehouse.getMoves('England', myTurn.id, myTurn.gameId, null).then((englishTurns2) => {
                                        expect(englishTurns2.length).toEqual(0);
                                        return pieceWarehouse.getPieces(myTurn).then((myPieces2) => {
                                            expect(myPieces2.length).toEqual(0);
                                            return countryWarehouse.getAllCountries('1').then((countryArray2) => {
                                                expect(countryArray2.length).toEqual(0);
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })

                })
            })
        })
    })
})

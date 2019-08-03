import { Turn } from '.././turn/Turn';
import { Game } from '../game/Game';
import { SeasonTypes, TurnStatus, TurnPhase, PieceTypes, LocationTypes } from '.././DomainTypes';
import { FirebasePieceDataProvider } from '../piece/FirebasePieceDataProvider';
import { PieceWarehouse } from '../piece/PieceWarehouse';
import { EnvironmentName } from '../PersistenceTypes';

let game1 = new Game('1', 'myGame');
let turnGame1Spring = new Turn('1', '1', 1, SeasonTypes.Spring, TurnStatus.Open, TurnPhase.Diplomatic);
let turnGame1Fall = new Turn('2', '1', 1, SeasonTypes.Fall, TurnStatus.Open, TurnPhase.Diplomatic);

let myPieceWarehouse: PieceWarehouse;

beforeAll(() => {
    let myProvider = new FirebasePieceDataProvider(EnvironmentName.UnitTest);
    myPieceWarehouse = new PieceWarehouse(myProvider);

});

it('warehouse should exist', () => {
    expect(myPieceWarehouse).not.toBeNull();
})

it('the array should be created, but it should have nothing in it', () => {

    expect.assertions(2);
    return myPieceWarehouse.getPieces(turnGame1Spring, TurnPhase.Diplomatic).then((pieces) => {
        expect(pieces).not.toBeNull();
        expect(pieces.length).toEqual(0);
    })
})

it('pieces added should be returned', () => {

    expect.assertions(9);
    // @ts-ignore
    return myPieceWarehouse.getPieces(turnGame1Spring, TurnPhase.Diplomatic).then((pieces) => {
        expect(pieces).not.toBeNull();
        expect(pieces.length).toEqual(0);
        return myPieceWarehouse.createPiece(game1, turnGame1Spring, 'London', 'England', 'Fleet').then((newPiece) => {
            expect(newPiece).not.toBeNull();
            return myPieceWarehouse.getPieces(turnGame1Spring, TurnPhase.Diplomatic).then((newPieces) => {
                expect(newPieces.length).toEqual(1);
                let myPiece = newPieces[0];
                expect(myPiece.gameId).toEqual('1');
                expect(myPiece.pieceLocation.nameOfLocationAtBeginningOfPhase).toEqual('London');
                expect(myPiece.owningCountryName).toEqual('England');
                expect(myPiece.pieceLocation.turnId).not.toBeNull();
                expect(myPiece.type).toEqual(PieceTypes.Fleet);
            })
        })
    })
})

it('deleting pieces', () => {

    expect.assertions(13);
    return myPieceWarehouse.getPieces(turnGame1Spring, TurnPhase.Diplomatic).then((springPieces) => {
        expect(springPieces).not.toBeNull();
        expect(springPieces.length).toEqual(1);
        // @ts-ignore
        return myPieceWarehouse.getPieces(turnGame1Fall).then((fallPieces) => {
            expect(fallPieces).not.toBeNull();
            expect(fallPieces.length).toEqual(0);
            return myPieceWarehouse.createPiece(game1, turnGame1Fall, 'London', 'England', 'Fleet').then((newPiece1) => {
                expect(newPiece1).not.toBeNull();
                // @ts-ignore
                return myPieceWarehouse.createPiece(game1, turnGame1Fall, 'Wales', 'England', 'Fleet').then((newPiece2) => {
                    expect(newPiece2).not.toBeNull();
                    return myPieceWarehouse.getPieces(turnGame1Fall, TurnPhase.Diplomatic).then((fallPieces2) => {
                        expect(fallPieces2.length).toEqual(2);
                        return myPieceWarehouse.deletePieces(turnGame1Fall).then((werePiecesDeleted) => {
                            expect(werePiecesDeleted).toBeTruthy();
                            return myPieceWarehouse.getPieces(turnGame1Fall, TurnPhase.Diplomatic).then((fallPieces3) => {
                                expect(fallPieces3).not.toBeNull();
                                expect(fallPieces3.length).toEqual(0);
                                return myPieceWarehouse.getPieces(turnGame1Spring, TurnPhase.Diplomatic).then((springPieces2) => {
                                    expect(springPieces2).not.toBeNull();
                                    expect(springPieces2.length).toEqual(1);
                                    return myPieceWarehouse.deletePieces(turnGame1Spring).then((wereOtherPiecesDeleted) => {
                                        expect(wereOtherPiecesDeleted).toBeTruthy();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
})

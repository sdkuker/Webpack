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

    expect.assertions(2);
    return myPieceWarehouse.getPieces(turnGame1Spring).then((pieces) => {
        expect(pieces).not.toBeNull();
        expect(pieces.length).toEqual(0);
    })
})

it('pieces added should be returned', () => {

    expect.assertions(9);
    // @ts-ignore
    return myPieceWarehouse.getPieces(turnGame1Spring).then((pieces) => {
        expect(pieces).not.toBeNull();
        expect(pieces.length).toEqual(0);
        let londonLocation = LocationWarehouse.locations.get('London' + LocationTypes.Piece);
        if (londonLocation) {
            return myPieceWarehouse.createPiece(game1, turnGame1Spring, 'London', 'England', 'FLEET').then((newPiece) => {
                expect(newPiece).not.toBeNull();
                return myPieceWarehouse.getPieces(turnGame1Spring).then((newPieces) => {
                    expect(newPieces.length).toEqual(1);
                    let myPiece = newPieces[0];
                    expect(myPiece.id).toEqual('1');
                    expect(myPiece.locationName).toEqual('London');
                    expect(myPiece.owningCountryName).toEqual('England');
                    expect(myPiece.turnId).toEqual('1');
                    expect(myPiece.type).toEqual(PieceTypes.Fleet);
                })
            })
        };
    })
})

it('deleting pieces', () => {

    expect.assertions(12);
    return myPieceWarehouse.getPieces(turnGame1Spring).then((springPieces) => {
        expect(springPieces).not.toBeNull();
        expect(springPieces.length).toEqual(1);
        // @ts-ignore
        return myPieceWarehouse.getPieces(turnGame1Fall).then((fallPieces) => {
            expect(fallPieces).not.toBeNull();
            expect(fallPieces.length).toEqual(0);
            let londonLocation = LocationWarehouse.locations.get('London' + LocationTypes.Piece);
            if (londonLocation) {
                return myPieceWarehouse.createPiece(game1, turnGame1Fall, 'London', 'England', 'FLEET').then((newPiece1) => {
                    expect(newPiece1).not.toBeNull();
                    // @ts-ignore
                    return myPieceWarehouse.createPiece(game1, turnGame1Fall, londonLocation, 'London', 'England', 'FLEET').then((newPiece2) => {
                        expect(newPiece2).not.toBeNull();
                        return myPieceWarehouse.getPieces(turnGame1Fall).then((fallPieces2) => {
                            expect(fallPieces2.length).toEqual(2);
                            return myPieceWarehouse.deletePieces(turnGame1Fall).then((werePiecesDeleted) => {
                                expect(werePiecesDeleted).toBeTruthy();
                                return myPieceWarehouse.getPieces(turnGame1Fall).then((fallPieces3) => {
                                    expect(fallPieces3).not.toBeNull();
                                    expect(fallPieces3.length).toEqual(0);
                                    return myPieceWarehouse.getPieces(turnGame1Spring).then((springPieces2) => {
                                        expect(springPieces2).not.toBeNull();
                                        expect(springPieces2.length).toEqual(1);
                                    });
                                });
                            });
                        });
                    });
                });
            };
        });
    });
})

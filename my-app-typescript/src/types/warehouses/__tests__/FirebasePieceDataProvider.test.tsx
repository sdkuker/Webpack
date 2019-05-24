import { FirebasePieceDataProvider } from '../piece/FirebasePieceDataProvider';
import { Piece } from '../piece/Piece';
import { Game } from '../game/Game';
import { Turn } from '../turn/Turn';
import { PieceTypes, SeasonTypes, TurnStatus } from '.././DomainTypes';
import { EnvironmentName } from '../PersistenceTypes';

it('create and retrieve a piece', () => {

    const game1Id = '1';
    const game1 = new Game(game1Id, 'test 1');
    const game1Turn1Id = '1-1';
    const game1Turn1 = new Turn(game1Turn1Id, game1Id, 1, SeasonTypes.Spring, TurnStatus.Open);

    expect.assertions(14);

    let myProvider = new FirebasePieceDataProvider(EnvironmentName.UnitTest);
    expect(myProvider).not.toBeNull();

    return myProvider.createPiece(game1, game1Turn1, 'Savannah', 'USA', PieceTypes.Army).then((newPiece) => {
        expect(newPiece).not.toBeNull();
        expect(newPiece.id).not.toBeNull();
        expect(newPiece.gameId).toEqual(game1Id);
        expect(newPiece.nameOfLocationAtBeginningOfTurn).toEqual('Savannah');
        expect(newPiece.owningCountryName).toEqual('USA');
        expect(newPiece.type).toEqual(PieceTypes.Army);
        // @ts-ignore
        return myProvider.getPiece(newPiece.id).then((retrivedNewPiece) => {
            expect(retrivedNewPiece).not.toBeNull();
            if (retrivedNewPiece) {
                expect(retrivedNewPiece.id).toEqual(newPiece.id);
                expect(retrivedNewPiece.gameId).toEqual(newPiece.gameId);
                expect(retrivedNewPiece.nameOfLocationAtBeginningOfTurn).toEqual(newPiece.nameOfLocationAtBeginningOfTurn);
                expect(retrivedNewPiece.owningCountryName).toEqual(newPiece.owningCountryName);
                expect(retrivedNewPiece.type).toEqual(newPiece.type);
                return myProvider.deletePiece(retrivedNewPiece).then((wasPieceDeleted) => {
                    expect(wasPieceDeleted).toBeTruthy();
                }).catch((error) => {
                    expect(error).toBeNull();
                })
            }
        }).catch((error) => {
            expect(error).toBeNull();
        });
    }).catch((error) => {
        expect(error).toBeNull();
    });
})

it('getting pieces for a turn', () => {

    const game1Id = '1';
    const game1 = new Game(game1Id, 'test 1');
    const game1Turn1Id = '1-1';
    const game1Turn1 = new Turn(game1Turn1Id, game1Id, 1, SeasonTypes.Spring, TurnStatus.Open);
    const game1Turn2Id = '1-2';
    const game1Turn2 = new Turn(game1Turn2Id, game1Id, 1, SeasonTypes.Spring, TurnStatus.Open);

    expect.assertions(10);

    let myProvider = new FirebasePieceDataProvider(EnvironmentName.UnitTest);
    expect(myProvider).not.toBeNull();

    return myProvider.createPiece(game1, game1Turn1, 'Savannah', 'USA', PieceTypes.Army).then((turn1Piece) => {
        expect(turn1Piece).not.toBeNull();
        return myProvider.createPiece(game1, game1Turn2, 'Tybee', 'Georgia', PieceTypes.Fleet).then((turn2Piece1) => {
            expect(turn2Piece1).not.toBeNull();
            return myProvider.createPiece(game1, game1Turn2, 'Stillwater', 'MN', PieceTypes.Fleet).then((turn2Piece2) => {
                expect(turn2Piece2).not.toBeNull();
                return myProvider.getPieces(game1Turn1).then((arrayOfPieces) => {
                    expect(arrayOfPieces).not.toBeNull();
                    expect(arrayOfPieces.length).toEqual(1);
                    expect(arrayOfPieces[0].id).toEqual(turn1Piece.id);
                    return myProvider.getPieces(game1Turn2).then((turn2ArrayOfPieces) => {
                        expect(turn2ArrayOfPieces).not.toBeNull();
                        expect(turn2ArrayOfPieces.length).toEqual(2);
                        const arrayOfPiecesToDelete = new Array<Piece>();
                        arrayOfPiecesToDelete.push(turn1Piece);
                        arrayOfPiecesToDelete.push(turn2Piece1);
                        arrayOfPiecesToDelete.push(turn2Piece2);
                        return myProvider.deletePieces(arrayOfPiecesToDelete).then((werePiecesDeleted) => {
                            expect(werePiecesDeleted).toBeTruthy();
                        }).catch((error) => {
                            expect(error).toBeNull();
                        })
                    }).catch((error) => {
                        expect(error).toBeNull();
                    })
                }).catch((error) => {
                    expect(error).toBeNull();
                })
            }).catch((error) => {
                expect(error).toBeNull();
            });
        }).catch((error) => {
            expect(error).toBeNull();
        });
    }).catch((error) => {
        expect(error).toBeNull();
    });
})
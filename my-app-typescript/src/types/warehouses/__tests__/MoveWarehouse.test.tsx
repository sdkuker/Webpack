import { Move } from '../move/Move';
import { Turn } from '.././turn/Turn';
import { Location } from '../location/Location';
import { PieceTypes, TurnPhase, SeasonTypes, TurnStatus } from '.././DomainTypes';
import { MoveWarehouse } from '../move/MoveWarehouse';
import { StaticMoveDataProvider } from '../move/StaticMoveDataProvider';
import { Piece } from '../piece/Piece';

let myGameId = '1';
let turn1SpringId = '1';
let turn1FallId = '2';
let turn1Spring = new Turn('1', '1', 1, SeasonTypes.Spring, TurnStatus.Complete, TurnPhase.Diplomatic);
let turn1Fall = new Turn('2', '1', 1, SeasonTypes.Fall, TurnStatus.Open, TurnPhase.Diplomatic);
let myMoveWarehouse: MoveWarehouse;
let myDataProvider: StaticMoveDataProvider;

beforeAll(() => {

    myDataProvider = new StaticMoveDataProvider();

    return myDataProvider.createMove('Fleet London movesTo North_Sea', 'England', turn1SpringId, myGameId).then((move1) => {
        return myDataProvider.createMove('Army Paris movesTo Picardy', 'France', turn1SpringId, myGameId).then((move2) => {
            return myDataProvider.createMove('Army Marseilles movesTo Gascony', 'France', turn1SpringId, myGameId).then((move3) => {
                return myDataProvider.createMove('Fleet Brest movesTo North_Atlantic_Ocean', 'France', turn1SpringId, myGameId).then((move4) => {
                    return myDataProvider.createMove('Fleet North_Sea movesTo Norway', 'England', turn1FallId, myGameId).then((move5) => {
                        return myDataProvider.createMove('Army Yorkshire movesTo Wales', 'England', turn1FallId, myGameId).then((move6) => {
                            return myDataProvider.createMove('Army Picardy movesTo Belguim', 'France', turn1FallId, myGameId).then((move7) => {
                                return myDataProvider.createMove('Army Gascony movesTo Spain_(sc)', 'France', turn1FallId, myGameId).then((move8) => {
                                    myMoveWarehouse = new MoveWarehouse(myDataProvider);
                                })
                            })
                        })
                    })
                })
            })
        })
    })
});

it('is the cache the same array as allMoves', () => {

    expect.assertions(6);

    return myMoveWarehouse.getMoves('England', turn1SpringId, myGameId, false).then((warehouseMovesSpring) => {
        let movesArray = myDataProvider.moves;
        // @ts-ignore
        let allMovesArrayYear1Spring = myDataProvider.allMoves.get('1').get('1');
        expect(warehouseMovesSpring.length).toEqual(1);
        expect(movesArray.length).toEqual(4);
        // @ts-ignore
        expect(allMovesArrayYear1Spring.length).toEqual(4);

        return myMoveWarehouse.getMoves('England', turn1FallId, myGameId, false).then((warehouseMovesFall) => {
            let movesArrayFall = myDataProvider.moves;
            // @ts-ignore
            let allMovesArrayYear1Fall = myDataProvider.allMoves.get('1').get('2');
            expect(warehouseMovesFall.length).toEqual(2);
            expect(movesArrayFall.length).toEqual(4);
            // @ts-ignore
            expect(allMovesArrayYear1Fall.length).toEqual(4);
        });
    });
})

it('Successfully get England 1-spring moves', () => {

    expect.assertions(6);

    return myMoveWarehouse.getMoves('England', turn1SpringId, myGameId, false).then((warehouseMoves) => {
        expect(warehouseMoves.length).toEqual(1);
        expect(warehouseMoves[0].id).toEqual('1');
        expect(warehouseMoves[0].order).toEqual('Fleet London movesTo North_Sea');
        expect(warehouseMoves[0].owningCountryName).toEqual('England');
        expect(warehouseMoves[0].turnId).toEqual('1');
        expect(warehouseMoves[0].gameId).toEqual('1');
    })

})

it('Successfully get England 1-fall moves', () => {

    expect.assertions(1);

    return myMoveWarehouse.getMoves('England', turn1FallId, myGameId, false).then((warehouseMoves) => {
        expect(warehouseMoves.length).toEqual(2);
    })

})

it('Successfully get France 1-spring moves', () => {

    expect.assertions(1);

    return myMoveWarehouse.getMoves('France', turn1SpringId, myGameId, false).then((warehouseMoves) => {
        expect(warehouseMoves.length).toEqual(3);
    })

})

it('Successfully get France 1-fall moves', () => {

    expect.assertions(1);

    return myMoveWarehouse.getMoves('France', turn1FallId, myGameId, false).then((warehouseMoves) => {
        expect(warehouseMoves.length).toEqual(2);
    })

})

it('Create initial moves for a turn', () => {

    expect.assertions(1);

    const location1 = new Location('myPlace', '1', '1');
    const piece1 = new Piece(null, '1', '1', 'England', 'London', null, false, PieceTypes.Army);
    const location2 = new Location('yourPlace', '2', '2');
    const piece2 = new Piece(null, '1', '1', 'France', 'Paris', null, false, PieceTypes.Fleet);
    const pieces = new Array<Piece>();
    pieces.push(piece1);
    pieces.push(piece2);

    return myMoveWarehouse.createInitialMoves(turn1SpringId, myGameId, pieces).then((initialMovesArray) => {
        expect(initialMovesArray.length).toEqual(2);
    })

})

it('Delete a single move from a turn and all the moves from a turn', () => {

    expect.assertions(22);

    let game3Id = '3';
    let turn1SpringId = '10';
    let turn1FallId = '11';

    let game4Id = '4';
    let turn1SpringGame2Id = '12';
    let turn1FallGame2Id = '13';

    const createMovesPromiseArray = Array<Promise<Move>>();

    createMovesPromiseArray.push(myMoveWarehouse.createMove('a move order', 'England', turn1SpringId, game3Id));
    createMovesPromiseArray.push(myMoveWarehouse.createMove('a move order', 'England', turn1SpringId, game3Id));
    createMovesPromiseArray.push(myMoveWarehouse.createMove('a move order', 'England', turn1FallId, game3Id));
    createMovesPromiseArray.push(myMoveWarehouse.createMove('a move order', 'England', turn1SpringGame2Id, game4Id));
    createMovesPromiseArray.push(myMoveWarehouse.createMove('a move order', 'England', turn1SpringGame2Id, game4Id));
    createMovesPromiseArray.push(myMoveWarehouse.createMove('a move order', 'England', turn1FallGame2Id, game4Id));

    return Promise.all(createMovesPromiseArray).then((arrayOfMovesCreated) => {
        expect(arrayOfMovesCreated).not.toBeNull();
        expect(arrayOfMovesCreated.length).toEqual(6);

        const getMovesPromiseArray = Array<Promise<Array<Move>>>();
        getMovesPromiseArray.push(myMoveWarehouse.getMoves('England', turn1SpringId, game3Id, null));
        getMovesPromiseArray.push(myMoveWarehouse.getMoves('England', turn1FallId, game3Id, null));
        getMovesPromiseArray.push(myMoveWarehouse.getMoves('England', turn1SpringGame2Id, game4Id, null));
        getMovesPromiseArray.push(myMoveWarehouse.getMoves('England', turn1FallGame2Id, game4Id, null));
        return Promise.all(getMovesPromiseArray).then((arrayOfGetMovesCalls) => {
            expect(arrayOfGetMovesCalls).not.toBeNull();
            expect(arrayOfGetMovesCalls.length).toEqual(4);
            expect(arrayOfGetMovesCalls[0].length).toEqual(2);
            expect(arrayOfGetMovesCalls[1].length).toEqual(1);
            expect(arrayOfGetMovesCalls[2].length).toEqual(2);
            expect(arrayOfGetMovesCalls[3].length).toEqual(1);
            return myMoveWarehouse.deleteMove(arrayOfMovesCreated[1]).then((wasMove2Deleted) => {
                expect(wasMove2Deleted).toBeTruthy();
                const getMovesPromiseArray2 = Array<Promise<Array<Move>>>();
                getMovesPromiseArray2.push(myMoveWarehouse.getMoves('England', turn1SpringId, game3Id, null));
                getMovesPromiseArray2.push(myMoveWarehouse.getMoves('England', turn1FallId, game3Id, null));
                getMovesPromiseArray2.push(myMoveWarehouse.getMoves('England', turn1SpringGame2Id, game4Id, null));
                getMovesPromiseArray2.push(myMoveWarehouse.getMoves('England', turn1FallGame2Id, game4Id, null));
                return Promise.all(getMovesPromiseArray2).then((arrayOfGetMovesCalls2) => {
                    expect(arrayOfGetMovesCalls2).not.toBeNull();
                    expect(arrayOfGetMovesCalls2.length).toEqual(4);
                    expect(arrayOfGetMovesCalls2[0].length).toEqual(1);
                    expect(arrayOfGetMovesCalls2[1].length).toEqual(1);
                    expect(arrayOfGetMovesCalls2[2].length).toEqual(2);
                    expect(arrayOfGetMovesCalls2[3].length).toEqual(1);
                    return myMoveWarehouse.deleteMoves(turn1SpringGame2Id, game4Id).then((allMovesDeleted) => {
                        expect(allMovesDeleted).toBeTruthy();
                        const getMovesPromiseArray3 = Array<Promise<Array<Move>>>();
                        getMovesPromiseArray3.push(myMoveWarehouse.getMoves('England', turn1SpringId, game3Id, null));
                        getMovesPromiseArray3.push(myMoveWarehouse.getMoves('England', turn1FallId, game3Id, null));
                        getMovesPromiseArray3.push(myMoveWarehouse.getMoves('England', turn1SpringGame2Id, game4Id, null));
                        getMovesPromiseArray3.push(myMoveWarehouse.getMoves('England', turn1FallGame2Id, game4Id, null));
                        return Promise.all(getMovesPromiseArray3).then((arrayOfGetMovesCalls3) => {
                            expect(arrayOfGetMovesCalls3).not.toBeNull();
                            expect(arrayOfGetMovesCalls3.length).toEqual(4);
                            expect(arrayOfGetMovesCalls3[0].length).toEqual(1);
                            expect(arrayOfGetMovesCalls3[1].length).toEqual(1);
                            expect(arrayOfGetMovesCalls3[2].length).toEqual(0);
                            expect(arrayOfGetMovesCalls3[3].length).toEqual(1);
                        });
                    });
                });
            });
        });
    });
});


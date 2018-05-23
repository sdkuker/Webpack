import { Move } from '.././Move';
import { Turn } from '.././Turn';
import { Game } from '.././Game';
import { PieceTypes, MoveAction, SeasonTypes, TurnStatus } from '.././DomainTypes';
import { warehouse as MoveWarehouse } from '.././MoveWarehouse';

beforeAll(() => {

    const myMoves = Array<Move>();

    myMoves.push(new Move(1, 'Fleet London movesTo North_Sea', 'England', 1, SeasonTypes.Spring));

    myMoves.push(new Move(2, 'Army Paris movesTo Picardy', 'France', 1, SeasonTypes.Spring));
    myMoves.push(new Move(3, 'Army Marseilles movesTo Gascony', 'France', 1, SeasonTypes.Spring));
    myMoves.push(new Move(4, 'Fleet Brest movesTo North_Atlantic_Ocean', 'France', 1, SeasonTypes.Spring));

    myMoves.push(new Move(5, 'Fleet North_Sea movesTo Norway', 'England', 1, SeasonTypes.Fall));
    myMoves.push(new Move(6, 'Army Yorkshire movesTo Wales', 'England', 1, SeasonTypes.Fall));

    myMoves.push(new Move(7, 'Army Picardy movesTo Belguim', 'France', 1, SeasonTypes.Fall));
    myMoves.push(new Move(8, 'Army Gascony movesTo Spain_(sc)', 'France', 1, SeasonTypes.Fall));


    MoveWarehouse.setMoves(myMoves);

});

it('setting test moves in the beforeAll', () => {
    expect(MoveWarehouse.getAllMoves().length).toEqual(8);
})

it('Successfully get England 1-spring moves', () => {
    const aGame = new Game('test');
    const theReturn = MoveWarehouse.getMoves('England', new Turn(aGame, 1, SeasonTypes.Spring, TurnStatus.Open));
    expect(theReturn.length).toEqual(1);
    expect(theReturn[0].id).toEqual(1);
    expect(theReturn[0].order).toEqual('Fleet London movesTo North_Sea');
    expect(theReturn[0].owningCountryName).toEqual('England');
    expect(theReturn[0].turnYear).toEqual(1);
    expect(theReturn[0].turnSeason).toEqual(SeasonTypes.Spring);
})

it('Successfully get England 1-fall moves', () => {
    const aGame = new Game('test');
    const theReturn = MoveWarehouse.getMoves('England', new Turn(aGame, 1, SeasonTypes.Fall, TurnStatus.Open));
    expect(theReturn.length).toEqual(2);
})

it('Successfully get France 1-spring moves', () => {
    const aGame = new Game('test');
    const theReturn = MoveWarehouse.getMoves('France', new Turn(aGame, 1, SeasonTypes.Spring, TurnStatus.Open));
    expect(theReturn.length).toEqual(3);
})

it('Successfully get France 1-fall moves', () => {
    const aGame = new Game('test');
    const theReturn = MoveWarehouse.getMoves('France', new Turn(aGame, 1, SeasonTypes.Fall, TurnStatus.Open));
    expect(theReturn.length).toEqual(2);
})

it('Return null if there is no turn', () => {
    const aGame = new Game('test');
    const theReturn = MoveWarehouse.getMoves('France', null);
    expect(theReturn.length).toEqual(0);
})





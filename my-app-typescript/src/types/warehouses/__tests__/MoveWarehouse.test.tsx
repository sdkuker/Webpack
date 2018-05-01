import { Move } from '.././Move';
import { Turn } from '.././Turn';
import { PieceTypes, MoveAction, SeasonTypes, TurnStatus } from '.././DomainTypes';
import { warehouse as MoveWarehouse } from '.././MoveWarehouse';

beforeAll(() => {

    const myMoves = Array<Move>();

    myMoves.push(new Move('Fleet London movesTo North_Sea', 'England', 1, SeasonTypes.Spring));

    myMoves.push(new Move('Army Paris movesTo Picardy', 'France', 1, SeasonTypes.Spring));
    myMoves.push(new Move('Army Marseilles movesTo Gascony', 'France', 1, SeasonTypes.Spring));
    myMoves.push(new Move('Fleet Brest movesTo North_Atlantic_Ocean', 'France', 1, SeasonTypes.Spring));

    myMoves.push(new Move('Fleet North_Sea movesTo Norway', 'England', 1, SeasonTypes.Fall));
    myMoves.push(new Move('Army Yorkshire movesTo Wales', 'England', 1, SeasonTypes.Fall));

    myMoves.push(new Move('Army Picardy movesTo Belguim', 'France', 1, SeasonTypes.Fall));
    myMoves.push(new Move('Army Gascony movesTo Spain_(sc)', 'France', 1, SeasonTypes.Fall));


    MoveWarehouse.setMoves(myMoves);

});

it('setting test moves in the beforeAll', () => {
    expect(MoveWarehouse.getAllMoves().length).toEqual(8);
})

it('Successfully get England 1-spring moves', () => {
    const theReturn = MoveWarehouse.getMoves('England', new Turn(1, SeasonTypes.Spring, TurnStatus.Open));
    expect(theReturn.length).toEqual(1);
    expect(theReturn[0].order).toEqual('Fleet London movesTo North_Sea');
    expect(theReturn[0].owningCountryName).toEqual('England');
    expect(theReturn[0].turnYear).toEqual(1);
    expect(theReturn[0].turnSeason).toEqual(SeasonTypes.Spring);
})

it('Successfully get England 1-fall moves', () => {
    const theReturn = MoveWarehouse.getMoves('England', new Turn(1, SeasonTypes.Fall, TurnStatus.Open));
    expect(theReturn.length).toEqual(2);
})

it('Successfully get France 1-spring moves', () => {
    const theReturn = MoveWarehouse.getMoves('France', new Turn(1, SeasonTypes.Spring, TurnStatus.Open));
    expect(theReturn.length).toEqual(3);
})

it('Successfully get France 1-fall moves', () => {
    const theReturn = MoveWarehouse.getMoves('France', new Turn(1, SeasonTypes.Fall, TurnStatus.Open));
    expect(theReturn.length).toEqual(2);
})





import { Turn } from '../../types/warehouses/Turn';
import { Game } from '../../types/warehouses/Game';
import { ITurnWarehouse } from '../../types/warehouses/ITurnWarehouse';
import { SeasonTypes, TurnStatus } from '../../types/warehouses/DomainTypes';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import SeasonSelector from '../SeasonSelector';

enzyme.configure({adapter: new Adapter()});
const myGame = new Game('1', 'test');

it('Get Open Season', () => {
    const completeTurn = new Turn('1', myGame, 1, SeasonTypes.Spring, TurnStatus.Complete);
    const openTurn = new Turn('2', myGame, 1, SeasonTypes.Fall, TurnStatus.Open);

    const onTurnsSelectedMock = jest.fn(); 
    const getTurnMock = jest.fn();
    const getTurnsMock = jest.fn();
    const getOpenTurnMock = jest.fn();
    const generateNextTurnMock = jest.fn();
    const deleteTurnMock = jest.fn();
    getTurnsMock.mockReturnValueOnce([completeTurn,openTurn]);

    const turnWarehouse: ITurnWarehouse = { getTurns: getTurnsMock, getTurn: getTurnMock, 
                                            getOpenTurn: getOpenTurnMock, 
                                            generateNextTurn: generateNextTurnMock,
                                            deleteTurn: deleteTurnMock};

    const wrapper1 = enzyme.shallow(<SeasonSelector 
                                        onTurnSelected={onTurnsSelectedMock} 
                                        myGame={myGame} 
                                        initialTurn={openTurn}
                                        myTurnWarehouse={turnWarehouse}
                                         />);
    // year tests
    expect(wrapper1.find('#yearSelector')).toHaveLength(1);
    expect(wrapper1.find('select [selected]').at(0).html().includes('1')).toBeTruthy();

    // season tests
    expect(wrapper1.find('[id="seasonSelector"]')).toHaveLength(1);
    expect(wrapper1.find('select [selected]').at(1).html().includes('Fall')).toBeTruthy();

})

it('Get Complete Season', () => {
    const completeTurn = new Turn('1', myGame, 1, SeasonTypes.Spring, TurnStatus.Complete);
    const openTurn = new Turn('2', myGame, 1, SeasonTypes.Fall, TurnStatus.Open);
    const arrayOfTurns = [completeTurn];

    const onTurnsSelectedMock = jest.fn(); 
    const getTurnMock = jest.fn();
    const getTurnsMock = jest.fn();
    getTurnsMock.mockReturnValueOnce(arrayOfTurns);
    const getOpenTurnMock = jest.fn();
    const generateNextTurnMock = jest.fn();
    const deleteTurnMock = jest.fn();

    const turnWarehouse: ITurnWarehouse = { getTurns: getTurnsMock, getTurn: getTurnMock, 
                                            getOpenTurn: getOpenTurnMock, 
                                            generateNextTurn: generateNextTurnMock,
                                            deleteTurn: deleteTurnMock};

    const wrapper1 = enzyme.shallow(<SeasonSelector 
                                        onTurnSelected={onTurnsSelectedMock} 
                                        myGame={myGame} 
                                        initialTurn={completeTurn}
                                        myTurnWarehouse={turnWarehouse}
                                         />);
    // year tests
    //console.log(wrapper1.debug());
    expect(wrapper1.find('[id="yearSelector"]')).toHaveLength(1);
    expect(wrapper1.find('select [selected]').at(0).html().includes('1')).toBeTruthy();

    // season tests
    expect(wrapper1.find('[id="seasonSelector"]')).toHaveLength(1);
    expect(wrapper1.find('select [selected]').at(1).html().includes('Spring')).toBeTruthy();
})







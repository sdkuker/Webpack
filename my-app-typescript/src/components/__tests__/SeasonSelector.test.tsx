import { Turn } from '../../types/warehouses/turn/Turn';
import { Game } from '../../types/warehouses/game/Game';
import { ITurnWarehouse } from '../../types/warehouses/turn/ITurnWarehouse';
import { SeasonTypes, TurnStatus, TurnPhase } from '../../types/warehouses/DomainTypes';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import SeasonSelectorComponent from '../SeasonSelectorComponent';

enzyme.configure({adapter: new Adapter()});
const myGame = new Game('1', 'test');

it('Get Open Season', async () => {
    const completeTurn = new Turn('1', '1', 1, SeasonTypes.Spring, TurnStatus.Complete, TurnPhase.GainingAndLosingUnits);
    const openTurn = new Turn('2', '1', 1, SeasonTypes.Fall, TurnStatus.Open, TurnPhase.Diplomatic);

    const onTurnsSelectedMock = jest.fn(); 
    const onTurnPhaseSelectedMock = jest.fn(); 
    const getTurnMock = jest.fn();
    const getOpenTurnMock = jest.fn();
    const generateNextTurnMock = jest.fn();
    const generateNextPhaseMock = jest.fn();
    const deleteTurnMock = jest.fn();
    const getTurnsMock = jest.fn( () => Promise.resolve([completeTurn,openTurn]));

    const turnWarehouse: ITurnWarehouse = { getTurns: getTurnsMock, getTurn: getTurnMock, 
                                            getOpenTurn: getOpenTurnMock, 
                                            generateNextTurn: generateNextTurnMock,
                                            generateNextPhase: generateNextPhaseMock,
                                            deleteTurn: deleteTurnMock,
                                            openTurn: openTurn};

    const wrapper1 = await enzyme.mount(<SeasonSelectorComponent 
                                        onTurnSelected={onTurnsSelectedMock} 
                                        onTurnPhaseSelected={onTurnPhaseSelectedMock}
                                        myGame={myGame} 
                                        initialTurn={openTurn}
                                        myTurnWarehouse={turnWarehouse}
                                         />);
    wrapper1.update();

    // @ts-ignore
    //await wrapper1.instance().componentDidMount();
    //await wrapper1.instance();

    // console.log(wrapper1.debug());
    // year tests
    expect(wrapper1.find('#yearSelector')).toHaveLength(1);
    expect(wrapper1.find('select [selected]').at(0).html().includes('1')).toBeTruthy();

    // season tests
    expect(wrapper1.find('[id="seasonSelector"]')).toHaveLength(1);
    expect(wrapper1.find('select [selected]').at(1).html().includes('Fall')).toBeTruthy();

})

it('Get Complete Season', async () => {
    const completeTurn = new Turn('1', '1', 1, SeasonTypes.Spring, TurnStatus.Complete, TurnPhase.GainingAndLosingUnits);
    const openTurn = new Turn('2', '1', 1, SeasonTypes.Fall, TurnStatus.Open, TurnPhase.Diplomatic);
    const arrayOfTurns = [completeTurn];

    const onTurnsSelectedMock = jest.fn(); 
    const onTurnPhaseSelectedMock = jest.fn(); 
    const getTurnMock = jest.fn();
    const getTurnsMock = jest.fn( () => Promise.resolve(arrayOfTurns));
    const getOpenTurnMock = jest.fn();
    const generateNextTurnMock = jest.fn();
    const generateNextPhaseMock = jest.fn();
    const deleteTurnMock = jest.fn();

    const turnWarehouse: ITurnWarehouse = { getTurns: getTurnsMock, getTurn: getTurnMock, 
                                            getOpenTurn: getOpenTurnMock, 
                                            generateNextTurn: generateNextTurnMock,
                                            generateNextPhase: generateNextPhaseMock,
                                            deleteTurn: deleteTurnMock,
                                            openTurn: openTurn};

    const wrapper1 = await enzyme.mount(<SeasonSelectorComponent 
                                        onTurnSelected={onTurnsSelectedMock} 
                                        onTurnPhaseSelected={onTurnPhaseSelectedMock}
                                        myGame={myGame} 
                                        initialTurn={completeTurn}
                                        myTurnWarehouse={turnWarehouse}
                                         />);
    wrapper1.update();
    // year tests
    //console.log(wrapper1.debug());
    expect(wrapper1.find('[id="yearSelector"]')).toHaveLength(1);
    expect(wrapper1.find('select [selected]').at(0).html().includes('1')).toBeTruthy();

    // season tests
    expect(wrapper1.find('[id="seasonSelector"]')).toHaveLength(1);
    expect(wrapper1.find('select [selected]').at(1).html().includes('Spring')).toBeTruthy();
})







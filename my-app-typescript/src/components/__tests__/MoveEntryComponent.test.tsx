import { Move } from '../../types/warehouses/Move';
import { Turn } from '../../types/warehouses/Turn';
import { Game } from '../../types/warehouses/Game';
import { SeasonTypes, TurnStatus } from '../../types/warehouses/DomainTypes';
import { IMoveWarehouse } from '../../types/warehouses/IMoveWarehouse';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import MoveEntryComponent from '../MoveEntryComponent';

enzyme.configure({adapter: new Adapter()});

const myGame = new Game('1', 'test');
const myTurn = new Turn('1', myGame, 1, SeasonTypes.Spring, TurnStatus.Open);
const myMove = new Move(1, "my order", "England", myTurn);
const onMoveEntryValidationdMock = jest.fn(); 
const persistMoveMock = jest.fn(); 
const deleteMoveMock = jest.fn();
const getMovesMock = jest.fn();
const moveWarehouseMock: IMoveWarehouse = {persistMove : persistMoveMock, deleteMove : deleteMoveMock, getMoves : getMovesMock};
const onMovePersistedMock = jest.fn();

it('not sure what Im testing yet', () => {
    const wrapper1 = enzyme.shallow(<MoveEntryComponent onMoveEntryValidation={onMoveEntryValidationdMock} 
                                                        game={myGame}
                                                        move={myMove} 
                                                        moveWarehouse={moveWarehouseMock} 
                                                        onMovePersisted={onMovePersistedMock}/>);
    expect(wrapper1.find('textarea')).toHaveLength(1);
})







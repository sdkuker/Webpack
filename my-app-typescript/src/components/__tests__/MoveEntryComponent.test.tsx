import { Move } from '../../types/warehouses/Move';
import { Game } from '../../types/warehouses/Game';
import { IMoveWarehouse } from '../../types/warehouses/IMoveWarehouse';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import MoveEntryComponent from '../MoveEntryComponent';

enzyme.configure({adapter: new Adapter()});

const myGameId = '1';
const myTurnId = '1';
const myGame = new Game(myGameId, 'test');
const myMove = new Move('1', "my order", "England", myTurnId, myGameId);
const onMoveEntryValidationdMock = jest.fn(); 
const persistMoveMock = jest.fn(); 
const deleteMoveMock = jest.fn();
const deleteMovesMock = jest.fn();
const getMovesMock = jest.fn();
const createInitialMovesMock = jest.fn();
const moveWarehouseMock: IMoveWarehouse = 
    {persistMove : persistMoveMock, deleteMove : deleteMoveMock, deleteMoves: deleteMovesMock, getMoves : getMovesMock, createInitialMoves: createInitialMovesMock};
const onMovePersistedMock = jest.fn();

it('not sure what Im testing yet', () => {
    const wrapper1 = enzyme.shallow(<MoveEntryComponent onMoveEntryValidation={onMoveEntryValidationdMock} 
                                                        game={myGame}
                                                        move={myMove} 
                                                        moveWarehouse={moveWarehouseMock} 
                                                        onMovePersisted={onMovePersistedMock}/>);
    expect(wrapper1.find('textarea')).toHaveLength(1);
})







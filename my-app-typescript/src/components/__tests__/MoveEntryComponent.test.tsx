import { Move } from '../../types/warehouses/Move';
import { Turn } from '../../types/warehouses/Turn';
import { Game } from '../../types/warehouses/Game';
import { SeasonTypes, TurnStatus } from '../../types/warehouses/DomainTypes';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import MoveEntryComponent from '../MoveEntryComponent';

enzyme.configure({adapter: new Adapter()});

const myGame = new Game('test');
const myTurn = new Turn(myGame, 1, SeasonTypes.Spring, TurnStatus.Open);
const myMove = new Move(1, "my order", "England", myTurn);
const onMoveEntryValidationdMock = jest.fn(); 

it('not sure what Im testing yet', () => {
    const wrapper1 = enzyme.shallow(<MoveEntryComponent onMoveEntryValidation={onMoveEntryValidationdMock} move={myMove} />);
    expect(wrapper1.find('textarea')).toHaveLength(1);
})







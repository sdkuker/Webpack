import { Turn } from '../../types/warehouses/Turn';
import { Game } from '../../types/warehouses/Game';
import { SeasonTypes, TurnStatus } from '../../types/warehouses/DomainTypes';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import SeasonSelector from '../SeasonSelector';

enzyme.configure({adapter: new Adapter()});
const myGame = new Game('test');

// it('Turn has spring season', () => {
//     const openTurn = new Turn(myGame, 1, SeasonTypes.Spring, TurnStatus.Open);
//     const wrapper1 = enzyme.shallow(<MovesForCountryComponent myTurn={openTurn} />);
//     expect(wrapper1.find('table'))
// })







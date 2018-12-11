import { Turn } from '../../types/warehouses/Turn';
import { Game } from '../../types/warehouses/Game';
import { SeasonTypes, TurnStatus } from '../../types/warehouses/DomainTypes';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import MovesForCountryComponent from '../MovesForCountryComponent';
import { MoveWarehouse } from '../../types/warehouses/MoveWarehouse';
import { StaticMoveDataProvider } from '../../types/warehouses/StaticMoveDataProvider'
import { GameWarehouse } from '../../types/warehouses/GameWarehouse';
import { StaticGameDataProvider } from '../../types/warehouses/StaticGameDataProvider'
import { StaticTurnDataProvider } from '../../types/warehouses/StaticTurnDataProvider'

enzyme.configure({ adapter: new Adapter() });

const myGameDataProvider = new StaticGameDataProvider(null);
const myGameWarehouse = new GameWarehouse(myGameDataProvider);
const gameWarehouseGame = myGameWarehouse.getGameByName('Diplomacy - Greatest Ever');
let myGame: Game;
if (gameWarehouseGame) {
    myGame = gameWarehouseGame;
} else {
    myGame = new Game('1', 'Steve');
}
const myTurnDataProvider = new StaticTurnDataProvider(null, null);
const myMoveDataProvider = new StaticMoveDataProvider();
const myMoveWarehouse = new MoveWarehouse(myMoveDataProvider);

it('open turn has MovesEntryListComponent', () => {
    const openTurn = new Turn('1', myGame.id, 1, SeasonTypes.Spring, TurnStatus.Open);
    const wrapper1 = enzyme.shallow(<MovesForCountryComponent moveWarehouse={myMoveWarehouse} myGame={myGame} myTurn={openTurn} />);
    expect(wrapper1.find('table'))
})







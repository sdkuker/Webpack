import { Turn } from '../../types/warehouses/turn/Turn';
import { Game } from '../../types/warehouses/game/Game';
import { Piece } from '../../types/warehouses/piece/Piece';
import { SeasonTypes, TurnStatus, TurnPhase } from '../../types/warehouses/DomainTypes';
import { EnvironmentName } from '../../types/warehouses/PersistenceTypes';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import MovesForCountryComponent from '../MovesForCountryComponent';
import { MoveWarehouse } from '../../types/warehouses/move/MoveWarehouse';
import { StaticMoveDataProvider } from '../../types/warehouses/move/StaticMoveDataProvider';
import { StandoffProvince } from '../../types/warehouses/standoffProvince/StandoffProvince';

enzyme.configure({ adapter: new Adapter() });

let myGame = new Game('1', 'Steve');
const myMoveDataProvider = new StaticMoveDataProvider();
const myMoveWarehouse = new MoveWarehouse(myMoveDataProvider);
const myPieces = new Array<Piece>();
const myStandoffProvinces = new Array<StandoffProvince>();

it('open turn has MovesEntryListComponent', () => {
    const openTurn = new Turn('1', myGame.id, 1, SeasonTypes.Spring, TurnStatus.Open, TurnPhase.Diplomatic);
    const wrapper1 = enzyme.shallow(<MovesForCountryComponent moveWarehouse={myMoveWarehouse}
        standoffProvinces={myStandoffProvinces}
        myGame={myGame} myTurn={openTurn}
        myTurnPhase={TurnPhase.GainingAndLosingUnits}
        myPieces={myPieces} />);
    expect(wrapper1.find('table'))
})







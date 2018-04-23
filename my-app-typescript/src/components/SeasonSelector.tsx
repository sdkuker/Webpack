import * as React from 'react';
import { warehouse as TurnWarehouse } from '../types/warehouses/TurnWarehouse';
import { SeasonTypes } from '../types/warehouses/DomainTypes';
import SeasonSelectorOptions from './SeasonSelectorOptions';

class SeasonSelector extends React.Component {
    render() {
        return (
            <form className="form-inline row">
                <div className="col-md-2">
                    <div className="form-group">
                        <label htmlFor="yearSelector"><b>Year:</b></label>
                        <select className="form-control" id="yearSelector">
                            <option>1</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group">
                        <label htmlFor="seasonSelector"><b>Season:</b> </label>
                        <select className="form-control" id="seasonSelector">
                            <SeasonSelectorOptions />
                        </select>
                    </div>
                </div>
            </form>
        );
    }
}

export default SeasonSelector;
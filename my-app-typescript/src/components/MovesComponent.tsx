import * as React from 'react';
import MoveCountrySelector  from './MoveCountrySelector';

class MovesComponent extends React.Component<{}, {}> {
    constructor() {
        super({});
        this.countrySelected = this.countrySelected.bind(this);
    }
    render() {
        return (
            <div className="container">
                <MoveCountrySelector onCountrySelected={this.countrySelected}/>
                <div className="row">
                    <div className="col-md-2">
                        <p>Fleet</p>
                    </div>
                    <div className="col-md-3">
                        <p>London</p>
                    </div>
                    <div className="col-md-2">
                        <p>moves to</p>
                    </div>
                    <div className="col-md-3">
                        <p>English Channel</p>
                    </div>
                </div>
            </div>
        );
    }

    countrySelected(countryName: string) {
        this.setState({ countryToDisplay: countryName });
    }

}

export default MovesComponent;
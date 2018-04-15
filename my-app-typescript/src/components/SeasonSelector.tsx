import * as React from 'react';

class SeasonSelector extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <p><b>Year:</b></p>
                </div>
                <div className="col-md-2">
                    <p>1</p>
                </div>
                <div className="col-md-2">
                    <p><b>Season:</b></p>
                </div>
                <div className="col-md-4">
                    <p>Fall</p>
                </div>
            </div>
        );
    }
}

export default SeasonSelector;
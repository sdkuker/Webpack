import * as React from 'react';

class MoveSelector extends React.Component {
    render() {
        return (
            <div className="container">
                <h2>Moves</h2>
                <div className="row">
                    <div className="col-md-2">
                        <p><b>Country:</b></p>
                    </div>
                    <div className="col-md-10">
                        <p>Germany</p>
                    </div>
                </div>
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
}

export default MoveSelector;
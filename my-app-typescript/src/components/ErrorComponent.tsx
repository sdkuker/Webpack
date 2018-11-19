import * as React from 'react';

class ErrorComponent extends React.Component {

    constructor() {
        super({});
    }
    render() {
        return (
            <div className="row">
                <h2>An Error Has Happened.  Darn.  Call Steve...</h2>
            </div>
        );
    }
}

export default ErrorComponent;
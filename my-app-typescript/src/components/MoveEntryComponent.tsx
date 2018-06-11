import * as React from 'react';
import { Move } from '../types/warehouses/Move';

interface PropValues {
    move: Move;
}
class MoveEntryComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
        this.moveChanged = this.moveChanged.bind(this);
        this.verifyButtonClicked = this.verifyButtonClicked.bind(this);
    }
    render() {
        return (
            <tr>
                <td>
                    <textarea 
                            className="form-control" 
                            rows={1} 
                            id="usr" 
                            onChange={this.moveChanged}
                    >{this.props.move.order}
                    </textarea></td>
                <td> 
                    <button onClick={this.verifyButtonClicked}>Verify</button> </td>
            </tr>
        );
    }

    moveChanged() {
        // this.setState({ countryToDisplay: countryName });
    }

    verifyButtonClicked() {
        console.log('here I am');
    }

}

export default MoveEntryComponent;
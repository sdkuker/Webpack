import * as React from 'react';
import { Move } from '../types/warehouses/Move';

interface PropValues {
    onMoveEntryValidation: Function;
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
                        onBlur={this.moveChanged}
                        defaultValue={this.props.move.order}
                    />
                </td>
                <td>
                    <button onClick={this.verifyButtonClicked}>Verify</button> 
                </td>
            </tr>
        );
    }

    moveChanged(event: React.FormEvent<HTMLTextAreaElement>) {
        this.props.move.updateOrder(event.currentTarget.value);
    }

    verifyButtonClicked() {
        const myResults = this.props.move.isValidMove();
        this.props.onMoveEntryValidation(myResults);
    }

}

export default MoveEntryComponent;
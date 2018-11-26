import * as React from 'react';
import { observer } from 'mobx-react';
import { Move } from '../types/warehouses/Move';
import { Game } from '../types/warehouses/Game';
import { IMoveWarehouse } from '../types/warehouses/IMoveWarehouse';

interface PropValues {
    onMoveEntryValidation: Function;
    game: Game;
    move: Move;
    moveWarehouse: IMoveWarehouse;
    onMovePersisted: Function;
}
@observer
class MoveEntryComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
        this.moveChanged = this.moveChanged.bind(this);
        this.verifyButtonClicked = this.verifyButtonClicked.bind(this);
        this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
    }
    render() {
        return (
            <tr className="d-flex">
                <td className="col-sm-10">
                    <textarea
                        className="form-control"
                        rows={1}
                        // id="usr"
                        onBlur={this.moveChanged}
                    >
                        {this.props.move.order}
                    </textarea>
                </td>
                <td className="col-sm-1">
                    <button onClick={this.verifyButtonClicked}>Verify</button> 
                </td>
                <td className="col-sm-1">
                    <button onClick={this.deleteButtonClicked}>Delete</button> 
                </td>

            </tr>
        );
    }

    moveChanged(event: React.FormEvent<HTMLTextAreaElement>) {
        this.props.move.updateOrder(event.currentTarget.value);
        this.props.moveWarehouse.persistMove(this.props.game, this.props.move);
        this.props.onMovePersisted();
    }

    verifyButtonClicked() {
        const myResults = this.props.move.isValidMove();
        this.props.onMoveEntryValidation(myResults);
    }

    deleteButtonClicked() {
        this.props.moveWarehouse.deleteMove(this.props.game, this.props.move);
        this.props.onMovePersisted();
    }
}

export default MoveEntryComponent;
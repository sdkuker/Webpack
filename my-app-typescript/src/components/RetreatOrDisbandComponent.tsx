import * as React from 'react';
import { observer } from 'mobx-react';
import { Move } from '../types/warehouses/move/Move';
import { MoveResults } from '../types/warehouses/move/MoveResults';

interface PropValues {
    moves: Move[];
    moveResults: Map<string, MoveResults>;
}

@observer
class RetreatOrDisbandComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
    }
    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        this.props.moves.forEach((aMove: Move) => {
            let myMoveResults = this.props.moveResults.get(aMove.id);
            let wasSuccessful = 'false';
            let myDescription = '';

            if (myMoveResults) {
                wasSuccessful = myMoveResults.moveExecutedSuccessfully.toString();
                myDescription = myMoveResults.executionDescription;
            }

            theReturn.push((
                <tr>
                    <td>{aMove.order}</td>
                    <td>{wasSuccessful}</td>
                    <td>{myDescription}</td>
                </tr>));
        });

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Move</th>
                        <th>Successful</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {theReturn}
                </tbody>
            </table>
        );
    }
}

export default RetreatOrDisbandComponent;
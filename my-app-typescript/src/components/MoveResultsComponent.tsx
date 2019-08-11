import * as React from 'react';
import { observer } from 'mobx-react';
import { Piece } from '../types/warehouses/piece/Piece';
import { Move } from '../types/warehouses/move/Move';
import { MoveResults } from '../types/warehouses/move/MoveResults';

interface PropValues {
    moves: Move[];
    moveResults: Map<string, MoveResults>;
    piecesToRetreatOrDisband: Array<Piece>;
}

@observer
class MoveResultsComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
    }
    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        this.props.moves.forEach((aMove: Move) => {
            let myMoveResults = this.props.moveResults.get(aMove.id);
            let myDescription = '';

            if (myMoveResults) {
                myDescription = myMoveResults.executionDescription;
            }

            theReturn.push((
                <tr>
                    <td>{aMove.order}</td>
                    <td>{myDescription}</td>
                </tr>));
        });

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Move</th>
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

export default MoveResultsComponent;
import * as React from 'react';
import { observer } from 'mobx-react';
import { Move } from '../types/warehouses/move/Move';

interface PropValues {
    moves: Move[];
}

@observer
class MovesListComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
    }
    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        this.props.moves.forEach((value: Move) => {
            theReturn.push((
                        <li className="list-group-item">{value.order}
                        </li>));
        });

        return (
            <ul className="list-group-item">
                {theReturn}
            </ul>
        );
    }
}

export default MovesListComponent;
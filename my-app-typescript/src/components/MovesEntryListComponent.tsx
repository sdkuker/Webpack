import * as React from 'react';
import { Move } from '../types/warehouses/Move';

interface PropValues {
    moves: Move[];
}
class MovesEntryComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
        this.moveSelected = this.moveSelected.bind(this);
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

    moveSelected(countryName: string) {
        this.setState({ countryToDisplay: countryName });
    }

}

export default MovesEntryComponent;
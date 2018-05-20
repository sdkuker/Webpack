import * as React from 'react';
import { Move } from '../types/warehouses/Move';

interface PropValues {
    moves: Move[];
}
class MovesListComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
        this.countrySelected = this.countrySelected.bind(this);
    }
    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        this.props.moves.forEach((value: Move) => {
            theReturn.push(<li className="list-group-item">{value.order}</li>);
        });

        return (
            <ul className="list-group-item">
                {theReturn}
            </ul>
        );
    }

    countrySelected(countryName: string) {
        this.setState({ countryToDisplay: countryName });
    }

}

export default MovesListComponent;
import * as React from 'react';
import MoveEntryComponent from './MoveEntryComponent';
import { Move } from '../types/warehouses/Move';

interface PropValues {
    moves: Move[];
}
class MovesEntryListComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
        this.moveSelected = this.moveSelected.bind(this);
    }
    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        this.props.moves.forEach((value: Move) => {
            theReturn.push( <MoveEntryComponent key={value.id} move={value} />);
        });

        return (
            <table className="table">
                {theReturn}
            </table>
        );
    }

    moveSelected(countryName: string) {
        this.setState({ countryToDisplay: countryName });
    }

}

export default MovesEntryListComponent;
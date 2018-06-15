import * as React from 'react';
import MoveEntryComponent from './MoveEntryComponent';
import { Move } from '../types/warehouses/Move';
import { Turn } from '../types/warehouses/Turn';

interface PropValues {
    countryName: string;
    turn: Turn;
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

        // add components for the existing moves
        this.props.moves.forEach((aMove: Move) => {
            theReturn.push( <MoveEntryComponent key={aMove.id} move={aMove} />);
        });

        // add one more component for a new move to be entered
        const newEntryMove = new Move(999999, 'New Order', this.props.countryName, this.props.turn);
        theReturn.push(<MoveEntryComponent key={999999} move={newEntryMove} />);

        return (
            <table className="table">
                <tbody>
                    {theReturn}
                </tbody>
            </table>
        );
    }

    moveSelected(countryName: string) {
        this.setState({ countryToDisplay: countryName });
    }

}

export default MovesEntryListComponent;
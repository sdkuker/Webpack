import * as React from 'react';
import { Move } from '../types/warehouses/Move';

interface PropValues {
    move: Move;
}
class MoveComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
        //this.countrySelected = this.countrySelected.bind(this);
    }
    render() {

        return (
            <li>
                {this.props.move.order};
            </li>
        );
    }

    // countrySelected(countryName: string) {
    //     this.setState({ countryToDisplay: countryName });
    // }

}

export default MoveComponent;
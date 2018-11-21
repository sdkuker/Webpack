import * as React from 'react';
import { Country } from '../../types/warehouses/Country';

interface PropValues {
    country: Country;
    whenPlayerChanged: Function;
}
class CountryListCountryComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.country.name}
                </td>
                <td>
                    {this.props.country.playerName}
                </td>
            </tr>
        );
    }
}

export default CountryListCountryComponent;
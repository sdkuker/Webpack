import * as React from 'react';
import { Country } from '../../types/warehouses/country/Country';
import { observer } from 'mobx-react';

interface PropValues {
    country: Country;
    onPlayerNameChange: Function;
}
interface StateValues {
    playerName: string;
}
@observer
class CountryListCountryComponent extends React.Component<PropValues, StateValues> {
    constructor(props: PropValues) {
        super(props);
        this.playerNameOnBlurHandler = this.playerNameOnBlurHandler.bind(this);
        this.playerNameOnChangeHandler = this.playerNameOnChangeHandler.bind(this);
        this.state = {playerName: this.props.country.playerName};
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.country.name}
                </td>
                <td>
                    <input
                        id="playerName"
                        className="col-md-9"
                        type="text"
                        onBlur={this.playerNameOnBlurHandler}
                        value={this.state.playerName}
                        onChange={this.playerNameOnChangeHandler}
                    />
                </td>
            </tr>
        );
    }
    playerNameOnBlurHandler(event: React.FocusEvent<HTMLInputElement>) {
        this.props.onPlayerNameChange(this.props.country, this.state.playerName);
    }

    playerNameOnChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let newName = event.target.value;
        // @ts-ignore
        this.setState({ playerName: newName });
    }
}

export default CountryListCountryComponent;
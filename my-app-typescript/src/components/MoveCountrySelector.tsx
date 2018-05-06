import * as React from 'react';

interface PropValues {
        onCountrySelected: Function;
}
class MoveCountrySelector extends React.Component<PropValues, {}> {

    constructor(props: PropValues) {
        super(props);
        this.state = { selectedValue: 'Austria' };
    }
    render() {
        return (
            <form className="form-inline row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="countrySelector"><b>Country:</b></label>
                        <select className="form-control" id="countrySelector" onChange={e => this.countrySelected(e)} >
                            <option>Austria</option>
                            <option>England</option>
                            <option>France</option>
                            <option>Germany</option>
                            <option>Italy</option>
                            <option>Russia</option>
                            <option>Turkey</option>
                        </select>
                    </div>
                </div>
            </form>

        );
    }

    countrySelected(event: React.FormEvent<HTMLSelectElement>) {
        let myValue: string = event.currentTarget.value;
        this.setState({ selectedValue: myValue });
        this.props.onCountrySelected(myValue);
    }
}

export default MoveCountrySelector;
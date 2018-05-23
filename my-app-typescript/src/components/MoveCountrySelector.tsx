import * as React from 'react';

interface PropValues {
        onCountrySelected: Function;
        initialCountryName: String;
}

interface StateValues {
    selectedCountryName: String;
    countryNames: string[];
}
class MoveCountrySelector extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);

        let nameArray: string[] = ['Austria'];
        nameArray.push('England');
        nameArray.push('France');
        nameArray.push('Germany');
        nameArray.push('Italy');
        nameArray.push('Russia');
        nameArray.push('Turkey');

        this.state = { selectedCountryName: props.initialCountryName, countryNames: nameArray};
    }

    render() {
        // tslint:disable-next-line
        let options: any = [];

        this.state.countryNames.forEach((aCountryName: string) => {
            if (this.state.selectedCountryName === aCountryName) {
                 // tslint:disable-next-line
                options.push(<option selected>{aCountryName}</option>);
            } else {
                options.push(<option>{aCountryName}</option>);
            }
        });
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
        this.setState({ selectedCountryName: myValue });
        this.props.onCountrySelected(myValue);
    }
}

export default MoveCountrySelector;
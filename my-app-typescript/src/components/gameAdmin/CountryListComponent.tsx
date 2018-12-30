import * as React from 'react';
import { observer } from 'mobx-react';
import CountryListCountryComponent from './CountryListCountryComponent';
import { ICountryWarehouse } from '../../types/warehouses/country/ICountryWarehouse';
import { Country } from '../../types/warehouses/country/Country';
import { Game } from '../../types/warehouses/game/Game';

interface PropValues {
    countryWarehouse: ICountryWarehouse;
    game: Game;
}
interface StateValues {
    countries: Country[];
}
@observer
class CountryListComponent extends React.Component<PropValues, StateValues> {
    constructor(props: PropValues) {
        super(props);
        this.playerChanged = this.playerChanged.bind(this);
        this.state = {
            countries: this.props.countryWarehouse.getAllCountries(this.props.game.id),
        };
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        // add components for the existing countries
        this.state.countries.forEach((aCountry: Country) => {
            theReturn.push((
                <CountryListCountryComponent
                    country={aCountry}
                    onPlayerNameChange={this.playerChanged}
                />
            )
            );
        });

        return (
            <div id="countryListComponent">
            <p/> 
            <p/>
                <h2>Country List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Player</th>
                        </tr>
                    </thead>
                    <tbody>
                        {theReturn}
                    </tbody>
                </table>
            </div>
        );
    }

    playerChanged(forCountry: Country, aPlayerName: string) {

        this.props.countryWarehouse.updatePlayerNameForCountry(this.props.game.id, forCountry, aPlayerName);
    }
}

export default CountryListComponent;
import * as React from 'react';
import ModalComponent from '../ModalComponent';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import CountryListCountryComponent from './CountryListCountryComponent';
import { ICountryWarehouse } from '../../types/warehouses/country/ICountryWarehouse';
import { Country } from '../../types/warehouses/country/Country';
import { Game } from '../../types/warehouses/game/Game';

interface PropValues {
    countryWarehouse: ICountryWarehouse;
    game: Game;
}

interface StateValues {
    isModalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
}

@observer
class CountryListComponent extends React.Component<PropValues, StateValues> {

    @observable
    countries = new Array<Country>();

    constructor(props: PropValues) {
        super(props);
        this.playerChanged = this.playerChanged.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            isModalOpen: false,
            modalTitle: '',
            modalDescription: ''
        };
    }

    componentDidMount = () => {
        let self = this;
        this.props.countryWarehouse.getAllCountries(this.props.game.id).then((arrayOfCountries) => {
            self.countries = arrayOfCountries;
        }).catch((error) => {
            this.setState({
                isModalOpen: true,
                modalTitle: 'error getting countries: ',
                modalDescription: error
            });
        });
    }

    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        // add components for the existing countries
        this.countries.forEach((aCountry: Country) => {
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
                <div>
                    <p />
                    <p />
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
                <div>
                    <ModalComponent
                        title={this.state.modalTitle}
                        description={this.state.modalDescription}
                        openInitially={this.state.isModalOpen}
                        onClose={this.closeModal}
                    />
                </div>
            </div>
        );
    }

    playerChanged(forCountry: Country, aPlayerName: string) {

        this.props.countryWarehouse.updatePlayerNameForCountry(this.props.game.id, forCountry, aPlayerName);
    }

    closeModal() {
        this.setState({ isModalOpen: false, modalTitle: '', modalDescription: '' });
    }
}

export default CountryListComponent;
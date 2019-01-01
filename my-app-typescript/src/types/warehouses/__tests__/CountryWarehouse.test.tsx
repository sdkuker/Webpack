import { Country } from '../country/Country';
import { CountryWarehouse } from '../country/CountryWarehouse';
import { ICountryWarehouse } from '../country/ICountryWarehouse';
import { StaticCountryDataProvider } from '../country/StaticCountryDataProvider';

let myCountryWarehouse: ICountryWarehouse = new CountryWarehouse(new StaticCountryDataProvider(null, null), null);

it('the warehouse should exist', () => {
    expect(myCountryWarehouse).not.toBeNull();
})

it('should get an empty array for any game not yet established', () => {

    expect.assertions(2);

    return myCountryWarehouse.getAllCountries('1').then((myCountries) => {
        expect(myCountries).not.toBeNull();
        expect(myCountries.length).toEqual(0);
    });

})

it('should get a populated array for an initialized game', () => {

    expect.assertions(5);

    return myCountryWarehouse.initializeCountries('2').then((successfulInit) => {
        expect(successfulInit).toBeTruthy();
        return myCountryWarehouse.getAllCountries('2').then((myCountries) => {
            expect(myCountries).not.toBeNull();
            expect(myCountries.length).toEqual(7);
            return myCountryWarehouse.getAllCountries('1').then((myCountries1) => {
                expect(myCountries1).not.toBeNull();
                expect(myCountries1.length).toEqual(0);
            });
        });
    });
})

it('delete the countries for a game', () => {

    expect.assertions(11);

    return myCountryWarehouse.initializeCountries('20').then((successfulInit) => {
        expect(successfulInit).toBeTruthy();
        return myCountryWarehouse.getAllCountries('20').then((myCountries20) => {
            expect(myCountries20).not.toBeNull();
            expect(myCountries20.length).toEqual(7);
            return myCountryWarehouse.initializeCountries('21').then((successfulInit2) => {
                expect(successfulInit2).toBeTruthy();
                return myCountryWarehouse.getAllCountries('21').then((myCountries21) => {
                    expect(myCountries21).not.toBeNull();
                    expect(myCountries21.length).toEqual(7);
                    return myCountryWarehouse.deleteCountries('20').then((successfulDeletion) => {
                        expect(successfulDeletion).toBeTruthy();
                        return myCountryWarehouse.getAllCountries('20').then((myDeletedCountries) => {
                            expect(myDeletedCountries).not.toBeNull();
                            expect(myDeletedCountries.length).toEqual(0);
                            return myCountryWarehouse.getAllCountries('21').then((myCountries2Again) => {
                                expect(myCountries2Again).not.toBeNull();
                                expect(myCountries2Again.length).toEqual(7);
                            });
                        });
                    });
                });
            });
        });
    });
})
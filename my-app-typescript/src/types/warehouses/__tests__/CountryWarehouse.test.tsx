import { Country } from '../country/Country';
import { CountryWarehouse } from '../country/CountryWarehouse';
import { ICountryWarehouse } from '../country/ICountryWarehouse';
import { StaticCountryDataProvider } from '../country/StaticCountryDataProvider';

let myCountryWarehouse : ICountryWarehouse = new CountryWarehouse(new StaticCountryDataProvider(null, null), null);

it('the warehouse should exist', () => {
    expect(myCountryWarehouse).not.toBeNull();
})

it('should get an empty array for any game not yet established', () => {
    let myCountries = myCountryWarehouse.getAllCountries('1');
    expect(myCountries).not.toBeNull();
    expect(myCountries.length).toEqual(0);
})

it('should get a populated array for an initialized game', () => {
    let successfulInit = myCountryWarehouse.initializeCountries('2');
    expect(successfulInit).toBeTruthy();
    let myCountries = myCountryWarehouse.getAllCountries('2');
    expect(myCountries).not.toBeNull();
    expect(myCountries.length).toEqual(7);

    myCountries = myCountryWarehouse.getAllCountries('1');
    expect(myCountries).not.toBeNull();
    expect(myCountries.length).toEqual(0);
})

it ('delete the countries for a game', () => {
    let successfulInit = myCountryWarehouse.initializeCountries('20');
    expect(successfulInit).toBeTruthy();
    let myCountries = myCountryWarehouse.getAllCountries('20');
    expect(myCountries).not.toBeNull();
    expect(myCountries.length).toEqual(7);

    let successfulInit2 = myCountryWarehouse.initializeCountries('21');
    expect(successfulInit2).toBeTruthy();
    let myCountries2 = myCountryWarehouse.getAllCountries('21');
    expect(myCountries2).not.toBeNull();
    expect(myCountries2.length).toEqual(7);

    let successfulDeletion = myCountryWarehouse.deleteCountries('20');
    expect(successfulDeletion).toBeTruthy();
    let myDeletedCountries = myCountryWarehouse.getAllCountries('20');
    expect(myDeletedCountries).not.toBeNull();
    expect(myDeletedCountries.length).toEqual(0);

    let myCountries2Again = myCountryWarehouse.getAllCountries('21');
    expect(myCountries2Again).not.toBeNull();
    expect(myCountries2Again.length).toEqual(7);
})
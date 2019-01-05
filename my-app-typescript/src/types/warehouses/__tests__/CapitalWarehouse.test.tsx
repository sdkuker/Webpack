import { CapitalWarehouse } from '../capital/CapitalWarehouse';
import { ICapitalWarehouse } from '../capital/ICapitalWarehouse';
import { StaticCapitalDataProvider } from '../capital/StaticCapitalDataProvider';

let myCapitalWarehouse: ICapitalWarehouse = new CapitalWarehouse(new StaticCapitalDataProvider(null, null));

it('the warehouse should exist', () => {
    expect(myCapitalWarehouse).not.toBeNull();
})

it('should get an empty array for any game not yet established', () => {

    expect.assertions(2);

    return myCapitalWarehouse.getCapitals('1').then((myCapitals) => {
        expect(myCapitals).not.toBeNull();
        expect(myCapitals.size).toEqual(0);
    });

})

it('should get capitals for a game thats initialized', () => {

    expect.assertions(8);

    return myCapitalWarehouse.initilizeCapitals('2').then((wasInitializationSuccessful) => {
        expect(wasInitializationSuccessful).toBeTruthy();
        return myCapitalWarehouse.getCapitals('2').then((myCapitals) => {
            expect(myCapitals).not.toBeNull();
            expect(myCapitals.size).toEqual(34);
            //@ts-ignore
            expect(myCapitals.get('LondonCAPITAL')).not.toBeNull();
            //@ts-ignore
            expect(myCapitals.get('ParisCAPITAL')).not.toBeNull();
            //@ts-ignore
            expect(myCapitals.get('BabyBaby')).toBeUndefined();
            return myCapitalWarehouse.getCapitals('1').then((myCapitals2) => {
                expect(myCapitals2).not.toBeNull();
                expect(myCapitals2.size).toEqual(0);
            });
        });
    })
})


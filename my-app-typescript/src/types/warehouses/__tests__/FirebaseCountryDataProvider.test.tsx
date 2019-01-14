import { FirebaseCountryDataProvider } from '../country/FirebaseCountryDataProvider';
import { Country } from '../country/Country';
import { EnvironmentName } from '../PersistenceTypes';

it('create and retrieve a country', () => {

    const country1Name = 'Germany';
    const country1PlayerName = 'George';
    const country1GameId = '1';

    expect.assertions(12);

    let myProvider = new FirebaseCountryDataProvider(EnvironmentName.UnitTest);
    expect(myProvider).not.toBeNull();

    return myProvider.addCountry(country1Name, country1PlayerName, country1GameId).then((newCountry1) => {
        expect(newCountry1).not.toBeNull();
        expect(newCountry1.id).not.toBeNull();
        expect(newCountry1.name).toEqual(country1Name);
        expect(newCountry1.playerName).toEqual(country1PlayerName);
        expect(newCountry1.gameId).toEqual(country1GameId);
        // @ts-ignore
        return myProvider.getCountry(country1GameId, newCountry1.id).then((retrivedNewCountry1) => {
            expect(retrivedNewCountry1).not.toBeNull();
            if (retrivedNewCountry1) {
                expect(retrivedNewCountry1.id).toEqual(newCountry1.id);
                expect(retrivedNewCountry1.name).toEqual(country1Name);
                expect(retrivedNewCountry1.playerName).toEqual(country1PlayerName);
                expect(retrivedNewCountry1.gameId).toEqual(country1GameId);
                return myProvider.deleteCountry(retrivedNewCountry1).then((wasCountryDeleted) => {
                    expect(wasCountryDeleted).toBeTruthy();
                }).catch((error) => {
                    expect(error).toBeNull();
                })
            }
        }).catch((error) => {
            expect(error).toBeNull();
        });
    }).catch((error) => {
        expect(error).toBeNull();
    });
})

it('getting countries for a game', () => {

    const country1Name = 'Germany';
    const country1PlayerName = 'George';
    const country1GameId = '1';
    const country2Name = 'France';
    const country2PlayerName = 'Simon';
    const country2GameId = '1';
    const country3Name = 'England';
    const country3PlayerName = 'Jean-Luc';
    const country3GameId = '2';

    expect.assertions(11);

    let myProvider = new FirebaseCountryDataProvider(EnvironmentName.UnitTest);
    expect(myProvider).not.toBeNull();

    return myProvider.addCountry(country1Name, country1PlayerName, country1GameId).then((newCountry1) => {
        expect(newCountry1).not.toBeNull();
        return myProvider.addCountry(country2Name, country2PlayerName, country2GameId).then((newCountry2) => {
            expect(newCountry2).not.toBeNull();
            return myProvider.addCountry(country3Name, country3PlayerName, country3GameId).then((newCountry3) => {
                expect(newCountry3).not.toBeNull();
                return myProvider.getCountries(country3GameId).then((arrayOfCountries) => {
                    expect(arrayOfCountries).not.toBeNull();
                    expect(arrayOfCountries.length).toEqual(1);
                    expect(arrayOfCountries[0].id).toEqual(newCountry3.id);
                    return myProvider.getCountries(country1GameId).then((game1ArrayOfCountries) => {
                        expect(game1ArrayOfCountries).not.toBeNull();
                        expect(game1ArrayOfCountries.length).toEqual(2);
                        return myProvider.deleteCountries(country1GameId).then((wereGame1CountriesDeleted) => {
                            expect(wereGame1CountriesDeleted).toBeTruthy();
                            return myProvider.deleteCountries(country3GameId).then((wereGame1CountriesDeleted) => {
                                expect(wereGame1CountriesDeleted).toBeTruthy();
                            }).catch((error) => {
                                expect(error).toBeNull();
                            });
                        }).catch((error) => {
                            expect(error).toBeNull();
                        });
                    }).catch((error) => {
                        expect(error).toBeNull();
                    })
                }).catch((error) => {
                    expect(error).toBeNull();
                });
            }).catch((error) => {
                expect(error).toBeNull();
            });
        }).catch((error) => {
            expect(error).toBeNull();
        });
    }).catch((error) => {
        expect(error).toBeNull();
    });
})

it('updating the player name for a country', () => {

    const country1Name = 'Germany';
    const country1PlayerName = 'George';
    const country1PlayerNewName = 'Jane';
    const country1GameId = '1';
    const country2Name = 'France';
    const country2PlayerName = 'Simon';
    const country2GameId = '1';

    expect.assertions(8);

    let myProvider = new FirebaseCountryDataProvider(EnvironmentName.UnitTest);
    expect(myProvider).not.toBeNull();

    return myProvider.addCountry(country1Name, country1PlayerName, country1GameId).then((newCountry1) => {
        expect(newCountry1).not.toBeNull();
        return myProvider.addCountry(country2Name, country2PlayerName, country2GameId).then((newCountry2) => {
            expect(newCountry2).not.toBeNull();
            return myProvider.updatePlayerNameForCountry(country1GameId, newCountry1, country1PlayerNewName).then((wasCountryUpdated) => {
                expect(wasCountryUpdated).toBeTruthy();
                 // @ts-ignore
                return myProvider.getCountry(country1GameId, newCountry1.id).then((updatedCountry) => {
                    expect(updatedCountry).not.toBeNull();
                    if (updatedCountry) {
                        expect(updatedCountry.playerName).toEqual(country1PlayerNewName);
                        return myProvider.deleteCountry(newCountry1).then((wasNewCountry1Deleted) => {
                            expect(wasNewCountry1Deleted).toBeTruthy();
                            return myProvider.deleteCountry(newCountry2).then((wasNewCountry2Deleted) => {
                                expect(wasNewCountry2Deleted).toBeTruthy();
                            }).catch((error) => {
                                expect(error).toBeNull();
                            });
                        }).catch((error) => {
                            expect(error).toBeNull();
                        });
                    }
                }).catch((error) => {
                    expect(error).toBeNull();
                });
            }).catch((error) => {
                expect(error).toBeNull();
            });
        }).catch((error) => {
            expect(error).toBeNull();
        });
    }).catch((error) => {
        expect(error).toBeNull();
    });
})
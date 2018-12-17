import { FirebaseGameDataProvider } from '../FirebaseGameDataProvider';

it('the game should have been created', () => {

    let myProvider = new FirebaseGameDataProvider(null);
    expect.assertions(5);
    expect(myProvider).not.toBeNull();
    return myProvider.getGames().then((result) => {
        expect(result).not.toBeNull();
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual('test');
        expect(result[0].name).toEqual('1');
    }).catch((error) => {
        expect(error).not.toBeNull();
    })
})
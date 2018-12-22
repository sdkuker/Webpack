import { FirebaseGameDataProvider } from '../game/FirebaseGameDataProvider';
import { Game } from '../game/Game';

it('create, retrieve, update and lastly delete a game', () => {

    let myProvider = new FirebaseGameDataProvider(null);
    expect.assertions(7);
    expect(myProvider).not.toBeNull();
    return myProvider.createGame().then((result) => {
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        expect(result.name).toEqual('New Game');
        return myProvider.getGames().then((gameArray) => {
            expect(gameArray).not.toBeNull();
            let index = 0;
            let createdGame : Game;
            for (index = 0; index < gameArray.length; index++) {
                if (gameArray[index].id === result.id) {
                    expect(gameArray[index].name).toEqual(result.name);
                    createdGame = gameArray[index];
                }
            }
            // @ts-ignore
            expect(createdGame).not.toBeNull();
            // @ts-ignore
            createdGame.name = 'New Game Name';
             // @ts-ignore
            myProvider.updateGame(createdGame).then((wasGameUpdated) => {
                expect(wasGameUpdated).toBeTruthy();
                myProvider.deleteGame(createdGame).then((wasGameDeleted) => {
                    expect(wasGameDeleted).toBeTruthy();
                }).catch((error) => {
                    expect(error).not.toBeNull();
                })
            })
        }).catch((error) => {
            expect(error).not.toBeNull();
        })
    }).catch((error) => {
        expect(error).not.toBeNull();
    })
})
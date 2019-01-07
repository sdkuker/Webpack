import { FirebaseGameDataProvider } from '../game/FirebaseGameDataProvider';
import { Game } from '../game/Game';
import { EnvironmentName } from '../PersistenceTypes';

const findGame = (gameArray: Array<Game>, id: string): Game | null => {

    let index = 0;
    let selectedGame: Game;
    for (index = 0; index < gameArray.length; index++) {
        if (gameArray[index].id === id) {
            selectedGame = gameArray[index];
        }
    }

    // @ts-ignore
    return selectedGame;
}
it('create, retrieve, update and lastly delete a game', () => {

    let myProvider = new FirebaseGameDataProvider(EnvironmentName.UnitTest);
    expect.assertions(15);
    expect(myProvider).not.toBeNull();
    return myProvider.createGame().then((result) => {
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        expect(result.name).toEqual('New Game');
        let gameFromGamesArray = findGame(myProvider.games, result.id);
        if (gameFromGamesArray) {
            expect(gameFromGamesArray).not.toBeNull();
            expect(gameFromGamesArray.name).toEqual('New Game');
        }
        return myProvider.getGames().then((gameArray) => {
            gameFromGamesArray = findGame(myProvider.games, result.id);
            if (gameFromGamesArray) {
                expect(gameFromGamesArray).not.toBeNull();
                expect(gameFromGamesArray.name).toEqual('New Game');
            }
            gameFromGamesArray = findGame(gameArray, result.id);
            if (gameFromGamesArray) {
                expect(gameFromGamesArray).not.toBeNull();
                expect(gameFromGamesArray.name).toEqual('New Game');
            }
            // @ts-ignore
            gameFromGamesArray.name = 'New Game Name';
            // @ts-ignore
            return myProvider.updateGame(gameFromGamesArray).then((wasGameUpdated) => {
                expect(wasGameUpdated).toBeTruthy();
                gameFromGamesArray = findGame(myProvider.games, result.id);
                if (gameFromGamesArray) {
                    expect(gameFromGamesArray).not.toBeNull();
                    expect(gameFromGamesArray.name).toEqual('New Game Name');
                }
                if (gameFromGamesArray) {
                    return myProvider.deleteGame(gameFromGamesArray).then((wasGameDeleted) => {
                        expect(wasGameDeleted).toBeTruthy();
                        expect(myProvider.games.length).toEqual(0);
                    }).catch((error) => {
                        expect(error).toBeNull();
                    })
                }
            })
        }).catch((error) => {
            expect(error).toBeNull();
        })
    }).catch((error) => {
        expect(error).toBeNull();
    })
})
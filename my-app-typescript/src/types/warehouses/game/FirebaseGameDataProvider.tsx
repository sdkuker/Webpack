import { IGameDataProvider } from './IGameDataProvider';
import { Game } from './Game';
import { observable } from 'mobx';
import db from '../../../firebase';

export class FirebaseGameDataProvider implements IGameDataProvider {

    @observable
    games = new Array<Game>();

    constructor(myGames: Array<Game> | null) {
        if (myGames) {
            this.games = myGames;
        }
    }

    getGames = () => {

        let myPromise = new Promise<Array<Game>>((resolve, reject) => {
            db.collection('games').get().then((querySnapshot) => {
                let myArray = new Array<Game>();
                querySnapshot.forEach((doc) => {
                    // console.log('${doc.id => ${doc.data()}');
                    // console.log(doc.id,)
                    myArray.push(new Game(doc.id, doc.data().name));
                });
                this.games = myArray;
                resolve(myArray);
            }).catch((error) => {
                reject('error getting games: ' + error);
            });
        });

        return myPromise;
    }

    createGame = () => {

        let myPromise = new Promise<Game>((resolve, reject) => {
            db.collection('games').add({
                name: 'New Game'
            }).then((docRef) => {
                let newGame = new Game(docRef.id, 'New Game');
                resolve(newGame);
            }).catch((error) => {
                reject('error creating a game: ' + error);
            });
        });

        return myPromise;
    }

    updateGame = (aGame: Game) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            this.getGames().then((gameArray) => {
                let index = 0;
                let gameToUpdate: Game | null = null;
                for (index = 0; index < gameArray.length; index++) {
                    if (aGame.id === gameArray[index].id) {
                        gameToUpdate = gameArray[index];
                    }
                }
                if (gameToUpdate) {
                    let gameRef = db.collection('games').doc(gameToUpdate.id);
                    gameRef.update({
                        name: aGame.name
                    }).then(() => {
                        // @ts-ignore
                        resolve(true);
                    }).catch((error) => {
                        reject('unable to update the game' + error);
                    });
                }
            }).catch((error) => {
                reject('error getting games to update one: ' + error);
            });
        });

        return myPromise;
    }

    deleteGame = (aGame: Game) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {

            db.collection('games').doc(aGame.id).delete().then(() => {
                this.getGames().then((gameArray) => {
                    resolve(true);
                }).catch((error) => {
                    reject('unable to get games after deleting a gme ' + error);
                });
            }).catch((error) => {
                reject('unable to delete the game' + error);
            });
        });

        return myPromise;
    }

}
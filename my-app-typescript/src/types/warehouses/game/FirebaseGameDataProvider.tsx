import { IGameDataProvider } from './IGameDataProvider';
import { Game } from './Game';
import { observable } from 'mobx';
import db from '../../../firebase';
import { EnvironmentName } from '../PersistenceTypes';

export class FirebaseGameDataProvider implements IGameDataProvider {

    @observable
    games = new Array<Game>();

    environmentName: EnvironmentName;

    constructor(anEnviornmentName: EnvironmentName) {
        this.environmentName = anEnviornmentName;
    }

    getGames = () => {

        let self = this;

        let myPromise = new Promise<Array<Game>>((resolve, reject) => {
            db.collection(self.environmentName).doc('games').collection('allGames').get().then((querySnapshot) => {
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

        let self = this;

        let myPromise = new Promise<Game>((resolve, reject) => {
            db.collection(self.environmentName).doc('games').collection('allGames').add({
                name: 'New Game'
            }).then((docRef) => {
                let newGame = new Game(docRef.id, 'New Game');
                this.games.push(newGame);
                resolve(newGame);
            }).catch((error) => {
                reject('error creating a game: ' + error);
            });
        });

        return myPromise;
    }

    updateGame = (aGame: Game) => {

        let self = this;

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
                    let gameRef = db.collection(self.environmentName).doc('games').collection('allGames')
                        .doc(gameToUpdate.id);
                    gameRef.update({
                        name: aGame.name
                    }).then(() => {
                        // @ts-ignore
                        gameToUpdate.name = aGame.name;
                        resolve(true);
                    }).catch((error) => {
                        reject('unable to update the game' + error);
                    });
                } else {
                    reject('unable to find the game to update');
                }
            }).catch((error) => {
                reject('error getting games to update one: ' + error);
            });
        });

        return myPromise;
    }

    deleteGame = (aGame: Game) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            db.collection(self.environmentName).doc('games').collection('allGames').doc(aGame.id).delete().then(() => {
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
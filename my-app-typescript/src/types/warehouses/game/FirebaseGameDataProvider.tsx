import { IGameDataProvider } from './IGameDataProvider';
import { Game } from './Game';
import { observable } from 'mobx';
import db from '../../../firebase';

export class FirebaseGameDataProvider {

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
                querySnapshot.forEach((doc) => {
                    console.log('${doc.id => ${doc.data()}');
                })
                let myArray = new Array<Game>();
                myArray.push(new Game('1', 'test'));
                resolve(myArray);
            }).catch((error) => {
                console.log('have an error getting games: ' + error);
                reject(error);
            })
        })

        return myPromise;
    }

    createGame = () => {

        let theReturn = new Game(null, 'Game Name');

        return theReturn;
    }

    persistGame = (aGame: Game) => {

        // might be a brand new game or just a change to the name
        if (aGame.id === '') {
            this.insertGame(aGame);
        } else {
            this.updateGame(aGame);
        }

        return aGame;
    }

    insertGame = (aGame: Game) => {

    }

    updateGame = (aGame: Game) => {

    }

    deleteGame = (aGame: Game) => {

        let index = 0;
        let indexOfGameToDelete = -1;

        for (index = 0; index < this.games.length; index++) {
            if (this.games[index].id === aGame.id) {
                indexOfGameToDelete = index;
            }
        }

        if (indexOfGameToDelete > -1) {
            this.games.splice(indexOfGameToDelete, 1);
        }

        return indexOfGameToDelete > -1;
    }

}
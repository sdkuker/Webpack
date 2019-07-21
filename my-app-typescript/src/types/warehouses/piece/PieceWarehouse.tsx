import { Turn } from '../turn/Turn';
import { Game } from '../game/Game';
import { Piece } from '../piece/Piece';
import { IPieceWarehouse } from './IPieceWarehouse';
import { IPieceDataProvider } from './IPieceDataProvider';
import { TurnPhase, PieceTypes } from '../DomainTypes';

export class PieceWarehouse implements IPieceWarehouse {

    dataProvider: IPieceDataProvider;

    constructor(myDataProvider: IPieceDataProvider) {
        this.dataProvider = myDataProvider;
    }

    getPieces = (forTurn: Turn, forPhase: TurnPhase) => {

        let myPromise = new Promise<Array<Piece>>((resolve, reject) => {
            this.dataProvider.getPieces(forTurn, forPhase).then((arrayOfPieces) => {
                resolve(arrayOfPieces);
            }).catch((error) => {
                reject('unable to get pieces for turn: ' + forTurn.id + ' and phase: ' + forPhase + error);
            });
        });

        return myPromise;
    }

    createPiece = ( forGame: Game, forTurn: Turn,
                    theLocationName: string, countryName: string, type: string) => {

        let myPromise = new Promise<Piece>((resolve, reject) => {
            this.dataProvider.createPiece(  forGame, forTurn, theLocationName, 
                                            countryName, PieceTypes[type]).then((newPiece) => {
                resolve(newPiece);
            }).catch((error) => {
                reject('unable to create a piece' + error);
            });
        });

        return myPromise;
    }

    deletePieces = (forTurn: Turn) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            this.dataProvider.getPieces(forTurn, null).then((arrayOfPieces) => {
                let arrayofPromises = new Array<Promise<boolean>>();
                let index = arrayOfPieces.length;
                while (index--) {
                    arrayofPromises.push(this.dataProvider.deletePiece(arrayOfPieces[index]));
                }
                Promise.all(arrayofPromises).then((arrayOfBooleans) => {
                    resolve(true);
                }).catch((error) => {
                    reject('unable to delete all the pieces: ' + error);
                });
            }).catch((error) => {
                reject('unable to get pieces to delete' + error);
            });
        });

        return myPromise;
    }
}

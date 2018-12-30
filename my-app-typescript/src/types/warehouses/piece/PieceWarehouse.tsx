import { Turn } from '../turn/Turn';
import { Game } from '../game/Game';
import { Piece } from '../piece/Piece';
import { IPieceWarehouse } from './IPieceWarehouse';
import { IPieceDataProvider } from './IPieceDataProvider';
import { Location } from '../location/Location';

export class PieceWarehouse implements IPieceWarehouse {

    dataProvider: IPieceDataProvider;

    constructor(myDataProvider: IPieceDataProvider) {
        this.dataProvider = myDataProvider;
    }

    getPieces = (forTurn: Turn) => {

        let myPromise = new Promise<Array<Piece>>((resolve, reject) => {
            this.dataProvider.getPieces(forTurn).then((arrayOfPieces) => {
                resolve(arrayOfPieces);
            }).catch((error) => {
                reject('unable to get pieces for turn: ' + forTurn.id + error);
            });
        });

        return myPromise;
    }

    createPiece = (forGame: Game, forTurn: Turn, theLocation: Location,
        theLocationName: string, countryName: string, type: string) => {

        let myPromise = new Promise<Piece>((resolve, reject) => {
            this.dataProvider.createPiece(forGame, forTurn, theLocation, theLocationName, countryName, type).then((newPiece) => {
                resolve(newPiece);
            }).catch((error) => {
                reject('unable to create a piece' + error);
            });
        });

        return myPromise;
    }

    deletePieces = (forTurn: Turn) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            this.dataProvider.getPieces(forTurn).then((arrayOfPieces) => {
                let allPiecesDeleted = true;
                let index = arrayOfPieces.length;
                while (index--) {
                    this.dataProvider.deletePiece(arrayOfPieces[index]).then((wasPieceDeleted) => {
                        if (!wasPieceDeleted) {
                            allPiecesDeleted = false;
                        }
                    }).catch((error) => {
                        reject('unable to delete a piece' + error);
                    });
                }
                resolve(allPiecesDeleted);
            }).catch((error) => {
                reject('unable to get pieces to delete' + error);
            });
        });

        return myPromise;
    }
}

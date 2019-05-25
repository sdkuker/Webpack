import db from '../../../firebase';
import { IPieceDataProvider } from './IPieceDataProvider';
import { Piece } from './Piece';
import { Game } from '../game/Game';
import { Turn } from '../turn/Turn';
import { EnvironmentName } from '../PersistenceTypes';
import { PieceTypes } from '../DomainTypes';

export class FirebasePieceDataProvider implements IPieceDataProvider {

    environmentName: EnvironmentName;

    constructor(anEnviornmentName: EnvironmentName) {
        this.environmentName = anEnviornmentName;
    }

    createPiece = (forGame: Game, forTurn: Turn, nameOfLocationAtBeginningOfTurn: string,
        countryName: string, type: PieceTypes) => { 

        let self = this; 

        let myPromise = new Promise<Piece>((resolve, reject) => {

            db.collection(self.environmentName).doc('pieces').collection('allPieces').add({
                gameId: forGame.id,
                turnId: forTurn.id,
                owningCountryName: countryName,
                nameOfLocationAtBeginningOfTurn: nameOfLocationAtBeginningOfTurn,
                nameOfLocationAtEndOfTurn: null,
                mustRetreatAtEndOfTurn: false,
                type: type
            }).then((docRef) => {
                let newPiece = new Piece(docRef.id, forGame.id, forTurn.id, countryName, 
                    nameOfLocationAtBeginningOfTurn, null, false, type);
                resolve(newPiece);
            }).catch((error) => {
                reject('error creating a piece: ' + error);
            });
        });

        return myPromise;
    }

    getPiece = (aPieceId: string) => {

        let self = this;

        let myPromise = new Promise<Piece | null>((resolve, reject) => {

            db.collection(self.environmentName).doc('pieces').collection('allPieces')
                .doc(aPieceId).get().then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        // @ts-ignore
                        resolve(new Piece(aPieceId, documentSnapshot.data().gameId, documentSnapshot.data().turnId,
                            // @ts-ignore
                            documentSnapshot.data().owningCountryName, documentSnapshot.data().nameOfLocationAtBeginningOfTurn,
                            // @ts-ignore
                            documentSnapshot.data().nameOfLocationAtEndOfTurn, documentSnapshot.data().mustRetreatAtEndOfTurn, 
                            // @ts-ignore
                            documentSnapshot.data().type));
                    } else {
                        resolve(null);
                    }
                }).catch((error) => {
                    reject('unable to get a piece for ID:  ' + aPieceId + ' ' + error);
                });
        });

        return myPromise;
    }

    deletePiece = (aPiece: Piece) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            db.collection(self.environmentName).doc('pieces').collection('allPieces')
                .doc(aPiece.id).delete().then(() => {
                    resolve(true);
                }).catch((error) => {
                    reject('unable to delete the piece ' + error);
                });
        });

        return myPromise;
    }

    deletePieces = (arrayOfPieces: Array<Piece>) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {
            let arrayOfPromises = new Array<Promise<boolean>>();
            arrayOfPieces.forEach((aPiece: Piece) => {
                arrayOfPromises.push(self.deletePiece(aPiece));
            });
            Promise.all(arrayOfPromises).then((arrayOfBooleans) => {
                resolve(true);
            }).catch((error) => {
                reject('unable to delete all the pieces ' + error);
            });
        });

        return myPromise;
    }

    getPieces = (forTurn: Turn) => {

        let self = this;

        let myPromise = new Promise<Array<Piece>>((resolve, reject) => {
            db.collection(self.environmentName).doc('pieces').collection('allPieces')
                .where('turnId', '==', forTurn.id).get().then((querySnapshot) => {
                    let myArray = new Array<Piece>();
                    querySnapshot.forEach((doc) => {
                        myArray.push(new Piece(doc.id, doc.data().gameId, doc.data().turnId,
                            doc.data().owningCountryName, doc.data().nameOfLocationAtBeginningOfTurn, 
                            doc.data().nameOfLocationAtEndOfTurn, doc.data().mustRetreatAtEndOfTurn, 
                            doc.data().type));
                    });
                    resolve(myArray);
                }).catch((error) => {
                    reject('error getting pieces: ' + error);
                });
        });

        return myPromise;
    }
}
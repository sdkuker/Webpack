import db from '../../../firebase';
import { IPieceDataProvider } from './IPieceDataProvider';
import { Piece } from './Piece';
import { Game } from '../game/Game';
import { Turn } from '../turn/Turn';
import { EnvironmentName } from '../PersistenceTypes';
import { PieceTypes, TurnPhase } from '../DomainTypes';
import { PieceLocation } from './PieceLocation';

export class FirebasePieceDataProvider implements IPieceDataProvider {

    environmentName: EnvironmentName;
    pieceDocumentName: string;
    pieceCollectionName: string;
    locationDocumentName: string;
    locationCollectionName: string;

    constructor(anEnviornmentName: EnvironmentName) {
        this.environmentName = anEnviornmentName;
        this.pieceDocumentName = 'pieces';
        this.pieceCollectionName = 'allPieces';
        this.locationDocumentName = 'pieceLocations';
        this.locationCollectionName = 'allPieceLocations';
    }

    createPiece = (forGame: Game, forTurn: Turn, aNameOfLocationAtBeginningOfTurn: string,
        countryName: string, type: PieceTypes) => {

        let self = this;

        let myPromise = new Promise<Piece>((resolve, reject) => {

            db.collection(self.environmentName).doc(self.pieceDocumentName).collection(self.pieceCollectionName).add({
                gameId: forGame.id,
                owningCountryName: countryName,
                type: type
            }).then((pieceDocRef) => {
                db.collection(self.environmentName).doc(self.locationDocumentName).collection(self.locationCollectionName).add({
                    pieceId: pieceDocRef.id,
                    turnId: forTurn.id,
                    gameId: forGame.id,
                    phase: TurnPhase.Diplomatic,
                    nameOfLocationAtBeginningOfPhase: aNameOfLocationAtBeginningOfTurn,
                    mustRetreatAtEndOfTurn: false
                }).then((locationDocRef) => {
                    let newLocation = new PieceLocation(locationDocRef.id, pieceDocRef.id, forTurn.id, forGame.id,
                        TurnPhase.Diplomatic, aNameOfLocationAtBeginningOfTurn, null, false);
                    let newPiece = new Piece(pieceDocRef.id, forGame.id, countryName,
                        type, newLocation);
                    resolve(newPiece);
                }).catch((error1) => {
                    reject('error creating a piece location' + error1);
                })
            }).catch((error) => {
                reject('error creating a piece: ' + error);
            });
        });

        return myPromise;
    }

    getPiece = (aPieceId: string, forPhase: TurnPhase) => {

        let self = this;

        let myPromise = new Promise<Piece | null>((resolve, reject) => {

            db.collection(self.environmentName).doc(self.pieceDocumentName).collection(self.pieceCollectionName)
                .doc(aPieceId).get().then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        self.getPieceLocation(aPieceId, forPhase).then((aLocation) => {
                            // @ts-ignore
                            resolve(new Piece(aPieceId, documentSnapshot.data().gameId,
                                // @ts-ignore
                                documentSnapshot.data().owningCountryName,
                                // @ts-ignore
                                documentSnapshot.data().type, aLocation));
                        }).catch((error1) => {
                            reject('unable to get a location for piece: ' + aPieceId + ' phase: ' + forPhase);
                        })
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

            db.collection(self.environmentName).doc(self.pieceDocumentName).collection(self.pieceCollectionName)
                .doc(aPiece.id).delete().then(() => {
                    this.deleteLocations(aPiece.id).then(() => {
                        resolve(true);
                    }).catch((error1) => {
                        reject('unable to delete locations for piece: ' + aPiece.id + '  ' + error1);
                    })
                }).catch((error) => {
                    reject('unable to delete piece: ' + aPiece.id + '  ' + error);
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

    getPieces = (forTurn: Turn, forPhase: TurnPhase | null) => {

        let self = this;
        let myPhase = forPhase ? forPhase : TurnPhase.Diplomatic;

        let myPromise = new Promise<Array<Piece>>((resolve, reject) => {
            db.collection(self.environmentName).doc(self.locationDocumentName).collection(self.locationCollectionName)
                .where('turnId', '==', forTurn.id).where('phase', '==', myPhase).get().then((querySnapshot) => {
                    let myPieceArray = new Array<Piece>();
                    let arrayOfPromises = new Array<Promise<Piece | null>>();
                    querySnapshot.forEach((doc) => {
                        arrayOfPromises.push(this.getPiece(doc.data().pieceId, myPhase));
                    });
                    Promise.all(arrayOfPromises).then((returnedArrayOfPieces) => {
                        returnedArrayOfPieces.forEach((aReturnedPiece) => {
                            if (aReturnedPiece) {
                                myPieceArray.push(aReturnedPiece);
                            }
                        });
                        resolve(myPieceArray);
                    }).catch((error) => {
                        reject('error creating pieces: ' + error);
                    });
                }).catch((error) => {
                    reject('error getting pieces: ' + error);
                });
        });

        return myPromise;
    }

    getPieceLocation = (aPieceId: string, forPhase: TurnPhase) => {

        let self = this;

        let myPromise = new Promise<PieceLocation | null>((resolve, reject) => {

            let locationsRef = db.collection(self.environmentName).doc(self.locationDocumentName).collection(self.locationCollectionName);
            var query = locationsRef.where('pieceId', '==', aPieceId).where('phase', '==', forPhase);
            query.get().then((querySnapshot) => {
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach((doc) => {
                        // should be zero or 1 docs
                        resolve(new PieceLocation(doc.id, doc.data().pieceId, doc.data().turnId, doc.data().gameId, doc.data().phase, doc.data().nameOfLocationAtBeginningOfPhase, doc.data().nameOfLocationAtEndOfPhase, doc.data().mustRetreatAtEndOfTurn));
                    });
                } else {
                    resolve(null);
                }
            }).catch((error) => {
                reject('unable to get a location for piece:  ' + aPieceId + ' ' + ' phase: ' + forPhase + error);
            });
        });

        return myPromise;
    }

    deleteLocations = (aPieceId: string) => {

        let self = this;

        let myPromise = new Promise<boolean>((resolve, reject) => {

            let locationsRef = db.collection(self.environmentName).doc(self.locationDocumentName).collection(self.locationCollectionName);
            var query = locationsRef.where('pieceId', '==', aPieceId);
            query.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    locationsRef.doc(doc.id).delete().then(() => {
                        // nothing here, the deletion worked
                    }).catch((error1) => {
                        reject('unable to delete location id: ' + doc.id + ' for piece: ' + aPieceId);
                    })
                });
                resolve(true);
            }).catch((error) => {
                reject('unable to get locations to delete for piece:  ' + aPieceId + ' ' + error);
            });
        });

        return myPromise;
    }


}
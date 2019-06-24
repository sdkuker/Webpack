import { IPieceDataProvider } from './IPieceDataProvider';
import { Piece } from './Piece';
import { Turn } from '../turn/Turn';
import { Game } from '../game/Game';
import { observable } from 'mobx';
import { PieceTypes } from '../DomainTypes';
import { TurnPhase } from '../DomainTypes';
import { PieceLocation } from './PieceLocation';

export class StaticPieceDataProvider implements IPieceDataProvider {

    // contains all the pieces for a single turn
    @observable pieces: Array<Piece>;
    piecesTurnId: string;
    nextAvailablePieceKey = 0;
    nextAvailablePieceLocationKey = 0;
    // the key to the outer map is the game id.  The key to the inner map is the turn id
    allPieces: Map<string, Map<string, Array<Piece>>> = new Map();

    getPieces = (forTurn: Turn, forPhase: TurnPhase) => {

        let myPromise = new Promise<Array<Piece>>((resolve, reject) => {
            this.adjustCacheForTurn(forTurn.gameId, forTurn.id);
            resolve(this.pieces);
        });

        return myPromise;
    }

    adjustCacheForTurn = (aGameId: string, aTurnId: string) => {

        if (aTurnId !== this.piecesTurnId) {
            if (this.allPieces.get(aGameId)) {  // have a map for the turn
                // @ts-ignore
                if (!this.allPieces.get(aGameId).get(aTurnId)) { // no moves for the turn
                    // @ts-ignore
                    this.allPieces.get(aGameId).set(aTurnId, new Array<Piece>());
                }
            } else {  // no map for the game - add an empty map
                this.allPieces.set(aGameId, new Map<string, Array<Piece>>());
                // also add an array for this turn
                // @ts-ignore
                this.allPieces.get(aGameId).set(aTurnId, new Array<Piece>());
            }

            // @ts-ignore
            this.pieces = this.allPieces.get(aGameId).get(aTurnId);
            this.piecesTurnId = aTurnId;
        }
    }

    createPiece = (forGame: Game, forTurn: Turn, theNameOfLocationAtBeginningOfPhase: string,
        countryName: string, type: PieceTypes) => {

        let myPromise = new Promise<Piece>((resolve, reject) => {
            this.nextAvailablePieceKey++;
            this.nextAvailablePieceLocationKey++;
            const thePieceLocation = new PieceLocation(this.nextAvailablePieceLocationKey.toString(),
                this.nextAvailablePieceKey.toString(), forTurn.id, forGame.id, TurnPhase.Diplomatic, 
                theNameOfLocationAtBeginningOfPhase, null, false);
            const thePiece = new Piece(this.nextAvailablePieceKey.toString(), forGame.id, countryName,
                type, thePieceLocation);
            this.adjustCacheForTurn(forGame.id, forTurn.id);
            // @ts-ignore
            this.allPieces.get(forGame.id).get(forTurn.id).push(thePiece);
            // @ts-ignore
            this.pieces.push(thePiece);
            resolve(thePiece);
        });

        return myPromise;

    }

    deletePiece = (aPiece: Piece) => {

        let myPromise = new Promise<boolean>((resolve, reject) => {
            let pieceDeleted = false;
            //this.adjustCacheForTurn(aPiece.gameId, aPiece.turnId);
            this.adjustCacheForTurn(aPiece.gameId, aPiece.pieceLocation.turnId);

            let i: number;
            for (i = 0; i < this.pieces.length; i++) {
                if (this.pieces[i].id === aPiece.id) {
                    // @ts-ignore
                    // this assumes the indices are the same in both arrays.  They should be...
                    //this.allPieces.get(aPiece.gameId).get(aPiece.turnId).splice(i, 1);
                    this.allPieces.get(aPiece.gameId).get(aPiece.pieceLocation.turnId).splice(i, 1);
                    this.pieces.splice(i, 1);
                    pieceDeleted = true;
                }
            }
            resolve(pieceDeleted);
        });

        return myPromise;
    }
}
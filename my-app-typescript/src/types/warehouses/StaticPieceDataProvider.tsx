import { IPieceDataProvider } from './IPieceDataProvider';
import { Piece } from './Piece';
import { Turn } from './Turn';
import { Game } from './Game';
import { observable } from 'mobx';
import { Location } from './Location';

export class StaticPieceDataProvider implements IPieceDataProvider {

    // contains all the pieces for a single turn
    @observable pieces: Array<Piece>;
    piecesTurnId: string;
    nextAvailablePieceKey = 0;
    // the key to the outer map is the game id.  The key to the inner map is the turn id
    allPieces: Map<string, Map<string, Array<Piece>>> = new Map();

    getPieces = (forTurn: Turn) => {

        this.adjustCacheForTurn(forTurn);

        return this.pieces;
    }

    adjustCacheForTurn = (aTurn: Turn) => {

        if (aTurn.id !== this.piecesTurnId) {
            if (this.allPieces.get(aTurn.game.id)) {  // have a map for the turn
                // @ts-ignore
                if (!this.allPieces.get(aTurn.game.id).get(aTurn.id)) { // no moves for the turn
                    // @ts-ignore
                    this.allPieces.get(aTurn.game.id).set(aTurn.id, new Array<Piece>());
                }
            } else {  // no map for the game - add an empty map
                this.allPieces.set(aTurn.game.id, new Map<string, Array<Piece>>());
                // also add an array for this turn
                // @ts-ignore
                this.allPieces.get(aTurn.game.id).set(aTurn.id, new Array<Piece>());
            }

            // @ts-ignore
            this.pieces = this.allPieces.get(aTurn.game.id).get(aTurn.id);
            this.piecesTurnId = aTurn.id;
        }
    }

    createPiece = ( forGame: Game, forTurn: Turn, theLocation: Location, theLocationName: string,
                    countryName: string, type: string) => {

        this.nextAvailablePieceKey++;
        const thePiece = new Piece( this.nextAvailablePieceKey.toString(), forTurn, countryName,
                                    theLocation, theLocationName, type);
        this.adjustCacheForTurn(forTurn);
        // @ts-ignore
        this.allPieces.get(forGame.id).get(forTurn.id).push(thePiece);
        // @ts-ignore
        this.pieces.push(thePiece);

        return thePiece;

    }

    deletePiece = (aPiece: Piece) => {

        let moveDeleted = false;
        this.adjustCacheForTurn(aPiece.turn);

        let i: number;
        for (i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].id === aPiece.id) {
                // @ts-ignore
                // this assumes the indices are the same in both arrays.  They should be...
                this.allPieces.get(aPiece.turn.game.id).get(aPiece.turn.id).splice(i, 1);
                this.pieces.splice(i, 1);
                moveDeleted = true;
            }
        }

        return moveDeleted;
    }
}
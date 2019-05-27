export enum PieceTypes {
    Fleet = 'FLEET',
    Army = 'ARMY'
}

export enum LocationTypes {
    Capital = 'CAPITAL',
    Piece = 'PIECE'
}

export enum SeasonTypes {
    Spring = 'SPRING',
    Fall = 'FALL'
}

export enum MoveAction {
    Holds = 'HOLDS',
    MovesTo = 'MOVESTO',
    Convoys = 'CONVOYS',
    Supports = 'SUPPORTS'
}

export enum TurnStatus {
    Open = 'OPEN',
    Complete = 'COMPLETE'
}

export enum TurnPhase {
    Diplomatic = 'DIPLOMATIC',
    OrderWriting = 'ORDER_WRITING',
    OrderResolution = 'ORDER_RESOLUTION',
    RetreatAndDisbanding = 'RETREAT_AND_DISBANDING',
    GainingAndLosingUnits = 'GAINING_AND_LOSING_UNITS'
}

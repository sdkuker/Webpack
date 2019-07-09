
export interface IAwsWarehouse {
    generateNextPhase(gameId: string) : Promise<boolean>;
}
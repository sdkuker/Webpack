import { StandoffProvince } from './StandoffProvince';

export interface IStandoffProvinceDataProvider {
    getStandoffProvincesForTurn(turnId: String): Promise<Array<StandoffProvince>>;
    deleteStandoffProvince(aStandoffProvince: StandoffProvince): Promise<boolean>;
    createStandoffProvince(provinceName: string, turnId: string, 
        gameId: string): Promise<StandoffProvince>;
} 

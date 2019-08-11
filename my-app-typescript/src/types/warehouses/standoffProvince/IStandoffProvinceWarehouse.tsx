import { StandoffProvince } from './StandoffProvince';

export interface IStandoffProvinceWarehouse {
    getStandoffProvincesForTurn(turnId: String): Promise<Array<StandoffProvince>>;
} 

import { Capital } from './Capital';

export interface ICapitalWarehouse {
    initilizeCapitals(gameId: string, turnId: string) : Promise<boolean>;
    getCapitals(turnId: string) : Promise<Map<string, Capital>>;
    deleteCapitals(aTurnId: string): Promise<boolean>;
}
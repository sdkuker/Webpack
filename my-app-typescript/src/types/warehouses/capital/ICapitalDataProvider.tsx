import { Capital } from './Capital';

export interface ICapitalDataProvider {
    createCapital(turnId: string, capitalName: string, forCountryName: string) : Promise<Capital>;
    getCapitals(turnId: string) : Promise<Map<string, Capital>>;
    deleteCapitals(aTurnId: string): Promise<boolean>;
} 

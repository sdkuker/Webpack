import { Capital } from './Capital';

export interface ICapitalDataProvider {
    createCapital(gameId: string, turnId: string, capitalName: string, forCountryName: string) : Promise<Capital>;
    getCapitals(turnId: string) : Promise<Map<string, Capital>>;
    deleteCapital(aCapital: Capital): Promise<boolean>;
} 

import { Capital } from './Capital';
import {Location } from './Location';

class CapitalWarehouse {
   
    public getCapitals = () => {
       const one =  new Capital('a', 'b', new Location('a', 'b'));
       return [one];
    }

}

export const myWarehouse = new CapitalWarehouse();
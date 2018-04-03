import * as React from 'react';
import { Map as GameMap } from './Map';
import { warehouse as CapitalWarehouse} from '../types/warehouses/CapitalWarehouse';
import { observer } from 'mobx-react';
import { Capital } from '../types/warehouses/Capital';

@observer
class MapBuilder extends React.Component{

    capitals : Map<String, Capital>;

    constructor(props : any) {
        super(props);
        this.initializeState();
    };

    initializeState = () => {
      this.capitals = CapitalWarehouse.capitals;
    }

    render() {
        return (

        );
    }

}

export default MapBuilder;

import * as React from 'react';
import { observer } from 'mobx-react';
import { StandoffProvince } from '../types/warehouses/standoffProvince/StandoffProvince';

interface PropValues {
    standoffProvinces: Array<StandoffProvince>;
}

@observer
class StandoffProvinceComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
    }
    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        this.props.standoffProvinces.forEach((aStandoffProvince: StandoffProvince) => {
            theReturn.push((
                <tr>
                    <td>{aStandoffProvince.provinceName}</td>
                </tr>));
        });

        return (
            <div>
                <h4>StandoffProvinces</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Province Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {theReturn}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StandoffProvinceComponent;
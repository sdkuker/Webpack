import * as React from 'react';
import { observer } from 'mobx-react';
import { Piece } from '../types/warehouses/piece/Piece';
import { StandoffProvince } from '../types/warehouses/standoffProvince/StandoffProvince';
import StandoffProvinceComponent from './StandoffProvinceComponent';

interface PropValues {
    piecesToRetreatOrDisband: Array<Piece>;
    standoffProvinces: Array<StandoffProvince>;
    onActionEntered: Function;
}

@observer
class RetreatAndDisbandComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
    }
    render() {
        // tslint:disable-next-line
        let theReturn: any = [];

        this.props.piecesToRetreatOrDisband.forEach((aPiece: Piece) => {
            let pieceDescription = aPiece.type.toString().concat(' in ')
                .concat(aPiece.pieceLocation.nameOfLocationAtBeginningOfPhase);

            let selectComponent = (
                <select className="form-control">
                    <option>Retreat</option>
                    <option>Disband</option>
                </select>
            );

            let retreatLocationComponent = (
                <input type="text" name="retreatLocation" />
            );

            theReturn.push((
                <tr>
                    <td>{pieceDescription}</td>
                    <td>{selectComponent}</td>
                    <td>{retreatLocationComponent}</td>
                </tr>));
        });

        return (
            <div>
                <h4>Pieces to Retreat or Disband</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Piece</th>
                            <th>Action</th>
                            <th>New Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {theReturn}
                    </tbody>
                </table>
                <StandoffProvinceComponent
                    standoffProvinces={this.props.standoffProvinces}
                />
            </div>
        );
    }
}

export default RetreatAndDisbandComponent;
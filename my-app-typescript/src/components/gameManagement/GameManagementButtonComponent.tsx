import * as React from 'react';
import { Game } from '../../types/warehouses/game/Game';

interface PropValues {
    whenOpenGameClicked: Function;
    whenAddGameClicked: Function;
    whenDeleteGameClicked: Function;
    whenAdministerGameClicked: Function;
}
class GameManagementButtonComponent extends React.Component<PropValues, {}> {
    constructor(props: PropValues) {
        super(props);
        this.openGameClicked = this.openGameClicked.bind(this);
        this.addGameClicked = this.addGameClicked.bind(this);
        this.deleteGameClicked = this.deleteGameClicked.bind(this);
        this.administerGameClicked = this.administerGameClicked.bind(this);
    }
    render() {
        return (
            <div className="btn-toolbar" role="toolbar">
                <div className="brn-group mr-2" role="group">
                    <button 
                        className="btn btn-outline-dark" 
                        type="button" 
                        onClick={this.openGameClicked}
                    >Open
                    </button>
                </div>
                <div className="brn-group mr-2" role="group">
                    <button 
                        className="btn btn-outline-dark" 
                        type="button" 
                        onClick={this.administerGameClicked}
                    >Administer
                    </button>
                </div>
                <div className="brn-group mr-2" role="group">
                    <button className="btn btn-outline-dark" type="button" onClick={this.addGameClicked}>New</button>
                </div>
                <div className="brn-group mr-2" role="group">
                    <button 
                        className="btn btn-outline-dark" 
                        type="button" 
                        onClick={this.deleteGameClicked}
                    >Delete
                    </button>
                </div>
            </div>

        );
    }
    openGameClicked(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.whenOpenGameClicked();
    }
    addGameClicked(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.whenAddGameClicked();
    }
    deleteGameClicked(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.whenDeleteGameClicked();
    }
    administerGameClicked(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.whenAdministerGameClicked();
    }
}

export default GameManagementButtonComponent;
import * as React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div className="row col-12">

            <nav className="navbar navbar-expand-lg navbar-light bg-white" id="navbar">
      
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
      
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/player"> Player</Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/admin"> Admin </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        );
    }
}

export default Header;
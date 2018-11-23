import * as React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-light" >
        <Link className="navbar-brand" to="/">Stevieware Diplomacy</Link>
          {/* <ul className="list-inline">
            <li className="list-inline-item">
              <Link className="nav-link" to="/game">Game</Link>
            </li>
            <li className="list-inline-item">
              <Link className="nav-link" to="/admin">Admin</Link>
            </li>
          </ul> */}
      </nav>
    );
  }
}

export default Header;
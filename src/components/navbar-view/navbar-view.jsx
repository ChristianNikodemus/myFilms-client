import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import account from "../../img/account_circle_FILL0_wght400_GRAD0_opsz48.svg";
import logout from "../../img/logout_FILL0_wght400_GRAD0_opsz48.svg";

import "./navbar-view.scss";

export class NavbarView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  /**
   * @function onLoggedOut
   * @description Clears the local storage of the users token
   */
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  /**
   * @returns Navigation bar
   * @description This allows to user to navigate through the web application
   */
  render() {
    const { user } = this.props;

    if (!user) return null;

    const profile = `/users/${user.Username}`;

    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Link to={`/`}>
            <Navbar.Brand className="nav-link">myFilms</Navbar.Brand>
          </Link>

          <Nav className="me-auto">
            <Link as={Link} to={profile} className="nav-link">
              <img src={account} alt="account-icon" className="nav-img" />
              {user.Username}
            </Link>
            <Link to={`/`} onClick={this.onLoggedOut} className="nav-link">
              <img src={logout} alt="logout-icon" className="nav-img" />
              Logout
            </Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default NavbarView;

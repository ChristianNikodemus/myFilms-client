import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

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
            <Navbar.Brand>myFilms</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Link as={Link} to={profile}>
              Go to {user.Username}
            </Link>
            <Link to={`/`} onClick={this.onLoggedOut}>
              Logout
            </Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default NavbarView;

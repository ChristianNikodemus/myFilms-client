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

  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

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
            <Nav.Link as={Link} to={profile}>
              Go to {user.Username}
            </Nav.Link>
            <Nav.Link to={`/`} onClick={this.onLoggedOut}>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default NavbarView;

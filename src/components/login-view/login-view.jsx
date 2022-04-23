import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Link } from "react-router-dom";

import "./login-view.scss";

/**
 * @function LoginView
 * @param props
 * @returns a form where the user is able to submit their login credentials
 * @description Takes the users login credentials and grants them a token to sign in
 */
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  /**
   * @function handleSumbit
   * @param e
   * @description Submits the users login credentials to check if they are valid
   */
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity() !== false) {
      axios
        .post("https://my-films-db.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          setError("Wrong password credentials.");
          setValidated(false);
          console.log("no such user");
        });
    } else {
      setValidated(true);
    }
  };

  return (
    <div className="background">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>myFilms</Navbar.Brand>
          <Nav className="me-auto">
            <Link to={`/register`}>
              <Button variant="primary">Register</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="d-flex justify-content-center align-items-center">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="form"
        >
          <h1 className="welcome-text">Great to meet you!</h1>
          <p className="login-text">Login to your account</p>
          <Form.Group className="mb-3 username" controlId="formBasicUsername">
            <Form.Label className="label">Username:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3 password" controlId="formBasicPassword">
            <Form.Label className="label">Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              isInvalid={password && error !== null}
            />
            <Form.Control.Feedback type="invalid">
              {password && error !== null
                ? error
                : "Please provide your password."}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="small_btn">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>

          <div className="block_btn d-grid gap-2">
            <Link to={`/register`}>
              <Button variant="primary w-100">Register</Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

LoginView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

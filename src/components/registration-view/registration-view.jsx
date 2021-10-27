import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const [nameError, setNameError] = useState({});
  const [usernameError, setUsernameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [birthdayError, setBirthdayError] = useState({});

  const [usernameUsed, setUsernameUsed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
      setValidated(true);
      axios
        .post("https://my-films-db.herokuapp.com/users", {
          Name: name,
          Username: username,
          Email: email,
          Password: password,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self");
        })
        .catch((e) => {
          if (e.response.status === 400) {
            setUsernameUsed(true);
          } else {
            alert("Uh oh, something went wrong.");
          }
          console.log("no such user");
        });
    }
  };

  const formValidation = () => {
    let nameError = {};
    let usernameError = {};
    let emailError = {};
    let passwordError = {};
    let birthdayError = {};
    let isValid = true;

    if (name === "") {
      nameError.nameEmpty = "Please enter your Name.";
      isValid = false;
    }
    if (username.trim().length < 4) {
      usernameError.usernameShort = "Username requires at least 4 characters.";
      isValid = false;
      0;
    }
    if (!(email && email.includes(".") && email.includes("@"))) {
      emailError.emailNotEmail = "Email address is not valid.";
      isValid = false;
    }
    if (password.trim().length < 5) {
      passwordError.passwordMissing =
        "Password requires at least 5 characters.";
      isValid = false;
    }
    if (birthday === "") {
      birthdayError.birthdayEmpty = "Please enter your birthdate.";
      isValid = false;
    }
    setNameError(nameError);
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    setBirthdayError(birthdayError);
    return isValid;
  };

  return (
    <div className="background">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>myFilms</Navbar.Brand>
          <Nav className="me-auto">
            <Link to={`/`}>
              <Button variant="primary">Login</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="d-flex justify-content-center">
        <Form noValidate validated={validated} className="form">
          <h1 className="welcome-text">Great to meet you!</h1>
          <p className="login-text">Create an account</p>
          <Form.Group className="mb-3 name" controlId="formBasicName">
            <Form.Label className="label">Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Firstname Lastname"
              isInvalid={nameError.nameEmpty}
            />
            <Form.Control.Feedback type="invalid">
              {Object.keys(nameError).map((key) => {
                return <div key={key}>{nameError[key]}</div>;
              })}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 username" controlId="formBasicUsername">
            <Form.Label className="label">Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              isInvalid={usernameError.usernameShort || usernameUsed}
            />
            <Form.Control.Feedback type="invalid">
              {usernameUsed
                ? "Sorry, that username is already in use."
                : Object.keys(usernameError).map((key) => {
                    return <div key={key}>{usernameError[key]}</div>;
                  })}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 email" controlId="formBasicEmail">
            <Form.Label className="label">Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={emailError.emailNotEmail}
            />
            <Form.Control.Feedback type="invalid">
              {Object.keys(emailError).map((key) => {
                return <div key={key}>{emailError[key]}</div>;
              })}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              <p className="muted">
                We'll never share your email with anyone else.
              </p>
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3 password" controlId="formBasicPassword">
            <Form.Label className="label">Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={passwordError.passwordMissing}
            />
            <Form.Control.Feedback type="invalid">
              {Object.keys(passwordError).map((key) => {
                return <div key={key}>{passwordError[key]}</div>;
              })}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 birthday" controlId="formBasicDate">
            <Form.Label className="label">Birth date:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="Birthday"
              isInvalid={birthdayError.birthdayEmpty}
            />
            <Form.Control.Feedback type="invalid">
              {Object.keys(birthdayError).map((key) => {
                return <div key={key}>{birthdayError[key]}</div>;
              })}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="small_btn">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Register
            </Button>
          </div>

          <div className="block_btn d-grid gap-2">
            <Link to={`/`}>
              <Button variant="primary w-100">Login</Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  //onRegistration: PropTypes.func.isRequired,
};

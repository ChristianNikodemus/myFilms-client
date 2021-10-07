import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./registration-view.scss";

export function RegistrationView(props) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
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
    <Form>
      <Form.Group className="mb-3 name" controlId="formBasicName">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Firstname Lastname"
        />
        {Object.keys(nameError).map((key) => {
          return <div key={key}>{nameError[key]}</div>;
        })}
      </Form.Group>
      <Form.Group className="mb-3 username" controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {Object.keys(usernameError).map((key) => {
          return <div key={key}>{usernameError[key]}</div>;
        })}
      </Form.Group>
      <Form.Group className="mb-3 email" controlId="formBasicEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {Object.keys(emailError).map((key) => {
          return <div key={key}>{emailError[key]}</div>;
        })}
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 password" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {Object.keys(passwordError).map((key) => {
          return <div key={key}>{passwordError[key]}</div>;
        })}
      </Form.Group>
      <Form.Group className="mb-3 birthday" controlId="formBasicDate">
        <Form.Label>Birth date:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
        />
        {Object.keys(birthdayError).map((key) => {
          return <div key={key}>{birthdayError[key]}</div>;
        })}
      </Form.Group>
      <Button
        variant="outline-primary"
        className="registerBtn"
        type="submit"
        onClick={handleSubmit}
      >
        Register
      </Button>
      <br />
      Already have an account? Log in here!
      <br />
      <Link to={`/`}>
        <Button variant="outline-secondary">Login</Button>
      </Link>
    </Form>
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

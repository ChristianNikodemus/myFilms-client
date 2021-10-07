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

  const handleSubmit = (e) => {
    e.preventDefault();
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
        //props.onRegistration(true);
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("no such user");
      });
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
      </Form.Group>
      <Form.Group className="mb-3 username" controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group className="mb-3 email" controlId="formBasicEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
      </Form.Group>
      <Form.Group className="mb-3 birthday" controlId="formBasicDate">
        <Form.Label>Birth date:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
        />
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

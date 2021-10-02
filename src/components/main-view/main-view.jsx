import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      //selectedMovie: null,
      user: null,
      register: true,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  /*
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }
  */

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://my-films-db.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user, register } = this.state;

    if (register && !user)
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
            Or Register an Account! <br />
            <Button
              variant="outline-secondary"
              onClick={() => this.setState({ register: false })}
            >
              Register
            </Button>
          </Col>
        </Row>
      );

    if (!register && !user)
      return (
        <Row>
          <Col>
            <RegistrationView
              onRegistration={(register) => this.onRegistration(register)}
            />
            Already Have a User Login?
            <br />
            <Button
              variant="outline-secondary"
              onClick={() => this.setState({ register: true })}
            >
              Login
            </Button>
          </Col>
        </Row>
      );

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div>
        <Button
          variant="outline-primary"
          onClick={() => {
            this.onLoggedOut();
          }}
        >
          Logout
        </Button>
        <Router>
          <Row className="justify-content-md-center main-view">
            <Route
              exact
              path="/"
              render={() => {
                return movies.map((m) => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match }) => {
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Router>
      </div>
    );
  }
}

export default MainView;

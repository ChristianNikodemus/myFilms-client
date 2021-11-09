import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUser } from "../../actions/actions";

// haven't written this yet
import MoviesList from "../movies-list/movies-list";

//import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./main-view.scss";

class MainView extends React.Component {
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken, localStorage.getItem("user"));
      this.getMovies(accessToken);
    }
  }

  getUser(token, username) {
    axios
      .get(`https://my-films-db.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        alert("Uh oh, something broke.");
        console.log(error);
      });
  }

  //   Get all movies in DB
  getMovies(token) {
    axios
      .get("https://my-films-db.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser(null);
  }

  render() {
    let { movies, user } = this.props;

    if (!user && movies.length === 0) {
      document.body.parentElement.classList.add("full-page");
    } else {
      document.body.parentElement.classList.remove("full-page");
    }

    return (
      <Router>
        <NavbarView user={user} />
        <div className="justify-content-md-center main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col className="nopadding">
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList />;
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col className="nopadding">
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              const movie = movies.find((m) => m._id === match.params.movieId);
              return (
                <Col md={8}>
                  <MovieView
                    movie={movie}
                    onBackClick={() => history.goBack()}
                    onSubmit={(user) => this.props.setUser(user)}
                    isFavourited={Boolean(
                      user.FavouriteMovies.find(
                        (movieId) => movieId === movie._id
                      )
                    )}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:directorId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} className="nopadding">
                  <DirectorView
                    director={movies.reduce(
                      (director, m) =>
                        director
                          ? director
                          : m.Director.find(
                              (d) => d._id === match.params.directorId
                            ),
                      null
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:genreId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} className="nopadding">
                  <GenreView
                    genre={movies.reduce(
                      (genre, m) =>
                        genre
                          ? genre
                          : m.Genre.find((g) => g._id === match.params.genreId),
                      null
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/users/:username"
            render={({ history }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                );
              if (movies.length === 0) return;
              return (
                <Col className="nopadding">
                  <ProfileView
                    history={history}
                    movies={movies}
                    onSubmit={(user) => this.props.setUser(user)}
                    user={user}
                  />
                </Col>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

//export default MainView;
export default connect(mapStateToProps, { setMovies, setUser })(MainView);

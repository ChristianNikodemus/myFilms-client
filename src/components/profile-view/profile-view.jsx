import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Alert, Button, Card, CardDeck, Form, Row } from "react-bootstrap";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: null,
      Username: null,
      Email: null,
      Password: null,
      Birthday: null,
      FavouriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://my-films-db.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Email: response.data.Email,
          Password: response.data.Password,
          Birthday: response.data.Birthday,
          FavouriteMovies: response.data.FavouriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavouriteMovie() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .delete(
        `https://my-films-db.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e, newName, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .put(`https://my-films-db.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          Name: newName ? newName : this.state.Name,
          Username: newUsername ? newUsername : this.state.Username,
          Email: newEmail ? newEmail : this.state.Email,
          Password: newPassword ? newPassword : this.state.Password,
          Birthday: newBirthday ? newBirthday : this.state.Birthday,
        },
      })
      .then((response) => {
        alert("Saved Changes");
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Email: response.data.Email,
          Password: response.data.Password,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        window.open(`/users/${username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setName(input) {
    this.Name = input;
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .delete(`https://my-films-db.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Your account has been deleted.");
        window.open(`/`, "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavouriteMovies, validated } = this.state;
    const { movies } = this.props;
    console.log(FavouriteMovies);

    return (
      <div>
        {["primary"].map((variant, idx) => (
          <Alert key={idx} variant={variant}>
            <h5>Favourites Movies</h5>
          </Alert>
        ))}

        {FavouriteMovies.length === 0 && (
          <div className="text-center">No Saved Movies.</div>
        )}

        {FavouriteMovies.length > 0 &&
          movies.map((movie) => {
            if (
              movie._id ===
              FavouriteMovies.find((favMovie) => favMovie === movie._id)
            ) {
              return (
                <CardDeck className="movie-card-deck">
                  <Card key={movie._id}>
                    <Card.Img
                      style={{ width: "18rem" }}
                      className="movieCard"
                      variant="top"
                      src={movie.ImageURL}
                    />
                    <Card.Body>
                      <Card.Title className="movie-card-title">
                        {movie.Title}
                      </Card.Title>
                      <Button
                        size="sm"
                        className="profile-button remove-favourite"
                        variant="danger"
                        value={movie._id}
                        onClick={(e) => this.removeFavouriteMovie(e, movie)}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </CardDeck>
              );
            }
          })}

        {["info"].map((variant, idx) => (
          <Alert key={idx} variant={variant}>
            <h5 className="section">Update Profile Information</h5>
          </Alert>
        ))}

        <Form
          noValidate
          validated={validated}
          className="update-form"
          onSubmit={(e) =>
            this.handleUpdate(
              e,
              this.Name,
              this.Username,
              this.Email,
              this.Password,
              this.Birthday
            )
          }
        >
          <Form.Group controlId="formName">
            <Form.Label className="form-label">Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Change Name"
              onChange={(e) => this.setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label className="form-label">Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Change Username"
              onChange={(e) => this.setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="form-label">Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Change Email"
              onChange={(e) => this.setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="form-label">
              Password:<span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              onChange={(e) => this.setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDate">
            <Form.Label className="form-label">Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder="Change Birthday"
              onChange={(e) => this.setBirthday(e.target.value)}
            />
          </Form.Group>
        </Form>

        <Button variant="outline-primary" type="submit" className="update_btn">
          Update
        </Button>

        {["danger"].map((variant, idx) => (
          <Alert key={idx} variant={variant}>
            <h5>Delete your Account</h5>
          </Alert>
        ))}

        <Button variant="danger" onClick={(e) => this.handleDeleteUser(e)}>
          Delete Account
        </Button>
      </div>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavouriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};

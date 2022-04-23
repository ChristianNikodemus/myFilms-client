import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Alert,
  Button,
  Card,
  CardGroup,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";

/**
 * @class
 * @description Creates a profile page where the user is able to edit their information, favourite movies, and delete their account
 */
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

  /**
   * @param e
   * @param movie
   * @function removeFavouriteMovie
   * @description Removes a users favourited movie from their list
   */
  removeFavouriteMovie(e, movie) {
    const { onSubmit } = this.props;
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .delete(
        `https://my-films-db.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Movie was removed");
        onSubmit(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * @param e
   * @param newName
   * @param newUsername
   * @param newEmail
   * @param newPassword
   * @param newBirthday
   * @returns the updated users information if it is valid
   * @description Takes the updated profile information and sets it as the new value
   */
  handleUpdate(e, newName, newUsername, newEmail, newPassword, newBirthday) {
    const { onSubmit } = this.props;
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
      .put(
        `https://my-films-db.herokuapp.com/users/${username}`,
        {
          Name: newName,
          Username: newUsername,
          Email: newEmail,
          Password: newPassword,
          Birthday: newBirthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert("Saved Changes");
        onSubmit(response.data);
        localStorage.setItem("user", response.data.Username);
        //window.open(`/users/${username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * @param input
   * @description Allows the user to change their profile Name
   */
  setName(input) {
    this.Name = input;
  }

  /**
   * @param input
   * @description Allows the user to change their profile Username
   */
  setUsername(input) {
    this.Username = input;
  }

  /**
   * @param input
   * @description Allows the user to change their profile Email
   */
  setEmail(input) {
    this.Email = input;
  }

  /**
   * @param input
   * @description Allows the user to change their profile Password
   */
  setPassword(input) {
    this.Password = input;
  }

  /**
   * @param input
   * @description Allows the user to change their profile Birthday
   */
  setBirthday(input) {
    this.Birthday = input;
  }

  /**
   * @param e
   * @description Deletes the users profile information from the database completely
   */
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

  /**
   * @returns The profile page in HTML
   * @description Renders the users profile page where they can edit their profile information, remove favourite movies, and delete their account
   */
  render() {
    const { validated } = this.state;
    const { movies, user } = this.props;

    const imgLink = "https://my-films-db.herokuapp.com/";

    return (
      <div>
        <h2 style={{ textAlign: "center" }}>
          Hello {user.Username}, welcome back!
        </h2>

        {["primary"].map((variant, idx) => (
          <Alert key={idx} variant={variant}>
            <h5>Favourites Movies</h5>
          </Alert>
        ))}

        {user.FavouriteMovies.length === 0 && (
          <div className="text-center">No Saved Movies.</div>
        )}

        {user.FavouriteMovies.length > 0 && (
          <CardGroup>
            {user.FavouriteMovies.map((movieId) => {
              const movie = movies.find((m) => movieId === m._id);
              return (
                <Card style={{ width: "18rem" }} key={movie._id}>
                  <Card.Img variant="top" src={imgLink + movie.ImagePath} />
                  <Card.Body>
                    <Card.Title className="movie-card-title">
                      <Link to={`/movies/${movie._id}`}>{movie.Title}</Link>
                    </Card.Title>

                    <Button
                      size="sm"
                      variant="danger"
                      value={movie._id}
                      onClick={(e) => this.removeFavouriteMovie(e, movie)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardGroup>
        )}

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
              this.Name || user.Name,
              this.Username || user.Username,
              this.Email || user.Email,
              this.Password || user.Password,
              this.Birthday || user.Birthday
            )
          }
        >
          <Form.Group controlId="formName">
            <Form.Label className="form-label">Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder={user.Name}
              onChange={(e) => this.setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label className="form-label">Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder={user.Username}
              onChange={(e) => this.setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="form-label">Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder={user.Email}
              onChange={(e) => this.setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="form-label">Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              onChange={(e) => this.setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDate">
            <Form.Label className="form-label">
              Birthday: ({user.Birthday.slice(0, 10)})
            </Form.Label>
            <Form.Control
              type="date"
              placeholder="Change Birthday"
              onChange={(e) => this.setBirthday(e.target.value)}
            />
          </Form.Group>
        </Form>

        <Button
          variant="outline-primary"
          onClick={(e) =>
            this.handleUpdate(
              e,
              this.Name || user.Name,
              this.Username || user.Username,
              this.Email || user.Email,
              this.Password || user.Password,
              this.Birthday || user.Birthday
            )
          }
          type="submit"
          className="update_btn"
        >
          Update Information
        </Button>

        {["danger"].map((variant, idx) => (
          <Alert key={idx} variant={variant}>
            <h5>Delete your Account</h5>
          </Alert>
        ))}

        <Button
          className="delete_btn"
          variant="danger"
          onClick={(e) => this.handleDeleteUser(e)}
        >
          Delete Account
        </Button>
      </div>
    );
  }
}

//export default ProfileView;

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavouriteMovies: PropTypes.arrayOf(PropTypes.string),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import "./movie-view.scss";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export class MovieView extends React.Component {
  /**
   * @description Adds the movie to the users favourites
   */
  addFavorite() {
    const { onSubmit } = this.props;
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .post(
        `https://my-films-db.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert(`Added to favorites list`);
        onSubmit(response.data);
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          alert("The movie was already added to favourites list.");
        } else {
          alert("Something went wrong.");
        }
        console.log(error);
      });
  }

  /**
   * @returns A card showcasing in depth information about the movie
   */
  render() {
    const { isFavourited, movie, onBackClick } = this.props;

    const imgLink = "https://my-films-db.herokuapp.com/";

    return (
      <Card>
        <CardHeader as="h3">{movie.Title}</CardHeader>
        <Card.Body className="card-img-description">
          <Card.Img
            variant="top"
            src={imgLink + movie.ImagePath}
            style={{
              maxWidth: "300px",
              marginRight: "0.5em",
            }}
          />
          <Card.Text>Description: {movie.Description}</Card.Text>
        </Card.Body>
        <ListGroup>
          <ListGroupItem>Year: {movie.Year}</ListGroupItem>
          <ListGroupItem className="movie-genre">
            Genre:{" "}
            {movie.Genre.map((genre) => (
              <span key={genre._id} className="value">
                <Link to={`/genres/${genre._id}`}>{genre.Title}</Link>
              </span>
            ))}
          </ListGroupItem>
          <ListGroupItem className="movie-director">
            Director(s):{" "}
            {movie.Director.map((director) => (
              <span key={director._id} className="value">
                <Link to={`/directors/${director._id}`}>{director.Name}</Link>
              </span>
            ))}
          </ListGroupItem>
          <ListGroupItem>
            {movie.Featured ? (
              <span>This movie is Featured!</span>
            ) : (
              <span>This movie is not Featured.</span>
            )}
          </ListGroupItem>
        </ListGroup>

        <Card.Body>
          <Button
            onClick={() => {
              onBackClick(null);
            }}
            variant="link"
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="lg"
            value={movie._id}
            onClick={(e) => this.addFavorite(e, movie)}
            disabled={isFavourited}
          >
            {isFavourited ? "Already Favourited" : "Add to Favourites"}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Director: PropTypes.array.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

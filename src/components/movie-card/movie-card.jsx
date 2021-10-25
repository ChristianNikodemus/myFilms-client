import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    const imgLink = "https://my-films-db.herokuapp.com/";

    return (
      <Card style={{ backgroundColor: "var(--background-secondary-color)" }}>
        <Card.Img variant="top" src={imgLink + movie.ImagePath} />
        <Card.Body>
          <Card.Title style={{ color: "var(--text-primary-color)" }}>
            {movie.Title}
          </Card.Title>
          <Card.Text style={{ color: "var(--text-third-color)" }}>
            {movie.Description}
          </Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Director: PropTypes.array.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};

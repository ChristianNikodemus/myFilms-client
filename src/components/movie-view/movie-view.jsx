import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

import "./movie-view.scss";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    const imgLink = "https://my-films-db.herokuapp.com/";

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={imgLink + movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-year">
          <span className="label">Year: </span>
          <span className="value">{movie.Year}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          {movie.Genre.map((Genre) => (
            <span key={Genre._id} className="value">
              <Link to={`/genres/${movie.Genre.Title}`}>{Genre.Title}</Link>
            </span>
          ))}
        </div>
        <div className="movie-director">
          <span className="label">Director(s): </span>
          {movie.Director.map((Director) => (
            <span key={Director._id} className="value">
              <Link to={`/directors/${movie.Director.Name}`}>
                {Director.Name}
              </Link>
            </span>
          ))}
        </div>
        <div className="movie-featured">
          {movie.Featured ? (
            <span className="label">This movie is Featured!</span>
          ) : (
            <span className="label">This movie is not Featured.</span>
          )}
        </div>
        <Button
          onClick={() => {
            onBackClick(null);
          }}
          variant="link"
        >
          Back
        </Button>
      </div>
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

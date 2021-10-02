import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <h1>
            <span className="value">{movie.Genre.Title}</span>
          </h1>
        </div>
        <div className="genre-description">
          <span className="value">{movie.Genre.Description}</span>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default GenreView;

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

import "./genre-view.scss";

export class GenreView extends React.Component {
  /**
   * @returns
   * @description Renders the view of the genre information
   */
  render() {
    const { genre, onBackClick } = this.props;
    console.log("The genre is: ", genre);

    return (
      <div className="genre-view">
        <div className="genre-name">
          <h1>
            <span className="value">{genre.Title}</span>
          </h1>
        </div>
        <div className="genre-description">
          <span className="value">{genre.Description}</span>
        </div>

        <Button
          variant="link"
          onClick={() => {
            onBackClick();
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

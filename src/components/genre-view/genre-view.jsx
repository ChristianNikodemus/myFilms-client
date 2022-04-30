import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./genre-view.scss";
import CardHeader from "react-bootstrap/esm/CardHeader";

export class GenreView extends React.Component {
  /**
   * @returns
   * @description Renders the view of the genre information
   */
  render() {
    const { genre, onBackClick } = this.props;
    console.log("The genre is: ", genre);

    return (
      <Card>
        <CardHeader as="h3">{genre.Title}</CardHeader>
        <Card.Body>
          <Card.Text>{genre.Description}</Card.Text>
          <Button
            variant="link"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
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

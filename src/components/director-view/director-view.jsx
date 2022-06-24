import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./director-view.scss";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export class DirectorView extends React.Component {
  /**
   * @returns
   * @description Renders the view of the directors information
   */
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card>
        <CardHeader as="h3">{director.Name}</CardHeader>
        <Card.Body>
          <Card.Text>{director.Bio}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroupItem>
            Life: {director.Birthyear} until {director.Deathyear}
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string.isRequired,
    Deathyear: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default DirectorView;
